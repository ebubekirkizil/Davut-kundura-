"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  Area
} from "recharts"
import {
  Save,
  Globe,
  Mail,
  Shield,
  Bell,
  Palette,
  Database,
  Settings,
  Users,
  Key,
  Monitor,
  Cpu,
  HardDrive,
  Network,
  Activity,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Download,
  Upload,
  RefreshCw,
  Plus,
  Edit,
  Trash2,
  MoreVertical,
  Search,
  Filter,
  Calendar,
  MapPin,
  Building,
  Phone,
  Smartphone,
  Tablet,
  Monitor as MonitorIcon,
  Server,
  Cloud,
  Code,
  Layers,
  GitBranch,
  Package,
  Gauge,
  Target,
  Award,
  Star,
  DollarSign,
  Percent,
  Timer,
  FileText,
  Image,
  Video,
  Music,
  Archive,
  Folder,
  Link,
  ExternalLink,
  Copy,
  Share,
  Bookmark
} from "lucide-react"
import { toast } from "sonner"

// Mock system data - Enterprise Level
const systemStats = [
  {
    title: "Sistem Durumu",
    subtitle: "Genel Sağlık",
    value: "99.8%",
    change: "+0.2%",
    trend: "up",
    icon: Activity,
    color: "from-emerald-500 to-green-600",
    status: "healthy"
  },
  {
    title: "CPU Kullanımı",
    subtitle: "Ortalama Yük",
    value: "23.4%",
    change: "-5.2%",
    trend: "down",
    icon: Cpu,
    color: "from-blue-500 to-cyan-600",
    status: "normal"
  },
  {
    title: "Bellek Kullanımı",
    subtitle: "RAM Usage",
    value: "67.8%",
    change: "+2.1%",
    trend: "up",
    icon: HardDrive,
    color: "from-purple-500 to-violet-600",
    status: "normal"
  },
  {
    title: "Aktif Kullanıcılar",
    subtitle: "Son 24 Saat",
    value: "1,247",
    change: "+18.3%",
    trend: "up",
    icon: Users,
    color: "from-amber-500 to-orange-600",
    status: "high"
  },
  {
    title: "API İstekleri",
    subtitle: "Günlük Toplam",
    value: "89.2K",
    change: "+12.7%",
    trend: "up",
    icon: Network,
    color: "from-teal-500 to-cyan-600",
    status: "normal"
  },
  {
    title: "Güvenlik Skoru",
    subtitle: "Security Rating",
    value: "A+",
    change: "Stabil",
    trend: "up",
    icon: Shield,
    color: "from-rose-500 to-pink-600",
    status: "excellent"
  },
  {
    title: "Yedekleme Durumu",
    subtitle: "Son Yedek",
    value: "2 saat önce",
    change: "Başarılı",
    trend: "up",
    icon: Archive,
    color: "from-indigo-500 to-blue-600",
    status: "success"
  },
  {
    title: "Disk Kullanımı",
    subtitle: "Storage Usage",
    value: "45.2%",
    change: "+1.8%",
    trend: "up",
    icon: Server,
    color: "from-violet-500 to-purple-600",
    status: "normal"
  }
]

const performanceData = [
  { time: "00:00", cpu: 15, memory: 45, network: 23, requests: 1200 },
  { time: "04:00", cpu: 12, memory: 42, network: 18, requests: 890 },
  { time: "08:00", cpu: 28, memory: 58, network: 45, requests: 2340 },
  { time: "12:00", cpu: 35, memory: 72, network: 67, requests: 3450 },
  { time: "16:00", cpu: 42, memory: 78, network: 89, requests: 4120 },
  { time: "20:00", cpu: 38, memory: 65, network: 56, requests: 2890 },
  { time: "24:00", cpu: 23, memory: 52, network: 34, requests: 1780 }
]

const userRoles = [
  {
    id: "admin",
    name: "Sistem Yöneticisi",
    description: "Tam sistem erişimi ve yönetim yetkisi",
    users: 3,
    permissions: ["read", "write", "delete", "admin"],
    color: "bg-red-500",
    lastModified: "2026-05-01T10:30:00"
  },
  {
    id: "manager",
    name: "İşletme Müdürü",
    description: "Operasyonel yönetim ve raporlama yetkisi",
    users: 8,
    permissions: ["read", "write", "reports"],
    color: "bg-blue-500",
    lastModified: "2026-04-28T14:20:00"
  },
  {
    id: "employee",
    name: "Çalışan",
    description: "Temel işlem yetkisi ve sınırlı erişim",
    users: 24,
    permissions: ["read", "basic_write"],
    color: "bg-emerald-500",
    lastModified: "2026-04-25T09:15:00"
  },
  {
    id: "viewer",
    name: "Görüntüleyici",
    description: "Sadece okuma yetkisi",
    users: 12,
    permissions: ["read"],
    color: "bg-slate-500",
    lastModified: "2026-04-20T16:45:00"
  }
]

