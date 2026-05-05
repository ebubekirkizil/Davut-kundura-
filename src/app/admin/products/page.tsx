"use client"

import * as React from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Plus, Search, MoreVertical, Edit, Trash2, Eye } from "lucide-react"

// Mock products data
const products = [
  {
    id: "1",
    name: "Premium Deri Kemer - Klasik Siyah",
    sku: "DK-001-BLK",
    category: "Deri Kemerler",
    price: 299,
    stock: 45,
    status: "active",
    image: "/products/belt-1.jpg",
  },
  {
    id: "2",
    name: "Ortopedik Taban - Comfort Plus",
    sku: "DK-002-ORT",
    category: "Ortopedik Tabanlar",
    price: 149,
    stock: 120,
    status: "active",
    image: "/products/insole-1.jpg",
  },
  {
    id: "3",
    name: "Ayakkabı Bakım Seti - Premium",
    sku: "DK-003-BAK",
    category: "Bakım Ürünleri",
    price: 199,
    stock: 8,
    status: "low-stock",
    image: "/products/care-1.jpg",
  },
  {
    id: "4",
    name: "Deri Kemer - Kahverengi Vintage",
    sku: "DK-004-BRN",
    category: "Deri Kemerler",
    price: 349,
    stock: 0,
    status: "out-of-stock",
    image: "/products/belt-2.jpg",
  },
]

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

export default function AdminProductsPage() {
  const [searchQuery, setSearchQuery] = React.useState("")

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold">Ürün Yönetimi</h1>
          <p className="text-muted-foreground mt-1">
            {products.length} ürün
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/products/new">
            <Plus className="h-4 w-4 mr-2" />
            Yeni Ürün
          </Link>
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Ürün ara (isim, SKU)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Products Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="text-left p-4 font-semibold">Ürün</th>
                  <th className="text-left p-4 font-semibold">SKU</th>
                  <th className="text-left p-4 font-semibold">Kategori</th>
                  <th className="text-left p-4 font-semibold">Fiyat</th>
                  <th className="text-left p-4 font-semibold">Stok</th>
                  <th className="text-left p-4 font-semibold">Durum</th>
                  <th className="text-right p-4 font-semibold">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-muted/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                          <span className="text-2xl">📦</span>
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium truncate">{product.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <code className="text-sm bg-muted px-2 py-1 rounded">
                        {product.sku}
                      </code>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">
                      {product.category}
                    </td>
                    <td className="p-4 font-semibold">
                      {product.price}₺
                    </td>
                    <td className="p-4">
                      <span className={product.stock < 10 ? "text-red-600 font-semibold" : ""}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="p-4">
                      <Badge className={statusColors[product.status as keyof typeof statusColors]}>
                        {statusLabels[product.status as keyof typeof statusLabels]}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/products/${product.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/admin/products/${product.id}/edit`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Kopyala</DropdownMenuItem>
                            <DropdownMenuItem>Arşivle</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Sil
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Ürün bulunamadı</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
