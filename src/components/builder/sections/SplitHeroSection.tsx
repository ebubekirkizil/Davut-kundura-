"use client"
import React from "react"
import Image from "next/image"

interface Props {
  settings: Record<string, any>
}

export default function SplitHeroSection({ settings }: Props) {
  const {
    title = "El İşçiliğinin Gücü",
    subtitle = "Geleneksel teknikler, modern estetik",
    buttonText = "Keşfet",
    image = "",
    imagePosition = "right",
    bgColor = "#FDFBF7",
    textColor = "#12100E",
    accentColor = "#C8A96E",
  } = settings

  const textContent = (
    <div className="flex flex-col justify-center px-12 py-16 lg:py-24">
      <div
        className="w-16 h-1 mb-8 rounded-full"
        style={{ backgroundColor: accentColor }}
      />
      <h2
        className="text-4xl lg:text-5xl font-serif font-bold leading-tight mb-6"
        style={{ color: textColor }}
      >
        {title}
      </h2>
      <p className="text-lg opacity-70 mb-8 leading-relaxed" style={{ color: textColor }}>
        {subtitle}
      </p>
      <button
        className="self-start px-8 py-4 font-black text-sm uppercase tracking-widest rounded-full transition-all hover:scale-105"
        style={{ backgroundColor: accentColor, color: bgColor }}
      >
        {buttonText}
      </button>
    </div>
  )

  const imageContent = (
    <div className="relative h-full min-h-[400px] overflow-hidden">
      {image ? (
        <img src={image} alt={title} className="w-full h-full object-cover" />
      ) : (
        <div
          className="w-full h-full flex items-center justify-center"
          style={{ backgroundColor: accentColor + "22" }}
        >
          <span className="text-6xl opacity-20">🖼</span>
        </div>
      )}
    </div>
  )

  return (
    <div
      className="grid lg:grid-cols-2 min-h-[500px]"
      style={{ backgroundColor: bgColor }}
    >
      {imagePosition === "right" ? (
        <>
          {textContent}
          {imageContent}
        </>
      ) : (
        <>
          {imageContent}
          {textContent}
        </>
      )}
    </div>
  )
}
