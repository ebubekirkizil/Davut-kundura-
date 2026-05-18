"use client"
import React from "react"
import { ArrowRight } from "lucide-react"

interface Block { id: string; settings: Record<string, any> }
interface Props { settings: Record<string, any>; blocks: Block[] }

export default function NewArrivalsSection({ settings, blocks }: Props) {
  const { title = "Yeni Sezon", subtitle = "En yeni koleksiyon parçalarını keşfedin", buttonText = "Tümünü Gör", link = "/products", bgColor = "#12100E", textColor = "#FDFBF7", paddingY = 80 } = settings

  const items = blocks.length > 0 ? blocks : [
    { id: "1", settings: { title: "Deri Çanta", price: "2.400₺", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format" } },
    { id: "2", settings: { title: "Deri Kemer", price: "850₺", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format" } },
    { id: "3", settings: { title: "Klasik Oxford", price: "3.100₺", image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600&auto=format" } }
  ]

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}>
      <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row gap-12">
        
        <div className="lg:w-1/3 flex flex-col justify-center items-start">
          <h2 className="text-4xl font-serif font-bold mb-4" style={{ color: textColor }}>{title}</h2>
          <p className="opacity-70 mb-8 max-w-sm text-lg leading-relaxed" style={{ color: textColor }}>{subtitle}</p>
          <a href={link} className="flex items-center gap-2 font-black uppercase tracking-widest text-sm hover:opacity-80 transition-opacity" style={{ color: textColor }}>
            {buttonText} <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.slice(0, 3).map((item) => (
            <div key={item.id} className="group cursor-pointer">
              <div className="aspect-[4/5] overflow-hidden rounded-2xl mb-4 relative bg-slate-800">
                {item.settings.image && <img src={item.settings.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={item.settings.title} />}
                <div className="absolute top-3 left-3 bg-white text-slate-900 text-[10px] font-black uppercase px-2 py-1 rounded">Yeni</div>
              </div>
              <h3 className="font-bold text-sm" style={{ color: textColor }}>{item.settings.title}</h3>
              <p className="opacity-70 text-sm mt-1" style={{ color: textColor }}>{item.settings.price}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
