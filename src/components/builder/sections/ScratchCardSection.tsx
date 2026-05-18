"use client"
import React, { useState } from "react"
import { Gift } from "lucide-react"

interface Props { settings: Record<string, any> }

export default function ScratchCardSection({ settings }: Props) {
  const { title = "Şansını Dene!", discount = "%20 İndirim Kazandınız", code = "DAVUT20", bgColor = "#12100E", accentColor = "#C8A96E", paddingY = 80 } = settings
  
  const [scratched, setScratched] = useState(false)

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}>
      <div className="max-w-md mx-auto px-6 text-center">
        <h2 className="text-3xl font-serif font-bold text-white mb-8">{title}</h2>
        
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl bg-white flex flex-col items-center justify-center p-6 border-4" style={{ borderColor: accentColor }}>
          
          {/* Result beneath */}
          <div className="text-center">
            <h3 className="text-2xl font-black text-green-600 mb-2">{discount}</h3>
            <p className="text-slate-500 text-sm mb-4">Kasada kullanabileceğiniz kod:</p>
            <div className="px-6 py-2 border-2 border-dashed border-slate-300 rounded-lg text-xl font-mono font-bold text-slate-800 bg-slate-50 tracking-widest">{code}</div>
          </div>

          {/* Cover */}
          <div 
            className={`absolute inset-0 z-10 flex flex-col items-center justify-center cursor-pointer transition-opacity duration-1000 ${scratched ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            style={{ backgroundColor: accentColor }}
            onClick={() => setScratched(true)}
          >
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
            <Gift className="w-16 h-16 text-white mb-4 animate-bounce" />
            <span className="text-white font-bold text-lg">Kazımak için tıkla</span>
          </div>

        </div>
      </div>
    </div>
  )
}
