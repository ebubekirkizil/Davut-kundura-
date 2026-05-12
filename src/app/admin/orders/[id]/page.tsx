"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  ArrowLeft, Printer, Truck, FileText, Check, AlertCircle, 
  Package, MapPin, User, Clock, CreditCard, Box, ShieldCheck, ChevronRight
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// --- MOCK DATA ---
const ORDER = {
  id: "1",
  orderNumber: "ORD-2024-1042",
  orderType: "B2B",
  status: "PROCESSING",
  paymentStatus: "PARTIALLY_PAID",
  createdAt: "2024-10-24T14:30:00Z",
  customer: {
    name: "Ahmet Yılmaz",
    email: "ahmet@yilmazderi.com",
    phone: "+90 532 123 45 67",
    isVIP: true,
    totalOrders: 14,
  },
  shippingAddress: {
    fullName: "Ahmet Yılmaz",
    address: "Organize Sanayi Bölgesi, 3. Cad. No:12",
    city: "İstanbul",
    district: "İkitelli",
    zip: "34490"
  },
  items: [
    { id: "i1", name: "Premium Deri Kemer — Executive Black", variant: "105 cm", sku: "DK-001-BLK", price: 899.00, quantity: 50, imageUrl: "https://images.unsplash.com/photo-1624222247344-550fb60eba1c?q=80&w=800&auto=format&fit=crop" },
    { id: "i2", name: "Lüks Deri Bakım Seti", variant: "Standart", sku: "DK-003-BAK", price: 299.00, quantity: 10, imageUrl: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop" }
  ],
  financials: {
    subtotal: 47940.00,
    shipping: 0.00,
    discount: 2940.00,
    tax: 8100.00,
    total: 53100.00,
    paid: 20000.00,
  },
  timeline: [
    { id: "t1", action: "Sipariş Oluşturuldu", user: "Ahmet Yılmaz", date: "2024-10-24T14:30:00Z" },
    { id: "t2", action: "Kısmi Ödeme Alındı (Havale)", user: "Sistem", date: "2024-10-24T15:00:00Z" },
    { id: "t3", action: "Fulfillment Oluşturuldu (Merkez Depo)", user: "Admin (Hasan)", date: "2024-10-24T16:15:00Z" },
  ]
}

const statusColor = (status: string) => {
  switch(status) {
    case "PENDING": return "text-amber-600 bg-amber-50 border-amber-200"
    case "PROCESSING": return "text-blue-600 bg-blue-50 border-blue-200"
    case "SHIPPED": return "text-purple-600 bg-purple-50 border-purple-200"
    default: return "text-slate-600 bg-slate-50 border-slate-200"
  }
}

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const [isScrolled, setIsScrolled] = useState(false)

  // Listen for scroll to toggle sticky header shadow
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen pb-24 bg-slate-50/50 font-sans">
      
      {/* --- STICKY ACTION BAR --- */}
      <div className={`sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b transition-all duration-200 px-6 py-4 flex items-center justify-between ${isScrolled ? 'border-slate-200 shadow-sm' : 'border-transparent'}`}>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild className="h-8 w-8 text-slate-500 hover:text-slate-900">
            <Link href="/admin/orders">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-serif font-bold text-slate-900 tracking-tight">{ORDER.orderNumber}</h1>
              <Badge variant="outline" className={`border text-xs px-2 py-0.5 uppercase tracking-widest font-semibold ${statusColor(ORDER.status)}`}>
                {ORDER.status === 'PROCESSING' ? 'Hazırlanıyor' : ORDER.status}
              </Badge>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {new Date(ORDER.createdAt).toLocaleString('tr-TR')} • {ORDER.orderType}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-slate-300 text-slate-700 bg-white shadow-sm">
            <Printer className="h-4 w-4 mr-2" /> Fatura Yazdır
          </Button>
          <Button className="bg-slate-900 text-white hover:bg-slate-800 shadow-md">
            <Truck className="h-4 w-4 mr-2" /> Kargoya Ver
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* ================= LEFT COLUMN: ITEMS & FINANCIALS ================= */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* FULFILLMENT CARD */}
          <Card className="border-slate-200 shadow-sm overflow-hidden bg-white">
            <CardHeader className="bg-slate-50/80 border-b border-slate-100 py-4 flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <Box className="h-5 w-5 text-slate-400" />
                <CardTitle className="text-sm font-semibold text-slate-700 uppercase tracking-widest">Paket 1 • Merkez Depo</CardTitle>
              </div>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Paketleniyor</Badge>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead className="border-b border-slate-100 bg-white">
                  <tr>
                    <th className="px-6 py-3 font-medium text-slate-500 text-left w-12">Ürün</th>
                    <th className="px-6 py-3 font-medium text-slate-500 text-left"></th>
                    <th className="px-6 py-3 font-medium text-slate-500 text-right">Fiyat</th>
                    <th className="px-6 py-3 font-medium text-slate-500 text-center">Adet</th>
                    <th className="px-6 py-3 font-medium text-slate-500 text-right">Toplam</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {ORDER.items.map((item) => (
                    <tr key={item.id} className="group hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="h-12 w-12 rounded bg-slate-100 border border-slate-200 overflow-hidden">
                          <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Link href={`/admin/products/${item.sku}`} className="font-medium text-slate-900 group-hover:text-amber-600 transition-colors block line-clamp-1">{item.name}</Link>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded uppercase">{item.variant}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{item.sku}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right font-mono text-slate-600">
                        {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(item.price)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-700 font-medium text-xs">
                          x{item.quantity}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right font-mono font-medium text-slate-900">
                        {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(item.price * item.quantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-between items-center">
                <Button variant="outline" size="sm" className="text-xs bg-white text-slate-600">Varyant Değiştir (Kargo Öncesi)</Button>
                <span className="text-xs text-slate-500 flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-emerald-500" /> Tüm ürünler stokta rezerve edildi.</span>
              </div>
            </CardContent>
          </Card>

          {/* FINANCIAL SUMMARY */}
          <Card className="border-slate-200 shadow-sm bg-white">
            <CardHeader className="border-b border-slate-100 py-4">
              <CardTitle className="text-sm font-semibold text-slate-700 uppercase tracking-widest flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-slate-400" /> Ödeme Dökümü
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Ara Toplam</span>
                    <span className="font-mono text-slate-800">{new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(ORDER.financials.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">İndirim (B2B Toptan)</span>
                    <span className="font-mono text-amber-600">-{new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(ORDER.financials.discount)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Kargo</span>
                    <span className="font-mono text-slate-800">Ücretsiz</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">KDV (%18)</span>
                    <span className="font-mono text-slate-800">{new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(ORDER.financials.tax)}</span>
                  </div>
                  <Separator className="bg-slate-200" />
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-bold text-slate-900 uppercase tracking-widest">Genel Toplam</span>
                    <span className="font-mono text-2xl font-bold text-slate-900">{new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(ORDER.financials.total)}</span>
                  </div>
                </div>
                
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-500 uppercase">Ödenen Tutar (Kapora)</span>
                      <Badge variant="outline" className="bg-amber-100 text-amber-700 border-0">Açık Hesap (Net 30)</Badge>
                    </div>
                    <span className="font-mono text-xl font-bold text-emerald-600">{new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(ORDER.financials.paid)}</span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-200/60">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-500 uppercase">Kalan Bakiye</span>
                      <span className="font-mono text-lg font-bold text-red-600">{new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(ORDER.financials.total - ORDER.financials.paid)}</span>
                    </div>
                    <Button size="sm" variant="outline" className="w-full mt-3 bg-white">Ödeme Al / Borç Düş</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ================= RIGHT COLUMN: CUSTOMER & INFO ================= */}
        <div className="space-y-6">
          
          {/* CUSTOMER PROFILE */}
          <Card className="border-slate-200 shadow-sm bg-white">
             <CardHeader className="border-b border-slate-100 py-4 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-semibold text-slate-700 uppercase tracking-widest flex items-center gap-2">
                <User className="h-4 w-4 text-slate-400" /> Müşteri
              </CardTitle>
              {ORDER.customer.isVIP && <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 border-0">VIP</Badge>}
            </CardHeader>
            <CardContent className="p-5 text-sm space-y-4">
              <div>
                <p className="font-bold text-slate-900">{ORDER.customer.name}</p>
                <div className="text-slate-500 mt-1 flex flex-col gap-1">
                  <a href={`mailto:${ORDER.customer.email}`} className="hover:text-amber-600 transition-colors">{ORDER.customer.email}</a>
                  <a href={`tel:${ORDER.customer.phone}`} className="hover:text-amber-600 transition-colors">{ORDER.customer.phone}</a>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-100">
                <p className="text-slate-600 flex items-center justify-between">
                  <span>Toplam Sipariş:</span>
                  <span className="font-bold text-slate-900">{ORDER.customer.totalOrders} adet</span>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* SHIPPING ADDRESS */}
          <Card className="border-slate-200 shadow-sm bg-white">
            <CardHeader className="border-b border-slate-100 py-4">
              <CardTitle className="text-sm font-semibold text-slate-700 uppercase tracking-widest flex items-center gap-2">
                <MapPin className="h-4 w-4 text-slate-400" /> Teslimat Adresi
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 text-sm space-y-2">
              <p className="font-bold text-slate-900">{ORDER.shippingAddress.fullName}</p>
              <p className="text-slate-600 leading-relaxed">
                {ORDER.shippingAddress.address}<br/>
                {ORDER.shippingAddress.district}, {ORDER.shippingAddress.city} {ORDER.shippingAddress.zip}
              </p>
              <Button variant="link" className="px-0 text-amber-600 h-auto font-semibold">Haritada Gör <ArrowUpRight className="h-3 w-3 ml-1" /></Button>
            </CardContent>
          </Card>

          {/* TIMELINE (AUDIT LOG) */}
          <Card className="border-slate-200 shadow-sm bg-white">
            <CardHeader className="border-b border-slate-100 py-4">
              <CardTitle className="text-sm font-semibold text-slate-700 uppercase tracking-widest flex items-center gap-2">
                <Clock className="h-4 w-4 text-slate-400" /> Zaman Çizelgesi
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5">
              <div className="space-y-6">
                {ORDER.timeline.map((event, index) => (
                  <div key={event.id} className="relative flex gap-4">
                    {index !== ORDER.timeline.length - 1 && (
                      <div className="absolute left-[7px] top-5 bottom-[-24px] w-[2px] bg-slate-100" />
                    )}
                    <div className="relative z-10 w-4 h-4 mt-0.5 rounded-full border-2 border-amber-500 bg-white" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">{event.action}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] text-slate-400 font-mono">{new Date(event.date).toLocaleTimeString('tr-TR', {hour: '2-digit', minute:'2-digit'})}</span>
                        <span className="text-[10px] text-slate-400">•</span>
                        <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 rounded">{event.user}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
        </div>
      </div>
    </div>
  )
}
