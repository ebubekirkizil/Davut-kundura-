"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Trash2, Search, Image as ImageIcon, Box, CreditCard, Settings, Mail, Star, Camera } from "lucide-react";
import LiveHeroClient from "./LiveHeroClient";
import ProductCard from "../product/ProductCard";
import { SECTION_SCHEMAS } from "@/store/schema";

interface Section {
  id: string;
  type: string;
  settings: any;
  blocks: any[];
}

// HEADER BILESENI (Hata almamak için dışarıda tanımlandı)
const HeaderComponent = ({ section }: { section: any }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${section.settings?.sticky ? 'sticky top-0 z-[100]' : ''} bg-white border-b border-gray-100 shadow-sm transition-all duration-300 ${isScrolled ? 'h-16' : 'h-24'}`}>
      <div className="container mx-auto px-6 h-full flex items-center justify-between">
        <div 
          className="font-bold tracking-tighter text-[#1a120b] cursor-pointer transition-all duration-300"
          style={{ fontSize: isScrolled ? '18px' : `${section.settings?.logoSize || 24}px` }}
        >
          {isScrolled ? "DK" : section.settings?.logoText}
        </div>
        <nav className="hidden lg:flex items-center gap-10">
          {[1, 2, 3, 4].map(i => (
            <a key={i} href={section.settings?.[`link${i}`] || "#"} className="text-[12px] font-bold text-[#1a120b] hover:text-[var(--p-blue)] tracking-[0.15em] transition-colors uppercase">
              {section.settings?.[`menu${i}`]}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-6">
          <Search size={20} className="text-gray-600" />
          <div className="lg:hidden flex flex-col gap-1"><div className="w-5 h-0.5 bg-black"></div><div className="w-5 h-0.5 bg-black"></div></div>
        </div>
      </div>
    </header>
  );
};

export default function StorefrontRenderer({ 
  initialSections = [], 
  products = [] 
}: { 
  initialSections?: Section[], 
  products?: any[] 
}) {
  const [sections, setSections] = useState<Section[]>(initialSections);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isBuilderMode, setIsBuilderMode] = useState(false);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "BUILDER_SYNC") {
        setIsBuilderMode(true);
        const { page, selectedId: newSelectedId } = event.data;
        if (page?.sections) setSections(page.sections);
        setSelectedId(newSelectedId);
      }
    };

    window.addEventListener("message", handleMessage);
    window.parent.postMessage({ type: "PREVIEW_READY" }, "*");
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const handleSectionClick = (id: string) => {
    if (!isBuilderMode) return;
    setSelectedId(id);
    window.parent.postMessage({ type: "SELECT_SECTION", id }, "*");
  };

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {sections.map((section) => {
        const isSelected = selectedId === section.id;
        
        const renderContent = () => {
          switch (section.type) {
            case "header":
              return <HeaderComponent section={section} />;
            
            case "footer":
              return (
                <footer className="w-full">
                  <div className="bg-[#1a120b] text-[#f4ecd8] py-4 text-center overflow-hidden">
                    <div className="container mx-auto px-6 whitespace-nowrap animate-marquee">
                      <span className="text-[11px] font-bold tracking-[0.3em] uppercase opacity-90">{section.settings?.topBarText}</span>
                    </div>
                  </div>
                  <div className="bg-[#f4ecd8] py-20 px-6 border-t border-black/5">
                    <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
                      <div className="space-y-6">
                        <h2 className="text-xl font-serif font-bold text-[#1a120b] tracking-tight leading-tight max-w-[200px] break-words">
                          {section.settings?.footerLogo}
                        </h2>
                        <p className="text-sm text-[#1a120b]/70 leading-relaxed font-medium">{section.settings?.footerAbout}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-black mb-8">{section.settings?.titleMenu || "HIZLI MENÜ"}</h4>
                        <ul className="space-y-4 text-sm font-medium text-[#1a120b]/80">
                          <li><a href="#" className="hover:text-black">Tüm Ürünler</a></li>
                          <li><a href="#" className="hover:text-black">Hakkımızda</a></li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-black mb-8">{section.settings?.titleCats || "KATEGORİLER"}</h4>
                        <ul className="space-y-4 text-sm font-medium text-[#1a120b]/80">
                          <li><a href="#" className="hover:text-black">Ortopedik Tabanlar</a></li>
                          <li><a href="#" className="hover:text-black">Deri Kemerler</a></li>
                        </ul>
                      </div>
                      <div className="space-y-6">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-black mb-8">{section.settings?.titleContact || "İLETİŞİM"}</h4>
                        <div className="flex gap-3 text-sm font-medium text-[#1a120b]/80"><Box size={18} className="shrink-0 opacity-40" /><span>{section.settings?.address}</span></div>
                        <div className="flex gap-3 text-sm font-medium text-[#1a120b]/80"><Settings size={18} className="shrink-0 opacity-40" /><span>{section.settings?.phone}</span></div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#f4ecd8] py-8 border-t border-black/5 text-center">
                    <p className="text-[10px] text-[#1a120b]/40 font-bold uppercase tracking-[0.2em]">© 2026 {section.settings?.footerLogo}. TÜM HAKLARI SAKLIDIR.</p>
                  </div>
                </footer>
              );

            case "hero":
              return <LiveHeroClient key={section.id} initialData={section.settings} />;
            
            case "productGrid":
              return (
                <section className="container mx-auto px-6 py-20">
                   <div className="flex flex-col items-center mb-12">
                     <h2 className="text-4xl font-serif font-bold text-[#1a120b]">{section.settings?.title || "Öne Çıkan Ürünler"}</h2>
                   </div>
                   <div className={`grid gap-8 grid-cols-2 md:grid-cols-${section.settings?.columns || 4}`}>
                      {products.slice(0, section.settings?.limit || 4).map(product => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                   </div>
                </section>
              );

            case "richText":
               return (
                 <section className="container mx-auto px-6 py-32 text-center bg-white">
                    <div className="max-w-4xl mx-auto space-y-8">
                       <h2 className="text-4xl font-serif font-bold text-[#1a120b] italic">{section.settings?.title}</h2>
                       <p className="text-[#6d7175] text-xl font-light italic leading-relaxed">"{section.settings?.content}"</p>
                    </div>
                 </section>
               );

            default:
              return <div className="p-10 border border-dashed text-center">Bölüm: {section.type}</div>;
          }
        };

        return (
          <div 
            key={section.id}
            onClick={() => handleSectionClick(section.id)}
            className={`relative group cursor-pointer transition-all duration-200 ${
              isBuilderMode ? 'hover:ring-2 hover:ring-[var(--p-blue)] hover:ring-inset' : ''
            } ${
              isSelected ? 'ring-2 ring-[var(--p-blue)] ring-inset z-50 bg-[var(--p-blue)]/5' : ''
            }`}
          >
            {isBuilderMode && (
              <div className={`absolute -top-10 left-1/2 -translate-x-1/2 flex items-center bg-white shadow-xl border rounded-lg px-2 py-1 gap-2 z-[200] transition-all ${
                isSelected ? 'scale-100 opacity-100' : 'opacity-0 invisible group-hover:visible group-hover:opacity-100'
              }`}>
                <span className="text-[11px] font-bold text-gray-500 px-1 border-r mr-1">{SECTION_SCHEMAS[section.type]?.label || section.type}</span>
                <button onClick={(e) => { e.stopPropagation(); window.parent.postMessage({ type: "MOVE_SECTION", id: section.id, direction: "up" }, "*"); }} className="p-1 hover:bg-gray-100 rounded"><ChevronDown className="rotate-180" size={14} /></button>
                <button onClick={(e) => { e.stopPropagation(); window.parent.postMessage({ type: "MOVE_SECTION", id: section.id, direction: "down" }, "*"); }} className="p-1 hover:bg-gray-100 rounded"><ChevronDown size={14} /></button>
                <button onClick={(e) => { e.stopPropagation(); window.parent.postMessage({ type: "REMOVE_SECTION", id: section.id }, "*"); }} className="p-1 hover:bg-red-50 text-red-500 rounded"><Trash2 size={14} /></button>
              </div>
            )}
            {renderContent()}
          </div>
        );
      })}
    </div>
  );
}
