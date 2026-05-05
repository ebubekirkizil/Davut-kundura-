"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ProductCardProps {
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
  className?: string
  onQuickView?: () => void
}

export function ProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  category,
  rating = 0,
  reviewCount = 0,
  isNew = false,
  isSale = false,
  className,
  onQuickView,
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = React.useState(false)
  const [isHovered, setIsHovered] = React.useState(false)

  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0

  return (
    <div
      className={cn(
        "group relative bg-card rounded-lg border overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {isNew && (
          <span className="px-2 py-1 text-xs font-semibold bg-accent text-accent-foreground rounded">
            YENİ
          </span>
        )}
        {isSale && discount > 0 && (
          <span className="px-2 py-1 text-xs font-semibold bg-destructive text-destructive-foreground rounded">
            %{discount} İNDİRİM
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={() => setIsWishlisted(!isWishlisted)}
        className={cn(
          "absolute top-3 right-3 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm transition-all duration-300",
          isWishlisted ? "text-destructive" : "text-muted-foreground hover:text-destructive"
        )}
      >
        <Heart className={cn("h-5 w-5", isWishlisted && "fill-current")} />
      </button>

      {/* Image */}
      <Link href={`/products/${id}`} className="block relative aspect-square overflow-hidden bg-muted">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-primary/10 flex items-center justify-center">
          <span className="text-6xl">📦</span>
        </div>
        {/* Placeholder - replace with actual Image component when images are available */}
        {/* <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        /> */}
      </Link>

      {/* Quick Actions (shown on hover) */}
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent transition-all duration-300",
          isHovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        )}
      >
        <div className="flex gap-2">
          <Button
            size="sm"
            className="flex-1"
            onClick={(e) => {
              e.preventDefault()
              // Add to cart logic
            }}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Sepete Ekle
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={(e) => {
              e.preventDefault()
              onQuickView?.()
            }}
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-2">
        {/* Category */}
        <p className="text-xs text-muted-foreground uppercase tracking-wide">
          {category}
        </p>

        {/* Name */}
        <Link href={`/products/${id}`}>
          <h3 className="font-semibold line-clamp-2 hover:text-accent transition-colors">
            {name}
          </h3>
        </Link>

        {/* Rating */}
        {rating > 0 && (
          <div className="flex items-center gap-1">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "text-sm",
                    i < Math.floor(rating) ? "text-accent" : "text-muted"
                  )}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              ({reviewCount})
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold">
            {price.toLocaleString('tr-TR')}₺
          </span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {originalPrice.toLocaleString('tr-TR')}₺
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
