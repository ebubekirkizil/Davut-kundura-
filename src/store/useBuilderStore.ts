"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SECTION_SCHEMAS } from "./schema";

/**
 * CORE TYPES
 */
export interface Section {
  id: string;
  type: string;
  settings: Record<string, any>;
  blocks: Block[];
}

export interface Block {
  id: string;
  type: string;
  settings: Record<string, any>;
}

export interface ThemeSettings {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    accent: string;
  };
  typography: {
    headingFont: string;
    bodyFont: string;
    baseSize: number;
  };
  layout: {
    containerWidth: number;
    gridGap: number;
  };
}

interface BuilderState {
  // Navigation
  activePage: string;
  selectedId: string | null; // ID of the section or block being edited
  viewMode: "desktop" | "mobile";
  
  // Data
  pages: Record<string, { sections: Section[] }>;
  themeSettings: ThemeSettings;
  
  // Actions
  setActivePage: (page: string) => void;
  setSelectedId: (id: string | null) => void;
  setViewMode: (mode: "desktop" | "mobile") => void;
  
  addSection: (page: string, sectionType: string) => void;
  removeSection: (page: string, sectionId: string) => void;
  updateSection: (page: string, sectionId: string, settings: Record<string, any>) => void;
  reorderSections: (page: string, newOrder: Section[]) => void;
  
  addBlock: (page: string, sectionId: string, blockType: string) => void;
  updateBlock: (page: string, sectionId: string, blockId: string, settings: Record<string, any>) => void;
  
  updateThemeSettings: (settings: Partial<ThemeSettings>) => void;
  resetState: () => void;
}

/**
 * INITIAL STATE
 */
const DEFAULT_THEME: ThemeSettings = {
  colors: {
    primary: "#1a1a1a",
    secondary: "#ffffff",
    background: "#ffffff",
    text: "#202223",
    accent: "#008060"
  },
  typography: {
    headingFont: "Inter",
    bodyFont: "Inter",
    baseSize: 16
  },
  layout: {
    containerWidth: 1200,
    gridGap: 24
  }
};

