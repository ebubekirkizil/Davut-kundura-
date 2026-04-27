import Link from "next/link";
import { ArrowRight, Truck, ShieldCheck, RefreshCw } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import { PRODUCTS } from "@/lib/mockData";

export default function ShopHome() {
  const BestsellerProducts = PRODUCTS.slice(0, 4);

  return (
    <div className="flex flex-col gap-y-24 pb-20 bg-white">
      {/* Hero Section */}
      <section className="relative w-full h-[80vh] min-h-[500px] flex items-center overflow-hidden">
        {/* Background Image Setup */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent z-10" />
          <img 
            src="/hero.jpg" 
            alt="Deri Ayakkabı ve Şehir Konsepti"
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=2000&auto=format&fit=crop";
            }}
          />
        </div>

        {/* Hero Content */}
        <div className="container relative z-20 mx-auto px-8 lg:px-16">
          <div className="max-w-xl space-y-6">
            <h1 className="font-sans text-5xl md:text-7xl font-bold text-white leading-[1.1] tracking-tight">
              Konfor ve Tarz Bir Arada.
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed tracking-wide">
              Günlük Kullanıma Uygun Deri Ayakkabılar.
            </p>
            <div className="pt-6">
              <Link 
                href="/products" 
                className="inline-flex bg-white hover:bg-gray-100 text-[#1f1711] px-8 py-3.5 rounded-sm font-bold text-sm tracking-widest transition-all shadow-lg items-center"
              >
                YENİ SEZONU GÖR
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-8 lg:px-16">
        <div className="flex items-end justify-between mb-10 border-b border-border pb-4">
          <div>
            <h3 className="font-serif text-3xl font-bold text-primary">Yeni Sezon Öne Çıkanlar</h3>
          </div>
          <Link href="/products" className="hidden sm:flex items-center gap-2 text-primary hover:text-accent font-medium transition-colors text-sm uppercase tracking-wider">
            Tüm Koleksiyon <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {BestsellerProducts.map(product => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
        <div className="mt-10 flex justify-center sm:hidden">
          <Link href="/products" className="flex items-center gap-2 text-primary border border-primary px-8 py-3 rounded-sm hover:bg-primary hover:text-white transition-all text-sm font-bold uppercase tracking-wider">
            Tüm Koleksiyon
          </Link>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-[#f5f1ea] py-16 mt-8">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left divide-y md:divide-y-0 md:divide-x divide-[#d8cec0]">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 pt-8 md:pt-0">
              <div className="text-accent shrink-0">
                <Truck className="h-8 w-8" />
              </div>
              <div>
                <h4 className="font-bold text-primary uppercase text-sm tracking-wider mb-2">Hızlı Teslimat</h4>
                <p className="text-sm text-primary/70 leading-relaxed text-balance">Özel zanaat ürünleriniz güvenle ve hızla adresinize ulaşır.</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 pt-8 md:pt-0 md:pl-12">
              <div className="text-accent shrink-0">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <div>
                <h4 className="font-bold text-primary uppercase text-sm tracking-wider mb-2">Üstün Kalite</h4>
                <p className="text-sm text-primary/70 leading-relaxed text-balance">Gerçek deri ve kusursuz el işçiliği garantisi sunuyoruz.</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 pt-8 md:pt-0 md:pl-12">
              <div className="text-accent shrink-0">
                <RefreshCw className="h-8 w-8" />
              </div>
              <div>
                <h4 className="font-bold text-primary uppercase text-sm tracking-wider mb-2">Kolay İade</h4>
                <p className="text-sm text-primary/70 leading-relaxed text-balance">14 gün içinde ürünlerinizi şartsız koşulsuz iade edebilirsiniz.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
}
