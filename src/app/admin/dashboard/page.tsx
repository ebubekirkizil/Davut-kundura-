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
  Area,
  AreaChart,
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
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Target,
  Zap,
  Star,
} from "lucide-react"
import Link from "next/link"

// Mock data
const stats = [
  {
    title: "Toplam Gelir",
    subtitle: "Bu Ay",
    value: "₺2,847,650",
    change: "+24.8%",
    trend: "up",
    icon: DollarSign,
    color: "from-emerald-500 to-green-600",
    bgColor: "bg-emerald-500/10",
    textColor: "text-emerald-700",
  },
  {
    title: "Net Kar",
    subtitle: "Kar Marjı",
    value: "₺1,124,890",
    change: "+18.3%",
    trend: "up",
    icon: TrendingUp,
    color: "from-blue-500 to-cyan-600",
    bgColor: "bg-blue-500/10",
    textColor: "text-blue-700",
  },
  {
    title: "Aktif Siparişler",
    subtitle: "Beklemede",
    value: "2,847",
    change: "+12.5%",
    trend: "up",
    icon: ShoppingCart,
    color: "from-purple-500 to-violet-600",
    bgColor: "bg-purple-500/10",
    textColor: "text-purple-700",
  },
  {
    title: "Müşteri Memnuniyeti",
    subtitle: "Ortalama Puan",
    value: "4.8/5.0",
    change: "+0.3",
    trend: "up",
    icon: Star,
    color: "from-amber-500 to-orange-600",
    bgColor: "bg-amber-500/10",
    textColor: "text-amber-700",
  },
  {
    title: "Toplam Müşteri",
    subtitle: "Aktif Hesaplar",
    value: "18,492",
    change: "+15.7%",
    trend: "up",
    icon: Users,
    color: "from-rose-500 to-pink-600",
    bgColor: "bg-rose-500/10",
    textColor: "text-rose-700",
  },
  {
    title: "Stok Değeri",
    subtitle: "Toplam Envanter",
    value: "₺4,892,340",
    change: "+8.9%",
    trend: "up",
    icon: Package,
    color: "from-indigo-500 to-blue-600",
    bgColor: "bg-indigo-500/10",
    textColor: "text-indigo-700",
  },
  {
    title: "Günlük Hedef",
    subtitle: "Tamamlanma",
    value: "87%",
    change: "+5.2%",
    trend: "up",
    icon: Target,
    color: "from-teal-500 to-cyan-600",
    bgColor: "bg-teal-500/10",
    textColor: "text-teal-700",
  },
  {
    title: "Sistem Performansı",
    subtitle: "Uptime",
    value: "99.9%",
    change: "+0.1%",
    trend: "up",
    icon: Activity,
    color: "from-green-500 to-emerald-600",
    bgColor: "bg-green-500/10",
    textColor: "text-green-700",
  },
]

const salesData = [
  { name: "Oca", value: 2400000, orders: 1240, customers: 890 },
  { name: "Şub", value: 2890000, orders: 1580, customers: 1120 },
  { name: "Mar", value: 3200000, orders: 1890, customers: 1340 },
  { name: "Nis", value: 2950000, orders: 1670, customers: 1180 },
  { name: "May", value: 3450000, orders: 2100, customers: 1520 },
  { name: "Haz", value: 3890000, orders: 2340, customers: 1680 },
  { name: "Tem", value: 4200000, orders: 2580, customers: 1890 },
  { name: "Ağu", value: 3950000, orders: 2420, customers: 1750 },
  { name: "Eyl", value: 4350000, orders: 2680, customers: 1920 },
  { name: "Eki", value: 4680000, orders: 2890, customers: 2100 },
  { name: "Kas", value: 4920000, orders: 3120, customers: 2280 },
  { name: "Ara", value: 5200000, orders: 3350, customers: 2450 },
]

