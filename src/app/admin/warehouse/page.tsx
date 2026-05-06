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
  Warehouse,
  Package,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  MoreVertical,
  Truck,
  BarChart3,
  Activity,
  Target,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  ArrowRightLeft,
  QrCode,
  FileText,
  Download,
  Upload,
  RefreshCw,
  Settings,
  Users,
  Calendar,
  DollarSign,
  Boxes,
  Building,
  ShoppingCart
} from "lucide-react"

// Mock warehouse data - Enterprise Level
const warehouseStats = [
  {
    title: "Toplam Stok Değeri",
    subtitle: "Tüm Depolar",
    value: "₺8,450,000",
    change: "+12.3%",
    trend: "up",
    icon: DollarSign,
    color: "from-emerald-500 to-green-600",
    target: "₺9,000,000",
    progress: 93.9
  },
  {
    title: "Aktif Ürün Çeşidi",
    subtitle: "SKU Sayısı",
    value: "2,847",
    change: "+8.7%",
    trend: "up",
    icon: Package,
    color: "from-blue-500 to-cyan-600",
    target: "3,000",
    progress: 94.9
  },
  {
    title: "Düşük Stok Uyarısı",
    subtitle: "Kritik Seviye",
    value: "23",
    change: "-15.2%",
    trend: "down",
    icon: AlertTriangle,
    color: "from-amber-500 to-orange-600",
    target: "0",
    progress: 23
  },
  {
    title: "Stok Devir Hızı",
    subtitle: "Aylık Ortalama",
    value: "4.2x",
    change: "+18.5%",
    trend: "up",
    icon: RefreshCw,
    color: "from-purple-500 to-violet-600",
    target: "5.0x",
    progress: 84
  },
  {
    title: "Depo Doluluk Oranı",
    subtitle: "Kapasite Kullanımı",
    value: "78.5%",
    change: "+5.3%",
    trend: "up",
    icon: Warehouse,
    color: "from-indigo-500 to-blue-600",
    target: "85%",
    progress: 92.4
  },
  {
    title: "Günlük Hareketler",
    subtitle: "Giriş/Çıkış",
    value: "1,247",
    change: "+24.1%",
    trend: "up",
    icon: Activity,
    color: "from-teal-500 to-cyan-600",
    target: "1,500",
    progress: 83.1
  },
  {
    title: "Stok Doğruluğu",
    subtitle: "Envanter Uyumu",
    value: "99.2%",
    change: "+0.8%",
    trend: "up",
    icon: CheckCircle,
    color: "from-green-500 to-emerald-600",
    target: "99.5%",
    progress: 99.7
  },
  {
    title: "Ortalama Teslimat Süresi",
    subtitle: "Depodan Çıkış",
    value: "2.4 saat",
    change: "-12.7%",
    trend: "down",
    icon: Clock,
    color: "from-rose-500 to-pink-600",
    target: "2.0 saat",
    progress: 83.3
  }
]

