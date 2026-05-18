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

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function CategoryGridSection({ settings, blocks }: CategoryGridProps) {
  const title = settings.title || "Kategoriler";
  const subtitle = settings.subtitle;
  const bgColor = settings.bgColor || "transparent";
  const columns = settings.columns || 3;
  const paddingY = settings.paddingY || 80;

  const categories = blocks?.filter(b => b.type === 'category_item') || [];

  const colClass = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  }[columns] || "grid-cols-1 md:grid-cols-3";

  return (
    <section 
      style={{ backgroundColor: bgColor, paddingTop: `${paddingY}px`, paddingBottom: `${paddingY}px` }}
      className="relative overflow-hidden"
    >
      <div className="container mx-auto px-4">
        
        <div className="text-center mb-16 max-w-2xl mx-auto">
          {subtitle && (
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[var(--accent)] font-medium tracking-[0.2em] uppercase text-sm mb-3"
            >
              {subtitle}
            </motion.p>
          )}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-[var(--text-primary)]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {title}
          </motion.h2>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className={`grid gap-6 md:gap-8 ${colClass}`}
        >
          {categories.map((cat) => {
            const catTitle = cat.settings.title || "Kategori";
            const catImage = cat.settings.image || "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=2000&auto=format&fit=crop";
            const catLink = cat.settings.link || "#";
            const catDesc = cat.settings.description || "";

            return (
              <motion.div variants={itemVariants} key={cat.id} className="h-full">
                <Link href={catLink} className="group block h-full">
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-6 shadow-md border border-[var(--text-primary)]/5">
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500 z-10" />
                    
                    {/* Image */}
                    <motion.img 
                      src={catImage} 
                      alt={catTitle}
                      className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-in-out"
                    />

                    {/* Content */}
                    <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end items-start">
                      <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                        {catTitle}
                      </h3>
                      
                      {catDesc && (
                        <p className="text-white/80 text-sm mb-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                          {catDesc}
                        </p>
                      )}

                      <div className="flex items-center text-[var(--accent)] font-medium text-sm tracking-widest uppercase transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                        Keşfet <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
