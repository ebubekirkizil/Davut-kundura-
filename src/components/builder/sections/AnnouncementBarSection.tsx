"use client"
import React, { useState } from "react"
import { X } from "lucide-react"

interface Props { settings: Record<string, any> }

export default function AnnouncementBarSection({ settings }: Props) {
  const {
    text = "🎉 Tüm siparişlerde ÜCRETSİZ KARGO — Kod: ÜCRETSIZ",
    link = "",
    linkText = "Alışverişe Başla →",
    bgColor = "#C8A96E",
    textColor = "#12100E",
    dismissible = true,
    fontSize = 13,
  } = settings

  const [visible, setVisible] = useState(true)
  if (!visible) return null

  return (
    <div
      className="flex items-center justify-center gap-4 px-4 py-2.5 text-center relative"
      style={{ backgroundColor: bgColor }}
    >
      <p className="font-bold" style={{ color: textColor, fontSize }}>
        {text}
        {link && (
          <a href={link} className="ml-3 underline font-black hover:opacity-80 transition-opacity">
            {linkText}
          </a>
        )}
      </p>
      {dismissible && (
        <button
          onClick={() => setVisible(false)}
          className="absolute right-3 top-1/2 -translate-y-1/2 hover:opacity-60 transition-opacity"
          style={{ color: textColor }}
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
