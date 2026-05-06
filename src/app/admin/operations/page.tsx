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
  ComposedChart,
} from "recharts"
import {
  Settings,
  Target,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  MoreVertical,
  BarChart3,
  Activity,
  Zap,
  Shield,
  Workflow,
  FileText,
  Calendar,
  MapPin,
  Building,
  Truck,
  Factory,
  Gauge,
  Award,
  AlertCircle,
  PlayCircle,
  PauseCircle,
  StopCircle,
  RefreshCw,
  Download,
  Upload,
  Bell,
  Star,
  Briefcase,
  ClipboardList,
  Timer,
  DollarSign,
  Percent,
  ArrowUpRight,
  ArrowDownRight,
  Layers,
  Network,
  Cpu,
  Database,
  Globe
} from "lucide-react"

// Mock operations data - Enterprise Level
const operationsStats = [
  {
    title: "Aktif Projeler",
    subtitle: "Devam Eden İşler",
    value: "47",
    change: "+8.3%",
    trend: "up",
    icon: Briefcase,
    color: "from-blue-500 to-cyan-600",
    target: "50",
    progress: 94
  },
  {
    title: "Operasyonel Verimlilik",
    subtitle: "Genel Performans",
    value: "94.2%",
    change: "+2.8%",
    trend: "up",
    icon: Gauge,
    color: "from-emerald-500 to-green-600",
    target: "95%",
    progress: 99.2
  },
  {
    title: "Kalite Skoru",
    subtitle: "QC Ortalaması",
    value: "98.7%",
    change: "+1.2%",
    trend: "up",
    icon: Award,
    color: "from-purple-500 to-violet-600",
    target: "99%",
    progress: 99.7
  },
  {
    title: "Risk Seviyesi",
    subtitle: "Toplam Risk",
    value: "Düşük",
    change: "-15.4%",
    trend: "down",
    icon: Shield,
    color: "from-amber-500 to-orange-600",
    target: "Minimal",
    progress: 85
  },
  {
    title: "Kaynak Kullanımı",
    subtitle: "Kapasite Oranı",
    value: "87.5%",
    change: "+5.7%",
    trend: "up",
    icon: Cpu,
    color: "from-indigo-500 to-blue-600",
    target: "90%",
    progress: 97.2
  },
  {
    title: "Müşteri Memnuniyeti",
    subtitle: "NPS Skoru",
    value: "8.9/10",
    change: "+0.4",
    trend: "up",
    icon: Star,
    color: "from-rose-500 to-pink-600",
    target: "9.0",
    progress: 98.9
  },
  {
    title: "Tedarik Zinciri",
    subtitle: "Güvenilirlik",
    value: "96.3%",
    change: "+3.1%",
    trend: "up",
    icon: Network,
    color: "from-teal-500 to-cyan-600",
    target: "98%",
    progress: 98.3
  },
  {
    title: "Otomasyon Oranı",
    subtitle: "Dijitalleşme",
    value: "78.4%",
    change: "+12.6%",
    trend: "up",
    icon: Workflow,
    color: "from-violet-500 to-purple-600",
    target: "85%",
    progress: 92.2
  }
]

const activeProjects = [
  {
    id: "PRJ001",
    name: "E-Ticaret Platform Yenileme",
    manager: "Ahmet Yılmaz",
    team: 8,
    progress: 78,
    status: "on-track",
    priority: "high",
    startDate: "2026-03-15",
    endDate: "2026-06-30",
    budget: 450000,
    spent: 312000,
    phase: "Development",
    risks: 2,
    milestones: { completed: 7, total: 12 },
    category: "Technology"
  },
  {
    id: "PRJ002",
    name: "Yeni Depo Açılışı - Antalya",
    manager: "Zeynep Kaya",
    team: 12,
    progress: 45,
    status: "at-risk",
    priority: "high",
    startDate: "2026-02-01",
    endDate: "2026-08-15",
    budget: 2800000,
    spent: 1260000,
    phase: "Construction",
    risks: 4,
    milestones: { completed: 3, total: 8 },
    category: "Infrastructure"
  },
  {
    id: "PRJ003",
    name: "ISO 27001 Sertifikasyon",
    manager: "Can Demir",
    team: 6,
    progress: 92,
    status: "on-track",
    priority: "medium",
    startDate: "2026-01-10",
    endDate: "2026-05-20",
    budget: 180000,
    spent: 165600,
    phase: "Audit",
    risks: 1,
    milestones: { completed: 11, total: 12 },
    category: "Compliance"
  },
  {
    id: "PRJ004",
    name: "Müşteri Deneyimi İyileştirme",
    manager: "Fatma Özkan",
    team: 10,
    progress: 34,
    status: "delayed",
    priority: "medium",
    startDate: "2026-04-01",
    endDate: "2026-09-30",
    budget: 320000,
    spent: 89600,
    phase: "Research",
    risks: 3,
    milestones: { completed: 2, total: 10 },
    category: "Customer Experience"
  }
]

