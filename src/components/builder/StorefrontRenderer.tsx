"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Trash2, Search, Image as ImageIcon, Box, CreditCard, Settings, Mail, Star } from "lucide-react";
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

            case "header":
               return (
                 <header key={section.id} className={`${section.settings?.sticky ? 'sticky top-0 z-[100]' : ''} bg-white border-b border-gray-100 shadow-sm transition-all`}>
                    <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                       {/* Logo */}
                       <div className="text-2xl font-bold tracking-tighter text-[#1a120b] cursor-pointer">
                          {section.settings?.logoText}
                       </div>
                       
                       {/* Desktop Menu */}
                       <nav className="hidden lg:flex items-center gap-10">
                          {[1, 2, 3, 4].map(i => (
                            <a 
                              key={i} 
                              href={section.settings?.[`link${i}`] || "#"} 
                              className="text-[13px] font-bold text-[#1a120b] hover:text-[var(--p-blue)] tracking-[0.1em] transition-colors"
                            >
                               {section.settings?.[`menu${i}`]}
                            </a>
                          ))}
                       </nav>

                       {/* Icons & Mobile Toggle */}
                       <div className="flex items-center gap-6">
                          <Search size={20} className="text-gray-600 cursor-pointer hover:text-[var(--p-blue)]" />
                          <div className="lg:hidden">
                             <div className="w-6 h-0.5 bg-black mb-1.5"></div>
                             <div className="w-6 h-0.5 bg-black mb-1.5"></div>
                             <div className="w-6 h-0.5 bg-black"></div>
                          </div>
                       </div>
                    </div>
                 </header>
               );

            case "imageBanner":
               return (
                 <section key={section.id} className="relative w-full h-[600px] overflow-hidden bg-gray-100">
                    {section.settings?.image ? (
                      <img src={section.settings.image} className="w-full h-full object-cover" alt="Banner" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200">
                        <ImageIcon size={64} className="text-gray-300" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center text-white p-6 text-center">
                       <h2 className="text-5xl md:text-7xl font-serif font-bold mb-6 drop-shadow-lg">{section.settings?.title}</h2>
                       <button className="px-10 py-4 bg-white text-black font-bold rounded-full hover:bg-[var(--p-blue)] hover:text-white transition-all shadow-xl">
                          Şimdi Keşfet
                       </button>
                    </div>
                 </section>
               );

            case "featureColumns":
               return (
                 <section key={section.id} className="container mx-auto px-6 py-20 border-y border-gray-50 bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                       {[1, 2, 3].map(i => (
                         <div key={i} className="flex flex-col items-center text-center space-y-4 group">
                            <div className="w-16 h-16 bg-[var(--p-bg)] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform text-[var(--p-blue)]">
                               {i === 1 && <Box size={28} />}
                               {i === 2 && <CreditCard size={28} />}
                               {i === 3 && <Settings size={28} />}
                            </div>
                            <h3 className="text-lg font-bold text-[#1a120b]">{section.settings?.[`title${i}`]}</h3>
                            <p className="text-sm text-gray-500 leading-relaxed max-w-[250px]">
                               {section.settings?.[`text${i}`]}
                            </p>
                         </div>
                       ))}
                    </div>
                 </section>
               );

            case "videoHero":
               return (
                 <section key={section.id} className="relative w-full h-[600px] bg-black overflow-hidden">
                    <div className="absolute inset-0 z-0">
                       <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-60">
                          <source src={section.settings?.videoUrl} type="video/mp4" />
                       </video>
                    </div>
                    <div className="relative z-10 h-full flex flex-col items-center justify-center text-white p-6">
                       <h2 className="text-6xl font-serif font-bold mb-4">{section.settings?.title}</h2>
                       <div className="w-20 h-20 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-sm cursor-pointer hover:scale-110 transition-transform">
                          <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[15px] border-l-white border-b-[10px] border-b-transparent ml-2"></div>
                       </div>
                    </div>
                 </section>
               );

            case "collectionList":
               return (
                 <section key={section.id} className="container mx-auto px-6 py-20">
                    <h2 className="text-3xl font-bold mb-10 text-center">{section.settings?.title}</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                       {[1,2,3,4].map(i => (
                         <div key={i} className="aspect-square bg-gray-100 rounded-2xl flex flex-col items-center justify-center group cursor-pointer overflow-hidden relative">
                            <div className="w-full h-full bg-gray-200 transition-transform group-hover:scale-105 duration-500"></div>
                            <div className="absolute bottom-6 left-6">
                               <span className="bg-white px-4 py-2 rounded-full text-xs font-bold shadow-lg uppercase tracking-widest">Koleksiyon {i}</span>
                            </div>
                         </div>
                       ))}
                    </div>
                 </section>
               );

            case "newsletter":
               return (
                 <section key={section.id} className="py-24 bg-[var(--p-bg)]">
                    <div className="max-w-3xl mx-auto px-6 text-center">
                       <Mail size={40} className="mx-auto mb-6 text-[var(--p-blue)]" />
                       <h2 className="text-4xl font-serif font-bold mb-4">{section.settings?.title}</h2>
                       <p className="text-gray-500 mb-8">{section.settings?.subtitle}</p>
                       <div className="flex flex-col sm:flex-row gap-3">
                          <input type="email" placeholder="E-posta adresiniz" className="flex-1 px-6 py-4 rounded-full border border-gray-200 outline-none focus:border-[var(--p-blue)]" />
                          <button className="px-10 py-4 bg-black text-white font-bold rounded-full hover:bg-[var(--p-blue)] transition-all">Abone Ol</button>
                       </div>
                    </div>
                 </section>
               );

            case "testimonials":
               return (
                 <section key={section.id} className="container mx-auto px-6 py-24 bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                       {[1, 2].map(i => (
                         <div key={i} className="bg-[var(--p-bg)] p-12 rounded-[var(--p-radius)] space-y-6">
                            <div className="flex gap-1 text-yellow-400">
                               {[1,2,3,4,5].map(s => <Star key={s} size={16} fill="currentColor" />)}
                            </div>
                            <p className="text-xl italic font-serif text-gray-700">"{section.settings?.[`quote${i}`]}"</p>
                            <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                               <div className="w-12 h-12 rounded-full bg-gray-300"></div>
                               <span className="font-bold text-sm uppercase tracking-widest">{section.settings?.[`author${i}`]}</span>
                            </div>
                         </div>
                       ))}
                    </div>
                 </section>
               );

            case "faq":
               return (
                 <section key={section.id} className="max-w-4xl mx-auto px-6 py-24">
                    <h2 className="text-3xl font-bold mb-12 text-center">{section.settings?.title}</h2>
                    <div className="space-y-4">
                       <div className="border border-gray-100 rounded-2xl p-6 bg-white hover:border-[var(--p-blue)] cursor-pointer transition-all">
                          <div className="flex justify-between items-center mb-4">
                             <h3 className="font-bold">{section.settings?.q1}</h3>
                             <ChevronDown size={20} />
                          </div>
                          <p className="text-gray-500 text-sm leading-relaxed">{section.settings?.a1}</p>
                       </div>
                    </div>
                 </section>
               );

            case "countdown":
               return (
                 <section key={section.id} className="py-20 bg-black text-white text-center">
                    <div className="container mx-auto px-6">
                       <h2 className="text-2xl font-bold mb-10 tracking-[0.3em] uppercase">{section.settings?.title}</h2>
                       <div className="flex justify-center gap-8">
                          {['GÜN', 'SAAT', 'DAKİKA', 'SANİYE'].map(unit => (
                            <div key={unit} className="flex flex-col gap-2">
                               <span className="text-6xl font-bold font-mono">00</span>
                               <span className="text-[10px] tracking-widest opacity-60 font-bold">{unit}</span>
                            </div>
                          ))}
                       </div>
                       <button className="mt-12 px-10 py-3 border border-white/30 rounded-full hover:bg-white hover:text-black transition-all font-bold text-sm">
                          İNDİRİMİ KAÇIRMA
                       </button>
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
