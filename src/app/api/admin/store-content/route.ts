import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: Fetch all blocks for the home page
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

    return NextResponse.json({ success: true, data: page });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Veri çekilemedi" }, { status: 500 });
  }
}

// POST: Sync all blocks (replaces or updates existing ones)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { blocks, customCss } = body; // Expected: Array of block objects [{type, content, order}, ...]

    // 1. Get or create the 'home' page
    const page = await prisma.storePage.upsert({
      where: { slug: "home" },
      update: { title: "Ana Sayfa" },
      create: { title: "Ana Sayfa", slug: "home", type: "HOME" }
    });

    // 2. Delete existing blocks for this page to perform a clean sync
    // (In a more advanced version, we would upsert by ID)
    await prisma.storeBlock.deleteMany({
      where: { pageId: page.id }
    });

    // 3. Create new blocks
    if (blocks && Array.isArray(blocks)) {
      await prisma.storeBlock.createMany({
        data: blocks.map((block: any, index: number) => ({
          pageId: page.id,
          type: block.type,
          order: index,
          content: block.content || {},
          style: block.style || {}
        }))
      });
    }

    // 4. Save Custom CSS globally if provided (using SiteSettings or Page meta)
    if (customCss !== undefined) {
      await prisma.siteSettings.upsert({
        where: { key: "custom_css" },
        update: { value: customCss },
        create: { key: "custom_css", value: customCss }
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Save error:", error);
    return NextResponse.json({ success: false, error: "Kaydedilemedi" }, { status: 500 });
  }
}