export const useBuilderStore = create<BuilderState>()(
  persist(
    (set) => ({
      activePage: "index",
      selectedId: null,
      viewMode: "desktop",
      themeSettings: DEFAULT_THEME,
      pages: {
        index: {
          sections: [
            {
              id: "header-1",
              type: "header",
              settings: {
                logoText: "DAVUT KUNDURA",
                menu1: "ANA SAYFA",
                menu2: "ERKEK",
                menu3: "KADIN",
                menu4: "KOLEKSİYON",
                sticky: true
              },
              blocks: []
            },
            {
              id: "hero-1",
              type: "hero",
              settings: {
                title: "Zarafetin Adımları",
                subtitle: "Premium Deri Koleksiyonu",
                buttonText: "Keşfet",
                alignment: "center",
                overlayOpacity: 40
              },
              blocks: []
            },
            {
              id: "footer-1",
              type: "footer",
              settings: {
                topBarText: "EL İŞÇİLİĞİ • PREMIUM KALİTE • ÜCRETSİZ KARGO",
                footerLogo: "DAVUT KUNDURA",
                footerAbout: "Yılların verdiği tecrübe ile en kaliteli deri ürünleri, özel yapım kemerler ve profesyonel ayakkabı bakım ürünlerinde güvenilir adresiniz.",
                titleMenu: "HIZLI MENÜ",
                titleCats: "KATEGORİLER",
                titleContact: "İLETİŞİM",
                address: "Merkez Mah. Ayakkabıcılar Çarşısı, İstanbul, Türkiye",
                phone: "+90 (555) 123 45 67",
                email: "info@davutkundura.com"
              },
              blocks: []
            }
          ]
        },
        products: { sections: [] },
        collections: { sections: [] }
      },

      setActivePage: (page) => set({ activePage: page, selectedId: null }),
      setSelectedId: (id) => set({ selectedId: id }),
      setViewMode: (mode) => set({ viewMode: mode }),

      addSection: (page, sectionType) => set((state) => {
        const schema = SECTION_SCHEMAS[sectionType];
        const defaultSettings = schema 
          ? schema.settings.reduce((acc, s) => ({ ...acc, [s.id]: s.default }), {})
          : {};

        const newSection: Section = {
          id: `sec_${Math.random().toString(36).substr(2, 9)}`,
          type: sectionType,
          settings: defaultSettings,
          blocks: []
        };
        const pageData = state.pages[page] || { sections: [] };
        return {
          pages: {
            ...state.pages,
            [page]: { ...pageData, sections: [...pageData.sections, newSection] }
          },
          selectedId: newSection.id
        };
      }),

      removeSection: (page, sectionId) => set((state) => {
        const pageData = state.pages[page];
        if (!pageData) return state;
        return {
          pages: {
            ...state.pages,
            [page]: { ...pageData, sections: pageData.sections.filter(s => s.id !== sectionId) }
          },
          selectedId: state.selectedId === sectionId ? null : state.selectedId
        };
      }),

      updateSection: (page, sectionId, newSettings) => set((state) => {
        const pageData = state.pages[page];
        if (!pageData) return state;
        return {
          pages: {
            ...state.pages,
            [page]: {
              ...pageData,
              sections: pageData.sections.map(s => 
                s.id === sectionId ? { ...s, settings: { ...s.settings, ...newSettings } } : s
              )
            }
          }
        };
      }),

      reorderSections: (page, newOrder) => set((state) => ({
        pages: {
          ...state.pages,
          [page]: { ...state.pages[page], sections: newOrder }
        }
      })),

      addBlock: (page, sectionId, blockType) => set((state) => {
        const pageData = state.pages[page];
        const newBlock: Block = {
          id: `blk_${Math.random().toString(36).substr(2, 9)}`,
          type: blockType,
          settings: {}
        };
        return {
          pages: {
            ...state.pages,
            [page]: {
              ...pageData,
              sections: pageData.sections.map(s => 
                s.id === sectionId ? { ...s, blocks: [...s.blocks, newBlock] } : s
              )
            }
          },
          selectedId: newBlock.id
        };
      }),

      updateBlock: (page, sectionId, blockId, newSettings) => set((state) => {
        const pageData = state.pages[page];
        return {
          pages: {
            ...state.pages,
            [page]: {
              ...pageData,
              sections: pageData.sections.map(s => 
                s.id === sectionId ? {
                  ...s,
                  blocks: s.blocks.map(b => b.id === blockId ? { ...b, settings: { ...b.settings, ...newSettings } } : b)
                } : s
              )
            }
          }
        };
      }),

      updateThemeSettings: (newSettings) => set((state) => ({
        themeSettings: { ...state.themeSettings, ...newSettings }
      })),

      resetState: () => set({
        pages: {
          index: {
            sections: [
              {
                id: "header-1",
                type: "header",
                settings: {
                  logoText: "DAVUT KUNDURA",
                  logoSize: 24,
                  menu1: "ANA SAYFA", link1: "/",
                  menu2: "ERKEK", link2: "/collections/erkek",
                  menu3: "KADIN", link3: "/collections/kadin",
                  menu4: "KOLEKSİYON", link4: "/collections/all",
                  sticky: true
                },
                blocks: []
              },
              {
                id: "hero-1",
                type: "hero",
                settings: {
                  title: "Zarafetin Adımları",
                  subtitle: "Premium Deri Koleksiyonu",
                  buttonText: "Keşfet",
                  alignment: "center",
                  overlayOpacity: 40
                },
                blocks: []
              },
              {
                id: "footer-1",
                type: "footer",
                settings: {
                  topBarText: "EL İŞÇİLİĞİ • PREMIUM KALİTE • ÜCRETSİZ KARGO",
                  footerLogo: "DAVUT KUNDURA",
                  footerAbout: "Yılların verdiği tecrübe ile en kaliteli deri ürünleri, özel yapım kemerler ve profesyonel ayakkabı bakım ürünlerinde güvenilir adresiniz.",
                  address: "Merkez Mah. Ayakkabıcılar Çarşısı, İstanbul, Türkiye",
                  phone: "+90 (555) 123 45 67",
                  email: "info@davutkundura.com"
                },
                blocks: []
              }
            ]
          },
          products: { sections: [] },
          collections: { sections: [] }
        },
        selectedId: null,
        activePage: "index",
        viewMode: "desktop"
      })
    }),
    {
      name: "davut-builder-storage"
    }
  )
);
