/**
 * SCHEMA REGISTRY
 * Bu dosya, builder içindeki tüm bileşenlerin (sections) ve blokların (blocks) 
 * hangi ayarlara sahip olduğunu ve bu ayarların editörde nasıl görüneceğini tanımlar.
 */

export type SettingType = "text" | "textarea" | "select" | "range" | "color" | "image" | "checkbox" | "number";

export interface SettingSchema {
  id: string;
  type: SettingType;
  label: string;
  default: any;
  options?: { label: string; value: any }[]; // 'select' tipi için
  min?: number; // 'range' ve 'number' için
  max?: number;
  step?: number;
}

export interface SectionSchema {
  type: string;
  label: string;
  icon: string; // Lucide icon adı
  settings: SettingSchema[];
  blocks?: {
    limit?: number;
    types: string[];
  };
}

export const SECTION_SCHEMAS: Record<string, SectionSchema> = {
  hero: {
    type: "hero",
    label: "Hero Banner",
    icon: "ImageIcon",
    settings: [
      { id: "title", type: "text", label: "Ana Başlık", default: "Zarafetin Adımları" },
      { id: "subtitle", type: "textarea", label: "Alt Metin", default: "Premium Deri Koleksiyonu" },
      { id: "buttonText", type: "text", label: "Buton Yazısı", default: "Keşfet" },
      { id: "alignment", type: "select", label: "Hizalama", default: "center", options: [
        { label: "Sol", value: "left" },
        { label: "Orta", value: "center" },
        { label: "Sağ", value: "right" }
      ]},
      { id: "overlayOpacity", type: "range", label: "Koyuluk Oranı", default: 40, min: 0, max: 90, step: 5 },
      { id: "backgroundImage", type: "image", label: "Arka Plan Görseli", default: "" }
    ]
  },
  productGrid: {
    type: "productGrid",
    label: "Ürün Izgarası",
    icon: "Grid",
    settings: [
      { id: "title", type: "text", label: "Bölüm Başlığı", default: "En Çok Satanlar" },
      { id: "limit", type: "range", label: "Ürün Sayısı", default: 4, min: 2, max: 12 },
      { id: "columns", type: "select", label: "Sütun Sayısı", default: 4, options: [
        { label: "2 Sütun", value: 2 },
        { label: "3 Sütun", value: 3 },
        { label: "4 Sütun", value: 4 }
      ]}
    ]
  },
  richText: {
    type: "richText",
    label: "Zengin Metin",
    icon: "Type",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Hikayemiz" },
      { id: "content", type: "textarea", label: "İçerik", default: "1980'den beri ayakkabı sanatında öncüyüz." },
      { id: "size", type: "select", label: "Metin Boyutu", default: "medium", options: [
        { label: "Küçük", value: "small" },
        { label: "Orta", value: "medium" },
        { label: "Büyük", value: "large" }
      ]}
    ]
  },
  header: {
    type: "header",
    label: "Üst Menü (Header)",
    icon: "Layout",
    settings: [
      { id: "logoText", type: "text", label: "Logo Metni", default: "DAVUT KUNDURA" },
      { id: "logoSize", type: "range", label: "Logo Boyutu", default: 24, min: 16, max: 40 },
      { id: "menu1", type: "text", label: "Menü 1", default: "ANA SAYFA" },
      { id: "link1", type: "text", label: "Link 1", default: "/" },
      { id: "menu2", type: "text", label: "Menü 2", default: "ERKEK" },
      { id: "link2", type: "text", label: "Link 2", default: "/collections/erkek" },
      { id: "menu3", type: "text", label: "Menü 3", default: "KADIN" },
      { id: "link3", type: "text", label: "Link 3", default: "/collections/kadin" },
      { id: "menu4", type: "text", label: "Menü 4", default: "KOLEKSİYON" },
      { id: "link4", type: "text", label: "Link 4", default: "/collections/all" },
      { id: "sticky", type: "checkbox", label: "Yapışkan Menü", default: true }
    ]
  },
  imageBanner: {
    type: "imageBanner",
    label: "Görsel Banner",
    icon: "ImageIcon",
    settings: [
      { id: "image", type: "image", label: "Banner Görseli", default: "" },
      { id: "title", type: "text", label: "Başlık", default: "Sezon İndirimi" },
      { id: "buttonLink", type: "text", label: "Buton Linki", default: "/collections/all" }
    ]
  },
  footer: {
    type: "footer",
    label: "Alt Menü (Footer)",
    icon: "Layout",
    settings: [
      { id: "topBarText", type: "text", label: "Üst Bant Yazısı", default: "EL İŞÇİLİĞİ • PREMIUM KALİTE • ÜCRETSİZ KARGO" },
      { id: "footerLogo", type: "text", label: "Alt Logo Metni", default: "DAVUT KUNDURA" },
      { id: "footerAbout", type: "textarea", label: "Hakkımızda Özeti", default: "Yılların verdiği tecrübe ile en kaliteli deri ürünleri sunuyoruz." },
      { id: "address", type: "textarea", label: "Adres Bilgisi", default: "Merkez Mah. Ayakkabıcılar Çarşısı, İstanbul" },
      { id: "phone", type: "text", label: "Telefon", default: "+90 (555) 123 45 67" },
      { id: "email", type: "text", label: "E-posta", default: "info@davutkundura.com" }
    ]
  },
  featureColumns: {
    type: "featureColumns",
    label: "Özellikler (İkonlu)",
    icon: "Grid",
    settings: [
      { id: "title1", type: "text", label: "Başlık 1", default: "Ücretsiz Kargo" },
      { id: "text1", type: "textarea", label: "Metin 1", default: "500 TL üzeri alışverişlerde kargo bizden." },
      { id: "title2", type: "text", label: "Başlık 2", default: "Güvenli Ödeme" },
      { id: "text2", type: "textarea", label: "Metin 2", default: "256-bit SSL sertifikası ile korunan ödeme sistemi." },
      { id: "title3", type: "text", label: "Başlık 3", default: "Kolay İade" },
      { id: "text3", type: "textarea", label: "Metin 3", default: "14 gün içerisinde koşulsuz şartsız iade hakkı." }
    ]
  },
  richTextV2: {
    type: "richTextV2",
    label: "Zengin Metin (Ortalı)",
    icon: "Type",
    settings: [
      { id: "title", type: "text", label: "Ana Başlık", default: "Kalite Politikamız" },
      { id: "content", type: "textarea", label: "Açıklama", default: "Mükemmelliği detaylarda arıyoruz." }
    ]
  },
  richTextV3: {
    type: "richTextV3",
    label: "Zengin Metin (İki Sütun)",
    icon: "Type",
    settings: [
      { id: "titleLeft", type: "text", label: "Sol Başlık", default: "Vizyonumuz" },
      { id: "textLeft", type: "textarea", label: "Sol Metin", default: "Geleceğin ayakkabı trendlerini bugünden tasarlıyoruz." },
      { id: "titleRight", type: "text", label: "Sağ Başlık", default: "Misyonumuz" },
      { id: "textRight", type: "textarea", label: "Sağ Metin", default: "Her adımda konfor ve şıklığı bir araya getiriyoruz." }
    ]
  },
  imageWithText: {
    type: "imageWithText",
    label: "Görsel + Yazı (Yan Yana)",
    icon: "Layout",
    settings: [
      { id: "image", type: "image", label: "Görsel", default: "" },
      { id: "title", type: "text", label: "Başlık", default: "Zanaatkar Eller" },
      { id: "content", type: "textarea", label: "İçerik", default: "Ustamıza kulak verin: 'İyi bir ayakkabı, iyi bir yol arkadaşıdır.'" },
      { id: "layout", type: "select", label: "Yerleşim", default: "left", options: [
        { label: "Görsel Solda", value: "left" },
        { label: "Görsel Sağda", value: "right" }
      ]}
    ]
  },
  productCarousel: {
    type: "productCarousel",
    label: "Ürün Kaydırıcı (Slider)",
    icon: "ShoppingBag",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Yeni Gelenler" },
      { id: "limit", type: "number", label: "Ürün Sayısı", default: 8 }
    ]
  },
  gallery: {
    type: "gallery",
    label: "Görsel Galeri (Mozaik)",
    icon: "ImageIcon",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Atölyemizden Kareler" }
    ]
  },
  stats: {
    type: "stats",
    label: "İstatistikler (Sayaçlar)",
    icon: "BarChart",
    settings: [
      { id: "n1", type: "text", label: "Sayı 1", default: "40+" },
      { id: "l1", type: "text", label: "Etiket 1", default: "Yıllık Deneyim" },
      { id: "n2", type: "text", label: "Sayı 2", default: "150k" },
      { id: "l2", type: "text", label: "Etiket 2", default: "Mutlu Müşteri" },
      { id: "n3", type: "text", label: "Sayı 3", default: "12" },
      { id: "l3", type: "text", label: "Etiket 3", default: "Ülkeye İhracat" }
    ]
  },
  videoHero: {
    type: "videoHero",
    label: "Video (Full Ekran)",
    icon: "Video",
    settings: [
      { id: "videoUrl", type: "text", label: "Video URL", default: "" },
      { id: "title", type: "text", label: "Başlık", default: "Zanaatın Hikayesi" }
    ]
  },
  socialGrid: {
    type: "socialGrid",
    label: "Instagram Akışı",
    icon: "Instagram",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "@davutkundura'yı takip edin" }
    ]
  },
  newsletter: {
    type: "newsletter",
    label: "E-Bülten (Tip A)",
    icon: "Mail",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Abone Olun" },
      { id: "subtitle", type: "textarea", label: "Alt Metin", default: "İndirimlerden ilk siz haberdar olun." }
    ]
  },
  testimonials: {
    type: "testimonials",
    label: "Müşteri Yorumları (Tip A)",
    icon: "User",
    settings: [
      { id: "quote1", type: "textarea", label: "Yorum 1", default: "Mükemmel hizmet." },
      { id: "author1", type: "text", label: "Yazar 1", default: "Ali V." }
    ]
  }
};
