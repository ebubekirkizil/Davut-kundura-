"use client"
import React from "react"
import { Quote } from "lucide-react"

interface Props { settings: Record<string, any> }

export default function SuccessStoriesSection({ settings }: Props) {
  const { title = "Bir Dönüşüm Hikayesi", text = "Büyükbabamdan kalan 40 yıllık kösele ayakkabıları Davut Kundura'ya getirdiğimde umutsuzdum. Ancak usta ellerde ayakkabılar adeta yeniden doğdu. Sadece tamir edilmedi, geçmişim canlandı.", author = "Mustafa K.", beforeImage = "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&auto=format", afterImage = "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=400&auto=format", bgColor = "#12100E", textColor = "#FDFBF7", accentColor = "#C8A96E", paddingY = 100 } = settings

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}>
      <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
        
        <div className="lg:w-1/2 relative">
          <div className="absolute -top-6 -left-6 z-0 text-slate-800 opacity-50">
            <Quote className="w-24 h-24" />
          </div>
          <div className="relative z-10">
            <h2 className="text-xs font-black uppercase tracking-widest mb-6" style={{ color: accentColor }}>{title}</h2>
            <p className="text-2xl md:text-3xl font-serif leading-relaxed mb-8" style={{ color: textColor }}>"{text}"</p>
            <p className="font-bold text-lg" style={{ color: textColor }}>— {author}</p>
          </div>
        </div>

        <div className="lg:w-1/2 flex gap-4 w-full">
          <div className="w-1/2 flex flex-col gap-2">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-slate-800">
              {beforeImage && <img src={beforeImage} className="w-full h-full object-cover grayscale opacity-70" alt="Öncesi" />}
            </div>
            <span className="text-center text-xs font-black uppercase tracking-widest text-slate-500">Öncesi</span>
          </div>
          <div className="w-1/2 flex flex-col gap-2 mt-8">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-slate-800 border-2" style={{ borderColor: accentColor }}>
              {afterImage && <img src={afterImage} className="w-full h-full object-cover" alt="Sonrası" />}
            </div>
            <span className="text-center text-xs font-black uppercase tracking-widest" style={{ color: accentColor }}>Sonrası</span>
          </div>
        </div>

      </div>
    </div>
  )
}
