"use client"

import React, { useState } from "react"
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts"
import {
  TrendingUp, TrendingDown, Wallet, ShoppingBag, Package,
  ArrowDownLeft, ArrowUpRight, Plus, Tag, AlertCircle,
  CheckCircle2, Clock, Building2, CreditCard, ChevronRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// ── DATA ──────────────────────────────────────────────────────────────────────

const monthly = [
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

const expenses = [
  { name: "Hammadde / Deri", value: 38, color: "#b45309", amount: 20900 },
  { name: "Kargo & Lojistik", value: 22, color: "#0891b2", amount: 12100 },
  { name: "Pazarlama", value: 14, color: "#7c3aed", amount: 7700 },
  { name: "Kira & Sabit", value: 18, color: "#475569", amount: 9900 },
  { name: "Personel", value: 8, color: "#059669", amount: 4400 },
]

const cashflow = [
  { gun: "Pzt", nakit: 12400 }, { gun: "Sal", nakit: 8200 },
  { gun: "Çar", nakit: 19800 }, { gun: "Per", nakit: 15600 },
  { gun: "Cum", nakit: 27300 }, { gun: "Cmt", nakit: 34100 },
  { gun: "Paz", nakit: 11200 },
]

const recentTxs = [
  { id: 1, desc: "Koray Ayakkabıcılık — B2B Sipariş", amount: 45000, type: "INCOME", tag: "Toptan", date: "Bugün 10:12", status: "CLEARED" },
  { id: 2, desc: "Vaketa Deri Alımı — Hakiki Deri A.Ş.", amount: 22000, type: "EXPENSE", tag: "Hammadde", date: "Bugün 08:45", status: "CLEARED" },
  { id: 3, desc: "Ahmet Yılmaz — ORD-2024-1042", amount: 3450, type: "INCOME", tag: "Web Satış", date: "Dün 16:30", status: "CLEARED" },
  { id: 4, desc: "Instagram Reklam Bütçesi", amount: 1850, type: "EXPENSE", tag: "Pazarlama", date: "Dün 12:00", status: "CLEARED" },
  { id: 5, desc: "Aras Kargo — Ekim Toplu", amount: 8200, type: "EXPENSE", tag: "Kargo", date: "23 Eki", status: "CLEARED" },
  { id: 6, desc: "Zarif Deri A.Ş. — Avans", amount: 12800, type: "INCOME", tag: "Toptan", date: "23 Eki", status: "PENDING" },
]

const pending = [
  { id: "p1", customer: "Koray Ayakkabıcılık", order: "ORD-2024-1041", amount: 25000, due: "30 Kas", type: "B2B", overdue: false },
  { id: "p2", customer: "Zarif Deri A.Ş.", order: "ORD-2024-1038", amount: 12800, due: "18 Kas", type: "B2B", overdue: false },
  { id: "p3", customer: "Mehmet Keleş", order: "ORD-2024-1035", amount: 890, due: "10 Kas", type: "B2C", overdue: true },
]

const KPIS = [
  { label: "Bu Ay Ciro", value: 142000, prev: 134000, icon: TrendingUp, color: "from-emerald-500 to-teal-400", fmt: true },
  { label: "Bu Ay Gider", value: 55000, prev: 51000, icon: TrendingDown, color: "from-rose-500 to-orange-400", fmt: true },
  { label: "Net Kâr", value: 87000, prev: 83000, icon: Wallet, color: "from-amber-500 to-yellow-400", fmt: true },
  { label: "Kasa + Banka", value: 284320, prev: null, icon: Building2, color: "from-slate-700 to-slate-500", fmt: true },
]

const TAGS = ["Hammadde", "Kargo", "Pazarlama", "Kira", "Personel", "Web Satış", "Toptan", "Diğer"]

function fmt(n: number) {
  return new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(n)
}

function pct(cur: number, prev: number) {
  return (((cur - prev) / prev) * 100).toFixed(1)
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-slate-900 text-white rounded-xl px-4 py-3 shadow-2xl text-xs space-y-1.5">
      <p className="font-semibold text-slate-300 mb-1">{label}</p>
      {payload.map((p: any) => (
        <div key={p.name} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-slate-400">{p.name}:</span>
          <span className="font-mono font-bold">{fmt(p.value)}</span>
        </div>
      ))}
    </div>
  )
}

// ── PAGE ──────────────────────────────────────────────────────────────────────

export default function FinancePage() {
  const [qDesc, setQDesc] = useState("")
  const [qAmount, setQAmount] = useState("")
  const [qType, setQType] = useState("EXPENSE")
  const [qTag, setQTag] = useState("Diğer")
  const [saved, setSaved] = useState(false)

  function quickSave() {
    if (!qDesc.trim() || !qAmount) return
    setSaved(true); setQDesc(""); setQAmount("")
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">

      {/* ── STICKY QUICK ENTRY ── */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
        <div className="max-w-screen-2xl mx-auto px-6 py-2.5 flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 mr-2">
            <div className="w-6 h-6 bg-slate-900 rounded-lg flex items-center justify-center">
              <CreditCard className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm font-serif font-bold text-slate-900">Finans</span>
          </div>
          <div className="h-5 w-px bg-slate-200 mx-1" />
          <Select value={qType} onValueChange={setQType}>
            <SelectTrigger className="h-8 w-20 border-slate-200 bg-slate-50 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="EXPENSE" className="text-xs">Gider</SelectItem>
              <SelectItem value="INCOME" className="text-xs">Gelir</SelectItem>
            </SelectContent>
          </Select>
          <Input value={qDesc} onChange={e => setQDesc(e.target.value)}
            placeholder="Açıklama... (örn: Kırtasiye gideri)" className="h-8 text-xs flex-1 min-w-[180px] bg-slate-50 border-slate-200" />
          <Input value={qAmount} onChange={e => setQAmount(e.target.value)}
            placeholder="₺ Tutar" type="number" className="h-8 text-xs w-28 font-mono bg-slate-50 border-slate-200" />
          <Select value={qTag} onValueChange={setQTag}>
            <SelectTrigger className="h-8 w-32 border-slate-200 bg-slate-50 text-xs">
              <Tag className="w-3 h-3 mr-1 text-slate-400" /><SelectValue />
            </SelectTrigger>
            <SelectContent>{TAGS.map(t => <SelectItem key={t} value={t} className="text-xs">{t}</SelectItem>)}</SelectContent>
          </Select>
          <Button onClick={quickSave} size="sm" className={`h-8 text-xs px-4 transition-all ${saved ? "bg-emerald-600" : "bg-slate-900"} text-white`}>
            {saved ? <><CheckCircle2 className="w-3 h-3 mr-1" />Kaydedildi</> : <><Plus className="w-3 h-3 mr-1" />Kaydet</>}
          </Button>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-6 py-6 space-y-6">

        {/* ── KPI CARDS ── */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {KPIS.map(k => {
            const diff = k.prev ? parseFloat(pct(k.value, k.prev)) : 0
            const up = diff >= 0
            return (
              <Card key={k.label} className="border-slate-200 bg-white shadow-sm overflow-hidden">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">{k.label}</p>
                      <p className="text-2xl font-black font-mono tabular-nums text-slate-900 mt-2">{fmt(k.value)}</p>
                    </div>
                    <div className={`p-2.5 rounded-xl bg-gradient-to-br ${k.color} shadow-sm`}>
                      <k.icon className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  {k.prev && (
                    <div className={`flex items-center gap-1 mt-3 text-xs font-semibold ${up ? "text-emerald-600" : "text-rose-500"}`}>
                      {up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      %{Math.abs(diff)} geçen aya göre
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* ── CHARTS ROW 1 ── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* Monthly Revenue/Expense Area Chart — 2 cols */}
          <Card className="xl:col-span-2 border-slate-200 bg-white shadow-sm">
            <CardHeader className="pb-2 pt-5 px-6">
              <CardTitle className="text-sm font-serif font-bold text-slate-900">Gelir & Gider Trendi (10 Ay)</CardTitle>
              <p className="text-xs text-slate-400 mt-0.5">Aylık net kâr performansı</p>
            </CardHeader>
            <CardContent className="px-2 pb-4">
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={monthly} margin={{ top: 5, right: 20, left: 10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gGelir" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gGider" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gKar" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="ay" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis tickFormatter={v => `₺${v / 1000}K`} tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} width={48} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="gelir" name="Gelir" stroke="#10b981" strokeWidth={2} fill="url(#gGelir)" dot={false} />
                  <Area type="monotone" dataKey="gider" name="Gider" stroke="#f43f5e" strokeWidth={2} fill="url(#gGider)" dot={false} />
                  <Area type="monotone" dataKey="kar" name="Net Kâr" stroke="#f59e0b" strokeWidth={2.5} fill="url(#gKar)" dot={false} strokeDasharray="0" />
                </AreaChart>
              </ResponsiveContainer>
              <div className="flex items-center gap-5 justify-center mt-1">
                {[{ c: "#10b981", l: "Gelir" }, { c: "#f43f5e", l: "Gider" }, { c: "#f59e0b", l: "Net Kâr" }].map(i => (
                  <div key={i.l} className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm" style={{ background: i.c }} />
                    <span className="text-xs text-slate-500">{i.l}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Expense Pie — 1 col */}
          <Card className="border-slate-200 bg-white shadow-sm">
            <CardHeader className="pb-2 pt-5 px-6">
              <CardTitle className="text-sm font-serif font-bold text-slate-900">Gider Dağılımı</CardTitle>
              <p className="text-xs text-slate-400 mt-0.5">Bu ay toplam: {fmt(55000)}</p>
            </CardHeader>
            <CardContent className="pb-4">
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={expenses} cx="50%" cy="50%" innerRadius={45} outerRadius={72}
                    dataKey="value" paddingAngle={3} startAngle={90} endAngle={-270}>
                    {expenses.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                  <Tooltip formatter={(v: any) => `%${v}`} contentStyle={{ borderRadius: 12, fontSize: 12, border: "none", background: "#1e293b", color: "#fff" }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-1 px-1">
                {expenses.map(e => (
                  <div key={e.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: e.color }} />
                      <span className="text-xs text-slate-600">{e.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">%{e.value}</span>
                      <span className="text-xs font-mono font-semibold text-slate-800">{fmt(e.amount)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ── CHARTS ROW 2 ── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* Weekly Cash Flow Bar */}
          <Card className="border-slate-200 bg-white shadow-sm">
            <CardHeader className="pb-2 pt-5 px-6">
              <CardTitle className="text-sm font-serif font-bold text-slate-900">Bu Hafta Nakit Akışı</CardTitle>
              <p className="text-xs text-slate-400 mt-0.5">Günlük kasa girişleri</p>
            </CardHeader>
            <CardContent className="px-2 pb-4">
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={cashflow} margin={{ top: 5, right: 10, left: 0, bottom: 0 }} barSize={28}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="gun" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis tickFormatter={v => `₺${v / 1000}K`} tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} width={40} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="nakit" name="Nakit Giriş" radius={[6, 6, 0, 0]}>
                    {cashflow.map((_, i) => (
                      <Cell key={i} fill={i === 5 ? "#f59e0b" : "#1e293b"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <p className="text-center text-xs text-slate-400 mt-1">En yüksek: <span className="text-amber-600 font-semibold">Cumartesi</span></p>
            </CardContent>
          </Card>

          {/* Recent Transactions — 2 cols */}
          <Card className="xl:col-span-2 border-slate-200 bg-white shadow-sm overflow-hidden">
            <CardHeader className="pb-2 pt-5 px-6 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm font-serif font-bold text-slate-900">Son İşlemler</CardTitle>
                <p className="text-xs text-slate-400 mt-0.5">Gerçek zamanlı kasa ve banka hareketleri</p>
              </div>
              <Button variant="ghost" size="sm" className="text-xs text-amber-600 h-7 gap-1">
                Tümü <ChevronRight className="w-3 h-3" />
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100">
                {recentTxs.map(tx => (
                  <div key={tx.id} className="flex items-center gap-4 px-6 py-3.5 hover:bg-slate-50/70 transition-colors">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${tx.type === "INCOME" ? "bg-emerald-50" : "bg-rose-50"}`}>
                      {tx.type === "INCOME"
                        ? <ArrowDownLeft className="w-4 h-4 text-emerald-600" />
                        : <ArrowUpRight className="w-4 h-4 text-rose-500" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800 truncate">{tx.desc}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded font-medium">{tx.tag}</span>
                        <span className="text-[10px] text-slate-400">{tx.date}</span>
                        {tx.status === "PENDING" && <span className="text-[10px] text-amber-600 flex items-center gap-0.5"><Clock className="w-2.5 h-2.5" />Bekliyor</span>}
                      </div>
                    </div>
                    <p className={`text-sm font-bold font-mono tabular-nums ${tx.type === "INCOME" ? "text-emerald-600" : "text-rose-500"}`}>
                      {tx.type === "INCOME" ? "+" : "-"}{fmt(tx.amount)}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ── PENDING PAYMENTS ── */}
        <Card className="border-slate-200 bg-white shadow-sm overflow-hidden">
          <CardHeader className="pt-5 pb-3 px-6 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-sm font-serif font-bold text-slate-900">Tahsilat Bekleyen Borçlar</CardTitle>
              <p className="text-xs text-slate-400 mt-0.5">B2B açık hesap ve vadeli ödemeler</p>
            </div>
            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-xs">
              {pending.length} bekliyor
            </Badge>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100">
              {pending.map(p => (
                <div key={p.id} className={`px-6 py-4 flex items-start justify-between gap-4 ${p.overdue ? "bg-rose-50/40" : ""}`}>
                  <div className="flex items-start gap-3">
                    {p.overdue
                      ? <AlertCircle className="w-4 h-4 text-rose-500 mt-0.5 flex-shrink-0" />
                      : <Clock className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />}
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{p.customer}</p>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">{p.order}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <Badge variant="outline" className={`text-[10px] border-0 px-1.5 py-0 ${p.type === "B2B" ? "bg-indigo-100 text-indigo-700" : "bg-slate-100 text-slate-600"}`}>{p.type}</Badge>
                        <span className={`text-[10px] font-semibold ${p.overdue ? "text-rose-600" : "text-slate-500"}`}>Son: {p.due}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-black font-mono tabular-nums text-slate-900">{fmt(p.amount)}</p>
                    <Button size="sm" variant="outline" className="text-[10px] h-6 mt-1.5 border-slate-300">Tahsil Et</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
