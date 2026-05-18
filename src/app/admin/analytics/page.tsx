"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
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
  ComposedChart,
  ScatterChart,
  Scatter,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  FunnelChart,
  Funnel,
  LabelList
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
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Target,
  Zap,
  Brain,
  Filter,
  Search,
  RefreshCw,
  Globe,
  Clock,
  Star,
  Award,
  Layers,
  Database,
  Cpu,
  Network,
  AlertTriangle,
  CheckCircle,
  Plus,
  Settings,
  Share,
  Bookmark,
  Bell,
  Gauge,
  Percent,
  MousePointer,
  ShoppingBag,
  CreditCard,
  Smartphone,
  Monitor,
  Tablet
} from "lucide-react"

// Mock advanced analytics data - Enterprise Level
const analyticsStats = [
  {
    title: "Toplam Gelir",
    subtitle: "Tüm Kanallar",
    value: "₺8,450,000",
    change: "+18.2%",
    trend: "up",
    icon: DollarSign,
    color: "from-emerald-500 to-green-600",
    target: "₺9,000,000",
    progress: 93.9,
    forecast: "+₺1,250,000"
  },
  {
    title: "Aktif Müşteriler",
    subtitle: "30 Gün İçinde",
    value: "12,847",
    change: "+24.8%",
    trend: "up",
    icon: Users,
    color: "from-blue-500 to-cyan-600",
    target: "15,000",
    progress: 85.6,
    forecast: "+3,200"
  },
  {
    title: "Dönüşüm Oranı",
    subtitle: "Genel Ortalama",
    value: "4.8%",
    change: "+0.9%",
    trend: "up",
    icon: Target,
    color: "from-purple-500 to-violet-600",
    target: "5.5%",
    progress: 87.3,
    forecast: "+1.2%"
  },
  {
    title: "Ortalama Sipariş Değeri",
    subtitle: "AOV",
    value: "₺658",
    change: "+12.5%",
    trend: "up",
    icon: ShoppingCart,
    color: "from-amber-500 to-orange-600",
    target: "₺750",
    progress: 87.7,
    forecast: "+₺95"
  },
  {
    title: "Müşteri Yaşam Boyu Değeri",
    subtitle: "CLV",
    value: "₺2,840",
    change: "+18.7%",
    trend: "up",
    icon: Award,
    color: "from-rose-500 to-pink-600",
    target: "₺3,200",
    progress: 88.8,
    forecast: "+₺480"
  },
  {
    title: "Müşteri Elde Tutma",
    subtitle: "Retention Rate",
    value: "89.3%",
    change: "+5.2%",
    trend: "up",
    icon: CheckCircle,
    color: "from-teal-500 to-cyan-600",
    target: "92%",
    progress: 97.1,
    forecast: "+3.5%"
  },
  {
    title: "Organik Trafik Büyümesi",
    subtitle: "SEO Performance",
    value: "156%",
    change: "+34.2%",
    trend: "up",
    icon: TrendingUp,
    color: "from-indigo-500 to-blue-600",
    target: "180%",
    progress: 86.7,
    forecast: "+45%"
  },
  {
    title: "Mobil Dönüşüm",
    subtitle: "Mobile CVR",
    value: "3.2%",
    change: "+0.8%",
    trend: "up",
    icon: Smartphone,
    color: "from-violet-500 to-purple-600",
    target: "4.0%",
    progress: 80.0,
    forecast: "+1.1%"
  }
]

const revenueAnalytics = [
  {
    month: "Oca",
    revenue: 1420000,
    forecast: 1380000,
    orders: 2450,
    aov: 580,
    newCustomers: 890,
    returningCustomers: 1560,
    organicRevenue: 852000,
    paidRevenue: 568000
  },
  {
    month: "Şub",
    revenue: 1580000,
    forecast: 1520000,
    orders: 2680,
    aov: 590,
    newCustomers: 1020,
    returningCustomers: 1660,
    organicRevenue: 948000,
    paidRevenue: 632000
  },
  {
    month: "Mar",
    revenue: 1750000,
    forecast: 1680000,
    orders: 2890,
    aov: 605,
    newCustomers: 1180,
    returningCustomers: 1710,
    organicRevenue: 1050000,
    paidRevenue: 700000
  },
  {
    month: "Nis",
    revenue: 1920000,
    forecast: 1850000,
    orders: 3120,
    aov: 615,
    newCustomers: 1340,
    returningCustomers: 1780,
    organicRevenue: 1152000,
    paidRevenue: 768000
  },
  {
    month: "May",
    revenue: 2100000,
    forecast: 2020000,
    orders: 3380,
    aov: 621,
    newCustomers: 1520,
    returningCustomers: 1860,
    organicRevenue: 1260000,
    paidRevenue: 840000
  },
  {
    month: "Haz",
    revenue: 0,
    forecast: 2280000,
    orders: 0,
    aov: 0,
    newCustomers: 0,
    returningCustomers: 0,
    organicRevenue: 0,
    paidRevenue: 0
  }
]

