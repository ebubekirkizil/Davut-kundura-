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
              <li><Link href="#" className="hover:text-[var(--accent)] transition-colors">Erkek Ayakkabı</Link></li>
              <li><Link href="#" className="hover:text-[var(--accent)] transition-colors">Kadın Ayakkabı</Link></li>
              <li><Link href="#" className="hover:text-[var(--accent)] transition-colors">Ortopedik Tabanlıklar</Link></li>
              <li><Link href="#" className="hover:text-[var(--accent)] transition-colors">Hakiki Deri Kemerler</Link></li>
              <li><Link href="#" className="hover:text-[var(--accent)] transition-colors">Bakım Ürünleri</Link></li>
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
            <h4 className="text-lg font-bold" style={{ fontFamily: "var(--font-heading)" }}>Kurumsal</h4>
            <ul className="space-y-3 opacity-80 text-sm">
              <li><Link href="#" className="hover:text-[var(--accent)] transition-colors">Hakkımızda</Link></li>
              <li><Link href="#" className="hover:text-[var(--accent)] transition-colors">Sıkça Sorulan Sorular</Link></li>
              <li><Link href="#" className="hover:text-[var(--accent)] transition-colors">Kargo & İade</Link></li>
              <li><Link href="#" className="hover:text-[var(--accent)] transition-colors">Gizlilik Politikası</Link></li>
              <li><Link href="#" className="hover:text-[var(--accent)] transition-colors">İletişim</Link></li>
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
             {/* Payment Icons Placeholder */}
             <div className="flex space-x-2">
               <CreditCard className="w-6 h-6" />
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
