"use client";

import { useState } from "react";
import { ShoppingCart, Search, Filter, Download, MoreHorizontal, CheckCircle2, Clock, Truck, XCircle, ArrowUpRight, ArrowDownRight, Package } from "lucide-react";

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("ALL");
  const [search, setSearch] = useState("");

  const orders = [
    { id: "ORD-2026-9012", customer: "Ahmet Yılmaz", email: "ahmet@firma.com", date: "Bugün, 14:30", amount: "3,450 ₺", status: "PROCESSING", payment: "PAID", items: 2 },
    { id: "ORD-2026-9011", customer: "Zeynep Kaya", email: "zeynep.kaya@gmail.com", date: "Bugün, 11:15", amount: "1,200 ₺", status: "PENDING", payment: "UNPAID", items: 1 },
    { id: "ORD-2026-9010", customer: "Mustafa Demir", email: "mdemir99@yandex.com", date: "Dün, 16:45", amount: "5,800 ₺", status: "SHIPPED", payment: "PAID", items: 3 },
    { id: "ORD-2026-9009", customer: "Ebru Çelik", email: "ebru_celik@hotmail.com", date: "Dün, 09:20", amount: "2,400 ₺", status: "DELIVERED", payment: "PAID", items: 1 },
    { id: "ORD-2026-9008", customer: "Kemal T.", email: "kemal.t@sirket.com", date: "01 Mayıs, 15:00", amount: "4,600 ₺", status: "CANCELLED", payment: "REFUNDED", items: 2 },
  ];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "PENDING": return <span className="flex items-center gap-1.5 px-2.5 py-1 bg-yellow-100 text-yellow-700 text-[11px] font-bold rounded-full w-max"><Clock className="w-3 h-3" /> Onay Bekliyor</span>;
      case "PROCESSING": return <span className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-100 text-blue-700 text-[11px] font-bold rounded-full w-max"><Package className="w-3 h-3" /> Hazırlanıyor</span>;
      case "SHIPPED": return <span className="flex items-center gap-1.5 px-2.5 py-1 bg-purple-100 text-purple-700 text-[11px] font-bold rounded-full w-max"><Truck className="w-3 h-3" /> Kargoda</span>;
      case "DELIVERED": return <span className="flex items-center gap-1.5 px-2.5 py-1 bg-green-100 text-green-700 text-[11px] font-bold rounded-full w-max"><CheckCircle2 className="w-3 h-3" /> Teslim Edildi</span>;
      case "CANCELLED": return <span className="flex items-center gap-1.5 px-2.5 py-1 bg-red-100 text-red-700 text-[11px] font-bold rounded-full w-max"><XCircle className="w-3 h-3" /> İptal</span>;
      default: return null;
    }
  };

  const getPaymentBadge = (status: string) => {
    return status === "PAID" 
      ? <span className="text-[11px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded border border-green-200">ÖDENDİ</span>
      : status === "REFUNDED"
      ? <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">İADE EDİLDİ</span>
      : <span className="text-[11px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded border border-orange-200">ÖDENMEDİ</span>;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-[24px] font-bold text-[#1a1a1a] flex items-center gap-2 tracking-tight">
            <ShoppingCart className="w-7 h-7 text-indigo-600" /> Sipariş Yönetimi
          </h1>
          <p className="text-[13px] text-[#5c5f62] mt-1">E-ticaret operasyonunuzun kalbi. Siparişleri, ödemeleri ve kargoları anlık takip edin.</p>
        </div>
        <div className="flex gap-2">
           <button className="px-4 py-2 border border-[#d2d5d8] rounded-md text-[13px] font-medium text-[#1a1a1a] bg-white hover:bg-[#f1f2f4] flex items-center gap-2 shadow-sm">
             <Download className="w-4 h-4" /> Excel'e Aktar
           </button>
           <button className="px-4 py-2 bg-indigo-600 rounded-md text-[13px] font-medium text-white hover:bg-indigo-700 flex items-center gap-2 shadow-sm">
             Sipariş Oluştur
           </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-[#e3e3e3] rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><ShoppingCart className="w-16 h-16" /></div>
          <h3 className="text-[12px] font-bold text-[#5c5f62] uppercase tracking-wider mb-2">Bugünkü Satış</h3>
          <div className="flex items-end gap-2">
            <span className="text-[28px] font-bold text-[#1a1a1a]">14,250₺</span>
          </div>
          <p className="text-[11px] text-green-600 font-medium mt-2 flex items-center gap-1"><ArrowUpRight className="w-3 h-3"/> Düne göre %12 arttı</p>
        </div>
        
        <div className="bg-white border border-[#e3e3e3] rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><Package className="w-16 h-16" /></div>
          <h3 className="text-[12px] font-bold text-[#5c5f62] uppercase tracking-wider mb-2">Hazırlanan</h3>
          <div className="flex items-end gap-2">
            <span className="text-[28px] font-bold text-[#1a1a1a]">48</span>
            <span className="text-[14px] text-[#8a8a8a] mb-1.5 font-medium">Sipariş</span>
          </div>
          <p className="text-[11px] text-[#8a8a8a] mt-2">Atölyede paketleme bekliyor</p>
        </div>

        <div className="bg-white border border-[#e3e3e3] rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><Clock className="w-16 h-16" /></div>
          <h3 className="text-[12px] font-bold text-[#5c5f62] uppercase tracking-wider mb-2">Onay Bekleyen</h3>
          <div className="flex items-end gap-2">
            <span className="text-[28px] font-bold text-yellow-600">12</span>
            <span className="text-[14px] text-[#8a8a8a] mb-1.5 font-medium">Sipariş</span>
          </div>
          <p className="text-[11px] text-[#8a8a8a] mt-2">Havale / EFT onayı bekleniyor</p>
        </div>

        <div className="bg-indigo-600 rounded-xl p-5 shadow-md relative overflow-hidden text-white">
          <div className="absolute top-0 right-0 p-4 opacity-10"><Truck className="w-16 h-16" /></div>
          <h3 className="text-[12px] font-bold text-indigo-200 uppercase tracking-wider mb-2">Kargodaki Ürünler</h3>
          <div className="flex items-end gap-2">
            <span className="text-[28px] font-bold">156</span>
          </div>
          <div className="w-full bg-indigo-800 rounded-full h-1.5 mt-3 mb-1">
             <div className="bg-white h-1.5 rounded-full" style={{width: '75%'}}></div>
          </div>
          <p className="text-[10px] text-indigo-200">%75'i bugün teslim edilecek</p>
        </div>
      </div>

      {/* Main Table Area */}
      <div className="bg-white border border-[#e3e3e3] rounded-xl shadow-sm overflow-hidden">
        
        {/* Advanced Toolbar */}
        <div className="p-4 border-b border-[#e3e3e3] flex flex-col sm:flex-row gap-4 justify-between items-center bg-[#f9fafb]">
          <div className="flex bg-white border border-[#d2d5d8] rounded-lg overflow-hidden p-0.5 shadow-sm">
            {['ALL', 'UNPAID', 'PROCESSING', 'SHIPPED'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 text-[12px] font-bold rounded-md transition-all ${
                  activeTab === tab 
                    ? 'bg-indigo-50 text-indigo-700 shadow-sm' 
                    : 'text-[#5c5f62] hover:bg-slate-50 hover:text-[#1a1a1a]'
                }`}
              >
                {tab === 'ALL' ? 'Tümü' : tab === 'UNPAID' ? 'Ödeme Bekleyen' : tab === 'PROCESSING' ? 'Hazırlanan' : 'Kargoda'}
              </button>
            ))}
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8a8a8a]" />
              <input 
                type="text" 
                placeholder="Müşteri, Sipariş No veya E-posta..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 border border-[#d2d5d8] bg-white rounded-lg text-[13px] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all shadow-sm" 
              />
            </div>
            <button className="px-3 py-1.5 border border-[#d2d5d8] bg-white rounded-lg text-[#5c5f62] hover:bg-slate-50 flex items-center gap-2 shadow-sm transition-colors">
              <Filter className="w-4 h-4" /> <span className="text-[13px] font-medium hidden sm:block">Filtrele</span>
            </button>
          </div>
        </div>

        {/* Premium Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#e3e3e3] bg-white">
                <th className="px-5 py-4 text-[11px] font-bold text-[#8a8a8a] uppercase tracking-wider w-[15%]">Sipariş No</th>
                <th className="px-5 py-4 text-[11px] font-bold text-[#8a8a8a] uppercase tracking-wider w-[25%]">Müşteri</th>
                <th className="px-5 py-4 text-[11px] font-bold text-[#8a8a8a] uppercase tracking-wider w-[15%]">Tarih</th>
                <th className="px-5 py-4 text-[11px] font-bold text-[#8a8a8a] uppercase tracking-wider w-[15%]">Durum</th>
                <th className="px-5 py-4 text-[11px] font-bold text-[#8a8a8a] uppercase tracking-wider w-[15%] text-right">Tutar</th>
                <th className="px-5 py-4 text-[11px] font-bold text-[#8a8a8a] uppercase tracking-wider w-[5%]"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f2f4]">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer">
                  <td className="px-5 py-4">
                    <span className="text-[13px] font-bold font-mono text-indigo-600 hover:text-indigo-800 hover:underline">
                      {order.id}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-700 flex items-center justify-center font-bold text-[12px] border border-indigo-200">
                         {order.customer.split(' ').map(n => n[0]).join('')}
                       </div>
                       <div>
                         <div className="font-bold text-[13px] text-[#1a1a1a]">{order.customer}</div>
                         <div className="text-[11px] text-[#8a8a8a]">{order.email}</div>
                       </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="text-[13px] text-[#1a1a1a]">{order.date}</div>
                    <div className="text-[11px] text-[#8a8a8a]">{order.items} Ürün</div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-col gap-1.5 items-start">
                      {getStatusBadge(order.status)}
                      {getPaymentBadge(order.payment)}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <span className="font-bold text-[14px] text-[#1a1a1a]">{order.amount}</span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button className="p-1.5 text-[#a0a0a0] group-hover:text-[#1a1a1a] hover:bg-[#e3e3e3] rounded transition-colors">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Footer */}
        <div className="p-4 border-t border-[#e3e3e3] flex items-center justify-between bg-white text-[13px] text-[#5c5f62]">
          <span>Toplam 1,452 siparişin 1-5 arası gösteriliyor.</span>
          <div className="flex gap-1">
             <button className="px-3 py-1 border border-[#d2d5d8] rounded hover:bg-slate-50 disabled:opacity-50" disabled>Önceki</button>
             <button className="px-3 py-1 border border-[#d2d5d8] rounded hover:bg-slate-50 bg-white font-medium">1</button>
             <button className="px-3 py-1 border border-transparent rounded hover:bg-slate-50">2</button>
             <button className="px-3 py-1 border border-transparent rounded hover:bg-slate-50">3</button>
             <button className="px-3 py-1 border border-[#d2d5d8] rounded hover:bg-slate-50">Sonraki</button>
          </div>
        </div>

      </div>
    </div>
  );
}
