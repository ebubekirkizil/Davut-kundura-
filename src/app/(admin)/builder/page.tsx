"use client";

import { useState, useRef, useEffect } from "react";
import { 
  Monitor, Smartphone, Tablet, Save, LayoutTemplate, 
  Settings, Plus, Layers, Image as ImageIcon,
  Type, MousePointer2, Paintbrush, ChevronRight, CheckCircle2,
  RefreshCw, Loader2, ArrowLeft, Globe, ShoppingBag, AlignLeft
} from "lucide-react";
import Link from "next/link";

export default function AdvancedBuilderPage() {
  const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [activeLeftTab, setActiveLeftTab] = useState<"add" | "templates" | "layers">("add");
  const [activeRightTab, setActiveRightTab] = useState<"content" | "style">("content");
  
  // Real Database State
  const [heroTitle, setHeroTitle] = useState("Yükleniyor...");
  const [heroSubtitle, setHeroSubtitle] = useState("Yükleniyor...");
  const [buttonText, setButtonText] = useState("Yükleniyor...");
  
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

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
          } else {
             // Defaults if no block exists
             setHeroTitle("Zarafetin Adımları.");
             setHeroSubtitle("Usta ellerde işlenen hakiki deri, modern silüetlerle buluşuyor.");
             setButtonText("KOLEKSİYONU KEŞFET");
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

  // Sync state to iframe when changed
  useEffect(() => {
    if (!isLoadingData && iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage({
        type: "BUILDER_UPDATE",
        payload: { title: heroTitle, subtitle: heroSubtitle, buttonText }
      }, "*");
    }
  }, [heroTitle, heroSubtitle, buttonText, isLoadingData]);

  async function saveDesign() {
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      const res = await fetch("/api/admin/store-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ heroTitle, heroSubtitle, buttonText, buttonLink: "/products" })
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

  const deviceWidths = {
    desktop: "100%",
    tablet: "768px",
    mobile: "375px",
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#f4f5f7] text-[#1e293b] flex flex-col font-sans">
      
      {/* ─── MODERN HEADER (APPLE/WEBFLOW STYLE) ─── */}
      <header className="h-[60px] bg-white border-b border-slate-200 flex items-center justify-between px-4 shadow-sm z-20">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors text-slate-500">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center shadow-md">
               <Paintbrush className="w-4 h-4 text-white" />
            </div>
            <div>
               <h1 className="font-bold text-[15px] text-slate-800 leading-tight">Görsel Mağaza Düzenleyici</h1>
               <p className="text-[11px] font-medium text-slate-500">davutkundura.shop (Canlı Bağlantı)</p>
            </div>
          </div>
        </div>

        {/* Device Toggles (Center) */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 shadow-inner">
          <button onClick={() => setViewMode("desktop")} className={`p-2 rounded-lg transition-all ${viewMode === "desktop" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>
            <Monitor className="w-[18px] h-[18px]" />
          </button>
          <button onClick={() => setViewMode("tablet")} className={`p-2 rounded-lg transition-all ${viewMode === "tablet" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>
            <Tablet className="w-[18px] h-[18px]" />
          </button>
          <button onClick={() => setViewMode("mobile")} className={`p-2 rounded-lg transition-all ${viewMode === "mobile" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>
            <Smartphone className="w-[18px] h-[18px]" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {saveSuccess && (
            <span className="flex items-center gap-1.5 text-green-600 bg-green-50 px-3 py-1.5 rounded-full text-[12px] font-bold animate-fade-in border border-green-200">
              <CheckCircle2 className="w-4 h-4" /> Yayında
            </span>
          )}
          <a href="/" target="_blank" className="flex items-center gap-1.5 px-4 py-2 text-slate-600 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-[13px] font-bold transition-colors shadow-sm">
            <Globe className="w-4 h-4" /> Siteye Git
          </a>
          <button onClick={saveDesign} disabled={isSaving || isLoadingData} className="flex items-center gap-2 px-6 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-[13px] font-bold transition-all shadow-md disabled:opacity-50">
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {isSaving ? "Kaydediliyor..." : "Değişiklikleri Yayınla"}
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        
        {/* ─── LEFT SIDEBAR: ELEMENTS & TEMPLATES ─── */}
        <aside className="w-[320px] bg-white border-r border-slate-200 flex flex-col z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
           <div className="flex p-2 gap-1 border-b border-slate-100">
              <button onClick={()=>setActiveLeftTab("add")} className={`flex-1 flex flex-col items-center gap-1.5 py-3 rounded-lg transition-all ${activeLeftTab === 'add' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-500 hover:bg-slate-50'}`}>
                <Plus className="w-5 h-5" /> <span className="text-[11px]">Bileşenler</span>
              </button>
              <button onClick={()=>setActiveLeftTab("templates")} className={`flex-1 flex flex-col items-center gap-1.5 py-3 rounded-lg transition-all ${activeLeftTab === 'templates' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-500 hover:bg-slate-50'}`}>
                <LayoutTemplate className="w-5 h-5" /> <span className="text-[11px]">Şablonlar</span>
              </button>
              <button onClick={()=>setActiveLeftTab("layers")} className={`flex-1 flex flex-col items-center gap-1.5 py-3 rounded-lg transition-all ${activeLeftTab === 'layers' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-500 hover:bg-slate-50'}`}>
                <Layers className="w-5 h-5" /> <span className="text-[11px]">Katmanlar</span>
              </button>
           </div>

           <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
              {activeLeftTab === "add" && (
                <div className="space-y-6">
                   <div>
                     <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">Temel Bileşenler</h3>
                     <div className="grid grid-cols-2 gap-3">
                       <div className="bg-slate-50 border border-slate-200 hover:border-blue-400 p-3 rounded-xl cursor-grab transition-colors flex flex-col items-center gap-2 text-slate-600">
                         <Type className="w-6 h-6" /> <span className="text-[12px] font-medium">Metin</span>
                       </div>
                       <div className="bg-slate-50 border border-slate-200 hover:border-blue-400 p-3 rounded-xl cursor-grab transition-colors flex flex-col items-center gap-2 text-slate-600">
                         <ImageIcon className="w-6 h-6" /> <span className="text-[12px] font-medium">Görsel</span>
                       </div>
                       <div className="bg-slate-50 border border-slate-200 hover:border-blue-400 p-3 rounded-xl cursor-grab transition-colors flex flex-col items-center gap-2 text-slate-600">
                         <MousePointer2 className="w-6 h-6" /> <span className="text-[12px] font-medium">Buton</span>
                       </div>
                       <div className="bg-slate-50 border border-slate-200 hover:border-blue-400 p-3 rounded-xl cursor-grab transition-colors flex flex-col items-center gap-2 text-slate-600">
                         <ShoppingBag className="w-6 h-6" /> <span className="text-[12px] font-medium">Ürün Kartı</span>
                       </div>
                     </div>
                   </div>
                </div>
              )}

              {activeLeftTab === "templates" && (
                <div className="space-y-4">
                  <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Hazır Seksiyonlar</h3>
                  
                  {/* Template Card 1 */}
                  <div className="group border border-slate-200 rounded-xl overflow-hidden hover:border-blue-500 cursor-pointer transition-all shadow-sm">
                    <div className="h-24 bg-slate-100 p-2 flex items-center justify-center">
                       <div className="w-full h-full bg-white rounded border border-slate-200 flex flex-col items-center justify-center gap-1 shadow-sm relative overflow-hidden">
                         <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900"></div>
                         <div className="w-1/2 h-2 bg-white/20 rounded z-10"></div>
                         <div className="w-1/3 h-1.5 bg-white/10 rounded z-10"></div>
                         <div className="mt-2 w-12 h-3 bg-blue-500 rounded z-10"></div>
                       </div>
                    </div>
                    <div className="p-3 bg-white flex justify-between items-center">
                       <span className="text-[12px] font-bold text-slate-700">Karanlık Hero</span>
                       <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-bold">Uygulandı</span>
                    </div>
                  </div>

                  {/* Template Card 2 */}
                  <div className="group border border-slate-200 rounded-xl overflow-hidden hover:border-blue-500 cursor-pointer transition-all shadow-sm opacity-50 grayscale">
                    <div className="h-24 bg-slate-100 p-2 flex items-center justify-center">
                       <div className="w-full h-full bg-white rounded border border-slate-200 flex flex-col items-center justify-center gap-1 shadow-sm relative overflow-hidden">
                         <div className="w-1/2 h-2 bg-slate-300 rounded z-10"></div>
                         <div className="w-1/3 h-1.5 bg-slate-200 rounded z-10"></div>
                         <div className="mt-2 flex gap-1"><div className="w-8 h-8 bg-slate-200 rounded"></div><div className="w-8 h-8 bg-slate-200 rounded"></div></div>
                       </div>
                    </div>
                    <div className="p-3 bg-white">
                       <span className="text-[12px] font-bold text-slate-700">Ürün Odaklı (Yakında)</span>
                    </div>
                  </div>
                </div>
              )}

              {activeLeftTab === "layers" && (
                <div className="space-y-1">
                   <div className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded cursor-pointer text-slate-700">
                     <ChevronRight className="w-4 h-4 text-slate-400" /> <Globe className="w-4 h-4 text-blue-500" /> <span className="text-[13px] font-medium">Header (Ana Menü)</span>
                   </div>
                   <div className="flex items-center gap-2 p-2 bg-blue-50 border border-blue-100 rounded cursor-pointer text-blue-800 font-medium">
                     <ChevronRight className="w-4 h-4 text-blue-400 transform rotate-90" /> <ImageIcon className="w-4 h-4 text-blue-600" /> <span className="text-[13px]">Hero Alanı</span>
                   </div>
                   <div className="pl-8 space-y-1 mt-1">
                     <div className="flex items-center gap-2 p-1.5 hover:bg-slate-50 rounded text-slate-600 text-[12px]"><Type className="w-3.5 h-3.5" /> Ana Başlık (H1)</div>
                     <div className="flex items-center gap-2 p-1.5 hover:bg-slate-50 rounded text-slate-600 text-[12px]"><Type className="w-3.5 h-3.5" /> Açıklama (P)</div>
                     <div className="flex items-center gap-2 p-1.5 hover:bg-slate-50 rounded text-slate-600 text-[12px]"><MousePointer2 className="w-3.5 h-3.5" /> Keşfet Butonu</div>
                   </div>
                   <div className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded cursor-pointer text-slate-700">
                     <ChevronRight className="w-4 h-4 text-slate-400" /> <Layers className="w-4 h-4 text-purple-500" /> <span className="text-[13px] font-medium">Kayan Yazı (Marquee)</span>
                   </div>
                </div>
              )}
           </div>
        </aside>

        {/* ─── CENTER CANVA: REAL LIVE IFRAME ─── */}
        <main className="flex-1 overflow-auto flex justify-center py-8 relative bg-[url('https://transparenttextures.com/patterns/cubes.png')] bg-[#f4f5f7]">
          {isLoadingData ? (
             <div className="flex flex-col items-center justify-center h-full text-slate-500">
               <RefreshCw className="w-8 h-8 animate-spin mb-4" />
               <p className="font-medium text-sm">Site Verileri Çekiliyor...</p>
             </div>
          ) : (
            <div 
              className="bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-300 relative rounded-b-2xl border border-slate-300 overflow-hidden"
              style={{ width: deviceWidths[viewMode], height: '800px', maxWidth: '100%' }}
            >
              {/* Safari/Browser Mockup Header */}
              <div className="h-8 bg-slate-100 border-b border-slate-200 flex items-center px-4 gap-2 absolute top-0 left-0 right-0 z-50">
                 <div className="flex gap-1.5">
                   <div className="w-3 h-3 rounded-full bg-red-400"></div>
                   <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                   <div className="w-3 h-3 rounded-full bg-green-400"></div>
                 </div>
                 <div className="mx-auto bg-white border border-slate-200 text-slate-400 text-[10px] px-24 py-0.5 rounded-md font-mono flex items-center gap-1">
                    <Globe className="w-3 h-3" /> davutkundura.shop
                 </div>
              </div>

              <div className="absolute top-8 bottom-0 left-0 right-0">
                {/* CANLI SITE (GERÇEK DÜZENLEME) */}
                <iframe 
                   ref={iframeRef}
                   src="/"
                   className="w-full h-full border-0"
                   title="Live Store Preview"
                />
                
                {/* Hover/Edit Target Frame */}
                <div className="absolute top-0 left-0 right-0 h-[600px] pointer-events-none z-50">
                   <div className="absolute top-[20%] left-[5%] right-[5%] bottom-[10%] border-[3px] border-blue-500 rounded-lg shadow-[0_0_0_9999px_rgba(37,99,235,0.05)] transition-all duration-300 flex items-start justify-end p-2">
                      <div className="bg-blue-500 text-white text-[11px] px-3 py-1.5 font-bold uppercase tracking-wider rounded-md shadow-lg pointer-events-auto cursor-pointer hover:bg-blue-600">
                        Hero Alanını Düzenliyorsunuz
                      </div>
                   </div>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* ─── RIGHT SIDEBAR: PROPERTIES INSPECTOR ─── */}
        <aside className="w-[320px] bg-white border-l border-slate-200 flex flex-col z-10 shadow-[-4px_0_24px_rgba(0,0,0,0.02)]">
          <div className="flex border-b border-slate-100 p-2 gap-1">
            <button onClick={() => setActiveRightTab("content")} className={`flex-1 py-2 text-[12px] rounded-lg transition-colors font-bold ${activeRightTab === 'content' ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:bg-slate-50'}`}>
               İçerik Ayarları
            </button>
            <button onClick={() => setActiveRightTab("style")} className={`flex-1 py-2 text-[12px] rounded-lg transition-colors font-bold ${activeRightTab === 'style' ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:bg-slate-50'}`}>
               Tasarım (CSS)
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 custom-scrollbar space-y-6">
            
            {activeRightTab === "content" && (
               <div className="space-y-5 animate-fade-in">
                  <div className="bg-blue-50 border border-blue-100 p-3 rounded-lg flex items-start gap-3">
                     <RefreshCw className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                     <p className="text-[12px] text-blue-800 leading-relaxed font-medium">
                        Aşağıdaki alanlara yazdığınız metinler, ortadaki canlı sitede <strong>anında</strong> güncellenir. Değişiklikleri bitirince sağ üstten "Yayına Al" butonuna basın.
                     </p>
                  </div>

                  <div className="space-y-4">
                     <div>
                        <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2 block flex items-center gap-1.5"><Type className="w-3.5 h-3.5"/> Ana Başlık</label>
                        <textarea 
                           value={heroTitle}
                           onChange={(e) => setHeroTitle(e.target.value)}
                           className="w-full h-20 bg-white border-2 border-slate-200 rounded-xl px-3 py-2 text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-[13px] font-medium transition-all shadow-sm resize-none" 
                        />
                        <p className="text-[10px] text-slate-400 mt-1">İpucu: HTML etiketleri (&lt;br/&gt;, &lt;span&gt;) kullanabilirsiniz.</p>
                     </div>

                     <div>
                        <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2 block flex items-center gap-1.5"><AlignLeft className="w-3.5 h-3.5"/> Alt Açıklama (Paragraf)</label>
                        <textarea 
                           value={heroSubtitle}
                           onChange={(e) => setHeroSubtitle(e.target.value)}
                           className="w-full h-24 bg-white border-2 border-slate-200 rounded-xl px-3 py-2 text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-[13px] font-medium transition-all shadow-sm resize-none" 
                        />
                     </div>

                     <div className="pt-2 border-t border-slate-100">
                        <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2 block flex items-center gap-1.5"><MousePointer2 className="w-3.5 h-3.5"/> Aksiyon Butonu (CTA)</label>
                        <input 
                           type="text"
                           value={buttonText}
                           onChange={(e) => setButtonText(e.target.value)}
                           className="w-full bg-white border-2 border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-[13px] font-medium transition-all shadow-sm" 
                        />
                     </div>
                  </div>
               </div>
            )}

            {activeRightTab === "style" && (
               <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-4 py-12 opacity-60">
                 <Settings className="w-12 h-12" />
                 <p className="text-center text-[13px] font-medium px-4">Stil (CSS) düzenlemeleri şu an aktif şablon tarafından yönetilmektedir. Gelişmiş CSS erişimi yakında eklenecektir.</p>
               </div>
            )}
            
          </div>
        </aside>

      </div>
    </div>
  );
}
