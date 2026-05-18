"use client"
import React from "react"
import { Gift } from "lucide-react"

interface Block { id: string; settings: Record<string, any> }
interface Props { settings: Record<string, any>; blocks: Block[] }

export default function GiftGuideSection({ settings, blocks }: Props) {
  const { title = "Hediye Rehberi", subtitle = "Sevdiklerinize en özel el işçiliği hediyeler", bgColor = "#12100E", textColor = "#FDFBF7", accentColor = "#C8A96E", paddingY = 80 } = settings

  const items = blocks.length > 0 ? blocks : [
    { id: "1", settings: { title: "Babalar İçin", image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600&auto=format", link: "#" } },
    { id: "2", settings: { title: "Kurumsal Hediyeler", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format", link: "#" } },
    { id: "3", settings: { title: "Özel Günler", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&auto=format", link: "#" } }
  ]

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <Gift className="w-8 h-8 mx-auto mb-4" style={{ color: accentColor }} />
          <h2 className="text-3xl font-serif font-bold mb-3" style={{ color: textColor }}>{title}</h2>
          <p className="opacity-70" style={{ color: textColor }}>{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map(item => (
            <a href={item.settings.link} key={item.id} className="group relative block aspect-[4/3] rounded-3xl overflow-hidden bg-slate-800">
              {item.settings.image && <img src={item.settings.image} alt={item.settings.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-80" />}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-2xl font-serif font-bold text-white mb-2">{item.settings.title}</h3>
                <span className="text-xs font-black uppercase tracking-widest text-white/70 group-hover:text-white transition-colors">Keşfet →</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
