"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, Search, User } from 'lucide-react';
import Link from 'next/link';

interface HeaderProps {
  settings: {
    logoText?: string;
    logoImage?: string;
    logoSize?: number;
    sticky?: boolean;
    bgColor?: string;
    textColor?: string;
  };
  blocks?: any[];
}

export default function HeaderSection({ settings, blocks }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!settings.sticky) return;
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [settings.sticky]);

  const logoSize = settings.logoSize || 24;
  const isSticky = settings.sticky;
  const bgColor = settings.bgColor || 'var(--bg-primary)';
  const textColor = settings.textColor || 'var(--text-primary)';

  const navItems = blocks?.filter(b => b.type === 'menu_item') || [];

  return (
    <>
      <header 
        className={`${isSticky ? 'fixed top-0 left-0 right-0 z-50 transition-all duration-500' : 'relative z-50'} ${
          isScrolled && isSticky 
            ? 'py-3 backdrop-blur-md shadow-sm border-b border-[var(--text-primary)]/5' 
            : 'py-6'
        }`}
        style={{ 
          backgroundColor: isScrolled ? `${bgColor}E6` : bgColor, // E6 is 90% opacity hex
          color: textColor 
        }}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            
            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex-1">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 -ml-2"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Logo */}
            <div className="flex-shrink-0 flex items-center justify-center md:justify-start flex-1 md:flex-none">
              <Link href="/">
                {settings.logoImage ? (
                  <img 
                    src={settings.logoImage} 
                    alt={settings.logoText || "Logo"} 
                    style={{ height: `${logoSize}px` }}
                    className="object-contain transition-transform hover:scale-105 duration-300"
                  />
                ) : (
                  <span 
                    style={{ fontSize: `${logoSize}px`, fontFamily: 'var(--font-heading)' }}
                    className="font-bold tracking-widest uppercase transition-colors"
                  >
                    {settings.logoText || "DAVUT KUNDURA"}
                  </span>
                )}
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center justify-center flex-1 space-x-8">
              {navItems.map((item) => (
                <Link 
                  key={item.id} 
                  href={item.settings.link || "#"}
                  className="relative text-sm font-medium tracking-wide uppercase group overflow-hidden"
                >
                  <span className="relative z-10 group-hover:text-[var(--accent)] transition-colors duration-300">
                    {item.settings.label}
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[var(--accent)] transform -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                </Link>
              ))}
            </nav>

            {/* Icons */}
            <div className="flex items-center justify-end flex-1 space-x-4 md:space-x-6">
              <button className="hover:text-[var(--accent)] transition-colors hover:scale-110 duration-200">
                <Search className="w-5 h-5" />
              </button>
              <button className="hover:text-[var(--accent)] transition-colors hover:scale-110 duration-200 hidden sm:block">
                <User className="w-5 h-5" />
              </button>
              <button className="relative hover:text-[var(--accent)] transition-colors hover:scale-110 duration-200">
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[var(--accent)] text-[var(--bg-primary)] text-[9px] font-bold flex items-center justify-center rounded-full">
                  0
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden fixed top-[60px] left-0 right-0 z-40 overflow-hidden border-b border-[var(--text-primary)]/10"
            style={{ backgroundColor: bgColor, color: textColor }}
          >
            <nav className="flex flex-col px-4 py-6 space-y-4 shadow-2xl">
              {navItems.map((item, i) => (
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  key={item.id}
                >
                  <Link 
                    href={item.settings.link || "#"}
                    className="block text-lg font-medium tracking-wide border-b border-[var(--text-primary)]/10 pb-3 hover:text-[var(--accent)] transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.settings.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Spacer for sticky header so content doesn't jump */}
      {isSticky && <div className="h-[88px]" />}
    </>
  );
}
