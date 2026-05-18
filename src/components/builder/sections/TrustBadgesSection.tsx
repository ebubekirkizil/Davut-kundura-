"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Award, Clock, MapPin, Phone, Mail, Star, Truck, Shield } from 'lucide-react';

const TRUST_ITEMS = [
  { icon: Star, title: '40+ Yıllık Deneyim', desc: 'Pendik\'te güvenilir hizmet' },
  { icon: Shield, title: 'Kalite Garantisi', desc: 'Tüm ürünlerde güvence' },
  { icon: Truck, title: 'Hızlı Kargo', desc: 'Aynı gün sevkiyat' },
  { icon: Award, title: 'El İşçiliği', desc: 'Her ürün özenle yapılmış' },
];

interface TrustBadgesProps {
  settings: {
    bgColor?: string;
    iconColor?: string;
    paddingY?: number;
  };
  blocks?: any[];
}

export default function TrustBadgesSection({ settings, blocks }: TrustBadgesProps) {
  const bgColor = settings.bgColor || 'var(--bg-primary)';
  const paddingY = settings.paddingY || 60;

  const rawBlocks = blocks?.filter(b => b.type === 'badge_item') || [];
  
  const items = rawBlocks.length > 0
    ? rawBlocks.map((b, i) => ({
        icon: [Star, Shield, Truck, Award, Clock][i % 5],
        title: b.settings.title || 'Güven',
        desc: b.settings.subtitle || '',
      }))
    : TRUST_ITEMS;

  return (
    <section style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }} className="relative overflow-hidden">
      
      <div className="absolute inset-0 pointer-events-none border-y" style={{ borderColor: 'rgba(200,169,110,0.1)' }} />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {items.map(({ icon: Icon, title, desc }, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col md:flex-row items-center md:items-start gap-4 text-center md:text-left group"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
                style={{ background: 'rgba(200,169,110,0.12)', color: 'var(--accent)' }}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{title}</p>
                <p className="text-xs opacity-60 mt-0.5" style={{ color: 'var(--text-primary)' }}>{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
