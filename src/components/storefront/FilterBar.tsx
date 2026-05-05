"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { ChevronDown, SlidersHorizontal } from "lucide-react"

interface FilterBarProps {
  categories: string[]
  selectedCategory: string | null
  onCategoryChange: (category: string | null) => void
  sortBy: string
  onSortChange: (sort: string) => void
  priceRange: [number, number]
  onPriceRangeChange: (range: [number, number]) => void
  minRating: number
  onMinRatingChange: (rating: number) => void
  onToggleMobileFilters?: () => void
  className?: string
}

export function FilterBar({
  categories,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  priceRange,
  onPriceRangeChange,
  minRating,
  onMinRatingChange,
  onToggleMobileFilters,
  className,
}: FilterBarProps) {
  const sortOptions = [
    { value: "featured", label: "Öne Çıkanlar" },
    { value: "newest", label: "En Yeni" },
    { value: "price-asc", label: "Fiyat: Düşükten Yükseğe" },
    { value: "price-desc", label: "Fiyat: Yüksekten Düşüğe" },
    { value: "rating", label: "En Yüksek Puan" },
  ]

  const priceRanges = [
    { value: [0, 100], label: "0₺ - 100₺" },
    { value: [100, 250], label: "100₺ - 250₺" },
    { value: [250, 500], label: "250₺ - 500₺" },
    { value: [500, 1000], label: "500₺ - 1000₺" },
    { value: [1000, 9999], label: "1000₺+" },
  ]

  const currentSortLabel = sortOptions.find((opt) => opt.value === sortBy)?.label || "Sırala"

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      {/* Mobile Filter Toggle */}
      <Button
        variant="outline"
        onClick={onToggleMobileFilters}
        className="lg:hidden"
      >
        <SlidersHorizontal className="h-4 w-4 mr-2" />
        Filtreler
      </Button>

      {/* Category Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="min-w-[140px] justify-between">
            {selectedCategory || "Tüm Kategoriler"}
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuItem onClick={() => onCategoryChange(null)}>
            Tüm Kategoriler
          </DropdownMenuItem>
          {categories.map((category) => (
            <DropdownMenuItem
              key={category}
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Price Range Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="min-w-[140px] justify-between">
            Fiyat Aralığı
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          {priceRanges.map((range) => (
            <DropdownMenuItem
              key={range.label}
              onClick={() => onPriceRangeChange(range.value as [number, number])}
            >
              {range.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Rating Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="min-w-[140px] justify-between">
            {minRating > 0 ? `${minRating}+ Yıldız` : "Puan"}
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuItem onClick={() => onMinRatingChange(0)}>
            Tüm Puanlar
          </DropdownMenuItem>
          {[4, 3, 2, 1].map((rating) => (
            <DropdownMenuItem
              key={rating}
              onClick={() => onMinRatingChange(rating)}
            >
              <div className="flex items-center gap-2">
                <span>{rating}+ Yıldız</span>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={cn(
                        "text-xs",
                        i < rating ? "text-accent" : "text-muted"
                      )}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Sort Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="min-w-[180px] justify-between">
            {currentSortLabel}
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          {sortOptions.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => onSortChange(option.value)}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
