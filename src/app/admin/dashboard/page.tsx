"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Area, AreaChart,
} from "recharts"
import {
  TrendingUp, TrendingDown, Package, ShoppingCart, Users, DollarSign,
  Plus, Eye, ArrowUpRight, ArrowDownRight, Activity, Target, Zap, Star,
} from "lucide-react"
import Link from "next/link"

// ─── Original Data ─────────────────────────────────────────────────────────
const stats = [
  { title: "Toplam Gelir", subtitle: "Bu Ay", value: "₺2,847,650", change: "+24.8%", trend: "up", icon: DollarSign, color: "emerald", gradient: "from-emerald-500 to-green-600" },
  { title: "Net Kar", subtitle: "Kar Marjı", value: "₺1,124,890", change: "+18.3%", trend: "up", icon: TrendingUp, color: "blue", gradient: "from-blue-500 to-cyan-600" },
  { title: "Aktif Siparişler", subtitle: "Beklemede", value: "2,847", change: "+12.5%", trend: "up", icon: ShoppingCart, color: "purple", gradient: "from-purple-500 to-violet-600" },
  { title: "Müşteri Memnuniyeti", subtitle: "Ortalama Puan", value: "4.8/5.0", change: "+0.3", trend: "up", icon: Star, color: "amber", gradient: "from-amber-500 to-orange-600" },
  { title: "Toplam Müşteri", subtitle: "Aktif Hesaplar", value: "18,492", change: "+15.7%", trend: "up", icon: Users, color: "rose", gradient: "from-rose-500 to-pink-600" },
  { title: "Stok Değeri", subtitle: "Toplam Envanter", value: "₺4,892,340", change: "+8.9%", trend: "up", icon: Package, color: "indigo", gradient: "from-indigo-500 to-blue-600" },
  { title: "Günlük Hedef", subtitle: "Tamamlanma", value: "87%", change: "+5.2%", trend: "up", icon: Target, color: "teal", gradient: "from-teal-500 to-cyan-600" },
  { title: "Sistem Performansı", subtitle: "Uptime", value: "99.9%", change: "+0.1%", trend: "up", icon: Activity, color: "emerald", gradient: "from-green-500 to-emerald-600" },
]

const salesData = [
  { name: "Oca", value: 2400000, orders: 1240, customers: 890 }, { name: "Şub", value: 2890000, orders: 1580, customers: 1120 },
  { name: "Mar", value: 3200000, orders: 1890, customers: 1340 }, { name: "Nis", value: 2950000, orders: 1670, customers: 1180 },
  { name: "May", value: 3450000, orders: 2100, customers: 1520 }, { name: "Haz", value: 3890000, orders: 2340, customers: 1680 },
  { name: "Tem", value: 4200000, orders: 2580, customers: 1890 }, { name: "Ağu", value: 3950000, orders: 2420, customers: 1750 },
  { name: "Eyl", value: 4350000, orders: 2680, customers: 1920 }, { name: "Eki", value: 4680000, orders: 2890, customers: 2100 },
  { name: "Kas", value: 4920000, orders: 3120, customers: 2280 }, { name: "Ara", value: 5200000, orders: 3350, customers: 2450 },
]

const performanceData = [
  { name: "Pzt", sales: 450000, target: 400000 }, { name: "Sal", sales: 520000, target: 450000 },
  { name: "Çar", sales: 480000, target: 420000 }, { name: "Per", sales: 590000, target: 500000 },
  { name: "Cum", sales: 680000, target: 600000 }, { name: "Cmt", sales: 720000, target: 650000 },
  { name: "Paz", sales: 580000, target: 550000 },
]

const categoryData = [
  { name: "Premium Deri Ürünler", value: 45, color: "#d4af37", revenue: 1890000 },
  { name: "Ortopedik Çözümler", value: 30, color: "#8B4513", revenue: 1240000 },
  { name: "Bakım & Aksesuar", value: 15, color: "#2563eb", revenue: 680000 },
  { name: "Kurumsal Satışlar", value: 10, color: "#dc2626", revenue: 450000 },
]

