"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  BarChart3,
  Layout,
  Settings,
  LogOut,
  Menu,
  X,
  Warehouse,
  Truck,
  FileText,
  Shield,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const navigation = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
    badge: null,
  },
  {
    name: "Ürünler",
    href: "/admin/products",
    icon: Package,
    badge: "247",
  },
  {
    name: "Siparişler",
    href: "/admin/orders",
    icon: ShoppingCart,
    badge: "12",
  },
  {
    name: "Müşteriler",
    href: "/admin/customers",
    icon: Users,
    badge: null,
  },
  {
    name: "Finans",
    href: "/admin/finance",
    icon: DollarSign,
    badge: null,
  },
  {
    name: "Analitik",
    href: "/admin/analytics",
    icon: BarChart3,
    badge: null,
  },
  {
    name: "Depo Yönetimi",
    href: "/admin/warehouse",
    icon: Warehouse,
    badge: "3",
  },
  {
    name: "Kargo & Lojistik",
    href: "/admin/shipping",
    icon: Truck,
    badge: null,
  },
  {
    name: "Raporlar",
    href: "/admin/reports",
    icon: FileText,
    badge: null,
  },
  {
    name: "Sayfa Oluşturucu",
    href: "/admin/page-builder",
    icon: Layout,
    badge: null,
  },
]

const quickActions = [
  {
    name: "Hızlı Sipariş",
    href: "/admin/orders/new",
    icon: Zap,
    color: "bg-green-500",
  },
  {
    name: "Güvenlik",
    href: "/admin/security",
    icon: Shield,
    color: "bg-red-500",
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-white/80 backdrop-blur-sm border-white/40 shadow-lg"
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-screen w-72 transition-transform duration-300",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Sidebar Background */}
        <div className="h-full bg-background border-r border-border shadow-lg">
          {/* Content */}

          {/* Content */}
          <div className="flex flex-col h-full">
            {/* Logo Section */}
            <div className="p-6 border-b border-border">
              <Link href="/admin/dashboard" className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center group-hover:bg-primary/90 transition-colors">
                  <span className="text-lg font-bold text-primary-foreground">D</span>
                </div>
                <div>
                  <h2 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                    Davut Kundura
                  </h2>
                  <p className="text-xs text-muted-foreground">Admin Panel</p>
                </div>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
              <div className="mb-6">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 px-3">
                  Ana Menü
                </p>
                {navigation.map((item) => {
                  const isActive = pathname === item.href || pathname?.startsWith(item.href + "/")
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </div>
                      {item.badge && (
                        <Badge
                          variant={isActive ? "secondary" : "outline"}
                          className="text-xs h-5"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  )
                })}
              </div>

              {/* Quick Actions */}
              <div className="mt-6">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 px-3">
                  Hızlı İşlemler
                </p>
                {quickActions.map((action) => (
                  <Link
                    key={action.name}
                    href={action.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors group"
                  >
                    <div className={cn("p-1.5 rounded-md", action.color)}>
                      <action.icon className="h-3.5 w-3.5 text-white" />
                    </div>
                    <span>{action.name}</span>
                  </Link>
                ))}
              </div>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-border space-y-1">
              <Link
                href="/admin/settings"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Settings className="h-4 w-4" />
                <span>Ayarlar</span>
              </Link>
              <button
                onClick={() => {
                  // Handle logout
                  window.location.href = "/"
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Çıkış Yap</span>
              </button>

              {/* Version Info */}
              <div className="mt-4 px-3 py-2 bg-muted/50 rounded-lg border">
                <p className="text-xs text-muted-foreground">Version 2.1.0</p>
                <p className="text-xs text-muted-foreground/70">Enterprise Edition</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
