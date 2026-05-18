"use client"
import React from "react"

interface Props { settings: Record<string, any> }

export default function AboutStorySection({ settings }: Props) {
  const { title = "Hikayemiz", subtitle = "1970'den beri değişmeyen tutku", text = "Davut Kundura, dededen toruna geçen bir sanatın, deriye işlenen bir mirasın adıdır. Yarım asır önce küçük bir atölyede başlayan serüvenimiz, bugün Türkiye'nin dört bir yanına ulaşan el işçiliği başyapıtlarıyla devam ediyor. Her bir dikişte, her bir kesimde o ilk günkü heyecanı ve özeni koruyoruz.", signatureImage = "", image = "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format", bgColor = "#F7F3EE", accentColor = "#C8A96E", paddingY = 100 } = settings

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}>
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
        
        <div className="md:w-1/2">
          <div className="relative">
            <div className="absolute -inset-4 border-2 rounded-3xl -z-10 translate-x-4 translate-y-4" style={{ borderColor: accentColor }} />
            <img src={image} alt="Atölye" className="w-full aspect-[4/5] object-cover rounded-3xl shadow-xl sepia-[.3]" />
          </div>
        </div>

        <div className="md:w-1/2">
          <h4 className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: accentColor }}>{subtitle}</h4>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 mb-8 leading-tight">{title}</h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-10">{text}</p>
          
          {signatureImage ? (
            <img src={signatureImage} alt="İmza" className="h-12 opacity-80" />
          ) : (
            <div className="font-serif text-3xl italic text-slate-800">Davut Usta</div>
          )}
        </div>

      </div>
    </div>
  )
}