const performanceData = [
  { name: "Pazartesi", sales: 450000, target: 400000 },
  { name: "Salı", sales: 520000, target: 450000 },
  { name: "Çarşamba", sales: 480000, target: 420000 },
  { name: "Perşembe", sales: 590000, target: 500000 },
  { name: "Cuma", sales: 680000, target: 600000 },
  { name: "Cumartesi", sales: 720000, target: 650000 },
  { name: "Pazar", sales: 580000, target: 550000 },
]

const categoryData = [
  { name: "Premium Deri Ürünler", value: 45, color: "#d4af37", revenue: 1890000 },
  { name: "Ortopedik Çözümler", value: 30, color: "#8B4513", revenue: 1240000 },
  { name: "Bakım & Aksesuar", value: 15, color: "#2563eb", revenue: 680000 },
  { name: "Kurumsal Satışlar", value: 10, color: "#dc2626", revenue: 450000 },
]

const topProducts = [
  {
    id: "DK-001",
    name: "Premium Deri Kemer - Executive",
    category: "Deri Kemerler",
    sales: 1247,
    revenue: 374100,
    growth: "+23.5%",
    stock: 89,
    image: "/products/belt-executive.jpg"
  },
  {
    id: "DK-002",
    name: "Ortopedik Tabanlık - Pro",
    category: "Ortopedik",
    sales: 892,
    revenue: 267600,
    growth: "+18.2%",
    stock: 156,
    image: "/products/insole-pro.jpg"
  },
  {
    id: "DK-003",
    name: "Deri Bakım Seti - Luxury",
    category: "Bakım",
    sales: 634,
    revenue: 190200,
    growth: "+31.7%",
    stock: 234,
    image: "/products/care-luxury.jpg"
  },
]

const recentOrders = [
  {
    id: "DK24050001",
    customer: "Mehmet Yılmaz",
    company: "ABC Holding A.Ş.",
    amount: 12450,
    status: "delivered",
    date: "15 dakika önce",
    items: 8,
    priority: "high"
  },
  {
    id: "DK24050002",
    customer: "Ayşe Kaya",
    company: "XYZ Tekstil Ltd.",
    amount: 8750,
    status: "shipped",
    date: "2 saat önce",
    items: 5,
    priority: "medium"
  },
  {
    id: "DK24050003",
    customer: "Can Demir",
    company: "DEF İnşaat A.Ş.",
    amount: 15680,
    status: "processing",
    date: "4 saat önce",
    items: 12,
    priority: "high"
  },
  {
    id: "DK24050004",
    customer: "Zeynep Özkan",
    company: "GHI Otomotiv Ltd.",
    amount: 6890,
    status: "confirmed",
    date: "6 saat önce",
    items: 3,
    priority: "low"
  },
]

const statusColors = {
  delivered: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
  shipped: "bg-blue-500/10 text-blue-700 border-blue-200",
  processing: "bg-amber-500/10 text-amber-700 border-amber-200",
  confirmed: "bg-purple-500/10 text-purple-700 border-purple-200",
}

const statusLabels = {
  delivered: "Teslim Edildi",
  shipped: "Kargoda",
  processing: "Hazırlanıyor",
  confirmed: "Onaylandı",
}

const priorityColors = {
  high: "bg-red-500/10 text-red-700",
  medium: "bg-yellow-500/10 text-yellow-700",
  low: "bg-green-500/10 text-green-700",
}

