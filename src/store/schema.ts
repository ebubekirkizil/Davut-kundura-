// ─── Section Schema Registry ─────────────────────────────────────────────────
// Her section'ın JSON şeması burada tanımlı.
// input type'ları: text, textarea, color, range, checkbox, select, image

export interface SettingField {
  id: string
  type: "text" | "textarea" | "color" | "range" | "checkbox" | "select" | "image"
  label: string
  default: any
  min?: number
  max?: number
  step?: number
  options?: { value: string; label: string }[]
  placeholder?: string
}

export interface BlockSchema {
  type: string
  label: string
  settings: SettingField[]
}

export interface SectionSchema {
  type: string
  label: string
  icon: string
  description?: string
  settings: SettingField[]
  blocks?: BlockSchema[]
}

export const SECTION_SCHEMAS: Record<string, SectionSchema> = {
  header: {
    type: "header",
    label: "Üst Menü (Header)",
    icon: "PanelTop",
    description: "Site üst navigasyon çubuğu",
    settings: [
      { id: "logoText", type: "text", label: "Logo Metni", default: "DAVUT KUNDURA" },
      { id: "logoSize", type: "range", label: "Logo Boyutu (px)", default: 24, min: 12, max: 48, step: 2 },
      { id: "sticky", type: "checkbox", label: "Yapışkan Menü", default: true },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#ffffff" },
    ],
    blocks: [
      { type: "menu_item", label: "Menü Elemanı", settings: [
        { id: "label", type: "text", label: "Etiket", default: "Menü" },
        { id: "link", type: "text", label: "Link", default: "/" },
      ]},
    ],
  },

  hero: {
    type: "hero",
    label: "Hero Banner",
    icon: "Image",
    description: "Tam sayfa etkileyici banner",
    settings: [
      { id: "title", type: "text", label: "Ana Başlık", default: "Zarafetin Adımları" },
      { id: "subtitle", type: "text", label: "Alt Başlık", default: "Geleneksel Deri İşçiliği ve Profesyonel Bakım" },
      { id: "buttonText", type: "text", label: "Buton Yazısı", default: "Koleksiyonu Keşfet" },
      { id: "alignment", type: "select", label: "Hizalama", default: "center", options: [
        { value: "left", label: "Sol" }, { value: "center", label: "Orta" }, { value: "right", label: "Sağ" },
      ]},
      { id: "bgColor", type: "color", label: "Arka Plan Rengi", default: "#12100E" },
      { id: "textColor", type: "color", label: "Yazı Rengi", default: "#FDFBF7" },
      { id: "bgImage", type: "image", label: "Arka Plan Görseli", default: "" },
      { id: "overlayOpacity", type: "range", label: "Karartma (%)", default: 40, min: 0, max: 100 },
      { id: "paddingY", type: "range", label: "Dikey Boşluk (px)", default: 160, min: 60, max: 400, step: 10 },
    ],
  },

  richText: {
    type: "richText",
    label: "Zengin Metin",
    icon: "Type",
    description: "Başlık ve paragraf bloğu",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Zanaatın Hikayesi" },
      { id: "content", type: "textarea", label: "İçerik", default: "Yılların tecrübesiyle harmanlanmış el işçiliği..." },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#FDFBF7" },
      { id: "textColor", type: "color", label: "Yazı Rengi", default: "#12100E" },
      { id: "textAlign", type: "select", label: "Hizalama", default: "center", options: [
        { value: "left", label: "Sol" }, { value: "center", label: "Orta" },
      ]},
      { id: "paddingY", type: "range", label: "Dikey Boşluk (px)", default: 96, min: 32, max: 200, step: 8 },
    ],
  },

  categoryGrid: {
    type: "categoryGrid",
    label: "Kategori Galerisi",
    icon: "LayoutGrid",
    description: "Ürün kategori kartları ızgarası",
    settings: [
      { id: "title", type: "text", label: "Bölüm Başlığı", default: "ÜRÜN KATALOGLARIMIZ" },
      { id: "subtitle", type: "text", label: "Alt Başlık", default: "Seçkin Zanaat Ürünleri" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#F7F3EE" },
      { id: "columns", type: "range", label: "Sütun Sayısı", default: 3, min: 2, max: 4 },
    ],
    blocks: [
      { type: "category_item", label: "Kategori Kutusu", settings: [
        { id: "title", type: "text", label: "Kategori Adı", default: "Kemerler" },
        { id: "image", type: "image", label: "Görsel", default: "" },
        { id: "link", type: "text", label: "Link", default: "#" },
      ]},
    ],
  },

  footer: {
    type: "footer",
    label: "Alt Bilgi (Footer)",
    icon: "PanelBottom",
    description: "Site alt kısım navigasyon ve iletişim",
    settings: [
      { id: "topBarText", type: "text", label: "Üst Bant Yazısı", default: "EL İŞÇİLİĞİ • PREMIUM KALİTE" },
      { id: "backgroundColor", type: "color", label: "Arka Plan Rengi", default: "#1a1a1a" },
    ],
    blocks: [
      { type: "footer_text", label: "Metin Bloğu", settings: [
        { id: "title", type: "text", label: "Başlık", default: "DAVUT KUNDURA" },
        { id: "content", type: "textarea", label: "İçerik", default: "Yılların tecrübesiyle..." },
      ]},
      { type: "footer_menu", label: "Menü Sütunu", settings: [
        { id: "title", type: "text", label: "Sütun Başlığı", default: "HIZLI MENÜ" },
        { id: "links", type: "textarea", label: "Linkler (Satır Satır)", default: "Tüm Ürünler\nHakkımızda" },
      ]},
      { type: "footer_contact", label: "İletişim Bloğu", settings: [
        { id: "title", type: "text", label: "Başlık", default: "İLETİŞİM" },
        { id: "address", type: "textarea", label: "Adres", default: "Merkez Mah. İstanbul" },
        { id: "phone", type: "text", label: "Telefon", default: "+90 (555) 123 45 67" },
      ]},
    ],
  },

  videoHero: {
    type: "videoHero",
    label: "Video Banner",
    icon: "Play",
    description: "Sinematik arka plan videolu banner",
    settings: [
      { id: "videoUrl", type: "text", label: "Video URL (MP4)", default: "", placeholder: "https://..." },
      { id: "overlayOpacity", type: "range", label: "Karartma (%)", default: 50, min: 0, max: 100 },
      { id: "title", type: "text", label: "Başlık", default: "Yaşayan Zanaat" },
      { id: "subtitle", type: "text", label: "Alt Başlık", default: "" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk (px)", default: 200, min: 100, max: 500, step: 20 },
    ],
  },
}
