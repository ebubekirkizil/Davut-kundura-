"use client";

import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { ArrowUpRight, ArrowDownRight, Wallet, TrendingUp, Building2, Receipt, Search, Download, Plus, X, Pencil, Sparkles, CreditCard, PieChart } from "lucide-react";

// Mock Data for Graph Timeframes
const data7G = [
  { name: "Pzt", gelir: 1200, gider: 800, net: 400 },
  { name: "Sal", gelir: 2100, gider: 500, net: 1600 },
  { name: "Çar", gelir: 800, gider: 1200, net: -400 },
  { name: "Per", gelir: 1600, gider: 400, net: 1200 },
  { name: "Cum", gelir: 3400, gider: 1000, net: 2400 },
  { name: "Cmt", gelir: 5200, gider: 200, net: 5000 },
  { name: "Paz", gelir: 4500, gider: 0, net: 4500 },
];

const data30G = [
  { name: "1.-5. Gün", gelir: 12000, gider: 4500, net: 7500 },
  { name: "6.-10. Gün", gelir: 8000, gider: 8000, net: 0 },
  { name: "11.-15. Gün", gelir: 15000, gider: 3000, net: 12000 },
  { name: "16.-20. Gün", gelir: 11000, gider: 5500, net: 5500 },
  { name: "21.-25. Gün", gelir: 22000, gider: 4000, net: 18000 },
  { name: "26.-30. Gün", gelir: 18000, gider: 2000, net: 16000 },
];

// Initial Transactions
const initialTransactions = [
  { id: "TRX-001", type: "IN", desc: "Sipariş (#ORD-8092) - Ahmet Y.", detail: "Türkiye İş Bankası POS üzerinden online çekim yapıldı. Teslimat için Hepsijet'e bildirildi.", amount: 349.90, date: "24 Ekm", time: "14:30", status: "Tamamlandı" },
  { id: "TRX-002", type: "IN", desc: "Sipariş (#ORD-8093) - Mehmet D.", detail: "Kapıda ödeme ile gerçekleştirildi. Tahsilatı kurye yapacak.", amount: 599.00, date: "24 Ekm", time: "16:15", status: "Beklemede" },
  { id: "TRX-003", type: "OUT", desc: "Aylık Sunucu/Domain Gideri (Vercel)", detail: "Kurumsal kredi kartından otomatik çekim yapıldı.", amount: 450.00, date: "23 Ekm", time: "09:00", status: "Ödendi" },
  { id: "TRX-004", type: "OUT", desc: "Toptan Tabanlık Üretim Ödemesi", detail: "Ahmet Usta'ya QNB Finansbank üzerinden EFT geçildi.", amount: 8500.00, date: "21 Ekm", time: "10:20", status: "Tamamlandı" },
];

