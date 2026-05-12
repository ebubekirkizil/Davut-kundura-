"use client"

import React, { useState } from "react"
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

// Dynamic loading for Recharts to avoid SSR conflicts
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

// ── Master Datasets Scaled by Different Time Ranges ──
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

const TRENDS_DAILY = [
  { per: "20 Eki", gelir: 4500, gider: 1200, kar: 3300 },
  { per: "21 Eki", gelir: 8200, gider: 3100, kar: 5100 },
  { per: "22 Eki", gelir: 6100, gider: 4500, kar: 1600 },
  { per: "23 Eki", gelir: 16250, gider: 2100, kar: 14150 },
  { per: "24 Eki", gelir: 45000, gider: 8200, kar: 36800 },
  { per: "25 Eki", gelir: 12400, gider: 4000, kar: 8400 },
]

const TRENDS_WEEKLY = [
  { per: "Hafta 38", gelir: 28000, gider: 12000, kar: 16000 },
  { per: "Hafta 39", gelir: 34000, gider: 14500, kar: 19500 },
  { per: "Hafta 40", gelir: 41000, gider: 18000, kar: 23000 },
  { per: "Hafta 41", gelir: 52000, gider: 21000, kar: 31000 },
  { per: "Hafta 42", gelir: 76500, gider: 22000, kar: 54500 },
]

const TRENDS_QUARTERLY = [
  { per: "2024 Q1", gelir: 233000, gider: 101000, kar: 132000 },
  { per: "2024 Q2", gelir: 293000, gider: 125000, kar: 168000 },
  { per: "2024 Q3", gelir: 380000, gider: 143000, kar: 237000 },
  { per: "2024 Q4 (Tahmin)", gelir: 450000, gider: 165000, kar: 285000 },
]

