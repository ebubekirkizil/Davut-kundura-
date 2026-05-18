"use client"

import * as React from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Search,
  Filter,
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
  TrendingUp,
  Calendar,
  MoreVertical,
  Eye,
  Star,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Mock customers data
const customers = [
  {
    id: "1",
    name: "Mehmet Yılmaz",
    email: "mehmet.yilmaz@abcholding.com.tr",
    phone: "+90 532 123 4567",
    company: "ABC Holding A.Ş.",
    position: "Satın Alma Müdürü",
    location: "Maslak, İstanbul",
    totalOrders: 47,
    totalSpent: 284500,
    averageOrder: 6053,
    lastOrder: "2026-05-05T10:30:00",
    joinDate: "2024-08-15",
    segment: "enterprise",
    status: "active",
    customerType: "B2B",
    creditLimit: 500000,
    paymentTerms: "30 gün",
    assignedManager: "Ayşe Kaya",
    tags: ["VIP", "Kurumsal", "Büyük Hacim"],
    notes: "Stratejik partner - özel indirim anlaşması mevcut",
    lastContact: "2026-05-04T14:20:00",
    nextFollowUp: "2026-05-10T10:00:00",
    satisfaction: 4.9,
    riskScore: "Düşük"
  },
  {
    id: "2",
    name: "Ayşe Kaya",
    email: "ayse.kaya@xyztekstil.com",
    phone: "+90 533 234 5678",
    company: "XYZ Tekstil Ltd. Şti.",
    position: "Genel Müdür",
    location: "Organize Sanayi, Bursa",
    totalOrders: 32,
    totalSpent: 156800,
    averageOrder: 4900,
    lastOrder: "2026-05-04T16:45:00",
    joinDate: "2024-10-20",
    segment: "corporate",
    status: "active",
    customerType: "B2B",
    creditLimit: 300000,
    paymentTerms: "45 gün",
    assignedManager: "Can Demir",
    tags: ["Düzenli", "Tekstil", "Orta Ölçek"],
    notes: "Aylık düzenli siparişler - güvenilir müşteri",
    lastContact: "2026-05-03T11:15:00",
    nextFollowUp: "2026-05-08T15:30:00",
    satisfaction: 4.7,
    riskScore: "Düşük"
  },
  {
    id: "3",
    name: "Can Demir",
    email: "can.demir@definşaat.com.tr",
    phone: "+90 534 345 6789",
    company: "DEF İnşaat A.Ş.",
    position: "Proje Müdürü",
    location: "Çankaya, Ankara",
    totalOrders: 18,
    totalSpent: 89400,
    averageOrder: 4967,
    lastOrder: "2026-04-28T14:20:00",
    joinDate: "2025-02-10",
    segment: "growing",
    status: "active",
    customerType: "B2B",
    creditLimit: 150000,
    paymentTerms: "60 gün",
    assignedManager: "Zeynep Özkan",
    tags: ["Büyüyen", "İnşaat", "Potansiyel"],
    notes: "Hızla büyüyen müşteri - kredi limitini artırma potansiyeli",
    lastContact: "2026-04-30T09:45:00",
    nextFollowUp: "2026-05-07T14:00:00",
    satisfaction: 4.5,
    riskScore: "Orta"
  },
  {
    id: "4",
    name: "Zeynep Özkan",
    email: "zeynep.ozkan@ghiotomotiv.com",
    phone: "+90 535 456 7890",
    company: "GHI Otomotiv Ltd. Şti.",
    position: "Satın Alma Uzmanı",
    location: "Bornova, İzmir",
    totalOrders: 28,
    totalSpent: 134600,
    averageOrder: 4807,
    lastOrder: "2026-05-03T11:30:00",
    joinDate: "2024-06-05",
    segment: "corporate",
    status: "active",
    customerType: "B2B",
    creditLimit: 200000,
    paymentTerms: "30 gün",
    assignedManager: "Ahmet Şahin",
    tags: ["Otomotiv", "Düzenli", "Kalite Odaklı"],
    notes: "Kalite standartları yüksek - premium ürün tercihi",
    lastContact: "2026-05-02T16:20:00",
    nextFollowUp: "2026-05-09T10:30:00",
    satisfaction: 4.8,
    riskScore: "Düşük"
  },
  {
    id: "5",
    name: "Ahmet Şahin",
    email: "ahmet.sahin@jklenerji.com.tr",
    phone: "+90 536 567 8901",
    company: "JKL Enerji A.Ş.",
    position: "Operasyon Müdürü",
    location: "Seyhan, Adana",
    totalOrders: 8,
    totalSpent: 34200,
    averageOrder: 4275,
    lastOrder: "2026-03-15T09:15:00",
    joinDate: "2025-12-10",
    segment: "at-risk",
    status: "inactive",
    customerType: "B2B",
    creditLimit: 100000,
    paymentTerms: "30 gün",
    assignedManager: "Fatma Yıldız",
    tags: ["Risk", "Enerji", "Takip Gerekli"],
    notes: "Son 2 ayda sipariş yok - acil takip gerekli",
    lastContact: "2026-03-20T14:45:00",
    nextFollowUp: "2026-05-07T09:00:00",
    satisfaction: 3.8,
    riskScore: "Yüksek"
  },
  {
    id: "6",
    name: "Fatma Yıldız",
    email: "fatma.yildiz@mnpgıda.com.tr",
    phone: "+90 537 678 9012",
    company: "MNP Gıda San. Tic. A.Ş.",
    position: "İdari İşler Müdürü",
    location: "Selçuklu, Konya",
    totalOrders: 15,
    totalSpent: 67800,
    averageOrder: 4520,
    lastOrder: "2026-05-01T13:45:00",
    joinDate: "2025-03-22",
    segment: "regular",
    status: "active",
    customerType: "B2B",
    creditLimit: 120000,
    paymentTerms: "45 gün",
    assignedManager: "Mehmet Yılmaz",
    tags: ["Gıda", "Düzenli", "Güvenilir"],
    notes: "Sezonsal sipariş artışları - yaz aylarında daha aktif",
    lastContact: "2026-04-29T11:30:00",
    nextFollowUp: "2026-05-12T14:15:00",
    satisfaction: 4.6,
    riskScore: "Düşük"
  }
]

