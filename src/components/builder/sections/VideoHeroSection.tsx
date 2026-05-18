"use client"
import React, { useRef } from "react"

interface Props {
  settings: Record<string, any>
}

export default function VideoHeroSection({ settings }: Props) {
  const {
    videoUrl = "",
    title = "Yaşayan Zanaat",
    subtitle = "",
    buttonText = "Keşfet",
    overlayOpacity = 50,
    paddingY = 200,
  } = settings

  return (
    <div
      className="relative w-full overflow-hidden flex items-center justify-center"
      style={{ minHeight: paddingY * 2 + "px" }}
    >
      {videoUrl ? (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={videoUrl}
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-700" />
      )}

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black"
        style={{ opacity: overlayOpacity / 100 }}
      />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 py-24">
        <h1 className="text-5xl lg:text-7xl font-serif font-bold mb-6 drop-shadow-2xl">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xl opacity-80 mb-10 max-w-xl mx-auto">{subtitle}</p>
        )}
        {buttonText && (
          <button className="px-10 py-4 border-2 border-white text-white font-black uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all rounded-full">
            {buttonText}
          </button>
        )}
      </div>
    </div>
  )
}
