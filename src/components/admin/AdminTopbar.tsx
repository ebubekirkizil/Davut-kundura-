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
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Search,
  Bell,
  Settings,
  User,
  LogOut,
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
  "/admin/analytics": "Analiz",
  "/admin/page-builder": "Sayfa Oluşturucu",
  "/admin/settings": "Sistem Ayarları",
}

export function AdminTopbar() {
  const pathname = usePathname()
  const [currentDate, setCurrentDate] = React.useState("")
  const [notifications] = React.useState([
    { id: 1, type: "order", message: "Yeni sipariş alındı", time: "2 dk önce", unread: true },
    { id: 2, type: "stock", message: "Stok azalıyor: Premium Deri Kemer", time: "15 dk önce", unread: true },
    { id: 3, type: "payment", message: "Ödeme alındı: 299₺", time: "1 saat önce", unread: false },
  ])

  React.useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString('tr-TR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }))
  }, [])

  const unreadCount = notifications.filter(n => n.unread).length

  const getCurrentPageTitle = () => {
    return breadcrumbMap[pathname] || "Admin Panel"
  }

  return (
    <header className="sticky top-0 z-30 h-16 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="flex items-center justify-between h-full px-6">
        {/* Left Section - Breadcrumb & Search */}
        <div className="flex items-center gap-6 flex-1">
          {/* Page Title */}
          <div>
            <h1 className="text-xl font-semibold text-foreground">{getCurrentPageTitle()}</h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              {currentDate}
            </p>
          </div>

          {/* Search */}
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Ürün, sipariş, müşteri ara..."
              className="pl-10 bg-background border-input focus:border-ring transition-colors"
            />
          </div>
        </div>

        {/* Right Section - Stats & Actions */}
        <div className="flex items-center gap-4">
          {/* Quick Stats */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
              <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
              <span className="text-sm font-medium text-green-700 dark:text-green-300">+12.5%</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
              <DollarSign className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">₺24,580</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-50 dark:bg-purple-950 rounded-lg border border-purple-200 dark:border-purple-800">
              <BarChart3 className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              <span className="text-sm font-medium text-purple-700 dark:text-purple-300">147 sipariş</span>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden lg:block w-px h-6 bg-border" />

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-destructive hover:bg-destructive">
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
                  <div className={`w-2 h-2 rounded-full mt-2 ${notification.unread ? 'bg-primary' : 'bg-muted-foreground'}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{notification.message}</p>
                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                  </div>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-center text-sm text-primary hover:text-primary/80">
                Tüm bildirimleri görüntüle
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 overflow-hidden">
                <Avatar className="h-10 w-10 ring-2 ring-border">
                  <AvatarImage src="/avatars/admin.jpg" alt="Admin" />
                  <AvatarFallback className="bg-amber-600 text-white font-bold">
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
              <DropdownMenuItem className="text-destructive focus:text-destructive">
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