"use client"

import * as React from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowLeft, Save, Trash2 } from "lucide-react"
import { toast } from "sonner"

// Mock product data
const mockProduct = {
  id: "1",
  name: "Premium Deri Kemer - Klasik Siyah",
  sku: "DK-001-BLK",
  description: "El işçiliği premium deri kemer. %100 hakiki dana derisi kullanılarak üretilmiştir.",
  shortDesc: "Premium kalite deri kemer",
  category: "BELT",
  price: 299,
  compareAtPrice: 399,
  costPrice: 150,
  stock: 45,
  lowStockAlert: 10,
  weight: 250,
  tags: ["premium", "deri", "kemer", "siyah"],
  status: "ACTIVE",
  vendor: "Davut Kundura Atölyesi",
  barcode: "8690123456789",
  trackInventory: true,
  allowBackorder: false,
}

export default function AdminProductEditPage() {
  const router = useRouter()
  const params = useParams()
  const [isLoading, setIsLoading] = React.useState(false)
  const [formData, setFormData] = React.useState(mockProduct)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success("Ürün başarıyla güncellendi!")
      router.push("/admin/products")
    } catch (error) {
      toast.error("Ürün güncellenirken bir hata oluştu")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Bu ürünü silmek istediğinizden emin misiniz?")) return

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success("Ürün başarıyla silindi!")
      router.push("/admin/products")
    } catch (error) {
      toast.error("Ürün silinirken bir hata oluştu")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-serif font-bold">Ürün Düzenle</h1>
            <p className="text-muted-foreground mt-1">
              ID: {params.id} - {formData.name}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Sil
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
          >
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? "Kaydediliyor..." : "Kaydet"}
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Temel Bilgiler</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Ürün Adı</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Ürün adını girin"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Açıklama</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Ürün açıklamasını girin"
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="shortDesc">Kısa Açıklama</Label>
                <Input
                  id="shortDesc"
                  value={formData.shortDesc}
                  onChange={(e) => setFormData(prev => ({ ...prev, shortDesc: e.target.value }))}
                  placeholder="Kısa açıklama"
                />
              </div>
            </CardContent>
          </Card>

          {/* Pricing */}
          <Card>
            <CardHeader>
              <CardTitle>Fiyatlandırma</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="price">Satış Fiyatı (₺)</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
                  placeholder="0"
                  required
                />
              </div>

              <div>
                <Label htmlFor="compareAtPrice">Karşılaştırma Fiyatı (₺)</Label>
                <Input
                  id="compareAtPrice"
                  type="number"
                  value={formData.compareAtPrice}
                  onChange={(e) => setFormData(prev => ({ ...prev, compareAtPrice: Number(e.target.value) }))}
                  placeholder="0"
                />
              </div>

              <div>
                <Label htmlFor="costPrice">Maliyet Fiyatı (₺)</Label>
                <Input
                  id="costPrice"
                  type="number"
                  value={formData.costPrice}
                  onChange={(e) => setFormData(prev => ({ ...prev, costPrice: Number(e.target.value) }))}
                  placeholder="0"
                />
              </div>
            </CardContent>
          </Card>

          {/* Inventory */}
          <Card>
            <CardHeader>
              <CardTitle>Stok Yönetimi</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="stock">Mevcut Stok</Label>
                <Input
                  id="stock"
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData(prev => ({ ...prev, stock: Number(e.target.value) }))}
                  placeholder="0"
                />
              </div>

              <div>
                <Label htmlFor="lowStockAlert">Düşük Stok Uyarısı</Label>
                <Input
                  id="lowStockAlert"
                  type="number"
                  value={formData.lowStockAlert}
                  onChange={(e) => setFormData(prev => ({ ...prev, lowStockAlert: Number(e.target.value) }))}
                  placeholder="5"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <Card>
            <CardHeader>
              <CardTitle>Durum</CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ACTIVE">Aktif</SelectItem>
                  <SelectItem value="DRAFT">Taslak</SelectItem>
                  <SelectItem value="ARCHIVED">Arşivlenmiş</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Category */}
          <Card>
            <CardHeader>
              <CardTitle>Kategori</CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ORTHOPEDIC_INSOLE">Ortopedik Taban</SelectItem>
                  <SelectItem value="BELT">Deri Kemer</SelectItem>
                  <SelectItem value="SHOE_CARE">Ayakkabı Bakım</SelectItem>
                  <SelectItem value="LUGGAGE_PARTS">Valiz Parçaları</SelectItem>
                  <SelectItem value="OTHER">Diğer</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Product Details */}
          <Card>
            <CardHeader>
              <CardTitle>Ürün Detayları</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="sku">SKU</Label>
                <Input
                  id="sku"
                  value={formData.sku}
                  onChange={(e) => setFormData(prev => ({ ...prev, sku: e.target.value }))}
                  placeholder="Ürün kodu"
                />
              </div>

              <div>
                <Label htmlFor="barcode">Barkod</Label>
                <Input
                  id="barcode"
                  value={formData.barcode}
                  onChange={(e) => setFormData(prev => ({ ...prev, barcode: e.target.value }))}
                  placeholder="Barkod numarası"
                />
              </div>

              <div>
                <Label htmlFor="weight">Ağırlık (gram)</Label>
                <Input
                  id="weight"
                  type="number"
                  value={formData.weight}
                  onChange={(e) => setFormData(prev => ({ ...prev, weight: Number(e.target.value) }))}
                  placeholder="0"
                />
              </div>

              <div>
                <Label htmlFor="vendor">Tedarikçi</Label>
                <Input
                  id="vendor"
                  value={formData.vendor}
                  onChange={(e) => setFormData(prev => ({ ...prev, vendor: e.target.value }))}
                  placeholder="Tedarikçi adı"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  )
}