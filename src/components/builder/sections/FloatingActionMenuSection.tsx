"use client"
import React, { useState } from "react"
import { MessageCircle, Phone, MapPin, ChevronUp } from "lucide-react"

interface Props { settings: Record<string, any> }

export default function FloatingActionMenuSection({ settings }: Props) {
  const { whatsapp = "+905551234567", phone = "+902161234567", accentColor = "#C8A96E" } = settings
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-none">
      
      <div className={`flex flex-col gap-3 transition-all duration-300 pointer-events-auto ${open ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-50'}`}>
        <a href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
          <MessageCircle className="w-6 h-6" />
        </a>
        <a href={`tel:${phone.replace(/[^0-9+]/g, '')}`} className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
          <Phone className="w-5 h-5" />
        </a>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="w-12 h-12 rounded-full bg-slate-800 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
          <ChevronUp className="w-6 h-6" />
        </button>
      </div>

      <button 
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl hover:scale-105 transition-transform pointer-events-auto z-10"
        style={{ backgroundColor: accentColor }}
      >
        <MessageCircle className="w-7 h-7" />
      </button>

    </div>
  )
}
