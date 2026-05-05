import { Header } from "@/components/storefront/Header"
import { Hero } from "@/components/storefront/Hero"
import { ProductGrid } from "@/components/storefront/ProductGrid"
import { Footer } from "@/components/storefront/Footer"

// Mock data
const mockProducts = [
  {
    id: "1",
    name: "Premium Deri Kemer - Klasik Siyah",
    price: 299,
    originalPrice: 399,
    image: "/products/belt-1.jpg",
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
    image: "/products/insole-1.jpg",
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
    image: "/products/care-1.jpg",
    category: "Bakım Ürünleri",
    rating: 4.7,
    reviewCount: 56,
    isSale: true,
  },
  {
    id: "4",
    name: "Deri Kemer - Kahverengi Vintage",
    price: 349,
    image: "/products/belt-2.jpg",
    category: "Deri Kemerler",
    rating: 4.6,
    reviewCount: 43,
  },
  {
    id: "5",
    name: "Valiz Tekerleği - Universal",
    price: 89,
    image: "/products/wheel-1.jpg",
    category: "Valiz Parçaları",
    rating: 4.5,
    reviewCount: 67,
  },
  {
    id: "6",
    name: "Ortopedik Taban - Sport",
    price: 179,
    originalPrice: 229,
    image: "/products/insole-2.jpg",
    category: "Ortopedik Tabanlar",
    rating: 4.8,
    reviewCount: 92,
    isSale: true,
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
  {
    id: "8",
    name: "Ayakkabı Boyası - Siyah",
    price: 49,
    image: "/products/polish-1.jpg",
    category: "Bakım Ürünleri",
    rating: 4.4,
    reviewCount: 34,
  },
]

export default function StorefrontTestPage() {
  return (
    <>
      <Header />
      <Hero />
      <ProductGrid
        title="Öne Çıkan Ürünler"
        description="El işçiliği ve premium kalite ile üretilmiş en popüler ürünlerimiz"
        products={mockProducts}
        showLoadMore
      />
      <Footer />
    </>
  )
}
