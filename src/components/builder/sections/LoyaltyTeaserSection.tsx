"use client"
import React from "react"
import { Star, Gift, ShieldCheck } from "lucide-react"

interface Props { settings: Record<string, any> }

export default function LoyaltyTeaserSection({ settings }: Props) {
  const { title = "Davut Elite Club'a Katılın", subtitle = "Alışverişlerinizden puan kazanın, özel indirimlere erişin", buttonText = "Ücretsiz Üye Ol", bgColor = "#12100E", accentColor = "#C8A96E", paddingY = 80 } = settings

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-slate-900 rounded-3xl p-8 md:p-12 relative overflow-hidden border border-slate-800">
          {/* BG pattern */}
          <div className="absolute top-0 right-0 p-32 opacity-5 pointer-events-none">
            <Star className="w-96 h-96" style={{ color: accentColor }} />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 text-white">
            <div className="lg:w-1/2 text-center lg:text-left">
              <span className="text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mb-6 inline-block" style={{ backgroundColor: accentColor + "20", color: accentColor }}>Elite Club</span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">{title}</h2>
              <p className="text-lg opacity-70 mb-8">{subtitle}</p>
              <button className="px-8 py-4 rounded-xl font-black transition-transform hover:scale-105 text-slate-900" style={{ backgroundColor: accentColor }}>
                {buttonText}
              </button>
            </div>

            <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
              {[
                { icon: Star, title: "Puan Kazan", desc: "Her 100₺'lik alışverişte 10 puan" },
                { icon: Gift, title: "Doğum Günü", desc: "Doğum gününüzde özel hediyeler" },
                { icon: ShieldCheck, title: "Erken Erişim", desc: "Yeni sezon ürünlerine erken erişim" }
              ].map((b, i) => (
                <div key={i} className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                  <b.icon className="w-8 h-8 mb-4" style={{ color: accentColor }} />
                  <h3 className="font-bold mb-1">{b.title}</h3>
                  <p className="text-sm opacity-60">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