const customerSegmentation = [
  {
    segment: "VIP Müşteriler",
    count: 1247,
    percentage: 9.7,
    revenue: 3420000,
    aov: 2744,
    frequency: 8.2,
    retention: 96.8,
    color: "#d4af37",
    growth: "+15.3%"
  },
  {
    segment: "Sadık Müşteriler",
    count: 4892,
    percentage: 38.1,
    revenue: 3890000,
    aov: 795,
    frequency: 4.9,
    retention: 89.4,
    color: "#3b82f6",
    growth: "+12.7%"
  },
  {
    segment: "Düzenli Müşteriler",
    count: 4156,
    percentage: 32.4,
    revenue: 1140000,
    aov: 274,
    frequency: 2.1,
    retention: 67.2,
    color: "#10b981",
    growth: "+8.9%"
  },
  {
    segment: "Yeni Müşteriler",
    count: 2552,
    percentage: 19.8,
    revenue: 0,
    aov: 0,
    frequency: 1.0,
    retention: 0,
    color: "#f59e0b",
    growth: "+24.8%"
  }
]

const channelPerformance = [
  {
    channel: "Organik Arama",
    sessions: 45680,
    revenue: 3420000,
    conversion: 4.8,
    cac: 0,
    roas: 0,
    share: 40.5,
    growth: "+34.2%"
  },
  {
    channel: "Direkt Trafik",
    sessions: 28450,
    revenue: 2180000,
    conversion: 7.7,
    cac: 0,
    roas: 0,
    share: 25.8,
    growth: "+18.9%"
  },
  {
    channel: "Sosyal Medya",
    sessions: 18920,
    revenue: 1560000,
    conversion: 8.2,
    cac: 45,
    roas: 12.4,
    share: 18.5,
    growth: "+28.7%"
  },
  {
    channel: "Email Marketing",
    sessions: 12340,
    revenue: 980000,
    conversion: 12.8,
    cac: 12,
    roas: 24.8,
    share: 11.6,
    growth: "+15.4%"
  },
  {
    channel: "Paid Search",
    sessions: 8760,
    revenue: 310000,
    conversion: 3.5,
    cac: 78,
    roas: 4.2,
    share: 3.6,
    growth: "+6.8%"
  }
]

const deviceAnalytics = [
  { device: "Desktop", sessions: 52340, revenue: 4890000, conversion: 5.8, avgSession: "4:32" },
  { device: "Mobile", sessions: 38920, revenue: 2840000, conversion: 3.2, avgSession: "2:18" },
  { device: "Tablet", sessions: 22890, revenue: 720000, conversion: 2.9, avgSession: "3:45" }
]

const cohortAnalysis = [
  { cohort: "Oca 2026", month0: 100, month1: 68, month2: 45, month3: 32, month4: 24, month5: 19 },
  { cohort: "Şub 2026", month0: 100, month1: 72, month2: 48, month3: 35, month4: 27, month5: 0 },
  { cohort: "Mar 2026", month0: 100, month1: 75, month2: 52, month3: 38, month4: 0, month5: 0 },
  { cohort: "Nis 2026", month0: 100, month1: 78, month2: 55, month3: 0, month4: 0, month5: 0 },
  { cohort: "May 2026", month0: 100, month1: 81, month2: 0, month3: 0, month4: 0, month5: 0 }
]

