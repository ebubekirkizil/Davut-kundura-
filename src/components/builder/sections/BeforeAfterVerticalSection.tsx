"use client"
import React, { useState, useRef, MouseEvent, TouchEvent } from "react"
import { ArrowUpDown } from "lucide-react"

interface Props { settings: Record<string, any> }

export default function BeforeAfterVerticalSection({ settings }: Props) {
  const { title = "Kusursuz Değişim", beforeImg = "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format", afterImg = "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&auto=format", bgColor = "#12100E", textColor = "#FDFBF7", paddingY = 80 } = settings
  
  const [position, setPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMove = (clientY: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const y = clientY - rect.top
    const percent = Math.max(0, Math.min(100, (y / rect.height) * 100))
    setPosition(percent)
  }

  const onMouseMove = (e: MouseEvent) => { if(e.buttons === 1) handleMove(e.clientY) }
  const onTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientY)

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}>
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-serif font-bold text-center mb-10" style={{ color: textColor }}>{title}</h2>
        
        <div 
          ref={containerRef}
          className="relative w-full aspect-[3/4] md:aspect-square rounded-3xl overflow-hidden cursor-ns-resize touch-none shadow-2xl bg-slate-800 border border-white/10"
          onMouseMove={onMouseMove}
          onTouchMove={onTouchMove}
          onMouseDown={(e) => handleMove(e.clientY)}
        >
          {/* After image (Bottom layer) */}
          <img src={afterImg} className="absolute inset-0 w-full h-full object-cover" alt="After" />
          <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur text-white text-xs font-black uppercase px-3 py-1 rounded-full">Sonrası</div>

          {/* Before image (Top layer, clipped vertically) */}
          <div className="absolute inset-0 overflow-hidden" style={{ height: `${position}%` }}>
            <img src={beforeImg} className="absolute inset-0 w-full h-full object-cover" style={{ height: '100%', minHeight: containerRef.current?.clientHeight || 500 }} alt="Before" />
            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur text-white text-xs font-black uppercase px-3 py-1 rounded-full">Öncesi</div>
          </div>

          {/* Dragger Line (Horizontal) */}
          <div className="absolute left-0 right-0 h-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] -translate-y-1/2" style={{ top: `${position}%` }}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
              <ArrowUpDown className="w-4 h-4 text-slate-900" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
