"use client"
import React, { useState } from "react"
import { Send, CheckCircle, MapPin, Phone, Mail } from "lucide-react"

interface Props { settings: Record<string, any> }

export default function ContactFormSection({ settings }: Props) {
  const {
    title = "Bize Ulaşın",
    subtitle = "Sorularınız için 24 saat içinde dönüş yapıyoruz",
    bgColor = "#FDFBF7",
    accentColor = "#C8A96E",
    paddingY = 80,
    showInfo = true,
    address = "Doğu Mah. Flurya Sok. No:2/B Pendik/İstanbul",
    phone = "+90 538 625 87 92",
    email = "info@davutkundura.com",
  } = settings

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-3" style={{ color: "#12100E" }}>{title}</h2>
          <p className="text-sm opacity-60" style={{ color: "#12100E" }}>{subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <div>
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center gap-4 text-center py-16">
                <CheckCircle className="h-16 w-16" style={{ color: accentColor }} />
                <h3 className="text-xl font-bold" style={{ color: "#12100E" }}>Mesajınız İletildi!</h3>
                <p className="text-sm opacity-60" style={{ color: "#12100E" }}>En kısa sürede size dönüş yapacağız.</p>
                <button onClick={() => setSent(false)} className="text-xs font-bold underline opacity-50">Yeni mesaj gönder</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-black uppercase tracking-wider opacity-60 block mb-1.5" style={{ color: "#12100E" }}>Ad Soyad</label>
                    <input type="text" required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                      className="w-full px-4 py-3 border rounded-2xl text-sm focus:outline-none transition-all"
                      style={{ borderColor: accentColor + "40", backgroundColor: "white", color: "#12100E" }} />
                  </div>
                  <div>
                    <label className="text-xs font-black uppercase tracking-wider opacity-60 block mb-1.5" style={{ color: "#12100E" }}>E-posta</label>
                    <input type="email" required value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                      className="w-full px-4 py-3 border rounded-2xl text-sm focus:outline-none transition-all"
                      style={{ borderColor: accentColor + "40", backgroundColor: "white", color: "#12100E" }} />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-black uppercase tracking-wider opacity-60 block mb-1.5" style={{ color: "#12100E" }}>Konu</label>
                  <input type="text" value={form.subject} onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}
                    className="w-full px-4 py-3 border rounded-2xl text-sm focus:outline-none transition-all"
                    style={{ borderColor: accentColor + "40", backgroundColor: "white", color: "#12100E" }} />
                </div>
                <div>
                  <label className="text-xs font-black uppercase tracking-wider opacity-60 block mb-1.5" style={{ color: "#12100E" }}>Mesajınız</label>
                  <textarea rows={5} required value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    className="w-full px-4 py-3 border rounded-2xl text-sm focus:outline-none transition-all resize-none"
                    style={{ borderColor: accentColor + "40", backgroundColor: "white", color: "#12100E" }} />
                </div>
                <button type="submit"
                  className="w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-[1.01] transition-transform"
                  style={{ backgroundColor: accentColor, color: "#FDFBF7" }}>
                  <Send className="h-4 w-4" /> Mesajı Gönder
                </button>
              </form>
            )}
          </div>

          {/* Info */}
          {showInfo && (
            <div className="space-y-6 lg:pl-8 lg:border-l" style={{ borderColor: accentColor + "30" }}>
              <h3 className="text-xl font-serif font-bold" style={{ color: "#12100E" }}>İletişim Bilgileri</h3>
              {[
                { icon: MapPin, label: "Adres", value: address },
                { icon: Phone, label: "Telefon", value: phone },
                { icon: Mail, label: "E-posta", value: email },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: accentColor + "18" }}>
                    <Icon className="h-5 w-5" style={{ color: accentColor }} />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-wider opacity-50 mb-0.5" style={{ color: "#12100E" }}>{label}</p>
                    <p className="text-sm font-bold" style={{ color: "#12100E" }}>{value}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
