import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ─── TYPES ───────────────────────────────────────────────────────────────────

type MovementType =
  | "PURCHASE"
  | "SALE"
  | "RETURN_IN"
  | "RETURN_OUT"
  | "TRANSFER_IN"
  | "TRANSFER_OUT"
  | "ADJUSTMENT"
  | "RESERVED"
  | "UNRESERVED";

// ─── GET: Tüm depo verisi (stok özeti + düşük stok uyarıları) ────────────────

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const warehouseId = searchParams.get("warehouseId");
    const view = searchParams.get("view") ?? "summary"; // summary | ledger | alerts

    // 1. Tüm depolar
    const warehouses = await prisma.warehouse.findMany({
      where: { isActive: true },
      include: {
        stockItems: {
          include: {
            variant: {
              include: { product: { select: { id: true, name: true, sku: true } } },
            },
          },
        },
      },
      orderBy: { name: "asc" },
    });

    if (view === "ledger") {
      // Stok hareket defteri (son 100 kayıt)
      const ledger = await prisma.stockLedger.findMany({
        where: warehouseId ? { warehouseId } : undefined,
        include: {
          variant: {
            include: { product: { select: { name: true, sku: true } } },
          },
          warehouse: { select: { name: true, code: true } },
        },
        orderBy: { createdAt: "desc" },
        take: 100,
      });
      return NextResponse.json({ ledger });
    }

    if (view === "alerts") {
      // Kritik seviye altındaki stoklar
      const lowStock = await prisma.warehouseStock.findMany({
        where: {
          ...(warehouseId ? { warehouseId } : {}),
          // available = quantity - reserved < minStock
        },
        include: {
          variant: {
            include: { product: { select: { id: true, name: true, sku: true, lowStockAlert: true } } },
          },
          warehouse: { select: { id: true, name: true, code: true } },
        },
      });

      // JS'de filtrele çünkü Prisma computed field desteklemiyor
      const alerts = lowStock.filter(
        (s) => s.quantity - s.reserved < s.minStock
      );

      return NextResponse.json({ alerts, count: alerts.length });
    }

    // Varsayılan: Özet dashboard verisi
    const summary = warehouses.map((wh) => {
      const totalQty = wh.stockItems.reduce((sum, s) => sum + s.quantity, 0);
      const totalReserved = wh.stockItems.reduce((sum, s) => sum + s.reserved, 0);
      const lowStockCount = wh.stockItems.filter(
        (s) => s.quantity - s.reserved < s.minStock
      ).length;

      return {
        id: wh.id,
        name: wh.name,
        code: wh.code,
        address: wh.address,
        managerName: wh.managerName,
        isActive: wh.isActive,
        totalSkus: wh.stockItems.length,
        totalQty,
        totalReserved,
        availableQty: totalQty - totalReserved,
        lowStockCount,
        stockItems: wh.stockItems.map((s) => ({
          id: s.id,
          variantId: s.variantId,
          productName: s.variant.product.name,
          productSku: s.variant.product.sku,
          variantName: s.variant.name,
          variantSku: s.variant.sku,
          size: s.variant.size,
          color: s.variant.color,
          quantity: s.quantity,
          reserved: s.reserved,
          available: s.quantity - s.reserved,
          minStock: s.minStock,
          shelfLoc: s.shelfLoc,
          isLowStock: s.quantity - s.reserved < s.minStock,
        })),
      };
    });

    return NextResponse.json({ warehouses: summary });
  } catch (error) {
    console.error("[WAREHOUSE_GET]", error);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}

