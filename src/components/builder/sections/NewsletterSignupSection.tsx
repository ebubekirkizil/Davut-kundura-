"use client"
import React, { useState } from "react"
import { motion } from "framer-motion"
import { Mail, CheckCircle, Gift } from "lucide-react"

interface Props {
  settings: Record<string, any>
}

export default function NewsletterSignupSection({ settings }: Props) {
  const {
    title = "Fırsatlardan İlk Siz Haberdar Olun",
    subtitle = "Özel indirimler, yeni ürün haberleri ve bakım ipuçları için e-posta listemize kayıt olun. İlk alışverişinizde %10 indirim!",
    placeholder = "E-posta adresinizi girin...",
    buttonText = "Abone Ol & %10 İndirim Kazan",
    bgColor = "var(--bg-primary)",
    accentColor = "#C8A96E",
    paddingY = 100,
  } = settings

  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
  }

  return (
    <section
      style={{ paddingTop: paddingY, paddingBottom: paddingY, backgroundColor: bgColor }}
      className="relative overflow-hidden"
    >
      {/* Decorative */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(200,169,110,0.08), transparent)' }} />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto text-center space-y-8"
        >
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mx-auto"
            style={{ background: 'rgba(200,169,110,0.15)', color: accentColor }}>
            <Gift className="w-7 h-7" />
          </div>

          {/* Text */}
          <div className="space-y-3">
            <p className="text-sm font-bold tracking-[0.3em] uppercase" style={{ color: accentColor }}>Özel Teklif</p>
            <h2 className="font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)' }}>
              {title}
            </h2>
            <p className="opacity-70 text-base leading-relaxed" style={{ color: 'var(--text-primary)' }}>
              {subtitle}
            </p>
          </div>

          {/* Form */}
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-white"
              style={{ background: '#22c55e' }}
            >
              <CheckCircle className="h-5 w-5" />
              Abone olduğunuz için teşekkürler! İndirim kodunuz e-postanıza gönderildi.
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" style={{ color: 'var(--text-primary)' }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={placeholder}
                  required
                  className="w-full pl-11 pr-5 py-4 rounded-xl border text-sm focus:outline-none transition-all"
                  style={{ borderColor: 'rgba(200,169,110,0.3)', color: 'var(--text-primary)', backgroundColor: 'var(--bg-primary)', background: 'white' }}
                />
              </div>
              <button
                type="submit"
                className="px-7 py-4 rounded-xl font-bold text-sm transition-all hover:scale-105 hover:shadow-xl whitespace-nowrap"
                style={{ backgroundColor: accentColor, color: "#12100E" }}
              >
                {buttonText}
              </button>
            </form>
          )}

          <p className="text-xs opacity-50" style={{ color: 'var(--text-primary)' }}>
            Spam göndermiyoruz. İstediğiniz zaman aboneliğinizi iptal edebilirsiniz.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