const productPerformance = [
  {
    category: "Deri Kemerler",
    revenue: 3450000,
    units: 12450,
    margin: 68.5,
    growth: "+18.2%",
    inventory: 2847,
    rating: 4.8,
    returns: 2.1
  },
  {
    category: "Ortopedik Ürünler",
    revenue: 2890000,
    units: 18920,
    margin: 72.3,
    growth: "+24.7%",
    inventory: 4156,
    rating: 4.9,
    returns: 1.8
  },
  {
    category: "Bakım Ürünleri",
    revenue: 1240000,
    units: 8760,
    margin: 78.9,
    growth: "+15.4%",
    inventory: 1892,
    rating: 4.7,
    returns: 3.2
  },
  {
    category: "Kurumsal Setler",
    revenue: 870000,
    units: 2340,
    margin: 65.2,
    growth: "+12.8%",
    inventory: 456,
    rating: 4.8,
    returns: 1.5
  }
]

const conversionFunnel = [
  { stage: "Ziyaretçiler", count: 114560, percentage: 100, dropRate: 0 },
  { stage: "Ürün Görüntüleme", count: 68740, percentage: 60.0, dropRate: 40.0 },
  { stage: "Kategori Keşfi", count: 45890, percentage: 40.1, dropRate: 33.2 },
  { stage: "Sepete Ekleme", count: 18920, percentage: 16.5, dropRate: 58.8 },
  { stage: "Ödeme Başlatma", count: 8760, percentage: 7.6, dropRate: 53.7 },
  { stage: "Sipariş Tamamlama", count: 5498, percentage: 4.8, dropRate: 37.2 }
]

const predictiveMetrics = [
  {
    metric: "Gelir Tahmini (30 Gün)",
    current: 2100000,
    predicted: 2450000,
    confidence: 87,
    trend: "up",
    factors: ["Sezonallik", "Trend", "Promosyonlar"]
  },
  {
    metric: "Müşteri Churn Riski",
    current: 12.3,
    predicted: 9.8,
    confidence: 92,
    trend: "down",
    factors: ["Engagement", "Satın Alma", "Destek"]
  },
  {
    metric: "Stok Tükenmesi",
    current: 23,
    predicted: 18,
    confidence: 94,
    trend: "down",
    factors: ["Satış Hızı", "Mevsim", "Tedarik"]
  }
]

