"use client"
import React, { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Block { id: string; settings: Record<string, any> }
interface Props { settings: Record<string, any>; blocks: Block[] }

export default function CarouselHeroSection({ settings, blocks }: Props) {
  const { autoplay = true, delay = 5000, height = "100vh" } = settings
  const [current, setCurrent] = useState(0)

  const slides = blocks.length > 0 ? blocks : [
    { id: "1", settings: { title: "El İşçiliğinin Zirvesi", subtitle: "Yeni Koleksiyon", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=1600&auto=format", btnText: "Keşfet" } },
    { id: "2", settings: { title: "Zamansız Tasarım", subtitle: "Premium Deri Serisi", image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=1600&auto=format", btnText: "İncele" } }
  ]

  useEffect(() => {
    if (!autoplay || slides.length <= 1) return
    const id = setInterval(() => setCurrent(p => (p + 1) % slides.length), delay)
    return () => clearInterval(id)
  }, [autoplay, delay, slides.length])

  return (
    <div className="relative overflow-hidden w-full group" style={{ height }}>
      {slides.map((slide, i) => (
        <div key={slide.id} className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
          <div className="absolute inset-0 bg-black/40 z-10" />
          {slide.settings.image && <img src={slide.settings.image} className="absolute inset-0 w-full h-full object-cover scale-105 animate-slow-pan" alt="" />}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">
            <span className="text-white/80 font-black tracking-[0.2em] uppercase text-xs sm:text-sm mb-4 translate-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">{slide.settings.subtitle}</span>
            <h2 className="text-4xl md:text-7xl font-serif font-bold text-white mb-8 max-w-4xl leading-tight translate-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">{slide.settings.title}</h2>
            {slide.settings.btnText && (
              <button className="bg-white text-slate-900 px-10 py-4 rounded-full font-bold uppercase tracking-wider hover:scale-105 transition-transform translate-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                {slide.settings.btnText}
              </button>
            )}
          </div>
        </div>
      ))}

      {slides.length > 1 && (
        <>
          <button onClick={() => setCurrent(p => (p - 1 + slides.length) % slides.length)} className="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full border border-white/20 bg-black/20 text-white flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white hover:text-black">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button onClick={() => setCurrent(p => (p + 1) % slides.length)} className="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full border border-white/20 bg-black/20 text-white flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white hover:text-black">
            <ChevronRight className="w-6 h-6" />
          </button>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
            {slides.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-all ${i === current ? 'w-8 bg-white' : 'bg-white/50'}`} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
