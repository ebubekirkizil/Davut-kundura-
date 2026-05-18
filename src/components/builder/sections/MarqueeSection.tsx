"use client"
import React from "react"

interface Props {
  settings: Record<string, any>
}

export default function MarqueeSection({ settings }: Props) {
  const {
    text = "EL İŞÇİLİĞİ • HAKİKİ DERİ • ORTOPEDİK TABANLIK • ÜCRETSİZ KARGO • PENDİK'TE 40 YIL •",
    speed = 30,
    bgColor = "#12100E",
    textColor = "#C8A96E",
    fontSize = 13,
  } = settings

  const items = Array(10).fill(text)

  return (
    <div
      className="overflow-hidden whitespace-nowrap py-3.5 border-y"
      style={{ backgroundColor: bgColor, borderColor: 'rgba(200,169,110,0.2)' }}
    >
      <div
        className="inline-flex"
        style={{ animation: `marquee-scroll ${120 - speed}s linear infinite` }}
      >
        {items.map((t, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-6 font-black tracking-[0.2em] uppercase mr-12"
            style={{ color: textColor, fontSize }}
          >
            {t}
            <span style={{ color: textColor, opacity: 0.5 }}>◆</span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
