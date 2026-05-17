"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer
} from "recharts"
import {
  TrendingUp, TrendingDown, Package, ShoppingCart, Users, DollarSign,
  Activity, Star, ArrowUpRight, ArrowDownRight, Eye, Calendar,
  MoreVertical, Download, Zap, RefreshCw, Layers, CheckCircle2,
  Clock, AlertTriangle, ShieldCheck
} from "lucide-react"
import Link from "next/link"

// ─── Mock Data ─────────────────────────────────────────────────────────────────
const stats = [
  { title: "Toplam Ciro", subtitle: "Gerçekleşen", value: "₺2,847,650", change: "+24.8%", trend: "up", icon: DollarSign, color: "emerald" },
  { title: "Net Kâr", subtitle: "Vergi Sonrası", value: "₺1,124,890", change: "+18.3%", trend: "up", icon: TrendingUp, color: "blue" },
  { title: "Bekleyen Sipariş", subtitle: "Hazırlanacak", value: "284", change: "-12.5%", trend: "down", icon: ShoppingCart, color: "amber" },
  { title: "Toplam Müşteri", subtitle: "B2B & B2C Aktif", value: "18,492", change: "+5.7%", trend: "up", icon: Users, color: "purple" },
]

const salesData = [
  { name: "Oca", ciro: 2400000, kar: 840000 }, { name: "Şub", ciro: 2890000, kar: 980000 },
  { name: "Mar", ciro: 3200000, kar: 1120000 }, { name: "Nis", ciro: 2950000, kar: 1050000 },
  { name: "May", ciro: 3450000, kar: 1250000 }, { name: "Haz", ciro: 3890000, kar: 1400000 },
  { name: "Tem", ciro: 4200000, kar: 1550000 }, { name: "Ağu", ciro: 3950000, kar: 1480000 },
  { name: "Eyl", ciro: 4350000, kar: 1650000 }, { name: "Eki", ciro: 4680000, kar: 1800000 },
  { name: "Kas", ciro: 4920000, kar: 1950000 }, { name: "Ara", ciro: 5200000, kar: 2100000 },
]

const performanceData = [
  { name: "Pzt", satis: 45, hedef: 40 }, { name: "Sal", satis: 52, hedef: 45 },
  { name: "Çar", satis: 48, hedef: 42 }, { name: "Per", satis: 59, hedef: 50 },
  { name: "Cum", satis: 68, hedef: 60 }, { name: "Cmt", satis: 72, hedef: 65 },
  { name: "Paz", satis: 58, hedef: 55 },
]

const categoryData = [
  { name: "Premium Deri", value: 45, color: "#d4af37", revenue: 1890000 },
  { name: "Ortopedik", value: 30, color: "#8B4513", revenue: 1240000 },
  { name: "Bakım & Aksesuar", value: 15, color: "#2563eb", revenue: 680000 },
  { name: "Kurumsal/B2B", value: 10, color: "#dc2626", revenue: 450000 },
]

