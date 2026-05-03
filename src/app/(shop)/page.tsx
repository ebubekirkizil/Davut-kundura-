import { prisma } from "@/lib/prisma";
import StorefrontRenderer from "@/components/builder/StorefrontRenderer";

// Her istekte dinamik olarak render et
export const dynamic = "force-dynamic";

export default async function ShopHome() {
  let blocks: any[] = [];
  let customCss: string = "";
  let products: any[] = [];

  try {
    const [pageRes, settingsRes, productsRes] = await Promise.all([
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
      }),
      prisma.product.findMany({
        take: 8,
        orderBy: { createdAt: "desc" }
      })
    ]);
    
    if (pageRes && pageRes.blocks) {
      blocks = pageRes.blocks;
    }
    
    if (settingsRes) {
      customCss = settingsRes.value;
    }

    if (productsRes) {
      products = productsRes;
    }
  } catch (error) {
    console.error("Veriler yüklenemedi:", error);
  }

  // Eğer veri tabanı boşsa, lüks ve dolu bir tasarım göster
  if (blocks.length === 0) {
    blocks = [
      {
        id: "header-1",
        type: "header",
        settings: { logoText: "DAVUT KUNDURA", logoSize: 24, sticky: true },
        blocks: [
          { id: "m1", type: "menu_item", settings: { label: "ÜRÜNLER", link: "/urunler" } },
          { id: "m2", type: "menu_item", settings: { label: "BAKIM SERVİSİ", link: "/bakim" } },
          { id: "m3", type: "menu_item", settings: { label: "PENDİK MAĞAZA", link: "/iletisim" } }
        ]
      },
      {
        id: "hero-1",
        type: "hero",
        settings: { 
          title: "Zanaatın Geleceği", 
          subtitle: "Pendik'te Geleneksel Deri İşçiliği ve Profesyonel Bakım", 
          buttonText: "KATALOGLARI GÖR" 
        }
      },
      {
        id: "cat-grid-1",
        type: "categoryGrid",
        settings: { title: "ÜRÜN GRUPLARIMIZ", subtitle: "Zanaat ve Kalitenin Buluştuğu Nokta" },
        blocks: [
          { id: "c1", type: "category_item", settings: { title: "Hakiki Deri Kemerler" } },
          { id: "c2", type: "category_item", settings: { title: "Ortopedik Tabanlıklar" } },
          { id: "c3", type: "category_item", settings: { title: "Ayakkabı Bakım Ürünleri" } }
        ]
      },
      {
        id: "footer-1",
        type: "footer",
        settings: { topBarText: "PENDİK DAVUT KUNDURA • EL İŞÇİLİĞİ" },
        blocks: [
          { id: "fb1", type: "footer_text", settings: { title: "DAVUT KUNDURA", content: "Pendik'teki güvenilir zanaat ortağınız." } },
          { id: "fb2", type: "footer_contact", settings: { title: "BİZE ULAŞIN", address: "Pendik, İstanbul", phone: "+90 538 625 87 92" } }
        ]
      }
    ];
  }

  return (
    <div className="flex flex-col pb-0 bg-[#fbfaf9] overflow-hidden">
      {customCss && <style dangerouslySetInnerHTML={{ __html: customCss }} />}
      <StorefrontRenderer initialSections={blocks} />

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