const customerStats = [
  {
    title: "Toplam Müşteri",
    subtitle: "Aktif Portföy",
    value: "1,847",
    change: "+12.3%",
    trend: "up",
    icon: ShoppingBag,
    color: "from-blue-500 to-cyan-600"
  },
  {
    title: "Kurumsal Müşteri",
    subtitle: "B2B Hesaplar",
    value: "892",
    change: "+18.7%",
    trend: "up",
    icon: Star,
    color: "from-purple-500 to-violet-600"
  },
  {
    title: "Toplam Portföy Değeri",
    subtitle: "Yaşam Boyu Değer",
    value: "₺24.8M",
    change: "+24.5%",
    trend: "up",
    icon: TrendingUp,
    color: "from-emerald-500 to-green-600"
  },
  {
    title: "Müşteri Memnuniyeti",
    subtitle: "Ortalama Puan",
    value: "4.7/5.0",
    change: "+0.2",
    trend: "up",
    icon: Star,
    color: "from-amber-500 to-orange-600"
  }
]

const segmentColors = {
  enterprise: "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-500/20",
  corporate: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-500/20",
  growing: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20",
  regular: "bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10",
  "at-risk": "bg-red-500/10 text-red-700 dark:text-red-400 border-red-200 dark:border-red-500/20",
}

const segmentLabels = {
  enterprise: "Kurumsal",
  corporate: "Şirket",
  growing: "Büyüyen",
  regular: "Düzenli",
  "at-risk": "Risk Altında",
}

const statusColors = {
  active: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20",
  inactive: "bg-slate-500/10 text-slate-700 dark:text-slate-400 border-slate-200 dark:border-white/10",
}

const statusLabels = {
  active: "Aktif",
  inactive: "Pasif",
}

const riskColors = {
  "Düşük": "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
  "Orta": "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
  "Yüksek": "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20",
}

