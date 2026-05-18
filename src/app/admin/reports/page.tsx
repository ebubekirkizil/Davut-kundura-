"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
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
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import {
  FileText,
  Download,
  Calendar,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Package,
  ShoppingCart,
  Eye,
  Filter,
  Search,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Clock,
  Target,
  Zap,
  RefreshCw,
  Settings,
  Mail,
  Printer,
  Share2,
  BookOpen,
  AlertCircle,
  CheckCircle,
  Star
} from "lucide-react"

// Mock report data
const reportCategories = [
  {
    id: "sales",
    name: "Satış Raporları",
    description: "Satış performansı ve gelir analizi",
    icon: DollarSign,
    color: "from-emerald-500 to-green-600",
    reports: [
      { name: "Günlük Satış Raporu", lastGenerated: "2026-05-10T09:00:00", size: "2.4 MB" },
      { name: "Aylık Gelir Analizi", lastGenerated: "2026-05-01T00:00:00", size: "5.8 MB" },
      { name: "Ürün Satış Performansı", lastGenerated: "2026-05-09T18:00:00", size: "3.2 MB" },
      { name: "Müşteri Segmentasyonu", lastGenerated: "2026-05-08T12:00:00", size: "4.1 MB" }
    ]
  },
  {
    id: "inventory",
    name: "Envanter Raporları",
    description: "Stok durumu ve hareket analizi",
    icon: Package,
    color: "from-blue-500 to-cyan-600",
    reports: [
      { name: "Stok Durum Raporu", lastGenerated: "2026-05-10T08:30:00", size: "1.8 MB" },
      { name: "Düşük Stok Uyarıları", lastGenerated: "2026-05-10T07:00:00", size: "892 KB" },
      { name: "Envanter Hareket Raporu", lastGenerated: "2026-05-09T20:00:00", size: "6.3 MB" },
      { name: "ABC Analizi", lastGenerated: "2026-05-07T15:30:00", size: "2.1 MB" }
    ]
  },
  {
    id: "customers",
    name: "Müşteri Raporları",
    description: "Müşteri davranışları ve analitik",
    icon: Users,
    color: "from-purple-500 to-violet-600",
    reports: [
      { name: "Müşteri Aktivite Raporu", lastGenerated: "2026-05-10T06:00:00", size: "3.7 MB" },
      { name: "Sadakat Programı Analizi", lastGenerated: "2026-05-09T14:00:00", size: "2.9 MB" },
      { name: "Müşteri Yaşam Döngüsü", lastGenerated: "2026-05-08T10:00:00", size: "4.5 MB" },
      { name: "Churn Analizi", lastGenerated: "2026-05-07T16:00:00", size: "1.6 MB" }
    ]
  },
  {
    id: "financial",
    name: "Finansal Raporlar",
    description: "Mali durum ve karlılık analizi",
    icon: BarChart3,
    color: "from-amber-500 to-orange-600",
    reports: [
      { name: "Kar-Zarar Raporu", lastGenerated: "2026-05-09T23:59:00", size: "1.2 MB" },
      { name: "Nakit Akış Analizi", lastGenerated: "2026-05-09T18:30:00", size: "2.8 MB" },
      { name: "Maliyet Analizi", lastGenerated: "2026-05-08T22:00:00", size: "3.4 MB" },
      { name: "Bütçe Karşılaştırması", lastGenerated: "2026-05-07T09:00:00", size: "1.9 MB" }
    ]
  }
]

const quickStats = [
  {
    title: "Toplam Rapor",
    value: "247",
    change: "+12",
    trend: "up",
    icon: FileText,
    color: "from-blue-500 to-cyan-600"
  },
  {
    title: "Bu Ay Oluşturulan",
    value: "89",
    change: "+23%",
    trend: "up",
    icon: Calendar,
    color: "from-emerald-500 to-green-600"
  },
  {
    title: "Otomatik Raporlar",
    value: "34",
    change: "+5",
    trend: "up",
    icon: RefreshCw,
    color: "from-purple-500 to-violet-600"
  },
  {
    title: "Paylaşılan Raporlar",
    value: "156",
    change: "+8%",
    trend: "up",
    icon: Share2,
    color: "from-amber-500 to-orange-600"
  }
]

