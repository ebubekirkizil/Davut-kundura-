"use client"

import React, { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { 
  TrendingUp, TrendingDown, Wallet, Building2, CreditCard, 
  Plus, Tag, CheckCircle2, Clock, ArrowDownLeft, ArrowUpRight, 
  ChevronRight, AlertCircle, Settings, Layers, PieChart as PieIcon, 
  Users, DollarSign, Calculator, RefreshCw, FileCheck, Check,
  Calendar, Filter
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import BankPanel from "@/components/admin/BankPanel"

const AreaChart = dynamic(() => import("recharts").then(m => m.AreaChart), { ssr: false })
const Area = dynamic(() => import("recharts").then(m => m.Area), { ssr: false })
const BarChart = dynamic(() => import("recharts").then(m => m.BarChart), { ssr: false })
const Bar = dynamic(() => import("recharts").then(m => m.Bar), { ssr: false })
const PieChart = dynamic(() => import("recharts").then(m => m.PieChart), { ssr: false })
const Pie = dynamic(() => import("recharts").then(m => m.Pie), { ssr: false })
const Cell = dynamic(() => import("recharts").then(m => m.Cell), { ssr: false })
const XAxis = dynamic(() => import("recharts").then(m => m.XAxis), { ssr: false })
const YAxis = dynamic(() => import("recharts").then(m => m.YAxis), { ssr: false })
const CartesianGrid = dynamic(() => import("recharts").then(m => m.CartesianGrid), { ssr: false })
const Tooltip = dynamic(() => import("recharts").then(m => m.Tooltip), { ssr: false })
const ResponsiveContainer = dynamic(() => import("recharts").then(m => m.ResponsiveContainer), { ssr: false })

const TRENDS_MONTHLY = [
  { per: "Oca", gelir: 68000, gider: 32000, kar: 36000 },
  { per: "Şub", gelir: 74000, gider: 28000, kar: 46000 },
  { per: "Mar", gelir: 91000, gider: 41000, kar: 50000 },
  { per: "Nis", gelir: 85000, gider: 38000, kar: 47000 },
  { per: "May", gelir: 110000, gider: 45000, kar: 65000 },
  { per: "Haz", gelir: 98000, gider: 42000, kar: 56000 },
  { per: "Tem", gelir: 127000, gider: 48000, kar: 79000 },
  { per: "Ağu", gelir: 119000, gider: 44000, kar: 75000 },
  { per: "Eyl", gelir: 134000, gider: 51000, kar: 83000 },
  { per: "Eki", gelir: 142000, gider: 55000, kar: 87000 },
]

const EXPENSE_CATEGORIES = [
  { name: "Hammadde / Deri Alımı", value: 38, color: "#b45309", amount: 20900, limit: 25000 },
  { name: "Kargo & Lojistik", value: 22, color: "#0891b2", amount: 12100, limit: 15000 },
  { name: "Kira & Atölye Sabit", value: 18, color: "#475569", amount: 9900, limit: 10000 },
  { name: "Pazarlama & Reklam", value: 14, color: "#7c3aed", amount: 7700, limit: 12000 },
  { name: "Personel & Avans", value: 8, color: "#059669", amount: 4400, limit: 8000 },
]

const WEEKLY_CASHFLOW = [
  { gun: "Pzt", nakit: 12400 },
  { gun: "Sal", nakit: 8200 },
  { gun: "Çar", nakit: 19800 },
  { gun: "Per", nakit: 15600 },
  { gun: "Cum", nakit: 27300 },
  { gun: "Cmt", nakit: 34100 },
  { gun: "Paz", nakit: 11200 },
]

const INITIAL_LEDGER_ACCOUNTS = [
  { id: "c1", name: "Koray Ayakkabıcılık", type: "MÜŞTERİ (Bayi)", balance: 45000, lastAction: "24 Eki 2024", due: "30 Kas 2024", status: "normal" },
  { id: "c2", name: "Zarif Deri A.Ş.", type: "MÜŞTERİ (Bayi)", balance: 12800, lastAction: "23 Eki 2024", due: "18 Kas 2024", status: "normal" },
  { id: "c3", name: "Kundura Sepeti E-Ticaret", type: "MÜŞTERİ (Bayi)", balance: 18500, lastAction: "15 Eki 2024", due: "05 Kas 2024", status: "overdue" },
  { id: "c4", name: "Hakiki Deri A.Ş.", type: "TEDARİKÇİ (Vaketa)", balance: -22000, lastAction: "22 Eki 2024", due: "Peşin Mutabakat", status: "cleared" },
  { id: "c5", name: "Kauçuk Taban İmalat Ltd.", type: "TEDARİKÇİ (Taban)", balance: -6200, lastAction: "20 Eki 2024", due: "Vadeli (Aralık)", status: "normal" },
]

const INITIAL_TAGS = [
  { name: "Hammadde", color: "#b45309", budget: 25000 },
  { name: "Kargo", color: "#0891b2", budget: 15000 },
  { name: "Pazarlama", color: "#7c3aed", budget: 12000 },
  { name: "Kira", color: "#475569", budget: 10000 },
  { name: "Personel", color: "#059669", budget: 8000 },
]

function fmt(n: number) { 
  return new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(n) 
}

export default function FinancePage() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "banks" | "ledger" | "tags">("dashboard")
  const [banks, setBanks] = useState<any[]>([])
  const [totalBankBalance, setTotalBankBalance] = useState(0)
  const [chartPeriod, setChartPeriod] = useState<"monthly" | "weekly" | "custom">("monthly")

  const [qDesc, setQDesc] = useState("")
  const [qAmount, setQAmount] = useState("")
  const [qType, setQType] = useState<"EXPENSE" | "INCOME">("EXPENSE")
  const [qTag, setQTag] = useState("Diğer Giderler")
  const [quickSaved, setQuickSaved] = useState(false)
  const [tagsList, setTagsList] = useState(INITIAL_TAGS)
  const [ledgerAccounts, setLedgerAccounts] = useState(INITIAL_LEDGER_ACCOUNTS)
  const [ledgerSearch, setLedgerSearch] = useState("")
  const [actionFeedback, setActionFeedback] = useState<string | null>(null)

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const res = await fetch("/api/admin/banks")
        const data = await res.json()
        if (Array.isArray(data)) {
          setBanks(data)
          setTotalBankBalance(data.reduce((sum: number, b: any) => sum + b.currentBalance, 0))
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchBanks()
  }, [])

  const handleQuickSave = () => {
    if (!qDesc.trim() || !qAmount) return
    setQuickSaved(true)
    setQDesc("")
    setQAmount("")
    setTimeout(() => setQuickSaved(false), 2000)
  }

  const handleSimulateLedgerPayment = (id: string, name: string) => {
    setLedgerAccounts(prev => prev.map(acc => acc.id === id ? { ...acc, balance: 0, status: "cleared" } : acc))
    setActionFeedback(`${name} cari hesabı için simülasyon ödemesi / tahsilatı başarıyla mutabık kılındı.`)
    setTimeout(() => setActionFeedback(null), 3500)
  }

  const filteredLedger = ledgerAccounts.filter(a => 
    a.name.toLowerCase().includes(ledgerSearch.toLowerCase()) || a.type.toLowerCase().includes(ledgerSearch.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100/60 to-amber-50/20 dark:from-[#070A13] dark:via-[#090C16] dark:to-slate-900/40 font-sans pb-20">
      
      {/* ── STICKY TOP BAR: QUICK EXPENSE & INCOME CAPTURE ── */}
      <div className="sticky top-0 z-50 bg-white/90 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/90 dark:border-white/5 shadow-xs px-6 py-3 transition-all">
        <div className="max-w-screen-2xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gradient-to-br from-slate-900 to-slate-800 dark:from-amber-500 dark:to-amber-600 rounded-xl flex items-center justify-center shadow-md">
              <CreditCard className="w-4 h-4 text-amber-400 dark:text-[#070A13]" />
            </div>
            <div>
              <span className="text-sm font-serif font-bold text-slate-900 dark:text-slate-100 block leading-none tracking-tight">
                Finansal Yönetim
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium block mt-0.5">
                Ön Muhasebe & Akıllı Kumanda
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 flex-1 max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-1.5 shadow-xs">
            <Select value={qType} onValueChange={(v: any) => setQType(v)}>
              <SelectTrigger className="h-8 w-20 border-0 bg-slate-50 dark:bg-slate-950 text-xs font-bold rounded-lg focus:ring-0 text-slate-900 dark:text-slate-100">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="dark:bg-slate-900 dark:border-white/10">
                <SelectItem value="EXPENSE" className="text-xs font-bold text-rose-600 dark:text-rose-400">Gider</SelectItem>
                <SelectItem value="INCOME" className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Gelir</SelectItem>
              </SelectContent>
            </Select>

            <div className="h-4 w-px bg-slate-200 dark:bg-white/10 mx-1" />

            <Input 
              value={qDesc} onChange={e => setQDesc(e.target.value)}
              placeholder="Hızlı işlem açıklaması girin..." 
              className="h-8 border-0 bg-transparent text-xs flex-1 focus-visible:ring-0 px-1 font-medium shadow-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />

            <Input 
              value={qAmount} onChange={e => setQAmount(e.target.value)}
              placeholder="₺ Tutar" type="number"
              className="h-8 border-0 bg-transparent text-xs w-20 sm:w-28 font-mono font-bold text-right focus-visible:ring-0 px-1 shadow-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />

            <Select value={qTag} onValueChange={setQTag}>
              <SelectTrigger className="h-8 w-32 border border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-slate-950 text-xs rounded-lg hidden md:flex font-medium text-slate-900 dark:text-slate-100">
                <Tag className="w-3 h-3 mr-1 text-slate-400 dark:text-slate-500" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="dark:bg-slate-900 dark:border-white/10">
                {tagsList.map(t => (
                  <SelectItem key={t.name} value={t.name} className="text-xs font-medium dark:text-slate-200">{t.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button 
              onClick={handleQuickSave} size="sm"
              className={`h-8 px-4 text-xs font-bold rounded-lg transition-all shadow-sm ${quickSaved ? "bg-emerald-600 hover:bg-emerald-700 text-white" : "bg-slate-900 dark:bg-amber-500 hover:bg-slate-800 dark:hover:bg-amber-600 text-white dark:text-[#070A13]"}`}
            >
              {quickSaved ? (
                <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Eklendi</span>
              ) : (
                <span className="flex items-center gap-1"><Plus className="w-3.5 h-3.5 stroke-[2.5]" /> Kaydet</span>
              )}
            </Button>
          </div>

          <div className="text-right hidden xl:block">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Veritabanı Dönemi</span>
            <span className="text-xs font-black font-mono text-slate-800 dark:text-slate-200 block">Ekim - 2024 / Q4</span>
          </div>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-6 py-8 space-y-8">
        
        {/* PREMIUM MODULAR TABS HEADER */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-white/5">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 dark:text-slate-100 tracking-tight">
                Finansal Kumanda Merkezi
              </h1>
              <Badge className="bg-amber-100 text-amber-800 border border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20 font-bold text-[10px] px-2 py-0.5 rounded-full shadow-xs dark:shadow-none">
                Premium
              </Badge>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
              Davut Kundura kurumsal nakit akışı, açık bankacılık mutabakatı ve borç/alacak takibi.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 bg-slate-200/70 dark:bg-slate-900/50 p-1 rounded-xl w-full md:w-auto shadow-inner dark:shadow-none border dark:border-white/5">
            {[
              { id: "dashboard", label: "Genel Durum & Akış", icon: Layers },
              { id: "banks", label: "Açık Bankacılık", icon: Building2 },
              { id: "ledger", label: "Cari Hesaplar", icon: Users },
              { id: "tags", label: "Bütçe Limitleri", icon: Calculator },
            ].map(tab => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id} onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all flex-1 md:flex-none justify-center tracking-tight ${isActive ? "bg-white dark:bg-slate-800 text-slate-950 dark:text-slate-100 shadow-md ring-1 ring-slate-900/5 dark:ring-white/10" : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-800/50"}`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-slate-900 dark:text-slate-100 stroke-[2.5]" : "text-slate-500"}`} />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* ── TAB 1: DASHBOARD ── */}
        {activeTab === "dashboard" && (
          <div className="space-y-8 animate-in fade-in-50 duration-500">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {[
                { title: "Bu Ay Ciro Toplamı", value: 142000, prev: 134000, icon: TrendingUp, accent: "border-t-emerald-500", sub: "B2B Bayi + E-Ticaret", iconBg: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/20" },
                { title: "Bu Ay Gider Çıkışı", value: 55000, prev: 51000, icon: TrendingDown, accent: "border-t-rose-500", sub: "Aylık limitin %73'ü", iconBg: "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400 border-rose-100 dark:border-rose-500/20" },
                { title: "Net Kâr (Dönem)", value: 87000, prev: 83000, icon: Wallet, accent: "border-t-amber-500", sub: "Net Kâr Marjı: %61.2", iconBg: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400 border-amber-100 dark:border-amber-500/20" },
                { title: "Kasa & Banka Toplamı", value: totalBankBalance || 284320, prev: null, icon: Building2, accent: "border-t-slate-800 dark:border-t-white", sub: "Tüm bağlantılı hesaplar", iconBg: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border-slate-200 dark:border-white/10" },
              ].map(kpi => {
                const pct = kpi.prev ? (((kpi.value - kpi.prev) / kpi.prev) * 100).toFixed(1) : null
                const isPos = pct && parseFloat(pct) > 0
                return (
                  <Card key={kpi.title} className={`border-t-4 bg-white dark:bg-slate-900/50 backdrop-blur-md shadow-sm hover:shadow-md transition-all ${kpi.accent} rounded-2xl border-x border-b border-slate-200 dark:border-white/5`}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1.5">
                          <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">{kpi.title}</span>
                          <span className="text-2xl sm:text-3xl font-black font-mono tabular-nums text-slate-900 dark:text-slate-100 block tracking-tight">{fmt(kpi.value)}</span>
                        </div>
                        <div className={`p-2.5 rounded-xl border ${kpi.iconBg} shadow-xs dark:shadow-none`}><kpi.icon className="w-5 h-5 stroke-[2.5]" /></div>
                      </div>
                      <div className="pt-4 mt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs">
                        <span className="text-slate-500 dark:text-slate-400 font-medium text-[11px] truncate max-w-[160px]">{kpi.sub}</span>
                        {pct && (
                          <span className={`font-bold font-mono inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] ${isPos ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400" : "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400"}`}>
                            {isPos ? "+" : ""}{pct}%
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
              <Card className="xl:col-span-2 border border-slate-200 dark:border-white/5 bg-white dark:bg-slate-900/50 shadow-sm rounded-2xl overflow-hidden backdrop-blur-md">
                <CardHeader className="p-6 pb-3 bg-slate-50/50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-white/5">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base font-serif font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                        <span>Gelir, Gider ve Kâr Büyüme Akışı</span>
                      </CardTitle>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Aylık finansal büyüme ve net kâr grafiği</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-4 pb-6">
                  <ResponsiveContainer width="100%" height={260}>
                    <AreaChart data={TRENDS_MONTHLY} margin={{ top: 10, right: 15, left: 5, bottom: 0 }}>
                      <defs>
                        <linearGradient id="areaGelir" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="areaGider" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.25} />
                          <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="areaKar" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.35} />
                          <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-slate-200 dark:text-white/5" vertical={false} />
                      <XAxis dataKey="per" tick={{ fontSize: 11, fontWeight: 700 }} className="text-slate-500 dark:text-slate-400" axisLine={false} tickLine={false} />
                      <YAxis tickFormatter={(v: any) => `₺${v / 1000}k`} tick={{ fontSize: 10 }} className="text-slate-500 dark:text-slate-400" axisLine={false} tickLine={false} width={45} />
                      <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12, border: "1px solid rgba(150,150,150,0.2)", background: "hsl(var(--card))", color: "hsl(var(--foreground))", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.4)" }} formatter={(val: any) => [fmt(val), ""]} />
                      <Area type="monotone" dataKey="gelir" name="Brüt Gelir" stroke="#10b981" strokeWidth={2.5} fill="url(#areaGelir)" dot={{ stroke: "#10b981", strokeWidth: 2, r: 3, fill: "#fff" }} />
                      <Area type="monotone" dataKey="gider" name="İşletme Gideri" stroke="#f43f5e" strokeWidth={2.5} fill="url(#areaGider)" dot={{ stroke: "#f43f5e", strokeWidth: 2, r: 3, fill: "#fff" }} />
                      <Area type="monotone" dataKey="kar" name="Net Kâr" stroke="#f59e0b" strokeWidth={3} fill="url(#areaKar)" dot={{ stroke: "#f59e0b", strokeWidth: 2, r: 4, fill: "#fff" }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border border-slate-200 dark:border-white/5 bg-white dark:bg-slate-900/50 shadow-sm rounded-2xl backdrop-blur-md">
                <CardHeader className="p-6 pb-3 border-b border-slate-100 dark:border-white/5">
                  <CardTitle className="text-base font-serif font-bold text-slate-900 dark:text-slate-100">Aylık Kategori Limit Tüketimi</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4.5">
                  {EXPENSE_CATEGORIES.map(cat => {
                    const pct = Math.min(100, Math.round((cat.amount / cat.limit) * 100))
                    const isHigh = pct > 80
                    return (
                      <div key={cat.name} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-800 dark:text-slate-200">{cat.name}</span>
                          <span className="font-mono font-bold text-slate-950 dark:text-slate-100">{fmt(cat.amount)} <span className="text-slate-400 dark:text-slate-500 font-normal">/ {fmt(cat.limit)}</span></span>
                        </div>
                        <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden relative border border-slate-200/40 dark:border-transparent">
                          <div className={`h-full transition-all duration-700 rounded-full ${isHigh ? "bg-amber-500" : "bg-emerald-500"}`} style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* ── TAB 2: BANKS ── */}
        {activeTab === "banks" && (
          <div className="animate-in fade-in-50 duration-500">
            <BankPanel />
          </div>
        )}

        {/* ── TAB 3: LEDGER ── */}
        {activeTab === "ledger" && (
          <div className="space-y-6 animate-in fade-in-50 duration-500">
            <Card className="border border-slate-200 dark:border-white/5 bg-white dark:bg-slate-900/50 shadow-sm overflow-hidden rounded-2xl backdrop-blur-md">
              <CardHeader className="p-6 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-slate-950/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-base font-serif font-bold text-slate-900 dark:text-slate-100">Cari Hesaplar & Borç / Alacak Matrisi</CardTitle>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">B2B toptan bayilerinizin açık bakiyeleri ve tedarikçilerinizle mutabakat.</p>
                </div>
                <div className="w-full sm:w-72">
                  <Input value={ledgerSearch} onChange={e => setLedgerSearch(e.target.value)} placeholder="Bayi veya tedarikçi ara..." className="h-9 text-xs bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10 rounded-xl" />
                </div>
              </CardHeader>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/60 dark:bg-slate-900/30 border-b border-slate-100 dark:border-white/5 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                      <th className="p-4 px-6">Cari Ünvan</th>
                      <th className="p-4 px-6">Hesap Türü</th>
                      <th className="p-4 px-6 text-right">Anlık Bakiye</th>
                      <th className="p-4 px-6">Vade Durumu</th>
                      <th className="p-4 px-6 text-right">Simülasyon</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-xs font-medium">
                    {filteredLedger.map(acc => {
                      const isOweUs = acc.balance > 0
                      const isCleared = acc.balance === 0
                      return (
                        <tr key={acc.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                          <td className="p-4 px-6 font-bold text-slate-900 dark:text-slate-100">{acc.name}</td>
                          <td className="p-4 px-6">
                            <Badge variant="outline" className={`text-[10px] font-mono font-bold px-2 py-0.5 ${acc.type.includes("MÜŞTERİ") ? "bg-indigo-50 text-indigo-700 border-indigo-100 dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-500/20" : "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20"}`}>
                              {acc.type}
                            </Badge>
                          </td>
                          <td className={`p-4 px-6 text-right font-black font-mono tabular-nums ${isCleared ? "text-slate-400" : isOweUs ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                            {isCleared ? "₺0 (Mutabık)" : `${isOweUs ? "+" : ""}${fmt(acc.balance)}`}
                            <span className="text-[10px] block text-slate-400 font-normal">{isCleared ? "Kapalı" : isOweUs ? "Bize Borçlu" : "Bizim Borcumuz"}</span>
                          </td>
                          <td className="p-4 px-6"><span className={`font-semibold ${acc.status === "overdue" ? "text-rose-600 dark:text-rose-400" : "text-slate-600 dark:text-slate-400"}`}>{acc.due}</span></td>
                          <td className="p-4 px-6 text-right">
                            {isCleared ? (
                              <span className="text-slate-400 text-xs italic inline-flex items-center gap-1 font-bold"><Check className="w-3.5 h-3.5 text-emerald-500" /> Tamamlandı</span>
                            ) : (
                              <Button onClick={() => handleSimulateLedgerPayment(acc.id, acc.name)} size="sm" variant="outline" className="h-8 text-xs border-slate-300 dark:border-white/10 hover:bg-slate-900 dark:hover:bg-amber-500 hover:text-white dark:hover:text-[#070A13] font-bold">
                                {isOweUs ? "Tahsilatı Kapat" : "Ödeme Çık"}
                              </Button>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
