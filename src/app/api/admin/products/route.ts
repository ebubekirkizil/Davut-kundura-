import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

function isAdmin(s: unknown): boolean {
  return (s as { user?: { role?: string } })?.user?.role === "ADMIN";
}

// GET /api/admin/products
export async function GET(req: NextRequest) {
  const session = await auth();
  if (!isAdmin(session)) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const page  = parseInt(searchParams.get("page")  || "1");
  const limit = parseInt(searchParams.get("limit") || "30");
  const search   = searchParams.get("search")   || "";
  const category = searchParams.get("category") || "";
  const status   = searchParams.get("status")   || "";
  const channel  = searchParams.get("channel")  || ""; // "web" | "b2b" | "pos"

  const where: Record<string, unknown> = {};
  if (search) where.OR = [
    { name: { contains: search, mode: "insensitive" } },
    { sku:  { contains: search, mode: "insensitive" } },
  ];
  if (category) where.category = category;
  if (status)   where.status   = status;

  // Kanal filtresi
  if (channel === "web") where.channelVisibility = { showOnWeb: true };
  if (channel === "b2b") where.channelVisibility = { showOnB2B: true };
  if (channel === "pos") where.channelVisibility = { showOnPOS: true };

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        variants: true,
        channelVisibility: true,
        options: { include: { values: true } },
        _count: { select: { orderItems: true, reviews: true } },
      },
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

  const slug = (body.name as string)
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    + "-" + Date.now();

  const product = await prisma.product.create({
    data: {
      name:          body.name,
      slug,
      description:   body.description   || "",
      shortDesc:     body.shortDesc      || null,
      price:         parseFloat(body.price),
      compareAtPrice: body.compareAtPrice ? parseFloat(body.compareAtPrice) : null,
      costPrice:     body.costPrice  ? parseFloat(body.costPrice)  : null,
      category:      body.category   || "OTHER",
      status:        body.status     || "DRAFT",
      vendor:        body.vendor     || "Davut Kundura Atölyesi",
      sku:           body.sku        || null,
      barcode:       body.barcode    || null,
      weight:        body.weight     ? parseFloat(body.weight) : null,
      lowStockAlert: parseInt(body.lowStockAlert) || 5,
      trackInventory: body.trackInventory ?? true,
      allowBackorder: body.allowBackorder ?? false,
      tags:          Array.isArray(body.tags) ? body.tags : (body.tags ? String(body.tags).split(",").map((t: string) => t.trim()).filter(Boolean) : []),
      seoTitle:      body.seoTitle   || null,
      seoDesc:       body.seoDesc    || null,
      seoKeywords:   body.seoKeywords || [],
      imageUrls:     body.imageUrls  || [],

      // Kanal görünürlüğü
      channelVisibility: {
        create: {
          showOnWeb: body.showOnWeb ?? true,
          showOnB2B: body.showOnB2B ?? false,
          showOnPOS: body.showOnPOS ?? false,
        },
      },

      // Varyantlar
      ...(Array.isArray(body.variants) && body.variants.length > 0 ? {
        variants: {
          create: body.variants.map((v: Record<string, unknown>) => ({
            name:      v.name      || "Varsayılan",
            size:      v.size      || null,
            color:     v.color     || null,
            material:  v.material  || null,
            sku:       v.sku       || null,
            barcode:   v.barcode   || null,
            price:     v.price     ? parseFloat(String(v.price))     : null,
            costPrice: v.costPrice ? parseFloat(String(v.costPrice)) : null,
            stock:     parseInt(String(v.stock)) || 0,
            isActive:  true,
          })),
        },
      } : {}),
    },
    include: { variants: true, channelVisibility: true },
  });

  return NextResponse.json(product, { status: 201 });
}

// PATCH /api/admin/products — Toplu güncelleme (Bulk Edit)
export async function PATCH(req: NextRequest) {
  const session = await auth();
  if (!isAdmin(session)) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const { changes } = await req.json();
  // changes: Record<productId, { price?, stock?, status?, costPrice? }>

  const updates = await Promise.all(
    Object.entries(changes as Record<string, Record<string, unknown>>).map(([id, patch]) =>
      prisma.product.update({ where: { id }, data: patch })
    )
  );

  return NextResponse.json({ updated: updates.length });
}
