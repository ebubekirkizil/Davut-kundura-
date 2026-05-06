"use client"

import * as React from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Plus,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Filter,
  Package,
  TrendingUp,
  AlertTriangle,
  Star,
  BarChart3
} from "lucide-react"

// Mock products data
const products = [
  {
    id: "1",
    name: "Premium Deri Kemer - Executive Black",
    sku: "DK-001-BLK",
    category: "Deri Kemerler",
    price: 899,
    compareAtPrice: 1299,
    costPrice: 450,
    stock: 45,
    lowStockAlert: 10,
    status: "active",
    image: "/products/belt-1.jpg",
    sales: 247,
    revenue: 221853,
    rating: 4.8,
    reviews: 89,
    tags: ["premium", "executive", "leather"],
    vendor: "Davut Kundura Atölyesi",
    createdAt: "2024-01-15",
    lastSold: "2 saat önce"
  },
  {
    id: "2",
    name: "Ortopedik Taban - Comfort Pro Series",
    sku: "DK-002-ORT",
    category: "Ortopedik Çözümler",
    price: 349,
    compareAtPrice: 449,
    costPrice: 180,
    stock: 120,
    lowStockAlert: 20,
    status: "active",
    image: "/products/insole-1.jpg",
    sales: 189,
    revenue: 65961,
    rating: 4.9,
    reviews: 156,
    tags: ["ortopedik", "comfort", "medical"],
    vendor: "Ortopedik Çözümler Ltd.",
    createdAt: "2024-02-10",
    lastSold: "45 dakika önce"
  },
  {
    id: "3",
    name: "Luxury Deri Bakım Seti - Professional",
    sku: "DK-003-BAK",
    category: "Bakım & Aksesuar",
    price: 299,
    compareAtPrice: 399,
    costPrice: 120,
    stock: 8,
    lowStockAlert: 15,
    status: "low-stock",
    image: "/products/care-1.jpg",
    sales: 78,
    revenue: 23322,
    rating: 4.7,
    reviews: 34,
    tags: ["bakım", "luxury", "professional"],
    vendor: "Premium Care Solutions",
    createdAt: "2024-03-05",
    lastSold: "1 gün önce"
  },
  {
    id: "4",
    name: "Vintage Deri Kemer - Handcrafted Brown",
    sku: "DK-004-BRN",
    category: "Deri Kemerler",
    price: 1299,
    compareAtPrice: 1599,
    costPrice: 650,
    stock: 0,
    lowStockAlert: 5,
    status: "out-of-stock",
    image: "/products/belt-2.jpg",
    sales: 45,
    revenue: 58455,
    rating: 4.9,
    reviews: 23,
    tags: ["vintage", "handcrafted", "premium"],
    vendor: "Davut Kundura Atölyesi",
    createdAt: "2024-01-20",
    lastSold: "3 gün önce"
  },
  {
    id: "5",
    name: "Kurumsal Ayakkabı Seti - Executive Package",
    sku: "DK-005-CORP",
    category: "Kurumsal Çözümler",
    price: 2499,
    compareAtPrice: 3299,
    costPrice: 1200,
    stock: 25,
    lowStockAlert: 10,
    status: "active",
    image: "/products/corporate-1.jpg",
    sales: 67,
    revenue: 167433,
    rating: 4.8,
    reviews: 45,
    tags: ["kurumsal", "executive", "package"],
    vendor: "Corporate Solutions Ltd.",
    createdAt: "2024-02-28",
    lastSold: "3 saat önce"
  },
]

const categories = [
  "Tümü",
  "Deri Kemerler",
  "Ortopedik Çözümler",
  "Bakım & Aksesuar",
  "Kurumsal Çözümler"
]

