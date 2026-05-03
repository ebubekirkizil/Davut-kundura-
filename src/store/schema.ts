export const SECTION_SCHEMAS: Record<string, any> = {
  header: {
    type: "header",
    label: "Üst Menü (Header)",
    icon: "Layout",
    settings: [
      { id: "logoText", type: "text", label: "Logo Metni", default: "DAVUT KUNDURA" },
      { id: "logoSize", type: "range", label: "Logo Boyutu", default: 24, min: 12, max: 48 },
      { id: "sticky", type: "checkbox", label: "Yapışkan Menü", default: true }
    ],
    blocks: [
      { type: "menu_item", label: "Menü Elemanı", settings: [
        { id: "label", type: "text", label: "Etiket", default: "Menü" },
        { id: "link", type: "text", label: "Link", default: "/" }
      ]}
    ]
  },
  footer: {
    type: "footer",
    label: "Alt Menü (Footer)",
    icon: "Layout",
    settings: [
      { id: "topBarText", type: "text", label: "Üst Bant Yazısı", default: "EL İŞÇİLİĞİ • ÜCRETSİZ KARGO" },
      { id: "footerLogo", type: "text", label: "Alt Logo", default: "DAVUT KUNDURA" },
      { id: "footerAbout", type: "textarea", label: "Hakkımızda", default: "Yılların tecrübesiyle..." }
    ],
    blocks: [
      { type: "footer_column", label: "Link Sütunu", settings: [
        { id: "title", type: "text", label: "Sütun Başlığı", default: "HIZLI MENÜ" },
        { id: "links", type: "textarea", label: "Linkler (Satır satır)", default: "Tüm Ürünler\nHakkımızda" }
      ]}
    ]
  },
  hero: {
    type: "hero",
    label: "Hero Banner (Giriş)",
    icon: "ImageIcon",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Zarafetin Adımları" },
      { id: "subtitle", type: "text", label: "Alt Başlık", default: "Premium Koleksiyon" },
      { id: "buttonText", type: "text", label: "Buton Yazısı", default: "Keşfet" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 100, min: 20, max: 300 }
    ]
  }
};
