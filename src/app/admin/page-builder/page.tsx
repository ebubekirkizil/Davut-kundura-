"use client"

import React, { useState, useCallback } from "react"
import { useBuilderStore, Section } from "@/store/useBuilderStore"
import { SECTION_SCHEMAS, SettingField } from "@/store/schema"
import StorefrontRenderer from "@/components/builder/StorefrontRenderer"
import {
  GripVertical, Plus, Trash2, Eye, Save, Monitor, Smartphone,
  ChevronDown, ChevronRight, X, Undo2, PanelTop, Image, Type,
  LayoutGrid, PanelBottom, Play, Layers,
} from "lucide-react"

// ─── Icon Mapping ────────────────────────────────────────────────────────────
const iconMap: Record<string, any> = {
  PanelTop, Image, Type, LayoutGrid, PanelBottom, Play, Layers,
}

// ─── Dynamic Settings Form ───────────────────────────────────────────────────
function SettingsField({ field, value, onChange }: {
  field: SettingField; value: any; onChange: (val: any) => void
}) {
  switch (field.type) {
    case "text":
      return (
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">{field.label}</label>
          <input type="text" value={value ?? field.default ?? ""} onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder} className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/30 outline-none transition-all" />
        </div>
      )
    case "textarea":
      return (
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">{field.label}</label>
          <textarea value={value ?? field.default ?? ""} onChange={(e) => onChange(e.target.value)} rows={3}
            className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/30 outline-none resize-none transition-all" />
        </div>
      )
    case "color":
      return (
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">{field.label}</label>
          <div className="flex items-center gap-2">
            <input type="color" value={value ?? field.default ?? "#000000"} onChange={(e) => onChange(e.target.value)}
              className="w-10 h-10 rounded-lg border border-border cursor-pointer" />
            <input type="text" value={value ?? field.default ?? ""} onChange={(e) => onChange(e.target.value)}
              className="flex-1 px-3 py-2 text-sm rounded-lg border border-border bg-background font-mono" />
          </div>
        </div>
      )
    case "range":
      return (
        <div>
          <label className="flex justify-between text-xs font-medium text-muted-foreground mb-1">
            <span>{field.label}</span>
            <span className="text-foreground font-bold">{value ?? field.default}</span>
          </label>
          <input type="range" min={field.min ?? 0} max={field.max ?? 100} step={field.step ?? 1}
            value={value ?? field.default ?? 0} onChange={(e) => onChange(Number(e.target.value))}
            className="w-full accent-[hsl(var(--primary))]" />
        </div>
      )
    case "checkbox":
      return (
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" checked={value ?? field.default ?? false} onChange={(e) => onChange(e.target.checked)}
            className="w-4 h-4 rounded accent-[hsl(var(--primary))]" />
          <span className="text-sm text-foreground">{field.label}</span>
        </label>
      )
    case "select":
      return (
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">{field.label}</label>
          <select value={value ?? field.default ?? ""} onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background">
            {field.options?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
      )
    case "image":
      return (
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">{field.label}</label>
          <input type="text" value={value ?? ""} onChange={(e) => onChange(e.target.value)}
            placeholder="Görsel URL girin..." className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background" />
        </div>
      )
    default: return null
  }
}

