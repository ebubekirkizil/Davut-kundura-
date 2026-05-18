"use client"
import React, { useState } from "react"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

interface Block { id: string; settings: Record<string, any> }
interface Props { settings: Record<string, any>; blocks: Block[] }

export default function InteractiveMapSection({ settings, blocks }: Props) {
  const { title = "Mağazalarımız", bgColor = "#FDFBF7", accentColor = "#C8A96E", paddingY = 80 } = settings

  const locations = blocks.length > 0 ? blocks : [
    { id: "1", settings: { name: "Pendik Merkez", address: "Doğu Mah. Flurya Sok. No:2", phone: "+90 555 123 4567", hours: "09:00 - 20:00" } },
    { id: "2", settings: { name: "Kadıköy Şube", address: "Moda Cad. No: 45", phone: "+90 555 987 6543", hours: "10:00 - 21:00" } }
  ]

  const [activeLoc, setActiveLoc] = useState(0)

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}>
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-serif font-bold text-center mb-12 text-slate-900">{title}</h2>
        
        <div className="flex flex-col md:flex-row gap-8 bg-white p-4 rounded-3xl shadow-lg border border-slate-100">
          
          <div className="md:w-1/3 flex flex-col gap-4">
            {locations.map((loc, i) => (
              <button 
                key={loc.id} 
                onClick={() => setActiveLoc(i)}
                className={`text-left p-6 rounded-2xl transition-all ${activeLoc === i ? 'bg-slate-50 border-2' : 'border border-slate-100 hover:bg-slate-50'}`}
                style={{ borderColor: activeLoc === i ? accentColor : undefined }}
              >
                <h3 className="font-bold text-lg text-slate-900 mb-1">{loc.settings.name}</h3>
                <p className="text-sm text-slate-500 line-clamp-1">{loc.settings.address}</p>
              </button>
            ))}
          </div>

          <div className="md:w-2/3 bg-slate-50 rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=Istanbul&zoom=12&size=800x600&sensor=false')] opacity-20 bg-cover bg-center mix-blend-multiply" />
            <div className="relative z-10 bg-white/90 backdrop-blur p-8 rounded-xl shadow-sm border border-slate-100 max-w-sm">
              <h3 className="font-serif text-2xl font-bold mb-4">{locations[activeLoc]?.settings.name}</h3>
              <div className="space-y-4 text-sm text-slate-600">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 flex-shrink-0 text-slate-400" />
                  <span>{locations[activeLoc]?.settings.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 flex-shrink-0 text-slate-400" />
                  <span>{locations[activeLoc]?.settings.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 flex-shrink-0 text-slate-400" />
                  <span>{locations[activeLoc]?.settings.hours}</span>
                </div>
              </div>
              <button className="w-full mt-6 py-3 rounded-lg font-bold text-white transition-opacity hover:opacity-90" style={{ backgroundColor: accentColor }}>
                Yol Tarifi
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
