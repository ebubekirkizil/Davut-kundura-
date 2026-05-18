"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const FALLBACK_TESTIMONIALS = [
  { id: 't1', name: 'Mehmet A.', role: 'İstanbul', text: 'Yıllardır Davut Kundura\'ya gidiyorum. El işçiliği muhteşem, kalite tartışılmaz. Gerçek deri kemer aldım, 3 yıldır kullanıyorum hala ilk günkü gibi.', rating: 5, avatar: 'MA' },
  { id: 't2', name: 'Fatma K.', role: 'Pendik', text: 'Ortopedik tabanlıklar gerçekten işe yarıyor! Sırt ağrılarım azaldı, gün boyu ayakta çalışsam bile yorulmuyorum. Kesinlikle tavsiye ederim.', rating: 5, avatar: 'FK' },
  { id: 't3', name: 'Ali R.', role: 'Kadıköy', text: 'Ayakkabı tamiri için gittim, ustanın işine olan saygısı ve titizliği beni çok etkiledi. Eski ayakkabım yeni gibi oldu. Fiyat/kalite mükemmel.', rating: 5, avatar: 'AR' },
];

interface TestimonialProps {
  settings: {
    title?: string;
    bgColor?: string;
    cardBg?: string;
    starColor?: string;
    paddingY?: number;
  };
  blocks?: any[];
}

export default function TestimonialsSection({ settings, blocks }: TestimonialProps) {
  const title = settings.title || 'Müşterilerimiz Ne Diyor?';
  const bgColor = settings.bgColor || 'color-mix(in srgb, var(--bg-primary) 95%, var(--accent) 5%)';
  const paddingY = settings.paddingY || 100;

  const rawTestimonials = blocks?.filter(b => b.type === 'testimonial_item') || [];
  const testimonials = rawTestimonials.length > 0
    ? rawTestimonials.map((b, i) => ({
        id: b.id,
        name: b.settings.name || 'Müşteri',
        role: b.settings.company || '',
        text: b.settings.text || '',
        rating: b.settings.rating || 5,
        avatar: (b.settings.name || 'M').slice(0, 2).toUpperCase(),
      }))
    : FALLBACK_TESTIMONIALS;

  return (
    <section style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }} className="relative overflow-hidden">
      
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 60% at 50% 50%, rgba(200,169,110,0.07), transparent)' }} />

      <div className="container mx-auto px-6 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 space-y-4"
        >
          <p className="text-sm font-bold tracking-[0.3em] uppercase" style={{ color: 'var(--accent)' }}>Müşteri Yorumları</p>
          <h2 className="font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', fontSize: 'clamp(1.8rem, 3vw, 3rem)' }}>
            {title}
          </h2>
          <div className="flex items-center justify-center gap-1 mt-2">
            {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />)}
            <span className="ml-2 font-bold" style={{ color: 'var(--text-primary)' }}>4.9</span>
            <span className="opacity-50 text-sm" style={{ color: 'var(--text-primary)' }}>(2,450 değerlendirme)</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="group relative p-8 rounded-2xl border transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
              style={{ 
                background: 'var(--bg-primary)',
                borderColor: 'rgba(200,169,110,0.15)',
              }}
            >
              {/* Quote mark */}
              <div className="absolute top-6 right-8 text-6xl font-serif leading-none opacity-10" style={{ color: 'var(--accent)' }}>"</div>

              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-sm leading-relaxed mb-6 opacity-80" style={{ color: 'var(--text-primary)' }}>
                "{t.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-5 border-t" style={{ borderColor: 'rgba(200,169,110,0.1)' }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                  style={{ background: 'linear-gradient(135deg, var(--accent), var(--primary))' }}>
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{t.name}</p>
                  {t.role && <p className="text-xs opacity-50" style={{ color: 'var(--text-primary)' }}>{t.role}</p>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