const warehouses = [
  {
    id: "WH001",
    name: "Ana Depo - İstanbul",
    location: "Hadımköy Organize Sanayi Bölgesi",
    manager: "Ahmet Yılmaz",
    capacity: 15000,
    occupied: 11750,
    occupancyRate: 78.3,
    status: "active",
    type: "main",
    totalProducts: 1247,
    lowStockItems: 8,
    lastInventory: "2026-05-01T09:00:00",
    temperature: "Kontrollü",
    security: "24/7",
    coordinates: { lat: 41.2461, lng: 28.6767 }
  },
  {
    id: "WH002",
    name: "Dağıtım Merkezi - Ankara",
    location: "Sincan Organize Sanayi Bölgesi",
    manager: "Zeynep Kaya",
    capacity: 8000,
    occupied: 6240,
    occupancyRate: 78.0,
    status: "active",
    type: "distribution",
    totalProducts: 892,
    lowStockItems: 12,
    lastInventory: "2026-04-28T14:30:00",
    temperature: "Standart",
    security: "Gündüz",
    coordinates: { lat: 39.9334, lng: 32.8597 }
  },
  {
    id: "WH003",
    name: "Bölgesel Depo - İzmir",
    location: "Atatürk Organize Sanayi Bölgesi",
    manager: "Can Demir",
    capacity: 5000,
    occupied: 3850,
    occupancyRate: 77.0,
    status: "active",
    type: "regional",
    totalProducts: 634,
    lowStockItems: 3,
    lastInventory: "2026-05-03T11:15:00",
    temperature: "Kontrollü",
    security: "24/7",
    coordinates: { lat: 38.4192, lng: 27.1287 }
  },
  {
    id: "WH004",
    name: "Yedek Depo - Bursa",
    location: "Nilüfer Sanayi Bölgesi",
    manager: "Fatma Özkan",
    capacity: 3000,
    occupied: 1200,
    occupancyRate: 40.0,
    status: "maintenance",
    type: "backup",
    totalProducts: 245,
    lowStockItems: 0,
    lastInventory: "2026-04-25T16:45:00",
    temperature: "Standart",
    security: "Gündüz",
    coordinates: { lat: 40.1824, lng: 29.0670 }
  }
]

const inventoryMovements = [
  {
    id: "MOV24050001",
    type: "inbound",
    product: "Premium Deri Kemer - Executive Black",
    sku: "DK-001-BLK",
    quantity: 150,
    warehouse: "Ana Depo - İstanbul",
    supplier: "Milano Leather Co.",
    reference: "PO-2024-0506-001",
    date: "2026-05-06T10:30:00",
    status: "completed",
    unitCost: 450,
    totalValue: 67500,
    batchNumber: "MLT-240506-001",
    expiryDate: null,
    operator: "Mehmet Yılmaz"
  },
  {
    id: "MOV24050002",
    type: "outbound",
    product: "Ortopedik Tabanlık - Pro Series",
    sku: "DK-002-ORT",
    quantity: 89,
    warehouse: "Ana Depo - İstanbul",
    customer: "ABC Holding A.Ş.",
    reference: "SO-2024-0506-002",
    date: "2026-05-06T09:15:00",
    status: "completed",
    unitCost: 180,
    totalValue: 16020,
    batchNumber: "ORT-240420-003",
    expiryDate: null,
    operator: "Ayşe Kaya"
  },
  {
    id: "MOV24050003",
    type: "transfer",
    product: "Luxury Deri Bakım Seti",
    sku: "DK-003-BAK",
    quantity: 45,
    warehouse: "Ana Depo - İstanbul",
    destination: "Dağıtım Merkezi - Ankara",
    reference: "TR-2024-0505-001",
    date: "2026-05-05T16:45:00",
    status: "in-transit",
    unitCost: 120,
    totalValue: 5400,
    batchNumber: "BAK-240415-002",
    expiryDate: null,
    operator: "Can Demir"
  },
  {
    id: "MOV24050004",
    type: "adjustment",
    product: "Kurumsal Ayakkabı Seti",
    sku: "DK-005-CORP",
    quantity: -3,
    warehouse: "Dağıtım Merkezi - Ankara",
    reason: "Hasar tespit edildi",
    reference: "ADJ-2024-0505-001",
    date: "2026-05-05T14:20:00",
    status: "completed",
    unitCost: 1200,
    totalValue: -3600,
    batchNumber: "CORP-240410-001",
    expiryDate: null,
    operator: "Zeynep Kaya"
  }
]

