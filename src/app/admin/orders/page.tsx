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
  Search,
  Filter,
  Eye,
  Printer,
  MoreVertical,
  ShoppingCart,
  TrendingUp,
  Clock,
  DollarSign,
  Package,
  Truck,
  User,
  Calendar,
  CreditCard,
  MapPin,
  Phone,
  Mail,
  BarChart3
} from "lucide-react"

// Mock orders data
const orders = [
  {
    id: "DK24050001",
    customer: {
      name: "Mehmet Yılmaz",
      email: "mehmet.yilmaz@abcholding.com.tr",
      phone: "+90 532 123 45 67",
      company: "ABC Holding A.Ş.",
      type: "corporate"
    },
    date: "2026-05-06T10:30:00",
    status: "delivered",
    payment: "paid",
    paymentMethod: "Kurumsal Havale",
    total: 15980,
    subtotal: 13316,
    tax: 2664,
    shipping: 0,
    items: 8,
    priority: "high",
    shipping: {
      method: "Express Kurye",
      tracking: "EXP123456789",
      address: "Maslak Mahallesi, Büyükdere Cad. No:123 Sarıyer/İstanbul",
      estimatedDelivery: "2026-05-06T16:00:00"
    },
    products: [
      { name: "Premium Deri Kemer - Executive", quantity: 5, price: 899 },
      { name: "Ortopedik Tabanlık - Pro", quantity: 3, price: 349 }
    ],
    notes: "Kurumsal müşteri - Fatura adresi farklı",
    orderSource: "B2B Portal"
  },
  {
    id: "DK24050002",
    customer: {
      name: "Ayşe Kaya",
      email: "ayse.kaya@xyztekstil.com",
      phone: "+90 533 987 65 43",
      company: "XYZ Tekstil Ltd. Şti.",
      type: "corporate"
    },
    date: "2026-05-06T09:15:00",
    status: "shipped",
    payment: "paid",
    paymentMethod: "Kredi Kartı",
    total: 8750,
    subtotal: 7291,
    tax: 1459,
    shipping: 0,
    items: 5,
    priority: "medium",
    shipping: {
      method: "Hızlı Kargo",
      tracking: "HK987654321",
      address: "Organize Sanayi Bölgesi, 15. Cadde No:45 Çorlu/Tekirdağ",
      estimatedDelivery: "2026-05-07T18:00:00"
    },
    products: [
      { name: "Luxury Deri Bakım Seti", quantity: 2, price: 299 },
      { name: "Premium Deri Kemer - Executive", quantity: 3, price: 899 }
    ],
    notes: "Acil teslimat talep edildi",
    orderSource: "Telefon Siparişi"
  },
  {
    id: "DK24050003",
    customer: {
      name: "Can Demir",
      email: "can.demir@definşaat.com.tr",
      phone: "+90 534 456 78 90",
      company: "DEF İnşaat A.Ş.",
      type: "corporate"
    },
    date: "2026-05-05T16:45:00",
    status: "processing",
    payment: "paid",
    paymentMethod: "EFT",
    total: 24680,
    subtotal: 20566,
    tax: 4114,
    shipping: 0,
    items: 12,
    priority: "high",
    shipping: {
      method: "Özel Kurye",
      tracking: null,
      address: "Atatürk Mahallesi, İnönü Cad. No:67 Kadıköy/İstanbul",
      estimatedDelivery: "2026-05-08T14:00:00"
    },
    products: [
      { name: "Kurumsal Ayakkabı Seti", quantity: 4, price: 2499 },
      { name: "Premium Deri Kemer - Executive", quantity: 8, price: 899 }
    ],
    notes: "Toplu sipariş - İndirim uygulandı",
    orderSource: "Satış Temsilcisi"
  },
  {
    id: "DK24050004",
    customer: {
      name: "Zeynep Özkan",
      email: "zeynep.ozkan@ghiotomotiv.com",
      phone: "+90 535 321 09 87",
      company: "GHI Otomotiv Ltd. Şti.",
      type: "corporate"
    },
    date: "2026-05-05T14:20:00",
    status: "pending",
    payment: "pending",
    paymentMethod: "Kurumsal Havale",
    total: 6890,
    subtotal: 5741,
    tax: 1149,
    shipping: 0,
    items: 3,
    priority: "low",
    shipping: {
      method: "Standart Kargo",
      tracking: null,
      address: "Sanayi Mahallesi, Fabrika Cad. No:234 Gebze/Kocaeli",
      estimatedDelivery: "2026-05-09T17:00:00"
    },
    products: [
      { name: "Ortopedik Tabanlık - Pro", quantity: 2, price: 349 },
      { name: "Luxury Deri Bakım Seti", quantity: 1, price: 299 }
    ],
    notes: "Ödeme onayı bekleniyor",
    orderSource: "Online Mağaza"
  },
  {
    id: "DK24050005",
    customer: {
      name: "Ahmet Şahin",
      email: "ahmet.sahin@jklenerji.com.tr",
      phone: "+90 536 654 32 10",
      company: "JKL Enerji A.Ş.",
      type: "corporate"
    },
    date: "2026-05-05T11:10:00",
    status: "cancelled",
    payment: "refunded",
    paymentMethod: "Kredi Kartı",
    total: 12450,
    subtotal: 10375,
    tax: 2075,
    shipping: 0,
    items: 6,
    priority: "medium",
    shipping: {
      method: "Hızlı Kargo",
      tracking: "HK456789123",
      address: "Merkez Mahallesi, Cumhuriyet Cad. No:89 Ankara/Çankaya",
      estimatedDelivery: null
    },
    products: [
      { name: "Premium Deri Kemer - Executive", quantity: 4, price: 899 },
      { name: "Kurumsal Ayakkabı Seti", quantity: 2, price: 2499 }
    ],
    notes: "Müşteri talebi üzerine iptal edildi",
    orderSource: "B2B Portal"
  }
]

