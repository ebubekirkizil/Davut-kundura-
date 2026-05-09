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
  Activity
} from "lucide-react"

// Mock shipping data
const shippingStats = [
  {
    title: "Aktif Sevkiyatlar",
    subtitle: "Yolda olan paketler",
    value: "1,247",
    change: "+8.3%",
    trend: "up",
    icon: Truck,
    color: "from-blue-500 to-cyan-600"
  },
  {
    title: "Günlük Teslimatlar",
    subtitle: "Bugün teslim edilen",
    value: "89",
    change: "+12.7%",
    trend: "up",
    icon: CheckCircle,
    color: "from-emerald-500 to-green-600"
  },
  {
    title: "Ortalama Teslimat Süresi",
    subtitle: "Saat cinsinden",
    value: "18.5",
    change: "-5.2%",
    trend: "down",
    icon: Clock,
    color: "from-amber-500 to-orange-600"
  },
  {
    title: "Kargo Maliyeti",
    subtitle: "Günlük toplam",
    value: "₺12,450",
    change: "+3.1%",
    trend: "up",
    icon: DollarSign,
    color: "from-purple-500 to-violet-600"
  }
]

const carriers = [
  {
    id: "aras",
    name: "Aras Kargo",
    logo: "/carriers/aras.png",
    status: "active",
    rating: 4.2,
    activeShipments: 342,
    avgDeliveryTime: "24 saat",
    costPerKg: 8.50,
    coverage: "Türkiye geneli",
    contact: "+90 444 2727",
    integration: "API",
    lastSync: "2026-05-09T10:30:00"
  },
  {
    id: "yurtici",
    name: "Yurtiçi Kargo",
    logo: "/carriers/yurtici.png",
    status: "active",
    rating: 4.5,
    activeShipments: 289,
    avgDeliveryTime: "18 saat",
    costPerKg: 9.20,
    coverage: "Türkiye geneli",
    contact: "+90 444 9999",
    integration: "API",
    lastSync: "2026-05-09T10:25:00"
  },
  {
    id: "mng",
    name: "MNG Kargo",
    logo: "/carriers/mng.png",
    status: "active",
    rating: 4.1,
    activeShipments: 198,
    avgDeliveryTime: "22 saat",
    costPerKg: 7.80,
    coverage: "Türkiye geneli",
    contact: "+90 444 0606",
    integration: "API",
    lastSync: "2026-05-09T10:20:00"
  },
  {
    id: "ptt",
    name: "PTT Kargo",
    logo: "/carriers/ptt.png",
    status: "maintenance",
    rating: 3.8,
    activeShipments: 156,
    avgDeliveryTime: "36 saat",
    costPerKg: 6.50,
    coverage: "Türkiye geneli",
    contact: "+90 444 1788",
    integration: "Manual",
    lastSync: "2026-05-08T16:45:00"
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
    estimatedDelivery: "2026-05-09T18:00:00",
    weight: 2.5,
    cost: 21.25,
    items: 3,
    priority: "standard",
    createdAt: "2026-05-08T14:30:00"
  },
  {
    id: "SHP24050002",
    trackingNumber: "YK240509005678",
    carrier: "Yurtiçi Kargo",
    customer: "Zeynep Kaya",
    destination: "Ankara, Çankaya",
    status: "delivered",
    estimatedDelivery: "2026-05-09T12:00:00",
    weight: 1.8,
    cost: 16.56,
    items: 2,
    priority: "express",
    createdAt: "2026-05-08T09:15:00"
  },
  {
    id: "SHP24050003",
    trackingNumber: "MNG240509009876",
    carrier: "MNG Kargo",
    customer: "Can Demir",
    destination: "İzmir, Konak",
    status: "preparing",
    estimatedDelivery: "2026-05-10T16:00:00",
    weight: 3.2,
    cost: 24.96,
    items: 5,
    priority: "standard",
    createdAt: "2026-05-09T08:45:00"
  }
]