const recentReports = [
  {
    id: "RPT24051001",
    name: "Günlük Satış Performans Raporu",
    category: "Satış",
    generatedBy: "Sistem",
    generatedAt: "2026-05-10T09:00:00",
    size: "2.4 MB",
    format: "PDF",
    status: "completed",
    downloads: 23,
    shared: true
  },
  {
    id: "RPT24051002",
    name: "Haftalık Envanter Durumu",
    category: "Envanter",
    generatedBy: "Ahmet Yılmaz",
    generatedAt: "2026-05-10T08:30:00",
    size: "1.8 MB",
    format: "Excel",
    status: "completed",
    downloads: 12,
    shared: false
  },
  {
    id: "RPT24051003",
    name: "Müşteri Segmentasyon Analizi",
    category: "Müşteri",
    generatedBy: "Zeynep Kaya",
    generatedAt: "2026-05-09T18:45:00",
    size: "4.1 MB",
    format: "PDF",
    status: "processing",
    downloads: 0,
    shared: false
  },
  {
    id: "RPT24051004",
    name: "Aylık Finansal Özet",
    category: "Finansal",
    generatedBy: "Can Demir",
    generatedAt: "2026-05-09T16:20:00",
    size: "3.2 MB",
    format: "PDF",
    status: "completed",
    downloads: 45,
    shared: true
  }
]

const reportUsageData = [
  { month: "Ocak", generated: 45, downloaded: 234, shared: 67 },
  { month: "Şubat", generated: 52, downloaded: 289, shared: 78 },
  { month: "Mart", generated: 48, downloaded: 267, shared: 71 },
  { month: "Nisan", generated: 61, downloaded: 312, shared: 89 },
  { month: "Mayıs", generated: 58, downloaded: 298, shared: 82 }
]

const categoryDistribution = [
  { name: "Satış", value: 35, color: "#10b981", count: 87 },
  { name: "Envanter", value: 28, color: "#3b82f6", count: 69 },
  { name: "Müşteri", value: 22, color: "#8b5cf6", count: 54 },
  { name: "Finansal", value: 15, color: "#f59e0b", count: 37 }
]