export default function AdminCustomersPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [segmentFilter, setSegmentFilter] = React.useState<string | null>(null)
  const [statusFilter, setStatusFilter] = React.useState<string | null>(null)

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery) ||
      customer.company.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesSegment = !segmentFilter || customer.segment === segmentFilter
    const matchesStatus = !statusFilter || customer.status === statusFilter

    return matchesSearch && matchesSegment && matchesStatus
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('tr-TR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
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

  return (
    <div className="space-y-8 p-6 max-w-[1600px] mx-auto text-slate-800 dark:text-slate-100 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-serif font-bold text-slate-900 dark:text-white tracking-tight">
            Müşteri CRM Portalı
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg font-medium font-sans">
            {customers.length} toplam müşteri • {filteredCustomers.length} görüntülenen
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            className="h-10 bg-white/70 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 text-slate-800 dark:text-slate-200 shadow-sm font-bold"
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            CRM Raporu
          </Button>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="h-10 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white shadow-lg shadow-amber-500/25 font-bold transition-all text-sm flex items-center"
          >
            <Mail className="h-4 w-4 mr-2" />
            Toplu E-posta
          </motion.button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {customerStats.map((stat, index) => (
          <Card key={stat.title} className="relative overflow-hidden bg-white/70 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/80 dark:border-white/5 shadow-lg shadow-slate-200/20 dark:shadow-black/40 rounded-3xl group hover:shadow-2xl hover:border-slate-300/80 dark:hover:border-white/10 transition-all duration-300">
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
            <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-3">
              <div>
                <CardTitle className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{stat.title}</CardTitle>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 font-bold">{stat.subtitle}</p>
              </div>
              <div className={`p-2.5 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg shadow-slate-900/10`}>
                <stat.icon className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-3xl font-black text-slate-900 dark:text-white mb-2">{stat.value}</div>
              <div className="flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 dark:bg-emerald-500/10 p-1.5 rounded-lg border border-emerald-500/10 w-fit">
                <TrendingUp className="h-3.5 w-3.5 mr-1" />
                <span>{stat.change}</span>
                <span className="ml-1 opacity-70">geçen aya göre</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enhanced Filters */}
      <Card className="bg-white/70 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/80 dark:border-white/5 shadow-lg shadow-slate-200/20 dark:shadow-black/40 rounded-3xl">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
              <Input
                placeholder="Müşteri ara (isim, email, telefon, şirket)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10 bg-slate-50 dark:bg-slate-950/40 border-slate-200 dark:border-white/10 focus:bg-white dark:focus:bg-slate-950 transition-all text-slate-800 dark:text-slate-200 rounded-xl"
              />
            </div>

            {/* Segment Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-10 w-full lg:w-48 bg-white/70 dark:bg-slate-900/40 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 text-slate-800 dark:text-slate-200 rounded-xl font-bold">
                  <Filter className="h-4 w-4 mr-2" />
                  {segmentFilter ? segmentLabels[segmentFilter as keyof typeof segmentLabels] : "Tüm Segmentler"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-xl p-1 shadow-xl">
                <DropdownMenuItem className="cursor-pointer font-semibold text-xs rounded-lg" onClick={() => setSegmentFilter(null)}>
                  Tüm Segmentler
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer font-semibold text-xs rounded-lg" onClick={() => setSegmentFilter("enterprise")}>
                  Kurumsal
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer font-semibold text-xs rounded-lg" onClick={() => setSegmentFilter("corporate")}>
                  Şirket
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer font-semibold text-xs rounded-lg" onClick={() => setSegmentFilter("growing")}>
                  Büyüyen
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer font-semibold text-xs rounded-lg" onClick={() => setSegmentFilter("regular")}>
                  Düzenli
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer font-semibold text-xs rounded-lg text-rose-600 focus:text-rose-600" onClick={() => setSegmentFilter("at-risk")}>
                  Risk Altında
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Status Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-10 w-full lg:w-48 bg-white/70 dark:bg-slate-900/40 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 text-slate-800 dark:text-slate-200 rounded-xl font-bold">
                  <Filter className="h-4 w-4 mr-2" />
                  {statusFilter ? statusLabels[statusFilter as keyof typeof statusLabels] : "Tüm Durumlar"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-xl p-1 shadow-xl">
                <DropdownMenuItem className="cursor-pointer font-semibold text-xs rounded-lg" onClick={() => setStatusFilter(null)}>
                  Tüm Durumlar
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer font-semibold text-xs rounded-lg text-emerald-600 focus:text-emerald-600" onClick={() => setStatusFilter("active")}>
                  Aktif
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer font-semibold text-xs rounded-lg text-slate-600" onClick={() => setStatusFilter("inactive")}>
                  Pasif
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Customers Grid */}
      <div className="grid gap-6">
        <AnimatePresence mode="popLayout">
          {filteredCustomers.map((customer) => (
            <motion.div
              layout
              key={customer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", stiffness: 350, damping: 26 }}
            >
              <Card className="group relative overflow-hidden bg-white/70 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/80 dark:border-white/5 shadow-lg shadow-slate-200/20 dark:shadow-black/40 rounded-3xl hover:shadow-2xl dark:hover:shadow-black/40 hover:border-slate-300/80 dark:hover:border-white/10 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    {/* Customer Info */}
                    <div className="flex-1 space-y-4">
                      {/* Header Row */}
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-500/20">
                              {customer.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full border-2 border-white dark:border-slate-900 flex items-center justify-center ${
                              customer.riskScore === 'Düşük' ? 'bg-emerald-500' :
                              customer.riskScore === 'Orta' ? 'bg-amber-500' :
                              'bg-rose-500'
                            }`} />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{customer.name}</h3>
                            <p className="text-slate-700 dark:text-slate-200 font-extrabold text-sm">{customer.company}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-bold">{customer.position}</p>
                          </div>
                        </div>
                        <div className="sm:text-right">
                          <p className="text-2xl font-black text-slate-900 dark:text-white">₺{customer.totalSpent.toLocaleString()}</p>
                          <p className="text-[10px] text-slate-400 dark:text-slate-500 font-extrabold uppercase tracking-wider mt-0.5">Toplam Harcama</p>
                        </div>
                      </div>

                      {/* Contact & Location Info */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        <div className="space-y-2.5">
                          <div className="flex items-center gap-3">
                            <Mail className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                            <span className="text-sm font-bold text-slate-600 dark:text-slate-300">{customer.email}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Phone className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                            <span className="text-sm font-bold text-slate-600 dark:text-slate-300">{customer.phone}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <MapPin className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                            <span className="text-sm font-bold text-slate-600 dark:text-slate-300">{customer.location}</span>
                          </div>
                        </div>

                        <div className="space-y-2.5">
                          <div className="flex items-center gap-3">
                            <Calendar className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                            <div>
                              <p className="text-sm font-bold text-slate-600 dark:text-slate-300">Müşteri Olma: {formatDate(customer.joinDate)}</p>
                              <p className="text-xs text-slate-400 dark:text-slate-500 font-bold">Son Sipariş: {getRelativeTime(customer.lastOrder)}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <TrendingUp className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                            <div>
                              <p className="text-sm font-bold text-slate-600 dark:text-slate-300">Sorumlu: {customer.assignedManager}</p>
                              <p className="text-xs text-slate-400 dark:text-slate-500 font-bold">Sonraki Takip: {formatDate(customer.nextFollowUp)}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Business Metrics */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 bg-slate-50/50 dark:bg-black/20 border border-slate-100 dark:border-white/5 rounded-2xl">
                        <div className="text-center">
                          <p className="text-xl font-black text-slate-900 dark:text-white">{customer.totalOrders}</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-extrabold uppercase">Toplam Sipariş</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xl font-black text-slate-900 dark:text-white">₺{customer.averageOrder.toLocaleString()}</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-extrabold uppercase">Ortalama Sipariş</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xl font-black text-slate-900 dark:text-white">₺{customer.creditLimit.toLocaleString()}</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-extrabold uppercase">Kredi Limiti</p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Star className="h-4 w-4 text-amber-500 fill-current" />
                            <p className="text-xl font-black text-slate-900 dark:text-white">{customer.satisfaction}</p>
                          </div>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-extrabold uppercase">Memnuniyet</p>
                        </div>
                      </div>

                      {/* Payment Terms & Tags */}
                      <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/5 dark:bg-blue-500/10 border border-blue-500/10 rounded-xl">
                          <Calendar className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                          <span className="text-xs font-bold text-blue-700 dark:text-blue-400">{customer.paymentTerms} Vade</span>
                        </div>
                        {customer.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="bg-white/40 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-300 font-bold rounded-xl text-[10px]">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Notes */}
                      {customer.notes && (
                        <div className="bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/10 rounded-2xl p-3">
                          <p className="text-xs font-medium text-slate-700 dark:text-slate-300">
                            <span className="font-extrabold text-amber-600 dark:text-amber-400">Yönetici Notu:</span> {customer.notes}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Status & Actions */}
                    <div className="lg:w-72 space-y-4 shrink-0">
                      {/* Status Badges */}
                      <div className="space-y-3">
                        <div>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mb-1">Müşteri Segmenti</p>
                          <Badge className={`${segmentColors[customer.segment as keyof typeof segmentColors]} border w-full justify-center py-2 font-black rounded-xl text-xs`}>
                            {segmentLabels[customer.segment as keyof typeof segmentLabels]}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mb-1">Durum</p>
                          <Badge className={`${statusColors[customer.status as keyof typeof statusColors]} border w-full justify-center py-2 font-black rounded-xl text-xs`}>
                            {statusLabels[customer.status as keyof typeof statusLabels]}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mb-1">Risk Skoru</p>
                          <Badge className={`${
                            customer.riskScore === 'Düşük' ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20' :
                            customer.riskScore === 'Orta' ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20' :
                            'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20'
                          } border w-full justify-center py-2 font-black rounded-xl text-xs`}>
                            {customer.riskScore} Risk
                          </Badge>
                        </div>
                      </div>

                      {/* Customer Type & Last Contact */}
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-purple-500/5 dark:bg-purple-500/10 border border-purple-500/10 rounded-2xl p-3 text-center">
                          <div className="flex items-center justify-center gap-1.5 mb-1">
                            <ShoppingBag className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                            <span className="text-[10px] font-bold text-purple-700 dark:text-purple-400 uppercase">Tipi</span>
                          </div>
                          <p className="text-xs font-extrabold text-purple-600 dark:text-purple-400">{customer.customerType}</p>
                        </div>

                        <div className="bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/10 rounded-2xl p-3 text-center">
                          <div className="flex items-center justify-center gap-1.5 mb-1">
                            <Phone className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                            <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase">İletişim</span>
                          </div>
                          <p className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 truncate">
                            {getRelativeTime(customer.lastContact)}
                          </p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-2">
                        <Button
                          variant="outline"
                          className="w-full bg-white/70 dark:bg-slate-900/40 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 text-slate-800 dark:text-slate-200 font-bold rounded-xl h-10"
                          asChild
                        >
                          <Link href={`/admin/customers/${customer.id}`}>
                            <Eye className="h-4 w-4 mr-2 text-slate-500" />
                            Müşteri Detayı
                          </Link>
                        </Button>

                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-white/70 dark:bg-slate-900/40 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 text-slate-800 dark:text-slate-200 font-bold rounded-xl"
                          >
                            <Mail className="h-4 w-4 mr-1 text-slate-500" />
                            E-posta
                          </Button>

                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-white/70 dark:bg-slate-900/40 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 text-slate-800 dark:text-slate-200 font-bold rounded-xl"
                          >
                            <Phone className="h-4 w-4 mr-1 text-slate-500" />
                            Ara
                          </Button>
                        </div>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full bg-white/70 dark:bg-slate-900/40 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 text-slate-800 dark:text-slate-200 font-bold rounded-xl"
                            >
                              <MoreVertical className="h-4 w-4 mr-2 text-slate-500" />
                              Diğer İşlemler
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-xl p-1 shadow-xl w-56 font-semibold text-xs">
                            <DropdownMenuItem className="cursor-pointer rounded-lg p-2.5">Sipariş Geçmişi</DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer rounded-lg p-2.5">Ödeme Geçmişi</DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer rounded-lg p-2.5">Segment Değiştir</DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer rounded-lg p-2.5">Kredi Limiti Güncelle</DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer rounded-lg p-2.5">Takip Notu Ekle</DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer rounded-lg p-2.5">Özel Fiyat Tanımla</DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer rounded-lg p-2.5">Rapor Oluştur</DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer rounded-lg p-2.5 text-red-600 focus:text-red-600">
                              Müşteriyi Pasifleştir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Quick Actions based on status */}
                        {customer.status === 'inactive' && (
                          <Button
                            size="sm"
                            className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold rounded-xl h-10 shadow-md shadow-emerald-500/10"
                          >
                            Müşteriyi Aktifleştir
                          </Button>
                        )}

                        {customer.riskScore === 'Yüksek' && (
                          <Button
                            size="sm"
                            className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold rounded-xl h-10 shadow-md shadow-red-500/10"
                          >
                            Acil Takip Başlat
                          </Button>
                        )}

                        {customer.segment === 'growing' && (
                          <Button
                            size="sm"
                            className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold rounded-xl h-10 shadow-md shadow-purple-500/10"
                          >
                            Segment Yükselt
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredCustomers.length === 0 && (
        <Card className="bg-white/70 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/80 dark:border-white/5 shadow-lg rounded-3xl">
          <CardContent className="text-center py-16">
            <ShoppingBag className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Müşteri bulunamadı</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6 font-medium">
              Arama kriterlerinize uygun müşteri bulunmuyor. Filtreleri değiştirmeyi deneyin.
            </p>
            <div className="flex gap-3 justify-center">
              <Button 
                variant="outline" 
                className="h-10 bg-white/70 dark:bg-slate-900/40 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl font-bold"
                onClick={() => {
                  setSearchQuery("")
                  setSegmentFilter(null)
                  setStatusFilter(null)
                }}
              >
                Filtreleri Temizle
              </Button>
              <Button className="h-10 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white font-bold rounded-xl shadow-lg shadow-amber-500/20">
                <TrendingUp className="h-4 w-4 mr-2" />
                CRM Raporu
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
