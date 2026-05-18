"use client"
import React from "react"

interface Props { settings: Record<string, any> }

export default function VideoBackgroundSection({ settings }: Props) {
  const { title = "Sanatın Ritmi", subtitle = "Atölyemizin Kalbi", videoUrl = "https://www.w3schools.com/html/mov_bbb.mp4", height = "100vh" } = settings

  return (
    <div className="relative w-full overflow-hidden flex items-center justify-center" style={{ height }}>
      {/* Fallback color if video fails */}
      <div className="absolute inset-0 bg-slate-900" />
      
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
      
      <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />

      <div className="relative z-10 text-center px-6">
        <h3 className="text-sm font-black uppercase tracking-[0.3em] text-white/80 mb-4">{subtitle}</h3>
        <h2 className="text-5xl md:text-8xl font-serif font-bold text-white drop-shadow-2xl">{title}</h2>
      </div>
    </div>
  )
}
