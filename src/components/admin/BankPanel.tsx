"use client"

import React, { useState } from "react"
import { 
  Building2, Lock, RefreshCw, Eye, EyeOff, CheckCircle2, 
  Clock, ArrowDownLeft, ArrowUpRight, Link2, Unlink, 
  AlertCircle, Check, Search, FileText, Plus, Key, 
  ExternalLink, HelpCircle, ShieldCheck
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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
    color: "#16a34a",
    logoText: "ZB"
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
    color: "#1d4ed8",
    logoText: "İB"
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
  if (!s) return ""
  return s.slice(0, 6) + " **** **** **** " + s.slice(-4) 
}

export default function BankPanel() {
  const [banks, setBanks] = useState(INITIAL_BANKS)
  const [txs, setTxs] = useState(INITIAL_TXS)
  const [showIban, setShowIban] = useState<Record<string, boolean>>({})
  const [isSyncing, setIsSyncing] = useState(false)
  const [selectedTxForMatch, setSelectedTxForMatch] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  // Form state for connecting a new Bank (e.g. Kuveyt Türk)
  const [showAddBankModal, setShowAddBankModal] = useState(false)
  const [newBankName, setNewBankName] = useState("Kuveyt Türk Katılım Bankası")
  const [newAccountName, setNewAccountName] = useState("Kuveyt Türk Toptan & POS Hesabı")
  const [newIban, setNewIban] = useState("TR56 0020 5000 0001 2345 6789 01")
  const [newClientId, setNewClientId] = useState("")
  const [newClientSecret, setNewClientSecret] = useState("")
  const [apiMethod, setApiMethod] = useState("Kuveyt Türk API Market (Doğrudan)")
  const [initialBalance, setInitialBalance] = useState("75000")

  const toggleIban = (id: string) => setShowIban(p => ({ ...p, [id]: !p[id] }))

  const handleSync = () => {
    setIsSyncing(true)
    setTimeout(() => {
      setIsSyncing(false)
      setBanks(prev => prev.map(b => ({
        ...b,
        lastSync: "Az önce güncellendi (Canlı)"
      })))
      // Trigger a simulated incoming pulse
    }, 1000)
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

  const handleAddNewBankSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newIban.trim()) return

    const newId = `b_${Date.now()}`
    const bankObj = {
      id: newId,
      name: newBankName,
      accountName: newAccountName || "Ticari Vadesiz Hesap",
      iban: newIban,
      balance: initialBalance ? parseFloat(initialBalance) : 0,
      currency: "TRY",
      lastSync: "Az önce API ile bağlandı",
      provider: apiMethod,
      status: "active",
      color: newBankName.includes("Kuveyt") ? "#059669" : "#6366f1",
      logoText: newBankName.includes("Kuveyt") ? "KT" : "BNK"
    }

    setBanks(prev => [...prev, bankObj])
    
    // Simulate incoming transfers from this newly linked account
    if (newBankName.includes("Kuveyt")) {
      setTxs(prev => [
        {
          id: `t_kt_${Date.now()}`,
          bankName: "Kuveyt Türk Katılım Bankası",
          amount: 32500,
          desc: "EFT GELEN - PENDİK DERİCİLİK SAN. - KUVEYTTÜRK API",
          date: "Bugün 14:10",
          type: "IN",
          matched: false,
          matchedInvoice: null
        },
        ...prev
      ])
    }

    setShowAddBankModal(false)
    // reset form fields optionally
  }

  const filteredTxs = txs.filter(t => 
    t.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.bankName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const unmatchedIncomingCount = txs.filter(t => t.type === "IN" && !t.matched).length

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-500">
      
      {/* ── STYLISH HEADER SECTION ── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 p-6 text-white shadow-xl">
        {/* Subtle background glow circles */}
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-500/10 blur-2xl" />
        <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-indigo-500/10 blur-2xl" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-emerald-500/20 px-2.5 py-1 text-xs font-bold text-emerald-300 border border-emerald-500/30 backdrop-blur-xs flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Açık Bankacılık Kurumsal API
              </span>
              <span className="text-xs text-slate-400 font-mono">• Salt Okunur (Read-Only)</span>
            </div>
            <h2 className="text-xl font-serif font-bold tracking-tight text-white">
              Banka Entegrasyonları & Otomatik E-Mutabakat
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Kuveyt Türk, Ziraat, İş Bankası ve diğer kurumsal hesaplarınızı doğrudan API anahtarları ile bağlayın. 
              Sistem para transferi yapamaz; yalnızca anlık bakiye ve hesap hareketlerini mutabakat için çeker.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 self-stretch md:self-auto justify-end">
            <Button 
              onClick={handleSync} 
              disabled={isSyncing} 
              variant="secondary" 
              className="h-10 px-4 text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/10 backdrop-blur-xs transition-all gap-2 w-full sm:w-auto"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${isSyncing ? "animate-spin" : ""}`} />
              {isSyncing ? "Senkronize Ediliyor..." : "Tüm Bankaları Güncelle"}
            </Button>

            <Button
              onClick={() => setShowAddBankModal(true)}
              className="h-10 px-4 text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-slate-950 shadow-lg shadow-emerald-500/20 transition-all gap-2 w-full sm:w-auto"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Yeni Banka Bağla API</span>
            </Button>
          </div>
        </div>
      </div>

      {/* ── PREMIUM CONNECTED BANK CARDS ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {banks.map(b => (
          <div 
            key={b.id} 
            className="group relative rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-slate-300 flex flex-col justify-between h-full"
          >
            {/* Top custom colored tag bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl" style={{ background: b.color }} />

            <div className="space-y-4 pt-1">
              {/* Header block */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  {/* Bank Circle Logo simulation */}
                  <div 
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl font-bold text-white text-xs shadow-inner"
                    style={{ background: b.color }}
                  >
                    {b.logoText || "BNK"}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-slate-950 tracking-tight">
                      {b.name}
                    </h3>
                    <p className="text-xs font-medium text-slate-500">{b.accountName}</p>
                  </div>
                </div>

                <Badge variant="outline" className="text-[10px] font-mono bg-slate-50 text-slate-600 border-slate-200 py-0.5">
                  {b.provider.split(" ")[0]} API
                </Badge>
              </div>

              {/* IBAN simulation */}
              <div className="rounded-xl bg-slate-50/80 p-2.5 border border-slate-100 flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-[9px] uppercase tracking-wider font-bold text-slate-400 block">IBAN Tanımı</span>
                  <code className="text-xs font-mono font-bold text-slate-700 block tracking-tight">
                    {showIban[b.id] ? b.iban : maskIban(b.iban)}
                  </code>
                </div>
                <button 
                  onClick={() => toggleIban(b.id)} 
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200/50 hover:text-slate-800 transition-all"
                  title={showIban[b.id] ? "IBAN Gizle" : "IBAN Göster"}
                >
                  {showIban[b.id] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Bottom Balance & Sync status */}
            <div className="mt-6 border-t border-slate-100 pt-4 flex items-end justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Bağlantı Aktif</span>
                </div>
                <span className="text-[10px] text-slate-400 block font-medium truncate max-w-[140px]">
                  {b.lastSync}
                </span>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Kullanılabilir Bakiye</span>
                <span className="text-2xl font-black font-mono tabular-nums text-slate-900 block tracking-tight">
                  {fmt(b.balance)}
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* Card for quickly adding a new Bank integration visually */}
        <div 
          onClick={() => setShowAddBankModal(true)}
          className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-6 transition-all hover:border-emerald-500 hover:bg-emerald-50/10 cursor-pointer flex flex-col items-center justify-center text-center group min-h-[220px]"
        >
          <div className="rounded-full bg-white p-3 shadow-sm border border-slate-100 group-hover:scale-110 group-hover:bg-emerald-500 transition-all duration-300 mb-3">
            <Plus className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors" />
          </div>
          <span className="text-sm font-bold text-slate-800 group-hover:text-emerald-700">Yeni Banka Hesabı Bağla</span>
          <span className="text-xs text-slate-400 max-w-xs mt-1 leading-relaxed font-medium">
            Kuveyt Türk, Garanti veya diğer bankaların API anahtarlarını girerek anlık akışı başlatın.
          </span>
        </div>
      </div>

      {/* ── KUVEYT TÜRK & API INTEGRATION MODAL/DRAWER SIMULATION ── */}
      {showAddBankModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-300">
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-emerald-800 to-teal-950 p-5 text-white flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-emerald-500/30 px-2 py-0.5 text-[10px] font-bold text-emerald-200">
                    Açık Bankacılık Entegrasyonu
                  </span>
                  <span className="text-xs text-emerald-300 font-mono">v2.1 API Modülü</span>
                </div>
                <h3 className="text-base font-serif font-bold text-white">
                  Kuveyt Türk Katılım Bankası / Diğer Banka Bağlantı Formu
                </h3>
              </div>
              
              <button 
                onClick={() => setShowAddBankModal(false)}
                className="rounded-lg p-1.5 bg-white/10 hover:bg-white/20 text-white transition-colors text-xs font-bold"
              >
                ✕
              </button>
            </div>

            {/* Integration Instructions / Read-Only proof explanation */}
            <div className="bg-emerald-50 p-4 border-b border-emerald-100 text-xs text-emerald-950 space-y-2">
              <p className="font-bold flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                Kuveyt Türk Hesabımı Sisteme Nasıl Bağlarım? (Rehber)
              </p>
              <ol className="list-decimal list-inside space-y-1 text-emerald-900 leading-relaxed font-medium">
                <li>
                  <strong>Kuveyt Türk API Market</strong> (Senkron / Açık Bankacılık portalı) üzerinden kurumsal giriş yapın.
                </li>
                <li>
                  Yeni bir uygulama oluşturup <strong>Hesap Bilgileri ve Bakiyeler (Salt Okunur)</strong> yetkisi tanımlayın.
                </li>
                <li>
                  Size verilen <strong>Client ID</strong> ve <strong>Client Secret</strong> anahtarlarını aşağıdaki alanlara girin. Sistemimiz para transferi yetkisi talep etmez.
                </li>
              </ol>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleAddNewBankSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">Banka Seçimi</label>
                  <Select value={newBankName} onValueChange={setNewBankName}>
                    <SelectTrigger className="h-9 text-xs font-bold bg-white border-slate-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Kuveyt Türk Katılım Bankası" className="text-xs font-bold text-emerald-700">
                        Kuveyt Türk Katılım Bankası
                      </SelectItem>
                      <SelectItem value="Garanti BBVA" className="text-xs font-bold">Garanti BBVA</SelectItem>
                      <SelectItem value="Yapı Kredi Bankası" className="text-xs font-bold">Yapı Kredi Bankası</SelectItem>
                      <SelectItem value="Akbank Ana Hesap" className="text-xs font-bold">Akbank Ana Hesap</SelectItem>
                      <SelectItem value="VakıfBank Katılım" className="text-xs font-bold">VakıfBank Katılım</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">API Sağlayıcı / Yöntem</label>
                  <Select value={apiMethod} onValueChange={setApiMethod}>
                    <SelectTrigger className="h-9 text-xs bg-white border-slate-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Kuveyt Türk API Market (Doğrudan)" className="text-xs">
                        Kuveyt Türk API Market (Doğrudan)
                      </SelectItem>
                      <SelectItem value="BulutTahsilat Ortak Gateway" className="text-xs">
                        BulutTahsilat Ortak Gateway
                      </SelectItem>
                      <SelectItem value="NetEkstre API Servisi" className="text-xs">
                        NetEkstre API Servisi
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">Hesap Etiketi / Tanımı</label>
                <Input 
                  value={newAccountName}
                  onChange={e => setNewAccountName(e.target.value)}
                  placeholder="Örn: Kuveyt Türk Toptan Tahsilat Hesabı" 
                  className="h-9 text-xs bg-white border-slate-200"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">IBAN Numarası</label>
                <Input 
                  value={newIban}
                  onChange={e => setNewIban(e.target.value)}
                  placeholder="TR56 0020 5000 ..." 
                  className="h-9 text-xs font-mono font-bold bg-white border-slate-200 tracking-wide text-slate-800"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block flex items-center gap-1">
                    <Key className="w-3 h-3 text-slate-400" /> Client ID / Müşteri No
                  </label>
                  <Input 
                    value={newClientId}
                    onChange={e => setNewClientId(e.target.value)}
                    placeholder="kt_live_client_8912..." 
                    className="h-9 text-xs font-mono bg-white border-slate-200"
                  />
                  <span className="text-[10px] text-slate-400 block">Kuveyt Türk geliştirici portalından alınan ID</span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block flex items-center gap-1">
                    <Lock className="w-3 h-3 text-emerald-600" /> Client Secret (Salt Okunur)
                  </label>
                  <Input 
                    type="password"
                    value={newClientSecret}
                    onChange={e => setNewClientSecret(e.target.value)}
                    placeholder="••••••••••••••••••••••••" 
                    className="h-9 text-xs font-mono bg-white border-slate-200"
                  />
                  <span className="text-[10px] text-emerald-600 font-medium block">Sadece ekstre yetkilidir</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">Simülasyon Başlangıç Bakiyesi (₺)</label>
                <Input 
                  type="number"
                  value={initialBalance}
                  onChange={e => setInitialBalance(e.target.value)}
                  placeholder="75000" 
                  className="h-9 text-xs font-mono bg-white border-slate-200 w-full sm:w-48"
                />
              </div>

              {/* Action buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowAddBankModal(false)}
                  className="h-9 text-xs font-bold border-slate-200 text-slate-600"
                >
                  İptal
                </Button>
                
                <Button 
                  type="submit"
                  className="h-9 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white gap-1.5"
                >
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  <span>Kuveyt Türk / Bankayı Bağla</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── INTERACTIVE RECONCILIATION BLOCK (E-MUTABAKAT) ── */}
      <Card className="border-slate-200/90 bg-white shadow-md overflow-hidden rounded-2xl">
        <CardHeader className="p-6 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <CardTitle className="text-base font-serif font-bold text-slate-900">
                Gelen Hesap Hareketleri & Otomatik Sipariş Eşleştirme (Mutabakat)
              </CardTitle>
              {unmatchedIncomingCount > 0 && (
                <Badge className="bg-amber-500 text-slate-950 font-bold text-xs px-2.5 py-0.5 border-0 shadow-xs animate-pulse">
                  {unmatchedIncomingCount} Eşleşmeyi Bekleyen Havale
                </Badge>
              )}
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Bankalarınızdan akan anlık transfer satırlarını seçin ve ilgili B2B/B2C sipariş faturasıyla ilişkilendirin.
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <Input 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Açıklama, gönderen veya banka ara..." 
              className="pl-9 h-9 text-xs bg-white border-slate-200 rounded-xl shadow-xs font-medium w-full"
            />
          </div>
        </CardHeader>

        <div className="p-0">
          <div className="divide-y divide-slate-100">
            {filteredTxs.map(tx => {
              const isSelected = selectedTxForMatch === tx.id
              const isKuveyt = tx.bankName.includes("Kuveyt")
              return (
                <div 
                  key={tx.id} 
                  className={`transition-all duration-200 ${isSelected ? "bg-indigo-50/40 border-l-4 border-indigo-600" : "hover:bg-slate-50/70"}`}
                >
                  <div className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    
                    {/* Left Transaction Data */}
                    <div className="flex items-start gap-3.5 flex-1 min-w-0">
                      <div className={`h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0 font-bold shadow-inner mt-0.5 ${tx.type === "IN" ? "bg-emerald-500 text-white" : "bg-rose-500 text-white"}`}>
                        {tx.type === "IN" ? (
                          <ArrowDownLeft className="w-5 h-5 stroke-[2.5]" />
                        ) : (
                          <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                        )}
                      </div>
                      
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight block">
                            {tx.desc}
                          </span>
                          
                          {tx.matched ? (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-200">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                              Siparişle Mutabık: {tx.matchedInvoice}
                            </span>
                          ) : (
                            tx.type === "IN" ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-amber-50 text-amber-800 px-2.5 py-0.5 rounded-full border border-amber-200/80">
                                <AlertCircle className="w-3 h-3 text-amber-600 flex-shrink-0" />
                                Fatura Eşleştirmesi Gerekli
                              </span>
                            ) : null
                          )}
                        </div>

                        <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${isKuveyt ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-slate-100 text-slate-700"}`}>
                            {tx.bankName}
                          </span>
                          <span>•</span>
                          <span>İşlem Tarihi: {tx.date}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Amount & Matching Actions Trigger */}
                    <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 flex-shrink-0">
                      <span className={`text-lg font-black font-mono tabular-nums tracking-tight ${tx.type === "IN" ? "text-emerald-600" : "text-rose-600"}`}>
                        {tx.type === "IN" ? "+" : "-"}{fmt(tx.amount)}
                      </span>

                      {tx.type === "IN" && (
                        <div>
                          {tx.matched ? (
                            <Button 
                              onClick={() => handleUnmatch(tx.id)}
                              size="sm" 
                              variant="ghost" 
                              className="h-9 text-xs text-slate-400 hover:text-rose-600 font-bold px-2.5 gap-1 transition-colors"
                              title="Eşleşmeyi İptal Et"
                            >
                              <Unlink className="w-3.5 h-3.5" />
                              <span>Bağı Çöz</span>
                            </Button>
                          ) : (
                            <Button
                              onClick={() => setSelectedTxForMatch(isSelected ? null : tx.id)}
                              size="sm"
                              className={`h-9 text-xs font-bold px-4 gap-2 transition-all shadow-sm ${isSelected ? "bg-indigo-950 text-white hover:bg-indigo-900" : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-600/20"}`}
                            >
                              <Link2 className="w-4 h-4" />
                              <span>{isSelected ? "Kapat" : "Sipariş Seç & Eşle"}</span>
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Drawer expansion listing suitable candidate invoices */}
                  {isSelected && (
                    <div className="bg-gradient-to-br from-indigo-50/50 via-slate-50 to-white p-6 border-t border-indigo-100 transition-all duration-300">
                      <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 pb-3">
                          <span className="text-xs font-bold text-indigo-950 flex items-center gap-1.5">
                            <FileText className="w-4 h-4 text-indigo-600" />
                            Gelen Tutara ({fmt(tx.amount)}) Karşılık Eşleştirilebilecek Açık Müşteri Faturaları:
                          </span>
                          <span className="text-xs text-slate-500 font-medium">
                            İlgili faturayı seçerek B2B cari hesabındaki borcu kapatın
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                          {PENDING_INVOICES.map(inv => {
                            const isExactMatch = inv.amount === tx.amount
                            return (
                              <div 
                                key={inv.id}
                                onClick={() => handleMatchInvoice(tx.id, inv.no)}
                                className={`rounded-xl p-4 border cursor-pointer transition-all duration-200 relative group bg-white ${isExactMatch ? "border-emerald-500 ring-2 ring-emerald-500/20 shadow-md" : "border-slate-200 hover:border-indigo-300 hover:shadow-sm"}`}
                              >
                                {isExactMatch && (
                                  <span className="absolute -top-2.5 right-3 bg-emerald-600 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                                    ★ Tam Tutar Uyumu
                                  </span>
                                )}

                                <div className="space-y-1.5">
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-slate-900 font-mono tracking-tight">{inv.no}</span>
                                    <span className="text-sm font-black font-mono text-slate-950 tracking-tight">{fmt(inv.amount)}</span>
                                  </div>
                                  <p className="text-xs font-bold text-slate-700 truncate">{inv.customer}</p>
                                  <p className="text-[10px] text-slate-400 font-medium">{inv.date} Siparişi</p>
                                </div>

                                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                                  <span className="text-[10px] font-bold text-indigo-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                                    <Check className="w-3 h-3 stroke-[3]" /> Seç & Eşleştir
                                  </span>
                                  <span className="text-[10px] font-mono text-slate-400 group-hover:text-slate-900 transition-colors">
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
              <div className="p-12 text-center text-slate-400 space-y-2">
                <p className="text-base font-bold text-slate-600">Arama filtresiyle uyuşan hesap hareketi yok.</p>
                <Button onClick={() => setSearchQuery("")} variant="outline" size="sm" className="text-xs font-bold mt-1">
                  Aramayı Temizle
                </Button>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
