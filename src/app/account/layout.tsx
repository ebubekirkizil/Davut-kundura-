"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Header } from "@/components/storefront/Header"
import { Footer } from "@/components/storefront/Footer"
import { cn } from "@/lib/utils"
import { User, Package, Heart, Settings, LogOut } from "lucide-react"

const accountNavItems = [
  { label: "Siparişlerim", href: "/account/orders", icon: Package },
  { label: "Profilim", href: "/account/profile", icon: User },
  { label: "Favorilerim", href: "/account/wishlist", icon: Heart },
  { label: "Ayarlar", href: "/account/settings", icon: Settings },
]

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <>
      <Header />

      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-serif font-bold">Hesabım</h1>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <aside className="lg:col-span-1">
              <nav className="space-y-2">
                {accountNavItems.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                        isActive
                          ? "bg-accent text-accent-foreground font-medium"
                          : "hover:bg-accent/10"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </Link>
                  )
                })}
                <button
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
                  onClick={() => {
                    // Handle logout
                    console.log("Logout")
                  }}
                >
                  <LogOut className="h-5 w-5" />
                  Çıkış Yap
                </button>
              </nav>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-3">{children}</div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
