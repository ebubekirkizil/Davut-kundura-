"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/storefront/Header"
import { Footer } from "@/components/storefront/Footer"
import { ProductGrid } from "@/components/storefront/ProductGrid"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { ChevronRight, Heart, Share2, ShoppingCart, Star, Truck, Shield, RotateCcw } from "lucide-react"
import { toast } from "sonner"
import { useCart } from "@/contexts/CartContext"

// Mock product data
const product = {
  id: "1",
  name: "Premium Deri Kemer - Klasik Siyah",
  price: 299,
  originalPrice: 399,
  category: "Deri Kemerler",
  rating: 4.8,
  reviewCount: 124,
  inStock: true,
  sku: "DK-001-BLK",
  description: "El işçiliği ile üretilmiş, %100 hakiki deri kemer. Premium kalite tokası ve dikişleri ile uzun ömürlü kullanım sağlar. Günlük ve özel günler için ideal.",
  features: [
    "100% Hakiki Deri",
    "El İşçiliği",
    "Premium Kalite Toka",
    "Çift Dikim Tekniği",
    "5 Yıl Garanti",
  ],
  sizes: ["85", "90", "95", "100", "105", "110"],
  colors: [
    { name: "Siyah", value: "#000000" },
    { name: "Kahverengi", value: "#8B4513" },
    { name: "Lacivert", value: "#000080" },
  ],
  images: [
    "/products/belt-1.jpg",
    "/products/belt-1-detail.jpg",
    "/products/belt-1-side.jpg",
    "/products/belt-1-back.jpg",
  ],
}

const relatedProducts = [
  {
    id: "2",
    name: "Deri Kemer - Kahverengi Vintage",
    price: 349,
    image: "/products/belt-2.jpg",
    category: "Deri Kemerler",
    rating: 4.6,
    reviewCount: 43,
  },
  {
    id: "3",
    name: "Deri Kemer - Lacivert Premium",
    price: 329,
    originalPrice: 429,
    image: "/products/belt-3.jpg",
    category: "Deri Kemerler",
    rating: 4.7,
    reviewCount: 67,
    isSale: true,
  },
  {
    id: "4",
    name: "Deri Cüzdan - Minimalist",
    price: 249,
    image: "/products/wallet-1.jpg",
    category: "Deri Aksesuarlar",
    rating: 4.9,
    reviewCount: 78,
    isNew: true,
  },
  {
    id: "5",
    name: "Ayakkabı Bakım Seti - Premium",
    price: 199,
    originalPrice: 249,
    image: "/products/care-1.jpg",
    category: "Bakım Ürünleri",
    rating: 4.7,
    reviewCount: 56,
    isSale: true,
  },
]

