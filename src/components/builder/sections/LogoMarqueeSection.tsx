"use client"
import React from "react"

interface Block { id: string; settings: Record<string, any> }
interface Props { settings: Record<string, any>; blocks: Block[] }

export default function LogoMarqueeSection({ settings, blocks }: Props) {
  const { title = "Kurumsal Müşterilerimiz", bgColor = "#FDFBF7", paddingY = 60 } = settings

  // Duplicating items to create infinite scroll effect without gaps
  const baseItems = blocks.length > 0 ? blocks : [
    { id: "1", settings: { name: "Logo 1" } },
    { id: "2", settings: { name: "Logo 2" } },
    { id: "3", settings: { name: "Logo 3" } },
    { id: "4", settings: { name: "Logo 4" } },
    { id: "5", settings: { name: "Logo 5" } },
  ]
  const items = [...baseItems, ...baseItems, ...baseItems]

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }} className="overflow-hidden">
      {title && <h2 className="text-center text-xs font-black uppercase tracking-widest text-slate-400 mb-10 px-6">{title}</h2>}
      
      <div className="flex whitespace-nowrap opacity-60 hover:opacity-100 transition-opacity">
        <div className="animate-marquee flex gap-16 md:gap-32 items-center">
          {items.map((item, i) => (
            <div key={`${item.id}-${i}`} className="text-3xl font-serif font-black text-slate-800">
              {item.settings.name}
            </div>
          ))}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-33.33%); } }
        .animate-marquee { animation: marquee 20s linear infinite; }
      `}} />
    </div>
  )
}
