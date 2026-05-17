"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Package, Printer, Truck, ScanLine, Search, CheckCircle2,
  Clock, ArrowUpRight, RefreshCw, LayoutGrid, Sparkles, ShieldCheck
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
  LABEL_READY:{ label: "Etiket Hazır",   dot: "bg-amber-400", glow: "shadow-[0_0_12px_rgba(245,158,11,0.8)] animate-pulse" },
  PRINTED:    { label: "Yazdırıldı",     dot: "bg-blue-400",  glow: "shadow-[0_0_12px_rgba(96,165,250,0.8)]" },
  HANDED_OFF: { label: "Firmaya Teslim", dot: "bg-indigo-400",glow: "" },
  IN_TRANSIT: { label: "Yolda",          dot: "bg-violet-500",glow: "shadow-[0_0_12px_rgba(139,92,246,0.8)] animate-pulse" },
  DELIVERED:  { label: "Teslim Edildi",  dot: "bg-emerald-500",glow: "shadow-[0_0_12px_rgba(16,185,129,0.8)]" },
  FAILED:     { label: "Başarısız",      dot: "bg-rose-500",  glow: "shadow-[0_0_12px_rgba(244,63,94,0.8)]" },
}

// ─── Awwwards-Level Page Component ─────────────────────────────────────────────
export default function LogisticsDispatchPage() {
  const [mounted, setMounted] = useState(false)
  const [rows, setRows] = useState<DispatchRow[]>(INITIAL_MOCK)
  const [active, setActive] = useState<DispatchRow | null>(INITIAL_MOCK[0])
  const [search, setSearch] = useState("")
  const [barcodeInput, setBarcodeInput] = useState("")
  const [verifiedSkus, setVerifiedSkus] = useState<Record<string, number>>({})
  const [isSyncing, setIsSyncing] = useState(false)
  const barcodeRef = useRef<HTMLInputElement>(null)

  useEffect(() => { setMounted(true) }, [])

  const filtered = rows.filter(r => r.orderNumber.toLowerCase().includes(search.toLowerCase()) || r.customer.toLowerCase().includes(search.toLowerCase()))

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

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#030303] text-slate-900 dark:text-slate-100 font-sans selection:bg-amber-500/30 overflow-hidden relative">
      <Toaster position="top-right" />

      {/* ─── Animated Cinematic Background (Framer Motion) ─── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360, scale: [1, 1.2, 1] }} 
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-amber-400/10 dark:bg-amber-600/10 blur-[120px]"
        />
        <motion.div 
          animate={{ rotate: -360, scale: [1, 1.3, 1] }} 
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-blue-400/10 dark:bg-indigo-600/10 blur-[140px]"
        />
      </div>

      <div className="relative z-10 flex flex-col h-screen">
        {/* ─── Ultra-Premium Header ─── */}
        <header className="px-8 py-6 flex items-center justify-between border-b border-black/5 dark:border-white/5 bg-white/40 dark:bg-black/40 backdrop-blur-3xl">
          <div className="flex items-center gap-5">
            <motion.div 
              whileHover={{ rotate: 180 }} transition={{ duration: 0.5, type: "spring" }}
              className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.3)]"
            >
              <Truck className="h-6 w-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">
                Sevkiyat Kumanda
              </h1>
              <p className="text-xs font-semibold tracking-widest text-amber-600 dark:text-amber-400 uppercase mt-1">
                Davut Kundura Depo Terminali
              </p>
            </div>
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={triggerSync}
            className="group relative overflow-hidden px-6 py-2.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-black font-bold text-xs flex items-center gap-2 shadow-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <RefreshCw className={`h-4 w-4 relative z-10 ${isSyncing ? 'animate-spin' : ''} group-hover:text-white transition-colors`} />
            <span className="relative z-10 group-hover:text-white transition-colors">Sistemi Güncelle</span>
          </motion.button>
        </header>

        {/* ─── Main Grid Layout ─── */}
        <div className="flex-1 flex overflow-hidden p-6 gap-6">
          
          {/* LEFT: Ticket List */}
          <div className="w-[380px] flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Bilet Ara..."
                className="w-full h-12 pl-11 pr-4 bg-white/60 dark:bg-white/[0.03] border border-black/5 dark:border-white/5 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 backdrop-blur-xl transition-all"
              />
            </div>

            <div className="flex-1 overflow-y-auto hide-scrollbar space-y-4 pb-20">
              <AnimatePresence>
                {filtered.map((row, i) => {
                  const isActive = active?.id === row.id
                  const cfg = STATUS_CFG[row.status]
                  return (
                    <motion.div
                      key={row.id}
                      layoutId={`ticket-${row.id}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
                      onClick={() => setActive(row)}
                      className={`relative cursor-pointer group rounded-3xl overflow-hidden backdrop-blur-2xl transition-all duration-500 ${
                        isActive 
                          ? "bg-white dark:bg-[#111] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] border border-amber-500/30" 
                          : "bg-white/40 dark:bg-white/[0.02] border border-black/5 dark:border-white/5 hover:bg-white/80 dark:hover:bg-white/[0.05]"
                      }`}
                    >
                      {/* Artistic Ticket Notches */}
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-6 bg-[#F8F9FA] dark:bg-[#030303] rounded-r-full border-r border-y border-black/5 dark:border-white/5" />
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-6 bg-[#F8F9FA] dark:bg-[#030303] rounded-l-full border-l border-y border-black/5 dark:border-white/5" />
                      
                      {/* Left color stripe */}
                      {isActive && <motion.div layoutId="activeStripe" className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500" />}

                      <div className="p-5 pl-7 pr-7">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-mono text-xs font-bold text-slate-500 dark:text-slate-400">
                            {row.orderNumber}
                          </span>
                          <div className="flex items-center gap-1.5 bg-black/5 dark:bg-white/10 rounded-full px-2 py-1">
                            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot} ${cfg.glow}`} />
                            <span className="text-[9px] font-bold uppercase tracking-wider">{cfg.label}</span>
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-black tracking-tight mb-1">{row.customer}</h3>
                        
                        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-dashed border-black/10 dark:border-white/10">
                          <span className="text-xs font-bold px-2 py-1 bg-black/5 dark:bg-white/5 rounded-lg text-slate-600 dark:text-slate-300">
                            {row.provider}
                          </span>
                          <span className="text-xs font-mono font-medium text-slate-500 ml-auto">
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

          {/* CENTER: Cyber Terminal */}
          <div className="flex-1 flex flex-col gap-6">
            <AnimatePresence mode="wait">
              {active ? (
                <motion.div 
                  key={active.id}
                  initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                  transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
                  className="flex-1 relative flex flex-col"
                >
                  {/* Glowing border wrapper for Terminal */}
                  <div className={`relative p-[1px] rounded-[32px] overflow-hidden flex-1 flex flex-col transition-all duration-700 ${activeAllVerified ? "shadow-[0_0_50px_rgba(16,185,129,0.2)]" : "shadow-[0_0_50px_rgba(245,158,11,0.1)]"}`}>
                    {!activeAllVerified && (
                      <div className="absolute inset-[-50%] animate-[spin_6s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,rgba(245,158,11,0.3)_50%,transparent_100%)] opacity-50" />
                    )}
                    {activeAllVerified && (
                      <div className="absolute inset-[-50%] bg-[conic-gradient(from_90deg_at_50%_50%,rgba(16,185,129,0.2)_0%,rgba(16,185,129,0.5)_50%,rgba(16,185,129,0.2)_100%)] opacity-50" />
                    )}
                    
                    {/* Inner Terminal Glass */}
                    <div className="relative z-10 flex-1 bg-white/70 dark:bg-[#0A0A0A]/90 backdrop-blur-3xl rounded-[31px] p-8 flex flex-col">
                      
                      <div className="flex items-end justify-between mb-10">
                        <div>
                          <motion.h2 layoutId={`title-${active.id}`} className="text-4xl font-black tracking-tighter mb-2">
                            {active.orderNumber}
                          </motion.h2>
                          <p className="text-slate-500 font-medium text-lg flex items-center gap-2">
                            {active.customer} <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" /> {active.orderType}
                          </p>
                        </div>
                        {activeAllVerified && (
                          <motion.div 
                            initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} type="spring"
                            className="w-16 h-16 rounded-2xl bg-emerald-500 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.4)]"
                          >
                            <ShieldCheck className="h-8 w-8 text-white" />
                          </motion.div>
                        )}
                      </div>

                      {/* Giant Scanner Input */}
                      <div className="relative mb-10 group">
                        <ScanLine className="absolute left-6 top-1/2 -translate-y-1/2 h-8 w-8 text-amber-500 opacity-50 group-focus-within:opacity-100 transition-opacity" />
                        <input
                          ref={barcodeRef} value={barcodeInput} onChange={e => setBarcodeInput(e.target.value)} onKeyDown={handleBarcode}
                          disabled={activeAllVerified} autoFocus
                          placeholder="SKU OKUTUN VEYA YAZIN..."
                          className="w-full h-24 pl-20 pr-8 bg-black/5 dark:bg-white/[0.02] border-2 border-dashed border-black/10 dark:border-white/10 focus:border-amber-500/50 rounded-3xl text-2xl font-mono font-black tracking-widest uppercase focus:outline-none focus:bg-white dark:focus:bg-[#111] transition-all disabled:opacity-50"
                        />
                        {!activeAllVerified && (
                          <div className="absolute left-0 right-0 top-0 h-[2px] bg-amber-500 opacity-0 group-focus-within:opacity-100 animate-scanner shadow-[0_0_15px_rgba(245,158,11,1)] pointer-events-none" />
                        )}
                      </div>

                      {/* SKU List */}
                      <div className="flex-1 space-y-3">
                        {active.items.map((item, idx) => {
                          const count = verifiedSkus[item.sku] || 0
                          const isDone = count >= item.qty
                          return (
                            <motion.div 
                              key={item.sku}
                              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }}
                              className={`p-5 rounded-2xl flex items-center justify-between border ${
                                isDone 
                                  ? "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20" 
                                  : count > 0 
                                  ? "bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20"
                                  : "bg-white/50 dark:bg-white/[0.02] border-black/5 dark:border-white/5"
                              }`}
                            >
                              <div className="flex items-center gap-4">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDone ? "bg-emerald-500 text-white" : "border-2 border-slate-300 dark:border-slate-700"}`}>
                                  {isDone && <CheckCircle2 className="h-5 w-5" />}
                                </div>
                                <div>
                                  <p className={`font-bold text-lg ${isDone ? 'text-emerald-900 dark:text-emerald-100' : ''}`}>{item.name}</p>
                                  <p className="font-mono text-xs text-slate-500">{item.sku}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className={`font-mono text-2xl font-black ${isDone ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-300 dark:text-slate-700'}`}>
                                  {count} <span className="text-lg text-slate-400">/ {item.qty}</span>
                                </p>
                              </div>
                            </motion.div>
                          )
                        })}
                      </div>

                      {/* Action Bar */}
                      <div className="pt-6 mt-6 border-t border-black/5 dark:border-white/5 flex gap-4">
                        <motion.button 
                          whileHover={{ scale: activeAllVerified ? 1.02 : 1 }} whileTap={{ scale: activeAllVerified ? 0.98 : 1 }}
                          disabled={!activeAllVerified}
                          className="flex-1 h-14 rounded-2xl border-2 border-black/10 dark:border-white/10 font-bold flex items-center justify-center gap-2 disabled:opacity-50 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                        >
                          <Printer className="h-5 w-5" /> Etiket Yazdır
                        </motion.button>
                        <motion.button 
                          whileHover={{ scale: activeAllVerified ? 1.02 : 1 }} whileTap={{ scale: activeAllVerified ? 0.98 : 1 }}
                          disabled={!activeAllVerified}
                          className="flex-1 h-14 rounded-2xl bg-amber-500 text-white dark:text-black font-black text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:bg-slate-300 dark:disabled:bg-slate-800 shadow-xl"
                        >
                          <Truck className="h-6 w-6" /> Kargo Çıkışı Yap
                        </motion.button>
                      </div>

                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="flex flex-col items-center opacity-30">
                    <ScanLine className="h-24 w-24 mb-6" />
                    <p className="text-2xl font-bold tracking-widest">BİLET BEKLENİYOR</p>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes scanner {
          0% { top: 0; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scanner { animation: scanner 2.5s infinite cubic-bezier(0.4, 0, 0.2, 1); }
      `}} />
    </div>
  )
}
