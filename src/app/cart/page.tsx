"use client"

import * as React from "react"
import Link from "next/link"
import { Header } from "@/components/storefront/Header"
import { Footer } from "@/components/storefront/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/contexts/CartContext"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice, totalItems } = useCart()

  const shippingCost = totalPrice >= 500 ? 0 : 50
  const finalTotal = totalPrice + shippingCost

  if (items.length === 0) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center py-16 px-4">
            <ShoppingBag className="h-24 w-24 mx-auto mb-6 text-muted-foreground" />
            <h1 className="text-3xl font-serif font-bold mb-4">Sepetiniz Boş</h1>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Henüz sepetinize ürün eklemediniz. Alışverişe başlamak için ürünlerimize göz atın.
            </p>
            <Button size="lg" asChild>
              <Link href="/products">
                Ürünleri Keşfet
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-8">
            Sepetim ({totalItems} Ürün)
          </h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={`${item.id}-${item.size}-${item.color}`}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="w-24 h-24 flex-shrink-0 bg-muted rounded-lg overflow-hidden">
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent/10 to-primary/10">
                          <span className="text-3xl">📦</span>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold mb-1 truncate">{item.name}</h3>
                        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mb-3">
                          {item.size && <span>Beden: {item.size}</span>}
                          {item.color && <span>Renk: {item.color}</span>}
                        </div>

                        <div className="flex items-center justify-between">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(`${item.id}-${item.size}-${item.color}`, item.quantity - 1)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(`${item.id}-${item.size}-${item.color}`, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <div className="font-bold text-lg">
                              {(item.price * item.quantity).toLocaleString('tr-TR')}₺
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {item.price.toLocaleString('tr-TR')}₺ / adet
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="flex-shrink-0"
                        onClick={() => removeItem(`${item.id}-${item.size}-${item.color}`)}
                      >
                        <Trash2 className="h-5 w-5 text-destructive" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-xl font-serif font-bold">Sipariş Özeti</h2>

                  <div className="space-y-2 py-4 border-y">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Ara Toplam</span>
                      <span className="font-medium">{totalPrice.toLocaleString('tr-TR')}₺</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Kargo</span>
                      <span className={cn(
                        "font-medium",
                        shippingCost === 0 && "text-green-600"
                      )}>
                        {shippingCost === 0 ? "Ücretsiz" : `${shippingCost}₺`}
                      </span>
                    </div>
                    {totalPrice < 500 && (
                      <p className="text-xs text-muted-foreground">
                        Ücretsiz kargo için {(500 - totalPrice).toLocaleString('tr-TR')}₺ daha ekleyin
                      </p>
                    )}
                  </div>

                  <div className="flex justify-between text-lg font-bold">
                    <span>Toplam</span>
                    <span>{finalTotal.toLocaleString('tr-TR')}₺</span>
                  </div>

                  <Button size="lg" className="w-full" asChild>
                    <Link href="/checkout">
                      Ödemeye Geç
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>

                  <Button variant="outline" size="lg" className="w-full" asChild>
                    <Link href="/products">
                      Alışverişe Devam Et
                    </Link>
                  </Button>

                  {/* Trust Badges */}
                  <div className="pt-4 space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                      <span>Güvenli Ödeme</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                      <span>14 Gün İade Garantisi</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                      <span>Hızlı Kargo</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
