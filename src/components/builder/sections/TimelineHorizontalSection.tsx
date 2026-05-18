"use client"
import React from "react"

interface Block { id: string; settings: Record<string, any> }
interface Props { settings: Record<string, any>; blocks: Block[] }

export default function TimelineHorizontalSection({ settings, blocks }: Props) {
  const { title = "Tarihçemiz", bgColor = "#12100E", textColor = "#FDFBF7", accentColor = "#C8A96E", paddingY = 80 } = settings

  const items = blocks.length > 0 ? blocks : [
    { id: "1", settings: { year: "1970", title: "Kuruluş", desc: "Pendik'te 10 metrekarelik ilk atölye açıldı." } },
    { id: "2", settings: { year: "1995", title: "Büyüme", desc: "Özel üretim hattı devreye girdi ve çıraklar yetişti." } },
    { id: "3", settings: { year: "2010", title: "Mağazalaşma", desc: "Toptan satışın yanı sıra perakende mağaza açılışı." } },
    { id: "4", settings: { year: "2026", title: "E-Ticaret", desc: "Tüm Türkiye'ye online özel sipariş hizmeti." } },
  ]

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}>
      <div className="max-w-7xl mx-auto px-6 overflow-hidden">
        <h2 className="text-3xl font-serif font-bold text-center mb-20" style={{ color: textColor }}>{title}</h2>

        <div className="relative">
          {/* Main Line */}
          <div className="absolute top-1/2 left-0 w-full h-1 -translate-y-1/2 bg-white/10" />

          <div className="flex gap-8 overflow-x-auto pb-12 pt-8 hide-scrollbar px-4 snap-x">
            {items.map((item, i) => (
              <div key={item.id} className="relative w-72 flex-shrink-0 snap-start">
                
                {/* Connector Dot */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full z-10 shadow-[0_0_15px_rgba(200,169,110,0.5)]" style={{ backgroundColor: accentColor }} />

                <div className={`flex flex-col items-center text-center ${i % 2 === 0 ? '-translate-y-full pb-8' : 'translate-y-8 pt-4'}`}>
                  <h3 className="text-4xl font-serif font-black mb-2 opacity-20" style={{ color: textColor }}>{item.settings.year}</h3>
                  <h4 className="font-bold text-lg mb-2" style={{ color: accentColor }}>{item.settings.title}</h4>
                  <p className="text-sm opacity-70" style={{ color: textColor }}>{item.settings.desc}</p>
                </div>
                
              </div>
            ))}
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `.hide-scrollbar::-webkit-scrollbar { display: none; }`}} />
    </div>
  )
}
