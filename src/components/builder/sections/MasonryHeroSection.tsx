"use client"
import React from "react"
import { ArrowRight } from "lucide-react"

interface Props { settings: Record<string, any> }

export default function MasonryHeroSection({ settings }: Props) {
  const { title = "Zarafetin İzleri", subtitle = "Yarım asırlık tecrübe, modern tasarımlar", btnText = "Koleksiyonu Gör", bgColor = "#FDFBF7", accentColor = "#C8A96E", paddingY = 80, img1 = "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format", img2 = "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format", img3 = "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600&auto=format" } = settings

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        <div className="order-2 lg:order-1 flex justify-center lg:justify-start">
          <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
            <div className="space-y-4 pt-12">
              <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-slate-100 shadow-xl"><img src={img1} className="w-full h-full object-cover" alt="" /></div>
              <div className="aspect-square rounded-3xl overflow-hidden bg-slate-100 shadow-md"><img src={img2} className="w-full h-full object-cover" alt="" /></div>
            </div>
            <div className="space-y-4">
              <div className="aspect-square rounded-3xl overflow-hidden bg-slate-100 shadow-md"><img src={img3} className="w-full h-full object-cover" alt="" /></div>
              <div className="aspect-[3/4] rounded-3xl bg-slate-900 flex items-center justify-center p-8 text-center text-white shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
                <div>
                  <h3 className="font-serif text-3xl mb-2">35+ Yıl</h3>
                  <p className="text-xs font-black uppercase tracking-widest text-amber-500">Ustalık Serüveni</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2 flex flex-col items-center lg:items-start text-center lg:text-left">
          <div className="w-20 h-1 mb-8 rounded-full" style={{ backgroundColor: accentColor }} />
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-slate-900 mb-6 leading-tight">{title}</h1>
          <p className="text-lg text-slate-600 mb-10 max-w-md">{subtitle}</p>
          <button className="flex items-center gap-3 px-8 py-4 rounded-full font-bold text-white hover:scale-105 transition-transform" style={{ backgroundColor: accentColor }}>
            {btnText} <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  )
}
