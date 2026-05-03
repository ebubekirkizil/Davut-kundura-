"use client";

import React from "react";
import { Trash2, X, Settings, Plus, ArrowLeft, Box } from "lucide-react";
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
  
  // Seçili öğeyi bul (Bölüm mü yoksa Blok mu?)
  const selectedSection = currentPage.sections.find(s => s.id === selectedId);
  const selectedBlockParent = currentPage.sections.find(s => s.blocks?.some(b => b.id === selectedId));
  const selectedBlock = selectedBlockParent?.blocks.find(b => b.id === selectedId);

  // Hiçbir şey seçili değilse
  if (!selectedId) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-10 bg-gray-50">
        <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6">
          <Settings size={28} className="text-gray-300" />
        </div>
        <h3 className="text-sm font-semibold text-gray-900 mb-2">Bölüm seçin</h3>
        <p className="text-[13px] text-gray-500 leading-relaxed max-w-[220px]">
          Düzenlemek istediğiniz bir bölüme dokunarak detaylı ayarlara ulaşabilirsiniz.
        </p>
      </div>
    );
  }

  const sectionSchema = selectedSection ? SECTION_SCHEMAS[selectedSection.type] : null;
  const blockSchema = selectedBlock && selectedBlockParent 
    ? SECTION_SCHEMAS[selectedBlockParent.type]?.blocks?.find((b: any) => b.type === selectedBlock.type)
    : null;

  return (
    <div className="h-full flex flex-col bg-white animate-in slide-in-from-right duration-300">
      {/* HEADER */}
      <div className="p-4 border-b flex items-center justify-between bg-white sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => setSelectedId(null)} className="p-1.5 hover:bg-gray-100 rounded-md transition-colors">
            <X size={16} className="text-gray-500" />
          </button>
          <span className="font-bold text-[14px] text-gray-800">
            {sectionSchema?.label || blockSchema?.label || "Ayarlar"}
          </span>
        </div>
        {selectedSection && (
          <button 
            onClick={() => removeSection(activePage, selectedSection.id)} 
            className="p-1.5 hover:bg-red-50 text-red-500 rounded-md transition-colors"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-8 custom-scrollbar">
        {/* BÖLÜM AYARLARI */}
        {selectedSection && sectionSchema && (
          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Bölüm Ayarları</h4>
              {sectionSchema.settings.map((s: any) => (
                <div key={s.id} className="space-y-2">
                  <label className="text-[12px] font-semibold text-gray-700">{s.label}</label>
                  {s.type === 'text' && (
                    <input 
                      type="text" 
                      value={selectedSection.settings[s.id] || ""} 
                      onChange={(e) => updateSection(activePage, selectedSection.id, { [s.id]: e.target.value })}
                      className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  )}
                  {s.type === 'textarea' && (
                    <textarea 
                      rows={3}
                      value={selectedSection.settings[s.id] || ""} 
                      onChange={(e) => updateSection(activePage, selectedSection.id, { [s.id]: e.target.value })}
                      className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                    />
                  )}
                  {s.type === 'range' && (
                    <div className="flex items-center gap-4">
                      <input 
                        type="range" min={s.min} max={s.max} 
                        value={selectedSection.settings[s.id] || s.default} 
                        onChange={(e) => updateSection(activePage, selectedSection.id, { [s.id]: parseInt(e.target.value) })}
                        className="flex-1 accent-blue-500"
                      />
                      <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">{selectedSection.settings[s.id]}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* BLOK YÖNETİMİ (MENÜLER, LİNKLER VB.) */}
            {sectionSchema.blocks && (
              <div className="pt-6 border-t space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">İçerik Blokları</h4>
                  <div className="flex gap-1">
                    {sectionSchema.blocks.map((bSchema: any) => (
                      <button 
                        key={bSchema.type}
                        onClick={() => addBlock(activePage, selectedSection.id, bSchema.type)}
                        className="flex items-center gap-1 px-2 py-1 bg-blue-50 text-[10px] font-bold text-blue-600 rounded hover:bg-blue-100 transition-colors uppercase"
                      >
                        <Plus size={12} /> {bSchema.label} Ekle
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  {selectedSection.blocks?.map((block) => {
                    const bSchema = sectionSchema.blocks.find((bs: any) => bs.type === block.type);
                    return (
                      <div 
                        key={block.id}
                        onClick={(e) => { e.stopPropagation(); setSelectedId(block.id); }}
                        className="group flex items-center gap-3 p-3 bg-gray-50 border border-gray-100 rounded-xl hover:border-blue-200 hover:bg-blue-50/30 cursor-pointer transition-all"
                      >
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-gray-400 group-hover:text-blue-500 transition-colors shadow-sm">
                          <Box size={14} />
                        </div>
                        <div className="flex-1 overflow-hidden">
                          <p className="text-[12px] font-bold text-gray-700 truncate">{block.settings?.label || block.settings?.title || bSchema?.label || "Blok"}</p>
                          <p className="text-[10px] text-gray-400 uppercase tracking-tighter">{block.type}</p>
                        </div>
                        <button 
                          onClick={(e) => { e.stopPropagation(); removeBlock(activePage, selectedSection.id, block.id); }}
                          className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* BLOK AYARLARI (Seçili menü elemanı vb.) */}
        {selectedBlock && blockSchema && (
          <div className="space-y-6 animate-in slide-in-from-left duration-300">
            <button 
              onClick={() => setSelectedId(selectedBlockParent!.id)}
              className="flex items-center gap-2 text-[11px] font-bold text-blue-500 hover:text-blue-600 uppercase tracking-widest pb-4"
            >
              <ArrowLeft size={14} /> Bölüm Ayarlarına Dön
            </button>
            
            <div className="space-y-4">
              {blockSchema.settings.map((s: any) => (
                <div key={s.id} className="space-y-2">
                  <label className="text-[12px] font-semibold text-gray-700">{s.label}</label>
                  {s.type === 'text' && (
                    <input 
                      type="text" 
                      value={selectedBlock.settings[s.id] || ""} 
                      onChange={(e) => updateBlock(activePage, selectedBlockParent!.id, selectedBlock.id, { [s.id]: e.target.value })}
                      className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  )}
                  {s.type === 'textarea' && (
                    <textarea 
                      rows={4}
                      value={selectedBlock.settings[s.id] || ""} 
                      onChange={(e) => updateBlock(activePage, selectedBlockParent!.id, selectedBlock.id, { [s.id]: e.target.value })}
                      className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