const priorityLabels = {
  high: "Yüksek",
  medium: "Orta",
  low: "Düşük",
}

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-serif font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent">
            Enterprise Dashboard
          </h1>
          <p className="text-slate-600 mt-2 text-lg">
            Hoş geldiniz! İşletmenizin gerçek zamanlı performans özeti.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="bg-white/60 backdrop-blur-sm border-white/40 hover:bg-white/80">
            <Activity className="h-4 w-4 mr-2" />
            Canlı Rapor
          </Button>
          <Button className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white shadow-lg shadow-amber-500/25" asChild>
            <Link href="/admin/products/new">
              <Plus className="h-4 w-4 mr-2" />
              Yeni Ürün Ekle
            </Link>
          </Button>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={stat.title} className="relative overflow-hidden bg-white/60 backdrop-blur-sm border-white/40 shadow-xl shadow-slate-200/20 hover:shadow-2xl hover:shadow-slate-300/30 transition-all duration-300 group">
            {/* Gradient Background */}
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
                {stat.trend === "up" ? (
                  <ArrowUpRight className="h-4 w-4 mr-1 text-emerald-600" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 mr-1 text-red-600" />
                )}
                <span className={`font-semibold ${stat.trend === "up" ? "text-emerald-600" : "text-red-600"}`}>
                  {stat.change}
                </span>
                <span className="ml-2 text-slate-500">geçen aya göre</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enhanced Charts Section */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Revenue Analytics */}
        <Card className="lg:col-span-2 bg-white/60 backdrop-blur-sm border-white/40 shadow-xl shadow-slate-200/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-semibold text-slate-800">Gelir Analitikleri</CardTitle>
                <p className="text-sm text-slate-600 mt-1">Aylık performans trendi</p>
              </div>
              <Badge className="bg-emerald-500/10 text-emerald-700 border-emerald-200">
                +24.8% Büyüme
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d4af37" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#d4af37" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" tickFormatter={(value) => `₺${(value / 1000000).toFixed(1)}M`} />
                <Tooltip
                  formatter={(value: any) => [`₺${value.toLocaleString()}`, 'Gelir']}
                  labelStyle={{ color: '#1e293b' }}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#d4af37"
                  strokeWidth={3}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Performance */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/40 shadow-xl shadow-slate-200/20">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-slate-800">Kategori Performansı</CardTitle>
            <p className="text-sm text-slate-600">Gelir dağılımı</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  strokeWidth={2}
                  stroke="#ffffff"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: any, name: any, props: any) => [
                    `₺${props.payload.revenue.toLocaleString()}`,
                    'Gelir'
                  ]}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {categoryData.map((category, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                    <span className="text-slate-700">{category.name}</span>
                  </div>
                  <span className="font-semibold text-slate-800">₺{category.revenue.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Performance */}
      <Card className="bg-white/60 backdrop-blur-sm border-white/40 shadow-xl shadow-slate-200/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold text-slate-800">Haftalık Performans</CardTitle>
              <p className="text-sm text-slate-600 mt-1">Satış vs Hedef karşılaştırması</p>
            </div>
            <Badge className="bg-blue-500/10 text-blue-700 border-blue-200">
              Bu Hafta
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" tickFormatter={(value) => `₺${(value / 1000).toFixed(0)}K`} />
              <Tooltip
                formatter={(value: any, name: any) => [
                  `₺${value.toLocaleString()}`,
                  name === 'sales' ? 'Gerçekleşen' : 'Hedef'
                ]}
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px'
                }}
              />
              <Bar dataKey="target" fill="#e2e8f0" radius={[4, 4, 0, 0]} />
              <Bar dataKey="sales" fill="#d4af37" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Products & Recent Orders */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top Products */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/40 shadow-xl shadow-slate-200/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-semibold text-slate-800">En Çok Satan Ürünler</CardTitle>
                <p className="text-sm text-slate-600 mt-1">Bu ayki performans liderleri</p>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/products">
                  <Eye className="h-4 w-4 mr-2" />
                  Tümü
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-white/50 to-white/30 border border-white/40 hover:from-white/70 hover:to-white/50 transition-all duration-200"
                >
                  <div className="relative">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                      <Package className="h-6 w-6 text-slate-600" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-xs font-bold text-white">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-slate-800 truncate">{product.name}</h4>
                    <p className="text-sm text-slate-600">{product.category}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-xs text-slate-500">{product.sales} satış</span>
                      <Badge className="bg-emerald-500/10 text-emerald-700 text-xs">
                        {product.growth}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-slate-800">₺{product.revenue.toLocaleString()}</p>
                    <p className="text-xs text-slate-500">Stok: {product.stock}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/40 shadow-xl shadow-slate-200/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-semibold text-slate-800">Son Siparişler</CardTitle>
                <p className="text-sm text-slate-600 mt-1">Gerçek zamanlı sipariş takibi</p>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/orders">
                  <Eye className="h-4 w-4 mr-2" />
                  Tümü
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-white/50 to-white/30 border border-white/40 hover:from-white/70 hover:to-white/50 transition-all duration-200 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                        {order.customer.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${priorityColors[order.priority as keyof typeof priorityColors].split(' ')[0]} border-2 border-white`} />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">#{order.id}</p>
                      <p className="text-sm text-slate-600">{order.customer}</p>
                      <p className="text-xs text-slate-500">{order.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <Badge className={`${statusColors[order.status as keyof typeof statusColors]} border`}>
                        {statusLabels[order.status as keyof typeof statusLabels]}
                      </Badge>
                      <p className="text-xs text-slate-500 mt-1">{order.items} ürün</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-slate-800">₺{order.amount.toLocaleString()}</p>
                      <p className="text-xs text-slate-500">{order.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Quick Actions */}
      <Card className="bg-white/60 backdrop-blur-sm border-white/40 shadow-xl shadow-slate-200/20">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-slate-800">Hızlı İşlemler</CardTitle>
          <p className="text-sm text-slate-600">Sık kullanılan yönetim araçları</p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button
              variant="outline"
              className="h-auto py-6 bg-gradient-to-br from-white/60 to-white/40 border-white/40 hover:from-white/80 hover:to-white/60 shadow-lg hover:shadow-xl transition-all duration-200 group"
              asChild
            >
              <Link href="/admin/products">
                <div className="text-center w-full">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Package className="h-6 w-6 text-white" />
                  </div>
                  <div className="font-semibold text-slate-800">Ürün Yönetimi</div>
                  <div className="text-xs text-slate-600 mt-1">Stok ve katalog işlemleri</div>
                </div>
              </Link>
            </Button>

            <Button
              variant="outline"
              className="h-auto py-6 bg-gradient-to-br from-white/60 to-white/40 border-white/40 hover:from-white/80 hover:to-white/60 shadow-lg hover:shadow-xl transition-all duration-200 group"
              asChild
            >
              <Link href="/admin/orders">
                <div className="text-center w-full">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ShoppingCart className="h-6 w-6 text-white" />
                  </div>
                  <div className="font-semibold text-slate-800">Sipariş Yönetimi</div>
                  <div className="text-xs text-slate-600 mt-1">Sipariş takip ve işleme</div>
                </div>
              </Link>
            </Button>

            <Button
              variant="outline"
              className="h-auto py-6 bg-gradient-to-br from-white/60 to-white/40 border-white/40 hover:from-white/80 hover:to-white/60 shadow-lg hover:shadow-xl transition-all duration-200 group"
              asChild
            >
              <Link href="/admin/customers">
                <div className="text-center w-full">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div className="font-semibold text-slate-800">Müşteri Yönetimi</div>
                  <div className="text-xs text-slate-600 mt-1">CRM ve müşteri ilişkileri</div>
                </div>
              </Link>
            </Button>

            <Button
              variant="outline"
              className="h-auto py-6 bg-gradient-to-br from-white/60 to-white/40 border-white/40 hover:from-white/80 hover:to-white/60 shadow-lg hover:shadow-xl transition-all duration-200 group"
              asChild
            >
              <Link href="/admin/finance">
                <div className="text-center w-full">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <DollarSign className="h-6 w-6 text-white" />
                  </div>
                  <div className="font-semibold text-slate-800">Finansal Yönetim</div>
                  <div className="text-xs text-slate-600 mt-1">Gelir, gider ve raporlar</div>
                </div>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
