"use client";

import { useState, useEffect } from "react";
import { Search, Box, Settings, Phone, MapPin, ShoppingBag, User, ArrowRight, Camera, Star, CreditCard, Mail } from "lucide-react";

// --- KRİTİK TASARIM KORUMASI (Tailwind çökerse siteyi ayakta tutan zırh) ---
const failsafeStyles = `
  .davut-wrapper { font-family: 'serif'; color: #1a120b; }
  .davut-container { max-width: 1400px; margin: 0 auto; padding: 0 24px; }
  .davut-grid { display: grid; gap: 40px; }
  .grid-3 { grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); }
  .grid-4 { grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); }
  .gold-accent { color: #d4af37; }
  .espresso-bg { background: #1a120b; color: #fbfaf9; }
  .marquee-container { overflow: hidden; white-space: nowrap; background: #1a120b; color: #d4af37; padding: 12px 0; font-size: 10px; font-weight: bold; letter-spacing: 0.3em; }
  .marquee-content { display: inline-block; animation: marquee 40s linear infinite; }
  @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
  .cat-card { background: #f9f7f4; border: 1px solid rgba(0,0,0,0.03); border-radius: 4px; padding: 60px 40px; text-align: center; transition: all 0.5s ease; position: relative; overflow: hidden; }
  .cat-card:hover { transform: translateY(-12px); border-color: #d4af37; box-shadow: 0 30px 60px rgba(0,0,0,0.08); }
`;

