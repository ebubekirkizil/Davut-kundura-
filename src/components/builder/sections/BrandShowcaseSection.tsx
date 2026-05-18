"use client"
import React from "react"

interface Block { id: string; settings: Record<string, any> }
interface Props { settings: Record<string, any>; blocks: Block[] }

export default function BrandShowcaseSection({ settings, blocks }: Props) {
  const { title = "Kullandığımız Deri Markaları", bgColor = "#FDFBF7", paddingY = 60 } = settings

  const items = blocks.length > 0 ? blocks : [
    { id: "1", settings: { name: "Vera Pelle", logo: "" } },
    { id: "2", settings: { name: "Horween", logo: "" } },
    { id: "3", settings: { name: "Mastrotto", logo: "" } },
    { id: "4", settings: { name: "Bonaudo", logo: "" } },
    { id: "5", settings: { name: "Conceria", logo: "" } },
  ]

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}>
      <div className="max-w-6xl mx-auto px-6 overflow-hidden">
        {title && <h2 className="text-center text-xs font-black uppercase tracking-widest text-slate-400 mb-10">{title}</h2>}
        
        {/* Simple flex layout for mock, infinite marquee in real world if needed */}
        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          {items.map((item) => (
            <div key={item.id} className="flex-shrink-0">
              {item.settings.logo ? (
                <img src={item.settings.logo} alt={item.settings.name} className="h-8 md:h-12 object-contain" />
              ) : (
                <span className="text-2xl font-serif font-black text-slate-800">{item.settings.name}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
