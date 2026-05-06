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

// Mock customers data
const customers = [
  {
    id: "1",
    name: "Mehmet Yılmaz",
    email: "mehmet.yilmaz@abcholding.com.tr",
    phone: "+90 532 123 4567",
    company: "ABC Holding A.Ş.",
    position: "Satın Alma Müdürü",
    location: "İstanbul, Maslak",
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
    location: "Bursa, Organize Sanayi",
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
    location: "Ankara, Çankaya",
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
    location: "İzmir, Bornova",
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
    location: "Adana, Seyhan",
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
    location: "Konya, Selçuklu",
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
  enterprise: "bg-purple-500/10 text-purple-700 border-purple-200",
  corporate: "bg-blue-500/10 text-blue-700 border-blue-200",
  growing: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
  regular: "bg-slate-500/10 text-slate-700 border-slate-200",
  "at-risk": "bg-red-500/10 text-red-700 border-red-200",
}

const segmentLabels = {
  enterprise: "Kurumsal",
  corporate: "Şirket",
  growing: "Büyüyen",
  regular: "Düzenli",
  "at-risk": "Risk Altında",
}

const statusColors = {
  active: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
  inactive: "bg-slate-500/10 text-slate-700 border-slate-200",
}

const statusLabels = {
  active: "Aktif",
  inactive: "Pasif",
}

const riskColors = {
  "Düşük": "bg-emerald-500/10 text-emerald-700",
  "Orta": "bg-amber-500/10 text-amber-700",
  "Yüksek": "bg-red-500/10 text-red-700",
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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-serif font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent">
            Müşteri Yönetimi
          </h1>
          <p className="text-slate-600 mt-2 text-lg">
            {customers.length} toplam müşteri • {filteredCustomers.length} görüntülenen
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="bg-white/60 backdrop-blur-sm border-white/40 hover:bg-white/80">
            <TrendingUp className="h-4 w-4 mr-2" />
            CRM Raporu
          </Button>
          <Button className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white shadow-lg shadow-amber-500/25">
            <Mail className="h-4 w-4 mr-2" />
            Toplu E-posta
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {customerStats.map((stat, index) => (
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
            <CardContent className="relative">
              <div className="text-3xl font-bold text-slate-800 mb-2">{stat.value}</div>
              <div className="flex items-center text-sm">
                <TrendingUp className="h-4 w-4 mr-1 text-emerald-600" />
                <span className="font-semibold text-emerald-600">{stat.change}</span>
                <span className="ml-2 text-slate-500">geçen aya göre</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enhanced Filters */}
      <Card className="bg-white/60 backdrop-blur-sm border-white/40 shadow-xl shadow-slate-200/20">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Müşteri ara (isim, email, telefon, şirket)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/60 border-white/40 focus:bg-white/80 transition-all"
              />
            </div>

            {/* Segment Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full lg:w-48 bg-white/60 border-white/40 hover:bg-white/80">
                  <Filter className="h-4 w-4 mr-2" />
                  {segmentFilter ? segmentLabels[segmentFilter as keyof typeof segmentLabels] : "Tüm Segmentler"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white/95 backdrop-blur-sm border-white/40">
                <DropdownMenuItem onClick={() => setSegmentFilter(null)}>
                  Tüm Segmentler
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSegmentFilter("enterprise")}>
                  Kurumsal
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSegmentFilter("corporate")}>
                  Şirket
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSegmentFilter("growing")}>
                  Büyüyen
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSegmentFilter("regular")}>
                  Düzenli
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSegmentFilter("at-risk")}>
                  Risk Altında
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Status Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full lg:w-48 bg-white/60 border-white/40 hover:bg-white/80">
                  <Filter className="h-4 w-4 mr-2" />
                  {statusFilter ? statusLabels[statusFilter as keyof typeof statusLabels] : "Tüm Durumlar"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white/95 backdrop-blur-sm border-white/40">
                <DropdownMenuItem onClick={() => setStatusFilter(null)}>
                  Tüm Durumlar
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("active")}>
                  Aktif
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("inactive")}>
                  Pasif
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Customers Grid */}
      <div className="grid gap-6">
        {filteredCustomers.map((customer) => (
          <Card key={customer.id} className="group relative overflow-hidden bg-white/60 backdrop-blur-sm border-white/40 shadow-xl shadow-slate-200/20 hover:shadow-2xl hover:shadow-slate-300/30 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                {/* Customer Info */}
                <div className="flex-1 space-y-4">
                  {/* Header Row */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                          {customer.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full ${riskColors[customer.riskScore as keyof typeof riskColors].split(' ')[0]} border-2 border-white`} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-800">{customer.name}</h3>
                        <p className="text-slate-600 font-semibold">{customer.company}</p>
                        <p className="text-sm text-slate-500">{customer.position}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-slate-800">₺{customer.totalSpent.toLocaleString()}</p>
                      <p className="text-sm text-slate-500">Toplam Harcama</p>
                    </div>
                  </div>

                  {/* Contact & Location Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-slate-500" />
                        <span className="text-sm text-slate-700">{customer.email}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-slate-500" />
                        <span className="text-sm text-slate-700">{customer.phone}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="h-4 w-4 text-slate-500" />
                        <span className="text-sm text-slate-700">{customer.location}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-4 w-4 text-slate-500" />
                        <div>
                          <p className="text-sm text-slate-700">Müşteri Olma: {formatDate(customer.joinDate)}</p>
                          <p className="text-xs text-slate-500">Son Sipariş: {getRelativeTime(customer.lastOrder)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <TrendingUp className="h-4 w-4 text-slate-500" />
                        <div>
                          <p className="text-sm text-slate-700">Sorumlu: {customer.assignedManager}</p>
                          <p className="text-xs text-slate-500">Sonraki Takip: {formatDate(customer.nextFollowUp)}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Business Metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-50/50 rounded-lg">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-slate-800">{customer.totalOrders}</p>
                      <p className="text-xs text-slate-500">Toplam Sipariş</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-slate-800">₺{customer.averageOrder.toLocaleString()}</p>
                      <p className="text-xs text-slate-500">Ortalama Sipariş</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-slate-800">₺{customer.creditLimit.toLocaleString()}</p>
                      <p className="text-xs text-slate-500">Kredi Limiti</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Star className="h-4 w-4 text-amber-500 fill-current" />
                        <p className="text-2xl font-bold text-slate-800">{customer.satisfaction}</p>
                      </div>
                      <p className="text-xs text-slate-500">Memnuniyet</p>
                    </div>
                  </div>

                  {/* Payment Terms & Tags */}
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-1 bg-blue-50/50 rounded-lg">
                      <Calendar className="h-3 w-3 text-blue-600" />
                      <span className="text-sm font-semibold text-blue-700">{customer.paymentTerms}</span>
                    </div>
                    {customer.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="bg-white/60 border-white/40">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Notes */}
                  {customer.notes && (
                    <div className="bg-blue-50/50 rounded-lg p-3">
                      <p className="text-sm text-slate-700">
                        <span className="font-semibold">Not:</span> {customer.notes}
                      </p>
                    </div>
                  )}
                </div>

                {/* Status & Actions */}
                <div className="lg:w-72 space-y-4">
                  {/* Status Badges */}
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Müşteri Segmenti</p>
                      <Badge className={`${segmentColors[customer.segment as keyof typeof segmentColors]} border w-full justify-center py-2`}>
                        {segmentLabels[customer.segment as keyof typeof segmentLabels]}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Durum</p>
                      <Badge className={`${statusColors[customer.status as keyof typeof statusColors]} border w-full justify-center py-2`}>
                        {statusLabels[customer.status as keyof typeof statusLabels]}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Risk Skoru</p>
                      <Badge className={`${riskColors[customer.riskScore as keyof typeof riskColors]} w-full justify-center py-2`}>
                        {customer.riskScore} Risk
                      </Badge>
                    </div>
                  </div>

                  {/* Customer Type */}
                  <div className="bg-purple-50/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <ShoppingBag className="h-4 w-4 text-purple-600" />
                      <span className="text-sm font-semibold text-purple-700">Müşteri Tipi</span>
                    </div>
                    <p className="text-sm text-purple-600">{customer.customerType}</p>
                  </div>

                  {/* Last Contact Info */}
                  <div className="bg-green-50/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Phone className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-semibold text-green-700">Son İletişim</span>
                    </div>
                    <p className="text-sm text-green-600">
                      {getRelativeTime(customer.lastContact)}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full bg-white/60 border-white/40 hover:bg-white/80"
                      asChild
                    >
                      <Link href={`/admin/customers/${customer.id}`}>
                        <Eye className="h-4 w-4 mr-2" />
                        Müşteri Detayı
                      </Link>
                    </Button>

                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-white/60 border-white/40 hover:bg-white/80"
                      >
                        <Mail className="h-4 w-4 mr-1" />
                        E-posta
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-white/60 border-white/40 hover:bg-white/80"
                      >
                        <Phone className="h-4 w-4 mr-1" />
                        Ara
                      </Button>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full bg-white/60 border-white/40 hover:bg-white/80"
                        >
                          <MoreVertical className="h-4 w-4 mr-2" />
                          Diğer İşlemler
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-white/95 backdrop-blur-sm border-white/40 w-56">
                        <DropdownMenuItem>Sipariş Geçmişi</DropdownMenuItem>
                        <DropdownMenuItem>Ödeme Geçmişi</DropdownMenuItem>
                        <DropdownMenuItem>Segment Değiştir</DropdownMenuItem>
                        <DropdownMenuItem>Kredi Limiti Güncelle</DropdownMenuItem>
                        <DropdownMenuItem>Takip Notu Ekle</DropdownMenuItem>
                        <DropdownMenuItem>Özel Fiyat Tanımla</DropdownMenuItem>
                        <DropdownMenuItem>Rapor Oluştur</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600 focus:text-red-600">
                          Müşteriyi Pasifleştir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Quick Actions based on status */}
                    {customer.status === 'inactive' && (
                      <Button
                        size="sm"
                        className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white"
                      >
                        Müşteriyi Aktifleştir
                      </Button>
                    )}

                    {customer.riskScore === 'Yüksek' && (
                      <Button
                        size="sm"
                        className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
                      >
                        Acil Takip Başlat
                      </Button>
                    )}

                    {customer.segment === 'growing' && (
                      <Button
                        size="sm"
                        className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white"
                      >
                        Segment Yükselt
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredCustomers.length === 0 && (
        <Card className="bg-white/60 backdrop-blur-sm border-white/40 shadow-xl shadow-slate-200/20">
          <CardContent className="text-center py-16">
            <ShoppingBag className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Müşteri bulunamadı</h3>
            <p className="text-slate-600 mb-6">
              Arama kriterlerinize uygun müşteri bulunmuyor. Filtreleri değiştirmeyi deneyin.
            </p>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={() => {
                setSearchQuery("")
                setSegmentFilter(null)
                setStatusFilter(null)
              }}>
                Filtreleri Temizle
              </Button>
              <Button className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white">
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
