"use client";

import React from 'react';
import HeroSection from './sections/HeroSection';
import HeaderSection from './sections/HeaderSection';
import CategoryGridSection from './sections/CategoryGridSection';
import FooterSection from './sections/FooterSection';
import RichTextSection from './sections/RichTextSection';

interface Section {
  id: string;
  type: string;
  settings: Record<string, any>;
  blocks: Array<{
    id: string;
    type: string;
    settings: Record<string, any>;
  }>;
}

interface StorefrontRendererProps {
  initialSections: Section[];
}

export default function StorefrontRenderer({ initialSections }: StorefrontRendererProps) {
  // Section type'a göre doğru component'i render et
  const renderSection = (section: Section) => {
    switch (section.type) {
      case 'header':
        return (
          <HeaderSection
            key={section.id}
            settings={section.settings}
            blocks={section.blocks}
          />
        );

      case 'hero':
        return (
          <HeroSection
            key={section.id}
            settings={section.settings}
          />
        );

      case 'richText':
        return (
          <RichTextSection
            key={section.id}
            settings={section.settings}
          />
        );

      case 'categoryGrid':
        return (
          <CategoryGridSection
            key={section.id}
            settings={section.settings}
            blocks={section.blocks}
          />
        );

      case 'footer':
        return (
          <FooterSection
            key={section.id}
            settings={section.settings}
            blocks={section.blocks}
          />
        );

      default:
        // Bilinmeyen section type'lar için fallback
        return (
          <div key={section.id} className="py-12 px-6 bg-gray-100 text-center">
            <p className="text-sm text-gray-500">
              Section type "{section.type}" henüz desteklenmiyor
            </p>
          </div>
        );
    }
  };

  return (
    <div className="relative min-h-screen bg-[var(--bg-primary)] overflow-hidden">
      {initialSections.map(renderSection)}
    </div>
  );
}
