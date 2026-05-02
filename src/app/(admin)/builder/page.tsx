"use client";

import { useState } from "react";
import { 
  Monitor, Smartphone, Tablet, Save, Eye, LayoutTemplate, 
  Palette, Type, FileImage, Settings, Plus, LayoutGrid, 
  AlignLeft, ArrowLeft, Paintbrush, Play, Layers, MousePointer2,
  BoxSelect, Move, Type as TypeIcon, Image as ImageIcon, Video, 
  List, Sliders, ChevronDown, AlignCenter, AlignRight, Component, Search
} from "lucide-react";
import Link from "next/link";

type ViewMode = "desktop" | "tablet" | "mobile";
type ActiveTab = "add" | "templates" | "layers" | "pages" | "design" | "settings";

export default function AdvancedBuilderPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("desktop");
  const [activeLeftTab, setActiveLeftTab] = useState<ActiveTab>("add");
  const [activeRightTab, setActiveRightTab] = useState<"style" | "settings" | "interactions">("settings");
  const [isHoverStateActive, setIsHoverStateActive] = useState(false);

  // Real Database State
  const [heroTitle, setHeroTitle] = useState("İtalyan Zarafeti, Davut Kundura İmzası");
  const [heroSubtitle, setHeroSubtitle] = useState("1998'den beri el işçiliği ile üretilen, birinci sınıf deri kalitesini adımlarınıza taşıyan premium koleksiyon.");
  const [buttonText, setButtonText] = useState("Koleksiyonu İncele");
  const [isSaving, setIsSaving] = useState(false);

  async function saveDesign() {
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/store-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ heroTitle, heroSubtitle, buttonText, buttonLink: "/products" })
      });
      if(res.ok) {
        alert("Başarıyla yayınlandı! Sitenizin ön yüzünü kontrol edebilirsiniz.");
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
    <div className="fixed inset-0 z-[100] bg-[#111111] text-[#ececec] flex flex-col font-sans text-[13px]">
      
      {/* Top Header - Ultra Dark Mode */}
      <header className="h-[52px] border-b border-[#2a2a2a] bg-[#161616] flex items-center justify-between px-3">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="p-1.5 hover:bg-[#2a2a2a] rounded-md transition-colors">
            <ArrowLeft className="w-4 h-4 text-[#a0a0a0]" />
          </Link>
          <div className="h-5 w-px bg-[#2a2a2a]" />
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-amber-500 to-orange-700 rounded flex items-center justify-center font-bold text-[11px] text-white">DK</div>
            <span className="font-semibold text-white text-[14px] tracking-wide">Davut Kundura PRO Editör</span>
            <span className="text-[#a0a0a0] text-[11px] px-1.5 py-0.5 bg-[#2a2a2a] rounded">V2.4 (Gelişmiş Mod)</span>
          </div>
        </div>

        {/* Device Toggles */}
        <div className="flex items-center gap-0.5 bg-[#0a0a0a] p-1 rounded-md border border-[#2a2a2a]">
          <button 
            onClick={() => setViewMode("desktop")}
            className={`p-1.5 rounded transition-all ${viewMode === "desktop" ? "bg-[#2a2a2a] text-white shadow-sm" : "text-[#8a8a8a] hover:text-white"}`}
          >
            <Monitor className="w-[14px] h-[14px]" />
          </button>
          <button 
            onClick={() => setViewMode("tablet")}
            className={`p-1.5 rounded transition-all ${viewMode === "tablet" ? "bg-[#2a2a2a] text-white shadow-sm" : "text-[#8a8a8a] hover:text-white"}`}
          >
            <Tablet className="w-[14px] h-[14px]" />
          </button>
          <button 
            onClick={() => setViewMode("mobile")}
            className={`p-1.5 rounded transition-all ${viewMode === "mobile" ? "bg-[#2a2a2a] text-white shadow-sm" : "text-[#8a8a8a] hover:text-white"}`}
          >
            <Smartphone className="w-[14px] h-[14px]" />
          </button>
          <div className="w-px h-4 bg-[#2a2a2a] mx-1" />
          <span className="text-[11px] text-[#8a8a8a] px-2 font-mono">
            {viewMode === 'desktop' ? '1920px' : viewMode === 'tablet' ? '768px' : '375px'}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 mr-2">
             <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
             <span className="text-[11px] text-[#a0a0a0]">Otomatik Kaydedildi</span>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-white bg-[#2a2a2a] hover:bg-[#333] border border-[#3a3a3a] rounded transition-colors">
            <Eye className="w-3.5 h-3.5" /> Önizleme
          </button>
          <button onClick={saveDesign} disabled={isSaving} className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium hover:from-blue-500 hover:to-indigo-500 rounded transition-colors shadow-[0_0_15px_rgba(37,99,235,0.3)]">
            <Save className="w-3.5 h-3.5" /> {isSaving ? "Kaydediliyor..." : "Yayına Al"}
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Toolbar - Icons Only */}
        <aside className="w-[48px] border-r border-[#2a2a2a] bg-[#161616] flex flex-col items-center py-4 space-y-4 z-10">
           <button onClick={()=>setActiveLeftTab("add")} className={`p-2 rounded-md transition-colors ${activeLeftTab === 'add' ? 'bg-[#2a2a2a] text-white' : 'text-[#8a8a8a] hover:text-white'}`} title="Element Ekle">
             <Plus className="w-5 h-5" />
           </button>
           <button onClick={()=>setActiveLeftTab("templates")} className={`p-2 rounded-md transition-colors ${activeLeftTab === 'templates' ? 'bg-[#2a2a2a] text-white' : 'text-[#8a8a8a] hover:text-white'}`} title="Hazır Şablonlar (200+)">
             <LayoutTemplate className="w-5 h-5" />
           </button>
           <button onClick={()=>setActiveLeftTab("layers")} className={`p-2 rounded-md transition-colors ${activeLeftTab === 'layers' ? 'bg-[#2a2a2a] text-white' : 'text-[#8a8a8a] hover:text-white'}`} title="Katmanlar (Layers)">
             <Layers className="w-5 h-5" />
           </button>
           <button onClick={()=>setActiveLeftTab("pages")} className={`p-2 rounded-md transition-colors ${activeLeftTab === 'pages' ? 'bg-[#2a2a2a] text-white' : 'text-[#8a8a8a] hover:text-white'}`} title="Sayfalar ve Menüler">
             <List className="w-5 h-5" />
           </button>
           <button onClick={()=>setActiveLeftTab("design")} className={`p-2 rounded-md transition-colors ${activeLeftTab === 'design' ? 'bg-[#2a2a2a] text-white' : 'text-[#8a8a8a] hover:text-white'}`} title="Site Genel Tasarımı">
             <Palette className="w-5 h-5" />
           </button>
           <div className="flex-1"></div>
           <button onClick={()=>setActiveLeftTab("settings")} className={`p-2 rounded-md transition-colors ${activeLeftTab === 'settings' ? 'bg-[#2a2a2a] text-white' : 'text-[#8a8a8a] hover:text-white'}`} title="Sayfa Ayarları">
             <Settings className="w-5 h-5" />
           </button>
        </aside>

        {/* Left Sidebar - Content Panel */}
        <aside className="w-[260px] border-r border-[#2a2a2a] bg-[#1c1c1c] flex flex-col">
          {activeLeftTab === "add" && (
            <>
              <div className="p-3 border-b border-[#2a2a2a] flex items-center justify-between">
                <span className="font-semibold text-white">Element Ekle</span>
                <Search className="w-4 h-4 text-[#8a8a8a]" />
              </div>
              <div className="flex-1 overflow-y-auto p-3 space-y-6 custom-scrollbar">
                
                {/* Layouts */}
                <div>
                  <h3 className="text-[10px] font-bold text-[#8a8a8a] uppercase tracking-wider mb-2">Düzen (Layout)</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-[#2a2a2a] hover:bg-[#333] border border-[#3a3a3a] rounded p-2 flex flex-col items-center justify-center gap-1 cursor-grab transition-all">
                      <BoxSelect className="w-5 h-5 text-[#a0a0a0]" />
                      <span className="text-[10px] text-[#ececec]">Konteyner</span>
                    </div>
                    <div className="bg-[#2a2a2a] hover:bg-[#333] border border-[#3a3a3a] rounded p-2 flex flex-col items-center justify-center gap-1 cursor-grab transition-all">
                      <LayoutGrid className="w-5 h-5 text-[#a0a0a0]" />
                      <span className="text-[10px] text-[#ececec]">CSS Grid</span>
                    </div>
                    <div className="bg-[#2a2a2a] hover:bg-[#333] border border-[#3a3a3a] rounded p-2 flex flex-col items-center justify-center gap-1 cursor-grab transition-all">
                      <List className="w-5 h-5 text-[#a0a0a0]" />
                      <span className="text-[10px] text-[#ececec]">Flexbox</span>
                    </div>
                  </div>
                </div>

                {/* Typography */}
                <div>
                  <h3 className="text-[10px] font-bold text-[#8a8a8a] uppercase tracking-wider mb-2">Tipografi</h3>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 p-1.5 hover:bg-[#2a2a2a] rounded cursor-grab">
                      <TypeIcon className="w-4 h-4 text-[#a0a0a0]" /> <span>Ana Başlık (H1)</span>
                    </div>
                    <div className="flex items-center gap-2 p-1.5 hover:bg-[#2a2a2a] rounded cursor-grab">
                      <TypeIcon className="w-4 h-4 text-[#a0a0a0]" /> <span>Alt Başlık (H2, H3)</span>
                    </div>
                    <div className="flex items-center gap-2 p-1.5 hover:bg-[#2a2a2a] rounded cursor-grab">
                      <AlignLeft className="w-4 h-4 text-[#a0a0a0]" /> <span>Uzun Paragraf</span>
                    </div>
                    <div className="flex items-center gap-2 p-1.5 hover:bg-[#2a2a2a] rounded cursor-grab">
                      <TypeIcon className="w-4 h-4 text-[#a0a0a0]" /> <span>Dinamik Yazı (Typed.js)</span>
                    </div>
                  </div>
                </div>

                {/* Media & Advanced */}
                <div>
                  <h3 className="text-[10px] font-bold text-[#8a8a8a] uppercase tracking-wider mb-2">Medya ve Gelişmiş</h3>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 p-1.5 hover:bg-[#2a2a2a] rounded cursor-grab">
                      <ImageIcon className="w-4 h-4 text-[#a0a0a0]" /> <span>Gelişmiş Görsel (WebP)</span>
                    </div>
                    <div className="flex items-center gap-2 p-1.5 hover:bg-[#2a2a2a] rounded cursor-grab">
                      <Video className="w-4 h-4 text-[#a0a0a0]" /> <span>Arkaplan Videosu</span>
                    </div>
                    <div className="flex items-center gap-2 p-1.5 hover:bg-[#2a2a2a] rounded cursor-grab text-blue-400">
                      <Component className="w-4 h-4" /> <span>Ürün 3D Görüntüleyici</span>
                    </div>
                    <div className="flex items-center gap-2 p-1.5 hover:bg-[#2a2a2a] rounded cursor-grab text-orange-400">
                      <LayoutTemplate className="w-4 h-4" /> <span>Dinamik Slider (Swiper)</span>
                    </div>
                    <div className="flex items-center gap-2 p-1.5 hover:bg-[#2a2a2a] rounded cursor-grab text-purple-400">
                      <Play className="w-4 h-4" /> <span>Lottie Animasyonu</span>
                    </div>
                  </div>
                </div>

              </div>
            </>
          )}

          {activeLeftTab === "templates" && (
             <div className="flex flex-col h-full">
                <div className="p-3 border-b border-[#2a2a2a]">
                   <span className="font-semibold text-white mb-2 block">Hazır Blok & Şablonlar</span>
                   <div className="relative">
                     <Search className="w-3.5 h-3.5 text-[#8a8a8a] absolute left-2.5 top-1/2 -translate-y-1/2" />
                     <input type="text" placeholder="200+ Şablon Ara..." className="w-full bg-[#0a0a0a] border border-[#3a3a3a] rounded py-1.5 pl-8 pr-2 text-white text-[11px] focus:outline-none focus:border-blue-500" />
                   </div>
                </div>
                <div className="flex-1 overflow-y-auto p-3 space-y-5 custom-scrollbar">
                   <div>
                      <h3 className="text-[10px] font-bold text-[#8a8a8a] uppercase tracking-wider mb-2 flex justify-between">Hero Seçenekleri <span className="text-blue-400">18</span></h3>
                      <div className="grid grid-cols-2 gap-2">
                         <div className="aspect-video bg-[#2a2a2a] rounded border border-[#3a3a3a] hover:border-blue-500 cursor-pointer overflow-hidden relative group">
                            <div className="absolute inset-0 bg-[url('https://via.placeholder.com/150/111/fff?text=Hero+1')] bg-cover bg-center opacity-50 group-hover:opacity-100 transition-opacity"></div>
                            <span className="absolute bottom-1 left-1 text-[9px] bg-black/60 px-1 rounded">Ortalı Yazı</span>
                         </div>
                         <div className="aspect-video bg-[#2a2a2a] rounded border border-[#3a3a3a] hover:border-blue-500 cursor-pointer overflow-hidden relative group">
                            <div className="absolute inset-0 bg-[url('https://via.placeholder.com/150/111/fff?text=Hero+2')] bg-cover bg-center opacity-50 group-hover:opacity-100 transition-opacity"></div>
                            <span className="absolute bottom-1 left-1 text-[9px] bg-black/60 px-1 rounded">Yarım Ekran</span>
                         </div>
                         <div className="aspect-video bg-[#2a2a2a] rounded border border-[#3a3a3a] hover:border-blue-500 cursor-pointer overflow-hidden relative group">
                            <div className="absolute inset-0 bg-[url('https://via.placeholder.com/150/111/fff?text=Hero+3')] bg-cover bg-center opacity-50 group-hover:opacity-100 transition-opacity"></div>
                            <span className="absolute bottom-1 left-1 text-[9px] bg-black/60 px-1 rounded">Slider</span>
                         </div>
                         <div className="aspect-video bg-[#2a2a2a] rounded border border-[#3a3a3a] hover:border-blue-500 cursor-pointer overflow-hidden relative flex items-center justify-center">
                            <span className="text-[10px] text-blue-400">+15 Daha</span>
                         </div>
                      </div>
                   </div>

                   <div>
                      <h3 className="text-[10px] font-bold text-[#8a8a8a] uppercase tracking-wider mb-2 flex justify-between">Ürün Sayfası (Product) <span className="text-blue-400">24</span></h3>
                      <div className="grid grid-cols-2 gap-2">
                         <div className="aspect-[3/4] bg-[#2a2a2a] rounded border border-[#3a3a3a] hover:border-blue-500 cursor-pointer overflow-hidden relative group">
                            <span className="absolute bottom-1 left-1 text-[9px] bg-black/60 px-1 rounded">Görsel Solda</span>
                         </div>
                         <div className="aspect-[3/4] bg-[#2a2a2a] rounded border border-[#3a3a3a] hover:border-blue-500 cursor-pointer overflow-hidden relative group">
                            <span className="absolute bottom-1 left-1 text-[9px] bg-black/60 px-1 rounded">Akerdeon Açıklama</span>
                         </div>
                      </div>
                   </div>

                   <div>
                      <h3 className="text-[10px] font-bold text-[#8a8a8a] uppercase tracking-wider mb-2 flex justify-between">Özellikler (Features) <span className="text-blue-400">45</span></h3>
                      <div className="w-full h-8 bg-[#2a2a2a] rounded border border-[#3a3a3a] hover:border-blue-500 cursor-pointer flex items-center justify-center text-[10px] mb-2">3 Kolon İkonlu</div>
                      <div className="w-full h-8 bg-[#2a2a2a] rounded border border-[#3a3a3a] hover:border-blue-500 cursor-pointer flex items-center justify-center text-[10px] mb-2">Görsel + Metin ZigZag</div>
                      <div className="w-full h-8 border border-dashed border-[#3a3a3a] rounded flex items-center justify-center text-[10px] text-blue-400 cursor-pointer">Tümünü Gör (45)</div>
                   </div>
                </div>
             </div>
          )}

          {activeLeftTab === "pages" && (
             <div className="flex flex-col h-full">
                <div className="p-3 border-b border-[#2a2a2a] flex justify-between items-center">
                   <span className="font-semibold text-white">Sayfalar & Menüler</span>
                   <button className="text-blue-400 hover:text-blue-300 text-[11px]">+ Yeni</button>
                </div>
                <div className="p-3 space-y-4">
                   <div>
                      <h3 className="text-[10px] font-bold text-[#8a8a8a] uppercase tracking-wider mb-2">Ana Sayfalar</h3>
                      <div className="space-y-1">
                         <div className="flex items-center justify-between p-1.5 bg-blue-600/20 border border-blue-500/30 rounded text-blue-300 cursor-pointer">
                            <div className="flex items-center gap-2"><LayoutTemplate className="w-3.5 h-3.5" /> Ana Sayfa</div>
                         </div>
                         <div className="flex items-center justify-between p-1.5 hover:bg-[#2a2a2a] rounded cursor-pointer">
                            <div className="flex items-center gap-2"><LayoutTemplate className="w-3.5 h-3.5 text-[#a0a0a0]" /> Hakkımızda</div>
                         </div>
                         <div className="flex items-center justify-between p-1.5 hover:bg-[#2a2a2a] rounded cursor-pointer">
                            <div className="flex items-center gap-2"><LayoutTemplate className="w-3.5 h-3.5 text-[#a0a0a0]" /> İletişim</div>
                         </div>
                      </div>
                   </div>

                   <div>
                      <h3 className="text-[10px] font-bold text-[#8a8a8a] uppercase tracking-wider mb-2">Ürün / Dinamik Şablonlar</h3>
                      <div className="space-y-1">
                         <div className="flex items-center justify-between p-1.5 hover:bg-[#2a2a2a] rounded cursor-pointer">
                            <div className="flex items-center gap-2"><Component className="w-3.5 h-3.5 text-purple-400" /> Ürün Detay (Default)</div>
                         </div>
                         <div className="flex items-center justify-between p-1.5 hover:bg-[#2a2a2a] rounded cursor-pointer">
                            <div className="flex items-center gap-2"><LayoutGrid className="w-3.5 h-3.5 text-purple-400" /> Koleksiyon Listesi</div>
                         </div>
                      </div>
                   </div>

                   <div>
                      <h3 className="text-[10px] font-bold text-[#8a8a8a] uppercase tracking-wider mb-2 flex justify-between items-center">
                         Menü Yönetimi (Header/Footer)
                         <Settings className="w-3 h-3 cursor-pointer hover:text-white" />
                      </h3>
                      <div className="p-2 border border-[#3a3a3a] bg-[#2a2a2a] rounded text-[11px] text-[#a0a0a0]">
                         Ana Menü (Header) için 5 bağlantı tanımlı. Alt menüleri (Mega Menu) düzenlemek için tıklayın.
                      </div>
                   </div>
                </div>
             </div>
          )}
        </aside>

        {/* Center Canvas (Visual Builder Grid) */}
        <div className="flex-1 bg-[#0a0a0a] flex flex-col relative overflow-hidden">
          <style dangerouslySetInnerHTML={{__html: `
            .custom-scrollbar::-webkit-scrollbar { width: 4px; }
            .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
            .custom-scrollbar::-webkit-scrollbar-thumb { background: #3a3a3a; border-radius: 4px; }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #4a4a4a; }
          `}} />
          
          <div className="absolute top-4 left-4 bg-[#1c1c1c] border border-[#2a2a2a] text-[#ececec] px-3 py-1.5 rounded text-[11px] font-medium shadow-2xl z-10 flex items-center gap-2">
            Seçili: <span className="text-blue-400 bg-blue-400/10 px-1.5 py-0.5 rounded">H1: Ana Başlık</span>
            <span className="text-[#555]">|</span>
            W: 100% H: Auto
          </div>

          <div className="absolute bottom-4 right-4 bg-[#1c1c1c] border border-[#2a2a2a] text-[#ececec] p-1.5 rounded-lg text-[11px] font-medium shadow-2xl z-10 flex flex-col gap-1">
             <button className="p-1.5 hover:bg-[#2a2a2a] rounded"><Plus className="w-4 h-4" /></button>
             <div className="w-full h-px bg-[#2a2a2a]"></div>
             <button className="p-1.5 hover:bg-[#2a2a2a] rounded"><Save className="w-4 h-4" /></button>
          </div>
          
          <div className="flex-1 overflow-auto flex justify-center pt-8 pb-32">
            <div 
              className="bg-[#ffffff] shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-all duration-300 relative border border-[#2a2a2a]"
              style={{ 
                width: deviceWidths[viewMode], 
                minHeight: '100%',
                maxWidth: '100%'
              }}
            >
              {/* Mockup of a deeply styled element in the builder */}
              <div className="w-full h-[600px] relative overflow-hidden bg-[#111] group">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10"></div>
                <div className="absolute inset-0 opacity-60 mix-blend-overlay scale-105 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center"></div>
                
                <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center p-8">
                  {/* Selected Element Simulation */}
                  <div className="relative border-2 border-blue-500 rounded p-1">
                     <div className="absolute -top-5 -left-0.5 bg-blue-500 text-white text-[9px] px-1.5 py-0.5 font-bold uppercase tracking-wider rounded-t">H1.hero-title</div>
                     <div className="absolute -right-2 -bottom-2 w-4 h-4 bg-white border-2 border-blue-500 rounded-full cursor-nwse-resize"></div>
                     <h1 className="text-6xl font-bold text-white tracking-tighter shadow-2xl uppercase font-serif">
                       {heroTitle}
                     </h1>
                  </div>
                  
                  <p className="text-[#d0d0d0] text-lg mt-6 max-w-2xl font-light tracking-wide border border-dashed border-transparent hover:border-blue-400 p-2 cursor-pointer transition-colors">
                    {heroSubtitle}
                  </p>
                  
                  <div className="mt-8 flex gap-4 border border-dashed border-transparent hover:border-blue-400 p-2 cursor-pointer transition-colors">
                    <button className="px-8 py-3 bg-amber-600 text-white font-medium hover:bg-amber-700 transition-colors">{buttonText}</button>
                    <button className="px-8 py-3 bg-transparent border border-white text-white font-medium hover:bg-white hover:text-black transition-colors">Hikayemiz</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Deep Properties Inspector */}
        <aside className="w-[300px] border-l border-[#2a2a2a] bg-[#161616] flex flex-col">
          
          <div className="flex border-b border-[#2a2a2a]">
            <button onClick={() => setActiveRightTab("style")} className={`flex-1 py-2.5 flex justify-center items-center gap-1.5 transition-colors ${activeRightTab === 'style' ? 'bg-[#2a2a2a] text-white border-b-2 border-blue-500' : 'text-[#8a8a8a] hover:bg-[#1c1c1c]'}`}>
               <Paintbrush className="w-3.5 h-3.5" /> Stil
            </button>
            <button onClick={() => setActiveRightTab("settings")} className={`flex-1 py-2.5 flex justify-center items-center gap-1.5 transition-colors ${activeRightTab === 'settings' ? 'bg-[#2a2a2a] text-white border-b-2 border-blue-500' : 'text-[#8a8a8a] hover:bg-[#1c1c1c]'}`}>
               <Sliders className="w-3.5 h-3.5" /> Ayarlar
            </button>
            <button onClick={() => setActiveRightTab("interactions")} className={`flex-1 py-2.5 flex justify-center items-center gap-1.5 transition-colors ${activeRightTab === 'interactions' ? 'bg-[#2a2a2a] text-white border-b-2 border-blue-500' : 'text-[#8a8a8a] hover:bg-[#1c1c1c]'}`}>
               <Play className="w-3.5 h-3.5" /> Efektler
            </button>
          </div>

          <div className="flex items-center justify-between p-3 border-b border-[#2a2a2a] bg-[#1c1c1c]">
             <div className="font-mono text-[11px] bg-[#0a0a0a] border border-[#3a3a3a] px-2 py-1 rounded text-blue-400">
               .hero-title
             </div>
             <div className="flex gap-1 bg-[#0a0a0a] p-0.5 rounded border border-[#3a3a3a]">
               <button onClick={()=>setIsHoverStateActive(false)} className={`px-2 py-0.5 rounded text-[10px] ${!isHoverStateActive ? 'bg-[#2a2a2a] text-white' : 'text-[#8a8a8a]'}`}>Normal</button>
               <button onClick={()=>setIsHoverStateActive(true)} className={`px-2 py-0.5 rounded text-[10px] ${isHoverStateActive ? 'bg-[#2a2a2a] text-white' : 'text-[#8a8a8a]'}`}>Hover</button>
             </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-5">
            
            {activeRightTab === "style" && (
              <>
                {/* Layout / Spacing */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white">Yerleşim & Boşluk</h3>
                    <ChevronDown className="w-4 h-4 text-[#8a8a8a]" />
                  </div>
                  
                  <div className="bg-[#1c1c1c] border border-[#2a2a2a] rounded p-4 flex flex-col items-center justify-center relative mb-4">
                    <span className="absolute top-1 left-2 text-[9px] text-[#8a8a8a]">MARGIN</span>
                    <input type="text" defaultValue="0" className="absolute top-1 text-center w-8 bg-transparent border-none focus:ring-0 text-[11px] text-[#a0a0a0]" />
                    <input type="text" defaultValue="0" className="absolute bottom-1 text-center w-8 bg-transparent border-none focus:ring-0 text-[11px] text-[#a0a0a0]" />
                    <input type="text" defaultValue="auto" className="absolute left-1 top-1/2 -translate-y-1/2 text-center w-8 bg-transparent border-none focus:ring-0 text-[11px] text-[#a0a0a0]" />
                    <input type="text" defaultValue="auto" className="absolute right-1 top-1/2 -translate-y-1/2 text-center w-8 bg-transparent border-none focus:ring-0 text-[11px] text-[#a0a0a0]" />
                    
                    <div className="w-[140px] h-[80px] bg-[#2a2a2a] border border-[#3a3a3a] relative flex items-center justify-center">
                       <span className="absolute top-0.5 left-1 text-[9px] text-[#8a8a8a]">PADDING</span>
                       <input type="text" defaultValue="0" className="absolute top-0.5 text-center w-6 bg-transparent border-none focus:ring-0 text-[11px] text-[#a0a0a0]" />
                       <input type="text" defaultValue="0" className="absolute bottom-0.5 text-center w-6 bg-transparent border-none focus:ring-0 text-[11px] text-[#a0a0a0]" />
                       <input type="text" defaultValue="0" className="absolute left-0.5 top-1/2 -translate-y-1/2 text-center w-6 bg-transparent border-none focus:ring-0 text-[11px] text-[#a0a0a0]" />
                       <input type="text" defaultValue="0" className="absolute right-0.5 top-1/2 -translate-y-1/2 text-center w-6 bg-transparent border-none focus:ring-0 text-[11px] text-[#a0a0a0]" />
                       <div className="w-[80px] h-[30px] bg-[#3a3a3a] border border-[#555] flex items-center justify-center text-[10px] text-[#ececec]">
                         600 x 120
                       </div>
                    </div>
                  </div>
                </div>

                <hr className="border-[#2a2a2a]"/>

                {/* Typography Settings */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-white">Tipografi (Detaylı)</h3>
                    <ChevronDown className="w-4 h-4 text-[#8a8a8a]" />
                  </div>
                  
                  <div className="space-y-3">
                     <div>
                       <label className="text-[10px] text-[#8a8a8a] mb-1 block uppercase">Yazı Tipi (Font Family)</label>
                       <select className="w-full bg-[#1c1c1c] border border-[#3a3a3a] rounded px-2 py-1.5 text-white outline-none focus:border-blue-500">
                         <option>Playfair Display (Serif)</option>
                         <option>Inter (Sans-serif)</option>
                         <option>Cinzel (Klasik)</option>
                         <option>Montserrat (Modern)</option>
                       </select>
                     </div>

                     <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] text-[#8a8a8a] mb-1 block uppercase">Ağırlık (Weight)</label>
                          <select className="w-full bg-[#1c1c1c] border border-[#3a3a3a] rounded px-2 py-1.5 text-white outline-none focus:border-blue-500">
                            <option>700 - Bold</option>
                            <option>400 - Normal</option>
                            <option>300 - Light</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] text-[#8a8a8a] mb-1 block uppercase">Boyut (Size)</label>
                          <div className="relative">
                            <input type="number" defaultValue="60" className="w-full bg-[#1c1c1c] border border-[#3a3a3a] rounded px-2 py-1.5 text-white outline-none focus:border-blue-500" />
                            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[#8a8a8a] text-[10px]">px</span>
                          </div>
                        </div>
                     </div>

                     <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] text-[#8a8a8a] mb-1 block uppercase">Satır Aralığı (Line H)</label>
                          <input type="text" defaultValue="1.2" className="w-full bg-[#1c1c1c] border border-[#3a3a3a] rounded px-2 py-1.5 text-white outline-none focus:border-blue-500" />
                        </div>
                        <div>
                          <label className="text-[10px] text-[#8a8a8a] mb-1 block uppercase">Harf Aralığı (Letter S)</label>
                          <input type="text" defaultValue="-0.02em" className="w-full bg-[#1c1c1c] border border-[#3a3a3a] rounded px-2 py-1.5 text-white outline-none focus:border-blue-500" />
                        </div>
                     </div>

                     <div>
                       <label className="text-[10px] text-[#8a8a8a] mb-1 block uppercase">Renk</label>
                       <div className="flex items-center gap-2">
                         <div className="w-8 h-8 rounded border border-[#3a3a3a] bg-[#ffffff] cursor-pointer"></div>
                         <input type="text" defaultValue="#FFFFFF" className="flex-1 bg-[#1c1c1c] border border-[#3a3a3a] rounded px-2 py-1.5 text-white font-mono uppercase text-[11px] outline-none" />
                       </div>
                     </div>

                     <div>
                       <label className="text-[10px] text-[#8a8a8a] mb-1 block uppercase">Hizalama</label>
                       <div className="flex bg-[#1c1c1c] border border-[#3a3a3a] rounded overflow-hidden">
                         <button className="flex-1 py-1.5 flex justify-center hover:bg-[#2a2a2a]"><AlignLeft className="w-4 h-4 text-white" /></button>
                         <button className="flex-1 py-1.5 flex justify-center bg-[#2a2a2a] border-x border-[#3a3a3a]"><AlignCenter className="w-4 h-4 text-white" /></button>
                         <button className="flex-1 py-1.5 flex justify-center hover:bg-[#2a2a2a]"><AlignRight className="w-4 h-4 text-white" /></button>
                       </div>
                     </div>
                  </div>
                </div>

                <hr className="border-[#2a2a2a]"/>

                {/* Background & Borders */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-white">Arkaplan & Çerçeve</h3>
                    <ChevronDown className="w-4 h-4 text-[#8a8a8a]" />
                  </div>
                   <div className="p-3 bg-[#1c1c1c] border border-[#2a2a2a] rounded text-center text-[#8a8a8a] text-[11px] cursor-pointer hover:border-blue-500 transition-colors">
                      + Gradyan / Görsel Ekle
                   </div>
                </div>

              </>
            )}

            {activeRightTab === "settings" && (
               <div className="space-y-4">
                  <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded text-blue-300 text-[11px] leading-relaxed">
                     Bu menüden sayfadaki gerçek verileri (başlıklar, buton metinleri) düzenleyebilir ve veritabanına kaydedebilirsiniz.
                  </div>

                  <div>
                     <label className="text-[10px] text-[#8a8a8a] mb-1 block uppercase">Ana Başlık (H1)</label>
                     <textarea 
                        value={heroTitle}
                        onChange={(e) => setHeroTitle(e.target.value)}
                        className="w-full h-16 bg-[#1c1c1c] border border-[#3a3a3a] rounded px-2 py-1.5 text-white outline-none focus:border-blue-500 text-[12px]" 
                     />
                  </div>

                  <div>
                     <label className="text-[10px] text-[#8a8a8a] mb-1 block uppercase">Alt Açıklama (P)</label>
                     <textarea 
                        value={heroSubtitle}
                        onChange={(e) => setHeroSubtitle(e.target.value)}
                        className="w-full h-24 bg-[#1c1c1c] border border-[#3a3a3a] rounded px-2 py-1.5 text-white outline-none focus:border-blue-500 text-[12px]" 
                     />
                  </div>

                  <div>
                     <label className="text-[10px] text-[#8a8a8a] mb-1 block uppercase">Buton Metni</label>
                     <input 
                        type="text"
                        value={buttonText}
                        onChange={(e) => setButtonText(e.target.value)}
                        className="w-full bg-[#1c1c1c] border border-[#3a3a3a] rounded px-2 py-1.5 text-white outline-none focus:border-blue-500 text-[12px]" 
                     />
                  </div>
               </div>
            )}

            {activeRightTab === "interactions" && (
               <div className="space-y-4">
                  <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded text-blue-300 text-[11px] leading-relaxed">
                     Bu menüden elementin scroll (kaydırma) esnasındaki giriş animasyonlarını veya üzerine gelindiğinde (hover) yapacağı 3D transform efektlerini ayarlayabilirsiniz.
                  </div>

                  <div>
                     <h3 className="font-semibold text-white mb-2">Scroll (Sayfaya Giriş) Animasyonu</h3>
                     <select className="w-full bg-[#1c1c1c] border border-[#3a3a3a] rounded px-2 py-2 text-white outline-none focus:border-blue-500 mb-2">
                         <option>Fade In Up (Aşağıdan Belirme)</option>
                         <option>Fade In (Belirme)</option>
                         <option>Zoom In (Büyüyerek)</option>
                         <option>Slide Right (Sağdan Kayma)</option>
                     </select>
                     
                     <div className="grid grid-cols-2 gap-2 mt-3">
                        <div>
                          <label className="text-[10px] text-[#8a8a8a] mb-1 block uppercase">Süre (Duration)</label>
                          <input type="text" defaultValue="0.8s" className="w-full bg-[#1c1c1c] border border-[#3a3a3a] rounded px-2 py-1.5 text-white outline-none" />
                        </div>
                        <div>
                          <label className="text-[10px] text-[#8a8a8a] mb-1 block uppercase">Gecikme (Delay)</label>
                          <input type="text" defaultValue="0.2s" className="w-full bg-[#1c1c1c] border border-[#3a3a3a] rounded px-2 py-1.5 text-white outline-none" />
                        </div>
                     </div>
                  </div>

                  <hr className="border-[#2a2a2a]"/>

                  <div>
                     <h3 className="font-semibold text-white mb-2">CSS Filtreleri (Filters)</h3>
                     <div className="space-y-2">
                        <div>
                           <div className="flex justify-between text-[10px] text-[#8a8a8a] mb-1"><span>Blur (Bulanıklık)</span> <span>0px</span></div>
                           <input type="range" className="w-full accent-blue-500" min="0" max="20" defaultValue="0" />
                        </div>
                        <div>
                           <div className="flex justify-between text-[10px] text-[#8a8a8a] mb-1"><span>Opacity (Saydamlık)</span> <span>100%</span></div>
                           <input type="range" className="w-full accent-blue-500" min="0" max="100" defaultValue="100" />
                        </div>
                     </div>
                  </div>
               </div>
            )}

          </div>
        </aside>
      </div>
    </div>
  );
}
