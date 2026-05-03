"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  ArrowLeft, ChevronDown, Monitor, Smartphone, 
  Plus, X, Search, Settings, Eye, Box, 
  GripVertical, Star, ShoppingBag, Type, Bell,
  Image as ImageIcon, Layers, Layout, CreditCard,
  Mail, MessageSquare, Clock, Globe, HelpCircle, RefreshCw, Sparkles, Navigation2, Zap
} from "lucide-react";
import Link from "next/link";
import { useBuilderStore } from "@/store/useBuilderStore";
import { SECTION_SCHEMAS } from "@/store/schema";
import { Inspector } from "@/components/builder/Inspector";

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
    addSection,
    removeSection,
    reorderSections,
    resetState
  } = useBuilderStore();

  useEffect(() => {
    // Legacy support check
    const stored = localStorage.getItem("davut-builder-storage");
    if (stored && !stored.includes("categoryGrid")) {
      console.log("Eski versiyon tespit edildi, otomatik güncelleniyor...");
      resetState();
    }
  }, [resetState]);

  const [isSaving, setIsSaving] = useState(false);
  const [showAddSection, setShowAddSection] = useState(false);
  
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
      setTimeout(() => setIsSaving(false), 1200);
    }
  };

  // Native Drag and Drop Handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragEnd = (e: React.DragEvent) => {
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

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col overflow-hidden selection:bg-[var(--accent)]/30 animate-in fade-in duration-700">
      
      {/* TOPBAR - LUXE DESIGN */}
      <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-[var(--border)] flex items-center justify-between px-8 z-[100] shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--accent)] via-[var(--text-primary)] to-[var(--accent)] animate-shimmer" />
        
        <div className="flex items-center gap-6">
          <Link href="/admin" className="p-3 bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-2xl transition-all border border-transparent hover:border-[var(--border)]">
            <ArrowLeft size={20} />
          </Link>
          <div className="flex items-center gap-4 pr-6 border-r border-[var(--border)]">
            <div className="w-10 h-10 bg-[var(--text-primary)] rounded-xl flex items-center justify-center shadow-lg transform rotate-3">
              <span className="text-white font-brand font-bold text-[14px]">DK</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[14px] font-brand font-bold text-[var(--text-primary)] uppercase tracking-widest">Davut Studio</span>
              <span className="text-[10px] font-black text-[var(--text-secondary)] uppercase opacity-50">Luxe Site Builder</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 px-4 py-2 hover:bg-[var(--bg-secondary)] rounded-xl cursor-pointer transition-all border border-transparent hover:border-[var(--border)] group">
            <Layout size={16} className="text-[var(--accent)]" />
            <span className="text-[13px] text-[var(--text-primary)] font-bold group-hover:text-[var(--accent)] transition-colors">Ana Sayfa</span>
            <ChevronDown size={14} className="text-[var(--text-secondary)]" />
          </div>
        </div>

        {/* Device Toggles - Premium Glass */}
        <div className="absolute left-1/2 -translate-x-1/2 flex bg-[var(--bg-secondary)] p-1.5 rounded-2xl border border-[var(--border)] shadow-inner">
          <button 
            onClick={() => setViewMode("desktop")} 
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${viewMode === "desktop" ? 'bg-white shadow-lg text-[var(--text-primary)] scale-105' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
          >
            <Monitor size={16} />
            <span className="text-[11px] font-black uppercase tracking-widest">Desktop</span>
          </button>
          <button 
            onClick={() => setViewMode("mobile")} 
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${viewMode === "mobile" ? 'bg-white shadow-lg text-[var(--text-primary)] scale-105' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
          >
            <Smartphone size={16} />
            <span className="text-[11px] font-black uppercase tracking-widest">Mobile</span>
          </button>
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={() => {
              if(confirm("Tüm sayfa içeriği sıfırlanacak ve lüks şablon yüklenecek. Emin misiniz?")) {
                resetState();
                window.location.reload();
              }
            }}
            className="flex items-center gap-2 px-4 py-2.5 text-[11px] font-black text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] rounded-xl transition-all uppercase tracking-widest"
          >
            <RefreshCw size={14} className="animate-spin-slow" />
            Sıfırla
          </button>
          
          <button 
            onClick={handleSave} 
            disabled={isSaving} 
            className="relative px-8 py-3 bg-[var(--text-primary)] text-white text-[13px] font-black uppercase tracking-[0.2em] rounded-2xl transition-all shadow-xl hover:shadow-[var(--shadow-premium)] active:scale-95 disabled:opacity-50 group overflow-hidden"
          >
            <div className="absolute inset-0 bg-[var(--accent)] translate-y-full group-hover:translate-y-0 transition-transform duration-500 opacity-20" />
            <span className="relative flex items-center gap-2">
              {isSaving ? <Sparkles size={16} className="animate-pulse" /> : <Zap size={16} className="text-[var(--accent)]" />}
              {isSaving ? "Kaydediliyor..." : "Yayına Al"}
            </span>
          </button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        
        {/* LEFT SIDEBAR - LAYERS */}
        <aside className="w-[360px] bg-white border-r border-[var(--border)] flex flex-col shadow-2xl relative z-[90]">
          <div className="p-8 border-b border-[var(--border)] bg-[var(--bg-secondary)]/30 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent)]/5 rounded-full blur-3xl -mr-16 -mt-16" />
             <div className="flex items-center justify-between relative z-10">
               <div className="space-y-1">
                 <h2 className="text-[12px] font-black text-[var(--text-primary)] uppercase tracking-[0.3em]">Sayfa Katmanları</h2>
                 <p className="text-[10px] text-[var(--text-secondary)] font-medium">Bölümleri sürükleyerek sıralayın.</p>
               </div>
               <button 
                 onClick={() => setShowAddSection(true)} 
                 className="w-10 h-10 bg-[var(--text-primary)] text-white hover:bg-[var(--accent)] rounded-xl flex items-center justify-center transition-all shadow-lg hover:rotate-90"
               >
                 <Plus size={20} />
               </button>
             </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-3 custom-scrollbar">
            {currentPage.sections.map((section, index) => (
              <div 
                key={section.id}
                onClick={() => setSelectedId(section.id)}
                draggable={true}
                onDragStart={(e) => handleDragStart(e, index)}
                onDragEnd={handleDragEnd}
                onDragOver={(e) => handleDragOver(e, index)}
                className={`group flex items-center gap-4 p-5 rounded-[1.5rem] cursor-grab active:cursor-grabbing transition-all duration-300 border ${
                  selectedId === section.id 
                  ? 'bg-white border-[var(--accent)] shadow-2xl scale-[1.02] ring-4 ring-[var(--accent)]/5' 
                  : 'bg-[var(--bg-secondary)]/50 border-transparent hover:bg-white hover:border-[var(--border)] hover:shadow-lg'
                } ${draggedIndex === index ? 'opacity-20' : ''}`}
              >
                <div className={`p-2.5 rounded-xl transition-all ${selectedId === section.id ? 'bg-[var(--accent)] text-white shadow-[0_0_15px_var(--accent)]' : 'bg-white text-[var(--text-secondary)] border border-[var(--border)]'}`}>
                   <GripVertical size={14} className="opacity-40" />
                </div>
                <div className="flex-1 min-w-0">
                   <div className="text-[13px] font-black text-[var(--text-primary)] uppercase tracking-widest truncate">{SECTION_SCHEMAS[section.type]?.label || section.type}</div>
                   <div className="text-[10px] text-[var(--text-secondary)] font-medium mt-0.5 opacity-60">Section Instance #{index + 1}</div>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button className="p-2 hover:bg-[var(--bg-secondary)] rounded-lg text-[var(--text-secondary)]"><Eye size={14} /></button>
                   <button className="p-2 hover:bg-red-50 rounded-lg text-red-500" onClick={(e) => {e.stopPropagation(); removeSection(activePage, section.id)}}><X size={14} /></button>
                </div>
              </div>
            ))}

            <button 
              onClick={() => setShowAddSection(true)}
              className="w-full flex flex-col items-center justify-center gap-3 p-10 border-2 border-dashed border-[var(--border)] rounded-[2rem] text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] hover:bg-[var(--accent)]/5 transition-all duration-500 group mt-6"
            >
              <div className="w-14 h-14 bg-white border border-[var(--border)] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm group-hover:shadow-[0_0_20px_var(--accent)]">
                <Plus size={24} />
              </div>
              <span className="text-[11px] font-black uppercase tracking-[0.3em]">Yeni Katman Ekle</span>
            </button>
          </div>

          {/* Theme Settings Shortcut */}
          <div className="p-8 border-t border-[var(--border)] bg-[var(--bg-secondary)]/30">
            <button className="w-full flex items-center justify-between p-4 bg-white rounded-2xl border border-[var(--border)] hover:border-[var(--accent)] hover:shadow-lg transition-all group">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[var(--accent)]/10 text-[var(--accent)] rounded-lg group-hover:bg-[var(--accent)] group-hover:text-white transition-all">
                  <Settings size={18} />
                </div>
                <span className="text-[12px] font-black uppercase tracking-widest text-[var(--text-primary)]">Global Tema Ayarları</span>
              </div>
              <ChevronDown size={16} className="text-[var(--text-secondary)]" />
            </button>
          </div>
        </aside>

        {/* PREVIEW CANVAS - STUDIO FEEL */}
        <section className="flex-1 bg-[var(--bg-secondary)] flex items-center justify-center p-12 overflow-hidden relative">
          
          {/* Studio Grid Overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--text-primary) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          
          <div className={`
            bg-white shadow-[var(--shadow-premium)] transition-all duration-700 ease-in-out overflow-hidden relative
            ${viewMode === 'mobile' ? 'w-[420px] h-[840px] rounded-[3.5rem] border-[12px] border-[var(--text-primary)] shadow-2xl' : 'w-full h-full rounded-[2rem] border border-[var(--border)]'}
          `}>
            {viewMode === 'mobile' && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-8 bg-[var(--text-primary)] rounded-b-3xl z-[100] flex items-center justify-center">
                 <div className="w-12 h-1 bg-white/20 rounded-full" />
              </div>
            )}
            <iframe ref={iframeRef} src="/" className="w-full h-full border-none bg-white" title="Studio Preview" />
            
            {/* Loading Indicator */}
            {isSaving && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-md flex flex-col items-center justify-center z-[200] animate-in fade-in duration-300">
                <div className="w-20 h-20 border-4 border-[var(--accent)]/20 border-t-[var(--accent)] rounded-full animate-spin shadow-2xl" />
                <p className="mt-6 text-[12px] font-black text-[var(--text-primary)] uppercase tracking-[0.4em] animate-pulse">Sistem Kaydediliyor</p>
              </div>
            )}
          </div>
          
          {/* Viewport Info Overlay */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-[var(--text-primary)] text-white px-8 py-3 rounded-2xl shadow-2xl border border-white/10 backdrop-blur-xl animate-in slide-in-from-bottom-10">
            <Navigation2 size={16} className="text-[var(--accent)] animate-pulse" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em]">{viewMode === 'mobile' ? 'Mobil Deneyimi (420px)' : 'Masaüstü Görünümü (100%)'}</span>
            <div className="w-1 h-4 bg-white/20 rounded-full mx-2" />
            <span className="text-[10px] text-white/60 font-bold">Synchronized</span>
          </div>
        </section>

        {/* RIGHT INSPECTOR - SETTINGS */}
        <aside className="w-[400px] bg-white border-l border-[var(--border)] shadow-2xl overflow-y-auto custom-scrollbar relative z-[90]">
          <Inspector />
        </aside>
      </main>

      {/* ADD SECTION MODAL - LUXURY GALLERY */}
      {showAddSection && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-12">
          <div className="absolute inset-0 bg-[var(--text-primary)]/60 backdrop-blur-md animate-in fade-in duration-500" onClick={() => setShowAddSection(false)}></div>
          <div className="bg-white w-full max-w-7xl h-[850px] rounded-[3rem] shadow-2xl flex flex-col overflow-hidden relative z-10 animate-in zoom-in-95 duration-500 border border-white/20">
            
            {/* Modal Header */}
            <div className="p-10 border-b border-[var(--border)] flex items-center justify-between bg-[var(--bg-secondary)]/30">
              <div className="space-y-1">
                <h2 className="text-3xl font-brand font-bold text-[var(--text-primary)] flex items-center gap-4">
                   <Box size={28} className="text-[var(--accent)]" /> 
                   Tasarım Galerisi
                </h2>
                <p className="text-[12px] text-[var(--text-secondary)] font-medium uppercase tracking-[0.2em]">Sayfanıza profesyonel bir dokunuş ekleyin.</p>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] group-focus-within:text-[var(--accent)] transition-colors" size={20} />
                  <input 
                    type="text" 
                    placeholder="Bölüm ara..." 
                    className="pl-12 pr-6 py-4 text-sm font-bold bg-white border border-[var(--border)] rounded-2xl w-[400px] focus:ring-4 focus:ring-[var(--accent)]/10 focus:border-[var(--accent)] outline-none transition-all shadow-sm" 
                  />
                </div>
                <button onClick={() => setShowAddSection(false)} className="w-14 h-14 bg-white hover:bg-red-50 rounded-2xl flex items-center justify-center transition-all shadow-sm text-[var(--text-secondary)] hover:text-red-500 border border-[var(--border)]">
                  <X size={28} />
                </button>
              </div>
            </div>
            
            <div className="flex flex-1 overflow-hidden">
              {/* Sidebar Categories */}
              <div className="w-80 bg-[var(--bg-secondary)]/30 border-r border-[var(--border)] p-8 space-y-3">
                {[
                  { id: 'popular', label: 'En Çok Tercih Edilen', icon: <Star size={18} /> },
                  { id: 'images', label: 'Medya & Vitrin', icon: <ImageIcon size={18} /> },
                  { id: 'products', label: 'Ürün Grupları', icon: <ShoppingBag size={18} /> },
                  { id: 'text', label: 'Anlatım & Blog', icon: <Type size={18} /> },
                  { id: 'marketing', label: 'Pazarlama Araçları', icon: <Bell size={18} /> },
                ].map(cat => (
                  <button key={cat.id} className={`w-full flex items-center gap-4 px-6 py-4 text-[13px] font-black uppercase tracking-widest rounded-2xl transition-all ${cat.id === 'popular' ? 'bg-white shadow-xl text-[var(--accent)] border border-[var(--accent)]/10' : 'text-[var(--text-secondary)] hover:bg-white/50 hover:text-[var(--text-primary)]'}`}>
                    <div className={cat.id === 'popular' ? 'text-[var(--accent)]' : 'opacity-40'}>{cat.icon}</div>
                    {cat.label}
                  </button>
                ))}
              </div>
              
              {/* Main Grid with Premium Mockups */}
              <div className="flex-1 p-12 overflow-y-auto grid grid-cols-2 xl:grid-cols-3 gap-10 content-start bg-white custom-scrollbar">
                {Object.values(SECTION_SCHEMAS).map(schema => (
                  <div key={schema.type} onClick={() => handleAddSection(schema.type)} className="group cursor-pointer">
                    {/* Visual Mockup Container */}
                    <div className="aspect-[16/10] bg-[var(--bg-secondary)]/50 border border-[var(--border)] rounded-[2.5rem] mb-6 flex flex-col items-center justify-center group-hover:border-[var(--accent)] group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500 relative overflow-hidden">
                      
                      <div className="absolute inset-0 bg-gradient-to-br from-white to-[var(--bg-secondary)] opacity-50 group-hover:opacity-0 transition-opacity" />
                      
                      {/* Premium CSS Mockups */}
                      <div className="w-full h-full p-8 pointer-events-none transition-all duration-500 group-hover:scale-105">
                         {schema.type === 'hero' && (
                           <div className="w-full h-full bg-white rounded-2xl shadow-lg flex flex-col items-center justify-center gap-3 border border-[var(--border)]">
                             <div className="w-2/3 h-1 bg-[var(--accent)] rounded-full animate-pulse"></div>
                             <div className="w-1/2 h-4 bg-[var(--text-primary)]/10 rounded-lg"></div>
                             <div className="w-1/3 h-8 bg-[var(--text-primary)] rounded-xl mt-2 flex items-center justify-center">
                               <div className="w-4 h-1 bg-[var(--accent)] rounded-full"></div>
                             </div>
                           </div>
                         )}
                         {schema.type === 'productGrid' && (
                           <div className="grid grid-cols-2 gap-4 w-full h-full">
                             {[1,2,3,4].map(i => (
                               <div key={i} className="bg-white rounded-2xl shadow-sm border border-[var(--border)] flex flex-col gap-2 p-2">
                                  <div className="flex-1 bg-[var(--bg-secondary)] rounded-xl" />
                                  <div className="h-1 w-2/3 bg-[var(--text-primary)]/20 rounded-full" />
                               </div>
                             ))}
                           </div>
                         )}
                         {schema.type === 'header' && (
                           <div className="w-full h-12 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-[var(--border)] flex items-center justify-between px-6">
                             <div className="w-12 h-2 bg-[var(--text-primary)] rounded-full"></div>
                             <div className="flex gap-2"><div className="w-6 h-1 bg-[var(--text-secondary)]/30 rounded-full"></div><div className="w-6 h-1 bg-[var(--text-secondary)]/30 rounded-full"></div></div>
                           </div>
                         )}
                         {!['hero', 'productGrid', 'header'].includes(schema.type) && (
                            <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                               <div className="w-20 h-20 bg-white rounded-[2rem] shadow-xl flex items-center justify-center border border-[var(--border)] group-hover:border-[var(--accent)] transition-all">
                                  <Box size={32} className="text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-all group-hover:scale-110" />
                               </div>
                               <div className="space-y-2 flex flex-col items-center">
                                 <div className="w-24 h-1 bg-[var(--text-primary)]/10 rounded-full"></div>
                                 <div className="w-16 h-1 bg-[var(--text-primary)]/5 rounded-full"></div>
                               </div>
                            </div>
                         )}
                      </div>

                      {/* Add Button Overlay */}
                      <div className="absolute inset-0 bg-[var(--text-primary)]/80 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center gap-4 backdrop-blur-sm">
                         <div className="w-16 h-16 bg-[var(--accent)] text-[var(--text-primary)] rounded-3xl flex items-center justify-center shadow-[0_0_30px_var(--accent)] animate-in zoom-in-50 duration-300">
                            <Plus size={32} />
                         </div>
                         <span className="text-[13px] font-black text-white uppercase tracking-[0.4em]">Sayfaya Ekle</span>
                      </div>
                    </div>
                    <div className="text-center space-y-2">
                       <h3 className="text-[15px] font-black text-[var(--text-primary)] uppercase tracking-widest group-hover:text-[var(--accent)] transition-colors">{schema.label}</h3>
                       <p className="text-[11px] text-[var(--text-secondary)] font-medium leading-relaxed opacity-60">Lüks {schema.label.toLowerCase()} tasarım bloğu.</p>
                    </div>
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
