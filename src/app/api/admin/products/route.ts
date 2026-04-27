import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

function isAdmin(session: any) {
  return session?.user?.role === "ADMIN";
}

// GET /api/admin/products — Tüm ürünleri getir
export async function GET(req: NextRequest) {
  const session = await auth();
  if (!isAdmin(session)) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";

  const where: any = {};
  if (search) where.OR = [
    { name: { contains: search, mode: "insensitive" } },
    { sku: { contains: search, mode: "insensitive" } },
  ];
  if (category) where.category = category;

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: { variants: true, _count: { select: { orderItems: true } } },
    }),
    prisma.product.count({ where }),
  ]);

  return NextResponse.json({ products, total, page, limit });
}

// POST /api/admin/products — Yeni ürün oluştur
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!isAdmin(session)) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const body = await req.json();
  const slug = body.name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    + "-" + Date.now();

  const product = await prisma.product.create({
    data: {
      name: body.name,
      slug,
      description: body.description || "",
      shortDesc: body.shortDesc,
      price: parseFloat(body.price),
      compareAtPrice: body.compareAtPrice ? parseFloat(body.compareAtPrice) : null,
      costPrice: body.costPrice ? parseFloat(body.costPrice) : null,
      category: body.category || "OTHER",
      status: body.status || "ACTIVE",
      sku: body.sku,
      barcode: body.barcode,
      vendor: body.vendor,
      tags: body.tags || [],
      imageUrls: body.imageUrls || [],
      stock: parseInt(body.stock) || 0,
      lowStockAlert: parseInt(body.lowStockAlert) || 5,
      weight: body.weight ? parseFloat(body.weight) : null,
      trackInventory: body.trackInventory ?? true,
      allowBackorder: body.allowBackorder ?? false,
    },
  });

  // Stok giriş kaydı oluştur
  if (product.stock > 0) {
    await prisma.inventoryTransaction.create({
      data: {
        productId: product.id,
        quantity: product.stock,
        type: "IN",
        notes: "İlk stok girişi",
        createdBy: session?.user?.name || "Admin",
      },
    });
  }

  return NextResponse.json(product, { status: 201 });
}
