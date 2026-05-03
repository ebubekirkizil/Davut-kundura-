"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface RichTextSectionProps {
  settings: {
    title?: string;
    content?: string;
  };
}

export default function RichTextSection({ settings }: RichTextSectionProps) {
  const title = settings.title || "Bir Adımdan Fazlası";
  const content = settings.content || "Her dikişinde bir hikaye, her derisinde bir ömürlük kalite.";

  return (
    <section className="py-24 px-6 md:px-12 bg-[var(--bg-primary)]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-3xl md:text-5xl font-serif text-[var(--text-primary)] mb-6">
          {title}
        </h2>
        <p className="text-lg md:text-xl text-[var(--text-secondary)] font-light leading-relaxed whitespace-pre-line">
          {content}
        </p>
      </motion.div>
    </section>
  );
}
