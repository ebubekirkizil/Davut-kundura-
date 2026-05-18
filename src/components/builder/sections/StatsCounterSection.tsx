"use client"
import React, { useEffect, useRef, useState } from "react"

interface Block { id: string; settings: Record<string, any> }
interface Props { settings: Record<string, any>; blocks: Block[] }

function useCountUp(target: number, duration = 2000, trigger: boolean) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!trigger) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [target, duration, trigger])
  return count
}

function StatCard({ stat, trigger }: { stat: any; trigger: boolean }) {
  const num = useCountUp(parseInt(stat.settings.value ?? "0"), 2000, trigger)
  return (
    <div className="text-center group">
      <div className="text-5xl font-black mb-2 tabular-nums transition-all group-hover:scale-110 duration-300"
        style={{ color: stat.settings.accentColor || "#C8A96E" }}>
        {stat.settings.prefix}{num}{stat.settings.suffix}
      </div>
      <p className="font-black text-sm uppercase tracking-wider" style={{ color: "#12100E" }}>{stat.settings.label}</p>
      {stat.settings.sub && <p className="text-xs opacity-50 mt-1" style={{ color: "#12100E" }}>{stat.settings.sub}</p>}
    </div>
  )
}

export default function StatsCounterSection({ settings, blocks }: Props) {
  const {
    title = "Rakamlarla Biz",
    bgColor = "#12100E",
    textColor = "#FDFBF7",
    paddingY = 80,
  } = settings

  const [triggered, setTriggered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setTriggered(true) }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const items = blocks.length > 0 ? blocks : [
    { id: "s1", settings: { value: "35", suffix: "+", label: "Yıllık Deneyim", sub: "Geleneksel usta işçiliği" } },
    { id: "s2", settings: { value: "12000", suffix: "+", label: "Mutlu Müşteri", sub: "Pendik ve çevresi" } },
    { id: "s3", settings: { value: "98", suffix: "%", label: "Memnuniyet Oranı", sub: "Google yorumları" } },
    { id: "s4", settings: { value: "5000", suffix: "+", label: "Tamir Tamamlandı", sub: "Yıllık ortalama" } },
  ]

  return (
    <div ref={ref} style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}>
      <div className="max-w-5xl mx-auto px-6">
        {title && <h2 className="text-3xl font-serif font-bold text-center mb-12" style={{ color: textColor }}>{title}</h2>}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          {items.map((s) => <StatCard key={s.id} stat={s} trigger={triggered} />)}
        </div>
      </div>
    </div>
  )
}
