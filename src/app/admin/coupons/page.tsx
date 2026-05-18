"use client"

import React, { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Tag, Plus, RefreshCw, Search, Trash2, ToggleLeft, ToggleRight,
  Clock, Users, Percent, DollarSign, Truck, Copy, Check, X,
  Activity, ArrowUpRight, CheckCircle2, AlertTriangle
} from "lucide-react"

// ─── Interfaces ─────────────────────────────────────────────────────────────
interface Coupon {
  id: string; code: string; description: string | null; type: string
  value: number; maxDiscount: number | null; minOrderAmount: number | null
  applicableCategories: string[]; applicableProductIds: string[]
  maxUses: number | null; perUserLimit: number; usedCount: number
  startsAt: string; expiresAt: string | null; isActive: boolean
  totalDiscountGiven: number; usageCount: number; orderCount: number
  isExpired: boolean; isLimitReached: boolean
  user: { name: string | null; email: string | null } | null
  createdAt: string
}

// ─── Constants & Mock Data ──────────────────────────────────────────────────
const typeIcons: Record<string, any> = { PERCENTAGE: Percent, FIXED: DollarSign, FREE_SHIP: Truck }
const typeColors: Record<string, string> = {
  PERCENTAGE: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  FIXED: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  FREE_SHIP: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
}

const MOCK_COUPONS: Coupon[] = [
  {
    id: "mock1", code: "YAZ20", description: "2026 Yaz Sezonu %20 İndirimi", type: "PERCENTAGE",
    value: 20, maxDiscount: 500, minOrderAmount: 1000, applicableCategories: [], applicableProductIds: [],
    maxUses: 500, perUserLimit: 1, usedCount: 142, startsAt: new Date().toISOString(), expiresAt: new Date(Date.now() + 864000000).toISOString(),
    isActive: true, totalDiscountGiven: 12500, usageCount: 142, orderCount: 142,
    isExpired: false, isLimitReached: false, user: null, createdAt: new Date().toISOString()
  },
  {
    id: "mock2", code: "HOSGELDIN", description: "İlk Alışverişe Özel Sabit 100₺", type: "FIXED",
    value: 100, maxDiscount: null, minOrderAmount: 500, applicableCategories: [], applicableProductIds: [],
    maxUses: null, perUserLimit: 1, usedCount: 890, startsAt: new Date(Date.now() - 864000000).toISOString(), expiresAt: null,
    isActive: true, totalDiscountGiven: 89000, usageCount: 890, orderCount: 890,
    isExpired: false, isLimitReached: false, user: null, createdAt: new Date().toISOString()
  },
  {
    id: "mock3", code: "VIP-KARGO", description: "Özel Müşteriler İçin Ücretsiz Kargo", type: "FREE_SHIP",
    value: 0, maxDiscount: null, minOrderAmount: 250, applicableCategories: [], applicableProductIds: [],
    maxUses: 1000, perUserLimit: 5, usedCount: 1000, startsAt: new Date().toISOString(), expiresAt: new Date(Date.now() - 100000).toISOString(),
    isActive: false, totalDiscountGiven: 45000, usageCount: 1000, orderCount: 1000,
    isExpired: true, isLimitReached: true, user: null, createdAt: new Date().toISOString()
  }
]

function formatDate(d: string) { return new Date(d).toLocaleDateString("tr-TR", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute:"2-digit" }) }

