"use client"
import React from "react"
import { Hash } from "lucide-react"

interface Props { settings: Record<string, any> }

export default function TagCloudSection({ settings }: Props) {
  const { title = "Popüler Aramalar", tags = "Deri Bakımı, Oxford Ayakkabı, Makosen, Süet Temizliği, Kemer Seçimi, Toptan Sipariş", bgColor = "#FDFBF7", accentColor = "#C8A96E", paddingY = 60 } = settings

  const tagList = tags.split(',').map(t => t.trim())

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}>
      <div className="max-w-4xl mx-auto px-6">
        <h3 className="text-center font-bold text-slate-900 mb-6 flex items-center justify-center gap-2">
          <Hash className="w-5 h-5 text-slate-400" /> {title}
        </h3>
        <div className="flex flex-wrap justify-center gap-3">
          {tagList.map((tag, i) => (
            <a 
              href={`/search?q=${encodeURIComponent(tag)}`} 
              key={i} 
              className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-bold text-slate-600 hover:text-white transition-colors shadow-sm"
              style={{ '--tw-hover-bg': accentColor, ':hover': { backgroundColor: accentColor } } as any}
            >
              {tag}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
