import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

function isAdmin(session: any) {
  return session?.user?.role === "ADMIN";
}

// GET /api/admin/products/[id]
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!isAdmin(session)) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const product = await prisma.product.findUnique({
    where: { id: params.id },
    include: {
      variants: true,
      inventory: { orderBy: { createdAt: "desc" }, take: 20 },
      reviews: { include: { user: { select: { name: true } } } },
      _count: { select: { orderItems: true } },
    },
  });

  if (!product) return NextResponse.json({ error: "Ürün bulunamadı" }, { status: 404 });
  return NextResponse.json(product);
}

// PATCH /api/admin/products/[id] — Ürünü güncelle
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!isAdmin(session)) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const body = await req.json();
  const oldProduct = await prisma.product.findUnique({ where: { id: params.id } });
  if (!oldProduct) return NextResponse.json({ error: "Ürün bulunamadı" }, { status: 404 });

  const product = await prisma.product.update({
    where: { id: params.id },
    data: {
      ...(body.name && { name: body.name }),
      ...(body.description !== undefined && { description: body.description }),
      ...(body.shortDesc !== undefined && { shortDesc: body.shortDesc }),
      ...(body.price !== undefined && { price: parseFloat(body.price) }),
      ...(body.compareAtPrice !== undefined && { compareAtPrice: body.compareAtPrice ? parseFloat(body.compareAtPrice) : null }),
      ...(body.costPrice !== undefined && { costPrice: body.costPrice ? parseFloat(body.costPrice) : null }),
      ...(body.category && { category: body.category }),
      ...(body.status && { status: body.status }),
      ...(body.sku !== undefined && { sku: body.sku }),
      ...(body.barcode !== undefined && { barcode: body.barcode }),
      ...(body.tags !== undefined && { tags: body.tags }),
      ...(body.imageUrls !== undefined && { imageUrls: body.imageUrls }),
      ...(body.lowStockAlert !== undefined && { lowStockAlert: parseInt(body.lowStockAlert) }),
      ...(body.weight !== undefined && { weight: body.weight ? parseFloat(body.weight) : null }),
      ...(body.trackInventory !== undefined && { trackInventory: body.trackInventory }),
      ...(body.allowBackorder !== undefined && { allowBackorder: body.allowBackorder }),
    },
  });

  // Stok değişti ise envanter kaydı yaz
  if (body.stock !== undefined && parseInt(body.stock) !== oldProduct.stock) {
    const diff = parseInt(body.stock) - oldProduct.stock;
    await prisma.$transaction([
      prisma.product.update({ where: { id: params.id }, data: { stock: parseInt(body.stock) } }),
      prisma.inventoryTransaction.create({
        data: {
          productId: params.id,
          quantity: diff,
          type: diff > 0 ? "IN" : "OUT",
          notes: "Admin manuel düzeltme",
          createdBy: session?.user?.name || "Admin",
        },
      }),
    ]);
  }

  return NextResponse.json(product);
}

// DELETE /api/admin/products/[id]
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!isAdmin(session)) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  // Soft delete — arşivle
  const product = await prisma.product.update({
    where: { id: params.id },
    data: { status: "ARCHIVED" },
  });

  return NextResponse.json({ success: true, product });
}
