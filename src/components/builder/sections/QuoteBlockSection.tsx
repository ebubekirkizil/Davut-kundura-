"use client"
import React from "react"
import { Quote } from "lucide-react"

interface Props { settings: Record<string, any> }

export default function QuoteBlockSection({ settings }: Props) {
  const { quote = "İyi bir ayakkabı, sizi iyi yerlere götürür.", author = "Davut Usta", bgColor = "#12100E", textColor = "#FDFBF7", accentColor = "#C8A96E", paddingY = 100 } = settings

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}>
      <div className="max-w-4xl mx-auto px-6 text-center relative">
        <Quote className="w-24 h-24 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10" style={{ color: accentColor }} />
        <h2 className="text-3xl md:text-5xl font-serif font-bold leading-relaxed mb-8 relative z-10" style={{ color: textColor }}>
          "{quote}"
        </h2>
        <div className="w-16 h-1 mx-auto mb-6 rounded-full" style={{ backgroundColor: accentColor }} />
        <p className="font-bold text-lg uppercase tracking-widest" style={{ color: textColor }}>{author}</p>
      </div>
    </div>
  )
}
