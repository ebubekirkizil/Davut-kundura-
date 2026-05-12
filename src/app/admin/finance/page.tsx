"use client"

import React, { useState } from "react"
import { 
  ArrowDownLeft, ArrowUpRight, CheckCircle2, Clock, AlertCircle, 
  Link2, Unlink, Plus, Tag, RefreshCw, Building2, Filter, ChevronDown
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"

// ─── Types ────────────────────────────────────────────────────────────────────

interface BankTx {
  id: string
  amount: number
  description: string
  transactedAt: string
  isMatched: boolean
}

interface PendingPayment {
  id: string
  orderNumber: string
  customer: string
  amount: number
  type: "B2B" | "B2C"
  dueDate: string
}

interface RecentTx {
  id: string
  type: "INCOME" | "EXPENSE"
  amount: number
  description: string
  tag: string
  tagColor: string
  source: string
  status: "PENDING" | "CLEARED"
  date: string
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const BANK_TXS: BankTx[] = [
  { id: "b1", amount: 45000, description: "EFT GELEN - KORAY AYAKKABICILIK - ORD-2024-1041", transactedAt: "2024-10-24T10:12:00Z", isMatched: false },
  { id: "b2", amount: 3450, description: "EFT GELEN - AHMET YILMAZ - 05321234567", transactedAt: "2024-10-24T09:45:00Z", isMatched: false },
  { id: "b3", amount: -8200, description: "OTOMATIK ODEME - ARAS KARGO TAKAS", transactedAt: "2024-10-23T16:00:00Z", isMatched: true },
  { id: "b4", amount: 12800, description: "EFT GELEN - ZARIF DERI A.S. - AVANS", transactedAt: "2024-10-23T11:30:00Z", isMatched: false },
  { id: "b5", amount: -4500, description: "CEKILIS - KIRA OCAK 2024", transactedAt: "2024-10-22T08:00:00Z", isMatched: true },
]

const PENDING_PAYMENTS: PendingPayment[] = [
  { id: "p1", orderNumber: "ORD-2024-1041", customer: "Koray Ayakkabıcılık", amount: 45000, type: "B2B", dueDate: "2024-10-24" },
  { id: "p2", orderNumber: "ORD-2024-1042", customer: "Ahmet Yılmaz", amount: 3450, type: "B2C", dueDate: "2024-10-24" },
  { id: "p3", orderNumber: "ORD-2024-1038", customer: "Zarif Deri A.Ş.", amount: 12800, type: "B2B", dueDate: "2024-11-18" },
  { id: "p4", orderNumber: "ORD-2024-1037", customer: "Can Kaya", amount: 890, type: "B2C", dueDate: "2024-10-20" },
]

const RECENT_TXS: RecentTx[] = [
  { id: "t1", type: "INCOME", amount: 3450, description: "Ahmet Yılmaz - ORD-2024-1042", tag: "Web Satış", tagColor: "#10b981", source: "BANK", status: "CLEARED", date: "2024-10-24" },
  { id: "t2", type: "EXPENSE", amount: 8200, description: "Aras Kargo - Ekim toplu ödeme", tag: "Kargo Gideri", tagColor: "#f59e0b", source: "BANK", status: "CLEARED", date: "2024-10-23" },
  { id: "t3", type: "EXPENSE", amount: 1850, description: "Instagram Reklam Bütçesi", tag: "Pazarlama", tagColor: "#8b5cf6", source: "CARD", status: "CLEARED", date: "2024-10-22" },
  { id: "t4", type: "INCOME", amount: 45000, description: "Koray Ayakkabıcılık B2B Avans", tag: "Toptan Satış", tagColor: "#3b82f6", source: "BANK", status: "PENDING", date: "2024-10-22" },
  { id: "t5", type: "EXPENSE", amount: 22000, description: "Vaketa Deri Alımı - Hakiki Deri A.Ş.", tag: "Deri Alımı", tagColor: "#b45309", source: "TRANSFER", status: "CLEARED", date: "2024-10-21" },
  { id: "t6", type: "EXPENSE", amount: 4500, description: "Ocak Kirası", tag: "Kira", tagColor: "#64748b", source: "BANK", status: "CLEARED", date: "2024-10-20" },
]

const TAGS = ["Web Satış", "Toptan Satış", "Kargo Gideri", "Deri Alımı", "Pazarlama", "Kira", "Maaş", "Diğer"]

// ─── KPI Bar ─────────────────────────────────────────────────────────────────

const KPIS = [
  { label: "Banka Bakiyesi", value: "₺284.320", sub: "Ziraat + İş Bankası", trend: null },
  { label: "Bu Ay Ciro", value: "₺127.450", sub: "+%14 geçen aya göre", trend: "up" },
  { label: "Bu Ay Gider", value: "₺48.200", sub: "Bütçenin %71'i", trend: "neutral" },
  { label: "Eşleşmeyi Bekleyen", value: "3 Havale", sub: "₺61.250 eşleşmedi", trend: "warn" },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FinancePage() {
  // Quick entry state
  const [qDesc, setQDesc] = useState("")
  const [qAmount, setQAmount] = useState("")
  const [qType, setQType] = useState<"INCOME" | "EXPENSE">("EXPENSE")
  const [qTag, setQTag] = useState("Diğer")
  const [qSaved, setQSaved] = useState(false)

  // Reconciliation state
  const [selectedBank, setSelectedBank] = useState<string | null>(null)
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null)
  const [bankTxs, setBankTxs] = useState(BANK_TXS)
  const [payments, setPayments] = useState(PENDING_PAYMENTS)

  function handleQuickSave() {
    if (!qDesc || !qAmount) return
    setQSaved(true)
    setQDesc("")
    setQAmount("")
    setTimeout(() => setQSaved(false), 2000)
  }

  function handleReconcile() {
    if (!selectedBank || !selectedPayment) return
    setBankTxs(b => b.map(t => t.id === selectedBank ? { ...t, isMatched: true } : t))
    setPayments(p => p.filter(t => t.id !== selectedPayment))
    setSelectedBank(null)
    setSelectedPayment(null)
  }

  const unmatchedCount = bankTxs.filter(b => !b.isMatched).length

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">

      {/* ── Sticky Top Bar ── */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm px-6 py-3">
        <div className="max-w-screen-2xl mx-auto flex flex-wrap items-center gap-3">
          {/* Quick Expense Bar */}
          <div className="flex items-center gap-2 flex-1 min-w-0 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
            <Select value={qType} onValueChange={v => setQType(v as "INCOME" | "EXPENSE")}>
              <SelectTrigger className="h-7 w-24 border-0 bg-transparent text-xs font-semibold p-0 focus:ring-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="EXPENSE" className="text-xs">Gider</SelectItem>
                <SelectItem value="INCOME" className="text-xs">Gelir</SelectItem>
              </SelectContent>
            </Select>
            <div className="h-4 w-px bg-slate-200" />
            <Input
              value={qDesc}
              onChange={e => setQDesc(e.target.value)}
              placeholder="Açıklama (Örn: Kırtasiye gideri...)"
              className="h-7 border-0 bg-transparent text-sm flex-1 focus-visible:ring-0 p-0"
            />
            <Input
              value={qAmount}
              onChange={e => setQAmount(e.target.value)}
              placeholder="₺ tutar"
              className="h-7 border-0 bg-transparent text-sm w-24 text-right focus-visible:ring-0 p-0 font-mono"
              type="number"
            />
            <Select value={qTag} onValueChange={setQTag}>
              <SelectTrigger className="h-7 w-28 border border-slate-200 bg-white text-xs rounded-lg">
                <Tag className="h-3 w-3 mr-1 text-slate-400" /><SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TAGS.map(t => <SelectItem key={t} value={t} className="text-xs">{t}</SelectItem>)}
              </SelectContent>
            </Select>
            <Button
              size="sm"
              onClick={handleQuickSave}
              className={`h-7 px-3 text-xs transition-all ${qSaved ? "bg-emerald-600 hover:bg-emerald-700" : "bg-slate-900 hover:bg-slate-800"} text-white`}
            >
              {qSaved ? <><CheckCircle2 className="h-3 w-3 mr-1" />Kaydedildi</> : <><Plus className="h-3 w-3 mr-1" />Kaydet</>}
            </Button>
          </div>

          <Button variant="outline" size="sm" className="border-slate-300 bg-white text-xs h-9 gap-1.5 whitespace-nowrap">
            <RefreshCw className="h-3.5 w-3.5" />Banka Senkronize Et
          </Button>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto w-full px-6 py-6 space-y-6">

        {/* ── KPI Cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {KPIS.map(k => (
            <Card key={k.label} className="border-slate-200 bg-white shadow-sm">
              <CardContent className="p-5">
                <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">{k.label}</p>
                <p className="text-2xl font-bold font-mono text-slate-900 mt-2 tabular-nums">{k.value}</p>
                <p className={`text-xs mt-1 ${k.trend === "up" ? "text-emerald-600" : k.trend === "warn" ? "text-amber-600" : "text-slate-400"}`}>
                  {k.sub}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ── Main Content: Reconciliation (Left) + Recent Txs (Right) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">

          {/* RECONCILIATION PANEL — 3 cols */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-serif font-bold text-slate-900">Banka Mutabakatı</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  <span className="text-amber-600 font-semibold">{unmatchedCount} havale</span> eşleşmeyi bekliyor
                </p>
              </div>
              {selectedBank && selectedPayment && (
                <Button
                  onClick={handleReconcile}
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs gap-1.5"
                >
                  <Link2 className="h-3.5 w-3.5" /> Eşleştir
                </Button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Sol: Banka Hareketleri */}
              <Card className="border-slate-200 bg-white shadow-sm overflow-hidden">
                <CardHeader className="py-3 px-4 border-b border-slate-100 bg-slate-50">
                  <CardTitle className="text-xs uppercase tracking-widest text-slate-500 flex items-center gap-2">
                    <Building2 className="h-3.5 w-3.5" /> Banka Hareketleri
                  </CardTitle>
                </CardHeader>
                <div className="divide-y divide-slate-100 max-h-[420px] overflow-y-auto">
                  {bankTxs.map(tx => (
                    <div
                      key={tx.id}
                      onClick={() => !tx.isMatched && setSelectedBank(selectedBank === tx.id ? null : tx.id)}
                      className={`px-4 py-3 transition-colors ${tx.isMatched ? "opacity-40 cursor-default" : "cursor-pointer hover:bg-slate-50"} ${selectedBank === tx.id ? "bg-amber-50 border-l-2 border-l-amber-400" : ""}`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-slate-700 line-clamp-2 leading-relaxed">{tx.description}</p>
                          <p className="text-[10px] text-slate-400 mt-1 font-mono">
                            {new Date(tx.transactedAt).toLocaleDateString("tr-TR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className={`text-sm font-bold font-mono tabular-nums ${tx.amount > 0 ? "text-emerald-600" : "text-rose-600"}`}>
                            {tx.amount > 0 ? "+" : ""}{tx.amount.toLocaleString("tr-TR")} ₺
                          </p>
                          {tx.isMatched && <span className="text-[10px] text-emerald-600 flex items-center gap-0.5 justify-end mt-0.5"><CheckCircle2 className="h-3 w-3" /> Eşlendi</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Sağ: Bekleyen Ödemeler */}
              <Card className="border-slate-200 bg-white shadow-sm overflow-hidden">
                <CardHeader className="py-3 px-4 border-b border-slate-100 bg-slate-50">
                  <CardTitle className="text-xs uppercase tracking-widest text-slate-500 flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5" /> Bekleyen Ödemeler
                  </CardTitle>
                </CardHeader>
                <div className="divide-y divide-slate-100 max-h-[420px] overflow-y-auto">
                  {payments.map(p => (
                    <div
                      key={p.id}
                      onClick={() => setSelectedPayment(selectedPayment === p.id ? null : p.id)}
                      className={`px-4 py-3 cursor-pointer transition-colors hover:bg-slate-50 ${selectedPayment === p.id ? "bg-amber-50 border-l-2 border-l-amber-400" : ""}`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-slate-800 truncate">{p.customer}</p>
                          <p className="text-[10px] text-slate-400 font-mono mt-0.5">{p.orderNumber}</p>
                          <div className="flex items-center gap-1.5 mt-1.5">
                            <Badge variant="outline" className={`text-[10px] px-1.5 py-0 border-0 ${p.type === "B2B" ? "bg-indigo-100 text-indigo-700" : "bg-slate-100 text-slate-600"}`}>
                              {p.type}
                            </Badge>
                            <span className="text-[10px] text-slate-400">{new Date(p.dueDate).toLocaleDateString("tr-TR", { day: "numeric", month: "short" })}</span>
                          </div>
                        </div>
                        <p className="text-sm font-bold font-mono tabular-nums text-slate-900 flex-shrink-0">
                          {p.amount.toLocaleString("tr-TR")} ₺
                        </p>
                      </div>
                    </div>
                  ))}
                  {payments.length === 0 && (
                    <div className="py-12 text-center text-slate-400">
                      <CheckCircle2 className="h-8 w-8 mx-auto mb-2 text-emerald-400" />
                      <p className="text-xs">Tüm ödemeler eşleştirildi</p>
                    </div>
                  )}
                </div>
              </Card>
            </div>

            {/* Eşleştirme ipucu */}
            {(selectedBank || selectedPayment) && !(selectedBank && selectedPayment) && (
              <p className="text-xs text-center text-amber-600 bg-amber-50 border border-amber-200 rounded-lg py-2">
                Şimdi {selectedBank ? "sağdan bir ödeme" : "soldan bir banka hareketi"} seçin → Yeşil "Eşleştir" butonu belirecek.
              </p>
            )}
          </div>

          {/* RECENT TRANSACTIONS — 2 cols */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-serif font-bold text-slate-900">Son Hareketler</h2>
              <Button variant="outline" size="sm" className="border-slate-200 bg-white text-xs h-8 gap-1">
                <Filter className="h-3 w-3" /> Filtrele
              </Button>
            </div>
            <Card className="border-slate-200 bg-white shadow-sm overflow-hidden">
              <div className="divide-y divide-slate-100">
                {RECENT_TXS.map(tx => (
                  <div key={tx.id} className="px-5 py-3.5 hover:bg-slate-50/50 transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${tx.type === "INCOME" ? "bg-emerald-50" : "bg-rose-50"}`}>
                        {tx.type === "INCOME"
                          ? <ArrowDownLeft className="h-3.5 w-3.5 text-emerald-600" />
                          : <ArrowUpRight className="h-3.5 w-3.5 text-rose-600" />
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-slate-800 truncate">{tx.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium" style={{ backgroundColor: tx.tagColor + "22", color: tx.tagColor }}>
                            {tx.tag}
                          </span>
                          <span className="text-[10px] text-slate-400">{tx.source}</span>
                          {tx.status === "PENDING" && (
                            <span className="text-[10px] text-amber-600 flex items-center gap-0.5">
                              <Clock className="h-2.5 w-2.5" /> Bekliyor
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className={`text-sm font-bold font-mono tabular-nums ${tx.type === "INCOME" ? "text-emerald-600" : "text-rose-600"}`}>
                          {tx.type === "INCOME" ? "+" : "-"}{tx.amount.toLocaleString("tr-TR")} ₺
                        </p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{new Date(tx.date).toLocaleDateString("tr-TR", { day: "numeric", month: "short" })}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
