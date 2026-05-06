"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Bell,
  Settings,
  User,
  LogOut,
  Moon,
  Sun,
  Globe,
  BarChart3,
  TrendingUp,
  DollarSign,
} from "lucide-react"

const breadcrumbMap: Record<string, string> = {
  "/admin/dashboard": "Dashboard",
  "/admin/products": "Ürün Yönetimi",
  "/admin/orders": "Sipariş Yönetimi",
  "/admin/customers": "Müşteri Yönetimi",
  "/admin/finance": "Finansal Yönetim",
  "/admin/analytics": "Analitik & Raporlar",
  "/admin/page-builder": "Sayfa Oluşturucu",
  "/admin/settings": "Sistem Ayarları",
}

export function AdminTopbar() {
  const pathname = usePathname()
  const [notifications] = React.useState([
    { id: 1, type: "order", message: "Yeni sipariş alındı", time: "2 dk önce", unread: true },
    { id: 2, type: "stock", message: "Stok azalıyor: Premium Deri Kemer", time: "15 dk önce", unread: true },
    { id: 3, type: "payment", message: "Ödeme alındı: 299₺", time: "1 saat önce", unread: false },
  ])

  const unreadCount = notifications.filter(n => n.unread).length

  const getCurrentPageTitle = () => {
    return breadcrumbMap[pathname] || "Admin Panel"
  }

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/80 backdrop-blur-md border-b border-white/20 shadow-sm">
      <div className="flex items-center justify-between h-full px-6">
        {/* Left Section - Breadcrumb & Search */}
        <div className="flex items-center gap-6 flex-1">
          {/* Page Title */}
          <div>
            <h1 className="text-xl font-semibold text-slate-800">{getCurrentPageTitle()}</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              {new Date().toLocaleDateString('tr-TR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>

          {/* Search */}
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Ürün, sipariş, müşteri ara..."
              className="pl-10 bg-white/60 border-white/40 focus:bg-white/80 transition-all"
            />
          </div>
        </div>

        {/* Right Section - Stats & Actions */}
        <div className="flex items-center gap-4">
          {/* Quick Stats */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-lg">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">+12.5%</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-lg">
              <DollarSign className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">₺24,580</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-50 rounded-lg">
              <BarChart3 className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">147 sipariş</span>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden lg:block w-px h-6 bg-slate-200" />

          {/* Theme Toggle */}
          <Button variant="ghost" size="icon" className="relative">
            <Sun className="h-4 w-4" />
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500 hover:bg-red-500">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="flex items-center justify-between">
                <span>Bildirimler</span>
                <Badge variant="secondary">{unreadCount} yeni</Badge>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.map((notification) => (
                <DropdownMenuItem key={notification.id} className="flex items-start gap-3 p-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${notification.unread ? 'bg-blue-500' : 'bg-slate-300'}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{notification.message}</p>
                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                  </div>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-center text-sm text-blue-600 hover:text-blue-700">
                Tüm bildirimleri görüntüle
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10 ring-2 ring-white/20">
                  <AvatarImage src="/avatars/admin.jpg" alt="Admin" />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                    AD
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Admin Kullanıcı</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    admin@davutkundura.shop
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profil</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Ayarlar</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Globe className="mr-2 h-4 w-4" />
                <span>Siteyi Görüntüle</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600 focus:text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Çıkış Yap</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}