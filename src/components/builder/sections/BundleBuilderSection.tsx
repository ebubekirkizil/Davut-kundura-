"use client"
import React from "react"
import { Plus, Check, ShoppingCart } from "lucide-react"

interface Block { id: string; settings: Record<string, any> }
interface Props { settings: Record<string, any>; blocks: Block[] }

export default function BundleBuilderSection({ settings, blocks }: Props) {
  const { title = "Kombin Oluştur, Kazan!", discountText = "%15 İndirim Uygulandı", bgColor = "#F7F3EE", accentColor = "#C8A96E", paddingY = 80 } = settings
  
  const items = blocks.length > 0 ? blocks : [
    { id: "1", settings: { title: "Klasik Oxford", price: "2.850₺", image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=400&auto=format" } },
    { id: "2", settings: { title: "Deri Kemer", price: "850₺", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&auto=format" } },
    { id: "3", settings: { title: "Bakım Kiti", price: "350₺", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&auto=format" } }
  ]

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}>
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-serif font-bold text-slate-900 text-center mb-10">{title}</h2>
        <div className="bg-white p-6 md:p-10 rounded-3xl shadow-xl flex flex-col lg:flex-row items-center gap-8 border border-slate-100">
          
          <div className="flex-1 flex flex-wrap lg:flex-nowrap items-center justify-center gap-4">
            {items.map((item, idx) => (
              <React.Fragment key={item.id}>
                <div className="w-32 md:w-40 flex flex-col items-center text-center">
                  <div className="w-full aspect-square rounded-2xl overflow-hidden bg-slate-50 mb-3 relative border-2 border-transparent hover:border-amber-500 transition-colors cursor-pointer">
                    {item.settings.image && <img src={item.settings.image} className="w-full h-full object-cover" alt="" />}
                    <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-0.5"><Check className="w-3 h-3" /></div>
                  </div>
                  <p className="font-bold text-xs text-slate-800">{item.settings.title}</p>
                  <p className="text-xs text-slate-500 line-through mt-0.5">{item.settings.price}</p>
                </div>
                {idx < items.length - 1 && <Plus className="w-6 h-6 text-slate-300 flex-shrink-0" />}
              </React.Fragment>
            ))}
          </div>

          <div className="w-full lg:w-72 bg-slate-50 p-6 rounded-2xl flex flex-col items-center text-center">
            <span className="bg-amber-100 text-amber-700 font-black text-xs uppercase tracking-widest px-3 py-1 rounded-full mb-4">
              {discountText}
            </span>
            <p className="text-slate-400 font-bold mb-1 line-through">4.050₺</p>
            <p className="text-3xl font-black text-slate-900 mb-6">3.440₺</p>
            <button className="w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity" style={{ backgroundColor: accentColor, color: "#fff" }}>
              <ShoppingCart className="w-5 h-5" /> Sepete Ekle
            </button>
          </div>
          
        </div>
      </div>
    </div>
  )
}
