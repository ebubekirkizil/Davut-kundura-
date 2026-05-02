"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Plus, 
  Settings, 
  Layers, 
  Layout, 
  Eye, 
  ChevronDown,
  GripVertical,
  ArrowLeft,
  X,
  Search,
  Box,
  Smartphone,
  Monitor,
  CreditCard
} from "lucide-react";
import Link from "next/link";
import { useBuilderStore } from "@/store/useBuilderStore";
import { SECTION_SCHEMAS } from "@/store/schema";
import { Inspector } from "@/components/builder/Inspector";

/**
 * Shopify Official Assets & Polaris Design Tokens
 */
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
  
  // Drag and Drop State
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const currentPage = pages[activePage] || { sections: [] };

  // Communication with Iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "SELECT_SECTION") {
        setSelectedId(event.data.id);
      }
      if (event.data?.type === "REMOVE_SECTION") {
        removeSection(activePage, event.data.id);
      }
      if (event.data?.type === "MOVE_SECTION") {
        const { id, direction } = event.data;
        const sections = [...currentPage.sections];
        const index = sections.findIndex(s => s.id === id);
        if (index === -1) return;
        
        const newIndex = direction === "up" ? index - 1 : index + 1;
        if (newIndex >= 0 && newIndex < sections.length) {
          const temp = sections[index];
          sections[index] = sections[newIndex];
          sections[newIndex] = temp;
          reorderSections(activePage, sections);
        }
      }
      if (event.data?.type === "PREVIEW_READY") {
        syncToIframe();
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [activePage, currentPage, themeSettings, selectedId]);

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

  // Native Drag and Drop Handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    const target = e.currentTarget as HTMLElement;
    target.style.opacity = "0.4";
  };

  const handleDragEnd = (e: React.DragEvent) => {
    const target = e.currentTarget as HTMLElement;
    target.style.opacity = "1";
    setDraggedIndex(null);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    
    const newSections = [...currentPage.sections];
    const draggedItem = newSections[draggedIndex];
    newSections.splice(draggedIndex, 1);
    newSections.splice(index, 0, draggedItem);
    
    reorderSections(activePage, newSections);
    setDraggedIndex(index);
  };

  const handleAddSection = (type: string) => {
    addSection(activePage, type);
    setShowAddSection(false);
  };

  // Keyboard Shortcuts (Shopify Style)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        // Undo logic can be added here
        console.log("Undo requested");
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="shopify-builder-root p-theme-light select-none font-sans overflow-hidden bg-[var(--p-bg)]" style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <link rel="stylesheet" href={INTER_FONT_URL} />
      
      {/* TOPBAR */}
      <header className="h-12 bg-white border-b border-[var(--p-border)] flex items-center justify-between px-4 z-50 shadow-sm">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-md transition-colors"><ArrowLeft size={18} /></Link>
          <div className="flex items-center gap-2 pr-4 border-r border-[var(--p-border)]">
            <div className="w-6 h-6 bg-[var(--p-green)] rounded-md flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-[10px]">DK</span>
            </div>
            <span className="text-[13px] font-semibold text-[var(--p-text)]">Site Builder</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 hover:bg-gray-100 rounded-md cursor-pointer transition-colors group">
            <span className="text-[13px] text-gray-600 font-medium group-hover:text-[var(--p-text)]">Ana Sayfa</span>
            <ChevronDown size={14} className="text-gray-400 group-hover:text-gray-600" />
          </div>
        </div>

        {/* Device Toggles */}
        <div className="flex bg-gray-100 p-0.5 rounded-lg border border-gray-200">
          <button 
            onClick={() => setViewMode("desktop")} 
            className={`p-1.5 rounded-md transition-all ${viewMode === "desktop" ? 'bg-white shadow-sm text-[var(--p-green)]' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <Monitor size={16} />
          </button>
          <button 
            onClick={() => setViewMode("mobile")} 
            className={`p-1.5 rounded-md transition-all ${viewMode === "mobile" ? 'bg-white shadow-sm text-[var(--p-green)]' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <Smartphone size={16} />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[11px] text-gray-400 italic hidden sm:block">Değişiklikler kaydedildi</span>
          <button 
            onClick={handleSave} 
            disabled={isSaving} 
            className="px-4 py-1.5 bg-[var(--p-green)] hover:bg-[var(--p-primary-hover)] text-white text-[13px] font-semibold rounded-[var(--p-radius)] transition-all shadow-sm active:scale-95"
          >
            {isSaving ? "Kaydediliyor..." : "Kaydet"}
          </button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* LEFT SIDEBAR */}
        <aside className="w-[var(--p-sidebar-width)] bg-white border-r border-[var(--p-border)] flex flex-col shadow-sm">
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 border-b border-[var(--p-border)] flex items-center justify-between bg-white sticky top-0 z-10">
              <span className="text-[12px] font-semibold text-gray-500 uppercase tracking-widest">Şablon</span>
              <button onClick={() => setShowAddSection(true)} className="p-1 hover:bg-gray-100 rounded text-[var(--p-green)] transition-colors"><Plus size={18} /></button>
            </div>
            
            <div className="p-2 space-y-0.5">
              {currentPage.sections.map((section, index) => (
                <div 
                  key={section.id}
                  onClick={() => setSelectedId(section.id)}
                  draggable={true}
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragEnd={handleDragEnd}
                  onDragOver={(e) => handleDragOver(e, index)}
                  className={`group flex items-center gap-3 p-2 rounded-lg cursor-grab active:cursor-grabbing transition-all border border-transparent ${
                    selectedId === section.id 
                    ? 'bg-blue-50 border-blue-100 text-blue-700' 
                    : 'hover:bg-gray-50 text-gray-700'
                  } ${draggedIndex === index ? 'opacity-20' : ''}`}
                >
                  <GripVertical size={14} className="text-gray-300 group-hover:text-gray-400" />
                  <Box size={16} className={`${selectedId === section.id ? 'text-blue-500' : 'text-gray-400'}`} />
                  <span className="text-[13px] font-medium flex-1 truncate">{SECTION_SCHEMAS[section.type]?.label || section.type}</span>
                  <Eye size={14} className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>

            <div className="px-4 mt-6">
               <button 
                onClick={() => setShowAddSection(true)}
                className="w-full flex items-center justify-center gap-2 p-3 border border-dashed border-gray-200 rounded-xl text-[var(--p-green)] hover:bg-[var(--p-bg)] hover:border-[var(--p-green)]/30 transition-all font-semibold text-[13px]"
              >
                <Plus size={16} />
                Bölüm ekle
              </button>
            </div>
          </div>

          {/* Footer Theme Settings */}
          <div className="p-4 border-t border-[var(--p-border)] bg-gray-50/50 flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-500 hover:text-[var(--p-text)] cursor-pointer transition-colors">
              <Settings size={16} />
              <span className="text-[12px] font-bold uppercase tracking-wider">Tema Ayarları</span>
            </div>
            <Eye size={16} className="text-gray-400" />
          </div>
        </aside>

        {/* PREVIEW CANVAS */}
        <section className="flex-1 bg-[var(--p-bg)] flex items-center justify-center p-8 overflow-hidden relative">
          <div className={`
            bg-white shadow-[var(--p-shadow-200)] transition-all duration-500 ease-[var(--p-easing)] overflow-hidden relative
            ${viewMode === 'mobile' ? 'w-[375px] h-[667px] rounded-[32px] border-[8px] border-gray-900' : 'w-full h-full rounded-sm'}
          `}>
            <iframe ref={iframeRef} src="/" className="w-full h-full border-none bg-white" title="Preview" />
          </div>
          
          {/* Zoom Level Indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full shadow-lg border border-gray-100 text-[11px] font-bold text-gray-500">
            {viewMode === 'mobile' ? 'Mobil (375px)' : '100%'}
          </div>
        </section>

        {/* RIGHT INSPECTOR */}
        <aside className="w-[340px] bg-white border-l border-[var(--p-border)] shadow-sm overflow-y-auto custom-scrollbar">
          <Inspector />
        </aside>
      </main>

      {/* ADD SECTION MODAL */}
      {showAddSection && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-8">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setShowAddSection(false)}></div>
          <div className="bg-white w-full max-w-4xl h-[640px] rounded-3xl shadow-2xl flex flex-col overflow-hidden relative z-10 animate-in zoom-in duration-300">
            <div className="p-6 border-b border-[var(--p-border)] flex items-center justify-between bg-white">
              <div className="flex items-center gap-8">
                <h2 className="text-xl font-bold text-[var(--p-text)]">Bölüm Ekle</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Bölüm ara..." 
                    className="pl-10 pr-4 py-2 text-sm bg-gray-50 border border-transparent rounded-lg w-80 focus:bg-white focus:ring-2 focus:ring-[var(--p-green)] outline-none transition-all" 
                  />
                </div>
              </div>
              <button onClick={() => setShowAddSection(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400"><X size={24} /></button>
            </div>
            
            <div className="flex flex-1 overflow-hidden">
              <div className="w-56 bg-gray-50 border-r border-[var(--p-border)] p-4 space-y-1">
                {["Popüler", "Görsel", "Yazı", "Ürünler", "Video"].map(cat => (
                  <button key={cat} className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${cat === 'Popüler' ? 'bg-white shadow-sm font-bold text-[var(--p-green)]' : 'text-gray-600 hover:bg-gray-200'}`}>
                    {cat}
                  </button>
                ))}
              </div>
              
              <div className="flex-1 p-8 overflow-y-auto grid grid-cols-3 gap-8 content-start bg-white custom-scrollbar">
                {Object.values(SECTION_SCHEMAS).map(schema => (
                  <div key={schema.type} onClick={() => handleAddSection(schema.type)} className="group cursor-pointer">
                    <div className="aspect-[4/3] bg-gray-50 border border-gray-100 rounded-2xl mb-3 flex items-center justify-center group-hover:border-[var(--p-green)]/30 group-hover:shadow-xl transition-all relative overflow-hidden bg-gradient-to-br from-gray-50 to-white">
                      <Box size={40} className="text-gray-200 group-hover:scale-110 group-hover:text-[var(--p-green)]/20 transition-all duration-300" />
                      <div className="absolute inset-0 bg-[var(--p-green)]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <h3 className="text-sm font-bold group-hover:text-[var(--p-green)] transition-colors">{schema.label}</h3>
                    <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">Şablona {schema.label.toLowerCase()} ekleyin.</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
