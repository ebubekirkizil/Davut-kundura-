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
  group?: string
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
  category: string
  description?: string
  settings: SettingField[]
  blocks?: BlockSchema[]
}

export const SECTION_CATEGORIES: Record<string, string> = {
  layout: "Yapı & Navigasyon",
  hero: "Hero & Banner",
  ecommerce: "E-Ticaret",
  social_proof: "Sosyal Kanıt",
  content: "İçerik",
  marketing: "Pazarlama",
}

export const SECTION_SCHEMAS: Record<string, SectionSchema> = {
  header: {
    type: "header", label: "Üst Menü", icon: "PanelTop", category: "layout",
    description: "Site navigasyon çubuğu",
    settings: [
      { id: "logoText", type: "text", label: "Logo Metni", default: "DAVUT KUNDURA", group: "Genel" },
      { id: "logoImage", type: "image", label: "Logo Görseli", default: "", group: "Genel" },
      { id: "logoSize", type: "range", label: "Logo Boyutu (px)", default: 24, min: 12, max: 64, step: 2, group: "Genel" },
      { id: "sticky", type: "checkbox", label: "Yapışkan Menü", default: true, group: "Genel" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#ffffff", group: "Renkler" },
      { id: "textColor", type: "color", label: "Yazı Rengi", default: "#12100E", group: "Renkler" },
    ],
    blocks: [
      { type: "menu_item", label: "Menü Elemanı", settings: [
        { id: "label", type: "text", label: "Etiket", default: "Menü" },
        { id: "link", type: "text", label: "Link", default: "/" },
      ]},
    ],
  },

  hero: {
    type: "hero", label: "Hero Banner", icon: "Image", category: "hero",
    description: "Tam sayfa etkileyici banner",
    settings: [
      { id: "title", type: "text", label: "Ana Başlık", default: "Zarafetin Adımları", group: "Metin" },
      { id: "subtitle", type: "text", label: "Alt Başlık", default: "Geleneksel Deri İşçiliği", group: "Metin" },
      { id: "buttonText", type: "text", label: "Buton Yazısı", default: "Koleksiyonu Keşfet", group: "Metin" },
      { id: "buttonLink", type: "text", label: "Buton Linki", default: "/products", group: "Metin" },
      { id: "alignment", type: "select", label: "Hizalama", default: "center", group: "Düzen",
        options: [{ value: "left", label: "Sol" }, { value: "center", label: "Orta" }, { value: "right", label: "Sağ" }] },
      { id: "bgImage", type: "image", label: "Arka Plan Görseli", default: "", group: "Görsel" },
      { id: "bgColor", type: "color", label: "Arka Plan Rengi", default: "#12100E", group: "Renkler" },
      { id: "textColor", type: "color", label: "Yazı Rengi", default: "#FDFBF7", group: "Renkler" },
      { id: "overlayOpacity", type: "range", label: "Karartma (%)", default: 40, min: 0, max: 100, group: "Görsel" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk (px)", default: 160, min: 60, max: 400, step: 10, group: "Düzen" },
    ],
  },

  videoHero: {
    type: "videoHero", label: "Video Banner", icon: "Play", category: "hero",
    description: "Arka plan videolu sinematik banner",
    settings: [
      { id: "videoUrl", type: "text", label: "Video URL (MP4)", default: "", placeholder: "https://...", group: "Görsel" },
      { id: "title", type: "text", label: "Başlık", default: "Yaşayan Zanaat", group: "Metin" },
      { id: "subtitle", type: "text", label: "Alt Başlık", default: "", group: "Metin" },
      { id: "buttonText", type: "text", label: "Buton", default: "Keşfet", group: "Metin" },
      { id: "overlayOpacity", type: "range", label: "Karartma (%)", default: 50, min: 0, max: 100, group: "Görsel" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk (px)", default: 200, min: 100, max: 500, step: 20, group: "Düzen" },
    ],
  },

  splitHero: {
    type: "splitHero", label: "Bölünmüş Hero", icon: "Columns2", category: "hero",
    description: "Sol metin sağ görsel",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "El İşçiliğinin Gücü", group: "Metin" },
      { id: "subtitle", type: "text", label: "Alt Metin", default: "Geleneksel teknikler, modern estetik", group: "Metin" },
      { id: "buttonText", type: "text", label: "Buton", default: "Keşfet", group: "Metin" },
      { id: "image", type: "image", label: "Görsel", default: "", group: "Görsel" },
      { id: "imagePosition", type: "select", label: "Görsel Konumu", default: "right", group: "Düzen",
        options: [{ value: "left", label: "Sol" }, { value: "right", label: "Sağ" }] },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#FDFBF7", group: "Renkler" },
      { id: "textColor", type: "color", label: "Yazı Rengi", default: "#12100E", group: "Renkler" },
      { id: "accentColor", type: "color", label: "Vurgu Rengi", default: "#C8A96E", group: "Renkler" },
    ],
  },

  marquee: {
    type: "marquee", label: "Kayan Duyuru", icon: "Megaphone", category: "hero",
    description: "Sürekli kayan metin bandı",
    settings: [
      { id: "text", type: "text", label: "Bant Metni", default: "ÜCRETSİZ KARGO • AYNI GÜN TESLİMAT • PREMİUM KALİTE •", group: "Metin" },
      { id: "speed", type: "range", label: "Hız", default: 30, min: 10, max: 100, group: "Animasyon" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#12100E", group: "Renkler" },
      { id: "textColor", type: "color", label: "Yazı Rengi", default: "#C8A96E", group: "Renkler" },
      { id: "fontSize", type: "range", label: "Yazı Boyutu (px)", default: 13, min: 10, max: 24, group: "Metin" },
    ],
  },

  richText: {
    type: "richText", label: "Zengin Metin", icon: "Type", category: "content",
    description: "Başlık ve paragraf bloğu",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Zanaatın Hikayesi", group: "Metin" },
      { id: "content", type: "textarea", label: "İçerik", default: "Yılların tecrübesiyle harmanlanmış el işçiliği...", group: "Metin" },
      { id: "textAlign", type: "select", label: "Hizalama", default: "center", group: "Düzen",
        options: [{ value: "left", label: "Sol" }, { value: "center", label: "Orta" }, { value: "right", label: "Sağ" }] },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#FDFBF7", group: "Renkler" },
      { id: "textColor", type: "color", label: "Yazı Rengi", default: "#12100E", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk (px)", default: 96, min: 32, max: 200, step: 8, group: "Düzen" },
      { id: "maxWidth", type: "range", label: "Maksimum Genişlik (px)", default: 720, min: 400, max: 1200, step: 40, group: "Düzen" },
    ],
  },

  faqAccordion: {
    type: "faqAccordion", label: "SSS Akordeon", icon: "HelpCircle", category: "content",
    description: "Sıkça sorulan sorular",
    settings: [
      { id: "title", type: "text", label: "Bölüm Başlığı", default: "Sıkça Sorulan Sorular", group: "Metin" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#FDFBF7", group: "Renkler" },
      { id: "accentColor", type: "color", label: "Vurgu Rengi", default: "#C8A96E", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk (px)", default: 80, min: 32, max: 200, group: "Düzen" },
    ],
    blocks: [
      { type: "faq_item", label: "SSS Maddesi", settings: [
        { id: "question", type: "text", label: "Soru", default: "Teslimat süresi ne kadar?" },
        { id: "answer", type: "textarea", label: "Cevap", default: "Siparişleriniz 1-3 iş günü içinde kargoya verilir." },
      ]},
    ],
  },

  categoryGrid: {
    type: "categoryGrid", label: "Kategori Galerisi", icon: "LayoutGrid", category: "ecommerce",
    description: "Ürün kategori kartları",
    settings: [
      { id: "title", type: "text", label: "Bölüm Başlığı", default: "ÜRÜN KATALOGLARIMIZ", group: "Metin" },
      { id: "subtitle", type: "text", label: "Alt Başlık", default: "Seçkin Zanaat Ürünleri", group: "Metin" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#F7F3EE", group: "Renkler" },
      { id: "columns", type: "range", label: "Sütun Sayısı", default: 3, min: 2, max: 4, group: "Düzen" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk (px)", default: 80, min: 32, max: 200, group: "Düzen" },
    ],
    blocks: [
      { type: "category_item", label: "Kategori Kutusu", settings: [
        { id: "title", type: "text", label: "Kategori Adı", default: "Kemerler" },
        { id: "image", type: "image", label: "Görsel", default: "" },
        { id: "link", type: "text", label: "Link", default: "#" },
        { id: "description", type: "text", label: "Açıklama", default: "" },
      ]},
    ],
  },

  testimonials: {
    type: "testimonials", label: "Müşteri Yorumları", icon: "MessageCircle", category: "social_proof",
    description: "Konuşma baloncuklu yorumlar",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Müşterilerimiz Ne Diyor?", group: "Metin" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#F7F3EE", group: "Renkler" },
      { id: "cardBg", type: "color", label: "Kart Arka Planı", default: "#FFFFFF", group: "Renkler" },
      { id: "starColor", type: "color", label: "Yıldız Rengi", default: "#F59E0B", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk (px)", default: 80, min: 32, max: 200, group: "Düzen" },
    ],
    blocks: [
      { type: "testimonial_item", label: "Yorum Kartı", settings: [
        { id: "name", type: "text", label: "Müşteri Adı", default: "Ahmet Y." },
        { id: "company", type: "text", label: "Şirket / Ünvan", default: "" },
        { id: "text", type: "textarea", label: "Yorum Metni", default: "Ürün kalitesi mükemmeldi, çok memnun kaldım." },
        { id: "rating", type: "range", label: "Puan (1-5)", default: 5, min: 1, max: 5 },
        { id: "avatar", type: "image", label: "Profil Fotoğrafı", default: "" },
      ]},
    ],
  },

  trustBadges: {
    type: "trustBadges", label: "Güven Rozetleri", icon: "ShieldCheck", category: "social_proof",
    description: "Kargo, ödeme güven ikonları",
    settings: [
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#FDFBF7", group: "Renkler" },
      { id: "iconColor", type: "color", label: "İkon Rengi", default: "#C8A96E", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk (px)", default: 48, min: 16, max: 120, group: "Düzen" },
    ],
    blocks: [
      { type: "badge_item", label: "Rozet", settings: [
        { id: "icon", type: "select", label: "İkon", default: "shield",
          options: [
            { value: "shield", label: "Güvenli Ödeme" }, { value: "truck", label: "Hızlı Kargo" },
            { value: "refresh", label: "Kolay İade" }, { value: "star", label: "Kalite Garantisi" },
            { value: "lock", label: "SSL Güvenli" }, { value: "headphones", label: "7/24 Destek" },
          ]},
        { id: "title", type: "text", label: "Başlık", default: "Güvenli Ödeme" },
        { id: "subtitle", type: "text", label: "Alt Metin", default: "256-bit SSL şifreleme" },
      ]},
    ],
  },

  pressLogos: {
    type: "pressLogos", label: "Basında Biz", icon: "Newspaper", category: "social_proof",
    description: "Medya logo bulutu",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Basında Görüldük", group: "Metin" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#FDFBF7", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 60, min: 24, max: 160, group: "Düzen" },
    ],
    blocks: [
      { type: "press_logo", label: "Logo", settings: [
        { id: "image", type: "image", label: "Logo Görseli", default: "" },
        { id: "name", type: "text", label: "Yayın Adı", default: "Hürriyet" },
        { id: "link", type: "text", label: "Link", default: "#" },
      ]},
    ],
  },

  countdownTimer: {
    type: "countdownTimer", label: "Geri Sayım", icon: "Timer", category: "marketing",
    description: "Flash sale geri sayım sayacı",
    settings: [
      { id: "title", type: "text", label: "Kampanya Başlığı", default: "Fırsat Sona Eriyor!", group: "Metin" },
      { id: "subtitle", type: "text", label: "Alt Metin", default: "Bu fiyatlar için son şansınız", group: "Metin" },
      { id: "buttonText", type: "text", label: "Buton", default: "Hemen Al", group: "Metin" },
      { id: "buttonLink", type: "text", label: "Buton Linki", default: "/products", group: "Metin" },
      { id: "deadline", type: "text", label: "Bitiş Tarihi (ISO)", default: "2026-12-31T23:59:59", placeholder: "2026-12-31T23:59:59", group: "Zamanlama" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#12100E", group: "Renkler" },
      { id: "textColor", type: "color", label: "Yazı Rengi", default: "#FDFBF7", group: "Renkler" },
      { id: "accentColor", type: "color", label: "Vurgu Rengi", default: "#C8A96E", group: "Renkler" },
    ],
  },

  newsletterSignup: {
    type: "newsletterSignup", label: "E-Bülten Abonelik", icon: "Mail", category: "marketing",
    description: "E-posta abonelik formu",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Fırsatlardan İlk Siz Haberdar Olun", group: "Metin" },
      { id: "subtitle", type: "text", label: "Alt Metin", default: "Özel indirimler ve yeni ürünler için abone olun", group: "Metin" },
      { id: "placeholder", type: "text", label: "Input Placeholder", default: "E-posta adresinizi girin...", group: "Metin" },
      { id: "buttonText", type: "text", label: "Buton Metni", default: "Abone Ol", group: "Metin" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#F7F3EE", group: "Renkler" },
      { id: "accentColor", type: "color", label: "Vurgu / Buton Rengi", default: "#C8A96E", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk (px)", default: 80, min: 32, max: 200, group: "Düzen" },
    ],
  },

  spacer: {
    type: "spacer", label: "Boş Alan", icon: "Minus", category: "layout",
    description: "Ayarlanabilir boşluk",
    settings: [
      { id: "height", type: "range", label: "Yükseklik (px)", default: 60, min: 8, max: 400, step: 4, group: "Düzen" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "transparent", group: "Renkler" },
    ],
  },

  divider: {
    type: "divider", label: "Ayırıcı Çizgi", icon: "SeparatorHorizontal", category: "layout",
    description: "Dekoratif bölüm ayırıcısı",
    settings: [
      { id: "style", type: "select", label: "Çizgi Stili", default: "solid", group: "Görsel",
        options: [{ value: "solid", label: "Düz" }, { value: "dashed", label: "Kesik" }, { value: "dotted", label: "Noktalı" }, { value: "ornament", label: "Süslü" }] },
      { id: "color", type: "color", label: "Çizgi Rengi", default: "#E5E0D8", group: "Renkler" },
      { id: "thickness", type: "range", label: "Kalınlık (px)", default: 1, min: 1, max: 8, group: "Görsel" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk (px)", default: 24, min: 8, max: 120, group: "Düzen" },
    ],
  },

  contactForm: {
    type: "contactForm", label: "İletişim Formu", icon: "Mail", category: "content",
    description: "Ad, e-posta, mesaj formu",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Bize Ulaşın", group: "Metin" },
      { id: "subtitle", type: "text", label: "Alt Metin", default: "24 saat içinde dönüş yapıyoruz", group: "Metin" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#FDFBF7", group: "Renkler" },
      { id: "accentColor", type: "color", label: "Vurgu Rengi", default: "#C8A96E", group: "Renkler" },
      { id: "showInfo", type: "checkbox", label: "İletişim Bilgilerini Göster", default: true, group: "Genel" },
      { id: "address", type: "text", label: "Adres", default: "Doğu Mah. Flurya Sok. No:2/B Pendik", group: "İletişim" },
      { id: "phone", type: "text", label: "Telefon", default: "+90 538 625 87 92", group: "İletişim" },
      { id: "email", type: "text", label: "E-posta", default: "info@davutkundura.com", group: "İletişim" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 80, min: 32, max: 200, group: "Düzen" },
    ],
  },

  imageGallery: {
    type: "imageGallery", label: "Fotoğraf Galerisi", icon: "Images", category: "content",
    description: "Lightbox destekli galeri",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Galeri", group: "Metin" },
      { id: "columns", type: "range", label: "Sütun Sayısı", default: 3, min: 2, max: 4, group: "Düzen" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#FDFBF7", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 80, min: 32, max: 200, group: "Düzen" },
    ],
    blocks: [
      { type: "gallery_item", label: "Galeri Görseli", settings: [
        { id: "image", type: "image", label: "Görsel", default: "" },
        { id: "caption", type: "text", label: "Başlık", default: "" },
      ]},
    ],
  },

  googleMap: {
    type: "googleMap", label: "Google Harita", icon: "Map", category: "content",
    description: "Mağaza konumu haritası",
    settings: [
      { id: "address", type: "text", label: "Adres", default: "Pendik İstanbul", group: "Konum" },
      { id: "zoom", type: "range", label: "Yakınlaştırma", default: 16, min: 10, max: 20, group: "Konum" },
      { id: "height", type: "range", label: "Harita Yüksekliği (px)", default: 400, min: 200, max: 700, step: 20, group: "Düzen" },
      { id: "title", type: "text", label: "Üst Başlık", default: "", group: "Metin" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 0, min: 0, max: 80, group: "Düzen" },
    ],
  },

  announcementBar: {
    type: "announcementBar", label: "Duyuru Bandı", icon: "Megaphone", category: "marketing",
    description: "Üst promosyon bildirimi",
    settings: [
      { id: "text", type: "text", label: "Duyuru Metni", default: "🎉 Tüm siparişlerde ÜCRETSİZ KARGO", group: "Metin" },
      { id: "link", type: "text", label: "Link URL", default: "", group: "Metin" },
      { id: "linkText", type: "text", label: "Link Yazısı", default: "Alışverişe Başla →", group: "Metin" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#C8A96E", group: "Renkler" },
      { id: "textColor", type: "color", label: "Yazı Rengi", default: "#12100E", group: "Renkler" },
      { id: "dismissible", type: "checkbox", label: "Kapatılabilir", default: true, group: "Genel" },
      { id: "fontSize", type: "range", label: "Yazı Boyutu (px)", default: 13, min: 10, max: 18, group: "Metin" },
    ],
  },

  bentoGrid: {
    type: "bentoGrid", label: "Bento Ürün Vitrini", icon: "LayoutDashboard", category: "ecommerce",
    description: "Asimetrik ürün vitrin ızgarası",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Öne Çıkan Ürünler", group: "Metin" },
      { id: "subtitle", type: "text", label: "Alt Başlık", default: "", group: "Metin" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#F7F3EE", group: "Renkler" },
      { id: "accentColor", type: "color", label: "Vurgu", default: "#C8A96E", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 80, min: 32, max: 200, group: "Düzen" },
    ],
    blocks: [
      { type: "bento_item", label: "Ürün Kartı", settings: [
        { id: "title", type: "text", label: "Ürün Adı", default: "Ürün" },
        { id: "price", type: "text", label: "Fiyat", default: "₺0" },
        { id: "image", type: "image", label: "Görsel", default: "" },
        { id: "badge", type: "text", label: "Rozet", default: "" },
        { id: "size", type: "select", label: "Boyut", default: "small",
          options: [{value:"small",label:"Küçük"},{value:"medium",label:"Orta"},{value:"large",label:"Büyük"}] },
      ]},
    ],
  },

  teamGrid: {
    type: "teamGrid", label: "Ekip Kadrosu", icon: "Users", category: "content",
    description: "Personel profil kartları",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Ekibimiz", group: "Metin" },
      { id: "subtitle", type: "text", label: "Alt Başlık", default: "", group: "Metin" },
      { id: "columns", type: "range", label: "Sütun Sayısı", default: 4, min: 2, max: 5, group: "Düzen" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#FDFBF7", group: "Renkler" },
      { id: "accentColor", type: "color", label: "Vurgu", default: "#C8A96E", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 80, min: 32, max: 200, group: "Düzen" },
    ],
    blocks: [
      { type: "team_member", label: "Ekip Üyesi", settings: [
        { id: "name", type: "text", label: "Ad Soyad", default: "Ekip Üyesi" },
        { id: "role", type: "text", label: "Görevi", default: "Uzman" },
        { id: "bio", type: "text", label: "Kısa Bio", default: "" },
        { id: "image", type: "image", label: "Fotoğraf", default: "" },
      ]},
    ],
  },

  statsCounter: {
    type: "statsCounter", label: "İstatistik Sayacı", icon: "TrendingUp", category: "social_proof",
    description: "Animasyonlu rakam sayacı",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Rakamlarla Biz", group: "Metin" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#12100E", group: "Renkler" },
      { id: "textColor", type: "color", label: "Yazı Rengi", default: "#FDFBF7", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 80, min: 32, max: 200, group: "Düzen" },
    ],
    blocks: [
      { type: "stat_item", label: "İstatistik", settings: [
        { id: "value", type: "text", label: "Değer (sayı)", default: "100" },
        { id: "prefix", type: "text", label: "Önek", default: "" },
        { id: "suffix", type: "text", label: "Sonek", default: "+" },
        { id: "label", type: "text", label: "Etiket", default: "Mutlu Müşteri" },
        { id: "sub", type: "text", label: "Alt Açıklama", default: "" },
        { id: "accentColor", type: "color", label: "Sayı Rengi", default: "#C8A96E" },
      ]},
    ],
  },

  imageBanner: {
    type: "imageBanner", label: "Görsel Banner", icon: "RectangleHorizontal", category: "hero",
    description: "Tam genişlik görsel + CTA",
    settings: [
      { id: "image", type: "image", label: "Arka Plan Görseli", default: "", group: "Görsel" },
      { id: "title", type: "text", label: "Başlık", default: "Özel Koleksiyon", group: "Metin" },
      { id: "subtitle", type: "text", label: "Alt Metin", default: "", group: "Metin" },
      { id: "buttonText", type: "text", label: "Buton", default: "İncele", group: "Metin" },
      { id: "buttonLink", type: "text", label: "Buton Linki", default: "/products", group: "Metin" },
      { id: "textAlign", type: "select", label: "Hizalama", default: "center", group: "Düzen",
        options: [{value:"left",label:"Sol"},{value:"center",label:"Orta"},{value:"right",label:"Sağ"}] },
      { id: "overlayOpacity", type: "range", label: "Karartma (%)", default: 45, min: 0, max: 90, group: "Görsel" },
      { id: "paddingY", type: "range", label: "Yükseklik (px)", default: 120, min: 60, max: 400, step: 10, group: "Düzen" },
      { id: "accentColor", type: "color", label: "Vurgu / Buton", default: "#C8A96E", group: "Renkler" },
    ],
  },

  storeLocator: {
    type: "storeLocator", label: "Mağaza Bilgisi", icon: "Store", category: "content",
    description: "Adres, saat ve yol tarifi",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Mağazamızı Ziyaret Edin", group: "Metin" },
      { id: "storeName", type: "text", label: "Mağaza Adı", default: "Davut Kundura — Pendik", group: "Metin" },
      { id: "address", type: "text", label: "Adres", default: "Doğu Mah. Flurya Sok. No:2/B Pendik", group: "İletişim" },
      { id: "phone", type: "text", label: "Telefon", default: "+90 538 625 87 92", group: "İletişim" },
      { id: "hours", type: "textarea", label: "Çalışma Saatleri", default: "Pzt–Cmt: 09:00–19:00\nPazar: Kapalı", group: "İletişim" },
      { id: "parking", type: "text", label: "Park Bilgisi", default: "Ücretsiz park yeri mevcut", group: "İletişim" },
      { id: "mapLink", type: "text", label: "Google Maps Linki", default: "https://maps.google.com", group: "İletişim" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#F7F3EE", group: "Renkler" },
      { id: "accentColor", type: "color", label: "Vurgu", default: "#C8A96E", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 80, min: 32, max: 200, group: "Düzen" },
    ],
  },

  beforeAfter: {
    type: "beforeAfter", label: "Öncesi / Sonrası", icon: "SlidersHorizontal", category: "social_proof",
    description: "Sürükleme kaydırıcılı karşılaştırma",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Öncesi / Sonrası", group: "Metin" },
      { id: "subtitle", type: "text", label: "Alt Metin", default: "Farkı sürükleyerek görün", group: "Metin" },
      { id: "beforeImage", type: "image", label: "Öncesi Görseli", default: "", group: "Görsel" },
      { id: "afterImage", type: "image", label: "Sonrası Görseli", default: "", group: "Görsel" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#FDFBF7", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 80, min: 32, max: 200, group: "Düzen" },
    ],
  },

  productFeatures: {
    type: "productFeatures", label: "Özellik Listesi", icon: "CheckSquare", category: "content",
    description: "Neden bizi seçmelisiniz listesi",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Neden Bizi Seçmelisiniz?", group: "Metin" },
      { id: "layout", type: "select", label: "Düzen", default: "grid", group: "Düzen",
        options: [{value:"grid",label:"Izgara"},{value:"list",label:"Liste"}] },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#FDFBF7", group: "Renkler" },
      { id: "accentColor", type: "color", label: "Vurgu", default: "#C8A96E", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 80, min: 32, max: 200, group: "Düzen" },
    ],
    blocks: [
      { type: "feature_item", label: "Özellik", settings: [
        { id: "title", type: "text", label: "Özellik Başlığı", default: "Özellik" },
        { id: "description", type: "text", label: "Açıklama", default: "" },
      ]},
    ],
  },

  timeline: {
    type: "timeline", label: "Zaman Çizelgesi", icon: "Clock", category: "content",
    description: "Marka tarihçesi ve kilometre taşları",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Hikayemiz", group: "Metin" },
      { id: "subtitle", type: "text", label: "Alt Metin", default: "", group: "Metin" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#FDFBF7", group: "Renkler" },
      { id: "accentColor", type: "color", label: "Vurgu", default: "#C8A96E", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 80, min: 32, max: 200, group: "Düzen" },
    ],
    blocks: [
      { type: "timeline_event", label: "Olay", settings: [
        { id: "year", type: "text", label: "Yıl", default: "2024" },
        { id: "title", type: "text", label: "Başlık", default: "Önemli Gelişme" },
        { id: "description", type: "textarea", label: "Açıklama", default: "" },
      ]},
    ],
  },

  // ==========================================
  // PACKAGE 1: E-Commerce & Product Showcases
  // ==========================================
  
  productCarousel: {
    type: "productCarousel", label: "Ürün Karuseli", icon: "ShoppingBag", category: "ecommerce",
    description: "Yatay kaydırılabilir ürünler",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Popüler Ürünler", group: "Metin" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#FDFBF7", group: "Renkler" },
      { id: "accentColor", type: "color", label: "Vurgu Rengi", default: "#C8A96E", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 80, min: 32, max: 200, group: "Düzen" }
    ],
    blocks: [
      { type: "product_item", label: "Ürün", settings: [
        { id: "title", type: "text", label: "Ürün Adı", default: "Ürün" },
        { id: "price", type: "text", label: "Fiyat", default: "100₺" },
        { id: "image", type: "image", label: "Görsel", default: "" }
      ]}
    ]
  },

  lookbook: {
    type: "lookbook", label: "Lookbook (Noktalı Görsel)", icon: "Image", category: "ecommerce",
    description: "Üzerinde ürün detayları olan büyük görsel",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Kış Koleksiyonu", group: "Metin" },
      { id: "image", type: "image", label: "Ana Görsel", default: "", group: "Görsel" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#12100E", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 80, min: 32, max: 200, group: "Düzen" }
    ],
    blocks: [
      { type: "hotspot", label: "Ürün Noktası", settings: [
        { id: "x", type: "range", label: "X Konumu (%)", default: 50, min: 0, max: 100 },
        { id: "y", type: "range", label: "Y Konumu (%)", default: 50, min: 0, max: 100 },
        { id: "product", type: "text", label: "Ürün Adı", default: "Ürün" },
        { id: "price", type: "text", label: "Fiyat", default: "0₺" }
      ]}
    ]
  },

  compareTable: {
    type: "compareTable", label: "Karşılaştırma Tablosu", icon: "Columns", category: "ecommerce",
    description: "Ürün/Hizmet karşılaştırma listesi",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Paket Karşılaştırması", group: "Metin" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#FDFBF7", group: "Renkler" },
      { id: "accentColor", type: "color", label: "Vurgu Rengi", default: "#C8A96E", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 80, min: 32, max: 200, group: "Düzen" }
    ]
  },

  dealOfTheDay: {
    type: "dealOfTheDay", label: "Günün Fırsatı", icon: "Timer", category: "ecommerce",
    description: "Tek ürüne özel sayaçlı/indirimli gösterim",
    settings: [
      { id: "title", type: "text", label: "Üst Başlık", default: "Günün Fırsatı", group: "Metin" },
      { id: "product", type: "text", label: "Ürün Adı", default: "Özel Deri Çanta", group: "Metin" },
      { id: "oldPrice", type: "text", label: "Eski Fiyat", default: "4.200₺", group: "Metin" },
      { id: "newPrice", type: "text", label: "Yeni Fiyat", default: "2.800₺", group: "Metin" },
      { id: "image", type: "image", label: "Görsel", default: "", group: "Görsel" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#F7F3EE", group: "Renkler" },
      { id: "accentColor", type: "color", label: "Vurgu Rengi", default: "#C8A96E", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 80, min: 32, max: 200, group: "Düzen" }
    ]
  },

  categoryCircles: {
    type: "categoryCircles", label: "Yuvarlak Kategoriler", icon: "Circle", category: "ecommerce",
    description: "Hızlı kategori menüsü",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Kategoriler", group: "Metin" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#FDFBF7", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 80, min: 32, max: 200, group: "Düzen" }
    ],
    blocks: [
      { type: "category_item", label: "Kategori", settings: [
        { id: "title", type: "text", label: "Kategori Adı", default: "Kategori" },
        { id: "image", type: "image", label: "Görsel", default: "" }
      ]}
    ]
  },

  bundleBuilder: {
    type: "bundleBuilder", label: "Birlikte Al (Bundle)", icon: "PlusSquare", category: "ecommerce",
    description: "Kombin ürünleri ve indirim",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Kombin Oluştur, Kazan!", group: "Metin" },
      { id: "discountText", type: "text", label: "İndirim Yazısı", default: "%15 İndirim Uygulandı", group: "Metin" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#F7F3EE", group: "Renkler" },
      { id: "accentColor", type: "color", label: "Vurgu Rengi", default: "#C8A96E", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 80, min: 32, max: 200, group: "Düzen" }
    ],
    blocks: [
      { type: "bundle_item", label: "Kombin Ürünü", settings: [
        { id: "title", type: "text", label: "Ürün", default: "Ürün" },
        { id: "price", type: "text", label: "Fiyat", default: "0₺" },
        { id: "image", type: "image", label: "Görsel", default: "" }
      ]}
    ]
  },

  newArrivals: {
    type: "newArrivals", label: "Yeni Gelenler", icon: "Sparkles", category: "ecommerce",
    description: "Yazı + Ürünler (Asimetrik ızgara)",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Yeni Sezon", group: "Metin" },
      { id: "subtitle", type: "text", label: "Alt Metin", default: "En yeni koleksiyon parçaları", group: "Metin" },
      { id: "buttonText", type: "text", label: "Buton", default: "Tümünü Gör", group: "Metin" },
      { id: "link", type: "text", label: "Link", default: "/products", group: "Metin" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#12100E", group: "Renkler" },
      { id: "textColor", type: "color", label: "Yazı Rengi", default: "#FDFBF7", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 80, min: 32, max: 200, group: "Düzen" }
    ],
    blocks: [
      { type: "product_item", label: "Ürün", settings: [
        { id: "title", type: "text", label: "Ürün Adı", default: "Ürün" },
        { id: "price", type: "text", label: "Fiyat", default: "0₺" },
        { id: "image", type: "image", label: "Görsel", default: "" }
      ]}
    ]
  },

  bestSellersSlider: {
    type: "bestSellersSlider", label: "En Çok Satanlar", icon: "Trophy", category: "ecommerce",
    description: "Numaralı en çok satanlar",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "En Çok Satanlar", group: "Metin" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#FDFBF7", group: "Renkler" },
      { id: "accentColor", type: "color", label: "Vurgu Rengi", default: "#C8A96E", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 80, min: 32, max: 200, group: "Düzen" }
    ],
    blocks: [
      { type: "product_item", label: "Ürün", settings: [
        { id: "title", type: "text", label: "Ürün Adı", default: "Ürün" },
        { id: "price", type: "text", label: "Fiyat", default: "0₺" },
        { id: "image", type: "image", label: "Görsel", default: "" }
      ]}
    ]
  },

  productSpecs: {
    type: "productSpecs", label: "Ürün Teknik Özellikleri", icon: "List", category: "ecommerce",
    description: "Görsel ve check listesi",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Teknik Özellikler", group: "Metin" },
      { id: "image", type: "image", label: "Görsel", default: "", group: "Görsel" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#FDFBF7", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 80, min: 32, max: 200, group: "Düzen" }
    ],
    blocks: [
      { type: "spec_item", label: "Özellik", settings: [
        { id: "title", type: "text", label: "Başlık", default: "Özellik" },
        { id: "desc", type: "text", label: "Açıklama", default: "Detay" }
      ]}
    ]
  },

  pricingTable: {
    type: "pricingTable", label: "Fiyatlandırma", icon: "DollarSign", category: "ecommerce",
    description: "Paket ve fiyatlandırma",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Paketler ve Fiyatlandırma", group: "Metin" },
      { id: "subtitle", type: "text", label: "Alt Metin", default: "İhtiyacınıza uygun paketi seçin", group: "Metin" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#F7F3EE", group: "Renkler" },
      { id: "accentColor", type: "color", label: "Vurgu Rengi", default: "#C8A96E", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 80, min: 32, max: 200, group: "Düzen" }
    ],
    blocks: [
      { type: "plan_item", label: "Paket", settings: [
        { id: "title", type: "text", label: "Paket Adı", default: "Standart" },
        { id: "price", type: "text", label: "Fiyat", default: "250₺" },
        { id: "features", type: "textarea", label: "Özellikler (Her satıra bir tane)", default: "Özellik 1\nÖzellik 2" },
        { id: "isPopular", type: "checkbox", label: "Öne Çıkan", default: false }
      ]}
    ]
  },

  giftGuide: {
    type: "giftGuide", label: "Hediye Rehberi", icon: "Gift", category: "ecommerce",
    description: "Kategori bazlı hediye önerileri",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Hediye Rehberi", group: "Metin" },
      { id: "subtitle", type: "text", label: "Alt Metin", default: "Sevdiklerinize en özel hediyeler", group: "Metin" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#12100E", group: "Renkler" },
      { id: "textColor", type: "color", label: "Yazı Rengi", default: "#FDFBF7", group: "Renkler" },
      { id: "accentColor", type: "color", label: "Vurgu Rengi", default: "#C8A96E", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 80, min: 32, max: 200, group: "Düzen" }
    ],
    blocks: [
      { type: "guide_item", label: "Rehber Kategorisi", settings: [
        { id: "title", type: "text", label: "Başlık", default: "Babalar İçin" },
        { id: "image", type: "image", label: "Görsel", default: "" },
        { id: "link", type: "text", label: "Link", default: "#" }
      ]}
    ]
  },

  sizeGuide: {
    type: "sizeGuide", label: "Beden Rehberi", icon: "Ruler", category: "ecommerce",
    description: "Ayakkabı numarası tablosu",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Beden ve Ölçü Rehberi", group: "Metin" },
      { id: "description", type: "text", label: "Açıklama", default: "Doğru ayakkabı numarasını bulun.", group: "Metin" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#FDFBF7", group: "Renkler" },
      { id: "accentColor", type: "color", label: "Vurgu Rengi", default: "#C8A96E", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 80, min: 32, max: 200, group: "Düzen" }
    ]
  },

  loyaltyTeaser: {
    type: "loyaltyTeaser", label: "Sadakat Programı", icon: "Star", category: "ecommerce",
    description: "Elite Club / Puan sistemi tanıtımı",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Davut Elite Club'a Katılın", group: "Metin" },
      { id: "subtitle", type: "text", label: "Alt Metin", default: "Puan kazanın, özel indirimlere erişin", group: "Metin" },
      { id: "buttonText", type: "text", label: "Buton Yazısı", default: "Ücretsiz Üye Ol", group: "Metin" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#12100E", group: "Renkler" },
      { id: "accentColor", type: "color", label: "Vurgu Rengi", default: "#C8A96E", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 80, min: 32, max: 200, group: "Düzen" }
    ]
  },

  brandShowcase: {
    type: "brandShowcase", label: "Marka / Materyal Vitrini", icon: "Tag", category: "ecommerce",
    description: "Kullanılan markalar veya deri kaliteleri",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Kullandığımız Deri Markaları", group: "Metin" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#FDFBF7", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 60, min: 32, max: 200, group: "Düzen" }
    ],
    blocks: [
      { type: "brand_item", label: "Marka", settings: [
        { id: "name", type: "text", label: "Marka Adı", default: "Vera Pelle" },
        { id: "logo", type: "image", label: "Logo", default: "" }
      ]}
    ]
  },

  quickOrderForm: {
    type: "quickOrderForm", label: "Toptan Hızlı Sipariş", icon: "FileText", category: "ecommerce",
    description: "Toptan / Kurumsal sipariş formu",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Toptan / Hızlı Sipariş Formu", group: "Metin" },
      { id: "subtitle", type: "text", label: "Alt Metin", default: "Kurumsal siparişleriniz için formu doldurun", group: "Metin" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#F7F3EE", group: "Renkler" },
      { id: "accentColor", type: "color", label: "Vurgu Rengi", default: "#C8A96E", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 80, min: 32, max: 200, group: "Düzen" }
    ]
  },

  recentViews: {
    type: "recentViews", label: "Son Gezdikleriniz", icon: "History", category: "ecommerce",
    description: "Kullanıcının son baktığı ürünler (Mock)",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Son Gezdikleriniz", group: "Metin" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#FDFBF7", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 60, min: 32, max: 200, group: "Düzen" }
    ],
    blocks: [
      { type: "product_item", label: "Ürün", settings: [
        { id: "title", type: "text", label: "Ürün Adı", default: "Ürün" },
        { id: "price", type: "text", label: "Fiyat", default: "0₺" },
        { id: "image", type: "image", label: "Görsel", default: "" }
      ]}
    ]
  },

  featuredCategory: {
    type: "featuredCategory", label: "Öne Çıkan Kategori", icon: "LayoutTemplate", category: "ecommerce",
    description: "Tek kategori büyük tanıtım",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Erkek Klasik Ayakkabılar", group: "Metin" },
      { id: "description", type: "text", label: "Açıklama", default: "Şıklığınızı tamamlayacak el yapımı tasarımlar.", group: "Metin" },
      { id: "image", type: "image", label: "Görsel", default: "", group: "Görsel" },
      { id: "buttonText", type: "text", label: "Buton", default: "Koleksiyonu İncele", group: "Metin" },
      { id: "link", type: "text", label: "Link", default: "#", group: "Metin" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#12100E", group: "Renkler" },
      { id: "textColor", type: "color", label: "Yazı Rengi", default: "#FDFBF7", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 80, min: 32, max: 200, group: "Düzen" }
    ]
  },

  productTabs: {
    type: "productTabs", label: "Sekmeli Ürünler", icon: "Folder", category: "ecommerce",
    description: "Erkek/Kadın vs. sekmeli geçiş",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Koleksiyonlar", group: "Metin" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#FDFBF7", group: "Renkler" },
      { id: "accentColor", type: "color", label: "Vurgu Rengi", default: "#C8A96E", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 80, min: 32, max: 200, group: "Düzen" }
    ],
    blocks: [
      { type: "product_item", label: "Ürün", settings: [
        { id: "title", type: "text", label: "Ürün Adı", default: "Ürün" },
        { id: "price", type: "text", label: "Fiyat", default: "0₺" },
        { id: "image", type: "image", label: "Görsel", default: "" }
      ]}
    ]
  },

  stockScarcity: {
    type: "stockScarcity", label: "Stok Uyarısı", icon: "AlertCircle", category: "ecommerce",
    description: "Tükeniyor animasyonlu bant",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Stoklar Tükeniyor!", group: "Metin" },
      { id: "subtitle", type: "text", label: "Alt Metin", default: "Sınırlı sayıda üretim.", group: "Metin" },
      { id: "stockCount", type: "number", label: "Kalan Stok", default: 3, group: "İçerik" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#FEF2F2", group: "Renkler" },
      { id: "accentColor", type: "color", label: "Vurgu Rengi", default: "#EF4444", group: "Renkler" },
      { id: "textColor", type: "color", label: "Yazı Rengi", default: "#7F1D1D", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 40, min: 0, max: 120, group: "Düzen" }
    ]
  },

  warrantyInfo: {
    type: "warrantyInfo", label: "Garanti Bilgisi", icon: "Shield", category: "ecommerce",
    description: "Garanti ve bakım kapsamı",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Davut Kundura Garantisi", group: "Metin" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#F7F3EE", group: "Renkler" },
      { id: "accentColor", type: "color", label: "Vurgu Rengi", default: "#C8A96E", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 80, min: 32, max: 200, group: "Düzen" }
    ]
  },

  // ==========================================
  // PACKAGE 2: Media, Social Proof & Heroes
  // ==========================================

  carouselHero: {
    type: "carouselHero", label: "Çoklu Banner", icon: "GalleryHorizontal", category: "hero",
    description: "Tam ekran kayan banner",
    settings: [
      { id: "autoplay", type: "checkbox", label: "Otomatik Oynat", default: true, group: "Ayarlar" },
      { id: "delay", type: "number", label: "Süre (ms)", default: 5000, group: "Ayarlar" },
      { id: "height", type: "text", label: "Yükseklik", default: "100vh", group: "Düzen" }
    ],
    blocks: [
      { type: "slide", label: "Slayt", settings: [
        { id: "title", type: "text", label: "Başlık", default: "Slayt" },
        { id: "subtitle", type: "text", label: "Alt Başlık", default: "Detay" },
        { id: "image", type: "image", label: "Görsel", default: "" },
        { id: "btnText", type: "text", label: "Buton", default: "İncele" }
      ]}
    ]
  },

  masonryHero: {
    type: "masonryHero", label: "Asimetrik Giriş", icon: "LayoutGrid", category: "hero",
    description: "3 görselli modern asimetrik banner",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Zarafetin İzleri", group: "Metin" },
      { id: "subtitle", type: "text", label: "Alt Başlık", default: "Yarım asırlık tecrübe", group: "Metin" },
      { id: "btnText", type: "text", label: "Buton", default: "Koleksiyonu Gör", group: "Metin" },
      { id: "img1", type: "image", label: "Görsel 1 (Büyük)", default: "", group: "Görsel" },
      { id: "img2", type: "image", label: "Görsel 2 (Küçük)", default: "", group: "Görsel" },
      { id: "img3", type: "image", label: "Görsel 3 (Küçük)", default: "", group: "Görsel" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#FDFBF7", group: "Renkler" },
      { id: "accentColor", type: "color", label: "Vurgu", default: "#C8A96E", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 80, min: 0, max: 200, group: "Düzen" }
    ]
  },

  videoModalHero: {
    type: "videoModalHero", label: "Video Modal Banner", icon: "PlaySquare", category: "hero",
    description: "Tıklanınca video açılan karanlık banner",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Atölyemize Hoş Geldiniz", group: "Metin" },
      { id: "subtitle", type: "text", label: "Alt Başlık", default: "Sanatın buluştuğu nokta", group: "Metin" },
      { id: "image", type: "image", label: "Arka Plan Görseli", default: "", group: "Görsel" },
      { id: "videoId", type: "text", label: "YouTube Video ID", default: "dQw4w9WgXcQ", group: "Görsel" },
      { id: "bgColor", type: "color", label: "Arka Plan (Overlay)", default: "#12100E", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 120, min: 50, max: 250, group: "Düzen" }
    ]
  },

  searchHero: {
    type: "searchHero", label: "Arama Banner'ı", icon: "Search", category: "hero",
    description: "Büyük arama kutulu banner",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Aradığınız Şıklığı Bulun", group: "Metin" },
      { id: "placeholder", type: "text", label: "Arama Kutusu Metni", default: "Ayakkabı, kemer ara...", group: "Metin" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#F7F3EE", group: "Renkler" },
      { id: "accentColor", type: "color", label: "Vurgu Rengi", default: "#C8A96E", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 120, min: 50, max: 250, group: "Düzen" }
    ]
  },

  mapHero: {
    type: "mapHero", label: "Harita Banner", icon: "Map", category: "hero",
    description: "Arka planı harita olan banner",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Pendik'teki Atölyemiz", group: "Metin" },
      { id: "address", type: "text", label: "Açık Adres", default: "Doğu Mah. Flurya Sok. No:2/B", group: "Metin" },
      { id: "mapZoom", type: "number", label: "Harita Yakınlığı", default: 16, group: "Ayarlar" },
      { id: "height", type: "text", label: "Yükseklik", default: "600px", group: "Düzen" },
      { id: "accentColor", type: "color", label: "Vurgu", default: "#C8A96E", group: "Renkler" }
    ]
  },

  instagramFeed: {
    type: "instagramFeed", label: "Instagram Akışı", icon: "Instagram", category: "social",
    description: "Instagram stili ızgara görünümü",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Bizi Instagram'da Takip Edin", group: "Metin" },
      { id: "handle", type: "text", label: "Kullanıcı Adı", default: "@davutkundura", group: "Metin" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#FDFBF7", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 80, min: 0, max: 200, group: "Düzen" }
    ],
    blocks: [
      { type: "insta_post", label: "Gönderi", settings: [
        { id: "image", type: "image", label: "Görsel", default: "" },
        { id: "likes", type: "text", label: "Beğeni", default: "100" },
        { id: "comments", type: "text", label: "Yorum", default: "5" }
      ]}
    ]
  },

  tiktokFeed: {
    type: "tiktokFeed", label: "TikTok / Reels Akışı", icon: "Video", category: "social",
    description: "Dikey video ızgarası",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Atölyeden Kesitler", group: "Metin" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#12100E", group: "Renkler" },
      { id: "textColor", type: "color", label: "Yazı Rengi", default: "#FDFBF7", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 80, min: 0, max: 200, group: "Düzen" }
    ],
    blocks: [
      { type: "tiktok_post", label: "Video", settings: [
        { id: "image", type: "image", label: "Video Kapağı", default: "" },
        { id: "views", type: "text", label: "İzlenme", default: "10B" }
      ]}
    ]
  },

  videoTestimonials: {
    type: "videoTestimonials", label: "Video Yorumlar", icon: "MonitorPlay", category: "social",
    description: "Müşterilerin video yorumları",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Müşterilerimiz Ne Diyor?", group: "Metin" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#F7F3EE", group: "Renkler" },
      { id: "accentColor", type: "color", label: "Vurgu", default: "#C8A96E", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 80, min: 0, max: 200, group: "Düzen" }
    ],
    blocks: [
      { type: "video_review", label: "Video", settings: [
        { id: "name", type: "text", label: "Müşteri Adı", default: "İsim" },
        { id: "role", type: "text", label: "Ünvan", default: "Müşteri" },
        { id: "image", type: "image", label: "Kapak", default: "" },
        { id: "videoId", type: "text", label: "YouTube ID", default: "dQw4w9WgXcQ" }
      ]}
    ]
  },

  reviewGrid: {
    type: "reviewGrid", label: "Detaylı Yorum Izgarası", icon: "MessageSquare", category: "social",
    description: "Yıldızlı ve detaylı yorum kartları",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Gerçek Deneyimler", group: "Metin" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#FDFBF7", group: "Renkler" },
      { id: "accentColor", type: "color", label: "Yıldız Rengi", default: "#C8A96E", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 80, min: 0, max: 200, group: "Düzen" }
    ],
    blocks: [
      { type: "review", label: "Yorum", settings: [
        { id: "name", type: "text", label: "İsim", default: "Müşteri" },
        { id: "review", type: "textarea", label: "Yorum", default: "Harika." },
        { id: "rating", type: "number", label: "Puan", default: 5 },
        { id: "date", type: "text", label: "Tarih", default: "1 gün önce" }
      ]}
    ]
  },

  successStories: {
    type: "successStories", label: "Başarı Hikayesi", icon: "BookOpen", category: "social",
    description: "Uzun metinli ve öncesi/sonrası görselli hikaye",
    settings: [
      { id: "title", type: "text", label: "Üst Başlık", default: "Bir Dönüşüm Hikayesi", group: "Metin" },
      { id: "text", type: "textarea", label: "Hikaye", default: "Çok eskiydi, yeni oldu.", group: "Metin" },
      { id: "author", type: "text", label: "Sahibi", default: "Mustafa K.", group: "Metin" },
      { id: "beforeImage", type: "image", label: "Öncesi", default: "", group: "Görsel" },
      { id: "afterImage", type: "image", label: "Sonrası", default: "", group: "Görsel" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#12100E", group: "Renkler" },
      { id: "textColor", type: "color", label: "Yazı Rengi", default: "#FDFBF7", group: "Renkler" },
      { id: "accentColor", type: "color", label: "Vurgu", default: "#C8A96E", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 100, min: 0, max: 200, group: "Düzen" }
    ]
  },

  influencerPicks: {
    type: "influencerPicks", label: "Ünlülerin Tercihleri", icon: "Star", category: "social",
    description: "Profil fotolu ve mavi tikli yorumlar",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Ünlülerin Tercihleri", group: "Metin" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#12100E", group: "Renkler" },
      { id: "textColor", type: "color", label: "Yazı Rengi", default: "#FDFBF7", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 80, min: 0, max: 200, group: "Düzen" }
    ],
    blocks: [
      { type: "pick", label: "Kişi", settings: [
        { id: "name", type: "text", label: "İsim", default: "İsim" },
        { id: "role", type: "text", label: "Ünvan", default: "Ünvan" },
        { id: "quote", type: "text", label: "Alıntı", default: "Harika." },
        { id: "image", type: "image", label: "Profil Görseli", default: "" }
      ]}
    ]
  },

  userGenerated: {
    type: "userGenerated", label: "Sizden Gelenler", icon: "Camera", category: "social",
    description: "Asimetrik karma görsel galerisi",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Sizden Gelenler", group: "Metin" },
      { id: "subtitle", type: "text", label: "Alt Başlık", default: "#DavutKundura", group: "Metin" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#FDFBF7", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 80, min: 0, max: 200, group: "Düzen" }
    ],
    blocks: [
      { type: "ugc", label: "Görsel", settings: [
        { id: "image", type: "image", label: "Görsel", default: "" }
      ]}
    ]
  },

  asSeenOnText: {
    type: "asSeenOnText", label: "Basında Biz (Metin)", icon: "Type", category: "social",
    description: "Büyük tipografik marka isimleri",
    settings: [
      { id: "title", type: "text", label: "Üst Başlık", default: "Basında Biz", group: "Metin" },
      { id: "publications", type: "text", label: "Markalar (Virgülle)", default: "Vogue, GQ, Forbes", group: "Metin" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#12100E", group: "Renkler" },
      { id: "accentColor", type: "color", label: "Vurgu Rengi", default: "#C8A96E", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 80, min: 0, max: 200, group: "Düzen" }
    ]
  },

  audioPlayer: {
    type: "audioPlayer", label: "Ses Oynatıcı", icon: "Music", category: "content",
    description: "Podcast / Atölye sesi için sahte oynatıcı",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Atölyenin Sesi", group: "Metin" },
      { id: "subtitle", type: "text", label: "Alt Başlık", default: "Çekiç sesleri...", group: "Metin" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#F7F3EE", group: "Renkler" },
      { id: "accentColor", type: "color", label: "Vurgu", default: "#C8A96E", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 80, min: 0, max: 200, group: "Düzen" }
    ]
  },

  parallaxImage: {
    type: "parallaxImage", label: "Paralaks Görsel", icon: "ArrowDownUp", category: "media",
    description: "Aşağı kaydırdıkça hareket eden arka plan",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Gerçek Deri", group: "Metin" },
      { id: "image", type: "image", label: "Arka Plan Görseli", default: "", group: "Görsel" },
      { id: "height", type: "text", label: "Yükseklik", default: "500px", group: "Düzen" }
    ]
  },

  imageHotspots: {
    type: "imageHotspots", label: "Noktalı Anatomi", icon: "Target", category: "media",
    description: "Görsel üstünde + ikonlu bilgi noktaları",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Ürün Anatomisi", group: "Metin" },
      { id: "image", type: "image", label: "Görsel", default: "", group: "Görsel" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#FDFBF7", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 80, min: 0, max: 200, group: "Düzen" }
    ],
    blocks: [
      { type: "hotspot", label: "Nokta", settings: [
        { id: "x", type: "number", label: "X Konumu (%)", default: 50 },
        { id: "y", type: "number", label: "Y Konumu (%)", default: 50 },
        { id: "title", type: "text", label: "Başlık", default: "Özellik" },
        { id: "desc", type: "text", label: "Açıklama", default: "Açıklama" }
      ]}
    ]
  },

  beforeAfterVertical: {
    type: "beforeAfterVertical", label: "Öncesi/Sonrası (Dikey)", icon: "Sliders", category: "media",
    description: "Yukarı/aşağı sürüklemeli değişim",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Kusursuz Değişim", group: "Metin" },
      { id: "beforeImg", type: "image", label: "Öncesi", default: "", group: "Görsel" },
      { id: "afterImg", type: "image", label: "Sonrası", default: "", group: "Görsel" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#12100E", group: "Renkler" },
      { id: "textColor", type: "color", label: "Yazı", default: "#FDFBF7", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 80, min: 0, max: 200, group: "Düzen" }
    ]
  },

  logoMarquee: {
    type: "logoMarquee", label: "Kayan Logolar", icon: "MoveRight", category: "media",
    description: "Logoların sürekli kaydığı bant",
    settings: [
      { id: "title", type: "text", label: "Üst Başlık", default: "Kurumsal Müşteriler", group: "Metin" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#FDFBF7", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 60, min: 0, max: 200, group: "Düzen" }
    ],
    blocks: [
      { type: "logo", label: "Logo", settings: [
        { id: "name", type: "text", label: "Yazı/İsim", default: "Marka" }
      ]}
    ]
  },

  textMarqueeHollow: {
    type: "textMarqueeHollow", label: "Kayan Şeffaf Metin", icon: "Type", category: "media",
    description: "İçi boşaltılmış, sadece çizgili kayan metin",
    settings: [
      { id: "text", type: "text", label: "Kayan Metin", default: "ÖZEL SİPARİŞ", group: "Metin" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#C8A96E", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 40, min: 0, max: 200, group: "Düzen" }
    ]
  },

  interactiveMap: {
    type: "interactiveMap", label: "Etkileşimli Harita", icon: "MapPin", category: "info",
    description: "Şube seçilebilen görsel harita",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Mağazalarımız", group: "Metin" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#FDFBF7", group: "Renkler" },
      { id: "accentColor", type: "color", label: "Vurgu", default: "#C8A96E", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 80, min: 0, max: 200, group: "Düzen" }
    ],
    blocks: [
      { type: "location", label: "Şube", settings: [
        { id: "name", type: "text", label: "Şube Adı", default: "Şube" },
        { id: "address", type: "text", label: "Adres", default: "Adres" },
        { id: "phone", type: "text", label: "Telefon", default: "Telefon" },
        { id: "hours", type: "text", label: "Saatler", default: "09:00 - 20:00" }
      ]}
    ]
  },

  // ==========================================
  // PACKAGE 3: Content, Layout & Blog
  // ==========================================

  stepByStep: {
    type: "stepByStep", label: "Adım Adım Süreç", icon: "ListOrdered", category: "content",
    description: "Numaralı daireler ve açıklama kutuları",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Özel Üretim Sürecimiz", group: "Metin" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#FDFBF7", group: "Renkler" },
      { id: "accentColor", type: "color", label: "Vurgu", default: "#C8A96E", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 80, min: 0, max: 200, group: "Düzen" }
    ],
    blocks: [
      { type: "step", label: "Adım", settings: [
        { id: "title", type: "text", label: "Başlık", default: "Adım" },
        { id: "desc", type: "text", label: "Açıklama", default: "Detay" }
      ]}
    ]
  },

  coreValues: {
    type: "coreValues", label: "Değerlerimiz (İkonlu)", icon: "Shield", category: "content",
    description: "Dörtlü ikon ve metin kartları",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Neden Biz?", group: "Metin" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#12100E", group: "Renkler" },
      { id: "textColor", type: "color", label: "Yazı Rengi", default: "#FDFBF7", group: "Renkler" },
      { id: "accentColor", type: "color", label: "İkon Rengi", default: "#C8A96E", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 80, min: 0, max: 200, group: "Düzen" }
    ],
    blocks: [
      { type: "value", label: "Değer", settings: [
        { id: "icon", type: "select", label: "İkon", options: [{label:"Kalkan",value:"Shield"},{label:"Kalp",value:"Heart"},{label:"Ödül",value:"Award"},{label:"Hedef",value:"Target"}], default: "Shield" },
        { id: "title", type: "text", label: "Başlık", default: "Kalite" },
        { id: "desc", type: "text", label: "Açıklama", default: "Premium" }
      ]}
    ]
  },

  aboutStory: {
    type: "aboutStory", label: "Hikayemiz (İmzalı)", icon: "BookOpen", category: "content",
    description: "Büyük görsel, metin ve imza",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Hikayemiz", group: "Metin" },
      { id: "subtitle", type: "text", label: "Alt Başlık", default: "Tarihçe", group: "Metin" },
      { id: "text", type: "textarea", label: "Metin", default: "Davut Kundura...", group: "Metin" },
      { id: "image", type: "image", label: "Görsel", default: "", group: "Görsel" },
      { id: "signatureImage", type: "image", label: "İmza Görseli", default: "", group: "Görsel" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#F7F3EE", group: "Renkler" },
      { id: "accentColor", type: "color", label: "Vurgu", default: "#C8A96E", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 100, min: 0, max: 200, group: "Düzen" }
    ]
  },

  timelineHorizontal: {
    type: "timelineHorizontal", label: "Yatay Tarihçe", icon: "Clock", category: "content",
    description: "Sağa kaydırılabilen tarih şeridi",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Tarihçemiz", group: "Metin" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#12100E", group: "Renkler" },
      { id: "textColor", type: "color", label: "Yazı Rengi", default: "#FDFBF7", group: "Renkler" },
      { id: "accentColor", type: "color", label: "Vurgu", default: "#C8A96E", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 80, min: 0, max: 200, group: "Düzen" }
    ],
    blocks: [
      { type: "event", label: "Tarih", settings: [
        { id: "year", type: "text", label: "Yıl", default: "1970" },
        { id: "title", type: "text", label: "Başlık", default: "Kuruluş" },
        { id: "desc", type: "text", label: "Açıklama", default: "Atölye açıldı." }
      ]}
    ]
  },

  iconBoxes: {
    type: "iconBoxes", label: "Bilgi Kutuları", icon: "Info", category: "content",
    description: "Kargo, İade vb. küçük ikonlu bilgiler",
    settings: [
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#FDFBF7", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 40, min: 0, max: 200, group: "Düzen" }
    ],
    blocks: [
      { type: "box", label: "Kutu", settings: [
        { id: "icon", type: "select", label: "İkon", options: [{label:"Kargo",value:"Truck"},{label:"İade",value:"RotateCcw"},{label:"Destek",value:"HeadphonesIcon"},{label:"Ödeme",value:"CreditCard"}], default: "Truck" },
        { id: "title", type: "text", label: "Başlık", default: "Bilgi" },
        { id: "desc", type: "text", label: "Açıklama", default: "Açıklama" }
      ]}
    ]
  },

  recentPosts: {
    type: "recentPosts", label: "Güncel Yazılar", icon: "Newspaper", category: "blog",
    description: "Tarihli ve görselli 3'lü blog gridi",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Güncel Yazılar", group: "Metin" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#FDFBF7", group: "Renkler" },
      { id: "accentColor", type: "color", label: "Vurgu", default: "#C8A96E", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 80, min: 0, max: 200, group: "Düzen" }
    ],
    blocks: [
      { type: "post", label: "Yazı", settings: [
        { id: "title", type: "text", label: "Başlık", default: "Makale" },
        { id: "date", type: "text", label: "Tarih", default: "12 Mayıs 2026" },
        { id: "image", type: "image", label: "Görsel", default: "" }
      ]}
    ]
  },

  featuredArticle: {
    type: "featuredArticle", label: "Öne Çıkan Makale", icon: "Star", category: "blog",
    description: "Tam genişlikli büyük arka planlı yazı",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Gerçek Deri Nasıl Anlaşılır?", group: "Metin" },
      { id: "excerpt", type: "text", label: "Özet", default: "Kısa açıklama...", group: "Metin" },
      { id: "category", type: "text", label: "Kategori", default: "Rehber", group: "Metin" },
      { id: "image", type: "image", label: "Arka Plan", default: "", group: "Görsel" },
      { id: "bgColor", type: "color", label: "Dış Arka Plan", default: "#12100E", group: "Renkler" },
      { id: "textColor", type: "color", label: "Yazı Rengi", default: "#FDFBF7", group: "Renkler" },
      { id: "accentColor", type: "color", label: "Vurgu", default: "#C8A96E", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 80, min: 0, max: 200, group: "Düzen" }
    ]
  },

  blogCarousel: {
    type: "blogCarousel", label: "Blog Karuseli", icon: "GalleryHorizontal", category: "blog",
    description: "Sağa kaydırılabilen dikey makale kartları",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Okumanız Gerekenler", group: "Metin" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#FDFBF7", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 80, min: 0, max: 200, group: "Düzen" }
    ],
    blocks: [
      { type: "post", label: "Yazı", settings: [
        { id: "title", type: "text", label: "Başlık", default: "Makale" },
        { id: "image", type: "image", label: "Görsel", default: "" }
      ]}
    ]
  },

  authorBio: {
    type: "authorBio", label: "Yazar Biyografisi", icon: "User", category: "blog",
    description: "Profil fotoğrafı ve kısa özgeçmiş kutusu",
    settings: [
      { id: "name", type: "text", label: "İsim", default: "Davut Usta", group: "Metin" },
      { id: "role", type: "text", label: "Rol", default: "Baş Zanaatkar", group: "Metin" },
      { id: "bio", type: "textarea", label: "Hakkında", default: "Yarım asırlık tecrübe...", group: "Metin" },
      { id: "image", type: "image", label: "Profil", default: "", group: "Görsel" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#F7F3EE", group: "Renkler" },
      { id: "accentColor", type: "color", label: "Vurgu", default: "#C8A96E", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 60, min: 0, max: 200, group: "Düzen" }
    ]
  },

  tagCloud: {
    type: "tagCloud", label: "Etiket Bulutu", icon: "Hash", category: "blog",
    description: "Arama butonlarından oluşan liste",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Popüler Aramalar", group: "Metin" },
      { id: "tags", type: "text", label: "Etiketler (Virgülle)", default: "Deri Bakımı, Oxford", group: "Metin" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#FDFBF7", group: "Renkler" },
      { id: "accentColor", type: "color", label: "Vurgu", default: "#C8A96E", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 60, min: 0, max: 200, group: "Düzen" }
    ]
  },

  subscribeBox: {
    type: "subscribeBox", label: "Bülten Aboneliği", icon: "Mail", category: "layout",
    description: "E-posta kayıt formu",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Elite Club'a Katılın", group: "Metin" },
      { id: "subtitle", type: "text", label: "Alt Başlık", default: "İlk sizin haberiniz olsun.", group: "Metin" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#12100E", group: "Renkler" },
      { id: "accentColor", type: "color", label: "Buton", default: "#C8A96E", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 80, min: 0, max: 200, group: "Düzen" }
    ]
  },

  waveDivider: {
    type: "waveDivider", label: "Dalgalı Ayırıcı", icon: "Waves", category: "layout",
    description: "Bölümler arası dalgalı geçiş SVG",
    settings: [
      { id: "topColor", type: "color", label: "Üst Renk", default: "#ffffff", group: "Renkler" },
      { id: "bottomColor", type: "color", label: "Alt Renk", default: "#12100E", group: "Renkler" },
      { id: "flip", type: "checkbox", label: "Ters Çevir", default: false, group: "Düzen" }
    ]
  },

  slantDivider: {
    type: "slantDivider", label: "Eğik Kesim Ayırıcı", icon: "Slash", category: "layout",
    description: "Keskin çapraz geçiş",
    settings: [
      { id: "topColor", type: "color", label: "Üst Renk", default: "#F7F3EE", group: "Renkler" },
      { id: "bottomColor", type: "color", label: "Alt Renk", default: "#12100E", group: "Renkler" },
      { id: "angle", type: "number", label: "Açı (Derece)", default: 5, group: "Düzen" }
    ]
  },

  textColumnsWithImages: {
    type: "textColumnsWithImages", label: "Görselli 3 Kolon", icon: "Columns", category: "content",
    description: "Yuvarlak görseller ve altında metin",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Neden Biz?", group: "Metin" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#FDFBF7", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 80, min: 0, max: 200, group: "Düzen" }
    ],
    blocks: [
      { type: "col", label: "Sütun", settings: [
        { id: "title", type: "text", label: "Başlık", default: "Başlık" },
        { id: "text", type: "text", label: "Metin", default: "Metin" },
        { id: "image", type: "image", label: "Görsel", default: "" }
      ]}
    ]
  },

  quoteBlock: {
    type: "quoteBlock", label: "Büyük Alıntı", icon: "Quote", category: "content",
    description: "Merkeze hizalı tipografik söz",
    settings: [
      { id: "quote", type: "text", label: "Alıntı Söz", default: "İyi bir ayakkabı...", group: "Metin" },
      { id: "author", type: "text", label: "Yazar", default: "Davut Usta", group: "Metin" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#12100E", group: "Renkler" },
      { id: "textColor", type: "color", label: "Yazı", default: "#FDFBF7", group: "Renkler" },
      { id: "accentColor", type: "color", label: "Vurgu", default: "#C8A96E", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 100, min: 0, max: 200, group: "Düzen" }
    ]
  },

  collapsibleList: {
    type: "collapsibleList", label: "Sıkça Sorulan Sorular", icon: "List", category: "content",
    description: "Açılır kapanır akordeon liste",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Sıkça Sorulan Sorular", group: "Metin" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#FDFBF7", group: "Renkler" },
      { id: "accentColor", type: "color", label: "Açık Durum", default: "#C8A96E", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 80, min: 0, max: 200, group: "Düzen" }
    ],
    blocks: [
      { type: "faq", label: "Soru", settings: [
        { id: "question", type: "text", label: "Soru", default: "Soru?" },
        { id: "answer", type: "textarea", label: "Cevap", default: "Cevap." }
      ]}
    ]
  },

  jobOpenings: {
    type: "jobOpenings", label: "Kariyer / Açık Pozisyonlar", icon: "Briefcase", category: "info",
    description: "Başvuru linkli iş ilanları",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Kariyer", group: "Metin" },
      { id: "subtitle", type: "text", label: "Alt Başlık", default: "Ailemize katılın", group: "Metin" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#FDFBF7", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 80, min: 0, max: 200, group: "Düzen" }
    ],
    blocks: [
      { type: "job", label: "İlan", settings: [
        { id: "title", type: "text", label: "Pozisyon", default: "Usta" },
        { id: "type", type: "text", label: "Tip", default: "Tam Zamanlı" },
        { id: "location", type: "text", label: "Konum", default: "Pendik" }
      ]}
    ]
  },

  downloadAssets: {
    type: "downloadAssets", label: "İndirilebilir Dosyalar", icon: "Download", category: "info",
    description: "Katalog vb. PDF indirme butonları",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Kataloglar", group: "Metin" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#12100E", group: "Renkler" },
      { id: "textColor", type: "color", label: "Yazı", default: "#FDFBF7", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 80, min: 0, max: 200, group: "Düzen" }
    ],
    blocks: [
      { type: "file", label: "Dosya", settings: [
        { id: "title", type: "text", label: "Dosya Adı", default: "Katalog" },
        { id: "size", type: "text", label: "Boyut/Tür", default: "10 MB PDF" }
      ]}
    ]
  },

  eventCalendar: {
    type: "eventCalendar", label: "Etkinlikler & Fuarlar", icon: "CalendarDays", category: "info",
    description: "Tarihli etkinlik listesi",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Fuarlar", group: "Metin" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#FDFBF7", group: "Renkler" },
      { id: "accentColor", type: "color", label: "Tarih Rengi", default: "#C8A96E", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 80, min: 0, max: 200, group: "Düzen" }
    ],
    blocks: [
      { type: "event", label: "Etkinlik", settings: [
        { id: "day", type: "text", label: "Gün", default: "15" },
        { id: "month", type: "text", label: "Ay", default: "Ağu" },
        { id: "title", type: "text", label: "Etkinlik", default: "Fuar" },
        { id: "location", type: "text", label: "Konum", default: "Milano" }
      ]}
    ]
  },

  tableOfContents: {
    type: "tableOfContents", label: "İçindekiler (Blog)", icon: "List", category: "blog",
    description: "Uzun yazılar için çapa linkli liste",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "İçindekiler", group: "Metin" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#F7F3EE", group: "Renkler" },
      { id: "accentColor", type: "color", label: "Vurgu", default: "#C8A96E", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 60, min: 0, max: 200, group: "Düzen" }
    ],
    blocks: [
      { type: "link", label: "Bağlantı", settings: [
        { id: "title", type: "text", label: "Başlık", default: "Konu" },
        { id: "id_link", type: "text", label: "Sayfa İçi ID (#)", default: "konu-1" }
      ]}
    ]
  },

  // ==========================================
  // PACKAGE 4: Navigation, Modals & Interactions
  // ==========================================

  popupModal: {
    type: "popupModal", label: "İndirim Pop-up", icon: "MessageSquare", category: "interaction",
    description: "Belirli süre sonra açılan indirim penceresi",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Özel Fırsat", group: "Metin" },
      { id: "text", type: "textarea", label: "Açıklama", default: "İlk siparişinize %15 indirim.", group: "Metin" },
      { id: "delay", type: "number", label: "Gecikme (Sn)", default: 3, group: "Ayarlar" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#12100E", group: "Renkler" },
      { id: "accentColor", type: "color", label: "Buton", default: "#C8A96E", group: "Renkler" }
    ]
  },

  ageVerificationModal: {
    type: "ageVerificationModal", label: "Yaş Doğrulaması", icon: "ShieldAlert", category: "interaction",
    description: "Siteye girişte 18+ onayı ister",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Yaş Doğrulaması", group: "Metin" },
      { id: "text", type: "textarea", label: "Metin", default: "18 yaşından büyük olmalısınız.", group: "Metin" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#12100E", group: "Renkler" },
      { id: "accentColor", type: "color", label: "Buton", default: "#C8A96E", group: "Renkler" }
    ]
  },

  videoBackground: {
    type: "videoBackground", label: "Video Arka Planı", icon: "Video", category: "media",
    description: "Tam ekran sessiz dönen video alanı",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Sanatın Ritmi", group: "Metin" },
      { id: "subtitle", type: "text", label: "Alt Başlık", default: "Atölyemizin Kalbi", group: "Metin" },
      { id: "videoUrl", type: "text", label: "Video URL (.mp4)", default: "https://www.w3schools.com/html/mov_bbb.mp4", group: "Görsel" },
      { id: "height", type: "text", label: "Yükseklik", default: "100vh", group: "Düzen" }
    ]
  },

  product360Viewer: {
    type: "product360Viewer", label: "360° İnceleme", icon: "Rotate3d", category: "interaction",
    description: "Fare ile ürün döndürme simülasyonu",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "360° İnceleyin", group: "Metin" },
      { id: "images", type: "text", label: "Görseller (Virgülle)", default: "img1,img2", group: "Görsel" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#FDFBF7", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 80, min: 0, max: 200, group: "Düzen" }
    ]
  },

  floatingActionMenu: {
    type: "floatingActionMenu", label: "Sabit İletişim Menüsü", icon: "MessageCircle", category: "interaction",
    description: "Sağ altta duran Whatsapp/Telefon butonları",
    settings: [
      { id: "whatsapp", type: "text", label: "WhatsApp No", default: "+905551234567", group: "İletişim" },
      { id: "phone", type: "text", label: "Telefon No", default: "+902161234567", group: "İletişim" },
      { id: "accentColor", type: "color", label: "Ana İkon Rengi", default: "#C8A96E", group: "Renkler" }
    ]
  },

  megaMenuPlaceholder: {
    type: "megaMenuPlaceholder", label: "Üst Menü (Mega)", icon: "Menu", category: "layout",
    description: "Sayfa üstüne yapışan yapay menü çubuğu",
    settings: [
      { id: "title", type: "text", label: "Logo/Marka Adı", default: "DAVUT KUNDURA", group: "Metin" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#FDFBF7", group: "Renkler" }
    ]
  },

  stickyBanner: {
    type: "stickyBanner", label: "Kayan Duyuru Bandı", icon: "ArrowDownUp", category: "layout",
    description: "Ücretsiz kargo vs. duyurular için tepe bandı",
    settings: [
      { id: "text", type: "text", label: "Duyuru Metni", default: "Ücretsiz Kargo!", group: "Metin" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#C8A96E", group: "Renkler" },
      { id: "textColor", type: "color", label: "Yazı", default: "#FFFFFF", group: "Renkler" }
    ]
  },

  countdownTimer: {
    type: "countdownTimer", label: "Geri Sayım Aracı", icon: "Clock", category: "interaction",
    description: "Kampanya sonlanma süresi sayacı",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "İndirim Bitiyor", group: "Metin" },
      { id: "date", type: "text", label: "Tarih (ISO)", default: "2026-12-31T23:59:59", group: "Ayarlar" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#12100E", group: "Renkler" },
      { id: "accentColor", type: "color", label: "Sayaç Rengi", default: "#C8A96E", group: "Renkler" },
      { id: "textColor", type: "color", label: "Yazı", default: "#FDFBF7", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 60, min: 0, max: 200, group: "Düzen" }
    ]
  },

  beforeAfterSlider: {
    type: "beforeAfterSlider", label: "Öncesi/Sonrası (Yatay)", icon: "ArrowLeftRight", category: "media",
    description: "Sağa/sola kaydırılabilen öncesi sonrası aracı",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Yenilenme Süreci", group: "Metin" },
      { id: "beforeImg", type: "image", label: "Öncesi", default: "", group: "Görsel" },
      { id: "afterImg", type: "image", label: "Sonrası", default: "", group: "Görsel" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#FDFBF7", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 80, min: 0, max: 200, group: "Düzen" }
    ]
  },

  scratchCard: {
    type: "scratchCard", label: "Kazı Kazan İndirimi", icon: "Gift", category: "interaction",
    description: "Tıklanınca kazınan indirim kartı (oyunlaştırma)",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Şansını Dene!", group: "Metin" },
      { id: "discount", type: "text", label: "Sonuç Metni", default: "%20 İndirim", group: "Metin" },
      { id: "code", type: "text", label: "İndirim Kodu", default: "DAVUT20", group: "Metin" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#12100E", group: "Renkler" },
      { id: "accentColor", type: "color", label: "Kazıma Yüzeyi", default: "#C8A96E", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 80, min: 0, max: 200, group: "Düzen" }
    ]
  },

  pricingCalculator: {
    type: "pricingCalculator", label: "Fiyat Hesaplayıcı", icon: "Calculator", category: "interaction",
    description: "Özel siparişler için canlı fiyat hesaplama aracı",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Özel Üretim Hesapla", group: "Metin" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#FDFBF7", group: "Renkler" },
      { id: "accentColor", type: "color", label: "Buton Rengi", default: "#C8A96E", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 80, min: 0, max: 200, group: "Düzen" }
    ]
  },

  storeTour: {
    type: "storeTour", label: "Sanal Mağaza Turu", icon: "Map", category: "interaction",
    description: "3D sanal tura giriş butonu/alanı",
    settings: [
      { id: "title", type: "text", label: "Başlık", default: "Sanal Mağaza Turu", group: "Metin" },
      { id: "bgColor", type: "color", label: "Arka Plan", default: "#12100E", group: "Renkler" },
      { id: "paddingY", type: "range", label: "Dikey Boşluk", default: 120, min: 0, max: 200, group: "Düzen" }
    ]
  },

  footer: {
    type: "footer", label: "Alt Bilgi (Footer)", icon: "PanelBottom", category: "layout",
    description: "Site alt kısım navigasyon",
    settings: [
      { id: "topBarText", type: "text", label: "Üst Bant Yazısı", default: "EL İŞÇİLİĞİ • PREMIUM KALİTE", group: "Metin" },
      { id: "backgroundColor", type: "color", label: "Arka Plan Rengi", default: "#1a1a1a", group: "Renkler" },
      { id: "textColor", type: "color", label: "Yazı Rengi", default: "#ffffff", group: "Renkler" },
      { id: "accentColor", type: "color", label: "Vurgu Rengi", default: "#C8A96E", group: "Renkler" },
      { id: "showSocial", type: "checkbox", label: "Sosyal Medya Göster", default: true, group: "Genel" },
      { id: "copyrightText", type: "text", label: "Telif Hakkı", default: "© 2026 Davut Kundura", group: "Metin" },
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
        { id: "address", type: "textarea", label: "Adres", default: "Doğu Mah. Flurya Sok. No:2/B Pendik" },
        { id: "phone", type: "text", label: "Telefon", default: "+90 538 625 87 92" },
        { id: "email", type: "text", label: "E-posta", default: "info@davutkundura.com" },
      ]},
    ],
  },
}
