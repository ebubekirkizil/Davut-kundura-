"use client"
import React, { useState } from "react"
import { Send } from "lucide-react"

interface Props { settings: Record<string, any> }

export default function SubscribeBoxSection({ settings }: Props) {
  const { title = "Elite Club'a Katılın", subtitle = "Yeni koleksiyonlardan ve özel indirimlerden ilk sizin haberiniz olsun.", bgColor = "#12100E", accentColor = "#C8A96E", paddingY = 80 } = settings
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if(email) alert("Abone olundu: " + email)
  }

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}>
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-16 text-center relative overflow-hidden backdrop-blur-sm">
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">{title}</h2>
            <p className="text-slate-400 mb-10 max-w-lg mx-auto">{subtitle}</p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input 
                type="email" 
                placeholder="E-posta adresiniz" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="flex-1 bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
              />
              <button type="submit" className="px-8 py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 hover:scale-105 transition-transform" style={{ backgroundColor: accentColor }}>
                Kayıt Ol <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
