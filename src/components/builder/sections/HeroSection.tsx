"use client";

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight, Star, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  settings: {
    title?: string;
    subtitle?: string;
    buttonText?: string;
    alignment?: string;
    badgeText?: string;
    image?: string;
  };
  blocks?: any[];
}

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export default function HeroSection({ settings }: HeroSectionProps) {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], [0, 200]);

  const title = settings.title || "Premium Deri İşçiliğinde Ustalık";
  const subtitle = settings.subtitle || "El işçiliği deri kemerler, ortopedik tabanlar ve profesyonel ayakkabı bakım ürünlerinde yarım asırlık deneyim ve kalite garantisi.";
  const buttonText = settings.buttonText || "Ürünleri Keşfet";
  const badgeText = settings.badgeText || "Yeni Sezon Koleksiyonu";
  const alignment = settings.alignment || "left";
  const image = settings.image || "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop";

  return (
    <section className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[var(--bg-primary)] via-[var(--bg-primary)] to-[var(--accent)]/5">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      {/* Animated Gradient Orbs */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[var(--accent)]/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-[var(--primary)]/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="container relative z-10 mx-auto px-4 py-16 md:py-24">
        <div className={`grid ${alignment === 'left' ? 'lg:grid-cols-2' : 'grid-cols-1'} gap-12 items-center`}>
          
          {/* Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className={`space-y-8 ${alignment === 'center' ? 'text-center mx-auto max-w-3xl' : 'text-center lg:text-left'}`}
          >
            {/* Badge */}
            {badgeText && (
              <motion.div variants={fadeInUp} className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-sm font-medium text-[var(--accent)] ${alignment === 'center' ? 'mx-auto' : ''}`}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]"></span>
                </span>
                {badgeText}
              </motion.div>
            )}

            {/* Heading */}
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-[var(--text-primary)]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {title.split(' ').map((word, i) => (
                <span key={i} className={i % 2 === 1 ? "text-[var(--accent)] block" : "block"}>
                  {word}
                </span>
              ))}
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeInUp}
              className={`text-lg md:text-xl text-[var(--text-primary)]/70 max-w-2xl ${alignment === 'center' ? 'mx-auto' : 'mx-auto lg:mx-0'}`}
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {subtitle}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={fadeInUp} className={`flex flex-col sm:flex-row gap-4 ${alignment === 'center' ? 'justify-center' : 'justify-center lg:justify-start'}`}>
              <Button size="lg" className="group bg-[var(--primary)] text-[var(--bg-primary)] hover:bg-[var(--accent)] transition-colors duration-300">
                {buttonText}
                <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeInUp} className={`grid grid-cols-3 gap-8 pt-8 border-t border-[var(--text-primary)]/10 ${alignment === 'center' ? 'justify-center max-w-xl mx-auto text-center' : ''}`}>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-[var(--accent)]" style={{ fontFamily: 'var(--font-heading)' }}>40+</div>
                <div className="text-sm text-[var(--text-primary)]/60 mt-1">Yıllık Deneyim</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-[var(--accent)]" style={{ fontFamily: 'var(--font-heading)' }}>10K+</div>
                <div className="text-sm text-[var(--text-primary)]/60 mt-1">Mutlu Müşteri</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-[var(--accent)]" style={{ fontFamily: 'var(--font-heading)' }}>500+</div>
                <div className="text-sm text-[var(--text-primary)]/60 mt-1">Ürün Çeşidi</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Image/Visual (only in left alignment layout for split view) */}
          {alignment === 'left' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
              style={{ y: heroY }}
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                {/* Real Image */}
                <img 
                  src={image} 
                  alt={title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Dark overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent" />

                {/* Floating Elements */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="absolute top-8 right-8 bg-[var(--bg-primary)]/90 backdrop-blur-md rounded-xl p-4 shadow-2xl animate-[float_6s_ease-in-out_infinite]"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-[var(--accent)]/20 flex items-center justify-center">
                      <Star className="text-[var(--accent)] h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-bold text-[var(--text-primary)]">4.9/5</div>
                      <div className="text-xs text-[var(--text-primary)]/60">2,450 Değerlendirme</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="absolute bottom-8 left-8 bg-[var(--bg-primary)]/90 backdrop-blur-md rounded-xl p-4 shadow-2xl animate-[float_6s_ease-in-out_infinite_1s]"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-[var(--accent)]/20 flex items-center justify-center">
                      <Truck className="text-[var(--accent)] h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-bold text-[var(--text-primary)]">Ücretsiz Kargo</div>
                      <div className="text-xs text-[var(--text-primary)]/60">Hızlı Teslimat</div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-[var(--accent)]/20 rounded-full blur-3xl animate-pulse" />
              <div className="absolute -bottom-4 -left-4 w-40 h-40 bg-[var(--primary)]/10 rounded-full blur-3xl animate-pulse delay-700" />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
