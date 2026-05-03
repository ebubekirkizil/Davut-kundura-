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
      { id: "topBarText", type: "text", label: "Üst Bant Yazısı", default: "EL İŞÇİLİĞİ • PREMIUM KALİTE • ÜCRETSİZ KARGO" },
      { id: "backgroundColor", type: "text", label: "Arka Plan Rengi", default: "#1a1a1a" }
    ],
    blocks: [
      { type: "footer_text", label: "Metin Kutucuğu", settings: [
        { id: "title", type: "text", label: "Başlık", default: "DAVUT KUNDURA" },
        { id: "content", type: "textarea", label: "İçerik", default: "Yılların tecrübesiyle..." }
      ]},
      { type: "footer_menu", label: "Menü Kutucuğu", settings: [
        { id: "title", type: "text", label: "Sütun Başlığı", default: "HIZLI MENÜ" },
        { id: "links", type: "textarea", label: "Linkler (Satır Satır)", default: "Tüm Ürünler\nHakkımızda" }
      ]},
      { type: "footer_contact", label: "İletişim Kutucuğu", settings: [
        { id: "title", type: "text", label: "Başlık", default: "İLETİŞİM" },
        { id: "address", type: "textarea", label: "Adres", default: "Merkez Mah. İstanbul" },
        { id: "phone", type: "text", label: "Telefon", default: "+90 (555) 123 45 67" }
      ]}
    ]
  },
  hero: {
    type: "hero",
    label: "Luxe Hero Banner",
    icon: "ImageIcon",
    settings: [
      { id: "title", type: "text", label: "Ana Başlık", default: "Zarafetin Adımları" },
      { id: "subtitle", type: "text", label: "Alt Başlık", default: "Pendik'te Geleneksel Deri İşçiliği ve Profesyonel Bakım" },
      { id: "buttonText", type: "text", label: "Buton Yazısı", default: "Koleksiyonu Keşfet" },
      { id: "alignment", type: "text", label: "Hizalama (left/center)", default: "center" }
    ]
  },
  richText: {
    type: "richText",
    label: "Zengin Metin (Story)",
    icon: "Type",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Zanaatın Hikayesi" },
      { id: "content", type: "textarea", label: "İçerik", default: "Yılların tecrübesiyle harmanlanmış el işçiliği..." }
    ]
  },
  categoryGrid: {
    type: "categoryGrid",
    label: "Ürün Katalog Galerisi",
    icon: "Layout",
    settings: [
      { id: "title", type: "text", label: "Bölüm Başlığı", default: "ÜRÜN KATALOGLARIMIZ" },
      { id: "subtitle", type: "text", label: "Alt Başlık", default: "Pendik'ten Seçkin Zanaat Ürünleri" }
    ],
    blocks: [
      { type: "category_item", label: "Kategori Kutusu", settings: [
        { id: "title", type: "text", label: "Kategori Adı", default: "Kemerler" },
        { id: "image", type: "text", label: "Görsel URL", default: "" },
        { id: "link", type: "text", label: "Link", default: "#" }
      ]}
    ]
  },
  videoHero: {
    type: "videoHero",
    label: "Sinematik Video Banner",
    icon: "Play",
    settings: [
      { id: "videoUrl", type: "text", label: "Video URL (MP4)", default: "" },
      { id: "overlayOpacity", type: "range", label: "Karartma Oranı", default: 50, min: 0, max: 100 },
      { id: "title", type: "text", label: "Başlık", default: "Yaşayan Zanaat" }
    ]
  }
};
