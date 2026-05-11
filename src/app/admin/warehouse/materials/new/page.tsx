"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, Camera, Layers, Tag, Box, Ruler, Factory } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { toast } from "sonner"

export default function NewMaterialPage() {
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)
  const [suppliers, setSuppliers] = React.useState<any[]>([])

  const [formData, setFormData] = React.useState({
    name: "",
    sku: "",
    category: "LEATHER",
    unit: "M2",
    costPerUnit: "",
    stockQty: "0",
    supplierId: "",
    shelfLoc: ""
  })

  // Tedarikçileri getir (Varsayalım bir API var veya mock)
  React.useEffect(() => {
    // Gerçek uygulamada fetch("/api/admin/suppliers")
    setSuppliers([
      { id: "1", name: "Hakiki Deri A.Ş." },
      { id: "2", name: "Taban Sanayi Ltd." },
      { id: "3", name: "Ambalaj Dünyası" }
    ])
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.supplierId) {
      toast.error("Lütfen zorunlu alanları doldurun")
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/admin/warehouse/materials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        toast.success("Malzeme başarıyla eklendi")
        router.push("/admin/warehouse")
      } else {
        throw new Error("Kaydedilemedi")
      }
    } catch (error) {
      toast.error("Bir hata oluştu")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8 pb-20 p-6 max-w-7xl mx-auto">
      {/* Üst Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/warehouse"><ArrowLeft className="h-5 w-5" /></Link>
          </Button>
          <div>
            <h1 className="text-3xl font-serif font-bold text-slate-800 tracking-tight">Yeni Malzeme Kaydı</h1>
            <p className="text-slate-500">Hammade, sarf malzeme veya üretim materyali ekle</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => router.back()}>İptal</Button>
          <Button 
            disabled={loading}
            onClick={handleSubmit}
            className="bg-slate-900 text-white hover:bg-slate-800 shadow-xl shadow-slate-900/10"
          >
            {loading ? "Kaydediliyor..." : <><Save className="h-4 w-4 mr-2" /> Kaydet ve Envantere Ekle</>}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sol Kolon: Görsel */}
        <div className="space-y-6">
          <Card className="overflow-hidden border-dashed border-2 bg-slate-50/50 border-slate-200 group hover:border-amber-400 transition-colors">
            <CardContent className="p-0">
              <div className="flex flex-col items-center justify-center h-64 cursor-pointer">
                <Camera className="h-12 w-12 text-slate-300 mb-4 group-hover:text-amber-400 transition-colors" />
                <p className="text-sm text-slate-500 font-medium">Malzeme Fotoğrafı Yükle</p>
                <p className="text-xs text-slate-400 mt-1">PNG, JPG veya WEBP (Max. 5MB)</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm">
            <CardHeader><CardTitle className="text-sm font-bold text-slate-800 uppercase tracking-wider">Tedarikçi Bilgisi</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-500">Tedarikçi Seç *</label>
                <Select value={formData.supplierId} onValueChange={(v) => setFormData({...formData, supplierId: v})}>
                  <SelectTrigger className="bg-slate-50 border-slate-200"><SelectValue placeholder="Tedarikçi Listesi" /></SelectTrigger>
                  <SelectContent>
                    {suppliers.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold uppercase text-slate-500">Stok Kodu (SKU)</label>
                <Input 
                  value={formData.sku}
                  onChange={(e) => setFormData({...formData, sku: e.target.value})}
                  placeholder="WH-MAT-001" 
                  className="bg-slate-50 border-slate-200" 
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sağ Kolon: Detaylar */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-slate-200 shadow-sm">
            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold uppercase text-slate-500">Malzeme Adı *</label>
                <Input 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Örn: Birinci Sınıf Dana Derisi (Siyah)" 
                  className="h-12 text-lg bg-slate-50 border-slate-200" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-500">Kategori</label>
                <Select value={formData.category} onValueChange={(v) => setFormData({...formData, category: v})}>
                  <SelectTrigger className="bg-slate-50 border-slate-200"><SelectValue placeholder="Kategori Seç" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LEATHER">Deri / Kumaş</SelectItem>
                    <SelectItem value="SOLE">Taban / Topuk</SelectItem>
                    <SelectItem value="ACC">Bağcık / Aksesuar</SelectItem>
                    <SelectItem value="BOX">Kutu / Ambalaj</SelectItem>
                    <SelectItem value="CHEM">Kimyasal / Boya</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-500">Birim</label>
                <Select value={formData.unit} onValueChange={(v) => setFormData({...formData, unit: v})}>
                  <SelectTrigger className="bg-slate-50 border-slate-200"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="M2">Metrekare (m²)</SelectItem>
                    <SelectItem value="ADET">Adet</SelectItem>
                    <SelectItem value="KG">Kilogram (kg)</SelectItem>
                    <SelectItem value="METRE">Metre</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-500">Birim Maliyet (₺)</label>
                <Input 
                  type="number" 
                  value={formData.costPerUnit}
                  onChange={(e) => setFormData({...formData, costPerUnit: e.target.value})}
                  placeholder="0.00" 
                  className="bg-slate-50 border-slate-200"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-500">Mevcut Stok</label>
                <Input 
                  type="number" 
                  value={formData.stockQty}
                  onChange={(e) => setFormData({...formData, stockQty: e.target.value})}
                  placeholder="0" 
                  className="bg-slate-50 border-slate-200"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold uppercase text-slate-500">Depo Raf Konumu</label>
                <Input 
                  value={formData.shelfLoc}
                  onChange={(e) => setFormData({...formData, shelfLoc: e.target.value})}
                  placeholder="Örn: A-Blok, 3. Raf, 12-B" 
                  className="bg-slate-50 border-slate-200"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
