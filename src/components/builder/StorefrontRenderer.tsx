"use client";

import { useState, useEffect } from "react";
import { Search, Box, Phone, MapPin, ShoppingBag, ArrowRight, Sparkles, Camera, Share2, Mail, Play, Volume2, Globe, Heart, X } from "lucide-react";

// --- KRİTİK TASARIM KORUMASI ---
const failsafeStyles = `
  .luxe-wrapper { font-family: 'Outfit', sans-serif; color: var(--text-primary); }
  .luxe-container { max-width: 1600px; margin: 0 auto; padding: 0 40px; }
  .luxe-grid { display: grid; gap: 60px; }
  .grid-3 { grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); }
  .grid-4 { grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); }
  .accent-text { color: var(--accent); }
  .luxe-card { background: white; border: 1px solid var(--border); border-radius: var(--radius-md); padding: 80px 40px; text-align: center; transition: all 0.6s var(--easing); position: relative; overflow: hidden; }
  .luxe-card:hover { transform: translateY(-15px); border-color: var(--accent); box-shadow: var(--shadow-premium); }
  .luxe-button { background: var(--text-primary); color: white; padding: 24px 48px; border-radius: 100px; font-weight: 800; letter-spacing: 0.2em; text-transform: uppercase; transition: all 0.4s var(--easing); position: relative; overflow: hidden; }
  .luxe-button:hover { background: var(--accent); transform: scale(1.05); }
`;

function HeaderComponent({ section, selectedId, onSelect }: { section: any, selectedId: string | null, onSelect: any }) {
  return (
    <header className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-7xl">
      <nav className="bg-white/80 backdrop-blur-2xl border border-white/20 rounded-full px-10 py-5 flex items-center justify-between shadow-2xl transition-all duration-500 hover:shadow-[var(--accent)]/10">
        <div className="flex items-center gap-10">
           <div className="text-xl font-brand font-bold tracking-tighter text-[var(--text-primary)]">DAVUT KUNDURA</div>
           <div className="hidden lg:flex items-center gap-8 border-l border-[var(--border)] pl-10">
              {['KOLEKSİYON', 'ATÖLYE', 'MİRAS', 'İLETİŞİM'].map(item => (
                <a key={item} href="#" className="text-[10px] font-black tracking-[0.2em] text-[var(--text-secondary)] hover:text-[var(--accent)] transition-all uppercase">{item}</a>
              ))}
           </div>
        </div>
        <div className="flex items-center gap-6">
           <Search size={18} className="text-[var(--text-secondary)] hover:text-[var(--accent)] cursor-pointer transition-colors" />
           <div className="relative group cursor-pointer">
              <ShoppingBag size={18} className="text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors" />
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-[var(--accent)] text-white text-[8px] font-black flex items-center justify-center rounded-full animate-bounce">0</span>
           </div>
           <button className="hidden sm:block px-6 py-2.5 bg-[var(--text-primary)] text-white rounded-full text-[10px] font-black tracking-widest hover:bg-[var(--accent)] transition-all">GİRİŞ</button>
        </div>
      </nav>
    </header>
  )
}

function FooterComponent({ section }: { section: any }) {
  return (
    <footer className="bg-[var(--text-primary)] text-white py-32 px-10 border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--accent)]/5 rounded-full blur-[150px] -mr-[250px] -mt-[250px]"></div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 relative z-10">
        <div className="space-y-8">
          <div className="text-3xl font-brand font-bold tracking-tighter">DAVUT KUNDURA</div>
          <p className="text-[14px] text-white/50 leading-relaxed italic">
            "1990'dan beri zanaatın ve asaletin Pendik'teki tek adresi."
          </p>
        </div>
        <div className="space-y-8">
           <div className="text-[11px] font-black tracking-[0.3em] uppercase text-[var(--accent)]">KOLEKSİYONLAR</div>
           <nav className="flex flex-col gap-4 text-[13px] font-medium text-white/60">
              <a href="#">Klasik Oxford</a>
              <a href="#">Modern Loafer</a>
           </nav>
        </div>
        <div className="space-y-8">
           <div className="text-[11px] font-black tracking-[0.3em] uppercase text-[var(--accent)]">KURUMSAL</div>
           <nav className="flex flex-col gap-4 text-[13px] font-medium text-white/60">
              <a href="#">Atölye Hikayemiz</a>
              <a href="#">Mağazalarımız</a>
           </nav>
        </div>
        <div className="space-y-8">
           <div className="text-[11px] font-black tracking-[0.3em] uppercase text-[var(--accent)]">BÜLTEN</div>
           <div className="relative group">
              <input type="email" placeholder="E-posta" className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-[12px]" />
           </div>
        </div>
      </div>
    </footer>
  )
}

