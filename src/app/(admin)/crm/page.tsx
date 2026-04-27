"use client";

import { Search, UserCheck, Phone, Mail, MoreVertical, X, Calendar, ShoppingBag, CreditCard, Clock, Tag } from "lucide-react";
import { useState } from "react";

type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  loyalty: string;
  orders: number;
  totalSpent: number;
  notes: string;
  joinDate: string;
  lastOrder: string;
  interests: string[];
};

export default function CRMPage() {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const customers: Customer[] = [
    {
      id: "C-9021",
      name: "Ahmet Yılmaz",
      email: "ahmet.ylmz@example.com",
      phone: "+90 532 987 65 43",
      loyalty: "GOLD",
      orders: 14,
      totalSpent: 4500,
      notes: "Sol ayak taraklı. Klasik ayakkabı siparişlerinde 42.5 numara tercih ediyor.",
      joinDate: "12 Mart 2024",
      lastOrder: "2 gün önce",
      interests: ["Ortopedik Taban", "Deri Kemer", "Süet Ayakkabı Bakımı"]
    },
    {
      id: "C-9022",
      name: "Mehmet Demir",
      email: "mdemir88@example.com",
      phone: "+90 544 123 45 67",
      loyalty: "SILVER",
      orders: 3,
      totalSpent: 1250,
      notes: "Topuk dikeni rahatsızlığı var. Ortopedik taban 'Tip 4' siparişi veriyor.",
      joinDate: "05 Ocak 2025",
      lastOrder: "3 hafta önce",
      interests: ["Topuk Dikeni Yastıkları", "Medikal Tabanlar"]
    },
    {
      id: "C-9023",
      name: "Ayşe Kaya",
      email: "ayKaya_90@example.com",
      phone: "+90 555 888 99 00",
      loyalty: "NEW",
      orders: 1,
      totalSpent: 350,
      notes: "Hediye paketi istiyor. Fatura koliye konulmayacak.",
      joinDate: "10 Nisan 2026",
      lastOrder: "Dün",
      interests: ["Hediyelik Deri Eşyalar", "Kadın İnce Kemer"]
    }
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#1a1a1a]">CRM & Müşteri Dosyaları</h1>
          <p className="text-sm text-slate-500 mt-1">
            Müşterilerinizin hassasiyetlerini, geçmiş siparişlerini ve sadakat oranlarını detaylı yönetin. Detay için çift tıklayın.
          </p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="İsim, e-posta veya telefon ile ara..." 
            className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1a1a1a] transition-all bg-white"
          />
        </div>
      </div>

      <div className="bg-white border border-[#e3e3e3] rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase bg-[#f9fafb] text-[#5c5f62] border-b border-[#e3e3e3]">
              <tr>
                <th className="px-6 py-4 font-semibold">Müşteri Profili</th>
                <th className="px-6 py-4 font-semibold">İletişim</th>
                <th className="px-6 py-4 font-semibold">Sadakat & Sipariş</th>
                <th className="px-6 py-4 font-semibold">Müşteri Notu (Özel)</th>
                <th className="px-6 py-4 font-semibold text-right">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e3e3e3]">
              {customers.map((cust) => (
                <tr 
                  key={cust.id} 
                  onDoubleClick={() => setSelectedCustomer(cust)}
                  onClick={() => setSelectedCustomer(cust)} // also allow single click for better UX on mobile
                  className="hover:bg-[#f1f2f4]/60 transition-colors cursor-pointer"
                  title="Müşteri detayları için tıklayın"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold">
                        {cust.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-[#1a1a1a] flex items-center gap-2">
                          {cust.name} {cust.loyalty === "GOLD" && <UserCheck className="h-3.5 w-3.5 text-amber-500" />}
                        </div>
                        <div className="text-xs text-slate-500">{cust.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 space-y-1">
                    <div className="flex items-center gap-2 text-slate-600 text-xs hover:text-[#1a1a1a]">
                      <Mail className="h-3 w-3" /> {cust.email}
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 text-xs">
                      <Phone className="h-3 w-3" /> {cust.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-[#1a1a1a]">{cust.orders} Sipariş</div>
                    <div className="text-xs text-emerald-600 font-semibold mt-0.5">₺{cust.totalSpent.toLocaleString('tr-TR')} Getiri (LTV)</div>
                  </td>
                  <td className="px-6 py-4 max-w-xs">
                    <div className="bg-amber-50 border border-amber-100 p-2 rounded text-xs text-amber-800 leading-snug truncate hover:whitespace-normal transition-all duration-300">
                      "{cust.notes}"
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-[#1a1a1a] transition-colors">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer CRM Detailed Drawer */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedCustomer(null)}
          ></div>
          
          {/* Drawer Panel */}
          <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 border-l border-border">
            
            {/* Header */}
            <div className="px-6 py-6 border-b border-border flex justify-between items-start bg-slate-900 text-white">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full bg-white/10 flex items-center justify-center text-2xl font-bold text-white border border-white/20">
                  {selectedCustomer.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{selectedCustomer.name}</h2>
                  <p className="text-white/60 text-sm flex items-center gap-2 mt-1">
                    {selectedCustomer.id} • {selectedCustomer.loyalty} Üye
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedCustomer(null)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Body */}
            <div className="flex-1 overflow-y-auto bg-slate-50">
              
              {/* Financials / LTV */}
              <div className="p-6 grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-1">
                  <span className="text-slate-500 text-xs font-semibold flex items-center gap-1"><ShoppingBag className="w-3 h-3" /> TOPLAM SİPARİŞ</span>
                  <span className="text-2xl font-bold text-slate-800">{selectedCustomer.orders}</span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-1">
                  <span className="text-slate-500 text-xs font-semibold flex items-center gap-1"><CreditCard className="w-3 h-3" /> LTV (MÜŞTERİ DEĞERİ)</span>
                  <span className="text-2xl font-bold text-emerald-600">₺{selectedCustomer.totalSpent.toLocaleString('tr-TR')}</span>
                </div>
              </div>

              {/* CRM Information */}
              <div className="px-6 pb-6 space-y-6">
                
                {/* Contact Data */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden text-sm">
                  <div className="px-4 py-3 border-b border-slate-100 bg-slate-50 font-semibold text-slate-800">
                    İletişim & Tarihçe
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 flex items-center gap-2"><Mail className="w-4 h-4"/> E-Posta</span>
                      <span className="font-medium">{selectedCustomer.email}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 flex items-center gap-2"><Phone className="w-4 h-4"/> Telefon</span>
                      <span className="font-medium">{selectedCustomer.phone}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 flex items-center gap-2"><Calendar className="w-4 h-4"/> Kayıt Tarihi</span>
                      <span className="font-medium">{selectedCustomer.joinDate}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 flex items-center gap-2"><Clock className="w-4 h-4"/> Son Sipariş</span>
                      <span className="font-medium">{selectedCustomer.lastOrder}</span>
                    </div>
                  </div>
                </div>

                {/* Important Notes */}
                <div className="bg-amber-50 rounded-xl border border-amber-200 overflow-hidden text-sm">
                  <div className="px-4 py-3 border-b border-amber-100 bg-amber-100/50 font-semibold text-amber-800">
                    Sipariş / Operasyon Notu
                  </div>
                  <div className="p-4 text-amber-900 leading-relaxed font-medium">
                    {selectedCustomer.notes}
                  </div>
                </div>

                {/* Interests */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden text-sm">
                  <div className="px-4 py-3 border-b border-slate-100 bg-slate-50 font-semibold text-slate-800">
                    İlgi Alanları & Tercihler
                  </div>
                  <div className="p-4 flex flex-wrap gap-2">
                    {selectedCustomer.interests.map((interest, idx) => (
                      <span key={idx} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium border border-slate-200">
                        <Tag className="w-3 h-3" /> 
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
