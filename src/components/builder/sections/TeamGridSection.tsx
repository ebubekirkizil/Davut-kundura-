"use client"
import React from "react"

interface Block { id: string; settings: Record<string, any> }
interface Props { settings: Record<string, any>; blocks: Block[] }

export default function TeamGridSection({ settings, blocks }: Props) {
  const {
    title = "Ekibimiz",
    subtitle = "Uzman kadromuzla hizmetinizdeyiz",
    bgColor = "#FDFBF7",
    accentColor = "#C8A96E",
    paddingY = 80,
    columns = 4,
  } = settings

  const items = blocks.length > 0 ? blocks : [
    { id: "t1", settings: { name: "Davut Usta", role: "Baş Kundura Ustası", image: "", bio: "35 yıllık deneyim" } },
    { id: "t2", settings: { name: "Mehmet Abi", role: "Tamir Uzmanı", image: "", bio: "Özel dikişlerde uzman" } },
    { id: "t3", settings: { name: "Ali Bey", role: "Deri İşlemcisi", image: "", bio: "El boyama sanatçısı" } },
    { id: "t4", settings: { name: "Hasan Usta", role: "Kundura Tamircisi", image: "", bio: "Her türlü tamir" } },
  ]

  const colClass = columns === 3 ? "md:grid-cols-3" : columns === 5 ? "md:grid-cols-5" : "md:grid-cols-4"

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold mb-3" style={{ color: "#12100E" }}>{title}</h2>
          {subtitle && <p className="text-sm opacity-60" style={{ color: "#12100E" }}>{subtitle}</p>}
        </div>
        <div className={`grid grid-cols-2 ${colClass} gap-8`}>
          {items.map((member) => (
            <div key={member.id} className="group text-center">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 transition-all group-hover:scale-105 group-hover:shadow-xl duration-300"
                style={{ borderColor: accentColor + "40" }}>
                {member.settings.image ? (
                  <img src={member.settings.image} alt={member.settings.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-3xl font-black"
                    style={{ backgroundColor: accentColor + "20", color: accentColor }}>
                    {member.settings.name?.[0] ?? "U"}
                  </div>
                )}
              </div>
              <h3 className="font-black text-sm" style={{ color: "#12100E" }}>{member.settings.name}</h3>
              <p className="text-xs font-bold mt-0.5" style={{ color: accentColor }}>{member.settings.role}</p>
              {member.settings.bio && (
                <p className="text-xs mt-1.5 opacity-50" style={{ color: "#12100E" }}>{member.settings.bio}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
