"use client";

import { useState, useEffect } from "react";
import LiveHeroClient from "./LiveHeroClient";
import ProductCard from "../product/ProductCard";

interface Section {
  id: string;
  type: string;
  settings: any;
  blocks: any[];
}

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
    // Tell parent that preview is ready
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
            case "hero":
              return <LiveHeroClient key={section.id} initialData={section.settings} />;
            
            case "productGrid":
              return (
                <section key={section.id} className="container mx-auto px-6 lg:px-16 py-20">
                   <div className="flex flex-col items-center mb-12">
                     <span className="text-[10px] font-bold text-[#d4af37] uppercase tracking-[0.3em] mb-3">Koleksiyonlar</span>
                     <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1a120b] text-center">{section.settings?.title || "Öne Çıkan Ürünler"}</h2>
                     <div className="w-12 h-[2px] bg-[#d4af37] mt-4"></div>
                   </div>
                   
                   <div className={`grid gap-x-8 gap-y-12 grid-cols-2 md:grid-cols-${section.settings?.columns || 4}`}>
                      {products.slice(0, section.settings?.limit || 4).map(product => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                   </div>
                </section>
              );

            case "richText":
               return (
                 <section key={section.id} className="container mx-auto px-6 lg:px-16 py-32 text-center bg-white border-y border-gray-50">
                    <div className="max-w-4xl mx-auto space-y-8">
                       <h2 className="text-4xl md:text-6xl font-serif font-bold text-[#1a120b] leading-tight italic">{section.settings?.title}</h2>
                       <p className="text-[#6d7175] text-xl md:text-2xl font-light leading-relaxed tracking-wide italic">
                          "{section.settings?.content}"
                       </p>
                    </div>
                 </section>
               );

            default:
              return <div key={section.id} className="p-10 border border-dashed text-center">Bölüm: {section.type}</div>;
          }
        };

        return (
          <div 
            key={section.id}
            onClick={() => handleSectionClick(section.id)}
            className={`relative group cursor-pointer transition-all ${isBuilderMode ? 'hover:outline hover:outline-2 hover:outline-[#008060] hover:outline-offset-[-2px]' : ''} ${isSelected ? 'outline outline-2 outline-[#008060] outline-offset-[-2px] z-50' : ''}`}
          >
            {isBuilderMode && (
              <div className={`absolute top-0 left-0 bg-[#008060] text-white text-[10px] font-bold px-2 py-1 z-[100] transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                {section.type.toUpperCase()}
              </div>
            )}
            {renderContent()}
          </div>
        );
      })}
    </div>
  );
}