const reviews = [
  {
    id: "1",
    author: "Mehmet Y.",
    rating: 5,
    date: "2 hafta önce",
    comment: "Harika bir ürün! Kalitesi çok iyi, tam beklediğim gibi. Kesinlikle tavsiye ederim.",
    verified: true,
  },
  {
    id: "2",
    author: "Ayşe K.",
    rating: 5,
    date: "1 ay önce",
    comment: "Eşime aldım, çok beğendi. Deri kalitesi gerçekten premium. Teşekkürler.",
    verified: true,
  },
  {
    id: "3",
    author: "Can D.",
    rating: 4,
    date: "2 ay önce",
    comment: "Güzel bir ürün ama biraz sert geldi. Zamanla yumuşayacağını düşünüyorum.",
    verified: true,
  },
]

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = React.useState(0)
  const [selectedSize, setSelectedSize] = React.useState<string | null>(null)
  const [selectedColor, setSelectedColor] = React.useState(product.colors[0])
  const [quantity, setQuantity] = React.useState(1)
  const [isWishlisted, setIsWishlisted] = React.useState(false)
  const { addItem } = useCart()

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Lütfen bir beden seçin")
      return
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      color: selectedColor.name,
      quantity,
    })

    toast.success("Ürün sepete eklendi!")
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <div className="border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">
                Ana Sayfa
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/products" className="hover:text-foreground transition-colors">
                Ürünler
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link href={`/products?category=${product.category}`} className="hover:text-foreground transition-colors">
                {product.category}
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">{product.name}</span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent/10 to-primary/10">
                  <span className="text-8xl">📦</span>
                </div>
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      "aspect-square bg-muted rounded-lg overflow-hidden border-2 transition-colors",
                      selectedImage === index
                        ? "border-accent"
                        : "border-transparent hover:border-accent/50"
                    )}
                  >
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent/10 to-primary/10">
                      <span className="text-2xl">📦</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Title & Rating */}
              <div>
                <h1 className="text-3xl font-serif font-bold mb-2">{product.name}</h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-5 w-5",
                          i < Math.floor(product.rating)
                            ? "fill-accent text-accent"
                            : "text-muted"
                        )}
                      />
                    ))}
                    <span className="ml-2 text-sm text-muted-foreground">
                      {product.rating} ({product.reviewCount} değerlendirme)
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">SKU: {product.sku}</span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4">
                <span className="text-4xl font-bold">{product.price}₺</span>
                {product.originalPrice && (
                  <>
                    <span className="text-2xl text-muted-foreground line-through">
                      {product.originalPrice}₺
                    </span>
                    <span className="px-3 py-1 bg-destructive text-destructive-foreground rounded-full text-sm font-semibold">
                      %{discount} İNDİRİM
                    </span>
                  </>
                )}
              </div>

              {/* Stock Status */}
              <div className={cn(
                "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium",
                product.inStock
                  ? "bg-green-500/10 text-green-700 dark:text-green-400"
                  : "bg-destructive/10 text-destructive"
              )}>
                <div className={cn(
                  "h-2 w-2 rounded-full",
                  product.inStock ? "bg-green-500" : "bg-destructive"
                )} />
                {product.inStock ? "Stokta Var" : "Stokta Yok"}
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>

              {/* Features */}
              <div>
                <h3 className="font-semibold mb-3">Özellikler:</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Color Selection */}
              <div>
                <h3 className="font-semibold mb-3">Renk: {selectedColor.name}</h3>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={cn(
                        "h-10 w-10 rounded-full border-2 transition-all",
                        selectedColor.name === color.name
                          ? "border-accent scale-110"
                          : "border-transparent hover:border-accent/50"
                      )}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <h3 className="font-semibold mb-3">Beden:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "px-4 py-2 rounded-md border-2 transition-all font-medium",
                        selectedSize === size
                          ? "border-accent bg-accent text-accent-foreground"
                          : "border-border hover:border-accent/50"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <h3 className="font-semibold mb-3">Adet:</h3>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  size="lg"
                  className="flex-1"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Sepete Ekle
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                >
                  <Heart className={cn("h-5 w-5", isWishlisted && "fill-current text-destructive")} />
                </Button>
                <Button size="lg" variant="outline">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t">
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-accent" />
                  <div className="text-sm">
                    <div className="font-medium">Ücretsiz Kargo</div>
                    <div className="text-muted-foreground">500₺ üzeri</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-accent" />
                  <div className="text-sm">
                    <div className="font-medium">Güvenli Ödeme</div>
                    <div className="text-muted-foreground">SSL Sertifikalı</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <RotateCcw className="h-5 w-5 text-accent" />
                  <div className="text-sm">
                    <div className="font-medium">Kolay İade</div>
                    <div className="text-muted-foreground">14 gün içinde</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-serif font-bold mb-6">Müşteri Değerlendirmeleri</h2>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Rating Summary */}
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-5xl font-bold mb-2">{product.rating}</div>
                  <div className="flex justify-center mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-5 w-5",
                          i < Math.floor(product.rating)
                            ? "fill-accent text-accent"
                            : "text-muted"
                        )}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {product.reviewCount} değerlendirme
                  </p>
                </CardContent>
              </Card>

              {/* Reviews List */}
              <div className="lg:col-span-2 space-y-6">
                {reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold">{review.author}</span>
                            {review.verified && (
                              <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded">
                                Doğrulanmış Alıcı
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={cn(
                                    "h-4 w-4",
                                    i < review.rating
                                      ? "fill-accent text-accent"
                                      : "text-muted"
                                  )}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-16">
            <ProductGrid
              title="Benzer Ürünler"
              description="Size önerebileceğimiz diğer ürünler"
              products={relatedProducts}
              columns={4}
            />
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
