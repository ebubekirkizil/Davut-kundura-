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
      { label: "Kampanyalar", href: "/deals" },
    ],
    company: [
      { label: "Hakkımızda", href: "/about" },
      { label: "İletişim", href: "/contact" },
      { label: "Mağazalarımız", href: "/stores" },
      { label: "Kariyer", href: "/careers" },
      { label: "Blog", href: "/blog" },
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
              <div className="text-2xl font-serif font-bold text-gradient-gold">
                Davut Kundura
              </div>
            </Link>
            <p className="text-sm text-muted-foreground">
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

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4">Kurumsal</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
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
              <div className="flex gap-2">
                {/* Payment method icons - placeholder */}
                <div className="h-6 w-10 bg-muted rounded flex items-center justify-center text-xs">
                  💳
                </div>
                <div className="h-6 w-10 bg-muted rounded flex items-center justify-center text-xs">
                  💳
                </div>
                <div className="h-6 w-10 bg-muted rounded flex items-center justify-center text-xs">
                  💳
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
