"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Star, Heart, ShoppingBag, Eye } from 'lucide-react';

const FALLBACK_PRODUCTS = [
  { id: 'p1', title: 'Klasik Deri Oxford', price: '₺2.450', oldPrice: '₺3.200', image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=800&auto=format&fit=crop', badge: 'Çok Satan', rating: 4.9, reviews: 128 },
  { id: 'p2', title: 'El Yapımı Deri Kemer', price: '₺890', oldPrice: null, image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=800&auto=format&fit=crop', badge: 'Yeni', rating: 4.8, reviews: 64 },
  { id: 'p3', title: 'Ortopedik Tabanlık', price: '₺650', oldPrice: '₺850', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop', badge: '%24 İndirim', rating: 4.7, reviews: 89 },
  { id: 'p4', title: 'Deri Loafer Ayakkabı', price: '₺3.100', oldPrice: null, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop', badge: 'Premium', rating: 5.0, reviews: 42 },
];

interface ProductCarouselProps {
  settings: {
    title?: string;
    bgColor?: string;
    accentColor?: string;
    paddingY?: number;
  };
  blocks?: any[];
}

export default function ProductCarouselSection({ settings, blocks }: ProductCarouselProps) {
  const title = settings.title || 'Öne Çıkan Ürünler';
  const bgColor = settings.bgColor || 'var(--bg-primary)';
  const paddingY = settings.paddingY || 100;
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const rawProducts = blocks?.filter(b => b.type === 'product_item') || [];
  const products = rawProducts.length > 0
    ? rawProducts.map((b, i) => ({
        id: b.id,
        title: b.settings.title || `Ürün ${i + 1}`,
        price: b.settings.price || '₺0',
        oldPrice: b.settings.oldPrice || null,
        image: b.settings.image || FALLBACK_PRODUCTS[i % FALLBACK_PRODUCTS.length].image,
        badge: b.settings.badge || null,
        rating: 4.8,
        reviews: Math.floor(Math.random() * 100 + 20),
      }))
    : FALLBACK_PRODUCTS;

  return (
    <section style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }} className="relative overflow-hidden">
      
      {/* Subtle bg gradient */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(200,169,110,0.05), transparent)' }} />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex items-end justify-between mb-12"
        >
          <div className="space-y-2">
            <p className="text-sm font-bold tracking-[0.3em] uppercase" style={{ color: 'var(--accent)' }}>Koleksiyon</p>
            <h2 className="font-bold" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', fontSize: 'clamp(1.8rem, 3vw, 3rem)' }}>
              {title}
            </h2>
          </div>
          <Link href="/products" className="hidden md:flex items-center gap-2 text-sm font-semibold transition-colors hover:opacity-70" style={{ color: 'var(--accent)' }}>
            Tümünü Gör
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative cursor-pointer"
            >
              {/* Card */}
              <div className="rounded-2xl overflow-hidden border transition-all duration-500 hover:shadow-2xl hover:-translate-y-2" style={{ borderColor: 'rgba(200,169,110,0.1)', background: 'var(--bg-primary)' }}>
                
                {/* Image */}
                <div className="relative aspect-square overflow-hidden" style={{ background: 'rgba(200,169,110,0.05)' }}>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: 'var(--accent)' }}>
                      {product.badge}
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className={`absolute inset-0 bg-black/20 flex items-center justify-center gap-3 transition-all duration-300 ${hoveredId === product.id ? 'opacity-100' : 'opacity-0'}`}>
                    <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform" style={{ color: 'var(--text-primary)' }}>
                      <Heart className="w-4 h-4" />
                    </button>
                    <Link href={`/products`} className="px-5 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 shadow-lg hover:scale-105 transition-transform" style={{ background: 'var(--accent)', color: '#fff' }}>
                      <ShoppingBag className="w-4 h-4" />
                      Sepete Ekle
                    </Link>
                    <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform" style={{ color: 'var(--text-primary)' }}>
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4 space-y-2">
                  {/* Rating */}
                  <div className="flex items-center gap-1.5">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-xs opacity-50 ml-1" style={{ color: 'var(--text-primary)' }}>({product.reviews})</span>
                  </div>

                  <h3 className="font-semibold text-sm leading-snug" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
                    {product.title}
                  </h3>

                  <div className="flex items-center gap-2">
                    <span className="font-bold text-base" style={{ color: 'var(--accent)' }}>{product.price}</span>
                    {product.oldPrice && (
                      <span className="text-sm line-through opacity-40" style={{ color: 'var(--text-primary)' }}>{product.oldPrice}</span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile "See All" */}
        <div className="md:hidden text-center mt-10">
          <Link href="/products" className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-bold border transition-colors" style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}>
            Tüm Ürünleri Gör
          </Link>
        </div>
      </div>
    </section>
  );
}
