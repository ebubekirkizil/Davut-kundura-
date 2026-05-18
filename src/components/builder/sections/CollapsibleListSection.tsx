"use client"
import React, { useState } from "react"
import { Plus, Minus } from "lucide-react"

interface Block { id: string; settings: Record<string, any> }
interface Props { settings: Record<string, any>; blocks: Block[] }

export default function CollapsibleListSection({ settings, blocks }: Props) {
  const { title = "Sıkça Sorulan Sorular", bgColor = "#FDFBF7", accentColor = "#C8A96E", paddingY = 80 } = settings

  const items = blocks.length > 0 ? blocks : [
    { id: "1", settings: { question: "Özel üretim siparişler ne kadar sürede teslim edilir?", answer: "Sipariş onayından sonra tamamen el yapımı üretim sürecimiz başlar. Genellikle 15-20 iş günü içerisinde adresinize teslim edilir." } },
    { id: "2", settings: { question: "İade veya değişim yapabiliyor muyum?", answer: "Kişiye özel ölçü ile üretilen siparişlerde iade yapılamamaktadır, ancak numara değişimi ve tadilat garantimiz bulunmaktadır." } },
    { id: "3", settings: { question: "Hangi deri türlerini kullanıyorsunuz?", answer: "Sadece birinci sınıf, doğal yollarla tabaklanmış dana derisi ve nadir egzotik deriler kullanmaktayız." } },
  ]

  const [openId, setOpenId] = useState<string | null>(items[0]?.id || null)

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}>
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-serif font-bold text-center mb-12 text-slate-900">{title}</h2>
        
        <div className="space-y-4">
          {items.map(item => (
            <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <button 
                onClick={() => setOpenId(openId === item.id ? null : item.id)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-bold text-slate-900 pr-4">{item.settings.question}</span>
                <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors" style={{ backgroundColor: openId === item.id ? accentColor : '#f1f5f9', color: openId === item.id ? '#fff' : '#64748b' }}>
                  {openId === item.id ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>
              
              <div 
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{ maxHeight: openId === item.id ? '500px' : '0', opacity: openId === item.id ? 1 : 0 }}
              >
                <div className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-50 mt-2">
                  {item.settings.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
