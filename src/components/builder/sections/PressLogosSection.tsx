"use client"
import React from "react"

interface Block {
  id: string
  settings: Record<string, any>
}

interface Props {
  settings: Record<string, any>
  blocks: Block[]
}

export default function PressLogosSection({ settings, blocks }: Props) {
  const {
    title = "Basında Görüldük",
    bgColor = "#FDFBF7",
    paddingY = 60,
  } = settings

  const items = blocks.length > 0 ? blocks : [
    { id: "p1", settings: { name: "Hürriyet", image: "" } },
    { id: "p2", settings: { name: "Sabah", image: "" } },
    { id: "p3", settings: { name: "Milliyet", image: "" } },
    { id: "p4", settings: { name: "Cumhuriyet", image: "" } },
    { id: "p5", settings: { name: "Sözcü", image: "" } },
  ]

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}>
      <div className="max-w-5xl mx-auto px-6">
        {title && (
          <p className="text-center text-xs font-black uppercase tracking-widest opacity-40 mb-8" style={{ color: "#12100E" }}>
            {title}
          </p>
        )}
        <div className="flex flex-wrap items-center justify-center gap-10">
          {items.map((item) => (
            <div key={item.id} className="opacity-40 hover:opacity-80 transition-opacity duration-300 grayscale hover:grayscale-0">
              {item.settings.image ? (
                <img src={item.settings.image} alt={item.settings.name} className="h-10 object-contain" />
              ) : (
                <span className="text-xl font-black tracking-tighter" style={{ color: "#12100E" }}>
                  {item.settings.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
