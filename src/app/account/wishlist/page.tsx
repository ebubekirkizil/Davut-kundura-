"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/storefront/ProductCard"
import { Heart } from "lucide-react"

// Mock wishlist data
const wishlistItems = [
  {
    id: "2",
    name: "Ortopedik Taban - Comfort Plus",
    price: 149,
    image: "/products/insole-1.jpg",
    category: "Ortopedik Tabanlar",
    rating: 4.9,
    reviewCount: 89,
    isNew: true,
  },
  {
    id: "7",
    name: "Deri Cüzdan - Minimalist",
    price: 249,
    image: "/products/wallet-1.jpg",
    category: "Deri Aksesuarlar",
    rating: 4.9,
    reviewCount: 78,
    isNew: true,
  },
]

export default function WishlistPage() {
  if (wishlistItems.length === 0) {
    return (
      <div className="text-center py-16">
        <Heart className="h-24 w-24 mx-auto mb-6 text-muted-foreground" />
        <h2 className="text-2xl font-serif font-bold mb-4">Favori Listeniz Boş</h2>
        <p className="text-muted-foreground mb-8">
          Beğendiğiniz ürünleri favorilere ekleyerek daha sonra kolayca bulabilirsiniz.
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
        <h2 className="text-2xl font-serif font-bold">Favorilerim</h2>
        <p className="text-sm text-muted-foreground">{wishlistItems.length} ürün</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistItems.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  )
}
