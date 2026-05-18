"use client"
import React, { useEffect, useRef } from "react"

interface Props {
  settings: Record<string, any>
}

export default function MarqueeSection({ settings }: Props) {
  const {
    text = "ÜCRETSİZ KARGO • AYNI GÜN TESLİMAT • PREMİUM KALİTE •",
    speed = 30,
    bgColor = "#12100E",
    textColor = "#C8A96E",
    fontSize = 13,
  } = settings

  const items = Array(8).fill(text)

  return (
    <div
      className="overflow-hidden whitespace-nowrap"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className="inline-flex"
        style={{ animation: `marquee ${120 - speed}s linear infinite` }}
      >
        {items.map((t, i) => (
          <span
            key={i}
            className="inline-block font-black tracking-widest uppercase mr-12"
            style={{ color: textColor, fontSize }}
          >
            {t}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
