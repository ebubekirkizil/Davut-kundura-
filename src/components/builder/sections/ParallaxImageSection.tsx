"use client"
import React from "react"

interface Props { settings: Record<string, any> }

export default function ParallaxImageSection({ settings }: Props) {
  const { title = "Gerçek Deri, Gerçek Kalite", image = "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=1600&auto=format", height = "500px" } = settings

  return (
    <div 
      className="relative w-full flex items-center justify-center bg-fixed bg-center bg-cover"
      style={{ 
        height, 
        backgroundImage: `url('${image}')`,
        backgroundAttachment: 'fixed' // CSS parallax
      }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 text-center px-6">
        <h2 className="text-4xl md:text-6xl font-serif font-bold text-white drop-shadow-xl">{title}</h2>
      </div>
    </div>
  )
}
