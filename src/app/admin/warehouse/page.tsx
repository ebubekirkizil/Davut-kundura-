"use client"

import React, { useState, useEffect, useCallback } from "react"
import {
  Package, Warehouse as WarehouseIcon, AlertTriangle, ArrowDownRight, ArrowUpRight,
  ArrowRightLeft, Plus, RefreshCw, Search, TrendingUp, TrendingDown, Eye, MapPin
} from "lucide-react"

// ─── TYPES ───────────────────────────────────────────────────────────────────

interface StockItem {
  id: string
  variantId: string
  productName: string
  productSku: string | null
  variantName: string
  variantSku: string | null
  size: string | null
  color: string | null
  quantity: number
  reserved: number
  available: number
  minStock: number
  shelfLoc: string | null
  isLowStock: boolean
}

interface WarehouseSummary {
  id: string
  name: string
  code: string
  address: string | null
  managerName: string | null
  isActive: boolean
  totalSkus: number
  totalQty: number
  totalReserved: number
  availableQty: number
  lowStockCount: number
  stockItems: StockItem[]
}

interface LedgerEntry {
  id: string
  movementType: string
  quantity: number
  unitCost: number | null
  reference: string | null
  notes: string | null
  performedBy: string | null
  createdAt: string
  variant: { name: string; product: { name: string; sku: string | null } }
  warehouse: { name: string; code: string }
}

