"use client"

import React, { useState, useEffect, useCallback } from "react"
import {
  Tag, Plus, RefreshCw, Search, Trash2, ToggleLeft, ToggleRight,
  Clock, Users, Percent, DollarSign, Truck, AlertTriangle, Copy, Check
} from "lucide-react"

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

const typeLabels: Record<string, string> = { PERCENTAGE: "Yüzde", FIXED: "Sabit Tutar", FREE_SHIP: "Ücretsiz Kargo" }
const typeIcons: Record<string, any> = { PERCENTAGE: Percent, FIXED: DollarSign, FREE_SHIP: Truck }
const typeColors: Record<string, string> = {
  PERCENTAGE: "bg-blue-100 text-blue-700", FIXED: "bg-emerald-100 text-emerald-700", FREE_SHIP: "bg-purple-100 text-purple-700",
}

function formatDate(d: string) { return new Date(d).toLocaleDateString("tr-TR", { day: "numeric", month: "short", year: "numeric" }) }

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [showCreate, setShowCreate] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // Form state
  const [fCode, setFCode] = useState("")
  const [fDesc, setFDesc] = useState("")
  const [fType, setFType] = useState("PERCENTAGE")
  const [fValue, setFValue] = useState("")
  const [fMaxDiscount, setFMaxDiscount] = useState("")
  const [fMinOrder, setFMinOrder] = useState("")
  const [fMaxUses, setFMaxUses] = useState("")
  const [fPerUser, setFPerUser] = useState("1")
  const [fStartsAt, setFStartsAt] = useState("")
  const [fExpiresAt, setFExpiresAt] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const fetchCoupons = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/admin/coupons")
      const data = await res.json()
      setCoupons(data.coupons ?? [])
    } catch { /* ignore */ } finally { setLoading(false) }
  }, [])

  useEffect(() => { fetchCoupons() }, [fetchCoupons])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!fCode || !fValue) return
    setSubmitting(true)
    try {
      const res = await fetch("/api/admin/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: fCode, description: fDesc || undefined, type: fType, value: fValue,
          maxDiscount: fMaxDiscount || undefined, minOrderAmount: fMinOrder || undefined,
          maxUses: fMaxUses || undefined, perUserLimit: fPerUser || "1",
          startsAt: fStartsAt || undefined, expiresAt: fExpiresAt || undefined,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setShowCreate(false)
      setFCode(""); setFDesc(""); setFValue(""); setFMaxDiscount("")
      setFMinOrder(""); setFMaxUses(""); setFPerUser("1"); setFStartsAt(""); setFExpiresAt("")
      fetchCoupons()
    } catch (err: any) { alert("Hata: " + err.message) } finally { setSubmitting(false) }
  }

  const toggleActive = async (coupon: Coupon) => {
    await fetch("/api/admin/coupons", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: coupon.id, isActive: !coupon.isActive }),
    })
    fetchCoupons()
  }

  const deleteCoupon = async (id: string) => {
    if (!confirm("Bu kuponu silmek istediğinize emin misiniz?")) return
    await fetch(`/api/admin/coupons?id=${id}`, { method: "DELETE" })
    fetchCoupons()
  }

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const filtered = coupons.filter((c) =>
    !search || c.code.toLowerCase().includes(search.toLowerCase()) ||
    (c.description?.toLowerCase().includes(search.toLowerCase()) ?? false)
  )

  const activeCoupons = coupons.filter((c) => c.isActive && !c.isExpired && !c.isLimitReached)
  const totalCost = coupons.reduce((s, c) => s + c.totalDiscountGiven, 0)

  if (loading) return <div className="flex justify-center py-32"><RefreshCw className="h-8 w-8 animate-spin text-amber-600" /></div>

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Kupon & İndirim Yönetimi</h1>
          <p className="text-slate-500 mt-1">Promosyon motoru ve kullanım analizi</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 flex items-center gap-2 text-sm font-semibold shadow-lg shadow-amber-500/25">
          <Plus className="h-4 w-4" /> Yeni Kupon
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { title: "Toplam Kupon", value: coupons.length, icon: Tag, color: "from-blue-500 to-cyan-600" },
          { title: "Aktif Kupon", value: activeCoupons.length, icon: ToggleRight, color: "from-emerald-500 to-green-600" },
          { title: "Toplam Kullanım", value: coupons.reduce((s, c) => s + c.usedCount, 0), icon: Users, color: "from-purple-500 to-violet-600" },
          { title: "İndirim Maliyeti", value: `₺${totalCost.toLocaleString("tr-TR")}`, icon: DollarSign, color: "from-red-500 to-pink-600" },
        ].map((kpi) => (
          <div key={kpi.title} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-500">{kpi.title}</span>
              <div className={`p-2 rounded-lg bg-gradient-to-br ${kpi.color}`}><kpi.icon className="h-4 w-4 text-white" /></div>
            </div>
            <p className="text-2xl font-bold text-slate-800">{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
          <Search className="h-4 w-4 text-slate-400" />
          <input type="text" placeholder="Kupon kodu veya açıklama ile ara..." value={search} onChange={(e) => setSearch(e.target.value)} className="flex-1 text-sm outline-none bg-transparent" />
        </div>

        {/* Coupon List */}
        <div className="divide-y divide-slate-100">
          {filtered.length === 0 ? (
            <div className="py-16 text-center text-slate-400">Henüz kupon oluşturulmamış.</div>
          ) : filtered.map((c) => {
            const Icon = typeIcons[c.type] || Tag
            const statusColor = !c.isActive ? "bg-slate-100 text-slate-500" : c.isExpired ? "bg-red-100 text-red-600" : c.isLimitReached ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
            const statusText = !c.isActive ? "Pasif" : c.isExpired ? "Süresi Dolmuş" : c.isLimitReached ? "Limit Doldu" : "Aktif"

            return (
              <div key={c.id} className="flex items-center justify-between px-5 py-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className={`p-2.5 rounded-lg ${typeColors[c.type] || "bg-slate-100"}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <code className="text-sm font-bold text-slate-800 tracking-wider">{c.code}</code>
                      <button onClick={() => copyCode(c.code, c.id)} className="text-slate-400 hover:text-slate-600">
                        {copiedId === c.id ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                      </button>
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${statusColor}`}>{statusText}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 truncate">
                      {c.type === "PERCENTAGE" ? `%${c.value} indirim` : c.type === "FIXED" ? `₺${c.value} indirim` : "Ücretsiz kargo"}
                      {c.minOrderAmount ? ` • Min ₺${c.minOrderAmount}` : ""}
                      {c.maxDiscount ? ` • Max ₺${c.maxDiscount}` : ""}
                      {c.description ? ` • ${c.description}` : ""}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  {/* Stats */}
                  <div className="hidden md:flex items-center gap-6 text-xs text-slate-500">
                    <div className="text-center">
                      <p className="font-bold text-slate-800">{c.usedCount}{c.maxUses ? `/${c.maxUses}` : ""}</p>
                      <p>Kullanım</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-slate-800">₺{c.totalDiscountGiven.toLocaleString("tr-TR")}</p>
                      <p>Maliyet</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-slate-800">{c.expiresAt ? formatDate(c.expiresAt) : "∞"}</p>
                      <p>Bitiş</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    <button onClick={() => toggleActive(c)} className="p-2 rounded-lg hover:bg-slate-100 transition-colors" title={c.isActive ? "Pasifleştir" : "Aktifleştir"}>
                      {c.isActive ? <ToggleRight className="h-5 w-5 text-emerald-600" /> : <ToggleLeft className="h-5 w-5 text-slate-400" />}
                    </button>
                    <button onClick={() => deleteCoupon(c.id)} className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Create Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowCreate(false)} />
          <form onSubmit={handleCreate} className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 space-y-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-slate-800">Yeni Kupon Oluştur</h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-xs font-semibold text-slate-600 mb-1">Kupon Kodu *</label>
                <input type="text" value={fCode} onChange={(e) => setFCode(e.target.value.toUpperCase())} required placeholder="YILDIZ20" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm font-mono tracking-wider" />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-semibold text-slate-600 mb-1">Açıklama</label>
                <input type="text" value={fDesc} onChange={(e) => setFDesc(e.target.value)} placeholder="Yaz kampanyası..." className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">İndirim Tipi *</label>
                <select value={fType} onChange={(e) => setFType(e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm">
                  <option value="PERCENTAGE">Yüzde (%)</option>
                  <option value="FIXED">Sabit Tutar (₺)</option>
                  <option value="FREE_SHIP">Ücretsiz Kargo</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">{fType === "PERCENTAGE" ? "Yüzde (%)" : fType === "FIXED" ? "Tutar (₺)" : "Değer"} *</label>
                <input type="number" step="0.01" value={fValue} onChange={(e) => setFValue(e.target.value)} required className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" />
              </div>
              {fType === "PERCENTAGE" && (
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Max İndirim Tavanı (₺)</label>
                  <input type="number" value={fMaxDiscount} onChange={(e) => setFMaxDiscount(e.target.value)} placeholder="200" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" />
                </div>
              )}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Min Sepet Tutarı (₺)</label>
                <input type="number" value={fMinOrder} onChange={(e) => setFMinOrder(e.target.value)} placeholder="500" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Toplam Kullanım Limiti</label>
                <input type="number" value={fMaxUses} onChange={(e) => setFMaxUses(e.target.value)} placeholder="100" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Kişi Başı Limit</label>
                <input type="number" value={fPerUser} onChange={(e) => setFPerUser(e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Başlangıç Tarihi</label>
                <input type="datetime-local" value={fStartsAt} onChange={(e) => setFStartsAt(e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Bitiş Tarihi</label>
                <input type="datetime-local" value={fExpiresAt} onChange={(e) => setFExpiresAt(e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" />
              </div>
            </div>

            <div className="flex gap-3 pt-3">
              <button type="button" onClick={() => setShowCreate(false)} className="flex-1 px-4 py-3 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50">İptal</button>
              <button type="submit" disabled={submitting} className="flex-1 px-4 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-lg text-sm font-bold hover:from-amber-600 hover:to-yellow-700 disabled:opacity-50 shadow-lg shadow-amber-500/25">
                {submitting ? "Oluşturuluyor..." : "Kupon Oluştur"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
