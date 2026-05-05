"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Header } from "@/components/storefront/Header"
import { Footer } from "@/components/storefront/Footer"
import { cn } from "@/lib/utils"
import { User, Package, Heart, Settings, LogOut, Shield } from "lucide-react"
import { toast } from "sonner"

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
  const router = useRouter()
  const [isAdmin, setIsAdmin] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)
  const [user, setUser] = React.useState<any>(null)

  // Check authentication and admin status
  React.useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/session")
        const data = await response.json()

        if (!data.user) {
          // Not logged in, redirect to login
          toast.error("Lütfen giriş yapın")
          router.push("/login")
          return
        }

        setUser(data.user)
        setIsAdmin(data.user.role === "ADMIN")
      } catch (error) {
        console.error("Auth check failed:", error)
        router.push("/login")
      } finally {
        setIsLoading(false)
      }
    }
    checkAuth()
  }, [router])

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      })

      if (response.ok) {
        toast.success("Çıkış yapıldı")
        router.push("/")
      } else {
        toast.error("Çıkış yapılırken bir hata oluştu")
      }
    } catch (error) {
      toast.error("Çıkış yapılırken bir hata oluştu")
    }
  }

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Yükleniyor...</p>
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

                {/* Admin Panel Link - Only for Admin Users */}
                {isAdmin && (
                  <Link
                    href="/admin/dashboard"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
                  >
                    <Shield className="h-5 w-5" />
                    Yönetim Paneli
                  </Link>
                )}

                <button
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
                  onClick={handleLogout}
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
