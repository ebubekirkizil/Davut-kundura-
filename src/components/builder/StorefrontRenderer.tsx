"use client";

import { useState, useEffect } from "react";
import { Search, Box, Phone, MapPin, ShoppingBag, ArrowRight, Sparkles, Camera, Share2, Mail, Play, Volume2, Globe, Heart } from "lucide-react";

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

const HeaderComponent = ({ section, selectedId, onSelect }: any) => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${section.settings?.sticky ? 'sticky top-0 z-[100]' : ''} glass-effect transition-all duration-700 ${isScrolled ? 'h-20 shadow-2xl' : 'h-28 border-transparent'}`}>
      <div className="luxe-container h-full flex items-center justify-between">
        <div onClick={(e) => onSelect(e, section.id)} className="cursor-pointer group flex flex-col items-center">
          <h1 className="text-3xl md:text-4xl font-brand font-bold tracking-[0.2em] transition-all group-hover:tracking-[0.3em]">
            {section.settings?.logoText || "DAVUT KUNDURA"}
          </h1>
          <div className="flex items-center gap-4 mt-1">
            <div className="h-[1px] w-8 bg-[var(--accent)] transform origin-right group-hover:scale-x-150 transition-transform duration-500"></div>
            <span className="text-[9px] tracking-[0.5em] font-black text-[var(--accent)] uppercase">EST. 1980</span>
            <div className="h-[1px] w-8 bg-[var(--accent)] transform origin-left group-hover:scale-x-150 transition-transform duration-500"></div>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-16">
          {(section.blocks || []).filter((b: any) => b.type === 'menu_item').map((block: any) => (
            <a 
              key={block.id} 
              href="#" 
              onClick={(e) => onSelect(e, block.id)}
              className={`text-[12px] font-bold tracking-[0.25em] transition-all uppercase relative group ${selectedId === block.id ? 'text-[var(--accent)]' : 'text-[var(--text-primary)]'}`}
            >
              {block.settings?.label}
              <span className={`absolute -bottom-2 left-0 h-0.5 bg-[var(--accent)] transition-all duration-500 ${selectedId === block.id ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-10">
          <div className="flex items-center gap-6">
            <div className="relative group">
              <Search size={22} className="text-[var(--text-primary)]/40 group-hover:text-[var(--text-primary)] cursor-pointer transition-colors" />
            </div>
            <div className="relative group">
              <ShoppingBag size={22} className="text-[var(--text-primary)]/40 group-hover:text-[var(--text-primary)] cursor-pointer transition-colors" />
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-[var(--accent)] text-white text-[9px] font-black flex items-center justify-center rounded-full">0</span>
            </div>
          </div>
          <button className="hidden sm:block text-[11px] font-black tracking-widest bg-[var(--text-primary)] text-white px-8 py-3 rounded-full hover:bg-[var(--accent)] transition-all">GİRİŞ YAP</button>
        </div>
      </div>
    </header>
  );
};

export default function StorefrontRenderer({ initialSections = [] }: any) {
  const [sections, setSections] = useState(initialSections);
  const [selectedId, setSelectedId] = useState<string | null>(null);

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
                  {section.settings?.subtitle && (
                    <p className="text-xl md:text-3xl text-[var(--text-secondary)] font-light tracking-wide max-w-4xl mx-auto leading-relaxed">
                      {section.settings?.subtitle}
                    </p>
                  )}
                  <div className={`flex flex-col md:flex-row items-center gap-8 pt-10 ${section.settings?.alignment === 'left' ? 'justify-start' : 'justify-center'}`}>
                    <button className="luxe-button group">
                      <span className="relative z-10 flex items-center gap-4">
                        {section.settings?.buttonText || "KEŞFET"}
                        <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                      </span>
                    </button>
                  </div>
                </div>
              </section>
            )}

            {section.type === "videoHero" && (
              <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                   <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                     <source src={section.settings?.videoUrl || "https://cdn.shopify.com/videos/c/o/v/7f941198f1f7445c9284950005d5d852.mp4"} type="video/mp4" />
                   </video>
                   <div className="absolute inset-0 bg-black" style={{ opacity: (section.settings?.overlayOpacity || 50) / 100 }}></div>
                </div>
                <div className="luxe-container relative z-10 text-center space-y-10">
                   <h2 className="text-7xl md:text-[9rem] font-brand font-bold text-white leading-tight tracking-tighter">{section.settings?.title}</h2>
                   <div className="flex items-center justify-center gap-4">
                      <div className="w-16 h-16 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-md group cursor-pointer hover:bg-white hover:text-black transition-all">
                        <Play size={24} fill="currentColor" />
                      </div>
                      <span className="text-[11px] font-black tracking-[0.4em] text-white uppercase">SİNEMATİK DENEYİM</span>
                   </div>
                </div>
              </section>
            )}

            {section.type === "richText" && (
              <section className="bg-white py-48 px-6 relative overflow-hidden">
                <div className="luxe-container text-center space-y-16">
                  <div className="w-24 h-[1px] bg-[var(--accent)] mx-auto"></div>
                  <h3 className="text-5xl md:text-7xl font-brand font-bold leading-tight tracking-tight">{section.settings?.title}</h3>
                  <p className="text-2xl md:text-4xl text-[var(--text-secondary)] font-light leading-relaxed max-w-6xl mx-auto">
                    {section.settings?.content}
                  </p>
                  <div className="pt-10 flex justify-center">
                     <Globe size={48} className="text-[var(--accent)] opacity-20" />
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
    </div>
  );
}
