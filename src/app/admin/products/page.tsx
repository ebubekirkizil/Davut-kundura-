"use client"

import * as React from "react"
import Link from "next/link"
import {
  Plus, Search, Package, AlertTriangle, TrendingUp, Star,
  Globe, Users, ShoppingBag, MoreVertical, Edit, Trash2,
  Eye, Filter, RefreshCw, Save, X, ChevronDown, Layers,
  CheckCircle, XCircle, BarChart3
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

// ─── Mock data (API bağlandığında kaldırılacak) ────────────────────────────────

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
  if (stock === 0) return { label: "Stok Yok", cls: "bg-red-100 text-red-700" }
  if (stock <= alert) return { label: "Kritik", cls: "bg-amber-100 text-amber-700" }
  return { label: "Yeterli", cls: "bg-emerald-100 text-emerald-700" }
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
      className="cursor-pointer hover:bg-amber-50 hover:text-amber-700 px-2 py-1 rounded transition-colors tabular-nums select-none border border-transparent hover:border-amber-200"
      onClick={() => { setDraft(String(value)); setEditing(true) }}
    >{value}</span>
  )
  return (
    <input
      ref={ref} type={type} value={draft}
      className="w-24 border border-amber-400 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
      onChange={e => setDraft(e.target.value)}
      onBlur={() => { onSave(draft); setEditing(false) }}
      onKeyDown={e => { if (e.key === "Enter") { onSave(draft); setEditing(false) } if (e.key === "Escape") setEditing(false) }}
    />
  )
}

// ─── Channel Toggle ───────────────────────────────────────────────────────────

