"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Trash2 } from "lucide-react";
import LiveHeroClient from "./LiveHeroClient";
import ProductCard from "../product/ProductCard";
import { SECTION_SCHEMAS } from "@/store/schema";

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
            className={`relative group cursor-pointer transition-all duration-200 ${
              isBuilderMode ? 'hover:ring-2 hover:ring-[var(--p-blue)] hover:ring-inset' : ''
            } ${
              isSelected ? 'ring-2 ring-[var(--p-blue)] ring-inset z-50 bg-[var(--p-blue)]/5' : ''
            }`}
          >
            {/* Top Border Indicator */}
            {isBuilderMode && (
              <div className={`absolute -top-[1px] left-0 right-0 h-[1px] bg-[var(--p-blue)] z-[100] transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
            )}
            
            {/* Floating Action Bar (Shopify Style) */}
            {isBuilderMode && (
              <div className={`absolute -top-10 left-1/2 -translate-x-1/2 flex items-center bg-white shadow-[var(--p-shadow-200)] border border-[var(--p-border)] rounded-lg px-2 py-1 gap-2 z-[200] transition-all transform ${
                isSelected ? 'scale-100 opacity-100 visible' : 'scale-95 opacity-0 invisible group-hover:visible group-hover:opacity-100 group-hover:scale-100'
              }`}>
                <span className="text-[11px] font-bold text-[var(--p-text)] px-1 border-r border-gray-100 mr-1">
                  {SECTION_SCHEMAS[section.type]?.label || section.type}
                </span>
                <div className="flex items-center gap-1">
                   <button 
                     onClick={(e) => {
                       e.stopPropagation();
                       window.parent.postMessage({ type: "MOVE_SECTION", id: section.id, direction: "up" }, "*");
                     }}
                     className="p-1 hover:bg-gray-100 rounded text-gray-500 transition-colors"
                     title="Yukarı Taşı"
                   >
                     <ChevronDown className="rotate-180" size={14} />
                   </button>
                   <button 
                     onClick={(e) => {
                       e.stopPropagation();
                       window.parent.postMessage({ type: "MOVE_SECTION", id: section.id, direction: "down" }, "*");
                     }}
                     className="p-1 hover:bg-gray-100 rounded text-gray-500 transition-colors"
                     title="Aşağı Taşı"
                   >
                     <ChevronDown size={14} />
                   </button>
                   <button 
                     onClick={(e) => {
                       e.stopPropagation();
                       window.parent.postMessage({ type: "REMOVE_SECTION", id: section.id }, "*");
                     }}
                     className="p-1 hover:bg-red-50 text-red-500 rounded transition-colors"
                     title="Bölümü Sil"
                   >
                     <Trash2 size={14} />
                   </button>
                </div>
              </div>
            )}
            
            {renderContent()}
          </div>
        );
      })}
    </div>
  );
}
