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
      <div className="h-full flex flex-col items-center justify-center text-center p-10">
        <div className="w-20 h-20 bg-[#f6f6f7] rounded-full flex items-center justify-center mb-6">
          <Settings size={32} className="text-gray-300" />
        </div>
        <h3 className="text-sm font-bold text-gray-600 mb-2">Düzenlemek İçin Seçin</h3>
        <p className="text-[12px] text-gray-400 leading-relaxed max-w-[200px]">
          Sol menüden bir bölüm seçin veya önizleme üzerinde bir öğeye tıklayın.
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

    switch (setting.type) {
      case "text":
        return (
          <div key={setting.id} className="space-y-1.5">
            <label className="text-[12px] font-semibold">{setting.label}</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-[#008060] outline-none"
              value={value}
              onChange={(e) => handleChange(e.target.value)}
            />
          </div>
        );
      case "textarea":
        return (
          <div key={setting.id} className="space-y-1.5">
            <label className="text-[12px] font-semibold">{setting.label}</label>
            <textarea 
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-[#008060] outline-none min-h-[100px] resize-none"
              value={value}
              onChange={(e) => handleChange(e.target.value)}
            />
          </div>
        );
      case "range":
        return (
          <div key={setting.id} className="space-y-1.5">
            <label className="text-[12px] font-semibold">{setting.label}</label>
            <div className="flex items-center gap-4">
              <input 
                type="range" 
                min={setting.min ?? 0} 
                max={setting.max ?? 100} 
                step={setting.step ?? 1}
                className="flex-1 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#008060]"
                value={value}
                onChange={(e) => handleChange(parseInt(e.target.value))}
              />
              <span className="text-xs font-bold w-6">{value}</span>
            </div>
          </div>
        );
      case "select":
        return (
          <div key={setting.id} className="space-y-1.5">
            <label className="text-[12px] font-semibold">{setting.label}</label>
            <select 
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-[#008060] outline-none bg-white"
              value={value}
              onChange={(e) => handleChange(e.target.value)}
            >
              {setting.options?.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        );
      case "image":
        return (
          <div key={setting.id} className="space-y-1.5">
            <label className="text-[12px] font-semibold">{setting.label}</label>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors">
              <ImageIcon className="text-gray-300 mb-2" size={32} />
              <span className="text-[11px] font-medium text-blue-600">Görsel Seç</span>
            </div>
            <input 
              type="text" 
              placeholder="Veya URL yapıştırın..."
              className="w-full px-3 py-2 mt-2 text-xs border border-gray-300 rounded-md outline-none"
              value={value}
              onChange={(e) => handleChange(e.target.value)}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col animate-in slide-in-from-right duration-200">
      <div className="p-4 border-b border-[#d2d2d2] flex items-center justify-between bg-white sticky top-0 z-10">
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Düzenleme</span>
          <span className="font-bold text-[14px]">{schema?.label || selectedSection.type} Bölümü</span>
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={() => removeSection(activePage, selectedSection.id)} 
            className="p-2 hover:bg-red-50 text-red-500 rounded-full transition-colors"
          >
            <Trash2 size={16} />
          </button>
          <button onClick={() => setSelectedId(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={18} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-8">
        <div className="space-y-6">
          <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-widest pb-1 border-b">İçerik</h3>
          {schema?.settings.map(renderSetting)}
        </div>

        <div className="space-y-6 pt-4 border-t border-gray-100">
          <h3 className="text-[12px] font-bold text-gray-400 uppercase tracking-widest pb-1 border-b">Tasarım</h3>
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
  );
};
