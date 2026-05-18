"use client"
import React from "react"
import { Calendar, MapPin, ExternalLink } from "lucide-react"

interface Block { id: string; settings: Record<string, any> }
interface Props { settings: Record<string, any>; blocks: Block[] }

export default function EventCalendarSection({ settings, blocks }: Props) {
  const { title = "Etkinlikler & Fuarlar", bgColor = "#FDFBF7", accentColor = "#C8A96E", paddingY = 80 } = settings

  const items = blocks.length > 0 ? blocks : [
    { id: "1", settings: { day: "15", month: "Ağu", title: "Milano Ayakkabı Fuarı (MICAM)", location: "Fiera Milano, İtalya" } },
    { id: "2", settings: { title: "Aymod Uluslararası Ayakkabı Fuarı", day: "20", month: "Eyl", location: "CNR Expo, İstanbul" } },
    { id: "3", settings: { title: "Atölye Ziyareti: Deri Kesim Günleri", day: "05", month: "Eki", location: "Pendik Merkez Atölye" } },
  ]

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}>
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-serif font-bold text-slate-900 mb-10 text-center">{title}</h2>

        <div className="space-y-6">
          {items.map(item => (
            <div key={item.id} className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col sm:flex-row items-center gap-6 group hover:border-amber-200 transition-colors">
              
              <div className="flex-shrink-0 w-24 h-24 rounded-xl flex flex-col items-center justify-center text-white shadow-inner" style={{ backgroundColor: accentColor }}>
                <span className="text-3xl font-black">{item.settings.day}</span>
                <span className="text-sm font-bold uppercase tracking-widest">{item.settings.month}</span>
              </div>

              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{item.settings.title}</h3>
                <div className="flex items-center justify-center sm:justify-start gap-2 text-slate-500 text-sm font-bold">
                  <MapPin className="w-4 h-4" /> {item.settings.location}
                </div>
              </div>

              <button className="flex-shrink-0 w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center hover:bg-slate-100 transition-colors">
                <ExternalLink className="w-5 h-5 text-slate-600" />
              </button>

            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
