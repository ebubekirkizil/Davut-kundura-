"use client"
import React from "react"
import { Instagram, Heart, MessageCircle } from "lucide-react"

interface Block { id: string; settings: Record<string, any> }
interface Props { settings: Record<string, any>; blocks: Block[] }

export default function InstagramFeedSection({ settings, blocks }: Props) {
  const { title = "Bizi Instagram'da Takip Edin", handle = "@davutkundura", bgColor = "#FDFBF7", paddingY = 80 } = settings

  const items = blocks.length > 0 ? blocks : [
    { id: "1", settings: { image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=400&auto=format", likes: "1.2B", comments: "45" } },
    { id: "2", settings: { image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&auto=format", likes: "856", comments: "23" } },
    { id: "3", settings: { image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&auto=format", likes: "2.1B", comments: "112" } },
    { id: "4", settings: { image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&auto=format", likes: "940", comments: "34" } },
  ]

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center mb-12 text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[2px] mb-4">
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
              <Instagram className="w-8 h-8 text-slate-900" />
            </div>
          </div>
          <h2 className="text-3xl font-serif font-bold text-slate-900 mb-2">{title}</h2>
          <a href={`https://instagram.com/${handle.replace('@','')}`} target="_blank" rel="noopener noreferrer" className="font-bold text-slate-500 hover:text-amber-600 transition-colors">
            {handle}
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.slice(0, 4).map(item => (
            <a key={item.id} href="#" className="relative aspect-square group overflow-hidden bg-slate-100 rounded-2xl block">
              {item.settings.image && <img src={item.settings.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="" />}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 text-white font-bold backdrop-blur-[2px]">
                <div className="flex items-center gap-2"><Heart className="w-6 h-6 fill-white" /> {item.settings.likes}</div>
                <div className="flex items-center gap-2"><MessageCircle className="w-6 h-6 fill-white" /> {item.settings.comments}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
