"use client"
import React from "react"

interface Block { id: string; settings: Record<string, any> }
interface Props { settings: Record<string, any>; blocks: Block[] }

export default function CategoryCirclesSection({ settings, blocks }: Props) {
  const { title = "Kategoriler", bgColor = "#FDFBF7", paddingY = 80 } = settings

  const items = blocks.length > 0 ? blocks : [
    { id: "1", settings: { title: "Erkek Ayakkabı", image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=400&auto=format" } },
    { id: "2", settings: { title: "Kadın Ayakkabı", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&auto=format" } },
    { id: "3", settings: { title: "Çantalar", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&auto=format" } },
    { id: "4", settings: { title: "Kemerler", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&auto=format" } },
    { id: "5", settings: { title: "Bakım", image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=400&auto=format" } },
    { id: "6", settings: { title: "İndirim", image: "https://images.unsplash.com/photo-1624222247344-550fb60eba1c?w=400&auto=format" } },
  ]

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}>
      <div className="max-w-6xl mx-auto px-6 overflow-x-auto hide-scrollbar">
        {title && <h2 className="text-xl font-bold text-center mb-8 text-slate-900">{title}</h2>}
        <div className="flex justify-center gap-6 md:gap-10 min-w-max mx-auto px-4 pb-4">
          {items.map(item => (
            <div key={item.id} className="flex flex-col items-center gap-3 cursor-pointer group w-20 md:w-28">
              <div className="w-20 h-20 md:w-28 md:h-28 rounded-full border-2 border-transparent group-hover:border-slate-900 p-1 transition-all">
                <div className="w-full h-full rounded-full overflow-hidden bg-slate-100">
                  {item.settings.image && <img src={item.settings.image} alt={item.settings.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />}
                </div>
              </div>
              <span className="text-xs md:text-sm font-bold text-slate-700 text-center">{item.settings.title}</span>
            </div>
          ))}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `.hide-scrollbar::-webkit-scrollbar { display: none; }`}} />
    </div>
  )
}
