"use client"

import * as React from "react"
import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface FooterProps {
  className?: string
}

export function Footer({ className }: FooterProps) {
  const [email, setEmail] = React.useState("")

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      toast.success("Bültenimize abone oldunuz!")
      setEmail("")
    }
  }

  const footerLinks = {
    shop: [
      { label: "Tüm Ürünler", href: "/products" },
      { label: "Deri Kemerler", href: "/products?category=belts" },
      { label: "Ortopedik Tabanlar", href: "/products?category=insoles" },
      { label: "Bakım Ürünleri", href: "/products?category=care" },
    ],
    support: [
      { label: "SSS", href: "/faq" },
      { label: "Kargo & Teslimat", href: "/shipping" },
      { label: "İade & Değişim", href: "/returns" },
      { label: "Ödeme Seçenekleri", href: "/payment" },
      { label: "Garanti Koşulları", href: "/warranty" },
    ],
    legal: [
      { label: "Gizlilik Politikası", href: "/privacy" },
      { label: "Kullanım Koşulları", href: "/terms" },
      { label: "Çerez Politikası", href: "/cookies" },
      { label: "KVKK", href: "/kvkk" },
    ],
  }

  const socialLinks = [
    { icon: "📘", href: "https://facebook.com", label: "Facebook" },
    { icon: "📷", href: "https://instagram.com", label: "Instagram" },
    { icon: "🐦", href: "https://twitter.com", label: "Twitter" },
  ]

  return (
    <footer className={cn("bg-muted/30 border-t", className)}>
      {/* Newsletter Section */}
      <div className="border-b bg-accent/5">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h3 className="text-2xl font-serif font-bold">
              Kampanya ve Fırsatlardan Haberdar Olun
            </h3>
            <p className="text-muted-foreground">
              E-bültenimize abone olun, özel indirimler ve yeni ürünlerden ilk siz haberdar olun.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="E-posta adresiniz"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
              />
              <Button type="submit">Abone Ol</Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <div 
                className="text-4xl font-serif text-gradient-gold"
                style={{ fontFamily: 'var(--font-great-vibes), cursive', fontWeight: 400, lineHeight: 1 }}
              >
                Davut Kundura
              </div>
            </Link>
            <p className="text-sm text-muted-foreground mt-4">
              40 yıldır premium deri işçiliği ve ortopedik çözümler konusunda güvenilir adresiniz.
              Kalite ve müşteri memnuniyeti önceliğimizdir.
            </p>

            {/* Contact Info */}
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                <span className="text-muted-foreground">
                  Atatürk Cad. No:123, Kadıköy, İstanbul
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <a href="tel:+902161234567" className="text-muted-foreground hover:text-foreground transition-colors">
                  +90 (216) 123 45 67
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <a href="mailto:info@davutkundura.com" className="text-muted-foreground hover:text-foreground transition-colors">
                  info@davutkundura.com
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-background hover:bg-accent hover:text-accent-foreground transition-colors flex items-center justify-center text-lg"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-semibold mb-4">Alışveriş</h4>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Removed Company Links for now */}
          <div>
            <h4 className="font-semibold mb-4">Destek</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold mb-4">Müşteri Hizmetleri</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold mb-4">Yasal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>
              © {new Date().getFullYear()} Davut Kundura. Tüm hakları saklıdır.
            </p>
            <div className="flex items-center gap-4">
              <span>Güvenli Ödeme</span>
              {/* Payment Icons */}
              <div className="flex space-x-3 items-center opacity-70 hover:opacity-100 transition-opacity">
                {/* Troy Logo */}
                <svg width="32" height="20" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="100" height="60" rx="8" fill="white"/>
                  <path d="M72.5 39H79L70.5 21H64L72.5 39Z" fill="#00A7A1"/>
                  <path d="M57.5 39H64L55.5 21H49L57.5 39Z" fill="#F8A01A"/>
                  <path d="M42.5 39H49L40.5 21H34L42.5 39Z" fill="#E6332A"/>
                </svg>
                {/* Visa Logo */}
                <svg width="32" height="20" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="100" height="60" rx="8" fill="white"/>
                  <path d="M40.2 38.8L44.8 21H51.4L46.8 38.8H40.2ZM65.8 21.4C64.6 21.1 62.7 20.8 60.3 20.8C53.8 20.8 49.3 24.3 49.3 29.3C49.3 33 52.8 35 55.4 36.3C58 37.6 58.9 38.4 58.9 39.5C58.9 41.2 56.8 42 54.4 42C51.5 42 49.8 41.2 48.2 40.5L47.2 40L46.2 44.8C47.8 45.5 50.5 46.2 53.4 46.2C60.3 46.2 64.9 42.8 64.9 37.5C64.9 31.2 55.5 30.9 55.5 28.1C55.5 26.8 56.8 25.3 59.5 25.3C61.5 25.3 63.2 25.8 64.6 26.4L65.3 26.7L66.3 21.9L65.8 21.4ZM84.7 38.8H90.5L84.6 21H79.6C78.1 21 76.9 21.9 76.3 23.3L65.3 38.8H71.9L73.2 35.1H81.3L82.1 38.8H84.7ZM75.1 29.8L78.4 20.9L80.3 29.8H75.1ZM33.5 21L26.3 38.8H20.1L21.4 32.5L24.8 21H33.5Z" fill="#1434CB"/>
                </svg>
                {/* Mastercard Logo */}
                <svg width="32" height="20" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="100" height="60" rx="8" fill="white"/>
                  <circle cx="40" cy="30" r="14" fill="#EB001B"/>
                  <circle cx="60" cy="30" r="14" fill="#F79E1B"/>
                  <path d="M50 40C53.7 37.6 56 34.1 56 30C56 25.9 53.7 22.4 50 20C46.3 22.4 44 25.9 44 30C44 34.1 46.3 37.6 50 40Z" fill="#FF5F00"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
