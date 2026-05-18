"use client"
import React, { useState, useRef, useCallback } from "react"

interface Props { settings: Record<string, any> }

export default function BeforeAfterSection({ settings }: Props) {
  const {
    title = "Öncesi / Sonrası",
    subtitle = "Profesyonel bakım ve tamir hizmetimizin farkını görün",
    beforeImage = "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format",
    afterImage = "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format",
    bgColor = "#FDFBF7",
    accentColor = "#C8A96E",
    paddingY = 80,
  } = settings

  const [pos, setPos] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const updatePos = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const pct = ((clientX - rect.left) / rect.width) * 100
    setPos(Math.max(2, Math.min(98, pct)))
  }, [])

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}>
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-serif font-bold mb-2" style={{ color: "#12100E" }}>{title}</h2>
          {subtitle && <p className="text-sm opacity-60" style={{ color: "#12100E" }}>{subtitle}</p>}
        </div>

        <div
          ref={containerRef}
          className="relative rounded-3xl overflow-hidden cursor-ew-resize shadow-2xl select-none"
          style={{ aspectRatio: "16/9" }}
          onMouseMove={(e) => { if (dragging.current) updatePos(e.clientX) }}
          onMouseDown={() => { dragging.current = true }}
          onMouseUp={() => { dragging.current = false }}
          onMouseLeave={() => { dragging.current = false }}
          onTouchMove={(e) => updatePos(e.touches[0].clientX)}
        >
          {/* After (full) */}
          {afterImage && <img src={afterImage} alt="Sonrası" className="absolute inset-0 w-full h-full object-cover" />}

          {/* Before (clipped) */}
          <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
            {beforeImage && <img src={beforeImage} alt="Öncesi" className="absolute inset-0 h-full object-cover" style={{ width: `${100 / (pos / 100)}%` }} />}
          </div>

          {/* Divider line */}
          <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-xl" style={{ left: `${pos}%` }}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M6 10H14M6 10L9 7M6 10L9 13M14 10L11 7M14 10L11 13" stroke="#12100E" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Labels */}
          <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 text-white text-xs font-black rounded-full">Öncesi</div>
          <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 text-white text-xs font-black rounded-full">Sonrası</div>
        </div>
      </div>
    </div>
  )
}
