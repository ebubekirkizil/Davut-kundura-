"use client";

import { Search, UserCheck, Phone, Mail, MoreVertical, X, Calendar, ShoppingBag, CreditCard, Clock, Tag, Sparkles, UserPlus, Heart, MessageSquare } from "lucide-react";
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
    <div className="max-w-[1400px] mx-auto space-y-8 pb-12 animate-in fade-in duration-1000">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-brand font-bold tracking-tight text-[var(--text-primary)]">Müşteri İlişkileri Portföyü</h1>
            <div className="flex items-center gap-2 px-3 py-1 bg-[var(--accent)]/10 text-[var(--accent)] rounded-full border border-[var(--accent)]/20">
              <Sparkles size={12} />
              <span className="text-[10px] font-black uppercase tracking-widest">Premium CRM</span>
            </div>
          </div>
          <p className="text-[14px] text-[var(--text-secondary)] font-light italic">"Sadık müşterileriniz, markanızın en değerli hazinesidir."</p>
        </div>
        
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-72 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-secondary)] group-focus-within:text-[var(--accent)] transition-colors" />
            <input 
              type="text" 
              placeholder="Profil ara..." 
              className="w-full pl-11 pr-4 py-3.5 bg-white border border-[var(--border)] rounded-2xl text-[13px] font-bold focus:ring-4 focus:ring-[var(--accent)]/5 focus:border-[var(--accent)] outline-none transition-all shadow-sm"
            />
          </div>
          <button className="px-6 py-3.5 bg-[var(--text-primary)] text-white rounded-2xl text-[13px] font-bold hover:bg-[var(--accent)] shadow-xl transition-all flex items-center gap-2 group whitespace-nowrap">
            <UserPlus size={18} className="group-hover:scale-110 transition-transform" /> Yeni Profil
          </button>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white border border-[var(--border)] rounded-[2.5rem] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-[var(--bg-secondary)]/20 text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em]">
                <th className="px-8 py-6">Müşteri Portföyü</th>
                <th className="px-8 py-6">İletişim Detayları</th>
                <th className="px-8 py-6">Etkileşim & LTV</th>
                <th className="px-8 py-6">Zanaat Notları</th>
                <th className="px-8 py-6 text-right">Aksiyon</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {customers.map((cust) => (
                <tr 
                  key={cust.id} 
                  onDoubleClick={() => setSelectedCustomer(cust)}
                  onClick={() => setSelectedCustomer(cust)}
                  className="hover:bg-[var(--bg-secondary)]/50 transition-all duration-300 cursor-pointer group"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[var(--text-primary)] to-[#333] flex items-center justify-center text-white font-black text-[18px] font-brand shadow-lg group-hover:scale-105 group-hover:rotate-3 transition-all">
                        {cust.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-[15px] text-[var(--text-primary)] tracking-tight flex items-center gap-2">
                          {cust.name} 
                          {cust.loyalty === "GOLD" && (
                            <div className="p-1 bg-[var(--accent)]/10 rounded-full border border-[var(--accent)]/20 animate-pulse">
                              <UserCheck size={12} className="text-[var(--accent)]" />
                            </div>
                          )}
                        </div>
                        <div className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-tighter opacity-50">{cust.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 space-y-2">
                    <div className="flex items-center gap-2 text-[var(--text-secondary)] text-[12px] font-bold group-hover:text-[var(--text-primary)] transition-colors">
                      <Mail size={12} className="opacity-40" /> {cust.email}
                    </div>
                    <div className="flex items-center gap-2 text-[var(--text-secondary)] text-[12px] font-bold">
                      <Phone size={12} className="opacity-40" /> {cust.phone}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="font-black text-[14px] text-[var(--text-primary)]">{cust.orders} İşlem</div>
                    <div className="text-[12px] text-green-600 font-black uppercase tracking-tighter mt-1">₺{cust.totalSpent.toLocaleString('tr-TR')} GETİRİ</div>
                  </td>
                  <td className="px-8 py-6 max-w-xs">
                    <div className="bg-[var(--accent)]/5 border border-[var(--accent)]/10 p-4 rounded-2xl text-[12px] text-[var(--text-primary)] italic leading-relaxed shadow-inner opacity-80 group-hover:opacity-100 transition-opacity">
                      "{cust.notes}"
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-3 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] hover:bg-white rounded-xl transition-all border border-transparent hover:border-[var(--border)] shadow-sm">
                      <MoreVertical size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer CRM Detailed Drawer - Premium Look */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-[1000] flex justify-end">
          <div 
            className="absolute inset-0 bg-[var(--text-primary)]/40 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
            onClick={() => setSelectedCustomer(null)}
          ></div>
          
          <div className="relative w-full max-w-xl bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-500 border-l border-white/20">
            
            {/* Header */}
            <div className="px-10 py-10 border-b border-[var(--border)] flex justify-between items-start bg-[var(--text-primary)] text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent)]/10 rounded-full blur-[100px] -mr-32 -mt-32" />
              <div className="flex items-center gap-6 relative z-10">
                <div className="h-20 w-20 rounded-3xl bg-white/10 flex items-center justify-center text-4xl font-black text-white border border-white/20 shadow-2xl backdrop-blur-md">
                  {selectedCustomer.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-3xl font-brand font-bold tracking-tight">{selectedCustomer.name}</h2>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="px-3 py-1 bg-[var(--accent)] text-[var(--text-primary)] text-[10px] font-black rounded-full uppercase tracking-widest shadow-lg">
                      {selectedCustomer.loyalty} PROFİL
                    </span>
                    <span className="text-white/40 text-[10px] font-black uppercase tracking-widest">{selectedCustomer.id}</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setSelectedCustomer(null)}
                className="w-12 h-12 flex items-center justify-center hover:bg-white/10 rounded-full transition-all text-white relative z-10"
              >
                <X size={24} />
              </button>
            </div>
            
            {/* Body */}
            <div className="flex-1 overflow-y-auto bg-[var(--bg-secondary)]/30 scrollbar-hide">
              
              {/* Financials / LTV */}
              <div className="p-10 grid grid-cols-2 gap-6">
                <div className="bg-white p-8 rounded-3xl border border-[var(--border)] shadow-sm flex flex-col gap-2 hover:shadow-md transition-all group">
                  <span className="text-[var(--text-secondary)] text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                    <ShoppingBag size={12} className="text-[var(--accent)]" /> İŞLEM HACMİ
                  </span>
                  <span className="text-3xl font-black text-[var(--text-primary)] font-brand group-hover:scale-105 transition-transform origin-left">{selectedCustomer.orders}</span>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-[var(--border)] shadow-sm flex flex-col gap-2 hover:shadow-md transition-all group">
                  <span className="text-[var(--text-secondary)] text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                    <CreditCard size={12} className="text-green-600" /> TOPLAM GETİRİ
                  </span>
                  <span className="text-3xl font-black text-green-600 font-brand group-hover:scale-105 transition-transform origin-left">₺{selectedCustomer.totalSpent.toLocaleString('tr-TR')}</span>
                </div>
              </div>

              {/* CRM Information */}
              <div className="px-10 pb-10 space-y-8">
                
                {/* Contact Data */}
                <div className="bg-white rounded-[2rem] border border-[var(--border)] overflow-hidden text-sm shadow-sm">
                  <div className="px-6 py-4 border-b border-[var(--border)] bg-[var(--bg-secondary)]/30 font-black text-[10px] uppercase tracking-widest text-[var(--text-primary)]">
                    İLETİŞİM PORTALİ
                  </div>
                  <div className="p-8 space-y-4 font-bold text-[13px] text-[var(--text-primary)]">
                    <div className="flex justify-between items-center group">
                      <span className="text-[var(--text-secondary)] flex items-center gap-3"><Mail size={16} className="opacity-40" /> E-Posta Adresi</span>
                      <span className="group-hover:text-[var(--accent)] transition-colors">{selectedCustomer.email}</span>
                    </div>
                    <div className="flex justify-between items-center group">
                      <span className="text-[var(--text-secondary)] flex items-center gap-3"><Phone size={16} className="opacity-40" /> Telefon Hattı</span>
                      <span className="group-hover:text-[var(--accent)] transition-colors">{selectedCustomer.phone}</span>
                    </div>
                    <div className="flex justify-between items-center group">
                      <span className="text-[var(--text-secondary)] flex items-center gap-3"><Calendar size={16} className="opacity-40" /> Katılım Tarihi</span>
                      <span>{selectedCustomer.joinDate}</span>
                    </div>
                    <div className="flex justify-between items-center group">
                      <span className="text-[var(--text-secondary)] flex items-center gap-3"><Clock size={16} className="opacity-40" /> Son Etkileşim</span>
                      <span className="text-[var(--accent)]">{selectedCustomer.lastOrder}</span>
                    </div>
                  </div>
                </div>

                {/* Important Notes */}
                <div className="bg-[var(--accent)]/5 rounded-[2rem] border border-[var(--accent)]/10 overflow-hidden text-sm shadow-inner relative group">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <MessageSquare size={48} className="text-[var(--accent)]" />
                  </div>
                  <div className="px-6 py-4 border-b border-[var(--accent)]/10 bg-[var(--accent)]/10 font-black text-[10px] uppercase tracking-widest text-[var(--accent)]">
                    ZANAAT & ÖZEL TALEPLER
                  </div>
                  <div className="p-8 text-[15px] text-[var(--text-primary)] font-medium leading-relaxed italic">
                    "{selectedCustomer.notes}"
                  </div>
                </div>

                {/* Interests */}
                <div className="bg-white rounded-[2rem] border border-[var(--border)] overflow-hidden text-sm shadow-sm">
                  <div className="px-6 py-4 border-b border-[var(--border)] bg-[var(--bg-secondary)]/30 font-black text-[10px] uppercase tracking-widest text-[var(--text-primary)]">
                    İLGİ ALANLARI & SEGMENT
                  </div>
                  <div className="p-8 flex flex-wrap gap-3">
                    {selectedCustomer.interests.map((interest, idx) => (
                      <span key={idx} className="flex items-center gap-2 px-5 py-2.5 bg-[var(--bg-secondary)] text-[var(--text-primary)] rounded-2xl text-[12px] font-bold border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all cursor-default group">
                        <Heart size={14} className="opacity-40 group-hover:scale-110 group-hover:text-[var(--accent)] transition-all" /> 
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>
            
            {/* Footer Actions */}
            <div className="p-10 border-t border-[var(--border)] bg-white flex gap-4">
              <button className="flex-1 py-4 text-[13px] font-black uppercase tracking-widest text-[var(--text-primary)] border border-[var(--border)] rounded-2xl hover:bg-[var(--bg-secondary)] transition-all shadow-sm">
                Geçmişi İndir
              </button>
              <button className="flex-1 py-4 text-[13px] font-black uppercase tracking-widest text-white bg-[var(--text-primary)] rounded-2xl hover:bg-[var(--accent)] shadow-xl transition-all flex items-center justify-center gap-3">
                <Mail size={18} /> İletişime Geç
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