export default function AdminAnalyticsPage() {
  const [dateRange, setDateRange] = React.useState("last-30-days")
  const [selectedSegment, setSelectedSegment] = React.useState("all")
  const [selectedChannel, setSelectedChannel] = React.useState("all")
  const [searchQuery, setSearchQuery] = React.useState("")

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`
  }

  return (
    <div className="space-y-8 text-slate-800 dark:text-slate-100 font-sans pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-serif font-black bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
            Analiz & İş Zekası
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1.5 text-sm sm:text-base font-medium">
            Gelişmiş veri analizi, tahmine dayalı modelleme ve performans izleme
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <Button variant="outline" className="h-10 px-4 rounded-xl bg-white/60 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 text-slate-800 dark:text-slate-200 font-bold transition-all shadow-sm">
            <Brain className="h-4 w-4 mr-2 text-indigo-500" />
            AI İçgörüler
          </Button>
          <Button variant="outline" className="h-10 px-4 rounded-xl bg-white/60 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 text-slate-800 dark:text-slate-200 font-bold transition-all shadow-sm">
            <Share className="h-4 w-4 mr-2 text-blue-500" />
            Paylaş
          </Button>
          <Button className="h-10 px-5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-lg shadow-amber-500/25 font-bold border-0">
            <Download className="h-4 w-4 mr-2" />
            Rapor İndir
          </Button>
        </div>
      </div>

      {/* Advanced Filters */}
      <Card className="bg-white/70 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/80 dark:border-white/5 shadow-lg shadow-slate-200/20 dark:shadow-black/40 rounded-3xl overflow-hidden">
        <CardContent className="p-5">
          <div className="flex flex-col lg:flex-row gap-3">
            {/* Date Range */}
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-full lg:w-48 bg-white/60 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 rounded-xl h-10">
                <Calendar className="h-4 w-4 mr-2 text-amber-500" />
                <SelectValue placeholder="Tarih Aralığı" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl">
                <SelectItem value="today">Bugün</SelectItem>
                <SelectItem value="yesterday">Dün</SelectItem>
                <SelectItem value="last-7-days">Son 7 Gün</SelectItem>
                <SelectItem value="last-30-days">Son 30 Gün</SelectItem>
                <SelectItem value="this-month">Bu Ay</SelectItem>
                <SelectItem value="last-month">Geçen Ay</SelectItem>
                <SelectItem value="this-quarter">Bu Çeyrek</SelectItem>
                <SelectItem value="this-year">Bu Yıl</SelectItem>
              </SelectContent>
            </Select>

            {/* Customer Segment */}
            <Select value={selectedSegment} onValueChange={setSelectedSegment}>
              <SelectTrigger className="w-full lg:w-48 bg-white/60 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 rounded-xl h-10">
                <Users className="h-4 w-4 mr-2 text-blue-500" />
                <SelectValue placeholder="Müşteri Segmenti" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl">
                <SelectItem value="all">Tüm Segmentler</SelectItem>
                <SelectItem value="vip">VIP Müşteriler</SelectItem>
                <SelectItem value="loyal">Sadık Müşteriler</SelectItem>
                <SelectItem value="regular">Düzenli Müşteriler</SelectItem>
                <SelectItem value="new">Yeni Müşteriler</SelectItem>
              </SelectContent>
            </Select>

            {/* Channel */}
            <Select value={selectedChannel} onValueChange={setSelectedChannel}>
              <SelectTrigger className="w-full lg:w-48 bg-white/60 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 rounded-xl h-10">
                <Globe className="h-4 w-4 mr-2 text-emerald-500" />
                <SelectValue placeholder="Kanal" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl">
                <SelectItem value="all">Tüm Kanallar</SelectItem>
                <SelectItem value="organic">Organik Arama</SelectItem>
                <SelectItem value="direct">Direkt Trafik</SelectItem>
                <SelectItem value="social">Sosyal Medya</SelectItem>
                <SelectItem value="email">Email Marketing</SelectItem>
                <SelectItem value="paid">Paid Search</SelectItem>
              </SelectContent>
            </Select>

            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Metrik, ürün veya segment ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/60 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 focus:bg-white/80 dark:focus:bg-slate-900/80 transition-all rounded-xl h-10"
              />
            </div>

            <Button variant="outline" className="h-10 px-4 rounded-xl bg-white/60 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 text-slate-800 dark:text-slate-200 font-bold transition-all shadow-sm">
              <RefreshCw className="h-4 w-4 mr-2 text-slate-500" />
              Yenile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Stats Grid */}
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
        {analyticsStats.map((stat, index) => (
          <Card key={stat.title} className="relative overflow-hidden bg-white/70 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/80 dark:border-white/5 shadow-lg shadow-slate-200/20 dark:shadow-black/40 hover:shadow-2xl hover:shadow-slate-300/30 transition-all duration-300 group rounded-3xl">
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity`} />

            <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-3">
              <div>
                <CardTitle className="text-sm font-bold text-slate-600 dark:text-slate-400">{stat.title}</CardTitle>
                <p className="text-xs text-slate-500 mt-1 font-medium">{stat.subtitle}</p>
              </div>
              <div className={`p-2.5 rounded-2xl bg-gradient-to-br ${stat.color} shadow-lg shadow-amber-500/10`}>
                <stat.icon className="h-5 w-5 text-white" />
              </div>
            </CardHeader>

            <CardContent className="relative space-y-3">
              <div className="text-2xl sm:text-3xl font-black font-serif text-slate-900 dark:text-white">{stat.value}</div>

              <div className="flex items-center justify-between text-xs sm:text-sm">
                <div className="flex items-center">
                  {stat.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 mr-1 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1 text-rose-600 dark:text-rose-400" />
                  )}
                  <span className={`font-bold ${stat.trend === "up" ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                    {stat.change}
                  </span>
                </div>
                <span className="text-slate-500 dark:text-slate-400">vs geçen dönem</span>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 font-semibold">
                  <span>Hedef: {stat.target}</span>
                  <span>%{stat.progress.toFixed(1)}</span>
                </div>
                <div className="w-full bg-slate-200/80 dark:bg-white/10 rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`h-1.5 rounded-full bg-gradient-to-r ${stat.color} transition-all duration-500`}
                    style={{ width: `${Math.min(stat.progress, 100)}%` }}
                  />
                </div>
              </div>

              {/* Forecast */}
              <div className="pt-2 border-t border-slate-100 dark:border-white/5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400">30 Gün Tahmini:</span>
                  <span className="font-bold text-amber-500 dark:text-amber-400">{stat.forecast}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue Analytics & Forecasting */}
      <Card className="bg-white/70 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/80 dark:border-white/5 shadow-lg shadow-slate-200/20 dark:shadow-black/40 rounded-3xl overflow-hidden">
        <CardHeader className="border-b border-slate-100 dark:border-white/5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">Gelir Analizi & Tahminleme</CardTitle>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">Gerçek veriler vs AI tahminleri ve gelir projeksiyonları</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/20 font-bold">
                AI Tahmin: %87 Doğruluk
              </Badge>
              <Button variant="outline" className="h-9 px-3 rounded-lg bg-white/60 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all shadow-sm">
                <Brain className="h-3.5 w-3.5 mr-1.5 text-indigo-500" />
                Model Ayarları
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={revenueAnalytics}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#d4af37" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#d4af37" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:opacity-5" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis yAxisId="left" stroke="#64748b" tickFormatter={(value) => `₺${(value / 1000000).toFixed(1)}M`} />
              <YAxis yAxisId="right" orientation="right" stroke="#64748b" />
              <Tooltip
                formatter={(value: any, name: any) => {
                  if (name === 'revenue' || name === 'forecast') {
                    return [`₺${value.toLocaleString()}`, name === 'revenue' ? 'Gerçek Gelir' : 'AI Tahmini']
                  }
                  return [value.toLocaleString(), name === 'orders' ? 'Sipariş Sayısı' : 'AOV']
                }}
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.95)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#f8fafc',
                  borderRadius: '12px'
                }}
              />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="revenue"
                stroke="#d4af37"
                fill="url(#colorRevenue)"
                strokeWidth={3}
              />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="forecast"
                stroke="#3b82f6"
                fill="url(#colorForecast)"
                strokeWidth={2}
                strokeDasharray="5 5"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="orders"
                stroke="#10b981"
                strokeWidth={2}
              />
              <Bar
                yAxisId="right"
                dataKey="aov"
                fill="#8b5cf6"
                opacity={0.6}
                radius={[2, 2, 0, 0]}
              />
            </ComposedChart>
          </ResponsiveContainer>

          <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/10 dark:border-emerald-500/20 rounded-2xl">
              <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">₺2.28M</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-bold">Haziran Tahmini</p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-black">+8.6% büyüme</p>
            </div>
            <div className="text-center p-4 bg-blue-500/5 dark:bg-blue-500/10 border border-blue-500/10 dark:border-blue-500/20 rounded-2xl">
              <p className="text-2xl font-black text-blue-600 dark:text-blue-400">3,680</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-bold">Tahmini Sipariş</p>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-black">+8.9% artış</p>
            </div>
            <div className="text-center p-4 bg-purple-500/5 dark:bg-purple-500/10 border border-purple-500/10 dark:border-purple-500/20 rounded-2xl">
              <p className="text-2xl font-black text-purple-600 dark:text-purple-400">₺620</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-bold">Tahmini AOV</p>
              <p className="text-xs text-purple-600 dark:text-purple-400 font-black font-mono">Stabil trend</p>
            </div>
            <div className="text-center p-4 bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/10 dark:border-amber-500/20 rounded-2xl">
              <p className="text-2xl font-black text-amber-500 dark:text-amber-400">87%</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-bold">Model Doğruluğu</p>
              <p className="text-xs text-amber-500 dark:text-amber-400 font-black font-mono">Son 6 ay</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customer Segmentation & Channel Performance */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Customer Segmentation */}
        <Card className="bg-white/70 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/80 dark:border-white/5 shadow-lg shadow-slate-200/20 dark:shadow-black/40 rounded-3xl overflow-hidden">
          <CardHeader className="border-b border-slate-100 dark:border-white/5">
            <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">Müşteri Segmentasyonu</CardTitle>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium font-sans">RFM analizi ve yaşam boyu değer segmentleri</p>
          </CardHeader>
          <CardContent className="p-5">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={customerSegmentation}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ segment, percentage }) => `${segment} (${percentage.toFixed(1)}%)`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="percentage"
                  strokeWidth={2}
                  stroke="transparent"
                >
                  {customerSegmentation.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: any, name: any, props: any) => [
                    `${props.payload.count.toLocaleString()} müşteri`,
                    'Müşteri Sayısı'
                  ]}
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#f8fafc',
                    borderRadius: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="mt-4 space-y-2.5">
              {customerSegmentation.map((segment, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/50 dark:bg-black/20 border border-slate-100 dark:border-white/5 hover:bg-slate-100/50 dark:hover:bg-white/[0.02] transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: segment.color }} />
                    <div>
                      <p className="font-bold text-slate-800 dark:text-slate-200">{segment.segment}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{segment.count.toLocaleString()} müşteri</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-slate-900 dark:text-slate-100">{formatCurrency(segment.revenue)}</p>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">{segment.growth}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Channel Performance */}
        <Card className="bg-white/70 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/80 dark:border-white/5 shadow-lg shadow-slate-200/20 dark:shadow-black/40 rounded-3xl overflow-hidden">
          <CardHeader className="border-b border-slate-100 dark:border-white/5">
            <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">Kanal Performansı</CardTitle>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium font-sans">Trafik kaynakları ve ROAS analizi</p>
          </CardHeader>
          <CardContent className="p-5">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={channelPerformance} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:opacity-5" />
                <XAxis type="number" stroke="#64748b" tickFormatter={(value) => `₺${(value / 1000000).toFixed(1)}M`} />
                <YAxis dataKey="channel" type="category" stroke="#64748b" width={100} />
                <Tooltip
                  formatter={(value: any, name: any) => [
                    name === 'revenue' ? formatCurrency(value) : `${value.toLocaleString()}`,
                    name === 'revenue' ? 'Gelir' : 'Oturum'
                  ]}
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#f8fafc',
                    borderRadius: '12px'
                  }}
                />
                <Bar dataKey="revenue" fill="#3b82f6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>

            <div className="mt-4 space-y-1.5">
              {channelPerformance.map((channel, index) => (
                <div key={index} className="flex items-center justify-between text-sm p-2.5 rounded-xl hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors border border-transparent hover:border-slate-100 dark:hover:border-white/5">
                  <span className="font-bold text-slate-800 dark:text-slate-200">{channel.channel}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-slate-500 dark:text-slate-400 font-bold">{formatPercentage(channel.conversion)} CVR</span>
                    {channel.roas > 0 && (
                      <span className="text-emerald-600 dark:text-emerald-400 font-black">{channel.roas}x ROAS</span>
                    )}
                    <span className="text-blue-600 dark:text-blue-400 font-black">{channel.growth}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Conversion Funnel & Product Performance */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Conversion Funnel */}
        <Card className="bg-white/70 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/80 dark:border-white/5 shadow-lg shadow-slate-200/20 dark:shadow-black/40 rounded-3xl overflow-hidden">
          <CardHeader className="border-b border-slate-100 dark:border-white/5">
            <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">Dönüşüm Hunisi</CardTitle>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium font-sans">Müşteri yolculuğu ve kayıp noktaları analizi</p>
          </CardHeader>
          <CardContent className="p-5">
            <div className="space-y-4">
              {conversionFunnel.map((stage, index) => (
                <div key={stage.stage} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                        index === 0 ? 'bg-blue-500' :
                        index === 1 ? 'bg-emerald-500' :
                        index === 2 ? 'bg-purple-500' :
                        index === 3 ? 'bg-amber-500' :
                        index === 4 ? 'bg-rose-500' :
                        'bg-slate-500'
                      }`}>
                        {index + 1}
                      </div>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{stage.stage}</span>
                    </div>
                    <div className="flex items-center gap-4 text-right">
                      <div>
                        <span className="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100">
                          {stage.count.toLocaleString()}
                        </span>
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">kişi</p>
                      </div>
                      <div>
                        <span className="text-base sm:text-lg font-black text-blue-600 dark:text-blue-400">
                          {formatPercentage(stage.percentage)}
                        </span>
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">oran</p>
                      </div>
                    </div>
                  </div>

                  <div className="w-full bg-slate-200 dark:bg-white/10 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-3 rounded-full transition-all duration-500 ${
                        index === 0 ? 'bg-blue-500' :
                        index === 1 ? 'bg-emerald-500' :
                        index === 2 ? 'bg-purple-500' :
                        index === 3 ? 'bg-amber-500' :
                        index === 4 ? 'bg-rose-500' :
                        'bg-slate-500'
                      }`}
                      style={{ width: `${stage.percentage}%` }}
                    />
                  </div>

                  {index < conversionFunnel.length - 1 && stage.dropRate > 0 && (
                    <div className="flex items-center gap-2 text-xs text-rose-600 dark:text-rose-400 ml-11 font-semibold">
                      <ArrowDownRight className="h-3 w-3" />
                      <span>
                        Kayıp: {formatPercentage(stage.dropRate)}
                        ({(conversionFunnel[index].count - conversionFunnel[index + 1].count).toLocaleString()} kişi)
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-slate-100 dark:border-white/5">
              <h4 className="font-bold text-slate-900 dark:text-white mb-3">Optimizasyon Önerileri</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold bg-amber-500/5 dark:bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/10 dark:border-amber-500/20">
                  <AlertTriangle className="h-4 w-4 shrink-0" />
                  <span>Sepete ekleme oranını %58.8'den %45'e düşürmeyi hedefleyin</span>
                </div>
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold bg-blue-500/5 dark:bg-blue-500/10 p-2.5 rounded-xl border border-blue-500/10 dark:border-blue-500/20">
                  <Target className="h-4 w-4 shrink-0" />
                  <span>Ödeme sayfası optimizasyonu ile %37.2 kayıp azaltılabilir</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/5 dark:bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/10 dark:border-emerald-500/20">
                  <CheckCircle className="h-4 w-4 shrink-0" />
                  <span>Ürün görüntüleme oranı sektör ortalamasının üzerinde</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Product Performance */}
        <Card className="bg-white/70 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/80 dark:border-white/5 shadow-lg shadow-slate-200/20 dark:shadow-black/40 rounded-3xl overflow-hidden">
          <CardHeader className="border-b border-slate-100 dark:border-white/5">
            <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">Ürün Performansı</CardTitle>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium font-sans">Kategori bazında satış ve karlılık analizi</p>
          </CardHeader>
          <CardContent className="p-5">
            <div className="space-y-3.5">
              {productPerformance.map((product, index) => (
                <div key={index} className="p-4 rounded-2xl bg-slate-50/50 dark:bg-black/20 border border-slate-100 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-white/[0.02] transition-all duration-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold ${
                        index === 0 ? 'bg-gradient-to-br from-blue-500 to-cyan-600' :
                        index === 1 ? 'bg-gradient-to-br from-emerald-500 to-green-600' :
                        index === 2 ? 'bg-gradient-to-br from-purple-500 to-violet-600' :
                        'bg-gradient-to-br from-amber-500 to-orange-600'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 dark:text-slate-200">{product.category}</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-bold">{product.units.toLocaleString()} adet satıldı</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-slate-900 dark:text-slate-100">{formatCurrency(product.revenue)}</p>
                      <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">{product.growth}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 text-xs">
                    <div className="text-center p-2 bg-white/40 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-xl">
                      <p className="font-black text-emerald-600 dark:text-emerald-400">{formatPercentage(product.margin)}</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">Kar Marjı</p>
                    </div>
                    <div className="text-center p-2 bg-white/40 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-xl">
                      <p className="font-black text-blue-600 dark:text-blue-400">{product.inventory.toLocaleString()}</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">Stok</p>
                    </div>
                    <div className="text-center p-2 bg-white/40 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-xl">
                      <p className="font-black text-amber-500 dark:text-amber-400">{product.rating}</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">Puan</p>
                    </div>
                    <div className="text-center p-2 bg-white/40 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-xl">
                      <p className={`font-black ${product.returns < 2 ? 'text-emerald-600 dark:text-emerald-400' : product.returns < 3 ? 'text-amber-600 dark:text-amber-400' : 'text-rose-600 dark:text-rose-400'}`}>
                        {formatPercentage(product.returns)}
                      </p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">İade Oranı</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-white/5">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-3 bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/10 dark:border-emerald-500/20 rounded-2xl">
                  <p className="text-lg font-black text-emerald-600 dark:text-emerald-400">71.2%</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-bold">Ortalama Kar Marjı</p>
                </div>
                <div className="text-center p-3 bg-blue-500/5 dark:bg-blue-500/10 border border-blue-500/10 dark:border-blue-500/20 rounded-2xl">
                  <p className="text-lg font-black text-blue-600 dark:text-blue-400">4.8</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-bold">Ortalama Ürün Puanı</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Predictive Analytics & AI Insights */}
      <Card className="bg-white/70 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/80 dark:border-white/5 shadow-lg shadow-slate-200/20 dark:shadow-black/40 rounded-3xl overflow-hidden">
        <CardHeader className="border-b border-slate-100 dark:border-white/5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">Tahmine Dayalı Analitik</CardTitle>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium font-sans">AI destekli öngörüler ve akıllı öneriler</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-500/20 font-bold">
                Machine Learning
              </Badge>
              <Button variant="outline" className="h-9 px-3 rounded-lg bg-white/60 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all shadow-sm">
                <Settings className="h-3.5 w-3.5 mr-1.5 text-slate-500 dark:text-slate-400" />
                Model Ayarları
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-6 md:grid-cols-3">
            {predictiveMetrics.map((metric, index) => (
              <div key={index} className="p-5 rounded-2xl bg-slate-50/50 dark:bg-black/20 border border-slate-100 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-white/[0.02] transition-all duration-200">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2.5 rounded-xl bg-gradient-to-br ${
                    index === 0 ? 'from-emerald-500 to-green-600' :
                    index === 1 ? 'from-red-500 to-pink-600' :
                    'from-amber-500 to-orange-600'
                  } shadow-lg`}>
                    <Brain className="h-5 w-5 text-white" />
                  </div>
                  <Badge className={`${
                    metric.confidence >= 90 ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20' :
                    metric.confidence >= 80 ? 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-500/20' :
                    'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/20'
                  } border font-bold text-xs`}>
                    %{metric.confidence} güven
                  </Badge>
                </div>

                <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2 font-sans">{metric.metric}</h4>

                <div className="flex items-center gap-4 mb-4">
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-bold">Mevcut</p>
                    <p className="text-lg font-black text-slate-800 dark:text-slate-100">
                      {typeof metric.current === 'number' && metric.current > 1000
                        ? formatCurrency(metric.current)
                        : metric.current}
                    </p>
                  </div>
                  <div className="flex items-center">
                    {metric.trend === "up" ? (
                      <ArrowUpRight className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <ArrowDownRight className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                    )}
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-bold">Tahmin</p>
                    <p className={`text-lg font-black ${metric.trend === "up" ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                      {typeof metric.predicted === 'number' && metric.predicted > 1000
                        ? formatCurrency(metric.predicted)
                        : metric.predicted}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-2 font-bold uppercase tracking-wider">Etkileyen Faktörler:</p>
                  <div className="flex flex-wrap gap-1">
                    {metric.factors.map((factor, factorIndex) => (
                      <Badge key={factorIndex} variant="outline" className="text-xs font-bold border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300">
                        {factor}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-5 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 dark:from-blue-500/10 dark:to-cyan-500/10 rounded-2xl border border-blue-500/10 dark:border-blue-500/20">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-500 rounded-2xl shadow-lg shadow-blue-500/25">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-900 dark:text-white mb-2 font-sans">AI Önerileri</h4>
                <div className="space-y-2.5 text-sm text-slate-700 dark:text-slate-300">
                  <div className="flex items-start gap-2 bg-white/40 dark:bg-black/10 p-2.5 rounded-xl border border-slate-100 dark:border-white/5 font-medium">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 shrink-0" />
                    <p>Haziran ayında %15 gelir artışı için sosyal medya reklamlarını artırın</p>
                  </div>
                  <div className="flex items-start gap-2 bg-white/40 dark:bg-black/10 p-2.5 rounded-xl border border-slate-100 dark:border-white/5 font-medium">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 shrink-0" />
                    <p>Ortopedik ürünler kategorisinde stok artışı yaparak %8 ek gelir elde edebilirsiniz</p>
                  </div>
                  <div className="flex items-start gap-2 bg-white/40 dark:bg-black/10 p-2.5 rounded-xl border border-slate-100 dark:border-white/5 font-medium">
                    <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 shrink-0" />
                    <p>Mobil dönüşüm oranını artırmak için checkout sürecini optimize edin</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}