"use client";

import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

interface FooterSectionProps {
  settings: {
    topBarText?: string;
    backgroundColor?: string;
  };
  blocks: Array<{
    id: string;
    type: string;
    settings: {
      title?: string;
      content?: string;
      links?: string;
      address?: string;
      phone?: string;
    };
  }>;
}

export default function FooterSection({ settings, blocks }: FooterSectionProps) {
  const topBarText = settings.topBarText || "PENDİK DAVUT KUNDURA • PREMIUM LEATHER CRAFTSMANSHIP • EST. 1980";
  const backgroundColor = settings.backgroundColor || "#1a1a1a";

  return (
    <footer style={{ backgroundColor }} className="text-white">
      {/* Top Bar */}
      <div className="border-b border-white/10 py-4 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">
          <span className="text-xs tracking-[0.3em] uppercase font-bold opacity-60">
            {topBarText} • {topBarText} • {topBarText}
          </span>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {blocks?.map((block) => (
            <div key={block.id} className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--accent)] mb-6">
                {block.settings.title || 'Başlık'}
              </h3>

              {/* Text Block */}
              {block.type === 'footer_text' && (
                <p className="text-sm text-white/70 leading-relaxed font-light">
                  {block.settings.content}
                </p>
              )}

              {/* Menu Block */}
              {block.type === 'footer_menu' && (
                <ul className="space-y-3">
                  {block.settings.links?.split('\n').map((link, idx) => (
                    <li key={idx}>
                      <a href="#" className="text-sm text-white/70 hover:text-[var(--accent)] transition-colors">
                        {link.trim()}
                      </a>
                    </li>
                  ))}
                </ul>
              )}

              {/* Contact Block */}
              {block.type === 'footer_contact' && (
                <div className="space-y-4">
                  {block.settings.address && (
                    <div className="flex items-start gap-3">
                      <MapPin size={16} className="text-[var(--accent)] mt-1 flex-shrink-0" />
                      <span className="text-sm text-white/70">{block.settings.address}</span>
                    </div>
                  )}
                  {block.settings.phone && (
                    <div className="flex items-center gap-3">
                      <Phone size={16} className="text-[var(--accent)] flex-shrink-0" />
                      <a href={`tel:${block.settings.phone}`} className="text-sm text-white/70 hover:text-[var(--accent)] transition-colors">
                        {block.settings.phone}
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-6">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} Davut Kundura. Tüm hakları saklıdır.
          </p>
          <p className="text-xs text-white/50">
            Powered by <span className="text-[var(--accent)]">Davut Studio</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
