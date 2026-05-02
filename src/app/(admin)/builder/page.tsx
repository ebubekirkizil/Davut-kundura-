"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Plus, 
  Settings, 
  Layout, 
  Smartphone, 
  Monitor, 
  ChevronDown,
  GripVertical,
  ArrowLeft,
  X,
  Search,
  Box
} from "lucide-react";
import Link from "next/link";
import { useBuilderStore } from "@/store/useBuilderStore";
import { SECTION_SCHEMAS } from "@/store/schema";
import { Inspector } from "@/components/builder/Inspector";

/**
 * Shopify Official Assets & Polaris Design Tokens
 */
const SHOPIFY_COMMON_CSS = "https://cdn.shopify.com/shopifycloud/web/assets/v1/vite/client/en/assets/common-78d194e3319d.css";
const SHOPIFY_MAIN_CSS = "https://cdn.shopify.com/shopifycloud/web/assets/v1/vite/client/en/assets/main-c5ff0a181da0.css";
const INTER_FONT_URL = "https://cdn.shopify.com/static/fonts/inter/v4/styles.css";

export default function ShopifyProfessionalBuilder() {
  const { 
    activePage, 
    pages, 
    selectedId, 
    viewMode, 
    themeSettings,
    setActivePage,
    setSelectedId,
    setViewMode,
    addSection
  } = useBuilderStore();

  const [isSaving, setIsSaving] = useState(false);
  const [showAddSection, setShowAddSection] = useState(false);
  const [activeSidebarTab, setActiveSidebarTab] = useState<"layers" | "blocks" | "settings">("layers");

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const currentPage = pages[activePage] || { sections: [] };

  // Listen for messages from the iframe (preview canvas)
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "SELECT_SECTION") {
        setSelectedId(event.data.id);
      }
      if (event.data?.type === "PREVIEW_READY") {
        // Initial sync when iframe is ready
        syncToIframe();
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // Sync state to the preview iframe
  const syncToIframe = () => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage({
        type: "BUILDER_SYNC",
        page: currentPage,
        theme: themeSettings,
        selectedId: selectedId
      }, "*");
    }
  };

  useEffect(() => {
    syncToIframe();
  }, [currentPage, themeSettings, selectedId]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await fetch("/api/admin/store-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pages, themeSettings }),
      });
    } catch (e) {
      console.error(e);
    } finally {
      setTimeout(() => setIsSaving(false), 800);
    }
  };

  const handleAddSection = (type: string) => {
    addSection(activePage, type);
    setShowAddSection(false);
  };

  return (
    <div className="shopify-builder-root p-theme-light select-none" style={{ height: "100vh", display: "flex", flexDirection: "column", overflow: "hidden", backgroundColor: "#f1f1f1" }}>
      <link rel="stylesheet" href={INTER_FONT_URL} />
      <link rel="stylesheet" href={SHOPIFY_COMMON_CSS} />
      <link rel="stylesheet" href={SHOPIFY_MAIN_CSS} />

      <style jsx global>{`
        :root {
          --p-color-bg-surface: #ffffff;
          --p-color-border: #d2d2d2;
          --p-color-text: #202223;
          --p-color-primary: #008060;
          --p-color-primary-hover: #006e52;
          --p-topbar-height: 52px;
          --p-sidebar-width: 300px;
          --p-right-panel-width: 340px;
        }
        body { margin: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: var(--p-color-text); }
        .shopify-topbar { background: #1a1a1a; color: #fff; height: var(--p-topbar-height); display: flex; align-items: center; justify-content: space-between; padding: 0 16px; z-index: 1100; border-bottom: 1px solid rgba(255,255,255,0.1); }
        .sidebar-tabs { width: 64px; background: #ffffff; border-right: 1px solid var(--p-color-border); display: flex; flex-direction: column; align-items: center; padding: 12px 0; gap: 16px; }
        .sidebar-tab-btn { padding: 10px; border-radius: 8px; color: #6d7175; transition: all 0.2s; cursor: pointer; position: relative; }
        .sidebar-tab-btn:hover { background: #f6f6f7; color: #202223; }
        .sidebar-tab-btn.active { color: #008060; background: #f0f7f4; }
        .sidebar-tab-btn.active::after { content: ''; position: absolute; left: -12px; top: 15%; height: 70%; width: 3px; background: #008060; border-radius: 0 4px 4px 0; }
        .shopify-content-sidebar { width: calc(var(--p-sidebar-width) - 64px); background: #ffffff; border-right: 1px solid var(--p-color-border); display: flex; flex-direction: column; overflow: hidden; }
        .shopify-right-panel { width: var(--p-right-panel-width); background: #ffffff; border-left: 1px solid var(--p-color-border); z-index: 900; }
        .preview-area { flex: 1; background: #f6f6f7; position: relative; overflow: hidden; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 24px; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .preview-frame-container { 
          background: #fff; 
          box-shadow: 0 0 0 1px rgba(0,0,0,0.05), 0 10px 40px rgba(0,0,0,0.1); 
          border-radius: ${viewMode === 'mobile' ? '24px' : '2px'};
          border: ${viewMode === 'mobile' ? '12px solid #1a1a1a' : 'none'};
          overflow: hidden; 
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          width: ${viewMode === 'mobile' ? '375px' : '100%'};
          height: ${viewMode === 'mobile' ? '667px' : '100%'};
          position: relative;
        }
        .section-node { padding: 10px 12px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 10px; border: 1px solid transparent; transition: all 0.15s; }
        .section-node:hover { background: #f6f6f7; }
        .section-node.active { background: #f0f7f4; border-color: #008060; }
        .polaris-btn-save { background: var(--p-color-primary); color: #fff; border: none; padding: 7px 16px; border-radius: 6px; font-weight: 600; font-size: 13px; cursor: pointer; transition: background 0.2s; }
      `}</style>

      {/* TOPBAR */}
      <header className="shopify-topbar shadow-sm">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="p-1.5 hover:bg-white/10 rounded-md transition-colors">
            <ArrowLeft size={18} />
          </Link>
          <div className="h-5 w-[1px] bg-white/20" />
          <div className="flex flex-col">
            <span className="font-bold text-[14px] leading-tight">Davut Kundura</span>
            <span className="text-[11px] text-white/50 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Canlı Düzenleme
            </span>
          </div>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-[#2a2a2a] rounded-full p-1 border border-white/5 shadow-inner">
          <div className="flex items-center gap-1 px-3 py-1 text-sm font-medium text-white/80 border-r border-white/10 cursor-pointer hover:bg-white/5 rounded-l-full">
            <span>{activePage === 'index' ? 'Ana sayfa' : activePage}</span>
            <ChevronDown size={14} />
          </div>
          <div className="flex items-center gap-1 p-0.5">
            <button onClick={() => setViewMode("mobile")} className={`p-1.5 rounded-full transition-all ${viewMode === 'mobile' ? 'bg-[#008060] text-white shadow-lg scale-110' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
              <Smartphone size={16} />
            </button>
            <button onClick={() => setViewMode("desktop")} className={`p-1.5 rounded-full transition-all ${viewMode === 'desktop' ? 'bg-[#008060] text-white shadow-lg scale-110' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
              <Monitor size={16} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={handleSave} 
            disabled={isSaving}
            className="polaris-btn-save"
          >
            {isSaving ? "Kaydediliyor..." : "Kaydet"}
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* LEFT NAV TABS */}
        <nav className="sidebar-tabs shadow-sm">
          <div onClick={() => setActiveSidebarTab("layers")} className={`sidebar-tab-btn ${activeSidebarTab === 'layers' ? 'active' : ''}`}><Layout size={24} /></div>
          <div onClick={() => setActiveSidebarTab("settings")} className={`sidebar-tab-btn ${activeSidebarTab === 'settings' ? 'active' : ''}`}><Settings size={24} /></div>
        </nav>

        {/* LEFT HIERARCHY SIDEBAR */}
        <aside className="shopify-content-sidebar">
          <div className="p-4 border-b border-[#d2d2d2] bg-white flex items-center justify-between">
            <h2 className="font-semibold text-[13px]">{activeSidebarTab === 'layers' ? 'Bölümler' : 'Tema Ayarları'}</h2>
            {activeSidebarTab === 'layers' && (
              <button onClick={() => setShowAddSection(true)} className="p-1 hover:bg-gray-100 rounded text-gray-500">
                <Plus size={16} />
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-2">
            {activeSidebarTab === 'layers' && (
              <div className="space-y-4">
                <div className="px-3 py-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Şablon Bölümleri</div>
                <div className="space-y-1 px-1">
                  {currentPage.sections.map((section) => (
                    <div 
                      key={section.id}
                      onClick={() => setSelectedId(section.id)}
                      className={`group section-node ${selectedId === section.id ? 'active' : ''}`}
                    >
                      <GripVertical size={14} className="text-gray-300" />
                      <span className="text-[13px] font-medium">{SECTION_SCHEMAS[section.type]?.label || section.type}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => setShowAddSection(true)} className="w-full mt-4 p-3 border-2 border-dashed border-gray-100 rounded-xl text-[#008060] hover:bg-[#f0f7f4] text-[12px] font-bold">+ Bölüm ekle</button>
              </div>
            )}
          </div>
        </aside>

        {/* CANVAS */}
        <main className="preview-area">
          <div className="preview-frame-container shadow-2xl">
            <iframe ref={iframeRef} src="/" className="w-full h-full border-none" title="Shopify Preview" />
          </div>
        </main>

        {/* RIGHT PANEL - DYNAMIC INSPECTOR */}
        <aside className="shopify-right-panel shadow-sm">
          <Inspector />
        </aside>
      </div>

      {/* ADD SECTION MODAL */}
      {showAddSection && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={() => setShowAddSection(false)}></div>
          <div className="bg-white w-full max-w-4xl h-[600px] rounded-2xl shadow-2xl flex flex-col overflow-hidden relative z-10 animate-in zoom-in duration-200">
            <div className="p-5 border-b flex items-center justify-between bg-[#fafafa]">
              <div className="flex items-center gap-6">
                <h2 className="text-[15px] font-bold">Bölüm Ekle</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                  <input type="text" placeholder="Bölüm ara..." className="pl-10 pr-4 py-2 text-sm border rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-[#008060]" />
                </div>
              </div>
              <button onClick={() => setShowAddSection(false)}><X size={20} /></button>
            </div>
            <div className="flex-1 p-6 overflow-y-auto grid grid-cols-3 gap-6 bg-white">
              {Object.values(SECTION_SCHEMAS).map(schema => (
                <div key={schema.type} onClick={() => handleAddSection(schema.type)} className="group cursor-pointer border rounded-xl p-4 hover:border-[#008060] hover:shadow-md transition-all">
                  <div className="aspect-video bg-gray-50 rounded-lg mb-3 flex items-center justify-center">
                    <Box size={32} className="text-gray-200 group-hover:text-[#008060] transition-colors" />
                  </div>
                  <h3 className="text-sm font-bold group-hover:text-[#008060]">{schema.label}</h3>
                  <p className="text-[11px] text-gray-400 mt-1">Standart {schema.label.toLowerCase()} bileşeni.</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
