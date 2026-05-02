"use client";

import { useState, useRef, useEffect } from "react";
import { 
  Monitor, Smartphone, Tablet, Save, LayoutTemplate, 
  Settings, Plus, Layers, Image as ImageIcon,
  Type, MousePointer2, Paintbrush, ChevronRight, CheckCircle2,
  RefreshCw, Loader2, ArrowLeft, Globe, ShoppingBag, AlignLeft,
  Video, Grid, List, Search, Box, Palette, Code, Star, MessageSquare, Info,
  MoreHorizontal, Undo2, Redo2, Eye, Layout, ChevronDown, Trash2, GripVertical,
  Maximize2, X, Sparkles, BookOpen
} from "lucide-react";
import Link from "next/link";

export default function AdvancedBuilderPage() {
  const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [activeLeftTab, setActiveLeftTab] = useState<"sections" | "theme" | "settings">("sections");
  const [isAddSectionOpen, setIsAddSectionOpen] = useState(false);
  const [hoveredTemplate, setHoveredTemplate] = useState<any>(null);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  
  // Real Database State (Multi-Block)
  const [blocks, setBlocks] = useState<any[]>([]);
  const [customCss, setCustomCss] = useState("");
  
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  // Dynamic Refs for inputs
  const inputRefs = useRef<Record<string, any>>({});

  // Fetch real data on mount
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/admin/store-content");
        const json = await res.json();
        if (json.data?.blocks) {
          setBlocks(json.data.blocks);
          if (json.data.blocks.length > 0) setSelectedBlockId(json.data.blocks[0].id);
        }
        
        // Fetch custom css
        const settingsRes = await fetch("/api/admin/settings/custom_css"); // Assume this endpoint exists or just use a default
        // For now we'll get it from the POST response logic if we can
      } catch (err) {
        console.error("Veri çekme hatası", err);
      } finally {
        setIsLoadingData(false);
      }
    }
    fetchData();
  }, []);

  // Sync state to iframe
  useEffect(() => {
    if (!isLoadingData && iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage({
        type: "BUILDER_SYNC",
        payload: { blocks, customCss }
      }, "*");
    }
  }, [blocks, customCss, isLoadingData]);

  const saveDesign = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      const res = await fetch("/api/admin/store-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blocks, customCss })
      });
      if(res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch(err) {
      alert("Hata oluştu");
    } finally {
      setIsSaving(false);
    }
  };

  const addSection = (template: any) => {
    const newBlock = {
      id: Math.random().toString(36).substr(2, 9),
      type: template.type,
      content: template.defaultContent,
      order: blocks.length
    };
    setBlocks([...blocks, newBlock]);
    setSelectedBlockId(newBlock.id);
    setIsAddSectionOpen(false);
  };

  const removeBlock = (id: string) => {
    setBlocks(blocks.filter(b => b.id !== id));
    if (selectedBlockId === id) setSelectedBlockId(null);
  };

  const updateBlockContent = (id: string, key: string, value: string) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, content: { ...b.content, [key]: value } } : b));
  };

  const selectedBlock = blocks.find(b => b.id === selectedBlockId);

  const sectionTemplates = [
    { 
      category: "Banner'lar", 
      items: [
        { id: "hero", type: "Hero", name: "Bölünmüş Vitrin", desc: "Büyük bir görsel ve yan yana metin alanı.", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=600", defaultContent: { heroTitle: "Yeni Koleksiyon", heroSubtitle: "Zarafetin adresi.", buttonText: "Keşfet" } },
        { id: "banner-full", type: "Hero", name: "Büyük Hero", desc: "Tam ekran arka plan görseli.", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600", defaultContent: { heroTitle: "İtalyan Derisi", heroSubtitle: "Kalite tesadüf değildir.", buttonText: "Alışverişe Başla" } },
      ]
    },
    { 
      category: "Koleksiyonlar", 
      items: [
        { id: "product-grid", type: "ProductGrid", name: "Öne Çıkan Koleksiyon", desc: "Ürünlerinizi ızgara şeklinde listeleyin.", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600", defaultContent: { title: "En Çok Satanlar" } },
      ]
    },
    { 
      category: "Hikaye Anlatımı", 
      items: [
        { id: "video", type: "Video", name: "Video", desc: "Otomatik oynayan arka plan videosu.", img: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=600", defaultContent: { videoUrl: "" } },
        { id: "image-text", type: "ImageText", name: "Metinli Görsel", desc: "Görsel ve yan yana detaylı açıklama.", img: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?q=80&w=600", defaultContent: { title: "Hikayemiz", text: "1998'den beri..." } },
      ]
    }
  ];

  const deviceWidths = {
    desktop: "100%",
    tablet: "768px",
    mobile: "375px",
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#f1f1f1] text-[#202223] flex flex-col font-sans select-none overflow-hidden text-[13px]">
      
      {/* ─── SHOPIFY TOP BAR ─── */}
      <header className="h-[48px] bg-white border-b border-[#e1e3e5] flex items-center justify-between px-3 z-30 shrink-0">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="p-1.5 hover:bg-[#f1f1f1] rounded transition-colors text-[#5c5f62]">
            <Layout className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-1.5 font-medium">
             <span>Davut Kundura PRO</span>
             <span className="bg-[#e3f1df] text-[#008060] px-2 py-0.5 rounded-full text-[11px] font-bold">Yayında</span>
          </div>
          <div className="w-px h-4 bg-[#e1e3e5] mx-2"></div>
          <div className="flex items-center gap-1 text-[#5c5f62] hover:bg-[#f1f1f1] px-2 py-1 rounded cursor-pointer transition-colors">
             <Globe className="w-4 h-4" /> <span>Ana sayfa</span> <ChevronDown className="w-3 h-3" />
          </div>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-0.5 bg-[#f1f1f1] p-0.5 rounded-md border border-[#e1e3e5]">
           <button onClick={() => setViewMode("desktop")} className={`p-1.5 rounded ${viewMode === "desktop" ? "bg-white shadow-sm text-blue-600" : "text-[#5c5f62]"}`}><Monitor className="w-4 h-4"/></button>
           <button onClick={() => setViewMode("tablet")} className={`p-1.5 rounded ${viewMode === "tablet" ? "bg-white shadow-sm text-blue-600" : "text-[#5c5f62]"}`}><Tablet className="w-4 h-4"/></button>
           <button onClick={() => setViewMode("mobile")} className={`p-1.5 rounded ${viewMode === "mobile" ? "bg-white shadow-sm text-blue-600" : "text-[#5c5f62]"}`}><Smartphone className="w-4 h-4"/></button>
        </div>

        <div className="flex items-center gap-2">
           <div className="flex items-center gap-1 mr-2 opacity-50">
             <Undo2 className="w-4 h-4 cursor-pointer hover:text-black"/>
             <Redo2 className="w-4 h-4 cursor-pointer hover:text-black"/>
           </div>
           <button onClick={saveDesign} disabled={isSaving} className={`px-5 py-1.5 rounded font-bold transition-all shadow-sm ${saveSuccess ? 'bg-[#008060] text-white' : 'bg-[#202223] text-white hover:bg-black'}`}>
             {isSaving ? "Kaydediliyor..." : saveSuccess ? "Kaydedildi!" : "Kaydet"}
           </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        
        {/* ─── SHOPIFY LEFT SIDEBAR (SECTIONS) ─── */}
        <aside className="w-[300px] bg-white border-r border-[#e1e3e5] flex flex-col z-20 shrink-0">
           <div className="flex border-b border-[#e1e3e5] bg-[#fafbfb]">
              <button onClick={()=>setActiveLeftTab("sections")} className={`flex-1 py-3 flex justify-center transition-all ${activeLeftTab === 'sections' ? 'shadow-[inset_0_-2px_0_#2c6ecb] text-[#2c6ecb]' : 'text-[#5c5f62]'}`}>
                <LayoutTemplate className="w-5 h-5" />
              </button>
              <button onClick={()=>setActiveLeftTab("theme")} className={`flex-1 py-3 flex justify-center transition-all ${activeLeftTab === 'theme' ? 'shadow-[inset_0_-2px_0_#2c6ecb] text-[#2c6ecb]' : 'text-[#5c5f62]'}`}>
                <Palette className="w-5 h-5" />
              </button>
              <button onClick={()=>setActiveLeftTab("settings")} className={`flex-1 py-3 flex justify-center transition-all ${activeLeftTab === 'settings' ? 'shadow-[inset_0_-2px_0_#2c6ecb] text-[#2c6ecb]' : 'text-[#5c5f62]'}`}>
                <Settings className="w-5 h-5" />
              </button>
           </div>

           <div className="flex-1 overflow-y-auto custom-scrollbar">
              {activeLeftTab === "sections" && (
                <div className="p-0">
                  <div className="px-4 py-3 font-bold bg-white sticky top-0 z-10 border-b border-[#f1f1f1]">Ana sayfa</div>
                  
                  {/* Header Area */}
                  <div className="bg-[#f6f6f7] px-4 py-1.5 text-[11px] font-bold text-[#5c5f62] uppercase tracking-wider flex justify-between items-center border-b border-[#e1e3e5]">
                    <span>Üstbilgi</span>
                  </div>
                  <div className="divide-y divide-[#f1f1f1]">
                     <div className="px-4 py-2 flex items-center gap-3 hover:bg-[#f6f6f7] cursor-pointer group">
                        <ChevronRight className="w-4 h-4 text-[#babfc3]" /> <Layout className="w-4 h-4 text-[#5c5f62]" /> <span>Duyuru çubuğu</span>
                     </div>
                     <div className="px-4 py-2 flex items-center gap-3 hover:bg-[#f6f6f7] cursor-pointer group">
                        <ChevronRight className="w-4 h-4 text-[#babfc3]" /> <Layout className="w-4 h-4 text-[#5c5f62]" /> <span>Header</span>
                     </div>
                  </div>

                  {/* Template Area (Dynamic Blocks) */}
                  <div className="bg-[#f6f6f7] px-4 py-1.5 text-[11px] font-bold text-[#5c5f62] uppercase tracking-wider mt-4 border-b border-[#e1e3e5]">
                    Şablon
                  </div>
                  <div className="divide-y divide-[#f1f1f1]">
                     {blocks.map((block) => (
                       <div key={block.id}>
                          <div 
                            onClick={() => setSelectedBlockId(block.id)}
                            className={`px-4 py-2.5 flex items-center gap-3 cursor-pointer group transition-all ${selectedBlockId === block.id ? 'bg-[#f0f7ff] border-l-4 border-[#2c6ecb]' : 'hover:bg-[#f6f6f7]'}`}
                          >
                             <GripVertical className="w-4 h-4 text-[#babfc3] cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100" />
                             <ChevronRight className={`w-4 h-4 text-[#babfc3] transition-transform ${selectedBlockId === block.id ? 'rotate-90 text-[#2c6ecb]' : ''}`} />
                             <Box className={`w-4 h-4 ${selectedBlockId === block.id ? 'text-[#2c6ecb]' : 'text-[#5c5f62]'}`} />
                             <span className={selectedBlockId === block.id ? 'font-bold' : ''}>{block.type}</span>
                          </div>
                          {selectedBlockId === block.id && (
                            <div className="pl-12 py-2 space-y-1 bg-white border-b border-[#f1f1f1]">
                               {Object.keys(block.content || {}).map(key => (
                                 <div key={key} className="text-[12px] text-[#5c5f62] py-1 hover:text-black cursor-pointer flex items-center gap-2">
                                    <div className="w-1 h-1 rounded-full bg-[#babfc3]"></div> {key}
                                 </div>
                               ))}
                            </div>
                          )}
                       </div>
                     ))}
                     
                     <button onClick={()=>setIsAddSectionOpen(true)} className="w-full px-12 py-3 text-left text-[#2c6ecb] text-[13px] font-medium flex items-center gap-2 hover:bg-blue-50 transition-colors">
                        <Plus className="w-4 h-4" /> Bölüm ekle
                     </button>
                  </div>

                  {/* Footer Area */}
                  <div className="bg-[#f6f6f7] px-4 py-1.5 text-[11px] font-bold text-[#5c5f62] uppercase tracking-wider mt-4 border-b border-[#e1e3e5]">
                    Altbilgi
                  </div>
                  <div className="divide-y divide-[#f1f1f1]">
                     <div className="px-4 py-2 flex items-center gap-3 hover:bg-[#f6f6f7] cursor-pointer">
                        <ChevronRight className="w-4 h-4 text-[#babfc3]" /> <Layout className="w-4 h-4 text-[#5c5f62]" /> <span>Footer</span>
                     </div>
                  </div>
                </div>
              )}

              {activeLeftTab === "theme" && (
                <div className="p-4 space-y-6">
                   <h3 className="font-bold text-[14px]">Tema ayarları</h3>
                   <div className="space-y-3">
                      {["Renkler", "Tipografi", "Düzen", "Düğmeler", "Ürün kartları", "Medya", "Sosyal medya"].map(item => (
                        <div key={item} className="p-3 bg-[#f6f6f7] rounded border border-[#e1e3e5] flex justify-between items-center cursor-pointer hover:bg-white hover:shadow-sm transition-all group">
                           <span className="text-[13px] font-medium text-[#202223]">{item}</span>
                           <ChevronRight className="w-4 h-4 text-[#babfc3] group-hover:text-black" />
                        </div>
                      ))}
                   </div>
                </div>
              )}
           </div>
        </aside>

        {/* ─── CENTER PREVIEW ─── */}
        <main className="flex-1 bg-[#f4f6f8] flex flex-col relative overflow-hidden">
          <div className="flex-1 overflow-auto flex justify-center p-6 relative">
            <div 
              className="bg-white shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-all duration-300 relative border border-[#e1e3e5] overflow-hidden"
              style={{ width: deviceWidths[viewMode], height: '100%', minHeight: '800px' }}
            >
              {isLoadingData && (
                <div className="absolute inset-0 flex items-center justify-center bg-white z-50">
                   <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                </div>
              )}
              <iframe ref={iframeRef} src="/" className="w-full h-full border-0" />
              
              {/* Floating Add Section Button in Preview (Shopify Style) */}
              <div className="absolute inset-x-0 bottom-20 flex justify-center pointer-events-none">
                 <button onClick={()=>setIsAddSectionOpen(true)} className="pointer-events-auto bg-[#202223] text-white text-[12px] font-bold px-4 py-2 rounded shadow-2xl hover:scale-105 transition-all flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Bölüm ekle
                 </button>
              </div>
            </div>
          </div>

          {/* ─── ADD SECTION MODAL (DETAILED CLONE) ─── */}
          {isAddSectionOpen && (
            <div className="absolute inset-0 z-[100] flex items-center justify-center px-4 animate-fade-in">
               <div className="absolute inset-0 bg-[#202223]/40 backdrop-blur-sm" onClick={()=>setIsAddSectionOpen(false)}></div>
               
               <div className="relative w-full max-w-[900px] bg-white rounded-xl shadow-2xl border border-[#e1e3e5] flex h-[650px] overflow-hidden">
                  {/* Left: Section Browser */}
                  <div className="w-[320px] border-r border-[#e1e3e5] flex flex-col bg-white">
                     <div className="p-4 border-b border-[#e1e3e5]">
                        <div className="relative">
                          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#5c5f62]" />
                          <input type="text" placeholder="Bölüm ara" className="w-full bg-[#f6f6f7] border border-[#e1e3e5] rounded-lg py-2 pl-10 pr-3 text-[13px] outline-none focus:ring-2 focus:ring-blue-600/20" />
                        </div>
                     </div>
                     <div className="flex border-b border-[#e1e3e5]">
                        <button className="flex-1 py-3 text-[12px] font-bold border-b-2 border-[#2c6ecb] text-[#2c6ecb]">Bölümler</button>
                        <button className="flex-1 py-3 text-[12px] font-bold text-[#5c5f62]">Uygulamalar</button>
                     </div>
                     <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
                        {sectionTemplates.map(cat => (
                          <div key={cat.category} className="mb-6">
                             <div className="px-3 py-1 text-[11px] font-bold text-[#5c5f62] uppercase tracking-wider mb-1">{cat.category}</div>
                             <div className="space-y-0.5">
                                {cat.items.map(item => (
                                  <div 
                                    key={item.id} 
                                    onMouseEnter={() => setHoveredTemplate(item)}
                                    onClick={() => addSection(item)}
                                    className="px-3 py-2.5 text-[13px] hover:bg-[#f6f6f7] rounded-lg cursor-pointer flex items-center gap-3 group transition-colors"
                                  >
                                     <div className="w-8 h-8 rounded bg-[#f1f1f1] flex items-center justify-center text-[#babfc3] group-hover:text-[#5c5f62] transition-colors">
                                        <Box className="w-4 h-4" />
                                     </div>
                                     <span className="font-medium">{item.name}</span>
                                     <Plus className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 text-[#2c6ecb]" />
                                  </div>
                                ))}
                             </div>
                          </div>
                        ))}
                     </div>
                  </div>

                  {/* Right: Rich Preview Area */}
                  <div className="flex-1 bg-[#f4f6f8] flex flex-col items-center justify-center p-12 relative overflow-hidden">
                     {hoveredTemplate ? (
                       <div className="w-full h-full flex flex-col animate-fade-in">
                          <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-[#e1e3e5] flex-1 flex flex-col">
                             <div className="h-6 bg-[#f1f1f1] border-b border-[#e1e3e5] flex items-center px-2 gap-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                                <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                                <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                             </div>
                             <img src={hoveredTemplate.img} alt="Preview" className="w-full h-full object-cover" />
                          </div>
                          <div className="mt-6 text-center">
                             <h3 className="font-bold text-[#202223] text-lg">{hoveredTemplate.name}</h3>
                             <p className="text-[#5c5f62] mt-1">{hoveredTemplate.desc}</p>
                          </div>
                       </div>
                     ) : (
                       <div className="text-center space-y-4 max-w-sm">
                          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
                             <Sparkles className="w-10 h-10" />
                          </div>
                          <div className="text-[#202223] font-bold text-xl">Sitenizi İnşa Edin</div>
                          <div className="text-[#5c5f62] text-[15px]">Soldaki listeden bir bölüm seçerek önizlemesini buradan görebilirsiniz. Sınırsız tasarım gücü elinizde.</div>
                       </div>
                     )}
                     
                     <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6">
                        <div className="flex gap-1">
                           {[1,2,3].map(i => <div key={i} className={`w-1.5 h-1.5 rounded-full ${i===1 ? 'bg-blue-600' : 'bg-slate-300'}`}></div>)}
                        </div>
                        <button className="text-[12px] font-bold text-[#2c6ecb] flex items-center gap-1">
                           Rehberi Gör <BookOpen className="w-4 h-4" />
                        </button>
                     </div>
                  </div>
                  
                  <button onClick={()=>setIsAddSectionOpen(false)} className="absolute top-4 right-4 p-2 hover:bg-[#f1f1f1] rounded-full transition-colors text-[#5c5f62]">
                     <X className="w-5 h-5" />
                  </button>
               </div>
            </div>
          )}
        </main>

        {/* ─── SHOPIFY RIGHT SIDEBAR (DYNAMIC SETTINGS) ─── */}
        <aside className="w-[300px] bg-white border-l border-[#e1e3e5] flex flex-col z-20 shrink-0">
          <div className="p-4 border-b border-[#e1e3e5] flex items-center justify-between bg-[#fafbfb]">
             <h2 className="font-bold text-[14px]">{selectedBlock ? selectedBlock.type : "Bölüm Seçin"}</h2>
             <MoreHorizontal className="w-4 h-4 text-[#5c5f62] cursor-pointer" />
          </div>

          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-6">
            {!selectedBlock ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#5c5f62]">
                 <LayoutTemplate className="w-10 h-10 mb-4 opacity-20" />
                 <p className="font-medium">Düzenlemek istediğiniz bölümü sol menüden seçin.</p>
              </div>
            ) : (
              <div className="space-y-6 animate-fade-in">
                 {/* Content Settings */}
                 <div className="space-y-5">
                    {Object.entries(selectedBlock.content || {}).map(([key, value]: [string, any]) => (
                      <div key={key} className="space-y-1.5">
                         <label className="text-[12px] font-medium text-[#202223] capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                         {key.toLowerCase().includes('text') || key.toLowerCase().includes('subtitle') || key.toLowerCase().includes('title') ? (
                           <textarea 
                              value={value}
                              onChange={(e) => updateBlockContent(selectedBlock.id, key, e.target.value)}
                              className="w-full h-24 bg-white border border-[#babfc3] rounded-md px-3 py-2 text-[13px] outline-none focus:border-[#2c6ecb] focus:ring-1 focus:ring-[#2c6ecb] transition-all resize-none shadow-sm" 
                           />
                         ) : (
                           <input 
                              type="text"
                              value={value}
                              onChange={(e) => updateBlockContent(selectedBlock.id, key, e.target.value)}
                              className="w-full bg-white border border-[#babfc3] rounded-md px-3 py-2 text-[13px] outline-none focus:border-[#2c6ecb] shadow-sm" 
                           />
                         )}
                      </div>
                    ))}
                 </div>

                 {/* Style Settings Area */}
                 <div className="pt-6 border-t border-[#f1f1f1] space-y-4">
                    <h3 className="text-[12px] font-bold text-[#5c5f62] uppercase tracking-wider">Hizalama & Stil</h3>
                    <div className="flex gap-2">
                       <button className="flex-1 py-2 bg-white border border-[#e1e3e5] rounded flex items-center justify-center hover:bg-[#f6f6f7]"><AlignLeft className="w-4 h-4"/></button>
                       <button className="flex-1 py-2 bg-white border border-[#e1e3e5] rounded flex items-center justify-center hover:bg-[#f6f6f7]"><Type className="w-4 h-4"/></button>
                       <button className="flex-1 py-2 bg-white border border-[#e1e3e5] rounded flex items-center justify-center hover:bg-[#f6f6f7]"><Palette className="w-4 h-4"/></button>
                    </div>
                 </div>

                 <div className="pt-6 border-t border-[#f1f1f1]">
                    <h3 className="text-[12px] font-bold text-[#5c5f62] uppercase tracking-wider mb-2">Özel CSS (Bu Bölüm)</h3>
                    <textarea 
                       placeholder="/* Sadece bu bölüme özel CSS */"
                       className="w-full h-32 bg-[#0a0a0a] border border-slate-700 rounded-md p-3 text-emerald-400 font-mono text-[11px] outline-none focus:border-emerald-500" 
                    />
                 </div>
              </div>
            )}
          </div>

          {selectedBlock && (
            <div className="p-3 border-t border-[#e1e3e5] bg-[#fafbfb]">
               <button 
                onClick={() => removeBlock(selectedBlock.id)}
                className="w-full py-2.5 bg-white border border-[#e1e3e5] rounded-lg flex items-center justify-center gap-2 text-red-600 text-[12px] font-bold hover:bg-red-50 transition-all active:scale-95"
               >
                  <Trash2 className="w-4 h-4" /> Bölümü kaldır
               </button>
            </div>
          )}
        </aside>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #babfc3; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #5c5f62; }
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.2s ease-out forwards; }
      `}} />
    </div>
  );
}
