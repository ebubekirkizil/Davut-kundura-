"use client"
import React, { useState } from "react"
import { Mail, CheckCircle } from "lucide-react"

interface Props {
  settings: Record<string, any>
}

export default function NewsletterSignupSection({ settings }: Props) {
  const {
    title = "Fırsatlardan İlk Siz Haberdar Olun",
    subtitle = "Özel indirimler ve yeni ürünler için abone olun",
    placeholder = "E-posta adresinizi girin...",
    buttonText = "Abone Ol",
    bgColor = "#F7F3EE",
    accentColor = "#C8A96E",
    paddingY = 80,
  } = settings

  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
  }

  return (
    <div
      className="text-center px-6"
      style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}
    >
      <div className="max-w-xl mx-auto">
        <div
          className="w-14 h-14 rounded-2xl mx-auto mb-6 flex items-center justify-center"
          style={{ backgroundColor: accentColor + "20" }}
        >
          <Mail className="h-7 w-7" style={{ color: accentColor }} />
        </div>

        <h2 className="text-3xl font-serif font-bold mb-3" style={{ color: "#12100E" }}>
          {title}
        </h2>
        <p className="text-sm opacity-60 mb-8" style={{ color: "#12100E" }}>
          {subtitle}
        </p>

        {submitted ? (
          <div className="flex items-center justify-center gap-3 text-green-600 font-bold">
            <CheckCircle className="h-6 w-6" />
            Abone olduğunuz için teşekkürler!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              required
              className="flex-1 px-5 py-3.5 rounded-2xl border text-sm focus:outline-none transition-all"
              style={{ borderColor: accentColor + "40", color: "#12100E", backgroundColor: "white" }}
            />
            <button
              type="submit"
              className="px-6 py-3.5 rounded-2xl font-black text-sm transition-all hover:scale-105"
              style={{ backgroundColor: accentColor, color: "#FDFBF7" }}
            >
              {buttonText}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