export default function AdminCouponsPage() {
  const [mounted, setMounted] = useState(false)
  const [coupons, setCoupons] = useState<Coupon[]>(MOCK_COUPONS)
  const [isFetching, setIsFetching] = useState(false)
  const [search, setSearch] = useState("")
  const [showCreate, setShowCreate] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // Form
  const [fCode, setFCode] = useState(""); const [fDesc, setFDesc] = useState("")
  const [fType, setFType] = useState("PERCENTAGE"); const [fValue, setFValue] = useState("")
  const [fMaxDiscount, setFMaxDiscount] = useState(""); const [fMinOrder, setFMinOrder] = useState("")
  const [fMaxUses, setFMaxUses] = useState(""); const [fPerUser, setFPerUser] = useState("1")
  const [fStartsAt, setFStartsAt] = useState(""); const [fExpiresAt, setFExpiresAt] = useState("")
  const [submitting, setSubmitting] = useState(false)

  // Framer config
  const containerVars = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } }
  const itemVars = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120 } } }

  const fetchCoupons = useCallback(async () => {
    setIsFetching(true)
    try {
      const res = await fetch("/api/admin/coupons")
      const data = await res.json()
      if (data.coupons && data.coupons.length > 0) {
        setCoupons(data.coupons) // override mocks if real data exists
      }
    } catch { /* keep mocks on error */ } finally { setIsFetching(false) }
  }, [])

  useEffect(() => { 
    setMounted(true)
    fetchCoupons() 
  }, [fetchCoupons])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!fCode || !fValue) return
    setSubmitting(true)
    try {
      const res = await fetch("/api/admin/coupons", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: fCode, description: fDesc || undefined, type: fType, value: fValue,
          maxDiscount: fMaxDiscount || undefined, minOrderAmount: fMinOrder || undefined,
          maxUses: fMaxUses || undefined, perUserLimit: fPerUser || "1",
          startsAt: fStartsAt || undefined, expiresAt: fExpiresAt || undefined,
        }),
      })
      if (!res.ok) throw new Error("Hata oluştu")
      setShowCreate(false)
      setFCode(""); setFDesc(""); setFValue(""); setFMaxDiscount("")
      setFMinOrder(""); setFMaxUses(""); setFPerUser("1"); setFStartsAt(""); setFExpiresAt("")
      fetchCoupons()
    } catch (err: any) { alert("Sunucu Hatası: " + err.message) } finally { setSubmitting(false) }
  }

  const toggleActive = async (c: Coupon) => {
    // Optimistic UI update
    setCoupons(prev => prev.map(item => item.id === c.id ? { ...item, isActive: !item.isActive } : item))
    await fetch("/api/admin/coupons", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: c.id, isActive: !c.isActive }) })
  }

  const deleteCoupon = async (id: string) => {
    if (!confirm("Kuponu kalıcı olarak silmek istiyor musunuz?")) return
    setCoupons(prev => prev.filter(item => item.id !== id))
    await fetch(`/api/admin/coupons?id=${id}`, { method: "DELETE" })
  }

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const filtered = coupons.filter((c) => !search || c.code.toLowerCase().includes(search.toLowerCase()) || (c.description?.toLowerCase().includes(search.toLowerCase()) ?? false))
  const activeCoupons = coupons.filter((c) => c.isActive && !c.isExpired && !c.isLimitReached)
  const totalCost = coupons.reduce((s, c) => s + c.totalDiscountGiven, 0)

  if (!mounted) return null

  return (
    <div className="space-y-8 font-sans pb-10 selection:bg-amber-500/30">
      
      {/* ─── Header ─── */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-serif font-black bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
            Kupon & Promosyon Ağı
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg font-medium">
            Müşteri indirimleri, kampanya motoru ve kullanım analizi.
          </p>
        </div>
        <div className="flex gap-3">
          <motion.button 
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={fetchCoupons}
            className="h-11 px-4 rounded-xl bg-white/60 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 text-slate-800 dark:text-slate-200 font-bold transition-all shadow-sm flex items-center justify-center"
          >
            <RefreshCw className={`h-4 w-4 text-slate-500 ${isFetching ? 'animate-spin text-amber-500' : ''}`} />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowCreate(true)}
            className="h-11 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-lg shadow-amber-500/25 font-bold flex items-center gap-2 border-0"
          >
            <Plus className="h-4 w-4" /> Yeni Kampanya Yarat
          </motion.button>
        </div>
      </motion.div>

      <motion.div variants={containerVars} initial="hidden" animate="show" className="space-y-8">
        
        {/* ─── KPI Cards ─── */}
        <div className="grid gap-6 md:grid-cols-4">
          {[
            { title: "Sistemdeki Toplam Kupon", value: coupons.length, icon: Tag, grad: "from-blue-500 to-indigo-600", color: "text-blue-600" },
            { title: "Aktif ve Geçerli Kampanya", value: activeCoupons.length, icon: Activity, grad: "from-emerald-500 to-green-600", color: "text-emerald-600" },
            { title: "Toplam Kupon Kullanımı", value: coupons.reduce((s, c) => s + c.usedCount, 0), icon: Users, grad: "from-purple-500 to-violet-600", color: "text-purple-600" },
            { title: "Toplam İndirim Maliyeti", value: `₺${totalCost.toLocaleString("tr-TR")}`, icon: DollarSign, grad: "from-amber-500 to-orange-600", color: "text-amber-600" },
          ].map((kpi, i) => (
            <motion.div key={kpi.title} variants={itemVars} whileHover={{ y: -5 }}>
              <div className="bg-white/70 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/80 dark:border-white/5 shadow-lg shadow-slate-200/20 dark:shadow-black/40 rounded-3xl p-5 relative overflow-hidden group">
                <div className={`absolute inset-0 bg-gradient-to-br ${kpi.grad} opacity-0 group-hover:opacity-[0.03] dark:group-hover:opacity-[0.08] transition-opacity duration-500`} />
                <div className="relative z-10 flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 max-w-[120px]">{kpi.title}</span>
                  <div className={`p-2.5 rounded-xl bg-gradient-to-br ${kpi.grad} shadow-lg shadow-black/10`}>
                    <kpi.icon className="h-4 w-4 text-white" />
                  </div>
                </div>
                <p className="relative z-10 text-3xl font-black font-mono text-slate-900 dark:text-slate-100 tracking-tight">{kpi.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ─── Search & List ─── */}
        <motion.div variants={itemVars}>
          <div className="bg-white/70 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/80 dark:border-white/5 shadow-lg shadow-slate-200/20 dark:shadow-black/40 rounded-3xl overflow-hidden flex flex-col min-h-[400px]">
            
            {/* Search Bar */}
            <div className="p-5 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-black/20 flex items-center gap-3">
              <Search className="h-5 w-5 text-slate-400" />
              <input 
                type="text" placeholder="Kupon kodu (örn: YAZ20) veya açıklama ara..." value={search} onChange={(e) => setSearch(e.target.value)} 
                className="flex-1 text-sm font-medium outline-none bg-transparent text-slate-900 dark:text-slate-100 placeholder:text-slate-400" 
              />
              <Badge className="bg-slate-200 text-slate-700 dark:bg-white/10 dark:text-slate-300 font-bold hover:bg-slate-200 shadow-none border-0">
                {filtered.length} Sonuç
              </Badge>
            </div>

            {/* List */}
            <div className="flex-1 divide-y divide-slate-100 dark:divide-white/5">
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full py-20 text-slate-400 opacity-60">
                  <Tag className="h-16 w-16 mb-4" />
                  <p className="font-bold text-lg">Kupon Bulunamadı</p>
                </div>
              ) : filtered.map((c, i) => {
                const Icon = typeIcons[c.type] || Tag
                const isPassive = !c.isActive
                const statusColor = isPassive ? "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700" 
                  : c.isExpired ? "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400 border-rose-200 dark:border-rose-500/20" 
                  : c.isLimitReached ? "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border-amber-200 dark:border-amber-500/20" 
                  : "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.2)]"
                
                const statusText = isPassive ? "Pasif" : c.isExpired ? "Süresi Dolmuş" : c.isLimitReached ? "Limit Doldu" : "Aktif"
                const StatusIcon = isPassive ? Clock : c.isExpired ? AlertTriangle : c.isLimitReached ? Users : CheckCircle2

                return (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                    key={c.id} 
                    className={`flex flex-col md:flex-row md:items-center justify-between p-5 gap-6 transition-all duration-300 hover:bg-slate-50 dark:hover:bg-white/[0.02] ${isPassive ? 'opacity-60 grayscale-[50%]' : ''}`}
                  >
                    
                    {/* Left: Info */}
                    <div className="flex items-start md:items-center gap-5 flex-1 min-w-0">
                      <div className={`p-3 rounded-2xl border ${typeColors[c.type] || "bg-slate-100"} shadow-inner`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="min-w-0 space-y-1.5">
                        <div className="flex flex-wrap items-center gap-3">
                          <code className="text-lg font-black font-mono text-slate-900 dark:text-slate-100 tracking-widest">{c.code}</code>
                          <button onClick={() => copyCode(c.code, c.id)} className="text-slate-400 hover:text-amber-500 bg-black/5 dark:bg-white/5 p-1 rounded-md transition-colors" title="Kodu Kopyala">
                            {copiedId === c.id ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                          </button>
                          <span className={`flex items-center gap-1 text-[10px] font-black uppercase px-2 py-0.5 rounded border ${statusColor}`}>
                            <StatusIcon className="h-3 w-3" /> {statusText}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400 line-clamp-1">
                          {c.type === "PERCENTAGE" ? `%${c.value} indirim` : c.type === "FIXED" ? `₺${c.value} sabit indirim` : "Ücretsiz kargo"}
                          {c.minOrderAmount ? <span className="text-slate-400"> • Min Alt Limit: ₺{c.minOrderAmount}</span> : ""}
                          {c.maxDiscount ? <span className="text-slate-400"> • Tavan: ₺{c.maxDiscount}</span> : ""}
                        </p>
                        {c.description && <p className="text-xs text-slate-500 italic flex items-center gap-1"><Tag className="h-3 w-3" /> {c.description}</p>}
                      </div>
                    </div>

                    {/* Right: Stats & Actions */}
                    <div className="flex items-center gap-6 md:gap-8 justify-between md:justify-end border-t md:border-t-0 border-slate-100 dark:border-white/5 pt-4 md:pt-0">
                      
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="font-mono font-black text-slate-900 dark:text-slate-100 text-lg">
                            {c.usedCount}<span className="text-slate-400 text-sm font-medium">{c.maxUses ? `/${c.maxUses}` : ""}</span>
                          </p>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Kullanım</p>
                        </div>
                        <div className="text-center w-px h-8 bg-slate-200 dark:bg-white/10 hidden sm:block" />
                        <div className="text-center hidden sm:block">
                          <p className="font-mono font-black text-amber-600 dark:text-amber-500 text-lg">
                            ₺{c.totalDiscountGiven.toLocaleString("tr-TR")}
                          </p>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Maliyet</p>
                        </div>
                        <div className="text-center w-px h-8 bg-slate-200 dark:bg-white/10 hidden sm:block" />
                        <div className="text-center hidden lg:block">
                          <p className="font-mono font-black text-slate-700 dark:text-slate-300 text-sm">
                            {c.expiresAt ? formatDate(c.expiresAt) : "Süresiz"}
                          </p>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Bitiş Tarihi</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => toggleActive(c)} className={`p-2.5 rounded-xl border transition-colors ${c.isActive ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100' : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-200'}`} title={c.isActive ? "Pasifleştir" : "Aktifleştir"}>
                          {c.isActive ? <ToggleRight className="h-5 w-5" /> : <ToggleLeft className="h-5 w-5" />}
                        </motion.button>
                        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => deleteCoupon(c.id)} className="p-2.5 rounded-xl border border-transparent hover:border-rose-200 dark:hover:border-rose-500/30 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors">
                          <Trash2 className="h-5 w-5" />
                        </motion.button>
                      </div>

                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.div>

      </motion.div>

      {/* ─── Create Modal ─── */}
      <AnimatePresence>
        {showCreate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowCreate(false)} />
            
            <motion.form 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onSubmit={handleCreate} 
              className="relative bg-white dark:bg-[#0A0A0A] border border-slate-200 dark:border-white/10 rounded-[32px] shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-slate-100 dark:border-white/5 flex items-center justify-between bg-slate-50/50 dark:bg-white/[0.02]">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">Gelişmiş Kupon Oluştur</h2>
                  <p className="text-xs font-medium text-slate-500 mt-1">Sisteme yeni bir promosyon kuralı ekleyin.</p>
                </div>
                <button type="button" onClick={() => setShowCreate(false)} className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-white/20 transition-colors">
                  <X className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto hide-scrollbar space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Kupon Kodu *</label>
                    <input type="text" value={fCode} onChange={(e) => setFCode(e.target.value.toUpperCase())} required placeholder="Örn: YAZ20" className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-lg font-mono font-black tracking-widest text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-700 focus:outline-none focus:border-amber-500 transition-colors uppercase" />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Müşteri Açıklaması</label>
                    <input type="text" value={fDesc} onChange={(e) => setFDesc(e.target.value)} placeholder="Müşterilere gösterilecek kampanya metni..." className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors" />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">İndirim Tipi *</label>
                    <select value={fType} onChange={(e) => setFType(e.target.value)} className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors appearance-none">
                      <option value="PERCENTAGE">Yüzde İndirimi (%)</option>
                      <option value="FIXED">Sabit Sepet İndirimi (₺)</option>
                      <option value="FREE_SHIP">Ücretsiz Kargo</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">{fType === "PERCENTAGE" ? "İndirim Yüzdesi (%)" : fType === "FIXED" ? "Tutar (₺)" : "Değer"} *</label>
                    <input type="number" step="0.01" value={fValue} onChange={(e) => setFValue(e.target.value)} required className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-black font-mono text-amber-600 dark:text-amber-500 focus:outline-none focus:border-amber-500 transition-colors" />
                  </div>

                  {fType === "PERCENTAGE" && (
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Max İndirim Tavanı (₺)</label>
                      <input type="number" value={fMaxDiscount} onChange={(e) => setFMaxDiscount(e.target.value)} placeholder="Limitsiz" className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors" />
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Sepet Alt Limiti (₺)</label>
                    <input type="number" value={fMinOrder} onChange={(e) => setFMinOrder(e.target.value)} placeholder="0" className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors" />
                  </div>
                  
                  <div className="pt-4 border-t border-slate-100 dark:border-white/5 md:col-span-2" />

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Toplam Kullanım Limiti</label>
                    <input type="number" value={fMaxUses} onChange={(e) => setFMaxUses(e.target.value)} placeholder="Sınırsız" className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors" />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Kişi Başı Limit</label>
                    <input type="number" value={fPerUser} onChange={(e) => setFPerUser(e.target.value)} placeholder="1" min="1" className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors" />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Geçerlilik (Başlangıç)</label>
                    <input type="datetime-local" value={fStartsAt} onChange={(e) => setFStartsAt(e.target.value)} className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors" />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Bitiş Tarihi</label>
                    <input type="datetime-local" value={fExpiresAt} onChange={(e) => setFExpiresAt(e.target.value)} className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors" />
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02] flex gap-4">
                <button type="button" onClick={() => setShowCreate(false)} className="flex-1 py-4 border border-slate-200 dark:border-white/10 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
                  İptal Et
                </button>
                <button type="submit" disabled={submitting} className="flex-[2] py-4 bg-amber-500 text-white rounded-xl text-sm font-black hover:bg-amber-600 disabled:opacity-50 transition-colors shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2">
                  {submitting ? <RefreshCw className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
                  {submitting ? "KAYDEDİLİYOR..." : "KAMPANYAYI YAYINLA"}
                </button>
              </div>
            </motion.form>
          </div>
        )}
      </AnimatePresence>
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  )
}
