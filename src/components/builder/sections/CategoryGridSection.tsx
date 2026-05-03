"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface CategoryGridSectionProps {
  settings: {
    title?: string;
    subtitle?: string;
  };
  blocks: Array<{
    id: string;
    type: string;
    settings: {
      title?: string;
      image?: string;
      link?: string;
    };
  }>;
}

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function CategoryGridSection({ settings, blocks }: CategoryGridSectionProps) {
  const title = settings.title || "SEÇKİN ÜRÜN GRUPLARI";
  const subtitle = settings.subtitle || "Her detayda mükemmellik arayanlar için özel olarak tasarlandı.";

  return (
    <section className="py-24 px-6 md:px-12 bg-[var(--bg-secondary)]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-serif text-[var(--text-primary)] mb-4 uppercase tracking-wider">
            {title}
          </h2>
          <p className="text-[var(--text-secondary)] text-lg font-light">
            {subtitle}
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {blocks?.map((block) => (
            <motion.div
              key={block.id}
              variants={fadeInUp}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
            >
              {/* Image */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/20 to-[var(--text-primary)]/10">
                {block.settings.image && (
                  <img
                    src={block.settings.image}
                    alt={block.settings.title || 'Kategori'}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                  />
                )}
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--text-primary)]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-2xl font-serif text-white mb-2 group-hover:text-[var(--accent)] transition-colors">
                  {block.settings.title || 'Kategori'}
                </h3>
                <div className="flex items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-sm uppercase tracking-wider mr-2">Keşfet</span>
                  <ChevronRight size={16} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
