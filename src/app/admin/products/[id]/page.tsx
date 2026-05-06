"use client"

import * as React from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, Trash2, Package, TrendingUp, AlertTriangle } from "lucide-react"
import { toast } from "sonner"

// Mock product data
const mockProduct = {
  id: "1",
  name: "Premium Deri Kemer - Klasik Siyah",
  sku: "DK-001-BLK",
  description: "El işçiliği premium deri kemer. %100 hakiki dana derisi kullanılarak üretilmiştir. Özel terbiye işlemi görmüş deriler kullanılarak, geleneksel yöntemlerle üretilmiştir.",
  shortDesc: "Premium kalite deri kemer",
  category: "Deri Kemerler",
  price: 299,
  compareAtPrice: 399,
  costPrice: 150,
  stock: 45,
  lowStockAlert: 10,
  weight: 250,
  tags: ["premium", "deri", "kemer", "siyah"],
  status: "active",
  vendor: "Davut Kundura Atölyesi",
  barcode: "8690123456789",
  createdAt: "2024-01-15",
  updatedAt: "2024-03-10",
  totalSold: 127,
  revenue: 38073,
  images: ["/products/belt-1.jpg", "/products/belt-1-2.jpg"],
}

const statusColors = {
  active: "bg-green-500/10 text-green-700",
  "low-stock": "bg-yellow-500/10 text-yellow-700",
  "out-of-stock": "bg-red-500/10 text-red-700",
  draft: "bg-gray-500/10 text-gray-700",
}

const statusLabels = {
  active: "Aktif",
  "low-stock": "Stok Azalıyor",
  "out-of-stock": "Stokta Yok",
  draft: "Taslak",
}

export default function AdminProductDetailPage() {
  const router = useRouter()
  const params = useParams()

  const handleDelete = async () => {
    if (!confirm("Bu ürünü silmek istediğinizden emin misiniz?")) return

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success("Ürün başarıyla silindi!")
      router.push("/admin/products")
    } catch (error) {
      toast.error("Ürün silinirken bir hata oluştu")
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
            <h1 className="text-3xl font-serif font-bold">{mockProduct.name}</h1>
            <p className="text-muted-foreground mt-1">
              SKU: {mockProduct.sku} • ID: {params.id}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <a href={`/products/${params.id}`} target="_blank">
              Önizle
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href={`/admin/products/${params.id}/edit`}>
              <Edit className="h-4 w-4 mr-2" />
              Düzenle
            </a>
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            <Trash2 className="h-4 w-4 mr-2" />
            Sil
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Product Images */}
          <Card>
            <CardHeader>
              <CardTitle>Ürün Görselleri</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {mockProduct.images.map((image, index) => (
                  <div key={index} className="aspect-square rounded-lg bg-muted flex items-center justify-center">
                    <Package className="h-8 w-8 text-muted-foreground" />
                  </div>
                ))}
                <div className="aspect-square rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center">
                  <span className="text-sm text-muted-foreground">Görsel Ekle</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product Information */}
          <Card>
            <CardHeader>
              <CardTitle>Ürün Bilgileri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Açıklama</h3>
                <p className="text-muted-foreground">{mockProduct.description}</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
                <div>
                  <p className="text-sm text-muted-foreground">Kategori</p>
                  <p className="font-semibold">{mockProduct.category}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tedarikçi</p>
                  <p className="font-semibold">{mockProduct.vendor}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Ağırlık</p>
                  <p className="font-semibold">{mockProduct.weight}g</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Barkod</p>
                  <p className="font-semibold text-xs">{mockProduct.barcode}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sales Analytics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Satış Analitikleri
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{mockProduct.totalSold}</p>
                  <p className="text-sm text-muted-foreground">Toplam Satış</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{mockProduct.revenue.toLocaleString()}₺</p>
                  <p className="text-sm text-muted-foreground">Toplam Gelir</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">
                    {Math.round((mockProduct.revenue / mockProduct.totalSold))}₺
                  </p>
                  <p className="text-sm text-muted-foreground">Ortalama Fiyat</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status & Pricing */}
          <Card>
            <CardHeader>
              <CardTitle>Durum & Fiyat</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Durum</p>
                <Badge className={statusColors[mockProduct.status as keyof typeof statusColors]}>
                  {statusLabels[mockProduct.status as keyof typeof statusLabels]}
                </Badge>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Satış Fiyatı</p>
                <p className="text-2xl font-bold">{mockProduct.price}₺</p>
                {mockProduct.compareAtPrice && (
                  <p className="text-sm text-muted-foreground line-through">
                    {mockProduct.compareAtPrice}₺
                  </p>
                )}
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Maliyet</p>
                <p className="font-semibold">{mockProduct.costPrice}₺</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Kar Marjı</p>
                <p className="font-semibold text-green-600">
                  {Math.round(((mockProduct.price - mockProduct.costPrice) / mockProduct.price) * 100)}%
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Inventory */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Stok Durumu
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Mevcut Stok</p>
                <p className="text-2xl font-bold">{mockProduct.stock}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Düşük Stok Uyarısı</p>
                <p className="font-semibold">{mockProduct.lowStockAlert}</p>
              </div>

              {mockProduct.stock <= mockProduct.lowStockAlert && (
                <div className="flex items-center gap-2 p-3 bg-yellow-500/10 text-yellow-700 rounded-lg">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-sm font-medium">Stok azalıyor!</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Metadata */}
          <Card>
            <CardHeader>
              <CardTitle>Ürün Geçmişi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Oluşturulma</p>
                <p className="font-semibold">{mockProduct.createdAt}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Son Güncelleme</p>
                <p className="font-semibold">{mockProduct.updatedAt}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}