const topProducts = [
  { id: "DK-001", name: "Premium Deri Kemer - Executive", category: "Deri Kemerler", sales: 1247, revenue: 374100, growth: "+23.5%", stock: 89, image: "/products/belt-executive.jpg" },
  { id: "DK-002", name: "Ortopedik Tabanlık - Pro", category: "Ortopedik", sales: 892, revenue: 267600, growth: "+18.2%", stock: 156, image: "/products/insole-pro.jpg" },
  { id: "DK-003", name: "Deri Bakım Seti - Luxury", category: "Bakım", sales: 634, revenue: 190200, growth: "+31.7%", stock: 234, image: "/products/care-luxury.jpg" },
]

const recentOrders = [
  { id: "DK24050001", customer: "Mehmet Yılmaz", company: "ABC Holding A.Ş.", amount: 12450, status: "delivered", date: "15 dakika önce", items: 8, priority: "high" },
  { id: "DK24050002", customer: "Ayşe Kaya", company: "XYZ Tekstil Ltd.", amount: 8750, status: "shipped", date: "2 saat önce", items: 5, priority: "medium" },
  { id: "DK24050003", customer: "Can Demir", company: "DEF İnşaat A.Ş.", amount: 15680, status: "processing", date: "4 saat önce", items: 12, priority: "high" },
  { id: "DK24050004", customer: "Zeynep Özkan", company: "GHI Otomotiv Ltd.", amount: 6890, status: "confirmed", date: "6 saat önce", items: 3, priority: "low" },
]

const statusColors = {
  delivered: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20",
  shipped: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-500/20",
  processing: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/20",
  confirmed: "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-500/20",
}
const statusLabels = { delivered: "Teslim Edildi", shipped: "Kargoda", processing: "Hazırlanıyor", confirmed: "Onaylandı" }
const priorityColors = { high: "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20", medium: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20", low: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20" }

