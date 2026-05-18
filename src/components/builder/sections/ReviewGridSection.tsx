"use client"
import React from "react"
import { Star } from "lucide-react"

interface Block { id: string; settings: Record<string, any> }
interface Props { settings: Record<string, any>; blocks: Block[] }

export default function ReviewGridSection({ settings, blocks }: Props) {
  const { title = "Gerçek Deneyimler", bgColor = "#FDFBF7", accentColor = "#C8A96E", paddingY = 80 } = settings

  const items = blocks.length > 0 ? blocks : [
    { id: "1", settings: { name: "Cem K.", review: "Tam istediğim gibi özel ölçü yapıldı. Deri kalitesi muazzam.", rating: 5, date: "2 gün önce" } },
    { id: "2", settings: { name: "Okan B.", review: "Eski botlarımı tamire verdim, sıfır gibi geri geldi. İşçilik harika.", rating: 5, date: "1 hafta önce" } },
    { id: "3", settings: { name: "Sinan T.", review: "Fiyatlar piyasaya göre çok uygun ve kalite çok üst düzey.", rating: 4, date: "2 hafta önce" } },
    { id: "4", settings: { name: "Hakan Y.", review: "İletişimleri çok iyi, ayakkabı tam oturmazsa diye korkuyordum ama mükemmel oldu.", rating: 5, date: "1 ay önce" } },
  ]

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center mb-12 text-center">
          <div className="flex items-center gap-1 mb-4">
            {[1,2,3,4,5].map(i => <Star key={i} className="w-6 h-6 fill-current" style={{ color: accentColor }} />)}
          </div>
          <h2 className="text-3xl font-serif font-bold text-slate-900 mb-2">{title}</h2>
          <p className="text-slate-500 font-bold">4.9/5 Ortalama Puan (120+ Yorum)</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map(item => (
            <div key={item.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col h-full hover:shadow-lg transition-shadow">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < item.settings.rating ? 'fill-current text-amber-500' : 'text-slate-200'}`} />
                ))}
              </div>
              <p className="text-slate-600 text-sm italic mb-6 flex-1">"{item.settings.review}"</p>
              <div className="flex items-center justify-between border-t border-slate-50 pt-4 mt-auto">
                <span className="font-bold text-slate-900 text-sm">{item.settings.name}</span>
                <span className="text-xs font-black text-slate-400">{item.settings.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
