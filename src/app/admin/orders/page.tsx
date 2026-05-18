"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Search, Filter, Plus, MoreVertical, 
  ChevronDown, Calendar, Package, ArrowUpRight, CheckCircle2, Clock
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"

// --- TYPES ---
type OrderStatus = "PENDING" | "PROCESSING" | "PARTIAL" | "SHIPPED" | "DELIVERED" | "CANCELLED" | "REFUNDED"
type PaymentStatus = "UNPAID" | "PARTIALLY_PAID" | "PAID" | "REFUNDED"
type OrderType = "B2C" | "B2B"

interface OrderRow {
  id: string
  orderNumber: string
  orderType: OrderType
  customerName: string
  totalAmount: number
  status: OrderStatus
  paymentStatus: PaymentStatus
  createdAt: string
  itemCount: number
}

// --- MOCK DATA ---
const MOCK_ORDERS: OrderRow[] = [
  { id: "1", orderNumber: "ORD-2024-1042", orderType: "B2C", customerName: "Ahmet Yılmaz", totalAmount: 3450.00, status: "PENDING", paymentStatus: "PAID", createdAt: "2024-10-24T14:30:00Z", itemCount: 2 },
  { id: "2", orderNumber: "ORD-2024-1041", orderType: "B2B", customerName: "Koray Ayakkabıcılık", totalAmount: 45000.00, status: "PROCESSING", paymentStatus: "PARTIALLY_PAID", createdAt: "2024-10-23T09:15:00Z", itemCount: 120 },
  { id: "3", orderNumber: "ORD-2024-1040", orderType: "B2C", customerName: "Elif Demir", totalAmount: 1290.00, status: "SHIPPED", paymentStatus: "PAID", createdAt: "2024-10-22T16:45:00Z", itemCount: 1 },
  { id: "4", orderNumber: "ORD-2024-1039", orderType: "B2C", customerName: "Can Kaya", totalAmount: 890.00, status: "DELIVERED", paymentStatus: "PAID", createdAt: "2024-10-20T11:20:00Z", itemCount: 1 },
  { id: "5", orderNumber: "ORD-2024-1038", orderType: "B2B", customerName: "Zarif Deri A.Ş.", totalAmount: 125000.00, status: "PARTIAL", paymentStatus: "UNPAID", createdAt: "2024-10-18T10:00:00Z", itemCount: 350 },
]

