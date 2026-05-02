"use client";

import React from "react";
import { Trash2, X, ChevronRight, Settings, Image as ImageIcon } from "lucide-react";
import { useBuilderStore } from "@/store/useBuilderStore";
import { SECTION_SCHEMAS, SettingSchema } from "@/store/schema";

export const Inspector: React.FC = () => {
  const { activePage, selectedId, pages, updateSection, setSelectedId, removeSection } = useBuilderStore();
  
  const currentPage = pages[activePage];
  const selectedSection = currentPage?.sections.find(s => s.id === selectedId);
  
  if (!selectedSection) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-10 bg-[var(--p-bg)]">
        <div className="w-16 h-16 bg-white rounded-2xl shadow-[var(--p-shadow-100)] flex items-center justify-center mb-6">
          <Settings size={28} className="text-gray-300" />
        </div>
        <h3 className="text-sm font-semibold text-[var(--p-text)] mb-2">Bölüm seçin</h3>
        <p className="text-[13px] text-gray-500 leading-relaxed max-w-[220px]">
          Düzenlemek istediğiniz bölümü seçerek ayarlarını burada görebilirsiniz.
        </p>
      </div>
    );
  }

  const schema = SECTION_SCHEMAS[selectedSection.type];

  const renderSetting = (setting: SettingSchema) => {
    const value = selectedSection.settings[setting.id] ?? setting.default;

    const handleChange = (newValue: any) => {
      updateSection(activePage, selectedSection.id, { [setting.id]: newValue });
    };

    return (
      <div key={setting.id} className="space-y-[var(--p-space-2)]">
        <div className="flex justify-between items-center">
          <label className="text-[13px] font-semibold text-[var(--p-text)]">{setting.label}</label>
          {(setting.type === "range" || setting.type === "number") && (
            <span className="text-[12px] text-[var(--p-text-subdued)]">{value}</span>
          )}
        </div>

        {setting.type === "text" && (
          <input 
            type="text" 
            className="w-full px-3 py-2 text-[14px] bg-white border border-[var(--p-border)] rounded-[var(--p-radius)] focus:border-[var(--p-blue)] focus:ring-[1px] focus:ring-[var(--p-blue)] outline-none transition-all shadow-sm"
            value={value}
            onChange={(e) => handleChange(e.target.value)}
          />
        )}

        {setting.type === "textarea" && (
          <textarea 
            className="w-full px-3 py-2 text-[14px] bg-white border border-[var(--p-border)] rounded-[var(--p-radius)] focus:border-[var(--p-blue)] focus:ring-[1px] focus:ring-[var(--p-blue)] outline-none min-h-[100px] resize-none transition-all shadow-sm"
            value={value}
            onChange={(e) => handleChange(e.target.value)}
          />
        )}

        {setting.type === "range" && (
          <div className="pt-2 flex items-center gap-3">
            <input 
              type="range" 
              min={setting.min ?? 0} 
              max={setting.max ?? 100} 
              step={setting.step ?? 1}
              className="flex-1 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--p-blue)]"
              value={value}
              onChange={(e) => handleChange(parseInt(e.target.value))}
            />
            <span className="text-[11px] font-mono text-gray-400 w-8 text-right">{value}</span>
          </div>
        )}

        {setting.type === "select" && (
          <div className="relative group">
            <select 
              className="w-full px-3 py-2 text-[14px] bg-white border border-[var(--p-border)] rounded-[var(--p-radius)] focus:border-[var(--p-blue)] focus:ring-[1px] focus:ring-[var(--p-blue)] outline-none appearance-none cursor-pointer shadow-sm pr-10"
              value={value}
              onChange={(e) => handleChange(e.target.value)}
            >
              {setting.options?.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <ChevronRight className="absolute right-3 top-2.5 rotate-90 text-gray-400 pointer-events-none" size={16} />
          </div>
        )}

        {setting.type === "checkbox" && (
          <div className="flex items-center gap-3 py-1">
            <button 
              onClick={() => handleChange(!value)}
              className={`w-10 h-5 rounded-full transition-all relative ${value ? 'bg-[var(--p-blue)]' : 'bg-gray-300'}`}
            >
              <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${value ? 'left-6' : 'left-1'}`} />
            </button>
            <span className="text-[13px] text-gray-500">{value ? 'Aktif' : 'Pasif'}</span>
          </div>
        )}

        {setting.type === "image" && (
          <div className="space-y-3">
            <div className="border border-[var(--p-border)] rounded-[var(--p-radius)] p-1 bg-[var(--p-bg)] hover:bg-gray-100 cursor-pointer transition-all shadow-sm">
              <div className="bg-white rounded-[var(--p-radius)] p-6 flex flex-col items-center justify-center border border-dashed border-gray-300">
                {value ? (
                  <img src={value} alt="Preview" className="w-full h-28 object-contain rounded-sm mb-3" />
                ) : (
                  <ImageIcon className="text-gray-300 mb-3" size={32} />
                )}
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-white border border-[var(--p-border)] rounded-md text-[12px] font-semibold text-[var(--p-text)] hover:bg-gray-50">Değiştir</span>
                  <span className="px-3 py-1 bg-white border border-[var(--p-border)] rounded-md text-[12px] font-semibold text-[var(--p-text)] hover:bg-gray-50">Keşfet</span>
                </div>
              </div>
            </div>
            <p className="text-[11px] text-[var(--p-text-subdued)] italic">En iyi sonuç için 2000x1200px görseller kullanın.</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col bg-[var(--p-bg)] animate-in slide-in-from-right duration-300 ease-[var(--p-easing)]">
      {/* Header */}
      <div className="p-4 border-b border-[var(--p-border)] flex items-center justify-between bg-white shadow-sm h-12">
        <div className="flex items-center gap-3">
          <button onClick={() => setSelectedId(null)} className="p-1.5 hover:bg-gray-100 rounded-md transition-colors">
            <X size={16} className="text-gray-500" />
          </button>
          <span className="font-bold text-[14px] text-[var(--p-text)] truncate max-w-[180px]">{schema?.label || selectedSection.type}</span>
        </div>
        <button 
          onClick={() => removeSection(activePage, selectedSection.id)} 
          className="p-1.5 hover:bg-red-50 text-red-500 rounded-md transition-colors"
          title="Bölümü Sil"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* Settings List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-[var(--p-space-4)] space-y-[var(--p-space-4)]">
          <div className="bg-white rounded-[var(--p-radius)] shadow-[var(--p-shadow-100)] border border-[var(--p-border)] p-[var(--p-space-4)] space-y-[var(--p-space-4)]">
             <div className="pb-2 border-b border-gray-50">
               <h3 className="text-[12px] font-bold text-[var(--p-text)] uppercase tracking-wider">Ayarlar</h3>
             </div>
            {schema?.settings.map(renderSetting)}
          </div>

          {/* Style Section */}
          <div className="space-y-[var(--p-space-2)]">
            <h3 className="px-1 text-[11px] font-bold text-[var(--p-text-subdued)] uppercase tracking-widest">Görünüm</h3>
            <div className="bg-white rounded-[var(--p-radius)] shadow-[var(--p-shadow-100)] border border-[var(--p-border)] divide-y divide-[var(--p-border)]">
              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-all group text-left">
                <span className="text-[13px] font-medium text-[var(--p-text)]">Bölüm yüksekliği</span>
                <ChevronRight size={14} className="text-gray-400 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-all group text-left">
                <span className="text-[13px] font-medium text-[var(--p-text)]">Özel CSS</span>
                <ChevronRight size={14} className="text-gray-400 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
