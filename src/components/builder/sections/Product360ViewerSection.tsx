"use client"
import React, { useState } from "react"
import { MousePointerClick } from "lucide-react"

interface Props { settings: Record<string, any> }

export default function Product360ViewerSection({ settings }: Props) {
  const { title = "360° İnceleyin", bgColor = "#FDFBF7", paddingY = 80, images = "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600,https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600" } = settings
  
  const imgArray = images.split(',').map(i => i.trim())
  const [index, setIndex] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if(imgArray.length === 0) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = x / rect.width
    const newIndex = Math.floor(percentage * imgArray.length)
    setIndex(Math.min(Math.max(newIndex, 0), imgArray.length - 1))
  }

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-serif font-bold text-slate-900 mb-8">{title}</h2>
        
        <div 
          className="relative aspect-square md:aspect-[4/3] bg-slate-100 rounded-3xl overflow-hidden cursor-ew-resize select-none shadow-inner"
          onMouseMove={handleMouseMove}
          onTouchMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect()
            const x = e.touches[0].clientX - rect.left
            const p = x / rect.width
            setIndex(Math.min(Math.max(Math.floor(p * imgArray.length), 0), imgArray.length - 1))
          }}
        >
          {imgArray.length > 0 ? (
            <img src={imgArray[index]} className="w-full h-full object-contain mix-blend-multiply" alt="360 View" draggable="false" />
          ) : (
            <div className="flex items-center justify-center h-full text-slate-400">Görsel Yüklenmedi</div>
          )}

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/80 backdrop-blur px-4 py-2 rounded-full text-sm font-bold text-slate-600 shadow-md pointer-events-none">
            <MousePointerClick className="w-4 h-4" /> Sürükleyerek İncele
          </div>
        </div>
      </div>
    </div>
  )
}
