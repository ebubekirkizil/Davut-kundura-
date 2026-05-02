"use client";

import { useState, useEffect } from "react";
import LiveHeroClient from "./LiveHeroClient";
import ProductCard from "../product/ProductCard";

interface Block {
  id: string;
  type: string;
  content: any;
  order: number;
}

export default function StorefrontRenderer({ 
  initialBlocks, 
  products = [] 
}: { 
  initialBlocks: Block[], 
  products?: any[] 
}) {
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "BUILDER_SYNC") {
        const { blocks: newBlocks, customCss: newCss } = event.data;
        if (newBlocks) setBlocks(newBlocks);
        
        if (newCss !== undefined) {
          let styleTag = document.getElementById("builder-custom-css");
          if (!styleTag) {
            styleTag = document.createElement("style");
            styleTag.id = "builder-custom-css";
            document.head.appendChild(styleTag);
          }
          styleTag.innerHTML = newCss;
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {blocks.sort((a, b) => a.order - b.order).map((block) => {
        switch (block.type) {
          case "Hero":
            return <LiveHeroClient key={block.id} initialData={block.content} />;
          
          case "ProductGrid":
            return (
              <section key={block.id} className="container mx-auto px-6 lg:px-16 py-20">
                 <div className="flex flex-col items-center mb-12">
                   <span className="text-[10px] font-bold text-[#d4af37] uppercase tracking-[0.3em] mb-3">Koleksiyonlar</span>
                   <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1a120b] text-center">{block.content?.title || "Öne Çıkan Ürünler"}</h2>
                   <div className="w-12 h-[2px] bg-[#d4af37] mt-4"></div>
                 </div>
                 
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
                    {products.slice(0, block.content?.limit || 4).map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                    {products.length === 0 && [1,2,3,4].map(i => (
                      <div key={i} className="aspect-[3/4] bg-slate-100 rounded-xl animate-pulse flex items-center justify-center">
                        <span className="text-[10px] text-gray-300 font-bold tracking-widest uppercase">Ürün Bekleniyor</span>
                      </div>
                    ))}
                 </div>
              </section>
            );

          case "Video":
            return (
              <section key={block.id} className="relative w-full h-[70vh] bg-black overflow-hidden flex items-center justify-center">
                 <div className="absolute inset-0 opacity-40">
                   <div className="w-full h-full bg-[#1a120b]" />
                 </div>
                 <div className="relative z-10 text-white text-center max-w-3xl px-6">
                    <span className="text-[10px] font-bold text-[#d4af37] uppercase tracking-[0.3em] mb-4 block">Mağazamızı Tanıyın</span>
                    <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 italic leading-tight">{block.content?.title || "Hikayemiz"}</h2>
                    <div className="w-20 h-20 border-2 border-white/30 rounded-full mx-auto flex items-center justify-center cursor-pointer hover:scale-110 hover:border-white transition-all group">
                       <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[15px] border-l-white border-b-[10px] border-b-transparent ml-1" />
                    </div>
                 </div>
              </section>
            );

          case "RichText":
             return (
               <section key={block.id} className="container mx-auto px-6 lg:px-16 py-32 text-center bg-white border-y border-gray-50">
                  <div className="max-w-4xl mx-auto space-y-8">
                     <h2 className="text-4xl md:text-6xl font-serif font-bold text-[#1a120b] leading-tight italic">{block.content?.title || "Zanaat ve Tutku"}</h2>
                     <p className="text-[#6d7175] text-xl md:text-2xl font-light leading-relaxed tracking-wide italic">
                        "{block.content?.text || "Her bir ürünümüzde yılların deneyimini ve zanaatkarlığın ruhunu bulacaksınız. Davut Kundura, konforu lüksle harmanlıyor."}"
                     </p>
                     <div className="flex items-center justify-center gap-4 pt-4">
                       <div className="h-[1px] w-12 bg-[#d4af37]"></div>
                       <span className="font-serif italic text-[#d4af37]">Est. 1978</span>
                       <div className="h-[1px] w-12 bg-[#d4af37]"></div>
                     </div>
                  </div>
               </section>
             );

          default:
            return <div key={block.id} className="p-10 border border-dashed text-center text-gray-300 text-xs tracking-widest uppercase">Tanımlanmamış Bölüm: {block.type}</div>;
        }
      })}
    </div>
  );
}
