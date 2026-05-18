"use client"
import React from "react"
import { Menu, Search, ShoppingBag } from "lucide-react"

interface Props { settings: Record<string, any> }

export default function MegaMenuPlaceholderSection({ settings }: Props) {
  const { title = "DAVUT KUNDURA", bgColor = "#FDFBF7" } = settings

  return (
    <div className="sticky top-0 z-[90] border-b border-slate-200" style={{ backgroundColor: bgColor }}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        <div className="flex items-center gap-6">
          <button className="lg:hidden"><Menu className="w-6 h-6" /></button>
          <div className="hidden lg:flex items-center gap-6 text-sm font-bold text-slate-600">
            <a href="#" className="hover:text-amber-600">Erkek</a>
            <a href="#" className="hover:text-amber-600">Kadın</a>
            <a href="#" className="hover:text-amber-600 text-amber-600">Özel Sipariş</a>
            <a href="#" className="hover:text-amber-600">Aksesuar</a>
          </div>
        </div>

        <div className="text-2xl font-serif font-black tracking-widest">{title}</div>

        <div className="flex items-center gap-4 text-slate-600">
          <button><Search className="w-5 h-5 hover:text-amber-600" /></button>
          <button className="relative">
            <ShoppingBag className="w-5 h-5 hover:text-amber-600" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full text-[8px] font-bold text-white flex items-center justify-center">0</span>
          </button>
        </div>

      </div>
    </div>
  )
}
