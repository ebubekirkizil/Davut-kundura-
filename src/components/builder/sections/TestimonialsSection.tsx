"use client"
import React from "react"
import { Star } from "lucide-react"

interface Block {
  id: string
  settings: Record<string, any>
}

interface Props {
  settings: Record<string, any>
  blocks: Block[]
}

function StarRating({ count, color }: { count: number; color: string }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className="h-4 w-4"
          fill={i <= count ? color : "transparent"}
          stroke={i <= count ? color : "#ccc"}
        />
      ))}
    </div>
  )
}

export default function TestimonialsSection({ settings, blocks }: Props) {
  const {
    title = "Müşterilerimiz Ne Diyor?",
    bgColor = "#F7F3EE",
    cardBg = "#FFFFFF",
    starColor = "#F59E0B",
    paddingY = 80,
  } = settings

  const items = blocks.length > 0 ? blocks : [
    {
      id: "t1",
      settings: {
        name: "Ahmet Y.",
        company: "İstanbul",
        text: "Aldığım deri kemer inanılmaz kaliteliydi. Çok memnun kaldım, herkese tavsiye ederim.",
        rating: 5,
        avatar: "",
      },
    },
    {
      id: "t2",
      settings: {
        name: "Fatma K.",
        company: "Pendik",
        text: "Ayakkabı tamiri için gittim, hem hızlı hem de kaliteli iş yaptılar.",
        rating: 5,
        avatar: "",
      },
    },
    {
      id: "t3",
      settings: {
        name: "Mehmet S.",
        company: "Gebze",
        text: "Ortopedik tabanlık gerçekten işe yaradı. Artık sırtım ağrımıyor.",
        rating: 5,
        avatar: "",
      },
    },
  ]

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}>
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl lg:text-4xl font-serif font-bold text-center mb-12" style={{ color: "#12100E" }}>
          {title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-3xl shadow-lg border border-black/5 flex flex-col gap-4 hover:-translate-y-1 transition-transform duration-300"
              style={{ backgroundColor: cardBg }}
            >
              {/* Stars */}
              <StarRating count={item.settings.rating ?? 5} color={starColor} />

              {/* Quote */}
              <p className="text-sm leading-relaxed opacity-80 flex-1" style={{ color: "#12100E" }}>
                "{item.settings.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-black/5">
                {item.settings.avatar ? (
                  <img
                    src={item.settings.avatar}
                    alt={item.settings.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 font-black text-sm">
                    {item.settings.name?.[0] ?? "M"}
                  </div>
                )}
                <div>
                  <p className="font-black text-sm" style={{ color: "#12100E" }}>
                    {item.settings.name}
                  </p>
                  {item.settings.company && (
                    <p className="text-xs opacity-50" style={{ color: "#12100E" }}>
                      {item.settings.company}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
