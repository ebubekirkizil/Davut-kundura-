"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SECTION_SCHEMAS } from "./schema";

export interface Block {
  id: string;
  type: string;
  settings: Record<string, any>;
}

export interface Section {
  id: string;
  type: string;
  settings: Record<string, any>;
  blocks: Block[];
}

interface BuilderState {
  activePage: string;
  selectedId: string | null;
  viewMode: "desktop" | "mobile";
  pages: Record<string, { sections: Section[] }>;
  
  setActivePage: (page: string) => void;
  setSelectedId: (id: string | null) => void;
  setViewMode: (mode: "desktop" | "mobile") => void;
  
  addSection: (page: string, sectionType: string) => void;
  removeSection: (page: string, sectionId: string) => void;
  updateSection: (page: string, sectionId: string, settings: Record<string, any>) => void;
  reorderSections: (page: string, newOrder: Section[]) => void;
  
  addBlock: (page: string, sectionId: string, blockType: string) => void;
  removeBlock: (page: string, sectionId: string, blockId: string) => void;
  updateBlock: (page: string, sectionId: string, blockId: string, settings: Record<string, any>) => void;
  
  resetState: () => void;
}

export const useBuilderStore = create<BuilderState>()(
  persist(
    (set) => ({
      activePage: "index",
      selectedId: null,
      viewMode: "desktop",
      pages: {
        index: {
          sections: [
            {
              id: "header-1",
              type: "header",
              settings: { logoText: "DAVUT KUNDURA", logoSize: 24, sticky: true },
              blocks: [
                { id: "h-b-1", type: "menu_item", settings: { label: "ANA SAYFA", link: "/" } },
                { id: "h-b-2", type: "menu_item", settings: { label: "ERKEK", link: "/erkek" } },
                { id: "h-b-3", type: "menu_item", settings: { label: "KADIN", link: "/kadin" } }
              ]
            },
            {
              id: "hero-1",
              type: "hero",
              settings: { title: "Zarafetin Adımları", subtitle: "Premium Deri Koleksiyonu", buttonText: "Keşfet" },
              blocks: []
            },
            {
              id: "footer-1",
              type: "footer",
              settings: { topBarText: "EL İŞÇİLİĞİ • ÜCRETSİZ KARGO", footerLogo: "DAVUT KUNDURA" },
              blocks: [
                { id: "f-b-1", type: "footer_column", settings: { title: "HIZLI MENÜ", links: "Tüm Ürünler\nHakkımızda\nİletişim" } },
                { id: "f-b-2", type: "footer_column", settings: { title: "BİLGİ", links: "İade Politikası\nKargo Takibi" } }
              ]
            }
          ]
        },
        products: { sections: [] }
      },

      setActivePage: (page) => set({ activePage: page, selectedId: null }),
      setSelectedId: (id) => set({ selectedId: id }),
      setViewMode: (mode) => set({ viewMode: mode }),

      addSection: (page, type) => set((state) => {
        const schema = SECTION_SCHEMAS[type];
        const newSection: Section = {
          id: `sec_${Math.random().toString(36).substr(2, 9)}`,
          type,
          settings: schema?.settings.reduce((acc, s) => ({ ...acc, [s.id]: s.default }), {}) || {},
          blocks: []
        };
        return { pages: { ...state.pages, [page]: { ...state.pages[page], sections: [...state.pages[page].sections, newSection] } }, selectedId: newSection.id };
      }),

      removeSection: (page, id) => set((state) => ({
        pages: { ...state.pages, [page]: { ...state.pages[page], sections: state.pages[page].sections.filter(s => s.id !== id) } },
        selectedId: null
      })),

      updateSection: (page, id, settings) => set((state) => ({
        pages: { ...state.pages, [page]: { ...state.pages[page], sections: state.pages[page].sections.map(s => s.id === id ? { ...s, settings: { ...s.settings, ...settings } } : s) } }
      })),

      reorderSections: (page, sections) => set((state) => ({ pages: { ...state.pages, [page]: { ...state.pages[page], sections } } })),

      addBlock: (page, sectionId, type) => set((state) => ({
        pages: { ...state.pages, [page]: { ...state.pages[page], sections: state.pages[page].sections.map(s => s.id === sectionId ? { ...s, blocks: [...s.blocks, { id: `blk_${Math.random().toString(36).substr(2, 9)}`, type, settings: {} }] } : s) } }
      })),

      removeBlock: (page, sectionId, blockId) => set((state) => ({
        pages: { ...state.pages, [page]: { ...state.pages[page], sections: state.pages[page].sections.map(s => s.id === sectionId ? { ...s, blocks: s.blocks.filter(b => b.id !== blockId) } : s) } }
      })),

      updateBlock: (page, sectionId, blockId, settings) => set((state) => ({
        pages: { ...state.pages, [page]: { ...state.pages[page], sections: state.pages[page].sections.map(s => s.id === sectionId ? { ...s, blocks: s.blocks.map(b => b.id === blockId ? { ...b, settings: { ...b.settings, ...settings } } : b) } : s) } }
      })),

      resetState: () => {
        localStorage.removeItem("davut-builder-storage");
        window.location.reload();
      }
    }),
    { name: "davut-builder-storage" }
  )
);
