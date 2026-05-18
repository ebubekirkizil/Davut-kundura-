"use client"
import React from "react"
import { CheckCircle2, Circle } from "lucide-react"

interface Block { id: string; settings: Record<string, any> }
interface Props { settings: Record<string, any>; blocks: Block[] }

export default function ProductFeaturesSection({ settings, blocks }: Props) {
  const {
    title = "Neden Bizi Seçmelisiniz?",
    layout = "grid",
    bgColor = "#FDFBF7",
    accentColor = "#C8A96E",
    paddingY = 80,
  } = settings

  const items = blocks.length > 0 ? blocks : [
    { id: "f1", settings: { title: "35 Yıllık Deneyim", description: "Kuşaktan kuşağa aktarılan usta işçiliği", icon: "check" } },
    { id: "f2", settings: { title: "Hakiki Deri Malzeme", description: "Yalnızca en kaliteli hammaddeler kullanıyoruz", icon: "check" } },
    { id: "f3", settings: { title: "Garantili Tamir", description: "Tüm tamir işlemlerimiz 6 ay garantilidir", icon: "check" } },
    { id: "f4", settings: { title: "Hızlı Teslimat", description: "Çoğu tamir aynı gün teslim edilir", icon: "check" } },
    { id: "f5", settings: { title: "Uygun Fiyat", description: "Kaliteyi uygun fiyatlarla sunuyoruz", icon: "check" } },
    { id: "f6", settings: { title: "Kişisel Hizmet", description: "Her müşterimize özel ilgi gösteriyoruz", icon: "check" } },
  ]

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}>
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-serif font-bold text-center mb-12" style={{ color: "#12100E" }}>{title}</h2>
        <div className={layout === "list" ? "space-y-4 max-w-2xl mx-auto" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"}>
          {items.map((item) => (
            <div key={item.id}
              className={`flex gap-4 p-5 rounded-2xl border transition-all hover:shadow-md ${layout === "grid" ? "flex-col items-start" : "items-center"}`}
              style={{ borderColor: accentColor + "25", backgroundColor: "white" }}>
              <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: accentColor + "20" }}>
                <CheckCircle2 className="h-5 w-5" style={{ color: accentColor }} />
              </div>
              <div>
                <h3 className="font-black text-sm" style={{ color: "#12100E" }}>{item.settings.title}</h3>
                {item.settings.description && (
                  <p className="text-xs opacity-60 mt-1 leading-relaxed" style={{ color: "#12100E" }}>{item.settings.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
