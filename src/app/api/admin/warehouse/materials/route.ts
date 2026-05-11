import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

function isAdmin(session: any) {
  return session?.user?.role === "ADMIN";
}

// GET /api/admin/warehouse/materials - Hammaddeleri listele
export async function GET(req: NextRequest) {
  const session = await auth();
  if (!isAdmin(session)) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") || "";
  const search = searchParams.get("search") || "";

  const where: any = {};
  if (category && category !== "Tümü") {
    // Burada kategori mantığı raw material modeline göre filtrelenebilir
    // Şimdilik isimde arama yapalım veya supplier üzerinden
    where.name = { contains: category, mode: "insensitive" };
  }
  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { sku: { contains: search, mode: "insensitive" } },
    ];
  }

  try {
    const materials = await prisma.rawMaterial.findMany({
      where,
      include: {
        supplier: { select: { name: true } }
      },
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json({ materials });
  } catch (error) {
    console.error("[MATERIALS_GET]", error);
    return NextResponse.json({ error: "Veriler alınamadı" }, { status: 500 });
  }
}

// POST /api/admin/warehouse/materials - Yeni hammadde ekle
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!isAdmin(session)) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  try {
    const body = await req.json();
    const { name, sku, unit, stockQty, costPerUnit, supplierId } = body;

    const material = await prisma.rawMaterial.create({
      data: {
        name,
        sku,
        unit,
        stockQty: parseFloat(stockQty) || 0,
        costPerUnit: parseFloat(costPerUnit) || 0,
        supplierId
      }
    });

    return NextResponse.json(material, { status: 201 });
  } catch (error) {
    console.error("[MATERIALS_POST]", error);
    return NextResponse.json({ error: "Kaydedilemedi" }, { status: 500 });
  }
}
