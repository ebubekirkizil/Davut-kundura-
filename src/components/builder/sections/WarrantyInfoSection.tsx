"use client"
import React from "react"
import { ShieldCheck, PenTool, RefreshCcw } from "lucide-react"

interface Props { settings: Record<string, any> }

export default function WarrantyInfoSection({ settings }: Props) {
  const { title = "Davut Kundura Garantisi", bgColor = "#F7F3EE", accentColor = "#C8A96E", paddingY = 80 } = settings

  const items = [
    { icon: ShieldCheck, title: "6 Ay İşçilik Garantisi", desc: "Yaptığımız tüm tamir ve bakım işlemleri 6 ay boyunca garantimiz altındadır." },
    { icon: PenTool, title: "Ücretsiz Bakım", desc: "Özel üretim ayakkabılarımızda ilk 1 yıl ücretsiz bakım hizmeti sunuyoruz." },
    { icon: RefreshCcw, title: "Kolay İade", desc: "Online siparişlerinizde 14 gün içinde koşulsuz şartsız iade hakkınız bulunmaktadır." }
  ]

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}>
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-serif font-bold text-center mb-12 text-slate-900">{title}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl shadow-sm text-center border border-slate-100">
              <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: accentColor + "15", color: accentColor }}>
                <item.icon className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">{item.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
