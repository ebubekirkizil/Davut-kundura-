"use client";

import { useState, useEffect } from "react";
import { Search, Box, Settings, Phone, MapPin, Menu, ShoppingBag, User } from "lucide-react";

// --- GÜVENLİ HEADER ---
const HeaderComponent = ({ section, selectedId, onSelect }: { section: any, selectedId: string | null, onSelect: (e: React.MouseEvent, id: string) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${section.settings?.sticky ? 'sticky top-0 z-[100]' : ''} bg-white w-full border-b border-gray-100 transition-all duration-300 ${isScrolled ? 'py-3 shadow-lg' : 'py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div 
          onClick={(e) => onSelect(e, section.id)}
          className={`cursor-pointer transition-all ${selectedId === section.id ? 'ring-2 ring-[#d4af37] p-1 rounded' : ''}`}
        >
          <h1 className="text-2xl md:text-3xl font-bold tracking-tighter text-[#1a120b]" style={{ fontFamily: 'Playfair Display, serif' }}>
            {section.settings?.logoText || "DAVUT KUNDURA"}
          </h1>
          <p className="text-[10px] tracking-[0.3em] text-[#d4af37] font-bold uppercase -mt-1">ZANAATTAN ADIMA</p>
        </div>

        <nav className="hidden lg:flex items-center gap-8">
          {(section.blocks || []).filter((b: any) => b.type === 'menu_item').map((block: any) => (
            <a 
              key={block.id} 
              href="#" 
              onClick={(e) => onSelect(e, block.id)}
              className={`text-[11px] font-bold tracking-[0.2em] uppercase transition-colors hover:text-[#d4af37] ${selectedId === block.id ? 'text-[#d4af37] underline underline-offset-8' : 'text-[#1a120b]'}`}
            >
              {block.settings?.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-5 text-[#1a120b]">
          <Search size={18} className="cursor-pointer opacity-50 hover:opacity-100" />
          <User size={18} className="cursor-pointer opacity-50 hover:opacity-100" />
          <ShoppingBag size={18} className="cursor-pointer opacity-50 hover:opacity-100" />
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
    e.preventDefault(); e.stopPropagation();
    setSelectedId(id);
    window.parent.postMessage({ type: "SELECT_SECTION", id }, "*");
  };

  return (
    <div className="w-full min-h-screen bg-[#fbfaf9] flex flex-col font-sans text-[#1a120b]">
      {sections.map((section: any) => {
        const isSelected = selectedId === section.id;
        
        const renderContent = () => {
          switch (section.type) {
            case "header": 
              return <HeaderComponent section={section} selectedId={selectedId} onSelect={handleSectionClick} />;
            
            case "hero": 
              return (
                <section className="relative w-full bg-[#f4ecd8] py-32 md:py-48 px-6 text-center border-b border-black/5">
                  <div className="max-w-4xl mx-auto space-y-8">
                    <span className="text-[10px] font-bold tracking-[0.5em] text-[#d4af37] uppercase block">PENDİK ZANAAT MERKEZİ</span>
                    <h2 className="text-5xl md:text-7xl font-bold font-serif leading-tight">{section.settings?.title}</h2>
                    <p className="text-lg md:text-xl text-[#1a120b]/60 italic font-serif">"{section.settings?.subtitle}"</p>
                    <button className="bg-[#1a120b] text-white px-10 py-4 text-[11px] font-bold tracking-[0.3em] uppercase hover:bg-[#d4af37] transition-all">
                      {section.settings?.buttonText}
                    </button>
                  </div>
                </section>
              );

            case "richText":
              return (
                <section className="w-full bg-white py-24 px-6 text-center">
                  <div className="max-w-3xl mx-auto space-y-8">
                    <div className="w-12 h-0.5 bg-[#d4af37] mx-auto"></div>
                    <h3 className="text-4xl font-serif font-bold italic leading-snug">{section.settings?.title}</h3>
                    <p className="text-xl text-[#1a120b]/70 font-serif leading-relaxed italic">"{section.settings?.content}"</p>
                  </div>
                </section>
              );

            case "categoryGrid":
              return (
                <section className="w-full bg-white py-24 px-6">
                  <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16 space-y-4">
                      <h2 className="text-4xl font-serif font-bold">{section.settings?.title}</h2>
                      <p className="text-[#1a120b]/40 italic font-serif">{section.settings?.subtitle}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                      {(section.blocks || []).map((block: any) => (
                        <div 
                          key={block.id} 
                          onClick={(e) => handleSectionClick(e, block.id)}
                          className={`group relative min-h-[400px] bg-[#f9f7f4] rounded-lg overflow-hidden cursor-pointer transition-all border-2 ${selectedId === block.id ? 'border-[#d4af37] ring-4 ring-[#d4af37]/10' : 'border-transparent hover:shadow-2xl hover:-translate-y-1'}`}
                        >
                          <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center space-y-6">
                            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                              <Box size={24} className="text-[#d4af37]" />
                            </div>
                            <h3 className="text-2xl font-serif font-bold group-hover:text-[#d4af37] transition-colors">{block.settings?.title}</h3>
                            <div className="w-8 h-0.5 bg-[#d4af37]/30 group-hover:w-16 group-hover:bg-[#d4af37] transition-all duration-500"></div>
                            <span className="text-[10px] font-bold tracking-[0.2em] text-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity uppercase">Kataloğu Keşfet</span>
                          </div>
                          <div className="absolute inset-0 bg-[#1a120b] opacity-0 group-hover:opacity-[0.02] transition-opacity"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              );

            case "footer":
              return (
                <footer className="w-full bg-[#1a120b] text-white py-20 px-6">
                  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
                    {(section.blocks || []).map((block: any) => (
                      <div 
                        key={block.id} 
                        onClick={(e) => handleSectionClick(e, block.id)}
                        className={`space-y-6 p-4 rounded transition-all cursor-pointer border border-transparent ${selectedId === block.id ? 'bg-white/5 border-[#d4af37]/30' : 'hover:bg-white/5'}`}
                      >
                        {block.type === 'footer_text' && (
                          <div className="space-y-4">
                            <h4 className="text-2xl font-serif font-bold">{block.settings?.title}</h4>
                            <p className="text-sm text-white/50 leading-relaxed italic">"{block.settings?.content}"</p>
                          </div>
                        )}
                        {block.type === 'footer_menu' && (
                          <div className="space-y-6">
                            <h4 className="text-[10px] font-bold tracking-[0.3em] text-[#d4af37] uppercase">{block.settings?.title}</h4>
                            <ul className="space-y-3 text-sm text-white/60">
                              {(block.settings?.links || "").split('\n').map((l: string, i: number) => (
                                <li key={i} className="hover:text-[#d4af37] transition-colors">{l}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {block.type === 'footer_contact' && (
                          <div className="space-y-6">
                            <h4 className="text-[10px] font-bold tracking-[0.3em] text-[#d4af37] uppercase">{block.settings?.title}</h4>
                            <div className="space-y-4 text-sm text-white/60 italic">
                              <div className="flex gap-3"><MapPin size={16} className="text-[#d4af37]/50" /><span>{block.settings?.address}</span></div>
                              <div className="flex gap-3"><Phone size={16} className="text-[#d4af37]/50" /><span>{block.settings?.phone}</span></div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="mt-20 pt-8 border-t border-white/5 text-center">
                    <p className="text-[9px] font-bold tracking-[0.5em] text-white/20 uppercase">© 2026 DAVUT KUNDURA. PENDİK ZANAAT MİRASI.</p>
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
            className={`relative group transition-all duration-300 ${isSelected ? 'ring-2 ring-[#d4af37] z-10' : ''}`}
          >
             {renderContent()}
          </div>
        );
      })}
    </div>
  );
}
