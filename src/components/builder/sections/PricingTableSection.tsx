"use client"
import React from "react"
import { Check } from "lucide-react"

interface Block { id: string; settings: Record<string, any> }
interface Props { settings: Record<string, any>; blocks: Block[] }

export default function PricingTableSection({ settings, blocks }: Props) {
  const { title = "Paketler ve Fiyatlandırma", subtitle = "İhtiyacınıza uygun paketi seçin", bgColor = "#F7F3EE", accentColor = "#C8A96E", paddingY = 80 } = settings

  const items = blocks.length > 0 ? blocks : [
    { id: "1", settings: { title: "Standart Bakım", price: "250₺", features: "Genel temizlik\nBoya tazeleme\nCila", isPopular: false } },
    { id: "2", settings: { title: "Premium Bakım", price: "450₺", features: "Genel temizlik\nÖzel renk tazeleme\nSu itici katman\nBağcık değişimi", isPopular: true } },
    { id: "3", settings: { title: "Tamir Paketi", price: "800₺", features: "Taban değişimi\nYırtık onarımı\nGenel bakım", isPopular: false } },
  ]

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-slate-900 mb-3">{title}</h2>
          <p className="text-slate-600">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {items.map(item => {
            const isPopular = item.settings.isPopular
            const feats = item.settings.features ? item.settings.features.split('\n') : []
            
            return (
              <div key={item.id} className={`bg-white rounded-3xl p-8 relative transition-transform hover:-translate-y-2 ${isPopular ? 'shadow-2xl border-2' : 'shadow-lg border border-slate-100'}`} style={{ borderColor: isPopular ? accentColor : undefined }}>
                {isPopular && <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-white text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md" style={{ backgroundColor: accentColor }}>En Popüler</div>}
                
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.settings.title}</h3>
                <p className="text-4xl font-black mb-6" style={{ color: isPopular ? accentColor : '#12100E' }}>{item.settings.price}</p>
                
                <ul className="space-y-4 mb-8">
                  {feats.map((f: string, i: number) => (
                    <li key={i} className="flex gap-3 text-sm text-slate-600">
                      <Check className="w-5 h-5 flex-shrink-0 text-green-500" /> {f}
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-4 rounded-xl font-bold transition-opacity hover:opacity-90 ${isPopular ? 'text-white' : 'bg-slate-100 text-slate-900'}`} style={{ backgroundColor: isPopular ? accentColor : undefined }}>
                  Paketi Seç
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
