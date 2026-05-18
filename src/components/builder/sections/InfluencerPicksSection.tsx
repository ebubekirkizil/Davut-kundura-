"use client"
import React from "react"
import { CheckCircle } from "lucide-react"

interface Block { id: string; settings: Record<string, any> }
interface Props { settings: Record<string, any>; blocks: Block[] }

export default function InfluencerPicksSection({ settings, blocks }: Props) {
  const { title = "Ünlülerin Tercihleri", bgColor = "#12100E", textColor = "#FDFBF7", paddingY = 80 } = settings

  const items = blocks.length > 0 ? blocks : [
    { id: "1", settings: { name: "Kenan İ.", role: "Aktör", quote: "Sahne ışıklarında bile en çok güvendiğim ayakkabı.", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&fit=crop" } },
    { id: "2", settings: { name: "Burak Ö.", role: "Model", quote: "Gündelik şıklığın en rahat hali.", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&fit=crop" } },
    { id: "3", settings: { name: "Arda T.", role: "Sporcu", quote: "Klasik giyime geçtiğimde tek tercihim.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&fit=crop" } }
  ]

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}>
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-serif font-bold text-center mb-12" style={{ color: textColor }}>{title}</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.slice(0, 3).map(item => (
            <div key={item.id} className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm relative mt-12">
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full overflow-hidden border-4 border-[#12100E] bg-slate-800">
                {item.settings.image && <img src={item.settings.image} className="w-full h-full object-cover" alt={item.settings.name} />}
              </div>
              <div className="text-center pt-10">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <h3 className="font-bold text-lg" style={{ color: textColor }}>{item.settings.name}</h3>
                  <CheckCircle className="w-4 h-4 text-blue-400" />
                </div>
                <p className="text-xs font-black uppercase tracking-widest text-amber-500 mb-6">{item.settings.role}</p>
                <p className="text-sm opacity-80 italic" style={{ color: textColor }}>"{item.settings.quote}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
