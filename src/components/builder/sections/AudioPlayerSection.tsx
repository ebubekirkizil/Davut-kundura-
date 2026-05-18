"use client"
import React, { useState } from "react"
import { Play, Pause, Volume2 } from "lucide-react"

interface Props { settings: Record<string, any> }

export default function AudioPlayerSection({ settings }: Props) {
  const { title = "Atölyenin Sesi", subtitle = "Deriye şekil veren çekiç sesleri...", bgColor = "#F7F3EE", accentColor = "#C8A96E", paddingY = 80 } = settings
  const [isPlaying, setIsPlaying] = useState(false)

  // This is a UI mockup. In real life, an <audio> tag would be linked to `audioUrl`.
  
  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}>
      <div className="max-w-2xl mx-auto px-6">
        <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-slate-100 flex flex-col sm:flex-row items-center gap-8">
          
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0 transition-transform hover:scale-105 shadow-md" 
            style={{ backgroundColor: accentColor, color: "#fff" }}
          >
            {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
          </button>

          <div className="flex-1 text-center sm:text-left w-full">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
              <Volume2 className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-black uppercase tracking-widest text-slate-400">Podcast / Ses Kaydı</span>
            </div>
            <h2 className="text-2xl font-serif font-bold text-slate-900 mb-1">{title}</h2>
            <p className="text-sm text-slate-600 mb-6">{subtitle}</p>

            {/* Fake wave form */}
            <div className="flex items-center gap-1 h-8 w-full justify-center sm:justify-start">
              {Array.from({ length: 40 }).map((_, i) => (
                <div 
                  key={i} 
                  className={`w-1 rounded-full ${isPlaying ? 'animate-pulse' : ''}`}
                  style={{ 
                    backgroundColor: i < 15 ? accentColor : '#E2E8F0',
                    height: `${Math.max(10, Math.random() * 100)}%`,
                    animationDelay: `${i * 0.05}s`
                  }}
                />
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}
