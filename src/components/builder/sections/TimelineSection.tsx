"use client"
import React from "react"

interface Block { id: string; settings: Record<string, any> }
interface Props { settings: Record<string, any>; blocks: Block[] }

export default function TimelineSection({ settings, blocks }: Props) {
  const {
    title = "Hikayemiz",
    subtitle = "Yıllar içinde büyüyen bir zanaat yolculuğu",
    bgColor = "#FDFBF7",
    accentColor = "#C8A96E",
    paddingY = 80,
  } = settings

  const items = blocks.length > 0 ? blocks : [
    { id: "e1", settings: { year: "1989", title: "Kuruluş", description: "Davut Usta, Pendik'te küçük bir atölyeyle yolculuğuna başladı." } },
    { id: "e2", settings: { year: "1998", title: "Büyüme", description: "İkinci çalışanımız eklendiğinde hizmet kapasitemiz ikiye katlandı." } },
    { id: "e3", settings: { year: "2008", title: "Yeni Mağaza", description: "Doğu Mahallesi'ndeki modern mağazamıza taşındık." } },
    { id: "e4", settings: { year: "2020", title: "Dijital Dönüşüm", description: "Online sipariş ve kargo hizmetlerimizi başlattık." } },
    { id: "e5", settings: { year: "2024", title: "Bugün", description: "12,000+ mutlu müşterimizle İstanbul'un en güvenilir kundura ustasıyız." } },
  ]

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}>
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold mb-2" style={{ color: "#12100E" }}>{title}</h2>
          {subtitle && <p className="text-sm opacity-60" style={{ color: "#12100E" }}>{subtitle}</p>}
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5" style={{ backgroundColor: accentColor + "30" }} />

          <div className="space-y-8">
            {items.map((item, idx) => (
              <div key={item.id} className="flex gap-6 group">
                {/* Year dot */}
                <div className="flex-shrink-0 w-16 flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full border-2 mt-1 transition-transform group-hover:scale-150 duration-300"
                    style={{ backgroundColor: accentColor, borderColor: accentColor }} />
                  <span className="text-xs font-black mt-1 rotate-0" style={{ color: accentColor }}>
                    {item.settings.year}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 pb-6">
                  <h3 className="font-black text-base mb-1" style={{ color: "#12100E" }}>{item.settings.title}</h3>
                  <p className="text-sm opacity-60 leading-relaxed" style={{ color: "#12100E" }}>{item.settings.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
