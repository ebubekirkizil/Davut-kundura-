"use client"
import React from "react"

interface Props { settings: Record<string, any> }

export default function SlantDividerSection({ settings }: Props) {
  const { topColor = "#F7F3EE", bottomColor = "#12100E", angle = 5 } = settings

  return (
    <div className="relative w-full h-16 md:h-32 overflow-hidden" style={{ backgroundColor: bottomColor, marginTop: '-1px' }}>
      <div 
        className="absolute top-0 left-0 w-[110%] h-[150%] origin-top-left"
        style={{ backgroundColor: topColor, transform: `rotate(-${angle}deg)` }}
      />
    </div>
  )
}
