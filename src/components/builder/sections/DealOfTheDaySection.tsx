"use client"
import React from "react"
import { Timer, ArrowRight } from "lucide-react"

interface Props { settings: Record<string, any> }

export default function DealOfTheDaySection({ settings }: Props) {
  const { title = "Günün Fırsatı", product = "El Yapımı Deri Evrak Çantası", oldPrice = "4.200₺", newPrice = "2.800₺", image = "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format", bgColor = "#F7F3EE", accentColor = "#C8A96E", paddingY = 80 } = settings

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100 flex flex-col md:flex-row">
          <div className="md:w-1/2 p-10 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-600 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider w-max mb-6">
              <Timer className="w-4 h-4" /> Sınırlı Süre
            </div>
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">{title}</h2>
            <h3 className="text-3xl font-serif font-bold text-slate-900 mb-4">{product}</h3>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-3xl font-black" style={{ color: accentColor }}>{newPrice}</span>
              <span className="text-lg text-slate-400 line-through font-bold">{oldPrice}</span>
            </div>
            <button className="w-full md:w-max px-8 py-4 bg-slate-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors">
              Fırsatı Yakala <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="md:w-1/2 relative min-h-[300px]">
            {image ? <img src={image} alt={product} className="absolute inset-0 w-full h-full object-cover" /> : <div className="absolute inset-0 bg-slate-100" />}
          </div>
        </div>
      </div>
    </div>
  )
}
