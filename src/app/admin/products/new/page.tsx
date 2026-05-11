"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Save, Plus, Trash2, Globe, Users, ShoppingBag, ArrowLeft, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import Link from "next/link"

// ─── Types ───────────────────────────────────────────────────────────────────

interface Variant {
  id: string
  name: string
  size: string
  color: string
  material: string
  sku: string
  barcode: string
  price: string
  costPrice: string
  stock: string
}

interface FormState {
  name: string
  slug: string
  description: string
  shortDesc: string
  price: string
  compareAtPrice: string
  costPrice: string
  category: string
  status: string
  vendor: string
  sku: string
  barcode: string
  weight: string
  lowStockAlert: string
  tags: string
  seoTitle: string
  seoDesc: string
  trackInventory: boolean
  allowBackorder: boolean
  showOnWeb: boolean
  showOnB2B: boolean
  showOnPOS: boolean
  variants: Variant[]
}

const INITIAL: FormState = {
  name: "", slug: "", description: "", shortDesc: "",
  price: "", compareAtPrice: "", costPrice: "",
  category: "OTHER", status: "DRAFT", vendor: "Davut Kundura Atölyesi",
  sku: "", barcode: "", weight: "", lowStockAlert: "5",
  tags: "", seoTitle: "", seoDesc: "",
  trackInventory: true, allowBackorder: false,
  showOnWeb: true, showOnB2B: false, showOnPOS: false,
  variants: [],
}

function newVariant(): Variant {
  return { id: crypto.randomUUID(), name: "", size: "", color: "", material: "", sku: "", barcode: "", price: "", costPrice: "", stock: "0" }
}

// ─── Toggle Switch ────────────────────────────────────────────────────────────

function Toggle({ checked, onChange, label, icon: Icon, color }: { checked: boolean; onChange: () => void; label: string; icon: React.ElementType; color: string }) {
  return (
    <button type="button" onClick={onChange}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${checked ? `${color} border-current` : "bg-white border-slate-200 text-slate-400 hover:border-slate-300"}`}>
      <Icon className="h-4 w-4" />
      {label}
      <span className={`ml-auto w-8 h-4 rounded-full transition-colors ${checked ? "bg-current" : "bg-slate-300"} relative`}>
        <span className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-transform ${checked ? "translate-x-4" : "translate-x-0.5"}`} />
      </span>
    </button>
  )
}

// ─── Section wrapper ─────────────────────────────────────────────────────────

function Section({ title, children, action }: { title: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">{title}</h2>
        {action}
      </div>
      <div className="p-6">{children}</div>
    </div>
  )
}

// ─── Field ───────────────────────────────────────────────────────────────────

