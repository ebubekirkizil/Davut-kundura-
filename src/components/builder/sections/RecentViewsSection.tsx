"use client"
import React from "react"
import { History, Eye } from "lucide-react"

interface Block { id: string; settings: Record<string, any> }
interface Props { settings: Record<string, any>; blocks: Block[] }

export default function RecentViewsSection({ settings, blocks }: Props) {
  const { title = "Son Gezdikleriniz", bgColor = "#FDFBF7", paddingY = 60 } = settings

  const items = blocks.length > 0 ? blocks : [
    { id: "1", settings: { title: "Klasik Makosen", price: "2.100₺", image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=400&auto=format" } },
    { id: "2", settings: { title: "Deri Cüzdan", price: "450₺", image: "https://images.unsplash.com/photo-1624222247344-550fb60eba1c?w=400&auto=format" } },
    { id: "3", settings: { title: "Süet Bot", price: "2.800₺", image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=400&auto=format" } }
  ]

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-2 mb-8 text-slate-400">
          <History className="w-5 h-5" />
          <h2 className="text-sm font-black uppercase tracking-widest">{title}</h2>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
          {items.map(item => (
            <div key={item.id} className="flex-shrink-0 w-48 group cursor-pointer">
              <div className="relative aspect-square bg-slate-100 rounded-xl overflow-hidden mb-3">
                {item.settings.image && <img src={item.settings.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt={item.settings.title} />}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="font-bold text-sm text-slate-800">{item.settings.title}</h3>
              <p className="text-sm font-black text-slate-500 mt-0.5">{item.settings.price}</p>
            </div>
          ))}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `.hide-scrollbar::-webkit-scrollbar { display: none; }`}} />
    </div>
  )
}
