"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Trash2, Search, Image as ImageIcon, Box, CreditCard, Settings, Mail, Star, Camera, Phone, MapPin } from "lucide-react";

const HeaderComponent = ({ section, selectedId, onSelect }: { section: any, selectedId: string | null, onSelect: (e: React.MouseEvent, id: string) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${section.settings?.sticky ? 'sticky top-0 z-[100]' : ''} bg-white transition-all duration-500 ${isScrolled ? 'h-16 shadow-xl' : 'h-24 shadow-sm'}`}>
      <div className="container mx-auto px-8 h-full flex items-center justify-between">
        <div 
          onClick={(e) => onSelect(e, section.id)}
          className={`font-bold tracking-tighter text-[#1a120b] cursor-pointer transition-all duration-500 p-2 rounded-lg border border-transparent hover:border-[#d4af37]/20 ${selectedId === section.id ? 'border-[#d4af37] bg-[#d4af37]/5' : ''}`}
          style={{ fontSize: isScrolled ? '20px' : `${section.settings?.logoSize || 24}px`, fontFamily: 'Playfair Display, serif' }}
        >
          {isScrolled ? "DK" : (section.settings?.logoText || "DAVUT KUNDURA")}
        </div>
        
        <nav className="hidden lg:flex items-center gap-12">
          {(section.blocks || []).filter((b: any) => b.type === 'menu_item').map((block: any) => (
            <a 
              key={block.id} 
              href="#" 
              onClick={(e) => onSelect(e, block.id)}
              className={`text-[11px] font-bold text-[#1a120b] hover:text-[#d4af37] tracking-[0.25em] transition-all uppercase p-2 relative group ${selectedId === block.id ? 'text-[#d4af37]' : ''}`}
            >
              {block.settings?.label}
              <span className={`absolute bottom-0 left-2 right-2 h-0.5 bg-[#d4af37] transition-all duration-300 ${selectedId === block.id ? 'w-auto' : 'w-0 group-hover:w-auto'}`}></span>
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-8">
          <button className="hidden md:flex items-center gap-2 text-[10px] font-bold tracking-widest text-[#1a120b]/50 hover:text-[#d4af37] transition-colors uppercase">
             <Phone size={14} /> +90 538 625 87 92
          </button>
          <Search size={20} className="text-[#1a120b]/30 hover:text-[#1a120b] transition-colors cursor-pointer" />
        </div>
      </div>
    </header>
  );
};

export default function StorefrontRenderer({ initialSections = [] }: { initialSections?: any[] }) {
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

  const handleSectionClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedId(id);
    window.parent.postMessage({ type: "SELECT_SECTION", id }, "*");
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#fbfaf9]">
      {sections.map((section: any) => {
        const isSelected = selectedId === section.id;
        
        const renderContent = () => {
          switch (section.type) {
            case "header": 
              return <HeaderComponent section={section} selectedId={selectedId} onSelect={handleSectionClick} />;
            
            case "hero": 
              return (
                <div className="relative bg-[#f4ecd8] py-40 overflow-hidden border-b border-black/5">
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#1a120b 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                  <div className="container mx-auto px-6 text-center relative z-10">
                    <span className="text-[10px] font-bold tracking-[0.4em] text-[#d4af37] uppercase mb-6 block animate-pulse">PENDİK ZANAAT MERKEZİ</span>
                    <h1 className="text-7xl md:text-8xl font-serif font-bold mb-8 text-[#1a120b] leading-[1.1] tracking-tight">
                      {section.settings?.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-[#1a120b]/60 italic mb-12 max-w-2xl mx-auto font-serif">
                      "{section.settings?.subtitle}"
                    </p>
                    <button className="group relative px-12 py-5 bg-[#1a120b] text-white overflow-hidden transition-all hover:scale-105 active:scale-95">
                       <span className="relative z-10 font-bold tracking-[0.2em] text-[11px]">{section.settings?.buttonText}</span>
                       <div className="absolute inset-0 bg-[#d4af37] translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                    </button>
                  </div>
                </div>
              );

            case "richText":
              return (
                <section className="container mx-auto px-6 py-32 text-center bg-white">
                  <div className="max-w-4xl mx-auto space-y-10">
                    <div className="w-12 h-1 bg-[#d4af37] mx-auto"></div>
                    <h2 className="text-5xl font-serif font-bold text-[#1a120b] leading-tight italic">{section.settings?.title}</h2>
                    <p className="text-[#1a120b]/70 text-2xl leading-relaxed font-serif italic">"{section.settings?.content}"</p>
                  </div>
                </section>
              );

            case "categoryGrid":
              return (
                <section className="container mx-auto px-6 py-32 bg-white">
                  <div className="flex flex-col items-center text-center mb-20">
                    <span className="text-[9px] font-bold tracking-[0.5em] text-[#d4af37] uppercase mb-4">KOLEKSİYONLARIMIZ</span>
                    <h2 className="text-5xl font-serif font-bold text-[#1a120b] mb-6 tracking-tight">{section.settings?.title}</h2>
                    <p className="text-lg text-[#1a120b]/40 italic font-serif max-w-xl">{section.settings?.subtitle}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {(section.blocks || []).map((block: any) => {
                      const isBlockSelected = selectedId === block.id;
                      return (
                        <div 
                          key={block.id} 
                          onClick={(e) => handleSectionClick(e, block.id)}
                          className={`group relative aspect-[3/4] overflow-hidden rounded-sm cursor-pointer transition-all duration-700 shadow-2xl ${isBlockSelected ? 'ring-2 ring-[#d4af37] ring-offset-8 scale-95' : 'hover:-translate-y-2'}`}
                        >
                          <div className="absolute inset-0 bg-[#1a120b] opacity-0 group-hover:opacity-10 transition-opacity"></div>
                          <div className="w-full h-full bg-[#f9f7f4] flex flex-col items-center justify-center p-12 text-center border border-black/5">
                            <div className="w-20 h-20 rounded-full border border-[#d4af37]/20 flex items-center justify-center mb-8 group-hover:border-[#d4af37] transition-colors duration-500">
                               <Box size={32} className="text-[#1a120b]/20 group-hover:text-[#d4af37] transition-colors duration-500" />
                            </div>
                            <h3 className="text-3xl font-serif font-bold text-[#1a120b] mb-4 group-hover:text-[#d4af37] transition-colors">{block.settings?.title}</h3>
                            <div className="w-8 h-0.5 bg-[#d4af37]/20 group-hover:w-16 group-hover:bg-[#d4af37] transition-all duration-500"></div>
                          </div>
                          <div className="absolute bottom-10 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                             <span className="text-[10px] font-bold tracking-[0.3em] text-[#d4af37] uppercase">İNCELE</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              );

            case "footer":
              return (
                <footer className="w-full bg-[#1a120b]">
                  {/* Announcement */}
                  <div className="py-6 border-b border-white/5 overflow-hidden">
                    <div className="animate-marquee whitespace-nowrap flex gap-12 uppercase tracking-[0.4em] text-[10px] font-bold text-[#d4af37]">
                       <span>{section.settings?.topBarText}</span>
                       <span>•</span>
                       <span>{section.settings?.topBarText}</span>
                       <span>•</span>
                       <span>{section.settings?.topBarText}</span>
                    </div>
                  </div>

                  {/* Main Footer */}
                  <div className="py-24 px-8 container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20">
                    {(section.blocks || []).map((block: any) => {
                      const isBlockSelected = selectedId === block.id;
                      return (
                        <div 
                          key={block.id} 
                          onClick={(e) => handleSectionClick(e, block.id)}
                          className={`space-y-8 p-4 rounded-lg transition-all cursor-pointer border border-transparent ${isBlockSelected ? 'bg-white/5 border-[#d4af37]/30' : 'hover:bg-white/5'}`}
                        >
                          {block.type === 'footer_text' && (
                            <div className="space-y-6">
                              <h2 className="text-3xl font-serif font-bold text-white tracking-tight">{block.settings?.title}</h2>
                              <p className="text-sm text-white/50 leading-relaxed font-medium italic">"{block.settings?.content}"</p>
                            </div>
                          )}
                          {block.type === 'footer_menu' && (
                            <div className="space-y-8">
                              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#d4af37]">{block.settings?.title}</h4>
                              <ul className="space-y-4 text-sm font-medium text-white/60">
                                {(block.settings?.links || "").split('\n').map((link: string, i: number) => (
                                  <li key={i}><span className="hover:text-[#d4af37] transition-colors cursor-pointer tracking-wider">{link}</span></li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {block.type === 'footer_contact' && (
                            <div className="space-y-8">
                              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#d4af37]">{block.settings?.title}</h4>
                              <div className="space-y-6 text-sm font-medium text-white/60 leading-relaxed italic">
                                <div className="flex gap-4"><MapPin size={18} className="shrink-0 text-[#d4af37]/50" /><span>{block.settings?.address}</span></div>
                                <div className="flex gap-4"><Phone size={18} className="shrink-0 text-[#d4af37]/50" /><span>{block.settings?.phone}</span></div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="py-12 border-t border-white/5 text-center">
                    <p className="text-[9px] text-white/20 font-bold uppercase tracking-[0.5em]">© 2026 DAVUT KUNDURA. PENDİK'İN ZANAAT MİRASI.</p>
                  </div>
                </footer>
              );

            default: return <div key={section.id} className="p-10 border border-dashed text-center">Bölüm: {section.type}</div>;
          }
        };

        return (
          <div 
            key={section.id} 
            onClick={(e) => handleSectionClick(e, section.id)} 
            className={`relative group transition-all duration-300 ${isSelected ? 'ring-1 ring-[#d4af37] z-10 ring-offset-4' : ''}`}
          >
             {renderContent()}
          </div>
        );
      })}
    </div>
  );
}
