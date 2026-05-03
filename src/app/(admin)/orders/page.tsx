"use client";

import { useState, useEffect } from "react";
import { ShoppingCart, Search, Filter, Download, MoreHorizontal, CheckCircle2, Clock, Truck, XCircle, Package, Plus } from "lucide-react";

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("ALL");
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setLoading(true);
    const statusParam = activeTab !== "ALL" ? `&status=${activeTab}` : "";
    fetch(`/api/admin/orders?search=${encodeURIComponent(search)}${statusParam}`)
      .then(res => res.json())
      .then(data => {
        setOrders(data.items ?? []);
        setTotal(data.total ?? 0);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [search, activeTab]);

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "PENDING": return <span className="flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-700 text-[10px] font-black uppercase tracking-widest rounded-full border border-amber-200/50"><Clock size={12} /> Bekliyor</span>;
      case "PROCESSING": return <span className="flex items-center gap-1.5 px-3 py-1 bg-[var(--accent)]/10 text-[var(--accent)] text-[10px] font-black uppercase tracking-widest rounded-full border border-[var(--accent)]/20"><Package size={12} /> Hazırlanıyor</span>;
      case "SHIPPED": return <span className="flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-widest rounded-full border border-blue-200/50"><Truck size={12} /> Kargoda</span>;
      case "DELIVERED": return <span className="flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 text-[10px] font-black uppercase tracking-widest rounded-full border border-green-200/50"><CheckCircle2 size={12} /> Teslim Edildi</span>;
      case "CANCELLED": return <span className="flex items-center gap-1.5 px-3 py-1 bg-red-100 text-red-700 text-[10px] font-black uppercase tracking-widest rounded-full border border-red-200/50"><XCircle size={12} /> İptal</span>;
      default: return <span className="text-[10px] font-bold text-gray-400">Bilinmiyor</span>;
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto space-y-8 pb-12 animate-in fade-in duration-1000">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-brand font-bold tracking-tight text-[var(--text-primary)]">Sipariş Portfolyosu</h1>
            <span className="px-3 py-1 bg-[var(--accent)]/10 text-[var(--accent)] text-[10px] font-black rounded-full uppercase tracking-widest border border-[var(--accent)]/20">Canlı Sistem</span>
          </div>
          <p className="text-[14px] text-[var(--text-secondary)] font-light italic">"Operasyonel verimliliğin gerçek zamanlı takibi."</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="px-6 py-3 border border-[var(--border)] rounded-xl text-[13px] font-bold text-[var(--text-primary)] bg-white hover:bg-[var(--bg-secondary)] transition-all flex items-center gap-2 shadow-sm">
             <Download size={18} /> Rapor Al
           </button>
           <button className="px-6 py-3 bg-black text-white rounded-xl text-[13px] font-bold hover:bg-[var(--accent)] shadow-xl transition-all flex items-center gap-2 group">
             <Plus size={18} className="group-hover:rotate-90 transition-transform" /> Manuel Sipariş
           </button>
        </div>
      </div>

      {/* Main Table Area - Premium Card */}
      <div className="bg-white border border-[var(--border)] rounded-[2.5rem] shadow-sm overflow-hidden">
        
        {/* Advanced Toolbar */}
        <div className="p-8 border-b border-[var(--border)] flex flex-col lg:flex-row gap-6 justify-between items-center bg-[var(--bg-secondary)]/30 backdrop-blur-sm">
          <div className="flex bg-white/80 border border-[var(--border)] rounded-2xl overflow-hidden p-1 shadow-inner backdrop-blur-md">
            {['ALL', 'PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 text-[11px] font-black uppercase tracking-widest rounded-xl transition-all duration-300 ${
                  activeTab === tab 
                    ? 'bg-black text-white shadow-lg scale-105' 
                    : 'text-[var(--text-secondary)] hover:text-black hover:bg-white'
                }`}
              >
                {tab === 'ALL' ? 'Tümü' : tab === 'PENDING' ? 'Bekleyen' : tab === 'PROCESSING' ? 'Hazırlanan' : tab === 'SHIPPED' ? 'Kargoda' : 'Teslimat'}
              </button>
            ))}
          </div>

          <div className="flex gap-3 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Sipariş No veya Müşteri..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-[var(--border)] rounded-2xl text-[13px] focus:border-[var(--accent)] outline-none transition-all" 
              />
            </div>
            <button className="px-5 py-3 border border-[var(--border)] bg-white rounded-2xl text-gray-600 hover:bg-gray-50 shadow-sm transition-all">
              <Filter size={18} />
            </button>
          </div>
        </div>

        {/* Premium Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--bg-secondary)]/10">
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Sipariş</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Müşteri</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Tarih</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Durum</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Tutar</th>
                <th className="px-8 py-6 w-[80px]"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan={6} className="px-8 py-20 text-center text-gray-400 italic">Veriler senkronize ediliyor...</td></tr>
              ) : orders.length === 0 ? (
                <tr><td colSpan={6} className="px-8 py-20 text-center text-gray-400 italic">Henüz bir sipariş kaydı bulunmuyor.</td></tr>
              ) : orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/50 transition-all group">
                  <td className="px-8 py-6 font-black text-[13px] text-[var(--accent)]">
                    #{order.id.slice(-6).toUpperCase()}
                  </td>
                  <td className="px-8 py-6">
                    <div className="font-bold text-[14px] text-gray-800">{order.customer}</div>
                  </td>
                  <td className="px-8 py-6 text-[13px] text-gray-500">
                    {new Date(order.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' })}
                  </td>
                  <td className="px-8 py-6">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="px-8 py-6 text-right font-brand font-bold text-[16px]">
                    ₺{order.revenue?.toLocaleString('tr-TR')}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 text-gray-400 hover:text-black hover:bg-white border border-transparent hover:border-gray-200 rounded-xl transition-all shadow-sm">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
