"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
  AreaChart,
  Area,
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
  DollarSign,
  ShoppingCart,
  Users,
  Eye,
  Calendar,
  Download,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"

// Mock analytics data
const stats = [
  {
    title: "Toplam Gelir",
    value: "₺324,500",
    change: "+18.2%",
    trend: "up",
    icon: DollarSign,
    color: "text-green-600",
  },
  {
    title: "Toplam Sipariş",
    value: "1,234",
    change: "+12.5%",
    trend: "up",
    icon: ShoppingCart,
    color: "text-blue-600",
  },
  {
    title: "Yeni Müşteri",
    value: "156",
    change: "+24.8%",
    trend: "up",
    icon: Users,
    color: "text-purple-600",
  },
  {
    title: "Dönüşüm Oranı",
    value: "%3.8",
    change: "+0.5%",
    trend: "up",
    icon: TrendingUp,
    color: "text-orange-600",
  },
]

const revenueData = [
  { date: "1 May", revenue: 12500, orders: 45, visitors: 1200 },
  { date: "2 May", revenue: 15200, orders: 52, visitors: 1350 },
  { date: "3 May", revenue: 13800, orders: 48, visitors: 1180 },
  { date: "4 May", revenue: 18900, orders: 65, visitors: 1520 },
  { date: "5 May", revenue: 16400, orders: 58, visitors: 1420 },
]

const categoryPerformance = [
  { category: "Deri Kemerler", revenue: 145000, orders: 520, avgOrder: 279 },
  { category: "Ortopedik Tabanlar", revenue: 98000, orders: 680, avgOrder: 144 },
  { category: "Bakım Ürünleri", revenue: 52000, orders: 280, avgOrder: 186 },
  { category: "Valiz Parçaları", revenue: 29500, orders: 145, avgOrder: 203 },
]

const trafficSources = [
  { name: "Organik Arama", value: 45, color: "#10b981" },
  { name: "Direkt", value: 25, color: "#3b82f6" },
  { name: "Sosyal Medya", value: 18, color: "#8b5cf6" },
  { name: "Email", value: 8, color: "#f59e0b" },
  { name: "Diğer", value: 4, color: "#6b7280" },
]

const conversionFunnel = [
  { stage: "Ziyaretçi", count: 15420, percentage: 100 },
  { stage: "Ürün Görüntüleme", count: 8250, percentage: 53.5 },
  { stage: "Sepete Ekleme", count: 2180, percentage: 14.1 },
  { stage: "Ödeme Başlatma", count: 890, percentage: 5.8 },
  { stage: "Sipariş Tamamlama", count: 586, percentage: 3.8 },
]

const topProducts = [
  {
    name: "Premium Deri Kemer - Klasik Siyah",
    revenue: 35800,
    units: 120,
    views: 2450,
    conversion: 4.9,
  },
  {
    name: "Ortopedik Taban - Comfort Plus",
    revenue: 28600,
    units: 192,
    views: 3120,
    conversion: 6.2,
  },
  {
    name: "Ayakkabı Bakım Seti - Premium",
    revenue: 19900,
    units: 100,
    views: 1850,
    conversion: 5.4,
  },
  {
    name: "Deri Kemer - Kahverengi Vintage",
    revenue: 17450,
    units: 50,
    views: 1620,
    conversion: 3.1,
  },
]

const customerMetrics = [
  { metric: "Yeni Müşteri", value: 156, change: "+24.8%" },
  { metric: "Tekrar Eden Müşteri", value: 428, change: "+12.3%" },
  { metric: "Müşteri Elde Tutma", value: "%73.5", change: "+5.2%" },
  { metric: "Ortalama Yaşam Boyu Değer", value: "₺2,840", change: "+18.7%" },
]

