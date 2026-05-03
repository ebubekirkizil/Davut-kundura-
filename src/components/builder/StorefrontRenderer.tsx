"use client";

import { useState, useEffect } from "react";
import { Search, ShoppingBag, ArrowRight, X, Instagram, Facebook, Mail, MapPin, Phone } from "lucide-react";

// --- SUB-COMPONENTS ---

const Nav = () => (
  <nav className="fixed top-0 left-0 w-full z-[100] glass-nav">
    <div className="max-w-[1600px] mx-auto px-10 py-6 flex items-center justify-between">
      <div className="flex items-center gap-12">
        <h1 className="text-2xl font-bold tracking-tighter uppercase font-brand">Davut Kundura</h1>
        <div className="hidden lg:flex gap-8 text-[11px] font-black tracking-[0.2em] uppercase opacity-40">
          <a href="#" className="hover:opacity-100 transition-opacity">Koleksiyon</a>
          <a href="#" className="hover:opacity-100 transition-opacity">Atölye</a>
          <a href="#" className="hover:opacity-100 transition-opacity">Miras</a>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <Search size={20} className="opacity-40 hover:opacity-100 cursor-pointer transition-opacity" />
        <div className="relative group cursor-pointer">
          <ShoppingBag size={20} className="opacity-40 group-hover:opacity-100 transition-opacity" />
          <span className="absolute -top-2 -right-2 w-4 h-4 bg-[var(--accent)] text-white text-[8px] font-black flex items-center justify-center rounded-full">0</span>
        </div>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#0D0D0D]">
    <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center"></div>
    <div className="relative z-10 text-center space-y-8 animate-luxe">
      <span className="text-[12px] font-black tracking-[0.6em] text-[var(--accent)] uppercase">EST. 1990 • PENDİK / İSTANBUL</span>
      <h2 className="text-7xl md:text-9xl font-brand font-bold text-white leading-tight">Zanaatın<br/>Yeni Yüzü</h2>
      <div className="flex justify-center gap-6 pt-8">
        <button className="luxe-button">ŞİMDİ KEŞFET</button>
        <button className="px-10 py-5 border border-white/20 text-white text-[11px] font-black tracking-widest uppercase hover:bg-white hover:text-black transition-all">MİRASIMIZ</button>
      </div>
    </div>
    <div className="absolute bottom-12 left-10 flex flex-col gap-6 text-white/20">
      <Instagram size={20} className="hover:text-[var(--accent)] cursor-pointer transition-colors" />
      <Facebook size={20} className="hover:text-[var(--accent)] cursor-pointer transition-colors" />
    </div>
    <div className="absolute bottom-12 right-10 text-white/20 text-[10px] font-black tracking-[0.4em] uppercase rotate-90 origin-right">
      SCROLL DOWN
    </div>
  </section>
);

