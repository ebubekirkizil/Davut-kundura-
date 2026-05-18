"use client"
import React from "react"
import { Download, FileText } from "lucide-react"

interface Block { id: string; settings: Record<string, any> }
interface Props { settings: Record<string, any>; blocks: Block[] }

export default function DownloadAssetsSection({ settings, blocks }: Props) {
  const { title = "Dökümanlar & Kataloglar", bgColor = "#12100E", textColor = "#FDFBF7", paddingY = 80 } = settings

  const items = blocks.length > 0 ? blocks : [
    { id: "1", settings: { title: "2026 İlkbahar/Yaz Koleksiyonu", size: "12 MB PDF" } },
    { id: "2", settings: { title: "Deri Bakım Kılavuzu", size: "2.4 MB PDF" } },
    { id: "3", settings: { title: "Kurumsal Bayi Fiyat Listesi", size: "1.1 MB PDF" } },
  ]

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}>
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-serif font-bold mb-10 text-center" style={{ color: textColor }}>{title}</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map(item => (
            <div key={item.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors group cursor-pointer">
              <FileText className="w-8 h-8 mb-6" style={{ color: textColor }} />
              <h3 className="font-bold mb-2 leading-tight" style={{ color: textColor }}>{item.settings.title}</h3>
              <p className="text-sm opacity-60 mb-6 font-bold" style={{ color: textColor }}>{item.settings.size}</p>
              
              <button className="flex items-center gap-2 text-sm font-bold opacity-80 group-hover:opacity-100 transition-opacity" style={{ color: textColor }}>
                <Download className="w-4 h-4" /> İndir
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
