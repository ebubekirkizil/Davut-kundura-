"use client"

import React, { useState } from "react"
import { 
  Building2, Lock, RefreshCw, Eye, EyeOff, CheckCircle2, 
  Clock, ArrowDownLeft, ArrowUpRight, Link2, Unlink, 
  AlertCircle, Check, Search, FileText 
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// ── Mock Data for Premium Bank Panel ──
const INITIAL_BANKS = [
  { 
    id: "b1", 
    name: "Ziraat Bankası", 
    accountName: "Davut Kundura Ticari Ana",
    iban: "TR12 0001 0012 3456 7890 1234 56", 
    balance: 184320, 
    currency: "TRY", 
    lastSync: "Bugün 13:45", 
    provider: "BulutTahsilat API",
    status: "active",
    color: "#16a34a" 
  },
  { 
    id: "b2", 
    name: "İş Bankası", 
    accountName: "Toptan Tahsilat & Döviz",
    iban: "TR98 0006 4000 0011 2345 6789 00", 
    balance: 100000, 
    currency: "TRY", 
    lastSync: "Bugün 13:44", 
    provider: "Hesabım API",
    status: "active",
    color: "#1d4ed8" 
  },
]

const INITIAL_TXS = [
  { id: "t1", bankName: "Ziraat Bankası", amount: 45000, desc: "EFT GELEN - KORAY AYAKKABICILIK - B2B AVANS", date: "Bugün 10:12", type: "IN", matched: false, matchedInvoice: null },
  { id: "t2", bankName: "İş Bankası", amount: -8200, desc: "ARAS KARGO TAKAS ÖDEMESİ - EKİM DÖNEMİ", date: "Bugün 09:30", type: "OUT", matched: true, matchedInvoice: "FAT-2024-0891" },
  { id: "t3", bankName: "Ziraat Bankası", amount: 3450, desc: "EFT GELEN - AHMET YILMAZ - E-TİCARET SİPARİŞ", date: "Dün 16:30", type: "IN", matched: false, matchedInvoice: null },
  { id: "t4", bankName: "İş Bankası", amount: -22000, desc: "HAKİKİ DERİ A.Ş. HAM MADDE VAKETA ÖDEMESİ", date: "Dün 11:00", type: "OUT", matched: true, matchedInvoice: "FAT-2024-0885" },
  { id: "t5", bankName: "Ziraat Bankası", amount: 12800, desc: "EFT GELEN - ZARİF DERİ A.Ş. - KAPARO", date: "23 Eki 14:20", type: "IN", matched: false, matchedInvoice: null },
  { id: "t6", bankName: "Ziraat Bankası", amount: -4500, desc: "OTOMATIK ÖDEME - KİRA PENDİK ATÖLYE", date: "22 Eki 08:00", type: "OUT", matched: true, matchedInvoice: "KİRA-10" },
]

const PENDING_INVOICES = [
  { id: "inv1", no: "ORD-2024-1041", customer: "Koray Ayakkabıcılık", amount: 45000, date: "24 Eki 2024" },
  { id: "inv2", no: "ORD-2024-1042", customer: "Ahmet Yılmaz", amount: 3450, date: "23 Eki 2024" },
  { id: "inv3", no: "ORD-2024-1038", customer: "Zarif Deri A.Ş.", amount: 12800, date: "20 Eki 2024" },
  { id: "inv4", no: "ORD-2024-1029", customer: "Kundura Sepeti Ltd.", amount: 18500, date: "15 Eki 2024" },
]

function fmt(n: number) { 
  return new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(n) 
}
function maskIban(s: string) { 
  return s.slice(0, 6) + " **** **** **** " + s.slice(-4) 
}

export default function BankPanel() {
  const [banks, setBanks] = useState(INITIAL_BANKS)
  const [txs, setTxs] = useState(INITIAL_TXS)
  const [showIban, setShowIban] = useState<Record<string, boolean>>({})
  const [isSyncing, setIsSyncing] = useState(false)
  const [selectedTxForMatch, setSelectedTxForMatch] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const toggleIban = (id: string) => setShowIban(p => ({ ...p, [id]: !p[id] }))

  const handleSync = () => {
    setIsSyncing(true)
    setTimeout(() => {
      setIsSyncing(false)
      // Simulate real-time data sync update
      setBanks(prev => prev.map(b => ({
        ...b,
        lastSync: "Az önce güncellendi"
      })))
    }, 1200)
  }

  const handleMatchInvoice = (txId: string, invoiceNo: string) => {
    setTxs(prev => prev.map(t => {
      if (t.id === txId) {
        return { ...t, matched: true, matchedInvoice: invoiceNo }
      }
      return t
    }))
    setSelectedTxForMatch(null)
  }

  const handleUnmatch = (txId: string) => {
    setTxs(prev => prev.map(t => {
      if (t.id === txId) {
        return { ...t, matched: false, matchedInvoice: null }
      }
      return t
    }))
  }

  const filteredTxs = txs.filter(t => 
    t.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.bankName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const unmatchedIncomingCount = txs.filter(t => t.type === "IN" && !t.matched).length

  return (
    <div className="space-y-6">
      {/* Top Controls & Security Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-slate-800" />
            <h2 className="text-base font-serif font-bold text-slate-900">Açık Bankacılık Entegrasyonları</h2>
            <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs px-2.5 py-0.5 gap-1.5 font-medium">
              <Lock className="w-3 h-3 text-emerald-600" />
              Sadece Okuma (Read-Only) Yetkili
            </Badge>
          </div>
          <p className="text-xs text-slate-500">
            Hesap hareketleri ve bakiyeler otomatik senkronize edilir. Para transferi ve talimat yetkisi güvenlik kuralı gereği kapalıdır.
          </p>
        </div>

        <div className="flex items-center gap-2 self-end md:self-auto">
          <Button 
            onClick={handleSync} 
            disabled={isSyncing} 
            variant="outline" 
            className="h-9 text-xs border-slate-300 hover:bg-slate-50 transition-all font-medium gap-2"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-slate-600 ${isSyncing ? "animate-spin text-emerald-600" : ""}`} />
            {isSyncing ? "Bağlanıyor..." : "Bankaları Senkronize Et"}
          </Button>
        </div>
      </div>

      {/* Connected Bank Accounts Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {banks.map(b => (
          <Card key={b.id} className="border-slate-200/80 bg-white shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            {/* Absolute accent indicator line */}
            <div className="absolute top-0 left-0 right-0 h-1" style={{ background: b.color }} />
            
            <CardContent className="p-5 pt-6">
              <div className="flex flex-col justify-between h-full space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900 tracking-tight">{b.name}</span>
                      <Badge variant="secondary" className="text-[10px] bg-slate-100 text-slate-600 font-mono">
                        {b.provider}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-500 font-medium">{b.accountName}</p>
                    
                    {/* IBAN Row */}
                    <div className="flex items-center gap-2 pt-1">
                      <code className="text-xs font-mono text-slate-600 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                        {showIban[b.id] ? b.iban : maskIban(b.iban)}
                      </code>
                      <button 
                        onClick={() => toggleIban(b.id)} 
                        className="text-slate-400 hover:text-slate-700 transition-colors p-1"
                        title={showIban[b.id] ? "Gizle" : "Göster"}
                      >
                        {showIban[b.id] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-slate-400 block font-medium">Anlık Bakiye</span>
                    <span className="text-xl font-black font-mono tabular-nums text-slate-900 block mt-0.5 tracking-tight">
                      {fmt(b.balance)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[11px] text-slate-500 font-medium">Canlı Bağlantı Aktif</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>Son Senkron: {b.lastSync}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Reconciliation Interactive Block */}
      <Card className="border-slate-200/80 bg-white shadow-sm overflow-hidden">
        <CardHeader className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <CardTitle className="text-sm font-serif font-bold text-slate-900">
                Banka Hesap Hareketleri & E-Mutabakat (Reconciliation)
              </CardTitle>
              {unmatchedIncomingCount > 0 && (
                <Badge className="bg-amber-50 text-amber-700 border border-amber-200 text-xs px-2 py-0.5">
                  {unmatchedIncomingCount} Eşleşmemiş Gelen EFT
                </Badge>
              )}
            </div>
            <p className="text-xs text-slate-500">
              Gelen ödemeleri bekleyen açık sipariş faturaları ile eşleştirerek cari hesap bakiyelerini güncelleyin.
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <Input 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Açıklama veya banka ara..." 
              className="pl-8 h-8 text-xs bg-white border-slate-200 w-full"
            />
          </div>
        </CardHeader>

        <div className="p-0">
          <div className="divide-y divide-slate-100">
            {filteredTxs.map(tx => {
              const isSelected = selectedTxForMatch === tx.id
              return (
                <div key={tx.id} className={`transition-all ${isSelected ? "bg-slate-50/90 border-l-4 border-slate-800" : "hover:bg-slate-50/40"}`}>
                  <div className="p-4 sm:px-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    {/* Left details */}
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${tx.type === "IN" ? "bg-emerald-50" : "bg-rose-50"}`}>
                        {tx.type === "IN" ? (
                          <ArrowDownLeft className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <ArrowUpRight className="w-4 h-4 text-rose-500" />
                        )}
                      </div>
                      
                      <div className="space-y-1 flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-bold text-slate-800 tracking-tight">{tx.desc}</span>
                          {tx.matched ? (
                            <span className="inline-flex items-center gap-1 text-[10px] font-medium bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-100">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              Eşleşti: {tx.matchedInvoice}
                            </span>
                          ) : (
                            tx.type === "IN" ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-medium bg-amber-50 text-amber-700 px-2 py-0.5 rounded border border-amber-200 animate-pulse">
                                <AlertCircle className="w-3 h-3 text-amber-600" />
                                Sipariş Eşleşmesi Bekliyor
                              </span>
                            ) : null
                          )}
                        </div>

                        <div className="flex items-center gap-2.5 text-xs text-slate-400">
                          <span className="font-medium text-slate-600">{tx.bankName}</span>
                          <span>•</span>
                          <span>{tx.date}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Amount & Matching Actions */}
                    <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0">
                      <span className={`text-base font-black font-mono tabular-nums tracking-tight ${tx.type === "IN" ? "text-emerald-600" : "text-rose-500"}`}>
                        {tx.type === "IN" ? "+" : "-"}{fmt(tx.amount)}
                      </span>

                      {tx.type === "IN" && (
                        <div>
                          {tx.matched ? (
                            <Button 
                              onClick={() => handleUnmatch(tx.id)}
                              size="sm" 
                              variant="ghost" 
                              className="h-8 text-xs text-slate-400 hover:text-rose-600 font-medium px-2 gap-1"
                              title="Eşleşmeyi Kaldır"
                            >
                              <Unlink className="w-3 h-3" />
                              <span>Ayır</span>
                            </Button>
                          ) : (
                            <Button
                              onClick={() => setSelectedTxForMatch(isSelected ? null : tx.id)}
                              size="sm"
                              className={`h-8 text-xs font-medium px-3 gap-1.5 transition-colors ${isSelected ? "bg-slate-800 text-white hover:bg-slate-900" : "bg-emerald-600 text-white hover:bg-emerald-700"}`}
                            >
                              <Link2 className="w-3.5 h-3.5" />
                              <span>{isSelected ? "Kapat" : "Siparişle Eşleştir"}</span>
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Drawer/Panel for Active Matching Simulation */}
                  {isSelected && (
                    <div className="bg-slate-100/70 p-4 border-t border-slate-200/60 transition-all">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5 text-slate-500" />
                            Bu EFT Satırı İçin Bekleyen Açık Faturalar / Siparişler:
                          </span>
                          <span className="text-[11px] text-slate-500 italic">
                            Ham Tutar: <strong className="text-slate-900 font-mono">{fmt(tx.amount)}</strong>
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                          {PENDING_INVOICES.map(inv => {
                            const isExactMatch = inv.amount === tx.amount
                            return (
                              <div 
                                key={inv.id}
                                onClick={() => handleMatchInvoice(tx.id, inv.no)}
                                className={`p-3 rounded-lg border bg-white cursor-pointer transition-all hover:border-slate-800 group relative ${isExactMatch ? "border-emerald-500 ring-1 ring-emerald-500/20" : "border-slate-200/80"}`}
                              >
                                {isExactMatch && (
                                  <span className="absolute -top-2 right-2 bg-emerald-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                                    Tam Uyumlu
                                  </span>
                                )}
                                <div className="space-y-1">
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-slate-900 font-mono">{inv.no}</span>
                                    <span className="text-xs font-black font-mono text-slate-900">{fmt(inv.amount)}</span>
                                  </div>
                                  <p className="text-xs text-slate-600 font-medium truncate">{inv.customer}</p>
                                  <p className="text-[10px] text-slate-400">{inv.date}</p>
                                </div>

                                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between">
                                  <span className="text-[10px] text-emerald-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                                    <Check className="w-3 h-3" /> Eşleştir
                                  </span>
                                  <span className="text-[10px] text-slate-400 group-hover:text-slate-900 transition-colors">
                                    Tıkla
                                  </span>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}

            {filteredTxs.length === 0 && (
              <div className="p-8 text-center text-slate-400 space-y-2">
                <p className="text-sm font-medium">Arama kriterinize uygun hesap hareketi bulunamadı.</p>
                <Button onClick={() => setSearchQuery("")} variant="link" size="sm" className="text-xs text-slate-600">
                  Filtreyi Temizle
                </Button>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
