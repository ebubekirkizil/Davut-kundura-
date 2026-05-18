"use client"

import * as React from "react"
import { Header } from "@/components/storefront/Header"
import { Footer } from "@/components/storefront/Footer"
import { FilterBar } from "@/components/storefront/FilterBar"
import { ProductCard } from "@/components/storefront/ProductCard"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

// Mock data - same as storefront-test
const allProducts = [
  {
    id: "1",
    name: "Premium Deri Kemer - Klasik Siyah",
    price: 299,
    originalPrice: 399,
    image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=800",
    category: "Deri Kemerler",
    rating: 4.8,
    reviewCount: 124,
    isNew: true,
    isSale: true,
  },
  {
    id: "2",
    name: "Ortopedik Taban - Comfort Plus",
    price: 149,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800",
    category: "Ortopedik Tabanlar",
    rating: 4.9,
    reviewCount: 89,
    isNew: true,
  },
  {
    id: "3",
    name: "Ayakkabı Bakım Seti - Premium",
    price: 199,
    originalPrice: 249,
    image: "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?q=80&w=800",
    category: "Bakım Ürünleri",
    rating: 4.7,
    reviewCount: 56,
    isSale: true,
  },
  {
    id: "4",
    name: "Deri Kemer - Kahverengi Vintage",
    price: 349,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800",
    category: "Deri Kemerler",
    rating: 4.6,
    reviewCount: 43,
  },
  {
    id: "5",
    name: "Klasik Deri Oxford Ayakkabı",
    price: 2450,
    image: "https://images.unsplash.com/photo-1614252339476-53784e0bf8dd?q=80&w=800",
    category: "Ayakkabılar",
    rating: 4.9,
    reviewCount: 167,
  },
  {
    id: "6",
    name: "Ortopedik Taban - Sport",
    price: 179,
    originalPrice: 229,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800",
    category: "Ortopedik Tabanlar",
    rating: 4.8,
    reviewCount: 92,
    isSale: true,
  },
  {
    id: "7",
    name: "Deri Cüzdan - Minimalist",
    price: 249,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800",
    category: "Deri Aksesuarlar",
    rating: 4.9,
    reviewCount: 78,
    isNew: true,
  },
  {
    id: "8",
    name: "Premium Ayakkabı Boyası - Siyah",
    price: 149,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800",
    category: "Bakım Ürünleri",
    rating: 4.4,
    reviewCount: 34,
  },
  {
    id: "9",
    name: "Deri Kemer - Lacivert Premium",
    price: 329,
    originalPrice: 429,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800",
    category: "Deri Kemerler",
    rating: 4.7,
    reviewCount: 67,
    isSale: true,
  },
  {
    id: "10",
    name: "Deri Loafer Ayakkabı",
    price: 3100,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800",
    category: "Ayakkabılar",
    rating: 4.9,
    reviewCount: 145,
    isNew: true,
  },
]

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null)
  const [sortBy, setSortBy] = React.useState("featured")
  const [priceRange, setPriceRange] = React.useState<[number, number]>([0, 9999])
  const [minRating, setMinRating] = React.useState(0)
  const [isLoading, setIsLoading] = React.useState(false)

  // Get unique categories
  const categories = Array.from(new Set(allProducts.map((p) => p.category)))

  // Filter products
  const filteredProducts = React.useMemo(() => {
    let filtered = [...allProducts]

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory)
    }

    // Price range filter
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    )

    // Rating filter
    if (minRating > 0) {
      filtered = filtered.filter((p) => (p.rating || 0) >= minRating)
    }

    // Sort
    switch (sortBy) {
      case "newest":
        filtered = filtered.filter((p) => p.isNew)
        break
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      default:
        // featured - keep original order
        break
    }

    return filtered
  }, [selectedCategory, priceRange, minRating, sortBy])

  return (
    <>
      <Header />

      <main className="min-h-screen bg-background">
        {/* Page Header */}
        <div className="bg-muted/30 border-b">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">
              Tüm Ürünler
            </h1>
            <p className="text-muted-foreground">
              {filteredProducts.length} ürün bulundu
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Filter Bar */}
          <FilterBar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            sortBy={sortBy}
            onSortChange={setSortBy}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            minRating={minRating}
            onMinRatingChange={setMinRating}
            className="mb-8"
          />

          {/* Active Filters */}
          {(selectedCategory || minRating > 0 || priceRange[0] > 0 || priceRange[1] < 9999) && (
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedCategory && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                >
                  {selectedCategory} ✕
                </Button>
              )}
              {minRating > 0 && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setMinRating(0)}
                >
                  {minRating}+ Yıldız ✕
                </Button>
              )}
              {(priceRange[0] > 0 || priceRange[1] < 9999) && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setPriceRange([0, 9999])}
                >
                  Fiyat: {priceRange[0]}₺ - {priceRange[1] === 9999 ? "∞" : `${priceRange[1]}₺`} ✕
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedCategory(null)
                  setMinRating(0)
                  setPriceRange([0, 9999])
                }}
              >
                Tümünü Temizle
              </Button>
            </div>
          )}

          {/* Products Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-square w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">Ürün Bulunamadı</h3>
              <p className="text-muted-foreground mb-6">
                Aradığınız kriterlere uygun ürün bulunmamaktadır.
              </p>
              <Button
                onClick={() => {
                  setSelectedCategory(null)
                  setMinRating(0)
                  setPriceRange([0, 9999])
                }}
              >
                Filtreleri Temizle
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  )
}
