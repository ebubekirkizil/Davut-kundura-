"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  ArrowLeft, ChevronDown, Monitor, Smartphone, 
  Plus, X, Search, Settings, Eye, Box, 
  GripVertical, Star, ShoppingBag, Type, Bell,
  Image as ImageIcon, Layers, Layout, CreditCard,
  Mail, MessageSquare, Clock, Globe, HelpCircle
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
          <div className="bg-white w-full max-w-5xl h-[700px] rounded-[var(--p-radius)] shadow-2xl flex flex-col overflow-hidden relative z-10 animate-in zoom-in duration-300">
            {/* Header */}
            <div className="p-6 border-b border-[var(--p-border)] flex items-center justify-between bg-white sticky top-0 z-10">
              <div className="flex items-center gap-8">
                <h2 className="text-xl font-bold text-[var(--p-text)]">Bölüm Ekle</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Bölüm ara..." 
                    className="pl-10 pr-4 py-2 text-sm bg-gray-50 border border-transparent rounded-lg w-80 focus:bg-white focus:ring-2 focus:ring-[var(--p-blue)] outline-none transition-all" 
                  />
                </div>
              </div>
              <button onClick={() => setShowAddSection(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400"><X size={24} /></button>
            </div>
            
            <div className="flex flex-1 overflow-hidden">
              {/* Sidebar Categories */}
              <div className="w-64 bg-gray-50 border-r border-[var(--p-border)] p-4 space-y-1">
                {[
                  { id: 'popular', label: 'Popüler', icon: <Star size={16} /> },
                  { id: 'images', label: 'Görsel & Video', icon: <ImageIcon size={16} /> },
                  { id: 'products', label: 'Ürünler', icon: <ShoppingBag size={16} /> },
                  { id: 'text', label: 'Yazı & İçerik', icon: <Type size={16} /> },
                  { id: 'marketing', label: 'Pazarlama', icon: <Bell size={16} /> },
                ].map(cat => (
                  <button key={cat.id} className={`w-full flex items-center gap-3 px-3 py-2.5 text-[13px] rounded-lg transition-all ${cat.id === 'popular' ? 'bg-white shadow-sm font-bold text-[var(--p-blue)]' : 'text-gray-600 hover:bg-gray-200'}`}>
                    {cat.icon}
                    {cat.label}
                  </button>
                ))}
              </div>
              
              {/* Main Grid with Mockups */}
              <div className="flex-1 p-8 overflow-y-auto grid grid-cols-3 gap-8 content-start bg-white custom-scrollbar">
                {Object.values(SECTION_SCHEMAS).map(schema => (
                  <div key={schema.type} onClick={() => handleAddSection(schema.type)} className="group cursor-pointer">
                    {/* Visual Mockup Container */}
                    <div className="aspect-[4/3] bg-gray-50 border border-gray-100 rounded-2xl mb-4 flex flex-col items-center justify-center group-hover:border-[var(--p-blue)] group-hover:shadow-xl transition-all relative overflow-hidden bg-gradient-to-br from-gray-50 to-white">
                      
                      {/* CSS Mockups per type */}
                      <div className="w-full h-full p-4 pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity">
                         {schema.type === 'hero' && (
                           <div className="w-full h-full bg-gray-200 rounded-lg flex flex-col items-center justify-center gap-2">
                             <div className="w-2/3 h-2 bg-gray-400 rounded-full"></div>
                             <div className="w-1/2 h-1 bg-gray-300 rounded-full"></div>
                             <div className="w-1/4 h-3 bg-[var(--p-blue)] rounded-sm mt-1"></div>
                           </div>
                         )}
                         {schema.type === 'productGrid' && (
                           <div className="grid grid-cols-2 gap-2 w-full h-full">
                             {[1,2,3,4].map(i => <div key={i} className="bg-gray-200 rounded-md"></div>)}
                           </div>
                         )}
                         {schema.type === 'header' && (
                           <div className="w-full h-8 bg-gray-100 border-b border-gray-200 flex items-center justify-between px-2">
                             <div className="w-10 h-2 bg-gray-400"></div>
                             <div className="flex gap-1"><div className="w-4 h-1 bg-gray-300"></div><div className="w-4 h-1 bg-gray-300"></div></div>
                           </div>
                         )}
                         {schema.type === 'videoHero' && (
                            <div className="w-full h-full bg-gray-900 rounded-lg flex items-center justify-center relative">
                               <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center"><div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[6px] border-l-white border-b-[4px] border-b-transparent ml-1"></div></div>
                            </div>
                         )}
                         {schema.type === 'countdown' && (
                            <div className="w-full h-full flex items-center justify-center gap-2">
                               <div className="w-8 h-8 bg-gray-100 border border-gray-200 rounded flex flex-col items-center justify-center text-[8px] font-bold">00</div>
                               <div className="w-8 h-8 bg-gray-100 border border-gray-200 rounded flex flex-col items-center justify-center text-[8px] font-bold">00</div>
                               <div className="w-8 h-8 bg-gray-100 border border-gray-200 rounded flex flex-col items-center justify-center text-[8px] font-bold">00</div>
                            </div>
                         )}
                         {/* Default Icon for others */}
                         {!['hero', 'productGrid', 'header', 'videoHero', 'countdown'].includes(schema.type) && (
                            <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                               <Box size={32} className="text-gray-300 group-hover:text-[var(--p-blue)]/40 transition-colors" />
                               <div className="w-1/2 h-1 bg-gray-200 rounded-full"></div>
                            </div>
                         )}
                      </div>

                      {/* Add Button Overlay */}
                      <div className="absolute inset-0 bg-[var(--p-blue)]/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                         <div className="bg-[var(--p-blue)] text-white px-4 py-2 rounded-full text-xs font-bold transform translate-y-4 group-hover:translate-y-0 transition-all">Ekle</div>
                      </div>
                    </div>
                    <h3 className="text-[13px] font-bold text-[var(--p-text)] group-hover:text-[var(--p-blue)] transition-colors text-center">{schema.label}</h3>
                    <p className="text-[11px] text-gray-400 mt-1 text-center line-clamp-1">{schema.label} alanı ekleyin.</p>
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
