import { prisma } from "@/lib/prisma";
import StorefrontRenderer from "@/components/builder/StorefrontRenderer";

// Her istekte dinamik olarak render et
export const dynamic = "force-dynamic";

export default async function ShopHome() {
  let sections: any[] = [];

  try {
    // Veritabanından sections'ları çek
    const page = await prisma.storePage.findUnique({
      where: { slug: "home" },
      include: {
        blocks: {
          orderBy: { order: "asc" }
        }
      }
    });

    if (page && page.blocks) {
      // StoreBlocks'u builder formatına çevir
      sections = page.blocks.map(block => ({
        id: block.id,
        type: block.type,
        settings: (block.content as any)?.settings || {},
        blocks: (block.content as any)?.blocks || []
      }));
    }
  } catch (error) {
    console.error("Veriler yüklenemedi:", error);
  }

  // Eğer veri tabanı boşsa, varsayılan lüks tasarım göster
  if (sections.length === 0) {
    sections = [
      {
        id: "header-default",
        type: "header",
        settings: { logoText: "DAVUT KUNDURA", logoSize: 28, sticky: true },
        blocks: [
          { id: "m1", type: "menu_item", settings: { label: "KOLEKSİYONLAR", link: "/products" } },
          { id: "m2", type: "menu_item", settings: { label: "HAKKIMIZDA", link: "/about" } },
          { id: "m3", type: "menu_item", settings: { label: "İLETİŞİM", link: "/contact" } }
        ]
      },
      {
        id: "hero-default",
        type: "hero",
        settings: {
          title: "Zanaatın Yeni Yüzü",
          subtitle: "Pendik'te yarım asırlık deri ustalığı, modern estetikle yeniden doğuyor.",
          buttonText: "KEŞFETMEYE BAŞLA",
          alignment: "center"
        },
        blocks: []
      },
      {
        id: "rich-default",
        type: "richText",
        settings: {
          title: "Bir Adımdan Fazlası",
          content: "Her dikişinde bir hikaye, her derisinde bir ömürlük kalite. Davut Kundura, sadece ayakkabı değil, bir yaşam tarzı sunar."
        },
        blocks: []
      },
      {
        id: "cat-grid-default",
        type: "categoryGrid",
        settings: {
          title: "SEÇKİN ÜRÜN GRUPLARI",
          subtitle: "Her detayda mükemmellik arayanlar için özel olarak tasarlandı."
        },
        blocks: [
          { id: "c1", type: "category_item", settings: { title: "Premium Kemerler", image: "", link: "/products?category=belts" } },
          { id: "c2", type: "category_item", settings: { title: "Ortopedik Çözümler", image: "", link: "/products?category=insoles" } },
          { id: "c3", type: "category_item", settings: { title: "Bakım Aksesuarları", image: "", link: "/products?category=care" } }
        ]
      },
      {
        id: "footer-default",
        type: "footer",
        settings: {
          topBarText: "PENDİK DAVUT KUNDURA • PREMIUM LEATHER CRAFTSMANSHIP • EST. 1980",
          backgroundColor: "#1a1a1a"
        },
        blocks: [
          {
            id: "fb1",
            type: "footer_text",
            settings: {
              title: "VİZYONUMUZ",
              content: "Pendik'teki atölyemizde, geleneksel yöntemleri modern teknolojiyle birleştirerek size en iyisini sunuyoruz."
            }
          },
          {
            id: "fb2",
            type: "footer_contact",
            settings: {
              title: "BİZE ULAŞIN",
              address: "Doğu Mah. Pendik, İstanbul",
              phone: "+90 538 625 87 92"
            }
          }
        ]
      }
    ];
  }

  return (
    <div className="flex flex-col pb-0 bg-[var(--bg-primary)] overflow-hidden">
      <StorefrontRenderer initialSections={sections} />
    </div>
  );
}
