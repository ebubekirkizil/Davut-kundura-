"use client"
import React from "react"
import { MapPin, Navigation } from "lucide-react"

interface Props { settings: Record<string, any> }

export default function MapHeroSection({ settings }: Props) {
  const { title = "Pendik'teki Atölyemiz", address = "Doğu Mah. Flurya Sok. No:2/B", mapZoom = 16, height = "600px", accentColor = "#C8A96E" } = settings
  
  const encodedAddress = encodeURIComponent(address + " Pendik İstanbul")
  const src = `https://maps.google.com/maps?q=${encodedAddress}&z=${mapZoom}&output=embed`

  return (
    <div className="relative w-full overflow-hidden" style={{ height }}>
      <iframe src={src} className="absolute inset-0 w-full h-full border-0 grayscale opacity-80" allowFullScreen loading="lazy" />
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />
      
      <div className="absolute inset-0 z-10 flex items-center justify-center p-6 pointer-events-none">
        <div className="bg-white/95 backdrop-blur p-8 rounded-3xl shadow-2xl text-center max-w-md pointer-events-auto border border-white/20">
          <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center bg-slate-100">
            <MapPin className="w-8 h-8 text-slate-900" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-slate-900 mb-3">{title}</h1>
          <p className="text-slate-600 mb-8">{address}</p>
          <a href={`https://maps.google.com/?q=${encodedAddress}`} target="_blank" rel="noopener noreferrer" className="w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 hover:scale-105 transition-transform shadow-lg" style={{ backgroundColor: accentColor }}>
            Yol Tarifi Al <Navigation className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  )
}
