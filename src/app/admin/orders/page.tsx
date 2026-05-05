"use client"

import * as React from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, Filter, Eye, Printer, MoreVertical } from "lucide-react"

// Mock orders data
const orders = [
  {
    id: "DK12345678",
    customer: {
      name: "Mehmet Yılmaz",
      email: "mehmet@example.com",
    },
    date: "2026-05-05T10:30:00",
    status: "delivered",
    payment: "paid",
    total: 598,
    items: 2,
    shipping: {
      method: "Hızlı Kargo",
      tracking: "TRK123456789",
    },
  },
  {
    id: "DK12345677",
    customer: {
      name: "Ayşe Kaya",
      email: "ayse@example.com",
    },
    date: "2026-05-05T09:15:00",
    status: "shipped",
    payment: "paid",
    total: 348,
    items: 2,
    shipping: {
      method: "Standart Kargo",
      tracking: "TRK123456788",
    },
  },
  {
    id: "DK12345676",
    customer: {
      name: "Can Demir",
      email: "can@example.com",
    },
    date: "2026-05-04T16:45:00",
    status: "processing",
    payment: "paid",
    total: 249,
    items: 1,
    shipping: {
      method: "Hızlı Kargo",
      tracking: null,
    },
  },
  {
    id: "DK12345675",
    customer: {
      name: "Zeynep Arslan",
      email: "zeynep@example.com",
    },
    date: "2026-05-04T14:20:00",
    status: "pending",
    payment: "pending",
    total: 450,
    items: 3,
    shipping: {
      method: "Standart Kargo",
      tracking: null,
    },
  },
]

const statusColors = {
  delivered: "bg-green-500/10 text-green-700",
  shipped: "bg-blue-500/10 text-blue-700",
  processing: "bg-yellow-500/10 text-yellow-700",
  pending: "bg-orange-500/10 text-orange-700",
  cancelled: "bg-red-500/10 text-red-700",
}

const statusLabels = {
  delivered: "Teslim Edildi",
  shipped: "Kargoda",
  processing: "Hazırlanıyor",
  pending: "Beklemede",
  cancelled: "İptal Edildi",
}

const paymentColors = {
  paid: "bg-green-500/10 text-green-700",
  pending: "bg-yellow-500/10 text-yellow-700",
  failed: "bg-red-500/10 text-red-700",
  refunded: "bg-gray-500/10 text-gray-700",
}

const paymentLabels = {
  paid: "Ödendi",
  pending: "Beklemede",
  failed: "Başarısız",
  refunded: "İade Edildi",
}

export default function AdminOrdersPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState<string | null>(null)

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = !statusFilter || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('tr-TR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold">Sipariş Yönetimi</h1>
          <p className="text-muted-foreground mt-1">
            {orders.length} sipariş
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Sipariş ara (numara, müşteri)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              {statusFilter ? statusLabels[statusFilter as keyof typeof statusLabels] : "Tüm Durumlar"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setStatusFilter(null)}>
              Tüm Durumlar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("pending")}>
              Beklemede
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("processing")}>
              Hazırlanıyor
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("shipped")}>
              Kargoda
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("delivered")}>
              Teslim Edildi
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("cancelled")}>
              İptal Edildi
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Orders Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="text-left p-4 font-semibold">Sipariş</th>
                  <th className="text-left p-4 font-semibold">Müşteri</th>
                  <th className="text-left p-4 font-semibold">Tarih</th>
                  <th className="text-left p-4 font-semibold">Durum</th>
                  <th className="text-left p-4 font-semibold">Ödeme</th>
                  <th className="text-left p-4 font-semibold">Toplam</th>
                  <th className="text-right p-4 font-semibold">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-muted/50 transition-colors">
                    <td className="p-4">
                      <div>
                        <p className="font-medium">#{order.id}</p>
                        <p className="text-sm text-muted-foreground">
                          {order.items} ürün
                        </p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="font-medium">{order.customer.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {order.customer.email}
                        </p>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">
                      {formatDate(order.date)}
                    </td>
                    <td className="p-4">
                      <Badge className={statusColors[order.status as keyof typeof statusColors]}>
                        {statusLabels[order.status as keyof typeof statusLabels]}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge className={paymentColors[order.payment as keyof typeof paymentColors]}>
                        {paymentLabels[order.payment as keyof typeof paymentLabels]}
                      </Badge>
                    </td>
                    <td className="p-4 font-semibold">
                      {order.total}₺
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/admin/orders/${order.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Printer className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Durumu Güncelle</DropdownMenuItem>
                            <DropdownMenuItem>Fatura Gönder</DropdownMenuItem>
                            <DropdownMenuItem>Kargo Takip</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              İptal Et
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

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Sipariş bulunamadı</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
