"use client";

import { useState, useEffect } from "react";
import LiveHeroClient from "./LiveHeroClient";

interface Block {
  id: string;
  type: string;
  content: any;
  order: number;
}

export default function StorefrontRenderer({ initialBlocks }: { initialBlocks: Block[] }) {
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "BUILDER_SYNC") {
        setBlocks(event.data.payload.blocks);
        // Apply custom CSS globally
        if (event.data.payload.customCss !== undefined) {
          let styleTag = document.getElementById("builder-custom-css");
          if (!styleTag) {
            styleTag = document.createElement("style");
            styleTag.id = "builder-custom-css";
            document.head.appendChild(styleTag);
          }
          styleTag.innerHTML = event.data.payload.customCss;
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div className="flex flex-col">
      {blocks.sort((a, b) => a.order - b.order).map((block) => {
        switch (block.type) {
          case "Hero":
            return <LiveHeroClient key={block.id} initialData={block.content} />;
          
          case "ProductGrid":
            return (
              <section key={block.id} className="container mx-auto px-6 lg:px-16 py-20 text-center">
                 <h2 className="text-3xl font-serif font-bold mb-10">{block.content?.title || "Öne Çıkan Ürünler"}</h2>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="aspect-[3/4] bg-slate-100 rounded-lg animate-pulse" />
                    ))}
                 </div>
              </section>
            );

          case "Video":
            return (
              <section key={block.id} className="w-full h-[60vh] bg-black flex items-center justify-center overflow-hidden">
                 <div className="text-white text-center">
                    <h2 className="text-4xl font-bold mb-4 italic">Video Seksiyonu</h2>
                    <p className="opacity-60">Profesyonel video içeriği burada yer alır.</p>
                 </div>
              </section>
            );

          case "ImageText":
             return (
               <section key={block.id} className="container mx-auto px-6 lg:px-16 py-24 flex flex-col md:flex-row items-center gap-16">
                  <div className="w-full md:w-1/2 h-[500px] bg-slate-200 rounded-2xl overflow-hidden shadow-xl" />
                  <div className="w-full md:w-1/2 space-y-6">
                     <h2 className="text-4xl font-serif font-bold">{block.content?.title || "Hikayemiz"}</h2>
                     <p className="text-slate-600 text-lg leading-relaxed">{block.content?.text || "Zanaatın ve tutkunun birleştiği nokta."}</p>
                  </div>
               </section>
             );

          default:
            return <div key={block.id} className="p-10 border border-dashed text-center">Bilinmeyen Bölüm: {block.type}</div>;
        }
      })}
    </div>
  );
}
