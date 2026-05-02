"use client";

import { useState, useRef, useEffect } from "react";
import { 
  Monitor, Smartphone, Tablet, Save, LayoutTemplate, 
  Settings, Plus, Layers, Image as ImageIcon,
  Type, MousePointer2, Paintbrush, ChevronRight, CheckCircle2,
  RefreshCw, Loader2, ArrowLeft, Globe, ShoppingBag, AlignLeft,
  Video, Grid, List, Search, Box, Palette, Code, Star, MessageSquare, Info,
  MoreHorizontal, Undo2, Redo2, Eye, Layout, ChevronDown, Trash2, GripVertical
} from "lucide-react";
import Link from "next/link";

export default function AdvancedBuilderPage() {
  const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [activeLeftTab, setActiveLeftTab] = useState<"sections" | "design" | "settings">("sections");
  const [activeRightTab, setActiveRightTab] = useState<"content" | "style">("content");
  const [isAddSectionOpen, setIsAddSectionOpen] = useState(false);
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);
  
  // Real Database State
  const [heroTitle, setHeroTitle] = useState("Yükleniyor...");
  const [heroSubtitle, setHeroSubtitle] = useState("Yükleniyor...");
  const [buttonText, setButtonText] = useState("Yükleniyor...");
  const [customCss, setCustomCss] = useState("");
  
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const subtitleRef = useRef<HTMLTextAreaElement>(null);
  const buttonRef = useRef<HTMLInputElement>(null);

  // Fetch real data on mount
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/admin/store-content");
        const json = await res.json();
        if (json.data?.blocks) {
          const heroBlock = json.data.blocks.find((b: any) => b.type === "Hero");
          if (heroBlock?.content) {
            setHeroTitle(heroBlock.content.heroTitle || "");
            setHeroSubtitle(heroBlock.content.heroSubtitle || "");
            setButtonText(heroBlock.content.buttonText || "");
            setCustomCss(heroBlock.content.customCss || "");
          }
        }
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
        type: "BUILDER_UPDATE",
        payload: { title: heroTitle, subtitle: heroSubtitle, buttonText, customCss }
      }, "*");
    }
  }, [heroTitle, heroSubtitle, buttonText, customCss, isLoadingData]);

  // Listen for element selection
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "SELECT_ELEMENT") {
        const { name } = event.data.payload;
        setActiveRightTab("content");
        setTimeout(() => {
          if (name === "heroTitle") titleRef.current?.focus();
          if (name === "heroSubtitle") subtitleRef.current?.focus();
          if (name === "buttonText") buttonRef.current?.focus();
        }, 100);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  async function saveDesign() {
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      const res = await fetch("/api/admin/store-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ heroTitle, heroSubtitle, buttonText, buttonLink: "/products", customCss })
      });
      if(res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch(err) {
      alert("Bir hata oluştu");
    } finally {
      setIsSaving(false);
    }
  }

  const sectionTemplates = {
    "Banner'lar": [
      { id: "hero-split", name: "Bölünmüş Vitrin", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=400" },
      { id: "hero-logo", name: "Büyük Logo", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400" },
      { id: "hero-main", name: "Hero", img: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e12?q=80&w=400" },
      { id: "hero-low", name: "Hero: Alt Hizalı", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400" },
    ],
    "Düzen": [
      { id: "divider", name: "Ayırıcı", img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=400" },
      { id: "liquid", name: "Özel Liquid", img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=400" }
    ],
    "Hikaye anlatımı": [
      { id: "blog-grid", name: "Blog gönderileri: Izgara", img: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=400" },
      { id: "video", name: "Video", img: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=400" },
      { id: "carousel", name: "Karusel", img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=400" }
    ]
  };

  const deviceWidths = {
    desktop: "100%",
    tablet: "768px",
    mobile: "375px",
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#f1f1f1] text-[#202223] flex flex-col font-sans select-none overflow-hidden">
      
      {/* ─── SHOPIFY TOP BAR ─── */}
      <header className="h-[48px] bg-white border-b border-[#e1e3e5] flex items-center justify-between px-3 z-30">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="p-1 hover:bg-[#f1f1f1] rounded transition-colors text-[#5c5f62]">
            <Layout className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-1.5 text-[13px] font-medium text-[#202223]">
             <span>Horizon</span>
             <span className="bg-[#e3f1df] text-[#008060] px-2 py-0.5 rounded-full text-[11px] font-bold">Yayında</span>
          </div>
          <div className="w-px h-4 bg-[#e1e3e5] mx-2"></div>
          <div className="flex items-center gap-1 text-[13px] text-[#5c5f62]">
             <Globe className="w-4 h-4" /> <span>Ana sayfa</span> <ChevronDown className="w-3 h-3" />
          </div>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-0.5 bg-[#f1f1f1] p-1 rounded-md">
           <button onClick={() => setViewMode("desktop")} className={`p-1.5 rounded ${viewMode === "desktop" ? "bg-white shadow-sm text-blue-600" : "text-[#5c5f62]"}`}><Monitor className="w-4 h-4"/></button>
           <button onClick={() => setViewMode("tablet")} className={`p-1.5 rounded ${viewMode === "tablet" ? "bg-white shadow-sm text-blue-600" : "text-[#5c5f62]"}`}><Tablet className="w-4 h-4"/></button>
           <button onClick={() => setViewMode("mobile")} className={`p-1.5 rounded ${viewMode === "mobile" ? "bg-white shadow-sm text-blue-600" : "text-[#5c5f62]"}`}><Smartphone className="w-4 h-4"/></button>
        </div>

        <div className="flex items-center gap-2">
           <div className="flex items-center gap-1 mr-2">
             <button className="p-1.5 text-[#babfc3]"><Undo2 className="w-4 h-4"/></button>
             <button className="p-1.5 text-[#babfc3]"><Redo2 className="w-4 h-4"/></button>
           </div>
           <button onClick={saveDesign} disabled={isSaving} className={`px-4 py-1.5 rounded font-bold text-[13px] transition-all shadow-sm ${saveSuccess ? 'bg-[#008060] text-white' : 'bg-slate-900 text-white hover:bg-slate-800'}`}>
             {isSaving ? "Kaydediliyor..." : saveSuccess ? "Kaydedildi!" : "Kaydet"}
           </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        
        {/* ─── SHOPIFY LEFT SIDEBAR ─── */}
        <aside className="w-[300px] bg-white border-r border-[#e1e3e5] flex flex-col z-20">
           <div className="flex border-b border-[#e1e3e5]">
              <button onClick={()=>setActiveLeftTab("sections")} className={`flex-1 py-3 flex justify-center border-b-2 transition-colors ${activeLeftTab === 'sections' ? 'border-blue-600 text-blue-600' : 'border-transparent text-[#5c5f62]'}`}>
                <LayoutTemplate className="w-5 h-5" />
              </button>
              <button onClick={()=>setActiveLeftTab("settings")} className={`flex-1 py-3 flex justify-center border-b-2 transition-colors ${activeLeftTab === 'settings' ? 'border-blue-600 text-blue-600' : 'border-transparent text-[#5c5f62]'}`}>
                <Settings className="w-5 h-5" />
              </button>
              <button onClick={()=>setActiveLeftTab("design")} className={`flex-1 py-3 flex justify-center border-b-2 transition-colors ${activeLeftTab === 'design' ? 'border-blue-600 text-blue-600' : 'border-transparent text-[#5c5f62]'}`}>
                <Palette className="w-5 h-5" />
              </button>
           </div>

           <div className="flex-1 overflow-y-auto custom-scrollbar">
              {activeLeftTab === "sections" && (
                <div className="p-0">
                  <div className="px-4 py-3 font-bold text-[13px] border-b border-[#f1f1f1]">Ana sayfa</div>
                  
                  {/* Header Section */}
                  <div className="bg-[#f6f6f7] px-4 py-2 text-[11px] font-bold text-[#5c5f62] uppercase tracking-wider flex justify-between items-center">
                    <span>Header</span>
                  </div>
                  <div className="divide-y divide-[#f1f1f1]">
                     <div className="px-4 py-2.5 flex items-center gap-3 hover:bg-[#f6f6f7] cursor-pointer text-[13px]">
                        <ChevronRight className="w-4 h-4 text-[#babfc3]" /> <Layout className="w-4 h-4 text-[#5c5f62]" /> <span>Duyuru çubuğu</span>
                     </div>
                     <div className="px-4 py-2.5 flex items-center gap-3 hover:bg-[#f6f6f7] cursor-pointer text-[13px]">
                        <ChevronRight className="w-4 h-4 text-[#babfc3]" /> <Layout className="w-4 h-4 text-[#5c5f62]" /> <span>Üstbilgi</span>
                     </div>
                     <button onClick={()=>setIsAddSectionOpen(true)} className="w-full px-10 py-2 text-left text-blue-600 text-[12px] font-medium flex items-center gap-2 hover:bg-blue-50">
                        <Plus className="w-3.5 h-3.5" /> Bölüm ekle
                     </button>
                  </div>

                  {/* Main Template Section */}
                  <div className="bg-[#f6f6f7] px-4 py-2 text-[11px] font-bold text-[#5c5f62] uppercase tracking-wider mt-4">
                    Şablon
                  </div>
                  <div className="divide-y divide-[#f1f1f1]">
                     <div onClick={() => titleRef.current?.focus()} className="px-4 py-2.5 flex items-center gap-3 bg-blue-50/50 border-l-4 border-blue-600 cursor-pointer text-[13px] font-bold">
                        <ChevronRight className="w-4 h-4 text-blue-600 transform rotate-90" /> <ImageIcon className="w-4 h-4 text-blue-600" /> <span>Hero Alanı</span>
                     </div>
                     <div className="pl-10 space-y-1 py-2 bg-white">
                        <div onClick={() => titleRef.current?.focus()} className="flex items-center gap-2 py-1 text-[12px] text-[#5c5f62] hover:text-[#202223] cursor-pointer"><GripVertical className="w-3 h-3 text-[#babfc3]"/> Ana Başlık</div>
                        <div onClick={() => subtitleRef.current?.focus()} className="flex items-center gap-2 py-1 text-[12px] text-[#5c5f62] hover:text-[#202223] cursor-pointer"><GripVertical className="w-3 h-3 text-[#babfc3]"/> Alt Açıklama</div>
                        <div onClick={() => buttonRef.current?.focus()} className="flex items-center gap-2 py-1 text-[12px] text-[#5c5f62] hover:text-[#202223] cursor-pointer"><GripVertical className="w-3 h-3 text-[#babfc3]"/> Aksiyon Butonu</div>
                     </div>
                     <div className="px-4 py-2.5 flex items-center gap-3 hover:bg-[#f6f6f7] cursor-pointer text-[13px]">
                        <ChevronRight className="w-4 h-4 text-[#babfc3]" /> <Grid className="w-4 h-4 text-[#5c5f62]" /> <span>Featured collection</span>
                     </div>
                     <button onClick={()=>setIsAddSectionOpen(true)} className="w-full px-10 py-2 text-left text-blue-600 text-[12px] font-medium flex items-center gap-2 hover:bg-blue-50">
                        <Plus className="w-3.5 h-3.5" /> Bölüm ekle
                     </button>
                  </div>

                  {/* Footer Section */}
                  <div className="bg-[#f6f6f7] px-4 py-2 text-[11px] font-bold text-[#5c5f62] uppercase tracking-wider mt-4">
                    Footer
                  </div>
                  <div className="divide-y divide-[#f1f1f1]">
                     <button onClick={()=>setIsAddSectionOpen(true)} className="w-full px-10 py-2 text-left text-blue-600 text-[12px] font-medium flex items-center gap-2 hover:bg-blue-50">
                        <Plus className="w-3.5 h-3.5" /> Bölüm ekle
                     </button>
                     <div className="px-4 py-2.5 flex items-center gap-3 hover:bg-[#f6f6f7] cursor-pointer text-[13px]">
                        <ChevronRight className="w-4 h-4 text-[#babfc3]" /> <Layout className="w-4 h-4 text-[#5c5f62]" /> <span>Altbilgi</span>
                     </div>
                  </div>
                </div>
              )}

              {activeLeftTab === "design" && (
                <div className="p-4 space-y-4">
                   <h3 className="font-bold text-[13px]">Tema ayarları</h3>
                   <div className="space-y-2">
                      <div className="p-3 bg-[#f6f6f7] rounded-md flex justify-between items-center cursor-pointer hover:bg-[#f1f1f1]">
                         <span className="text-[13px]">Renkler</span> <ChevronRight className="w-4 h-4 text-[#babfc3]"/>
                      </div>
                      <div className="p-3 bg-[#f6f6f7] rounded-md flex justify-between items-center cursor-pointer hover:bg-[#f1f1f1]">
                         <span className="text-[13px]">Tipografi</span> <ChevronRight className="w-4 h-4 text-[#babfc3]"/>
                      </div>
                      <div className="p-3 bg-[#f6f6f7] rounded-md flex justify-between items-center cursor-pointer hover:bg-[#f1f1f1]">
                         <span className="text-[13px]">Düğmeler</span> <ChevronRight className="w-4 h-4 text-[#babfc3]"/>
                      </div>
                   </div>
                </div>
              )}
           </div>
        </aside>

        {/* ─── MAIN PREVIEW ─── */}
        <main className="flex-1 bg-[#f4f6f8] flex flex-col relative overflow-hidden">
          
          {/* Iframe Content */}
          <div className="flex-1 overflow-auto flex justify-center p-4 relative z-0">
            <div 
              className="bg-white shadow-2xl transition-all duration-300 relative border border-[#e1e3e5] overflow-hidden"
              style={{ width: deviceWidths[viewMode], height: '100%', minHeight: '800px' }}
            >
              {isLoadingData ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-[60]">
                   <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-2" />
                   <p className="text-[12px] font-bold text-[#5c5f62]">Düzenleyici Yükleniyor...</p>
                </div>
              ) : (
                <iframe 
                   ref={iframeRef}
                   src="/"
                   className="w-full h-full border-0"
                />
              )}
              
              {/* Overlay for Bölüm Ekle Button in Preview */}
              <div className="absolute inset-x-0 bottom-[20%] flex justify-center pointer-events-none">
                 <button onClick={()=>setIsAddSectionOpen(true)} className="pointer-events-auto bg-[#202223] text-white text-[11px] font-bold px-4 py-1.5 rounded shadow-xl hover:bg-[#1a1a1a] flex items-center gap-1.5 transition-all">
                    Bölüm ekle
                 </button>
              </div>
            </div>
          </div>

          {/* ─── ADD SECTION MODAL (SHOPIFY CLONE) ─── */}
          {isAddSectionOpen && (
            <div className="absolute inset-0 z-[100] flex items-start justify-center pt-10 px-4 animate-fade-in">
               <div className="absolute inset-0 bg-black/10" onClick={()=>setIsAddSectionOpen(false)}></div>
               
               <div className="relative w-full max-w-[800px] bg-white rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-[#e1e3e5] flex h-[600px] overflow-hidden">
                  {/* Modal Left: Search & Categories */}
                  <div className="w-[300px] border-r border-[#e1e3e5] flex flex-col">
                     <div className="p-3 border-b border-[#e1e3e5] relative">
                        <Search className="w-4 h-4 absolute left-6 top-6 text-[#5c5f62]" />
                        <input type="text" placeholder="Bölüm ara" className="w-full bg-[#f6f6f7] border border-[#e1e3e5] rounded-md py-2 pl-10 pr-3 text-[13px] outline-none focus:border-blue-600" />
                     </div>
                     <div className="flex border-b border-[#e1e3e5]">
                        <button className="flex-1 py-2 text-[12px] font-bold border-b-2 border-blue-600 bg-blue-50/20">Bölümler</button>
                        <button className="flex-1 py-2 text-[12px] font-bold text-[#5c5f62]">Uygulamalar</button>
                     </div>
                     <div className="flex-1 overflow-y-auto p-2 space-y-6 custom-scrollbar">
                        {Object.entries(sectionTemplates).map(([category, items]) => (
                          <div key={category}>
                             <div className="px-2 py-1 text-[11px] font-bold text-[#5c5f62] uppercase tracking-wider">{category}</div>
                             <div className="mt-1 space-y-0.5">
                                {items.map(item => (
                                  <div 
                                    key={item.id} 
                                    onMouseEnter={() => setHoveredTemplate(item.img)}
                                    className="px-3 py-2 text-[13px] hover:bg-[#f6f6f7] rounded cursor-pointer flex items-center gap-3 group"
                                  >
                                     <ImageIcon className="w-4 h-4 text-[#babfc3] group-hover:text-[#5c5f62]" />
                                     <span>{item.name}</span>
                                  </div>
                                ))}
                             </div>
                          </div>
                        ))}
                     </div>
                  </div>

                  {/* Modal Right: Preview */}
                  <div className="flex-1 bg-[#f4f6f8] flex flex-col items-center justify-center p-8 relative">
                     {hoveredTemplate ? (
                       <div className="w-full h-full flex flex-col items-center animate-fade-in">
                          <img src={hoveredTemplate} alt="Preview" className="w-full h-[300px] object-cover rounded-lg shadow-2xl border-4 border-white mb-6" />
                          <p className="text-[#5c5f62] text-[13px] text-center max-w-xs font-medium">Bu bölümü ekleyerek sitenizin görünümünü anında değiştirebilirsiniz.</p>
                       </div>
                     ) : (
                       <div className="text-center space-y-4">
                          <div className="text-purple-600 font-bold text-lg">Bir fikriniz mi var?</div>
                          <div className="text-[#5c5f62] text-[14px]">Hadi hayata geçirelim. Sola bakarak bir bölüm seçin.</div>
                       </div>
                     )}
                     
                     <div className="absolute bottom-6 flex gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                     </div>
                  </div>
               </div>
            </div>
          )}
        </main>

        {/* ─── SHOPIFY RIGHT SIDEBAR (SETTINGS) ─── */}
        <aside className="w-[300px] bg-white border-l border-[#e1e3e5] flex flex-col z-20 shadow-[-10px_0_30px_rgba(0,0,0,0.02)]">
          <div className="p-4 border-b border-[#e1e3e5] flex items-center justify-between">
             <h2 className="font-bold text-[14px]">Hero Alanı</h2>
             <MoreHorizontal className="w-4 h-4 text-[#5c5f62]" />
          </div>

          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-6">
            
            {activeRightTab === "content" && (
               <div className="space-y-6 animate-fade-in">
                  <div className="space-y-4">
                     <div className="space-y-1.5">
                        <label className="text-[12px] font-medium text-[#202223]">Ana Başlık</label>
                        <textarea 
                           ref={titleRef}
                           value={heroTitle}
                           onChange={(e) => setHeroTitle(e.target.value)}
                           className="w-full h-20 bg-white border border-[#babfc3] rounded-md px-3 py-2 text-[13px] outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all resize-none shadow-inner" 
                        />
                     </div>

                     <div className="space-y-1.5">
                        <label className="text-[12px] font-medium text-[#202223]">Alt Açıklama</label>
                        <textarea 
                           ref={subtitleRef}
                           value={heroSubtitle}
                           onChange={(e) => setHeroSubtitle(e.target.value)}
                           className="w-full h-24 bg-white border border-[#babfc3] rounded-md px-3 py-2 text-[13px] outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all resize-none shadow-inner" 
                        />
                     </div>

                     <div className="space-y-1.5">
                        <label className="text-[12px] font-medium text-[#202223]">Düğme Etiketi</label>
                        <input 
                           ref={buttonRef}
                           type="text"
                           value={buttonText}
                           onChange={(e) => setButtonText(e.target.value)}
                           className="w-full bg-white border border-[#babfc3] rounded-md px-3 py-2 text-[13px] outline-none focus:border-blue-600 shadow-inner" 
                        />
                     </div>
                  </div>

                  <div className="pt-4 border-t border-[#f1f1f1]">
                     <button onClick={()=>setCustomCss("h1 { color: #d4af37 !important; text-shadow: 2px 2px 4px rgba(0,0,0,0.5); }\nbutton { border-radius: 50px !important; }")} className="w-full py-2 bg-[#f6f6f7] border border-[#e1e3e5] rounded text-[12px] font-bold text-[#202223] hover:bg-[#f1f1f1] transition-colors">
                        Altın Stilini Uygula (Custom CSS)
                     </button>
                  </div>
               </div>
            )}

            {activeRightTab === "design" && (
               <div className="space-y-4">
                  <div className="space-y-2">
                     <label className="text-[12px] font-medium">Özel CSS</label>
                     <textarea 
                        value={customCss}
                        onChange={(e) => setCustomCss(e.target.value)}
                        placeholder="Örn: h1 { color: red; }"
                        className="w-full h-96 bg-[#0a0a0a] border border-slate-700 rounded-md p-3 text-emerald-400 font-mono text-[12px] outline-none focus:border-emerald-500 custom-scrollbar" 
                     />
                  </div>
               </div>
            )}
          </div>

          <div className="p-3 border-t border-[#e1e3e5] bg-[#f6f6f7]">
             <button className="w-full py-2 bg-white border border-[#e1e3e5] rounded flex items-center justify-center gap-2 text-red-600 text-[12px] font-bold hover:bg-red-50 transition-colors">
                <Trash2 className="w-4 h-4" /> Bölümü kaldır
             </button>
          </div>
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
