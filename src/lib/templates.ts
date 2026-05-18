import { PageData, GlobalTheme } from "@/store/useBuilderStore";

export interface Template {
  id: string;
  name: string;
  description: string;
  category: "Klasik" | "Modern" | "Koyu" | "Açık" | "Spor";
  theme: GlobalTheme;
  sections: PageData["sections"];
}

export const TEMPLATES: Template[] = [
  {
    id: "heritage-modernist",
    name: "Heritage Modernist",
    description: "Koyu ve zarif; premium deri işçiliğini vurgulayan lüks tasarım.",
    category: "Koyu",
    theme: {
      primaryColor: "#0f0e0d",
      secondaryColor: "#1a1816",
      accentColor: "#d4af37", // Altın sarısı
      bgColor: "#0a0a0a",
      textColor: "#f5f5f5",
      fontHeading: "Cinzel",
      fontBody: "Inter",
      borderRadius: 4,
    },
    sections: [
      {
        id: "header-1",
        type: "header",
        settings: { logoText: "DAVUT KUNDURA", logoSize: 24, sticky: true },
        blocks: [
          { id: "h1", type: "menu_item", settings: { label: "KOLEKSİYON", link: "/koleksiyon" } },
          { id: "h2", type: "menu_item", settings: { label: "HİKAYEMİZ", link: "/hikaye" } },
        ]
      },
      {
        id: "hero-1",
        type: "hero",
        settings: { 
          title: "Zanaatın Geleceği", 
          subtitle: "Pendik'te Yarım Asırlık Ustalık", 
          buttonText: "Keşfet", 
          alignment: "center",
          image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2000&auto=format&fit=crop"
        },
        blocks: []
      },
      {
        id: "cat-1",
        type: "categoryGrid",
        settings: { title: "Koleksiyonlar", subtitle: "Özel el işçiliği" },
        blocks: [
          { id: "c1", type: "category_item", settings: { title: "Klasik Ayakkabılar", image: "https://images.unsplash.com/photo-1614252339476-53784e0bf8dd?q=80&w=800&auto=format&fit=crop" } },
          { id: "c2", type: "category_item", settings: { title: "Deri Kemerler", image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=800&auto=format&fit=crop" } },
          { id: "c3", type: "category_item", settings: { title: "Ortopedik Çözümler", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop" } },
        ]
      }
    ]
  },
  {
    id: "minimalist-zanaatkar",
    name: "Minimalist Zanaatkar",
    description: "Sade, ferah ve tamamen ürüne odaklanan açık renkli modern tema.",
    category: "Açık",
    theme: {
      primaryColor: "#ffffff",
      secondaryColor: "#f7f7f7",
      accentColor: "#111111", 
      bgColor: "#ffffff",
      textColor: "#222222",
      fontHeading: "Inter",
      fontBody: "Inter",
      borderRadius: 12,
    },
    sections: [
      {
        id: "header-2",
        type: "header",
        settings: { logoText: "DAVUT", logoSize: 20, sticky: false },
        blocks: []
      },
      {
        id: "hero-2",
        type: "hero",
        settings: { 
          title: "Sade & Zamansız", 
          subtitle: "En kaliteli materyallerle üretildi.", 
          buttonText: "Alışverişe Başla", 
          alignment: "left",
          image: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?q=80&w=2000&auto=format&fit=crop"
        },
        blocks: []
      }
    ]
  },
  {
    id: "dinamik-spor",
    name: "Dinamik Spor",
    description: "Ortopedik ve aktif yaşam ürünleri için canlı ve hareketli tasarım.",
    category: "Spor",
    theme: {
      primaryColor: "#050505",
      secondaryColor: "#111111",
      accentColor: "#ff4500", // Dinamik turuncu
      bgColor: "#000000",
      textColor: "#ffffff",
      fontHeading: "Outfit",
      fontBody: "Inter",
      borderRadius: 0,
    },
    sections: [
      {
        id: "header-3",
        type: "header",
        settings: { logoText: "DAVUT ACTIVE", logoSize: 28, sticky: true },
        blocks: []
      },
      {
        id: "hero-3",
        type: "hero",
        settings: { 
          title: "Harekete Geç", 
          subtitle: "Maksimum konfor için ortopedik destek.", 
          buttonText: "Ürünleri Gör", 
          alignment: "center",
          image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2000&auto=format&fit=crop"
        },
        blocks: []
      }
    ]
  },
  {
    id: "klasik-giyim",
    name: "Klasik Giyim",
    description: "Kahve ve toprak tonlarıyla geleneksel, nostaljik ve ağırbaşlı.",
    category: "Klasik",
    theme: {
      primaryColor: "#3e2723",
      secondaryColor: "#4e342e",
      accentColor: "#d7ccc8", 
      bgColor: "#efebe9",
      textColor: "#3e2723",
      fontHeading: "Playfair Display",
      fontBody: "Inter",
      borderRadius: 8,
    },
    sections: [
      {
        id: "hero-4",
        type: "hero",
        settings: { 
          title: "Klasik Çizgiler", 
          subtitle: "Geçmişten gelen zarafet.", 
          buttonText: "İncele", 
          alignment: "center",
          image: "https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=2000&auto=format&fit=crop"
        },
        blocks: []
      }
    ]
  },
  {
    id: "luks-butik",
    name: "Lüks Butik",
    description: "Altın detaylı, siyah ağırlıklı ultra-premium butik görünümü.",
    category: "Koyu",
    theme: {
      primaryColor: "#000000",
      secondaryColor: "#111111",
      accentColor: "#cda434", // Premium gold
      bgColor: "#050505",
      textColor: "#f9f9f9",
      fontHeading: "Cinzel",
      fontBody: "Inter",
      borderRadius: 0,
    },
    sections: [
      {
        id: "hero-5",
        type: "hero",
        settings: { title: "Exclusive Koleksiyon", subtitle: "Sadece en iyisini arayanlara özel.", buttonText: "Koleksiyona Git", alignment: "center" },
        blocks: []
      }
    ]
  },
  {
    id: "naturel-toprak",
    name: "Naturel Toprak",
    description: "Doğal malzemeleri öne çıkaran yeşil ve bej tonları.",
    category: "Açık",
    theme: {
      primaryColor: "#f1f0ea",
      secondaryColor: "#e5e3da",
      accentColor: "#556b2f", // Koyu zeytin yeşili
      bgColor: "#f8f7f4",
      textColor: "#2c302e",
      fontHeading: "Outfit",
      fontBody: "Inter",
      borderRadius: 16,
    },
    sections: [
      {
        id: "hero-6",
        type: "hero",
        settings: { title: "Doğadan İlham Aldık", subtitle: "%100 doğal materyaller.", buttonText: "Keşfet", alignment: "left" },
        blocks: []
      }
    ]
  },
  {
    id: "premium-elite",
    name: "Premium Elite",
    description: "Tamamen koyu mod, gümüş ve krom detaylı endüstriyel şıklık.",
    category: "Koyu",
    theme: {
      primaryColor: "#09090b",
      secondaryColor: "#18181b",
      accentColor: "#e4e4e7", // Krom/Gümüş
      bgColor: "#000000",
      textColor: "#ffffff",
      fontHeading: "Inter",
      fontBody: "Inter",
      borderRadius: 4,
    },
    sections: [
      {
        id: "hero-7",
        type: "hero",
        settings: { title: "Kusursuz Tasarım", subtitle: "Tavizsiz kalite.", buttonText: "Satın Al", alignment: "center" },
        blocks: []
      }
    ]
  },
  {
    id: "retro-90s",
    name: "Retro 90s",
    description: "Vintage hissi veren, kalın kenarlıklı renkli tasarım.",
    category: "Modern",
    theme: {
      primaryColor: "#fffbeb",
      secondaryColor: "#fef3c7",
      accentColor: "#2563eb", // Retro mavi
      bgColor: "#ffffff",
      textColor: "#1e3a8a",
      fontHeading: "Outfit",
      fontBody: "Inter",
      borderRadius: 0,
    },
    sections: [
      {
        id: "hero-8",
        type: "hero",
        settings: { title: "90'lar Ruhu", subtitle: "Eski günlerin dayanıklılığı.", buttonText: "Göz At", alignment: "center" },
        blocks: []
      }
    ]
  },
  {
    id: "gelecegin-yuruyusu",
    name: "Geleceğin Yürüyüşü",
    description: "Neon detaylı, teknolojik, ortopedik analiz odaklı.",
    category: "Spor",
    theme: {
      primaryColor: "#020617",
      secondaryColor: "#0f172a",
      accentColor: "#06b6d4", // Neon cyan
      bgColor: "#020617",
      textColor: "#f8fafc",
      fontHeading: "Outfit",
      fontBody: "Inter",
      borderRadius: 24,
    },
    sections: [
      {
        id: "hero-9",
        type: "hero",
        settings: { title: "Adımlarınızı Analiz Edin", subtitle: "Yeni nesil ortopedi teknolojisi.", buttonText: "Randevu Al", alignment: "center" },
        blocks: []
      }
    ]
  },
  {
    id: "aydinlik-vitrin",
    name: "Aydınlık Vitrin",
    description: "Sıfır dikkat dağıtıcı, tamamen fotoğraflara odaklanan galeri tipi.",
    category: "Açık",
    theme: {
      primaryColor: "#ffffff",
      secondaryColor: "#fafafa",
      accentColor: "#000000",
      bgColor: "#ffffff",
      textColor: "#000000",
      fontHeading: "Playfair Display",
      fontBody: "Inter",
      borderRadius: 0,
    },
    sections: [
      {
        id: "hero-10",
        type: "hero",
        settings: { title: "Saf Güzellik", subtitle: "Odak noktası sadece ürün.", buttonText: "Koleksiyon", alignment: "left" },
        blocks: []
      }
    ]
  }
];
