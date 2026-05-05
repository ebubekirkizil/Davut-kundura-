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
    email: "mehmet@example.com",
    phone: "+90 532 123 4567",
    location: "İstanbul, Kadıköy",
    totalOrders: 12,
    totalSpent: 4580,
    averageOrder: 382,
    lastOrder: "2026-05-05T10:30:00",
    joinDate: "2025-08-15",
    segment: "vip",
    status: "active",
  },
  {
    id: "2",
    name: "Ayşe Kaya",
    email: "ayse@example.com",
    phone: "+90 533 234 5678",
    location: "Ankara, Çankaya",
    totalOrders: 8,
    totalSpent: 2890,
    averageOrder: 361,
    lastOrder: "2026-05-04T16:45:00",
    joinDate: "2025-10-20",
    segment: "regular",
    status: "active",
  },
  {
    id: "3",
    name: "Can Demir",
    email: "can@example.com",
    phone: "+90 534 345 6789",
    location: "İzmir, Karşıyaka",
    totalOrders: 3,
    totalSpent: 890,
    averageOrder: 297,
    lastOrder: "2026-04-28T14:20:00",
    joinDate: "2026-02-10",
    segment: "new",
    status: "active",
  },
  {
    id: "4",
    name: "Zeynep Arslan",
    email: "zeynep@example.com",
    phone: "+90 535 456 7890",
    location: "Bursa, Nilüfer",
    totalOrders: 18,
    totalSpent: 6240,
    averageOrder: 347,
    lastOrder: "2026-05-03T11:30:00",
    joinDate: "2025-06-05",
    segment: "vip",
    status: "active",
  },
  {
    id: "5",
    name: "Ahmet Öztürk",
    email: "ahmet@example.com",
    phone: "+90 536 567 8901",
    location: "Antalya, Muratpaşa",
    totalOrders: 1,
    totalSpent: 249,
    averageOrder: 249,
    lastOrder: "2025-12-15T09:15:00",
    joinDate: "2025-12-10",
    segment: "at-risk",
    status: "inactive",
  },
]

const segmentColors = {
  vip: "bg-purple-500/10 text-purple-700",
  regular: "bg-blue-500/10 text-blue-700",
  new: "bg-green-500/10 text-green-700",
  "at-risk": "bg-orange-500/10 text-orange-700",
}

const segmentLabels = {
  vip: "VIP",
  regular: "Düzenli",
  new: "Yeni",
  "at-risk": "Risk Altında",
}

const statusColors = {
  active: "bg-green-500/10 text-green-700",
  inactive: "bg-gray-500/10 text-gray-700",
}

const statusLabels = {
  active: "Aktif",
  inactive: "Pasif",
}

export default function AdminCustomersPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [segmentFilter, setSegmentFilter] = React.useState<string | null>(null)

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery)

    const matchesSegment = !segmentFilter || customer.segment === segmentFilter

    return matchesSearch && matchesSegment
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('tr-TR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date)
  }

  const totalCustomers = customers.length
  const activeCustomers = customers.filter((c) => c.status === "active").length
  const vipCustomers = customers.filter((c) => c.segment === "vip").length
  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0)
  const avgLifetimeValue = totalRevenue / totalCustomers

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold">Müşteri Yönetimi</h1>
          <p className="text-muted-foreground mt-1">
            {totalCustomers} müşteri
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Müşteri</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomers}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {activeCustomers} aktif
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">VIP Müşteri</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vipCustomers}</div>
            <p className="text-xs text-muted-foreground mt-1">
              %{((vipCustomers / totalCustomers) * 100).toFixed(0)} toplam
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Gelir</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₺{totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Tüm müşterilerden
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ort. Yaşam Boyu Değer</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₺{avgLifetimeValue.toFixed(0)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Müşteri başına
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Müşteri ara (isim, email, telefon)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              {segmentFilter ? segmentLabels[segmentFilter as keyof typeof segmentLabels] : "Tüm Segmentler"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setSegmentFilter(null)}>
              Tüm Segmentler
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSegmentFilter("vip")}>
              VIP
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSegmentFilter("regular")}>
              Düzenli
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSegmentFilter("new")}>
              Yeni
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSegmentFilter("at-risk")}>
              Risk Altında
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Customers Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="text-left p-4 font-semibold">Müşteri</th>
                  <th className="text-left p-4 font-semibold">İletişim</th>
                  <th className="text-left p-4 font-semibold">Segment</th>
                  <th className="text-right p-4 font-semibold">Sipariş</th>
                  <th className="text-right p-4 font-semibold">Toplam Harcama</th>
                  <th className="text-right p-4 font-semibold">Ort. Sipariş</th>
                  <th className="text-left p-4 font-semibold">Son Sipariş</th>
                  <th className="text-right p-4 font-semibold">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="border-b hover:bg-muted/50 transition-colors">
                    <td className="p-4">
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                          <MapPin className="h-3 w-3" />
                          <span>{customer.location}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">{customer.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">{customer.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <Badge className={segmentColors[customer.segment as keyof typeof segmentColors]}>
                          {segmentLabels[customer.segment as keyof typeof segmentLabels]}
                        </Badge>
                        <Badge className={statusColors[customer.status as keyof typeof statusColors]}>
                          {statusLabels[customer.status as keyof typeof statusLabels]}
                        </Badge>
                      </div>
                    </td>
                    <td className="p-4 text-right font-semibold">
                      {customer.totalOrders}
                    </td>
                    <td className="p-4 text-right font-semibold">
                      ₺{customer.totalSpent.toLocaleString()}
                    </td>
                    <td className="p-4 text-right text-muted-foreground">
                      ₺{customer.averageOrder}
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">
                      {formatDate(customer.lastOrder)}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/admin/customers/${customer.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Email Gönder</DropdownMenuItem>
                            <DropdownMenuItem>Sipariş Geçmişi</DropdownMenuItem>
                            <DropdownMenuItem>Segment Değiştir</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              Müşteriyi Sil
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredCustomers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Müşteri bulunamadı</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
