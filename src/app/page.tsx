import { Header } from "@/components/storefront/Header"
import { Hero } from "@/components/storefront/Hero"
import { ProductGrid } from "@/components/storefront/ProductGrid"
import { Footer } from "@/components/storefront/Footer"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <ProductGrid />
      </main>
      <Footer />
    </div>
  )
}
