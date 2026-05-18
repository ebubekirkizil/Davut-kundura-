"use client"

import React, { useState, useRef, useEffect } from "react"
import { useBuilderStore, PageData } from "@/store/useBuilderStore"
import { SECTION_SCHEMAS, SECTION_CATEGORIES, SettingField } from "@/store/schema"
import StorefrontRenderer from "@/components/builder/StorefrontRenderer"
import { useParams, useRouter } from "next/navigation"
import {
  Plus, Trash2, Save, Monitor, Smartphone, Tablet,
  ChevronRight, X, Undo2, Redo2,
  Upload, Settings, Palette, Layers, Loader2, Copy, ArrowLeft
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

  // Refined input styling
  const inputBaseClasses = "w-full px-3 py-2 bg-zinc-100 dark:bg-[#141414] border border-zinc-200 dark:border-white/5 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-amber-500/50 transition-all text-zinc-800 dark:text-zinc-200"

  switch (field.type) {
    case "text":
      return (
        <div className="space-y-1.5">
          <label className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">{field.label}</label>
          <input 
            type="text" 
            value={value ?? field.default ?? ""} 
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder} 
            className={inputBaseClasses} 
          />
        </div>
      )
    case "textarea":
      return (
        <div className="space-y-1.5">
          <label className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">{field.label}</label>
          <textarea 
            value={value ?? field.default ?? ""} 
            onChange={(e) => onChange(e.target.value)} 
            rows={3}
            className={`${inputBaseClasses} resize-none`} 
          />
        </div>
      )
    case "color":
      return (
        <div className="space-y-1.5">
          <label className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">{field.label}</label>
          <div className="flex items-center gap-2">
            <div className="relative w-9 h-9 rounded-lg border border-zinc-200 dark:border-white/10 overflow-hidden shadow-sm cursor-pointer shrink-0">
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
              className={`${inputBaseClasses} font-mono text-xs`} 
            />
          </div>
        </div>
      )
    case "range":
      return (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">{field.label}</label>
            <span className="text-xs font-mono text-amber-600 dark:text-amber-400">{value ?? field.default}</span>
          </div>
          <input 
            type="range" 
            min={field.min ?? 0} 
            max={field.max ?? 100} 
            step={field.step ?? 1}
            value={value ?? field.default ?? 0} 
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full accent-amber-500 h-1 bg-zinc-200 dark:bg-[#222] rounded-full cursor-pointer appearance-none" 
          />
        </div>
      )
    case "checkbox":
      return (
        <label className="flex items-center gap-3 cursor-pointer select-none p-2 hover:bg-zinc-100 dark:hover:bg-[#141414] rounded-lg transition-colors border border-transparent hover:border-zinc-200 dark:hover:border-white/5">
          <input 
            type="checkbox" 
            checked={value ?? field.default ?? false} 
            onChange={(e) => onChange(e.target.checked)}
            className="w-4 h-4 rounded border-zinc-300 dark:border-white/10 text-amber-500 focus:ring-amber-500/20 cursor-pointer" 
          />
          <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{field.label}</span>
        </label>
      )
    case "select":
      return (
        <div className="space-y-1.5">
          <label className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">{field.label}</label>
          <select 
            value={value ?? field.default ?? ""} 
            onChange={(e) => onChange(e.target.value)}
            className={`${inputBaseClasses} cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23999%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_8px_center] bg-[length:16px] pr-8`}
          >
            {field.options?.map((o) => (
              <option key={o.value} value={o.value} className="bg-white dark:bg-[#0a0a0a] text-zinc-800 dark:text-zinc-200">
                {o.label}
              </option>
            ))}
          </select>
        </div>
      )
    case "image":
      return (
        <div className="space-y-1.5">
          <label className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">{field.label}</label>
          <div className="flex gap-2">
            <input 
              type="text" 
              value={value ?? ""} 
              onChange={(e) => onChange(e.target.value)}
              placeholder="URL veya dosya seç..." 
              className={inputBaseClasses} 
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
              className="px-3 h-[38px] bg-zinc-100 dark:bg-[#1a1a1a] hover:bg-zinc-200 dark:hover:bg-[#222] text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-white/5 rounded-lg flex items-center justify-center transition-all shrink-0"
            >
              {uploading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Upload className="h-4 w-4" />
              )}
            </button>
          </div>
          {value && (
            <div className="relative mt-2 h-24 w-full rounded-lg overflow-hidden border border-zinc-200 dark:border-white/5 bg-zinc-100 dark:bg-[#111] group">
              <img src={value} alt="Preview" className="h-full w-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
              <button 
                type="button" 
                onClick={() => onChange("")} 
                className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-rose-500 text-white rounded-md backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
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

export default function BuilderEditorPage() {
  const store = useBuilderStore()
  const params = useParams()
  const router = useRouter()
  const pageSlug = (params.slug as string) || "index"

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPage = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/admin/page-builder?slug=${pageSlug}`)
        const json = await res.json()
        
        if (json.success && json.data) {
          store.loadPage(pageSlug, {
            title: json.data.title || "Sayfa",
            slug: pageSlug,
            sections: json.data.content || []
          })
          if (json.data.theme) {
            store.updateGlobalTheme(json.data.theme)
          }
        } else {
          store.setActivePage(pageSlug)
        }
      } catch (err) {
        console.error("Failed to load page:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchPage()
  }, [pageSlug])

  const currentPage = store.pages[pageSlug] || { title: "Sayfa", slug: pageSlug, sections: [] }
  const sections = currentPage.sections ?? []
  const selectedSection = sections.find((s) => s.id === store.selectedId)
  const selectedSchema = selectedSection ? SECTION_SCHEMAS[selectedSection.type] : null

  const [activeLeftTab, setActiveLeftTab] = useState<"sections" | "theme">("sections")
  const [showAddPanel, setShowAddPanel] = useState(false)
  const [saving, setSaving] = useState(false)

  const handleSavePageData = async () => {
    setSaving(true)
    try {
      await fetch("/api/admin/page-builder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: pageSlug,
          title: currentPage.title,
          sections,
          globalTheme: store.globalTheme
        })
      })
      alert("Sayfa ve Tema Başarıyla Kaydedildi!")
    } catch (err) {
      console.error(err)
      alert("Kaydedilirken hata oluştu!")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-[#0a0a0a]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-6 h-6 text-zinc-400 animate-spin" />
          <p className="text-zinc-500 font-medium text-xs uppercase tracking-widest">Yükleniyor</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-zinc-50 dark:bg-[#0a0a0a] font-sans text-zinc-800 dark:text-zinc-100 selection:bg-amber-500/20">
      
      {/* ═══ TOP HEADER BAR ═══ */}
      <div className="h-14 flex items-center justify-between px-4 bg-white dark:bg-[#0a0a0a] border-b border-zinc-200 dark:border-white/5 z-20 shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.push("/admin/page-builder")}
            className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-medium text-sm hidden sm:inline">Panoya Dön</span>
          </button>
          <div className="h-4 w-px bg-zinc-200 dark:bg-white/10"></div>
          <div>
            <h1 className="font-semibold text-sm">{currentPage.title}</h1>
            <p className="text-[10px] text-zinc-400 font-mono">/{pageSlug}</p>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-zinc-100 dark:bg-[#141414] p-1 rounded-lg border border-zinc-200 dark:border-white/5">
          {(["desktop", "tablet", "mobile"] as const).map(mode => (
            <button 
              key={mode}
              onClick={() => store.setViewMode(mode)}
              className={`p-1.5 rounded-md transition-all ${
                store.viewMode === mode 
                ? "bg-white dark:bg-[#222] text-amber-500 shadow-sm border border-zinc-200/50 dark:border-white/5" 
                : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
              }`}
            >
              {mode === "desktop" && <Monitor className="h-4 w-4" />}
              {mode === "tablet" && <Tablet className="h-4 w-4" />}
              {mode === "mobile" && <Smartphone className="h-4 w-4" />}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={handleSavePageData}
            disabled={saving}
            className="px-5 py-1.5 bg-zinc-900 dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-100 font-medium text-xs rounded-lg transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            Yayına Al
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* ═══ LEFT SIDEBAR ═══ */}
        <div className="w-[280px] flex-shrink-0 bg-white dark:bg-[#0a0a0a] border-r border-zinc-200 dark:border-white/5 flex flex-col z-10 relative">
          
          <div className="grid grid-cols-2 border-b border-zinc-200 dark:border-white/5 p-2 gap-1 bg-zinc-50 dark:bg-[#0a0a0a]">
            <button 
              onClick={() => setActiveLeftTab("sections")}
              className={`py-2 text-[11px] font-medium transition-all rounded-md flex items-center justify-center gap-1.5 ${
                activeLeftTab === "sections" 
                ? "bg-white dark:bg-[#1a1a1a] text-zinc-900 dark:text-white shadow-sm border border-zinc-200 dark:border-white/5" 
                : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
              }`}
            >
              <Layers className="h-3.5 w-3.5" /> Bölümler
            </button>
            <button 
              onClick={() => setActiveLeftTab("theme")}
              className={`py-2 text-[11px] font-medium transition-all rounded-md flex items-center justify-center gap-1.5 ${
                activeLeftTab === "theme" 
                ? "bg-white dark:bg-[#1a1a1a] text-zinc-900 dark:text-white shadow-sm border border-zinc-200 dark:border-white/5" 
                : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
              }`}
            >
              <Palette className="h-3.5 w-3.5" /> Tema
            </button>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {activeLeftTab === "sections" && (
              <div className="p-4 space-y-4">
                <button 
                  onClick={() => setShowAddPanel(!showAddPanel)}
                  className="w-full h-9 border border-dashed border-zinc-300 dark:border-white/20 hover:border-amber-500 dark:hover:border-amber-500 text-zinc-500 hover:text-amber-600 dark:hover:text-amber-400 rounded-lg flex items-center justify-center gap-2 text-xs font-medium transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" /> Yeni Bölüm Ekle
                </button>

                {showAddPanel && (
                  <div className="absolute top-16 left-4 right-4 z-50 p-2 bg-white dark:bg-[#1a1a1a] border border-zinc-200 dark:border-white/10 rounded-xl shadow-xl shadow-black/10">
                    <div className="flex justify-between items-center mb-2 px-2 pt-1">
                      <span className="text-[10px] font-medium text-zinc-500 uppercase">Bileşen Seç</span>
                      <button onClick={() => setShowAddPanel(false)} className="text-zinc-400 hover:text-zinc-700"><X className="h-3 w-3" /></button>
                    </div>
                    <div className="grid grid-cols-1 gap-1 max-h-[300px] overflow-y-auto pr-1">
                      {Object.values(SECTION_SCHEMAS).map((s) => (
                        <button 
                          key={s.type}
                          onClick={() => { store.addSection(pageSlug, s.type); setShowAddPanel(false) }}
                          className="w-full p-2 text-left hover:bg-zinc-50 dark:hover:bg-[#222] rounded-lg transition-colors flex items-center gap-3 group"
                        >
                          <div className="w-8 h-8 rounded bg-zinc-100 dark:bg-[#0a0a0a] border border-zinc-200 dark:border-white/5 flex items-center justify-center group-hover:border-amber-500/30">
                            <Layers className="h-3.5 w-3.5 text-zinc-400 group-hover:text-amber-500" />
                          </div>
                          <div>
                            <p className="text-xs font-medium text-zinc-700 dark:text-zinc-200">{s.label}</p>
                            <span className="text-[9px] text-zinc-400">{SECTION_CATEGORIES[s.category]}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-1.5">
                  {sections.map((sec, idx) => (
                    <div 
                      key={sec.id}
                      onClick={() => store.setSelectedId(sec.id)}
                      className={`group flex items-center gap-2 p-2 rounded-lg border transition-all cursor-pointer ${
                        store.selectedId === sec.id 
                        ? "bg-amber-50/50 dark:bg-[#1a1a1a] border-amber-500/30 text-amber-700 dark:text-amber-400" 
                        : "bg-white dark:bg-transparent border-zinc-200 dark:border-transparent hover:bg-zinc-50 dark:hover:bg-[#111]"
                      }`}
                    >
                      <div className="flex flex-col gap-0.5 text-zinc-400 hover:text-zinc-600 transition-colors">
                        <button onClick={(e) => { e.stopPropagation(); store.moveSectionUp(pageSlug, sec.id) }}><ChevronRight className="h-3 w-3 -rotate-90" /></button>
                        <button onClick={(e) => { e.stopPropagation(); store.moveSectionDown(pageSlug, sec.id) }}><ChevronRight className="h-3 w-3 rotate-90" /></button>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium truncate">{SECTION_SCHEMAS[sec.type]?.label ?? sec.type}</p>
                      </div>
                      <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={(e) => { e.stopPropagation(); store.duplicateSection(pageSlug, sec.id) }} className="p-1.5 text-zinc-400 hover:text-amber-500"><Copy className="h-3 w-3" /></button>
                        <button onClick={(e) => { e.stopPropagation(); store.removeSection(pageSlug, sec.id) }} className="p-1.5 text-zinc-400 hover:text-rose-500"><Trash2 className="h-3 w-3" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeLeftTab === "theme" && (
              <div className="p-4 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">Global Renkler</h3>
                  
                  {['primaryColor', 'secondaryColor', 'accentColor', 'bgColor', 'textColor'].map((colorKey) => (
                    <div key={colorKey} className="flex items-center justify-between">
                      <label className="text-xs text-zinc-600 dark:text-zinc-400 capitalize">{colorKey.replace('Color', '')}</label>
                      <div className="flex items-center gap-2">
                        <input 
                          type="text" 
                          value={(store.globalTheme as any)[colorKey]} 
                          onChange={(e) => store.updateGlobalTheme({ [colorKey]: e.target.value })}
                          className="w-20 px-2 py-1 bg-transparent border-b border-zinc-200 dark:border-white/10 text-xs font-mono focus:outline-none focus:border-amber-500" 
                        />
                        <div className="relative w-6 h-6 rounded-full overflow-hidden border border-zinc-200 dark:border-white/10">
                          <input 
                            type="color" 
                            value={(store.globalTheme as any)[colorKey]} 
                            onChange={(e) => store.updateGlobalTheme({ [colorKey]: e.target.value })}
                            className="absolute inset-0 w-full h-full scale-150 cursor-pointer" 
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 pt-4 border-t border-zinc-200 dark:border-white/5">
                  <h3 className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">Kenar & Form</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs text-zinc-600 dark:text-zinc-400">
                      <label>Border Radius</label>
                      <span>{store.globalTheme.borderRadius}px</span>
                    </div>
                    <input 
                      type="range" min={0} max={24} 
                      value={store.globalTheme.borderRadius} 
                      onChange={(e) => store.updateGlobalTheme({ borderRadius: Number(e.target.value) })}
                      className="w-full accent-amber-500 h-1 bg-zinc-200 dark:bg-[#222] rounded-full appearance-none" 
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-3 border-t border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-[#0a0a0a]">
            <div className="flex gap-2">
              <button onClick={store.undo} disabled={!store.canUndo()} className="flex-1 py-1.5 hover:bg-zinc-200 dark:hover:bg-[#1a1a1a] text-zinc-600 dark:text-zinc-400 rounded-md transition-colors flex items-center justify-center gap-1 text-[11px] font-medium disabled:opacity-30">
                <Undo2 className="h-3.5 w-3.5" /> Geri
              </button>
              <button onClick={store.redo} disabled={!store.canRedo()} className="flex-1 py-1.5 hover:bg-zinc-200 dark:hover:bg-[#1a1a1a] text-zinc-600 dark:text-zinc-400 rounded-md transition-colors flex items-center justify-center gap-1 text-[11px] font-medium disabled:opacity-30">
                İleri <Redo2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* ═══ CENTER CANVAS ═══ */}
        <div className="flex-1 bg-zinc-100 dark:bg-[#050505] overflow-hidden flex flex-col p-4 relative shadow-inner">
          <div className="flex-1 flex items-center justify-center overflow-hidden">
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
              className={`bg-[var(--bg-primary)] shadow-2xl border border-zinc-200/50 dark:border-white/10 rounded-xl overflow-y-auto transition-all duration-500 h-full ${
                store.viewMode === "mobile" ? "w-[375px]" : store.viewMode === "tablet" ? "w-[768px]" : "w-full"
              }`}
            >
              <StorefrontRenderer initialSections={sections} isBuilder={true} pageSlug={pageSlug} />
            </div>
          </div>
        </div>

        {/* ═══ RIGHT SIDEBAR ═══ */}
        <div className="w-[300px] flex-shrink-0 bg-white dark:bg-[#0a0a0a] border-l border-zinc-200 dark:border-white/5 flex flex-col z-10">
          {selectedSection && selectedSchema ? (
            <>
              <div className="p-4 border-b border-zinc-200 dark:border-white/5 flex items-center justify-between bg-zinc-50/50 dark:bg-[#0a0a0a]">
                <div>
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">{selectedSchema.label}</h3>
                  <p className="text-[10px] font-mono text-zinc-400 mt-0.5">{selectedSection.id}</p>
                </div>
                <button onClick={() => store.setSelectedId(null)} className="p-1.5 rounded-md hover:bg-zinc-200 dark:hover:bg-[#222] text-zinc-500 transition-colors">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
                {(() => {
                  const groups = selectedSchema.settings.reduce((acc, field) => {
                    const g = field.group || "Genel";
                    if (!acc[g]) acc[g] = [];
                    acc[g].push(field);
                    return acc;
                  }, {} as Record<string, typeof selectedSchema.settings>);

                  return Object.entries(groups).map(([groupName, fields]) => (
                    <div key={groupName} className="space-y-4">
                      <h4 className="text-[10px] font-medium uppercase tracking-widest text-zinc-400 border-b border-zinc-200 dark:border-white/5 pb-2">{groupName}</h4>
                      <div className="space-y-4">
                        {fields.map((field) => (
                          <SettingsField 
                            key={field.id}
                            field={field}
                            value={selectedSection.settings[field.id]}
                            onChange={(val) => store.updateSection(pageSlug, selectedSection.id, { [field.id]: val })}
                          />
                        ))}
                      </div>
                    </div>
                  ));
                })()}

                {selectedSchema.blocks && selectedSchema.blocks.length > 0 && (
                  <div className="pt-6 border-t border-zinc-200 dark:border-white/5 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-medium uppercase tracking-widest text-zinc-400">
                        İçerik Blokları
                      </span>
                      <button 
                        onClick={() => store.addBlock(pageSlug, selectedSection.id, selectedSchema.blocks![0].type)}
                        className="p-1.5 border border-dashed border-zinc-300 dark:border-white/20 hover:border-amber-500 text-zinc-500 hover:text-amber-500 rounded-md transition-colors"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div className="space-y-3">
                      {selectedSection.blocks?.map((block, bIdx) => {
                        const blockSchema = selectedSchema.blocks?.find((bs) => bs.type === block.type)
                        return (
                          <div key={block.id} className="p-3 bg-zinc-50 dark:bg-[#141414] border border-zinc-200 dark:border-white/5 rounded-lg space-y-3">
                            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-white/5 pb-2 mb-2">
                              <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                                {blockSchema?.label ?? block.type}
                              </span>
                              <button onClick={() => store.removeBlock(pageSlug, selectedSection.id, block.id)} className="text-zinc-400 hover:text-rose-500 transition-colors">
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            {blockSchema?.settings.map((field) => (
                              <SettingsField 
                                key={field.id} field={field} value={block.settings[field.id]}
                                onChange={(val) => store.updateBlock(pageSlug, selectedSection.id, block.id, { [field.id]: val })}
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
              <div className="text-center opacity-40">
                <Settings className="h-10 w-10 mx-auto mb-3 text-zinc-500" />
                <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">Ayarlar</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
