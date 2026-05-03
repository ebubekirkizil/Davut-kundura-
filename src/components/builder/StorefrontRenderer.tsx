"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Trash2, Search, Image as ImageIcon, Box, CreditCard, Settings, Mail, Star, Camera } from "lucide-react";
import LiveHeroClient from "./LiveHeroClient";

// HEADER - BLOK TABANLI (MENÜLER DİNAMİK)
const HeaderComponent = ({ section }: { section: any }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${section.settings?.sticky ? 'sticky top-0 z-[100]' : ''} bg-white border-b border-gray-100 transition-all duration-300 ${isScrolled ? 'h-16 shadow-md' : 'h-24 shadow-sm'}`}>
      <div className="container mx-auto px-6 h-full flex items-center justify-between">
        <div className="font-bold tracking-tighter text-[#1a120b] transition-all duration-300" style={{ fontSize: isScrolled ? '18px' : `${section.settings?.logoSize || 24}px` }}>
          {isScrolled ? "DK" : section.settings?.logoText}
        </div>
        <nav className="hidden lg:flex items-center gap-10">
          {section.blocks?.filter((b: any) => b.type === 'menu_item').map((block: any) => (
            <a key={block.id} href={block.settings?.link} className="text-[12px] font-bold text-[#1a120b] hover:text-[#d4af37] tracking-[0.15em] transition-colors uppercase">
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

  return (
    <div className="flex flex-col w-full">
      {sections.map((section: any) => {
        const renderContent = () => {
          switch (section.type) {
            case "header": return <HeaderComponent section={section} />;
            case "hero": return <div style={{ paddingBlock: `${section.settings?.paddingY || 100}px` }} className="bg-[#f4ecd8] text-center"><h1 className="text-6xl font-serif font-bold mb-4">{section.settings?.title}</h1><p className="text-xl italic opacity-70">{section.settings?.subtitle}</p></div>;
            case "footer":
              return (
                <footer className="w-full">
                  <div className="bg-[#1a120b] text-[#f4ecd8] py-4 text-center overflow-hidden">
                    <div className="container mx-auto px-6 animate-marquee whitespace-nowrap uppercase tracking-[0.3em] text-[11px]">
                      {section.settings?.topBarText}
                    </div>
                  </div>
                  <div className="bg-[#f4ecd8] py-20 px-6">
                    <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
                      <div className="space-y-6">
                        <h2 className="text-xl font-serif font-bold text-[#1a120b] tracking-tight leading-tight max-w-[200px] break-words">{section.settings?.footerLogo}</h2>
                        <p className="text-sm text-[#1a120b]/70 italic leading-relaxed">{section.settings?.footerAbout}</p>
                      </div>
                      {section.blocks?.filter((b: any) => b.type === 'footer_column').map((block: any) => (
                        <div key={block.id}>
                          <h4 className="text-xs font-bold uppercase tracking-widest text-black mb-8">{block.settings?.title}</h4>
                          <ul className="space-y-4 text-sm font-medium text-[#1a120b]/80">
                            {block.settings?.links?.split('\n').map((link: string, i: number) => (
                              <li key={i}><a href="#" className="hover:text-black transition-colors">{link}</a></li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-[#f4ecd8] py-8 border-t border-black/5 text-center text-[10px] text-black/40 font-bold uppercase tracking-widest">
                    © 2026 {section.settings?.footerLogo}. TÜM HAKLARI SAKLIDIR.
                  </div>
                </footer>
              );
            default: return <div className="p-10 border border-dashed text-center">Bölüm: {section.type}</div>;
          }
        };

        return (
          <div key={section.id} onClick={() => window.parent.postMessage({ type: "SELECT_SECTION", id: section.id }, "*")} className={`relative group transition-all duration-200 ${selectedId === section.id ? 'ring-2 ring-blue-500 z-10' : 'hover:ring-1 hover:ring-blue-300'}`}>
             {renderContent()}
          </div>
        );
      })}
    </div>
  );
}