const kpiMetrics = [
  {
    category: "Operasyonel",
    metrics: [
      { name: "Üretim Verimliliği", value: "94.2%", target: "95%", trend: "up", change: "+2.8%" },
      { name: "Kalite Oranı", value: "98.7%", target: "99%", trend: "up", change: "+1.2%" },
      { name: "Teslimat Zamanında", value: "96.8%", target: "98%", trend: "up", change: "+0.9%" },
      { name: "Stok Devir Hızı", value: "4.2x", target: "5.0x", trend: "up", change: "+0.3x" }
    ]
  },
  {
    category: "Finansal",
    metrics: [
      { name: "Kar Marjı", value: "23.4%", target: "25%", trend: "up", change: "+1.8%" },
      { name: "ROI", value: "18.7%", target: "20%", trend: "up", change: "+2.1%" },
      { name: "Nakit Akışı", value: "₺2.8M", target: "₺3M", trend: "up", change: "+12%" },
      { name: "Maliyet Kontrolü", value: "97.2%", target: "98%", trend: "up", change: "+0.5%" }
    ]
  },
  {
    category: "Müşteri",
    metrics: [
      { name: "Memnuniyet Skoru", value: "8.9/10", target: "9.0/10", trend: "up", change: "+0.4" },
      { name: "Şikayet Çözüm", value: "94.5%", target: "96%", trend: "up", change: "+2.1%" },
      { name: "Müşteri Elde Tutma", value: "89.3%", target: "92%", trend: "up", change: "+1.7%" },
      { name: "Ortalama Sipariş", value: "₺847", target: "₺900", trend: "up", change: "+₺23" }
    ]
  }
]

const riskAssessments = [
  {
    id: "RISK001",
    title: "Tedarik Zinciri Kesintisi",
    category: "Supply Chain",
    probability: "Medium",
    impact: "High",
    riskLevel: "High",
    status: "monitoring",
    owner: "Ahmet Yılmaz",
    mitigation: "Alternatif tedarikçiler belirlendi",
    lastReview: "2026-05-03",
    nextReview: "2026-05-17"
  },
  {
    id: "RISK002",
    title: "Siber Güvenlik Tehdidi",
    category: "Technology",
    probability: "Low",
    impact: "Very High",
    riskLevel: "Medium",
    status: "mitigated",
    owner: "Can Demir",
    mitigation: "Güvenlik duvarı ve monitoring sistemi aktif",
    lastReview: "2026-05-01",
    nextReview: "2026-05-15"
  },
  {
    id: "RISK003",
    title: "Personel Devir Hızı",
    category: "Human Resources",
    probability: "Medium",
    impact: "Medium",
    riskLevel: "Medium",
    status: "active",
    owner: "Fatma Özkan",
    mitigation: "Çalışan memnuniyeti programları başlatıldı",
    lastReview: "2026-04-28",
    nextReview: "2026-05-12"
  }
]