const apiEndpoints = [
  {
    endpoint: "/api/v1/products",
    method: "GET",
    requests: 45680,
    avgResponse: "120ms",
    status: "healthy",
    rateLimit: "1000/hour",
    lastUsed: "2 dakika önce"
  },
  {
    endpoint: "/api/v1/orders",
    method: "POST",
    requests: 12340,
    avgResponse: "340ms",
    status: "healthy",
    rateLimit: "500/hour",
    lastUsed: "5 dakika önce"
  },
  {
    endpoint: "/api/v1/customers",
    method: "GET",
    requests: 28920,
    avgResponse: "95ms",
    status: "healthy",
    rateLimit: "2000/hour",
    lastUsed: "1 dakika önce"
  },
  {
    endpoint: "/api/v1/analytics",
    method: "GET",
    requests: 8760,
    avgResponse: "580ms",
    status: "warning",
    rateLimit: "100/hour",
    lastUsed: "12 dakika önce"
  }
]

const integrations = [
  {
    name: "Stripe Payment Gateway",
    type: "payment",
    status: "connected",
    lastSync: "2026-05-06T10:30:00",
    version: "v2023.10.16",
    health: "excellent"
  },
  {
    name: "SendGrid Email Service",
    type: "email",
    status: "connected",
    lastSync: "2026-05-06T09:45:00",
    version: "v3.0",
    health: "good"
  },
  {
    name: "Google Analytics 4",
    type: "analytics",
    status: "connected",
    lastSync: "2026-05-06T10:15:00",
    version: "GA4",
    health: "excellent"
  },
  {
    name: "AWS S3 Storage",
    type: "storage",
    status: "connected",
    lastSync: "2026-05-06T10:25:00",
    version: "2023.11.09",
    health: "excellent"
  },
  {
    name: "Slack Notifications",
    type: "notification",
    status: "disconnected",
    lastSync: "2026-05-04T16:20:00",
    version: "v1.7",
    health: "warning"
  }
]

const securityLogs = [
  {
    id: "SEC001",
    type: "login_success",
    user: "admin@davutkundura.shop",
    ip: "192.168.1.100",
    location: "İstanbul, TR",
    timestamp: "2026-05-06T10:30:00",
    severity: "info"
  },
  {
    id: "SEC002",
    type: "failed_login",
    user: "unknown@example.com",
    ip: "45.123.45.67",
    location: "Unknown",
    timestamp: "2026-05-06T09:45:00",
    severity: "warning"
  },
  {
    id: "SEC003",
    type: "permission_change",
    user: "manager@davutkundura.shop",
    ip: "192.168.1.105",
    location: "İstanbul, TR",
    timestamp: "2026-05-06T08:20:00",
    severity: "medium"
  }
]