export default function AdminAnalyticsPage() {
  const [dateRange, setDateRange] = React.useState("last-7-days")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold">Analitik & Raporlar</h1>
          <p className="text-muted-foreground mt-1">
            Satış performansı ve müşteri davranışları
          </p>
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Son 7 Gün
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setDateRange("today")}>
                Bugün
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDateRange("yesterday")}>
                Dün
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDateRange("last-7-days")}>
                Son 7 Gün
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDateRange("last-30-days")}>
                Son 30 Gün
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDateRange("this-month")}>
                Bu Ay
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDateRange("last-month")}>
                Geçen Ay
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Rapor İndir
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
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
                <span className="ml-1">önceki döneme göre</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue & Orders Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Gelir & Sipariş Trendi</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="revenue"
                stroke="#d4af37"
                fill="#d4af37"
                fillOpacity={0.3}
                name="Gelir (₺)"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="orders"
                stroke="#3b82f6"
                strokeWidth={2}
                name="Sipariş"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Category Performance & Traffic Sources */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Category Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Kategori Performansı</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryPerformance} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="category" type="category" width={120} />
                <Tooltip />
                <Bar dataKey="revenue" fill="#d4af37" name="Gelir (₺)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Traffic Sources */}
        <Card>
          <CardHeader>
            <CardTitle>Trafik Kaynakları</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={trafficSources}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {trafficSources.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Conversion Funnel */}
      <Card>
        <CardHeader>
          <CardTitle>Dönüşüm Hunisi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {conversionFunnel.map((stage, index) => (
              <div key={stage.stage} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{stage.stage}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">
                      {stage.count.toLocaleString()} kişi
                    </span>
                    <span className="text-sm font-semibold">%{stage.percentage}</span>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div
                    className="bg-accent h-3 rounded-full transition-all"
                    style={{ width: `${stage.percentage}%` }}
                  />
                </div>
                {index < conversionFunnel.length - 1 && (
                  <p className="text-xs text-muted-foreground">
                    Kayıp: {(conversionFunnel[index].count - conversionFunnel[index + 1].count).toLocaleString()} kişi
                  </p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Products & Customer Metrics */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>En Çok Satan Ürünler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm mb-2">{product.name}</p>
                    <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        <span>₺{product.revenue.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ShoppingCart className="h-3 w-3" />
                        <span>{product.units} adet</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        <span>{product.views} görüntüleme</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        <span>%{product.conversion} dönüşüm</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Customer Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Müşteri Metrikleri</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {customerMetrics.map((metric) => (
                <div key={metric.metric} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{metric.metric}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold">{metric.value}</span>
                      <span className="text-xs text-green-600 flex items-center">
                        <ArrowUpRight className="h-3 w-3" />
                        {metric.change}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t">
              <h4 className="font-semibold mb-4">Müşteri Segmentasyonu</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">VIP Müşteriler</span>
                  <span className="font-semibold">89 (%15.2)</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Düzenli Müşteriler</span>
                  <span className="font-semibold">312 (%53.4)</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Yeni Müşteriler</span>
                  <span className="font-semibold">156 (%26.7)</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Risk Altında</span>
                  <span className="font-semibold">27 (%4.6)</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Details Table */}
      <Card>
        <CardHeader>
          <CardTitle>Kategori Detayları</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="text-left p-4 font-semibold">Kategori</th>
                  <th className="text-right p-4 font-semibold">Gelir</th>
                  <th className="text-right p-4 font-semibold">Sipariş</th>
                  <th className="text-right p-4 font-semibold">Ort. Sipariş</th>
                  <th className="text-right p-4 font-semibold">Pay</th>
                </tr>
              </thead>
              <tbody>
                {categoryPerformance.map((category) => {
                  const totalRevenue = categoryPerformance.reduce((sum, c) => sum + c.revenue, 0)
                  const share = ((category.revenue / totalRevenue) * 100).toFixed(1)
                  return (
                    <tr key={category.category} className="border-b hover:bg-muted/50 transition-colors">
                      <td className="p-4 font-medium">{category.category}</td>
                      <td className="p-4 text-right font-semibold text-green-600">
                        ₺{category.revenue.toLocaleString()}
                      </td>
                      <td className="p-4 text-right">{category.orders}</td>
                      <td className="p-4 text-right">₺{category.avgOrder}</td>
                      <td className="p-4 text-right">
                        <span className="text-sm font-semibold">%{share}</span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
