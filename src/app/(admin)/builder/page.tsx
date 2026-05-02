"use client";

import { useState, useRef, useEffect } from "react";
import { 
  Monitor, Smartphone, Tablet, Save, LayoutTemplate, 
  Settings, Plus, Layers, Image as ImageIcon,
  Type, MousePointer2, Paintbrush, ChevronRight, CheckCircle2,
  RefreshCw, Loader2, ArrowLeft, Globe, ShoppingBag, AlignLeft,
  Video, Grid, List, Search, Box, Palette, Code, Star, MessageSquare, Info
} from "lucide-react";
import Link from "next/link";

export default function AdvancedBuilderPage() {
  const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [activeLeftTab, setActiveLeftTab] = useState<"add" | "templates" | "layers">("templates");
  const [activeRightTab, setActiveRightTab] = useState<"content" | "style">("content");
  
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
          } else {
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
        payload: { title: heroTitle, subtitle: heroSubtitle, buttonText, customCss }
      }, "*");
    }
  }, [heroTitle, heroSubtitle, buttonText, customCss, isLoadingData]);

  // Listen for element selection from iframe
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

  const applyTemplate = (tpl: any) => {
    if (tpl.title === "Karanlık Hero") {
      setHeroTitle("Zarafetin Adımları.");
      setHeroSubtitle("Usta ellerde işlenen hakiki deri, modern silüetlerle buluşuyor.");
      setButtonText("KOLEKSİYONU KEŞFET");
    } else if (tpl.title === "Modern Minimal") {
      setHeroTitle("Yeni Sezon: Minimalist Dokunuş");
      setHeroSubtitle("Sadelik, lüksün en saf halidir. Yeni koleksiyonumuzla tanışın.");
      setButtonText("ŞİMDİ AL");
    } else if (tpl.title === "Vintage Luxury") {
      setHeroTitle("1998'den Beri Gelen Miras");
      setHeroSubtitle("Geleneksel el işçiliği, modern tasarım anlayışı ile buluştu.");
      setButtonText("HİKAYEMİZİ KEŞFET");
    }
  };

  const deviceWidths = {
    desktop: "100%",
    tablet: "768px",
    mobile: "375px",
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#f4f5f7] text-[#1e293b] flex flex-col font-sans select-none">
      
      {/* ─── HEADER ─── */}
      <header className="h-[60px] bg-white border-b border-slate-200 flex items-center justify-between px-4 shadow-sm z-20">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors text-slate-500">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center shadow-md">
               <Palette className="w-4 h-4 text-white" />
            </div>
            <div>
               <h1 className="font-bold text-[15px] text-slate-800 leading-tight tracking-tight">Enterprise Store Builder <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded ml-1">PRO</span></h1>
               <p className="text-[11px] font-medium text-slate-500">davutkundura.shop • Canlı Tasarım Modu</p>
            </div>
          </div>
        </div>

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

        <div className="flex items-center gap-3">
          {saveSuccess && (
            <span className="flex items-center gap-1.5 text-green-600 bg-green-50 px-3 py-1.5 rounded-full text-[12px] font-bold animate-fade-in border border-green-200">
              <CheckCircle2 className="w-4 h-4" /> Yayınlandı
            </span>
          )}
          <button onClick={saveDesign} disabled={isSaving || isLoadingData} className="flex items-center gap-2 px-6 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-[13px] font-bold transition-all shadow-md disabled:opacity-50">
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {isSaving ? "İşleniyor..." : "Değişiklikleri Yayınla"}
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        
        {/* ─── LEFT SIDEBAR ─── */}
        <aside className="w-[340px] bg-white border-r border-slate-200 flex flex-col z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
           <div className="flex p-3 gap-1 border-b border-slate-100 bg-slate-50/50">
              <button onClick={()=>setActiveLeftTab("add")} className={`flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl transition-all ${activeLeftTab === 'add' ? 'bg-white text-blue-600 shadow-sm border border-slate-200 font-bold' : 'text-slate-500 hover:bg-slate-100'}`}>
                <Plus className="w-5 h-5" /> <span className="text-[10px] font-bold uppercase tracking-wider">Bileşenler</span>
              </button>
              <button onClick={()=>setActiveLeftTab("templates")} className={`flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl transition-all ${activeLeftTab === 'templates' ? 'bg-white text-blue-600 shadow-sm border border-slate-200 font-bold' : 'text-slate-500 hover:bg-slate-100'}`}>
                <LayoutTemplate className="w-5 h-5" /> <span className="text-[10px] font-bold uppercase tracking-wider">Şablonlar</span>
              </button>
              <button onClick={()=>setActiveLeftTab("layers")} className={`flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl transition-all ${activeLeftTab === 'layers' ? 'bg-white text-blue-600 shadow-sm border border-slate-200 font-bold' : 'text-slate-500 hover:bg-slate-100'}`}>
                <Layers className="w-5 h-5" /> <span className="text-[10px] font-bold uppercase tracking-wider">Katmanlar</span>
              </button>
           </div>

           <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
              {activeLeftTab === "add" && (
                <div className="space-y-6">
                   <div>
                     <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Medya & Metin</h3>
                     <div className="grid grid-cols-2 gap-3">
                       {[
                         { icon: Type, label: "Ana Başlık" },
                         { icon: AlignLeft, label: "Paragraf" },
                         { icon: ImageIcon, label: "Görsel" },
                         { icon: Video, label: "Video" },
                         { icon: Box, label: "Kutu (Div)" },
                         { icon: MousePointer2, label: "Buton" }
                       ].map((item, idx) => (
                         <div key={idx} className="bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md p-4 rounded-2xl cursor-pointer transition-all flex flex-col items-center gap-2.5 text-slate-700 group">
                           <item.icon className="w-6 h-6 text-slate-400 group-hover:text-blue-500 transition-colors" /> 
                           <span className="text-[12px] font-bold">{item.label}</span>
                         </div>
                       ))}
                     </div>
                   </div>

                   <div>
                     <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">E-Ticaret Modülleri</h3>
                     <div className="grid grid-cols-2 gap-3">
                       {[
                         { icon: ShoppingBag, label: "Ürün Kartı" },
                         { icon: Grid, label: "Ürün Izgarası" },
                         { icon: List, label: "Kategoriler" },
                         { icon: Star, label: "Yorumlar" }
                       ].map((item, idx) => (
                         <div key={idx} className="bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md p-4 rounded-2xl cursor-pointer transition-all flex flex-col items-center gap-2.5 text-slate-700 group">
                           <item.icon className="w-6 h-6 text-slate-400 group-hover:text-blue-500 transition-colors" /> 
                           <span className="text-[12px] font-bold">{item.label}</span>
                         </div>
                       ))}
                     </div>
                   </div>
                </div>
              )}

              {activeLeftTab === "templates" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                     <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Premium Seksiyonlar</h3>
                     <span className="text-[10px] text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded">12+ Hazır</span>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      { title: "Karanlık Hero", desc: "Premium Gece Modu", color: "bg-slate-900" },
                      { title: "Modern Minimal", desc: "Temiz ve Aydınlık", color: "bg-blue-600" },
                      { title: "Vintage Luxury", desc: "Klasik ve Şık", color: "bg-amber-800" },
                      { title: "Video Background", desc: "Hareketli Deneyim", color: "bg-purple-700" },
                      { title: "Split Screen", desc: "Yarı Metin Yarı Görsel", color: "bg-emerald-600" }
                    ].map((tpl, i) => (
                      <div 
                        key={i} 
                        onClick={() => applyTemplate(tpl)}
                        className="group border border-slate-200 rounded-2xl overflow-hidden hover:border-blue-500 cursor-pointer transition-all shadow-sm hover:shadow-lg bg-white"
                      >
                        <div className={`h-28 ${tpl.color} p-3 flex items-center justify-center relative overflow-hidden`}>
                           <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                           <div className="w-full h-full bg-white/10 rounded-lg border border-white/20 flex flex-col items-center justify-center gap-1.5 backdrop-blur-sm">
                             <div className="w-1/2 h-2 bg-white/40 rounded"></div>
                             <div className="w-1/3 h-1.5 bg-white/20 rounded"></div>
                           </div>
                        </div>
                        <div className="p-4 flex justify-between items-center">
                           <div>
                              <span className="text-[13px] font-bold text-slate-800 block">{tpl.title}</span>
                              <span className="text-[11px] text-slate-500 font-medium">{tpl.desc}</span>
                           </div>
                           <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeLeftTab === "layers" && (
                <div className="space-y-1">
                   <div className="flex items-center gap-2 p-3 hover:bg-slate-50 rounded-xl cursor-pointer text-slate-700 group transition-colors">
                     <ChevronRight className="w-4 h-4 text-slate-300" /> <Globe className="w-4 h-4 text-blue-500" /> <span className="text-[13px] font-bold">Header (Ana Menü)</span>
                   </div>
                   <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-100 rounded-xl cursor-pointer text-blue-800 font-bold shadow-sm">
                     <ChevronRight className="w-4 h-4 text-blue-400 transform rotate-90" /> <ImageIcon className="w-4 h-4 text-blue-600" /> <span className="text-[13px]">Hero Alanı</span>
                   </div>
                   <div className="pl-10 space-y-2 mt-2">
                     <div onClick={() => titleRef.current?.focus()} className="flex items-center gap-3 p-2 hover:bg-slate-100 rounded-lg text-slate-600 text-[12px] font-medium transition-colors cursor-pointer"><Type className="w-4 h-4 text-slate-400" /> Ana Başlık (H1)</div>
                     <div onClick={() => subtitleRef.current?.focus()} className="flex items-center gap-3 p-2 hover:bg-slate-100 rounded-lg text-slate-600 text-[12px] font-medium transition-colors cursor-pointer"><AlignLeft className="w-4 h-4 text-slate-400" /> Açıklama (P)</div>
                     <div onClick={() => buttonRef.current?.focus()} className="flex items-center gap-3 p-2 hover:bg-slate-100 rounded-lg text-slate-600 text-[12px] font-medium transition-colors cursor-pointer"><MousePointer2 className="w-4 h-4 text-slate-400" /> Keşfet Butonu</div>
                   </div>
                   <div className="flex items-center gap-2 p-3 hover:bg-slate-50 rounded-xl cursor-pointer text-slate-700 transition-colors">
                     <ChevronRight className="w-4 h-4 text-slate-300" /> <Layers className="w-4 h-4 text-purple-500" /> <span className="text-[13px] font-bold">Kayan Yazı (Marquee)</span>
                   </div>
                   <div className="flex items-center gap-2 p-3 hover:bg-slate-50 rounded-xl cursor-pointer text-slate-700 transition-colors opacity-50">
                     <ChevronRight className="w-4 h-4 text-slate-300" /> <Grid className="w-4 h-4 text-emerald-500" /> <span className="text-[13px] font-bold">Yeni Gelenler (Ürünler)</span>
                   </div>
                </div>
              )}
           </div>
        </aside>

        {/* ─── CENTER PREVIEW ─── */}
        <main className="flex-1 overflow-auto flex justify-center py-8 bg-[#f8fafc] relative">
          {isLoadingData ? (
             <div className="flex flex-col items-center justify-center h-full text-slate-500">
               <RefreshCw className="w-8 h-8 animate-spin mb-4 text-blue-500" />
               <p className="font-bold text-[13px] tracking-tight">Sistem Verileri Senkronize Ediliyor...</p>
             </div>
          ) : (
            <div 
              className="bg-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] transition-all duration-500 relative rounded-2xl border border-slate-300 overflow-hidden"
              style={{ width: deviceWidths[viewMode], height: '800px', maxWidth: '100%' }}
            >
              {/* Browser Mockup */}
              <div className="h-10 bg-slate-100 border-b border-slate-200 flex items-center px-4 gap-4 z-50 relative">
                 <div className="flex gap-2">
                   <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
                   <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
                   <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
                 </div>
                 <div className="flex-1 bg-white border border-slate-200 text-slate-400 text-[11px] px-4 py-1 rounded-lg flex items-center gap-2 max-w-md mx-auto shadow-inner">
                    <Globe className="w-3.5 h-3.5 text-slate-300" /> 
                    <span className="font-medium">davutkundura.shop/anasayfa</span>
                 </div>
              </div>

              <div className="absolute top-10 bottom-0 left-0 right-0">
                <iframe 
                   ref={iframeRef}
                   src="/"
                   className="w-full h-full border-0"
                   title="Live Store Preview"
                />
              </div>
            </div>
          )}
        </main>

        {/* ─── RIGHT SIDEBAR ─── */}
        <aside className="w-[360px] bg-white border-l border-slate-200 flex flex-col z-10 shadow-[-4px_0_24px_rgba(0,0,0,0.02)]">
          <div className="flex border-b border-slate-100 p-2 gap-1 bg-slate-50/50">
            <button onClick={() => setActiveRightTab("content")} className={`flex-1 py-3 text-[11px] font-bold uppercase tracking-widest rounded-xl transition-all ${activeRightTab === 'content' ? 'bg-white text-slate-900 shadow-sm border border-slate-200' : 'text-slate-500 hover:bg-slate-100'}`}>
               İçerik
            </button>
            <button onClick={() => setActiveRightTab("style")} className={`flex-1 py-3 text-[11px] font-bold uppercase tracking-widest rounded-xl transition-all ${activeRightTab === 'style' ? 'bg-white text-slate-900 shadow-sm border border-slate-200' : 'text-slate-500 hover:bg-slate-100'}`}>
               Tasarım (CSS)
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
            
            {activeRightTab === "content" && (
               <div className="space-y-6 animate-fade-in">
                  <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-4 rounded-2xl shadow-lg shadow-blue-500/20">
                     <div className="flex items-center gap-2 text-white mb-2">
                        <Info className="w-4 h-4" />
                        <span className="text-[12px] font-bold uppercase tracking-widest">Akıllı Editör</span>
                     </div>
                     <p className="text-[12px] text-blue-50/90 leading-relaxed font-medium">
                        Yaptığınız her harf değişikliği sol taraftaki önizlemede <strong>anlık olarak</strong> güncellenir.
                     </p>
                  </div>

                  <div className="space-y-5">
                     <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2"><Type className="w-4 h-4 text-blue-500"/> Ana Başlık (Hero Title)</label>
                        <textarea 
                           ref={titleRef}
                           value={heroTitle}
                           onChange={(e) => setHeroTitle(e.target.value)}
                           className="w-full h-24 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-800 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 text-[14px] font-semibold transition-all resize-none" 
                        />
                     </div>

                     <div className="space-y-2">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2"><AlignLeft className="w-4 h-4 text-blue-500"/> Alt Açıklama (Subtitle)</label>
                        <textarea 
                           ref={subtitleRef}
                           value={heroSubtitle}
                           onChange={(e) => setHeroSubtitle(e.target.value)}
                           className="w-full h-32 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-800 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 text-[13px] font-medium transition-all resize-none" 
                        />
                     </div>

                     <div className="pt-4 border-t border-slate-100 space-y-2">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2"><MousePointer2 className="w-4 h-4 text-blue-500"/> Buton Metni</label>
                        <input 
                           ref={buttonRef}
                           type="text"
                           value={buttonText}
                           onChange={(e) => setButtonText(e.target.value)}
                           className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-800 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 text-[13px] font-bold transition-all" 
                        />
                     </div>
                  </div>
               </div>
            )}

            {activeRightTab === "style" && (
               <div className="space-y-6 animate-fade-in">
                  <div className="bg-slate-900 p-5 rounded-2xl shadow-xl border border-slate-800">
                     <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 text-white">
                           <Code className="w-5 h-5 text-emerald-400" />
                           <span className="text-[12px] font-bold uppercase tracking-widest">Custom CSS Engine</span>
                        </div>
                        <div className="flex gap-1">
                           <div className="w-2 h-2 rounded-full bg-red-500"></div>
                           <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                           <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        </div>
                     </div>
                     <p className="text-[11px] text-slate-400 mb-4 leading-relaxed italic">
                        Buraya yazdığınız profesyonel CSS kodları doğrudan ön yüze enjekte edilir. Sınırsız özelleştirme gücü!
                     </p>
                     <textarea 
                        value={customCss}
                        onChange={(e) => setCustomCss(e.target.value)}
                        placeholder="h1 { color: #d4af37; text-transform: uppercase; }"
                        className="w-full h-96 bg-[#0a0a0a] border border-slate-700 rounded-xl p-4 text-emerald-400 font-mono text-[13px] outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all custom-scrollbar" 
                     />
                  </div>
                  
                  <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl">
                     <div className="flex items-center gap-2 text-amber-800 font-bold text-[11px] mb-2 uppercase">
                        <Settings className="w-4 h-4" /> CSS Rehberi
                     </div>
                     <ul className="text-[11px] text-amber-800/80 space-y-1.5 font-medium list-disc pl-4">
                        <li>H1, P ve Buton sınıflarına müdahale edebilirsiniz.</li>
                        <li>!important kullanmanız gerekebilir.</li>
                        <li>Animasyonlar ve gradientler ekleyebilirsiniz.</li>
                     </ul>
                  </div>
               </div>
            )}
            
          </div>
        </aside>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
      `}} />
    </div>
  );
}