export default function StorefrontRenderer({ initialSections = [] }: any) {
  const [sections, setSections] = useState(initialSections);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [storeData, setStoreData] = useState<{ products: any[], featured: any[] }>({ products: [], featured: [] });
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  useEffect(() => {
    fetch('/api/shop/storefront')
      .then(res => res.json())
      .then(data => {
        setStoreData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "BUILDER_SYNC") {
        if (event.data.page?.sections) setSections(event.data.page.sections);
        setSelectedId(event.data.selectedId);
      }
    };
    window.addEventListener("message", handleMessage);
    window.parent.postMessage({ type: "PREVIEW_READY" }, "*");
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const handleSectionClick = (e: any, id: string) => {
    e.preventDefault(); e.stopPropagation();
    setSelectedId(id);
    window.parent.postMessage({ type: "SELECT_SECTION", id }, "*");
  };

  return (
    <div className="luxe-wrapper w-full bg-[var(--bg-primary)] min-h-screen selection:bg-[var(--accent)]/30">
      <style>{failsafeStyles}</style>
      {sections.map((section: any) => {
        const isSelected = selectedId === section.id;
        
        return (
          <div key={section.id} onClick={(e) => handleSectionClick(e, section.id)} className={`relative transition-all duration-300 ${isSelected ? 'ring-2 ring-[var(--accent)] z-10' : ''}`}>
            
            {section.type === "header" && <HeaderComponent section={section} selectedId={selectedId} onSelect={handleSectionClick} />}
            
            {section.type === "hero" && (
              <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[var(--bg-secondary)] py-20">
                <div className="absolute inset-0 overflow-hidden">
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/leather.png")' }}></div>
                   <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--accent)]/10 rounded-full blur-[150px] -mr-[300px] -mt-[300px]"></div>
                </div>

                <div className={`luxe-container relative z-10 space-y-12 ${section.settings?.alignment === 'left' ? 'text-left' : 'text-center'}`}>
                  <div className={`flex flex-col gap-6 ${section.settings?.alignment === 'left' ? 'items-start' : 'items-center'}`}>
                    <span className="text-[12px] font-black tracking-[0.6em] text-[var(--accent)] uppercase block">DAVUT KUNDURA STUDIO</span>
                    <h2 className="text-6xl md:text-[8rem] font-brand font-bold leading-[0.9] tracking-tighter">
                      {section.settings?.title}
                    </h2>
                  </div>
                   <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80"></div>
                </div>
                
                <div className="container relative z-10 text-center px-6">
                   <div className="space-y-8 max-w-6xl mx-auto">
                     <span className="text-[10px] font-black tracking-[0.6em] text-[var(--accent)] uppercase animate-in fade-in slide-in-from-bottom duration-700">
                       EST. 1990 — PENDİK / İSTANBUL
                     </span>
                     <h2 className="text-6xl md:text-[10rem] font-brand font-bold text-white leading-[0.9] tracking-tighter drop-shadow-2xl animate-in fade-in slide-in-from-bottom duration-1000 delay-200">
                       {section.settings?.title || "Zanaatın\nZirvesi"}
                     </h2>
                     <div className="pt-12 flex flex-col md:flex-row items-center justify-center gap-12 animate-in fade-in slide-in-from-bottom duration-1000 delay-500">
                        <button className="px-12 py-5 bg-white text-black text-[12px] font-black uppercase tracking-[0.2em] hover:bg-[var(--accent)] hover:text-white transition-all duration-500 rounded-full shadow-2xl">
                           KOLEKSİYONU KEŞFET
                        </button>
                        <div className="flex items-center gap-4 group cursor-pointer">
                          <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-xl group-hover:border-[var(--accent)] transition-all">
                             <Play size={20} fill="white" className="text-white ml-1" />
                          </div>
                          <span className="text-[11px] font-bold tracking-[0.3em] text-white/70 uppercase group-hover:text-white transition-colors">HİKAYEMİZİ İZLEYİN</span>
                        </div>
                     </div>
                   </div>
                </div>

                {/* Bottom Stats Overlay */}
                <div className="absolute bottom-12 left-12 right-12 z-10 hidden lg:flex justify-between items-end border-t border-white/10 pt-12">
                   <div className="flex gap-24">
                      <div className="space-y-2">
                        <div className="text-[10px] font-black text-white/40 uppercase tracking-widest">MALZEME</div>
                        <div className="text-[14px] font-bold text-white">%100 Hakiki Deri</div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-[10px] font-black text-white/40 uppercase tracking-widest">GARANTİ</div>
                        <div className="text-[14px] font-bold text-white">Ömür Boyu Bakım</div>
                      </div>
                   </div>
                   <div className="flex items-center gap-4 text-white/20">
                      <div className="w-12 h-[1px] bg-white/20"></div>
                      <span className="text-[10px] font-bold">01 / 04</span>
                   </div>
                </div>
              </section>
            )}

            {section.type === "featuredCollection" && (
              <section className="bg-white py-48 px-6">
                <div className="max-w-7xl mx-auto space-y-24">
                  <div className="flex flex-col md:flex-row justify-between items-end gap-8 border-b border-[var(--border)] pb-12">
                    <div className="space-y-4">
                      <span className="text-[12px] font-black tracking-[0.4em] text-[var(--accent)] uppercase animate-pulse">NOUVELLE COLLECTION</span>
                      <h3 className="text-5xl md:text-8xl font-brand font-bold tracking-tight text-[var(--text-primary)] leading-[0.8]">
                        {section.settings?.title || "Öne Çıkan Seçkiler"}
                      </h3>
                    </div>
                    <div className="flex items-center gap-6 group cursor-pointer">
                      <span className="text-[11px] font-black tracking-[0.3em] uppercase group-hover:text-[var(--accent)] transition-colors">TÜMÜNÜ KEŞFEDİN</span>
                      <div className="w-12 h-12 rounded-full border border-[var(--border)] flex items-center justify-center group-hover:bg-[var(--accent)] group-hover:border-[var(--accent)] transition-all">
                        <ArrowRight size={16} className="group-hover:text-white transition-colors" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
                    {loading ? (
                      [1, 2, 3].map(i => (
                        <div key={i} className="animate-pulse space-y-8">
                          <div className="aspect-[3/4] bg-gray-100 rounded-sm"></div>
                          <div className="h-4 bg-gray-100 w-1/2 mx-auto"></div>
                        </div>
                      ))
                    ) : storeData.featured.length === 0 ? (
                      <div className="col-span-full py-20 text-center text-[var(--text-secondary)] italic">Yakında yeni koleksiyonumuzla buradayız.</div>
                    ) : storeData.featured.map((product) => (
                      <div key={product.id} onClick={() => setSelectedProduct(product)} className="group cursor-pointer space-y-10">
                        <div className="relative aspect-[3/4] overflow-hidden bg-[var(--bg-secondary)] rounded-sm group-hover:shadow-2xl transition-all duration-700">
                          <img 
                            src={product.imageUrls?.[0] || `https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop`} 
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-110"
                          />
                          {/* Premium Badge */}
                          <div className="absolute top-8 left-8">
                             <div className="px-4 py-1.5 bg-white/90 backdrop-blur-md border border-[var(--border)] text-[9px] font-black tracking-[0.2em] uppercase">
                               {product.category || 'KLASİK'}
                             </div>
                          </div>
                          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                          <div className="absolute inset-x-8 bottom-8 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                             <button className="w-full py-5 bg-black text-white text-[11px] font-black uppercase tracking-[0.3em] shadow-2xl hover:bg-[var(--accent)] transition-colors">
                                İNCELE
                             </button>
                          </div>
                        </div>
                        <div className="space-y-4 text-center">
                          <div className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.4em]">{product.vendor || 'DAVUT KUNDURA'}</div>
                          <h4 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                            {product.name}
                          </h4>
                          <div className="flex items-center justify-center gap-4">
                            <div className="h-[1px] w-8 bg-[var(--border)]"></div>
                            <div className="text-2xl font-brand font-bold text-[var(--text-primary)]">
                              ₺{product.price?.toLocaleString('tr-TR')}
                            </div>
                            <div className="h-[1px] w-8 bg-[var(--border)]"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {section.type === "richText" && (
              <section className="bg-[var(--bg-primary)] py-48 px-6 relative overflow-hidden">
                {/* Background Decorations */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-32 bg-gradient-to-b from-transparent to-[var(--accent)]/50"></div>
                
                <div className="max-w-6xl mx-auto text-center space-y-20 relative z-10">
                  <div className="space-y-6">
                    <span className="text-[12px] font-black tracking-[0.4em] text-[var(--accent)] uppercase">BİR ASIRLIK MİRAS</span>
                    <h3 className="text-5xl md:text-8xl font-brand font-bold leading-[1.1] tracking-tight text-[var(--text-primary)]">
                      {section.settings?.title || "Ayağınıza Değer Katan\nZarif Dokunuşlar"}
                    </h3>
                  </div>
                  
                  <div className="relative">
                    <p className="text-2xl md:text-4xl text-[var(--text-secondary)] font-light leading-relaxed italic max-w-5xl mx-auto">
                      "{section.settings?.content || "Her bir dikiş, bir ustanın hikayesini taşır. Davut Kundura, 1990'dan beri Pendik'teki atölyesinde, geleneksel yöntemleri modern çizgilerle harmanlayarak kişiye özel bir deneyim sunar."}"
                    </p>
                    {/* Floating Icons */}
                    <Sparkles className="absolute -top-12 -left-12 text-[var(--accent)] opacity-20 animate-pulse" size={64} />
                    <Sparkles className="absolute -bottom-12 -right-12 text-[var(--accent)] opacity-20 animate-pulse delay-700" size={64} />
                  </div>

                  <div className="pt-12 flex justify-center gap-12">
                     <div className="flex flex-col items-center gap-4 group">
                        <div className="w-20 h-20 rounded-full border border-[var(--border)] flex items-center justify-center group-hover:border-[var(--accent)] transition-all duration-700">
                          <Box size={24} className="text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors" />
                        </div>
                        <span className="text-[10px] font-black tracking-widest text-[var(--text-secondary)]">ÖZEL KUTU</span>
                     </div>
                     <div className="flex flex-col items-center gap-4 group">
                        <div className="w-20 h-20 rounded-full border border-[var(--border)] flex items-center justify-center group-hover:border-[var(--accent)] transition-all duration-700">
                          <Sparkles size={24} className="text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors" />
                        </div>
                        <span className="text-[10px] font-black tracking-widest text-[var(--text-secondary)]">EL İŞÇİLİĞİ</span>
                     </div>
                  </div>
                </div>
              </section>
            )}

            {section.type === "categoryGrid" && (
              <section className="bg-[var(--bg-secondary)] py-48 px-6">
                <div className="luxe-container">
                  <div className="flex flex-col md:flex-row md:items-end justify-between mb-32 gap-12">
                    <div className="space-y-6">
                      <span className="text-[11px] font-black tracking-[0.6em] text-[var(--accent)] uppercase">KATEGORİLER</span>
                      <h2 className="text-6xl md:text-8xl font-brand font-bold tracking-tight">{section.settings?.title}</h2>
                    </div>
                    <p className="text-[var(--text-secondary)] text-2xl font-light italic border-l-4 border-[var(--accent)] pl-8 max-w-lg">
                      {section.settings?.subtitle}
                    </p>
                  </div>
                  <div className="luxe-grid grid-3">
                    {(section.blocks || []).map((block: any) => (
                      <div key={block.id} onClick={(e) => handleSectionClick(e, block.id)} className={`luxe-card group ${selectedId === block.id ? 'ring-4 ring-[var(--accent)] ring-offset-8' : ''}`}>
                          <div className="absolute top-0 left-0 w-full h-1 bg-[var(--accent)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
                          
                          <div className="w-28 h-28 rounded-3xl bg-[var(--bg-secondary)] flex items-center justify-center mx-auto mb-12 group-hover:bg-[var(--accent)] group-hover:rotate-[15deg] transition-all duration-700 shadow-sm group-hover:shadow-xl relative overflow-hidden">
                            {block.settings?.image ? (
                              <img src={block.settings.image} className="w-full h-full object-cover" />
                            ) : (
                              <Box size={40} className="text-[var(--accent)] group-hover:text-white transition-all duration-700" />
                            )}
                          </div>
                          <h3 className="text-4xl font-brand font-bold mb-8 group-hover:text-[var(--accent)] transition-colors">{block.settings?.title}</h3>
                          <p className="text-[var(--text-secondary)] mb-10 text-lg opacity-60 group-hover:opacity-100 transition-opacity duration-700">El yapımı premium kalite ve zanaat.</p>
                          <div className="inline-flex items-center gap-4 text-[12px] font-black tracking-[0.3em] text-[var(--accent)] uppercase opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-4 group-hover:translate-y-0">
                             İNCELE <ArrowRight size={16} />
                          </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {section.type === "footer" && (
              <footer className="bg-[#1a1a1a] text-white overflow-hidden" style={{ backgroundColor: section.settings?.backgroundColor }}>
                <div className="bg-[var(--accent)] py-4 overflow-hidden whitespace-nowrap flex relative">
                  <div className="animate-marquee flex gap-20 items-center text-[var(--text-primary)] text-[10px] font-black tracking-[0.4em] uppercase">
                    {Array(20).fill(section.settings?.topBarText).map((t, i) => <span key={i}>{t}</span>)}
                  </div>
                </div>

                <div className="luxe-container py-40">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20">
                    {(section.blocks || []).map((block: any) => (
                      <div key={block.id} onClick={(e) => handleSectionClick(e, block.id)} className={`space-y-12 transition-all ${selectedId === block.id ? 'scale-105' : ''}`}>
                        <h4 className="text-[var(--accent)] text-[12px] tracking-[0.5em] uppercase font-black">{block.settings?.title}</h4>
                        
                        {block.type === 'footer_text' && (
                          <div className="space-y-10">
                            <p className="text-2xl font-light text-white/60 leading-relaxed italic">
                              "{block.settings?.content}"
                            </p>
                            <div className="flex items-center gap-6">
                              <Camera size={24} className="text-white/30 hover:text-[var(--accent)] cursor-pointer transition-colors" />
                              <Share2 size={24} className="text-white/30 hover:text-[var(--accent)] cursor-pointer transition-colors" />
                              <Mail size={24} className="text-white/30 hover:text-[var(--accent)] cursor-pointer transition-colors" />
                            </div>
                          </div>
                        )}

                        {block.type === 'footer_menu' && (
                          <ul className="space-y-6 text-[14px] text-white/40 font-bold tracking-[0.1em]">
                            {(block.settings?.links || "").split('\n').map((l: string, i: number) => (
                              <li key={i} className="hover:text-[var(--accent)] hover:translate-x-2 transition-all cursor-pointer flex items-center gap-4">
                                <div className="w-2 h-[1px] bg-[var(--accent)]"></div>
                                {l}
                              </li>
                            ))}
                          </ul>
                        )}

                        {block.type === 'footer_contact' && (
                          <div className="space-y-8 text-[15px] text-white/50 font-light">
                            <div className="flex gap-6 group cursor-pointer">
                              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-[var(--accent)] group-hover:text-[var(--text-primary)] transition-all">
                                <MapPin size={20} />
                              </div>
                              <span className="flex-1 pt-1">{block.settings?.address}</span>
                            </div>
                            <div className="flex gap-6 group cursor-pointer">
                              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-[var(--accent)] group-hover:text-[var(--text-primary)] transition-all">
                                <Phone size={20} />
                              </div>
                              <span className="flex-1 pt-3">{block.settings?.phone}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </footer>
            )}
          </div>
        );
      })}

      {/* --- PREMIUM PRODUCT DETAIL MODAL --- */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 sm:p-12 animate-in fade-in duration-500">
           {/* Backdrop with extreme blur */}
           <div 
             className="absolute inset-0 bg-black/60 backdrop-blur-xl cursor-zoom-out" 
             onClick={() => setSelectedProduct(null)}
           />
           
           {/* Modal Content - Luxury Card */}
           <div className="relative w-full max-w-6xl bg-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] flex flex-col lg:flex-row animate-in zoom-in-95 slide-in-from-bottom-10 duration-700 overflow-hidden rounded-sm">
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-8 right-8 z-20 w-12 h-12 bg-white/80 backdrop-blur-md border border-black/5 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all duration-500 group"
              >
                <X size={20} className="group-hover:rotate-90 transition-transform" />
              </button>

              {/* Left: Artistic Product Presentation */}
              <div className="lg:w-3/5 relative bg-[var(--bg-secondary)] min-h-[400px] lg:h-[85vh]">
                 <img 
                    src={selectedProduct.imageUrls?.[0] || `https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop`} 
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover transition-transform duration-[3000ms] hover:scale-110"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>
                 <div className="absolute bottom-12 left-12 flex gap-4 text-white/80">
                    <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/10"><Sparkles size={20} /></div>
                    <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/10"><Box size={20} /></div>
                 </div>
              </div>

              {/* Right: Curated Info */}
              <div className="lg:w-2/5 p-12 lg:p-20 flex flex-col justify-center space-y-12">
                 <div className="space-y-6">
                    <span className="text-[12px] font-black tracking-[0.4em] text-[var(--accent)] uppercase opacity-60">DAVUT KUNDURA SEÇKİSİ</span>
                    <h2 className="text-5xl md:text-7xl font-brand font-bold text-[var(--text-primary)] leading-[0.9] tracking-tighter">{selectedProduct.name}</h2>
                    <div className="flex items-center gap-6 pt-4">
                       <div className="text-4xl font-brand font-bold text-[var(--text-primary)]">₺{selectedProduct.price?.toLocaleString('tr-TR')}</div>
                       <div className="px-4 py-1 bg-green-50 text-green-700 text-[10px] font-black tracking-widest rounded-full border border-green-100">STOKTA VAR</div>
                    </div>
                 </div>

                 <p className="text-[16px] text-[var(--text-secondary)] leading-relaxed italic border-l-2 border-[var(--accent)]/30 pl-8">
                    "{selectedProduct.description || "Asalet ve konforun kusursuz birleşimi. Bu tasarım, ustalığın modern çizgilerle buluştuğu noktada, her adımınıza değer katmak için yaratıldı."}"
                 </p>

                 <div className="space-y-10">
                    <div className="flex flex-col gap-6">
                       <div className="flex justify-between items-center">
                          <span className="text-[11px] font-black tracking-[0.2em] uppercase">NUMARA SEÇİMİ</span>
                          <span className="text-[11px] font-bold text-[var(--accent)] cursor-pointer hover:underline">ÖLÇÜ REHBERİ</span>
                       </div>
                       <div className="flex flex-wrap gap-4">
                          {['40', '41', '42', '43', '44', '45'].map(size => (
                             <button key={size} className="w-16 h-16 border border-[var(--border)] text-[13px] font-black hover:border-black hover:bg-black hover:text-white transition-all duration-300">{size}</button>
                          ))}
                       </div>
                    </div>

                    <button className="w-full py-7 bg-black text-white text-[12px] font-black uppercase tracking-[0.4em] shadow-2xl hover:bg-[var(--accent)] transition-all transform hover:-translate-y-1 duration-500">
                       SİPARİŞE BAŞLA
                    </button>
                 </div>

                 <div className="pt-12 border-t border-[var(--border)] flex items-center justify-between opacity-40">
                    <div className="text-[10px] font-black tracking-widest uppercase">DERİ: HAKİKİ DANA</div>
                    <div className="text-[10px] font-black tracking-widest uppercase">MENŞEİ: TÜRKİYE</div>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
