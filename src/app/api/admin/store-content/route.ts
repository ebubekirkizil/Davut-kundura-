import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Check if the home page exists
    let homePage = await prisma.storePage.findUnique({
      where: { slug: "home" },
      include: { blocks: true },
    });

    if (!homePage) {
       return NextResponse.json({ 
         success: true, 
         data: {
           title: "Davut Kundura",
           blocks: []
         }
       });
    }

    return NextResponse.json({ success: true, data: homePage });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Veriler alınamadı" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { heroTitle, heroSubtitle, buttonText, buttonLink, customCss } = body;

    // Create or update the 'home' page
    const page = await prisma.storePage.upsert({
      where: { slug: "home" },
      update: { title: "Ana Sayfa" },
      create: {
        slug: "home",
        title: "Ana Sayfa",
        isPublished: true,
      }
    });

    // We will save the Hero data as a StoreBlock
    // First, clear existing Hero block for home page
    await prisma.storeBlock.deleteMany({
      where: { pageId: page.id, type: "Hero" }
    });

    // Create new Hero block
    await prisma.storeBlock.create({
      data: {
        pageId: page.id,
        type: "Hero",
        order: 1,
        content: {
          heroTitle: heroTitle || "İtalyan Zarafeti, Davut Kundura İmzası",
          heroSubtitle: heroSubtitle || "1998'den beri el işçiliği ile üretilen premium koleksiyon.",
          buttonText: buttonText || "Koleksiyonu İncele",
          buttonLink: buttonLink || "/products",
          customCss: customCss || ""
        },
        style: {}
      }
    });

    return NextResponse.json({ success: true, message: "Canlı site güncellendi!" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
