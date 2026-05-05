"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { ArrowLeft, Save, Upload, X } from "lucide-react"
import Link from "next/link"

export default function NewProductPage() {
  const router = useRouter()
  const [isSaving, setIsSaving] = React.useState(false)

  const [product, setProduct] = React.useState({
    name: "",
    sku: "",
    description: "",
    category: "",
    price: "",
    compareAtPrice: "",
    stock: "",
    lowStockThreshold: "10",
    status: "active",
  })

  const [variants, setVariants] = React.useState([
    { size: "", color: "", stock: "", sku: "" },
  ])

  const handleSave = async () => {
    if (!product.name || !product.price || !product.stock) {
      toast.error("Lütfen zorunlu alanları doldurun")
      return
    }

    setIsSaving(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast.success("Ürün başarıyla kaydedildi")
    router.push("/admin/products")
  }

  const addVariant = () => {
    setVariants([...variants, { size: "", color: "", stock: "", sku: "" }])
  }

  const removeVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/products">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-serif font-bold">Yeni Ürün</h1>
            <p className="text-muted-foreground mt-1">
              Yeni bir ürün ekleyin
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/admin/products">İptal</Link>
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? "Kaydediliyor..." : "Kaydet"}
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle>Temel Bilgiler</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Ürün Adı *
                </label>
                <Input
                  value={product.name}
                  onChange={(e) => setProduct({ ...product, name: e.target.value })}
                  placeholder="Premium Deri Kemer - Klasik Siyah"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  SKU *
                </label>
                <Input
                  value={product.sku}
                  onChange={(e) => setProduct({ ...product, sku: e.target.value })}
                  placeholder="DK-001-BLK"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Açıklama
                </label>
                <textarea
                  value={product.description}
                  onChange={(e) => setProduct({ ...product, description: e.target.value })}
                  placeholder="Ürün açıklaması..."
                  className="w-full min-h-[120px] rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Kategori *
                </label>
                <select
                  value={product.category}
                  onChange={(e) => setProduct({ ...product, category: e.target.value })}
                  className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                >
                  <option value="">Kategori seçin</option>
                  <option value="Deri Kemerler">Deri Kemerler</option>
                  <option value="Ortopedik Tabanlar">Ortopedik Tabanlar</option>
                  <option value="Bakım Ürünleri">Bakım Ürünleri</option>
                  <option value="Valiz Parçaları">Valiz Parçaları</option>
                  <option value="Deri Aksesuarlar">Deri Aksesuarlar</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Pricing */}
          <Card>
            <CardHeader>
              <CardTitle>Fiyatlandırma</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Fiyat *
                  </label>
                  <Input
                    type="number"
                    value={product.price}
                    onChange={(e) => setProduct({ ...product, price: e.target.value })}
                    placeholder="299"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Karşılaştırma Fiyatı
                  </label>
                  <Input
                    type="number"
                    value={product.compareAtPrice}
                    onChange={(e) => setProduct({ ...product, compareAtPrice: e.target.value })}
                    placeholder="399"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    İndirim göstermek için
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Inventory */}
          <Card>
            <CardHeader>
              <CardTitle>Stok Yönetimi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Stok Miktarı *
                  </label>
                  <Input
                    type="number"
                    value={product.stock}
                    onChange={(e) => setProduct({ ...product, stock: e.target.value })}
                    placeholder="45"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Düşük Stok Uyarısı
                  </label>
                  <Input
                    type="number"
                    value={product.lowStockThreshold}
                    onChange={(e) => setProduct({ ...product, lowStockThreshold: e.target.value })}
                    placeholder="10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Variants */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Varyantlar</CardTitle>
                <Button variant="outline" size="sm" onClick={addVariant}>
                  Varyant Ekle
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {variants.map((variant, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Varyant {index + 1}</h4>
                    {variants.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeVariant(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Beden</label>
                      <Input
                        value={variant.size}
                        onChange={(e) => {
                          const newVariants = [...variants]
                          newVariants[index].size = e.target.value
                          setVariants(newVariants)
                        }}
                        placeholder="M, L, XL"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Renk</label>
                      <Input
                        value={variant.color}
                        onChange={(e) => {
                          const newVariants = [...variants]
                          newVariants[index].color = e.target.value
                          setVariants(newVariants)
                        }}
                        placeholder="Siyah, Kahverengi"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Stok</label>
                      <Input
                        type="number"
                        value={variant.stock}
                        onChange={(e) => {
                          const newVariants = [...variants]
                          newVariants[index].stock = e.target.value
                          setVariants(newVariants)
                        }}
                        placeholder="10"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">SKU</label>
                      <Input
                        value={variant.sku}
                        onChange={(e) => {
                          const newVariants = [...variants]
                          newVariants[index].sku = e.target.value
                          setVariants(newVariants)
                        }}
                        placeholder="DK-001-BLK-M"
                      />
                    </div>
                  </div>
                </div>
              ))}
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
              <select
                value={product.status}
                onChange={(e) => setProduct({ ...product, status: e.target.value })}
                className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
              >
                <option value="active">Aktif</option>
                <option value="draft">Taslak</option>
                <option value="archived">Arşivlenmiş</option>
              </select>
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle>Görseller</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-accent transition-colors cursor-pointer">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Görselleri sürükleyin veya tıklayın
                </p>
              </div>
            </CardContent>
          </Card>

          {/* SEO */}
          <Card>
            <CardHeader>
              <CardTitle>SEO</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Meta Başlık
                </label>
                <Input placeholder="Ürün başlığı" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Meta Açıklama
                </label>
                <textarea
                  placeholder="Ürün açıklaması..."
                  className="w-full min-h-[80px] rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
