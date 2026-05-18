"use client"
import React from "react"
import { ArrowRight, Calendar } from "lucide-react"

interface Block { id: string; settings: Record<string, any> }
interface Props { settings: Record<string, any>; blocks: Block[] }

export default function RecentPostsSection({ settings, blocks }: Props) {
  const { title = "Güncel Yazılar", bgColor = "#FDFBF7", accentColor = "#C8A96E", paddingY = 80 } = settings

  const items = blocks.length > 0 ? blocks : [
    { id: "1", settings: { title: "Deri Ayakkabı Bakımı Nasıl Yapılır?", date: "12 Mayıs 2026", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format" } },
    { id: "2", settings: { title: "Oxford mu Loafer mı? Hangisini Seçmeli?", date: "5 Mayıs 2026", image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600&auto=format" } },
    { id: "3", settings: { title: "El Yapımı Ayakkabının Avantajları", date: "28 Nisan 2026", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format" } },
  ]

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-end mb-10">
          <h2 className="text-3xl font-serif font-bold text-slate-900">{title}</h2>
          <a href="/blog" className="hidden sm:flex items-center gap-2 font-bold hover:underline" style={{ color: accentColor }}>
            Tüm Yazılar <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.slice(0, 3).map(item => (
            <a href="#" key={item.id} className="group flex flex-col block">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 mb-4 relative">
                {item.settings.image && <img src={item.settings.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={item.settings.title} />}
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">
                <Calendar className="w-3 h-3" /> {item.settings.date}
              </div>
              <h3 className="font-bold text-lg text-slate-900 leading-tight group-hover:text-amber-600 transition-colors">{item.settings.title}</h3>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
