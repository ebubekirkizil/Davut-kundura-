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
        {/* Sidebar Background with Glass Effect */}
        <div className="h-full bg-white/10 backdrop-blur-xl border-r border-white/20 shadow-2xl">
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/95 via-slate-800/90 to-slate-900/95" />

          {/* Content */}
          <div className="relative flex flex-col h-full">
            {/* Logo Section */}
            <div className="p-6 border-b border-white/10">
              <Link href="/admin/dashboard" className="flex items-center gap-3 group">
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 flex items-center justify-center shadow-lg group-hover:shadow-amber-500/25 transition-all duration-300">
                    <span className="text-2xl font-bold text-white">D</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
                </div>
                <div>
                  <h2 className="font-serif font-bold text-xl text-white group-hover:text-amber-300 transition-colors">
                    Davut Kundura
                  </h2>
                  <p className="text-xs text-slate-300">Enterprise Management</p>
                </div>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="p-4 border-b border-white/10">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <p className="text-xs text-slate-400">Bugün</p>
                  <p className="text-lg font-bold text-white">₺12,450</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <p className="text-xs text-slate-400">Siparişler</p>
                  <p className="text-lg font-bold text-white">24</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
              <div className="mb-4">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
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
                        "flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group",
                        isActive
                          ? "bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-300 shadow-lg shadow-amber-500/10 border border-amber-500/30"
                          : "text-slate-300 hover:bg-white/10 hover:text-white border border-transparent hover:border-white/10"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className={cn(
                          "h-5 w-5 transition-colors",
                          isActive ? "text-amber-400" : "text-slate-400 group-hover:text-white"
                        )} />
                        <span>{item.name}</span>
                      </div>
                      {item.badge && (
                        <Badge
                          className={cn(
                            "text-xs px-2 py-0.5",
                            isActive
                              ? "bg-amber-500 text-white"
                              : "bg-slate-600 text-slate-200 group-hover:bg-slate-500"
                          )}
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
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  Hızlı İşlemler
                </p>
                {quickActions.map((action) => (
                  <Link
                    key={action.name}
                    href={action.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-all duration-200 group border border-transparent hover:border-white/10"
                  >
                    <div className={cn("p-1.5 rounded-lg", action.color)}>
                      <action.icon className="h-4 w-4 text-white" />
                    </div>
                    <span>{action.name}</span>
                  </Link>
                ))}
              </div>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-white/10 space-y-2">
              <Link
                href="/admin/settings"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-all duration-200 border border-transparent hover:border-white/10"
              >
                <Settings className="h-5 w-5" />
                <span>Ayarlar</span>
              </Link>
              <button
                onClick={() => {
                  // Handle logout
                  window.location.href = "/"
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-300 hover:bg-red-500/10 hover:text-red-200 transition-all duration-200 border border-transparent hover:border-red-500/20"
              >
                <LogOut className="h-5 w-5" />
                <span>Çıkış Yap</span>
              </button>

              {/* Version Info */}
              <div className="mt-4 px-4 py-2 bg-white/5 rounded-lg border border-white/10">
                <p className="text-xs text-slate-400">Version 2.1.0</p>
                <p className="text-xs text-slate-500">Enterprise Edition</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
