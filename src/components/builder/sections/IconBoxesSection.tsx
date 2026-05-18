"use client"
import React from "react"
import { Truck, RotateCcw, HeadphonesIcon, CreditCard } from "lucide-react"

interface Block { id: string; settings: Record<string, any> }
interface Props { settings: Record<string, any>; blocks: Block[] }

export default function IconBoxesSection({ settings, blocks }: Props) {
  const { bgColor = "#FDFBF7", paddingY = 40 } = settings

  const items = blocks.length > 0 ? blocks : [
    { id: "1", settings: { icon: "Truck", title: "Ücretsiz Kargo", desc: "1500₺ üzeri siparişlerde geçerli" } },
    { id: "2", settings: { icon: "RotateCcw", title: "Kolay İade", desc: "14 gün içinde sorunsuz iade" } },
    { id: "3", settings: { icon: "HeadphonesIcon", title: "7/24 Destek", desc: "Whatsapp destek hattı" } },
    { id: "4", settings: { icon: "CreditCard", title: "Güvenli Ödeme", desc: "256-bit SSL koruması" } },
  ]

  const getIcon = (name: string) => {
    switch (name) {
      case "RotateCcw": return <RotateCcw className="w-6 h-6" />;
      case "HeadphonesIcon": return <HeadphonesIcon className="w-6 h-6" />;
      case "CreditCard": return <CreditCard className="w-6 h-6" />;
      default: return <Truck className="w-6 h-6" />;
    }
  }

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}>
      <div className="max-w-7xl mx-auto px-6 border-y border-slate-200 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
          {items.slice(0, 4).map(item => (
            <div key={item.id} className="flex flex-col items-center text-center px-4 pt-6 sm:pt-0">
              <div className="mb-4 text-slate-800">
                {getIcon(item.settings.icon)}
              </div>
              <h3 className="font-bold text-slate-900 mb-1">{item.settings.title}</h3>
              <p className="text-sm text-slate-500">{item.settings.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