const deliveryData = [
  { date: "03 May", delivered: 78, failed: 5, returned: 2 },
  { date: "04 May", delivered: 92, failed: 3, returned: 1 },
  { date: "05 May", delivered: 85, failed: 7, returned: 3 },
  { date: "06 May", delivered: 96, failed: 4, returned: 2 },
  { date: "07 May", delivered: 89, failed: 6, returned: 1 },
  { date: "08 May", delivered: 103, failed: 2, returned: 4 },
  { date: "09 May", delivered: 89, failed: 3, returned: 2 }
]

const carrierPerformance = [
  { name: "Aras", onTime: 92, delayed: 8, cost: 8.5 },
  { name: "Yurtiçi", onTime: 95, delayed: 5, cost: 9.2 },
  { name: "MNG", onTime: 88, delayed: 12, cost: 7.8 },
  { name: "PTT", onTime: 82, delayed: 18, cost: 6.5 }
]

const regionDistribution = [
  { name: "İstanbul", value: 35, color: "#3b82f6", shipments: 437 },
  { name: "Ankara", value: 20, color: "#10b981", shipments: 250 },
  { name: "İzmir", value: 15, color: "#f59e0b", shipments: 188 },
  { name: "Bursa", value: 12, color: "#ef4444", shipments: 150 },
  { name: "Diğer", value: 18, color: "#8b5cf6", shipments: 225 }
]