export default function AdminSettingsPage() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [selectedTab, setSelectedTab] = React.useState("overview")
  const [searchQuery, setSearchQuery] = React.useState("")

  const handleSave = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success("Ayarlar başarıyla kaydedildi!")
    } catch (error) {
      toast.error("Ayarlar kaydedilirken bir hata oluştu")
    } finally {
      setIsLoading(false)
    }
  }

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
      case 'healthy':
      case 'connected':
      case 'success':
      case 'excellent': return 'bg-emerald-500/10 text-emerald-700 border-emerald-200'
      case 'warning':
      case 'normal': return 'bg-amber-500/10 text-amber-700 border-amber-200'
      case 'error':
      case 'disconnected': return 'bg-red-500/10 text-red-700 border-red-200'
      case 'info': return 'bg-blue-500/10 text-blue-700 border-blue-200'
      case 'medium': return 'bg-purple-500/10 text-purple-700 border-purple-200'
      default: return 'bg-slate-500/10 text-slate-700 border-slate-200'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-serif font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent">
            Sistem Yönetimi
          </h1>
          <p className="text-slate-600 mt-2 text-lg">
            Gelişmiş sistem konfigürasyonu ve enterprise yönetim merkezi
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="bg-white/60 backdrop-blur-sm border-white/40 hover:bg-white/80">
            <Download className="h-4 w-4 mr-2" />
            Sistem Raporu
          </Button>
          <Button variant="outline" className="bg-white/60 backdrop-blur-sm border-white/40 hover:bg-white/80">
            <RefreshCw className="h-4 w-4 mr-2" />
            Yenile
          </Button>
          <Button onClick={handleSave} disabled={isLoading} className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white shadow-lg shadow-amber-500/25">
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? "Kaydediliyor..." : "Kaydet"}
          </Button>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-8">
        <div className="bg-white/60 backdrop-blur-sm border-white/40 shadow-xl shadow-slate-200/20 rounded-xl p-2">
          <TabsList className="grid w-full grid-cols-8 bg-transparent">
            <TabsTrigger value="overview" className="flex items-center gap-2 data-[state=active]:bg-white/80">
              <Monitor className="h-4 w-4" />
              Genel Bakış
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center gap-2 data-[state=active]:bg-white/80">
              <Settings className="h-4 w-4" />
              Sistem
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2 data-[state=active]:bg-white/80">
              <Shield className="h-4 w-4" />
              Güvenlik
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2 data-[state=active]:bg-white/80">
              <Users className="h-4 w-4" />
              Kullanıcılar
            </TabsTrigger>
            <TabsTrigger value="api" className="flex items-center gap-2 data-[state=active]:bg-white/80">
              <Code className="h-4 w-4" />
              API
            </TabsTrigger>
            <TabsTrigger value="integrations" className="flex items-center gap-2 data-[state=active]:bg-white/80">
              <Layers className="h-4 w-4" />
              Entegrasyonlar
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2 data-[state=active]:bg-white/80">
              <Bell className="h-4 w-4" />
              Bildirimler
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2 data-[state=active]:bg-white/80">
              <Palette className="h-4 w-4" />
              Görünüm
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-8">
          {/* System Stats */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {systemStats.map((stat, index) => (
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
                    <Badge className={`${getStatusColor(stat.status)} border text-xs`}>
                      {stat.status === 'healthy' ? 'Sağlıklı' :
                       stat.status === 'normal' ? 'Normal' :
                       stat.status === 'high' ? 'Yüksek' :
                       stat.status === 'excellent' ? 'Mükemmel' :
                       stat.status === 'success' ? 'Başarılı' : stat.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Performance Monitoring */}
          <Card className="bg-white/60 backdrop-blur-sm border-white/40 shadow-xl shadow-slate-200/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-semibold text-slate-800">Sistem Performansı</CardTitle>
                  <p className="text-sm text-slate-600 mt-1">Gerçek zamanlı sistem metrikleri ve kaynak kullanımı</p>
                </div>
                <div className="flex gap-2">
                  <Badge className="bg-emerald-500/10 text-emerald-700 border-emerald-200">
                    Canlı Veri
                  </Badge>
                  <Button variant="outline" className="bg-white/60 border-white/40 hover:bg-white/80">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Yenile
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorMemory" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorNetwork" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="time" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip
                    formatter={(value: any, name: any) => [
                      `${value}${name === 'requests' ? '' : '%'}`,
                      name === 'cpu' ? 'CPU' :
                      name === 'memory' ? 'Bellek' :
                      name === 'network' ? 'Ağ' : 'İstekler'
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
                    dataKey="cpu"
                    stroke="#3b82f6"
                    fill="url(#colorCpu)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="memory"
                    stroke="#8b5cf6"
                    fill="url(#colorMemory)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="network"
                    stroke="#10b981"
                    fill="url(#colorNetwork)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>

              <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
                  <p className="text-2xl font-bold text-blue-600">23.4%</p>
                  <p className="text-sm text-slate-600">Ortalama CPU</p>
                  <p className="text-xs text-blue-600">Normal seviye</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl">
                  <p className="text-2xl font-bold text-purple-600">67.8%</p>
                  <p className="text-sm text-slate-600">Bellek Kullanımı</p>
                  <p className="text-xs text-purple-600">Kabul edilebilir</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl">
                  <p className="text-2xl font-bold text-emerald-600">45.2%</p>
                  <p className="text-sm text-slate-600">Ağ Kullanımı</p>
                  <p className="text-xs text-emerald-600">Optimal</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl">
                  <p className="text-2xl font-bold text-amber-600">2.8K</p>
                  <p className="text-sm text-slate-600">Ortalama İstek</p>
                  <p className="text-xs text-amber-600">Saatlik</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Security Events */}
          <Card className="bg-white/60 backdrop-blur-sm border-white/40 shadow-xl shadow-slate-200/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-semibold text-slate-800">Son Güvenlik Olayları</CardTitle>
                  <p className="text-sm text-slate-600 mt-1">Sistem güvenlik logları ve uyarılar</p>
                </div>
                <Button variant="outline" className="bg-white/60 border-white/40 hover:bg-white/80">
                  <Eye className="h-4 w-4 mr-2" />
                  Tüm Logları Görüntüle
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {securityLogs.slice(0, 5).map((log) => (
                  <div key={log.id} className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-white/50 to-white/30 border border-white/40 hover:from-white/70 hover:to-white/50 transition-all duration-200">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${
                        log.severity === 'info' ? 'bg-blue-500' :
                        log.severity === 'warning' ? 'bg-amber-500' :
                        log.severity === 'medium' ? 'bg-purple-500' :
                        'bg-red-500'
                      }`}>
                        <Shield className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">
                          {log.type === 'login_success' ? 'Başarılı Giriş' :
                           log.type === 'failed_login' ? 'Başarısız Giriş' :
                           log.type === 'permission_change' ? 'Yetki Değişikliği' : log.type}
                        </p>
                        <p className="text-sm text-slate-600">{log.user} • {log.ip}</p>
                        <p className="text-xs text-slate-500">{log.location} • {formatDate(log.timestamp)}</p>
                      </div>
                    </div>
                    <Badge className={`${getStatusColor(log.severity)} border`}>
                      {log.severity === 'info' ? 'Bilgi' :
                       log.severity === 'warning' ? 'Uyarı' :
                       log.severity === 'medium' ? 'Orta' : 'Yüksek'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-8">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Security Settings */}
            <Card className="bg-white/60 backdrop-blur-sm border-white/40 shadow-xl shadow-slate-200/20">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-slate-800">Güvenlik Ayarları</CardTitle>
                <p className="text-sm text-slate-600">Sistem güvenlik konfigürasyonları</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-white/50 to-white/30 border border-white/40">
                  <div>
                    <Label className="font-semibold text-slate-800">İki Faktörlü Kimlik Doğrulama</Label>
                    <p className="text-sm text-slate-600">Admin hesapları için 2FA zorunlu kıl</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-white/50 to-white/30 border border-white/40">
                  <div>
                    <Label className="font-semibold text-slate-800">Güçlü Şifre Zorunluluğu</Label>
                    <p className="text-sm text-slate-600">Minimum 8 karakter, büyük/küçük harf, sayı</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-white/50 to-white/30 border border-white/40">
                  <div>
                    <Label className="font-semibold text-slate-800">Oturum Zaman Aşımı</Label>
                    <p className="text-sm text-slate-600">Hareketsizlik durumunda otomatik çıkış</p>
                  </div>
                  <Select defaultValue="30">
                    <SelectTrigger className="w-32 bg-white/60 border-white/40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 dakika</SelectItem>
                      <SelectItem value="30">30 dakika</SelectItem>
                      <SelectItem value="60">1 saat</SelectItem>
                      <SelectItem value="120">2 saat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-white/50 to-white/30 border border-white/40">
                  <div>
                    <Label className="font-semibold text-slate-800">IP Kısıtlaması</Label>
                    <p className="text-sm text-slate-600">Admin paneline erişimi belirli IP'lerle sınırla</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-white/50 to-white/30 border border-white/40">
                  <div>
                    <Label className="font-semibold text-slate-800">Brute Force Koruması</Label>
                    <p className="text-sm text-slate-600">Başarısız giriş denemelerini engelle</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            {/* Backup Settings */}
            <Card className="bg-white/60 backdrop-blur-sm border-white/40 shadow-xl shadow-slate-200/20">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-slate-800">Yedekleme Ayarları</CardTitle>
                <p className="text-sm text-slate-600">Otomatik yedekleme ve geri yükleme</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-white/50 to-white/30 border border-white/40">
                  <div>
                    <Label className="font-semibold text-slate-800">Otomatik Yedekleme</Label>
                    <p className="text-sm text-slate-600">Veritabanı ve dosyaların otomatik yedeklenmesi</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-r from-white/50 to-white/30 border border-white/40">
                  <Label htmlFor="backupFrequency" className="font-semibold text-slate-800">Yedekleme Sıklığı</Label>
                  <Select defaultValue="daily">
                    <SelectTrigger className="mt-2 bg-white/60 border-white/40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Saatlik</SelectItem>
                      <SelectItem value="daily">Günlük</SelectItem>
                      <SelectItem value="weekly">Haftalık</SelectItem>
                      <SelectItem value="monthly">Aylık</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-r from-white/50 to-white/30 border border-white/40">
                  <Label htmlFor="retentionPeriod" className="font-semibold text-slate-800">Saklama Süresi</Label>
                  <Select defaultValue="30">
                    <SelectTrigger className="mt-2 bg-white/60 border-white/40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7 gün</SelectItem>
                      <SelectItem value="30">30 gün</SelectItem>
                      <SelectItem value="90">90 gün</SelectItem>
                      <SelectItem value="365">1 yıl</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 bg-white/60 border-white/40 hover:bg-white/80">
                    <Download className="h-4 w-4 mr-2" />
                    Manuel Yedek Al
                  </Button>
                  <Button variant="outline" className="flex-1 bg-white/60 border-white/40 hover:bg-white/80">
                    <Upload className="h-4 w-4 mr-2" />
                    Geri Yükle
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-8">
          {/* User Roles Management */}
          <Card className="bg-white/60 backdrop-blur-sm border-white/40 shadow-xl shadow-slate-200/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-semibold text-slate-800">Kullanıcı Rolleri</CardTitle>
                  <p className="text-sm text-slate-600 mt-1">Sistem erişim yetkilerini ve kullanıcı rollerini yönetin</p>
                </div>
                <Button className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white shadow-lg shadow-amber-500/25">
                  <Plus className="h-4 w-4 mr-2" />
                  Yeni Rol Ekle
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                {userRoles.map((role) => (
                  <div key={role.id} className="p-6 rounded-xl bg-gradient-to-br from-white/50 to-white/30 border border-white/40 hover:from-white/70 hover:to-white/50 transition-all duration-200 group">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl ${role.color} flex items-center justify-center shadow-lg`}>
                          <Users className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-800 group-hover:text-amber-600 transition-colors">
                            {role.name}
                          </h3>
                          <p className="text-sm text-slate-600">{role.description}</p>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white/95 backdrop-blur-sm border-white/40">
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Düzenle
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="h-4 w-4 mr-2" />
                            Kopyala
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600 focus:text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Sil
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">Kullanıcı Sayısı</span>
                        <span className="text-lg font-bold text-slate-800">{role.users}</span>
                      </div>

                      <div>
                        <span className="text-sm text-slate-600 mb-2 block">Yetkiler</span>
                        <div className="flex flex-wrap gap-1">
                          {role.permissions.map((permission, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {permission === 'read' ? 'Okuma' :
                               permission === 'write' ? 'Yazma' :
                               permission === 'delete' ? 'Silme' :
                               permission === 'admin' ? 'Yönetici' :
                               permission === 'reports' ? 'Raporlar' :
                               permission === 'basic_write' ? 'Temel Yazma' : permission}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-200">
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span>Son Güncelleme:</span>
                          <span>{formatDate(role.lastModified)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* User Management */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="bg-white/60 backdrop-blur-sm border-white/40 shadow-xl shadow-slate-200/20">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-slate-800">Kullanıcı Yönetimi</CardTitle>
                <p className="text-sm text-slate-600">Aktif kullanıcılar ve oturum yönetimi</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-white/50 to-white/30 border border-white/40">
                  <div>
                    <Label className="font-semibold text-slate-800">Yeni Kullanıcı Kaydı</Label>
                    <p className="text-sm text-slate-600">Yeni kullanıcıların sisteme kaydolmasına izin ver</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-white/50 to-white/30 border border-white/40">
                  <div>
                    <Label className="font-semibold text-slate-800">Email Doğrulaması</Label>
                    <p className="text-sm text-slate-600">Yeni hesaplar için email doğrulaması zorunlu</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-white/50 to-white/30 border border-white/40">
                  <div>
                    <Label className="font-semibold text-slate-800">Çoklu Oturum</Label>
                    <p className="text-sm text-slate-600">Aynı kullanıcının birden fazla cihazda oturum açması</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-r from-white/50 to-white/30 border border-white/40">
                  <Label className="font-semibold text-slate-800">Varsayılan Rol</Label>
                  <Select defaultValue="viewer">
                    <SelectTrigger className="mt-2 bg-white/60 border-white/40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="viewer">Görüntüleyici</SelectItem>
                      <SelectItem value="employee">Çalışan</SelectItem>
                      <SelectItem value="manager">Müdür</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/60 backdrop-blur-sm border-white/40 shadow-xl shadow-slate-200/20">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-slate-800">Oturum Ayarları</CardTitle>
                <p className="text-sm text-slate-600">Kullanıcı oturumları ve güvenlik</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 rounded-xl bg-gradient-to-r from-white/50 to-white/30 border border-white/40">
                  <Label className="font-semibold text-slate-800">Maksimum Oturum Süresi</Label>
                  <Select defaultValue="24">
                    <SelectTrigger className="mt-2 bg-white/60 border-white/40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 saat</SelectItem>
                      <SelectItem value="8">8 saat</SelectItem>
                      <SelectItem value="24">24 saat</SelectItem>
                      <SelectItem value="168">1 hafta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-r from-white/50 to-white/30 border border-white/40">
                  <Label className="font-semibold text-slate-800">Başarısız Giriş Limiti</Label>
                  <Input type="number" defaultValue="5" className="mt-2 bg-white/60 border-white/40 focus:bg-white/80" />
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-r from-white/50 to-white/30 border border-white/40">
                  <Label className="font-semibold text-slate-800">Hesap Kilitleme Süresi</Label>
                  <Select defaultValue="30">
                    <SelectTrigger className="mt-2 bg-white/60 border-white/40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 dakika</SelectItem>
                      <SelectItem value="30">30 dakika</SelectItem>
                      <SelectItem value="60">1 saat</SelectItem>
                      <SelectItem value="1440">24 saat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button variant="outline" className="w-full bg-red-50 border-red-200 hover:bg-red-100 text-red-700">
                  <Users className="h-4 w-4 mr-2" />
                  Tüm Oturumları Sonlandır
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* API Tab */}
        <TabsContent value="api" className="space-y-8">
          {/* API Endpoints */}
          <Card className="bg-white/60 backdrop-blur-sm border-white/40 shadow-xl shadow-slate-200/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-semibold text-slate-800">API Endpoint Yönetimi</CardTitle>
                  <p className="text-sm text-slate-600 mt-1">REST API endpoint'leri ve performans metrikleri</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="bg-white/60 border-white/40 hover:bg-white/80">
                    <FileText className="h-4 w-4 mr-2" />
                    API Dokümantasyonu
                  </Button>
                  <Button className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white shadow-lg shadow-amber-500/25">
                    <Plus className="h-4 w-4 mr-2" />
                    Yeni Endpoint
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {apiEndpoints.map((endpoint, index) => (
                  <div key={index} className="p-6 rounded-xl bg-gradient-to-r from-white/50 to-white/30 border border-white/40 hover:from-white/70 hover:to-white/50 transition-all duration-200 group">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                          endpoint.method === 'GET' ? 'bg-blue-500 text-white' :
                          endpoint.method === 'POST' ? 'bg-emerald-500 text-white' :
                          endpoint.method === 'PUT' ? 'bg-amber-500 text-white' :
                          'bg-red-500 text-white'
                        }`}>
                          {endpoint.method}
                        </div>
                        <div>
                          <p className="font-mono text-slate-800 font-semibold">{endpoint.endpoint}</p>
                          <p className="text-sm text-slate-600">Son kullanım: {endpoint.lastUsed}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={`${getStatusColor(endpoint.status)} border`}>
                          {endpoint.status === 'healthy' ? 'Sağlıklı' :
                           endpoint.status === 'warning' ? 'Uyarı' : 'Hata'}
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-white/95 backdrop-blur-sm border-white/40">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              Detayları Görüntüle
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Düzenle
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Activity className="h-4 w-4 mr-2" />
                              Logları Görüntüle
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-slate-50/50 rounded-lg">
                        <p className="text-lg font-bold text-blue-600">{endpoint.requests.toLocaleString()}</p>
                        <p className="text-xs text-slate-500">Toplam İstek</p>
                      </div>
                      <div className="text-center p-3 bg-slate-50/50 rounded-lg">
                        <p className="text-lg font-bold text-emerald-600">{endpoint.avgResponse}</p>
                        <p className="text-xs text-slate-500">Ortalama Yanıt</p>
                      </div>
                      <div className="text-center p-3 bg-slate-50/50 rounded-lg">
                        <p className="text-lg font-bold text-purple-600">{endpoint.rateLimit}</p>
                        <p className="text-xs text-slate-500">Rate Limit</p>
                      </div>
                      <div className="text-center p-3 bg-slate-50/50 rounded-lg">
                        <p className={`text-lg font-bold ${
                          endpoint.status === 'healthy' ? 'text-emerald-600' :
                          endpoint.status === 'warning' ? 'text-amber-600' : 'text-red-600'
                        }`}>
                          {endpoint.status === 'healthy' ? '99.9%' :
                           endpoint.status === 'warning' ? '95.2%' : '87.1%'}
                        </p>
                        <p className="text-xs text-slate-500">Uptime</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* API Configuration */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="bg-white/60 backdrop-blur-sm border-white/40 shadow-xl shadow-slate-200/20">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-slate-800">API Konfigürasyonu</CardTitle>
                <p className="text-sm text-slate-600">Genel API ayarları ve güvenlik</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 rounded-xl bg-gradient-to-r from-white/50 to-white/30 border border-white/40">
                  <Label className="font-semibold text-slate-800">API Versiyonu</Label>
                  <Select defaultValue="v1">
                    <SelectTrigger className="mt-2 bg-white/60 border-white/40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="v1">v1 (Mevcut)</SelectItem>
                      <SelectItem value="v2">v2 (Beta)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-white/50 to-white/30 border border-white/40">
                  <div>
                    <Label className="font-semibold text-slate-800">CORS Koruması</Label>
                    <p className="text-sm text-slate-600">Cross-Origin Resource Sharing güvenliği</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-white/50 to-white/30 border border-white/40">
                  <div>
                    <Label className="font-semibold text-slate-800">Rate Limiting</Label>
                    <p className="text-sm text-slate-600">İstek hızı sınırlaması aktif</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-r from-white/50 to-white/30 border border-white/40">
                  <Label className="font-semibold text-slate-800">Varsayılan Rate Limit</Label>
                  <Input type="number" defaultValue="1000" className="mt-2 bg-white/60 border-white/40 focus:bg-white/80" />
                  <p className="text-xs text-slate-500 mt-1">İstek/saat</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/60 backdrop-blur-sm border-white/40 shadow-xl shadow-slate-200/20">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-slate-800">API Anahtarları</CardTitle>
                <p className="text-sm text-slate-600">API erişim anahtarları yönetimi</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 rounded-xl bg-gradient-to-r from-white/50 to-white/30 border border-white/40">
                  <div className="flex items-center justify-between mb-3">
                    <Label className="font-semibold text-slate-800">Master API Key</Label>
                    <Badge className="bg-emerald-500/10 text-emerald-700 border-emerald-200">Aktif</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      type="password"
                      defaultValue="sk_live_51H7..."
                      className="bg-white/60 border-white/40 focus:bg-white/80 font-mono"
                      readOnly
                    />
                    <Button variant="outline" size="sm" className="bg-white/60 border-white/40 hover:bg-white/80">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-r from-white/50 to-white/30 border border-white/40">
                  <div className="flex items-center justify-between mb-3">
                    <Label className="font-semibold text-slate-800">Webhook Secret</Label>
                    <Badge className="bg-blue-500/10 text-blue-700 border-blue-200">Yapılandırıldı</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      type="password"
                      defaultValue="whsec_1a2b3c..."
                      className="bg-white/60 border-white/40 focus:bg-white/80 font-mono"
                      readOnly
                    />
                    <Button variant="outline" size="sm" className="bg-white/60 border-white/40 hover:bg-white/80">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white">
                  <Key className="h-4 w-4 mr-2" />
                  Yeni API Anahtarı Oluştur
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Integrations Tab */}
        <TabsContent value="integrations" className="space-y-8">
          <Card className="bg-white/60 backdrop-blur-sm border-white/40 shadow-xl shadow-slate-200/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-semibold text-slate-800">Üçüncü Taraf Entegrasyonlar</CardTitle>
                  <p className="text-sm text-slate-600 mt-1">Harici servisler ve API bağlantıları</p>
                </div>
                <Button className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white shadow-lg shadow-amber-500/25">
                  <Plus className="h-4 w-4 mr-2" />
                  Yeni Entegrasyon
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                {integrations.map((integration, index) => (
                  <div key={index} className="p-6 rounded-xl bg-gradient-to-br from-white/50 to-white/30 border border-white/40 hover:from-white/70 hover:to-white/50 transition-all duration-200 group">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${
                          integration.type === 'payment' ? 'bg-gradient-to-br from-blue-500 to-cyan-600' :
                          integration.type === 'email' ? 'bg-gradient-to-br from-emerald-500 to-green-600' :
                          integration.type === 'analytics' ? 'bg-gradient-to-br from-purple-500 to-violet-600' :
                          integration.type === 'storage' ? 'bg-gradient-to-br from-amber-500 to-orange-600' :
                          'bg-gradient-to-br from-slate-500 to-gray-600'
                        }`}>
                          {integration.type === 'payment' ? <DollarSign className="h-6 w-6 text-white" /> :
                           integration.type === 'email' ? <Mail className="h-6 w-6 text-white" /> :
                           integration.type === 'analytics' ? <Target className="h-6 w-6 text-white" /> :
                           integration.type === 'storage' ? <Cloud className="h-6 w-6 text-white" /> :
                           <Bell className="h-6 w-6 text-white" />}
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-800 group-hover:text-amber-600 transition-colors">
                            {integration.name}
                          </h3>
                          <p className="text-sm text-slate-600 capitalize">{integration.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={`${getStatusColor(integration.status)} border`}>
                          {integration.status === 'connected' ? 'Bağlı' : 'Bağlantısız'}
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-white/95 backdrop-blur-sm border-white/40">
                            <DropdownMenuItem>
                              <Settings className="h-4 w-4 mr-2" />
                              Yapılandır
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <RefreshCw className="h-4 w-4 mr-2" />
                              Yeniden Bağlan
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Activity className="h-4 w-4 mr-2" />
                              Logları Görüntüle
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600 focus:text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Bağlantıyı Kes
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-slate-600">Versiyon:</span>
                          <span className="ml-2 font-semibold text-slate-800">{integration.version}</span>
                        </div>
                        <div>
                          <span className="text-slate-600">Sağlık:</span>
                          <Badge className={`ml-2 ${getStatusColor(integration.health)} border text-xs`}>
                            {integration.health === 'excellent' ? 'Mükemmel' :
                             integration.health === 'good' ? 'İyi' :
                             integration.health === 'warning' ? 'Uyarı' : 'Hata'}
                          </Badge>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-200">
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span>Son Senkronizasyon:</span>
                          <span>{formatDate(integration.lastSync)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="bg-white/60 backdrop-blur-sm border-white/40 shadow-xl shadow-slate-200/20">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-slate-800">Sistem Bildirimleri</CardTitle>
                <p className="text-sm text-slate-600">Otomatik uyarılar ve bildirim ayarları</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-white/50 to-white/30 border border-white/40">
                  <div>
                    <Label className="font-semibold text-slate-800">Email Bildirimleri</Label>
                    <p className="text-sm text-slate-600">Sistem olayları için email gönder</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-white/50 to-white/30 border border-white/40">
                  <div>
                    <Label className="font-semibold text-slate-800">Güvenlik Uyarıları</Label>
                    <p className="text-sm text-slate-600">Şüpheli aktiviteler için anında bildirim</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-white/50 to-white/30 border border-white/40">
                  <div>
                    <Label className="font-semibold text-slate-800">Performans Uyarıları</Label>
                    <p className="text-sm text-slate-600">Sistem performansı düştüğünde uyar</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-white/50 to-white/30 border border-white/40">
                  <div>
                    <Label className="font-semibold text-slate-800">Yedekleme Bildirimleri</Label>
                    <p className="text-sm text-slate-600">Yedekleme durumu hakkında bilgi ver</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-r from-white/50 to-white/30 border border-white/40">
                  <Label className="font-semibold text-slate-800">Bildirim Email Adresi</Label>
                  <Input
                    type="email"
                    defaultValue="admin@davutkundura.shop"
                    className="mt-2 bg-white/60 border-white/40 focus:bg-white/80"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/60 backdrop-blur-sm border-white/40 shadow-xl shadow-slate-200/20">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-slate-800">Slack Entegrasyonu</CardTitle>
                <p className="text-sm text-slate-600">Slack kanalına bildirim gönderimi</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-white/50 to-white/30 border border-white/40">
                  <div>
                    <Label className="font-semibold text-slate-800">Slack Bildirimleri</Label>
                    <p className="text-sm text-slate-600">Slack kanalına otomatik mesaj gönder</p>
                  </div>
                  <Switch />
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-r from-white/50 to-white/30 border border-white/40">
                  <Label className="font-semibold text-slate-800">Webhook URL</Label>
                  <Input
                    type="url"
                    placeholder="https://hooks.slack.com/services/..."
                    className="mt-2 bg-white/60 border-white/40 focus:bg-white/80"
                  />
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-r from-white/50 to-white/30 border border-white/40">
                  <Label className="font-semibold text-slate-800">Kanal Adı</Label>
                  <Input
                    type="text"
                    placeholder="#sistem-uyarilari"
                    className="mt-2 bg-white/60 border-white/40 focus:bg-white/80"
                  />
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-r from-white/50 to-white/30 border border-white/40">
                  <Label className="font-semibold text-slate-800">Bildirim Seviyesi</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger className="mt-2 bg-white/60 border-white/40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tüm Bildirimler</SelectItem>
                      <SelectItem value="medium">Orta ve Yüksek Seviye</SelectItem>
                      <SelectItem value="high">Sadece Yüksek Seviye</SelectItem>
                      <SelectItem value="critical">Sadece Kritik</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button variant="outline" className="w-full bg-white/60 border-white/40 hover:bg-white/80">
                  <Bell className="h-4 w-4 mr-2" />
                  Test Bildirimi Gönder
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value="appearance" className="space-y-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="bg-white/60 backdrop-blur-sm border-white/40 shadow-xl shadow-slate-200/20">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-slate-800">Tema Ayarları</CardTitle>
                <p className="text-sm text-slate-600">Arayüz görünümü ve tema konfigürasyonu</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 rounded-xl bg-gradient-to-r from-white/50 to-white/30 border border-white/40">
                  <Label className="font-semibold text-slate-800">Tema Modu</Label>
                  <Select defaultValue="light">
                    <SelectTrigger className="mt-2 bg-white/60 border-white/40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Açık Tema</SelectItem>
                      <SelectItem value="dark">Koyu Tema</SelectItem>
                      <SelectItem value="auto">Otomatik</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-r from-white/50 to-white/30 border border-white/40">
                  <Label className="font-semibold text-slate-800">Ana Renk Paleti</Label>
                  <div className="mt-3 grid grid-cols-4 gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 cursor-pointer border-2 border-amber-400 shadow-lg"></div>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 cursor-pointer border-2 border-transparent hover:border-blue-400 shadow-lg"></div>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 cursor-pointer border-2 border-transparent hover:border-emerald-400 shadow-lg"></div>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 cursor-pointer border-2 border-transparent hover:border-purple-400 shadow-lg"></div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-white/50 to-white/30 border border-white/40">
                  <div>
                    <Label className="font-semibold text-slate-800">Glass Morphism Efekti</Label>
                    <p className="text-sm text-slate-600">Cam efekti ve bulanıklık</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-white/50 to-white/30 border border-white/40">
                  <div>
                    <Label className="font-semibold text-slate-800">Animasyonlar</Label>
                    <p className="text-sm text-slate-600">Geçiş animasyonları ve efektler</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-r from-white/50 to-white/30 border border-white/40">
                  <Label className="font-semibold text-slate-800">Sidebar Genişliği</Label>
                  <Select defaultValue="normal">
                    <SelectTrigger className="mt-2 bg-white/60 border-white/40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="compact">Kompakt</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="wide">Geniş</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/60 backdrop-blur-sm border-white/40 shadow-xl shadow-slate-200/20">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-slate-800">Logo ve Branding</CardTitle>
                <p className="text-sm text-slate-600">Şirket logosu ve marka ayarları</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 rounded-xl bg-gradient-to-r from-white/50 to-white/30 border border-white/40">
                  <Label className="font-semibold text-slate-800">Şirket Logosu</Label>
                  <div className="mt-3 flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center shadow-lg">
                      <Building className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <Button variant="outline" className="bg-white/60 border-white/40 hover:bg-white/80">
                        <Upload className="h-4 w-4 mr-2" />
                        Logo Yükle
                      </Button>
                      <p className="text-xs text-slate-500 mt-1">PNG, JPG veya SVG (max 2MB)</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-r from-white/50 to-white/30 border border-white/40">
                  <Label className="font-semibold text-slate-800">Şirket Adı</Label>
                  <Input
                    type="text"
                    defaultValue="Davut Kundura"
                    className="mt-2 bg-white/60 border-white/40 focus:bg-white/80"
                  />
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-r from-white/50 to-white/30 border border-white/40">
                  <Label className="font-semibold text-slate-800">Favicon</Label>
                  <div className="mt-3 flex items-center gap-4">
                    <div className="w-8 h-8 rounded bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center shadow">
                      <Building className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <Button variant="outline" size="sm" className="bg-white/60 border-white/40 hover:bg-white/80">
                        <Upload className="h-3 w-3 mr-2" />
                        Favicon Yükle
                      </Button>
                      <p className="text-xs text-slate-500 mt-1">ICO veya PNG (32x32px)</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-r from-white/50 to-white/30 border border-white/40">
                  <Label className="font-semibold text-slate-800">Meta Açıklama</Label>
                  <Textarea
                    defaultValue="Davut Kundura - Premium ayakkabı ve deri ürünleri üreticisi. Kaliteli el yapımı ayakkabılar."
                    className="mt-2 bg-white/60 border-white/40 focus:bg-white/80 resize-none"
                    rows={3}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-white/50 to-white/30 border border-white/40">
                  <div>
                    <Label className="font-semibold text-slate-800">Watermark</Label>
                    <p className="text-sm text-slate-600">Ürün resimlerine logo ekle</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>