const HeaderComponent = ({ section, selectedId, onSelect }: any) => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${section.settings?.sticky ? 'sticky top-0 z-[100]' : ''} bg-white transition-all duration-500 ${isScrolled ? 'h-16 shadow-xl' : 'h-24'}`}>
      <div className="davut-container h-full flex items-center justify-between">
        <div onClick={(e) => onSelect(e, section.id)} className="cursor-pointer group">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tighter" style={{ fontFamily: 'Playfair Display, serif' }}>
            {section.settings?.logoText || "DAVUT KUNDURA"}
          </h1>
          <div className="flex items-center gap-2">
            <div className="h-[1px] w-4 bg-[#d4af37]"></div>
            <span className="text-[9px] tracking-[0.4em] font-bold gold-accent uppercase">ZANAATTAN ADIMA</span>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-12">
          {(section.blocks || []).filter((b: any) => b.type === 'menu_item').map((block: any) => (
            <a 
              key={block.id} 
              href="#" 
              onClick={(e) => onSelect(e, block.id)}
              className={`text-[11px] font-bold tracking-[0.25em] transition-all uppercase relative group ${selectedId === block.id ? 'text-[#d4af37]' : 'text-[#1a120b]'}`}
            >
              {block.settings?.label}
              <span className={`absolute -bottom-2 left-0 h-0.5 bg-[#d4af37] transition-all duration-300 ${selectedId === block.id ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-8">
          <div className="hidden xl:flex items-center gap-3 text-[10px] font-bold tracking-widest opacity-40">
            <Phone size={14} className="gold-accent" /> +90 538 625 87 92
          </div>
          <div className="flex items-center gap-5">
            <Search size={20} className="text-[#1a120b]/30 hover:text-[#1a120b] cursor-pointer" />
            <ShoppingBag size={20} className="text-[#1a120b]/30 hover:text-[#1a120b] cursor-pointer" />
          </div>
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
    <div className="davut-wrapper w-full bg-[#fbfaf9] min-h-screen">
      <style>{failsafeStyles}</style>
      {sections.map((section: any) => {
        const isSelected = selectedId === section.id;
        
        return (
          <div key={section.id} onClick={(e) => handleSectionClick(e, section.id)} className={`relative transition-all duration-300 ${isSelected ? 'ring-1 ring-[#d4af37] z-10' : ''}`}>
            
            {section.type === "header" && <HeaderComponent section={section} selectedId={selectedId} onSelect={handleSectionClick} />}
            
            {section.type === "hero" && (
              <section className="bg-[#f4ecd8] py-40 md:py-60 px-6 text-center border-b border-black/5 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#1a120b 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
                <div className="davut-container relative z-10 space-y-10">
                  <span className="text-[10px] font-bold tracking-[0.5em] gold-accent uppercase block animate-pulse">PENDİK ZANAAT MERKEZİ</span>
                  <h2 className="text-6xl md:text-9xl font-bold font-serif leading-[0.9] tracking-tighter">{section.settings?.title}</h2>
                  <p className="text-xl md:text-2xl opacity-60 italic font-serif max-w-3xl mx-auto">"{section.settings?.subtitle}"</p>
                  <button className="bg-[#1a120b] text-white px-14 py-6 text-[11px] font-bold tracking-[0.4em] uppercase hover:bg-[#d4af37] transition-all hover:scale-105">
                    {section.settings?.buttonText}
                  </button>
                </div>
              </section>
            )}

            {section.type === "richText" && (
              <section className="bg-white py-32 px-6">
                <div className="davut-container text-center space-y-12">
                  <div className="w-16 h-[1px] bg-[#d4af37] mx-auto"></div>
                  <h3 className="text-4xl md:text-6xl font-serif font-bold leading-tight">{section.settings?.title}</h3>
                  <p className="text-xl md:text-3xl opacity-70 font-serif leading-relaxed italic max-w-5xl mx-auto">"{section.settings?.content}"</p>
                </div>
              </section>
            )}

            {section.type === "categoryGrid" && (
              <section className="bg-white py-32 px-6">
                <div className="davut-container">
                  <div className="text-center mb-24 space-y-6">
                    <span className="text-[9px] font-bold tracking-[0.6em] gold-accent uppercase">KOLEKSİYONLARIMIZ</span>
                    <h2 className="text-5xl md:text-7xl font-serif font-bold tracking-tight">{section.settings?.title}</h2>
                    <p className="opacity-40 italic text-xl font-serif">{section.settings?.subtitle}</p>
                  </div>
                  <div className="davut-grid grid-3">
                    {(section.blocks || []).map((block: any) => (
                      <div key={block.id} onClick={(e) => handleSectionClick(e, block.id)} className={`cat-card group ${selectedId === block.id ? 'ring-2 ring-[#d4af37] ring-offset-8' : ''}`}>
                         <div className="w-20 h-20 rounded-full border border-[#d4af37]/20 flex items-center justify-center mx-auto mb-10 group-hover:border-[#d4af37] transition-all duration-500">
                           <Box size={32} className="opacity-20 group-hover:opacity-100 group-hover:text-[#d4af37] transition-all duration-500" />
                         </div>
                         <h3 className="text-3xl font-serif font-bold mb-6 group-hover:text-[#d4af37] transition-colors">{block.settings?.title}</h3>
                         <div className="w-8 h-[1px] bg-[#d4af37]/30 mx-auto group-hover:w-20 group-hover:bg-[#d4af37] transition-all duration-500"></div>
                         <div className="mt-10 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                            <span className="text-[10px] font-bold tracking-[0.3em] gold-accent uppercase">DETAYLARI GÖR</span>
                         </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {section.type === "footer" && (
              <footer className="espresso-bg">
                <div className="marquee-container">
                  <div className="marquee-content">
                    {Array(10).fill(section.settings?.topBarText).map((t, i) => <span key={i} className="mx-12">{t}</span>)}
                  </div>
                </div>
                <div className="davut-container py-32 davut-grid grid-4">
                  {(section.blocks || []).map((block: any) => (
                    <div key={block.id} onClick={(e) => handleSectionClick(e, block.id)} className={`space-y-10 p-4 transition-all ${selectedId === block.id ? 'bg-white/5 rounded-lg ring-1 ring-white/10' : ''}`}>
                      <h4 className="gold-accent text-[10px] tracking-[0.4em] uppercase font-bold">{block.settings?.title}</h4>
                      {block.type === 'footer_text' && <p className="text-sm opacity-50 italic leading-relaxed font-serif">"{block.settings?.content}"</p>}
                      {block.type === 'footer_menu' && (
                        <ul className="space-y-5 text-[13px] opacity-60 font-medium tracking-wide">
                          {(block.settings?.links || "").split('\n').map((l: string, i: number) => <li key={i} className="hover:text-[#d4af37] cursor-pointer transition-colors">{l}</li>)}
                        </ul>
                      )}
                      {block.type === 'footer_contact' && (
                        <div className="space-y-6 text-[13px] opacity-60 italic font-serif">
                          <div className="flex gap-4"><MapPin size={18} className="gold-accent opacity-50" /><span>{block.settings?.address}</span></div>
                          <div className="flex gap-4"><Phone size={18} className="gold-accent opacity-50" /><span>{block.settings?.phone}</span></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="davut-container py-12 border-t border-white/5 text-center">
                   <p className="text-[9px] font-bold tracking-[0.6em] opacity-20 uppercase">© 2026 DAVUT KUNDURA. PENDİK'İN ZANAAT MİRASI.</p>
                </div>
              </footer>
            )}
          </div>
        );
      })}
    </div>
  );
}
