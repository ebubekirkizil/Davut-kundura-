"use client"
import React, { useState } from "react"
import { AlertTriangle } from "lucide-react"

interface Props { settings: Record<string, any> }

export default function AgeVerificationModalSection({ settings }: Props) {
  const { title = "Yaş Doğrulaması", text = "Bu siteye girmek için 18 yaşından büyük olmalısınız.", bgColor = "#12100E", accentColor = "#C8A96E" } = settings
  
  // In a real app, this would use cookies. For builder preview, we just show it if it's not dismissed.
  const [verified, setVerified] = useState(false)

  if (verified) return null

  return (
    <div className="fixed inset-0 z-[110] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-3xl p-8 text-center border border-white/10 shadow-2xl" style={{ backgroundColor: bgColor }}>
        <AlertTriangle className="w-12 h-12 mx-auto mb-6 opacity-80" style={{ color: accentColor }} />
        <h2 className="text-2xl font-serif font-bold text-white mb-3">{title}</h2>
        <p className="text-white/60 mb-8">{text}</p>
        
        <div className="flex flex-col gap-3">
          <button onClick={() => setVerified(true)} className="w-full py-3 rounded-xl font-bold text-white transition-opacity hover:opacity-90" style={{ backgroundColor: accentColor }}>
            Evet, 18 yaşından büyüğüm
          </button>
          <button onClick={() => alert("Erişim reddedildi.")} className="w-full py-3 rounded-xl font-bold text-white border border-white/20 hover:bg-white/5 transition-colors">
            Hayır, değilim
          </button>
        </div>
      </div>
    </div>
  )
}