const workflowAutomations = [
  {
    id: "WF001",
    name: "Sipariş İşleme Otomasyonu",
    description: "Sipariş onayından sevkiyata kadar otomatik süreç",
    status: "active",
    efficiency: "94%",
    timeSaved: "12 saat/gün",
    lastRun: "2026-05-06T10:30:00",
    totalRuns: 1247,
    successRate: "99.2%"
  },
  {
    id: "WF002",
    name: "Stok Yenileme Sistemi",
    description: "Düşük stok uyarısı ve otomatik sipariş oluşturma",
    status: "active",
    efficiency: "87%",
    timeSaved: "8 saat/gün",
    lastRun: "2026-05-06T09:15:00",
    totalRuns: 892,
    successRate: "96.8%"
  },
  {
    id: "WF003",
    name: "Müşteri Destek Ticket Yönlendirme",
    description: "Gelen taleplerin otomatik kategorizasyon ve yönlendirme",
    status: "maintenance",
    efficiency: "91%",
    timeSaved: "6 saat/gün",
    lastRun: "2026-05-05T16:45:00",
    totalRuns: 2156,
    successRate: "94.5%"
  }
]

const performanceData = [
  { month: "Oca", efficiency: 89, quality: 94, delivery: 92, satisfaction: 87 },
  { month: "Şub", efficiency: 91, quality: 95, delivery: 94, satisfaction: 89 },
  { month: "Mar", efficiency: 88, quality: 93, delivery: 91, satisfaction: 86 },
  { month: "Nis", efficiency: 93, quality: 97, delivery: 96, satisfaction: 91 },
  { month: "May", efficiency: 94, quality: 99, delivery: 97, satisfaction: 89 }
]

const resourceUtilization = [
  { department: "Üretim", utilized: 87, available: 13, capacity: 100 },
  { department: "Lojistik", utilized: 92, available: 8, capacity: 100 },
  { department: "Satış", utilized: 78, available: 22, capacity: 100 },
  { department: "IT", utilized: 95, available: 5, capacity: 100 },
  { department: "İK", utilized: 68, available: 32, capacity: 100 }
]

