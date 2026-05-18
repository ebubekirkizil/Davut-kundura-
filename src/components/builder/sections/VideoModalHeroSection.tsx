"use client"
import React, { useState } from "react"
import { Play, X } from "lucide-react"

interface Props { settings: Record<string, any> }

export default function VideoModalHeroSection({ settings }: Props) {
  const { title = "Atölyemize Hoş Geldiniz", subtitle = "Sanatın ve derinin buluştuğu nokta", image = "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=1600&auto=format", videoId = "dQw4w9WgXcQ", bgColor = "#12100E", paddingY = 120 } = settings
  const [open, setOpen] = useState(false)

  return (
    <div className="relative flex items-center justify-center overflow-hidden" style={{ backgroundColor: bgColor, minHeight: paddingY * 2 }}>
      {image && <img src={image} className="absolute inset-0 w-full h-full object-cover opacity-40" alt="Background" />}
      
      <div className="relative z-10 text-center px-6 flex flex-col items-center">
        <button onClick={() => setOpen(true)} className="w-24 h-24 bg-white/10 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white mb-8 hover:bg-white hover:text-black transition-all group animate-bounce-slow shadow-[0_0_50px_rgba(255,255,255,0.2)]">
          <Play className="w-8 h-8 ml-2" />
        </button>
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 drop-shadow-xl">{title}</h1>
        <p className="text-xl text-white/80 max-w-2xl font-light">{subtitle}</p>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 sm:p-12 animate-in fade-in duration-300">
          <button onClick={() => setOpen(false)} className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors">
            <X className="w-10 h-10" />
          </button>
          <div className="w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl">
            <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} title="Video" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
          </div>
        </div>
      )}
    </div>
  )
}
