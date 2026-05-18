"use client"
import React from "react"
import { ArrowRight } from "lucide-react"

interface Block { id: string; settings: Record<string, any> }
interface Props { settings: Record<string, any>; blocks: Block[] }

export default function FeaturedCategorySection({ settings, blocks }: Props) {
  const { title = "Erkek Klasik Ayakkabılar", description = "İş hayatınızda ve özel günlerinizde şıklığınızı tamamlayacak el yapımı tasarımlar.", image = "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format", buttonText = "Koleksiyonu İncele", link = "#", bgColor = "#12100E", textColor = "#FDFBF7", paddingY = 80 } = settings

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12 group cursor-pointer">
          <div className="md:w-1/2 w-full order-2 md:order-1">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight" style={{ color: textColor }}>{title}</h2>
            <p className="text-lg opacity-70 mb-8 max-w-md" style={{ color: textColor }}>{description}</p>
            <a href={link} className="inline-flex items-center gap-2 font-black uppercase tracking-widest text-sm hover:opacity-80 transition-opacity" style={{ color: textColor }}>
              {buttonText} <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </a>
          </div>
          <div className="md:w-1/2 w-full order-1 md:order-2">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-slate-800 relative">
              {image && <img src={image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={title} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
