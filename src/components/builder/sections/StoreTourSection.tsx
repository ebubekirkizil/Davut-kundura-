"use client"
import React from "react"
import { ScanEye } from "lucide-react"

interface Props { settings: Record<string, any> }

export default function StoreTourSection({ settings }: Props) {
  const { title = "Sanal Mağaza Turu", bgColor = "#12100E", paddingY = 120 } = settings

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}>
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-serif font-bold text-white mb-10">{title}</h2>
        
        <div className="relative aspect-[16/9] bg-slate-800 rounded-3xl overflow-hidden shadow-2xl border border-white/10 group cursor-pointer">
          <img src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=1600&auto=format" className="w-full h-full object-cover opacity-50 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700" alt="Store Tour" />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur border border-white/30 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
                <ScanEye className="w-8 h-8" />
              </div>
              <span className="text-white font-bold tracking-widest uppercase text-sm">Turu Başlat</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
