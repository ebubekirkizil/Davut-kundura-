import { prisma } from "@/lib/prisma";
import StorefrontRenderer from "@/components/builder/StorefrontRenderer";

// Her istekte dinamik olarak render et
export const dynamic = "force-dynamic";

export default async function ShopHome() {
  let blocks: any[] = [];
  let customCss: string = "";

  try {
    const [pageRes, settingsRes] = await Promise.all([
      prisma.storePage.findUnique({
        where: { slug: "home" },
        include: {
          blocks: {
            orderBy: { order: "asc" }
          }
        }
      }),
      prisma.siteSettings.findUnique({
        where: { key: "custom_css" }
      })
    ]);
    
    if (pageRes && pageRes.blocks) {
      blocks = pageRes.blocks;
    }
    
    if (settingsRes) {
      customCss = settingsRes.value;
    }

    // Fetch featured products for the renderer
    const products = await prisma.product.findMany({
      take: 8,
      orderBy: { createdAt: "desc" }
    });

    return (
      <div className="flex flex-col pb-0 bg-[#fbfaf9] overflow-hidden">
        {/* Dynamic Style Injection for Saved CSS */}
        {customCss && <style dangerouslySetInnerHTML={{ __html: customCss }} />}
        
        {/* Universal Renderer for Multi-Block CMS */}
        <StorefrontRenderer initialBlocks={blocks} products={products} />

      {/* Marquee Banner (Sticky Legacy Part) */}
      <div className="bg-[#1a120b] py-4 border-y border-white/10 overflow-hidden whitespace-nowrap flex relative">
        <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-[#1a120b] to-transparent z-10" />
        <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-[#1a120b] to-transparent z-10" />
        
        <div className="animate-marquee flex gap-12 items-center text-[#d4af37]/60 text-xs md:text-sm font-medium tracking-[0.2em] uppercase">
          <span>%100 Hakiki Deri</span>
          <span>•</span>
          <span>El İşçiliği</span>
          <span>•</span>
          <span>Premium Kalite</span>
          <span>•</span>
          <span>Ücretsiz Kargo</span>
          <span>•</span>
          <span>%100 Hakiki Deri</span>
          <span>•</span>
          <span>El İşçiliği</span>
          <span>•</span>
          <span>Premium Kalite</span>
          <span>•</span>
          <span>Ücretsiz Kargo</span>
          <span>•</span>
          <span>%100 Hakiki Deri</span>
          <span>•</span>
          <span>El İşçiliği</span>
          <span>•</span>
          <span>Premium Kalite</span>
          <span>•</span>
          <span>Ücretsiz Kargo</span>
        </div>
      </div>
    </div>
  );
}
