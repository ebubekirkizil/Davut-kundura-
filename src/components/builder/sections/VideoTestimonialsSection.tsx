"use client"
import React, { useState } from "react"
import { Play, X } from "lucide-react"

interface Block { id: string; settings: Record<string, any> }
interface Props { settings: Record<string, any>; blocks: Block[] }

export default function VideoTestimonialsSection({ settings, blocks }: Props) {
  const { title = "Müşterilerimiz Ne Diyor?", bgColor = "#F7F3EE", accentColor = "#C8A96E", paddingY = 80 } = settings
  const [activeVideo, setActiveVideo] = useState<string | null>(null)

  const items = blocks.length > 0 ? blocks : [
    { id: "1", settings: { name: "Ahmet Y.", role: "İş Adamı", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&fit=crop", videoId: "dQw4w9WgXcQ" } },
    { id: "2", settings: { name: "Mehmet K.", role: "Avukat", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&fit=crop", videoId: "dQw4w9WgXcQ" } },
    { id: "3", settings: { name: "Ali S.", role: "Mimar", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&fit=crop", videoId: "dQw4w9WgXcQ" } },
  ]

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}>
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-serif font-bold text-center mb-12 text-slate-900">{title}</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.slice(0, 3).map(item => (
            <div key={item.id} className="group relative rounded-3xl overflow-hidden aspect-[4/5] bg-slate-900 cursor-pointer shadow-lg border border-slate-100" onClick={() => setActiveVideo(item.settings.videoId)}>
              {item.settings.image && <img src={item.settings.image} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-40 transition-all duration-700" alt={item.settings.name} />}
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-white transition-colors duration-500">
                  <Play className="w-8 h-8 text-white group-hover:text-slate-900 ml-1 transition-colors" />
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                <h3 className="font-bold text-white text-lg">{item.settings.name}</h3>
                <p className="text-sm font-black" style={{ color: accentColor }}>{item.settings.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <button onClick={() => setActiveVideo(null)} className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors">
            <X className="w-10 h-10" />
          </button>
          <div className="w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden">
            <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`} title="Video" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen />
          </div>
        </div>
      )}
    </div>
  )
}
