"use client"

import * as React from "react"
import Link from "next/link"
import { Header } from "@/components/storefront/Header"
import { Footer } from "@/components/storefront/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Package, Truck, Home } from "lucide-react"

export default function OrderSuccessPage() {
  const orderNumber = React.useMemo(() => {
    return `DK${Date.now().toString().slice(-8)}`
  }, [])

  return (
    <>
      <Header />

      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            {/* Success Icon */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-green-500/20 rounded-full blur-2xl animate-pulse" />
                <CheckCircle className="relative h-24 w-24 text-green-600" />
              </div>
            </div>

            {/* Success Message */}
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-serif font-bold">
                Siparişiniz Alındı!
              </h1>
              <p className="text-lg text-muted-foreground">
                Siparişiniz başarıyla oluşturuldu. Kısa süre içinde kargoya verilecektir.
              </p>
            </div>

            {/* Order Number */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Sipariş Numaranız</p>
                  <p className="text-2xl font-bold font-mono">{orderNumber}</p>
                  <p className="text-sm text-muted-foreground">
                    Sipariş detaylarını e-posta adresinize gönderdik.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <div className="grid md:grid-cols-3 gap-4 pt-8">
              <Card>
                <CardContent className="p-6 text-center space-y-3">
                  <Package className="h-8 w-8 mx-auto text-accent" />
                  <h3 className="font-semibold">Hazırlanıyor</h3>
                  <p className="text-sm text-muted-foreground">
                    Siparişiniz hazırlanıyor
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center space-y-3">
                  <Truck className="h-8 w-8 mx-auto text-accent" />
                  <h3 className="font-semibold">Kargoda</h3>
                  <p className="text-sm text-muted-foreground">
                    1-3 iş günü içinde kargoya verilecek
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center space-y-3">
                  <Home className="h-8 w-8 mx-auto text-accent" />
                  <h3 className="font-semibold">Teslim</h3>
                  <p className="text-sm text-muted-foreground">
                    Adresinize teslim edilecek
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Button size="lg" asChild>
                <Link href="/account/orders">
                  Siparişlerimi Görüntüle
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/products">
                  Alışverişe Devam Et
                </Link>
              </Button>
            </div>

            {/* Help */}
            <div className="pt-8 border-t">
              <p className="text-sm text-muted-foreground">
                Sorularınız mı var?{" "}
                <Link href="/contact" className="text-accent hover:underline">
                  Bize ulaşın
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
