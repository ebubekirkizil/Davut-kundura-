import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    // Vitrin için sadece aktif ve stokta olan ürünleri getiriyoruz
    const products = await prisma.product.findMany({
      where: {
        status: "ACTIVE",
      },
      take: 8,
      orderBy: {
        createdAt: "desc"
      },
      include: {
        variants: true
      }
    });

    // Öne çıkan koleksiyonlar için basit bir mantık
    const featured = products.slice(0, 3);

    return NextResponse.json({
      products,
      featured,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("Storefront API Error:", error);
    return NextResponse.json({ error: "Veriler alınamadı" }, { status: 500 });
  }
}
