"use client"
import React from "react"

interface Props { settings: Record<string, any> }

export default function GoogleMapSection({ settings }: Props) {
  const {
    title = "",
    address = "Doğu Mahallesi Flurya Sokak No:2/B Pendik İstanbul",
    height = 400,
    bgColor = "#FDFBF7",
    paddingY = 0,
    zoom = 16,
  } = settings

  const encodedAddress = encodeURIComponent(address)
  const src = `https://maps.google.com/maps?q=${encodedAddress}&z=${zoom}&output=embed`

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}>
      {title && (
        <h2 className="text-2xl font-serif font-bold text-center py-8" style={{ color: "#12100E" }}>{title}</h2>
      )}
      <div className="overflow-hidden" style={{ height }}>
        <iframe
          src={src}
          width="100%"
          height={height}
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Konum Haritası"
        />
      </div>
    </div>
  )
}
