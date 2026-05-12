"use client"
import { Building2, Lock, RefreshCw, Eye, EyeOff, CheckCircle2, Clock, ArrowDownLeft, ArrowUpRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const BANKS = [
  { id: "b1", name: "Ziraat Bankası", iban: "TR12 0001 0012 3456 7890 1234 56", balance: 184320, currency: "TRY", lastSync: "Bugün 13:45", color: "#16a34a" },
  { id: "b2", name: "İş Bankası", iban: "TR98 0006 4000 0011 2345 6789 00", balance: 100000, currency: "TRY", lastSync: "Bugün 13:44", color: "#1d4ed8" },
]

const BANK_TXS = [
  { id: 1, bank: "Ziraat", amount: 45000, desc: "EFT GELEN - KORAY AYAKKABICILIK", date: "Bugün 10:12", type: "IN" },
  { id: 2, bank: "İş Bankası", amount: -8200, desc: "ARAS KARGO TAKAS ÖDEMESİ", date: "Bugün 09:30", type: "OUT" },
  { id: 3, bank: "Ziraat", amount: 3450, desc: "EFT GELEN - AHMET YILMAZ", date: "Dün 16:30", type: "IN" },
  { id: 4, bank: "İş Bankası", amount: -22000, desc: "HAKİKİ DERİ A.Ş. HAM MADDE", date: "Dün 11:00", type: "OUT" },
  { id: 5, bank: "Ziraat", amount: 12800, desc: "EFT GELEN - ZARİF DERİ A.Ş.", date: "23 Eki 14:20", type: "IN" },
  { id: 6, bank: "Ziraat", amount: -4500, desc: "OTOMATİK ÖDEME - KİRA", date: "22 Eki 08:00", type: "OUT" },
]

function fmt(n: number) { return new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(n) }
function maskIban(s: string) { return s.slice(0, 6) + " **** **** " + s.slice(-4) }

export default function BankPanel() {
  const [showIban, setShowIban] = useState<Record<string, boolean>>({})
  const toggle = (id: string) => setShowIban(p => ({ ...p, [id]: !p[id] }))

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-slate-500" />
          <h2 className="text-sm font-serif font-bold text-slate-900">Banka Hesapları</h2>
          <Badge className="bg-emerald-100 text-emerald-700 border-0 text-[10px] gap-1"><Lock className="w-2.5 h-2.5" />Sadece Okuma</Badge>
        </div>
        <Button size="sm" variant="outline" className="text-xs h-7 gap-1 border-slate-300"><RefreshCw className="w-3 h-3" />Senkronize Et</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {BANKS.map(b => (
          <Card key={b.id} className="border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="h-1" style={{ background: b.color }} />
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-700">{b.name}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <p className="text-[10px] font-mono text-slate-400">{showIban[b.id] ? b.iban : maskIban(b.iban)}</p>
                    <button onClick={() => toggle(b.id)} className="text-slate-400 hover:text-slate-600">
                      {showIban[b.id] ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-black font-mono tabular-nums text-slate-900">{fmt(b.balance)}</p>
                  <p className="text-[10px] text-slate-400 flex items-center gap-1 justify-end mt-0.5"><CheckCircle2 className="w-2.5 h-2.5 text-emerald-500" />{b.lastSync}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-slate-200 bg-white shadow-sm overflow-hidden">
        <CardHeader className="py-3 px-5 border-b border-slate-100 bg-slate-50/80">
          <CardTitle className="text-xs uppercase tracking-widest text-slate-500">Son Hesap Hareketleri (EFT / Havale)</CardTitle>
        </CardHeader>
        <div className="divide-y divide-slate-100 max-h-[320px] overflow-y-auto">
          {BANK_TXS.map(tx => (
            <div key={tx.id} className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50/60 transition-colors">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${tx.type === "IN" ? "bg-emerald-50" : "bg-rose-50"}`}>
                {tx.type === "IN" ? <ArrowDownLeft className="w-3.5 h-3.5 text-emerald-600" /> : <ArrowUpRight className="w-3.5 h-3.5 text-rose-500" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-700 truncate">{tx.desc}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 rounded">{tx.bank}</span>
                  <span className="text-[10px] text-slate-400">{tx.date}</span>
                </div>
              </div>
              <p className={`text-sm font-bold font-mono tabular-nums ${tx.amount > 0 ? "text-emerald-600" : "text-rose-500"}`}>
                {tx.amount > 0 ? "+" : ""}{fmt(tx.amount)}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
