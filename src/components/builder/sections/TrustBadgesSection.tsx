"use client"
import React from "react"
import { ShieldCheck, Truck, RefreshCw, Star, Lock, Headphones } from "lucide-react"

interface Block {
  id: string
  settings: Record<string, any>
}

interface Props {
  settings: Record<string, any>
  blocks: Block[]
}

const ICON_MAP: Record<string, React.FC<any>> = {
  shield: ShieldCheck,
  truck: Truck,
  refresh: RefreshCw,
  star: Star,
  lock: Lock,
  headphones: Headphones,
}

export default function TrustBadgesSection({ settings, blocks }: Props) {
  const {
    bgColor = "#FDFBF7",
    iconColor = "#C8A96E",
    paddingY = 48,
  } = settings

  const items = blocks.length > 0 ? blocks : [
    { id: "b1", settings: { icon: "shield", title: "Güvenli Ödeme", subtitle: "256-bit SSL şifreleme" } },
    { id: "b2", settings: { icon: "truck", title: "Hızlı Kargo", subtitle: "1-3 iş günü teslimat" } },
    { id: "b3", settings: { icon: "refresh", title: "Kolay İade", subtitle: "14 gün iade garantisi" } },
    { id: "b4", settings: { icon: "star", title: "Kalite Garantisi", subtitle: "El işçiliği kalitesi" } },
  ]

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((item) => {
            const IconComponent = ICON_MAP[item.settings.icon] ?? ShieldCheck
            return (
              <div key={item.id} className="flex flex-col items-center text-center gap-3 group">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300"
                  style={{ backgroundColor: iconColor + "18" }}
                >
                  <IconComponent className="h-7 w-7" style={{ color: iconColor }} />
                </div>
                <div>
                  <p className="font-black text-sm" style={{ color: "#12100E" }}>
                    {item.settings.title}
                  </p>
                  <p className="text-xs opacity-60 mt-0.5" style={{ color: "#12100E" }}>
                    {item.settings.subtitle}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
