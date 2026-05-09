import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET: Sayfa verisi yükle (slug ile)
export async function GET(req: NextRequest) {
  try {
    const slug = new URL(req.url).searchParams.get("slug") ?? "home"
    const page = await prisma.storePage.findUnique({
      where: { slug },
      include: { blocks: { orderBy: { order: "asc" } } },
    })
    if (!page) return NextResponse.json({ page: null })
    // blocks → sections dönüşümü
    const sections = page.blocks.map((b) => ({
      id: b.id,
      type: b.type,
      settings: (b.content as Record<string, any>)?.settings ?? {},
      blocks: (b.content as Record<string, any>)?.blocks ?? [],
    }))
    return NextResponse.json({ page: { ...page, sections } })
  } catch (error) {
    console.error("[PAGE_BUILDER_GET]", error)
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 })
  }
}

// POST: Sayfa verisi kaydet
export async function POST(req: NextRequest) {
  try {
    const { slug, title, sections } = await req.json() as {
      slug: string; title?: string; sections: any[]
    }
    if (!slug || !sections) {
      return NextResponse.json({ error: "slug ve sections zorunlu" }, { status: 400 })
    }
    // Upsert page
    const page = await prisma.storePage.upsert({
      where: { slug },
      create: { slug, title: title ?? slug, type: "HOME", isPublished: true },
      update: { title: title ?? undefined },
    })
    // Eski blokları sil, yenilerini yaz (atomic)
    await prisma.$transaction([
      prisma.storeBlock.deleteMany({ where: { pageId: page.id } }),
      ...sections.map((sec: any, idx: number) =>
        prisma.storeBlock.create({
          data: {
            pageId: page.id,
            type: sec.type,
            order: idx,
            content: { settings: sec.settings, blocks: sec.blocks ?? [] },
            style: {},
          },
        })
      ),
    ])
    return NextResponse.json({ success: true, pageId: page.id })
  } catch (error) {
    console.error("[PAGE_BUILDER_POST]", error)
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 })
  }
}
