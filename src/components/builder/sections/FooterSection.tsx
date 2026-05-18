"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, CreditCard } from 'lucide-react';
import Link from 'next/link';

interface FooterProps {
  settings: {
    topBarText?: string;
    backgroundColor?: string;
    textColor?: string;
  };
  blocks?: any[];
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function FooterSection({ settings, blocks }: FooterProps) {
  const topBarText = settings.topBarText || "DAVUT KUNDURA PENDİK • GELENEKSEL DERİ İŞÇİLİĞİ";
  const bgColor = settings.backgroundColor || "var(--bg-primary)";
  const textColor = settings.textColor || "var(--text-primary)";

  const texts = blocks?.filter(b => b.type === 'footer_text') || [];
  const links = blocks?.filter(b => b.type === 'footer_links') || [];
  const contacts = blocks?.filter(b => b.type === 'footer_contact') || [];

  return (
    <footer 
      style={{ backgroundColor: bgColor, color: textColor }} 
      className="relative pt-16 pb-8 border-t border-[var(--text-primary)]/10 overflow-hidden"
    >
      {/* Top Banner (Optional Marquee or static text) */}
      {topBarText && (
        <div className="absolute top-0 left-0 w-full bg-[var(--accent)] text-[var(--bg-primary)] py-2 text-center text-xs font-bold tracking-[0.2em] uppercase">
          {topBarText}
        </div>
      )}

      <div className="container mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand & Text Block */}
          <motion.div 
            variants={fadeInUp} 
            initial="hidden" 
            whileInView="show" 
            viewport={{ once: true }}
            className="space-y-6"
          >
            {texts.length > 0 ? (
              <>
                <h3 className="text-2xl font-bold tracking-widest" style={{ fontFamily: "var(--font-heading)" }}>
                  {texts[0].settings.title}
                </h3>
                <p className="opacity-70 leading-relaxed text-sm">
                  {texts[0].settings.content}
                </p>
              </>
            ) : (
              <>
                <h3 className="text-2xl font-bold tracking-widest" style={{ fontFamily: "var(--font-heading)" }}>
                  DAVUT KUNDURA
                </h3>
                <p className="opacity-70 leading-relaxed text-sm">
                  Pendik'te yarım asırlık deri işçiliği ve ortopedik ayakkabı bakımı. Kalite ve zarafet ayaklarınızda.
                </p>
              </>
            )}

            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full border border-[var(--text-primary)]/20 flex items-center justify-center hover:bg-[var(--accent)] hover:text-[var(--bg-primary)] hover:border-[var(--accent)] transition-all duration-300">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-[var(--text-primary)]/20 flex items-center justify-center hover:bg-[var(--accent)] hover:text-[var(--bg-primary)] hover:border-[var(--accent)] transition-all duration-300">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-[var(--text-primary)]/20 flex items-center justify-center hover:bg-[var(--accent)] hover:text-[var(--bg-primary)] hover:border-[var(--accent)] transition-all duration-300">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
            </div>
          </motion.div>

          {/* Links Block 1 */}
          <motion.div 
            variants={fadeInUp} 
            initial="hidden" 
            whileInView="show" 
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h4 className="text-lg font-bold" style={{ fontFamily: "var(--font-heading)" }}>Alışveriş</h4>
            <ul className="space-y-3 opacity-80 text-sm">
              <li><Link href="/products" className="hover:text-[var(--accent)] transition-colors">Tüm Ürünler</Link></li>
              <li><Link href="/products?cat=tabanlik" className="hover:text-[var(--accent)] transition-colors">Ortopedik Tabanlıklar</Link></li>
              <li><Link href="/products?cat=kemer" className="hover:text-[var(--accent)] transition-colors">Hakiki Deri Kemerler</Link></li>
              <li><Link href="/products?cat=bakim" className="hover:text-[var(--accent)] transition-colors">Bakım Ürünleri</Link></li>
            </ul>
          </motion.div>

          {/* Links Block 2 */}
          <motion.div 
            variants={fadeInUp} 
            initial="hidden" 
            whileInView="show" 
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h4 className="text-lg font-bold" style={{ fontFamily: "var(--font-heading)" }}>Destek</h4>
            <ul className="space-y-3 opacity-80 text-sm">
              <li><Link href="#" className="hover:text-[var(--accent)] transition-colors">Sıkça Sorulan Sorular</Link></li>
              <li><Link href="#" className="hover:text-[var(--accent)] transition-colors">Kargo & İade</Link></li>
              <li><Link href="#" className="hover:text-[var(--accent)] transition-colors">Gizlilik Politikası</Link></li>
            </ul>
          </motion.div>

          {/* Contact Block */}
          <motion.div 
            variants={fadeInUp} 
            initial="hidden" 
            whileInView="show" 
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h4 className="text-lg font-bold" style={{ fontFamily: "var(--font-heading)" }}>
              {contacts.length > 0 ? contacts[0].settings.title : "İletişim"}
            </h4>
            <ul className="space-y-4 opacity-80 text-sm">
              <li className="flex items-start space-x-3 group">
                <MapPin className="w-5 h-5 text-[var(--accent)] mt-0.5 group-hover:scale-110 transition-transform" />
                <span>{contacts.length > 0 ? contacts[0].settings.address : "Doğu Mah. Flurya Sok. No:2/B Pendik, İstanbul"}</span>
              </li>
              <li className="flex items-center space-x-3 group">
                <Phone className="w-5 h-5 text-[var(--accent)] group-hover:scale-110 transition-transform" />
                <span>{contacts.length > 0 ? contacts[0].settings.phone : "+90 538 625 87 92"}</span>
              </li>
              <li className="flex items-center space-x-3 group">
                <Mail className="w-5 h-5 text-[var(--accent)] group-hover:scale-110 transition-transform" />
                <span>info@davutkundura.com</span>
              </li>
            </ul>
          </motion.div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[var(--text-primary)]/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-xs opacity-60">
          <p>© {new Date().getFullYear()} Davut Kundura. Tüm hakları saklıdır.</p>
          
          <div className="flex space-x-4">
             {/* Payment Icons */}
             <div className="flex space-x-3 items-center opacity-70 hover:opacity-100 transition-opacity">
               {/* Troy Logo */}
               <svg width="32" height="20" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <rect width="100" height="60" rx="8" fill="white"/>
                 <path d="M72.5 39H79L70.5 21H64L72.5 39Z" fill="#00A7A1"/>
                 <path d="M57.5 39H64L55.5 21H49L57.5 39Z" fill="#F8A01A"/>
                 <path d="M42.5 39H49L40.5 21H34L42.5 39Z" fill="#E6332A"/>
               </svg>
               {/* Visa Logo */}
               <svg width="32" height="20" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <rect width="100" height="60" rx="8" fill="white"/>
                 <path d="M40.2 38.8L44.8 21H51.4L46.8 38.8H40.2ZM65.8 21.4C64.6 21.1 62.7 20.8 60.3 20.8C53.8 20.8 49.3 24.3 49.3 29.3C49.3 33 52.8 35 55.4 36.3C58 37.6 58.9 38.4 58.9 39.5C58.9 41.2 56.8 42 54.4 42C51.5 42 49.8 41.2 48.2 40.5L47.2 40L46.2 44.8C47.8 45.5 50.5 46.2 53.4 46.2C60.3 46.2 64.9 42.8 64.9 37.5C64.9 31.2 55.5 30.9 55.5 28.1C55.5 26.8 56.8 25.3 59.5 25.3C61.5 25.3 63.2 25.8 64.6 26.4L65.3 26.7L66.3 21.9L65.8 21.4ZM84.7 38.8H90.5L84.6 21H79.6C78.1 21 76.9 21.9 76.3 23.3L65.3 38.8H71.9L73.2 35.1H81.3L82.1 38.8H84.7ZM75.1 29.8L78.4 20.9L80.3 29.8H75.1ZM33.5 21L26.3 38.8H20.1L21.4 32.5L24.8 21H33.5Z" fill="#1434CB"/>
               </svg>
               {/* Mastercard Logo */}
               <svg width="32" height="20" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <rect width="100" height="60" rx="8" fill="white"/>
                 <circle cx="40" cy="30" r="14" fill="#EB001B"/>
                 <circle cx="60" cy="30" r="14" fill="#F79E1B"/>
                 <path d="M50 40C53.7 37.6 56 34.1 56 30C56 25.9 53.7 22.4 50 20C46.3 22.4 44 25.9 44 30C44 34.1 46.3 37.6 50 40Z" fill="#FF5F00"/>
               </svg>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
