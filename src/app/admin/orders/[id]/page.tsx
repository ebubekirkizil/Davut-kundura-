"use client"

import * as React from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  ArrowLeft,
  Printer,
  MoreVertical,
  Package,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  Mail,
  Phone,
  MapPin,
} from "lucide-react"

// Mock order data
const orderData = {
  id: "DK12345678",
  customer: {
    name: "Mehmet Yılmaz",
    email: "mehmet@example.com",
    phone: "+90 532 123 4567",
  },
  date: "2026-05-05T10:30:00",
  status: "delivered",
  payment: {
    status: "paid",
    method: "Kredi Kartı",
    transactionId: "TXN123456789",
  },
  shipping: {
    method: "Hızlı Kargo",
    tracking: "TRK123456789",
    address: {
      fullName: "Mehmet Yılmaz",
      phone: "+90 532 123 4567",
      addressLine: "Atatürk Caddesi No:123 Daire:4",
      city: "İstanbul",
      district: "Kadıköy",
      postalCode: "34710",
    },
  },
  billing: {
    address: {
      fullName: "Mehmet Yılmaz",
      phone: "+90 532 123 4567",
      addressLine: "Atatürk Caddesi No:123 Daire:4",
      city: "İstanbul",
      district: "Kadıköy",
      postalCode: "34710",
    },
  },
  items: [
    {
      id: "1",
      name: "Premium Deri Kemer - Klasik Siyah",
      sku: "DK-001-BLK",
      variant: "Beden: 95cm",
      quantity: 1,
      price: 299,
      image: "/products/belt-1.jpg",
    },
    {
      id: "2",
      name: "Ortopedik Taban - Comfort Plus",
      sku: "DK-002-ORT",
      variant: "Beden: 42",
      quantity: 1,
      price: 149,
      image: "/products/insole-1.jpg",
    },
  ],
  subtotal: 448,
  shipping: 50,
  tax: 100,
  total: 598,
  timeline: [
    {
      status: "delivered",
      label: "Teslim Edildi",
      date: "2026-05-05T16:30:00",
      description: "Sipariş müşteriye teslim edildi",
    },
    {
      status: "shipped",
      label: "Kargoya Verildi",
      date: "2026-05-05T14:00:00",
      description: "Sipariş kargoya teslim edildi - TRK123456789",
    },
    {
      status: "processing",
      label: "Hazırlanıyor",
      date: "2026-05-05T11:00:00",
      description: "Sipariş hazırlanmaya başlandı",
    },
    {
      status: "pending",
      label: "Sipariş Alındı",
      date: "2026-05-05T10:30:00",
      description: "Sipariş başarıyla oluşturuldu",
    },
  ],
}

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

const statusIcons = {
  delivered: CheckCircle,
  shipped: Truck,
  processing: Package,
  pending: Clock,
  cancelled: XCircle,
}

export default function AdminOrderDetailPage() {
  const params = useParams()
  const orderId = params.id

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  const formatShortDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('tr-TR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/orders">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-serif font-bold">Sipariş #{orderId}</h1>
            <p className="text-muted-foreground mt-1">
              {formatDate(orderData.date)}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Printer className="h-4 w-4 mr-2" />
            Yazdır
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <MoreVertical className="h-4 w-4 mr-2" />
                İşlemler
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Durumu Güncelle</DropdownMenuItem>
              <DropdownMenuItem>Fatura Gönder</DropdownMenuItem>
              <DropdownMenuItem>Kargo Takip</DropdownMenuItem>
              <DropdownMenuItem>İade İşlemi</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                İptal Et
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle>Sipariş Ürünleri</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orderData.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 border rounded-lg"
                  >
                    <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">📦</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        SKU: {item.sku}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {item.variant}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{item.price}₺</p>
                      <p className="text-sm text-muted-foreground">
                        Adet: {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="mt-6 pt-6 border-t space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Ara Toplam</span>
                  <span>{orderData.subtotal}₺</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Kargo</span>
                  <span>{orderData.shipping}₺</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">KDV</span>
                  <span>{orderData.tax}₺</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t">
                  <span>Toplam</span>
                  <span>{orderData.total}₺</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Sipariş Geçmişi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orderData.timeline.map((event, index) => {
                  const Icon = statusIcons[event.status as keyof typeof statusIcons]
                  return (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                          <Icon className="h-5 w-5" />
                        </div>
                        {index < orderData.timeline.length - 1 && (
                          <div className="w-0.5 h-full bg-border mt-2" />
                        )}
                      </div>
                      <div className="flex-1 pb-6">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium">{event.label}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatShortDate(event.date)}
                          </p>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <Card>
            <CardHeader>
              <CardTitle>Durum</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Sipariş Durumu
                </label>
                <Badge className={statusColors[orderData.status as keyof typeof statusColors]}>
                  {statusLabels[orderData.status as keyof typeof statusLabels]}
                </Badge>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Ödeme Durumu
                </label>
                <Badge className={paymentColors[orderData.payment.status as keyof typeof paymentColors]}>
                  {paymentLabels[orderData.payment.status as keyof typeof paymentLabels]}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Customer */}
          <Card>
            <CardHeader>
              <CardTitle>Müşteri Bilgileri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="font-medium">{orderData.customer.name}</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>{orderData.customer.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>{orderData.customer.phone}</span>
              </div>
            </CardContent>
          </Card>

          {/* Shipping */}
          <Card>
            <CardHeader>
              <CardTitle>Kargo Bilgileri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Kargo Firması
                </label>
                <p className="text-sm">{orderData.shipping.method}</p>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Takip Numarası
                </label>
                <code className="text-sm bg-muted px-2 py-1 rounded">
                  {orderData.shipping.tracking}
                </code>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Teslimat Adresi
                </label>
                <div className="text-sm space-y-1">
                  <p className="font-medium">{orderData.shipping.address.fullName}</p>
                  <p className="text-muted-foreground">
                    {orderData.shipping.address.addressLine}
                  </p>
                  <p className="text-muted-foreground">
                    {orderData.shipping.address.district}, {orderData.shipping.address.city}
                  </p>
                  <p className="text-muted-foreground">
                    {orderData.shipping.address.postalCode}
                  </p>
                  <p className="text-muted-foreground">
                    {orderData.shipping.address.phone}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment */}
          <Card>
            <CardHeader>
              <CardTitle>Ödeme Bilgileri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Ödeme Yöntemi
                </label>
                <p className="text-sm">{orderData.payment.method}</p>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  İşlem Numarası
                </label>
                <code className="text-sm bg-muted px-2 py-1 rounded">
                  {orderData.payment.transactionId}
                </code>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