const productStats = [
  {
    title: "Toplam Ürün",
    value: "247",
    change: "+12",
    trend: "up",
    icon: Package,
    color: "from-blue-500 to-cyan-600"
  },
  {
    title: "Aktif Ürünler",
    value: "189",
    change: "+8",
    trend: "up",
    icon: TrendingUp,
    color: "from-emerald-500 to-green-600"
  },
  {
    title: "Düşük Stok",
    value: "23",
    change: "-5",
    trend: "down",
    icon: AlertTriangle,
    color: "from-amber-500 to-orange-600"
  },
  {
    title: "Ortalama Puan",
    value: "4.8",
    change: "+0.2",
    trend: "up",
    icon: Star,
    color: "from-purple-500 to-violet-600"
  },
]

const statusColors = {
  active: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
  "low-stock": "bg-amber-500/10 text-amber-700 border-amber-200",
  "out-of-stock": "bg-red-500/10 text-red-700 border-red-200",
  draft: "bg-slate-500/10 text-slate-700 border-slate-200",
}

const statusLabels = {
  active: "Aktif",
  "low-stock": "Stok Azalıyor",
  "out-of-stock": "Stokta Yok",
  draft: "Taslak",
}

export default function AdminProductsPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState("Tümü")
  const [selectedStatus, setSelectedStatus] = React.useState("all")

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory === "Tümü" || product.category === selectedCategory
    const matchesStatus = selectedStatus === "all" || product.status === selectedStatus

    return matchesSearch && matchesCategory && matchesStatus
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-serif font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent">
            Ürün Yönetimi
          </h1>
          <p className="text-slate-600 mt-2 text-lg">
            {products.length} toplam ürün • {filteredProducts.length} görüntülenen
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="bg-white/60 backdrop-blur-sm border-white/40 hover:bg-white/80">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analitik Rapor
          </Button>
          <Button className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white shadow-lg shadow-amber-500/25" asChild>
            <Link href="/admin/products/new">
              <Plus className="h-4 w-4 mr-2" />
              Yeni Ürün Ekle
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {productStats.map((stat, index) => (
          <Card key={stat.title} className="relative overflow-hidden bg-white/60 backdrop-blur-sm border-white/40 shadow-xl shadow-slate-200/20 hover:shadow-2xl hover:shadow-slate-300/30 transition-all duration-300 group">
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
            <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-3">
              <div>
                <CardTitle className="text-sm font-medium text-slate-600">{stat.title}</CardTitle>
              </div>
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                <stat.icon className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-3xl font-bold text-slate-800 mb-2">{stat.value}</div>
              <div className="flex items-center text-sm">
                <TrendingUp className="h-4 w-4 mr-1 text-emerald-600" />
                <span className="font-semibold text-emerald-600">{stat.change}</span>
                <span className="ml-2 text-slate-500">bu ay</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="bg-white/60 backdrop-blur-sm border-white/40 shadow-xl shadow-slate-200/20">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Ürün ara (isim, SKU, etiket)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/60 border-white/40 focus:bg-white/80 transition-all"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full lg:w-48 bg-white/60 border-white/40">
                <SelectValue placeholder="Kategori" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Status Filter */}
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full lg:w-48 bg-white/60 border-white/40">
                <SelectValue placeholder="Durum" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Durumlar</SelectItem>
                <SelectItem value="active">Aktif</SelectItem>
                <SelectItem value="low-stock">Stok Azalıyor</SelectItem>
                <SelectItem value="out-of-stock">Stokta Yok</SelectItem>
                <SelectItem value="draft">Taslak</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="bg-white/60 border-white/40 hover:bg-white/80">
              <Filter className="h-4 w-4 mr-2" />
              Gelişmiş Filtre
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="group relative overflow-hidden bg-white/60 backdrop-blur-sm border-white/40 shadow-xl shadow-slate-200/20 hover:shadow-2xl hover:shadow-slate-300/30 transition-all duration-300">
            {/* Product Image */}
            <div className="relative h-48 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center overflow-hidden">
              <Package className="h-16 w-16 text-slate-400" />

              {/* Status Badge */}
              <div className="absolute top-3 left-3">
                <Badge className={`${statusColors[product.status as keyof typeof statusColors]} border shadow-sm`}>
                  {statusLabels[product.status as keyof typeof statusLabels]}
                </Badge>
              </div>

              {/* Quick Actions */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8 bg-white/80 backdrop-blur-sm hover:bg-white" asChild>
                    <Link href={`/products/${product.id}`}>
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 bg-white/80 backdrop-blur-sm hover:bg-white" asChild>
                    <Link href={`/admin/products/${product.id}/edit`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Discount Badge */}
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <div className="absolute bottom-3 left-3">
                  <Badge className="bg-red-500 text-white">
                    -{Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}%
                  </Badge>
                </div>
              )}
            </div>

            <CardContent className="p-6">
              {/* Product Info */}
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-slate-800 line-clamp-2 group-hover:text-amber-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">{product.category}</p>
                </div>

                {/* SKU and Tags */}
                <div className="flex items-center justify-between">
                  <code className="text-xs bg-slate-100 px-2 py-1 rounded font-mono text-slate-600">
                    {product.sku}
                  </code>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-amber-500 fill-current" />
                    <span className="text-xs text-slate-600">{product.rating}</span>
                    <span className="text-xs text-slate-400">({product.reviews})</span>
                  </div>
                </div>

                {/* Pricing */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-slate-800">₺{product.price.toLocaleString()}</span>
                      {product.compareAtPrice && (
                        <span className="text-sm text-slate-500 line-through">₺{product.compareAtPrice.toLocaleString()}</span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500">Maliyet: ₺{product.costPrice.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-emerald-600">
                      %{Math.round(((product.price - product.costPrice) / product.price) * 100)} kar
                    </p>
                  </div>
                </div>

                {/* Stock and Sales */}
                <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-200">
                  <div>
                    <p className="text-xs text-slate-500">Stok</p>
                    <p className={`font-semibold ${product.stock <= product.lowStockAlert ? 'text-red-600' : 'text-slate-800'}`}>
                      {product.stock} adet
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Satış</p>
                    <p className="font-semibold text-slate-800">{product.sales} adet</p>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-slate-500">Gelir</p>
                    <p className="font-semibold text-slate-800">₺{product.revenue.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Son Satış</p>
                    <p className="font-semibold text-slate-800">{product.lastSold}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-3">
                  <Button variant="outline" size="sm" className="flex-1 bg-white/60 border-white/40 hover:bg-white/80" asChild>
                    <Link href={`/admin/products/${product.id}`}>
                      <Eye className="h-4 w-4 mr-2" />
                      Detay
                    </Link>
                  </Button>
                  <Button size="sm" className="flex-1 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white" asChild>
                    <Link href={`/admin/products/${product.id}/edit`}>
                      <Edit className="h-4 w-4 mr-2" />
                      Düzenle
                    </Link>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="bg-white/60 border-white/40 hover:bg-white/80">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white/95 backdrop-blur-sm border-white/40">
                      <DropdownMenuItem>Kopyala</DropdownMenuItem>
                      <DropdownMenuItem>Arşivle</DropdownMenuItem>
                      <DropdownMenuItem>Stok Güncelle</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600 focus:text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Sil
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <Card className="bg-white/60 backdrop-blur-sm border-white/40 shadow-xl shadow-slate-200/20">
          <CardContent className="text-center py-16">
            <Package className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Ürün bulunamadı</h3>
            <p className="text-slate-600 mb-6">
              Arama kriterlerinize uygun ürün bulunmuyor. Filtreleri değiştirmeyi deneyin.
            </p>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={() => {
                setSearchQuery("")
                setSelectedCategory("Tümü")
                setSelectedStatus("all")
              }}>
                Filtreleri Temizle
              </Button>
              <Button className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white" asChild>
                <Link href="/admin/products/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Yeni Ürün Ekle
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
