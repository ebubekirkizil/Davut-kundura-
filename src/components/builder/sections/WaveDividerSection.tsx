"use client"
import React from "react"

interface Props { settings: Record<string, any> }

export default function WaveDividerSection({ settings }: Props) {
  const { topColor = "#ffffff", bottomColor = "#12100E", flip = false } = settings

  return (
    <div style={{ backgroundColor: bottomColor, marginTop: '-1px', marginBottom: '-1px' }}>
      <svg viewBox="0 0 1440 320" className="w-full h-auto block" style={{ transform: flip ? 'rotate(180deg)' : 'none' }}>
        <path 
          fill={topColor} 
          fillOpacity="1" 
          d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,165.3C1248,171,1344,149,1392,138.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        />
      </svg>
    </div>
  )
}
