"use client"
import React, { useState } from "react"
import { X, ZoomIn } from "lucide-react"

interface Block { id: string; settings: Record<string, any> }
interface Props { settings: Record<string, any>; blocks: Block[] }

export default function ImageGallerySection({ settings, blocks }: Props) {
  const {
    title = "Galeri",
    columns = 3,
    bgColor = "#FDFBF7",
    paddingY = 80,
  } = settings

  const [lightbox, setLightbox] = useState<string | null>(null)

  const items = blocks.length > 0 ? blocks : [
    { id: "g1", settings: { image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format", caption: "Deri Kemer Koleksiyonu" } },
    { id: "g2", settings: { image: "https://images.unsplash.com/photo-1624222247344-550fb60eba1c?w=600&auto=format", caption: "El İşçiliği" } },
    { id: "g3", settings: { image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format", caption: "Bakım Ürünleri" } },
    { id: "g4", settings: { image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&auto=format", caption: "Ortopedik Tabanlık" } },
    { id: "g5", settings: { image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600&auto=format", caption: "Brogue Ayakkabı" } },
    { id: "g6", settings: { image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=600&auto=format", caption: "Chelsea Bot" } },
  ]

  const colClass = columns === 2 ? "grid-cols-2" : columns === 4 ? "grid-cols-2 md:grid-cols-4" : "grid-cols-2 md:grid-cols-3"

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}>
      <div className="max-w-6xl mx-auto px-6">
        {title && (
          <h2 className="text-3xl font-serif font-bold text-center mb-10" style={{ color: "#12100E" }}>{title}</h2>
        )}

        <div className={`grid ${colClass} gap-4`}>
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => item.settings.image && setLightbox(item.settings.image)}
              className="group relative overflow-hidden rounded-2xl cursor-pointer aspect-square"
            >
              {item.settings.image ? (
                <img src={item.settings.image} alt={item.settings.caption || ""} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              ) : (
                <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                  <ZoomIn className="h-8 w-8 text-slate-300" />
                </div>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-end p-4">
                <p className="text-white font-bold text-sm opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  {item.settings.caption}
                </p>
              </div>
              <div className="absolute top-3 right-3 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                <ZoomIn className="h-4 w-4 text-slate-800" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6 animate-in fade-in duration-200"
          onClick={() => setLightbox(null)}
        >
          <button className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full">
            <X className="h-6 w-6" />
          </button>
          <img src={lightbox} alt="Preview" className="max-h-[85vh] max-w-full object-contain rounded-2xl shadow-2xl" />
        </div>
      )}
    </div>
  )
}