function ChannelDot({ active, label }: { active: boolean; label: string }) {
  return (
    <span title={label} className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-bold ${active ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-400"}`}>
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
    // TODO: PATCH /api/admin/products/bulk with pendingChanges
    setPendingChanges({})
    alert("Değişiklikler kaydedildi! (API entegrasyonu eklenecek)")
  }

  // ── Stats ──
  const stats = [
    { label: "Toplam Ürün", value: rows.length, icon: Package, color: "from-blue-500 to-cyan-500" },
    { label: "Aktif", value: rows.filter(r => r.status === "ACTIVE").length, icon: CheckCircle, color: "from-emerald-500 to-green-500" },
    { label: "Kritik Stok", value: rows.filter(r => r.stock <= r.lowStockAlert).length, icon: AlertTriangle, color: "from-amber-500 to-orange-500" },
    { label: "Taslak", value: rows.filter(r => r.status === "DRAFT").length, icon: Edit, color: "from-slate-500 to-slate-600" },
  ]

  return (
    <div className="space-y-6 pb-24">

      {/* ── Header ── */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-slate-800">Ürün Yönetimi</h1>
          <p className="text-slate-500 mt-1 text-sm">{filtered.length} ürün görüntüleniyor • Excel modunda hücreye tıklayarak düzenle</p>
        </div>
        <div className="flex gap-2">
          <div className="bg-slate-100 p-1 rounded-lg flex gap-1 mr-2 border border-slate-200">
            <Button 
              variant={viewMode === "grid" ? "white" : "ghost"} 
              size="sm" 
              onClick={() => setViewMode("grid")}
              className="px-2 h-7"
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button 
              variant={viewMode === "list" ? "white" : "ghost"} 
              size="sm" 
              onClick={() => setViewMode("list")}
              className="px-2 h-7"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="outline" size="sm" className="border-slate-200 bg-white/70" onClick={() => setBulkMode(v => !v)}>
            {bulkMode ? <><X className="h-4 w-4 mr-1" />Toplu Mod: Kapat</> : <><Layers className="h-4 w-4 mr-1" />Toplu Düzenleme</>}
          </Button>
          <Button asChild className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white shadow-lg shadow-amber-500/20">
            <Link href="/admin/products/new"><Plus className="h-4 w-4 mr-1" />Yeni Ürün</Link>
          </Button>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-slate-200 p-5 flex items-center gap-4 shadow-sm">
            <div className={`p-3 rounded-xl bg-gradient-to-br ${s.color} shadow`}><s.icon className="h-5 w-5 text-white" /></div>
            <div><p className="text-2xl font-bold text-slate-800">{s.value}</p><p className="text-xs text-slate-500">{s.label}</p></div>
          </div>
        ))}
      </div>

      {/* ── Filters ── */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 flex flex-wrap gap-3 shadow-sm">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input placeholder="Ürün adı veya SKU..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10 h-9 bg-slate-50 border-slate-200" />
        </div>
        <Select value={catFilter} onValueChange={setCatFilter}>
          <SelectTrigger className="w-44 h-9 bg-slate-50 border-slate-200"><SelectValue placeholder="Kategori" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Tüm Kategoriler</SelectItem>
            {Object.entries(CATEGORY_LABELS).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-36 h-9 bg-slate-50 border-slate-200"><SelectValue placeholder="Durum" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Tüm Durumlar</SelectItem>
            <SelectItem value="ACTIVE">Aktif</SelectItem>
            <SelectItem value="DRAFT">Taslak</SelectItem>
            <SelectItem value="ARCHIVED">Arşiv</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* ── Table / Grid View ── */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(row => {
            const ss = stockStatus(row.stock, row.lowStockAlert)
            return (
              <Card key={row.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-slate-200 shadow-sm bg-white hover:-translate-y-1">
                <div className="h-48 bg-slate-100 flex items-center justify-center relative overflow-hidden">
                  {row.imageUrls[0] 
                    ? <img src={row.imageUrls[0]} alt="" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                    : <Package className="h-16 w-16 text-slate-300" />
                  }
                  <div className="absolute top-2 right-2 flex flex-col gap-1">
                    <Badge className={row.status === "ACTIVE" ? "bg-emerald-500" : "bg-slate-400"}>
                      {row.status === "ACTIVE" ? "Aktif" : "Taslak"}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-slate-800 line-clamp-1">{row.name}</h3>
                      <p className="text-[10px] text-slate-400 font-mono tracking-tighter uppercase">{row.sku || "SKU-YOK"}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-400 font-medium uppercase tracking-widest">Fiyat</span>
                      <span className="text-xl font-black text-slate-900">₺{row.price}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Stok</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${ss.cls}`}>{row.stock}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                    <div className="flex gap-1">
                      <ChannelDot active={row.channelVisibility?.showOnWeb ?? false} label="W" />
                      <ChannelDot active={row.channelVisibility?.showOnB2B ?? false} label="B" />
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400"><MoreVertical className="h-4 w-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-white">
                        <DropdownMenuItem asChild><Link href={`/admin/products/${row.id}/edit`}>Düzenle</Link></DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Sil</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  {bulkMode && (
                    <th className="w-10 px-4 py-3">
                      <input type="checkbox" checked={allSelected} onChange={toggleAll} className="rounded" />
                    </th>
                  )}
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Ürün</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">SKU</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Satış Fiyatı ₺</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Maliyet ₺</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Stok</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Kanallar</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Durum</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Kar %</th>
                  <th className="w-12 px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map(row => {
                  const ss = stockStatus(row.stock, row.lowStockAlert)
                  const m = margin(row.price, row.costPrice)
                  const isSelected = selected.has(row.id)
                  const isDirty = !!pendingChanges[row.id]
                  return (
                    <tr
                      key={row.id}
                      className={`transition-colors hover:bg-slate-50 ${isSelected ? "bg-amber-50" : ""} ${isDirty ? "border-l-2 border-l-amber-400" : ""}`}
                    >
                      {bulkMode && (
                        <td className="px-4">
                          <input type="checkbox" checked={isSelected} onChange={() => toggle(row.id)} className="rounded" />
                        </td>
                      )}
                      {/* Ürün adı + görsel */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center flex-shrink-0 overflow-hidden">
                            {row.imageUrls[0]
                              ? <img src={row.imageUrls[0]} alt="" className="w-10 h-10 object-cover" />
                              : <Package className="h-4 w-4 text-slate-400" />
                            }
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-slate-800 truncate max-w-48">{row.name}</p>
                            <p className="text-xs text-slate-400">{CATEGORY_LABELS[row.category] ?? row.category}</p>
                          </div>
                        </div>
                      </td>
                      {/* SKU */}
                      <td className="px-4 py-3">
                        <code className="text-xs bg-slate-100 px-2 py-1 rounded font-mono text-slate-600">{row.sku ?? "—"}</code>
                      </td>
                      {/* Fiyat — inline edit */}
                      <td className="px-4 py-3 font-semibold text-slate-800">
                        <EditCell value={row.price} onSave={v => patchRow(row.id, { price: parseFloat(v) })} />
                      </td>
                      {/* Maliyet — inline edit */}
                      <td className="px-4 py-3 text-slate-500">
                        <EditCell value={row.costPrice ?? 0} onSave={v => patchRow(row.id, { costPrice: parseFloat(v) })} />
                      </td>
                      {/* Stok — inline edit */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <EditCell value={row.stock} onSave={v => patchRow(row.id, { stock: parseInt(v) })} />
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${ss.cls}`}>{ss.label}</span>
                        </div>
                      </td>
                      {/* Kanal görünürlüğü */}
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          <ChannelDot active={row.channelVisibility?.showOnWeb ?? false} label="Web" />
                          <ChannelDot active={row.channelVisibility?.showOnB2B ?? false} label="B2B" />
                          <ChannelDot active={row.channelVisibility?.showOnPOS ?? false} label="POS" />
                        </div>
                      </td>
                      {/* Durum */}
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${row.status === "ACTIVE" ? "bg-emerald-100 text-emerald-700" : row.status === "DRAFT" ? "bg-slate-100 text-slate-600" : "bg-red-100 text-red-700"}`}>
                          {row.status === "ACTIVE" ? "Aktif" : row.status === "DRAFT" ? "Taslak" : "Arşiv"}
                        </span>
                      </td>
                      {/* Kar */}
                      <td className="px-4 py-3">
                        {m !== null
                          ? <span className={`text-sm font-bold ${m >= 50 ? "text-emerald-600" : m >= 30 ? "text-amber-600" : "text-red-600"}`}>%{m}</span>
                          : <span className="text-slate-300">—</span>
                        }
                      </td>
                      {/* Aksiyon */}
                      <td className="px-4 py-3">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-white">
                            <DropdownMenuItem asChild><Link href={`/admin/products/${row.id}/edit`}><Edit className="h-4 w-4 mr-2" />Düzenle</Link></DropdownMenuItem>
                            <DropdownMenuItem asChild><Link href={`/products/${row.id}`} target="_blank"><Eye className="h-4 w-4 mr-2" />Vitrine Bak</Link></DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600"><Trash2 className="h-4 w-4 mr-2" />Sil</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="py-20 text-center text-slate-400">
                <Package className="h-12 w-12 mx-auto mb-3 opacity-40" />
                <p>Kritere uyan ürün bulunamadı.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Sticky Save Bar ── */}
      {hasPending && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl shadow-slate-900/40 border border-white/10">
          <span className="text-sm"><span className="font-bold text-amber-400">{Object.keys(pendingChanges).length}</span> ürün değiştirildi</span>
          <Button size="sm" className="bg-amber-500 hover:bg-amber-400 text-white" onClick={saveChanges}>
            <Save className="h-4 w-4 mr-1" />Kaydet
          </Button>
          <Button size="sm" variant="ghost" className="text-slate-300 hover:text-white" onClick={() => { setRows(MOCK); setPendingChanges({}) }}>
            <X className="h-4 w-4 mr-1" />Geri Al
          </Button>
        </div>
      )}

      {/* ── Bulk Action Bar ── */}
      {bulkMode && selected.size > 0 && (
        <div className="fixed bottom-6 right-6 z-50 bg-white border border-slate-200 rounded-2xl shadow-xl px-5 py-4 flex items-center gap-3">
          <span className="text-sm font-semibold text-slate-700">{selected.size} seçildi</span>
          <Button size="sm" variant="outline" className="text-xs">Aktif Yap</Button>
          <Button size="sm" variant="outline" className="text-xs">Arşivle</Button>
          <Button size="sm" variant="outline" className="text-xs text-red-600 border-red-200 hover:bg-red-50">Toplu Sil</Button>
        </div>
      )}
    </div>
  )
}
