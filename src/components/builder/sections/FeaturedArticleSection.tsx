"use client"
import React from "react"
import { ArrowRight } from "lucide-react"

interface Props { settings: Record<string, any> }

export default function FeaturedArticleSection({ settings }: Props) {
  const { title = "Gerçek Deri Nasıl Anlaşılır?", excerpt = "Piyasadaki suni deriler gerçeğinden farksız hale gelse de, gerçek deriyi anlamanın bazı temel yolları var. Davut Usta'nın altın niteliğindeki tavsiyelerini derledik...", category = "Rehber", image = "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=1000&auto=format", bgColor = "#12100E", textColor = "#FDFBF7", accentColor = "#C8A96E", paddingY = 80 } = settings

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="group block relative rounded-[2rem] overflow-hidden bg-slate-800 shadow-2xl">
          {image && <img src={image} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-40 transition-all duration-700" alt="Featured article" />}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
          
          <div className="relative z-10 p-8 md:p-16 flex flex-col justify-end min-h-[400px] md:min-h-[500px]">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-6 w-max" style={{ backgroundColor: accentColor, color: "#fff" }}>
              {category}
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4 leading-tight max-w-3xl" style={{ color: textColor }}>{title}</h2>
            <p className="text-lg opacity-80 max-w-2xl mb-8" style={{ color: textColor }}>{excerpt}</p>
            <a href="#" className="flex items-center gap-2 font-bold uppercase tracking-wider text-sm hover:underline" style={{ color: accentColor }}>
              Yazıyı Oku <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