export default function RechartsFinanceDashboard() {
  const [timeRange, setTimeRange] = useState("30G");
  const [showGelir, setShowGelir] = useState(true);
  const [showGider, setShowGider] = useState(true);
  const [showNet, setShowNet] = useState(false);

  // Transaction States
  const [transactions, setTransactions] = useState(initialTransactions);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedTx, setSelectedTx] = useState<any>(null);

  // Tax States
  const [isTaxModalOpen, setIsTaxModalOpen] = useState(false);
  const [kdvRate, setKdvRate] = useState(20);
  const [incomeTaxRate, setIncomeTaxRate] = useState(25);

  const currentChartData = timeRange === "7G" ? data7G : data30G;

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const type = formData.get("type") as string;
    
    const newTx = {
      id: `TRX-${Math.floor(Math.random() * 1000)}`,
      type: type,
      desc: formData.get("desc") as string,
      detail: formData.get("detail") as string,
      amount: Number(formData.get("amount")),
      date: "Şimdi",
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      status: "Onaylandı"
    };

    setTransactions([newTx, ...transactions]);
    setIsAddModalOpen(false);
  };

  return (
    <div className="max-w-[1400px] mx-auto space-y-8 pb-12 animate-in fade-in duration-1000">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-brand font-bold tracking-tight text-[var(--text-primary)]">Mali Yönetim Merkezi</h1>
            <span className="px-2 py-0.5 bg-[var(--accent)]/10 text-[var(--accent)] text-[10px] font-black rounded-full uppercase tracking-tighter">Premium Access</span>
          </div>
          <p className="text-[14px] text-[var(--text-secondary)] font-light">Davut Kundura kurumsal nakit akışını ve mali performansını takip edin.</p>
        </div>
        <div className="flex items-center gap-3">
           <button 
            onClick={() => setIsAddModalOpen(true)} 
            className="px-6 py-3 bg-[var(--text-primary)] text-white rounded-xl text-[13px] font-bold shadow-lg hover:bg-[var(--accent)] transition-all flex items-center gap-2 group"
           >
             <Plus size={18} className="group-hover:rotate-90 transition-transform" /> 
             Yeni İşlem Kaydı
           </button>
           <button className="px-6 py-3 bg-white border border-[var(--border)] text-[var(--text-primary)] rounded-xl text-[13px] font-bold shadow-sm hover:bg-[var(--bg-secondary)] transition-all flex items-center gap-2">
             <Download size={18} /> 
             Raporu İndir
           </button>
        </div>
      </div>

      {/* KPI Stats - Premium Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[ 
          { title: "Toplam Brüt Gelir", value: "₺124,500.00", metric: "+%12", isUp: true, icon: TrendingUp, color: "var(--accent)" },
          { title: "Net Operasyon Kârı", value: "₺68,200.00", metric: "+%8", isUp: true, icon: Wallet, color: "#22c55e" },
          { title: "Ortalama Kâr Marjı", value: "%54.7", metric: "-%0.5", isUp: false, icon: PieChart, color: "#3b82f6" },
          { title: "Tahmini Vergi Yükü", value: "₺28,400.00", metric: "-%2", isUp: true, icon: Receipt, color: "#ef4444" }
        ].map((card, idx) => (
          <div key={idx} className="bg-white border border-[var(--border)] rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--accent)]/5 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-[var(--accent)]/10 transition-colors" />
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="p-2.5 rounded-xl bg-[var(--bg-secondary)] group-hover:bg-[var(--accent)]/10 transition-colors">
                <card.icon size={20} className="text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors" />
              </div>
              <div className={`text-[11px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 ${card.isUp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {card.isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {card.metric}
              </div>
            </div>
            <div className="space-y-1 relative z-10">
              <span className="text-[12px] font-bold text-[var(--text-secondary)] uppercase tracking-wider">{card.title}</span>
              <div className="text-[26px] font-bold text-[var(--text-primary)] font-brand">{card.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* RECHARTS - Main Graph Area */}
        <div className="lg:col-span-2 bg-white border border-[var(--border)] rounded-3xl shadow-sm flex flex-col overflow-hidden">
          <div className="p-6 border-b border-[var(--border)] flex justify-between items-center flex-wrap gap-4">
            <div className="space-y-1">
              <h2 className="font-brand font-bold text-[18px] text-[var(--text-primary)]">Gelir & Gider Analitiği</h2>
              <div className="flex gap-6 pt-2">
                 <label className="flex items-center gap-2 cursor-pointer text-[12px] font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                    <input type="checkbox" checked={showGelir} onChange={(e)=> setShowGelir(e.target.checked)} className="accent-[var(--accent)]" /> Gelir
                 </label>
                 <label className="flex items-center gap-2 cursor-pointer text-[12px] font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                    <input type="checkbox" checked={showGider} onChange={(e)=> setShowGider(e.target.checked)} className="accent-red-500" /> Gider
                 </label>
                 <label className="flex items-center gap-2 cursor-pointer text-[12px] font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                    <input type="checkbox" checked={showNet} onChange={(e)=> setShowNet(e.target.checked)} className="accent-[var(--text-primary)]" /> Net Akış
                 </label>
              </div>
            </div>
            <div className="flex bg-[var(--bg-secondary)] p-1 rounded-xl border border-[var(--border)] shadow-inner">
              {["7G", "30G", "3A", "1Y"].map(t => (
                <button 
                  key={t}
                  onClick={() => setTimeRange(t)}
                  className={`px-4 py-1.5 text-[11px] font-black rounded-lg transition-all ${timeRange === t ? 'bg-white shadow-md text-[var(--text-primary)] scale-105' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="p-8 flex-1 min-h-[400px] w-full">
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={currentChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorGelir" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--accent)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorGider" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--text-secondary)', fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--text-secondary)', fontWeight: 600 }} dx={-10} tickFormatter={(value) => `₺${value/1000}k`} />
                <Tooltip 
                   contentStyle={{ borderRadius: '16px', border: 'none', backgroundColor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', fontSize: '12px', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }}
                   formatter={(value: any) => [`₺${value.toLocaleString()}`, '']}
                />
                {showGelir && <Area type="monotone" dataKey="gelir" name="Gelir" stroke="var(--accent)" strokeWidth={3} fillOpacity={1} fill="url(#colorGelir)" />}
                {showGider && <Area type="monotone" dataKey="gider" name="Gider" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorGider)" />}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pro Tax Breakdown Column */}
        <div className="bg-white border border-[var(--border)] rounded-3xl shadow-sm flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent)]/5 rounded-full blur-3xl -mr-16 -mt-16" />
          
          <div className="p-6 border-b border-[var(--border)] flex justify-between items-center relative z-10">
            <div className="space-y-1">
               <h2 className="font-brand font-bold text-[18px] text-[var(--text-primary)]">Vergi Projeksiyonu</h2>
               <p className="text-[12px] text-[var(--text-secondary)] font-light">Yasal yükümlülükler ve net sermaye.</p>
            </div>
            <button onClick={()=> setIsTaxModalOpen(true)} className="w-10 h-10 flex items-center justify-center hover:bg-[var(--bg-secondary)] rounded-xl text-[var(--text-secondary)] transition-all border border-transparent hover:border-[var(--border)] shadow-sm"><Pencil size={16} /></button>
          </div>
          
          <div className="p-8 flex-1 space-y-8 relative z-10">
            <div className="space-y-3">
              <div className="flex justify-between items-center text-[13px]">
                <span className="font-bold text-[var(--text-primary)]">KDV Tahakkuku (%{kdvRate})</span>
                <span className="font-black text-red-500">₺{(124500 * (kdvRate / 100)).toLocaleString()}</span>
              </div>
              <div className="w-full bg-[var(--bg-secondary)] rounded-full h-2.5 overflow-hidden shadow-inner">
                <div className="bg-[var(--accent)] h-full rounded-full transition-all duration-1000" style={{ width: '45%' }}></div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center text-[13px]">
                <span className="font-bold text-[var(--text-primary)]">Kurumlar Vergisi (%{incomeTaxRate})</span>
                <span className="font-black text-red-500">₺{(68200 * (incomeTaxRate / 100)).toLocaleString()}</span>
              </div>
              <div className="w-full bg-[var(--bg-secondary)] rounded-full h-2.5 overflow-hidden shadow-inner">
                <div className="bg-red-500 h-full rounded-full transition-all duration-1000" style={{ width: '60%' }}></div>
              </div>
            </div>
            
             <div className="space-y-3">
              <div className="flex justify-between items-center text-[13px]">
                <span className="font-bold text-[var(--text-primary)]">Damga & Diğer</span>
                <span className="font-black text-[var(--text-secondary)]">₺450.00</span>
              </div>
              <div className="w-full bg-[var(--bg-secondary)] rounded-full h-2.5 overflow-hidden shadow-inner">
                <div className="bg-gray-400 h-full rounded-full transition-all duration-1000" style={{ width: '5%' }}></div>
              </div>
            </div>

            <div className="bg-[var(--bg-secondary)] rounded-2xl p-6 mt-10 border border-white shadow-inner space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-[14px] font-bold text-[var(--text-primary)]">NET HARCANABİLİR</span>
                </div>
                <span className="text-[20px] font-black text-green-600 font-brand">₺{ (68200 - (124500 * (kdvRate / 100)) - (68200 * (incomeTaxRate/100)) - 450).toLocaleString() }</span>
              </div>
              <p className="text-[11px] text-[var(--text-secondary)] font-medium leading-relaxed italic">"Tüm yasal yükümlülükler sonrası Davut Kundura kasasında kalan gerçek sermaye."</p>
            </div>
          </div>
        </div>

      </div>

      {/* Transaction Records - Premium Table */}
      <div className="bg-white border border-[var(--border)] rounded-3xl shadow-sm overflow-hidden">
        <div className="p-8 border-b border-[var(--border)] flex justify-between items-center flex-wrap gap-6 bg-[var(--bg-secondary)]/30">
            <div className="space-y-1">
                <h2 className="font-brand font-bold text-[18px] text-[var(--text-primary)]">Nakit Akış Kayıtları</h2>
                <p className="text-[12px] text-[var(--text-secondary)] font-medium">Detaylı inceleme için işlem satırına çift tıklayın.</p>
            </div>
            <div className="relative group w-full sm:w-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-secondary)] group-focus-within:text-[var(--accent)] transition-colors" />
              <input type="text" placeholder="İşlem arayın..." className="w-full sm:w-80 pl-11 pr-4 py-3 bg-white border border-[var(--border)] rounded-xl text-[13px] focus:ring-4 focus:ring-[var(--accent)]/5 focus:border-[var(--accent)] outline-none transition-all" />
            </div>
        </div>
        
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
                <thead className="bg-[var(--bg-secondary)]/50 text-[11px] text-[var(--text-secondary)] uppercase font-black tracking-[0.1em]">
                <tr>
                    <th className="py-5 px-8 border-b border-[var(--border)]">Referans No</th>
                    <th className="py-5 px-8 border-b border-[var(--border)]">Açıklama</th>
                    <th className="py-5 px-8 border-b border-[var(--border)]">Tarih / Saat</th>
                    <th className="py-5 px-8 border-b border-[var(--border)] text-right">Tutar</th>
                    <th className="py-5 px-8 border-b border-[var(--border)] text-center">Durum</th>
                </tr>
                </thead>
                <tbody className="text-[14px] text-[var(--text-primary)]">
                {transactions.map((trx) => (
                    <tr 
                      key={trx.id} 
                      onDoubleClick={() => setSelectedTx(trx)}
                      className="group border-b border-[var(--border)] hover:bg-[var(--bg-secondary)]/50 cursor-pointer transition-all duration-300"
                    >
                    <td className="py-5 px-8 font-black text-[12px] text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]">{trx.id}</td>
                    <td className="py-5 px-8 font-bold">{trx.desc}</td>
                    <td className="py-5 px-8 text-[var(--text-secondary)] font-medium">{trx.date}, {trx.time}</td>
                    <td className={`py-5 px-8 font-black text-right text-[16px] ${trx.type === 'IN' ? 'text-green-600' : 'text-red-500'}`}>
                        {trx.type === 'IN' ? '+' : '-'} ₺{trx.amount.toLocaleString()}
                    </td>
                    <td className="py-5 px-8 text-center">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${trx.status === 'Onaylandı' || trx.status === 'Tamamlandı' ? 'bg-green-100 text-green-700 shadow-[0_2px_10px_rgba(34,197,94,0.1)]' : 'bg-gray-100 text-gray-600'}`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${trx.status === 'Onaylandı' || trx.status === 'Tamamlandı' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                          {trx.status}
                        </span>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
      </div>

      {/* --- MODALS - Optimized for Premium Look --- */}

      {/* Add Transaction Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-[var(--text-primary)]/40 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="px-10 py-8 border-b border-[var(--border)] flex justify-between items-center bg-[var(--bg-secondary)]/50">
              <div className="space-y-1">
                <h3 className="font-brand font-bold text-[22px] text-[var(--text-primary)]">İşlem Kayıt Formu</h3>
                <p className="text-[12px] text-[var(--text-secondary)]">Sistem kayıtlarına yeni bir mali hareket ekleyin.</p>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-full text-[var(--text-secondary)] transition-all border border-transparent hover:border-[var(--border)] shadow-sm"><X size={20} /></button>
            </div>
            <form onSubmit={handleAddTransaction} className="p-10 space-y-6">
              <div>
                <label className="block text-[13px] font-black text-[var(--text-primary)] uppercase tracking-wider mb-3">İşlem Karakteri</label>
                <div className="grid grid-cols-2 gap-4">
                   <label className="flex items-center gap-3 cursor-pointer bg-[var(--bg-secondary)] px-6 py-4 rounded-2xl border-2 border-transparent has-[:checked]:border-[var(--accent)] has-[:checked]:bg-white transition-all group">
                     <input type="radio" name="type" value="IN" defaultChecked className="accent-[var(--accent)] w-5 h-5 cursor-pointer" /> 
                     <span className="text-[14px] font-bold group-hover:text-[var(--accent)]">Gelir</span>
                   </label>
                   <label className="flex items-center gap-3 cursor-pointer bg-[var(--bg-secondary)] px-6 py-4 rounded-2xl border-2 border-transparent has-[:checked]:border-red-500 has-[:checked]:bg-white transition-all group">
                     <input type="radio" name="type" value="OUT" className="accent-red-500 w-5 h-5 cursor-pointer" /> 
                     <span className="text-[14px] font-bold group-hover:text-red-500">Gider</span>
                   </label>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-[12px] font-bold text-[var(--text-secondary)]">İşlem Tutarı (₺)</label>
                  <input required type="number" step="0.01" name="amount" placeholder="0.00" className="w-full text-[16px] font-bold px-4 py-3 bg-[var(--bg-secondary)] rounded-xl border border-transparent focus:bg-white focus:border-[var(--accent)] outline-none transition-all shadow-inner" />
                </div>
                <div className="space-y-2">
                  <label className="block text-[12px] font-bold text-[var(--text-secondary)]">Başlık / Özet</label>
                  <input required type="text" name="desc" placeholder="İşlem adı" className="w-full text-[15px] font-bold px-4 py-3 bg-[var(--bg-secondary)] rounded-xl border border-transparent focus:bg-white focus:border-[var(--accent)] outline-none transition-all shadow-inner" />
                </div>
              </div>

               <div className="space-y-2">
                <label className="block text-[12px] font-bold text-[var(--text-secondary)]">Detaylı Açıklama</label>
                <textarea name="detail" rows={3} placeholder="İşlem kaynağı, notlar veya referanslar..." className="w-full text-[15px] px-4 py-3 bg-[var(--bg-secondary)] rounded-xl border border-transparent focus:bg-white focus:border-[var(--accent)] outline-none transition-all shadow-inner"></textarea>
              </div>

              <div className="pt-6 flex gap-4">
                 <button type="button" onClick={() => setIsAddModalOpen(false)} className="flex-1 py-4 bg-white border border-[var(--border)] rounded-2xl text-[14px] font-bold text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-all">İptal</button>
                 <button type="submit" className="flex-1 py-4 bg-[var(--text-primary)] rounded-2xl text-[14px] font-bold text-white hover:bg-[var(--accent)] shadow-xl transition-all">İşlemi Onayla</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Transaction Details Modal (Double Click) */}
      {selectedTx && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-[var(--text-primary)]/40 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-white/20">
            <div className="px-12 py-10 border-b border-[var(--border)] bg-[var(--bg-secondary)]/50 flex justify-between items-start">
               <div className="space-y-2">
                  <span className="text-[10px] font-black tracking-[0.5em] text-[var(--accent)] uppercase">İŞLEM DETAY DOSYASI</span>
                  <h3 className="font-brand font-bold text-[28px] text-[var(--text-primary)]">{selectedTx.desc}</h3>
                  <div className="flex items-center gap-4 text-[13px] text-[var(--text-secondary)] font-bold">
                    <span className="px-2 py-0.5 bg-white border border-[var(--border)] rounded-md font-black">{selectedTx.id}</span>
                    <span>•</span>
                    <span>{selectedTx.date} / {selectedTx.time}</span>
                  </div>
               </div>
               <button onClick={() => setSelectedTx(null)} className="w-12 h-12 flex items-center justify-center hover:bg-white rounded-full text-[var(--text-secondary)] transition-all border border-transparent hover:border-[var(--border)] shadow-sm"><X size={24} /></button>
            </div>
            <div className="p-12 space-y-10">
              
              <div className="grid grid-cols-2 gap-8">
                 <div className="p-8 rounded-3xl bg-[var(--bg-secondary)] shadow-inner space-y-2">
                    <span className="block text-[11px] font-black text-[var(--text-secondary)] uppercase tracking-widest">NET AKIŞ</span>
                    <span className={`text-[32px] font-brand font-bold ${selectedTx.type === 'IN' ? 'text-green-600' : 'text-red-500'}`}>
                       {selectedTx.type === 'IN' ? '+' : '-'} ₺{selectedTx.amount.toLocaleString()}
                    </span>
                 </div>
                 <div className="p-8 rounded-3xl bg-[var(--bg-secondary)] shadow-inner space-y-2">
                    <span className="block text-[11px] font-black text-[var(--text-secondary)] uppercase tracking-widest">DURUM</span>
                    <div className="flex items-center gap-3 pt-2">
                      <div className={`w-3 h-3 rounded-full animate-pulse ${selectedTx.status === 'Onaylandı' || selectedTx.status === 'Tamamlandı' ? 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)]' : 'bg-orange-500'}`}></div>
                      <span className="text-[18px] font-bold text-[var(--text-primary)]">{selectedTx.status}</span>
                    </div>
                 </div>
              </div>

               <div className="space-y-4">
                 <span className="block text-[11px] font-black text-[var(--text-secondary)] uppercase tracking-[0.3em]">RESMİ KAYIT DETAYI</span>
                 <p className="text-[16px] text-[var(--text-primary)] font-medium bg-[var(--bg-secondary)]/30 border border-[var(--border)] p-8 rounded-3xl leading-relaxed italic">
                    "{selectedTx.detail || "Bu işlem için ekstra açıklama belirtilmemiş."}"
                 </p>
              </div>
              
              <div className="flex items-center justify-between pt-4">
                 <div className="flex -space-x-4">
                    {[1,2,3].map(i => <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-[var(--bg-secondary)] flex items-center justify-center font-bold text-[10px] text-[var(--text-secondary)] shadow-sm">USR</div>)}
                 </div>
                 <div className="text-right">
                    <p className="text-[11px] font-black text-[var(--text-secondary)] uppercase mb-1">DİJİTAL İMZA</p>
                    <p className="text-[13px] font-bold text-[var(--text-primary)]">SİSTEM ONAYLI EVRAK</p>
                 </div>
              </div>
            </div>
            <div className="px-12 py-8 bg-[var(--bg-secondary)] border-t border-[var(--border)] flex justify-end gap-4">
               <button className="px-8 py-3 bg-white border border-[var(--border)] rounded-xl text-[13px] font-bold text-[var(--text-primary)] hover:bg-white shadow-sm flex items-center gap-2 transition-all">
                  <Search size={16} /> Logları Gör
               </button>
               <button onClick={() => setSelectedTx(null)} className="px-10 py-3 bg-[var(--text-primary)] text-white rounded-xl text-[13px] font-bold hover:bg-[var(--accent)] shadow-xl transition-all">Anladım</button>
            </div>
          </div>
        </div>
      )}

      {/* Tax Configuration Modal */}
      {isTaxModalOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-[var(--text-primary)]/40 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="px-8 py-6 border-b border-[var(--border)] bg-[var(--bg-secondary)]/50 flex justify-between items-center">
              <h3 className="font-brand font-bold text-[18px] text-[var(--text-primary)]">Vergi Parametreleri</h3>
              <button onClick={() => setIsTaxModalOpen(false)} className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-full text-[var(--text-secondary)] transition-all border border-transparent hover:border-[var(--border)] shadow-sm"><X size={16} /></button>
            </div>
            <div className="p-8 space-y-6">
               <div className="space-y-2">
                  <label className="block text-[12px] font-bold text-[var(--text-secondary)]">KDV Oranı (%)</label>
                  <input type="number" max="100" min="0" value={kdvRate} onChange={(e) => setKdvRate(Number(e.target.value))} className="w-full text-[16px] font-bold px-4 py-3 bg-[var(--bg-secondary)] rounded-xl border border-transparent focus:bg-white focus:border-[var(--accent)] outline-none transition-all shadow-inner" />
               </div>
               <div className="space-y-2">
                  <label className="block text-[12px] font-bold text-[var(--text-secondary)]">Gelir / Kurumlar Vergisi (%)</label>
                  <input type="number" max="100" min="0" value={incomeTaxRate} onChange={(e) => setIncomeTaxRate(Number(e.target.value))} className="w-full text-[16px] font-bold px-4 py-3 bg-[var(--bg-secondary)] rounded-xl border border-transparent focus:bg-white focus:border-[var(--accent)] outline-none transition-all shadow-inner" />
               </div>
               <div className="p-4 bg-[var(--bg-secondary)] rounded-xl text-[11px] text-[var(--text-secondary)] font-medium flex gap-3">
                  <Sparkles size={16} className="text-[var(--accent)] shrink-0" />
                  Bu oranlar paneldeki tüm tahmini hesaplamaları anlık olarak güncelleyecektir.
               </div>
               <button onClick={() => setIsTaxModalOpen(false)} className="w-full py-4 bg-[var(--text-primary)] rounded-2xl text-[13px] font-bold text-white hover:bg-[var(--accent)] shadow-xl transition-all">Oranları Güncelle</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