const lowStockItems = [
  {
    sku: "DK-001-BRN",
    name: "Premium Deri Kemer - Vintage Brown",
    currentStock: 8,
    minStock: 15,
    maxStock: 100,
    warehouse: "Ana Depo - İstanbul",
    supplier: "Milano Leather Co.",
    lastOrder: "2026-04-20T10:00:00",
    leadTime: 14,
    unitCost: 475,
    category: "Deri Kemerler",
    priority: "high"
  },
  {
    sku: "DK-003-PRO",
    name: "Professional Deri Bakım Seti",
    currentStock: 12,
    minStock: 20,
    maxStock: 80,
    warehouse: "Dağıtım Merkezi - Ankara",
    supplier: "Care Solutions Ltd.",
    lastOrder: "2026-04-25T14:30:00",
    leadTime: 7,
    unitCost: 135,
    category: "Bakım Ürünleri",
    priority: "medium"
  },
  {
    sku: "DK-004-ORT",
    name: "Ortopedik Tabanlık - Comfort Plus",
    currentStock: 5,
    minStock: 25,
    maxStock: 150,
    warehouse: "Bölgesel Depo - İzmir",
    supplier: "Ortopedik Çözümler Ltd.",
    lastOrder: "2026-04-18T09:15:00",
    leadTime: 10,
    unitCost: 195,
    category: "Ortopedik Ürünler",
    priority: "high"
  }
]

const stockMovementData = [
  { date: "01 May", inbound: 450, outbound: 380, transfer: 45, adjustment: -8 },
  { date: "02 May", inbound: 320, outbound: 420, transfer: 67, adjustment: -12 },
  { date: "03 May", inbound: 580, outbound: 390, transfer: 23, adjustment: -5 },
  { date: "04 May", inbound: 290, outbound: 450, transfer: 89, adjustment: -15 },
  { date: "05 May", inbound: 670, outbound: 520, transfer: 34, adjustment: -3 },
  { date: "06 May", inbound: 420, outbound: 380, transfer: 56, adjustment: -7 }
]

const warehouseCapacityData = [
  { name: "Ana Depo", capacity: 15000, occupied: 11750, available: 3250 },
  { name: "Ankara DC", capacity: 8000, occupied: 6240, available: 1760 },
  { name: "İzmir Bölgesel", capacity: 5000, occupied: 3850, available: 1150 },
  { name: "Bursa Yedek", capacity: 3000, occupied: 1200, available: 1800 }
]

const categoryDistribution = [
  { name: "Deri Kemerler", value: 45, color: "#d4af37", stock: 1247, value_amount: 3450000 },
  { name: "Ortopedik Ürünler", value: 30, color: "#8B4513", stock: 892, value_amount: 2890000 },
  { name: "Bakım Ürünleri", value: 15, color: "#2563eb", stock: 456, value_amount: 1240000 },
  { name: "Kurumsal Setler", value: 10, color: "#dc2626", stock: 252, value_amount: 870000 }
]

