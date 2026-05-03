import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: Fetch page sections from builder format
export async function GET() {
  try {
    const page = await prisma.storePage.findUnique({
      where: { slug: "home" },
      include: {
        blocks: {
          orderBy: { order: "asc" }
        }
      }
    });

    if (!page) {
      return NextResponse.json({ success: true, sections: [] });
    }

    // Convert StoreBlocks back to builder format
    const sections = page.blocks.map(block => ({
      id: block.id,
      type: block.type,
      settings: (block.content as any)?.settings || {},
      blocks: (block.content as any)?.blocks || []
    }));

    return NextResponse.json({ success: true, sections });
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json({ success: false, error: "Veri çekilemedi" }, { status: 500 });
  }
}

// POST: Save builder sections (Builder format: pages.index.sections)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { pages, themeSettings } = body;

    // Extract sections from builder format
    const sections = pages?.index?.sections || [];

    // 1. Get or create the 'home' page
    const page = await prisma.storePage.upsert({
      where: { slug: "home" },
      update: {
        title: "Ana Sayfa",
        isPublished: true
      },
      create: {
        title: "Ana Sayfa",
        slug: "home",
        type: "HOME",
        isPublished: true
      }
    });

    // 2. Delete existing blocks for clean sync
    await prisma.storeBlock.deleteMany({
      where: { pageId: page.id }
    });

    // 3. Create new blocks from builder sections
    if (sections && Array.isArray(sections)) {
      await prisma.storeBlock.createMany({
        data: sections.map((section: any, index: number) => ({
          pageId: page.id,
          type: section.type,
          order: index,
          content: {
            settings: section.settings || {},
            blocks: section.blocks || []
          },
          style: {}
        }))
      });
    }

    // 4. Save theme settings
    if (themeSettings) {
      await prisma.siteSettings.upsert({
        where: { key: "theme_settings" },
        update: { value: JSON.stringify(themeSettings) },
        create: { key: "theme_settings", value: JSON.stringify(themeSettings) }
      });
    }

    return NextResponse.json({
      success: true,
      message: "Sayfa başarıyla kaydedildi",
      sectionsCount: sections.length
    });
  } catch (error) {
    console.error("Save error:", error);
    return NextResponse.json({
      success: false,
      error: "Kaydedilemedi: " + (error as Error).message
    }, { status: 500 });
  }
}