// --- HELPERS ---
const statusConfig: Record<OrderStatus, { label: string, color: string }> = {
  PENDING: { label: "Bekliyor", color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20" },
  PROCESSING: { label: "Hazırlanıyor", color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20" },
  PARTIAL: { label: "Parçalı Gönderim", color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20" },
  SHIPPED: { label: "Kargolandı", color: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20" },
  DELIVERED: { label: "Teslim Edildi", color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20" },
  CANCELLED: { label: "İptal", color: "bg-slate-500/10 text-slate-600 dark:text-slate-400 border border-slate-500/10" },
  REFUNDED: { label: "İade Edildi", color: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/25" }
}

const paymentConfig: Record<PaymentStatus, { label: string, color: string }> = {
  UNPAID: { label: "Ödenmedi", color: "text-rose-600 dark:text-rose-400 bg-rose-500/10 border border-rose-500/20" },
  PARTIALLY_PAID: { label: "Kısmi Ödeme", color: "text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20" },
  PAID: { label: "Ödendi", color: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20" },
  REFUNDED: { label: "İade", color: "text-slate-600 dark:text-slate-400 bg-slate-500/10 border border-slate-500/20" }
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderRow[]>(MOCK_ORDERS)
  const [search, setSearch] = useState("")

  const filteredOrders = orders.filter(o => 
    o.orderNumber.toLowerCase().includes(search.toLowerCase()) || 
    o.customerName.toLowerCase().includes(search.toLowerCase())
  )

  // Inline status update handler
  const updateStatus = (id: string, newStatus: OrderStatus) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o))
  }

  return (
    <div className="space-y-8 p-6 max-w-[1600px] mx-auto text-slate-800 dark:text-slate-100 font-sans">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-serif font-bold text-slate-900 dark:text-white tracking-tight">Sipariş Yönetimi (OMS)</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg font-medium font-sans">B2B ve B2C siparişlerinizi, kargo ve ödeme durumlarını tek panelden yönetin.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            className="h-10 bg-white/70 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 text-slate-800 dark:text-slate-200 shadow-sm font-bold rounded-xl"
          >
            <Filter className="h-4 w-4 mr-2" /> Gelişmiş Filtrele
          </Button>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="h-10 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white shadow-lg shadow-amber-500/25 font-bold transition-all text-sm flex items-center"
          >
            <Plus className="h-4 w-4 mr-2 stroke-[3]" /> Manuel Sipariş Oluştur
          </motion.button>
        </div>
      </div>

      {/* FILTER BAR */}
      <Card className="bg-white/70 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/80 dark:border-white/5 shadow-lg shadow-slate-200/20 dark:shadow-black/40 rounded-3xl">
        <CardContent className="p-4 flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-[250px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
            <Input 
              placeholder="Sipariş No, Müşteri Adı..." 
              value={search} 
              onChange={e => setSearch(e.target.value)} 
              className="pl-9 bg-slate-50 dark:bg-slate-950/40 border-slate-200 dark:border-white/10 focus:bg-white dark:focus:bg-slate-950 transition-all text-slate-800 dark:text-slate-200 h-10 rounded-xl" 
            />
          </div>
          
          <Select defaultValue="ALL">
            <SelectTrigger className="w-[160px] h-10 bg-slate-50 dark:bg-slate-950/40 border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 rounded-xl">
              <SelectValue placeholder="Satış Kanalı" />
            </SelectTrigger>
            <SelectContent className="bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-xl p-1 shadow-xl">
              <SelectItem value="ALL" className="font-semibold text-xs rounded-lg">Tüm Kanallar</SelectItem>
              <SelectItem value="B2C" className="font-semibold text-xs rounded-lg">Perakende (B2C)</SelectItem>
              <SelectItem value="B2B" className="font-semibold text-xs rounded-lg text-indigo-600 focus:text-indigo-600">Toptan (B2B)</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="ALL">
            <SelectTrigger className="w-[160px] h-10 bg-slate-50 dark:bg-slate-950/40 border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 rounded-xl">
              <SelectValue placeholder="Durum" />
            </SelectTrigger>
            <SelectContent className="bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-xl p-1 shadow-xl">
              <SelectItem value="ALL" className="font-semibold text-xs rounded-lg">Tüm Durumlar</SelectItem>
              <SelectItem value="PENDING" className="font-semibold text-xs rounded-lg text-amber-600">Bekliyor</SelectItem>
              <SelectItem value="PROCESSING" className="font-semibold text-xs rounded-lg text-blue-600">Hazırlanıyor</SelectItem>
              <SelectItem value="SHIPPED" className="font-semibold text-xs rounded-lg text-purple-600">Kargolandı</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-500 hover:text-slate-950 dark:text-slate-400 dark:hover:text-slate-200 border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/40 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5">
            <Calendar className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>

      {/* DATA TABLE */}
      <Card className="overflow-hidden border border-slate-200 dark:border-white/5 shadow-lg bg-white/70 dark:bg-slate-900/40 backdrop-blur-md rounded-3xl">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50/50 dark:bg-black/20 text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold tracking-widest border-b border-slate-200 dark:border-white/5">
              <tr>
                <th className="px-6 py-4">Sipariş Bilgisi</th>
                <th className="px-6 py-4">Müşteri</th>
                <th className="px-6 py-4 text-right">Tutar</th>
                <th className="px-6 py-4">Ödeme Durumu</th>
                <th className="px-6 py-4">Sipariş Durumu</th>
                <th className="px-6 py-4 text-right">Detay</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5 font-sans">
              <AnimatePresence mode="popLayout">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500 dark:text-slate-400 font-bold text-base">
                      Kritere uygun sipariş bulunamadı.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <motion.tr 
                      key={order.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      className="hover:bg-slate-100/50 dark:hover:bg-white/[0.02] transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <Link href={`/admin/orders/${order.id}`} className="block">
                          <span className="font-mono font-extrabold text-slate-900 dark:text-slate-100 hover:text-amber-600 dark:hover:text-amber-400 transition-colors text-base">{order.orderNumber}</span>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-slate-400 dark:text-slate-500 font-semibold">{new Date(order.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
                            <Badge className={`text-[9px] font-black rounded-lg px-1.5 py-0 border-0 ${order.orderType === 'B2B' ? 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-400' : 'bg-slate-500/10 text-slate-600 dark:text-slate-300'}`}>
                              {order.orderType}
                            </Badge>
                          </div>
                        </Link>
                      </td>
                      
                      <td className="px-6 py-4">
                        <span className="font-bold text-slate-800 dark:text-slate-200">{order.customerName}</span>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 font-bold">{order.itemCount} Ürün Paketlendi</p>
                      </td>
                      
                      <td className="px-6 py-4 text-right">
                        <span className="font-mono font-black text-slate-900 dark:text-white text-base">
                          {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(order.totalAmount)}
                        </span>
                      </td>
                      
                      <td className="px-6 py-4">
                        <Badge variant="outline" className={`border font-bold rounded-xl px-2.5 py-1 text-[10px] ${paymentConfig[order.paymentStatus].color}`}>
                          {order.paymentStatus === 'PAID' && <CheckCircle2 className="w-3.5 h-3.5 mr-1 inline-block" />}
                          {order.paymentStatus === 'PARTIALLY_PAID' && <Clock className="w-3.5 h-3.5 mr-1 inline-block" />}
                          {paymentConfig[order.paymentStatus].label}
                        </Badge>
                      </td>
                      
                      <td className="px-6 py-4">
                        {/* INLINE EDIT STATUS WITH DYNAMIC CONTRAST SELECT */}
                        <Select 
                          value={order.status} 
                          onValueChange={(val) => updateStatus(order.id, val as OrderStatus)}
                        >
                          <SelectTrigger className={`h-8 w-[140px] text-xs font-black rounded-xl border ${statusConfig[order.status].color} hover:opacity-80 transition-opacity`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-xl p-1 shadow-xl">
                            {Object.entries(statusConfig).map(([key, config]) => (
                              <SelectItem key={key} value={key} className="text-xs font-bold rounded-lg p-2">
                                {config.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </td>
                      
                      <td className="px-6 py-4 text-right">
                        <Button variant="ghost" size="icon" asChild className="h-8 w-8 text-slate-400 hover:text-slate-900 dark:text-slate-500 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg">
                          <Link href={`/admin/orders/${order.id}`}>
                            <ArrowUpRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </td>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