export default function AdminWarehousePage() {
  const [selectedWarehouse, setSelectedWarehouse] = React.useState("all")
  const [movementFilter, setMovementFilter] = React.useState("all")
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

  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Az önce"
    if (diffInHours < 24) return `${diffInHours} saat önce`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays} gün önce`
  }

  const getMovementTypeColor = (type: string) => {
    switch (type) {
      case 'inbound': return 'bg-emerald-500/10 text-emerald-700 border-emerald-200'
      case 'outbound': return 'bg-blue-500/10 text-blue-700 border-blue-200'
      case 'transfer': return 'bg-purple-500/10 text-purple-700 border-purple-200'
      case 'adjustment': return 'bg-amber-500/10 text-amber-700 border-amber-200'
      default: return 'bg-slate-500/10 text-slate-700 border-slate-200'
    }
  }

  const getMovementTypeLabel = (type: string) => {
    switch (type) {
      case 'inbound': return 'Giriş'
      case 'outbound': return 'Çıkış'
      case 'transfer': return 'Transfer'
      case 'adjustment': return 'Düzeltme'
      default: return 'Bilinmeyen'
    }
  }

  const getMovementIcon = (type: string) => {
    switch (type) {
      case 'inbound': return ArrowDownRight
      case 'outbound': return ArrowUpRight
      case 'transfer': return ArrowRightLeft
      case 'adjustment': return Settings
      default: return Package
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-500/10 text-emerald-700 border-emerald-200'
      case 'maintenance': return 'bg-amber-500/10 text-amber-700 border-amber-200'
      case 'inactive': return 'bg-slate-500/10 text-slate-700 border-slate-200'
      case 'completed': return 'bg-emerald-500/10 text-emerald-700 border-emerald-200'
      case 'in-transit': return 'bg-blue-500/10 text-blue-700 border-blue-200'
      case 'pending': return 'bg-amber-500/10 text-amber-700 border-amber-200'
      default: return 'bg-slate-500/10 text-slate-700 border-slate-200'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/10 text-red-700'
      case 'medium': return 'bg-amber-500/10 text-amber-700'
      case 'low': return 'bg-emerald-500/10 text-emerald-700'
      default: return 'bg-slate-500/10 text-slate-700'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-serif font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent">
            Depo & Stok Yönetimi
          </h1>
          <p className="text-slate-600 mt-2 text-lg">
            Çoklu depo operasyonları ve gelişmiş envanter kontrolü
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="bg-white/60 backdrop-blur-sm border-white/40 hover:bg-white/80">
            <QrCode className="h-4 w-4 mr-2" />
            Barkod Tarama
          </Button>
          <Button variant="outline" className="bg-white/60 backdrop-blur-sm border-white/40 hover:bg-white/80">
            <FileText className="h-4 w-4 mr-2" />
            Envanter Raporu
          </Button>
          <Button className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white shadow-lg shadow-amber-500/25">
            <Plus className="h-4 w-4 mr-2" />
            Yeni Stok Hareketi
          </Button>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {warehouseStats.map((stat, index) => (
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

            <CardContent className="relative space-y-3">
              <div className="text-3xl font-bold text-slate-800">{stat.value}</div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  {stat.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 mr-1 text-emerald-600" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1 text-red-600" />
                  )}
                  <span className={`font-semibold ${stat.trend === "up" ? "text-emerald-600" : "text-red-600"}`}>
                    {stat.change}
                  </span>
                </div>
                <span className="text-slate-500">vs geçen ay</span>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Hedef: {stat.target}</span>
                  <span>%{stat.progress.toFixed(1)}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full bg-gradient-to-r ${stat.color} transition-all duration-500`}
                    style={{ width: `${Math.min(stat.progress, 100)}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Warehouse Overview */}
      <Card className="bg-white/60 backdrop-blur-sm border-white/40 shadow-xl shadow-slate-200/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold text-slate-800">Depo Durumu</CardTitle>
              <p className="text-sm text-slate-600 mt-1">Tüm depoların anlık durumu ve kapasiteleri</p>
            </div>
            <Button variant="outline" className="bg-white/60 border-white/40 hover:bg-white/80">
              <Plus className="h-4 w-4 mr-2" />
              Yeni Depo
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {warehouses.map((warehouse) => (
              <div key={warehouse.id} className="p-6 rounded-xl bg-gradient-to-br from-white/50 to-white/30 border border-white/40 hover:from-white/70 hover:to-white/50 transition-all duration-200 group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${
                      warehouse.type === 'main' ? 'from-blue-500 to-cyan-600' :
                      warehouse.type === 'distribution' ? 'from-emerald-500 to-green-600' :
                      warehouse.type === 'regional' ? 'from-purple-500 to-violet-600' :
                      'from-amber-500 to-orange-600'
                    } shadow-lg`}>
                      <Warehouse className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 group-hover:text-amber-600 transition-colors">
                        {warehouse.name}
                      </h3>
                      <p className="text-sm text-slate-600">{warehouse.location}</p>
                    </div>
                  </div>
                  <Badge className={`${getStatusColor(warehouse.status)} border`}>
                    {warehouse.status === 'active' ? 'Aktif' :
                     warehouse.status === 'maintenance' ? 'Bakımda' : 'Pasif'}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-slate-50/50 rounded-lg">
                    <p className="text-2xl font-bold text-slate-800">{warehouse.totalProducts}</p>
                    <p className="text-xs text-slate-500">Ürün Çeşidi</p>
                  </div>
                  <div className="text-center p-3 bg-slate-50/50 rounded-lg">
                    <p className={`text-2xl font-bold ${warehouse.lowStockItems > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                      {warehouse.lowStockItems}
                    </p>
                    <p className="text-xs text-slate-500">Düşük Stok</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Kapasite Kullanımı</span>
                    <span className="text-sm font-semibold text-slate-800">
                      %{warehouse.occupancyRate.toFixed(1)}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${
                        warehouse.occupancyRate > 90 ? 'bg-red-500' :
                        warehouse.occupancyRate > 75 ? 'bg-amber-500' :
                        'bg-emerald-500'
                      } transition-all duration-500`}
                      style={{ width: `${warehouse.occupancyRate}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Dolu: {warehouse.occupied.toLocaleString()} m²</span>
                    <span>Toplam: {warehouse.capacity.toLocaleString()} m²</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Users className="h-4 w-4" />
                    <span>{warehouse.manager}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
      {/* Stock Movement Analytics */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Stock Movement Trends */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/40 shadow-xl shadow-slate-200/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-semibold text-slate-800">Stok Hareket Analizi</CardTitle>
                <p className="text-sm text-slate-600 mt-1">Günlük giriş/çıkış ve transfer hareketleri</p>
              </div>
              <Badge className="bg-blue-500/10 text-blue-700 border-blue-200">
                Son 7 Gün
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={stockMovementData}>
                <defs>
                  <linearGradient id="colorInbound" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorOutbound" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  formatter={(value: any, name: any) => [
                    `${value} adet`,
                    name === 'inbound' ? 'Giriş' :
                    name === 'outbound' ? 'Çıkış' :
                    name === 'transfer' ? 'Transfer' : 'Düzeltme'
                  ]}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="inbound"
                  stackId="1"
                  stroke="#10b981"
                  fill="url(#colorInbound)"
                />
                <Area
                  type="monotone"
                  dataKey="outbound"
                  stackId="1"
                  stroke="#3b82f6"
                  fill="url(#colorOutbound)"
                />
                <Line
                  type="monotone"
                  dataKey="transfer"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Warehouse Capacity Analysis */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/40 shadow-xl shadow-slate-200/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-semibold text-slate-800">Depo Kapasite Analizi</CardTitle>
                <p className="text-sm text-slate-600 mt-1">Depo doluluk oranları ve kullanılabilir alan</p>
              </div>
              <Badge className="bg-emerald-500/10 text-emerald-700 border-emerald-200">
                %78.1 Ortalama
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={warehouseCapacityData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" stroke="#64748b" tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`} />
                <YAxis dataKey="name" type="category" stroke="#64748b" width={100} />
                <Tooltip
                  formatter={(value: any, name: any) => [
                    `${value.toLocaleString()} m²`,
                    name === 'occupied' ? 'Dolu' : name === 'available' ? 'Boş' : 'Kapasite'
                  ]}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px'
                  }}
                />
                <Bar dataKey="occupied" stackId="a" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                <Bar dataKey="available" stackId="a" fill="#e2e8f0" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-blue-50/50 rounded-lg">
                <p className="text-lg font-bold text-blue-600">
                  {warehouseCapacityData.reduce((sum, w) => sum + w.occupied, 0).toLocaleString()} m²
                </p>
                <p className="text-xs text-slate-500">Toplam Kullanılan</p>
              </div>
              <div className="text-center p-3 bg-slate-50/50 rounded-lg">
                <p className="text-lg font-bold text-slate-600">
                  {warehouseCapacityData.reduce((sum, w) => sum + w.available, 0).toLocaleString()} m²
                </p>
                <p className="text-xs text-slate-500">Toplam Boş</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Low Stock Alerts & Category Distribution */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Low Stock Alerts */}
        <Card className="lg:col-span-2 bg-white/60 backdrop-blur-sm border-white/40 shadow-xl shadow-slate-200/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-semibold text-slate-800">Düşük Stok Uyarıları</CardTitle>
                <p className="text-sm text-slate-600 mt-1">Acil sipariş gerektiren ürünler</p>
              </div>
              <Badge className="bg-red-500/10 text-red-700 border-red-200">
                {lowStockItems.length} Kritik Ürün
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-white/50 to-white/30 border border-white/40 hover:from-white/70 hover:to-white/50 transition-all duration-200 group">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${
                        item.priority === 'high' ? 'from-red-500 to-pink-600' :
                        item.priority === 'medium' ? 'from-amber-500 to-orange-600' :
                        'from-emerald-500 to-green-600'
                      } flex items-center justify-center shadow-lg`}>
                        <AlertTriangle className="h-6 w-6 text-white" />
                      </div>
                      <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full ${
                        item.priority === 'high' ? 'bg-red-500' :
                        item.priority === 'medium' ? 'bg-amber-500' :
                        'bg-emerald-500'
                      } border-2 border-white`} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 group-hover:text-amber-600 transition-colors">
                        {item.name}
                      </h4>
                      <div className="flex items-center gap-4 text-sm text-slate-600 mt-1">
                        <span>SKU: {item.sku}</span>
                        <span>{item.category}</span>
                        <span>{item.warehouse}</span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-slate-500 mt-1">
                        <span>Tedarikçi: {item.supplier}</span>
                        <span>Teslimat: {item.leadTime} gün</span>
                        <span>Son Sipariş: {getRelativeTime(item.lastOrder)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right space-y-2">
                    <div>
                      <p className="text-lg font-bold text-red-600">{item.currentStock}</p>
                      <p className="text-xs text-slate-500">Mevcut Stok</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getPriorityColor(item.priority)}>
                        {item.priority === 'high' ? 'Yüksek' :
                         item.priority === 'medium' ? 'Orta' : 'Düşük'} Öncelik
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="w-32 bg-slate-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            (item.currentStock / item.minStock) < 0.5 ? 'bg-red-500' :
                            (item.currentStock / item.minStock) < 0.8 ? 'bg-amber-500' :
                            'bg-emerald-500'
                          }`}
                          style={{ width: `${Math.min((item.currentStock / item.minStock) * 100, 100)}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>Min: {item.minStock}</span>
                        <span>Max: {item.maxStock}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-200">
              <p className="text-sm text-slate-600">
                {lowStockItems.length} ürün kritik seviyede
              </p>
              <Button className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Toplu Sipariş Oluştur
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/40 shadow-xl shadow-slate-200/20">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-slate-800">Kategori Dağılımı</CardTitle>
            <p className="text-sm text-slate-600">Stok değeri ve ürün dağılımı</p>
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
                  stroke="#ffffff"
                >
                  {categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: any, name: any, props: any) => [
                    `₺${props.payload.value_amount.toLocaleString()}`,
                    'Stok Değeri'
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
            <div className="mt-4 space-y-3">
              {categoryDistribution.map((category, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                    <span className="text-slate-700">{category.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-slate-800">{category.stock} ürün</span>
                    <div className="text-xs text-slate-500">
                      ₺{category.value_amount.toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Inventory Movements */}
      <Card className="bg-white/60 backdrop-blur-sm border-white/40 shadow-xl shadow-slate-200/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold text-slate-800">Son Stok Hareketleri</CardTitle>
              <p className="text-sm text-slate-600 mt-1">Gerçek zamanlı envanter takibi ve hareket geçmişi</p>
            </div>
            <div className="flex gap-2">
              <Select value={movementFilter} onValueChange={setMovementFilter}>
                <SelectTrigger className="w-40 bg-white/60 border-white/40">
                  <SelectValue placeholder="Hareket Tipi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tüm Hareketler</SelectItem>
                  <SelectItem value="inbound">Giriş</SelectItem>
                  <SelectItem value="outbound">Çıkış</SelectItem>
                  <SelectItem value="transfer">Transfer</SelectItem>
                  <SelectItem value="adjustment">Düzeltme</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="bg-white/60 border-white/40 hover:bg-white/80">
                <Download className="h-4 w-4 mr-2" />
                Dışa Aktar
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {inventoryMovements
              .filter(movement => movementFilter === "all" || movement.type === movementFilter)
              .map((movement) => {
                const MovementIcon = getMovementIcon(movement.type)
                return (
                  <div key={movement.id} className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-white/50 to-white/30 border border-white/40 hover:from-white/70 hover:to-white/50 transition-all duration-200 group">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${
                          movement.type === 'inbound' ? 'from-emerald-500 to-green-600' :
                          movement.type === 'outbound' ? 'from-blue-500 to-cyan-600' :
                          movement.type === 'transfer' ? 'from-purple-500 to-violet-600' :
                          'from-amber-500 to-orange-600'
                        } flex items-center justify-center shadow-lg`}>
                          <MovementIcon className="h-6 w-6 text-white" />
                        </div>
                        <Badge className={`absolute -top-2 -right-2 ${getMovementTypeColor(movement.type)} border text-xs px-1`}>
                          {getMovementTypeLabel(movement.type)}
                        </Badge>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-slate-800 group-hover:text-amber-600 transition-colors">
                            {movement.product}
                          </h4>
                          <Badge className={`${getStatusColor(movement.status)} border text-xs`}>
                            {movement.status === 'completed' ? 'Tamamlandı' :
                             movement.status === 'in-transit' ? 'Yolda' :
                             movement.status === 'pending' ? 'Bekliyor' : movement.status}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-slate-600">
                          <div>
                            <span className="text-xs text-slate-500">SKU:</span>
                            <p className="font-mono text-slate-700">{movement.sku}</p>
                          </div>
                          <div>
                            <span className="text-xs text-slate-500">Miktar:</span>
                            <p className={`font-semibold ${movement.quantity > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                              {movement.quantity > 0 ? '+' : ''}{movement.quantity} adet
                            </p>
                          </div>
                          <div>
                            <span className="text-xs text-slate-500">Depo:</span>
                            <p className="font-medium">{movement.warehouse}</p>
                          </div>
                          <div>
                            <span className="text-xs text-slate-500">Operatör:</span>
                            <p className="font-medium">{movement.operator}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-6 mt-2 text-xs text-slate-500">
                          <span>Referans: {movement.reference}</span>
                          <span>Parti: {movement.batchNumber}</span>
                          <span>{formatDate(movement.date)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right space-y-2">
                      <div>
                        <p className={`text-lg font-bold ${movement.totalValue > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                          ₺{Math.abs(movement.totalValue).toLocaleString()}
                        </p>
                        <p className="text-xs text-slate-500">
                          Birim: ₺{movement.unitCost.toLocaleString()}
                        </p>
                      </div>

                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <FileText className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-white/95 backdrop-blur-sm border-white/40">
                            <DropdownMenuItem>Detayları Görüntüle</DropdownMenuItem>
                            <DropdownMenuItem>Belge İndir</DropdownMenuItem>
                            <DropdownMenuItem>Hareket Geçmişi</DropdownMenuItem>
                            {movement.status === 'pending' && (
                              <DropdownMenuItem className="text-red-600 focus:text-red-600">
                                İptal Et
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>

          <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-200">
            <p className="text-sm text-slate-600">
              {inventoryMovements.filter(m => movementFilter === "all" || m.type === movementFilter).length} hareket gösteriliyor
            </p>
            <Button variant="outline" className="bg-white/60 border-white/40 hover:bg-white/80">
              Tüm Hareketleri Görüntüle
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-white/60 backdrop-blur-sm border-white/40 shadow-xl shadow-slate-200/20">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-slate-800">Hızlı İşlemler</CardTitle>
          <p className="text-sm text-slate-600">Sık kullanılan depo operasyonları ve araçlar</p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Stock Entry */}
            <Button className="h-24 flex-col gap-2 bg-gradient-to-br from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg shadow-emerald-500/25">
              <ArrowDownRight className="h-6 w-6" />
              <div className="text-center">
                <div className="font-semibold">Stok Girişi</div>
                <div className="text-xs opacity-90">Yeni ürün kabul</div>
              </div>
            </Button>

            {/* Stock Exit */}
            <Button className="h-24 flex-col gap-2 bg-gradient-to-br from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white shadow-lg shadow-blue-500/25">
              <ArrowUpRight className="h-6 w-6" />
              <div className="text-center">
                <div className="font-semibold">Stok Çıkışı</div>
                <div className="text-xs opacity-90">Sevkiyat hazırlık</div>
              </div>
            </Button>

            {/* Stock Transfer */}
            <Button className="h-24 flex-col gap-2 bg-gradient-to-br from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white shadow-lg shadow-purple-500/25">
              <ArrowRightLeft className="h-6 w-6" />
              <div className="text-center">
                <div className="font-semibold">Depo Transferi</div>
                <div className="text-xs opacity-90">Depolar arası</div>
              </div>
            </Button>

            {/* Inventory Count */}
            <Button className="h-24 flex-col gap-2 bg-gradient-to-br from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-lg shadow-amber-500/25">
              <BarChart3 className="h-6 w-6" />
              <div className="text-center">
                <div className="font-semibold">Envanter Sayımı</div>
                <div className="text-xs opacity-90">Stok kontrolü</div>
              </div>
            </Button>

            {/* Barcode Scanner */}
            <Button variant="outline" className="h-24 flex-col gap-2 bg-white/60 border-white/40 hover:bg-white/80">
              <QrCode className="h-6 w-6" />
              <div className="text-center">
                <div className="font-semibold">Barkod Tarama</div>
                <div className="text-xs text-slate-500">Hızlı arama</div>
              </div>
            </Button>

            {/* Reports */}
            <Button variant="outline" className="h-24 flex-col gap-2 bg-white/60 border-white/40 hover:bg-white/80">
              <FileText className="h-6 w-6" />
              <div className="text-center">
                <div className="font-semibold">Raporlar</div>
                <div className="text-xs text-slate-500">Analiz ve rapor</div>
              </div>
            </Button>

            {/* Settings */}
            <Button variant="outline" className="h-24 flex-col gap-2 bg-white/60 border-white/40 hover:bg-white/80">
              <Settings className="h-6 w-6" />
              <div className="text-center">
                <div className="font-semibold">Depo Ayarları</div>
                <div className="text-xs text-slate-500">Konfigürasyon</div>
              </div>
            </Button>

            {/* Alerts */}
            <Button variant="outline" className="h-24 flex-col gap-2 bg-white/60 border-white/40 hover:bg-white/80">
              <AlertTriangle className="h-6 w-6" />
              <div className="text-center">
                <div className="font-semibold">Uyarı Merkezi</div>
                <div className="text-xs text-slate-500">Bildirimler</div>
              </div>
            </Button>
          </div>

          {/* Additional Tools */}
          <div className="mt-6 pt-6 border-t border-slate-200">
            <h4 className="font-semibold text-slate-800 mb-4">Gelişmiş Araçlar</h4>
            <div className="grid gap-3 md:grid-cols-3">
              <Button variant="ghost" className="justify-start h-12 bg-white/40 hover:bg-white/60">
                <Upload className="h-4 w-4 mr-3" />
                <div className="text-left">
                  <div className="font-medium">Toplu İçe Aktarım</div>
                  <div className="text-xs text-slate-500">Excel/CSV dosyası</div>
                </div>
              </Button>

              <Button variant="ghost" className="justify-start h-12 bg-white/40 hover:bg-white/60">
                <Calendar className="h-4 w-4 mr-3" />
                <div className="text-left">
                  <div className="font-medium">Planlı Sayım</div>
                  <div className="text-xs text-slate-500">Otomatik envanter</div>
                </div>
              </Button>

              <Button variant="ghost" className="justify-start h-12 bg-white/40 hover:bg-white/60">
                <Truck className="h-4 w-4 mr-3" />
                <div className="text-left">
                  <div className="font-medium">Sevkiyat Takip</div>
                  <div className="text-xs text-slate-500">Kargo entegrasyonu</div>
                </div>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
}