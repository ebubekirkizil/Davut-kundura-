"use client"
import React, { useRef } from "react"
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react"

interface Block { id: string; settings: Record<string, any> }
interface Props { settings: Record<string, any>; blocks: Block[] }

export default function ProductCarouselSection({ settings, blocks }: Props) {
  const { title = "Popüler Ürünler", bgColor = "#FDFBF7", accentColor = "#C8A96E", paddingY = 80 } = settings
  const scrollRef = useRef<HTMLDivElement>(null)

  const items = blocks.length > 0 ? blocks : [
    { id: "1", settings: { title: "Klasik Oxford", price: "2.850₺", image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600&auto=format" } },
    { id: "2", settings: { title: "Deri Kemer", price: "850₺", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format" } },
    { id: "3", settings: { title: "Chelsea Bot", price: "3.200₺", image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=600&auto=format" } },
    { id: "4", settings: { title: "Bakım Kiti", price: "350₺", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format" } },
    { id: "5", settings: { title: "Ortopedik Tabanlık", price: "450₺", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&auto=format" } },
  ]

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" })
    }
  }

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-3xl font-serif font-bold text-slate-900">{title}</h2>
          <div className="flex gap-2">
            <button onClick={() => scroll("left")} className="p-2 border rounded-full hover:bg-slate-100 transition-colors border-slate-200">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={() => scroll("right")} className="p-2 border rounded-full hover:bg-slate-100 transition-colors border-slate-200">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div ref={scrollRef} className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-4">
          {items.map(item => (
            <div key={item.id} className="snap-start flex-shrink-0 w-[280px] group cursor-pointer">
              <div className="relative aspect-[4/5] bg-slate-100 rounded-2xl overflow-hidden mb-4">
                {item.settings.image && <img src={item.settings.image} alt={item.settings.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />}
                <button className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur py-3 rounded-xl text-sm font-bold opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all flex items-center justify-center gap-2 hover:bg-slate-900 hover:text-white">
                  <ShoppingBag className="w-4 h-4" /> Sepete Ekle
                </button>
              </div>
              <h3 className="font-bold text-slate-900">{item.settings.title}</h3>
              <p style={{ color: accentColor }} className="font-black mt-1">{item.settings.price}</p>
            </div>
          ))}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `.hide-scrollbar::-webkit-scrollbar { display: none; } .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}} />
    </div>
  )
}
