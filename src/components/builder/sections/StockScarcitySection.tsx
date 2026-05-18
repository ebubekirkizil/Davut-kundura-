"use client"
import React from "react"
import { AlertCircle } from "lucide-react"

interface Props { settings: Record<string, any> }

export default function StockScarcitySection({ settings }: Props) {
  const { title = "Stoklar Tükeniyor!", subtitle = "Sınırlı sayıda üretilen 'Premium Seri' için son fırsat.", stockCount = 3, bgColor = "#FEF2F2", accentColor = "#EF4444", textColor = "#7F1D1D", paddingY = 40 } = settings

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}>
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl border" style={{ borderColor: accentColor + "30", backgroundColor: accentColor + "10" }}>
          
          <div className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 animate-pulse" style={{ backgroundColor: accentColor + "20", color: accentColor }}>
            <AlertCircle className="w-8 h-8" />
          </div>
          
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-xl font-bold mb-1" style={{ color: textColor }}>{title}</h2>
            <p className="text-sm opacity-80" style={{ color: textColor }}>{subtitle}</p>
          </div>

          <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm border border-rose-100">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Kalan Stok</span>
            <span className="text-3xl font-black tabular-nums" style={{ color: accentColor }}>{stockCount}</span>
          </div>

        </div>
      </div>
    </div>
  )
}
