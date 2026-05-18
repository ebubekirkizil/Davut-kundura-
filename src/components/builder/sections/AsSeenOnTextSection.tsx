"use client"
import React from "react"

interface Props { settings: Record<string, any> }

export default function AsSeenOnTextSection({ settings }: Props) {
  const { title = "Basında Biz", publications = "Vogue, GQ, Esquire, The New York Times, Forbes", bgColor = "#12100E", accentColor = "#C8A96E", paddingY = 80 } = settings

  const pubs = publications.split(',').map(p => p.trim())

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY, overflow: 'hidden' }}>
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-xs font-black uppercase tracking-widest mb-10" style={{ color: accentColor }}>{title}</h2>
        
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
          {pubs.map((pub, i) => (
            <span key={i} className="text-3xl md:text-5xl font-serif font-black text-white/20 hover:text-white transition-colors duration-500 cursor-default">
              {pub}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
