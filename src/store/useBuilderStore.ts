"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SECTION_SCHEMAS } from "./schema";

// ─── Types ────────────────────────────────────────────────────────────────────

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

export interface PageData {
  title: string;
  slug: string;
  sections: Section[];
}

export interface GlobalTheme {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  bgColor: string;
  textColor: string;
  fontHeading: string;
  fontBody: string;
  borderRadius: number;
}

// ─── State Interface ──────────────────────────────────────────────────────────

interface BuilderState {
  activePage: string;
  selectedId: string | null;
  viewMode: "desktop" | "tablet" | "mobile";
  pages: Record<string, PageData>;
  globalTheme: GlobalTheme;
  undoStack: Record<string, PageData>[];
  redoStack: Record<string, PageData>[];

  // Navigation
  setActivePage: (page: string) => void;
  setSelectedId: (id: string | null) => void;
  setViewMode: (mode: "desktop" | "tablet" | "mobile") => void;

  // Page management
  addPage: (slug: string, title: string) => void;
  removePage: (slug: string) => void;
  renamePage: (slug: string, newTitle: string, newSlug: string) => void;
  loadPage: (slug: string, data: PageData) => void;

  // Section management
  addSection: (page: string, sectionType: string) => void;
  removeSection: (page: string, sectionId: string) => void;
  updateSection: (page: string, sectionId: string, settings: Record<string, any>) => void;
  reorderSections: (page: string, newOrder: Section[]) => void;
  duplicateSection: (page: string, sectionId: string) => void;
  moveSectionUp: (page: string, sectionId: string) => void;
  moveSectionDown: (page: string, sectionId: string) => void;

  // Block management
  addBlock: (page: string, sectionId: string, blockType: string) => void;
  removeBlock: (page: string, sectionId: string, blockId: string) => void;
  updateBlock: (page: string, sectionId: string, blockId: string, settings: Record<string, any>) => void;

  // Global theme
  updateGlobalTheme: (theme: Partial<GlobalTheme>) => void;

  // Undo / Redo
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;