// ─── Section List Item (Draggable) ───────────────────────────────────────────
function SectionListItem({ section, isSelected, onSelect, onDelete, onDragStart, onDragOver, onDrop }: {
  section: Section; isSelected: boolean; onSelect: () => void; onDelete: () => void
  onDragStart: (e: React.DragEvent) => void; onDragOver: (e: React.DragEvent) => void; onDrop: (e: React.DragEvent) => void
}) {
  const schema = SECTION_SCHEMAS[section.type]
  const Icon = iconMap[schema?.icon ?? "Layers"] ?? Layers

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onClick={onSelect}
      className={`group flex items-center gap-2 p-3 rounded-xl cursor-pointer border transition-all duration-200 ${
        isSelected
          ? "bg-primary/10 border-primary/30 shadow-sm"
          : "bg-card border-border hover:bg-secondary/50 hover:border-primary/20"
      }`}
    >
      <GripVertical className="h-4 w-4 text-muted-foreground/40 cursor-grab active:cursor-grabbing flex-shrink-0" />
      <div className={`p-1.5 rounded-lg ${isSelected ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
        <Icon className="h-3.5 w-3.5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{schema?.label ?? section.type}</p>
        <p className="text-[10px] text-muted-foreground truncate">{section.settings?.title ?? section.type}</p>
      </div>
      <button onClick={(e) => { e.stopPropagation(); onDelete() }}
        className="p-1 rounded-md opacity-0 group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive transition-all">
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}

// ─── Main Page Builder ───────────────────────────────────────────────────────
export default function PageBuilderPage() {
  const store = useBuilderStore()
  const page = store.activePage
  const sections = store.pages[page]?.sections ?? []
  const selectedSection = sections.find((s) => s.id === store.selectedId)
  const selectedSchema = selectedSection ? SECTION_SCHEMAS[selectedSection.type] : null

  const [dragIdx, setDragIdx] = useState<number | null>(null)
  const [saving, setSaving] = useState(false)
  const [showAddPanel, setShowAddPanel] = useState(false)

  // Drag & Drop handlers
  const handleDragStart = (idx: number) => (e: React.DragEvent) => {
    setDragIdx(idx)
    e.dataTransfer.effectAllowed = "move"
  }
  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); e.dataTransfer.dropEffect = "move" }
  const handleDrop = (targetIdx: number) => (e: React.DragEvent) => {
    e.preventDefault()
    if (dragIdx === null || dragIdx === targetIdx) return
    const arr = [...sections]
    const [moved] = arr.splice(dragIdx, 1)
    arr.splice(targetIdx, 0, moved)
    store.reorderSections(page, arr)
    setDragIdx(null)
  }

  // Save to backend
  const handleSave = async () => {
    setSaving(true)
    try {
      await fetch("/api/admin/page-builder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: page === "index" ? "home" : page, title: "Ana Sayfa", sections }),
      })
      alert("Sayfa kaydedildi!")
    } catch { alert("Kayıt hatası!") } finally { setSaving(false) }
  }

  // Update setting
  const updateSetting = (key: string, val: any) => {
    if (!selectedSection) return
    store.updateSection(page, selectedSection.id, { [key]: val })
  }

  // Update block setting
  const updateBlockSetting = (blockId: string, key: string, val: any) => {
    if (!selectedSection) return
    store.updateBlock(page, selectedSection.id, blockId, { [key]: val })
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] -m-5 md:-m-7 lg:-m-8 overflow-hidden">

      {/* ═══ LEFT SIDEBAR: Section List ═══ */}
      <div className="w-[280px] flex-shrink-0 bg-card border-r border-border flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h2 className="text-sm font-bold text-foreground">Bölümler</h2>
          <div className="flex gap-1">
            <button onClick={() => setShowAddPanel(!showAddPanel)}
              className="p-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Add Section Panel */}
        {showAddPanel && (
          <div className="p-3 border-b border-border bg-secondary/30 space-y-1">
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Bölüm Ekle</p>
            {Object.values(SECTION_SCHEMAS).map((schema) => {
              const Icon = iconMap[schema.icon] ?? Layers
              return (
                <button key={schema.type}
                  onClick={() => { store.addSection(page, schema.type); setShowAddPanel(false) }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-left hover:bg-primary/10 hover:text-primary transition-colors">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{schema.label}</p>
                    {schema.description && <p className="text-[10px] text-muted-foreground">{schema.description}</p>}
                  </div>
                </button>
              )
            })}
          </div>
        )}

        {/* Section List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
          {sections.length === 0 ? (
            <div className="text-center py-12">
              <Layers className="h-8 w-8 text-muted-foreground/30 mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">Henüz bölüm yok</p>
            </div>
          ) : sections.map((sec, idx) => (
            <SectionListItem
              key={sec.id}
              section={sec}
              isSelected={store.selectedId === sec.id}
              onSelect={() => store.setSelectedId(sec.id)}
              onDelete={() => store.removeSection(page, sec.id)}
              onDragStart={handleDragStart(idx)}
              onDragOver={handleDragOver}
              onDrop={handleDrop(idx)}
            />
          ))}
        </div>

        {/* Footer Actions */}
        <div className="p-3 border-t border-border space-y-2">
          <button onClick={handleSave} disabled={saving}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 disabled:opacity-50 transition-all shadow-md shadow-primary/15">
            <Save className="h-4 w-4" />
            {saving ? "Kaydediliyor..." : "Yayınla & Kaydet"}
          </button>
          <div className="flex gap-2">
            <button onClick={() => store.setViewMode("desktop")}
              className={`flex-1 p-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1 transition-colors ${store.viewMode === "desktop" ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary/50"}`}>
              <Monitor className="h-3.5 w-3.5" /> Masaüstü
            </button>
            <button onClick={() => store.setViewMode("mobile")}
              className={`flex-1 p-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1 transition-colors ${store.viewMode === "mobile" ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary/50"}`}>
              <Smartphone className="h-3.5 w-3.5" /> Mobil
            </button>
          </div>
        </div>
      </div>

      {/* ═══ CENTER: Live Preview Canvas ═══ */}
      <div className="flex-1 bg-secondary/30 overflow-hidden flex items-start justify-center p-6">
        <div className={`bg-white rounded-xl shadow-2xl shadow-black/10 border border-border overflow-hidden overflow-y-auto transition-all duration-500 ${
          store.viewMode === "mobile" ? "w-[375px] max-h-[calc(100vh-8rem)]" : "w-full max-w-[1200px] max-h-[calc(100vh-8rem)]"
        }`}>
          <StorefrontRenderer initialSections={sections} />
        </div>
      </div>

      {/* ═══ RIGHT SIDEBAR: Settings Panel ═══ */}
      <div className="w-[320px] flex-shrink-0 bg-card border-l border-border flex flex-col overflow-hidden">
        {selectedSection && selectedSchema ? (
          <>
            {/* Settings Header */}
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-foreground">{selectedSchema.label}</h3>
                <p className="text-[10px] text-muted-foreground">{selectedSection.id}</p>
              </div>
              <button onClick={() => store.setSelectedId(null)} className="p-1.5 rounded-lg hover:bg-secondary transition-colors">
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>

            {/* Settings Form */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Ayarlar</p>
              {selectedSchema.settings.map((field) => (
                <SettingsField
                  key={field.id}
                  field={field}
                  value={selectedSection.settings[field.id]}
                  onChange={(val) => updateSetting(field.id, val)}
                />
              ))}

              {/* Blocks */}
              {selectedSchema.blocks && selectedSchema.blocks.length > 0 && selectedSection.blocks.length > 0 && (
                <div className="pt-4 border-t border-border space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Bloklar ({selectedSection.blocks.length})</p>
                    <button onClick={() => store.addBlock(page, selectedSection.id, selectedSchema.blocks![0].type)}
                      className="p-1 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  {selectedSection.blocks.map((block, bIdx) => {
                    const blockSchema = selectedSchema.blocks?.find((bs) => bs.type === block.type)
                    return (
                      <div key={block.id} className="p-3 rounded-xl border border-border bg-background space-y-3">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-medium text-foreground">{blockSchema?.label ?? block.type} #{bIdx + 1}</p>
                          <button onClick={() => store.removeBlock(page, selectedSection.id, block.id)}
                            className="p-1 rounded-md hover:bg-destructive/10 hover:text-destructive transition-colors">
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                        {blockSchema?.settings.map((field) => (
                          <SettingsField
                            key={field.id}
                            field={field}
                            value={block.settings[field.id]}
                            onChange={(val) => updateBlockSetting(block.id, field.id, val)}
                          />
                        ))}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center">
              <Eye className="h-10 w-10 text-muted-foreground/20 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">Bir bölüm seçerek<br />ayarlarını düzenleyin</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