const recentOrders = [
  { id: "ORD-9421", customer: "Mehmet Yılmaz", company: "B2C Perakende", amount: 12450, status: "delivered", date: "15 dk önce", items: 8, priority: "high" },
  { id: "ORD-9422", customer: "Zarif Deri A.Ş.", company: "B2B Toptan", amount: 87500, status: "shipped", date: "2 saat önce", items: 150, priority: "medium" },
  { id: "ORD-9423", customer: "Can Demir", company: "B2C Perakende", amount: 5680, status: "processing", date: "4 saat önce", items: 2, priority: "high" },
  { id: "ORD-9424", customer: "Elif Kaya", company: "B2C Perakende", amount: 2890, status: "confirmed", date: "6 saat önce", items: 1, priority: "low" },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────
const colorMap = {
  emerald: "from-emerald-500/20 to-emerald-500/5 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  blue: "from-blue-500/20 to-blue-500/5 text-blue-600 dark:text-blue-400 border-blue-500/20",
  amber: "from-amber-500/20 to-amber-500/5 text-amber-600 dark:text-amber-400 border-amber-500/20",
  purple: "from-purple-500/20 to-purple-500/5 text-purple-600 dark:text-purple-400 border-purple-500/20",
}

const statusConfig = {
  delivered: { label: "Teslim Edildi", icon: CheckCircle2, color: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20" },
  shipped: { label: "Kargoda", icon: Package, color: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20" },
  processing: { label: "Hazırlanıyor", icon: RefreshCw, color: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20" },
  confirmed: { label: "Yeni Onay", icon: ShieldCheck, color: "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10 border-purple-200 dark:border-purple-500/20" },
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AdminDashboardPage() {
  const [mounted, setMounted] = useState(false)
  const [timeFilter, setTimeFilter] = useState("this-month")

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  }

  return (
    <div className="min-h-screen pb-20 selection:bg-amber-500/30">
      <motion.div 
        variants={containerVariants} initial="hidden" animate="show"
        className="space-y-6 max-w-screen-2xl mx-auto"
      >
        
        {/* ─── Header & Global Controls ─── */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/40 dark:bg-slate-900/40 p-6 rounded-3xl border border-slate-200/60 dark:border-white/5 backdrop-blur-2xl shadow-sm">
          <div>
            <h1 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-3">
              Yönetici Paneli
              <Badge className="bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20 uppercase tracking-widest text-[10px] font-bold px-2 py-0.5 rounded-full shadow-none">
                Canlı Veri
              </Badge>
            </h1>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
              Davut Kundura sistemlerindeki gerçek zamanlı büyüme, ciro ve operasyonel metrikler.
            </p>
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="w-full sm:w-40 h-10 rounded-xl bg-white dark:bg-[#0A0A0A] border-slate-200 dark:border-white/10 text-xs font-bold shadow-sm">
                <Calendar className="w-4 h-4 mr-2 text-amber-500" />
                <SelectValue placeholder="Dönem Seç" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-[#0A0A0A] border-slate-200 dark:border-white/10">
                <SelectItem value="today">Bugün</SelectItem>
                <SelectItem value="this-week">Bu Hafta</SelectItem>
                <SelectItem value="this-month">Bu Ay</SelectItem>
                <SelectItem value="this-year">Bu Yıl</SelectItem>
              </SelectContent>
            </Select>
            <Button className="h-10 rounded-xl bg-amber-500 hover:bg-amber-600 text-white dark:text-black font-bold text-xs shadow-lg shadow-amber-500/20 px-5 gap-2 transition-all">
              <Download className="w-4 h-4" /> Rapor İndir
            </Button>
          </div>
        </motion.div>

        {/* ─── Top Stats Grid ─── */}
        <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div key={i} variants={itemVariants} whileHover={{ y: -5, scale: 1.01 }} transition={{ type: "spring", stiffness: 300 }}>
              <Card className="relative overflow-hidden bg-white/70 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200/60 dark:border-white/5 shadow-sm rounded-3xl group">
                <div className={`absolute inset-0 bg-gradient-to-br ${colorMap[stat.color as keyof typeof colorMap]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <CardHeader className="p-5 pb-0 flex flex-row items-center justify-between relative z-10">
                  <div>
                    <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">{stat.title}</CardTitle>
                    <p className="text-[10px] font-medium text-slate-400 mt-0.5">{stat.subtitle}</p>
                  </div>
                  <div className={`p-2.5 rounded-xl border bg-gradient-to-br ${colorMap[stat.color as keyof typeof colorMap]} bg-white dark:bg-black shadow-sm`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                </CardHeader>
                <CardContent className="p-5 relative z-10">
                  <div className="text-2xl font-black font-mono tracking-tight text-slate-900 dark:text-slate-100 mb-2">{stat.value}</div>
                  <div className="flex items-center text-[11px] font-bold">
                    <span className={`flex items-center gap-1 ${stat.trend === "up" ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                      {stat.trend === "up" ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                      {stat.change}
                    </span>
                    <span className="text-slate-500 ml-2 font-medium">önceki döneme göre</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* ─── Main Charts ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Revenue Area Chart */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Card className="h-full bg-white/70 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200/60 dark:border-white/5 shadow-sm rounded-3xl overflow-hidden flex flex-col">
              <CardHeader className="p-6 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-black/20 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base font-serif font-black text-slate-900 dark:text-slate-100">Büyüme Analitiği & Ciro</CardTitle>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">Son 12 ayın brüt satış ve net kâr marjı.</p>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-amber-500">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="p-6 flex-1 min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={salesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorCiro" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#d4af37" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#d4af37" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorKar" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(150,150,150,0.1)" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 600, fill: "currentColor" }} className="text-slate-400" />
                    <YAxis axisLine={false} tickLine={false} tickFormatter={(v) => `₺${(v/1000000).toFixed(1)}M`} tick={{ fontSize: 10, fill: "currentColor" }} className="text-slate-400" />
                    <RechartsTooltip
                      contentStyle={{ backgroundColor: "hsl(var(--card))", borderRadius: "16px", border: "1px solid rgba(150,150,150,0.2)", color: "hsl(var(--foreground))", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.2)" }}
                      itemStyle={{ fontSize: "12px", fontWeight: "bold" }}
                      formatter={(value: any) => [`₺${value.toLocaleString()}`, ""]}
                    />
                    <Area type="monotone" dataKey="ciro" name="Brüt Ciro" stroke="#d4af37" strokeWidth={3} fill="url(#colorCiro)" />
                    <Area type="monotone" dataKey="kar" name="Net Kâr" stroke="#10b981" strokeWidth={3} fill="url(#colorKar)" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Category Pie Chart */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <Card className="h-full bg-white/70 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200/60 dark:border-white/5 shadow-sm rounded-3xl overflow-hidden flex flex-col">
              <CardHeader className="p-6 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-black/20">
                <CardTitle className="text-base font-serif font-black text-slate-900 dark:text-slate-100">Kategori Performansı</CardTitle>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">Cironun ürün bazlı oransal dağılımı</p>
              </CardHeader>
              <CardContent className="p-6 flex-1 flex flex-col">
                <div className="flex-1 relative min-h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={85}
                        paddingAngle={5} dataKey="value" stroke="transparent"
                      >
                        {categoryData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                      </Pie>
                      <RechartsTooltip
                        contentStyle={{ backgroundColor: "hsl(var(--card))", borderRadius: "12px", border: "1px solid rgba(150,150,150,0.2)", color: "hsl(var(--foreground))" }}
                        formatter={(value: any, name: any, props: any) => [`₺${props.payload.revenue.toLocaleString()}`, "Gelir"]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  {/* Center Text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-2xl font-black font-mono text-slate-900 dark:text-slate-100">100%</span>
                    <span className="text-[9px] uppercase font-bold text-slate-500">Dağılım</span>
                  </div>
                </div>
                
                <div className="mt-4 space-y-2.5">
                  {categoryData.map((cat, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs group cursor-default">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full shadow-sm group-hover:scale-125 transition-transform" style={{ backgroundColor: cat.color }} />
                        <span className="font-bold text-slate-600 dark:text-slate-300">{cat.name}</span>
                      </div>
                      <span className="font-mono font-black text-slate-900 dark:text-slate-100">₺{(cat.revenue / 1000).toFixed(0)}K</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* ─── Bottom Area: Recent Orders & Weekly Goals ─── */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          
          {/* Recent Orders List */}
          <motion.div variants={itemVariants}>
            <Card className="h-full bg-white/70 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200/60 dark:border-white/5 shadow-sm rounded-3xl overflow-hidden">
              <CardHeader className="p-6 border-b border-slate-100 dark:border-white/5 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base font-serif font-black text-slate-900 dark:text-slate-100">Canlı Sipariş Akışı</CardTitle>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">E-ticaret ve toptan satış ağından son düşenler.</p>
                </div>
                <Button variant="outline" size="sm" className="h-8 rounded-xl border-slate-200 dark:border-white/10 bg-transparent text-xs font-bold hover:bg-slate-100 dark:hover:bg-white/5">
                  Tümünü Gör
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-slate-100 dark:divide-white/5">
                  {recentOrders.map((order, i) => {
                    const cfg = statusConfig[order.status as keyof typeof statusConfig]
                    const Icon = cfg.icon
                    return (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                        key={order.id} 
                        className="flex items-center justify-between p-5 hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors group cursor-pointer"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shadow-sm group-hover:scale-105 transition-transform ${cfg.color}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
                              {order.customer}
                              {order.priority === "high" && <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" title="Acil Gönderim" />}
                            </p>
                            <p className="text-xs font-medium text-slate-500 mt-0.5">{order.id} • {order.company}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-black font-mono text-slate-900 dark:text-slate-100">₺{order.amount.toLocaleString()}</p>
                          <p className="text-[10px] font-bold text-slate-400 mt-1">{order.date}</p>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Weekly Performance Bar */}
          <motion.div variants={itemVariants}>
            <Card className="h-full bg-white/70 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200/60 dark:border-white/5 shadow-sm rounded-3xl overflow-hidden flex flex-col">
              <CardHeader className="p-6 border-b border-slate-100 dark:border-white/5 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base font-serif font-black text-slate-900 dark:text-slate-100">Haftalık Satış / Hedef Hacmi</CardTitle>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">Günlük belirlenen hedeflere ulaşım oranı (Bin ₺)</p>
                </div>
              </CardHeader>
              <CardContent className="p-6 flex-1 min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(150,150,150,0.1)" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 600, fill: "currentColor" }} className="text-slate-400" />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "currentColor" }} className="text-slate-400" />
                    <RechartsTooltip
                      cursor={{ fill: "rgba(150,150,150,0.05)" }}
                      contentStyle={{ backgroundColor: "hsl(var(--card))", borderRadius: "12px", border: "1px solid rgba(150,150,150,0.2)", color: "hsl(var(--foreground))" }}
                      formatter={(value: any, name: any) => [`₺${value}K`, name === "satis" ? "Gerçekleşen" : "Hedef"]}
                    />
                    <Bar dataKey="hedef" fill="rgba(150,150,150,0.2)" radius={[6, 6, 0, 0]} maxBarSize={40} />
                    <Bar dataKey="satis" fill="#d4af37" radius={[6, 6, 0, 0]} maxBarSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

        </div>
      </motion.div>
    </div>
  )
}