export default function AdminReportsPage() {
  const [mounted, setMounted] = React.useState(false)
  const [selectedCategory, setSelectedCategory] = React.useState("all")
  const [dateRange, setDateRange] = React.useState("7d")
  const [searchQuery, setSearchQuery] = React.useState("")

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('tr-TR', {
      day: 'numeric',
      month: 'short',
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-emerald-500/10 text-emerald-700 border-emerald-200'
      case 'processing': return 'bg-blue-500/10 text-blue-700 border-blue-200'
      case 'failed': return 'bg-red-500/10 text-red-700 border-red-200'
      case 'scheduled': return 'bg-amber-500/10 text-amber-700 border-amber-200'
      default: return 'bg-slate-500/10 text-slate-700 border-slate-200'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return 'Tamamlandı'
      case 'processing': return 'İşleniyor'
      case 'failed': return 'Başarısız'
      case 'scheduled': return 'Planlandı'
      default: return status
    }
  }

  const getFormatIcon = (format: string) => {
    switch (format.toLowerCase()) {
      case 'pdf': return FileText
      case 'excel': return BarChart3
      case 'csv': return FileText
      default: return FileText
    }
  }

  if (!mounted) return null

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-serif font-bold text-foreground">
            Raporlar & Analitik
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Kapsamlı iş zekası ve performans raporları
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Rapor Planla
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Şablon Yöneticisi
          </Button>
          <Button className="bg-primary text-primary-foreground">
            <FileText className="h-4 w-4 mr-2" />
            Yeni Rapor
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {quickStats.map((stat, index) => (
          <Card key={stat.title} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                <stat.icon className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stat.value}</div>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 mr-1 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-600">{stat.change}</span>
                <span className="text-sm text-muted-foreground ml-1">bu ay</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Report Categories */}
      <div className="grid gap-6 md:grid-cols-2">
        {reportCategories.map((category) => (
          <Card key={category.id} className="group hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${category.color} shadow-lg`}>
                  <category.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {category.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {category.reports.map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors group/item">
                    <div>
                      <h4 className="font-medium text-foreground group-hover/item:text-primary transition-colors">
                        {report.name}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Son güncelleme: {getRelativeTime(report.lastGenerated)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{report.size}</span>
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover/item:opacity-100 transition-opacity">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <span className="text-sm text-muted-foreground">
                  {category.reports.length} rapor mevcut
                </span>
                <Button variant="outline" size="sm">
                  Tümünü Görüntüle
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Analytics Dashboard */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Report Usage Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Rapor Kullanım Trendleri</CardTitle>
            <p className="text-sm text-muted-foreground">Aylık rapor oluşturma ve kullanım istatistikleri</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={reportUsageData}>
                <defs>
                  <linearGradient id="colorGenerated" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorDownloaded" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="downloaded"
                  stackId="1"
                  stroke="#10b981"
                  fill="url(#colorDownloaded)"
                />
                <Area
                  type="monotone"
                  dataKey="generated"
                  stackId="1"
                  stroke="#3b82f6"
                  fill="url(#colorGenerated)"
                />
                <Line
                  type="monotone"
                  dataKey="shared"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Kategori Dağılımı</CardTitle>
            <p className="text-sm text-muted-foreground">Rapor türlerine göre dağılım</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={categoryDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ percentage }) => `%${percentage.toFixed(0)}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  strokeWidth={2}
                  stroke="hsl(var(--background))"
                >
                  {categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: any, name: any, props: any) => [
                    `${props.payload.count} rapor`,
                    'Toplam'
                  ]}
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-3">
              {categoryDistribution.map((category, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                    <span className="text-foreground">{category.name}</span>
                  </div>
                  <span className="font-semibold text-foreground">{category.count} rapor</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold">Son Raporlar</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">En son oluşturulan ve güncellenen raporlar</p>
            </div>
            <div className="flex gap-2">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tüm Kategoriler</SelectItem>
                    <SelectItem value="sales">Satış</SelectItem>
                    <SelectItem value="inventory">Envanter</SelectItem>
                    <SelectItem value="customers">Müşteri</SelectItem>
                    <SelectItem value="financial">Finansal</SelectItem>
                  </SelectContent>
                </Select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filtrele
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentReports.map((report) => {
              const FormatIcon = getFormatIcon(report.format)
              return (
                <div key={report.id} className="flex items-center justify-between p-4 rounded-xl border bg-card hover:bg-accent/50 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <FormatIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {report.name}
                        </h4>
                        <Badge className={`${getStatusColor(report.status)} border`}>
                          {getStatusLabel(report.status)}
                        </Badge>
                        {report.shared && (
                          <Badge variant="outline" className="text-xs">
                            <Share2 className="h-3 w-3 mr-1" />
                            Paylaşıldı
                          </Badge>
                        )}
                      </div>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-muted-foreground">
                        <div>
                          <span className="text-xs">Kategori:</span>
                          <p className="font-medium text-foreground">{report.category}</p>
                        </div>
                        <div>
                          <span className="text-xs">Oluşturan:</span>
                          <p className="font-medium text-foreground">{report.generatedBy}</p>
                        </div>
                        <div>
                          <span className="text-xs">Boyut:</span>
                          <p className="font-medium text-foreground">{report.size}</p>
                        </div>
                        <div>
                          <span className="text-xs">İndirme:</span>
                          <p className="font-medium text-foreground">{report.downloads} kez</p>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDate(report.generatedAt)} • {report.format}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="flex items-center justify-between mt-6 pt-6 border-t">
            <p className="text-sm text-muted-foreground">
              {recentReports.length} rapor gösteriliyor
            </p>
            <Button variant="outline">
              Tüm Raporları Görüntüle
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Hızlı İşlemler</CardTitle>
          <p className="text-sm text-muted-foreground">Sık kullanılan rapor işlemleri</p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button className="h-24 flex-col gap-2 bg-gradient-to-br from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white">
              <DollarSign className="h-6 w-6" />
              <div className="text-center">
                <div className="font-semibold">Satış Raporu</div>
                <div className="text-xs opacity-90">Günlük/Aylık</div>
              </div>
            </Button>

            <Button className="h-24 flex-col gap-2 bg-gradient-to-br from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white">
              <Package className="h-6 w-6" />
              <div className="text-center">
                <div className="font-semibold">Envanter Raporu</div>
                <div className="text-xs opacity-90">Stok durumu</div>
              </div>
            </Button>

            <Button className="h-24 flex-col gap-2 bg-gradient-to-br from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white">
              <Users className="h-6 w-6" />
              <div className="text-center">
                <div className="font-semibold">Müşteri Raporu</div>
                <div className="text-xs opacity-90">Analitik</div>
              </div>
            </Button>

            <Button className="h-24 flex-col gap-2 bg-gradient-to-br from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white">
              <BarChart3 className="h-6 w-6" />
              <div className="text-center">
                <div className="font-semibold">Finansal Rapor</div>
                <div className="text-xs opacity-90">Kar-zarar</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}