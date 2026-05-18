"use client"
import React from "react"

interface Block { id: string; settings: Record<string, any> }
interface Props { settings: Record<string, any>; blocks: Block[] }

export default function StepByStepSection({ settings, blocks }: Props) {
  const { title = "Özel Üretim Sürecimiz", bgColor = "#FDFBF7", accentColor = "#C8A96E", paddingY = 80 } = settings

  const items = blocks.length > 0 ? blocks : [
    { id: "1", settings: { title: "Ölçü Alımı", desc: "Ayağınızın 3D taraması yapılır ve tam ölçüsü çıkarılır." } },
    { id: "2", settings: { title: "Deri Seçimi", desc: "İtalyan veya yerli premium dana derileri arasından seçim yaparsınız." } },
    { id: "3", settings: { title: "El İşçiliği", desc: "Ustalarımız ayakkabınızı tamamen elde dikerek hazırlar." } },
    { id: "4", settings: { title: "Teslimat", desc: "Özel ahşap kutusunda adresinize güvenle teslim edilir." } },
  ]

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}>
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-serif font-bold text-center mb-16 text-slate-900">{title}</h2>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-slate-200" />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {items.map((item, index) => (
              <div key={item.id} className="relative flex flex-col md:items-center md:text-center group">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-black text-white relative z-10 mb-6 transition-transform group-hover:scale-110 shadow-lg"
                  style={{ backgroundColor: accentColor }}
                >
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.settings.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.settings.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
