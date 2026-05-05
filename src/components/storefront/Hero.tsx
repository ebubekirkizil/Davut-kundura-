"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface HeroProps {
  className?: string
}

export function Hero({ className }: HeroProps) {
  const [isVideoPlaying, setIsVideoPlaying] = React.useState(false)

  return (
    <section
      className={cn(
        "relative min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-accent/5",
        className
      )}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      {/* Animated Gradient Orbs */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="container relative z-10 mx-auto px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-sm font-medium text-accent animate-in fade-in slide-in-from-bottom-4 duration-700">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              Yeni Sezon Koleksiyonu
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold leading-tight animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
              <span className="block">Premium Deri</span>
              <span className="block text-gradient-gold">İşçiliğinde Ustalık</span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
              El işçiliği deri kemerler, ortopedik tabanlar ve profesyonel ayakkabı bakım ürünlerinde
              40 yıllık deneyim ve kalite garantisi.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
              <Button size="lg" className="group" asChild>
                <Link href="/products">
                  Ürünleri Keşfet
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="group"
                onClick={() => setIsVideoPlaying(true)}
              >
                <Play className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                Tanıtım Videosu
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t animate-in fade-in slide-in-from-bottom-12 duration-700 delay-400">
              <div>
                <div className="text-3xl md:text-4xl font-serif font-bold text-gradient-gold">40+</div>
                <div className="text-sm text-muted-foreground mt-1">Yıllık Deneyim</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-serif font-bold text-gradient-gold">10K+</div>
                <div className="text-sm text-muted-foreground mt-1">Mutlu Müşteri</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-serif font-bold text-gradient-gold">500+</div>
                <div className="text-sm text-muted-foreground mt-1">Ürün Çeşidi</div>
              </div>
            </div>
          </div>

          {/* Image/Visual */}
          <div className="relative animate-in fade-in zoom-in-95 duration-1000 delay-200">
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
              {/* Placeholder for product image */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="text-6xl">👞</div>
                  <p className="text-sm text-muted-foreground">Ürün Görseli</p>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute top-8 right-8 bg-background/90 backdrop-blur-sm rounded-lg p-4 shadow-lg animate-float">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center">
                    <span className="text-2xl">⭐</span>
                  </div>
                  <div>
                    <div className="font-semibold">4.9/5</div>
                    <div className="text-xs text-muted-foreground">2,450 Değerlendirme</div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-8 left-8 bg-background/90 backdrop-blur-sm rounded-lg p-4 shadow-lg animate-float delay-500">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center">
                    <span className="text-2xl">🚚</span>
                  </div>
                  <div>
                    <div className="font-semibold">Ücretsiz Kargo</div>
                    <div className="text-xs text-muted-foreground">500₺ ve Üzeri</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl animate-pulse" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/10 rounded-full blur-2xl animate-pulse delay-700" />
          </div>
        </div>
      </div>

      {/* Video Modal (placeholder) */}
      {isVideoPlaying && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setIsVideoPlaying(false)}
        >
          <div className="relative w-full max-w-4xl aspect-video bg-background rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-muted-foreground">Video Player Placeholder</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4"
              onClick={() => setIsVideoPlaying(false)}
            >
              ✕
            </Button>
          </div>
        </div>
      )}
    </section>
  )
}
