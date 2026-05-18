"use client";

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Star, Truck, Shield, ChevronRight, Play } from 'lucide-react';

interface HeroSectionProps {
  settings: {
    title?: string;
    subtitle?: string;
    buttonText?: string;
    buttonLink?: string;
    alignment?: 'left' | 'center' | 'right';
    badgeText?: string;
    image?: string;
    bgColor?: string;
    textColor?: string;
    overlayOpacity?: number;
    paddingY?: number;
  };
  blocks?: any[];
}

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 60, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
};

const fadeIn = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
};

export default function HeroSection({ settings }: HeroSectionProps) {
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 600], [0, 120]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const title = settings.title || "Premium Deri İşçiliğinde Ustalık";
  const subtitle = settings.subtitle || "El işçiliği deri kemerler, ortopedik tabanlar ve profesyonel ayakkabı bakım ürünlerinde 40 yıllık güven ve kalite.";
  const buttonText = settings.buttonText || "Koleksiyonu Keşfet";
  const buttonLink = settings.buttonLink || "/products";
  const badgeText = settings.badgeText || "★ Pendik'in En İyi Kundura Ustası";
  const alignment = settings.alignment || 'left';
  const image = settings.image || "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop";
  const isSplit = alignment === 'left';

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ backgroundColor: settings.bgColor || 'var(--bg-primary)' }}>
      
      {/* Background for center/full layout */}
      {!isSplit && (
        <>
          <motion.div
            style={{ y: imageY }}
            className="absolute inset-0 z-0"
          >
            <img src={image} alt={title} className="w-full h-full object-cover" />
          </motion.div>
          <div
            className="absolute inset-0 z-10"
            style={{ background: `linear-gradient(135deg, rgba(0,0,0,${(settings.overlayOpacity ?? 60) / 100}) 0%, rgba(0,0,0,${((settings.overlayOpacity ?? 60) / 100) * 0.5}) 100%)` }}
          />
        </>
      )}

      {/* Decorative orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl animate-pulse pointer-events-none" style={{ background: 'var(--accent)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl animate-pulse pointer-events-none" style={{ background: 'var(--primary)', animationDelay: '1s' }} />

      <div className="relative z-20 container mx-auto px-6 py-24" style={{ paddingTop: `${settings.paddingY || 120}px`, paddingBottom: `${settings.paddingY || 120}px` }}>
        <div className={`${isSplit ? 'grid lg:grid-cols-2 gap-16 items-center' : 'max-w-4xl mx-auto text-center'}`}>

          {/* Text Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="space-y-8"
          >
            {/* Badge */}
            {badgeText && (
              <motion.div variants={fadeUp}>
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border backdrop-blur-sm"
                  style={{ 
                    background: 'rgba(200,169,110,0.15)', 
                    borderColor: 'rgba(200,169,110,0.4)',
                    color: isSplit ? 'var(--accent)' : '#F5D58C'
                  }}>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: 'var(--accent)' }}></span>
                    <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: 'var(--accent)' }}></span>
                  </span>
                  {badgeText}
                </span>
              </motion.div>
            )}

            {/* Heading */}
            <motion.h1 variants={fadeUp} className="font-bold leading-[1.1] tracking-tight"
              style={{ 
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.5rem, 5vw, 5rem)',
                color: isSplit ? 'var(--text-primary)' : '#FFFFFF'
              }}>
              {title.split('\\n').map((line, i) => (
                <span key={i} className={`block ${i % 2 === 1 ? 'italic' : ''}`} style={{ color: i % 2 === 1 ? (isSplit ? 'var(--accent)' : '#C8A96E') : undefined }}>
                  {line}
                </span>
              ))}
            </motion.h1>

            {/* Subtitle */}
            <motion.p variants={fadeUp} className="text-lg leading-relaxed max-w-xl"
              style={{ color: isSplit ? 'color-mix(in srgb, var(--text-primary) 70%, transparent)' : 'rgba(255,255,255,0.8)' }}>
              {subtitle}
            </motion.p>

            {/* CTA */}
            <motion.div variants={fadeUp} className={`flex flex-wrap gap-4 ${!isSplit ? 'justify-center' : ''}`}>
              <Link href={buttonLink}
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                style={{ background: 'var(--accent)', color: 'var(--bg-primary)' }}>
                {buttonText}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <button className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-base border transition-all duration-300 hover:scale-105"
                style={{ borderColor: isSplit ? 'var(--text-primary)' : 'rgba(255,255,255,0.4)', color: isSplit ? 'var(--text-primary)' : '#fff', background: 'transparent' }}>
                <Play className="w-4 h-4 fill-current" />
                Hikayemiz
              </button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-6 pt-4">
              {[
                { icon: Star, label: '4.9/5 Puan', sub: '2.400+ Yorum' },
                { icon: Truck, label: 'Hızlı Kargo', sub: 'Türkiye Geneli' },
                { icon: Shield, label: '5 Yıl Garanti', sub: 'Tüm Ürünlerde' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex items-center gap-2.5 group">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(200,169,110,0.15)', color: isSplit ? 'var(--accent)' : '#C8A96E' }}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold" style={{ color: isSplit ? 'var(--text-primary)' : '#fff' }}>{label}</p>
                    <p className="text-[11px] opacity-60" style={{ color: isSplit ? 'var(--text-primary)' : '#fff' }}>{sub}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Image (Split Layout Only) */}
          {isSplit && (
            <motion.div variants={fadeIn} initial="hidden" animate="show" className="relative hidden lg:block">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] group">
                <motion.img
                  src={image}
                  alt={title}
                  style={{ y: imageY }}
                  className="w-full h-[110%] object-cover -mt-[5%] group-hover:scale-105 transition-transform duration-[2000ms]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              {/* Floating Stats Card */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="absolute -right-6 top-1/4 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-5 border border-zinc-100 dark:border-white/10"
                style={{ backdropFilter: 'blur(20px)' }}
              >
                <div className="flex items-center gap-3 mb-3">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-sm font-bold text-zinc-900 dark:text-white">4.9 / 5.0</p>
                <p className="text-xs text-zinc-500 mt-0.5">2.450 Değerlendirme</p>
              </motion.div>

              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="absolute -left-6 bottom-1/4 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-5 border border-zinc-100 dark:border-white/10"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--accent)' }}>
                    <Truck className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-zinc-900 dark:text-white">Aynı Gün Kargo</p>
                    <p className="text-xs text-zinc-500">Saat 14:00'e kadar</p>
                  </div>
                </div>
              </motion.div>

              {/* Decorative ring */}
              <div className="absolute -inset-4 rounded-3xl border-2 border-dashed opacity-20 pointer-events-none" style={{ borderColor: 'var(--accent)' }} />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
