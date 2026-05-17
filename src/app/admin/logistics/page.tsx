"use client"

import React, { useState, useRef, useEffect } from "react"
import {
  Package, Printer, Truck, ScanLine, Search, CheckCircle2,
  Clock, AlertTriangle, ArrowUpRight, X, RefreshCw, LayoutGrid,
  Volume2, ShieldAlert, Sparkles, HelpCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast, Toaster } from "react-hot-toast"

// ─── Sound System (Web Audio API) ─────────────────────────────────────────────
function playSynthSound(type: "success" | "error") {
  if (typeof window === "undefined") return
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
    
    if (type === "success") {
      // High pitch double-beep (happy sound)
      const osc1 = ctx.createOscillator()
      const gain1 = ctx.createGain()
      osc1.connect(gain1)
      gain1.connect(ctx.destination)
      osc1.type = "sine"
      osc1.frequency.setValueAtTime(880, ctx.currentTime) // A5
      gain1.gain.setValueAtTime(0.1, ctx.currentTime)
      osc1.start()
      gain1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1)
      osc1.stop(ctx.currentTime + 0.1)

      setTimeout(() => {
        const osc2 = ctx.createOscillator()
        const gain2 = ctx.createGain()
        osc2.connect(gain2)
        gain2.connect(ctx.destination)
        osc2.type = "sine"
        osc2.frequency.setValueAtTime(1046.5, ctx.currentTime) // C6
        gain2.gain.setValueAtTime(0.1, ctx.currentTime)
        osc2.start()
        gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15)
        osc2.stop(ctx.currentTime + 0.15)
      }, 80)
    } else {
      // Low buzz sound (error sound)
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.type = "sawtooth"
      osc.frequency.setValueAtTime(150, ctx.currentTime)
      gain.gain.setValueAtTime(0.15, ctx.currentTime)
      osc.start()
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3)
      osc.stop(ctx.currentTime + 0.3)
    }
  } catch (e) {
    console.error("Audio error", e)
  }
}

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
const INITIAL_MOCK: DispatchRow[] = [
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
      { name: "Premium Deri Kemer — Executive Black", qty: 10, sku: "DK-001-BLK" },
      { name: "Ortopedik Taban — Comfort Pro", qty: 5, sku: "DK-002-ORT" },
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
const STATUS_CFG: Record<DispatchStatus, { label: string; dot: string; glow: string }> = {
  DRAFT:      { label: "Taslak",         dot: "bg-slate-500", glow: "shadow-[0_0_8px_rgba(100,116,139,0.5)]" },
  LABEL_READY:{ label: "Etiket Hazır",   dot: "bg-amber-400", glow: "shadow-[0_0_12px_rgba(245,158,11,0.6)] animate-pulse" },
  PRINTED:    { label: "Yazdırıldı",     dot: "bg-blue-400", glow: "shadow-[0_0_8px_rgba(96,165,250,0.5)]" },
  HANDED_OFF: { label: "Firmaya Teslim", dot: "bg-indigo-400", glow: "shadow-[0_0_8px_rgba(129,140,248,0.5)]" },
  IN_TRANSIT: { label: "Yolda",          dot: "bg-violet-500", glow: "shadow-[0_0_12px_rgba(139,92,246,0.6)] animate-pulse" },
  DELIVERED:  { label: "Teslim Edildi",  dot: "bg-emerald-500", glow: "shadow-[0_0_12px_rgba(16,185,129,0.6)]" },
  FAILED:     { label: "Başarısız",      dot: "bg-rose-500", glow: "shadow-[0_0_12px_rgba(244,63,94,0.6)]" },
}

const PROVIDER_COLORS: Record<string, string> = {
  yurtici: "bg-amber-500/10 text-amber-300 border border-amber-500/20",
  aras:    "bg-blue-500/10 text-blue-300 border border-blue-500/20",
  mng:     "bg-orange-500/10 text-orange-300 border border-orange-500/20",
  dhl:     "bg-yellow-500/10 text-yellow-300 border border-yellow-500/20",
  ambar:   "bg-purple-500/10 text-purple-300 border border-purple-500/20",
}

export default function LogisticsDispatchPage() {
  const [mounted, setMounted] = useState(false)
  const [rows, setRows] = useState<DispatchRow[]>(INITIAL_MOCK)
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [active, setActive] = useState<DispatchRow | null>(INITIAL_MOCK[0])
  const [search, setSearch] = useState("")
  const [barcodeInput, setBarcodeInput] = useState("")
  const [verifiedSkus, setVerifiedSkus] = useState<Record<string, number>>({}) // sku -> verified quantity
  const [desiCalc, setDesiCalc] = useState({ w: 30, h: 20, d: 12 })
  const [isSyncing, setIsSyncing] = useState(false)
  const barcodeRef = useRef<HTMLInputElement>(null)

  // Prevent Next.js SSR hydration mismatches
  useEffect(() => {
    setMounted(true)
  }, [])

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

  // Volumetric Desi Formula
  const desiResult = (desiCalc.w * desiCalc.h * desiCalc.d) / 3000

  // Barcode / SKU scanning validation
  function handleBarcode(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return
    const val = barcodeInput.trim().toUpperCase()
    if (!val) return

    if (!active) {
      toast.error("Önce listeden bir sevkiyat seçin!")
      playSynthSound("error")
      setBarcodeInput("")
      return
    }

    const item = active.items.find(i => i.sku.toUpperCase() === val)
    
    if (item) {
      const currentQty = verifiedSkus[item.sku] || 0
      if (currentQty < item.qty) {
        setVerifiedSkus(prev => ({ ...prev, [item.sku]: currentQty + 1 }))
        playSynthSound("success")
        toast.success(`${item.name} doğrulandı (${currentQty + 1}/${item.qty})`)
      } else {
        toast.error("Bu ürün zaten tamamen doğrulandı!")
        playSynthSound("error")
      }
    } else {
      toast.error(`Geçersiz SKU! Bu siparişte "${val}" ürünü bulunmuyor.`, {
        icon: '⚠️',
      })
      playSynthSound("error")
    }
    setBarcodeInput("")
  }

  // Check if everything in the active dispatch is scanned/verified
  const activeAllVerified = active 
    ? active.items.every(i => (verifiedSkus[i.sku] || 0) >= i.qty)
    : false

  // Triggered when an active row changes, resets verified list
  useEffect(() => {
    setVerifiedSkus({})
  }, [active])

  // Sync / "Güncelleme Botu" function
  const triggerSync = () => {
    if (isSyncing) return
    setIsSyncing(true)
    const loadToast = toast.loading("Kargo API Sunucuları ile senkronize ediliyor...")

    setTimeout(() => {
      toast.dismiss(loadToast)
      setIsSyncing(false)
      toast.success("Kargo servisleri senkronize edildi: 5 Aktif Sevkiyat güncellendi.")
      // Increment stats / simulate changes
      setRows(prev => prev.map(row => {
        if (row.id === "d2" && row.status === "DRAFT") {
          return { ...row, status: "LABEL_READY", trackingNo: "AMB9948271" }
        }
        return row
      }))
    }, 2000)
  }

  // Print Label Handler
  const handlePrintLabel = () => {
    if (!activeAllVerified) return
    toast.success(`${active?.orderNumber} için ZPL Barkodu Zebra Yazıcıya Gönderildi! 🖨️`)
    playSynthSound("success")
    if (active) {
      setRows(prev => prev.map(r => r.id === active.id ? { ...r, status: "PRINTED" } : r))
    }
  }

  // Handover to Cargo Handler
  const handleHandover = () => {
    if (!activeAllVerified) return
    const randomTracking = active?.trackingNo || `YK${Math.floor(100000000 + Math.random() * 900000000)}TR`
    
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: `${active?.provider} API'den kargo kodu alınıyor...`,
        success: () => {
          setRows(prev => prev.map(r => r.id === active.id ? { 
            ...r, 
            status: "IN_TRANSIT", 
            trackingNo: randomTracking,
            trackingEvents: [
              { status: "RECEIVED", description: "Depodan paket çıkışı yapıldı", location: "Pendik Depo", eventAt: new Date().toISOString() },
              ...r.trackingEvents
            ]
          } : r))
          playSynthSound("success")
          return `${active?.customer} kargosu yola çıktı! Kod: ${randomTracking}`
        },
        error: "Kargo firması API sunucusu yanıt vermedi!"
      }
    )
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#070A13] text-slate-100 flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="h-8 w-8 text-amber-500 animate-spin" />
          <p className="text-sm tracking-widest text-slate-400 font-medium">KUMANDA MERKEZİ YÜKLENİYOR...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#070A13] text-slate-100 font-sans flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
      <Toaster position="top-right" reverseOrder={false} />

      {/* ── Background Premium Glow Effects ── */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />

      {/* ── Premium Glass Header ── */}
      <div className="sticky top-0 z-50 bg-[#070A13]/80 backdrop-blur-xl border-b border-white/5 shadow-2xl px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl shadow-[0_0_20px_rgba(245,158,11,0.3)]">
            <Truck className="h-6 w-6 text-[#070A13] stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 bg-clip-text text-transparent">
                Sevkiyat Kumanda Merkezi
              </h1>
              <Badge className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] uppercase font-bold py-0.5 px-2 tracking-wider">
                Depo Panel
              </Badge>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {filtered.length} bekleyen sevkiyat • {selected.size > 0 ? `${selected.size} seçilen` : "Paketleme bekliyor"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {selected.size > 0 && (
            <div className="flex items-center gap-2 animate-in slide-in-from-right-3 duration-200">
              <Button size="sm" variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 text-xs gap-1.5 h-9 rounded-xl">
                <Printer className="h-3.5 w-3.5" />
                Toplu Barkod ({selected.size})
              </Button>
              <Button size="sm" variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 text-xs gap-1.5 h-9 rounded-xl">
                <LayoutGrid className="h-3.5 w-3.5" />
                E-İrsaliye
              </Button>
            </div>
          )}
          <Button 
            size="sm" 
            onClick={triggerSync}
            disabled={isSyncing}
            className="bg-amber-500 hover:bg-amber-600 disabled:bg-amber-800 text-[#070A13] hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all font-semibold text-xs gap-1.5 h-9 rounded-xl px-4"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            {isSyncing ? "Senkronize Ediliyor..." : "Kargo API Güncelle"}
          </Button>
        </div>
      </div>

      {/* ── 3-Column Layout ── */}
      <div className="flex-1 grid grid-cols-12 divide-x divide-white/5 overflow-hidden" style={{ height: "calc(100vh - 73px)" }}>
        
        {/* ── LEFT: Shipment Queue ── */}
        <div className="col-span-12 lg:col-span-4 flex flex-col overflow-hidden bg-[#070A13]/40 backdrop-blur-md">
          {/* List Filter Area */}
          <div className="p-4 border-b border-white/5 bg-[#090C16]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <Input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Sipariş No veya Müşteri Ara..."
                className="pl-9 h-10 text-xs bg-slate-900/50 border-white/5 text-slate-100 rounded-xl focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30"
              />
            </div>
            <div className="flex items-center justify-between mt-3 text-xs">
              <label className="flex items-center gap-2 text-slate-400 cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  checked={allSelected} 
                  onChange={toggleAll} 
                  className="rounded border-white/10 bg-slate-950 text-amber-500 focus:ring-amber-500 focus:ring-offset-[#070A13]" 
                />
                Tümünü Seç
              </label>
              <span className="text-slate-500 font-mono">{filtered.length} kayıt listeleniyor</span>
            </div>
          </div>

          {/* Shipment Cards Queue */}
          <div className="flex-1 overflow-y-auto divide-y divide-white/5 custom-scrollbar">
            {filtered.map(row => {
              const cfg = STATUS_CFG[row.status]
              const isActive = active?.id === row.id
              return (
                <div
                  key={row.id}
                  onClick={() => setActive(row)}
                  className={`p-4 cursor-pointer transition-all duration-300 relative group overflow-hidden ${
                    isActive 
                      ? "bg-slate-900/40 border-l-[3px] border-amber-500" 
                      : "hover:bg-slate-900/20 hover:border-l-[3px] hover:border-amber-500/30"
                  }`}
                >
                  <div className="flex items-start gap-3 relative z-10">
                    <input
                      type="checkbox"
                      checked={selected.has(row.id)}
                      onChange={e => { e.stopPropagation(); toggleSelect(row.id) }}
                      className="rounded border-white/10 bg-slate-950 text-amber-500 focus:ring-amber-500 focus:ring-offset-[#070A13] mt-1"
                      onClick={e => e.stopPropagation()}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-xs font-bold text-amber-200 group-hover:text-amber-400 transition-colors">
                          {row.orderNumber}
                        </span>
                        <div className="flex items-center gap-1.5 bg-slate-900/60 rounded-full px-2 py-0.5 border border-white/5">
                          <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot} ${cfg.glow}`} />
                          <span className="text-[10px] text-slate-300 font-semibold">{cfg.label}</span>
                        </div>
                      </div>
                      
                      <p className="text-xs text-slate-300 font-medium mt-1 truncate">{row.customer}</p>
                      
                      <div className="flex items-center gap-2 mt-3">
                        <Badge className={`text-[9px] font-bold rounded-md border-0 py-0.5 px-2 ${
                          row.orderType === "B2B" ? "bg-purple-500/10 text-purple-300" : "bg-emerald-500/10 text-emerald-300"
                        }`}>
                          {row.orderType}
                        </Badge>
                        <Badge className={`text-[9px] font-semibold rounded-md py-0.5 px-2 ${PROVIDER_COLORS[row.providerSlug] || "bg-slate-800 text-slate-300"}`}>
                          {row.provider}
                        </Badge>
                        <span className="text-[10px] text-slate-500 font-semibold ml-auto">{row.desiKg} Desi</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── CENTER: Verification & Packing ── */}
        <div className="col-span-12 lg:col-span-5 flex flex-col overflow-y-auto bg-slate-950/20 backdrop-blur-md custom-scrollbar">
          {active ? (
            <div className="p-6 space-y-6">
              {/* Active Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-white/5 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold tracking-tight text-slate-100">{active.orderNumber}</h2>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border border-white/5 ${
                      active.orderType === "B2B" ? "bg-purple-500/10 text-purple-300" : "bg-emerald-500/10 text-emerald-300"
                    }`}>
                      {active.orderType === "B2B" ? "Toptan Satış" : "Perakende Satış"}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 mt-1">{active.customer} · {active.provider}</p>
                </div>
                <div className="flex items-center gap-2 bg-[#090C16] border border-white/5 rounded-2xl px-3 py-1.5 self-start">
                  <span className={`w-2 h-2 rounded-full ${STATUS_CFG[active.status].dot} ${STATUS_CFG[active.status].glow}`} />
                  <span className="text-xs font-semibold text-slate-200">{STATUS_CFG[active.status].label}</span>
                </div>
              </div>

              {/* Barcode Scanner Area */}
              <Card className={`border border-white/5 bg-slate-900/30 backdrop-blur-xl relative overflow-hidden transition-all duration-300 ${
                activeAllVerified 
                  ? "border-emerald-500/50 shadow-[0_0_25px_rgba(16,185,129,0.15)] bg-emerald-500/[0.02]" 
                  : "border-amber-500/20 shadow-2xl"
              }`}>
                {/* Visual Laser Line Scan Animation */}
                {!activeAllVerified && (
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent animate-scanner z-20 pointer-events-none" />
                )}

                <CardHeader className="py-4 px-5 border-b border-white/5 bg-[#090C16]/50">
                  <CardTitle className="text-xs uppercase tracking-wider text-slate-400 flex items-center gap-2">
                    <ScanLine className="h-4 w-4 text-amber-500" />
                    El Terminali / Barkod Doğrulama
                    {activeAllVerified && (
                      <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold ml-auto text-[9px] uppercase px-2 py-0.5">
                        Tümü Doğrulandı ✓
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="p-5 space-y-4">
                  <div className="relative">
                    <Input
                      ref={barcodeRef}
                      value={barcodeInput}
                      onChange={e => setBarcodeInput(e.target.value)}
                      onKeyDown={handleBarcode}
                      placeholder="Ürün barkodunu (SKU) okutun veya yazın..."
                      disabled={activeAllVerified}
                      className="h-11 font-mono text-sm bg-slate-950/70 border-white/10 focus:border-amber-500 text-slate-100 rounded-xl placeholder:text-slate-500"
                      autoFocus
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-slate-500 text-[10px] bg-slate-900 border border-white/5 rounded px-2 py-0.5 font-mono">
                      <span>ENTER</span>
                    </div>
                  </div>

                  {/* Scanned Items Checklist */}
                  <div className="space-y-2">
                    {active.items.map(item => {
                      const count = verifiedSkus[item.sku] || 0
                      const isComplete = count >= item.qty
                      return (
                        <div 
                          key={item.sku} 
                          className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 ${
                            isComplete 
                              ? "bg-emerald-500/5 border-emerald-500/20 text-slate-200" 
                              : count > 0 
                              ? "bg-amber-500/5 border-amber-500/20 text-slate-200"
                              : "bg-slate-900/30 border-white/5 text-slate-300"
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                            isComplete 
                              ? "bg-emerald-500 text-[#070A13]" 
                              : "border-2 border-slate-600 bg-slate-900"
                          }`}>
                            {isComplete && <CheckCircle2 className="h-3.5 w-3.5 stroke-[3]" />}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold truncate">{item.name}</p>
                            <p className="text-[10px] text-slate-400 font-mono mt-0.5">{item.sku}</p>
                          </div>
                          
                          <div className="flex items-center gap-3 text-right">
                            <span className={`text-xs font-mono font-bold ${isComplete ? 'text-emerald-400' : 'text-slate-300'}`}>
                              {count} / {item.qty}
                            </span>
                            {isComplete ? (
                              <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] uppercase px-1.5 py-0">Tamam</Badge>
                            ) : (
                              <Badge className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[9px] uppercase px-1.5 py-0">Bekliyor</Badge>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {Object.keys(verifiedSkus).length > 0 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setVerifiedSkus({})}
                      className="text-[11px] text-slate-500 hover:text-slate-300 h-8 rounded-lg"
                    >
                      <X className="h-3.5 w-3.5 mr-1" /> Doğrulamaları Sıfırla
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Volume & Desi Calculator Card */}
              <Card className="border border-white/5 bg-slate-900/30 backdrop-blur-xl">
                <CardHeader className="py-4 px-5 border-b border-white/5 bg-[#090C16]/50">
                  <CardTitle className="text-xs uppercase tracking-wider text-slate-400 flex items-center gap-2">
                    <Package className="h-4 w-4 text-amber-500" />
                    Paket Ölçüleri & Desi Hesaplayıcı
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5 space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    {(["w", "h", "d"] as const).map((dim, idx) => (
                      <div key={dim} className="space-y-1.5">
                        <label className="text-[9px] uppercase font-bold tracking-wider text-slate-400">
                          {["EN (cm)", "BOY (cm)", "YÜKSEKLİK (cm)"][idx]}
                        </label>
                        <Input
                          type="number"
                          value={desiCalc[dim]}
                          onChange={e => setDesiCalc(p => ({ ...p, [dim]: Number(e.target.value) }))}
                          className="h-9 bg-slate-950/70 border-white/10 text-slate-100 rounded-lg font-mono text-xs focus:border-amber-500 focus:ring-0"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2">
                    <div className="bg-[#090C16] border border-white/5 rounded-xl p-3 text-center">
                      <p className="text-[9px] uppercase tracking-wider text-slate-500">Gerçek Kütle</p>
                      <p className="text-base font-bold font-mono text-slate-200 mt-1">{active.grossKg.toFixed(2)} kg</p>
                    </div>
                    <div className="bg-[#090C16] border border-white/5 rounded-xl p-3 text-center">
                      <p className="text-[9px] uppercase tracking-wider text-slate-500">Desi Ağırlığı</p>
                      <p className="text-base font-bold font-mono text-slate-200 mt-1">{desiResult.toFixed(2)} desi</p>
                    </div>
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 text-center">
                      <p className="text-[9px] uppercase tracking-wider text-amber-400 font-bold">Faturalandırılacak</p>
                      <p className="text-base font-black font-mono text-amber-400 mt-1">
                        {Math.max(active.grossKg, desiResult).toFixed(2)} kg
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-[11px] text-slate-400 px-1 pt-1">
                    <span>Mevcut Şablon: <strong className="text-slate-300 font-semibold">{active.packagePreset}</strong></span>
                    <span className="text-[10px] text-slate-500">Formül: (En * Boy * Yük) / 3000</span>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <Button 
                  onClick={handlePrintLabel}
                  disabled={!activeAllVerified}
                  variant="outline" 
                  className="border-white/10 hover:border-amber-500 bg-white/5 hover:bg-amber-500/10 hover:text-amber-400 text-xs font-bold gap-2 h-11 rounded-xl transition-all"
                >
                  <Printer className="h-4 w-4" />
                  Barkod Etiketi Yazdır (ZPL)
                </Button>
                <Button 
                  onClick={handleHandover}
                  disabled={!activeAllVerified}
                  className="bg-amber-500 hover:bg-amber-600 disabled:bg-slate-800 text-[#070A13] text-xs font-bold gap-2 h-11 rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.15)] transition-all"
                >
                  <Truck className="h-4 w-4 stroke-[2.5]" />
                  Kargoyu Hazırla & Gönder
                </Button>
              </div>

              {!activeAllVerified && (
                <div className="flex items-center justify-center gap-1.5 text-[10px] text-amber-500 font-medium bg-amber-500/5 border border-amber-500/10 rounded-xl p-3">
                  <ShieldAlert className="h-4 w-4 flex-shrink-0" />
                  <span>Kargo işlemi için yukarıdaki tüm ürünlerin el terminaliyle doğrulanması gerekir.</span>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-slate-500 gap-3 py-20">
              <Truck className="h-12 w-12 opacity-20" />
              <p className="text-sm">İşlem yapmak için sol sıradan bir sevkiyat seçin</p>
            </div>
          )}
        </div>

        {/* ── RIGHT: Live Tracking Timeline ── */}
        <div className="col-span-12 lg:col-span-3 flex flex-col overflow-hidden bg-[#070A13]/40 backdrop-blur-md">
          <div className="p-4 border-b border-white/5 bg-[#090C16]">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              Canlı Kargo Takip Akışı
            </p>
            {active?.trackingNo && (
              <div className="mt-2 flex items-center gap-2">
                <span className="font-mono text-xs text-amber-300">{active.trackingNo}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 border border-white/5 text-slate-400 font-bold uppercase">
                  {active.provider}
                </span>
              </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
            {active && active.trackingEvents.length > 0 ? (
              <div className="space-y-6">
                {[...active.trackingEvents].map((ev, i, arr) => (
                  <div key={i} className="relative flex gap-3">
                    {i < arr.length - 1 && (
                      <div className="absolute left-[7px] top-5 bottom-[-24px] w-[2px] bg-white/5" />
                    )}
                    <div className={`relative z-10 w-3.5 h-3.5 mt-1 rounded-full border-2 bg-[#070A13] flex-shrink-0 flex items-center justify-center ${
                      i === 0 ? 'border-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.5)]' : 'border-slate-700'
                    }`}>
                      {i === 0 && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />}
                    </div>
                    <div>
                      <p className={`text-xs font-semibold ${i === 0 ? 'text-slate-100' : 'text-slate-300'}`}>
                        {ev.description}
                      </p>
                      {ev.location && (
                        <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                          📍 {ev.location}
                        </p>
                      )}
                      <p className="text-[9px] text-slate-500 mt-1 font-mono">
                        {new Date(ev.eventAt).toLocaleString("tr-TR", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-48 text-slate-600 gap-2">
                <Clock className="h-8 w-8 opacity-30" />
                <p className="text-xs">Bu sevkiyat için kargo çıkışı bekleniyor.</p>
              </div>
            )}

            {active && (
              <div className="mt-8 border-t border-white/5 pt-4">
                {active.trackingNo ? (
                  <a
                    href={`https://www.yurticikargo.com/tr/online-islemler/gonderi-sorgula?code=${active.trackingNo}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-semibold p-3 bg-amber-500/5 hover:bg-amber-500/10 border border-amber-500/10 rounded-xl transition-all"
                  >
                    Kargo Firması Web Takip
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                ) : (
                  <Button 
                    onClick={() => {
                      if (!activeAllVerified) {
                        toast.error("Önce tüm ürünleri doğrulayın!")
                        return
                      }
                      handleHandover()
                    }}
                    className="w-full text-xs font-bold bg-[#090C16] border border-white/5 hover:border-amber-500/30 hover:bg-slate-900 text-slate-200 h-10 rounded-xl transition-all"
                  >
                    Müşteri Kargo Kodu Üret
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
