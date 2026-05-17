"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { toast, Toaster } from "react-hot-toast"
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
  Truck,
  Package,
  MapPin,
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  MoreVertical,
  Navigation,
  Route,
  Timer,
  DollarSign,
  Users,
  Calendar,
  FileText,
  Download,
  Upload,
  RefreshCw,
  Settings,
  Zap,
  Globe,
  Phone,
  Mail,
  Star,
  Shield,
  Activity,
  ArrowUpRight
} from "lucide-react"

// Mock shipping stats
const shippingStats = [
  {
    title: "Aktif Sevkiyatlar",
    subtitle: "Yolda olan paketler",
    value: "1,247",
    change: "+8.3%",
    trend: "up",
    icon: Truck,
    color: "from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-400"
  },
  {
    title: "Günlük Teslimatlar",
    subtitle: "Bugün teslim edilen",
    value: "89",
    change: "+12.7%",
    trend: "up",
    icon: CheckCircle,
    color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400"
  },
  {
    title: "Ortalama Teslimat Süresi",
    subtitle: "Saat cinsinden",
    value: "18.5 sa",
    change: "-5.2%",
    trend: "down",
    icon: Clock,
    color: "from-sky-500/20 to-blue-500/20 border-sky-500/30 text-sky-400"
  },
  {
    title: "Kargo Maliyeti",
    subtitle: "Bugünkü toplam fatura",
    value: "₺12,450",
    change: "+3.1%",
    trend: "up",
    icon: DollarSign,
    color: "from-purple-500/20 to-indigo-500/20 border-purple-500/30 text-purple-400"
  }
]

const carriers = [
  {
    id: "aras",
    name: "Aras Kargo",
    status: "active",
    rating: 4.2,
    activeShipments: 342,
    avgDeliveryTime: "24 saat",
    costPerKg: 8.50,
    coverage: "Türkiye geneli",
    contact: "+90 444 2727",
    integration: "API Entegre",
    lastSync: "2026-05-17T17:30:00"
  },
  {
    id: "yurtici",
    name: "Yurtiçi Kargo",
    status: "active",
    rating: 4.5,
    activeShipments: 289,
    avgDeliveryTime: "18 saat",
    costPerKg: 9.20,
    coverage: "Türkiye geneli",
    contact: "+90 444 9999",
    integration: "API Entegre",
    lastSync: "2026-05-17T17:25:00"
  },
  {
    id: "mng",
    name: "MNG Kargo",
    status: "active",
    rating: 4.1,
    activeShipments: 198,
    avgDeliveryTime: "22 saat",
    costPerKg: 7.80,
    coverage: "Türkiye geneli",
    contact: "+90 444 0606",
    integration: "API Entegre",
    lastSync: "2026-05-17T17:20:00"
  },
  {
    id: "ptt",
    name: "PTT Kargo",
    status: "maintenance",
    rating: 3.8,
    activeShipments: 156,
    avgDeliveryTime: "36 saat",
    costPerKg: 6.50,
    coverage: "Türkiye geneli",
    contact: "+90 444 1788",
    integration: "Manuel",
    lastSync: "2026-05-16T16:45:00"
  }
]

const shipments = [
  {
    id: "SHP24050001",
    trackingNumber: "AR240509001234",
    carrier: "Aras Kargo",
    customer: "Ahmet Yılmaz",
    destination: "İstanbul, Kadıköy",
    status: "in-transit",
    estimatedDelivery: "2026-05-18T18:00:00",
    weight: 2.5,
    cost: 21.25,
    items: 3,
    priority: "standard",
    createdAt: "2026-05-17T14:30:00"
  },
  {
    id: "SHP24050002",
    trackingNumber: "YK240509005678",
    carrier: "Yurtiçi Kargo",
    customer: "Zeynep Kaya",
    destination: "Ankara, Çankaya",
    status: "delivered",
    estimatedDelivery: "2026-05-17T12:00:00",
    weight: 1.8,
    cost: 16.56,
    items: 2,
    priority: "express",
    createdAt: "2026-05-16T09:15:00"
  },
  {
    id: "SHP24050003",
    trackingNumber: "MNG240509009876",
    carrier: "MNG Kargo",
    customer: "Can Demir",
    destination: "İzmir, Konak",
    status: "preparing",
    estimatedDelivery: "2026-05-19T16:00:00",
    weight: 3.2,
    cost: 24.96,
    items: 5,
    priority: "standard",
    createdAt: "2026-05-17T08:45:00"
  }
]

