"use client"
import React, { useState } from "react"
import { Plus } from "lucide-react"

interface Block { id: string; settings: Record<string, any> }
interface Props { settings: Record<string, any>; blocks: Block[] }

export default function ImageHotspotsSection({ settings, blocks }: Props) {
  const { title = "Ürün Anatomisi", image = "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=1000&auto=format", bgColor = "#FDFBF7", paddingY = 80 } = settings

  const items = blocks.length > 0 ? blocks : [
    { id: "1", settings: { x: 45, y: 30, title: "Dana Derisi", desc: "Esnek ve nefes alabilir" } },
    { id: "2", settings: { x: 30, y: 70, title: "El Dikişi", desc: "Dayanıklı mumlu ip" } },
    { id: "3", settings: { x: 65, y: 85, title: "Kauçuk Taban", desc: "Kaymaz, aşınmaya dirençli" } },
  ]

  const [active, setActive] = useState<string | null>(null)

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}>
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-serif font-bold text-slate-900 text-center mb-10">{title}</h2>
        
        <div className="relative rounded-3xl overflow-hidden bg-slate-100 aspect-square md:aspect-[16/9]">
          {image && <img src={image} className="w-full h-full object-cover" alt="Anatomy" />}
          
          {items.map(item => (
            <div key={item.id} className="absolute" style={{ left: `${item.settings.x}%`, top: `${item.settings.y}%` }}>
              <button 
                onMouseEnter={() => setActive(item.id)}
                onMouseLeave={() => setActive(null)}
                className="relative z-10 w-8 h-8 md:w-10 md:h-10 bg-white/90 text-slate-900 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.5)]"
              >
                <Plus className="w-5 h-5" />
                <span className="absolute inset-0 rounded-full animate-ping bg-white/50" />
              </button>
              
              <div className={`absolute top-12 left-1/2 -translate-x-1/2 bg-white p-4 rounded-xl shadow-2xl w-48 text-center transition-all duration-300 pointer-events-none ${active === item.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 border-8 border-transparent border-b-white" />
                <h4 className="font-bold text-sm text-slate-900">{item.settings.title}</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.settings.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
