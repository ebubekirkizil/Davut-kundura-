"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Trash2, Search, Image as ImageIcon, Box, CreditCard, Settings, Mail, Star, Camera } from "lucide-react";

// HEADER BILESENI
const HeaderComponent = ({ section, selectedId, onSelect }: { section: any, selectedId: string | null, onSelect: (e: React.MouseEvent, id: string) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${section.settings?.sticky ? 'sticky top-0 z-[100]' : ''} bg-white border-b border-gray-100 transition-all duration-300 ${isScrolled ? 'h-16 shadow-md' : 'h-24 shadow-sm'}`}>
      <div className="container mx-auto px-6 h-full flex items-center justify-between">
        <div 
          onClick={(e) => onSelect(e, section.id)}
          className={`font-bold tracking-tighter text-[#1a120b] cursor-pointer transition-all duration-300 p-2 rounded-lg border border-transparent hover:border-blue-200 ${selectedId === section.id ? 'border-blue-500 bg-blue-50/10' : ''}`}
          style={{ fontSize: isScrolled ? '18px' : `${section.settings?.logoSize || 24}px` }}
        >
          {isScrolled ? "DK" : (section.settings?.logoText || "DAVUT KUNDURA")}
        </div>
        <nav className="hidden lg:flex items-center gap-10">
          {(section.blocks || []).filter((b: any) => b.type === 'menu_item').map((block: any) => (
            <a 
              key={block.id} 
              href="#" 
              onClick={(e) => onSelect(e, block.id)}
              className={`text-[12px] font-bold text-[#1a120b] hover:text-[#d4af37] tracking-[0.15em] transition-colors uppercase p-2 rounded-lg border border-transparent hover:border-blue-200 ${selectedId === block.id ? 'border-blue-500 bg-blue-50/10 ring-1 ring-blue-500' : ''}`}
            >
              {block.settings?.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-6"><Search size={20} className="text-gray-600" /></div>
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
    <div className="flex flex-col w-full min-h-screen bg-gray-50">
      {sections.map((section: any) => {
        const renderContent = () => {
          switch (section.type) {
            case "header": 
              return <HeaderComponent section={section} selectedId={selectedId} onSelect={handleSectionClick} />;
            
            case "hero": 
              return (
                <div className="bg-[#f4ecd8] py-32 text-center">
                  <h1 className="text-6xl font-serif font-bold mb-4 text-[#1a120b]">{section.settings?.title}</h1>
                  <p className="text-xl text-[#1a120b]/60 italic mb-8">{section.settings?.subtitle}</p>
                  <button className="px-10 py-4 bg-black text-white rounded-full font-bold hover:bg-[#d4af37] transition-all">
                    {section.settings?.buttonText}
                  </button>
                </div>
              );

            case "richText":
              return (
                <section className="container mx-auto px-6 py-24 text-center bg-white border-y border-gray-100">
                  <div className="max-w-4xl mx-auto space-y-6">
                    <h2 className="text-4xl font-serif font-bold text-[#1a120b] italic">{section.settings?.title}</h2>
                    <p className="text-[#1a120b]/70 text-xl leading-relaxed italic">"{section.settings?.content}"</p>
                  </div>
                </section>
              );

            case "categoryGrid":
              return (
                <section className="container mx-auto px-6 py-24 bg-white">
                  <div className="text-center mb-16">
                    <h2 className="text-4xl font-serif font-bold text-[#1a120b] mb-4">{section.settings?.title}</h2>
                    <p className="text-lg text-[#1a120b]/60 italic">{section.settings?.subtitle}</p>
                    <div className="w-20 h-1 bg-[#d4af37] mx-auto mt-6"></div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                    {(section.blocks || []).map((block: any) => {
                      const isBlockSelected = selectedId === block.id;
                      return (
                        <div 
                          key={block.id} 
                          onClick={(e) => handleSectionClick(e, block.id)}
                          className={`group relative aspect-[4/5] overflow-hidden rounded-2xl cursor-pointer shadow-lg transition-all border-2 ${isBlockSelected ? 'border-blue-500 ring-4 ring-blue-500/20 scale-105' : 'border-transparent hover:scale-[1.02]'}`}
                        >
                          <div className="w-full h-full bg-gradient-to-br from-[#1a120b]/5 to-[#1a120b]/10 flex flex-col items-center justify-center p-6 text-center">
                            <ImageIcon size={32} className="text-[#1a120b]/20 mb-4" />
                            <span className="text-xs font-bold text-[#1a120b]/30 uppercase tracking-widest">{block.settings?.title}</span>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                            <h3 className="text-xl md:text-2xl font-serif font-bold text-white mb-2">{block.settings?.title}</h3>
                            <div className="w-0 group-hover:w-12 h-0.5 bg-[#d4af37] transition-all duration-300"></div>
                            <span className="text-[10px] font-bold text-[#d4af37] mt-4 uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity">Kataloğu İncele</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              );

            case "footer":
              return (
                <footer className="w-full">
                  <div className="bg-[#1a120b] text-[#f4ecd8] py-4 text-center overflow-hidden">
                    <div className="container mx-auto px-6 animate-marquee whitespace-nowrap uppercase tracking-[0.3em] text-[11px]">
                      {section.settings?.topBarText}
                    </div>
                  </div>
                  <div style={{ backgroundColor: section.settings?.backgroundColor || "#f4ecd8" }} className="py-20 px-6 border-t border-black/5">
                    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20">
                      {(section.blocks || []).map((block: any) => {
                        const isBlockSelected = selectedId === block.id;
                        return (
                          <div 
                            key={block.id} 
                            onClick={(e) => handleSectionClick(e, block.id)}
                            className={`space-y-6 p-4 rounded-xl transition-all cursor-pointer border border-transparent hover:border-blue-300 ${isBlockSelected ? 'border-blue-500 bg-blue-50/10 ring-2 ring-blue-500' : ''}`}
                          >
                            {block.type === 'footer_text' && (
                              <>
                                <h2 className="text-2xl font-serif font-bold text-[#1a120b] tracking-tight leading-tight break-words">{block.settings?.title}</h2>
                                <p className="text-sm text-[#1a120b]/70 leading-relaxed font-medium">{block.settings?.content}</p>
                              </>
                            )}
                            {block.type === 'footer_menu' && (
                              <>
                                <h4 className="text-xs font-bold uppercase tracking-widest text-black mb-8">{block.settings?.title}</h4>
                                <ul className="space-y-4 text-sm font-medium text-[#1a120b]/80">
                                  {(block.settings?.links || "").split('\n').map((link: string, i: number) => (
                                    <li key={i}><span className="hover:text-black transition-colors">{link}</span></li>
                                  ))}
                                </ul>
                              </>
                            )}
                            {block.type === 'footer_contact' && (
                              <>
                                <h4 className="text-xs font-bold uppercase tracking-widest text-black mb-8">{block.settings?.title}</h4>
                                <div className="space-y-4 text-sm font-medium text-[#1a120b]/80 leading-relaxed">
                                  <div className="flex gap-3"><Box size={18} className="shrink-0 opacity-30" /><span>{block.settings?.address}</span></div>
                                  <div className="flex gap-3"><Settings size={18} className="shrink-0 opacity-30" /><span>{block.settings?.phone}</span></div>
                                </div>
                              </>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div style={{ backgroundColor: section.settings?.backgroundColor || "#f4ecd8" }} className="py-8 border-t border-black/5 text-center">
                    <p className="text-[10px] text-[#1a120b]/40 font-bold uppercase tracking-[0.2em]">© 2026 DAVUT KUNDURA. TÜM HAKLARI SAKLIDIR.</p>
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
            className={`relative group transition-all duration-200 ${selectedId === section.id ? 'ring-2 ring-blue-500 z-10' : 'hover:ring-1 hover:ring-blue-300'}`}
          >
             {renderContent()}
          </div>
        );
      })}
    </div>
  );
}
