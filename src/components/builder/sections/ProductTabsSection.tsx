"use client"
import React, { useState } from "react"

interface Block { id: string; settings: Record<string, any> }
interface Props { settings: Record<string, any>; blocks: Block[] }

export default function ProductTabsSection({ settings, blocks }: Props) {
  const { title = "Koleksiyonlar", bgColor = "#FDFBF7", accentColor = "#C8A96E", paddingY = 80 } = settings
  const [activeTab, setActiveTab] = useState(0)

  const tabs = ["Erkek", "Kadın", "Çocuk"]
  
  // Fake products for demonstration (In real usage, block settings could assign tab categories)
  const items = blocks.length > 0 ? blocks : [
    { id: "1", settings: { title: "Klasik Bot", price: "2.400₺", image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=600&auto=format" } },
    { id: "2", settings: { title: "Deri Loafer", price: "1.850₺", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&auto=format" } },
    { id: "3", settings: { title: "Sneaker", price: "1.200₺", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format" } }
  ]

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}>
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-serif font-bold text-center mb-8 text-slate-900">{title}</h2>
        
        <div className="flex justify-center gap-4 mb-10">
          {tabs.map((tab, i) => (
            <button key={i} onClick={() => setActiveTab(i)} 
              className={`px-6 py-2 rounded-full font-bold text-sm transition-colors ${activeTab === i ? 'text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
              style={{ backgroundColor: activeTab === i ? accentColor : undefined }}>
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 animate-in fade-in duration-500 key={activeTab}">
          {items.map(item => (
            <div key={item.id} className="group cursor-pointer">
              <div className="aspect-[4/5] bg-slate-100 rounded-2xl overflow-hidden mb-3">
                {item.settings.image && <img src={item.settings.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={item.settings.title} />}
              </div>
              <h3 className="font-bold text-slate-900 text-center">{item.settings.title}</h3>
              <p style={{ color: accentColor }} className="font-black text-center mt-1">{item.settings.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
