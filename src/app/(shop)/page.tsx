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
        settings: { logoText: "DAVUT KUNDURA", logoSize: 32, sticky: true },
        blocks: [
          { id: "m1", type: "menu_item", settings: { label: "KOLEKSİYONLAR", link: "/urunler" } },
          { id: "m2", type: "menu_item", settings: { label: "ZANAAT HİKAYEMİZ", link: "/bakim" } },
          { id: "m3", type: "menu_item", settings: { label: "ATÖLYE & İLETİŞİM", link: "/iletisim" } }
        ]
      },
      {
        id: "hero-1",
        type: "hero",
        settings: { 
          title: "Zanaatın Yeni Yüzü", 
          subtitle: "Pendik'te yarım asırlık deri ustalığı, modern estetikle yeniden doğuyor.", 
          buttonText: "KEŞFETMEYE BAŞLA" 
        }
      },
      {
        id: "rich-1",
        type: "richText",
        settings: { 
          title: "Bir Adımdan Fazlası", 
          content: "Her dikişinde bir hikaye, her derisinde bir ömürlük kalite. Davut Kundura, sadece ayakkabı değil, bir yaşam tarzı sunar." 
        }
      },
      {
        id: "cat-grid-1",
        type: "categoryGrid",
        settings: { title: "SEÇKİN ÜRÜN GRUPLARI", subtitle: "Her detayda mükemmellik arayanlar için özel olarak tasarlandı." },
        blocks: [
          { id: "c1", type: "category_item", settings: { title: "Premium Kemerler" } },
          { id: "c2", type: "category_item", settings: { title: "Ortopedik Çözümler" } },
          { id: "c3", type: "category_item", settings: { title: "Bakım Aksesuarları" } }
        ]
      },
      {
        id: "footer-1",
        type: "footer",
        settings: { topBarText: "PENDİK DAVUT KUNDURA • PREMIUM LEATHER CRAFTSMANSHIP • EST. 1980" },
        blocks: [
          { id: "fb1", type: "footer_text", settings: { title: "VİZYONUMUZ", content: "Pendik'teki atölyemizde, geleneksel yöntemleri modern teknolojiyle birleştirerek size en iyisini sunuyoruz." } },
          { id: "fb2", type: "footer_contact", settings: { title: "BİZE ULAŞIN", address: "Doğu Mah. Pendik, İstanbul", phone: "+90 538 625 87 92" } }
        ]
      }
    ];
  }

  return (
    <div className="flex flex-col pb-0 bg-[var(--bg-primary)] overflow-hidden">
      {customCss && <style dangerouslySetInnerHTML={{ __html: customCss }} />}
      <StorefrontRenderer initialSections={blocks} />
    </div>
  );
}
