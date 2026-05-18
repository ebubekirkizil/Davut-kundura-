"use client"
import React from "react"
import { Shield, Target, Heart, Award } from "lucide-react"

interface Block { id: string; settings: Record<string, any> }
interface Props { settings: Record<string, any>; blocks: Block[] }

export default function CoreValuesSection({ settings, blocks }: Props) {
  const { title = "Neden Davut Kundura?", bgColor = "#12100E", textColor = "#FDFBF7", accentColor = "#C8A96E", paddingY = 80 } = settings

  const items = blocks.length > 0 ? blocks : [
    { id: "1", settings: { icon: "Shield", title: "Geleneksel Ustalık", desc: "Yarım asırlık tecrübeyle deriye şekil veriyoruz." } },
    { id: "2", settings: { icon: "Award", title: "Premium Materyal", desc: "Sadece en yüksek kalite, sertifikalı gerçek deriler kullanıyoruz." } },
    { id: "3", settings: { icon: "Heart", title: "Müşteri Memnuniyeti", desc: "Satış sonrası sınırsız destek ve bakım hizmeti." } },
    { id: "4", settings: { icon: "Target", title: "Modern Vizyon", desc: "Klasik dokunuşları modern trendlerle harmanlıyoruz." } },
  ]

  const getIcon = (name: string) => {
    switch (name) {
      case "Shield": return <Shield className="w-8 h-8" />;
      case "Award": return <Award className="w-8 h-8" />;
      case "Heart": return <Heart className="w-8 h-8" />;
      default: return <Target className="w-8 h-8" />;
    }
  }

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}>
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-serif font-bold text-center mb-12" style={{ color: textColor }}>{title}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map(item => (
            <div key={item.id} className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: accentColor + "20", color: accentColor }}>
                {getIcon(item.settings.icon)}
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: textColor }}>{item.settings.title}</h3>
              <p className="opacity-70 leading-relaxed text-sm" style={{ color: textColor }}>{item.settings.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