  resetState: () => void;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function uid() {
  return Math.random().toString(36).substr(2, 9);
}

function clonePages(pages: Record<string, PageData>): Record<string, PageData> {
  return JSON.parse(JSON.stringify(pages));
}

const MAX_HISTORY = 30;

function pushHistory(
  undoStack: Record<string, PageData>[],
  pages: Record<string, PageData>
): Record<string, PageData>[] {
  const next = [clonePages(pages), ...undoStack].slice(0, MAX_HISTORY);
  return next;
}

// ─── Default State ────────────────────────────────────────────────────────────

const defaultGlobalTheme: GlobalTheme = {
  primaryColor: "#12100E",
  secondaryColor: "#F7F3EE",
  accentColor: "#C8A96E",
  bgColor: "#FDFBF7",
  textColor: "#12100E",
  fontHeading: "Playfair Display",
  fontBody: "Inter",
  borderRadius: 8,
};

const defaultPages: Record<string, PageData> = {
  index: {
    title: "Ana Sayfa",
    slug: "index",
    sections: [
      {
        id: "header-1",
        type: "header",
        settings: { logoText: "DAVUT KUNDURA", logoSize: 24, sticky: true },
        blocks: [
          { id: "h-b-1", type: "menu_item", settings: { label: "ANA SAYFA", link: "/" } },
          { id: "h-b-2", type: "menu_item", settings: { label: "ERKEK", link: "/erkek" } },
          { id: "h-b-3", type: "menu_item", settings: { label: "KADIN", link: "/kadin" } },
        ],
      },
      {
        id: "hero-1",
        type: "hero",
        settings: {
          title: "Zanaatın Geleceği",
          subtitle: "Pendik'te Geleneksel Deri İşçiliği ve Profesyonel Bakım",
          buttonText: "Katalogları Gör",
        },
        blocks: [],
      },
      {
        id: "about-1",
        type: "richText",
        settings: {
          title: "Zanaatın Hikayesi",
          content:
            "Davut Kundura, Pendik'te zanaatı ve ustalığı modern dokunuşlarla birleştiren köklü bir aile geleneğidir.",
        },
        blocks: [],
      },
      {
        id: "category-grid-1",
        type: "categoryGrid",
        settings: {
          title: "ÜRÜN KATALOGLARIMIZ",
          subtitle: "Pendik Mağazamızdan Seçkin Zanaat Ürünleri",
        },
        blocks: [
          { id: "cat-1", type: "category_item", settings: { title: "Hakiki Deri Kemerler" } },
          { id: "cat-2", type: "category_item", settings: { title: "Ortopedik Tabanlıklar" } },
          { id: "cat-3", type: "category_item", settings: { title: "Ayakkabı Bakım Ürünleri" } },
        ],
      },
      {
        id: "footer-1",
        type: "footer",
        settings: { topBarText: "PENDİK DAVUT KUNDURA • EL İŞÇİLİĞİ", backgroundColor: "#1a1a1a" },
        blocks: [
          {
            id: "f-b-1",
            type: "footer_text",
            settings: { title: "DAVUT KUNDURA PENDİK", content: "Doğu Mahallesi, Flurya Sokak, No: 2/B, Pendik/İstanbul." },
          },
          {
            id: "f-b-4",
            type: "footer_contact",
            settings: { title: "BİZE ULAŞIN", address: "Doğu Mah. Flurya Sok. No:2/B Pendik", phone: "+90 538 625 87 92" },
          },
        ],
      },
    ],
  },
};

// ─── Store ────────────────────────────────────────────────────────────────────

export const useBuilderStore = create<BuilderState>()(
  persist(
    (set, get) => ({
      activePage: "index",
      selectedId: null,
      viewMode: "desktop",
      pages: defaultPages,
      globalTheme: defaultGlobalTheme,
      undoStack: [],
      redoStack: [],

      // ── Navigation ──
      setActivePage: (page) => set({ activePage: page, selectedId: null }),
      setSelectedId: (id) => set({ selectedId: id }),
      setViewMode: (mode) => set({ viewMode: mode }),

      // ── Undo / Redo ──
      canUndo: () => get().undoStack.length > 0,
      canRedo: () => get().redoStack.length > 0,

      undo: () => {
        const { undoStack, pages } = get();
        if (!undoStack.length) return;
        const [prev, ...rest] = undoStack;
        set({
          pages: prev,
          undoStack: rest,
          redoStack: [clonePages(pages), ...get().redoStack].slice(0, MAX_HISTORY),
          selectedId: null,
        });
      },

      redo: () => {
        const { redoStack, pages } = get();
        if (!redoStack.length) return;
        const [next, ...rest] = redoStack;
        set({
          pages: next,
          redoStack: rest,
          undoStack: [clonePages(pages), ...get().undoStack].slice(0, MAX_HISTORY),
          selectedId: null,
        });
      },

      // ── Page Management ──
      addPage: (slug, title) =>
        set((s) => ({
          undoStack: pushHistory(s.undoStack, s.pages),
          redoStack: [],
          pages: {
            ...s.pages,
            [slug]: { title, slug, sections: [] },
          },
          activePage: slug,
          selectedId: null,
        })),

      removePage: (slug) =>
        set((s) => {
          if (Object.keys(s.pages).length <= 1) return s; // en az 1 sayfa kalmalı
          const next = { ...s.pages };
          delete next[slug];
          const nextActive = Object.keys(next)[0];
          return {
            undoStack: pushHistory(s.undoStack, s.pages),
            redoStack: [],
            pages: next,
            activePage: nextActive,
            selectedId: null,
          };
        }),

      renamePage: (slug, newTitle, newSlug) =>
        set((s) => {
          const page = s.pages[slug];
          if (!page) return s;
          const next = { ...s.pages };
          if (slug !== newSlug) {
            next[newSlug] = { ...page, title: newTitle, slug: newSlug };
            delete next[slug];
          } else {
            next[slug] = { ...page, title: newTitle };
          }
          return {
            undoStack: pushHistory(s.undoStack, s.pages),
            redoStack: [],
            pages: next,
            activePage: newSlug,
          };
        }),

      loadPage: (slug, data) =>
        set((s) => ({
          pages: {
            ...s.pages,
            [slug]: data,
          },
          activePage: slug,
          selectedId: null,
          undoStack: [],
          redoStack: [],
        })),

      // ── Section Management ──
      addSection: (page, type) =>
        set((s) => {
          const schema = SECTION_SCHEMAS[type];
          const newSection: Section = {
            id: `sec_${uid()}`,
            type,
            settings: schema?.settings.reduce((acc: any, f: any) => ({ ...acc, [f.id]: f.default }), {}) || {},
            blocks: [],
          };
          const current = s.pages[page];
          if (!current) return s;
          return {
            undoStack: pushHistory(s.undoStack, s.pages),
            redoStack: [],
            pages: {
              ...s.pages,
              [page]: { ...current, sections: [...current.sections, newSection] },
            },
            selectedId: newSection.id,
          };
        }),

      removeSection: (page, id) =>
        set((s) => {
          const current = s.pages[page];
          if (!current) return s;
          return {
            undoStack: pushHistory(s.undoStack, s.pages),
            redoStack: [],
            pages: {
              ...s.pages,
              [page]: { ...current, sections: current.sections.filter((sec) => sec.id !== id) },
            },
            selectedId: null,
          };
        }),

      updateSection: (page, id, settings) =>
        set((s) => {
          const current = s.pages[page];
          if (!current) return s;
          return {
            pages: {
              ...s.pages,
              [page]: {
                ...current,
                sections: current.sections.map((sec) =>
                  sec.id === id ? { ...sec, settings: { ...sec.settings, ...settings } } : sec
                ),
              },
            },
          };
        }),

      reorderSections: (page, sections) =>
        set((s) => {
          const current = s.pages[page];
          if (!current) return s;
          return {
            undoStack: pushHistory(s.undoStack, s.pages),
            redoStack: [],
            pages: { ...s.pages, [page]: { ...current, sections } },
          };
        }),

      duplicateSection: (page, sectionId) =>
        set((s) => {
          const current = s.pages[page];
          if (!current) return s;
          const idx = current.sections.findIndex((sec) => sec.id === sectionId);
          if (idx === -1) return s;
          const original = current.sections[idx];
          const copy: Section = {
            ...JSON.parse(JSON.stringify(original)),
            id: `sec_${uid()}`,
          };
          const newSections = [...current.sections];
          newSections.splice(idx + 1, 0, copy);
          return {
            undoStack: pushHistory(s.undoStack, s.pages),
            redoStack: [],
            pages: { ...s.pages, [page]: { ...current, sections: newSections } },
            selectedId: copy.id,
          };
        }),

      moveSectionUp: (page, sectionId) =>
        set((s) => {
          const current = s.pages[page];
          if (!current) return s;
          const idx = current.sections.findIndex((sec) => sec.id === sectionId);
          if (idx <= 0) return s;
          const arr = [...current.sections];
          [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]];
          return {
            undoStack: pushHistory(s.undoStack, s.pages),
            redoStack: [],
            pages: { ...s.pages, [page]: { ...current, sections: arr } },
          };
        }),

      moveSectionDown: (page, sectionId) =>
        set((s) => {
          const current = s.pages[page];
          if (!current) return s;
          const idx = current.sections.findIndex((sec) => sec.id === sectionId);
          if (idx === -1 || idx >= current.sections.length - 1) return s;
          const arr = [...current.sections];
          [arr[idx], arr[idx + 1]] = [arr[idx + 1], arr[idx]];
          return {
            undoStack: pushHistory(s.undoStack, s.pages),
            redoStack: [],
            pages: { ...s.pages, [page]: { ...current, sections: arr } },
          };
        }),

      // ── Block Management ──
      addBlock: (page, sectionId, type) =>
        set((s) => {
          const current = s.pages[page];
          if (!current) return s;
          const schema = SECTION_SCHEMAS[current.sections.find((sec) => sec.id === sectionId)?.type ?? ""];
          const blockSchema = schema?.blocks?.find((b: any) => b.type === type);
          const newBlock: Block = {
            id: `blk_${uid()}`,
            type,
            settings: blockSchema?.settings?.reduce((acc: any, f: any) => ({ ...acc, [f.id]: f.default }), {}) || {},
          };
          return {
            undoStack: pushHistory(s.undoStack, s.pages),
            redoStack: [],
            pages: {
              ...s.pages,
              [page]: {
                ...current,
                sections: current.sections.map((sec) =>
                  sec.id === sectionId ? { ...sec, blocks: [...sec.blocks, newBlock] } : sec
                ),
              },
            },
          };
        }),

      removeBlock: (page, sectionId, blockId) =>
        set((s) => {
          const current = s.pages[page];
          if (!current) return s;
          return {
            undoStack: pushHistory(s.undoStack, s.pages),
            redoStack: [],
            pages: {
              ...s.pages,
              [page]: {
                ...current,
                sections: current.sections.map((sec) =>
                  sec.id === sectionId ? { ...sec, blocks: sec.blocks.filter((b) => b.id !== blockId) } : sec
                ),
              },
            },
          };
        }),

      updateBlock: (page, sectionId, blockId, settings) =>
        set((s) => {
          const current = s.pages[page];
          if (!current) return s;
          return {
            pages: {
              ...s.pages,
              [page]: {
                ...current,
                sections: current.sections.map((sec) =>
                  sec.id === sectionId
                    ? {
                        ...sec,
                        blocks: sec.blocks.map((b) =>
                          b.id === blockId ? { ...b, settings: { ...b.settings, ...settings } } : b
                        ),
                      }
                    : sec
                ),
              },
            },
          };
        }),

      // ── Global Theme ──
      updateGlobalTheme: (theme) =>
        set((s) => ({ globalTheme: { ...s.globalTheme, ...theme } })),

      // ── Reset ──
      resetState: () => {
        if (typeof window !== "undefined") {
          localStorage.removeItem("davut-builder-storage");
          window.location.reload();
        }
      },
    }),
    { name: "davut-builder-storage" }
  )
);
