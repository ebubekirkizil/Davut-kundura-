"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface CategoryGridProps {
  settings: {
    title?: string;
    subtitle?: string;
    bgColor?: string;
    columns?: number;
    paddingY?: number;
  };
  blocks?: any[];
}

const FALLBACK_CATEGORIES = [
  {
    id: 'fc-1', type: 'category_item',
    settings: {
      title: 'Klasik Ayakkabılar',
      description: 'El yapımı, deri tabanlı zarafet',
      image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=800&auto=format&fit=crop',
      link: '/products',
    }
  },
  {
    id: 'fc-2', type: 'category_item',
    settings: {
      title: 'Hakiki Deri Kemerler',
      description: 'Saf deri, özenli işçilik',
      image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=800&auto=format&fit=crop',
      link: '/products',
    }
  },
  {
    id: 'fc-3', type: 'category_item',
    settings: {
      title: 'Ortopedik Tabanlıklar',
      description: 'Sağlıklı yürüyüş için destek',
      image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop',
      link: '/products',
    }
  },
];

export default function CategoryGridSection({ settings, blocks }: CategoryGridProps) {
  const title = settings.title || 'Kategoriler';
  const subtitle = settings.subtitle;
  const bgColor = settings.bgColor || 'var(--bg-primary)';
  const columns = settings.columns || 3;
  const paddingY = settings.paddingY || 100;

  const rawCategories = blocks?.filter(b => b.type === 'category_item') || [];
  const categories = rawCategories.length > 0 ? rawCategories : FALLBACK_CATEGORIES;

  const colClass: Record<number, string> = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <section style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }} className="relative overflow-hidden">

      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(200,169,110,0.06), transparent)' }} />

      <div className="container mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 space-y-4"
        >
          {subtitle && (
            <p className="text-sm font-bold tracking-[0.3em] uppercase" style={{ color: 'var(--accent)' }}>
              {subtitle}
            </p>
          )}
          <h2 className="font-bold" style={{
            fontFamily: 'var(--font-heading)',
            color: 'var(--text-primary)',
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          }}>
            {title}
          </h2>
          <div className="w-16 h-1 mx-auto rounded-full" style={{ background: 'var(--accent)' }} />
        </motion.div>

        {/* Grid */}
        <div className={`grid gap-6 ${colClass[columns] || colClass[3]}`}>
          {categories.map((cat, idx) => {
            const s = cat.settings;
            const catImage = s.image || `https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop`;
            const catTitle = s.title || 'Kategori';
            const catDesc = s.description || s.desc || '';
            const catLink = s.link || '#';

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: idx * 0.15 }}
              >
                <Link href={catLink} className="group block h-full">
                  {/* Image */}
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-5 shadow-lg">
                    <img
                      src={catImage}
                      alt={catTitle}
                      className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

                    {/* Hover CTA */}
                    <div className="absolute inset-0 flex items-end justify-between p-6 z-10">
                      <div className="transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="text-white text-xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>{catTitle}</h3>
                        {catDesc && (
                          <p className="text-white/70 text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">{catDesc}</p>
                        )}
                      </div>
                      <div className="w-10 h-10 rounded-full flex items-center justify-center transform opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300" style={{ background: 'var(--accent)' }}>
                        <ArrowRight className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
