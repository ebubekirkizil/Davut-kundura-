"use client"
import React from "react"
import { ArrowRight } from "lucide-react"

interface Block { id: string; settings: Record<string, any> }
interface Props { settings: Record<string, any>; blocks: Block[] }

export default function BlogCarouselSection({ settings, blocks }: Props) {
  const { title = "Okumanız Gerekenler", bgColor = "#FDFBF7", paddingY = 80 } = settings

  const items = blocks.length > 0 ? blocks : [
    { id: "1", settings: { title: "Deri Rengi Nasıl Açılır?", image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600&auto=format" } },
    { id: "2", settings: { title: "Kışın Süet Giyilir mi?", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&auto=format" } },
    { id: "3", settings: { title: "Taban Çeşitleri", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format" } },
    { id: "4", settings: { title: "Kemer Seçimi", image: "https://images.unsplash.com/photo-1624222247344-550fb60eba1c?w=600&auto=format" } },
  ]

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}>
      <div className="max-w-7xl mx-auto px-6 overflow-hidden">
        <h2 className="text-2xl font-serif font-bold text-slate-900 mb-8 px-2">{title}</h2>
        
        <div className="flex gap-6 overflow-x-auto pb-6 hide-scrollbar snap-x px-2">
          {items.map(item => (
            <a href="#" key={item.id} className="group relative w-72 md:w-80 flex-shrink-0 snap-start aspect-[4/5] rounded-3xl overflow-hidden bg-slate-900 block">
              {item.settings.image && <img src={item.settings.image} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-40 transition-all duration-700" alt={item.settings.title} />}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <h3 className="text-xl font-bold text-white mb-2">{item.settings.title}</h3>
                <span className="flex items-center gap-2 text-sm text-amber-500 font-black uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                  Oku <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `.hide-scrollbar::-webkit-scrollbar { display: none; }`}} />
    </div>
  )
}
