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
  featureColumns: {
    type: "featureColumns",
    label: "Özellikler (3'lü)",
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
  videoHero: {
    type: "videoHero",
    label: "Video Kahramanı",
    icon: "Video",
    settings: [
      { id: "videoUrl", type: "text", label: "Video URL (MP4)", default: "https://cdn.shopify.com/videos/c/o/v/f9f1f1f1f1f1f1f1f1f1f1f1f1f1f1f1.mp4" },
      { id: "title", type: "text", label: "Başlık", default: "Zanaatın Hikayesi" },
      { id: "overlay", type: "range", label: "Karanlık Katman", default: 50, min: 0, max: 100 }
    ]
  },
  collectionList: {
    type: "collectionList",
    label: "Koleksiyon Listesi",
    icon: "Layers",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Koleksiyonlarımızı Keşfedin" },
      { id: "items", type: "number", label: "Görünecek Sayı", default: 4 }
    ]
  },
  newsletter: {
    type: "newsletter",
    label: "E-Bülten Kayıt",
    icon: "Mail",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "%10 İndirim Kazanın" },
      { id: "subtitle", type: "textarea", label: "Alt Metin", default: "Bültenimize abone olun, ilk alışverişinizde geçerli indirim kodunu alın." }
    ]
  },
  testimonials: {
    type: "testimonials",
    label: "Müşteri Yorumları",
    icon: "User",
    settings: [
      { id: "quote1", type: "textarea", label: "Yorum 1", default: "Hayatımda giydiğim en rahat ayakkabı." },
      { id: "author1", type: "text", label: "Yazar 1", default: "Ahmet Y." },
      { id: "quote2", type: "textarea", label: "Yorum 2", default: "Zerafet ve kalite bir arada." },
      { id: "author2", type: "text", label: "Yazar 2", default: "Mehmet K." }
    ]
  },
  faq: {
    type: "faq",
    label: "Sıkça Sorulan Sorular",
    icon: "HelpCircle",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Merak Edilenler" },
      { id: "q1", type: "text", label: "Soru 1", default: "Kargo ne zaman ulaşır?" },
      { id: "a1", type: "textarea", label: "Cevap 1", default: "Siparişiniz 24 saat içinde kargoya verilir." }
    ]
  },
  countdown: {
    type: "countdown",
    label: "Geri Sayım Sayacı",
    icon: "Clock",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Büyük Sezon Finali" },
      { id: "endDate", type: "text", label: "Bitiş Tarihi (YYYY-MM-DD)", default: "2025-12-31" }
    ]
  },
  brands: {
    type: "brands",
    label: "Marka Logoları",
    icon: "Globe",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "İş Ortaklarımız" }
    ]
  },
  contactForm: {
    type: "contactForm",
    label: "İletişim Formu",
    icon: "MessageSquare",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Bize Ulaşın" },
      { id: "email", type: "text", label: "Alıcı E-posta", default: "info@davutkundura.com" }
    ]
  }
};
