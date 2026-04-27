export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  features?: string[];
}

export const PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Premium Ortopedik Spor Taban",
    category: "Ortopedik Taban",
    price: 349.90,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop",
    description: "Ayak anatomisine tam uyum sağlayan, yüksek şok emici özellikte premium spor tabanlık. Uzun süreli ayakta kalanlar ve sporcular için özel olarak tasarlanmıştır.",
    features: ["%100 Nefes Alabilir Doku", "Topuk ve Kemer Desteği", "Ultra Hafif Materyal"]
  },
  {
    id: "prod-2",
    name: "Hakiki Deri Klasik Erkek Kemeri",
    category: "Kemer",
    price: 599.00,
    image: "https://images.unsplash.com/photo-1624222247344-550fb60eba1c?q=80&w=800&auto=format&fit=crop",
    description: "Usta ellerden çıkmış %100 hakiki dana derisi klasik erkek kemeri. Zamanla güzelleşen doğal dokusuyla uzun yıllar şıklığınızı tamamlayacak.",
    features: ["Hakiki Dana Derisi", "Paslanmaz Çelik Toka", "El İşçiliği Kenar Boyaması"]
  },
  {
    id: "prod-3",
    name: "Profesyonel Ayakkabı Bakım Seti",
    category: "Ayakkabı Bakım",
    price: 249.50,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop",
    description: "Deri ayakkabılarınızın ömrünü uzatan tam kapsamlı bakım seti. Besleyici cila, yumuşak at kılı fırça ve temizleme solüsyonu içerir.",
    features: ["Doğal Bal Mumu Cila", "At Kılı Fırça", "Premium Saklama Kutusu"]
  },
  {
    id: "prod-4",
    name: "Valiz Yedek Tekerlek (360° Dönebilen)",
    category: "Valiz Yedek Parça",
    price: 189.90,
    image: "https://images.unsplash.com/photo-1565026057447-bc9082fce004?q=80&w=800&auto=format&fit=crop",
    description: "Dayanıklı poliüretan malzemeden üretilmiş sessiz ve 360 derece dönebilen yedek valiz tekerleği. Üniversal tasarımıyla birçok modele uyumludur.",
    features: ["Sessiz Sürüş Teknolojisi", "360 Derece Dönüş", "Kolay Montaj (Vidalar Dahil)"]
  },
  {
    id: "prod-5",
    name: "Comfort Serisi Topuk Dikeni Yastığı",
    category: "Ortopedik Taban",
    price: 129.90,
    image: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?q=80&w=800&auto=format&fit=crop",
    description: "Topuk dikeni rahatsızlığı olanlar için medikal silikon malzemeden üretilmiş koruyucu destek. Topuğa binen yükü eşit dağıtarak ağrıyı hafifletir.",
    features: ["Hipoalerjenik Tıbbi Silikon", "Yıkanabilir ve Tekrar Kullanılabilir", "Gizli Boy Uzatıcı Etki (1cm)"]
  },
  {
    id: "prod-6",
    name: "Kadın Zarif Deri İnce Kemer",
    category: "Kemer",
    price: 349.00,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop",
    description: "Elbise ve kumaş pantolonlarla kusursuz uyum sağlayan ince yapılı zarif kadın deri kemeri. Altın renkli zarif tokasıyla öne çıkar.",
    features: ["Premium İnce Deri", "Minimalist Altın Renk Toka", "Farklı Renk Seçenekleri"]
  }
];
