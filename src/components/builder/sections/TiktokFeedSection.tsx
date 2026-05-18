"use client"
import React from "react"
import { Play } from "lucide-react"

interface Block { id: string; settings: Record<string, any> }
interface Props { settings: Record<string, any>; blocks: Block[] }

export default function TiktokFeedSection({ settings, blocks }: Props) {
  const { title = "Atölyeden Kesitler", bgColor = "#12100E", textColor = "#FDFBF7", paddingY = 80 } = settings

  const items = blocks.length > 0 ? blocks : [
    { id: "1", settings: { image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=700&fit=crop", views: "124B" } },
    { id: "2", settings: { image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=400&h=700&fit=crop", views: "89B" } },
    { id: "3", settings: { image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=700&fit=crop", views: "210B" } },
    { id: "4", settings: { image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=700&fit=crop", views: "45B" } },
  ]

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}>
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-serif font-bold mb-10 text-center" style={{ color: textColor }}>{title}</h2>

        <div className="flex gap-4 overflow-x-auto pb-6 hide-scrollbar snap-x">
          {items.map(item => (
            <div key={item.id} className="snap-start flex-shrink-0 w-[240px] md:w-[280px] aspect-[9/16] relative rounded-3xl overflow-hidden bg-slate-800 group cursor-pointer border border-white/10">
              {item.settings.image && <img src={item.settings.image} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" alt="" />}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              <div className="absolute top-4 right-4 flex items-center gap-1.5 text-white text-xs font-bold bg-black/40 backdrop-blur px-2.5 py-1 rounded-full">
                <Play className="w-3 h-3" /> {item.settings.views}
              </div>

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `.hide-scrollbar::-webkit-scrollbar { display: none; }`}} />
    </div>
  )
}
