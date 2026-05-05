"use client"

import * as React from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShoppingBag,
  TrendingUp,
  MoreVertical,
  Eye,
  Star,
} from "lucide-react"

// Mock customer data
const customerData = {
  id: "1",
  name: "Mehmet Yılmaz",
  email: "mehmet@example.com",
  phone: "+90 532 123 4567",
  location: "İstanbul, Kadıköy",
  address: "Atatürk Caddesi No:123 Daire:4, Kadıköy, İstanbul 34710",
  totalOrders: 12,
  totalSpent: 4580,
  averageOrder: 382,
  lastOrder: "2026-05-05T10:30:00",
  joinDate: "2025-08-15",
  segment: "vip",
  status: "active",
  orders: [
    {
      id: "DK12345678",
      date: "2026-05-05T10:30:00",
      status: "delivered",
      total: 598,
      items: 2,
    },
    {
      id: "DK12345670",
      date: "2026-04-28T14:20:00",
      status: "delivered",
      total: 450,
      items: 3,
    },
    {
      id: "DK12345665",
      date: "2026-04-15T09:15:00",
      status: "delivered",
      total: 348,
      items: 2,
    },
    {
      id: "DK12345660",
      date: "2026-03-30T16:45:00",
      status: "delivered",
      total: 520,
      items: 4,
    },
  ],
  monthlySpending: [
    { month: "Oca", amount: 320 },
    { month: "Şub", amount: 450 },
    { month: "Mar", amount: 520 },
    { month: "Nis", amount: 798 },
    { month: "May", amount: 598 },
  ],
  favoriteCategories: [
    { name: "Deri Kemerler", count: 8, amount: 2390 },
    { name: "Ortopedik Tabanlar", count: 6, amount: 890 },
    { name: "Bakım Ürünleri", count: 4, amount: 800 },
  ],
}

const segmentColors = {
  vip: "bg-purple-500/10 text-purple-700",
  regular: "bg-blue-500/10 text-blue-700",
  new: "bg-green-500/10 text-green-700",
  "at-risk": "bg-orange-500/10 text-orange-700",
}

const segmentLabels = {
  vip: "VIP",
  regular: "Düzenli",
  new: "Yeni",
  "at-risk": "Risk Altında",
}

const statusColors = {
  delivered: "bg-green-500/10 text-green-700",
  shipped: "bg-blue-500/10 text-blue-700",
  processing: "bg-yellow-500/10 text-yellow-700",
  pending: "bg-orange-500/10 text-orange-700",
  cancelled: "bg-red-500/10 text-red-700",
}

const statusLabels = {
  delivered: "Teslim Edildi",
  shipped: "Kargoda",
  processing: "Hazırlanıyor",
  pending: "Beklemede",
  cancelled: "İptal Edildi",
}

export default function AdminCustomerDetailPage() {
  const params = useParams()
  const customerId = params.id

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date)
  }

  const formatShortDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('tr-TR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date)
  }

  const lifetimeValue = customerData.totalSpent
  const avgOrderValue = customerData.averageOrder
  const orderFrequency = (customerData.totalOrders / 9).toFixed(1) // 9 months since join

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/customers">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-serif font-bold">{customerData.name}</h1>
            <p className="text-muted-foreground mt-1">
              Müşteri #{customerId}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Mail className="h-4 w-4 mr-2" />
            Email Gönder
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <MoreVertical className="h-4 w-4 mr-2" />
                İşlemler
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Segment Değiştir</DropdownMenuItem>
              <DropdownMenuItem>Notlar Ekle</DropdownMenuItem>
              <DropdownMenuItem>İndirim Kodu Gönder</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                Müşteriyi Sil
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Yaşam Boyu Değer</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₺{lifetimeValue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {customerData.totalOrders} siparişten
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ort. Sipariş Değeri</CardTitle>
                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₺{avgOrderValue}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Sipariş başına
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sipariş Sıklığı</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{orderFrequency}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Sipariş/ay
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Spending Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Aylık Harcama Trendi</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={customerData.monthlySpending}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#d4af37"
                    strokeWidth={2}
                    name="Harcama (₺)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Favorite Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Favori Kategoriler</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={customerData.favoriteCategories}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="amount" fill="#d4af37" name="Harcama (₺)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Order History */}
          <Card>
            <CardHeader>
              <CardTitle>Sipariş Geçmişi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customerData.orders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/5 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="font-medium">#{order.id}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatShortDate(order.date)} • {order.items} ürün
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge className={statusColors[order.status as keyof typeof statusColors]}>
                        {statusLabels[order.status as keyof typeof statusLabels]}
                      </Badge>
                      <div className="text-right">
                        <p className="font-semibold">{order.total}₺</p>
                      </div>
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/admin/orders/${order.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer Info */}
          <Card>
            <CardHeader>
              <CardTitle>Müşteri Bilgileri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Segment</label>
                <Badge className={segmentColors[customerData.segment as keyof typeof segmentColors]}>
                  {segmentLabels[customerData.segment as keyof typeof segmentLabels]}
                </Badge>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Üyelik Tarihi</label>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(customerData.joinDate)}</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Son Sipariş</label>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ShoppingBag className="h-4 w-4" />
                  <span>{formatDate(customerData.lastOrder)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle>İletişim Bilgileri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{customerData.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{customerData.phone}</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <span>{customerData.address}</span>
              </div>
            </CardContent>
          </Card>

          {/* Category Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Kategori Dağılımı</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customerData.favoriteCategories.map((category) => (
                  <div key={category.name} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{category.name}</span>
                      <span className="text-muted-foreground">{category.count} sipariş</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-accent h-2 rounded-full"
                        style={{
                          width: `${(category.amount / customerData.totalSpent) * 100}%`,
                        }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      ₺{category.amount.toLocaleString()} toplam harcama
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