// ─── Main Component ─────────────────────────────────────────────────────────
export default function AdminDashboardPage() {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Framer Motion variants
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }
  const item = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120 } }
  }

  return (
    <div className="space-y-8 selection:bg-amber-500/30 font-sans pb-10">
      
      {/* ─── Header ─── */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-serif font-black bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
            Kurumsal Gösterge Paneli
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg font-medium">
            Hoş geldiniz! İşletmenizin gerçek zamanlı performans özeti.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="bg-white/60 dark:bg-slate-900/50 backdrop-blur-sm border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 text-slate-800 dark:text-slate-200 font-bold transition-all">
            <Activity className="h-4 w-4 mr-2 text-amber-500" /> Canlı Rapor
          </Button>
          <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-lg shadow-amber-500/25 font-bold border-0" asChild>
            <Link href="/admin/products/new"><Plus className="h-4 w-4 mr-2" /> Yeni Ürün Ekle</Link>
          </Button>
        </div>
      </motion.div>

      <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
        
        {/* ─── 8 Stats Grid ─── */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div key={stat.title} variants={item} whileHover={{ y: -5, scale: 1.01 }} transition={{ type: "spring", stiffness: 300 }}>
              <Card className="relative overflow-hidden bg-white/70 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/80 dark:border-white/5 shadow-lg shadow-slate-200/20 dark:shadow-black/40 group">
                {/* Subtle Hover Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-[0.03] dark:group-hover:opacity-[0.08] transition-opacity duration-500`} />
                
                <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-3">
                  <div>
                    <CardTitle className="text-sm font-bold text-slate-700 dark:text-slate-300">{stat.title}</CardTitle>
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1">{stat.subtitle}</p>
                  </div>
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg shadow-black/10`}>
                    <stat.icon className="h-5 w-5 text-white" />
                  </div>
                </CardHeader>
                <CardContent className="relative">
                  <div className="text-3xl font-black font-mono text-slate-900 dark:text-slate-100 mb-2 tracking-tight">{stat.value}</div>
                  <div className="flex items-center text-sm font-bold">
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="h-4 w-4 mr-1 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 mr-1 text-rose-600 dark:text-rose-400" />
                    )}
                    <span className={stat.trend === "up" ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}>
                      {stat.change}
                    </span>
                    <span className="ml-2 text-slate-500 font-medium text-xs">geçen aya göre</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* ─── 3 Charts Grid ─── */}
        <div className="grid gap-6 lg:grid-cols-3">
          
          {/* 1. Revenue Analytics */}
          <motion.div variants={item} className="lg:col-span-2">
            <Card className="h-full bg-white/70 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/80 dark:border-white/5 shadow-lg shadow-slate-200/20 dark:shadow-black/40">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">Gelir Analitikleri</CardTitle>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Aylık performans trendi</p>
                  </div>
                  <Badge className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20 font-bold">
                    +24.8% Büyüme
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={salesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#d4af37" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#d4af37" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(150,150,150,0.1)" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'currentColor', fontSize: 12 }} className="text-slate-500" />
                    <YAxis axisLine={false} tickLine={false} tickFormatter={(v) => `₺${(v / 1000000).toFixed(1)}M`} tick={{ fill: 'currentColor', fontSize: 12 }} className="text-slate-500" />
                    <Tooltip
                      formatter={(value: any) => [`₺${value.toLocaleString()}`, 'Gelir']}
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '12px', border: '1px solid rgba(150,150,150,0.2)', color: 'hsl(var(--foreground))', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.2)' }}
                    />
                    <Area type="monotone" dataKey="value" stroke="#d4af37" strokeWidth={3} fill="url(#colorRev)" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* 2. Category Performance Pie */}
          <motion.div variants={item} className="lg:col-span-1">
            <Card className="h-full bg-white/70 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/80 dark:border-white/5 shadow-lg shadow-slate-200/20 dark:shadow-black/40">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">Kategori Performansı</CardTitle>
                <p className="text-sm text-slate-500 dark:text-slate-400">Gelir dağılımı</p>
              </CardHeader>
              <CardContent>
                <div className="relative h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={categoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={85} paddingAngle={2} dataKey="value" stroke="transparent">
                        {categoryData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                      </Pie>
                      <Tooltip
                        formatter={(value: any, name: any, props: any) => [`₺${props.payload.revenue.toLocaleString()}`, 'Gelir']}
                        contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '12px', border: '1px solid rgba(150,150,150,0.2)', color: 'hsl(var(--foreground))' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  {/* Inner text */}
                  <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                    <span className="font-mono font-black text-2xl text-slate-900 dark:text-slate-100">100%</span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Dağılım</span>
                  </div>
                </div>
                <div className="mt-6 space-y-3">
                  {categoryData.map((cat, index) => (
                    <div key={index} className="flex items-center justify-between text-sm group">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full group-hover:scale-125 transition-transform" style={{ backgroundColor: cat.color }} />
                        <span className="font-semibold text-slate-700 dark:text-slate-300">{cat.name}</span>
                      </div>
                      <span className="font-black font-mono text-slate-900 dark:text-slate-100">₺{(cat.revenue/1000).toFixed(0)}K</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* 3. Weekly Performance Bar */}
        <motion.div variants={item}>
          <Card className="bg-white/70 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/80 dark:border-white/5 shadow-lg shadow-slate-200/20 dark:shadow-black/40">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">Haftalık Performans</CardTitle>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Satış vs Hedef karşılaştırması</p>
                </div>
                <Badge className="bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-500/20 font-bold">
                  Bu Hafta
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={performanceData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(150,150,150,0.1)" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'currentColor', fontSize: 12 }} className="text-slate-500" />
                  <YAxis axisLine={false} tickLine={false} tickFormatter={(v) => `₺${(v / 1000).toFixed(0)}K`} tick={{ fill: 'currentColor', fontSize: 12 }} className="text-slate-500" />
                  <Tooltip
                    cursor={{ fill: "rgba(150,150,150,0.05)" }}
                    formatter={(value: any, name: any) => [`₺${value.toLocaleString()}`, name === 'sales' ? 'Gerçekleşen' : 'Hedef']}
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '12px', border: '1px solid rgba(150,150,150,0.2)', color: 'hsl(var(--foreground))' }}
                  />
                  <Bar dataKey="target" fill="rgba(150,150,150,0.2)" radius={[6, 6, 0, 0]} maxBarSize={50} />
                  <Bar dataKey="sales" fill="#d4af37" radius={[6, 6, 0, 0]} maxBarSize={50} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* ─── Lists Area: Top Products & Recent Orders ─── */}
        <div className="grid gap-6 lg:grid-cols-2">
          
          {/* Top Products */}
          <motion.div variants={item}>
            <Card className="h-full bg-white/70 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/80 dark:border-white/5 shadow-lg shadow-slate-200/20 dark:shadow-black/40">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">En Çok Satan Ürünler</CardTitle>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Bu ayki performans liderleri</p>
                  </div>
                  <Button variant="ghost" size="sm" className="font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5" asChild>
                    <Link href="/admin/products"><Eye className="h-4 w-4 mr-2" /> Tümü</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topProducts.map((prod, idx) => (
                    <motion.div 
                      key={prod.id} whileHover={{ scale: 1.02 }}
                      className="flex items-center gap-4 p-4 rounded-2xl bg-white/50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 hover:bg-white dark:hover:bg-white/[0.06] transition-colors"
                    >
                      <div className="relative">
                        <div className="w-14 h-14 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-white/5">
                          <Package className="h-6 w-6 text-slate-500" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-xs font-black text-white shadow-md">
                          {idx + 1}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-slate-900 dark:text-slate-100 truncate">{prod.name}</h4>
                        <p className="text-xs font-medium text-slate-500">{prod.category}</p>
                        <div className="flex items-center gap-3 mt-1.5">
                          <span className="text-xs font-bold text-slate-500">{prod.sales} satış</span>
                          <Badge className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold px-1.5 py-0 border-emerald-200 dark:border-emerald-500/20">
                            {prod.growth}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-black font-mono text-slate-900 dark:text-slate-100">₺{prod.revenue.toLocaleString()}</p>
                        <p className="text-[10px] font-bold text-slate-400 mt-1">Stok: {prod.stock}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Orders */}
          <motion.div variants={item}>
            <Card className="h-full bg-white/70 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/80 dark:border-white/5 shadow-lg shadow-slate-200/20 dark:shadow-black/40">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">Son Siparişler</CardTitle>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Gerçek zamanlı sipariş takibi</p>
                  </div>
                  <Button variant="ghost" size="sm" className="font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5" asChild>
                    <Link href="/admin/orders"><Eye className="h-4 w-4 mr-2" /> Tümü</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <motion.div 
                      key={order.id} whileHover={{ scale: 1.02 }}
                      className="flex items-center justify-between p-4 rounded-2xl bg-white/50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 hover:bg-white dark:hover:bg-white/[0.06] transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-inner">
                            {order.customer.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className={`absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full ${priorityColors[order.priority as keyof typeof priorityColors].split(' ')[0]} border-2 border-white dark:border-slate-800`} />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 dark:text-slate-100">{order.customer}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="font-mono text-xs font-medium text-slate-400">#{order.id}</span>
                            <span className="text-xs text-slate-500">• {order.company}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-center hidden sm:block">
                          <Badge className={`${statusColors[order.status as keyof typeof statusColors]} border font-bold text-[10px]`}>
                            {statusLabels[order.status as keyof typeof statusLabels]}
                          </Badge>
                          <p className="text-[10px] font-bold text-slate-400 mt-1">{order.items} ürün</p>
                        </div>
                        <div className="text-right">
                          <p className="font-black font-mono text-slate-900 dark:text-slate-100">₺{order.amount.toLocaleString()}</p>
                          <p className="text-[10px] font-bold text-slate-400 mt-1">{order.date}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

        </div>

        {/* ─── 4 Quick Actions Grid ─── */}
        <motion.div variants={item}>
          <Card className="bg-white/70 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/80 dark:border-white/5 shadow-lg shadow-slate-200/20 dark:shadow-black/40">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">Hızlı İşlemler</CardTitle>
              <p className="text-sm text-slate-500 dark:text-slate-400">Sık kullanılan yönetim araçları</p>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                
                <Button variant="outline" className="h-auto py-6 bg-white/50 dark:bg-white/[0.02] border-slate-200 dark:border-white/5 hover:bg-white dark:hover:bg-white/[0.06] hover:border-blue-500/50 transition-all duration-300 group" asChild>
                  <Link href="/admin/products">
                    <div className="text-center w-full">
                      <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/20">
                        <Package className="h-7 w-7 text-white" />
                      </div>
                      <div className="font-bold text-slate-900 dark:text-slate-100 text-sm">Ürün Yönetimi</div>
                      <div className="text-xs text-slate-500 mt-1.5 font-medium">Stok ve katalog işlemleri</div>
                    </div>
                  </Link>
                </Button>

                <Button variant="outline" className="h-auto py-6 bg-white/50 dark:bg-white/[0.02] border-slate-200 dark:border-white/5 hover:bg-white dark:hover:bg-white/[0.06] hover:border-emerald-500/50 transition-all duration-300 group" asChild>
                  <Link href="/admin/orders">
                    <div className="text-center w-full">
                      <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-emerald-500/20">
                        <ShoppingCart className="h-7 w-7 text-white" />
                      </div>
                      <div className="font-bold text-slate-900 dark:text-slate-100 text-sm">Sipariş Yönetimi</div>
                      <div className="text-xs text-slate-500 mt-1.5 font-medium">Sipariş takip ve işleme</div>
                    </div>
                  </Link>
                </Button>

                <Button variant="outline" className="h-auto py-6 bg-white/50 dark:bg-white/[0.02] border-slate-200 dark:border-white/5 hover:bg-white dark:hover:bg-white/[0.06] hover:border-purple-500/50 transition-all duration-300 group" asChild>
                  <Link href="/admin/customers">
                    <div className="text-center w-full">
                      <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-purple-500/20">
                        <Users className="h-7 w-7 text-white" />
                      </div>
                      <div className="font-bold text-slate-900 dark:text-slate-100 text-sm">Müşteri Yönetimi</div>
                      <div className="text-xs text-slate-500 mt-1.5 font-medium">CRM ve müşteri ilişkileri</div>
                    </div>
                  </Link>
                </Button>

                <Button variant="outline" className="h-auto py-6 bg-white/50 dark:bg-white/[0.02] border-slate-200 dark:border-white/5 hover:bg-white dark:hover:bg-white/[0.06] hover:border-amber-500/50 transition-all duration-300 group" asChild>
                  <Link href="/admin/finance">
                    <div className="text-center w-full">
                      <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-amber-500/20">
                        <DollarSign className="h-7 w-7 text-white" />
                      </div>
                      <div className="font-bold text-slate-900 dark:text-slate-100 text-sm">Finansal Yönetim</div>
                      <div className="text-xs text-slate-500 mt-1.5 font-medium">Gelir, gider ve raporlar</div>
                    </div>
                  </Link>
                </Button>

              </div>
            </CardContent>
          </Card>
        </motion.div>

      </motion.div>
    </div>
  )
}