const orderStats = [
  {
    title: "Toplam Sipariş",
    subtitle: "Bu Ay",
    value: "2,847",
    change: "+18.2%",
    trend: "up",
    icon: ShoppingCart,
    color: "from-blue-500 to-cyan-600"
  },
  {
    title: "Aktif Siparişler",
    subtitle: "İşlemde",
    value: "1,234",
    change: "+12.5%",
    trend: "up",
    icon: Clock,
    color: "from-amber-500 to-orange-600"
  },
  {
    title: "Toplam Gelir",
    subtitle: "Bu Ay",
    value: "₺4,892,340",
    change: "+24.8%",
    trend: "up",
    icon: DollarSign,
    color: "from-emerald-500 to-green-600"
  },
  {
    title: "Ortalama Sipariş",
    subtitle: "Değeri",
    value: "₺1,720",
    change: "+8.3%",
    trend: "up",
    icon: TrendingUp,
    color: "from-purple-500 to-violet-600"
  }
]

const statusColors = {
  delivered: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
  shipped: "bg-blue-500/10 text-blue-700 border-blue-200",
  processing: "bg-amber-500/10 text-amber-700 border-amber-200",
  pending: "bg-orange-500/10 text-orange-700 border-orange-200",
  cancelled: "bg-red-500/10 text-red-700 border-red-200",
}

const statusLabels = {
  delivered: "Teslim Edildi",
  shipped: "Kargoda",
  processing: "Hazırlanıyor",
  pending: "Beklemede",
  cancelled: "İptal Edildi",
}

const paymentColors = {
  paid: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
  pending: "bg-amber-500/10 text-amber-700 border-amber-200",
  failed: "bg-red-500/10 text-red-700 border-red-200",
  refunded: "bg-slate-500/10 text-slate-700 border-slate-200",
}

const paymentLabels = {
  paid: "Ödendi",
  pending: "Beklemede",
  failed: "Başarısız",
  refunded: "İade Edildi",
}

const priorityColors = {
  high: "bg-red-500/10 text-red-700",
  medium: "bg-amber-500/10 text-amber-700",
  low: "bg-emerald-500/10 text-emerald-700",
}

const priorityLabels = {
  high: "Yüksek",
  medium: "Orta",
  low: "Düşük",
}

