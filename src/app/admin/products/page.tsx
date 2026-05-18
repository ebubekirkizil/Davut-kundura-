"use client"

import * as React from "react"
import Link from "next/link"
import {
  Plus, Search, Package, AlertTriangle, TrendingUp, Star,
  Globe, Users, ShoppingBag, MoreVertical, Edit, Trash2,
  Eye, Filter, RefreshCw, Save, X, ChevronDown, Layers,
  CheckCircle, XCircle, BarChart3, LayoutGrid, List
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { motion, AnimatePresence } from "framer-motion"

// ─── Types ────────────────────────────────────────────────────────────────────

interface ChannelVisibility {
  showOnWeb: boolean
  showOnB2B: boolean
  showOnPOS: boolean
}

interface ProductRow {
  id: string
  name: string
  sku: string | null
  category: string
  status: string
  price: number
  compareAtPrice: number | null
  costPrice: number | null
  stock: number
  lowStockAlert: number
  imageUrls: string[]
  vendor: string | null
  channelVisibility: ChannelVisibility | null
  _count?: { orderItems: number }
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const MOCK: ProductRow[] = [
  { id: "1", name: "Premium Deri Kemer — Executive Black", sku: "DK-001-BLK", category: "BELT", status: "ACTIVE", price: 899, compareAtPrice: 1299, costPrice: 450, stock: 45, lowStockAlert: 10, imageUrls: ["https://images.unsplash.com/photo-1624222247344-550fb60eba1c?q=80&w=800&auto=format&fit=crop"], vendor: "Davut Kundura Atölyesi", channelVisibility: { showOnWeb: true, showOnB2B: true, showOnPOS: false }, _count: { orderItems: 247 } },
  { id: "2", name: "Ortopedik Taban — Comfort Pro", sku: "DK-002-ORT", category: "ORTHOPEDIC_INSOLE", status: "ACTIVE", price: 349, compareAtPrice: 449, costPrice: 180, stock: 120, lowStockAlert: 20, imageUrls: ["https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop"], vendor: "Ortopedik Çözümler", channelVisibility: { showOnWeb: true, showOnB2B: false, showOnPOS: true }, _count: { orderItems: 189 } },
  { id: "3", name: "Luxury Deri Bakım Seti", sku: "DK-003-BAK", category: "SHOE_CARE", status: "ACTIVE", price: 299, compareAtPrice: 399, costPrice: 120, stock: 8, lowStockAlert: 15, imageUrls: ["https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop"], vendor: "Premium Care", channelVisibility: { showOnWeb: true, showOnB2B: false, showOnPOS: false }, _count: { orderItems: 78 } },
  { id: "4", name: "Vintage Deri Kemer — Handcrafted Brown", sku: "DK-004-BRN", category: "BELT", status: "DRAFT", price: 1299, compareAtPrice: 1599, costPrice: 650, stock: 0, lowStockAlert: 5, imageUrls: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop"], vendor: "Davut Kundura Atölyesi", channelVisibility: { showOnWeb: false, showOnB2B: false, showOnPOS: false }, _count: { orderItems: 45 } },
  { id: "5", name: "Kurumsal Bakım Paketi", sku: "DK-005-KIT", category: "SHOE_CARE", status: "ACTIVE", price: 2499, compareAtPrice: 3299, costPrice: 1200, stock: 25, lowStockAlert: 10, imageUrls: ["https://images.unsplash.com/photo-1565026057447-bc9082fce004?q=80&w=800&auto=format&fit=crop"], vendor: "Davut Kundura Atölyesi", channelVisibility: { showOnWeb: true, showOnB2B: true, showOnPOS: true }, _count: { orderItems: 67 } },
  { id: "6", name: "Valiz Yedek Tekerlek - 360", sku: "DK-006-WHL", category: "LUGGAGE_PARTS", status: "ACTIVE", price: 199, compareAtPrice: 249, costPrice: 85, stock: 200, lowStockAlert: 30, imageUrls: [], vendor: "Global Parts", channelVisibility: { showOnWeb: true, showOnB2B: true, showOnPOS: true }, _count: { orderItems: 1200 } },
  { id: "7", name: "Hakiki Süet Temizleme Fırçası", sku: "DK-007-BRS", category: "SHOE_CARE", status: "ACTIVE", price: 89, compareAtPrice: 120, costPrice: 35, stock: 15, lowStockAlert: 20, imageUrls: [], vendor: "Premium Care", channelVisibility: { showOnWeb: true, showOnB2B: false, showOnPOS: true }, _count: { orderItems: 450 } },
  { id: "8", name: "Brogue Erkek Ayakkabı - Tan", sku: "DK-008-BRG", category: "OTHER", status: "ACTIVE", price: 2450, compareAtPrice: 3200, costPrice: 1100, stock: 32, lowStockAlert: 5, imageUrls: ["https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=800&auto=format&fit=crop"], vendor: "Davut Kundura Atölyesi", channelVisibility: { showOnWeb: true, showOnB2B: true, showOnPOS: true }, _count: { orderItems: 12 } },
  { id: "9", name: "Klasik Loafer - Midnight Blue", sku: "DK-009-LOF", category: "OTHER", status: "ACTIVE", price: 1890, compareAtPrice: 2250, costPrice: 850, stock: 12, lowStockAlert: 5, imageUrls: ["https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=800&auto=format&fit=crop"], vendor: "Davut Kundura Atölyesi", channelVisibility: { showOnWeb: true, showOnB2B: true, showOnPOS: true }, _count: { orderItems: 8 } },
  { id: "10", name: "Deri Cüzdan - Cardholder Slim", sku: "DK-010-WLH", category: "OTHER", status: "ACTIVE", price: 450, compareAtPrice: 550, costPrice: 180, stock: 65, lowStockAlert: 10, imageUrls: [], vendor: "Davut Kundura Atölyesi", channelVisibility: { showOnWeb: true, showOnB2B: false, showOnPOS: true }, _count: { orderItems: 89 } },
  { id: "11", name: "Chelsea Bot - Dark Chocolate", sku: "DK-011-CHB", category: "OTHER", status: "DRAFT", price: 3200, compareAtPrice: 3800, costPrice: 1450, stock: 0, lowStockAlert: 5, imageUrls: ["https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=800&auto=format&fit=crop"], vendor: "Davut Kundura Atölyesi", channelVisibility: { showOnWeb: false, showOnB2B: false, showOnPOS: false }, _count: { orderItems: 0 } },
  { id: "12", name: "Gümüş Ayakkabı Çekeceği", sku: "DK-012-HORN", category: "SHOE_CARE", status: "ACTIVE", price: 120, compareAtPrice: 150, costPrice: 45, stock: 88, lowStockAlert: 10, imageUrls: [], vendor: "Premium Care", channelVisibility: { showOnWeb: true, showOnB2B: true, showOnPOS: true }, _count: { orderItems: 156 } },
  { id: "13", name: "Sportif Jel Tabanlık", sku: "DK-013-GEL", category: "ORTHOPEDIC_INSOLE", status: "ACTIVE", price: 280, compareAtPrice: 350, costPrice: 110, stock: 4, lowStockAlert: 10, imageUrls: [], vendor: "Ortopedik Çözümler", channelVisibility: { showOnWeb: true, showOnB2B: true, showOnPOS: true }, _count: { orderItems: 840 } },
  { id: "14", name: "Deri Bel Çantası - Urban", sku: "DK-014-BAG", category: "OTHER", status: "ACTIVE", price: 1100, compareAtPrice: 1450, costPrice: 420, stock: 18, lowStockAlert: 5, imageUrls: [], vendor: "Davut Kundura Atölyesi", channelVisibility: { showOnWeb: true, showOnB2B: false, showOnPOS: true }, _count: { orderItems: 34 } },
  { id: "15", name: "Ahşap Ayakkabı Kalıbı (Sedir)", sku: "DK-015-TREE", category: "SHOE_CARE", status: "ACTIVE", price: 550, compareAtPrice: 750, costPrice: 220, stock: 24, lowStockAlert: 5, imageUrls: [], vendor: "Premium Care", channelVisibility: { showOnWeb: true, showOnB2B: false, showOnPOS: true }, _count: { orderItems: 112 } },
]

// ─── Helpers ───────────────────────────────────────────────────────────────────

const CATEGORY_LABELS: Record<string, string> = {
  BELT: "Kemer", ORTHOPEDIC_INSOLE: "Ortopedik", SHOE_CARE: "Bakım", LUGGAGE_PARTS: "Bagaj", OTHER: "Diğer",
}

function stockStatus(stock: number, alert: number) {
  if (stock === 0) return { label: "Stok Yok", cls: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/10" }
  if (stock <= alert) return { label: "Kritik", cls: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/10" }
  return { label: "Yeterli", cls: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/10" }
}

function margin(price: number, cost: number | null) {
  if (!cost || cost <= 0) return null
  return Math.round(((price - cost) / price) * 100)
}

// ─── Inline-edit cell ─────────────────────────────────────────────────────────

function EditCell({ value, type = "number", onSave }: { value: string | number; type?: string; onSave: (v: string) => void }) {
  const [editing, setEditing] = React.useState(false)
  const [draft, setDraft] = React.useState(String(value))
  const ref = React.useRef<HTMLInputElement>(null)
  React.useEffect(() => { if (editing) ref.current?.focus() }, [editing])

  if (!editing) return (
    <span
      className="cursor-pointer hover:bg-amber-500/10 hover:text-amber-600 dark:hover:text-amber-400 px-2.5 py-1 rounded-lg transition-all font-mono select-none border border-transparent hover:border-amber-500/20 dark:hover:border-amber-500/30 block w-full text-left"
      onClick={() => { setDraft(String(value)); setEditing(true) }}
    >{value}</span>
  )
  return (
    <input
      ref={ref} type={type} value={draft}
      className="w-24 border border-amber-500 dark:border-amber-400 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 rounded px-2.5 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
      onChange={e => setDraft(e.target.value)}
      onBlur={() => { onSave(draft); setEditing(false) }}
      onKeyDown={e => { if (e.key === "Enter") { onSave(draft); setEditing(false) } if (e.key === "Escape") setEditing(false) }}
    />
  )
}

// ─── Channel Toggle ───────────────────────────────────────────────────────────

function ChannelDot({ active, label }: { active: boolean; label: string }) {
  return (
    <span title={label} className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-black tracking-tight ${
      active 
      ? "bg-emerald-500 dark:bg-emerald-400 text-white dark:text-slate-950 shadow-md shadow-emerald-500/10" 
      : "bg-slate-200 dark:bg-white/10 text-slate-400 dark:text-slate-500"
    }`}>
      {label[0]}
    </span>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminProductsPage() {
  const [viewMode, setViewMode] = React.useState<"list" | "grid">("list")
  const [rows, setRows] = React.useState<ProductRow[]>(MOCK)
  const [search, setSearch] = React.useState("")
  const [catFilter, setCatFilter] = React.useState("ALL")
  const [statusFilter, setStatusFilter] = React.useState("ALL")
  const [selected, setSelected] = React.useState<Set<string>>(new Set())
  const [bulkMode, setBulkMode] = React.useState(false)
  const [pendingChanges, setPendingChanges] = React.useState<Record<string, Partial<ProductRow>>>({})

  // ── Filter ──
  const filtered = rows.filter(r => {
    const q = search.toLowerCase()
    const matchQ = r.name.toLowerCase().includes(q) || (r.sku ?? "").toLowerCase().includes(q)
    const matchCat = catFilter === "ALL" || r.category === catFilter
    const matchStatus = statusFilter === "ALL" || r.status === statusFilter
    return matchQ && matchCat && matchStatus
  })

  // ── Selection ──
  const allSelected = filtered.length > 0 && filtered.every(r => selected.has(r.id))
  const toggleAll = () => setSelected(allSelected ? new Set() : new Set(filtered.map(r => r.id)))
  const toggle = (id: string) => setSelected(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s })

  // ── Inline edit ──
  function patchRow(id: string, patch: Partial<ProductRow>) {
    setRows(prev => prev.map(r => r.id === id ? { ...r, ...patch } : r))
    setPendingChanges(prev => ({ ...prev, [id]: { ...prev[id], ...patch } }))
  }

  const hasPending = Object.keys(pendingChanges).length > 0

  async function saveChanges() {
    setPendingChanges({})
    alert("Değişiklikler başarıyla kaydedildi!")
  }

  // ── Stats ──
  const stats = [
    { label: "Toplam Ürün", value: rows.length, icon: Package, color: "from-blue-500 to-cyan-500" },
    { label: "Aktif", value: rows.filter(r => r.status === "ACTIVE").length, icon: CheckCircle, color: "from-emerald-500 to-green-500" },
    { label: "Kritik Stok", value: rows.filter(r => r.stock <= r.lowStockAlert).length, icon: AlertTriangle, color: "from-amber-500 to-orange-500" },
    { label: "Taslak", value: rows.filter(r => r.status === "DRAFT").length, icon: Edit, color: "from-slate-500 to-slate-600" },
  ]

  return (
    <div className="space-y-6 pb-24 text-slate-800 dark:text-slate-100 font-sans p-6 max-w-[1600px] mx-auto">

      {/* ── Header ── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-serif font-bold text-slate-900 dark:text-white tracking-tight">Ürün Kataloğu</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-base font-semibold font-sans">{filtered.length} ürün görüntüleniyor • Excel modunda hücreye tıklayarak hızlıca düzenle</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-slate-100/80 dark:bg-slate-900/60 p-1 rounded-xl flex gap-1 mr-2 shadow-inner border border-slate-200 dark:border-white/10 backdrop-blur-md">
            <Button 
              variant={viewMode === "grid" ? "white" : "ghost"} 
              size="sm" 
              onClick={() => setViewMode("grid")}
              className={`px-3 h-8 rounded-lg transition-all ${
                viewMode === "grid" 
                ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm border border-slate-200/50 dark:border-white/5" 
                : "text-slate-500 dark:text-slate-400"
              }`}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button 
              variant={viewMode === "list" ? "white" : "ghost"} 
              size="sm" 
              onClick={() => setViewMode("list")}
              className={`px-3 h-8 rounded-lg transition-all ${
                viewMode === "list" 
                ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm border border-slate-200/50 dark:border-white/5" 
                : "text-slate-500 dark:text-slate-400"
              }`}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          <Button 
            variant="outline" 
            className="h-10 border-slate-200 dark:border-white/10 bg-white/70 dark:bg-slate-900/40 hover:bg-slate-50 dark:hover:bg-white/5 text-slate-800 dark:text-slate-200 rounded-xl font-bold shadow-sm" 
            onClick={() => setBulkMode(v => !v)}
          >
            {bulkMode ? <><X className="h-4 w-4 mr-2 text-rose-500" />Toplu Mod: Kapat</> : <><Layers className="h-4 w-4 mr-2 text-amber-500" />Toplu Düzenleme</>}
          </Button>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="h-10 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white shadow-lg shadow-amber-500/20 font-bold transition-all text-sm flex items-center"
            asChild
          >
            <Link href="/admin/products/new"><Plus className="h-4 w-4 mr-2 stroke-[3]" />Yeni Ürün</Link>
          </motion.button>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <Card key={s.label} className="bg-white/70 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/80 dark:border-white/5 shadow-lg shadow-slate-200/20 dark:shadow-black/40 rounded-3xl overflow-hidden group hover:shadow-2xl hover:border-slate-300/80 dark:hover:border-white/10 transition-all duration-300">
            <CardContent className="p-5 flex items-center gap-4">
              <div className={`p-3 rounded-2xl bg-gradient-to-br ${s.color} shadow-lg shadow-slate-900/10 transition-transform duration-300 group-hover:scale-110`}><s.icon className="h-5 w-5 text-white" /></div>
              <div>
                <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{s.value}</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mt-0.5">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── Filters ── */}
      <Card className="bg-white/70 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/80 dark:border-white/5 shadow-lg shadow-slate-200/20 dark:shadow-black/40 rounded-3xl">
        <CardContent className="p-4 flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
            <Input placeholder="Ürün adı veya SKU..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10 h-10 bg-slate-50 dark:bg-slate-950/40 border-slate-200 dark:border-white/10 focus:bg-white dark:focus:bg-slate-950 transition-all text-slate-800 dark:text-slate-200 rounded-xl" />
          </div>
          <Select value={catFilter} onValueChange={setCatFilter}>
            <SelectTrigger className="w-44 h-10 bg-slate-50 dark:bg-slate-950/40 border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 rounded-xl"><SelectValue placeholder="Kategori" /></SelectTrigger>
            <SelectContent className="bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-xl">
              <SelectItem value="ALL" className="font-semibold text-xs rounded-lg">Tüm Kategoriler</SelectItem>
              {Object.entries(CATEGORY_LABELS).map(([k, v]) => <SelectItem key={k} value={k} className="font-semibold text-xs rounded-lg">{v}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-36 h-10 bg-slate-50 dark:bg-slate-950/40 border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 rounded-xl"><SelectValue placeholder="Durum" /></SelectTrigger>
            <SelectContent className="bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-xl">
              <SelectItem value="ALL" className="font-semibold text-xs rounded-lg">Tüm Durumlar</SelectItem>
              <SelectItem value="ACTIVE" className="font-semibold text-xs rounded-lg text-emerald-600 focus:text-emerald-600">Aktif</SelectItem>
              <SelectItem value="DRAFT" className="font-semibold text-xs rounded-lg text-slate-500">Taslak</SelectItem>
              <SelectItem value="ARCHIVED" className="font-semibold text-xs rounded-lg text-rose-600 focus:text-rose-600">Arşiv</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* ── Table / Grid View ── */}
      <AnimatePresence mode="popLayout">
        {viewMode === "grid" ? (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filtered.map(row => {
              const ss = stockStatus(row.stock, row.lowStockAlert)
              return (
                <motion.div
                  layout
                  key={row.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                >
                  <Card className="group overflow-hidden border border-slate-200 dark:border-white/5 shadow-md bg-white/70 dark:bg-slate-900/40 backdrop-blur-md hover:shadow-2xl dark:hover:shadow-black/40 hover:-translate-y-1 hover:border-amber-500/30 dark:hover:border-amber-500/30 transition-all duration-300 rounded-3xl">
                    <div className="h-48 bg-slate-50/50 dark:bg-black/20 flex items-center justify-center relative overflow-hidden group-hover:bg-slate-100/50 dark:group-hover:bg-black/35 transition-colors">
                      {row.imageUrls[0] 
                        ? <img src={row.imageUrls[0]} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        : <Package className="h-16 w-16 text-slate-300 dark:text-slate-700" />
                      }
                      <div className="absolute top-3 right-3 flex flex-col gap-1">
                        <Badge className={`border font-black text-[10px] ${
                          row.status === "ACTIVE" 
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/10" 
                          : "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/10"
                        }`}>
                          {row.status === "ACTIVE" ? "Aktif" : "Taslak"}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="min-w-0">
                          <h3 className="font-bold text-slate-800 dark:text-slate-100 line-clamp-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors text-base">{row.name}</h3>
                          <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono tracking-tighter uppercase font-bold mt-0.5">{row.sku || "SKU-YOK"}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex flex-col">
                          <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest">Fiyat</span>
                          <span className="text-xl font-black text-slate-900 dark:text-white">₺{row.price}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest block mb-1">Stok</span>
                          <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold border ${ss.cls}`}>{row.stock} adet</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100 dark:border-white/5">
                        <div className="flex gap-1.5">
                          <ChannelDot active={row.channelVisibility?.showOnWeb ?? false} label="W" />
                          <ChannelDot active={row.channelVisibility?.showOnB2B ?? false} label="B" />
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg"><MoreVertical className="h-4 w-4" /></Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-xl p-1 shadow-xl">
                            <DropdownMenuItem asChild className="cursor-pointer font-bold text-xs rounded-lg p-2"><Link href={`/admin/products/${row.id}/edit`}>Düzenle</Link></DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer font-bold text-xs rounded-lg p-2 text-red-600 focus:text-red-600">Sil</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        ) : (
          <motion.div 
            layout
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
          >
            <Card className="overflow-hidden border border-slate-200 dark:border-white/5 shadow-lg bg-white/70 dark:bg-slate-900/40 backdrop-blur-md rounded-3xl">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50/50 dark:bg-black/20 text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold tracking-widest border-b border-slate-200 dark:border-white/5">
                    <tr className="border-b border-slate-200 dark:border-white/5">
                      {bulkMode && (
                        <th className="w-10 px-4 py-3">
                          <input type="checkbox" checked={allSelected} onChange={toggleAll} className="rounded dark:bg-slate-950 dark:border-white/10" />
                        </th>
                      )}
                      <th className="px-6 py-4">Ürün</th>
                      <th className="px-6 py-4">SKU</th>
                      <th className="px-6 py-4">Satış Fiyatı</th>
                      <th className="px-6 py-4">Maliyet</th>
                      <th className="px-6 py-4">Stok</th>
                      <th className="px-6 py-4">Kanallar</th>
                      <th className="px-6 py-4">Durum</th>
                      <th className="px-6 py-4">Kar Marjı</th>
                      <th className="w-12 px-6 py-4"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-white/5 font-sans">
                    {filtered.map(row => {
                      const ss = stockStatus(row.stock, row.lowStockAlert)
                      const m = margin(row.price, row.costPrice)
                      const isSelected = selected.has(row.id)
                      const isDirty = !!pendingChanges[row.id]
                      return (
                        <tr
                          key={row.id}
                          className={`transition-colors hover:bg-slate-100/50 dark:hover:bg-white/[0.02] ${isSelected ? "bg-amber-500/5 dark:bg-amber-500/10" : ""} ${isDirty ? "border-l-2 border-l-amber-500" : ""}`}
                        >
                          {bulkMode && (
                            <td className="px-4">
                              <input type="checkbox" checked={isSelected} onChange={() => toggle(row.id)} className="rounded dark:bg-slate-950 dark:border-white/10" />
                            </td>
                          )}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center flex-shrink-0 overflow-hidden border border-slate-200/50 dark:border-white/5">
                                {row.imageUrls[0]
                                  ? <img src={row.imageUrls[0]} alt="" className="w-10 h-10 object-cover" />
                                  : <Package className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                                }
                              </div>
                              <div className="min-w-0">
                                <p className="font-bold text-slate-800 dark:text-slate-200 truncate max-w-48">{row.name}</p>
                                <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold">{CATEGORY_LABELS[row.category] ?? row.category}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <code className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded font-mono text-slate-600 dark:text-slate-300 border border-slate-200/50 dark:border-white/5 font-bold">{row.sku ?? "—"}</code>
                          </td>
                          <td className="px-6 py-4 font-bold text-slate-800 dark:text-slate-200">
                            <EditCell value={row.price} onSave={v => patchRow(row.id, { price: parseFloat(v) })} />
                          </td>
                          <td className="px-6 py-4 text-slate-500 dark:text-slate-400 font-semibold">
                            <EditCell value={row.costPrice ?? 0} onSave={v => patchRow(row.id, { costPrice: parseFloat(v) })} />
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <EditCell value={row.stock} onSave={v => patchRow(row.id, { stock: parseInt(v) })} />
                              <span className={`text-[10px] px-2 py-0.5 rounded font-black border ${ss.cls}`}>{ss.label}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-1.5">
                              <ChannelDot active={row.channelVisibility?.showOnWeb ?? false} label="Web" />
                              <ChannelDot active={row.channelVisibility?.showOnB2B ?? false} label="B2B" />
                              <ChannelDot active={row.channelVisibility?.showOnPOS ?? false} label="POS" />
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`text-xs px-2.5 py-1 rounded-full font-bold border ${
                              row.status === "ACTIVE" 
                              ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/10" 
                              : row.status === "DRAFT" 
                              ? "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/10" 
                              : "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/10"
                            }`}>
                              {row.status === "ACTIVE" ? "Aktif" : row.status === "DRAFT" ? "Taslak" : "Arşiv"}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            {m !== null
                              ? <span className={`text-sm font-black ${m >= 50 ? "text-emerald-600 dark:text-emerald-400" : m >= 30 ? "text-amber-600 dark:text-amber-400" : "text-rose-600 dark:text-rose-400"}`}>%{m}</span>
                              : <span className="text-slate-300 dark:text-slate-700">—</span>
                            }
                          </td>
                          <td className="px-6 py-4 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:bg-slate-100/50 dark:hover:bg-white/5 rounded-lg"><MoreVertical className="h-4 w-4" /></Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-xl p-1 shadow-xl">
                                <DropdownMenuItem asChild className="cursor-pointer font-bold text-xs rounded-lg p-2"><Link href={`/admin/products/${row.id}/edit`} className="flex items-center"><Edit className="h-4 w-4 mr-2" />Düzenle</Link></DropdownMenuItem>
                                <DropdownMenuItem asChild className="cursor-pointer font-bold text-xs rounded-lg p-2"><Link href={`/products/${row.id}`} target="_blank" className="flex items-center"><Eye className="h-4 w-4 mr-2" />Vitrine Bak</Link></DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer font-bold text-xs rounded-lg p-2 text-rose-600 focus:text-rose-600 flex items-center"><Trash2 className="h-4 w-4 mr-2" />Sil</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Sticky Save Bar ── */}
      {hasPending && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 bg-slate-900 dark:bg-slate-950 text-white px-6 py-4 rounded-2xl shadow-2xl shadow-slate-900/40 border border-slate-800 dark:border-white/10 backdrop-blur-md">
          <span className="text-sm font-semibold"><span className="font-black text-amber-500 dark:text-amber-400">{Object.keys(pendingChanges).length}</span> ürün değiştirildi</span>
          <Button size="sm" className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg shadow-lg shadow-amber-500/10" onClick={saveChanges}>
            <Save className="h-4 w-4 mr-1.5" />Kaydet
          </Button>
          <Button size="sm" variant="ghost" className="text-slate-300 hover:text-white font-bold" onClick={() => { setRows(MOCK); setPendingChanges({}) }}>
            <X className="h-4 w-4 mr-1.5" />Geri Al
          </Button>
        </div>
      )}

      {/* ── Bulk Action Bar ── */}
      {bulkMode && selected.size > 0 && (
        <div className="fixed bottom-6 right-6 z-50 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-2xl shadow-xl px-5 py-4 flex items-center gap-3">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{selected.size} ürün seçildi</span>
          <Button size="sm" variant="outline" className="text-xs font-bold rounded-lg h-8 border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/40 text-slate-800 dark:text-slate-200">Aktif Yap</Button>
          <Button size="sm" variant="outline" className="text-xs font-bold rounded-lg h-8 border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/40 text-slate-800 dark:text-slate-200">Arşivle</Button>
          <Button size="sm" variant="outline" className="text-xs font-bold rounded-lg h-8 text-rose-600 border-rose-200 hover:bg-rose-50 dark:hover:bg-rose-500/10 dark:border-rose-500/25">Toplu Sil</Button>
        </div>
      )}
    </div>
  )
}
