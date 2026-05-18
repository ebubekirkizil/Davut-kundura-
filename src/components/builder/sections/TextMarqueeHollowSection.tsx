"use client"
import React from "react"

interface Props { settings: Record<string, any> }

export default function TextMarqueeHollowSection({ settings }: Props) {
  const { text = "ÖZEL SİPARİŞ • EL İŞÇİLİĞİ • KALİTE", bgColor = "#C8A96E", paddingY = 40 } = settings

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }} className="overflow-hidden">
      <div className="flex whitespace-nowrap select-none">
        <div className="animate-marquee-fast flex gap-4 items-center">
          {[1,2,3,4,5].map((_, i) => (
            <div 
              key={i} 
              className="text-5xl md:text-8xl font-black uppercase tracking-wider"
              style={{ 
                WebkitTextStroke: "1px rgba(255,255,255,0.7)", 
                color: "transparent"
              }}
            >
              {text}
            </div>
          ))}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee-fast { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee-fast { animation: marquee-fast 15s linear infinite; }
      `}} />
    </div>
  )
}
