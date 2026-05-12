"use client"

import React, { useState, useRef } from "react"
import {
  Package, Printer, Truck, ScanLine, Search, CheckCircle2,
  Clock, AlertTriangle, ArrowUpRight, X, RefreshCw, LayoutGrid
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// ─── Types ────────────────────────────────────────────────────────────────────

type DispatchStatus = "DRAFT" | "LABEL_READY" | "PRINTED" | "HANDED_OFF" | "IN_TRANSIT" | "DELIVERED" | "FAILED"

interface DispatchRow {
  id: string
  orderNumber: string
  orderType: "B2C" | "B2B"
  customer: string
  items: { name: string; qty: number; sku: string }[]
  provider: string
  providerSlug: string
  status: DispatchStatus
  grossKg: number
  desiKg: number
  packagePreset: string
  trackingNo: string | null
  createdAt: string
  trackingEvents: { status: string; description: string; location: string; eventAt: string }[]
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK: DispatchRow[] = [
  {
    id: "d1", orderNumber: "ORD-2024-1042", orderType: "B2C", customer: "Ahmet Yılmaz",
    items: [{ name: "Premium Deri Kemer — Executive Black", qty: 1, sku: "DK-001-BLK" }],
    provider: "Yurtiçi Kargo", providerSlug: "yurtici", status: "LABEL_READY",
    grossKg: 0.45, desiKg: 1.2, packagePreset: "Tekli Kemer Kutusu",
    trackingNo: "YK123456789TR", createdAt: "2024-10-24T14:30:00Z",
    trackingEvents: [
      { status: "RECEIVED", description: "Kargo teslim alındı", location: "İstanbul / Bağcılar", eventAt: "2024-10-24T16:00:00Z" },
      { status: "IN_TRANSIT", description: "Transfer merkezine ulaştı", location: "İstanbul HUB", eventAt: "2024-10-24T20:15:00Z" },
    ]
  },
  {
    id: "d2", orderNumber: "ORD-2024-1041", orderType: "B2B", customer: "Koray Ayakkabıcılık",
    items: [
      { name: "Premium Deri Kemer — Executive Black", qty: 100, sku: "DK-001-BLK" },
      { name: "Ortopedik Taban — Comfort Pro", qty: 50, sku: "DK-002-ORT" },
    ],
    provider: "Ambar Nakliyat", providerSlug: "ambar", status: "DRAFT",
    grossKg: 68, desiKg: 120, packagePreset: "B2B Palet (120×80)",
    trackingNo: null, createdAt: "2024-10-23T09:15:00Z", trackingEvents: []
  },
  {
    id: "d3", orderNumber: "ORD-2024-1040", orderType: "B2C", customer: "Elif Demir",
    items: [{ name: "Klasik Loafer - Midnight Blue", qty: 1, sku: "DK-009-LOF" }],
    provider: "Aras Kargo", providerSlug: "aras", status: "IN_TRANSIT",
    grossKg: 0.85, desiKg: 2.1, packagePreset: "Tekli Ayakkabı Kutusu",
    trackingNo: "ARS987654321", createdAt: "2024-10-22T16:45:00Z",
    trackingEvents: [
      { status: "ON_VEHICLE", description: "Dağıtıma çıktı", location: "İzmir / Bornova", eventAt: "2024-10-23T08:30:00Z" },
    ]
  },
  {
    id: "d4", orderNumber: "ORD-2024-1039", orderType: "B2C", customer: "Can Kaya",
    items: [{ name: "Luxury Deri Bakım Seti", qty: 1, sku: "DK-003-BAK" }],
    provider: "MNG Kargo", providerSlug: "mng", status: "DELIVERED",
    grossKg: 0.62, desiKg: 0.9, packagePreset: "Bakım Seti Kutusu",
    trackingNo: "MNG555444333", createdAt: "2024-10-20T11:20:00Z",
    trackingEvents: [
      { status: "DELIVERED", description: "Teslim edildi", location: "Ankara / Çankaya", eventAt: "2024-10-22T14:05:00Z" },
    ]
  },
  {
    id: "d5", orderNumber: "ORD-2024-1038", orderType: "B2C", customer: "Zeynep Arslan",
    items: [{ name: "Brogue Erkek Ayakkabı - Tan", qty: 1, sku: "DK-008-BRG" }],
    provider: "Yurtiçi Kargo", providerSlug: "yurtici", status: "PRINTED",
    grossKg: 1.1, desiKg: 2.8, packagePreset: "Tekli Ayakkabı Kutusu",
    trackingNo: "YK999888777TR", createdAt: "2024-10-19T10:00:00Z",
    trackingEvents: []
  },
]

// ─── Status Config ────────────────────────────────────────────────────────────

const STATUS_CFG: Record<DispatchStatus, { label: string; dot: string }> = {
  DRAFT:      { label: "Taslak",         dot: "bg-slate-400" },
  LABEL_READY:{ label: "Etiket Hazır",   dot: "bg-amber-400" },
  PRINTED:    { label: "Yazdırıldı",     dot: "bg-blue-400" },
  HANDED_OFF: { label: "Firmaya Teslim", dot: "bg-indigo-500" },
  IN_TRANSIT: { label: "Yolda",          dot: "bg-violet-500" },
  DELIVERED:  { label: "Teslim Edildi",  dot: "bg-emerald-500" },
  FAILED:     { label: "Teslim Edilemedi", dot: "bg-red-500" },
}

const PROVIDER_COLORS: Record<string, string> = {
  yurtici: "bg-amber-100 text-amber-800",
  aras:    "bg-blue-100 text-blue-800",
  mng:     "bg-orange-100 text-orange-800",
  dhl:     "bg-yellow-100 text-yellow-900",
  ambar:   "bg-slate-100 text-slate-700",
}

// ─── Desi Hesaplama ───────────────────────────────────────────────────────────

function calcDesi(w: number, h: number, d: number) {
  return (w * h * d) / 3000
}

// ─── Page Component ───────────────────────────────────────────────────────────

export default function LogisticsDispatchPage() {
  const [rows, setRows] = useState<DispatchRow[]>(MOCK)
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [active, setActive] = useState<DispatchRow | null>(MOCK[0])
  const [search, setSearch] = useState("")
  const [barcodeInput, setBarcodeInput] = useState("")
  const [verifiedSkus, setVerifiedSkus] = useState<Set<string>>(new Set())
  const [desiCalc, setDesiCalc] = useState({ w: 30, h: 20, d: 12 })
  const barcodeRef = useRef<HTMLInputElement>(null)

  const filtered = rows.filter(r =>
    r.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
    r.customer.toLowerCase().includes(search.toLowerCase())
  )

  const toggleSelect = (id: string) => {
    setSelected(prev => {
      const s = new Set(prev)
      s.has(id) ? s.delete(id) : s.add(id)
      return s
    })
  }
  const allSelected = filtered.length > 0 && filtered.every(r => selected.has(r.id))
  const toggleAll = () => setSelected(allSelected ? new Set() : new Set(filtered.map(r => r.id)))

  // Barkod okuyucu ile ürün doğrulama
  function handleBarcode(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return
    const val = barcodeInput.trim()
    if (!val) return
    if (active?.items.some(i => i.sku === val)) {
      setVerifiedSkus(prev => new Set(prev).add(val))
    }
    setBarcodeInput("")
  }

  const activeAllVerified = active ? active.items.every(i => verifiedSkus.has(i.sku)) : false
  const desiResult = calcDesi(desiCalc.w, desiCalc.h, desiCalc.d)

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">

      {/* ── Sticky Action Bar ── */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-900 rounded-lg">
            <Truck className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-serif font-bold text-slate-900 leading-none">Sevkiyat Kumanda Merkezi</h1>
            <p className="text-xs text-slate-500 mt-0.5">{filtered.length} sevkiyat • {selected.size > 0 ? `${selected.size} seçildi` : "Seçim yok"}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {selected.size > 0 && (
            <>
              <Button size="sm" variant="outline" className="border-slate-300 bg-white text-xs gap-1.5">
                <Printer className="h-3.5 w-3.5" />
                Toplu Etiket Bas ({selected.size})
              </Button>
              <Button size="sm" variant="outline" className="border-slate-300 bg-white text-xs gap-1.5">
                <LayoutGrid className="h-3.5 w-3.5" />
                E-İrsaliye Kes
              </Button>
            </>
          )}
          <Button size="sm" className="bg-slate-900 hover:bg-slate-800 text-white text-xs gap-1.5">
            <RefreshCw className="h-3.5 w-3.5" />
            Kargo API Güncelle
          </Button>
        </div>
      </div>

      {/* ── Main 3-column Layout ── */}
      <div className="flex-1 grid grid-cols-12 divide-x divide-slate-200 overflow-hidden" style={{ height: "calc(100vh - 60px)" }}>

        {/* ── LEFT: Pending Shipments List ── */}
        <div className="col-span-4 flex flex-col overflow-hidden bg-white">
          <div className="p-4 border-b border-slate-100 bg-slate-50">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <Input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Sipariş / Müşteri ara..."
                className="pl-8 h-8 text-xs bg-white border-slate-200"
              />
            </div>
            <div className="flex items-center gap-3 mt-3">
              <label className="flex items-center gap-2 text-xs text-slate-500 cursor-pointer select-none">
                <input type="checkbox" checked={allSelected} onChange={toggleAll} className="rounded" />
                Tümünü seç
              </label>
              <span className="text-xs text-slate-400 ml-auto">{filtered.length} kayıt</span>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {filtered.map(row => {
              const cfg = STATUS_CFG[row.status]
              const isActive = active?.id === row.id
              return (
                <div
                  key={row.id}
                  onClick={() => setActive(row)}
                  className={`p-4 cursor-pointer transition-colors ${isActive ? "bg-slate-50 border-l-2 border-l-slate-800" : "hover:bg-slate-50/60"}`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={selected.has(row.id)}
                      onChange={e => { e.stopPropagation(); toggleSelect(row.id) }}
                      className="rounded mt-0.5 flex-shrink-0"
                      onClick={e => e.stopPropagation()}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-xs font-semibold text-slate-800">{row.orderNumber}</span>
                        <div className="flex items-center gap-1.5">
                          <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                          <span className="text-[10px] text-slate-500 font-medium">{cfg.label}</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5 truncate">{row.customer}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className={`text-[10px] px-1.5 py-0 border-0 ${row.orderType === "B2B" ? "bg-indigo-100 text-indigo-700" : "bg-slate-100 text-slate-600"}`}>
                          {row.orderType}
                        </Badge>
                        <Badge variant="outline" className={`text-[10px] px-1.5 py-0 border-0 ${PROVIDER_COLORS[row.providerSlug] || "bg-slate-100 text-slate-600"}`}>
                          {row.provider}
                        </Badge>
                        <span className="text-[10px] text-slate-400 ml-auto">{row.desiKg} desi</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── CENTER: Package Detail & Verification ── */}
        <div className="col-span-5 flex flex-col overflow-y-auto bg-white">
          {active ? (
            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-serif font-bold text-slate-900">{active.orderNumber}</h2>
                  <p className="text-sm text-slate-500 mt-1">{active.customer} · {active.provider}</p>
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className={`w-2 h-2 rounded-full ${STATUS_CFG[active.status].dot}`} />
                  <span className="text-xs font-medium text-slate-600">{STATUS_CFG[active.status].label}</span>
                </div>
              </div>

              {/* Barcode Scanner / Verification Zone */}
              <Card className={`border-2 transition-colors ${activeAllVerified ? "border-emerald-400 bg-emerald-50/30" : "border-slate-200"}`}>
                <CardHeader className="py-3 px-4 border-b border-slate-100">
                  <CardTitle className="text-xs uppercase tracking-widest text-slate-500 flex items-center gap-2">
                    <ScanLine className="h-4 w-4" />
                    Barkod Doğrulama (El Terminali)
                    {activeAllVerified && <CheckCircle2 className="h-4 w-4 text-emerald-500 ml-auto" />}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  <Input
                    ref={barcodeRef}
                    value={barcodeInput}
                    onChange={e => setBarcodeInput(e.target.value)}
                    onKeyDown={handleBarcode}
                    placeholder="SKU okut veya yaz → Enter..."
                    className="h-9 font-mono text-sm bg-slate-50 border-slate-300 focus-visible:ring-slate-400"
                    autoFocus
                  />
                  <div className="space-y-2">
                    {active.items.map(item => {
                      const verified = verifiedSkus.has(item.sku)
                      return (
                        <div key={item.sku} className={`flex items-center gap-3 p-2.5 rounded-lg border transition-colors ${verified ? "bg-emerald-50 border-emerald-200" : "bg-slate-50 border-slate-200"}`}>
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${verified ? "bg-emerald-500" : "border-2 border-slate-300"}`}>
                            {verified && <CheckCircle2 className="h-3 w-3 text-white" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-slate-800 truncate">{item.name}</p>
                            <p className="text-[10px] text-slate-500 font-mono">{item.sku} · x{item.qty}</p>
                          </div>
                          {verified && <span className="text-[10px] text-emerald-600 font-semibold">✓ Onaylandı</span>}
                        </div>
                      )
                    })}
                  </div>
                  {verifiedSkus.size > 0 && (
                    <Button variant="ghost" size="sm" className="text-xs text-slate-400 h-7" onClick={() => setVerifiedSkus(new Set())}>
                      <X className="h-3 w-3 mr-1" /> Sıfırla
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Package & Weight */}
              <Card className="border-slate-200">
                <CardHeader className="py-3 px-4 border-b border-slate-100">
                  <CardTitle className="text-xs uppercase tracking-widest text-slate-500 flex items-center gap-2">
                    <Package className="h-4 w-4" /> Paket & Desi Hesabı
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    {(["w", "h", "d"] as const).map((dim, i) => (
                      <div key={dim}>
                        <label className="text-[10px] uppercase text-slate-400 font-semibold tracking-widest">
                          {["En (cm)", "Boy (cm)", "Yük. (cm)"][i]}
                        </label>
                        <Input
                          type="number"
                          value={desiCalc[dim]}
                          onChange={e => setDesiCalc(p => ({ ...p, [dim]: Number(e.target.value) }))}
                          className="h-8 mt-1 text-sm font-mono"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-3 pt-1">
                    <div className="bg-slate-50 rounded-lg p-3 text-center">
                      <p className="text-[10px] text-slate-400 uppercase tracking-widest">Gerçek Ağırlık</p>
                      <p className="text-lg font-bold font-mono text-slate-900 mt-1">{active.grossKg} kg</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-3 text-center">
                      <p className="text-[10px] text-slate-400 uppercase tracking-widest">Desi Ağırlık</p>
                      <p className="text-lg font-bold font-mono text-slate-900 mt-1">{desiResult.toFixed(2)} kg</p>
                    </div>
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-center">
                      <p className="text-[10px] text-amber-600 uppercase tracking-widest font-semibold">Faturalandırılacak</p>
                      <p className="text-lg font-bold font-mono text-amber-800 mt-1">
                        {Math.max(active.grossKg, desiResult).toFixed(2)} kg
                      </p>
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-400 text-center">Paket: {active.packagePreset}</p>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="border-slate-300 bg-white text-sm gap-2" disabled={!activeAllVerified}>
                  <Printer className="h-4 w-4" />
                  Etiket Yazdır (ZPL)
                </Button>
                <Button className="bg-slate-900 hover:bg-slate-800 text-white text-sm gap-2" disabled={!activeAllVerified}>
                  <Truck className="h-4 w-4" />
                  Kargoya Ver
                </Button>
              </div>
              {!activeAllVerified && (
                <p className="text-[11px] text-center text-slate-400">Kargoya vermek için önce tüm ürünleri barkod ile doğrulayın.</p>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-3">
              <Truck className="h-12 w-12 opacity-30" />
              <p className="text-sm">Soldan bir sevkiyat seçin</p>
            </div>
          )}
        </div>

        {/* ── RIGHT: Tracking Timeline ── */}
        <div className="col-span-3 flex flex-col overflow-hidden bg-white">
          <div className="p-4 border-b border-slate-100 bg-slate-50">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Canlı Kargo Takibi</p>
            {active?.trackingNo && (
              <p className="font-mono text-xs text-slate-700 mt-1">{active.trackingNo}</p>
            )}
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {active && active.trackingEvents.length > 0 ? (
              <div className="space-y-5">
                {[...active.trackingEvents].reverse().map((ev, i, arr) => (
                  <div key={i} className="relative flex gap-3">
                    {i < arr.length - 1 && (
                      <div className="absolute left-[7px] top-5 bottom-[-20px] w-[2px] bg-slate-100" />
                    )}
                    <div className="relative z-10 w-3.5 h-3.5 mt-1 rounded-full border-2 border-amber-500 bg-white flex-shrink-0" />
                    <div>
                      <p className="text-xs font-medium text-slate-900">{ev.description}</p>
                      {ev.location && <p className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1">📍 {ev.location}</p>}
                      <p className="text-[10px] text-slate-400 mt-1 font-mono">
                        {new Date(ev.eventAt).toLocaleString("tr-TR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-40 text-slate-300 gap-2">
                <Clock className="h-8 w-8" />
                <p className="text-xs">Henüz takip verisi yok</p>
              </div>
            )}
            {active && (
              <div className="mt-6">
                {active.trackingNo ? (
                  <a
                    href={`https://www.yurticikargo.com/tr/online-islemler/gonderi-sorgula?code=${active.trackingNo}`}
                    target="_blank"
                    className="flex items-center gap-1 text-xs text-amber-600 hover:text-amber-700 font-medium"
                  >
                    Kargo sitesinde takip et <ArrowUpRight className="h-3 w-3" />
                  </a>
                ) : (
                  <Button size="sm" className="w-full text-xs bg-slate-900 hover:bg-slate-800 text-white">
                    Kargo Kodu Oluştur
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
