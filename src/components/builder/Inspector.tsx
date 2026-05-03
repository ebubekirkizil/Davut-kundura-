"use client";

import React from "react";
import { Trash2, X, Settings, Plus, ArrowLeft, Box, Sparkles, ChevronRight, Sliders, Type, Layout } from "lucide-react";
import { useBuilderStore } from "@/store/useBuilderStore";
import { SECTION_SCHEMAS } from "@/store/schema";

export const Inspector: React.FC = () => {
  const { 
    activePage, 
    pages, 
    selectedId, 
    updateSection, 
    addBlock, 
    removeBlock, 
    updateBlock,
    setSelectedId,
    removeSection 
  } = useBuilderStore();

  const currentPage = pages[activePage] || { sections: [] };
  
  const selectedSection = currentPage.sections.find(s => s.id === selectedId);
  const selectedBlockParent = currentPage.sections.find(s => s.blocks?.some(b => b.id === selectedId));
  const selectedBlock = selectedBlockParent?.blocks.find(b => b.id === selectedId);

  // Empty State
  if (!selectedId) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent)]/5 rounded-full blur-[100px] -mr-32 -mt-32" />
        <div className="w-24 h-24 bg-[var(--bg-secondary)]/50 rounded-[2rem] border border-[var(--border)] flex items-center justify-center mb-8 shadow-inner group">
          <Settings size={40} className="text-[var(--text-secondary)] group-hover:rotate-90 transition-transform duration-700 opacity-20" />
        </div>
        <h3 className="text-[14px] font-brand font-bold text-[var(--text-primary)] uppercase tracking-widest mb-3">Tasarım Paneli</h3>
        <p className="text-[12px] text-[var(--text-secondary)] font-medium leading-relaxed max-w-[240px] opacity-60">
          Düzenlemek istediğiniz bir bölüme veya öğeye dokunarak özelleştirmeye başlayın.
        </p>
      </div>
    );
  }

  const sectionSchema = selectedSection ? SECTION_SCHEMAS[selectedSection.type] : null;
  const blockSchema = selectedBlock && selectedBlockParent 
    ? SECTION_SCHEMAS[selectedBlockParent.type]?.blocks?.find((b: any) => b.type === selectedBlock.type)
    : null;

  return (
    <div className="h-full flex flex-col bg-white animate-in slide-in-from-right duration-500 selection:bg-[var(--accent)]/30">
      
      {/* HEADER */}
      <div className="p-8 border-b border-[var(--border)] flex items-center justify-between bg-white sticky top-0 z-10 backdrop-blur-md bg-white/90">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setSelectedId(null)} 
            className="w-10 h-10 flex items-center justify-center hover:bg-[var(--bg-secondary)] rounded-xl transition-all border border-transparent hover:border-[var(--border)] text-[var(--text-secondary)]"
          >
            <X size={20} />
          </button>
          <div className="space-y-0.5">
            <span className="text-[13px] font-brand font-bold text-[var(--text-primary)] uppercase tracking-widest block">
              {sectionSchema?.label || blockSchema?.label || "Özelleştir"}
            </span>
            <div className="flex items-center gap-2">
               <div className="w-1 h-1 bg-[var(--accent)] rounded-full animate-pulse" />
               <span className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-tighter opacity-50">Düzenleme Modu</span>
            </div>
          </div>
        </div>
        {selectedSection && (
          <button 
            onClick={() => {if(confirm("Bu bölümü silmek istediğinize emin misiniz?")) removeSection(activePage, selectedSection.id)}} 
            className="w-10 h-10 flex items-center justify-center hover:bg-red-50 text-red-500 rounded-xl transition-all border border-transparent hover:border-red-100 shadow-sm"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
        
        {/* SECTION SETTINGS */}
        {selectedSection && sectionSchema && (
          <div className="space-y-10 animate-in fade-in duration-700">
            
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <Sliders size={14} className="text-[var(--accent)]" />
                <h4 className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.3em]">Genel Ayarlar</h4>
              </div>
              
              {sectionSchema.settings.map((s: any) => (
                <div key={s.id} className="space-y-3 group">
                  <div className="flex justify-between items-center">
                    <label className="text-[11px] font-black text-[var(--text-primary)] uppercase tracking-widest opacity-80 group-focus-within:text-[var(--accent)] transition-colors">{s.label}</label>
                    {s.type === 'range' && <span className="text-[10px] font-black text-[var(--accent)] bg-[var(--accent)]/10 px-2 py-0.5 rounded-full">%{selectedSection.settings[s.id]}</span>}
                  </div>
                  
                  {s.type === 'text' && (
                    <div className="relative">
                      <input 
                        type="text" 
                        value={selectedSection.settings[s.id] || ""} 
                        onChange={(e) => updateSection(activePage, selectedSection.id, { [s.id]: e.target.value })}
                        className="w-full bg-[var(--bg-secondary)] border border-transparent focus:bg-white focus:border-[var(--accent)] rounded-2xl px-5 py-4 text-[14px] font-bold text-[var(--text-primary)] outline-none transition-all shadow-inner"
                        placeholder={`${s.label} giriniz...`}
                      />
                    </div>
                  )}

                  {s.type === 'textarea' && (
                    <textarea 
                      rows={4}
                      value={selectedSection.settings[s.id] || ""} 
                      onChange={(e) => updateSection(activePage, selectedSection.id, { [s.id]: e.target.value })}
                      className="w-full bg-[var(--bg-secondary)] border border-transparent focus:bg-white focus:border-[var(--accent)] rounded-2xl px-5 py-4 text-[14px] font-medium text-[var(--text-primary)] outline-none transition-all shadow-inner leading-relaxed resize-none"
                      placeholder="İçerik metnini buraya yazın..."
                    />
                  )}

                  {s.type === 'range' && (
                    <div className="flex items-center gap-4 pt-2">
                      <input 
                        type="range" min={s.min} max={s.max} 
                        value={selectedSection.settings[s.id] || s.default} 
                        onChange={(e) => updateSection(activePage, selectedSection.id, { [s.id]: parseInt(e.target.value) })}
                        className="flex-1 accent-[var(--text-primary)] h-1.5 bg-[var(--bg-secondary)] rounded-full appearance-none cursor-pointer"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* BLOCK MANAGEMENT */}
            {sectionSchema.blocks && (
              <div className="pt-10 border-t border-[var(--border)] space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Layout size={14} className="text-[var(--accent)]" />
                    <h4 className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.3em]">İçerik Blokları</h4>
                  </div>
                  <div className="flex gap-2">
                    {sectionSchema.blocks?.map((bSchema: any) => (
                      <button 
                        key={bSchema.type}
                        onClick={() => addBlock(activePage, selectedSection.id, bSchema.type)}
                        className="flex items-center gap-2 px-4 py-2 bg-[var(--text-primary)] text-[10px] font-black text-white rounded-xl hover:bg-[var(--accent)] transition-all uppercase tracking-widest shadow-lg"
                      >
                        <Plus size={14} /> {bSchema.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  {selectedSection.blocks?.map((block, idx) => {
                    const bSchema = sectionSchema.blocks?.find((bs: any) => bs.type === block.type);
                    return (
                      <div 
                        key={block.id}
                        onClick={(e) => { e.stopPropagation(); setSelectedId(block.id); }}
                        className="group flex items-center gap-4 p-5 bg-[var(--bg-secondary)]/50 border border-transparent rounded-[1.5rem] hover:bg-white hover:border-[var(--accent)] hover:shadow-xl cursor-pointer transition-all duration-300"
                      >
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[var(--text-secondary)] border border-[var(--border)] group-hover:border-[var(--accent)] group-hover:text-[var(--accent)] transition-all shadow-sm group-hover:shadow-[0_0_15px_var(--accent)]/20">
                          <Box size={16} />
                        </div>
                        <div className="flex-1 overflow-hidden">
                          <p className="text-[13px] font-black text-[var(--text-primary)] uppercase tracking-widest truncate">{block.settings?.label || block.settings?.title || bSchema?.label || "Blok Item"}</p>
                          <p className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-tighter opacity-50">Instance #{idx + 1}</p>
                        </div>
                        <button 
                          onClick={(e) => { e.stopPropagation(); removeBlock(activePage, selectedSection.id, block.id); }}
                          className="w-8 h-8 flex items-center justify-center text-[var(--text-secondary)] hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 size={16} />
                        </button>
                        <ChevronRight size={14} className="text-[var(--text-secondary)] opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* BLOCK SETTINGS */}
        {selectedBlock && blockSchema && (
          <div className="space-y-10 animate-in slide-in-from-left duration-500">
            <button 
              onClick={() => setSelectedId(selectedBlockParent!.id)}
              className="flex items-center gap-3 text-[11px] font-black text-[var(--accent)] hover:text-[var(--text-primary)] uppercase tracking-[0.2em] transition-all group"
            >
              <div className="w-8 h-8 flex items-center justify-center bg-[var(--accent)]/10 rounded-lg group-hover:bg-[var(--text-primary)] group-hover:text-white transition-all">
                <ArrowLeft size={16} /> 
              </div>
              Geri Dön
            </button>
            
            <div className="space-y-8">
               <div className="flex items-center gap-3 border-b border-[var(--border)] pb-6">
                  <div className="w-12 h-12 bg-[var(--text-primary)] rounded-2xl flex items-center justify-center text-white shadow-xl">
                     <Type size={20} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-[16px] font-brand font-bold text-[var(--text-primary)]">{blockSchema.label}</h3>
                    <p className="text-[10px] text-[var(--text-secondary)] font-black uppercase tracking-widest opacity-50">Blok Özellikleri</p>
                  </div>
               </div>

              {blockSchema.settings.map((s: any) => (
                <div key={s.id} className="space-y-3 group">
                  <label className="text-[11px] font-black text-[var(--text-primary)] uppercase tracking-widest opacity-80 group-focus-within:text-[var(--accent)] transition-colors">{s.label}</label>
                  
                  {s.type === 'text' && (
                    <input 
                      type="text" 
                      value={selectedBlock.settings[s.id] || ""} 
                      onChange={(e) => updateBlock(activePage, selectedBlockParent!.id, selectedBlock.id, { [s.id]: e.target.value })}
                      className="w-full bg-[var(--bg-secondary)] border border-transparent focus:bg-white focus:border-[var(--accent)] rounded-2xl px-5 py-4 text-[14px] font-bold text-[var(--text-primary)] outline-none transition-all shadow-inner"
                      placeholder="Veri girişi yapın..."
                    />
                  )}
                  {s.type === 'textarea' && (
                    <textarea 
                      rows={5}
                      value={selectedBlock.settings[s.id] || ""} 
                      onChange={(e) => updateBlock(activePage, selectedBlockParent!.id, selectedBlock.id, { [s.id]: e.target.value })}
                      className="w-full bg-[var(--bg-secondary)] border border-transparent focus:bg-white focus:border-[var(--accent)] rounded-2xl px-5 py-4 text-[14px] font-medium text-[var(--text-primary)] outline-none transition-all shadow-inner leading-relaxed resize-none"
                      placeholder="Blok metnini girin..."
                    />
                  )}
                </div>
              ))}
            </div>
            
            <div className="pt-10">
               <button 
                 onClick={() => {if(confirm("Bu bloğu silmek istediğinize emin misiniz?")) { removeBlock(activePage, selectedBlockParent!.id, selectedBlock.id); setSelectedId(selectedBlockParent!.id); }}}
                 className="w-full flex items-center justify-center gap-3 py-4 text-[12px] font-black uppercase tracking-widest text-red-500 bg-red-50 hover:bg-red-500 hover:text-white rounded-2xl transition-all border border-red-100"
               >
                 <Trash2 size={16} /> Bloğu Kaldır
               </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer Branding */}
      <div className="p-8 border-t border-[var(--border)] bg-[var(--bg-secondary)]/30 flex items-center justify-center gap-3">
         <Sparkles size={14} className="text-[var(--accent)]" />
         <span className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.3em]">Powered by Davut Studio</span>
      </div>
    </div>
  );
};
