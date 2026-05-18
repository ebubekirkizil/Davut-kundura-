"use client";

import React from 'react';
import { useBuilderStore } from '@/store/useBuilderStore';
import { ArrowUp, ArrowDown, Copy, Trash2 } from 'lucide-react';
import { SECTION_SCHEMAS } from '@/store/schema';

interface Props {
  sectionId: string;
  type: string;
  page: string;
  children: React.ReactNode;
}

export default function SectionOverlay({ sectionId, type, page, children }: Props) {
  const store = useBuilderStore();
  const isSelected = store.selectedId === sectionId;
  const label = SECTION_SCHEMAS[type]?.label || type;

  return (
    <div 
      className={`relative group transition-all duration-300 ${
        isSelected 
          ? 'ring-2 ring-amber-500 ring-offset-0 z-20' 
          : 'hover:ring-1 hover:ring-amber-500/50 hover:z-10'
      }`}
      onClick={(e) => {
        // Tıklamayı içeriye sızdırmadan doğrudan bölümü seç
        e.stopPropagation();
        store.setSelectedId(sectionId);
      }}
    >
      {/* 
        Bölümün üzerinde beliren hızlı eylem menüsü (Toolbar).
        Seçiliyken veya üzerine gelindiğinde görünür olur.
      */}
      <div 
        className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[98%] 
                    bg-slate-900 dark:bg-slate-800 text-white rounded-t-xl shadow-2xl px-2 py-1.5 
                    flex items-center gap-1 opacity-0 pointer-events-none 
                    group-hover:opacity-100 group-hover:pointer-events-auto group-hover:-translate-y-full
                    transition-all duration-200 z-50 border border-b-0 border-white/10
                    ${isSelected ? 'opacity-100 pointer-events-auto -translate-y-full' : ''}`}
      >
        <div className="text-[10px] font-black uppercase tracking-widest px-2 border-r border-white/20 whitespace-nowrap text-amber-400">
          {label}
        </div>
        
        <button 
          onClick={(e) => { e.stopPropagation(); store.moveSectionUp(page, sectionId); }} 
          className="p-1.5 hover:bg-white/20 rounded-lg transition-colors text-slate-300 hover:text-white" 
          title="Yukarı Taşı"
        >
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
        
        <button 
          onClick={(e) => { e.stopPropagation(); store.moveSectionDown(page, sectionId); }} 
          className="p-1.5 hover:bg-white/20 rounded-lg transition-colors text-slate-300 hover:text-white" 
          title="Aşağı Taşı"
        >
          <ArrowDown className="w-3.5 h-3.5" />
        </button>
        
        <button 
          onClick={(e) => { e.stopPropagation(); store.duplicateSection(page, sectionId); }} 
          className="p-1.5 hover:bg-white/20 rounded-lg transition-colors text-slate-300 hover:text-white" 
          title="Çoğalt"
        >
          <Copy className="w-3.5 h-3.5" />
        </button>
        
        <button 
          onClick={(e) => { e.stopPropagation(); if (confirm('Bölümü silmek istediğinize emin misiniz?')) store.removeSection(page, sectionId); }} 
          className="p-1.5 hover:bg-rose-500/80 rounded-lg transition-colors text-rose-400 hover:text-white" 
          title="Sil"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Gerçek bileşen içeriği */}
      <div className={isSelected ? 'opacity-100' : ''}>
        <div className={isSelected ? 'pointer-events-none' : ''}>
          {children}
        </div>
      </div>
    </div>
  );
}
