"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { 
  Plus, 
  Settings, 
  Layers, 
  Layout, 
  Save, 
  Eye, 
  Trash2, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Smartphone, 
  Monitor, 
  Undo2, 
  Redo2,
  ChevronDown,
  GripVertical,
  Search,
  ArrowLeft,
  X,
  Type,
  Image as ImageIcon,
  Video,
  Grid,
  CreditCard,
  MousePointer2,
  Package,
  Star,
  MessageSquare,
  Box
} from "lucide-react";
import Link from "next/link";

/**
 * Shopify Official Assets & Polaris Design Tokens
 */
const SHOPIFY_COMMON_CSS = "https://cdn.shopify.com/shopifycloud/web/assets/v1/vite/client/en/assets/common-78d194e3319d.css";
const SHOPIFY_MAIN_CSS = "https://cdn.shopify.com/shopifycloud/web/assets/v1/vite/client/en/assets/main-c5ff0a181da0.css";
const INTER_FONT_URL = "https://cdn.shopify.com/static/fonts/inter/v4/styles.css";

interface StoreBlock {
  id: string;
  type: string;
  order: number;
  content: any;
  customCss?: string;
}

export default function ShopifyProfessionalBuilder() {
  const [blocks, setBlocks] = useState<StoreBlock[]>([]);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"desktop" | "mobile" | "fullscreen">("desktop");
  const [isSaving, setIsSaving] = useState(false);
  const [customCss, setCustomCss] = useState("");
  const [showAddSection, setShowAddSection] = useState(false);
  const [activeSidebarTab, setActiveSidebarTab] = useState<"layers" | "blocks" | "settings">("layers");

  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Initial Data Load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/admin/store-content");
        const data = await res.json();
        if (data.blocks) setBlocks(data.blocks);
        if (data.customCss) setCustomCss(data.customCss);
      } catch (e) {
        console.error("Failed to load store data", e);
      }
    };
    fetchData();
  }, []);

  // Sync state to the preview iframe
  useEffect(() => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage({
        type: "BUILDER_SYNC",
        blocks: blocks,
        customCss: customCss,
        selectedId: selectedBlockId
      }, "*");
    }
  }, [blocks, customCss, selectedBlockId]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await fetch("/api/admin/store-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blocks, customCss }),
      });
      // Minimal feedback like Shopify
    } catch (e) {
      console.error(e);
    } finally {
      setTimeout(() => setIsSaving(false), 800);
    }
  };

  const addBlock = (type: string) => {
    const newBlock: StoreBlock = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      order: blocks.length,
      content: getInitialContent(type),
    };
    setBlocks([...blocks, newBlock]);
    setSelectedBlockId(newBlock.id);
    setShowAddSection(false);
  };

  const getInitialContent = (type: string) => {
    switch (type) {
      case "Hero": return { title: "Trendleri Yakalayın", subtitle: "Davut Kundura 2024 Yaz Sezonu Şimdi Mağazada.", buttonText: "Şimdi Al", imageUrl: "" };
      case "ProductGrid": return { title: "En Çok Satanlar", limit: 4 };
      case "Video": return { videoUrl: "", title: "El İşçiliği Sanatımız" };
      case "RichText": return { title: "Kaliteye Odaklanın", text: "Her adımda konfor ve şıklığı bir arada sunuyoruz." };
      default: return {};
    }
  };

  const removeBlock = (id: string) => {
    setBlocks(blocks.filter(b => b.id !== id));
    if (selectedBlockId === id) setSelectedBlockId(null);
  };

  const updateBlockContent = (id: string, field: string, value: any) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, content: { ...b.content, [field]: value } } : b));
  };

  const selectedBlock = useMemo(() => blocks.find(b => b.id === selectedBlockId), [blocks, selectedBlockId]);

  return (
    <div className="shopify-builder-root p-theme-light select-none" style={{ height: "100vh", display: "flex", flexDirection: "column", overflow: "hidden", backgroundColor: "#f1f1f1" }}>
      {/* External Assets */}
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
        .sidebar-tab-btn { p: 10px; border-radius: 8px; color: #6d7175; transition: all 0.2s; cursor: pointer; position: relative; }
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
        .section-node-icon { color: #6d7175; }
        .section-node.active .section-node-icon { color: #008060; }

        .polaris-btn-save { background: var(--p-color-primary); color: #fff; border: none; padding: 7px 16px; border-radius: 6px; font-weight: 600; font-size: 13px; cursor: pointer; transition: background 0.2s; }
        .polaris-btn-save:hover { background: var(--p-color-primary-hover); }
        .polaris-btn-save:disabled { opacity: 0.7; cursor: not-allowed; }

        /* Scrollbar styling */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #e1e1e1; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #d1d1d1; }
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
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Canlı Yayınlanıyor
            </span>
          </div>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-[#2a2a2a] rounded-full p-1 border border-white/5 shadow-inner">
          <div className="flex items-center gap-1 px-3 py-1 text-sm font-medium text-white/80 border-r border-white/10 cursor-pointer hover:bg-white/5 rounded-l-full">
            <span>Ana sayfa</span>
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
          <div className="flex items-center gap-1 text-white/40 border-r border-white/10 pr-4 mr-1">
            <button className="p-1.5 hover:text-white hover:bg-white/5 rounded-md"><Undo2 size={16} /></button>
            <button className="p-1.5 hover:text-white hover:bg-white/5 rounded-md"><Redo2 size={16} /></button>
          </div>
          <button 
            onClick={handleSave} 
            disabled={isSaving}
            className="polaris-btn-save flex items-center gap-2"
          >
            {isSaving ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Kaydediliyor</span>
              </>
            ) : (
              <span>Kaydet</span>
            )}
          </button>
        </div>
      </header>

      {/* MAIN BUILDER BODY */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT NAV BAR: TABS */}
        <nav className="sidebar-tabs shadow-sm">
          <div 
            onClick={() => setActiveSidebarTab("layers")}
            className={`sidebar-tab-btn ${activeSidebarTab === 'layers' ? 'active' : ''}`}
            title="Bölümler"
          >
            <Layout size={24} />
          </div>
          <div 
            onClick={() => setActiveSidebarTab("blocks")}
            className={`sidebar-tab-btn ${activeSidebarTab === 'blocks' ? 'active' : ''}`}
            title="Şablonlar"
          >
            <Box size={24} />
          </div>
          <div 
            onClick={() => setActiveSidebarTab("settings")}
            className={`sidebar-tab-btn ${activeSidebarTab === 'settings' ? 'active' : ''}`}
            title="Ayarlar"
          >
            <Settings size={24} />
          </div>
          <div className="mt-auto sidebar-tab-btn" title="Uygulamalar">
            <Package size={24} />
          </div>
        </nav>

        {/* CONTENT SIDEBAR: HIERARCHY */}
        <aside className="shopify-content-sidebar">
          <div className="p-4 border-b border-[#d2d2d2] bg-white flex items-center justify-between">
            <h2 className="font-semibold text-[13px]">
              {activeSidebarTab === 'layers' ? 'Bölümler' : activeSidebarTab === 'blocks' ? 'Tüm Şablonlar' : 'Tema Ayarları'}
            </h2>
            {activeSidebarTab === 'layers' && (
              <button onClick={() => setShowAddSection(true)} className="p-1 hover:bg-gray-100 rounded text-gray-500">
                <Plus size={16} />
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-2 bg-[#ffffff]">
            {activeSidebarTab === 'layers' && (
              <div className="space-y-4">
                {/* Fixed Sections */}
                <div className="space-y-1">
                  <div className="px-3 py-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Statik Alanlar</div>
                  <div className="section-node">
                    <Layers size={16} className="section-node-icon" />
                    <span className="text-sm font-medium">Header / Üstbilgi</span>
                    <Eye size={14} className="ml-auto text-gray-300" />
                  </div>
                </div>

                {/* Dynamic Sections */}
                <div className="space-y-1">
                  <div className="px-3 py-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider flex items-center justify-between">
                    <span>Şablon Bölümleri</span>
                    <span className="text-[9px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-500">{blocks.length}</span>
                  </div>
                  {blocks.length === 0 ? (
                    <div className="p-8 text-center border-2 border-dashed border-gray-100 rounded-xl m-2 bg-[#fafafa]">
                      <p className="text-[11px] text-gray-400">Ana sayfanıza henüz bir bölüm eklemediniz.</p>
                    </div>
                  ) : (
                    <div className="space-y-1 px-1">
                      {blocks.map((block, index) => (
                        <div 
                          key={block.id}
                          onClick={() => setSelectedBlockId(block.id)}
                          className={`group section-node ${selectedBlockId === block.id ? 'active' : ''}`}
                        >
                          <div className="flex items-center gap-2 flex-1">
                            <GripVertical size={14} className="text-gray-300 cursor-grab hover:text-gray-400" />
                            <div className="p-1.5 rounded-md bg-white border border-gray-100 shadow-sm section-node-icon">
                              {block.type === 'Hero' && <ImageIcon size={14} className="text-purple-500" />}
                              {block.type === 'ProductGrid' && <Grid size={14} className="text-orange-500" />}
                              {block.type === 'Video' && <Video size={14} className="text-red-500" />}
                              {block.type === 'RichText' && <Type size={14} className="text-blue-500" />}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[13px] font-medium leading-none">{block.type}</span>
                              <span className="text-[10px] text-gray-400 mt-0.5">Varsayılan Ayarlar</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-1 hover:bg-gray-200 rounded text-gray-400"><Eye size={14} /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <button 
                    onClick={() => setShowAddSection(true)}
                    className="w-[calc(100%-16px)] mx-2 flex items-center justify-center gap-2 mt-4 p-3 border-2 border-dashed border-gray-100 rounded-xl text-[#008060] hover:border-[#008060]/30 hover:bg-[#f0f7f4] transition-all text-[12px] font-bold group"
                  >
                    <Plus size={16} className="group-hover:scale-110 transition-transform" />
                    Bölüm ekle
                  </button>
                </div>

                {/* Footer */}
                <div className="space-y-1 pt-4">
                  <div className="px-3 py-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Alt Alanlar</div>
                  <div className="section-node">
                    <CreditCard size={16} className="section-node-icon" />
                    <span className="text-sm font-medium">Footer / Altbilgi</span>
                  </div>
                </div>
              </div>
            )}

            {activeSidebarTab === 'blocks' && (
              <div className="p-2 space-y-3">
                <div className="relative mb-4">
                  <Search className="absolute left-2.5 top-2.5 text-gray-400" size={14} />
                  <input 
                    type="text" 
                    placeholder="Şablonlarda ara..." 
                    className="w-full pl-9 pr-3 py-2 text-xs border rounded-md focus:outline-none focus:ring-1 focus:ring-[#008060]"
                  />
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {[1,2,3,4,5,6].map(i => (
                    <div key={i} className="group relative border rounded-md overflow-hidden hover:border-[#008060] transition-colors cursor-pointer">
                      <div className="aspect-[16/9] bg-gray-50 flex items-center justify-center">
                        <span className="text-[10px] text-gray-300 font-bold uppercase tracking-tighter">Davut Kundura #{i}</span>
                      </div>
                      <div className="p-2 bg-white">
                        <p className="text-[11px] font-semibold">Premium Koleksiyon {i}</p>
                      </div>
                    </div>
                  ))}
                  <p className="text-center text-[10px] text-gray-400 py-4">Toplam 1240+ hazır şablon</p>
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* CENTRAL PREVIEW CANVAS */}
        <main className="preview-area">
          <div className="preview-frame-container shadow-2xl">
            {/* Overlay for better feeling like Shopify */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#008060]/10 z-10"></div>
            <iframe 
              ref={iframeRef}
              src="/" 
              className="w-full h-full border-none"
              title="Shopify Preview"
            />
          </div>
          
          {/* Resize handles for desktop mode (simulated) */}
          {viewMode === 'desktop' && (
            <>
              <div className="absolute top-1/2 -left-1 w-2 h-16 bg-gray-300 rounded-full -translate-y-1/2 cursor-ew-resize opacity-20 hover:opacity-100 transition-opacity"></div>
              <div className="absolute top-1/2 -right-1 w-2 h-16 bg-gray-300 rounded-full -translate-y-1/2 cursor-ew-resize opacity-20 hover:opacity-100 transition-opacity"></div>
            </>
          )}
        </main>

        {/* RIGHT SIDEBAR: PROPERTIES & CONTENT EDITING */}
        <aside className="shopify-right-panel shadow-sm">
          {selectedBlock ? (
            <div className="h-full flex flex-col animate-in slide-in-from-right duration-200">
              <div className="p-4 border-b border-[#d2d2d2] flex items-center justify-between bg-white sticky top-0 z-10">
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Düzenleme</span>
                  <span className="font-bold text-[14px]">{selectedBlock.type} Bölümü</span>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => removeBlock(selectedBlock.id)} className="p-2 hover:bg-red-50 text-red-500 rounded-full transition-colors" title="Sil">
                    <Trash2 size={16} />
                  </button>
                  <button onClick={() => setSelectedBlockId(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <X size={18} />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-8">
                {/* Content Settings */}
                <div className="space-y-6">
                  <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-widest pb-1 border-b">İçerik</h3>
                  
                  {selectedBlock.type === 'Hero' && (
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-[12px] font-semibold">Ana Başlık</label>
                        <input 
                          type="text" 
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-[#008060] focus:border-[#008060] outline-none"
                          value={selectedBlock.content.title}
                          onChange={(e) => updateBlockContent(selectedBlock.id, "title", e.target.value)}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[12px] font-semibold">Alt Metin</label>
                        <textarea 
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-[#008060] outline-none min-h-[100px] resize-none"
                          value={selectedBlock.content.subtitle}
                          onChange={(e) => updateBlockContent(selectedBlock.id, "subtitle", e.target.value)}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[12px] font-semibold">Arka Plan Görseli</label>
                        <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors">
                          <ImageIcon className="text-gray-300 mb-2" size={32} />
                          <span className="text-[11px] font-medium text-blue-600">Görsel Seç</span>
                        </div>
                        <input 
                          type="text" 
                          placeholder="Veya URL yapıştırın..."
                          className="w-full px-3 py-2 mt-2 text-xs border border-gray-300 rounded-md outline-none"
                          value={selectedBlock.content.imageUrl || ""}
                          onChange={(e) => updateBlockContent(selectedBlock.id, "imageUrl", e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  {selectedBlock.type === 'ProductGrid' && (
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-[12px] font-semibold">Bölüm Başlığı</label>
                        <input 
                          type="text" 
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-[#008060] outline-none"
                          value={selectedBlock.content.title}
                          onChange={(e) => updateBlockContent(selectedBlock.id, "title", e.target.value)}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[12px] font-semibold">Ürün Sayısı</label>
                        <div className="flex items-center gap-4">
                          <input 
                            type="range" min="2" max="12"
                            className="flex-1 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#008060]"
                            value={selectedBlock.content.limit}
                            onChange={(e) => updateBlockContent(selectedBlock.id, "limit", parseInt(e.target.value))}
                          />
                          <span className="text-xs font-bold w-6">{selectedBlock.content.limit}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Advanced Settings */}
                <div className="space-y-6 pt-4 border-t border-gray-100">
                  <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-widest pb-1 border-b">Tasarım</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-[#f6f6f7] rounded-lg border border-transparent hover:border-gray-300 cursor-pointer text-center">
                      <span className="text-[11px] font-medium">Dolgu (Padding)</span>
                    </div>
                    <div className="p-3 bg-[#f6f6f7] rounded-lg border border-transparent hover:border-gray-300 cursor-pointer text-center">
                      <span className="text-[11px] font-medium">Kenarlık</span>
                    </div>
                  </div>
                  <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    <div className="flex items-center gap-2">
                      <Settings size={14} className="text-gray-400" />
                      <span>Özel CSS Kodları</span>
                    </div>
                    <ChevronRight size={14} className="text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-10 animate-in fade-in duration-500">
              <div className="w-20 h-20 bg-[#f6f6f7] rounded-full flex items-center justify-center mb-6">
                <MousePointer2 size={32} className="text-gray-300" />
              </div>
              <h3 className="text-sm font-bold text-gray-600 mb-2">Düzenlemek İçin Seçin</h3>
              <p className="text-[12px] text-gray-400 leading-relaxed max-w-[200px]">
                Sol menüden bir bölüm seçin veya önizleme üzerinde bir öğeye tıklayın.
              </p>
            </div>
          )}
        </aside>
      </div>

      {/* ADD SECTION POPOVER (High-Fidelity Shopify Style) */}
      {showAddSection && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={() => setShowAddSection(false)}></div>
          
          <div className="bg-white w-full max-w-4xl h-[600px] rounded-2xl shadow-[0_30px_90px_rgba(0,0,0,0.3)] flex flex-col overflow-hidden relative z-10 animate-in zoom-in duration-200">
            <div className="p-5 border-b bg-[#fafafa] flex items-center justify-between">
              <div className="flex items-center gap-6">
                <h2 className="text-[15px] font-bold">Bölüm Ekle</h2>
                <div className="relative group">
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                  <input 
                    type="text" 
                    placeholder="Bölüm ara (örn: banner, ürün listesi)..." 
                    className="w-80 pl-10 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-full focus:ring-2 focus:ring-[#008060] focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>
              <button onClick={() => setShowAddSection(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex flex-1 overflow-hidden">
              {/* Category Sidebar */}
              <div className="w-56 bg-[#f6f6f7] border-r p-3 space-y-1">
                <div className="px-3 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Kategoriler</div>
                {["Tümü", "Banner'lar", "Öne Çıkanlar", "Ürünler", "Müşteri Yorumları", "Video", "Yazı & İçerik", "Gelişmiş"].map(cat => (
                  <button 
                    key={cat} 
                    className={`w-full text-left px-3 py-2.5 text-[13px] rounded-lg transition-colors ${cat === 'Tümü' ? 'bg-white shadow-sm font-bold text-[#008060]' : 'text-gray-600 hover:bg-gray-200'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              
              {/* Presets Grid */}
              <div className="flex-1 p-6 overflow-y-auto bg-white grid grid-cols-3 gap-6 content-start">
                {/* Hero / Banner */}
                <div onClick={() => addBlock("Hero")} className="group cursor-pointer">
                  <div className="aspect-[4/3] bg-gray-50 border border-gray-200 rounded-xl mb-3 flex items-center justify-center group-hover:border-[#008060] group-hover:shadow-md transition-all overflow-hidden relative">
                    <div className="w-full h-full bg-gradient-to-br from-purple-50 to-blue-50 flex flex-col items-center justify-center">
                      <ImageIcon size={32} className="text-purple-200 mb-2" />
                      <div className="h-1.5 w-16 bg-purple-100 rounded-full mb-1"></div>
                      <div className="h-1.5 w-12 bg-purple-100 rounded-full"></div>
                    </div>
                    <div className="absolute inset-0 bg-[#008060]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute bottom-2 right-2 p-1.5 bg-white border rounded shadow-sm opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
                      <Plus size={14} className="text-[#008060]" />
                    </div>
                  </div>
                  <h3 className="text-sm font-bold group-hover:text-[#008060]">Hero Banner</h3>
                  <p className="text-[11px] text-gray-400 mt-0.5">Metin ve görsel içeren tam genişlikte giriş alanı.</p>
                </div>

                {/* Product Grid */}
                <div onClick={() => addBlock("ProductGrid")} className="group cursor-pointer">
                  <div className="aspect-[4/3] bg-gray-50 border border-gray-200 rounded-xl mb-3 flex items-center justify-center group-hover:border-[#008060] group-hover:shadow-md transition-all overflow-hidden relative">
                    <div className="grid grid-cols-2 gap-2 p-4 w-full h-full">
                      {[1,2,3,4].map(i => <div key={i} className="bg-orange-50 rounded-md border border-orange-100"></div>)}
                    </div>
                    <div className="absolute bottom-2 right-2 p-1.5 bg-white border rounded shadow-sm opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
                      <Plus size={14} className="text-[#008060]" />
                    </div>
                  </div>
                  <h3 className="text-sm font-bold group-hover:text-[#008060]">Ürün Izgarası</h3>
                  <p className="text-[11px] text-gray-400 mt-0.5">Seçili koleksiyondaki ürünleri listeler.</p>
                </div>

                {/* Rich Text */}
                <div onClick={() => addBlock("RichText")} className="group cursor-pointer">
                  <div className="aspect-[4/3] bg-gray-50 border border-gray-200 rounded-xl mb-3 flex items-center justify-center group-hover:border-[#008060] group-hover:shadow-md transition-all overflow-hidden relative">
                    <div className="p-6 space-y-2 w-full">
                      <div className="h-2 w-full bg-blue-100 rounded-full"></div>
                      <div className="h-2 w-3/4 bg-blue-50 rounded-full"></div>
                      <div className="h-2 w-5/6 bg-blue-50 rounded-full"></div>
                    </div>
                    <div className="absolute bottom-2 right-2 p-1.5 bg-white border rounded shadow-sm opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
                      <Plus size={14} className="text-[#008060]" />
                    </div>
                  </div>
                  <h3 className="text-sm font-bold group-hover:text-[#008060]">Zengin Metin</h3>
                  <p className="text-[11px] text-gray-400 mt-0.5">Marka hikayenizi veya duyurularınızı paylaşın.</p>
                </div>

                {/* Video */}
                <div onClick={() => addBlock("Video")} className="group cursor-pointer">
                  <div className="aspect-[4/3] bg-gray-50 border border-gray-200 rounded-xl mb-3 flex items-center justify-center group-hover:border-[#008060] group-hover:shadow-md transition-all overflow-hidden relative">
                    <div className="w-full h-full bg-red-50 flex items-center justify-center">
                      <div className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center">
                        <div className="w-0 h-0 border-t-4 border-t-transparent border-l-6 border-l-red-500 border-b-4 border-b-transparent ml-1"></div>
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 p-1.5 bg-white border rounded shadow-sm opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
                      <Plus size={14} className="text-[#008060]" />
                    </div>
                  </div>
                  <h3 className="text-sm font-bold group-hover:text-[#008060]">Video Alanı</h3>
                  <p className="text-[11px] text-gray-400 mt-0.5">MP4 veya YouTube videoları ile etkileşim sağlayın.</p>
                </div>

                {/* Reviews / Testimonials */}
                <div className="group cursor-pointer opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
                  <div className="aspect-[4/3] bg-gray-50 border border-gray-200 rounded-xl mb-3 flex items-center justify-center relative">
                    <div className="p-4 w-full space-y-3">
                      <div className="flex gap-1"><Star size={8} /><Star size={8} /><Star size={8} /></div>
                      <div className="h-1.5 w-full bg-gray-200 rounded-full"></div>
                    </div>
                  </div>
                  <h3 className="text-sm font-bold">Müşteri Yorumları</h3>
                  <p className="text-[11px] text-gray-400 mt-0.5">Social proof için müşteri geri bildirimleri.</p>
                </div>

                {/* Newsletter */}
                <div className="group cursor-pointer opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
                  <div className="aspect-[4/3] bg-gray-50 border border-gray-200 rounded-xl mb-3 flex items-center justify-center relative">
                    <div className="p-4 w-full flex flex-col items-center gap-2">
                      <MessageSquare size={20} className="text-gray-300" />
                      <div className="h-2 w-24 bg-gray-200 rounded-full"></div>
                    </div>
                  </div>
                  <h3 className="text-sm font-bold">E-Bülten Kaydı</h3>
                  <p className="text-[11px] text-gray-400 mt-0.5">Müşterilerinizin abone olmasını sağlayın.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
