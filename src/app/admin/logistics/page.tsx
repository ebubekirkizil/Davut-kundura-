"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Package, Printer, Truck, ScanLine, Search, CheckCircle2,
  Clock, ArrowUpRight, RefreshCw, Sparkles, ShieldCheck,
  MapPin
} from "lucide-react"
import { toast, Toaster } from "react-hot-toast"

// ─── Sound System (Web Audio API) ─────────────────────────────────────────────
function playSynthSound(type: "success" | "error") {
  if (typeof window === "undefined") return
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
    if (type === "success") {
      const osc1 = ctx.createOscillator(); const gain1 = ctx.createGain()
      osc1.connect(gain1); gain1.connect(ctx.destination)
      osc1.type = "sine"; osc1.frequency.setValueAtTime(880, ctx.currentTime)
      gain1.gain.setValueAtTime(0.1, ctx.currentTime)
      osc1.start(); gain1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1)
      osc1.stop(ctx.currentTime + 0.1)

      setTimeout(() => {
        const osc2 = ctx.createOscillator(); const gain2 = ctx.createGain()
        osc2.connect(gain2); gain2.connect(ctx.destination)
        osc2.type = "sine"; osc2.frequency.setValueAtTime(1046.5, ctx.currentTime)
        gain2.gain.setValueAtTime(0.1, ctx.currentTime)
        osc2.start(); gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15)
        osc2.stop(ctx.currentTime + 0.15)
      }, 80)
    } else {
      const osc = ctx.createOscillator(); const gain = ctx.createGain()
      osc.connect(gain); gain.connect(ctx.destination)
      osc.type = "sawtooth"; osc.frequency.setValueAtTime(150, ctx.currentTime)
      gain.gain.setValueAtTime(0.15, ctx.currentTime)
      osc.start(); gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3)
      osc.stop(ctx.currentTime + 0.3)
    }
  } catch (e) { console.error("Audio error", e) }
}

// ─── Types & Mock Data ────────────────────────────────────────────────────────
type DispatchStatus = "DRAFT" | "LABEL_READY" | "PRINTED" | "HANDED_OFF" | "IN_TRANSIT" | "DELIVERED" | "FAILED"

interface DispatchRow {
  id: string; orderNumber: string; orderType: "B2C" | "B2B"; customer: string;
  items: { name: string; qty: number; sku: string }[]; provider: string; providerSlug: string;
  status: DispatchStatus; grossKg: number; desiKg: number; packagePreset: string;
  trackingNo: string | null; createdAt: string;
  trackingEvents: { status: string; description: string; location: string; eventAt: string }[];
}

const INITIAL_MOCK: DispatchRow[] = [
  {
    id: "d1", orderNumber: "ORD-2026-8942", orderType: "B2C", customer: "Ahmet Yılmaz",
    items: [{ name: "Premium Deri Kemer — Executive", qty: 1, sku: "DK-001-BLK" }],
    provider: "Yurtiçi Kargo", providerSlug: "yurtici", status: "LABEL_READY",
    grossKg: 0.45, desiKg: 1.2, packagePreset: "Tekli Kemer Kutusu", trackingNo: "YK123456789TR", createdAt: "2026-05-17T14:30:00Z",
    trackingEvents: [{ status: "RECEIVED", description: "Kargo teslim alındı", location: "İstanbul / Merkez", eventAt: "2026-05-17T16:00:00Z" }]
  },
  {
    id: "d2", orderNumber: "ORD-2026-8941", orderType: "B2B", customer: "Koray Ayakkabıcılık",
    items: [{ name: "Executive Black", qty: 10, sku: "DK-001-BLK" }, { name: "Comfort Pro", qty: 5, sku: "DK-002-ORT" }],
    provider: "Ambar Nakliyat", providerSlug: "ambar", status: "DRAFT",
    grossKg: 68, desiKg: 120, packagePreset: "B2B Palet (120×80)", trackingNo: null, createdAt: "2026-05-17T09:15:00Z", trackingEvents: []
  },
  {
    id: "d3", orderNumber: "ORD-2026-8940", orderType: "B2C", customer: "Elif Demir",
    items: [{ name: "Klasik Loafer - Midnight", qty: 1, sku: "DK-009-LOF" }],
    provider: "Aras Kargo", providerSlug: "aras", status: "IN_TRANSIT",
    grossKg: 0.85, desiKg: 2.1, packagePreset: "Tekli Ayakkabı Kutusu", trackingNo: "ARS987654321", createdAt: "2026-05-16T16:45:00Z",
    trackingEvents: [{ status: "ON_VEHICLE", description: "Dağıtıma çıktı", location: "İzmir / Bornova", eventAt: "2026-05-17T08:30:00Z" }]
  },
]