const deliveryData = [
  { date: "11 May", delivered: 78, failed: 5, returned: 2 },
  { date: "12 May", delivered: 92, failed: 3, returned: 1 },
  { date: "13 May", delivered: 85, failed: 7, returned: 3 },
  { date: "14 May", delivered: 96, failed: 4, returned: 2 },
  { date: "15 May", delivered: 89, failed: 6, returned: 1 },
  { date: "16 May", delivered: 103, failed: 2, returned: 4 },
  { date: "17 May", delivered: 120, failed: 3, returned: 2 }
]

const regionDistribution = [
  { name: "İstanbul", value: 35, color: "#f59e0b", shipments: 437 }, // Amber
  { name: "Ankara", value: 20, color: "#10b981", shipments: 250 },  // Emerald
  { name: "İzmir", value: 15, color: "#3b82f6", shipments: 188 },   // Blue
  { name: "Bursa", value: 12, color: "#8b5cf6", shipments: 150 },   // Purple
  { name: "Diğer", value: 18, color: "#64748b", shipments: 225 }    // Slate
]

export default function AdminShippingPage() {
  const [mounted, setMounted] = React.useState(false)
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [searchQuery, setSearchQuery] = React.useState("")

  // Dynamic mounting guard to prevent hydration crash
  React.useEffect(() => {
    setMounted(true)
  }, [])

  const handleExport = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1200)),
      {
        loading: "Sevkiyat ve kargo raporu derleniyor...",
        success: "Rapor XLS formatında başarıyla dışa aktarıldı! 📥",
        error: "Rapor oluşturma hatası!"
      }
    )
  }

  const handleRouteOpt = () => {
    toast.success("Yapay zeka rota optimizasyonu tamamlandı. 4 aktif kurye rotası güncellendi!")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.15)]'
      case 'in-transit': return 'bg-sky-500/10 text-sky-400 border border-sky-500/20 shadow-[0_0_10px_rgba(14,165,233,0.15)]'
      case 'preparing': return 'bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.15)]'
      case 'failed': return 'bg-rose-500/10 text-rose-400 border border-rose-500/20 shadow-[0_0_10px_rgba(244,63,94,0.15)]'
      case 'active': return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
      case 'maintenance': return 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
      default: return 'bg-slate-500/10 text-slate-400 border border-white/5'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'delivered': return 'Teslim Edildi'
      case 'in-transit': return 'Yolda'
      case 'preparing': return 'Paketleniyor'
      case 'failed': return 'Başarısız'
      case 'active': return 'Aktif'
      case 'maintenance': return 'Bakımda'
      default: return status.toUpperCase()
    }
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#070A13] text-slate-100 flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="h-8 w-8 text-amber-500 animate-spin" />
          <p className="text-sm tracking-widest text-slate-400 font-medium">ANALİTİK MERKEZİ YÜKLENİYOR...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#070A13] text-slate-100 font-sans p-6 relative overflow-hidden selection:bg-amber-500/30 selection:text-amber-200">
      <Toaster position="top-right" reverseOrder={false} />

      {/* Decorative Glow Elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 bg-clip-text text-transparent">
              Sevkiyat & Kargo Analitiği
            </h1>
            <Badge className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] uppercase font-bold py-0.5 px-2 tracking-wider">
              Yönetici Raporu
            </Badge>
          </div>
          <p className="text-slate-400 mt-2 text-sm max-w-xl">
            Davut Kundura kargo verimliliği, lojistik maliyet analizi ve kurye performans takip konsolu.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button onClick={handleRouteOpt} variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 hover:border-amber-500/50 hover:text-amber-300 text-xs font-semibold gap-1.5 h-10 rounded-xl transition-all">
            <Route className="h-4 w-4" />
            AI Rota Optimizasyonu
          </Button>
          <Button onClick={handleExport} variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 hover:border-amber-500/50 hover:text-amber-300 text-xs font-semibold gap-1.5 h-10 rounded-xl transition-all">
            <Download className="h-4 w-4" />
            Raporu İndir
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {shippingStats.map((stat) => (
          <Card key={stat.title} className="relative overflow-hidden bg-slate-900/35 backdrop-blur-xl border border-white/5 shadow-2xl hover:-translate-y-1 hover:border-amber-500/30 transition-all duration-300 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div>
                <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-400">{stat.title}</CardTitle>
                <p className="text-[10px] text-slate-500 mt-1">{stat.subtitle}</p>
              </div>
              <div className={`p-2.5 rounded-xl border ${stat.color} shadow-lg shadow-black/20 group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="text-2xl font-bold font-mono text-slate-100">{stat.value}</div>
              <div className="flex items-center mt-2.5">
                {stat.trend === "up" ? (
                  <TrendingUp className="h-3.5 w-3.5 mr-1 text-emerald-400" />
                ) : (
                  <TrendingDown className="h-3.5 w-3.5 mr-1 text-sky-400" />
                )}
                <span className={`text-xs font-bold ${stat.trend === "up" ? "text-emerald-400" : "text-sky-400"}`}>
                  {stat.change}
                </span>
                <span className="text-[10px] text-slate-500 ml-1.5">önceki haftaya kıyasla</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Analytics Charts Row */}
      <div className="grid gap-6 lg:grid-cols-12 mb-8">
        {/* Delivery Performance */}
        <Card className="lg:col-span-8 bg-slate-900/35 backdrop-blur-xl border border-white/5 shadow-2xl">
          <CardHeader className="border-b border-white/5 py-4 px-5">
            <CardTitle className="text-sm font-semibold tracking-wider uppercase text-slate-300">Teslimat Performans Akışı</CardTitle>
            <p className="text-[11px] text-slate-500">Günlük başarılı teslimatlar vs başarısız durumlar</p>
          </CardHeader>
          <CardContent className="p-5">
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={deliveryData}>
                  <defs>
                    <linearGradient id="colorDelivered" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.25}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                  <XAxis dataKey="date" stroke="rgba(255,255,255,0.3)" fontSize={10} fontClassName="font-mono" />
                  <YAxis stroke="rgba(255,255,255,0.3)" fontSize={10} fontClassName="font-mono" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#070A13',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '12px',
                      color: '#f8fafc',
                      fontSize: '11px',
                      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="delivered"
                    name="Teslim Edilen"
                    stroke="#10b981"
                    strokeWidth={2}
                    fill="url(#colorDelivered)"
                  />
                  <Line
                    type="monotone"
                    dataKey="failed"
                    name="Başarısız"
                    stroke="#f43f5e"
                    strokeWidth={2.5}
                    dot={{ fill: '#f43f5e', r: 3 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Regional Distribution */}
        <Card className="lg:col-span-4 bg-slate-900/35 backdrop-blur-xl border border-white/5 shadow-2xl">
          <CardHeader className="border-b border-white/5 py-4 px-5">
            <CardTitle className="text-sm font-semibold tracking-wider uppercase text-slate-300">Bölgesel Sevkiyat Dağılımı</CardTitle>
            <p className="text-[11px] text-slate-500">Hedef şehirlere göre oransal hacim</p>
          </CardHeader>
          <CardContent className="p-5 flex flex-col justify-between">
            <div className="h-[180px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={regionDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `%${(percent * 100).toFixed(0)}`}
                    outerRadius={65}
                    innerRadius={45}
                    fill="#8884d8"
                    dataKey="value"
                    stroke="transparent"
                  >
                    {regionDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: any, name: any, props: any) => [
                      `${props.payload.shipments} sevkiyat`,
                      props.payload.name
                    ]}
                    contentStyle={{
                      backgroundColor: '#070A13',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '12px',
                      fontSize: '11px',
                      color: '#f8fafc'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-2 mt-4 pt-3 border-t border-white/5">
              {regionDistribution.map((region, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: region.color }} />
                    <span className="text-slate-300 font-medium">{region.name}</span>
                  </div>
                  <span className="font-semibold text-slate-400 font-mono">{region.shipments} sevkiyat</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Carrier Management Table */}
      <Card className="bg-slate-900/35 backdrop-blur-xl border border-white/5 shadow-2xl mb-8">
        <CardHeader className="border-b border-white/5 py-4 px-5 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-sm font-semibold tracking-wider uppercase text-slate-300">Kargo Firmaları & Entegrasyonlar</CardTitle>
            <p className="text-[11px] text-slate-500">Davut Kundura sistemine entegre kargo firmalarının durumu</p>
          </div>
          <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-[#070A13] font-bold text-xs rounded-xl h-8">
            <Plus className="h-3.5 w-3.5 mr-1" />
            Yeni Entegrasyon
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid gap-6 md:grid-cols-2 p-5">
            {carriers.map((carrier) => (
              <div key={carrier.id} className="p-5 rounded-2xl border border-white/5 bg-slate-950/40 hover:border-amber-500/20 transition-all duration-300 group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                      <Truck className="h-5 w-5 text-amber-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-200 group-hover:text-amber-400 transition-colors">
                        {carrier.name}
                      </h3>
                      <p className="text-[10px] text-slate-500">{carrier.coverage}</p>
                    </div>
                  </div>
                  <Badge className={`${getStatusColor(carrier.status)} text-[9px] uppercase font-bold py-0.5 px-2 rounded-md`}>
                    {getStatusLabel(carrier.status)}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="text-center p-2.5 bg-slate-900/50 border border-white/5 rounded-xl">
                    <p className="text-lg font-bold font-mono text-slate-100">{carrier.activeShipments}</p>
                    <p className="text-[9px] uppercase tracking-wider text-slate-500">Aktif Sevkiyat</p>
                  </div>
                  <div className="text-center p-2.5 bg-slate-900/50 border border-white/5 rounded-xl">
                    <div className="flex items-center justify-center gap-0.5">
                      <Star className="h-3.5 w-3.5 text-amber-400 fill-current" />
                      <p className="text-base font-bold font-mono text-slate-100">{carrier.rating}</p>
                    </div>
                    <p className="text-[9px] uppercase tracking-wider text-slate-500">Müşteri Skoru</p>
                  </div>
                </div>

                <div className="space-y-2 text-xs border-t border-white/5 pt-3">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Ortalama Teslim:</span>
                    <span className="font-semibold text-slate-300">{carrier.avgDeliveryTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Kg Başına Navlun:</span>
                    <span className="font-semibold text-slate-300">₺{carrier.costPerKg.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">API Entegrasyon:</span>
                    <span className="text-amber-300 font-bold">{carrier.integration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Shipments Console */}
      <Card className="bg-slate-900/35 backdrop-blur-xl border border-white/5 shadow-2xl">
        <CardHeader className="border-b border-white/5 py-4 px-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <CardTitle className="text-sm font-semibold tracking-wider uppercase text-slate-300">Son Gönderiler & Akış</CardTitle>
            <p className="text-[11px] text-slate-500">Gerçek zamanlı sevkiyat ve navlun logları</p>
          </div>
          <div className="flex items-center gap-2 self-stretch sm:self-auto">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40 bg-slate-950/60 border-white/5 text-xs text-slate-200 rounded-xl h-9">
                <SelectValue placeholder="Durum Filtresi" />
              </SelectTrigger>
              <SelectContent className="bg-[#070A13] border-white/5 text-slate-200">
                <SelectItem value="all">Tüm Durumlar</SelectItem>
                <SelectItem value="preparing">Paketleniyor</SelectItem>
                <SelectItem value="in-transit">Yolda</SelectItem>
                <SelectItem value="delivered">Teslim Edildi</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="p-0 divide-y divide-white/5">
          {shipments
            .filter(shipment => statusFilter === "all" || shipment.status === statusFilter)
            .map((shipment) => (
              <div key={shipment.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 hover:bg-slate-900/10 transition-colors duration-300 gap-4 group">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <Package className="h-5 w-5 text-amber-400" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-bold text-slate-200 font-mono text-sm group-hover:text-amber-400 transition-colors">
                        {shipment.trackingNumber}
                      </h4>
                      <Badge className={`${getStatusColor(shipment.status)} text-[9px] uppercase font-bold py-0.5 px-2 rounded-md`}>
                        {getStatusLabel(shipment.status)}
                      </Badge>
                      <Badge className="bg-sky-500/10 text-sky-400 border border-sky-500/20 text-[9px] font-bold px-1.5 py-0">
                        {shipment.priority === 'express' ? 'Ekspres' : 'Standart'}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-1.5 mt-2.5 text-[11px] text-slate-400">
                      <div>
                        <span className="text-slate-500">Alıcı:</span>
                        <p className="font-semibold text-slate-300">{shipment.customer}</p>
                      </div>
                      <div>
                        <span className="text-slate-500">Hedef İl:</span>
                        <p className="font-semibold text-slate-300">{shipment.destination}</p>
                      </div>
                      <div>
                        <span className="text-slate-500">Firma:</span>
                        <p className="font-semibold text-slate-300">{shipment.carrier}</p>
                      </div>
                      <div>
                        <span className="text-slate-500">Ağırlık:</span>
                        <p className="font-semibold text-slate-300">{shipment.weight} kg</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right flex sm:flex-col items-center sm:items-end justify-between sm:justify-start w-full sm:w-auto border-t sm:border-t-0 border-white/5 pt-3 sm:pt-0 gap-2">
                  <div>
                    <p className="text-base font-bold font-mono text-amber-400">₺{shipment.cost.toFixed(2)}</p>
                    <p className="text-[10px] text-slate-500">{shipment.items} adet ürün</p>
                  </div>
                  <div className="flex gap-1 mt-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-slate-200 hover:bg-white/5 rounded-lg">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-slate-200 hover:bg-white/5 rounded-lg">
                      <Navigation className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
        </CardContent>
      </Card>
    </div>
  )
}