export default function AdminOrdersPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState<string | null>(null)
  const [priorityFilter, setPriorityFilter] = React.useState<string | null>(null)
  const [paymentFilter, setPaymentFilter] = React.useState<string | null>(null)

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.company.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = !statusFilter || order.status === statusFilter
    const matchesPriority = !priorityFilter || order.priority === priorityFilter
    const matchesPayment = !paymentFilter || order.payment === paymentFilter

    return matchesSearch && matchesStatus && matchesPriority && matchesPayment
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('tr-TR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Az önce"
    if (diffInHours < 24) return `${diffInHours} saat önce`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays} gün önce`
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-serif font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent">
            Sipariş Yönetimi
          </h1>
          <p className="text-slate-600 mt-2 text-lg">
            {orders.length} toplam sipariş • {filteredOrders.length} görüntülenen
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="bg-white/60 backdrop-blur-sm border-white/40 hover:bg-white/80">
            <BarChart3 className="h-4 w-4 mr-2" />
            Sipariş Raporu
          </Button>
          <Button className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white shadow-lg shadow-amber-500/25">
            <Package className="h-4 w-4 mr-2" />
            Toplu İşlem
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {orderStats.map((stat, index) => (
          <Card key={stat.title} className="relative overflow-hidden bg-white/60 backdrop-blur-sm border-white/40 shadow-xl shadow-slate-200/20 hover:shadow-2xl hover:shadow-slate-300/30 transition-all duration-300 group">
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
            <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-3">
              <div>
                <CardTitle className="text-sm font-medium text-slate-600">{stat.title}</CardTitle>
                <p className="text-xs text-slate-500 mt-1">{stat.subtitle}</p>
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
                <span className="ml-2 text-slate-500">geçen aya göre</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enhanced Filters */}
      <Card className="bg-white/60 backdrop-blur-sm border-white/40 shadow-xl shadow-slate-200/20">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Sipariş ara (numara, müşteri, şirket)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/60 border-white/40 focus:bg-white/80 transition-all"
              />
            </div>

            {/* Status Filter */}
            <Select value={statusFilter || ""} onValueChange={(value) => setStatusFilter(value || null)}>
              <SelectTrigger className="w-full lg:w-48 bg-white/60 border-white/40">
                <SelectValue placeholder="Durum" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tüm Durumlar</SelectItem>
                <SelectItem value="pending">Beklemede</SelectItem>
                <SelectItem value="processing">Hazırlanıyor</SelectItem>
                <SelectItem value="shipped">Kargoda</SelectItem>
                <SelectItem value="delivered">Teslim Edildi</SelectItem>
                <SelectItem value="cancelled">İptal Edildi</SelectItem>
              </SelectContent>
            </Select>

            {/* Priority Filter */}
            <Select value={priorityFilter || ""} onValueChange={(value) => setPriorityFilter(value || null)}>
              <SelectTrigger className="w-full lg:w-48 bg-white/60 border-white/40">
                <SelectValue placeholder="Öncelik" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tüm Öncelikler</SelectItem>
                <SelectItem value="high">Yüksek</SelectItem>
                <SelectItem value="medium">Orta</SelectItem>
                <SelectItem value="low">Düşük</SelectItem>
              </SelectContent>
            </Select>

            {/* Payment Filter */}
            <Select value={paymentFilter || ""} onValueChange={(value) => setPaymentFilter(value || null)}>
              <SelectTrigger className="w-full lg:w-48 bg-white/60 border-white/40">
                <SelectValue placeholder="Ödeme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tüm Ödemeler</SelectItem>
                <SelectItem value="paid">Ödendi</SelectItem>
                <SelectItem value="pending">Beklemede</SelectItem>
                <SelectItem value="failed">Başarısız</SelectItem>
                <SelectItem value="refunded">İade Edildi</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Grid */}
      <div className="grid gap-6">
        {filteredOrders.map((order) => (
          <Card key={order.id} className="group relative overflow-hidden bg-white/60 backdrop-blur-sm border-white/40 shadow-xl shadow-slate-200/20 hover:shadow-2xl hover:shadow-slate-300/30 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                {/* Order Info */}
                <div className="flex-1 space-y-4">
                  {/* Header Row */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                          {order.customer.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full ${priorityColors[order.priority as keyof typeof priorityColors].split(' ')[0]} border-2 border-white`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-bold text-slate-800">#{order.id}</h3>
                          <Badge className={`${priorityColors[order.priority as keyof typeof priorityColors]} text-xs`}>
                            {priorityLabels[order.priority as keyof typeof priorityLabels]}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600 mt-1">{getRelativeTime(order.date)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-slate-800">₺{order.total.toLocaleString()}</p>
                      <p className="text-sm text-slate-500">{order.items} ürün</p>
                    </div>
                  </div>

                  {/* Customer & Company Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-slate-500" />
                        <div>
                          <p className="font-semibold text-slate-800">{order.customer.name}</p>
                          <p className="text-sm text-slate-600">{order.customer.company}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Mail className="h-3 w-3" />
                        <span>{order.customer.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Phone className="h-3 w-3" />
                        <span>{order.customer.phone}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-slate-500" />
                        <div>
                          <p className="font-semibold text-slate-800">{order.shipping.method}</p>
                          {order.shipping.tracking && (
                            <p className="text-sm text-slate-600">Takip: {order.shipping.tracking}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(order.date)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <CreditCard className="h-3 w-3" />
                        <span>{order.paymentMethod}</span>
                      </div>
                    </div>
                  </div>

                  {/* Products Summary */}
                  <div className="bg-slate-50/50 rounded-lg p-4">
                    <h4 className="font-semibold text-slate-800 mb-2">Sipariş İçeriği</h4>
                    <div className="space-y-1">
                      {order.products.map((product, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span className="text-slate-700">{product.quantity}x {product.name}</span>
                          <span className="font-semibold text-slate-800">₺{(product.quantity * product.price).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-slate-200 mt-2 pt-2 flex justify-between text-sm">
                      <span className="text-slate-600">Ara Toplam:</span>
                      <span className="font-semibold">₺{order.subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">KDV:</span>
                      <span className="font-semibold">₺{order.tax.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Notes */}
                  {order.notes && (
                    <div className="bg-blue-50/50 rounded-lg p-3">
                      <p className="text-sm text-slate-700">
                        <span className="font-semibold">Not:</span> {order.notes}
                      </p>
                    </div>
                  )}
                </div>

                {/* Status & Actions */}
                <div className="lg:w-64 space-y-4">
                  {/* Status Badges */}
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Sipariş Durumu</p>
                      <Badge className={`${statusColors[order.status as keyof typeof statusColors]} border w-full justify-center py-2`}>
                        {statusLabels[order.status as keyof typeof statusLabels]}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Ödeme Durumu</p>
                      <Badge className={`${paymentColors[order.payment as keyof typeof paymentColors]} border w-full justify-center py-2`}>
                        {paymentLabels[order.payment as keyof typeof paymentLabels]}
                      </Badge>
                    </div>
                  </div>

                  {/* Shipping Info */}
                  {order.shipping.estimatedDelivery && (
                    <div className="bg-green-50/50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Truck className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-semibold text-green-700">Tahmini Teslimat</span>
                      </div>
                      <p className="text-sm text-green-600">
                        {formatDate(order.shipping.estimatedDelivery)}
                      </p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full bg-white/60 border-white/40 hover:bg-white/80"
                      asChild
                    >
                      <Link href={`/admin/orders/${order.id}`}>
                        <Eye className="h-4 w-4 mr-2" />
                        Detayları Görüntüle
                      </Link>
                    </Button>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-white/60 border-white/40 hover:bg-white/80"
                      >
                        <Printer className="h-4 w-4 mr-1" />
                        Yazdır
                      </Button>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-white/60 border-white/40 hover:bg-white/80"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white/95 backdrop-blur-sm border-white/40">
                          <DropdownMenuItem>Durumu Güncelle</DropdownMenuItem>
                          <DropdownMenuItem>Fatura Gönder</DropdownMenuItem>
                          <DropdownMenuItem>Kargo Takip</DropdownMenuItem>
                          <DropdownMenuItem>Müşteriyle İletişim</DropdownMenuItem>
                          <DropdownMenuItem>Sipariş Kopyala</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600 focus:text-red-600">
                            İptal Et
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {/* Quick Status Update */}
                    {order.status === 'pending' && (
                      <Button
                        size="sm"
                        className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white"
                      >
                        Siparişi Onayla
                      </Button>
                    )}

                    {order.status === 'processing' && (
                      <Button
                        size="sm"
                        className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white"
                      >
                        Kargoya Ver
                      </Button>
                    )}
                  </div>

                  {/* Order Source */}
                  <div className="text-center">
                    <p className="text-xs text-slate-500">Sipariş Kaynağı</p>
                    <p className="text-sm font-semibold text-slate-700">{order.orderSource}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredOrders.length === 0 && (
        <Card className="bg-white/60 backdrop-blur-sm border-white/40 shadow-xl shadow-slate-200/20">
          <CardContent className="text-center py-16">
            <ShoppingCart className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Sipariş bulunamadı</h3>
            <p className="text-slate-600 mb-6">
              Arama kriterlerinize uygun sipariş bulunmuyor. Filtreleri değiştirmeyi deneyin.
            </p>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={() => {
                setSearchQuery("")
                setStatusFilter(null)
                setPriorityFilter(null)
                setPaymentFilter(null)
              }}>
                Filtreleri Temizle
              </Button>
              <Button className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white">
                <BarChart3 className="h-4 w-4 mr-2" />
                Rapor Görüntüle
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
