"use client"

import React, { useState, useRef } from "react"
import { useBuilderStore, Section, PageData } from "@/store/useBuilderStore"
import { SECTION_SCHEMAS, SECTION_CATEGORIES, SettingField } from "@/store/schema"
import StorefrontRenderer from "@/components/builder/StorefrontRenderer"
import {
  GripVertical, Plus, Trash2, Eye, Save, Monitor, Smartphone, Tablet,
  ChevronDown, ChevronRight, X, Undo2, Redo2, Image as ImageIcon,
  Upload, Settings, Palette, FileText, Layers, Loader2, Copy, ArrowUp, ArrowDown
} from "lucide-react"

// Dynamic settings form helper inside the editor
function SettingsField({ 
  field, 
  value, 
  onChange 
}: { 
  field: SettingField
  value: any
  onChange: (val: any) => void 
}) {
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append("file", file)

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData
      })
      const data = await res.json()
      if (data.url) {
        onChange(data.url)
      } else {
        alert("Yükleme hatası: " + (data.error || "Bilinmeyen hata"))
      }
    } catch (err) {
      console.error(err)
      alert("Dosya yüklenirken sunucu hatası oluştu.")
    } finally {
      setUploading(false)
    }
  }

  switch (field.type) {
    case "text":
      return (
        <div className="space-y-1">
          <label className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">{field.label}</label>
          <input 
            type="text" 
            value={value ?? field.default ?? ""} 
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder} 
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-slate-800 dark:text-slate-200" 
          />
        </div>
      )
    case "textarea":
      return (
        <div className="space-y-1">
          <label className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">{field.label}</label>
          <textarea 
            value={value ?? field.default ?? ""} 
            onChange={(e) => onChange(e.target.value)} 
            rows={3}
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-slate-800 dark:text-slate-200 resize-none" 
          />
        </div>
      )
    case "color":
      return (
        <div className="space-y-1">
          <label className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">{field.label}</label>
          <div className="flex items-center gap-2">
            <div className="relative w-10 h-10 rounded-xl border border-slate-200 dark:border-white/10 overflow-hidden cursor-pointer">
              <input 
                type="color" 
                value={value ?? field.default ?? "#000000"} 
                onChange={(e) => onChange(e.target.value)}
                className="absolute inset-0 w-full h-full scale-150 cursor-pointer" 
              />
            </div>
            <input 
              type="text" 
              value={value ?? field.default ?? ""} 
              onChange={(e) => onChange(e.target.value)}
              className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-slate-800 dark:text-slate-200" 
            />
          </div>
        </div>
      )
    case "range":
      return (
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <label className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">{field.label}</label>
            <span className="text-xs font-black text-amber-600 dark:text-amber-400">{value ?? field.default}</span>
          </div>
          <input 
            type="range" 
            min={field.min ?? 0} 
            max={field.max ?? 100} 
            step={field.step ?? 1}
            value={value ?? field.default ?? 0} 
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full accent-amber-500 h-1.5 bg-slate-200 dark:bg-white/10 rounded-lg cursor-pointer" 
          />
        </div>
      )
    case "checkbox":
      return (
        <label className="flex items-center gap-3 cursor-pointer select-none">
          <input 
            type="checkbox" 
            checked={value ?? field.default ?? false} 
            onChange={(e) => onChange(e.target.checked)}
            className="w-4.5 h-4.5 rounded border-slate-300 dark:border-white/10 accent-amber-500 cursor-pointer" 
          />
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{field.label}</span>
        </label>
      )
    case "select":
      return (
        <div className="space-y-1">
          <label className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">{field.label}</label>
          <select 
            value={value ?? field.default ?? ""} 
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-slate-800 dark:text-slate-200 cursor-pointer"
          >
            {field.options?.map((o) => (
              <option key={o.value} value={o.value} className="bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200">
                {o.label}
              </option>
            ))}
          </select>
        </div>
      )
    case "image":
      return (
        <div className="space-y-1.5">
          <label className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">{field.label}</label>
          <div className="flex gap-2">
            <input 
              type="text" 
              value={value ?? ""} 
              onChange={(e) => onChange(e.target.value)}
              placeholder="Görsel URL veya dosya seç..." 
              className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-slate-800 dark:text-slate-200" 
            />
            <input 
              type="file" 
              accept="image/*" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="hidden" 
            />
            <button 
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="px-3 h-9 bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/20 rounded-xl flex items-center justify-center transition-all disabled:opacity-50"
            >
              {uploading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Upload className="h-4 w-4" />
              )}
            </button>
          </div>
          {value && (
            <div className="relative mt-1.5 h-16 w-full rounded-xl overflow-hidden border border-slate-200 dark:border-white/5 bg-slate-100 dark:bg-black/20 flex items-center justify-center">
              <img src={value} alt="Preview" className="h-full w-full object-cover" />
              <button 
                type="button" 
                onClick={() => onChange("")} 
                className="absolute top-1 right-1 p-1 bg-black/50 hover:bg-black/75 text-white rounded-full transition-all"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>
      )
    default: 
      return null
  }
}

