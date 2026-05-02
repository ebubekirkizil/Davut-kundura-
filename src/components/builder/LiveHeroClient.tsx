"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function LiveHeroClient({ initialData }: { initialData: any }) {
  const [data, setData] = useState({
    title: initialData?.heroTitle || `Zarafetin <br /> <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#f3e5ab] italic font-light">Adımları.</span>`,
    subtitle: initialData?.heroSubtitle || "Usta ellerde işlenen hakiki deri, modern silüetlerle buluşuyor. Tarzınızı yansıtacak eşsiz bir deneyime hazır olun.",
    buttonText: initialData?.buttonText || "KOLEKSİYONU KEŞFET",
    imageUrl: initialData?.imageUrl || "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=2000&auto=format&fit=crop",
    customCss: initialData?.customCss || ""
  });

  useEffect(() => {
    // Listen for messages from the Shopify-like Builder iframe parent
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "BUILDER_UPDATE") {
        setData(prev => ({ ...prev, ...event.data.payload }));
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const selectElement = (name: string) => {
    window.parent.postMessage({ type: "SELECT_ELEMENT", payload: { name } }, "*");
  };

  return (
    <section className="relative w-full h-[90vh] min-h-[600px] flex items-center overflow-hidden">
      {/* Dynamic CSS Injection */}
      <style dangerouslySetInnerHTML={{ __html: data.customCss }} />
      
      <div className="absolute inset-0 z-0 bg-[#1a120b]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a120b]/90 via-[#1a120b]/50 to-[#1a120b]/10 z-10" />
        <img 
          src={data.imageUrl}
          alt="Hero Background"
          className="w-full h-full object-cover object-center scale-[1.02] animate-[scale-up_10s_ease-out_forwards]"
        />
      </div>

      <div className="container relative z-20 mx-auto px-6 lg:px-16 pt-20">
        <div className="max-w-2xl space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-white/20 rounded-full bg-white/5 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse" />
            <span className="text-white/80 text-xs font-medium tracking-widest uppercase">2026 İlkbahar / Yaz Koleksiyonu</span>
          </div>
          
          <h1 
            onClick={() => selectElement("heroTitle")}
            className="font-serif text-6xl md:text-8xl font-bold text-white leading-[1.05] tracking-tight drop-shadow-xl cursor-pointer hover:ring-2 hover:ring-blue-500 rounded-lg transition-all" 
            dangerouslySetInnerHTML={{ __html: data.title }}
          />
          
          <p 
            onClick={() => selectElement("heroSubtitle")}
            className="text-xl md:text-2xl text-white/80 font-light leading-relaxed tracking-wide drop-shadow-md max-w-xl cursor-pointer hover:ring-2 hover:ring-blue-500 rounded-lg transition-all"
          >
            {data.subtitle}
          </p>
          
          <div className="pt-6">
            <Link 
              href="/products" 
              className="relative overflow-hidden inline-flex bg-[#d4af37] hover:bg-[#c2a373] text-[#1a120b] px-12 py-5 rounded-sm font-bold text-sm tracking-widest transition-all duration-300 shadow-[0_0_40px_-10px_rgba(212,175,55,0.4)] items-center gap-3 group shine-effect"
            >
              <span className="relative z-10 flex items-center gap-3 uppercase">
                {data.buttonText}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <span className="text-white/50 text-[10px] tracking-widest uppercase">Aşağı Kaydır</span>
        <div className="w-[1px] h-12 bg-white/20 overflow-hidden relative">
          <div className="w-full h-1/2 bg-white absolute top-0 animate-[fade-up_2s_infinite]" />
        </div>
      </div>
    </section>
  );
}
