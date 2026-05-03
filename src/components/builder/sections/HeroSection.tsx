"use client";

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface HeroSectionProps {
  settings: {
    title?: string;
    subtitle?: string;
    buttonText?: string;
    alignment?: string;
  };
}

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export default function HeroSection({ settings }: HeroSectionProps) {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], [0, 250]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  const title = settings.title || "Zanaatın Yeni Yüzü";
  const subtitle = settings.subtitle || "Pendik'te yarım asırlık deri ustalığı, modern estetikle yeniden doğuyor.";
  const buttonText = settings.buttonText || "KEŞFETMEYE BAŞLA";
  const alignment = settings.alignment || "center";

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[var(--bg-primary)] via-[#f0ebe1] to-[#e6dfd1] opacity-70"></div>
        <img
          src="https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop"
          className="w-full h-full object-cover opacity-20 grayscale"
          alt="Hero Background"
        />
      </motion.div>

      {/* Content */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className={`relative z-10 px-4 max-w-4xl ${alignment === 'center' ? 'text-center' : 'text-left'}`}
      >
        <motion.span
          variants={fadeInUp}
          className="text-[var(--accent)] tracking-[0.3em] text-sm md:text-base font-medium mb-4 block uppercase"
        >
          Est. 1990 • Pendik, İstanbul
        </motion.span>

        <motion.h2
          variants={fadeInUp}
          className="text-5xl md:text-7xl lg:text-8xl font-serif text-[var(--text-primary)] leading-tight mb-6"
        >
          {title}
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          className="text-[var(--text-secondary)] font-sans text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light"
        >
          {subtitle}
        </motion.p>

        <motion.button
          variants={fadeInUp}
          className="bg-[var(--text-primary)] text-white px-10 py-4 rounded-none hover:bg-[var(--accent)] transition-colors duration-300 font-sans tracking-wide uppercase text-sm flex items-center mx-auto space-x-2 shadow-2xl"
        >
          <span>{buttonText}</span>
          <ChevronRight className="w-4 h-4" />
        </motion.button>
      </motion.div>
    </section>
  );
}
