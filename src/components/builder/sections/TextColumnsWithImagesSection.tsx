"use client"
import React from "react"

interface Block { id: string; settings: Record<string, any> }
interface Props { settings: Record<string, any>; blocks: Block[] }

export default function TextColumnsWithImagesSection({ settings, blocks }: Props) {
  const { title = "Neden Özel Üretim?", bgColor = "#FDFBF7", paddingY = 80 } = settings

  const items = blocks.length > 0 ? blocks : [
    { id: "1", settings: { title: "Tam Uyum", text: "Her ayak birbirinden farklıdır. Standart kalıplara sıkışmayın.", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&auto=format" } },
    { id: "2", settings: { title: "Benzersiz Stil", text: "Renk, desen ve dikiş ipliklerini tamamen kendiniz belirleyin.", image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=400&auto=format" } },
    { id: "3", settings: { title: "Ömürlük Yatırım", text: "Suni malzemeler değil, zamanla ayağınıza daha da iyi oturan gerçek deri.", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&auto=format" } },
  ]

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}>
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-serif font-bold text-center mb-12 text-slate-900">{title}</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {items.slice(0, 3).map(item => (
            <div key={item.id} className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-slate-100 mb-6 shadow-md">
                {item.settings.image && <img src={item.settings.image} className="w-full h-full object-cover hover:scale-110 transition-transform" alt="" />}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{item.settings.title}</h3>
              <p className="text-slate-600 leading-relaxed">{item.settings.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