const TRENDS_YEARLY = [
  { per: "2022", gelir: 780000, gider: 420000, kar: 360000 },
  { per: "2023", gelir: 1140000, gider: 530000, kar: 610000 },
  { per: "2024 (Anlık)", gelir: 1356000, gider: 534000, kar: 822000 },
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
  
  // Custom Time Range Adjustments for the charts
  const [chartPeriod, setChartPeriod] = useState<"daily" | "weekly" | "monthly" | "quarterly" | "yearly" | "custom">("monthly")
  const [customStartDate, setCustomStartDate] = useState("2024-10-01")
  const [customEndDate, setCustomEndDate] = useState("2024-10-25")

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
  const [newTagColor, setNewTagColor] = useState("#059669")

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
    setActionFeedback(`${name} cari hesabı için simülasyon ödemesi / tahsilatı başarıyla mutabık kılındı.`)
    setTimeout(() => setActionFeedback(null), 3500)
  }

  // Resolve active dataset based on user-selected time frequency
  const getActiveChartData = () => {
    switch (chartPeriod) {
      case "daily": return TRENDS_DAILY
      case "weekly": return TRENDS_WEEKLY
      case "quarterly": return TRENDS_QUARTERLY
      case "yearly": return TRENDS_YEARLY
      case "custom": 
        // return subset for customized simulated view
        return TRENDS_DAILY.slice(0, 4)
      case "monthly": 
      default:
        return TRENDS_MONTHLY
    }
  }

  const activeChartData = getActiveChartData()

  const filteredLedger = ledgerAccounts.filter(a => 
    a.name.toLowerCase().includes(ledgerSearch.toLowerCase()) ||
    a.type.toLowerCase().includes(ledgerSearch.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100/60 to-amber-50/20 font-sans pb-20">
      
      {/* ── STICKY TOP BAR: QUICK EXPENSE & INCOME CAPTURE ── */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/90 shadow-xs px-6 py-3 transition-all">
        <div className="max-w-screen-2xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl flex items-center justify-center shadow-md">
              <CreditCard className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <span className="text-sm font-serif font-bold text-slate-900 block leading-none tracking-tight">
                Finansal Yönetim
              </span>
              <span className="text-[10px] text-slate-500 font-medium block mt-0.5">
                Ön Muhasebe & Akıllı Kumanda
              </span>
            </div>
          </div>

          {/* Quick Capture Form Block */}
          <div className="flex items-center gap-1.5 flex-1 max-w-2xl bg-white border border-slate-200 rounded-xl px-3 py-1.5 shadow-xs">
            <Select value={qType} onValueChange={(v: any) => setQType(v)}>
              <SelectTrigger className="h-8 w-20 border-0 bg-slate-50 text-xs font-bold rounded-lg focus:ring-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="EXPENSE" className="text-xs font-bold text-rose-600">Gider</SelectItem>
                <SelectItem value="INCOME" className="text-xs font-bold text-emerald-600">Gelir</SelectItem>
              </SelectContent>
            </Select>

            <div className="h-4 w-px bg-slate-200 mx-1" />

            <Input 
              value={qDesc}
              onChange={e => setQDesc(e.target.value)}
              placeholder="Hızlı işlem açıklaması girin..." 
              className="h-8 border-0 bg-transparent text-xs flex-1 focus-visible:ring-0 px-1 font-medium shadow-none"
            />

            <Input 
              value={qAmount}
              onChange={e => setQAmount(e.target.value)}
              placeholder="₺ Tutar" 
              type="number"
              className="h-8 border-0 bg-transparent text-xs w-20 sm:w-28 font-mono font-bold text-right focus-visible:ring-0 px-1 shadow-none"
            />

            <Select value={qTag} onValueChange={setQTag}>
              <SelectTrigger className="h-8 w-32 border border-slate-100 bg-slate-50 text-xs rounded-lg hidden md:flex font-medium">
                <Tag className="w-3 h-3 mr-1 text-slate-400" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {tagsList.map(t => (
                  <SelectItem key={t.name} value={t.name} className="text-xs font-medium">
                    {t.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button 
              onClick={handleQuickSave}
              size="sm"
              className={`h-8 px-4 text-xs font-bold rounded-lg transition-all shadow-sm ${quickSaved ? "bg-emerald-600 hover:bg-emerald-700 text-white" : "bg-slate-900 hover:bg-slate-800 text-white"}`}
            >
              {quickSaved ? (
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Eklendi
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <Plus className="w-3.5 h-3.5 stroke-[2.5]" /> Hızlı Kaydet
                </span>
              )}
            </Button>
          </div>

          {/* Upper Right Quick Status Block */}
          <div className="text-right hidden xl:block">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Veritabanı Dönemi</span>
            <span className="text-xs font-black font-mono text-slate-800 block">Ekim - 2024 / Q4</span>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ACCENT CONTAINER ── */}
      <div className="max-w-screen-2xl mx-auto px-6 py-8 space-y-8">
        
        {/* PREMIUM MODULAR TABS HEADER */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 tracking-tight">
                Finansal Kumanda Merkezi
              </h1>
              <Badge className="bg-amber-100 text-amber-800 border border-amber-200 font-bold text-[10px] px-2 py-0.5 rounded-full shadow-xs">
                Premium
              </Badge>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Davut Kundura kurumsal nakit akışı, açık bankacılık mutabakatı ve borç/alacak takibi.
            </p>
          </div>

          {/* Premium customized navigation trigger list */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-200/70 p-1 rounded-xl w-full md:w-auto shadow-inner">
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
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all flex-1 md:flex-none justify-center tracking-tight ${isActive ? "bg-white text-slate-950 shadow-md ring-1 ring-slate-900/5" : "text-slate-600 hover:text-slate-950 hover:bg-white/50"}`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-slate-900 stroke-[2.5]" : "text-slate-500"}`} />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* ── TAB 1: DASHBOARD & CASHFLOW OVERVIEW ── */}
        {activeTab === "dashboard" && (
          <div className="space-y-8 animate-in fade-in-50 duration-500">
            
            {/* 4 Large Premium KPI Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {[
                { 
                  title: "Bu Ay Ciro Toplamı", 
                  value: 142000, 
                  prev: 134000, 
                  icon: TrendingUp, 
                  accent: "border-t-4 border-t-emerald-500",
                  sub: "B2B Bayi + E-Ticaret Siparişleri",
                  iconBg: "bg-emerald-50 text-emerald-600 border-emerald-100"
                },
                { 
                  title: "Bu Ay Gider Çıkışı", 
                  value: 55000, 
                  prev: 51000, 
                  icon: TrendingDown, 
                  accent: "border-t-4 border-t-rose-500",
                  sub: "Aylık işletme limitinin %73'ü",
                  iconBg: "bg-rose-50 text-rose-600 border-rose-100"
                },
                { 
                  title: "Net Kâr (Dönem)", 
                  value: 87000, 
                  prev: 83000, 
                  icon: Wallet, 
                  accent: "border-t-4 border-t-amber-500",
                  sub: "Net Kâr Marjı: %61.2 (Premium Seriler)",
                  iconBg: "bg-amber-50 text-amber-600 border-amber-100"
                },
                { 
                  title: "Kasa & Banka Toplamı", 
                  value: 284320, 
                  prev: null, 
                  icon: Building2, 
                  accent: "border-t-4 border-t-slate-800",
                  sub: "Kuveyt Türk + Ziraat + İş Bankası",
                  iconBg: "bg-slate-100 text-slate-800 border-slate-200"
                },
              ].map(kpi => {
                const pctChange = kpi.prev ? (((kpi.value - kpi.prev) / kpi.prev) * 100).toFixed(1) : null
                const isPositive = pctChange && parseFloat(pctChange) > 0
                return (
                  <Card key={kpi.title} className={`border-slate-200/90 bg-white shadow-sm hover:shadow-md transition-all ${kpi.accent} rounded-2xl`}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1.5">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                            {kpi.title}
                          </span>
                          <span className="text-2xl sm:text-3xl font-black font-mono tabular-nums text-slate-900 block tracking-tight">
                            {fmt(kpi.value)}
                          </span>
                        </div>
                        <div className={`p-2.5 rounded-xl border ${kpi.iconBg} shadow-xs`}>
                          <kpi.icon className="w-5 h-5 stroke-[2.5]" />
                        </div>
                      </div>

                      <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-slate-500 font-medium text-[11px] truncate max-w-[160px]">
                          {kpi.sub}
                        </span>
                        {pctChange && (
                          <span className={`font-bold font-mono inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] ${isPositive ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>
                            {isPositive ? "+" : ""}{pctChange}%
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* TIME RANGE SELECTOR BLOCK FOR DYNAMIC CHARTS (User requested feature) */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-500" />
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Grafik Zaman Çizelgesi Aralığı:
                </span>
              </div>

              {/* Range option pills */}
              <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
                {[
                  { id: "daily", label: "1 Haftalık (Günlük)" },
                  { id: "weekly", label: "Haftalık Kırılım" },
                  { id: "monthly", label: "Aylık Trend" },
                  { id: "quarterly", label: "3 Aylık (Çeyrek)" },
                  { id: "yearly", label: "Yıllık Özet" },
                  { id: "custom", label: "Özel Tarih Seçimi" },
                ].map(freq => {
                  const isSelected = chartPeriod === freq.id
                  return (
                    <button
                      key={freq.id}
                      onClick={() => setChartPeriod(freq.id as any)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${isSelected ? "bg-slate-900 text-white shadow-xs" : "bg-slate-100 hover:bg-slate-200/70 text-slate-600"}`}
                    >
                      {freq.label}
                    </button>
                  )
                })}
              </div>

              {/* Sub-inputs rendered if custom mode is selected */}
              {chartPeriod === "custom" && (
                <div className="flex items-center gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 w-full md:w-auto justify-end animate-in fade-in duration-200">
                  <Input 
                    type="date" 
                    value={customStartDate} 
                    onChange={e => setCustomStartDate(e.target.value)}
                    className="h-8 text-xs bg-slate-50 border-slate-200 w-32"
                  />
                  <span className="text-xs text-slate-400 font-bold">-</span>
                  <Input 
                    type="date" 
                    value={customEndDate} 
                    onChange={e => setCustomEndDate(e.target.value)}
                    className="h-8 text-xs bg-slate-50 border-slate-200 w-32"
                  />
                </div>
              )}
            </div>

            {/* Charts Row: Area Chart (Left) + Live Category Budget Bars (Right) */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
              
              {/* Dynamic Period Financial Trend Area Chart */}
              <Card className="xl:col-span-2 border-slate-200/90 bg-white shadow-sm rounded-2xl overflow-hidden">
                <CardHeader className="p-6 pb-3 bg-gradient-to-r from-slate-50 to-white border-b border-slate-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base font-serif font-bold text-slate-900 flex items-center gap-2">
                        <span>Gelir, Gider ve Kâr Büyüme Akışı</span>
                        <Badge variant="outline" className="text-[10px] font-mono bg-white uppercase">
                          {chartPeriod}
                        </Badge>
                      </CardTitle>
                      <p className="text-xs text-slate-500 mt-0.5">Seçilen döneme özel dinamik grafik ekstrapolasyonu</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-4 pb-6">
                  <ResponsiveContainer width="100%" height={260}>
                    <AreaChart data={activeChartData} margin={{ top: 10, right: 15, left: 5, bottom: 0 }}>
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
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                      <XAxis dataKey="per" tick={{ fontSize: 11, fill: "#64748b", fontWeight: 700 }} axisLine={false} tickLine={false} />
                      <YAxis tickFormatter={(v: any) => `₺${v / 1000}k`} tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} width={45} />
                      <Tooltip 
                        contentStyle={{ borderRadius: 12, fontSize: 12, border: "none", background: "#0f172a", color: "#f8fafc", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.4)" }} 
                        formatter={(val: any) => [fmt(val), ""]}
                      />
                      <Area type="monotone" dataKey="gelir" name="Brüt Gelir" stroke="#10b981" strokeWidth={2.5} fill="url(#areaGelir)" dot={{ stroke: "#10b981", strokeWidth: 2, r: 3, fill: "#fff" }} />
                      <Area type="monotone" dataKey="gider" name="İşletme Gideri" stroke="#f43f5e" strokeWidth={2.5} fill="url(#areaGider)" dot={{ stroke: "#f43f5e", strokeWidth: 2, r: 3, fill: "#fff" }} />
                      <Area type="monotone" dataKey="kar" name="Net Kâr" stroke="#f59e0b" strokeWidth={3} fill="url(#areaKar)" dot={{ stroke: "#f59e0b", strokeWidth: 2, r: 4, fill: "#fff" }} />
                    </AreaChart>
                  </ResponsiveContainer>
                  
                  <div className="flex items-center justify-center gap-8 pt-4 border-t border-slate-100 mt-2">
                    {[
                      { label: "Brüt Tahsilat Akışı", color: "#10b981" },
                      { label: "İşletme Gider Çıkışı", color: "#f43f5e" },
                      { label: "Net Dönem Kârı", color: "#f59e0b" },
                    ].map(legend => (
                      <div key={legend.label} className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 rounded-sm shadow-xs" style={{ background: legend.color }} />
                        <span className="text-xs text-slate-700 font-bold tracking-tight">{legend.label}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Live Category Budget Consumption Bars */}
              <Card className="border-slate-200/90 bg-white shadow-sm rounded-2xl">
                <CardHeader className="p-6 pb-3 border-b border-slate-100">
                  <CardTitle className="text-base font-serif font-bold text-slate-900">
                    Aylık Kategori Limit Tüketimi
                  </CardTitle>
                  <p className="text-xs text-slate-500 mt-0.5">Ekim ayı tahsisat kotaları dolum matrisi</p>
                </CardHeader>
                <CardContent className="p-6 space-y-4.5">
                  {EXPENSE_CATEGORIES.map(cat => {
                    const pct = Math.min(100, Math.round((cat.amount / cat.limit) * 100))
                    const isHigh = pct > 80
                    return (
                      <div key={cat.name} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-800 tracking-tight">{cat.name}</span>
                          <span className="font-mono font-bold text-slate-950">
                            {fmt(cat.amount)} <span className="text-slate-400 font-normal">/ {fmt(cat.limit)}</span>
                          </span>
                        </div>

                        {/* Custom styled progress container */}
                        <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden relative border border-slate-200/40 shadow-inner">
                          <div 
                            className={`h-full transition-all duration-700 rounded-full ${isHigh ? "bg-amber-500" : "bg-emerald-500"}`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>

                        <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium">
                          <span>Doluluk Oranı: %{pct}</span>
                          {isHigh && <span className="text-amber-600 font-extrabold tracking-tight">Kritik Seviyede</span>}
                        </div>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>

            </div>

            {/* Strategic Reserve Indicator Panel (BI / Tax Estimates) */}
            <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950 text-white p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden border border-slate-800">
              <Calculator className="w-64 h-64 text-slate-800/30 absolute -right-12 -bottom-12 pointer-events-none stroke-[1]" />
              
              <div className="space-y-2 relative z-10 max-w-xl">
                <div className="flex items-center gap-2.5">
                  <Badge className="bg-amber-500 text-slate-950 font-extrabold text-[10px] px-2.5 py-0.5 uppercase tracking-wider border-0 shadow-xs">
                    Kurumsal Vergi Zekası
                  </Badge>
                  <span className="text-xs text-slate-300 font-mono">• Ön Muhasebe Motoru</span>
                </div>
                <p className="text-sm font-bold text-slate-100 leading-relaxed">
                  Ayakkabı imalatı ve e-ticaret faturalarınıza istinaden tahmini yasal mali karşılıklar ayrılmıştır.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-6 relative z-10 border-t md:border-t-0 pt-4 md:pt-0 border-slate-800 w-full md:w-auto justify-start md:justify-end">
                <div className="space-y-0.5">
                  <span className="text-xs text-slate-400 block font-medium">Tahmini KDV Yükü (Ekim)</span>
                  <span className="text-xl font-black font-mono text-amber-400 block tracking-tight">₺21.400</span>
                </div>
                <div className="h-10 w-px bg-slate-800 hidden sm:block" />
                <div className="space-y-0.5">
                  <span className="text-xs text-slate-400 block font-medium">Kurumlar Vergisi Karşılığı</span>
                  <span className="text-xl font-black font-mono text-emerald-400 block tracking-tight">₺18.500</span>
                </div>
              </div>
            </div>

            {/* Row 3: Expense Pie chart breakdown & Weekly Cash Flow block */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              
              <Card className="border-slate-200/90 bg-white shadow-sm rounded-2xl overflow-hidden">
                <CardHeader className="p-6 pb-2 border-b border-slate-100 bg-slate-50/50">
                  <CardTitle className="text-base font-serif font-bold text-slate-900">
                    Gider Çıkışı Oransal Dağılımı
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5 pt-2">
                  <ResponsiveContainer width="100%" height={170}>
                    <PieChart>
                      <Pie 
                        data={EXPENSE_CATEGORIES} 
                        cx="50%" 
                        cy="50%" 
                        innerRadius={45} 
                        outerRadius={72} 
                        dataKey="value" 
                        paddingAngle={3}
                      >
                        {EXPENSE_CATEGORIES.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ borderRadius: 10, fontSize: 11, border: "none", background: "#0f172a", color: "#fff" }} 
                        formatter={(val: any) => [`%${val}`, "Pay"]}
                      />
                    </PieChart>
                  </ResponsiveContainer>

                  <div className="space-y-2.5 mt-3 divide-y divide-slate-50">
                    {EXPENSE_CATEGORIES.map(c => (
                      <div key={c.name} className="flex items-center justify-between pt-2 text-xs">
                        <div className="flex items-center gap-2.5 truncate">
                          <span className="w-3 h-3 rounded-xs flex-shrink-0 shadow-xs" style={{ background: c.color }} />
                          <span className="text-slate-700 font-bold truncate tracking-tight">{c.name}</span>
                        </div>
                        <span className="font-mono font-extrabold text-slate-900 flex-shrink-0 border border-slate-100 bg-slate-50 px-2 py-0.5 rounded">
                          %{c.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Weekly Daily Cashflow Input Bars */}
              <Card className="lg:col-span-2 border-slate-200/90 bg-white shadow-sm rounded-2xl overflow-hidden">
                <CardHeader className="p-6 pb-2 border-b border-slate-100 bg-slate-50/50">
                  <CardTitle className="text-base font-serif font-bold text-slate-900">
                    Haftalık Gün Bazlı Kasa Tahsilat Akışı
                  </CardTitle>
                  <p className="text-xs text-slate-500 mt-0.5">Pazartesi - Pazar anlık POS ve Banka nakit girdileri</p>
                </CardHeader>
                <CardContent className="p-4 pb-6">
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={WEEKLY_CASHFLOW} barSize={36} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                      <XAxis dataKey="gun" tick={{ fontSize: 11, fill: "#64748b", fontWeight: 700 }} axisLine={false} tickLine={false} />
                      <YAxis tickFormatter={(v: any) => `₺${v / 1000}k`} tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} width={42} />
                      <Tooltip 
                        contentStyle={{ borderRadius: 10, fontSize: 11, border: "none", background: "#0f172a", color: "#fff" }}
                        formatter={(val: any) => [fmt(val), "Tahsilat"]}
                      />
                      <Bar dataKey="nakit" name="Nakit Giriş" radius={[8, 8, 0, 0]}>
                        {WEEKLY_CASHFLOW.map((entry, index) => (
                          <Cell key={`bar-${index}`} fill={entry.gun === "Cmt" || entry.gun === "Cum" ? "#059669" : "#334155"} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                  <p className="text-center text-xs text-slate-500 mt-2 font-medium">
                    En yüksek tahsilat hacmi <strong className="text-emerald-700 font-extrabold tracking-tight">Cumartesi (Hafta sonu kampanyası)</strong> gerçekleşti.
                  </p>
                </CardContent>
              </Card>

            </div>

          </div>
        )}

        {/* ── TAB 2: OPEN BANKING & RECONCILIATION INTEGRATIONS ── */}
        {activeTab === "banks" && (
          <div className="animate-in fade-in-50 duration-500">
            <BankPanel />
          </div>
        )}

        {/* ── TAB 3: LEDGER ACCOUNTS & PENDING INVOICES (B2B/B2C) ── */}
        {activeTab === "ledger" && (
          <div className="space-y-6 animate-in fade-in-50 duration-500">
            
            <Card className="border-slate-200/90 bg-white shadow-sm overflow-hidden rounded-2xl">
              <CardHeader className="p-6 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-base font-serif font-bold text-slate-900">
                    Cari Hesaplar & Borç / Alacak Matrisi
                  </CardTitle>
                  <p className="text-xs text-slate-500 mt-0.5">
                    B2B toptan bayilerinizin açık bakiyeleri ve deri/taban tedarikçilerinizle mutabakat tablosu.
                  </p>
                </div>

                <div className="w-full sm:w-72">
                  <Input 
                    value={ledgerSearch}
                    onChange={e => setLedgerSearch(e.target.value)}
                    placeholder="Bayi veya tedarikçi ara..." 
                    className="h-9 text-xs bg-white border-slate-200 rounded-xl"
                  />
                </div>
              </CardHeader>

              {actionFeedback && (
                <div className="bg-emerald-50 text-emerald-950 p-4 px-6 text-xs font-bold border-b border-emerald-100 flex items-center gap-2.5 animate-in fade-in duration-300">
                  <FileCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 stroke-[2.5]" />
                  <span>{actionFeedback}</span>
                </div>
              )}

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/60 border-b border-slate-100 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                      <th className="p-4 px-6">Cari Ünvan</th>
                      <th className="p-4 px-6">Hesap Türü</th>
                      <th className="p-4 px-6 text-right">Anlık Bakiye</th>
                      <th className="p-4 px-6">Son Hareket</th>
                      <th className="p-4 px-6">Vade Durumu</th>
                      <th className="p-4 px-6 text-right">Hızlı Simülasyon</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs font-medium">
                    {filteredLedger.map(acc => {
                      const isOweUs = acc.balance > 0
                      const isCleared = acc.balance === 0
                      return (
                        <tr key={acc.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="p-4 px-6 font-bold text-slate-900 tracking-tight">
                            {acc.name}
                          </td>
                          <td className="p-4 px-6">
                            <Badge variant="outline" className={`text-[10px] font-mono font-bold px-2 py-0.5 ${acc.type.includes("MÜŞTERİ") ? "bg-indigo-50 text-indigo-700 border-indigo-100" : "bg-amber-50 text-amber-800 border-amber-200"}`}>
                              {acc.type}
                            </Badge>
                          </td>
                          <td className={`p-4 px-6 text-right font-black font-mono tabular-nums tracking-tight ${isCleared ? "text-slate-400" : isOweUs ? "text-emerald-600" : "text-rose-600"}`}>
                            {isCleared ? "₺0 (Mutabık)" : `${isOweUs ? "+" : ""}${fmt(acc.balance)}`}
                            <span className="text-[10px] block text-slate-400 font-normal">
                              {isCleared ? "Kapalı" : isOweUs ? "Bize Borçlu" : "Bizim Borcumuz"}
                            </span>
                          </td>
                          <td className="p-4 px-6 text-slate-500">
                            {acc.lastAction}
                          </td>
                          <td className="p-4 px-6">
                            <span className={`font-semibold ${acc.status === "overdue" ? "text-rose-600 font-black" : "text-slate-600"}`}>
                              {acc.due}
                            </span>
                          </td>
                          <td className="p-4 px-6 text-right">
                            {isCleared ? (
                              <span className="text-slate-400 text-xs italic inline-flex items-center gap-1 font-bold">
                                <Check className="w-3.5 h-3.5 text-emerald-500 stroke-[2.5]" /> Tamamlandı
                              </span>
                            ) : (
                              <Button 
                                onClick={() => handleSimulateLedgerPayment(acc.id, acc.name)}
                                size="sm" 
                                variant="outline" 
                                className="h-8 text-xs border-slate-300 hover:bg-slate-900 hover:text-white transition-all font-bold px-3"
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
                        <td colSpan={6} className="p-12 text-center text-slate-400 font-bold">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in-50 duration-500 items-start">
            
            {/* Create Custom Tag Control */}
            <Card className="border-slate-200/90 bg-white shadow-sm rounded-2xl overflow-hidden">
              <CardHeader className="p-6 pb-3 border-b border-slate-100 bg-slate-50/50">
                <CardTitle className="text-base font-serif font-bold text-slate-900">
                  Yeni Gider / Gelir Etiketi Tanımla
                </CardTitle>
                <p className="text-xs text-slate-500">Dinamik masraf kalemleri oluşturun</p>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">Etiket Adı</label>
                  <Input 
                    value={newTagName}
                    onChange={e => setNewTagName(e.target.value)}
                    placeholder="Örn: Fuar & Etkinlik Gideri" 
                    className="h-9 text-xs bg-white border-slate-200 font-medium"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">Aylık Bütçe Hedefi (₺ Limit)</label>
                  <Input 
                    value={newTagBudget}
                    onChange={e => setNewTagBudget(e.target.value)}
                    placeholder="Örn: 10000" 
                    type="number"
                    className="h-9 text-xs bg-white border-slate-200 font-mono font-bold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">Renk Kodu</label>
                  <div className="flex items-center gap-2">
                    <Input 
                      type="color" 
                      value={newTagColor}
                      onChange={e => setNewTagColor(e.target.value)}
                      className="w-12 h-9 p-1 border border-slate-200 bg-white cursor-pointer rounded-lg"
                    />
                    <code className="text-xs font-mono font-bold text-slate-700 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                      {newTagColor}
                    </code>
                  </div>
                </div>

                <Button 
                  onClick={handleAddCustomTag}
                  className="w-full h-9 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white gap-2 mt-3 shadow-md"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span>Sisteme Ekle</span>
                </Button>
              </CardContent>
            </Card>

            {/* List of Allowed Tags & Budgets */}
            <Card className="md:col-span-2 border-slate-200/90 bg-white shadow-sm rounded-2xl overflow-hidden">
              <CardHeader className="p-6 pb-3 border-b border-slate-100 flex flex-row items-center justify-between bg-slate-50/50">
                <div>
                  <CardTitle className="text-base font-serif font-bold text-slate-900">
                    Sistemde Aktif Etiketler & Tanımlı Limitler
                  </CardTitle>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium">
                    Hızlı işlem barında veya banka mutabakatında kullanılabilecek etiket havuzu
                  </p>
                </div>
                <Badge variant="secondary" className="text-xs font-mono font-bold px-2.5 py-0.5">
                  {tagsList.length} Kalem
                </Badge>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-slate-100 max-h-[420px] overflow-y-auto">
                  {tagsList.map(tag => (
                    <div key={tag.name} className="p-4 px-6 flex items-center justify-between hover:bg-slate-50/60 transition-colors">
                      <div className="flex items-center gap-3.5">
                        <span className="w-4 h-4 rounded-sm flex-shrink-0 shadow-xs" style={{ background: tag.color }} />
                        <div>
                          <span className="text-xs font-extrabold text-slate-900 block tracking-tight">{tag.name}</span>
                          <span className="text-[10px] text-slate-400 block font-mono">ID: tag_{tag.name.toLowerCase().replace(/\s+/g, "_")}</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-black font-mono text-slate-900 block tracking-tight">
                          {tag.budget > 0 ? `Limit: ${fmt(tag.budget)}` : "Limitsiz / Takipsiz"}
                        </span>
                        <span className="text-[10px] text-slate-400 block font-medium">Aylık Kota</span>
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
