"use client"
import React from "react"

interface Block { id: string; settings: Record<string, any> }
interface Props { settings: Record<string, any>; blocks: Block[] }

export default function TableOfContentsSection({ settings, blocks }: Props) {
  const { title = "İçindekiler", bgColor = "#F7F3EE", accentColor = "#C8A96E", paddingY = 60 } = settings

  const items = blocks.length > 0 ? blocks : [
    { id: "1", settings: { title: "Deri Çeşitleri", id_link: "deri-cesitleri" } },
    { id: "2", settings: { title: "Taban Yapıları", id_link: "taban-yapilari" } },
    { id: "3", settings: { title: "Dikiş Teknikleri", id_link: "dikis-teknikleri" } },
    { id: "4", settings: { title: "Bakım ve Temizlik", id_link: "bakim-temizlik" } },
  ]

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}>
      <div className="max-w-3xl mx-auto px-6">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="text-xl font-serif font-bold text-slate-900 mb-6 pb-4 border-b border-slate-100">{title}</h3>
          <ul className="space-y-4">
            {items.map((item, index) => (
              <li key={item.id}>
                <a href={`#${item.settings.id_link}`} className="flex items-baseline gap-4 group">
                  <span className="text-sm font-black text-slate-300 group-hover:text-amber-500 transition-colors">0{index + 1}</span>
                  <span className="font-bold text-slate-600 group-hover:text-slate-900 transition-colors">{item.settings.title}</span>
                  <span className="flex-1 border-b border-dashed border-slate-200 mx-2 opacity-50 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