function Field({ label, required, children, hint }: { label: string; required?: boolean; children: React.ReactNode; hint?: string }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-slate-700">
        {label}{required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-slate-400">{hint}</p>}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function NewProductPage() {
  const router = useRouter()
  const [form, setForm] = React.useState<FormState>(INITIAL)
  const [saving, setSaving] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState<"basic" | "variants" | "channels" | "seo">("basic")

  const set = (key: keyof FormState, val: unknown) => setForm(prev => ({ ...prev, [key]: val }))

  // Auto-slug
  React.useEffect(() => {
    set("slug", form.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""))
  }, [form.name])

  // Variants
  const addVariant = () => set("variants", [...form.variants, newVariant()])
  const removeVariant = (id: string) => set("variants", form.variants.filter(v => v.id !== id))
  const patchVariant = (id: string, patch: Partial<Variant>) =>
    set("variants", form.variants.map(v => v.id === id ? { ...v, ...patch } : v))

  async function handleSave(status: string) {
    setSaving(true)
    try {
      const body = { ...form, status, price: parseFloat(form.price) || 0 }
      const res = await fetch("/api/admin/products", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
      if (!res.ok) throw new Error(await res.text())
      router.push("/admin/products")
    } catch (e: unknown) {
      alert("Hata: " + (e instanceof Error ? e.message : String(e)))
    } finally {
      setSaving(false)
    }
  }

  const TABS = [
    { id: "basic", label: "Temel Bilgi" },
    { id: "variants", label: `Varyantlar (${form.variants.length})` },
    { id: "channels", label: "Kanallar" },
    { id: "seo", label: "SEO" },
  ] as const

  return (
    <div className="min-h-screen pb-28">
      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild><Link href="/admin/products"><ArrowLeft className="h-5 w-5" /></Link></Button>
          <div>
            <h1 className="text-2xl font-serif font-bold text-slate-800">Yeni Ürün Ekle</h1>
            <p className="text-sm text-slate-500">Tüm alanları doldurun, varyant ve kanal ayarlarını yapın.</p>
          </div>
        </div>
      </div>

      {/* ── Tab Nav ── */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-xl mb-6 w-fit">
        {TABS.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === t.id ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* ══════════════ TAB: TEMEL BİLGİ ══════════════ */}
      {activeTab === "basic" && (
        <div className="space-y-6">
          {/* İsim & Açıklama */}
          <Section title="Ürün Tanımı">
            <div className="space-y-4">
              <Field label="Ürün Adı" required>
                <Input value={form.name} onChange={e => set("name", e.target.value)} placeholder="Örn: Premium Deri Kemer — Executive Black" className="h-10" />
              </Field>
              <Field label="URL Slug" hint="Otomatik oluşturulur, düzenleyebilirsiniz.">
                <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                  <span className="px-3 py-2 bg-slate-50 text-slate-400 text-sm border-r border-slate-200">/products/</span>
                  <input value={form.slug} onChange={e => set("slug", e.target.value)} className="flex-1 px-3 py-2 text-sm focus:outline-none" />
                </div>
              </Field>
              <Field label="Kısa Açıklama">
                <Input value={form.shortDesc} onChange={e => set("shortDesc", e.target.value)} placeholder="Ürün kartında gösterilecek özet..." className="h-10" />
              </Field>
              <Field label="Tam Açıklama" required>
                <textarea
                  value={form.description}
                  onChange={e => set("description", e.target.value)}
                  rows={5}
                  placeholder="Detaylı ürün açıklaması..."
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-amber-300"
                />
              </Field>
            </div>
          </Section>

          {/* Fiyatlandırma */}
          <Section title="Fiyatlandırma">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Field label="Satış Fiyatı (₺)" required>
                <Input type="number" value={form.price} onChange={e => set("price", e.target.value)} placeholder="0.00" className="h-10" />
              </Field>
              <Field label="Piyasa Fiyatı (₺)" hint="Üstü çizili eski fiyat">
                <Input type="number" value={form.compareAtPrice} onChange={e => set("compareAtPrice", e.target.value)} placeholder="0.00" className="h-10" />
              </Field>
              <Field label="Maliyet (₺)" hint="Müşteri görmez">
                <Input type="number" value={form.costPrice} onChange={e => set("costPrice", e.target.value)} placeholder="0.00" className="h-10" />
              </Field>
            </div>
            {form.price && form.costPrice && (
              <div className="mt-3 p-3 bg-emerald-50 rounded-lg flex items-center gap-2">
                <span className="text-sm text-emerald-700">Tahmini Kar Marjı:</span>
                <span className="font-bold text-emerald-700">
                  %{Math.round(((parseFloat(form.price) - parseFloat(form.costPrice)) / parseFloat(form.price)) * 100)}
                </span>
              </div>
            )}
          </Section>

          {/* Stok & Kimlik */}
          <Section title="Stok & Kimlik">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Field label="SKU (Stok Kodu)">
                <Input value={form.sku} onChange={e => set("sku", e.target.value)} placeholder="DK-001-BLK" className="h-10 font-mono" />
              </Field>
              <Field label="Barkod">
                <Input value={form.barcode} onChange={e => set("barcode", e.target.value)} placeholder="8691234567890" className="h-10 font-mono" />
              </Field>
              <Field label="Kritik Stok Seviyesi">
                <Input type="number" value={form.lowStockAlert} onChange={e => set("lowStockAlert", e.target.value)} className="h-10" />
              </Field>
              <Field label="Ağırlık (gram)">
                <Input type="number" value={form.weight} onChange={e => set("weight", e.target.value)} placeholder="500" className="h-10" />
              </Field>
            </div>
            <div className="mt-4 flex gap-4">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={form.trackInventory} onChange={e => set("trackInventory", e.target.checked)} className="rounded" />
                Stok takibi aktif
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={form.allowBackorder} onChange={e => set("allowBackorder", e.target.checked)} className="rounded" />
                Stok bitince sipariş kabul et
              </label>
            </div>
          </Section>

          {/* Kategori & Vendor */}
          <Section title="Sınıflandırma">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Field label="Kategori">
                <Select value={form.category} onValueChange={v => set("category", v)}>
                  <SelectTrigger className="h-10"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BELT">Kemer</SelectItem>
                    <SelectItem value="ORTHOPEDIC_INSOLE">Ortopedik</SelectItem>
                    <SelectItem value="SHOE_CARE">Bakım & Aksesuar</SelectItem>
                    <SelectItem value="LUGGAGE_PARTS">Bagaj</SelectItem>
                    <SelectItem value="OTHER">Diğer</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Tedarikçi / Üretici">
                <Input value={form.vendor} onChange={e => set("vendor", e.target.value)} className="h-10" />
              </Field>
              <Field label="Etiketler (virgülle)" hint="Arama için kullanılır">
                <Input value={form.tags} onChange={e => set("tags", e.target.value)} placeholder="deri, premium, siyah" className="h-10" />
              </Field>
            </div>
          </Section>
        </div>
      )}

      {/* ══════════════ TAB: VARYANTLAR ══════════════ */}
      {activeTab === "variants" && (
        <Section title="Ürün Varyantları" action={
          <Button size="sm" onClick={addVariant} className="bg-amber-500 hover:bg-amber-600 text-white">
            <Plus className="h-4 w-4 mr-1" />Varyant Ekle
          </Button>
        }>
          {form.variants.length === 0 ? (
            <div className="py-16 text-center text-slate-400">
              <Package className="h-12 w-12 mx-auto mb-3 opacity-40" />
              <p className="text-sm">Varyant eklenmedi. Her SKU, Barkod ve stok bağımsız tutulur.</p>
              <Button className="mt-4 bg-amber-500 hover:bg-amber-600 text-white" onClick={addVariant}>
                <Plus className="h-4 w-4 mr-1" />İlk Varyantı Ekle
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {form.variants.map((v, i) => (
                <div key={v.id} className="border border-slate-200 rounded-xl p-4 bg-slate-50">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-slate-700">Varyant #{i + 1}</span>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-red-400 hover:text-red-600" onClick={() => removeVariant(v.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <Field label="Varyant Adı" required>
                      <Input value={v.name} onChange={e => patchVariant(v.id, { name: e.target.value })} placeholder="42 Numara - Siyah" className="h-9 text-sm bg-white" />
                    </Field>
                    <Field label="Numara / Beden">
                      <Input value={v.size} onChange={e => patchVariant(v.id, { size: e.target.value })} placeholder="42" className="h-9 text-sm bg-white" />
                    </Field>
                    <Field label="Renk">
                      <Input value={v.color} onChange={e => patchVariant(v.id, { color: e.target.value })} placeholder="Siyah" className="h-9 text-sm bg-white" />
                    </Field>
                    <Field label="Materyal">
                      <Input value={v.material} onChange={e => patchVariant(v.id, { material: e.target.value })} placeholder="Hakiki Deri" className="h-9 text-sm bg-white" />
                    </Field>
                    <Field label="SKU">
                      <Input value={v.sku} onChange={e => patchVariant(v.id, { sku: e.target.value })} placeholder="DK-001-42-BLK" className="h-9 text-sm font-mono bg-white" />
                    </Field>
                    <Field label="Barkod">
                      <Input value={v.barcode} onChange={e => patchVariant(v.id, { barcode: e.target.value })} placeholder="8691234567890" className="h-9 text-sm font-mono bg-white" />
                    </Field>
                    <Field label="Fiyat (₺)" hint="Boş = ürün fiyatı">
                      <Input type="number" value={v.price} onChange={e => patchVariant(v.id, { price: e.target.value })} placeholder="Ana fiyat" className="h-9 text-sm bg-white" />
                    </Field>
                    <Field label="Maliyet (₺)">
                      <Input type="number" value={v.costPrice} onChange={e => patchVariant(v.id, { costPrice: e.target.value })} placeholder="0.00" className="h-9 text-sm bg-white" />
                    </Field>
                    <Field label="Başlangıç Stoğu">
                      <Input type="number" value={v.stock} onChange={e => patchVariant(v.id, { stock: e.target.value })} placeholder="0" className="h-9 text-sm bg-white" />
                    </Field>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Section>
      )}

      {/* ══════════════ TAB: KANALLAR ══════════════ */}
      {activeTab === "channels" && (
        <Section title="Kanal Görünürlüğü">
          <p className="text-sm text-slate-500 mb-6">Bu ürünün hangi satış kanallarında gösterileceğini seçin. Depo ürünleri hiçbir kanalda gizlenebilir.</p>
          <div className="space-y-3 max-w-sm">
            <Toggle checked={form.showOnWeb} onChange={() => set("showOnWeb", !form.showOnWeb)}
              label="Web Sitesi (Müşteri Vitrini)" icon={Globe} color="text-emerald-600 bg-emerald-50 border-emerald-300" />
            <Toggle checked={form.showOnB2B} onChange={() => set("showOnB2B", !form.showOnB2B)}
              label="B2B / Toptan Bayi Portalı" icon={Users} color="text-blue-600 bg-blue-50 border-blue-300" />
            <Toggle checked={form.showOnPOS} onChange={() => set("showOnPOS", !form.showOnPOS)}
              label="Fiziksel Mağaza POS" icon={ShoppingBag} color="text-purple-600 bg-purple-50 border-purple-300" />
          </div>
          {!form.showOnWeb && !form.showOnB2B && !form.showOnPOS && (
            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-700">
              ⚠️ Hiçbir kanal seçilmedi. Bu ürün sadece depoda görünür, hiçbir yerde satışa çıkmaz.
            </div>
          )}
        </Section>
      )}

      {/* ══════════════ TAB: SEO ══════════════ */}
      {activeTab === "seo" && (
        <Section title="Arama Motoru Optimizasyonu (SEO)">
          <div className="space-y-4 max-w-2xl">
            <Field label="SEO Başlığı" hint="Boş bırakılırsa ürün adı kullanılır">
              <Input value={form.seoTitle} onChange={e => set("seoTitle", e.target.value)} placeholder={form.name || "Sayfa başlığı..."} className="h-10" />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>Önerilen: 50–60 karakter</span>
                <span className={form.seoTitle.length > 60 ? "text-red-500" : ""}>{form.seoTitle.length}/60</span>
              </div>
            </Field>
            <Field label="Meta Açıklaması">
              <textarea
                value={form.seoDesc}
                onChange={e => set("seoDesc", e.target.value)}
                rows={3}
                placeholder="Google arama sonuçlarında görünecek açıklama..."
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-amber-300"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>Önerilen: 150–160 karakter</span>
                <span className={form.seoDesc.length > 160 ? "text-red-500" : ""}>{form.seoDesc.length}/160</span>
              </div>
            </Field>
            {/* Google Preview */}
            {(form.seoTitle || form.name) && (
              <div className="p-4 border border-slate-200 rounded-xl bg-white">
                <p className="text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide">Google Önizleme</p>
                <p className="text-blue-700 text-lg font-medium leading-tight">{form.seoTitle || form.name}</p>
                <p className="text-emerald-700 text-sm">davutkundura.com/products/{form.slug}</p>
                <p className="text-slate-600 text-sm mt-1">{form.seoDesc || form.shortDesc || "Meta açıklaması girilmedi..."}</p>
              </div>
            )}
          </div>
        </Section>
      )}

      {/* ══════════════ STICKY ACTION BAR ══════════════ */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 px-8 py-4 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full ${form.name ? "bg-emerald-400" : "bg-slate-300"}`} />
          <span className="text-sm text-slate-600">
            {form.name ? `"${form.name.substring(0, 30)}${form.name.length > 30 ? "..." : ""}"` : "Ürün adı girilmedi"}
          </span>
          {form.variants.length > 0 && <Badge className="bg-amber-100 text-amber-700 border-0">{form.variants.length} varyant</Badge>}
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => handleSave("DRAFT")} disabled={saving || !form.name} className="border-slate-300">
            Taslak Kaydet
          </Button>
          <Button
            onClick={() => handleSave("ACTIVE")}
            disabled={saving || !form.name || !form.price}
            className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white shadow-lg shadow-amber-500/25 px-6"
          >
            <Save className="h-4 w-4 mr-2" />
            {saving ? "Kaydediliyor..." : "Yayına Al"}
          </Button>
        </div>
      </div>
    </div>
  )
}
