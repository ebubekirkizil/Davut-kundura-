"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function LiveHeroClient({ initialData }: { initialData: any }) {
  const data = {
    title: initialData?.title || "Zarafetin Adımları",
    subtitle: initialData?.subtitle || "Premium Deri Koleksiyonu",
    buttonText: initialData?.buttonText || "Keşfet",
    backgroundImage: initialData?.backgroundImage || "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=2000&auto=format&fit=crop",
    alignment: initialData?.alignment || "center",
    overlayOpacity: initialData?.overlayOpacity ?? 40
  };

  const alignmentClass = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end"
  }[data.alignment as "left" | "center" | "right"] || "text-center items-center";

  return (
    <section className="relative w-full h-[90vh] min-h-[600px] flex items-center overflow-hidden">
      {/* Background & Overlay */}
      <div className="absolute inset-0 z-0 bg-[#1a120b]">
        <div 
          className="absolute inset-0 z-10 transition-opacity duration-500" 
          style={{ backgroundColor: `rgba(26, 18, 11, ${data.overlayOpacity / 100})` }}
        />
        <img 
          src={data.backgroundImage}
          alt="Hero Background"
          className="w-full h-full object-cover object-center scale-[1.02] animate-[scale-up_10s_ease-out_forwards]"
        />
      </div>

      <div className={`container relative z-20 mx-auto px-6 lg:px-16 flex flex-col ${alignmentClass}`}>
        <div className="max-w-2xl space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-white/20 rounded-full bg-white/5 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse" />
            <span className="text-white/80 text-xs font-medium tracking-widest uppercase">2026 İlkbahar / Yaz Koleksiyonu</span>
          </div>
          
          <h1 
            className="font-serif text-6xl md:text-8xl font-bold text-white leading-[1.05] tracking-tight drop-shadow-xl" 
            dangerouslySetInnerHTML={{ __html: data.title }}
          />
          
          <p 
            className="text-xl md:text-2xl text-white/80 font-light leading-relaxed tracking-wide drop-shadow-md"
          >
            {data.subtitle}
          </p>
          
          <div className="pt-6">
            <Link 
              href="/products" 
              className="relative overflow-hidden inline-flex bg-[#d4af37] hover:bg-[#c2a373] text-[#1a120b] px-12 py-5 rounded-sm font-bold text-sm tracking-widest transition-all duration-300 shadow-xl items-center gap-3"
            >
              <span className="relative z-10 flex items-center gap-3 uppercase">
                {data.buttonText}
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
