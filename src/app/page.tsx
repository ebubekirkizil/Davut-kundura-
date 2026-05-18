import { createClient } from "@supabase/supabase-js"
import StorefrontRenderer from "@/components/builder/StorefrontRenderer"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

// Rich default page with all major sections filled
const DEFAULT_INDEX_SECTIONS = [
  {
    id: "header-1",
    type: "header",
    settings: { logoText: "Davut Kundura", logoSize: 26, sticky: true, bgColor: "var(--bg-primary)", textColor: "var(--text-primary)" },
    blocks: [
      { id: "h-b-1", type: "menu_item", settings: { label: "Ana Sayfa", link: "/" } },
      { id: "h-b-2", type: "menu_item", settings: { label: "Ürünler", link: "/products" } },
      { id: "h-b-3", type: "menu_item", settings: { label: "Bakım", link: "/products?cat=bakim" } },
    ],
  },
  {
    id: "announcement-1",
    type: "announcementBar",
    settings: {
      text: "🎉 Tüm siparişlerde ÜCRETSİZ KARGO — Aynı gün kargo saat 14:00'e kadar!",
      bgColor: "#C8A96E",
      textColor: "#12100E",
      dismissible: true,
    },
    blocks: [],
  },
  {
    id: "hero-1",
    type: "hero",
    settings: {
      title: "Premium Deri\nİşçiliğinde Ustalık",
      subtitle: "40 yıllık deneyimle el işçiliği deri kemerler, ortopedik tabanlar ve profesyonel ayakkabı bakım ürünleri. Pendik'te güvenilir adresiniz.",
      buttonText: "Koleksiyonu Keşfet",
      buttonLink: "/products",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop",
      badgeText: "★ Pendik'in En İyi Kundura Ustası",
      alignment: "left",
    },
    blocks: [],
  },
  {
    id: "trust-1",
    type: "trustBadges",
    settings: { paddingY: 56 },
    blocks: [],
  },
  {
    id: "category-grid-1",
    type: "categoryGrid",
    settings: {
      title: "Ürün Kategorileri",
      subtitle: "El İşçiliği & Zanaat",
      columns: 3,
      paddingY: 100,
    },
    blocks: [
      { id: "cat-1", type: "category_item", settings: { title: "Klasik Ayakkabılar", description: "El yapımı, deri tabanlı zarafet", image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=800&auto=format&fit=crop", link: "/products" } },
      { id: "cat-2", type: "category_item", settings: { title: "Hakiki Deri Kemerler", description: "Saf deri, özenli işçilik", image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=800&auto=format&fit=crop", link: "/products" } },
      { id: "cat-3", type: "category_item", settings: { title: "Ortopedik Tabanlıklar", description: "Sağlıklı yürüyüş için destek", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop", link: "/products" } },
    ],
  },
  {
    id: "marquee-1",
    type: "marquee",
    settings: {
      text: "EL İŞÇİLİĞİ • HAKİKİ DERİ • ORTOPEDİK TABANLIK • ÜCRETSİZ KARGO • AYAKKABI TAMİRİ • DERİ BOYAMA • PENDİK'TE 40 YIL •",
      bgColor: "#12100E",
      textColor: "#C8A96E",
      speed: 30,
    },
    blocks: [],
  },
  {
    id: "products-1",
    type: "productCarousel",
    settings: {
      title: "Öne Çıkan Ürünler",
      paddingY: 100,
    },
    blocks: [],
  },
  {
    id: "testimonials-1",
    type: "testimonials",
    settings: {
      title: "Müşterilerimiz Ne Diyor?",
      paddingY: 100,
    },
    blocks: [],
  },
  {
    id: "stats-1",
    type: "statsCounter",
    settings: {
      title: "Rakamlarla Biz",
      bgColor: "#12100E",
      textColor: "#FDFBF7",
      paddingY: 100,
    },
    blocks: [
      { id: "s1", type: "stat_item", settings: { value: "40", suffix: "+", label: "Yıllık Deneyim", sub: "1984'ten Bu Yana", accentColor: "#C8A96E" } },
      { id: "s2", type: "stat_item", settings: { value: "10000", suffix: "+", label: "Mutlu Müşteri", sub: "Ve artmaya devam ediyor", accentColor: "#C8A96E" } },
      { id: "s3", type: "stat_item", settings: { value: "500", suffix: "+", label: "Ürün Çeşidi", sub: "Her zevke uygun", accentColor: "#C8A96E" } },
      { id: "s4", type: "stat_item", settings: { value: "4.9", suffix: "/5", label: "Müşteri Puanı", sub: "2.450 değerlendirme", accentColor: "#C8A96E" } },
    ],
  },
  {
    id: "store-locator-1",
    type: "storeLocator",
    settings: {
      title: "Mağazamızı Ziyaret Edin",
      storeName: "Davut Kundura — Pendik",
      address: "Doğu Mah. Flurya Sok. No:2/B Pendik, İstanbul",
      phone: "+90 538 625 87 92",
      hours: "Pzt–Cmt: 09:00–19:00\nPazar: Kapalı",
      mapLink: "https://maps.google.com/?q=Pendik+Kundura",
      paddingY: 100,
    },
    blocks: [],
  },
  {
    id: "newsletter-1",
    type: "newsletterSignup",
    settings: {
      title: "Fırsatlardan İlk Siz Haberdar Olun",
      subtitle: "Özel indirimler ve yeni ürün haberleri için e-posta listemize kayıt olun.",
      buttonText: "Abone Ol",
      paddingY: 80,
    },
    blocks: [],
  },
  {
    id: "footer-1",
    type: "footer",
    settings: {
      topBarText: "PENDİK DAVUT KUNDURA • EL İŞÇİLİĞİ • HAKİKİ DERİ ÜRÜNLERİ",
      backgroundColor: "#0d0d0d",
      textColor: "#FDFBF7",
    },
    blocks: [
      { id: "f-b-1", type: "footer_text", settings: { title: "DAVUT KUNDURA PENDİK", content: "1984'ten bu yana Pendik'te hakiki deri ürünler, ortopedik tabanlıklar ve profesyonel ayakkabı tamiri hizmetleri sunuyoruz." } },
      { id: "f-b-4", type: "footer_contact", settings: { title: "BİZE ULAŞIN", address: "Doğu Mah. Flurya Sok. No:2/B Pendik, İstanbul", phone: "+90 538 625 87 92" } },
    ],
  },
]

export const revalidate = 0

export default async function HomePage() {
  let sections: any[] = DEFAULT_INDEX_SECTIONS
  let globalTheme: any = null

  try {
    const { data } = await supabase
      .from("pages")
      .select("content, theme")
      .eq("slug", "index")
      .maybeSingle()

    if (data?.content && Array.isArray(data.content) && data.content.length > 0) {
      // Check for broken old mock images in DB, if found, force default
      const hasBrokenImages = JSON.stringify(data.content).includes("belt-1.jpg") || JSON.stringify(data.content).includes("insole-1.jpg");
      
      if (!hasBrokenImages) {
        sections = data.content
      }
    }
    if (data?.theme) {
      globalTheme = data.theme
    }
  } catch (err) {
    console.error("Error fetching live page:", err)
  }

  const cssVars = globalTheme ? {
    "--primary": globalTheme.primaryColor || "#12100E",
    "--secondary": globalTheme.secondaryColor || "#FDFBF7",
    "--accent": globalTheme.accentColor || "#C8A96E",
    "--bg-primary": globalTheme.bgColor || "#FDFBF7",
    "--text-primary": globalTheme.textColor || "#12100E",
    "--font-heading": globalTheme.fontHeading || "Georgia, serif",
    "--font-body": globalTheme.fontBody || "Inter, sans-serif",
    "--border-radius": `${globalTheme.borderRadius || 8}px`,
  } : {
    "--primary": "#12100E",
    "--secondary": "#FDFBF7",
    "--accent": "#C8A96E",
    "--bg-primary": "#FDFBF7",
    "--text-primary": "#12100E",
    "--font-heading": "Georgia, serif",
    "--font-body": "Inter, sans-serif",
    "--border-radius": "8px",
  }

  return (
    <div style={cssVars as React.CSSProperties}>
      <StorefrontRenderer initialSections={sections} isBuilder={false} pageSlug="index" />
    </div>
  )
}
