"use client";

import React, { useState, useEffect } from 'react';
import { Menu, ShoppingBag, X } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface HeaderSectionProps {
  settings: {
    logoText?: string;
    logoSize?: number;
    sticky?: boolean;
  };
  blocks: Array<{
    id: string;
    type: string;
    settings: {
      label?: string;
      link?: string;
    };
  }>;
}

export default function HeaderSection({ settings, blocks }: HeaderSectionProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logoText = settings.logoText || "DAVUT KUNDURA";
  const logoSize = settings.logoSize || 24;
  const sticky = settings.sticky !== false;

  return (
    <motion.header
      className={`${sticky ? 'fixed' : 'relative'} top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled ? 'bg-white/90 backdrop-blur-xl shadow-lg py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden w-6 h-6 text-[var(--text-primary)] cursor-pointer hover:text-[var(--accent)] transition-colors"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo */}
        <Link href="/">
          <h1
            className="font-serif tracking-widest uppercase text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors cursor-pointer"
            style={{ fontSize: `${logoSize}px` }}
          >
            {logoText}
          </h1>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-8">
          {blocks?.map((block) => (
            <Link
              key={block.id}
              href={block.settings.link || '/'}
              className="text-sm font-medium tracking-wider uppercase text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
            >
              {block.settings.label || 'Menü'}
            </Link>
          ))}
        </nav>

        {/* Cart Icon */}
        <div className="relative group cursor-pointer">
          <ShoppingBag className="w-6 h-6 text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors" />
          <span className="absolute -top-2 -right-2 bg-[var(--accent)] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
            0
          </span>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-2xl border-t border-[var(--border)]"
        >
          <nav className="flex flex-col p-6 space-y-4">
            {blocks?.map((block) => (
              <Link
                key={block.id}
                href={block.settings.link || '/'}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium tracking-wider uppercase text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors py-2"
              >
                {block.settings.label || 'Menü'}
              </Link>
            ))}
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
}