const STATUS_CFG: Record<DispatchStatus, { label: string; dot: string; glow: string }> = {
  DRAFT:      { label: "Taslak",         dot: "bg-slate-400", glow: "" },
  LABEL_READY:{ label: "Etiket Hazır",   dot: "bg-amber-400", glow: "shadow-[0_0_8px_rgba(245,158,11,0.6)] animate-pulse" },
  PRINTED:    { label: "Yazdırıldı",     dot: "bg-blue-400",  glow: "shadow-[0_0_8px_rgba(96,165,250,0.6)]" },
  HANDED_OFF: { label: "Firmaya Teslim", dot: "bg-indigo-400",glow: "" },
  IN_TRANSIT: { label: "Yolda",          dot: "bg-violet-500",glow: "shadow-[0_0_8px_rgba(139,92,246,0.6)] animate-pulse" },
  DELIVERED:  { label: "Teslim Edildi",  dot: "bg-emerald-500",glow: "shadow-[0_0_8px_rgba(16,185,129,0.6)]" },
  FAILED:     { label: "Başarısız",      dot: "bg-rose-500",  glow: "shadow-[0_0_8px_rgba(244,63,94,0.6)]" },
}

export default function LogisticsDispatchPage() {
  const [mounted, setMounted] = useState(false)
  const [rows, setRows] = useState<DispatchRow[]>(INITIAL_MOCK)
  const [active, setActive] = useState<DispatchRow | null>(INITIAL_MOCK[0])
  const [search, setSearch] = useState("")
  const [barcodeInput, setBarcodeInput] = useState("")
  const [verifiedSkus, setVerifiedSkus] = useState<Record<string, number>>({})
  const [desiCalc, setDesiCalc] = useState({ w: 30, h: 20, d: 12 })
  const [isSyncing, setIsSyncing] = useState(false)
  const barcodeRef = useRef<HTMLInputElement>(null)

  useEffect(() => { setMounted(true) }, [])

  const filtered = rows.filter(r => r.orderNumber.toLowerCase().includes(search.toLowerCase()) || r.customer.toLowerCase().includes(search.toLowerCase()))
  const desiResult = (desiCalc.w * desiCalc.h * desiCalc.d) / 3000

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
      } else {
        toast.error("Ürün zaten tam doğrulandı!")
        playSynthSound("error")
      }
    } else {
      toast.error(`Geçersiz SKU! "${val}" bulunamadı.`)
      playSynthSound("error")
    }
    setBarcodeInput("")
  }

  const activeAllVerified = active ? active.items.every(i => (verifiedSkus[i.sku] || 0) >= i.qty) : false

  useEffect(() => { setVerifiedSkus({}) }, [active])

  const triggerSync = () => {
    setIsSyncing(true)
    const t = toast.loading("Kargo API'leri senkronize ediliyor...")
    setTimeout(() => {
      toast.dismiss(t)
      setIsSyncing(false)
      toast.success("Senkronizasyon Başarılı!")
    }, 2000)
  }

  const handlePrintLabel = () => {
    if (!activeAllVerified) return
    toast.success(`${active?.orderNumber} için ZPL Barkodu Zebra Yazıcıya Gönderildi! 🖨️`)
    playSynthSound("success")
    if (active) {
      setRows(prev => prev.map(r => r.id === active.id ? { ...r, status: "PRINTED" } : r))
    }
  }

  const handleHandover = () => {
    if (!activeAllVerified) return
    const randomTracking = active?.trackingNo || `YK${Math.floor(100000000 + Math.random() * 900000000)}TR`
    
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: `${active?.provider} API'den kargo kodu alınıyor...`,
        success: () => {
          setRows(prev => prev.map(r => r.id === active.id ? { 
            ...r, status: "IN_TRANSIT", trackingNo: randomTracking,
            trackingEvents: [{ status: "RECEIVED", description: "Depodan paket çıkışı yapıldı", location: "Pendik Depo", eventAt: new Date().toISOString() }, ...r.trackingEvents]
          } : r))
          playSynthSound("success")
          return `Kargo yola çıktı! Kod: ${randomTracking}`
        },
        error: "Kargo firması API sunucusu yanıt vermedi!"
      }
    )
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#030303] text-slate-900 dark:text-slate-100 font-sans selection:bg-amber-500/30 overflow-hidden relative">
      <Toaster position="top-right" />

      {/* ─── Animated Cinematic Background (Framer Motion) ─── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360, scale: [1, 1.2, 1] }} 
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-amber-400/5 dark:bg-amber-600/10 blur-[120px]"
        />
        <motion.div 
          animate={{ rotate: -360, scale: [1, 1.3, 1] }} 
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-blue-400/5 dark:bg-indigo-600/10 blur-[140px]"
        />
      </div>

      <div className="relative z-10 flex flex-col h-screen">
        {/* ─── Header ─── */}
        <header className="px-6 py-4 flex items-center justify-between border-b border-black/5 dark:border-white/5 bg-white/40 dark:bg-black/40 backdrop-blur-3xl shrink-0">
          <div className="flex items-center gap-4">
            <motion.div 
              whileHover={{ rotate: 180 }} transition={{ duration: 0.5, type: "spring" }}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.2)]"
            >
              <Truck className="h-5 w-5 text-white" />
            </motion.div>
            <div>
              <h1 className="text-xl font-black tracking-tight text-slate-900 dark:text-slate-100">
                Sevkiyat Kumanda
              </h1>
              <p className="text-[10px] font-bold tracking-widest text-amber-600 dark:text-amber-500 uppercase mt-0.5">
                Davut Kundura Depo Terminali
              </p>
            </div>
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={triggerSync}
            className="group relative overflow-hidden px-5 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-black font-bold text-xs flex items-center gap-2 shadow-md"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <RefreshCw className={`h-3.5 w-3.5 relative z-10 ${isSyncing ? 'animate-spin' : ''} group-hover:text-white transition-colors`} />
            <span className="relative z-10 group-hover:text-white transition-colors">Sistemi Güncelle</span>
          </motion.button>
        </header>

        {/* ─── Main Grid Layout ─── */}
        <div className="flex-1 flex overflow-hidden p-6 gap-6">
          
          {/* COLUMN 1: Ticket List */}
          <div className="w-[320px] flex flex-col gap-4 shrink-0">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Bilet Ara..."
                className="w-full h-11 pl-11 pr-4 bg-white/60 dark:bg-white/[0.03] border border-black/5 dark:border-white/5 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/50 backdrop-blur-xl transition-all"
              />
            </div>

            <div className="flex-1 overflow-y-auto hide-scrollbar space-y-3 pb-20">
              <AnimatePresence>
                {filtered.map((row, i) => {
                  const isActive = active?.id === row.id
                  const cfg = STATUS_CFG[row.status]
                  return (
                    <motion.div
                      key={row.id}
                      layoutId={`ticket-${row.id}`}
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05, type: "spring", stiffness: 100 }}
                      onClick={() => setActive(row)}
                      className={`relative cursor-pointer group rounded-2xl overflow-hidden backdrop-blur-2xl transition-all duration-300 ${
                        isActive 
                          ? "bg-white dark:bg-[#111] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] border border-amber-500/30" 
                          : "bg-white/40 dark:bg-white/[0.02] border border-black/5 dark:border-white/5 hover:bg-white/80 dark:hover:bg-white/[0.05]"
                      }`}
                    >
                      {/* Ticket Notches */}
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-4 bg-[#F8F9FA] dark:bg-[#030303] rounded-r-full border-r border-y border-black/5 dark:border-white/5" />
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-4 bg-[#F8F9FA] dark:bg-[#030303] rounded-l-full border-l border-y border-black/5 dark:border-white/5" />
                      
                      {/* Active Line */}
                      {isActive && <motion.div layoutId="activeStripe" className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500" />}

                      <div className="p-4 pl-5 pr-5">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono text-[10px] font-bold text-slate-500">
                            {row.orderNumber}
                          </span>
                          <div className="flex items-center gap-1.5 bg-black/5 dark:bg-white/5 rounded-full px-2 py-0.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot} ${cfg.glow}`} />
                            <span className="text-[8px] font-bold uppercase tracking-wider">{cfg.label}</span>
                          </div>
                        </div>
                        
                        <h3 className="text-sm font-black tracking-tight mb-3">{row.customer}</h3>
                        
                        <div className="flex items-center gap-3 pt-3 border-t border-dashed border-black/10 dark:border-white/10">
                          <span className="text-[10px] font-bold px-2 py-0.5 bg-black/5 dark:bg-white/5 rounded text-slate-600 dark:text-slate-300">
                            {row.provider}
                          </span>
                          <span className="text-[10px] font-mono font-medium text-slate-500 ml-auto">
                            {row.desiKg} Desi
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* COLUMN 2: Verification Terminal & Desi */}
          <div className="flex-1 flex flex-col gap-6">
            <AnimatePresence mode="wait">
              {active ? (
                <motion.div 
                  key={active.id}
                  initial={{ opacity: 0, scale: 0.98, filter: "blur(5px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.02, filter: "blur(5px)" }}
                  transition={{ duration: 0.3, type: "spring", bounce: 0 }}
                  className="flex-1 relative flex flex-col gap-6"
                >
                  {/* TERMINAL CARD */}
                  <div className="bg-white/70 dark:bg-white/[0.02] backdrop-blur-2xl rounded-3xl p-6 border border-black/5 dark:border-white/5 shadow-sm dark:shadow-[0_0_30px_rgba(0,0,0,0.5)] flex flex-col gap-6 flex-1">
                    
                    <div className="flex items-start justify-between">
                      <div>
                        <motion.h2 layoutId={`title-${active.id}`} className="text-2xl font-black tracking-tighter mb-1">
                          {active.orderNumber}
                        </motion.h2>
                        <p className="text-slate-500 text-sm font-medium flex items-center gap-2">
                          {active.customer} <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" /> {active.orderType}
                        </p>
                      </div>
                      {activeAllVerified && (
                        <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} type="spring" className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                          <ShieldCheck className="h-5 w-5 text-white" />
                        </motion.div>
                      )}
                    </div>

                    {/* Scanner Input (Without Sweep Animation) */}
                    <div className="relative">
                      <ScanLine className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-amber-500 opacity-50 transition-opacity" />
                      <input
                        ref={barcodeRef} value={barcodeInput} onChange={e => setBarcodeInput(e.target.value)} onKeyDown={handleBarcode}
                        disabled={activeAllVerified} autoFocus
                        placeholder="SKU OKUTUN VEYA YAZIN..."
                        className="w-full h-14 pl-12 pr-6 bg-black/5 dark:bg-black/40 border border-black/10 dark:border-white/10 focus:border-amber-500/50 rounded-2xl text-sm font-mono font-bold tracking-widest uppercase focus:outline-none focus:bg-white dark:focus:bg-[#0A0A0A] transition-all disabled:opacity-50 shadow-inner"
                      />
                    </div>

                    {/* SKU Checklist */}
                    <div className="flex-1 space-y-2 overflow-y-auto hide-scrollbar">
                      {active.items.map((item, idx) => {
                        const count = verifiedSkus[item.sku] || 0
                        const isDone = count >= item.qty
                        return (
                          <motion.div 
                            key={item.sku}
                            initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }}
                            className={`p-4 rounded-xl flex items-center justify-between border transition-colors ${
                              isDone ? "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20" 
                                : count > 0 ? "bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20"
                                : "bg-white dark:bg-white/[0.02] border-black/5 dark:border-white/5"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isDone ? "bg-emerald-500 text-white" : "border-2 border-slate-200 dark:border-slate-700"}`}>
                                {isDone && <CheckCircle2 className="h-3.5 w-3.5" />}
                              </div>
                              <div>
                                <p className={`font-bold text-sm ${isDone ? 'text-emerald-900 dark:text-emerald-100' : ''}`}>{item.name}</p>
                                <p className="font-mono text-[10px] text-slate-500 mt-0.5">{item.sku}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className={`font-mono text-lg font-black ${isDone ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'}`}>
                                {count} <span className="text-xs text-slate-400">/ {item.qty}</span>
                              </p>
                            </div>
                          </motion.div>
                        )
                      })}
                    </div>
                  </div>

                  {/* DESI CALCULATOR CARD */}
                  <div className="bg-white/70 dark:bg-white/[0.02] backdrop-blur-2xl rounded-3xl p-5 border border-black/5 dark:border-white/5 shadow-sm dark:shadow-[0_0_30px_rgba(0,0,0,0.5)] shrink-0">
                    <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                      <Package className="h-4 w-4 text-amber-500" />
                      Hacim & Desi Hesaplayıcı
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-1 grid grid-cols-3 gap-2">
                        {(["w", "h", "d"] as const).map((dim, idx) => (
                          <div key={dim} className="space-y-1">
                            <label className="text-[9px] uppercase font-bold text-slate-400">{["En", "Boy", "Yük"][idx]} (cm)</label>
                            <input
                              type="number" value={desiCalc[dim]} onChange={e => setDesiCalc(p => ({ ...p, [dim]: Number(e.target.value) }))}
                              className="w-full h-9 bg-black/5 dark:bg-black/40 border border-black/10 dark:border-white/10 rounded-lg text-center font-mono text-xs focus:border-amber-500 focus:outline-none transition-all"
                            />
                          </div>
                        ))}
                      </div>
                      <div className="w-[120px] bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-xl p-2 text-center flex flex-col justify-center">
                        <p className="text-[9px] uppercase font-bold text-amber-700 dark:text-amber-400">Fatura Kütlesi</p>
                        <p className="text-lg font-black font-mono text-amber-600 dark:text-amber-500 mt-0.5">
                          {Math.max(active.grossKg, desiResult).toFixed(2)} kg
                        </p>
                      </div>
                    </div>
                  </div>

                </motion.div>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="flex flex-col items-center opacity-30">
                    <ScanLine className="h-16 w-16 mb-4" />
                    <p className="text-lg font-bold tracking-widest">BİLET BEKLENİYOR</p>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* COLUMN 3: Tracking & Actions */}
          <div className="w-[340px] flex flex-col gap-6 shrink-0">
            {active ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col gap-6"
              >
                {/* TRACKING TIMELINE */}
                <div className="bg-white/70 dark:bg-white/[0.02] backdrop-blur-2xl rounded-3xl p-6 border border-black/5 dark:border-white/5 shadow-sm dark:shadow-[0_0_30px_rgba(0,0,0,0.5)] flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-6 text-xs font-bold uppercase tracking-wider text-slate-500">
                    <Sparkles className="h-4 w-4 text-amber-500" />
                    Canlı Takip Akışı
                  </div>

                  <div className="flex-1 overflow-y-auto hide-scrollbar relative">
                    {active.trackingEvents.length > 0 ? (
                      <div className="space-y-6">
                        {active.trackingEvents.map((ev, i, arr) => (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                            key={i} className="relative flex gap-4"
                          >
                            {i < arr.length - 1 && <div className="absolute left-[9px] top-6 bottom-[-24px] w-[2px] bg-slate-200 dark:bg-white/10" />}
                            <div className={`relative z-10 w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center border-2 ${
                              i === 0 ? 'border-amber-500 bg-white dark:bg-[#0A0A0A] shadow-[0_0_10px_rgba(245,158,11,0.3)]' : 'border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-900'
                            }`}>
                              {i === 0 && <span className="w-2 h-2 rounded-full bg-amber-500" />}
                            </div>
                            <div>
                              <p className={`text-sm font-bold ${i === 0 ? 'text-slate-900 dark:text-slate-100' : 'text-slate-500 dark:text-slate-400'}`}>
                                {ev.description}
                              </p>
                              <p className="text-[10px] font-medium text-slate-400 flex items-center gap-1 mt-1"><MapPin className="h-3 w-3" /> {ev.location}</p>
                              <p className="text-[10px] font-mono text-slate-400 mt-0.5">{new Date(ev.eventAt).toLocaleString("tr-TR")}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-3 opacity-50">
                        <Clock className="h-8 w-8" />
                        <p className="text-xs font-medium">Hareket bekleniyor</p>
                      </div>
                    )}
                  </div>
                  
                  {active.trackingNo && (
                    <div className="mt-4 pt-4 border-t border-black/5 dark:border-white/5">
                      <a href="#" className="flex items-center justify-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 hover:text-amber-500 bg-amber-50 dark:bg-amber-500/10 p-3 rounded-xl transition-colors">
                        Kargo Firması Web Takip <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  )}
                </div>

                {/* ACTIONS */}
                <div className="flex flex-col gap-3 shrink-0">
                  <motion.button 
                    whileHover={{ scale: activeAllVerified ? 1.02 : 1 }} whileTap={{ scale: activeAllVerified ? 0.98 : 1 }}
                    onClick={handlePrintLabel} disabled={!activeAllVerified}
                    className="h-12 rounded-2xl bg-white/70 dark:bg-white/[0.05] border border-black/10 dark:border-white/10 font-bold flex items-center justify-center gap-2 disabled:opacity-50 hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-sm"
                  >
                    <Printer className="h-4 w-4" /> Etiket Yazdır (ZPL)
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: activeAllVerified ? 1.02 : 1 }} whileTap={{ scale: activeAllVerified ? 0.98 : 1 }}
                    onClick={handleHandover} disabled={!activeAllVerified}
                    className="h-12 rounded-2xl bg-amber-500 text-white dark:text-black font-black flex items-center justify-center gap-2 disabled:opacity-50 disabled:bg-slate-300 dark:disabled:bg-slate-800 shadow-lg text-sm"
                  >
                    <Truck className="h-5 w-5" /> Kargo Çıkışı Yap
                  </motion.button>
                </div>
              </motion.div>
            ) : null}
          </div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  )
}