interface AlertItem {
  id: string
  quantity: number
  reserved: number
  minStock: number
  variant: { name: string; size: string | null; color: string | null; product: { id: string; name: string; sku: string | null } }
  warehouse: { id: string; name: string; code: string }
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────

const movementLabels: Record<string, string> = {
  PURCHASE: "Satın Alma", SALE: "Satış", RETURN_IN: "İade Girişi",
  RETURN_OUT: "İade Çıkışı", TRANSFER_IN: "Transfer Girişi",
  TRANSFER_OUT: "Transfer Çıkışı", ADJUSTMENT: "Düzeltme",
  RESERVED: "Rezerve", UNRESERVED: "Rezerve İptali",
}

const movementColors: Record<string, string> = {
  PURCHASE: "bg-emerald-100 text-emerald-700",
  SALE: "bg-blue-100 text-blue-700",
  RETURN_IN: "bg-teal-100 text-teal-700",
  RETURN_OUT: "bg-orange-100 text-orange-700",
  TRANSFER_IN: "bg-purple-100 text-purple-700",
  TRANSFER_OUT: "bg-violet-100 text-violet-700",
  ADJUSTMENT: "bg-amber-100 text-amber-700",
  RESERVED: "bg-yellow-100 text-yellow-700",
  UNRESERVED: "bg-gray-100 text-gray-700",
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("tr-TR", {
    day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
  })
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function AdminWarehousePage() {
  const [warehouses, setWarehouses] = useState<WarehouseSummary[]>([])
  const [ledger, setLedger] = useState<LedgerEntry[]>([])
  const [alerts, setAlerts] = useState<AlertItem[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<"overview" | "ledger" | "alerts">("overview")
  const [searchQuery, setSearchQuery] = useState("")
  const [showMovementModal, setShowMovementModal] = useState(false)

  // Movement form state
  const [formVariantId, setFormVariantId] = useState("")
  const [formWarehouseId, setFormWarehouseId] = useState("")
  const [formType, setFormType] = useState("PURCHASE")
  const [formQty, setFormQty] = useState("")
  const [formCost, setFormCost] = useState("")
  const [formNotes, setFormNotes] = useState("")
  const [formRef, setFormRef] = useState("")
  const [formTargetWh, setFormTargetWh] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const [sumRes, ledRes, alertRes] = await Promise.all([
        fetch("/api/admin/warehouse?view=summary"),
        fetch("/api/admin/warehouse?view=ledger"),
        fetch("/api/admin/warehouse?view=alerts"),
      ])
      const sumData = await sumRes.json()
      const ledData = await ledRes.json()
      const alertData = await alertRes.json()
      setWarehouses(sumData.warehouses ?? [])
      setLedger(ledData.ledger ?? [])
      setAlerts(alertData.alerts ?? [])
    } catch (err) {
      console.error("Veri çekilemedi:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  const handleSubmitMovement = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formVariantId || !formWarehouseId || !formQty) return
    setSubmitting(true)
    try {
      const res = await fetch("/api/admin/warehouse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          variantId: formVariantId,
          warehouseId: formWarehouseId,
          movementType: formType,
          quantity: parseInt(formQty),
          unitCost: formCost ? parseFloat(formCost) : undefined,
          reference: formRef || undefined,
          notes: formNotes || undefined,
          targetWarehouseId: formType === "TRANSFER_OUT" ? formTargetWh : undefined,
          performedBy: "admin",
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setShowMovementModal(false)
      setFormVariantId(""); setFormWarehouseId(""); setFormQty(""); setFormCost("")
      setFormNotes(""); setFormRef(""); setFormTargetWh("")
      fetchData()
    } catch (err: any) {
      alert("Hata: " + (err.message || "Bilinmeyen hata"))
    } finally {
      setSubmitting(false)
    }
  }

  // Tüm depolardaki toplam veriler
  const totalSkus = warehouses.reduce((s, w) => s + w.totalSkus, 0)
  const totalQty = warehouses.reduce((s, w) => s + w.totalQty, 0)
  const totalReserved = warehouses.reduce((s, w) => s + w.totalReserved, 0)
  const totalAlerts = warehouses.reduce((s, w) => s + w.lowStockCount, 0)

  // Tüm varyantları düz liste olarak topla (form dropdown için)
  const allVariants = warehouses.flatMap((w) =>
    w.stockItems.map((s) => ({ id: s.variantId, label: `${s.productName} — ${s.variantName}` }))
  ).filter((v, i, arr) => arr.findIndex((x) => x.id === v.id) === i)

  // Arama filtresi
  const filteredLedger = ledger.filter((e) =>
    !searchQuery ||
    e.variant.product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (e.reference?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <RefreshCw className="h-8 w-8 animate-spin text-amber-600" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* ── Header ─────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Depo & Stok Yönetimi</h1>
          <p className="text-slate-500 mt-1">ERP seviyesinde envanter kontrolü ve stok defteri</p>
        </div>
        <div className="flex gap-3">
          <button onClick={fetchData} className="px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 flex items-center gap-2 text-sm">
            <RefreshCw className="h-4 w-4" /> Yenile
          </button>
          <button onClick={() => setShowMovementModal(true)} className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 flex items-center gap-2 text-sm font-semibold shadow-lg shadow-amber-500/25">
            <Plus className="h-4 w-4" /> Stok Hareketi
          </button>
        </div>
      </div>

      {/* ── KPI Cards ─────────────────────────────────────── */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Toplam SKU", value: totalSkus, icon: Package, color: "from-blue-500 to-cyan-600" },
          { title: "Toplam Stok", value: `${totalQty.toLocaleString("tr-TR")} adet`, icon: WarehouseIcon, color: "from-emerald-500 to-green-600" },
          { title: "Rezerve", value: `${totalReserved.toLocaleString("tr-TR")} adet`, icon: ArrowUpRight, color: "from-purple-500 to-violet-600" },
          { title: "Düşük Stok Uyarısı", value: totalAlerts, icon: AlertTriangle, color: totalAlerts > 0 ? "from-red-500 to-pink-600" : "from-slate-400 to-slate-500" },
        ].map((kpi) => (
          <div key={kpi.title} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-slate-500">{kpi.title}</span>
              <div className={`p-2 rounded-lg bg-gradient-to-br ${kpi.color}`}>
                <kpi.icon className="h-4 w-4 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-800">{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* ── Tabs ───────────────────────────────────────────── */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-lg w-fit">
        {(["overview", "ledger", "alerts"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === tab ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab === "overview" ? "Depo Özeti" : tab === "ledger" ? "Stok Defteri" : `Uyarılar (${alerts.length})`}
          </button>
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════
          TAB: DEPO ÖZETİ
         ══════════════════════════════════════════════════════ */}
      {activeTab === "overview" && (
        <div className="grid gap-6 lg:grid-cols-2">
          {warehouses.length === 0 ? (
            <div className="lg:col-span-2 text-center py-20 bg-white rounded-xl border border-slate-200">
              <WarehouseIcon className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500">Henüz depo tanımlanmamış. Veritabanına depo ekleyin.</p>
            </div>
          ) : warehouses.map((wh) => (
            <div key={wh.id} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 shadow-lg">
                    <WarehouseIcon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">{wh.name}</h3>
                    <p className="text-xs text-slate-500">{wh.code} {wh.managerName && `• ${wh.managerName}`}</p>
                  </div>
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${wh.isActive ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                  {wh.isActive ? "Aktif" : "Pasif"}
                </span>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                <div className="bg-slate-50 rounded-lg p-3 text-center">
                  <p className="text-xl font-bold text-slate-800">{wh.totalSkus}</p>
                  <p className="text-xs text-slate-500">SKU</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3 text-center">
                  <p className="text-xl font-bold text-slate-800">{wh.availableQty.toLocaleString("tr-TR")}</p>
                  <p className="text-xs text-slate-500">Kullanılabilir</p>
                </div>
                <div className={`rounded-lg p-3 text-center ${wh.lowStockCount > 0 ? "bg-red-50" : "bg-emerald-50"}`}>
                  <p className={`text-xl font-bold ${wh.lowStockCount > 0 ? "text-red-600" : "text-emerald-600"}`}>{wh.lowStockCount}</p>
                  <p className="text-xs text-slate-500">Düşük Stok</p>
                </div>
              </div>

              {/* Capacity Bar */}
              {wh.totalQty > 0 && (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Rezerve: {wh.totalReserved}</span>
                    <span>Toplam: {wh.totalQty.toLocaleString("tr-TR")}</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 transition-all"
                      style={{ width: `${Math.min((wh.totalReserved / wh.totalQty) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Top low-stock items */}
              {wh.stockItems.filter((s) => s.isLowStock).length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <p className="text-xs font-semibold text-red-600 mb-2">⚠ Kritik Stok:</p>
                  {wh.stockItems.filter((s) => s.isLowStock).slice(0, 3).map((s) => (
                    <div key={s.id} className="flex justify-between text-xs py-1">
                      <span className="text-slate-600 truncate mr-2">{s.productName} — {s.variantName}</span>
                      <span className="font-bold text-red-600 whitespace-nowrap">{s.available} / {s.minStock}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════
          TAB: STOK DEFTERİ (LEDGER)
         ══════════════════════════════════════════════════════ */}
      {activeTab === "ledger" && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="p-4 border-b border-slate-100 flex items-center gap-3">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Ürün adı veya referans ile ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 text-sm outline-none bg-transparent"
            />
          </div>
          <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
            {filteredLedger.length === 0 ? (
              <div className="py-16 text-center text-slate-400">
                Henüz stok hareketi kaydı bulunmuyor.
              </div>
            ) : filteredLedger.map((entry) => (
              <div key={entry.id} className="flex items-center justify-between px-5 py-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${
                    entry.quantity > 0 ? "bg-emerald-100" : "bg-red-100"
                  }`}>
                    {entry.quantity > 0 ? <ArrowDownRight className="h-4 w-4 text-emerald-600" /> : <ArrowUpRight className="h-4 w-4 text-red-600" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">{entry.variant.product.name}</p>
                    <p className="text-xs text-slate-500">{entry.variant.name} • {entry.warehouse.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${movementColors[entry.movementType] || "bg-slate-100 text-slate-600"}`}>
                    {movementLabels[entry.movementType] || entry.movementType}
                  </span>
                  <span className={`text-sm font-bold tabular-nums ${entry.quantity > 0 ? "text-emerald-600" : "text-red-600"}`}>
                    {entry.quantity > 0 ? "+" : ""}{entry.quantity}
                  </span>
                  <span className="text-xs text-slate-400 w-32 text-right">{formatDate(entry.createdAt)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════
          TAB: UYARILAR
         ══════════════════════════════════════════════════════ */}
      {activeTab === "alerts" && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="divide-y divide-slate-100">
            {alerts.length === 0 ? (
              <div className="py-16 text-center">
                <AlertTriangle className="h-10 w-10 text-emerald-400 mx-auto mb-3" />
                <p className="text-slate-500">Tüm stok seviyeleri güvenli aralıkta!</p>
              </div>
            ) : alerts.map((a) => (
              <div key={a.id} className="flex items-center justify-between px-5 py-4">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-red-100">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">{a.variant.product.name}</p>
                    <p className="text-xs text-slate-500">{a.variant.name} • {a.warehouse.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-red-600">{a.quantity - a.reserved}</p>
                  <p className="text-xs text-slate-500">Min: {a.minStock}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════
          MODAL: YENİ STOK HAREKETİ
         ══════════════════════════════════════════════════════ */}
      {showMovementModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowMovementModal(false)} />
          <form onSubmit={handleSubmitMovement} className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 space-y-5">
            <h2 className="text-xl font-bold text-slate-800">Yeni Stok Hareketi</h2>

            {/* Depo Seçimi */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Depo *</label>
              <select value={formWarehouseId} onChange={(e) => setFormWarehouseId(e.target.value)} required className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm">
                <option value="">Seçiniz...</option>
                {warehouses.map((w) => <option key={w.id} value={w.id}>{w.name} ({w.code})</option>)}
              </select>
            </div>

            {/* Varyant Seçimi */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Ürün / Varyant *</label>
              <select value={formVariantId} onChange={(e) => setFormVariantId(e.target.value)} required className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm">
                <option value="">Seçiniz...</option>
                {allVariants.map((v) => <option key={v.id} value={v.id}>{v.label}</option>)}
              </select>
            </div>

            {/* Hareket Tipi */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Hareket Tipi *</label>
              <select value={formType} onChange={(e) => setFormType(e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm">
                {Object.entries(movementLabels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
              </select>
            </div>

            {/* Transfer hedef depo */}
            {formType === "TRANSFER_OUT" && (
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Hedef Depo *</label>
                <select value={formTargetWh} onChange={(e) => setFormTargetWh(e.target.value)} required className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm">
                  <option value="">Seçiniz...</option>
                  {warehouses.filter((w) => w.id !== formWarehouseId).map((w) => <option key={w.id} value={w.id}>{w.name}</option>)}
                </select>
              </div>
            )}

            {/* Miktar + Birim Maliyet */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Miktar *</label>
                <input type="number" min="1" value={formQty} onChange={(e) => setFormQty(e.target.value)} required className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" placeholder="Adet" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Birim Maliyet (₺)</label>
                <input type="number" step="0.01" value={formCost} onChange={(e) => setFormCost(e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" placeholder="Opsiyonel" />
              </div>
            </div>

            {/* Referans + Notlar */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Referans No</label>
              <input type="text" value={formRef} onChange={(e) => setFormRef(e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" placeholder="Sipariş no, irsaliye no..." />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Notlar</label>
              <textarea value={formNotes} onChange={(e) => setFormNotes(e.target.value)} rows={2} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm resize-none" placeholder="Açıklama..." />
            </div>

            {/* Butonlar */}
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setShowMovementModal(false)} className="flex-1 px-4 py-3 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50">
                İptal
              </button>
              <button type="submit" disabled={submitting} className="flex-1 px-4 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-lg text-sm font-bold hover:from-amber-600 hover:to-yellow-700 disabled:opacity-50 shadow-lg shadow-amber-500/25">
                {submitting ? "Kaydediliyor..." : "Hareketi Kaydet"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}