export default function AdminShippingPage() {
  const [selectedCarrier, setSelectedCarrier] = React.useState("all")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [searchQuery, setSearchQuery] = React.useState("")

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('tr-TR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-emerald-500/10 text-emerald-700 border-emerald-200'
      case 'in-transit': return 'bg-blue-500/10 text-blue-700 border-blue-200'
      case 'preparing': return 'bg-amber-500/10 text-amber-700 border-amber-200'
      case 'failed': return 'bg-red-500/10 text-red-700 border-red-200'
      case 'returned': return 'bg-purple-500/10 text-purple-700 border-purple-200'
      case 'active': return 'bg-emerald-500/10 text-emerald-700 border-emerald-200'
      case 'maintenance': return 'bg-amber-500/10 text-amber-700 border-amber-200'
      default: return 'bg-slate-500/10 text-slate-700 border-slate-200'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'delivered': return 'Teslim Edildi'
      case 'in-transit': return 'Yolda'
      case 'preparing': return 'Hazırlanıyor'
      case 'failed': return 'Başarısız'
      case 'returned': return 'İade'
      case 'active': return 'Aktif'
      case 'maintenance': return 'Bakımda'
      default: return status
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'express': return 'bg-red-500/10 text-red-700'
      case 'standard': return 'bg-blue-500/10 text-blue-700'
      case 'economy': return 'bg-slate-500/10 text-slate-700'
      default: return 'bg-slate-500/10 text-slate-700'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-serif font-bold text-foreground">
            Kargo & Lojistik
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Sevkiyat yönetimi ve kargo takip sistemi
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Route className="h-4 w-4 mr-2" />
            Rota Optimizasyonu
          </Button>
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Sevkiyat Raporu
          </Button>
          <Button className="bg-primary text-primary-foreground">
            <Plus className="h-4 w-4 mr-2" />
            Yeni Sevkiyat
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {shippingStats.map((stat, index) => (
          <Card key={stat.title} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div>
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <p className="text-xs text-muted-foreground mt-1">{stat.subtitle}</p>
              </div>
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                <stat.icon className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stat.value}</div>
              <div className="flex items-center mt-2">
                {stat.trend === "up" ? (
                  <TrendingUp className="h-4 w-4 mr-1 text-emerald-600" />
                ) : (
                  <TrendingDown className="h-4 w-4 mr-1 text-red-600" />
                )}
                <span className={`text-sm font-semibold ${stat.trend === "up" ? "text-emerald-600" : "text-red-600"}`}>
                  {stat.change}
                </span>
                <span className="text-sm text-muted-foreground ml-1">vs geçen hafta</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Carrier Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold">Kargo Firmaları</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">Entegre kargo firmaları ve performans durumu</p>
            </div>
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Yeni Entegrasyon
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {carriers.map((carrier) => (
              <div key={carrier.id} className="p-6 rounded-xl border bg-card hover:bg-accent/50 transition-colors group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                      <Truck className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                        {carrier.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{carrier.coverage}</p>
                    </div>
                  </div>
                  <Badge className={`${getStatusColor(carrier.status)} border`}>
                    {getStatusLabel(carrier.status)}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <p className="text-2xl font-bold text-foreground">{carrier.activeShipments}</p>
                    <p className="text-xs text-muted-foreground">Aktif Sevkiyat</p>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <p className="text-lg font-bold text-foreground">{carrier.rating}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">Değerlendirme</p>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ortalama Teslimat:</span>
                    <span className="font-medium">{carrier.avgDeliveryTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Kg Başı Maliyet:</span>
                    <span className="font-medium">₺{carrier.costPerKg}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Entegrasyon:</span>
                    <Badge variant={carrier.integration === 'API' ? 'default' : 'secondary'}>
                      {carrier.integration}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{carrier.contact}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Analytics */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Delivery Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Teslimat Performansı</CardTitle>
            <p className="text-sm text-muted-foreground">Günlük teslimat başarı oranları</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={deliveryData}>
                <defs>
                  <linearGradient id="colorDelivered" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
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
                  dataKey="delivered"
                  stroke="#10b981"
                  fill="url(#colorDelivered)"
                />
                <Line
                  type="monotone"
                  dataKey="failed"
                  stroke="#ef4444"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Regional Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Bölgesel Dağılım</CardTitle>
            <p className="text-sm text-muted-foreground">Sevkiyat hedef bölgeleri</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={regionDistribution}
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
                  {regionDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: any, name: any, props: any) => [
                    `${props.payload.shipments} sevkiyat`,
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
              {regionDistribution.map((region, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: region.color }} />
                    <span className="text-foreground">{region.name}</span>
                  </div>
                  <span className="font-semibold text-foreground">{region.shipments} sevkiyat</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Shipments */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold">Son Sevkiyatlar</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">Gerçek zamanlı sevkiyat takibi</p>
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Durum Filtresi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tüm Durumlar</SelectItem>
                  <SelectItem value="preparing">Hazırlanıyor</SelectItem>
                  <SelectItem value="in-transit">Yolda</SelectItem>
                  <SelectItem value="delivered">Teslim Edildi</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Dışa Aktar
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {shipments
              .filter(shipment => statusFilter === "all" || shipment.status === statusFilter)
              .map((shipment) => (
                <div key={shipment.id} className="flex items-center justify-between p-4 rounded-xl border bg-card hover:bg-accent/50 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Package className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {shipment.trackingNumber}
                        </h4>
                        <Badge className={`${getStatusColor(shipment.status)} border`}>
                          {getStatusLabel(shipment.status)}
                        </Badge>
                        <Badge className={getPriorityColor(shipment.priority)}>
                          {shipment.priority === 'express' ? 'Ekspres' : 'Standart'}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-muted-foreground">
                        <div>
                          <span className="text-xs">Müşteri:</span>
                          <p className="font-medium text-foreground">{shipment.customer}</p>
                        </div>
                        <div>
                          <span className="text-xs">Hedef:</span>
                          <p className="font-medium text-foreground">{shipment.destination}</p>
                        </div>
                        <div>
                          <span className="text-xs">Kargo:</span>
                          <p className="font-medium text-foreground">{shipment.carrier}</p>
                        </div>
                        <div>
                          <span className="text-xs">Ağırlık:</span>
                          <p className="font-medium text-foreground">{shipment.weight} kg</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <div>
                      <p className="text-lg font-bold text-foreground">₺{shipment.cost.toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground">{shipment.items} ürün</p>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <Navigation className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}