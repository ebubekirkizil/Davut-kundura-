"use client"
import React from "react"
import { CheckCircle2 } from "lucide-react"

interface Block { id: string; settings: Record<string, any> }
interface Props { settings: Record<string, any>; blocks: Block[] }

export default function ProductSpecsSection({ settings, blocks }: Props) {
  const { title = "Teknik Özellikler", image = "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600&auto=format", bgColor = "#FDFBF7", paddingY = 80 } = settings

  const items = blocks.length > 0 ? blocks : [
    { id: "1", settings: { title: "Dış Materyal", desc: "%100 Hakiki Dana Derisi" } },
    { id: "2", settings: { title: "İç Astar", desc: "Nefes alabilen özel deri astar" } },
    { id: "3", settings: { title: "Taban", desc: "Kaymaz kauçuk enjeksiyon" } },
    { id: "4", settings: { title: "Dikiş", desc: "El işçiliği sağlam dikişler" } },
  ]

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}>
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row gap-12 items-center">
        
        <div className="md:w-1/2 w-full">
          <div className="aspect-square rounded-3xl overflow-hidden bg-slate-100 shadow-xl rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
            {image && <img src={image} className="w-full h-full object-cover" alt="Product details" />}
          </div>
        </div>

        <div className="md:w-1/2 w-full space-y-6">
          <h2 className="text-3xl font-serif font-bold text-slate-900 mb-8">{title}</h2>
          <div className="space-y-4">
            {items.map(item => (
              <div key={item.id} className="flex gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
                <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-sm text-slate-900">{item.settings.title}</h3>
                  <p className="text-sm text-slate-500 mt-1">{item.settings.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
