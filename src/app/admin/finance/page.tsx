"use client"

import React, { useState } from "react"
import dynamic from "next/dynamic"
import { 
  TrendingUp, TrendingDown, Wallet, Building2, CreditCard, 
  Plus, Tag, CheckCircle2, Clock, ArrowDownLeft, ArrowUpRight, 
  ChevronRight, AlertCircle, Settings, Layers, PieChart as PieIcon, 
  Users, DollarSign, Calculator, RefreshCw, FileCheck, Check
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import BankPanel from "@/components/admin/BankPanel"

// Dynamic loading for Recharts to avoid SSR errors
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

// ── Master Charts & Trend Data ──
const MONTHLY_TRENDS = [
  { ay: "Oca", gelir: 68000, gider: 32000, kar: 36000 },
  { ay: "Şub", gelir: 74000, gider: 28000, kar: 46000 },
  { ay: "Mar", gelir: 91000, gider: 41000, kar: 50000 },
  { ay: "Nis", gelir: 85000, gider: 38000, kar: 47000 },
  { ay: "May", gelir: 110000, gider: 45000, kar: 65000 },
  { ay: "Haz", gelir: 98000, gider: 42000, kar: 56000 },
  { ay: "Tem", gelir: 127000, gider: 48000, kar: 79000 },
  { ay: "Ağu", gelir: 119000, gider: 44000, kar: 75000 },
  { ay: "Eyl", gelir: 134000, gider: 51000, kar: 83000 },
  { ay: "Eki", gelir: 142000, gider: 55000, kar: 87000 },
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
  { name: "Web Satış", color: "#10b981", budget: 0 },
  { name: "Toptan Tahsilat", color: "#3b82f6", budget: 0 },
  { name: "Diğer Giderler", color: "#94a3b8", budget: 5000 },
]

function fmt(n: number) { 
  return new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(n) 
}

export default function FinancePage() {
  // Navigation Tabs state
  const [activeTab, setActiveTab] = useState<"dashboard" | "banks" | "ledger" | "tags">("dashboard")
  
  // Quick Entry state
  const [qDesc, setQDesc] = useState("")
  const [qAmount, setQAmount] = useState("")
  const [qType, setQType] = useState<"EXPENSE" | "INCOME">("EXPENSE")
  const [qTag, setQTag] = useState("Diğer Giderler")
  const [quickSaved, setQuickSaved] = useState(false)
  
  // Custom Tags management state
  const [tagsList, setTagsList] = useState(INITIAL_TAGS)
  const [newTagName, setNewTagName] = useState("")
  const [newTagBudget, setNewTagBudget] = useState("")
  const [newTagColor, setNewTagColor] = useState("#0891b2")

  // Ledger actions feedback
  const [ledgerAccounts, setLedgerAccounts] = useState(INITIAL_LEDGER_ACCOUNTS)
  const [ledgerSearch, setLedgerSearch] = useState("")
  const [actionFeedback, setActionFeedback] = useState<string | null>(null)

  const handleQuickSave = () => {
    if (!qDesc.trim() || !qAmount) return
    setQuickSaved(true)
    setQDesc("")
    setQAmount("")
    setTimeout(() => setQuickSaved(false), 2000)
  }

  const handleAddCustomTag = () => {
    if (!newTagName.trim() || tagsList.some(t => t.name.toLowerCase() === newTagName.trim().toLowerCase())) return
    setTagsList(prev => [...prev, {
      name: newTagName.trim(),
      color: newTagColor,
      budget: newTagBudget ? parseFloat(newTagBudget) : 0
    }])
    setNewTagName("")
    setNewTagBudget("")
  }

  const handleSimulateLedgerPayment = (id: string, name: string) => {
    setLedgerAccounts(prev => prev.map(acc => {
      if (acc.id === id) {
        return { ...acc, balance: 0, status: "cleared" }
      }
      return acc
    }))
    setActionFeedback(`${name} hesabı için simülasyon ödemesi / tahsilatı tamamlandı.`)
    setTimeout(() => setActionFeedback(null), 3000)
  }

  const filteredLedger = ledgerAccounts.filter(a => 
    a.name.toLowerCase().includes(ledgerSearch.toLowerCase()) ||
    a.type.toLowerCase().includes(ledgerSearch.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-slate-50/80 font-sans pb-16">
      
      {/* ── STICKY TOP BAR: QUICK EXPENSE & INCOME CAPTURE ── */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs px-6 py-3">
        <div className="max-w-screen-2xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-slate-900 rounded-lg flex items-center justify-center shadow-xs">
              <CreditCard className="w-4 h-4 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="text-sm font-serif font-bold text-slate-900 block leading-none">Finans Motoru</span>
              <span className="text-[10px] text-slate-400 font-medium block mt-0.5">Ön Muhasebe & Nakit Akışı</span>
            </div>
          </div>

          {/* Quick Capture Inline Form */}
          <div className="flex items-center gap-1.5 flex-1 max-w-2xl bg-slate-50 border border-slate-200/80 rounded-xl px-2.5 py-1.5 shadow-xs">
            <Select value={qType} onValueChange={(v: any) => setQType(v)}>
              <SelectTrigger className="h-7 w-20 border-0 bg-white text-xs font-bold rounded-lg shadow-xs focus:ring-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="EXPENSE" className="text-xs font-medium text-rose-600">Gider</SelectItem>
                <SelectItem value="INCOME" className="text-xs font-medium text-emerald-600">Gelir</SelectItem>
              </SelectContent>
            </Select>

            <div className="h-4 w-px bg-slate-200 mx-0.5" />

            <Input 
              value={qDesc}
              onChange={e => setQDesc(e.target.value)}
              placeholder="Hızlı işlem açıklaması girin..." 
              className="h-7 border-0 bg-transparent text-xs flex-1 focus-visible:ring-0 px-1 shadow-none"
            />

            <Input 
              value={qAmount}
              onChange={e => setQAmount(e.target.value)}
              placeholder="₺ Tutar" 
              type="number"
              className="h-7 border-0 bg-transparent text-xs w-20 sm:w-24 font-mono font-bold text-right focus-visible:ring-0 px-1 shadow-none"
            />

            <Select value={qTag} onValueChange={setQTag}>
              <SelectTrigger className="h-7 w-28 border border-slate-200 bg-white text-xs rounded-lg shadow-xs hidden md:flex">
                <Tag className="w-2.5 h-2.5 mr-1 text-slate-400" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {tagsList.map(t => (
                  <SelectItem key={t.name} value={t.name} className="text-xs">
                    {t.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button 
              onClick={handleQuickSave}
              size="sm"
              className={`h-7 px-3 text-xs font-medium rounded-lg transition-all shadow-xs ${quickSaved ? "bg-emerald-600 hover:bg-emerald-700 text-white" : "bg-slate-900 hover:bg-slate-800 text-white"}`}
            >
              {quickSaved ? (
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Kaydedildi
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <Plus className="w-3 h-3" /> Ekle
                </span>
              )}
            </Button>
          </div>

          {/* Quick Info Trigger */}
          <div className="text-right hidden xl:block">
            <span className="text-[10px] text-slate-400 font-medium block">Aktif Veritabanı Dönemi</span>
            <span className="text-xs font-bold font-mono text-slate-800 block">Ekim - 2024 / Q4</span>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT CONTAINER ── */}
      <div className="max-w-screen-2xl mx-auto px-6 py-8 space-y-8">
        
        {/* PREMIUM MODULAR TABS HEADER */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-2 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-serif font-black text-slate-900 tracking-tight">Finansal Kumanda Merkezi</h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Davut Kundura kurumsal nakit akışı, açık bankacılık mutabakatı ve borç/alacak takibi.
            </p>
          </div>

          {/* Premium custom horizontal toggle nav */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-200/60 p-1 rounded-xl w-full md:w-auto">
            {[
              { id: "dashboard", label: "Genel Durum & Akış", icon: Layers },
              { id: "banks", label: "Açık Bankacılık & Mutabakat", icon: Building2 },
              { id: "ledger", label: "Cari Hesaplar & Faturalar", icon: Users },
              { id: "tags", label: "Bütçe & Etiket Limitleri", icon: Calculator },
            ].map(tab => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex-1 md:flex-none justify-center ${isActive ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900 hover:bg-white/40"}`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-slate-900" : "text-slate-500"}`} />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* ── TAB 1: DASHBOARD & CASHFLOW OVERVIEW ── */}
        {activeTab === "dashboard" && (
          <div className="space-y-8 animate-in fade-in-50 duration-300">
            
            {/* 4 Large Premium KPI Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
              {[
                { 
                  title: "Bu Ay Ciro Toplamı", 
                  value: 142000, 
                  prev: 134000, 
                  icon: TrendingUp, 
                  accent: "border-l-4 border-l-emerald-500",
                  sub: "B2B Bayi + E-Ticaret Siparişleri",
                  color: "text-emerald-600"
                },
                { 
                  title: "Bu Ay Gider Çıkışı", 
                  value: 55000, 
                  prev: 51000, 
                  icon: TrendingDown, 
                  accent: "border-l-4 border-l-rose-500",
                  sub: "Aylık işletme limitinin %73'ü",
                  color: "text-rose-500"
                },
                { 
                  title: "Net Kâr (Dönem)", 
                  value: 87000, 
                  prev: 83000, 
                  icon: Wallet, 
                  accent: "border-l-4 border-l-amber-500",
                  sub: "Net Kâr Marjı: %61.2 (Premium Seriler)",
                  color: "text-amber-600"
                },
                { 
                  title: "Kasa & Banka Toplamı", 
                  value: 284320, 
                  prev: null, 
                  icon: Building2, 
                  accent: "border-l-4 border-l-slate-800",
                  sub: "2 Banka Hesabı Canlı Bağlı",
                  color: "text-slate-900"
                },
              ].map(kpi => {
                const pctChange = kpi.prev ? (((kpi.value - kpi.prev) / kpi.prev) * 100).toFixed(1) : null
                const isPositive = pctChange && parseFloat(pctChange) > 0
                return (
                  <Card key={kpi.title} className={`border-slate-200/80 bg-white shadow-xs hover:shadow-sm transition-shadow ${kpi.accent}`}>
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-1">
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                            {kpi.title}
                          </span>
                          <span className="text-2xl font-black font-mono tabular-nums text-slate-900 block tracking-tight">
                            {fmt(kpi.value)}
                          </span>
                        </div>
                        <div className="p-2 rounded-lg bg-slate-50 text-slate-600 border border-slate-100">
                          <kpi.icon className="w-4 h-4" />
                        </div>
                      </div>

                      <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-slate-500 font-medium text-[11px] truncate max-w-[160px]">
                          {kpi.sub}
                        </span>
                        {pctChange && (
                          <span className={`font-bold font-mono inline-flex items-center gap-0.5 ${isPositive ? "text-emerald-600" : "text-rose-500"}`}>
                            {isPositive ? "+" : ""}{pctChange}%
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Tax & Strategic Reserve Indicator Panel */}
            <div className="bg-slate-900 text-white rounded-xl p-5 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-5 relative overflow-hidden">
              {/* Background watermark icon */}
              <Calculator className="w-48 h-48 text-slate-800/40 absolute -right-10 -bottom-10 pointer-events-none stroke-[1]" />
              
              <div className="space-y-1 relative z-10 max-w-xl">
                <div className="flex items-center gap-2">
                  <Badge className="bg-amber-500 text-slate-950 font-bold text-[10px] px-2 py-0.5 uppercase tracking-wider border-0">
                    Mali Zeka (BI)
                  </Badge>
                  <span className="text-xs text-slate-300 font-mono">Vergi & Karşılık Rezervi Tahminleyicisi</span>
                </div>
                <p className="text-sm font-bold text-slate-100">
                  Ayakkabı imalatı ve e-ticaret faturalarına istinaden tahmini yasal mali yükümlülükleriniz hesaplandı.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-6 relative z-10 border-t md:border-t-0 pt-3 md:pt-0 border-slate-800 w-full md:w-auto justify-start md:justify-end">
                <div>
                  <span className="text-[11px] text-slate-400 block font-medium">Tahmini KDV Yükü (Ekim)</span>
                  <span className="text-lg font-black font-mono text-amber-400 block tracking-tight">₺21.400</span>
                </div>
                <div className="h-8 w-px bg-slate-800 hidden sm:block" />
                <div>
                  <span className="text-[11px] text-slate-400 block font-medium">Kurumlar Vergisi Karşılığı</span>
                  <span className="text-lg font-black font-mono text-emerald-400 block tracking-tight">₺18.500</span>
                </div>
              </div>
            </div>

            {/* Charts Row: Area Chart (Left) + Live Category Budget Bars (Right) */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
              
              {/* 10-Month Financial Trend Area Chart */}
              <Card className="xl:col-span-2 border-slate-200/80 bg-white shadow-sm">
                <CardHeader className="p-5 pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-sm font-serif font-bold text-slate-900">
                        Gelir, Gider ve Net Kâr Trendi (Son 10 Ay)
                      </CardTitle>
                      <p className="text-xs text-slate-500 mt-0.5">Aylık net büyüme eğrisi ve kârlılık hacimleri</p>
                    </div>
                    <Badge variant="outline" className="text-[10px] bg-slate-50 font-mono">
                      Gerçekleşen
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-2 pt-0 pb-4">
                  <ResponsiveContainer width="100%" height={240}>
                    <AreaChart data={MONTHLY_TRENDS} margin={{ top: 10, right: 15, left: 5, bottom: 0 }}>
                      <defs>
                        <linearGradient id="areaGelir" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="areaGider" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="areaKar" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                      <XAxis dataKey="ay" tick={{ fontSize: 11, fill: "#94a3b8", fontWeight: 600 }} axisLine={false} tickLine={false} />
                      <YAxis tickFormatter={(v: any) => `₺${v / 1000}k`} tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} width={45} />
                      <Tooltip 
                        contentStyle={{ borderRadius: 12, fontSize: 12, border: "none", background: "#0f172a", color: "#f8fafc", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.3)" }} 
                        formatter={(val: any) => [fmt(val), ""]}
                      />
                      <Area type="monotone" dataKey="gelir" name="Gelir" stroke="#10b981" strokeWidth={2} fill="url(#areaGelir)" dot={false} />
                      <Area type="monotone" dataKey="gider" name="Gider" stroke="#f43f5e" strokeWidth={2} fill="url(#areaGider)" dot={false} />
                      <Area type="monotone" dataKey="kar" name="Net Kâr" stroke="#f59e0b" strokeWidth={2.5} fill="url(#areaKar)" dot={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                  
                  <div className="flex items-center justify-center gap-6 pt-2 border-t border-slate-50 mt-1">
                    {[
                      { label: "Brüt Gelir", color: "#10b981" },
                      { label: "İşletme Gideri", color: "#f43f5e" },
                      { label: "Net Dönem Kârı", color: "#f59e0b" },
                    ].map(legend => (
                      <div key={legend.label} className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-xs" style={{ background: legend.color }} />
                        <span className="text-xs text-slate-600 font-medium">{legend.label}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Live Category Budget Consumption Bars */}
              <Card className="border-slate-200/80 bg-white shadow-sm">
                <CardHeader className="p-5 pb-3">
                  <CardTitle className="text-sm font-serif font-bold text-slate-900">
                    Kategori Bütçe Tüketimi
                  </CardTitle>
                  <p className="text-xs text-slate-500 mt-0.5">Ekim ayı tahsisat limitleri dolum oranları</p>
                </CardHeader>
                <CardContent className="p-5 pt-2 space-y-4">
                  {EXPENSE_CATEGORIES.map(cat => {
                    const pct = Math.min(100, Math.round((cat.amount / cat.limit) * 100))
                    const isHigh = pct > 80
                    return (
                      <div key={cat.name} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-800">{cat.name}</span>
                          <span className="font-mono font-bold text-slate-900">
                            {fmt(cat.amount)} <span className="text-slate-400 font-normal">/ {fmt(cat.limit)}</span>
                          </span>
                        </div>

                        {/* Progress Bar Container */}
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden relative">
                          <div 
                            className={`h-full transition-all duration-500 rounded-full ${isHigh ? "bg-amber-500" : "bg-emerald-500"}`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>

                        <div className="flex items-center justify-between text-[10px] text-slate-400">
                          <span>Doluluk: %{pct}</span>
                          {isHigh && <span className="text-amber-600 font-bold">Limit Yaklaştı</span>}
                        </div>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>

            </div>

            {/* Row 3: Expense Pie chart breakdown & Weekly Cash Flow block */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              
              <Card className="border-slate-200/80 bg-white shadow-sm">
                <CardHeader className="p-5 pb-2">
                  <CardTitle className="text-sm font-serif font-bold text-slate-900">
                    Gider Çıkışı Oransal Dağılımı
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <ResponsiveContainer width="100%" height={160}>
                    <PieChart>
                      <Pie 
                        data={EXPENSE_CATEGORIES} 
                        cx="50%" 
                        cy="50%" 
                        innerRadius={42} 
                        outerRadius={68} 
                        dataKey="value" 
                        paddingAngle={3}
                      >
                        {EXPENSE_CATEGORIES.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ borderRadius: 8, fontSize: 11, border: "none", background: "#1e293b", color: "#fff" }} 
                        formatter={(val: any) => [`%${val}`, "Pay"]}
                      />
                    </PieChart>
                  </ResponsiveContainer>

                  <div className="space-y-2 mt-2 divide-y divide-slate-50">
                    {EXPENSE_CATEGORIES.map(c => (
                      <div key={c.name} className="flex items-center justify-between pt-1.5 text-xs">
                        <div className="flex items-center gap-2 truncate">
                          <span className="w-2.5 h-2.5 rounded-xs flex-shrink-0" style={{ background: c.color }} />
                          <span className="text-slate-600 font-medium truncate">{c.name}</span>
                        </div>
                        <span className="font-mono font-bold text-slate-800 flex-shrink-0">
                          %{c.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Weekly Daily Cashflow Input Bars */}
              <Card className="lg:col-span-2 border-slate-200/80 bg-white shadow-sm">
                <CardHeader className="p-5 pb-2">
                  <CardTitle className="text-sm font-serif font-bold text-slate-900">
                    Haftalık Gün Bazlı Kasa Tahsilat Akışı
                  </CardTitle>
                  <p className="text-xs text-slate-500 mt-0.5">Pazartesi - Pazar anlık POS ve Banka nakit girdileri</p>
                </CardHeader>
                <CardContent className="p-2 pb-4">
                  <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={WEEKLY_CASHFLOW} barSize={32} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                      <XAxis dataKey="gun" tick={{ fontSize: 11, fill: "#94a3b8", fontWeight: 600 }} axisLine={false} tickLine={false} />
                      <YAxis tickFormatter={(v: any) => `₺${v / 1000}k`} tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} width={42} />
                      <Tooltip 
                        contentStyle={{ borderRadius: 8, fontSize: 11, border: "none", background: "#0f172a", color: "#fff" }}
                        formatter={(val: any) => [fmt(val), "Tahsilat"]}
                      />
                      <Bar dataKey="nakit" name="Nakit Giriş" radius={[6, 6, 0, 0]}>
                        {WEEKLY_CASHFLOW.map((entry, index) => (
                          <Cell key={`bar-${index}`} fill={entry.gun === "Cmt" || entry.gun === "Cum" ? "#10b981" : "#334155"} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                  <p className="text-center text-xs text-slate-400 mt-1">
                    En yüksek tahsilat hacmi <strong className="text-emerald-600 font-semibold">Cumartesi (Hafta sonu kampanyası)</strong> gerçekleşti.
                  </p>
                </CardContent>
              </Card>

            </div>

          </div>
        )}

        {/* ── TAB 2: OPEN BANKING & RECONCILIATION INTEGRATIONS ── */}
        {activeTab === "banks" && (
          <div className="animate-in fade-in-50 duration-300">
            <BankPanel />
          </div>
        )}

        {/* ── TAB 3: LEDGER ACCOUNTS & PENDING INVOICES (B2B/B2C) ── */}
        {activeTab === "ledger" && (
          <div className="space-y-6 animate-in fade-in-50 duration-300">
            
            <Card className="border-slate-200/80 bg-white shadow-sm overflow-hidden">
              <CardHeader className="p-5 border-b border-slate-100 bg-slate-50/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-sm font-serif font-bold text-slate-900">
                    Cari Hesaplar & Borç / Alacak Defteri
                  </CardTitle>
                  <p className="text-xs text-slate-500 mt-0.5">
                    B2B toptan bayilerinizin açık bakiyeleri ve deri/taban tedarikçilerinizle mutabakat tablosu.
                  </p>
                </div>

                <div className="w-full sm:w-64">
                  <Input 
                    value={ledgerSearch}
                    onChange={e => setLedgerSearch(e.target.value)}
                    placeholder="Bayi veya tedarikçi ara..." 
                    className="h-8 text-xs bg-white border-slate-200"
                  />
                </div>
              </CardHeader>

              {actionFeedback && (
                <div className="bg-emerald-50 text-emerald-800 p-3 px-5 text-xs font-medium border-b border-emerald-100 flex items-center gap-2 animate-in fade-in duration-300">
                  <FileCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{actionFeedback}</span>
                </div>
              )}

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      <th className="p-4 px-5">Cari Ünvan</th>
                      <th className="p-4 px-5">Hesap Türü</th>
                      <th className="p-4 px-5 text-right">Anlık Bakiye</th>
                      <th className="p-4 px-5">Son Hareket</th>
                      <th className="p-4 px-5">Vade Durumu</th>
                      <th className="p-4 px-5 text-right">Hızlı Simülasyon</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {filteredLedger.map(acc => {
                      const isOweUs = acc.balance > 0
                      const isCleared = acc.balance === 0
                      return (
                        <tr key={acc.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-4 px-5 font-bold text-slate-900">
                            {acc.name}
                          </td>
                          <td className="p-4 px-5">
                            <Badge variant="outline" className={`text-[10px] font-mono font-medium ${acc.type.includes("MÜŞTERİ") ? "bg-indigo-50 text-indigo-700 border-indigo-100" : "bg-amber-50 text-amber-800 border-amber-200"}`}>
                              {acc.type}
                            </Badge>
                          </td>
                          <td className={`p-4 px-5 text-right font-black font-mono tabular-nums ${isCleared ? "text-slate-400" : isOweUs ? "text-emerald-600" : "text-rose-600"}`}>
                            {isCleared ? "₺0 (Mutabık)" : `${isOweUs ? "+" : ""}${fmt(acc.balance)}`}
                            <span className="text-[10px] block text-slate-400 font-normal">
                              {isCleared ? "Kapalı" : isOweUs ? "Bize Borçlu" : "Bizim Borcumuz"}
                            </span>
                          </td>
                          <td className="p-4 px-5 text-slate-500 font-medium">
                            {acc.lastAction}
                          </td>
                          <td className="p-4 px-5">
                            <span className={`font-medium ${acc.status === "overdue" ? "text-rose-600 font-bold" : "text-slate-600"}`}>
                              {acc.due}
                            </span>
                          </td>
                          <td className="p-4 px-5 text-right">
                            {isCleared ? (
                              <span className="text-slate-400 text-[11px] italic inline-flex items-center gap-1">
                                <Check className="w-3 h-3 text-emerald-500" /> Tamamlandı
                              </span>
                            ) : (
                              <Button 
                                onClick={() => handleSimulateLedgerPayment(acc.id, acc.name)}
                                size="sm" 
                                variant="outline" 
                                className="h-7 text-[11px] border-slate-300 hover:bg-slate-900 hover:text-white transition-all font-medium"
                              >
                                {isOweUs ? "Tahsilatı Kapat" : "Ödeme Çık"}
                              </Button>
                            )}
                          </td>
                        </tr>
                      )
                    })}

                    {filteredLedger.length === 0 && (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-slate-400 font-medium">
                          Aradığınız cari hesap bulunamadı.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Card>

          </div>
        )}

        {/* ── TAB 4: TAGS & EXPENSE BUDGET CONFIGURATION ── */}
        {activeTab === "tags" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in-50 duration-300 items-start">
            
            {/* Create Custom Tag Control */}
            <Card className="border-slate-200/80 bg-white shadow-sm">
              <CardHeader className="p-5 pb-3 border-b border-slate-100 bg-slate-50/50">
                <CardTitle className="text-sm font-serif font-bold text-slate-900">
                  Yeni Gider / Gelir Etiketi Tanımla
                </CardTitle>
                <p className="text-xs text-slate-500">Dinamik masraf kalemleri oluşturun</p>
              </CardHeader>
              <CardContent className="p-5 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">Etiket Adı</label>
                  <Input 
                    value={newTagName}
                    onChange={e => setNewTagName(e.target.value)}
                    placeholder="Örn: Fuar & Etkinlik Gideri" 
                    className="h-8 text-xs bg-white border-slate-200"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">Aylık Bütçe Hedefi (₺ Limit)</label>
                  <Input 
                    value={newTagBudget}
                    onChange={e => setNewTagBudget(e.target.value)}
                    placeholder="Örn: 10000" 
                    type="number"
                    className="h-8 text-xs bg-white border-slate-200 font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">Renk Kodu</label>
                  <div className="flex items-center gap-2">
                    <Input 
                      type="color" 
                      value={newTagColor}
                      onChange={e => setNewTagColor(e.target.value)}
                      className="w-10 h-8 p-1 border border-slate-200 bg-white cursor-pointer rounded"
                    />
                    <code className="text-xs font-mono text-slate-600 bg-slate-50 px-2 py-1 rounded border">
                      {newTagColor}
                    </code>
                  </div>
                </div>

                <Button 
                  onClick={handleAddCustomTag}
                  className="w-full h-8 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white gap-1.5 mt-2"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Sisteme Ekle</span>
                </Button>
              </CardContent>
            </Card>

            {/* List of Allowed Tags & Budgets */}
            <Card className="md:col-span-2 border-slate-200/80 bg-white shadow-sm">
              <CardHeader className="p-5 pb-3 border-b border-slate-100 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-serif font-bold text-slate-900">
                    Sistemde Aktif Etiketler & Tanımlı Limitler
                  </CardTitle>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Hızlı işlem barında veya banka mutabakatında kullanılabilecek etiket havuzu
                  </p>
                </div>
                <Badge variant="secondary" className="text-xs font-mono">
                  {tagsList.length} Kalem
                </Badge>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-slate-100 max-h-[380px] overflow-y-auto">
                  {tagsList.map(tag => (
                    <div key={tag.name} className="p-4 px-5 flex items-center justify-between hover:bg-slate-50/40 transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="w-3.5 h-3.5 rounded-xs flex-shrink-0" style={{ background: tag.color }} />
                        <div>
                          <span className="text-xs font-bold text-slate-900 block">{tag.name}</span>
                          <span className="text-[10px] text-slate-400 block font-mono">ID: tag_{tag.name.toLowerCase().replace(/\s+/g, "_")}</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-bold font-mono text-slate-800 block">
                          {tag.budget > 0 ? `Limit: ${fmt(tag.budget)}` : "Limitsiz / Takipsiz"}
                        </span>
                        <span className="text-[10px] text-slate-400 block">Aylık Kota</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

          </div>
        )}

      </div>
    </div>
  )
}
