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
      { id: "backgroundColor", type: "text", label: "Arka Plan Rengi", default: "#f4ecd8" }
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
    label: "Hero Banner",
    icon: "ImageIcon",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Zarafetin Adımları" },
      { id: "buttonText", type: "text", label: "Buton", default: "Keşfet" }
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
        { id: "image", type: "image", label: "Kategori Görseli" },
        { id: "link", type: "text", label: "Link", default: "#" }
      ]}
    ]
  }
};
