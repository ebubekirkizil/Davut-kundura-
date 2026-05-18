"use client"
import React, { useState, useRef, MouseEvent, TouchEvent } from "react"
import { ArrowLeftRight } from "lucide-react"

interface Props { settings: Record<string, any> }

export default function BeforeAfterSliderSection({ settings }: Props) {
  const { title = "Yenilenme Süreci", beforeImg = "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=1200&auto=format", afterImg = "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=1200&auto=format", bgColor = "#FDFBF7", paddingY = 80 } = settings

  const [position, setPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setPosition(percent)
  }

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}>
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-serif font-bold text-center mb-10 text-slate-900">{title}</h2>
        
        <div 
          ref={containerRef}
          className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden cursor-ew-resize touch-none shadow-xl bg-slate-100"
          onMouseMove={(e: MouseEvent) => e.buttons === 1 && handleMove(e.clientX)}
          onTouchMove={(e: TouchEvent) => handleMove(e.touches[0].clientX)}
          onMouseDown={(e) => handleMove(e.clientX)}
        >
          <img src={afterImg} className="absolute inset-0 w-full h-full object-cover" alt="After" />
          <div className="absolute top-4 right-4 bg-white/80 backdrop-blur text-slate-900 text-xs font-black uppercase px-3 py-1 rounded-full shadow-sm">Sonrası</div>

          <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${position}%` }}>
            <img src={beforeImg} className="absolute inset-0 h-full object-cover max-w-none" style={{ width: containerRef.current?.clientWidth || 1000 }} alt="Before" />
            <div className="absolute top-4 left-4 bg-white/80 backdrop-blur text-slate-900 text-xs font-black uppercase px-3 py-1 rounded-full shadow-sm">Öncesi</div>
          </div>

          <div className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] -translate-x-1/2" style={{ left: `${position}%` }}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border border-slate-200">
              <ArrowLeftRight className="w-5 h-5 text-slate-900" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
