"use client"
import React from "react"
import { Camera } from "lucide-react"

interface Block { id: string; settings: Record<string, any> }
interface Props { settings: Record<string, any>; blocks: Block[] }

export default function UserGeneratedSection({ settings, blocks }: Props) {
  const { title = "Sizden Gelenler", subtitle = "#DavutKundura etiketiyle paylaşın, sayfamızda yer alın", bgColor = "#FDFBF7", paddingY = 80 } = settings

  const items = blocks.length > 0 ? blocks : [
    { id: "1", settings: { image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=400&auto=format" } },
    { id: "2", settings: { image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&auto=format" } },
    { id: "3", settings: { image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&auto=format" } },
    { id: "4", settings: { image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&auto=format" } },
    { id: "5", settings: { image: "https://images.unsplash.com/photo-1624222247344-550fb60eba1c?w=400&auto=format" } }
  ]

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <Camera className="w-8 h-8 mx-auto mb-4 text-slate-900" />
          <h2 className="text-3xl font-serif font-bold text-slate-900 mb-2">{title}</h2>
          <p className="text-slate-500 font-bold">{subtitle}</p>
        </div>

        {/* Masonry-like asymmetrical grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[150px] md:auto-rows-[200px]">
          {items.slice(0, 5).map((item, i) => (
            <div key={item.id} className={`rounded-2xl overflow-hidden bg-slate-100 group cursor-pointer ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''} ${i === 3 ? 'col-span-2 md:col-span-1' : ''}`}>
              {item.settings.image && <img src={item.settings.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
