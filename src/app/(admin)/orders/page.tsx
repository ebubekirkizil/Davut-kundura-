"use client";

import { useState } from "react";
import { ShoppingCart, Search, Filter, Download, MoreHorizontal, CheckCircle2, Clock, Truck, XCircle, ArrowUpRight, ArrowDownRight, Package, Sparkles, Plus } from "lucide-react";

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

  const filteredOrders = orders.filter((o) => {
    const q = search.toLowerCase();
    return (
      o.id.toLowerCase().includes(q) ||
      o.customer.toLowerCase().includes(q) ||
      o.email.toLowerCase().includes(q)
    );
  });

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "PENDING": return <span className="flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-700 text-[10px] font-black uppercase tracking-widest rounded-full border border-amber-200/50"><Clock size={12} /> Bekliyor</span>;
      case "PROCESSING": return <span className="flex items-center gap-1.5 px-3 py-1 bg-[var(--accent)]/10 text-[var(--accent)] text-[10px] font-black uppercase tracking-widest rounded-full border border-[var(--accent)]/20"><Package size={12} /> Hazırlanıyor</span>;
      case "SHIPPED": return <span className="flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-widest rounded-full border border-blue-200/50"><Truck size={12} /> Kargoda</span>;
      case "DELIVERED": return <span className="flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 text-[10px] font-black uppercase tracking-widest rounded-full border border-green-200/50"><CheckCircle2 size={12} /> Teslim Edildi</span>;
      case "CANCELLED": return <span className="flex items-center gap-1.5 px-3 py-1 bg-red-100 text-red-700 text-[10px] font-black uppercase tracking-widest rounded-full border border-red-200/50"><XCircle size={12} /> İptal</span>;
      default: return null;
    }
  };

  const getPaymentBadge = (status: string) => {
    return status === "PAID" 
      ? <span className="text-[10px] font-black text-green-600 uppercase tracking-tighter">● ÖDENDİ</span>
      : status === "REFUNDED"
      ? <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">● İADE</span>
      : <span className="text-[10px] font-black text-red-500 uppercase tracking-tighter">● BEKLEMEDE</span>;
  };

  return (
    <div className="max-w-[1400px] mx-auto space-y-8 pb-12 animate-in fade-in duration-1000">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-brand font-bold tracking-tight text-[var(--text-primary)]">Sipariş Portfolyosu</h1>
            <span className="px-3 py-1 bg-[var(--accent)]/10 text-[var(--accent)] text-[10px] font-black rounded-full uppercase tracking-widest border border-[var(--accent)]/20">Aktif Operasyon</span>
          </div>
          <p className="text-[14px] text-[var(--text-secondary)] font-light italic">"Zanaatın her adımını titizlikle takip edin."</p>
        </div>
        <div className="w-full lg:w-auto mt-2">
          <input
            type="text"
            placeholder="Ara: müşteri / sipariş / e-posta"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border border-[var(--border)] rounded-xl bg-white shadow-sm"
          />
        </div>
        <div className="flex items-center gap-3">
           <button className="px-6 py-3 border border-[var(--border)] rounded-xl text-[13px] font-bold text-[var(--text-primary)] bg-white hover:bg-[var(--bg-secondary)] transition-all flex items-center gap-2 shadow-sm">
             <Download size={18} /> Rapor Al
           </button>
           <button className="px-6 py-3 bg-[var(--text-primary)] text-white rounded-xl text-[13px] font-bold hover:bg-[var(--accent)] shadow-xl transition-all flex items-center gap-2 group">
             <Plus size={18} className="group-hover:rotate-90 transition-transform" /> Manuel Sipariş
           </button>
        </div>
      </div>

      {/* KPI Cards - Premium Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "GÜNLÜK HACİM", value: "14,250 ₺", trend: "+%12", icon: ShoppingCart, color: "var(--accent)" },
          { title: "ATÖLYE SÜRECİ", value: "48", sub: "Sipariş", icon: Package, color: "#3b82f6" },
          { title: "ONAY HAVUZU", value: "12", sub: "Bekleyen", icon: Clock, color: "#f59e0b" },
          { title: "TRANSİT SEVKİYAT", value: "156", trend: "%75 Varış", icon: Truck, color: "var(--text-primary)", isDark: true }
        ].map((card, i) => (
          <div key={i} className={`relative overflow-hidden rounded-[2rem] p-8 shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 group ${card.isDark ? 'bg-[var(--text-primary)] text-white' : 'bg-white border border-[var(--border)]'}`}>
            <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl -mr-12 -mt-12 transition-colors ${card.isDark ? 'bg-white/10' : 'bg-[var(--accent)]/5 group-hover:bg-[var(--accent)]/10'}`} />
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className={`p-3 rounded-2xl transition-colors ${card.isDark ? 'bg-white/10' : 'bg-[var(--bg-secondary)] group-hover:bg-[var(--accent)]/10'}`}>
                <card.icon size={20} className={card.isDark ? 'text-white' : 'text-[var(--text-secondary)] group-hover:text-[var(--accent)]'} />
              </div>
              {card.trend && (
                <div className={`text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 ${card.isDark ? 'bg-white/20 text-white' : 'bg-green-100 text-green-700'}`}>
                  {card.trend}
                </div>
              )}
            </div>
            <div className="space-y-1 relative z-10">
              <span className={`text-[11px] font-black uppercase tracking-[0.2em] ${card.isDark ? 'text-white/60' : 'text-[var(--text-secondary)]'}`}>{card.title}</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black font-brand">{card.value}</span>
                {card.sub && <span className={`text-[14px] font-bold ${card.isDark ? 'text-white/60' : 'text-[var(--text-secondary)]'}`}>{card.sub}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Table Area - Premium Card */}
      <div className="bg-white border border-[var(--border)] rounded-[2.5rem] shadow-sm overflow-hidden">
        
        {/* Advanced Toolbar */}
        <div className="p-8 border-b border-[var(--border)] flex flex-col lg:flex-row gap-6 justify-between items-center bg-[var(--bg-secondary)]/30 backdrop-blur-sm">
          <div className="flex bg-white/80 border border-[var(--border)] rounded-2xl overflow-hidden p-1 shadow-inner backdrop-blur-md">
            {['ALL', 'UNPAID', 'PROCESSING', 'SHIPPED'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 text-[11px] font-black uppercase tracking-widest rounded-xl transition-all duration-300 ${
                  activeTab === tab 
                    ? 'bg-[var(--text-primary)] text-white shadow-lg scale-105' 
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white'
                }`}
              >
                {tab === 'ALL' ? 'Tümü' : tab === 'UNPAID' ? 'Ödeme Bekleyen' : tab === 'PROCESSING' ? 'Hazırlanan' : 'Kargoda'}
              </button>
            ))}
          </div>

          <div className="flex gap-3 w-full lg:w-auto relative group">
            <div className="relative flex-1 lg:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-secondary)] group-focus-within:text-[var(--accent)] transition-colors" />
              <input 
                type="text" 
                placeholder="Müşteri, No veya E-posta..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-white border border-[var(--border)] rounded-2xl text-[13px] font-bold focus:ring-4 focus:ring-[var(--accent)]/5 focus:border-[var(--accent)] outline-none transition-all shadow-sm" 
              />
            </div>
            <button className="px-5 py-3.5 border border-[var(--border)] bg-white rounded-2xl text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] flex items-center gap-2 shadow-sm transition-all group-hover:shadow-md">
              <Filter size={18} /> <span className="text-[13px] font-black uppercase tracking-tighter hidden sm:block">Filtre</span>
            </button>
          </div>
        </div>

        {/* Premium Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--bg-secondary)]/20">
                <th className="px-8 py-6 text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em] w-[15%]">Sipariş No</th>
                <th className="px-8 py-6 text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em] w-[25%]">Müşteri Portföyü</th>
                <th className="px-8 py-6 text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em] w-[15%]">Detaylar</th>
                <th className="px-8 py-6 text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em] w-[20%]">Operasyonel Durum</th>
                <th className="px-8 py-6 text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em] w-[15%] text-right">Mali Değer</th>
                <th className="px-8 py-6 text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em] w-[10%]"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
        {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-[var(--bg-secondary)]/50 transition-all duration-300 group cursor-pointer relative">
                  <td className="px-8 py-6">
                    <span className="text-[13px] font-black text-[var(--accent)] group-hover:scale-105 inline-block transition-transform">
                      #{order.id.split('-').pop()}
                    </span>
                    <div className="text-[10px] text-[var(--text-secondary)] font-bold mt-1 tracking-tighter opacity-50">{order.id}</div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[var(--bg-secondary)] to-white border border-[var(--border)] text-[var(--text-primary)] flex items-center justify-center font-black text-[12px] shadow-sm group-hover:shadow-md transition-all group-hover:rotate-6">
                         {order.customer.split(' ').map(n => n[0]).join('')}
                       </div>
                       <div>
                         <div className="font-bold text-[14px] text-[var(--text-primary)] tracking-tight">{order.customer}</div>
                         <div className="text-[11px] text-[var(--text-secondary)] font-medium italic">{order.email}</div>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="text-[13px] font-bold text-[var(--text-primary)]">{order.date}</div>
                    <div className="text-[11px] text-[var(--text-secondary)] font-black uppercase tracking-widest mt-1 opacity-60">{order.items} Adet Ürün</div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col gap-2 items-start">
                      {getStatusBadge(order.status)}
                      {getPaymentBadge(order.payment)}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <span className="font-black text-[16px] text-[var(--text-primary)] font-brand">{order.amount}</span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-3 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] hover:bg-white rounded-xl transition-all border border-transparent hover:border-[var(--border)] shadow-sm">
                      <MoreHorizontal size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Footer */}
        <div className="p-8 border-t border-[var(--border)] flex items-center justify-between bg-[var(--bg-secondary)]/10 text-[12px] text-[var(--text-secondary)] font-bold">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[var(--accent)] rounded-full"></div>
            <span>1,452 işlem arasından 1 - 5 gösteriliyor.</span>
          </div>
          <div className="flex gap-2">
             <button className="px-4 py-2 bg-white border border-[var(--border)] rounded-xl hover:bg-[var(--bg-secondary)] transition-all shadow-sm opacity-50 cursor-not-allowed">Geri</button>
             {[1, 2, 3].map(p => (
               <button key={p} className={`w-10 h-10 rounded-xl font-black transition-all ${p === 1 ? 'bg-[var(--text-primary)] text-white shadow-lg' : 'hover:bg-white text-[var(--text-secondary)]'}`}>{p}</button>
             ))}
             <button className="px-4 py-2 bg-white border border-[var(--border)] rounded-xl hover:bg-[var(--bg-secondary)] transition-all shadow-sm">İleri</button>
          </div>
        </div>

      </div>
    </div>
  );
}
