"use client"
import React from "react"
import { Trophy } from "lucide-react"

interface Block { id: string; settings: Record<string, any> }
interface Props { settings: Record<string, any>; blocks: Block[] }

export default function BestSellersSliderSection({ settings, blocks }: Props) {
  const { title = "En Çok Satanlar", bgColor = "#FDFBF7", accentColor = "#C8A96E", paddingY = 80 } = settings

  const items = blocks.length > 0 ? blocks : [
    { id: "1", settings: { title: "Premium Kemer", price: "899₺", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&auto=format" } },
    { id: "2", settings: { title: "Ortopedik Tabanlık", price: "349₺", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&auto=format" } },
    { id: "3", settings: { title: "Bakım Seti", price: "299₺", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&auto=format" } }
  ]

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-center gap-3 mb-10">
          <Trophy className="w-6 h-6" style={{ color: accentColor }} />
          <h2 className="text-3xl font-serif font-bold text-slate-900">{title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.slice(0, 3).map((item, index) => (
            <div key={item.id} className="relative group p-6 bg-white rounded-3xl shadow-sm hover:shadow-xl transition-shadow border border-slate-100 flex flex-col items-center text-center">
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full font-black text-white flex items-center justify-center text-lg z-10 shadow-lg" style={{ backgroundColor: accentColor }}>
                {index + 1}
              </div>
              <div className="w-32 h-32 mb-6 rounded-full overflow-hidden bg-slate-50 relative">
                {item.settings.image && <img src={item.settings.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={item.settings.title} />}
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-1">{item.settings.title}</h3>
              <p className="font-black" style={{ color: accentColor }}>{item.settings.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
