"use client"
import React, { useState } from "react"
import { Search } from "lucide-react"

interface Props { settings: Record<string, any> }

export default function SearchHeroSection({ settings }: Props) {
  const { title = "Aradığınız Şıklığı Bulun", placeholder = "Ayakkabı, kemer, çanta ara...", bgColor = "#F7F3EE", accentColor = "#C8A96E", paddingY = 120 } = settings
  const [query, setQuery] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if(query.trim()) window.location.href = `/search?q=${encodeURIComponent(query)}`
  }

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}>
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 mb-10 leading-tight">{title}</h1>
        
        <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto group">
          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
            <Search className="w-6 h-6 text-slate-400 group-focus-within:text-amber-600 transition-colors" />
          </div>
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-16 pr-32 py-5 bg-white border border-slate-200 rounded-full text-lg shadow-sm focus:outline-none focus:ring-4 focus:border-amber-500 transition-all" 
            style={{ '--tw-ring-color': accentColor + '40' } as React.CSSProperties}
            placeholder={placeholder}
          />
          <button type="submit" className="absolute right-3 top-3 bottom-3 px-8 rounded-full text-white font-bold transition-transform hover:scale-105" style={{ backgroundColor: accentColor }}>
            Ara
          </button>
        </form>

        <div className="mt-8 flex items-center justify-center gap-3 flex-wrap text-sm text-slate-500 font-bold">
          Popüler aramalar: 
          {["Oxford", "Loafer", "Süet Kemer", "Bakım Kremi"].map(term => (
            <span key={term} className="px-3 py-1 bg-slate-100 rounded-full cursor-pointer hover:bg-slate-200 transition-colors" onClick={() => setQuery(term)}>{term}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
