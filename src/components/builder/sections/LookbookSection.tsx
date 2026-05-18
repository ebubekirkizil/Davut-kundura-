"use client"
import React from "react"
import { Plus } from "lucide-react"

interface Block { id: string; settings: Record<string, any> }
interface Props { settings: Record<string, any>; blocks: Block[] }

export default function LookbookSection({ settings, blocks }: Props) {
  const { title = "Kış Koleksiyonu", image = "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=1200&auto=format", bgColor = "#12100E", paddingY = 80 } = settings
  
  const items = blocks.length > 0 ? blocks : [
    { id: "1", settings: { x: 30, y: 40, product: "Hakiki Deri Çanta", price: "1.450₺" } },
    { id: "2", settings: { x: 70, y: 60, product: "Klasik Makosen", price: "2.100₺" } }
  ]

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}>
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-serif font-bold text-white text-center mb-10">{title}</h2>
        <div className="relative rounded-3xl overflow-hidden aspect-[16/9] bg-slate-800">
          {image && <img src={image} alt="Lookbook" className="w-full h-full object-cover opacity-80" />}
          
          {items.map(item => (
            <div key={item.id} className="absolute group" style={{ left: `${item.settings.x}%`, top: `${item.settings.y}%` }}>
              <button className="relative z-10 w-8 h-8 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-xl">
                <Plus className="w-4 h-4" />
              </button>
              <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-white text-slate-900 px-4 py-3 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all min-w-[150px] text-center">
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 border-8 border-transparent border-b-white" />
                <p className="font-bold text-sm whitespace-nowrap">{item.settings.product}</p>
                <p className="text-xs font-black mt-1 text-amber-600">{item.settings.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
