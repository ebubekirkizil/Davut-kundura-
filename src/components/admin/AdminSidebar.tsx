"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard, Package, ShoppingCart, Users, DollarSign, BarChart3,
  Layout, Settings, LogOut, Menu, X, Warehouse, Truck, FileText, Tag,
} from "lucide-react"

const navGroups = [
  {
    label: "Genel",
    items: [
      { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
      { name: "Analitik", href: "/admin/analytics", icon: BarChart3 },
    ],
  },
  {
    label: "Satış",
    items: [
      { name: "Siparişler", href: "/admin/orders", icon: ShoppingCart },
      { name: "Ürünler", href: "/admin/products", icon: Package },
      { name: "Müşteriler", href: "/admin/customers", icon: Users },
      { name: "Kuponlar", href: "/admin/coupons", icon: Tag },
    ],
  },
  {
    label: "Operasyon",
    items: [
      { name: "Depo Yönetimi", href: "/admin/warehouse", icon: Warehouse },
      { name: "Kargo & Lojistik", href: "/admin/shipping", icon: Truck },
      { name: "Finans", href: "/admin/finance", icon: DollarSign },
      { name: "Raporlar", href: "/admin/reports", icon: FileText },
    ],
  },
  {
    label: "Sistem",
    items: [
      { name: "Sayfa Oluşturucu", href: "/admin/page-builder", icon: Layout },
      { name: "Ayarlar", href: "/admin/settings", icon: Settings },
    ],
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const sidebar = (
    <div className="flex flex-col h-full sidebar-glass">
      {/* Logo */}
      <div className="p-5 border-b border-[hsl(var(--sidebar-border))]">
        <Link href="/admin/dashboard" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-lg bg-[hsl(var(--primary))] flex items-center justify-center shadow-lg shadow-[hsl(var(--primary))]/20">
            <span className="text-base font-bold text-white">D</span>
          </div>
          <div>
            <h2 className="font-semibold text-sm text-white/90 tracking-wide group-hover:text-[hsl(var(--primary))] transition-colors">
              Davut Kundura
            </h2>
            <p className="text-[10px] text-[hsl(var(--sidebar-fg))]">ERP Admin v2.1</p>
          </div>
        </Link>
      </div>

      {/* Navigation Groups */}
      <nav className="flex-1 py-4 px-3 space-y-6 overflow-y-auto scrollbar-thin">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="text-[10px] font-semibold text-[hsl(var(--sidebar-fg))]/50 uppercase tracking-[0.15em] mb-2 px-3">
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = pathname === item.href || pathname?.startsWith(item.href + "/")
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-200",
                      isActive
                        ? "bg-[hsl(var(--sidebar-active-bg))] text-[hsl(var(--sidebar-active-fg))] shadow-md shadow-[hsl(var(--primary))]/15"
                        : "text-[hsl(var(--sidebar-fg))] hover:bg-[hsl(var(--sidebar-hover-bg))] hover:text-white/90"
                    )}
                  >
                    <item.icon className={cn("h-4 w-4 flex-shrink-0", isActive ? "" : "opacity-60")} />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-[hsl(var(--sidebar-border))]">
        <button
          onClick={() => { window.location.href = "/" }}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium text-red-400/80 hover:bg-red-500/10 hover:text-red-400 transition-all"
        >
          <LogOut className="h-4 w-4" />
          <span>Çıkış Yap</span>
        </button>
        <div className="mt-3 px-3 py-2 bg-white/[0.03] rounded-lg border border-white/[0.04]">
          <p className="text-[10px] text-white/20">Enterprise Edition v2.1.0</p>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2.5 rounded-xl bg-card border border-border shadow-lg"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 z-40 h-screen w-[260px] transition-transform duration-300",
        mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {sidebar}
      </aside>
    </>
  )
}
