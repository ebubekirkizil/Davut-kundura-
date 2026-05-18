"use client"
import React from "react"
import { ArrowRight, MapPin, Clock } from "lucide-react"

interface Block { id: string; settings: Record<string, any> }
interface Props { settings: Record<string, any>; blocks: Block[] }

export default function JobOpeningsSection({ settings, blocks }: Props) {
  const { title = "Kariyer Fırsatları", subtitle = "Davut Kundura ailesine katılın", bgColor = "#FDFBF7", paddingY = 80 } = settings

  const items = blocks.length > 0 ? blocks : [
    { id: "1", settings: { title: "Usta Saya Kesimcisi", type: "Tam Zamanlı", location: "Pendik Atölye" } },
    { id: "2", settings: { title: "Mağaza Satış Danışmanı", type: "Tam Zamanlı", location: "Kadıköy Şube" } },
    { id: "3", settings: { title: "E-Ticaret Uzmanı", type: "Yarı Zamanlı", location: "Hibrit / Ofis" } },
  ]

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}>
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-slate-900 mb-2">{title}</h2>
          <p className="text-slate-500 font-bold">{subtitle}</p>
        </div>

        <div className="space-y-4">
          {items.map(item => (
            <a href="#" key={item.id} className="group block bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-amber-500 hover:shadow-md transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-amber-600 transition-colors">{item.settings.title}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm font-bold text-slate-400">
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {item.settings.type}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {item.settings.location}</span>
                  </div>
                </div>
                <div className="hidden sm:flex w-12 h-12 rounded-full bg-slate-50 items-center justify-center group-hover:bg-amber-50 transition-colors">
                  <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-amber-600 transition-colors" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
