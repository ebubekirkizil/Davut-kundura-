"use client"
import React from "react"
import { Award, PenTool } from "lucide-react"

interface Props { settings: Record<string, any> }

export default function AuthorBioSection({ settings }: Props) {
  const { name = "Davut Usta", role = "Baş Zanaatkar & Kurucu", bio = "Yarım asırlık tecrübesiyle deriye hayat veren, geleneksel Türk ayakkabıcılığının son ustalarından.", image = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&fit=crop", bgColor = "#F7F3EE", accentColor = "#C8A96E", paddingY = 60 } = settings

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}>
      <div className="max-w-3xl mx-auto px-6">
        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-slate-100 flex flex-col sm:flex-row items-center sm:items-start gap-8 text-center sm:text-left">
          
          <div className="relative w-32 h-32 flex-shrink-0">
            <div className="absolute inset-0 rounded-full border-2 border-dashed animate-[spin_10s_linear_infinite]" style={{ borderColor: accentColor }} />
            <div className="absolute inset-2 rounded-full overflow-hidden bg-slate-100">
              {image && <img src={image} className="w-full h-full object-cover" alt={name} />}
            </div>
            <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-md text-slate-800">
              <Award className="w-6 h-6" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-2 text-slate-400">
              <PenTool className="w-4 h-4" />
              <span className="text-xs font-black uppercase tracking-widest">Yazar / Usta</span>
            </div>
            <h3 className="text-2xl font-serif font-bold text-slate-900 mb-1">{name}</h3>
            <p className="font-bold text-sm mb-4" style={{ color: accentColor }}>{role}</p>
            <p className="text-slate-600 leading-relaxed">{bio}</p>
          </div>

        </div>
      </div>
    </div>
  )
}
