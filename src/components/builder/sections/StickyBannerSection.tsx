"use client"
import React, { useState } from "react"
import { X, Truck } from "lucide-react"

interface Props { settings: Record<string, any> }

export default function StickyBannerSection({ settings }: Props) {
  const { text = "Tüm siparişlerde ücretsiz kargo!", bgColor = "#C8A96E", textColor = "#FFFFFF" } = settings
  const [open, setOpen] = useState(true)

  if (!open) return null

  return (
    <div className="relative w-full z-[100] px-4 py-2 flex items-center justify-center gap-3 text-sm font-bold shadow-md" style={{ backgroundColor: bgColor, color: textColor }}>
      <Truck className="w-4 h-4" />
      <span>{text}</span>
      <button onClick={() => setOpen(false)} className="absolute right-4 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100">
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
