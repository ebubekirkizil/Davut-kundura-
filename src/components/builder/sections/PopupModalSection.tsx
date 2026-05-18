"use client"
import React, { useState, useEffect } from "react"
import { X } from "lucide-react"

interface Props { settings: Record<string, any> }

export default function PopupModalSection({ settings }: Props) {
  const { title = "Özel Fırsat", text = "İlk siparişinizde %15 indirim kazanmak için e-posta listemize katılın.", delay = 3, bgColor = "#12100E", accentColor = "#C8A96E" } = settings
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState("")

  useEffect(() => {
    // Sadece editörde değilsek veya önizleme amacıyla
    const timer = setTimeout(() => setOpen(true), delay * 1000)
    return () => clearTimeout(timer)
  }, [delay])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-300" style={{ backgroundColor: bgColor }}>
        <button onClick={() => setOpen(false)} className="absolute top-4 right-4 text-white/50 hover:text-white z-10 transition-colors">
          <X className="w-6 h-6" />
        </button>
        
        <div className="p-10 text-center">
          <h2 className="text-3xl font-serif font-bold text-white mb-4">{title}</h2>
          <p className="text-white/70 mb-8">{text}</p>
          
          <form onSubmit={(e) => { e.preventDefault(); setOpen(false); }} className="flex flex-col gap-3">
            <input 
              type="email" 
              placeholder="E-posta adresiniz" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:border-amber-500 text-center"
            />
            <button type="submit" className="w-full py-3 rounded-xl font-bold text-white transition-transform hover:scale-105" style={{ backgroundColor: accentColor }}>
              İndirimi Kap
            </button>
          </form>
          <button onClick={() => setOpen(false)} className="mt-4 text-xs text-white/40 hover:text-white/80 underline">Hayır, teşekkürler</button>
        </div>
      </div>
    </div>
  )
}
