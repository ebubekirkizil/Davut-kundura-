"use client"
import React from "react"
import { MapPin, Clock, Phone, Car } from "lucide-react"

interface Props { settings: Record<string, any> }

export default function StoreLocatorSection({ settings }: Props) {
  const {
    title = "Mağazamızı Ziyaret Edin",
    storeName = "Davut Kundura — Pendik",
    address = "Doğu Mah. Flurya Sok. No:2/B, Pendik / İstanbul",
    phone = "+90 538 625 87 92",
    hours = "Pzt–Cmt: 09:00–19:00\nPazar: Kapalı",
    parking = "Ücretsiz park yeri mevcut",
    mapLink = "https://maps.google.com/?q=Pendik+İstanbul",
    bgColor = "#F7F3EE",
    accentColor = "#C8A96E",
    paddingY = 80,
    showImage = false,
    image = "",
  } = settings

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}>
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-serif font-bold text-center mb-10" style={{ color: "#12100E" }}>{title}</h2>

        <div className={`grid gap-8 ${showImage ? "lg:grid-cols-2" : "max-w-2xl mx-auto"}`}>
          <div className="p-8 rounded-3xl border shadow-lg bg-white" style={{ borderColor: accentColor + "30" }}>
            <h3 className="font-black text-lg mb-6" style={{ color: "#12100E" }}>{storeName}</h3>
            {[
              { icon: MapPin, label: "Adres", value: address, link: mapLink },
              { icon: Phone, label: "Telefon", value: phone, link: `tel:${phone}` },
              { icon: Clock, label: "Çalışma Saatleri", value: hours, link: null },
              { icon: Car, label: "Otopark", value: parking, link: null },
            ].map(({ icon: Icon, label, value, link }) => (
              <div key={label} className="flex gap-4 mb-5">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: accentColor + "18" }}>
                  <Icon className="h-4 w-4" style={{ color: accentColor }} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider opacity-50 mb-0.5" style={{ color: "#12100E" }}>{label}</p>
                  {link ? (
                    <a href={link} target="_blank" rel="noopener noreferrer"
                      className="text-sm font-bold hover:underline whitespace-pre-line"
                      style={{ color: "#12100E" }}>{value}</a>
                  ) : (
                    <p className="text-sm font-bold whitespace-pre-line" style={{ color: "#12100E" }}>{value}</p>
                  )}
                </div>
              </div>
            ))}
            <a href={mapLink} target="_blank" rel="noopener noreferrer"
              className="mt-4 w-full block text-center py-3 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:scale-[1.01]"
              style={{ backgroundColor: accentColor, color: "#FDFBF7" }}>
              Yol Tarifi Al
            </a>
          </div>

          {showImage && image && (
            <div className="rounded-3xl overflow-hidden shadow-lg">
              <img src={image} alt={storeName} className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