export default function AdminOperationsPage() {
  const [selectedProject, setSelectedProject] = React.useState("all")
  const [riskFilter, setRiskFilter] = React.useState("all")
  const [searchQuery, setSearchQuery] = React.useState("")

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('tr-TR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track': return 'bg-emerald-500/10 text-emerald-700 border-emerald-200'
      case 'at-risk': return 'bg-amber-500/10 text-amber-700 border-amber-200'
      case 'delayed': return 'bg-red-500/10 text-red-700 border-red-200'
      case 'completed': return 'bg-blue-500/10 text-blue-700 border-blue-200'
      case 'active': return 'bg-emerald-500/10 text-emerald-700 border-emerald-200'
      case 'monitoring': return 'bg-amber-500/10 text-amber-700 border-amber-200'
      case 'mitigated': return 'bg-blue-500/10 text-blue-700 border-blue-200'
      case 'maintenance': return 'bg-slate-500/10 text-slate-700 border-slate-200'
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

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'Very High': return 'bg-red-600 text-white'
      case 'High': return 'bg-red-500/10 text-red-700 border-red-200'
      case 'Medium': return 'bg-amber-500/10 text-amber-700 border-amber-200'
      case 'Low': return 'bg-emerald-500/10 text-emerald-700 border-emerald-200'
      default: return 'bg-slate-500/10 text-slate-700 border-slate-200'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-serif font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent">
            Operasyon Yönetimi
          </h1>
          <p className="text-slate-600 mt-2 text-lg">
            Gelişmiş operasyonel kontrol ve performans izleme merkezi
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="bg-white/60 backdrop-blur-sm border-white/40 hover:bg-white/80">
            <BarChart3 className="h-4 w-4 mr-2" />
            Performans Raporu
          </Button>
          <Button variant="outline" className="bg-white/60 backdrop-blur-sm border-white/40 hover:bg-white/80">
            <Download className="h-4 w-4 mr-2" />
            Operasyon Özeti
          </Button>
          <Button className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white shadow-lg shadow-amber-500/25">
            <Plus className="h-4 w-4 mr-2" />
            Yeni Proje
          </Button>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {operationsStats.map((stat, index) => (
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

      {/* Active Projects Overview */}
      <Card className="bg-white/60 backdrop-blur-sm border-white/40 shadow-xl shadow-slate-200/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold text-slate-800">Aktif Projeler</CardTitle>
              <p className="text-sm text-slate-600 mt-1">Devam eden projeler ve ilerleme durumları</p>
            </div>
            <div className="flex gap-2">
              <Select value={selectedProject} onValueChange={setSelectedProject}>
                <SelectTrigger className="w-40 bg-white/60 border-white/40">
                  <SelectValue placeholder="Proje Filtresi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tüm Projeler</SelectItem>
                  <SelectItem value="on-track">Zamanında</SelectItem>
                  <SelectItem value="at-risk">Risk Altında</SelectItem>
                  <SelectItem value="delayed">Geciken</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="bg-white/60 border-white/40 hover:bg-white/80">
                <Plus className="h-4 w-4 mr-2" />
                Yeni Proje
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {activeProjects
              .filter(project => selectedProject === "all" || project.status === selectedProject)
              .map((project) => (
                <div key={project.id} className="p-6 rounded-xl bg-gradient-to-br from-white/50 to-white/30 border border-white/40 hover:from-white/70 hover:to-white/50 transition-all duration-200 group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${
                        project.category === 'Technology' ? 'from-blue-500 to-cyan-600' :
                        project.category === 'Infrastructure' ? 'from-emerald-500 to-green-600' :
                        project.category === 'Compliance' ? 'from-purple-500 to-violet-600' :
                        'from-amber-500 to-orange-600'
                      } shadow-lg`}>
                        <Briefcase className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800 group-hover:text-amber-600 transition-colors">
                          {project.name}
                        </h3>
                        <p className="text-sm text-slate-600">{project.phase} • {project.category}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={`${getStatusColor(project.status)} border`}>
                        {project.status === 'on-track' ? 'Zamanında' :
                         project.status === 'at-risk' ? 'Risk Altında' :
                         project.status === 'delayed' ? 'Geciken' : 'Tamamlandı'}
                      </Badge>
                      <Badge className={getPriorityColor(project.priority)}>
                        {project.priority === 'high' ? 'Yüksek' :
                         project.priority === 'medium' ? 'Orta' : 'Düşük'}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Progress */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-slate-600">İlerleme</span>
                        <span className="text-sm font-semibold text-slate-800">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full ${
                            project.progress >= 80 ? 'bg-emerald-500' :
                            project.progress >= 60 ? 'bg-blue-500' :
                            project.progress >= 40 ? 'bg-amber-500' :
                            'bg-red-500'
                          } transition-all duration-500`}
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-slate-50/50 rounded-lg">
                        <p className="text-lg font-bold text-slate-800">{project.team}</p>
                        <p className="text-xs text-slate-500">Ekip Üyesi</p>
                      </div>
                      <div className="text-center p-3 bg-slate-50/50 rounded-lg">
                        <p className="text-lg font-bold text-slate-800">{project.milestones.completed}/{project.milestones.total}</p>
                        <p className="text-xs text-slate-500">Kilometre Taşı</p>
                      </div>
                      <div className="text-center p-3 bg-slate-50/50 rounded-lg">
                        <p className={`text-lg font-bold ${project.risks > 2 ? 'text-red-600' : project.risks > 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
                          {project.risks}
                        </p>
                        <p className="text-xs text-slate-500">Risk</p>
                      </div>
                    </div>

                    {/* Budget */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-slate-600">Bütçe Kullanımı</span>
                        <span className="text-sm font-semibold text-slate-800">
                          ₺{project.spent.toLocaleString()} / ₺{project.budget.toLocaleString()}
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            (project.spent / project.budget) > 0.9 ? 'bg-red-500' :
                            (project.spent / project.budget) > 0.75 ? 'bg-amber-500' :
                            'bg-emerald-500'
                          } transition-all duration-500`}
                          style={{ width: `${Math.min((project.spent / project.budget) * 100, 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="flex items-center justify-between text-sm text-slate-600 pt-3 border-t border-slate-200">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>{project.manager}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(project.startDate)} - {formatDate(project.endDate)}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1 bg-white/60 border-white/40 hover:bg-white/80">
                        <Eye className="h-4 w-4 mr-2" />
                        Detay
                      </Button>
                      <Button size="sm" className="flex-1 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white">
                        <Edit className="h-4 w-4 mr-2" />
                        Düzenle
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm" className="bg-white/60 border-white/40 hover:bg-white/80">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white/95 backdrop-blur-sm border-white/40">
                          <DropdownMenuItem>Rapor Oluştur</DropdownMenuItem>
                          <DropdownMenuItem>Ekip Yönetimi</DropdownMenuItem>
                          <DropdownMenuItem>Risk Analizi</DropdownMenuItem>
                          <DropdownMenuItem>Zaman Çizelgesi</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* KPI Metrics Dashboard */}
      <div className="grid gap-6 lg:grid-cols-3">
        {kpiMetrics.map((category, index) => (
          <Card key={category.category} className="bg-white/60 backdrop-blur-sm border-white/40 shadow-xl shadow-slate-200/20">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-slate-800">{category.category} KPI'lar</CardTitle>
              <p className="text-sm text-slate-600">Temel performans göstergeleri</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {category.metrics.map((metric, metricIndex) => (
                  <div key={metricIndex} className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-white/50 to-white/30 border border-white/40">
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-800">{metric.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-2xl font-bold text-slate-800">{metric.value}</span>
                        <div className="flex items-center">
                          {metric.trend === "up" ? (
                            <TrendingUp className="h-4 w-4 text-emerald-600" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-600" />
                          )}
                          <span className={`text-sm font-semibold ml-1 ${metric.trend === "up" ? "text-emerald-600" : "text-red-600"}`}>
                            {metric.change}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">Hedef: {metric.target}</p>
                    </div>
                    <div className="w-16 h-16">
                      <div className={`w-full h-full rounded-full border-4 ${
                        metric.trend === "up" ? "border-emerald-500" : "border-red-500"
                      } border-t-transparent animate-spin`} style={{ animationDuration: '3s' }} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance Analytics & Resource Utilization */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Performance Trends */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/40 shadow-xl shadow-slate-200/20">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-slate-800">Performans Trendleri</CardTitle>
            <p className="text-sm text-slate-600">Aylık operasyonel performans göstergeleri</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  formatter={(value: any, name: any) => [
                    `${value}%`,
                    name === 'efficiency' ? 'Verimlilik' :
                    name === 'quality' ? 'Kalite' :
                    name === 'delivery' ? 'Teslimat' : 'Memnuniyet'
                  ]}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px'
                  }}
                />
                <Bar dataKey="efficiency" fill="#3b82f6" radius={[2, 2, 0, 0]} />
                <Line type="monotone" dataKey="quality" stroke="#10b981" strokeWidth={3} />
                <Line type="monotone" dataKey="delivery" stroke="#f59e0b" strokeWidth={3} />
                <Line type="monotone" dataKey="satisfaction" stroke="#8b5cf6" strokeWidth={3} />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Resource Utilization */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/40 shadow-xl shadow-slate-200/20">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-slate-800">Kaynak Kullanımı</CardTitle>
            <p className="text-sm text-slate-600">Departman bazında kapasite kullanım oranları</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={resourceUtilization} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" stroke="#64748b" />
                <YAxis dataKey="department" type="category" stroke="#64748b" width={80} />
                <Tooltip
                  formatter={(value: any, name: any) => [
                    `${value}%`,
                    name === 'utilized' ? 'Kullanılan' : 'Boş'
                  ]}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px'
                  }}
                />
                <Bar dataKey="utilized" stackId="a" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                <Bar dataKey="available" stackId="a" fill="#e2e8f0" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-blue-50/50 rounded-lg">
                <p className="text-lg font-bold text-blue-600">
                  {Math.round(resourceUtilization.reduce((sum, dept) => sum + dept.utilized, 0) / resourceUtilization.length)}%
                </p>
                <p className="text-xs text-slate-500">Ortalama Kullanım</p>
              </div>
              <div className="text-center p-3 bg-slate-50/50 rounded-lg">
                <p className="text-lg font-bold text-slate-600">
                  {resourceUtilization.filter(dept => dept.utilized > 90).length}
                </p>
                <p className="text-xs text-slate-500">Yüksek Kullanım</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk Assessment & Workflow Automation */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Risk Assessment */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/40 shadow-xl shadow-slate-200/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-semibold text-slate-800">Risk Değerlendirmesi</CardTitle>
                <p className="text-sm text-slate-600 mt-1">Aktif riskler ve azaltma stratejileri</p>
              </div>
              <div className="flex gap-2">
                <Select value={riskFilter} onValueChange={setRiskFilter}>
                  <SelectTrigger className="w-32 bg-white/60 border-white/40">
                    <SelectValue placeholder="Risk Seviyesi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tümü</SelectItem>
                    <SelectItem value="High">Yüksek</SelectItem>
                    <SelectItem value="Medium">Orta</SelectItem>
                    <SelectItem value="Low">Düşük</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="bg-white/60 border-white/40 hover:bg-white/80">
                  <Plus className="h-4 w-4 mr-2" />
                  Risk Ekle
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {riskAssessments
                .filter(risk => riskFilter === "all" || risk.riskLevel === riskFilter)
                .map((risk) => (
                  <div key={risk.id} className="p-4 rounded-xl bg-gradient-to-r from-white/50 to-white/30 border border-white/40 hover:from-white/70 hover:to-white/50 transition-all duration-200 group">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          risk.riskLevel === 'High' ? 'bg-red-500' :
                          risk.riskLevel === 'Medium' ? 'bg-amber-500' :
                          'bg-emerald-500'
                        }`}>
                          <Shield className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-800 group-hover:text-amber-600 transition-colors">
                            {risk.title}
                          </h4>
                          <p className="text-sm text-slate-600">{risk.category}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={`${getRiskLevelColor(risk.riskLevel)} border`}>
                          {risk.riskLevel === 'High' ? 'Yüksek' :
                           risk.riskLevel === 'Medium' ? 'Orta' : 'Düşük'} Risk
                        </Badge>
                        <Badge className={`${getStatusColor(risk.status)} border`}>
                          {risk.status === 'active' ? 'Aktif' :
                           risk.status === 'monitoring' ? 'İzleniyor' :
                           risk.status === 'mitigated' ? 'Azaltıldı' : risk.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <span className="text-xs text-slate-500">Olasılık:</span>
                        <p className="font-medium text-slate-700">{risk.probability}</p>
                      </div>
                      <div>
                        <span className="text-xs text-slate-500">Etki:</span>
                        <p className="font-medium text-slate-700">{risk.impact}</p>
                      </div>
                    </div>

                    <div className="mb-3">
                      <span className="text-xs text-slate-500">Azaltma Stratejisi:</span>
                      <p className="text-sm text-slate-700 mt-1">{risk.mitigation}</p>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-200">
                      <div className="flex items-center gap-4">
                        <span>Sorumlu: {risk.owner}</span>
                        <span>Son İnceleme: {formatDate(risk.lastReview)}</span>
                      </div>
                      <span>Sonraki: {formatDate(risk.nextReview)}</span>
                    </div>
                  </div>
                ))}
            </div>
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-200">
              <p className="text-sm text-slate-600">
                {riskAssessments.filter(r => riskFilter === "all" || r.riskLevel === riskFilter).length} risk gösteriliyor
              </p>
              <Button variant="outline" className="bg-white/60 border-white/40 hover:bg-white/80">
                Risk Matrisi Görüntüle
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Workflow Automation */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/40 shadow-xl shadow-slate-200/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-semibold text-slate-800">İş Akışı Otomasyonu</CardTitle>
                <p className="text-sm text-slate-600 mt-1">Aktif otomasyonlar ve performans metrikleri</p>
              </div>
              <Button variant="outline" className="bg-white/60 border-white/40 hover:bg-white/80">
                <Plus className="h-4 w-4 mr-2" />
                Yeni Otomasyon
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {workflowAutomations.map((workflow) => (
                <div key={workflow.id} className="p-4 rounded-xl bg-gradient-to-r from-white/50 to-white/30 border border-white/40 hover:from-white/70 hover:to-white/50 transition-all duration-200 group">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        workflow.status === 'active' ? 'bg-emerald-500' :
                        workflow.status === 'maintenance' ? 'bg-amber-500' :
                        'bg-slate-500'
                      }`}>
                        <Workflow className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800 group-hover:text-amber-600 transition-colors">
                          {workflow.name}
                        </h4>
                        <p className="text-sm text-slate-600">{workflow.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={`${getStatusColor(workflow.status)} border`}>
                        {workflow.status === 'active' ? 'Aktif' :
                         workflow.status === 'maintenance' ? 'Bakımda' : 'Pasif'}
                      </Badge>
                      {workflow.status === 'active' && (
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div className="text-center p-2 bg-slate-50/50 rounded-lg">
                      <p className="text-lg font-bold text-emerald-600">{workflow.efficiency}</p>
                      <p className="text-xs text-slate-500">Verimlilik</p>
                    </div>
                    <div className="text-center p-2 bg-slate-50/50 rounded-lg">
                      <p className="text-lg font-bold text-blue-600">{workflow.timeSaved}</p>
                      <p className="text-xs text-slate-500">Zaman Tasarrufu</p>
                    </div>
                    <div className="text-center p-2 bg-slate-50/50 rounded-lg">
                      <p className="text-lg font-bold text-purple-600">{workflow.successRate}</p>
                      <p className="text-xs text-slate-500">Başarı Oranı</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-200">
                    <div className="flex items-center gap-4">
                      <span>Toplam Çalışma: {workflow.totalRuns.toLocaleString()}</span>
                      <span>Son Çalışma: {formatDate(workflow.lastRun)}</span>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <Settings className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        {workflow.status === 'active' ? <PauseCircle className="h-3 w-3" /> : <PlayCircle className="h-3 w-3" />}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-200">
              <p className="text-sm text-slate-600">
                {workflowAutomations.filter(w => w.status === 'active').length} aktif otomasyon
              </p>
              <Button variant="outline" className="bg-white/60 border-white/40 hover:bg-white/80">
                Tüm Otomasyonları Görüntüle
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Operations Control Center */}
      <Card className="bg-white/60 backdrop-blur-sm border-white/40 shadow-xl shadow-slate-200/20">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-slate-800">Operasyon Kontrol Merkezi</CardTitle>
          <p className="text-sm text-slate-600">Hızlı işlemler ve sistem kontrolleri</p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* System Monitoring */}
            <Button className="h-24 flex-col gap-2 bg-gradient-to-br from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white shadow-lg shadow-blue-500/25">
              <Activity className="h-6 w-6" />
              <div className="text-center">
                <div className="font-semibold">Sistem İzleme</div>
                <div className="text-xs opacity-90">Gerçek zamanlı</div>
              </div>
            </Button>

            {/* Performance Analysis */}
            <Button className="h-24 flex-col gap-2 bg-gradient-to-br from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg shadow-emerald-500/25">
              <BarChart3 className="h-6 w-6" />
              <div className="text-center">
                <div className="font-semibold">Performans Analizi</div>
                <div className="text-xs opacity-90">Detaylı rapor</div>
              </div>
            </Button>

            {/* Quality Control */}
            <Button className="h-24 flex-col gap-2 bg-gradient-to-br from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white shadow-lg shadow-purple-500/25">
              <Award className="h-6 w-6" />
              <div className="text-center">
                <div className="font-semibold">Kalite Kontrol</div>
                <div className="text-xs opacity-90">QC dashboard</div>
              </div>
            </Button>

            {/* Resource Planning */}
            <Button className="h-24 flex-col gap-2 bg-gradient-to-br from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-lg shadow-amber-500/25">
              <Layers className="h-6 w-6" />
              <div className="text-center">
                <div className="font-semibold">Kaynak Planlama</div>
                <div className="text-xs opacity-90">ERP entegrasyonu</div>
              </div>
            </Button>

            {/* Workflow Designer */}
            <Button variant="outline" className="h-24 flex-col gap-2 bg-white/60 border-white/40 hover:bg-white/80">
              <Workflow className="h-6 w-6" />
              <div className="text-center">
                <div className="font-semibold">İş Akışı Tasarımcısı</div>
                <div className="text-xs text-slate-500">Drag & drop</div>
              </div>
            </Button>

            {/* Risk Matrix */}
            <Button variant="outline" className="h-24 flex-col gap-2 bg-white/60 border-white/40 hover:bg-white/80">
              <Shield className="h-6 w-6" />
              <div className="text-center">
                <div className="font-semibold">Risk Matrisi</div>
                <div className="text-xs text-slate-500">Görsel analiz</div>
              </div>
            </Button>

            {/* Compliance Tracker */}
            <Button variant="outline" className="h-24 flex-col gap-2 bg-white/60 border-white/40 hover:bg-white/80">
              <ClipboardList className="h-6 w-6" />
              <div className="text-center">
                <div className="font-semibold">Uygunluk Takibi</div>
                <div className="text-xs text-slate-500">ISO/Sertifikalar</div>
              </div>
            </Button>

            {/* Alert Center */}
            <Button variant="outline" className="h-24 flex-col gap-2 bg-white/60 border-white/40 hover:bg-white/80">
              <Bell className="h-6 w-6" />
              <div className="text-center">
                <div className="font-semibold">Uyarı Merkezi</div>
                <div className="text-xs text-slate-500">Bildirim yönetimi</div>
              </div>
            </Button>
          </div>

          {/* Advanced Tools */}
          <div className="mt-6 pt-6 border-t border-slate-200">
            <h4 className="font-semibold text-slate-800 mb-4">Gelişmiş Araçlar</h4>
            <div className="grid gap-3 md:grid-cols-3">
              <Button variant="ghost" className="justify-start h-12 bg-white/40 hover:bg-white/60">
                <Database className="h-4 w-4 mr-3" />
                <div className="text-left">
                  <div className="font-medium">Veri Analizi</div>
                  <div className="text-xs text-slate-500">BI & Analytics</div>
                </div>
              </Button>

              <Button variant="ghost" className="justify-start h-12 bg-white/40 hover:bg-white/60">
                <Network className="h-4 w-4 mr-3" />
                <div className="text-left">
                  <div className="font-medium">Entegrasyon Hub</div>
                  <div className="text-xs text-slate-500">API yönetimi</div>
                </div>
              </Button>

              <Button variant="ghost" className="justify-start h-12 bg-white/40 hover:bg-white/60">
                <Globe className="h-4 w-4 mr-3" />
                <div className="text-left">
                  <div className="font-medium">Global Dashboard</div>
                  <div className="text-xs text-slate-500">Çoklu lokasyon</div>
                </div>
              </Button>
            </div>
          </div>

          {/* System Status */}
          <div className="mt-6 pt-6 border-t border-slate-200">
            <h4 className="font-semibold text-slate-800 mb-4">Sistem Durumu</h4>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="flex items-center gap-3 p-3 bg-emerald-50/50 rounded-lg">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                <div>
                  <p className="font-medium text-slate-800">Tüm Sistemler</p>
                  <p className="text-xs text-slate-500">Operasyonel</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-lg">
                <div className="w-3 h-3 bg-blue-500 rounded-full" />
                <div>
                  <p className="font-medium text-slate-800">API Durumu</p>
                  <p className="text-xs text-slate-500">99.9% Uptime</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-purple-50/50 rounded-lg">
                <div className="w-3 h-3 bg-purple-500 rounded-full" />
                <div>
                  <p className="font-medium text-slate-800">Veri Senkronizasyonu</p>
                  <p className="text-xs text-slate-500">Güncel</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-amber-50/50 rounded-lg">
                <div className="w-3 h-3 bg-amber-500 rounded-full" />
                <div>
                  <p className="font-medium text-slate-800">Bakım Penceresi</p>
                  <p className="text-xs text-slate-500">Pazar 02:00</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}