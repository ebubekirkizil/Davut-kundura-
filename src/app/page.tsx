import { createClient } from "@supabase/supabase-js"
import StorefrontRenderer from "@/components/builder/StorefrontRenderer"

// Supabase client for Server Component
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY! // Or anon key if public
const supabase = createClient(supabaseUrl, supabaseKey)

// Fallback configuration matching the live site
const DEFAULT_INDEX_SECTIONS = [
  {
    id: "header-1",
    type: "header",
    settings: { logoText: "DAVUT KUNDURA", logoSize: 24, sticky: true },
    blocks: [
      { id: "h-b-1", type: "menu_item", settings: { label: "ANA SAYFA", link: "/" } },
      { id: "h-b-2", type: "menu_item", settings: { label: "ERKEK", link: "/erkek" } },
      { id: "h-b-3", type: "menu_item", settings: { label: "KADIN", link: "/kadin" } },
    ],
  },
  {
    id: "hero-1",
    type: "hero",
    settings: {
      title: "Premium Deri İşçiliği",
      subtitle: "Pendik'te Yarım Asırlık Ustalık ve Zarafet",
      buttonText: "Koleksiyonu Gör",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop",
      badgeText: "Özel Tasarım",
      alignment: "left"
    },
    blocks: [],
  },
  {
    id: "category-grid-1",
    type: "categoryGrid",
    settings: {
      title: "ÜRÜN KATALOGLARIMIZ",
      subtitle: "Pendik Mağazamızdan Seçkin Zanaat Ürünleri",
    },
    blocks: [
      { id: "cat-1", type: "category_item", settings: { title: "Klasik Ayakkabılar", image: "https://images.unsplash.com/photo-1614252339476-53784e0bf8dd?q=80&w=800&auto=format&fit=crop" } },
      { id: "cat-2", type: "category_item", settings: { title: "Hakiki Deri Kemerler", image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=800&auto=format&fit=crop" } },
      { id: "cat-3", type: "category_item", settings: { title: "Ortopedik Tabanlıklar", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop" } },
    ],
  },
  {
    id: "footer-1",
    type: "footer",
    settings: { topBarText: "PENDİK DAVUT KUNDURA • EL İŞÇİLİĞİ", backgroundColor: "#1a1a1a" },
    blocks: [
      {
        id: "f-b-1",
        type: "footer_text",
        settings: { title: "DAVUT KUNDURA PENDİK", content: "Doğu Mahallesi, Flurya Sokak, No: 2/B, Pendik/İstanbul." },
      },
      {
        id: "f-b-4",
        type: "footer_contact",
        settings: { title: "BİZE ULAŞIN", address: "Doğu Mah. Flurya Sok. No:2/B Pendik", phone: "+90 538 625 87 92" },
      },
    ],
  },
]

export const revalidate = 0 // Disable cache for live updates during editing

export default async function HomePage() {
  let sections = DEFAULT_INDEX_SECTIONS
  let globalTheme = null

  try {
    // Try to fetch the live 'index' page configuration from Supabase
    const { data, error } = await supabase
      .from("pages")
      .select("content, theme")
      .eq("slug", "index")
      .maybeSingle()

    if (data && data.content && Array.isArray(data.content) && data.content.length > 0) {
      sections = data.content
    }
    if (data && data.theme) {
      globalTheme = data.theme
    }
  } catch (err) {
    console.error("Error fetching live page:", err)
    // Fallback to DEFAULT_INDEX_SECTIONS
  }

  return (
    <div 
      style={globalTheme ? {
        "--primary": globalTheme.primaryColor,
        "--secondary": globalTheme.secondaryColor,
        "--accent": globalTheme.accentColor,
        "--bg-primary": globalTheme.bgColor,
        "--text-primary": globalTheme.textColor,
        "--font-heading": globalTheme.fontHeading,
        "--font-body": globalTheme.fontBody,
        "--border-radius": `${globalTheme.borderRadius}px`,
      } as React.CSSProperties : undefined}
    >
      <StorefrontRenderer initialSections={sections} isBuilder={false} pageSlug="index" />
    </div>
  )
}
