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
      <div key={setting.id} className="space-y-1.5">
        <div className="flex justify-between items-center">
          <label className="text-[13px] font-medium text-[var(--p-text)]">{setting.label}</label>
          {(setting.type === "range" || setting.type === "number") && (
            <span className="text-[12px] text-gray-500">{value}</span>
          )}
        </div>

        {setting.type === "text" && (
          <input 
            type="text" 
            className="w-full px-3 py-1.5 text-[14px] bg-white border border-[var(--p-border)] rounded-[var(--p-radius)] focus:border-[var(--p-green)] focus:ring-[1px] focus:ring-[var(--p-green)] outline-none transition-all shadow-sm"
            value={value}
            onChange={(e) => handleChange(e.target.value)}
          />
        )}

        {setting.type === "textarea" && (
          <textarea 
            className="w-full px-3 py-2 text-[14px] bg-white border border-[var(--p-border)] rounded-[var(--p-radius)] focus:border-[var(--p-green)] focus:ring-[1px] focus:ring-[var(--p-green)] outline-none min-h-[100px] resize-none transition-all shadow-sm"
            value={value}
            onChange={(e) => handleChange(e.target.value)}
          />
        )}

        {setting.type === "range" && (
          <div className="pt-2">
            <input 
              type="range" 
              min={setting.min ?? 0} 
              max={setting.max ?? 100} 
              step={setting.step ?? 1}
              className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--p-green)]"
              value={value}
              onChange={(e) => handleChange(parseInt(e.target.value))}
            />
          </div>
        )}

        {setting.type === "select" && (
          <div className="relative">
            <select 
              className="w-full px-3 py-1.5 text-[14px] bg-white border border-[var(--p-border)] rounded-[var(--p-radius)] focus:border-[var(--p-green)] focus:ring-[1px] focus:ring-[var(--p-green)] outline-none appearance-none cursor-pointer shadow-sm"
              value={value}
              onChange={(e) => handleChange(e.target.value)}
            >
              {setting.options?.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        )}

        {setting.type === "image" && (
          <div className="space-y-2">
            <div className="border border-[var(--p-border)] rounded-[var(--p-radius)] p-1 bg-[var(--p-bg)] hover:bg-gray-100 cursor-pointer transition-all">
              <div className="bg-white rounded-[var(--p-radius)] p-4 flex flex-col items-center justify-center border border-dashed border-gray-300">
                {value ? (
                  <img src={value} alt="Preview" className="w-full h-24 object-contain rounded-sm mb-2" />
                ) : (
                  <ImageIcon className="text-gray-300 mb-2" size={24} />
                )}
                <span className="text-[12px] font-medium text-[var(--p-green)]">Görsel seç</span>
              </div>
            </div>
            <input 
              type="text" 
              placeholder="URL veya ID..."
              className="w-full px-3 py-1.5 text-[12px] bg-white border border-[var(--p-border)] rounded-[var(--p-radius)] outline-none"
              value={value}
              onChange={(e) => handleChange(e.target.value)}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col bg-[var(--p-bg)] animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="p-4 border-b border-[var(--p-border)] flex items-center justify-between bg-white shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => setSelectedId(null)} className="p-1.5 hover:bg-gray-100 rounded-md transition-colors">
            <X size={16} className="text-gray-500" />
          </button>
          <span className="font-semibold text-[14px] text-[var(--p-text)]">{schema?.label || selectedSection.type}</span>
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
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-6">
          <div className="bg-white rounded-xl shadow-[var(--p-shadow-100)] border border-[var(--p-border)] p-4 space-y-5">
            {schema?.settings.map(renderSetting)}
          </div>

          {/* Style Section */}
          <div className="space-y-3">
            <h3 className="px-1 text-[12px] font-semibold text-gray-500 uppercase tracking-wider">Görünüm</h3>
            <div className="bg-white rounded-xl shadow-[var(--p-shadow-100)] border border-[var(--p-border)] divide-y divide-[var(--p-border)]">
              <button className="w-full flex items-center justify-between p-3.5 hover:bg-gray-50 transition-all group text-left">
                <span className="text-[13px] text-[var(--p-text)]">Kenar boşlukları</span>
                <ChevronRight size={14} className="text-gray-400 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <button className="w-full flex items-center justify-between p-3.5 hover:bg-gray-50 transition-all group text-left">
                <span className="text-[13px] text-[var(--p-text)]">Özel CSS</span>
                <ChevronRight size={14} className="text-gray-400 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
