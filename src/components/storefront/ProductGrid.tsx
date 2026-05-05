"use client"

import * as React from "react"
import { ProductCard } from "./ProductCard"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  rating?: number
  reviewCount?: number
  isNew?: boolean
  isSale?: boolean
}

interface ProductGridProps {
  title?: string
  description?: string
  products: Product[]
  columns?: 2 | 3 | 4
  showLoadMore?: boolean
  className?: string
}

export function ProductGrid({
  title,
  description,
  products,
  columns = 4,
  showLoadMore = false,
  className,
}: ProductGridProps) {
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null)
  const [displayCount, setDisplayCount] = React.useState(8)

  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  }

  const displayedProducts = products.slice(0, displayCount)
  const hasMore = displayCount < products.length

  return (
    <section className={cn("py-16", className)}>
      <div className="container mx-auto px-4">
        {/* Header */}
        {(title || description) && (
          <div className="text-center mb-12 space-y-4">
            {title && (
              <h2 className="text-3xl md:text-4xl font-serif font-bold">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Product Grid */}
        <div className={cn("grid gap-6", gridCols[columns])}>
          {displayedProducts.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              onQuickView={() => setSelectedProduct(product)}
            />
          ))}
        </div>

        {/* Load More */}
        {showLoadMore && hasMore && (
          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              onClick={() => setDisplayCount((prev) => prev + 8)}
            >
              Daha Fazla Ürün Yükle
            </Button>
          </div>
        )}

        {/* Empty State */}
        {products.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">Ürün Bulunamadı</h3>
            <p className="text-muted-foreground">
              Aradığınız kriterlere uygun ürün bulunmamaktadır.
            </p>
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedProduct?.name}</DialogTitle>
            <DialogDescription>{selectedProduct?.category}</DialogDescription>
          </DialogHeader>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Product Image */}
            <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
              <span className="text-8xl">📦</span>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              {/* Price */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold">
                    {selectedProduct?.price.toLocaleString('tr-TR')}₺
                  </span>
                  {selectedProduct?.originalPrice && (
                    <span className="text-xl text-muted-foreground line-through">
                      {selectedProduct.originalPrice.toLocaleString('tr-TR')}₺
                    </span>
                  )}
                </div>
                {selectedProduct?.rating && (
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={cn(
                            "text-lg",
                            i < Math.floor(selectedProduct.rating || 0)
                              ? "text-accent"
                              : "text-muted"
                          )}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ({selectedProduct.reviewCount} değerlendirme)
                    </span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="font-semibold">Ürün Açıklaması</h4>
                <p className="text-sm text-muted-foreground">
                  Premium kalite deri işçiliği ile üretilmiş, uzun ömürlü ve şık tasarım.
                  Günlük kullanım için ideal, rahat ve dayanıklı yapı.
                </p>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Button size="lg" className="w-full">
                  Sepete Ekle
                </Button>
                <Button size="lg" variant="outline" className="w-full" asChild>
                  <a href={`/products/${selectedProduct?.id}`}>
                    Detaylı İncele
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
