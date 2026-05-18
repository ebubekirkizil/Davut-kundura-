"use client"
import React from "react"
import { Package } from "lucide-react"

interface Block { id: string; settings: Record<string, any> }
interface Props { settings: Record<string, any>; blocks: Block[] }

export default function BentoGridSection({ settings, blocks }: Props) {
  const {
    title = "Öne Çıkan Ürünler",
    subtitle = "Seçkin koleksiyonumuzdan",
    bgColor = "#F7F3EE",
    accentColor = "#C8A96E",
    paddingY = 80,
  } = settings

  const items = blocks.length > 0 ? blocks : [
    { id: "b1", settings: { title: "Premium Kemer", price: "899₺", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format", badge: "Çok Satan", size: "large" } },
    { id: "b2", settings: { title: "Ortopedik Tabanlık", price: "349₺", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&auto=format", badge: "", size: "small" } },
    { id: "b3", settings: { title: "Bakım Seti", price: "299₺", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format", badge: "Yeni", size: "small" } },
    { id: "b4", settings: { title: "Brogue Ayakkabı", price: "2.450₺", image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&auto=format", badge: "Premium", size: "medium" } },
    { id: "b5", settings: { title: "Deri Aksesuar", price: "450₺", image: "https://images.unsplash.com/photo-1624222247344-550fb60eba1c?w=600&auto=format", badge: "", size: "medium" } },
  ]

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}>
      <div className="max-w-6xl mx-auto px-6">
        {title && (
          <div className="mb-10 text-center">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-2" style={{ color: "#12100E" }}>{title}</h2>
            {subtitle && <p className="text-sm opacity-60" style={{ color: "#12100E" }}>{subtitle}</p>}
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] gap-4">
          {items.map((item, i) => {
            const size = item.settings.size ?? "small"
            const span = size === "large" ? "col-span-2 row-span-2" : size === "medium" ? "col-span-2 row-span-1" : "col-span-1 row-span-1"
            return (
              <div
                key={item.id}
                className={`group relative overflow-hidden rounded-3xl cursor-pointer ${span}`}
              >
                {item.settings.image ? (
                  <img src={item.settings.image} alt={item.settings.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: accentColor + "20" }}>
                    <Package className="h-12 w-12 opacity-30" style={{ color: accentColor }} />
                  </div>
                )}

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                {/* Badge */}
                {item.settings.badge && (
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-black"
                    style={{ backgroundColor: accentColor, color: "#12100E" }}>
                    {item.settings.badge}
                  </div>
                )}

                {/* Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white font-black text-sm">{item.settings.title}</p>
                  <p className="font-black text-lg" style={{ color: accentColor }}>{item.settings.price}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
