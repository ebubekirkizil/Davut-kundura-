"use client"
import React, { useState, useEffect } from "react"
import { Clock } from "lucide-react"

interface Props { settings: Record<string, any> }

export default function CountdownTimerSection({ settings }: Props) {
  const { title = "Kış İndirimi Bitiyor", date = "2026-12-31T23:59:59", bgColor = "#12100E", accentColor = "#C8A96E", textColor = "#FDFBF7", paddingY = 60 } = settings

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const target = new Date(date).getTime()
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const diff = target - now
      if (diff <= 0) {
        clearInterval(timer)
      } else {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000)
        })
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [date])

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-bold mb-6">
          <Clock className="w-4 h-4" style={{ color: accentColor }} /> Sınırlı Süre
        </div>
        <h2 className="text-3xl md:text-5xl font-serif font-bold mb-10" style={{ color: textColor }}>{title}</h2>

        <div className="flex items-center justify-center gap-4 sm:gap-8">
          {[
            { label: 'Gün', value: timeLeft.days },
            { label: 'Saat', value: timeLeft.hours },
            { label: 'Dakika', value: timeLeft.minutes },
            { label: 'Saniye', value: timeLeft.seconds }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl sm:text-4xl font-serif font-bold shadow-lg" style={{ color: accentColor }}>
                {String(item.value).padStart(2, '0')}
              </div>
              <span className="mt-3 text-xs sm:text-sm font-black uppercase tracking-widest opacity-60" style={{ color: textColor }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
