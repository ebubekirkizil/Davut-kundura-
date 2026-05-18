"use client"
import React from "react"

interface Props { settings: Record<string, any> }

export default function ImageBannerSection({ settings }: Props) {
  const {
    image = "",
    title = "Özel Tasarım Koleksiyonu",
    subtitle = "Sınırlı sayıda üretilmiş, el işçiliği parçalar",
    buttonText = "İncele",
    buttonLink = "/products",
    overlayOpacity = 45,
    textAlign = "center",
    paddingY = 120,
    bgColor = "#12100E",
    textColor = "#FDFBF7",
    accentColor = "#C8A96E",
  } = settings

  const alignClass = textAlign === "left" ? "items-start text-left" : textAlign === "right" ? "items-end text-right" : "items-center text-center"

  return (
    <div
      className="relative overflow-hidden flex items-center justify-center"
      style={{ minHeight: paddingY * 2, backgroundColor: bgColor }}
    >
      {image && (
        <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover" />
      )}
      <div className="absolute inset-0 bg-black" style={{ opacity: overlayOpacity / 100 }} />

      <div className={`relative z-10 flex flex-col ${alignClass} max-w-3xl mx-auto px-6 py-20`}>
        <div className="w-16 h-1 mb-6 rounded-full" style={{ backgroundColor: accentColor }} />
        <h2 className="text-4xl lg:text-6xl font-serif font-bold mb-4 leading-tight" style={{ color: textColor }}>
          {title}
        </h2>
        {subtitle && <p className="text-lg opacity-70 mb-8 max-w-xl" style={{ color: textColor }}>{subtitle}</p>}
        {buttonText && (
          <a href={buttonLink}
            className="inline-block px-10 py-4 font-black text-sm uppercase tracking-widest rounded-full transition-all hover:scale-105"
            style={{ backgroundColor: accentColor, color: bgColor }}>
            {buttonText}
          </a>
        )}
      </div>
    </div>
  )
}
