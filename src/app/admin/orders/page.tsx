"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  Search, Filter, Plus, MoreVertical, 
  ChevronDown, Calendar, Package, ArrowUpRight, CheckCircle2, Clock
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
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
  PENDING: { label: "Bekliyor", color: "bg-amber-100 text-amber-800 border-amber-200" },
  PROCESSING: { label: "Hazırlanıyor", color: "bg-blue-100 text-blue-800 border-blue-200" },
  PARTIAL: { label: "Parçalı Gönderim", color: "bg-indigo-100 text-indigo-800 border-indigo-200" },
  SHIPPED: { label: "Kargolandı", color: "bg-purple-100 text-purple-800 border-purple-200" },
  DELIVERED: { label: "Teslim Edildi", color: "bg-emerald-100 text-emerald-800 border-emerald-200" },
  CANCELLED: { label: "İptal", color: "bg-slate-100 text-slate-800 border-slate-200" },
  REFUNDED: { label: "İade Edildi", color: "bg-red-100 text-red-800 border-red-200" }
}

const paymentConfig: Record<PaymentStatus, { label: string, color: string }> = {
  UNPAID: { label: "Ödenmedi", color: "text-red-600 bg-red-50" },
  PARTIALLY_PAID: { label: "Kısmi Ödeme", color: "text-amber-600 bg-amber-50" },
  PAID: { label: "Ödendi", color: "text-emerald-600 bg-emerald-50" },
  REFUNDED: { label: "İade", color: "text-slate-600 bg-slate-50" }
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderRow[]>(MOCK_ORDERS)
  const [search, setSearch] = useState("")

  const filteredOrders = orders.filter(o => 
    o.orderNumber.toLowerCase().includes(search.toLowerCase()) || 
    o.customerName.toLowerCase().includes(search.toLowerCase())
  )

  // Inline status update handler (Excel-like experience)
  const updateStatus = (id: string, newStatus: OrderStatus) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o))
  }

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto font-sans">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif text-slate-900 tracking-tight">Sipariş Yönetimi (OMS)</h1>
          <p className="text-slate-500 mt-1">B2B ve B2C siparişlerinizi, kargo ve ödeme durumlarını yönetin.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-slate-300 text-slate-700 h-10">
            <Filter className="h-4 w-4 mr-2" /> Gelişmiş Filtre
          </Button>
          <Button className="bg-slate-900 text-white hover:bg-slate-800 h-10 px-6 shadow-md">
            <Plus className="h-4 w-4 mr-2" /> Manuel Sipariş (Taslak)
          </Button>
        </div>
      </div>

      {/* FILTER BAR */}
      <Card className="p-4 border-slate-200 shadow-sm bg-white rounded-xl flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-[250px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Sipariş No, Müşteri Adı..." 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
            className="pl-9 bg-slate-50 border-slate-200 focus-visible:ring-slate-300 h-10" 
          />
        </div>
        
        <Select defaultValue="ALL">
          <SelectTrigger className="w-[160px] h-10 bg-slate-50 border-slate-200">
            <SelectValue placeholder="Satış Kanalı" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Tüm Kanallar</SelectItem>
            <SelectItem value="B2C">Perakende (B2C)</SelectItem>
            <SelectItem value="B2B">Toptan (B2B)</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="ALL">
          <SelectTrigger className="w-[160px] h-10 bg-slate-50 border-slate-200">
            <SelectValue placeholder="Durum" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Tüm Durumlar</SelectItem>
            <SelectItem value="PENDING">Bekliyor</SelectItem>
            <SelectItem value="PROCESSING">Hazırlanıyor</SelectItem>
            <SelectItem value="SHIPPED">Kargolandı</SelectItem>
          </SelectContent>
        </Select>
        
        <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-500 hover:text-slate-900 border border-slate-200 bg-slate-50">
          <Calendar className="h-4 w-4" />
        </Button>
      </Card>

      {/* DATA TABLE */}
      <Card className="border-slate-200 shadow-sm rounded-xl overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-600 uppercase tracking-wider text-xs">Sipariş</th>
                <th className="px-6 py-4 font-semibold text-slate-600 uppercase tracking-wider text-xs">Müşteri</th>
                <th className="px-6 py-4 font-semibold text-slate-600 uppercase tracking-wider text-xs text-right">Tutar</th>
                <th className="px-6 py-4 font-semibold text-slate-600 uppercase tracking-wider text-xs">Ödeme</th>
                <th className="px-6 py-4 font-semibold text-slate-600 uppercase tracking-wider text-xs">Durum</th>
                <th className="px-6 py-4 font-semibold text-slate-600 uppercase tracking-wider text-xs text-right">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    Sipariş bulunamadı.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <motion.tr 
                    key={order.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="hover:bg-slate-50/80 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <Link href={`/admin/orders/${order.id}`} className="block">
                        <span className="font-mono font-medium text-slate-900 hover:text-amber-600 transition-colors">{order.orderNumber}</span>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-slate-400">{new Date(order.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
                          <Badge variant="outline" className={`text-[10px] px-1.5 py-0 border-0 ${order.orderType === 'B2B' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'}`}>
                            {order.orderType}
                          </Badge>
                        </div>
                      </Link>
                    </td>
                    
                    <td className="px-6 py-4">
                      <span className="font-medium text-slate-800">{order.customerName}</span>
                      <p className="text-xs text-slate-500 mt-1">{order.itemCount} Ürün</p>
                    </td>
                    
                    <td className="px-6 py-4 text-right">
                      <span className="font-mono text-base text-slate-900">
                        {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(order.totalAmount)}
                      </span>
                    </td>
                    
                    <td className="px-6 py-4">
                      <Badge variant="outline" className={`border-0 px-2 py-1 font-medium ${paymentConfig[order.paymentStatus].color}`}>
                        {order.paymentStatus === 'PAID' && <CheckCircle2 className="w-3 h-3 mr-1 inline-block" />}
                        {order.paymentStatus === 'PARTIALLY_PAID' && <Clock className="w-3 h-3 mr-1 inline-block" />}
                        {paymentConfig[order.paymentStatus].label}
                      </Badge>
                    </td>
                    
                    <td className="px-6 py-4">
                      {/* INLINE EDIT STATUS */}
                      <Select 
                        value={order.status} 
                        onValueChange={(val) => updateStatus(order.id, val as OrderStatus)}
                      >
                        <SelectTrigger className={`h-8 w-[140px] text-xs font-medium border ${statusConfig[order.status].color} hover:opacity-80 transition-opacity`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(statusConfig).map(([key, config]) => (
                            <SelectItem key={key} value={key} className="text-xs">
                              {config.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                    
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="icon" asChild className="h-8 w-8 text-slate-400 hover:text-slate-900 group-hover:bg-slate-200">
                        <Link href={`/admin/orders/${order.id}`}>
                          <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
