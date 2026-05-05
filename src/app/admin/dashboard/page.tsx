"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  Plus,
  Eye,
} from "lucide-react"
import Link from "next/link"

// Mock data
const stats = [
  {
    title: "Toplam Gelir",
    value: "₺124,500",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "Siparişler",
    value: "1,234",
    change: "+8.2%",
    trend: "up",
    icon: ShoppingCart,
  },
  {
    title: "Müşteriler",
    value: "892",
    change: "+15.3%",
    trend: "up",
    icon: Users,
  },
  {
    title: "Ürünler",
    value: "156",
    change: "-2.1%",
    trend: "down",
    icon: Package,
  },
]

const salesData = [
  { name: "Oca", value: 12000 },
  { name: "Şub", value: 19000 },
  { name: "Mar", value: 15000 },
  { name: "Nis", value: 25000 },
  { name: "May", value: 22000 },
  { name: "Haz", value: 30000 },
]

const categoryData = [
  { name: "Deri Kemerler", value: 45, color: "#d4af37" },
  { name: "Ortopedik Tabanlar", value: 30, color: "#8B4513" },
  { name: "Bakım Ürünleri", value: 15, color: "#000080" },
  { name: "Diğer", value: 10, color: "#808080" },
]

const recentOrders = [
  {
    id: "DK12345678",
    customer: "Mehmet Y.",
    amount: 598,
    status: "delivered",
    date: "2 saat önce",
  },
  {
    id: "DK12345677",
    customer: "Ayşe K.",
    amount: 348,
    status: "shipped",
    date: "5 saat önce",
  },
  {
    id: "DK12345676",
    customer: "Can D.",
    amount: 249,
    status: "processing",
    date: "1 gün önce",
  },
]

const statusColors = {
  delivered: "bg-green-500/10 text-green-700",
  shipped: "bg-blue-500/10 text-blue-700",
  processing: "bg-yellow-500/10 text-yellow-700",
}

const statusLabels = {
  delivered: "Teslim Edildi",
  shipped: "Kargoda",
  processing: "Hazırlanıyor",
}

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Hoş geldiniz! İşte bugünün özeti.
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/admin/products/new">
              <Plus className="h-4 w-4 mr-2" />
              Yeni Ürün
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                {stat.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1 text-red-600" />
                )}
                <span className={stat.trend === "up" ? "text-green-600" : "text-red-600"}>
                  {stat.change}
                </span>
                <span className="ml-1">geçen aya göre</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Sales Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Satış Grafiği</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#d4af37"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Kategori Dağılımı</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Son Siparişler</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/orders">
                Tümünü Gör
                <Eye className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/5 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-medium">#{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.customer}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge className={statusColors[order.status as keyof typeof statusColors]}>
                    {statusLabels[order.status as keyof typeof statusLabels]}
                  </Badge>
                  <div className="text-right">
                    <p className="font-semibold">{order.amount}₺</p>
                    <p className="text-sm text-muted-foreground">{order.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Hızlı İşlemler</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Button variant="outline" className="h-auto py-4" asChild>
              <Link href="/admin/products">
                <div className="text-center w-full">
                  <Package className="h-6 w-6 mx-auto mb-2" />
                  <div className="font-semibold">Ürün Yönetimi</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Ürünleri düzenle
                  </div>
                </div>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-4" asChild>
              <Link href="/admin/orders">
                <div className="text-center w-full">
                  <ShoppingCart className="h-6 w-6 mx-auto mb-2" />
                  <div className="font-semibold">Sipariş Yönetimi</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Siparişleri görüntüle
                  </div>
                </div>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-4" asChild>
              <Link href="/admin/customers">
                <div className="text-center w-full">
                  <Users className="h-6 w-6 mx-auto mb-2" />
                  <div className="font-semibold">Müşteri Yönetimi</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Müşterileri yönet
                  </div>
                </div>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