// ─── POST: Stok hareketi kaydet (Stock Ledger'a yaz + WarehouseStock güncelle) ─

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      variantId,
      warehouseId,
      movementType,
      quantity: rawQty,
      unitCost,
      reference,
      notes,
      performedBy,
      // Transfer için hedef depo
      targetWarehouseId,
    } = body as {
      variantId: string;
      warehouseId: string;
      movementType: MovementType;
      quantity: number;
      unitCost?: number;
      reference?: string;
      notes?: string;
      performedBy?: string;
      targetWarehouseId?: string;
    };

    if (!variantId || !warehouseId || !movementType || rawQty === undefined) {
      return NextResponse.json({ error: "Eksik alan: variantId, warehouseId, movementType, quantity zorunlu" }, { status: 400 });
    }

    // Miktar yönünü hareket tipine göre normalize et
    const isOutbound = ["SALE", "RETURN_OUT", "TRANSFER_OUT"].includes(movementType);
    const quantity = isOutbound ? -Math.abs(rawQty) : Math.abs(rawQty);

    // Transaction: Ledger kaydı + WarehouseStock cache güncellemesi
    const result = await prisma.$transaction(async (tx) => {
      // 1. Ana depodaki WarehouseStock'u upsert et
      const currentStock = await tx.warehouseStock.upsert({
        where: { warehouseId_variantId: { warehouseId, variantId } },
        create: { warehouseId, variantId, quantity: 0, reserved: 0, minStock: 5 },
        update: {},
      });

      // 2. Yeterli stok kontrolü (sadece çıkış işlemlerinde)
      if (isOutbound) {
        const available = currentStock.quantity - currentStock.reserved;
        if (available < Math.abs(quantity)) {
          throw new Error(`Yetersiz stok. Mevcut: ${available}, Talep: ${Math.abs(quantity)}`);
        }
      }

      // 3. StockLedger'a hareket yaz
      const ledgerEntry = await tx.stockLedger.create({
        data: { variantId, warehouseId, movementType, quantity, unitCost, reference, notes, performedBy: performedBy ?? "admin" },
      });

      // 4. WarehouseStock cache'ini güncelle
      await tx.warehouseStock.update({
        where: { warehouseId_variantId: { warehouseId, variantId } },
        data: { quantity: { increment: quantity } },
      });

      // 5. Transfer işleminde hedef depoya da giriş yaz
      if (movementType === "TRANSFER_OUT" && targetWarehouseId) {
        await tx.stockLedger.create({
          data: {
            variantId,
            warehouseId: targetWarehouseId,
            movementType: "TRANSFER_IN",
            quantity: Math.abs(rawQty),
            unitCost,
            reference,
            notes: `${notes ?? ""} (Transfer girişi)`,
            performedBy: performedBy ?? "admin",
          },
        });

        await tx.warehouseStock.upsert({
          where: { warehouseId_variantId: { warehouseId: targetWarehouseId, variantId } },
          create: { warehouseId: targetWarehouseId, variantId, quantity: Math.abs(rawQty), reserved: 0, minStock: 5 },
          update: { quantity: { increment: Math.abs(rawQty) } },
        });
      }

      // 6. Düşük stok uyarısı — bildirim oluştur
      const updatedStock = await tx.warehouseStock.findUnique({
        where: { warehouseId_variantId: { warehouseId, variantId } },
        include: { variant: { include: { product: { select: { name: true } } } }, warehouse: { select: { name: true } } },
      });

      if (updatedStock && (updatedStock.quantity - updatedStock.reserved) < updatedStock.minStock) {
        await tx.notification.create({
          data: {
            type: "LOW_STOCK",
            title: "⚠️ Kritik Stok Seviyesi",
            message: `${updatedStock.variant.product.name} (${updatedStock.variant.name}) — ${updatedStock.warehouse.name} deposunda stok kritik seviyenin altına düştü. Mevcut: ${updatedStock.quantity - updatedStock.reserved} adet`,
            link: `/admin/warehouse`,
          },
        });
      }

      // 7. Product toplam stok cache'ini de güncelle (opsiyonel senkronizasyon)
      const totalAcrossWarehouses = await tx.warehouseStock.aggregate({
        where: { variantId },
        _sum: { quantity: true },
      });
      await tx.productVariant.update({
        where: { id: variantId },
        data: { stock: totalAcrossWarehouses._sum.quantity ?? 0 },
      });

      return { ledgerEntry, newQuantity: updatedStock?.quantity ?? 0 };
    });

    return NextResponse.json({ success: true, ...result });
  } catch (error: any) {
    console.error("[WAREHOUSE_POST]", error);
    const isStockError = error.message?.includes("Yetersiz stok");
    return NextResponse.json(
      { error: error.message ?? "Sunucu hatası" },
      { status: isStockError ? 422 : 500 }
    );
  }
}