export default function PageBuilderPage() {
  const store = useBuilderStore()
  const page = store.activePage
  const currentPage = store.pages[page] || { title: "Ana Sayfa", slug: "index", sections: [] }
  const sections = currentPage.sections ?? []
  
  const selectedSection = sections.find((s) => s.id === store.selectedId)
  const selectedSchema = selectedSection ? SECTION_SCHEMAS[selectedSection.type] : null

  // Tab state for left sidebar (sections list or global styling)
  const [activeLeftTab, setActiveLeftTab] = useState<"sections" | "theme" | "pages">("sections")
  const [showAddPanel, setShowAddPanel] = useState(false)
  const [saving, setSaving] = useState(false)

  // Page CRUD modal/inputs state
  const [newPageTitle, setNewPageTitle] = useState("")
  const [newPageSlug, setNewPageSlug] = useState("")

  const handleAddPage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPageTitle || !newPageSlug) return
    const formattedSlug = newPageSlug.toLowerCase().replace(/[^a-z0-9-_]/g, "")
    store.addPage(formattedSlug, newPageTitle)
    setNewPageTitle("")
    setNewPageSlug("")
  }

  const handleSavePageData = async () => {
    setSaving(true)
    try {
      await fetch("/api/admin/page-builder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: page,
          title: currentPage.title,
          sections,
          globalTheme: store.globalTheme
        })
      })
      alert("Sayfa ve Tema Tasarımları Başarıyla Kaydedildi!")
    } catch (err) {
      console.error(err)
      alert("Tasarım kaydedilirken hata oluştu!")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] -m-6 md:-m-8 overflow-hidden bg-slate-50 dark:bg-slate-950 font-sans text-slate-800 dark:text-slate-100 selection:bg-amber-500/20">
      
      {/* ═══ LEFT SIDEBAR: Dynamic Controller ═══ */}
      <div className="w-[300px] flex-shrink-0 bg-white dark:bg-slate-900/60 border-r border-slate-200 dark:border-white/5 flex flex-col backdrop-blur-md">
        
        {/* Navigation tabs */}
        <div className="grid grid-cols-3 border-b border-slate-200 dark:border-white/5 p-2 gap-1 bg-slate-50/50 dark:bg-black/10">
          <button 
            onClick={() => setActiveLeftTab("sections")}
            className={`py-2 text-[10px] font-black uppercase tracking-wider rounded-xl transition-all flex flex-col items-center gap-1 ${
              activeLeftTab === "sections" 
              ? "bg-white dark:bg-slate-800 text-amber-600 dark:text-amber-400 shadow-sm border border-slate-200/50 dark:border-white/5" 
              : "text-slate-400 dark:text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            <Layers className="h-4 w-4" /> Bölümler
          </button>
          <button 
            onClick={() => setActiveLeftTab("theme")}
            className={`py-2 text-[10px] font-black uppercase tracking-wider rounded-xl transition-all flex flex-col items-center gap-1 ${
              activeLeftTab === "theme" 
              ? "bg-white dark:bg-slate-800 text-amber-600 dark:text-amber-400 shadow-sm border border-slate-200/50 dark:border-white/5" 
              : "text-slate-400 dark:text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            <Palette className="h-4 w-4" /> Global Stil
          </button>
          <button 
            onClick={() => setActiveLeftTab("pages")}
            className={`py-2 text-[10px] font-black uppercase tracking-wider rounded-xl transition-all flex flex-col items-center gap-1 ${
              activeLeftTab === "pages" 
              ? "bg-white dark:bg-slate-800 text-amber-600 dark:text-amber-400 shadow-sm border border-slate-200/50 dark:border-white/5" 
              : "text-slate-400 dark:text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            <FileText className="h-4 w-4" /> Sayfalar
          </button>
        </div>

        {/* ── TAB CONTENT ── */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          
          {/* SECTIONS TAB */}
          {activeLeftTab === "sections" && (
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Sayfa Düzeni</h3>
                <button 
                  onClick={() => setShowAddPanel(!showAddPanel)}
                  className="h-8 px-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/10 transition-all"
                >
                  <Plus className="h-3.5 w-3.5" /> Bölüm Ekle
                </button>
              </div>

              {/* Add New Section Floating Panel */}
              {showAddPanel && (
                <div className="p-3 bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/5 rounded-2xl space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex justify-between items-center border-b border-slate-200 dark:border-white/5 pb-1.5">
                    <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Bileşen Seçin</span>
                    <button onClick={() => setShowAddPanel(false)} className="text-slate-400 hover:text-slate-600"><X className="h-3 w-3" /></button>
                  </div>
                  <div className="grid grid-cols-1 gap-1.5 max-h-[250px] overflow-y-auto">
                    {Object.values(SECTION_SCHEMAS).map((s) => (
                      <button 
                        key={s.type}
                        onClick={() => { store.addSection(page, s.type); setShowAddPanel(false) }}
                        className="w-full px-3 py-2 text-left hover:bg-amber-500/5 dark:hover:bg-amber-500/10 text-xs font-bold text-slate-700 dark:text-slate-300 rounded-xl transition-all border border-transparent hover:border-amber-500/10 flex items-center gap-2"
                      >
                        <Layers className="h-3.5 w-3.5 text-amber-500" />
                        <div>
                          <p>{s.label}</p>
                          <span className="text-[9px] text-slate-400 dark:text-slate-500 font-semibold">{SECTION_CATEGORIES[s.category]}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sections list with re-order layout */}
              <div className="space-y-2">
                {sections.length === 0 ? (
                  <div className="text-center py-12 border border-dashed border-slate-200 dark:border-white/5 rounded-3xl">
                    <p className="text-xs text-slate-400">Bu sayfada henüz bölüm bulunmuyor.</p>
                  </div>
                ) : (
                  sections.map((sec, idx) => (
                    <div 
                      key={sec.id}
                      onClick={() => store.setSelectedId(sec.id)}
                      className={`group flex items-center gap-2 p-3 rounded-2xl border transition-all cursor-pointer ${
                        store.selectedId === sec.id 
                        ? "bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-400 shadow-sm" 
                        : "bg-white dark:bg-slate-900/40 border-slate-200 dark:border-white/5 hover:border-amber-500/20"
                      }`}
                    >
                      <div className="flex flex-col gap-0.5 opacity-40 group-hover:opacity-100 transition-opacity">
                        <button onClick={(e) => { e.stopPropagation(); store.moveSectionUp(page, sec.id) }} className="hover:text-amber-500 p-0.5"><ChevronRight className="h-3 w-3 -rotate-90" /></button>
                        <button onClick={(e) => { e.stopPropagation(); store.moveSectionDown(page, sec.id) }} className="hover:text-amber-500 p-0.5"><ChevronRight className="h-3 w-3 rotate-90" /></button>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-black truncate uppercase tracking-wide">{SECTION_SCHEMAS[sec.type]?.label ?? sec.type}</p>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate font-semibold">Instance #{idx + 1}</p>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={(e) => { e.stopPropagation(); store.duplicateSection(page, sec.id) }}
                          title="Bölümü Kopyala"
                          className="p-1 hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400 hover:text-amber-500 rounded-lg transition-all"
                        >
                          <Copy className="h-3.5 w-3.5" />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); if (confirm("Bu bölümü silmek istediğinize emin misiniz?")) store.removeSection(page, sec.id) }}
                          className="p-1 hover:bg-rose-500/10 text-slate-400 hover:text-rose-600 rounded-lg transition-all"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* GLOBAL THEME TAB */}
          {activeLeftTab === "theme" && (
            <div className="p-4 space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Global Arayüz Stili</h3>
              
              <div className="space-y-4 bg-slate-50/50 dark:bg-slate-900/40 p-4 rounded-2xl border border-slate-200/60 dark:border-white/5">
                <div className="space-y-1">
                  <label className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">Birincil Renk (Primary)</label>
                  <div className="flex items-center gap-2">
                    <input 
                      type="color" 
                      value={store.globalTheme.primaryColor} 
                      onChange={(e) => store.updateGlobalTheme({ primaryColor: e.target.value })}
                      className="w-8 h-8 rounded-lg cursor-pointer border-0 overflow-hidden" 
                    />
                    <input 
                      type="text" 
                      value={store.globalTheme.primaryColor} 
                      onChange={(e) => store.updateGlobalTheme({ primaryColor: e.target.value })}
                      className="flex-1 px-3 py-1.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-lg text-xs font-mono" 
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">Vurgu Rengi (Accent)</label>
                  <div className="flex items-center gap-2">
                    <input 
                      type="color" 
                      value={store.globalTheme.accentColor} 
                      onChange={(e) => store.updateGlobalTheme({ accentColor: e.target.value })}
                      className="w-8 h-8 rounded-lg cursor-pointer border-0 overflow-hidden" 
                    />
                    <input 
                      type="text" 
                      value={store.globalTheme.accentColor} 
                      onChange={(e) => store.updateGlobalTheme({ accentColor: e.target.value })}
                      className="flex-1 px-3 py-1.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-lg text-xs font-mono" 
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">Arka Plan Rengi</label>
                  <div className="flex items-center gap-2">
                    <input 
                      type="color" 
                      value={store.globalTheme.bgColor} 
                      onChange={(e) => store.updateGlobalTheme({ bgColor: e.target.value })}
                      className="w-8 h-8 rounded-lg cursor-pointer border-0 overflow-hidden" 
                    />
                    <input 
                      type="text" 
                      value={store.globalTheme.bgColor} 
                      onChange={(e) => store.updateGlobalTheme({ bgColor: e.target.value })}
                      className="flex-1 px-3 py-1.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-lg text-xs font-mono" 
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">Yazı Rengi</label>
                  <div className="flex items-center gap-2">
                    <input 
                      type="color" 
                      value={store.globalTheme.textColor} 
                      onChange={(e) => store.updateGlobalTheme({ textColor: e.target.value })}
                      className="w-8 h-8 rounded-lg cursor-pointer border-0 overflow-hidden" 
                    />
                    <input 
                      type="text" 
                      value={store.globalTheme.textColor} 
                      onChange={(e) => store.updateGlobalTheme({ textColor: e.target.value })}
                      className="flex-1 px-3 py-1.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-lg text-xs font-mono" 
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">Kenar Yuvarlaklığı</label>
                    <span className="text-xs font-bold text-amber-500">{store.globalTheme.borderRadius}px</span>
                  </div>
                  <input 
                    type="range" 
                    min={0} 
                    max={24} 
                    value={store.globalTheme.borderRadius} 
                    onChange={(e) => store.updateGlobalTheme({ borderRadius: Number(e.target.value) })}
                    className="w-full accent-amber-500 h-1.5 bg-slate-200 dark:bg-white/10 rounded-lg cursor-pointer" 
                  />
                </div>
              </div>
            </div>
          )}

          {/* PAGES TAB */}
          {activeLeftTab === "pages" && (
            <div className="p-4 space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Sayfa Düzenleyici</h3>
              
              {/* Sayfa listesi */}
              <div className="space-y-1.5">
                {Object.values(store.pages).map((p) => (
                  <div 
                    key={p.slug}
                    onClick={() => store.setActivePage(p.slug)}
                    className={`flex items-center justify-between px-4 py-3 rounded-2xl border transition-all cursor-pointer ${
                      page === p.slug 
                      ? "bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-400 font-bold" 
                      : "bg-white dark:bg-slate-900/40 border-slate-200 dark:border-white/5 hover:border-slate-300"
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-black tracking-wide uppercase">{p.title}</p>
                      <span className="text-[9px] font-mono text-slate-400 truncate block">/{p.slug}</span>
                    </div>
                    {Object.keys(store.pages).length > 1 && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); if (confirm("Bu sayfayı ve tüm bölümlerini silmek istediğinize emin misiniz?")) store.removePage(p.slug) }}
                        className="p-1 hover:bg-rose-500/10 text-slate-400 hover:text-rose-600 rounded-lg transition-all"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Yeni Sayfa Ekle Formu */}
              <form onSubmit={handleAddPage} className="p-4 bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 rounded-2xl space-y-3 mt-4">
                <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Yeni Sayfa Oluştur</span>
                <input 
                  type="text" 
                  placeholder="Sayfa Başlığı (Örn: Hakkımızda)" 
                  value={newPageTitle} 
                  onChange={(e) => setNewPageTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl text-xs" 
                />
                <input 
                  type="text" 
                  placeholder="URL Adresi (Örn: hakkimizda)" 
                  value={newPageSlug} 
                  onChange={(e) => setNewPageSlug(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-mono" 
                />
                <button 
                  type="submit"
                  className="w-full py-2 bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 font-bold text-xs rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-1"
                >
                  <Plus className="h-3.5 w-3.5" /> Sayfayı Kaydet
                </button>
              </form>
            </div>
          )}

        </div>

        {/* Footer actions: Undo/Redo & Save */}
        <div className="p-4 border-t border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-black/10 space-y-3">
          <div className="flex gap-2">
            <button 
              onClick={store.undo}
              disabled={!store.canUndo()}
              className="flex-1 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 font-bold rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-all text-xs flex items-center justify-center gap-1.5 disabled:opacity-40"
            >
              <Undo2 className="h-3.5 w-3.5" /> Geri Al
            </button>
            <button 
              onClick={store.redo}
              disabled={!store.canRedo()}
              className="flex-1 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 font-bold rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-all text-xs flex items-center justify-center gap-1.5 disabled:opacity-40"
            >
              <Redo2 className="h-3.5 w-3.5" /> İleri Al
            </button>
          </div>

          <button 
            onClick={handleSavePageData}
            disabled={saving}
            className="w-full py-3 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-amber-500/10 flex items-center justify-center gap-1.5 disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Save className="h-4 w-4 stroke-[2.5]" />
                Yayınla & Kaydet
              </>
            )}
          </button>
        </div>

      </div>

      {/* ═══ CENTER: Live Canvas Preview ═══ */}
      <div className="flex-1 bg-slate-100/50 dark:bg-slate-950/40 overflow-hidden flex flex-col p-4">
        
        {/* Device preview trigger toolbar */}
        <div className="flex items-center justify-between pb-3">
          <div className="flex items-center gap-2 bg-white dark:bg-slate-900/60 p-1 border border-slate-200 dark:border-white/5 rounded-xl">
            <button 
              onClick={() => store.setViewMode("desktop")}
              className={`p-2 rounded-lg text-xs font-black transition-all flex items-center gap-1 ${
                store.viewMode === "desktop" 
                ? "bg-amber-500/10 text-amber-600 dark:text-amber-400" 
                : "text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              <Monitor className="h-4 w-4" /> Masaüstü
            </button>
            <button 
              onClick={() => store.setViewMode("tablet")}
              className={`p-2 rounded-lg text-xs font-black transition-all flex items-center gap-1 ${
                store.viewMode === "tablet" 
                ? "bg-amber-500/10 text-amber-600 dark:text-amber-400" 
                : "text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              <Tablet className="h-4 w-4" /> Tablet
            </button>
            <button 
              onClick={() => store.setViewMode("mobile")}
              className={`p-2 rounded-lg text-xs font-black transition-all flex items-center gap-1 ${
                store.viewMode === "mobile" 
                ? "bg-amber-500/10 text-amber-600 dark:text-amber-400" 
                : "text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              <Smartphone className="h-4 w-4" /> Mobil
            </button>
          </div>

          <div className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest bg-white dark:bg-slate-900/40 px-3 py-1.5 border border-slate-200 dark:border-white/5 rounded-xl">
            Aktif Sayfa: <span className="text-amber-500">/{page}</span>
          </div>
        </div>

        {/* Live preview responsive container box */}
        <div className="flex-1 flex items-center justify-center overflow-hidden relative">
          <div 
            style={{
              "--primary": store.globalTheme.primaryColor,
              "--secondary": store.globalTheme.secondaryColor,
              "--accent": store.globalTheme.accentColor,
              "--bg-primary": store.globalTheme.bgColor,
              "--text-primary": store.globalTheme.textColor,
              "--font-heading": store.globalTheme.fontHeading,
              "--font-body": store.globalTheme.fontBody,
              "--border-radius": `${store.globalTheme.borderRadius}px`,
            } as React.CSSProperties}
            className={`bg-[var(--bg-primary)] shadow-2xl border border-slate-200 dark:border-white/5 rounded-2xl overflow-y-auto transition-all duration-500 h-full ${
              store.viewMode === "mobile" 
              ? "w-[375px]" 
              : store.viewMode === "tablet" 
              ? "w-[768px]" 
              : "w-full max-w-[1400px]"
            }`}
          >
            <StorefrontRenderer initialSections={sections} isBuilder={true} pageSlug={page} />
          </div>
        </div>

      </div>

      {/* ═══ RIGHT SIDEBAR: Settings Inspector ═══ */}
      <div className="w-[320px] flex-shrink-0 bg-white dark:bg-slate-900/60 border-l border-slate-200 dark:border-white/5 flex flex-col backdrop-blur-md">
        {selectedSection && selectedSchema ? (
          <>
            {/* Inspector Header */}
            <div className="p-4 border-b border-slate-200 dark:border-white/5 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">{selectedSchema.label}</h3>
                <p className="text-[9px] font-mono text-slate-400 truncate block mt-0.5">{selectedSection.id}</p>
              </div>
              <button 
                onClick={() => store.setSelectedId(null)} 
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400 hover:text-slate-600 transition-all"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Config Fields */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-4">Ayarlar</span>
              
              {(() => {
                // Group settings by their "group" property
                const groups = selectedSchema.settings.reduce((acc, field) => {
                  const g = field.group || "Genel";
                  if (!acc[g]) acc[g] = [];
                  acc[g].push(field);
                  return acc;
                }, {} as Record<string, typeof selectedSchema.settings>);

                return Object.entries(groups).map(([groupName, fields]) => (
                  <div key={groupName} className="space-y-4 mb-6">
                    <div className="flex items-center gap-3">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-amber-500/80">{groupName}</h4>
                      <div className="flex-1 h-px bg-slate-200 dark:bg-white/5"></div>
                    </div>
                    <div className="space-y-4">
                      {fields.map((field) => (
                        <SettingsField 
                          key={field.id}
                          field={field}
                          value={selectedSection.settings[field.id]}
                          onChange={(val) => store.updateSection(page, selectedSection.id, { [field.id]: val })}
                        />
                      ))}
                    </div>
                  </div>
                ));
              })()}

              {/* Dynamic block fields integration */}
              {selectedSchema.blocks && selectedSchema.blocks.length > 0 && (
                <div className="pt-4 border-t border-slate-200 dark:border-white/5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                      İçerik Blokları ({selectedSection.blocks?.length || 0})
                    </span>
                    <button 
                      onClick={() => store.addBlock(page, selectedSection.id, selectedSchema.blocks![0].type)}
                      className="p-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 rounded-lg transition-all"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {selectedSection.blocks?.map((block, bIdx) => {
                      const blockSchema = selectedSchema.blocks?.find((bs) => bs.type === block.type)
                      return (
                        <div 
                          key={block.id} 
                          className="p-3 bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 rounded-2xl space-y-3"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">
                              {blockSchema?.label ?? block.type} #{bIdx + 1}
                            </span>
                            <button 
                              onClick={() => store.removeBlock(page, selectedSection.id, block.id)}
                              className="p-1 hover:bg-rose-500/10 text-slate-400 hover:text-rose-600 rounded-lg transition-all"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>

                          {blockSchema?.settings.map((field) => (
                            <SettingsField 
                              key={field.id}
                              field={field}
                              value={block.settings[field.id]}
                              onChange={(val) => store.updateBlock(page, selectedSection.id, block.id, { [field.id]: val })}
                            />
                          ))}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center space-y-2">
              <Settings className="h-10 w-10 text-slate-300 dark:text-slate-700 mx-auto animate-spin duration-1000" />
              <p className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">
                Bölüm Ayarlarını<br />Düzenlemek İçin Seçin
              </p>
            </div>
          </div>
        )}
      </div>

    </div>
  )
}
