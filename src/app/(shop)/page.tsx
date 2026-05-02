import Link from "next/link";
import { ArrowRight, Truck, ShieldCheck, RefreshCw, Star, ArrowUpRight } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import LiveHeroClient from "@/components/builder/LiveHeroClient";
import { prisma } from "@/lib/prisma";

// Her istekte dinamik olarak render et (derleme sırasında DB bağlantısı YOK)
export const dynamic = "force-dynamic";

export default async function ShopHome() {
  // Veritabanı bağlantı hatalarında sayfa yine de açılsın
  let BestsellerProducts: any[] = [];
  let heroData: any = null;

  try {
    const [productsRes, pageRes] = await Promise.all([
      prisma.product.findMany({
        where: { status: "ACTIVE" },
        orderBy: { createdAt: "desc" },
        take: 4,
        include: {
          variants: true,
          reviews: true,
        }
      }),
      prisma.storePage.findUnique({
        where: { slug: "home" },
        include: { blocks: true }
      })
    ]);
    
    BestsellerProducts = productsRes;
    
    if (pageRes && pageRes.blocks) {
      const heroBlock = pageRes.blocks.find(b => b.type === "Hero");
      if (heroBlock && heroBlock.content) {
        heroData = heroBlock.content;
      }
    }
  } catch (error) {
    console.error("Veriler yüklenemedi:", error);
  }

  const displayHeroTitle = heroData?.heroTitle || `Zarafetin <br /> <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#f3e5ab] italic font-light">Adımları.</span>`;
  const displayHeroSubtitle = heroData?.heroSubtitle || "Usta ellerde işlenen hakiki deri, modern silüetlerle buluşuyor. Tarzınızı yansıtacak eşsiz bir deneyime hazır olun.";
  const displayButtonText = heroData?.buttonText || "KOLEKSİYONU KEŞFET";

  const hasProducts = BestsellerProducts.length > 0;

  return (
    <div className="flex flex-col pb-0 bg-[#fbfaf9] overflow-hidden">
      {/* Live Builder Connected Hero Section */}
      <LiveHeroClient initialData={heroData} />

      {/* Marquee Banner */}
      <div className="bg-[#1a120b] py-4 border-y border-white/10 overflow-hidden whitespace-nowrap flex relative">
        <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-[#1a120b] to-transparent z-10" />
        <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-[#1a120b] to-transparent z-10" />
        
        <div className="animate-marquee flex gap-12 items-center text-[#d4af37]/60 text-xs md:text-sm font-medium tracking-[0.2em] uppercase">
          <span>%100 Hakiki Deri</span>
          <span>•</span>
          <span>El İşçiliği</span>
          <span>•</span>
          <span>Premium Kalite</span>
          <span>•</span>
          <span>Ücretsiz Kargo</span>
          <span>•</span>
          <span>%100 Hakiki Deri</span>
          <span>•</span>
          <span>El İşçiliği</span>
          <span>•</span>
          <span>Premium Kalite</span>
          <span>•</span>
          <span>Ücretsiz Kargo</span>
          <span>•</span>
          <span>%100 Hakiki Deri</span>
          <span>•</span>
          <span>El İşçiliği</span>
          <span>•</span>
          <span>Premium Kalite</span>
          <span>•</span>
          <span>Ücretsiz Kargo</span>
          <span>•</span>
        </div>
      </div>

      {/* Featured Products */}
      <section className="container mx-auto px-6 lg:px-16 py-24 md:py-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-[#e5e5e5] pb-8 animate-fade-up">
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <span className="h-[1px] w-12 bg-[#d4af37]"></span>
              <span className="text-[#d4af37] font-medium tracking-widest text-xs uppercase">Özel Seçimler</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1a120b] tracking-tight">Yeni Gelenler</h2>
          </div>
          <Link href="/products" className="text-sm font-bold text-[#1a120b] hover:text-[#d4af37] transition-colors flex items-center gap-1 group mt-6 md:mt-0 pb-1 border-b-2 border-transparent hover:border-[#d4af37]">
            TÜM KOLEKSİYON <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {!hasProducts ? (
          <div className="text-center py-20 bg-white rounded-xl border border-dashed border-[#d4d4d4] animate-fade-up delay-200">
            <p className="text-[#666] font-medium">Henüz ürün eklenmemiş.</p>
            <p className="text-sm text-[#999] mt-1">Yönetim panelinden ürün eklediğinizde burada görünecektir.</p>
            <Link href="/admin/products" className="mt-4 inline-block bg-[#1a120b] text-white px-6 py-2 rounded-sm text-sm hover:bg-[#d4af37] transition-colors">Panel'e Git</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 animate-fade-up delay-200">
            {BestsellerProducts.map((product) => {
              const formattedProduct = {
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                compareAtPrice: product.compareAtPrice,
                category: product.category,
                imageUrls: product.imageUrls && product.imageUrls.length > 0 ? product.imageUrls : ["https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop"],
                slug: product.slug,
                stock: product.stock,
              };
              return <ProductCard key={product.id} product={formattedProduct as any} />;
            })}
          </div>
        )}
      </section>

      {/* Featured Banner / Story Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <div className="w-full lg:w-1/2 relative group">
              <div className="absolute -inset-4 bg-[#f5f1ea] rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition duration-1000"></div>
              <img 
                src="https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=1000&auto=format&fit=crop" 
                alt="Usta işçilik" 
                className="relative rounded-2xl w-full object-cover h-[500px] md:h-[650px] shadow-2xl"
              />
              <div className="absolute -bottom-8 -right-8 bg-white p-6 shadow-xl rounded-xl max-w-xs hidden md:block animate-fade-up delay-300">
                <div className="flex gap-1 text-[#d4af37] mb-2">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <p className="text-sm font-medium text-[#1a120b] italic">"Hayatımda giydiğim en rahat ve en şık deri ayakkabı. İşçilik muazzam."</p>
                <p className="text-xs text-[#666] mt-2 font-bold">— Ahmet Y.</p>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 space-y-8 animate-fade-up delay-200">
              <div className="flex items-center gap-4">
                <span className="h-[1px] w-12 bg-[#d4af37]"></span>
                <span className="text-[#d4af37] font-medium tracking-widest text-xs uppercase">Zanaatın İzi</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1a120b] leading-[1.1] tracking-tight">
                Her Adımda <br/><span className="text-[#d4af37] italic">Ustalık.</span>
              </h2>
              <p className="text-[#666] text-lg leading-relaxed font-light">
                Yılların getirdiği tecrübe ve özenle seçilmiş en kaliteli hakiki deriler, usta ellerde birer sanat eserine dönüşüyor. Davut Kundura olarak sadece bir ayakkabı değil, nesilden nesile aktarılacak bir miras tasarlıyoruz.
              </p>
              <ul className="space-y-4 pt-4">
                {[
                  "İtalya'dan özel ithal edilen birinci sınıf deriler",
                  "El işçiliği ile şekillendirilen anatomik kalıplar",
                  "Nefes alabilen, terlemeyi önleyen özel iç astar",
                  "Zaman meydan okuyan, klasik ve modern çizgiler"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#f5f1ea] text-[#d4af37] flex items-center justify-center mt-0.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-[#444] font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="pt-8">
                <Link href="/about" className="inline-flex items-center gap-2 text-[#1a120b] font-bold border-b-2 border-[#1a120b] pb-1 hover:text-[#d4af37] hover:border-[#d4af37] transition-all">
                  HİKAYEMİZİ OKUYUN <ArrowUpRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Banner */}
      <section className="bg-[#1a120b] py-20 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#d4af37]/10 rounded-full blur-3xl"></div>
        
        <div className="container relative z-10 mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="flex flex-col items-center text-center px-4 group">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#d4af37]/20 transition-all duration-500">
                <Truck className="h-7 w-7 text-[#d4af37]" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3">Hızlı Teslimat</h3>
              <p className="text-white/60 text-sm leading-relaxed max-w-xs">Özenle paketlenen siparişleriniz, 24 saat içinde sigortalı olarak kargoya teslim edilir.</p>
            </div>
            
            <div className="flex flex-col items-center text-center px-4 pt-12 md:pt-0 group">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#d4af37]/20 transition-all duration-500">
                <ShieldCheck className="h-7 w-7 text-[#d4af37]" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3">Güvenli Alışveriş</h3>
              <p className="text-white/60 text-sm leading-relaxed max-w-xs">256-bit şifreleme ve 3D Secure altyapısı ile ödemeleriniz %100 güvence altındadır.</p>
            </div>
            
            <div className="flex flex-col items-center text-center px-4 pt-12 md:pt-0 group">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#d4af37]/20 transition-all duration-500">
                <RefreshCw className="h-7 w-7 text-[#d4af37]" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3">Kolay İade</h3>
              <p className="text-white/60 text-sm leading-relaxed max-w-xs">Memnun kalmadığınız takdirde 14 gün içinde koşulsuz ücretsiz iade ve değişim garantisi.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