export default function StorefrontRenderer() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  useEffect(() => {
    fetch('/api/shop/storefront')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="bg-[var(--bg-primary)]">
      <Nav />
      <Hero />

      {/* Heritage Section */}
      <section className="luxe-section bg-[var(--bg-secondary)]">
        <div className="luxe-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <div className="space-y-12 animate-luxe">
               <span className="text-[11px] font-black tracking-[0.4em] text-[var(--accent)] uppercase">BİR ASIRLIK MİRAS</span>
               <h2 className="text-6xl font-brand font-bold leading-[1.1]">Her dikişte bir hikaye, her adımda bir ruh.</h2>
               <p className="text-xl text-[var(--text-secondary)] font-light leading-relaxed">
                 Davut Kundura, 1990 yılında Pendik'in kalbinde küçük bir atölye olarak başladı. Bugün, geleneksel zanaatkarlığı modern estetikle birleştirerek Türkiye'nin en seçkin el yapımı ayakkabılarını üretiyoruz.
               </p>
               <div className="flex items-center gap-6 group cursor-pointer">
                 <div className="w-16 h-[1px] bg-[var(--text-primary)] group-hover:w-24 group-hover:bg-[var(--accent)] transition-all"></div>
                 <span className="text-[11px] font-black tracking-widest uppercase">HİKAYEMİZİ OKUYUN</span>
               </div>
            </div>
            <div className="relative">
               <div className="aspect-[4/5] bg-gray-200 overflow-hidden rounded-sm">
                  <img src="https://images.unsplash.com/photo-1473188588955-719316462674?q=80&w=2072&auto=format&fit=crop" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-110 hover:scale-100" />
               </div>
               <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-white p-10 shadow-2xl rounded-sm hidden lg:block">
                  <span className="text-[10px] font-black text-[var(--accent)] block mb-4 tracking-widest uppercase">PENDİK ATÖLYESİ</span>
                  <p className="text-[13px] font-bold italic leading-relaxed">"Ustalık, sabrın ve aşkın derideki imzasıdır."</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Gallery */}
      <section className="luxe-section">
        <div className="luxe-container">
          <div className="text-center mb-24 space-y-4">
             <span className="text-[11px] font-black tracking-[0.5em] text-[var(--accent)] uppercase">KOLEKSİYON</span>
             <h2 className="text-5xl font-brand font-bold">Zamana Meydan Okuyan Tasarımlar</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {loading ? (
              [1,2,3].map(i => <div key={i} className="aspect-square bg-gray-100 animate-pulse"></div>)
            ) : products.map((product) => (
              <div 
                key={product.id} 
                onClick={() => setSelectedProduct(product)}
                className="group cursor-pointer space-y-8"
              >
                <div className="aspect-[4/5] overflow-hidden bg-[var(--bg-secondary)] relative">
                   <img 
                      src={product.imageUrls?.[0] || 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop'} 
                      className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" 
                   />
                   <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500"></div>
                   <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                      <button className="bg-white text-black px-8 py-4 text-[10px] font-black tracking-widest uppercase shadow-xl hover:bg-[var(--accent)] hover:text-white transition-all">İNCELE</button>
                   </div>
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-brand font-bold group-hover:text-[var(--accent)] transition-colors">{product.name}</h3>
                  <div className="text-[14px] font-medium text-[var(--text-secondary)]">₺{product.price?.toLocaleString('tr-TR')}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--text-primary)] text-white py-40">
        <div className="luxe-container">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20">
              <div className="space-y-12">
                <h4 className="text-3xl font-brand font-bold tracking-tighter">Davut Kundura</h4>
                <div className="flex gap-4">
                  <MapPin className="text-[var(--accent)]" />
                  <span className="text-[14px] opacity-40">Batı, Erol Kaya Cd. No:87, 34890 Pendik/İstanbul</span>
                </div>
                <div className="flex gap-4">
                  <Phone className="text-[var(--accent)]" />
                  <span className="text-[14px] opacity-40">0216 483 19 90</span>
                </div>
              </div>
              <div className="space-y-8">
                <span className="text-[11px] font-black tracking-[0.4em] text-[var(--accent)] uppercase">NAVİGASYON</span>
                <nav className="flex flex-col gap-4 opacity-40 text-[14px]">
                  <a href="#" className="hover:text-[var(--accent)] hover:opacity-100 transition-all">Koleksiyonlar</a>
                  <a href="#" className="hover:text-[var(--accent)] hover:opacity-100 transition-all">Sipariş Takibi</a>
                  <a href="#" className="hover:text-[var(--accent)] hover:opacity-100 transition-all">Atölye Kaydı</a>
                </nav>
              </div>
              <div className="space-y-8 lg:col-span-2">
                <span className="text-[11px] font-black tracking-[0.4em] text-[var(--accent)] uppercase">BÜLTEN</span>
                <p className="text-2xl font-brand opacity-60">Özel koleksiyonlardan ilk siz haberdar olun.</p>
                <div className="relative max-w-md">
                   <input type="email" placeholder="E-POSTA ADRESİNİZ" className="w-full bg-transparent border-b border-white/20 py-4 text-[12px] font-black outline-none focus:border-[var(--accent)] transition-all" />
                   <button className="absolute right-0 bottom-4 text-[10px] font-black text-[var(--accent)] tracking-widest">KATIL</button>
                </div>
              </div>
           </div>
           <div className="mt-40 pt-12 border-t border-white/5 flex justify-between items-center text-[10px] font-black tracking-[0.3em] opacity-20 uppercase">
              <span>© 2026 DAVUT KUNDURA. Tüm Hakları Saklıdır.</span>
              <div className="flex gap-8">
                <a href="#">Gizlilik</a>
                <a href="#">Şartlar</a>
              </div>
           </div>
        </div>
      </footer>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-12 animate-in fade-in duration-500">
           <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setSelectedProduct(null)}></div>
           <div className="relative w-full max-w-6xl bg-white shadow-2xl flex flex-col lg:flex-row overflow-hidden animate-in zoom-in-95 duration-500 rounded-sm">
              <button onClick={() => setSelectedProduct(null)} className="absolute top-8 right-8 z-20 w-12 h-12 bg-black text-white flex items-center justify-center hover:bg-[var(--accent)] transition-all"><X size={20} /></button>
              
              <div className="lg:w-3/5 bg-[var(--bg-secondary)]">
                 <img src={selectedProduct.imageUrls?.[0] || 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop'} className="w-full h-full object-cover" />
              </div>
              
              <div className="lg:w-2/5 p-20 flex flex-col justify-center space-y-12">
                 <div className="space-y-4">
                    <span className="text-[11px] font-black tracking-[0.4em] text-[var(--accent)] uppercase">ÖZEL SEÇKİ</span>
                    <h2 className="text-5xl font-brand font-bold">{selectedProduct.name}</h2>
                    <div className="text-3xl font-brand font-bold">₺{selectedProduct.price?.toLocaleString('tr-TR')}</div>
                 </div>
                 
                 <p className="text-[16px] text-[var(--text-secondary)] leading-relaxed italic border-l-2 border-[var(--accent)] pl-8">
                    "{selectedProduct.description || "El yapımı zarafet ve zamansız tasarımın buluştuğu nokta."}"
                 </p>
                 
                 <div className="space-y-10">
                    <div className="flex flex-wrap gap-4">
                      {['40', '41', '42', '43', '44', '45'].map(size => (
                        <button key={size} className="w-14 h-14 border border-black/10 text-[12px] font-black hover:border-black transition-all">{size}</button>
                      ))}
                    </div>
                    <button className="luxe-button w-full">SİPARİŞE BAŞLA</button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
