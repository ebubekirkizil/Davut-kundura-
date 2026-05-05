"use client"

import * as React from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Package, Eye } from "lucide-react"

// Mock orders data
const orders = [
  {
    id: "DK12345678",
    date: "15 Nisan 2026",
    status: "delivered",
    statusText: "Teslim Edildi",
    total: 598,
    items: [
      { name: "Premium Deri Kemer - Klasik Siyah", quantity: 2, price: 299 },
    ],
  },
  {
    id: "DK12345677",
    date: "10 Nisan 2026",
    status: "shipped",
    statusText: "Kargoda",
    total: 348,
    items: [
      { name: "Ortopedik Taban - Comfort Plus", quantity: 1, price: 149 },
      { name: "Ayakkabı Bakım Seti - Premium", quantity: 1, price: 199 },
    ],
  },
  {
    id: "DK12345676",
    date: "5 Nisan 2026",
    status: "processing",
    statusText: "Hazırlanıyor",
    total: 249,
    items: [
      { name: "Deri Cüzdan - Minimalist", quantity: 1, price: 249 },
    ],
  },
]

const statusColors = {
  delivered: "bg-green-500/10 text-green-700 dark:text-green-400",
  shipped: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  processing: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
  cancelled: "bg-destructive/10 text-destructive",
}

export default function OrdersPage() {
  if (orders.length === 0) {
    return (
      <div className="text-center py-16">
        <Package className="h-24 w-24 mx-auto mb-6 text-muted-foreground" />
        <h2 className="text-2xl font-serif font-bold mb-4">Henüz Siparişiniz Yok</h2>
        <p className="text-muted-foreground mb-8">
          İlk siparişinizi vermek için ürünlerimize göz atın.
        </p>
        <Button asChild>
          <Link href="/products">Ürünleri Keşfet</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-serif font-bold">Siparişlerim</h2>
        <p className="text-sm text-muted-foreground">{orders.length} sipariş</p>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg mb-2">
                    Sipariş #{order.id}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{order.date}</p>
                </div>
                <Badge
                  className={statusColors[order.status as keyof typeof statusColors]}
                >
                  {order.statusText}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Order Items */}
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-muted-foreground">
                        {item.name} x{item.quantity}
                      </span>
                      <span className="font-medium">
                        {(item.price * item.quantity).toLocaleString('tr-TR')}₺
                      </span>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="flex justify-between pt-4 border-t">
                  <span className="font-semibold">Toplam</span>
                  <span className="font-bold text-lg">
                    {order.total.toLocaleString('tr-TR')}₺
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/account/orders/${order.id}`}>
                      <Eye className="h-4 w-4 mr-2" />
                      Detayları Gör
                    </Link>
                  </Button>
                  {order.status === "delivered" && (
                    <Button variant="outline" size="sm">
                      Tekrar Sipariş Ver
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
