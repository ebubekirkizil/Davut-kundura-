"use client";

import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ArrowUpRight, ArrowDownRight, Wallet, TrendingUp, Receipt, Search, Download, Plus, X, Pencil, Sparkles, PieChart } from "lucide-react";

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

const initialTransactions = [
  { id: "TRX-001", type: "IN", desc: "Sipariş (#ORD-8092) - Ahmet Y.", detail: "Türkiye İş Bankası POS üzerinden online çekim yapıldı.", amount: 349.90, date: "24 Ekm", time: "14:30", status: "Tamamlandı" },
  { id: "TRX-002", type: "IN", desc: "Sipariş (#ORD-8093) - Mehmet D.", detail: "Kapıda ödeme ile gerçekleştirildi.", amount: 599.00, date: "24 Ekm", time: "16:15", status: "Beklemede" },
  { id: "TRX-003", type: "OUT", desc: "Aylık Sunucu/Domain Gideri (Vercel)", detail: "Kurumsal kredi kartından otomatik çekim yapıldı.", amount: 450.00, date: "23 Ekm", time: "09:00", status: "Ödendi" },
  { id: "TRX-004", type: "OUT", desc: "Toptan Tabanlık Üretim Ödemesi", detail: "EFT geçildi.", amount: 8500.00, date: "21 Ekm", time: "10:20", status: "Tamamlandı" },
];

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState("30G");
  const [showGelir, setShowGelir] = useState(true);
  const [showGider, setShowGider] = useState(true);
  const [showNet, setShowNet] = useState(false);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedTx, setSelectedTx] = useState<any>(null);
  const [isTaxModalOpen, setIsTaxModalOpen] = useState(false);
  const [kdvRate, setKdvRate] = useState(20);
  const [incomeTaxRate, setIncomeTaxRate] = useState(25);

  const currentChartData = timeRange === "7G" ? data7G : data30G;

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newTx = {
      id: `TRX-${Math.floor(Math.random() * 1000)}`,
      type: formData.get("type") as string,
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
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-brand font-bold tracking-tight text-[var(--text-primary)]">Mali Yönetim Merkezi</h1>
            <span className="px-2 py-0.5 bg-[var(--accent)]/10 text-[var(--accent)] text-[10px] font-black rounded-full uppercase tracking-tighter">Premium Access</span>
          </div>
          <p className="text-[14px] text-[var(--text-secondary)] font-light">Davut Kundura kurumsal nakit akışını ve mali performansını takip edin.</p>
        </div>
        <div className="flex items-center gap-3">
           <button onClick={() => setIsAddModalOpen(true)} className="px-6 py-3 bg-[var(--text-primary)] text-white rounded-xl text-[13px] font-bold shadow-lg hover:bg-[var(--accent)] transition-all flex items-center gap-2 group">
             <Plus size={18} className="group-hover:rotate-90 transition-transform" /> Yeni İşlem Kaydı
           </button>
           <button className="px-6 py-3 bg-white border border-[var(--border)] text-[var(--text-primary)] rounded-xl text-[13px] font-bold shadow-sm hover:bg-[var(--bg-secondary)] transition-all flex items-center gap-2">
             <Download size={18} /> Raporu İndir
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[ 
          { title: "Toplam Brüt Gelir", value: "₺124,500.00", metric: "+%12", isUp: true, icon: TrendingUp },
          { title: "Net Operasyon Kârı", value: "₺68,200.00", metric: "+%8", isUp: true, icon: Wallet },
          { title: "Ortalama Kâr Marjı", value: "%54.7", metric: "-%0.5", isUp: false, icon: PieChart },
          { title: "Tahmini Vergi Yükü", value: "₺28,400.00", metric: "-%2", isUp: true, icon: Receipt }
        ].map((card, idx) => (
          <div key={idx} className="bg-white border border-[var(--border)] rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group relative overflow-hidden">
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="p-2.5 rounded-xl bg-[var(--bg-secondary)] group-hover:bg-[var(--accent)]/10 transition-colors">
                <card.icon size={20} className="text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors" />
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
        <div className="lg:col-span-2 bg-white border border-[var(--border)] rounded-3xl shadow-sm flex flex-col overflow-hidden">
          <div className="p-6 border-b border-[var(--border)] flex justify-between items-center flex-wrap gap-4">
            <h2 className="font-brand font-bold text-[18px] text-[var(--text-primary)]">Gelir & Gider Analitiği</h2>
            <div className="flex bg-[var(--bg-secondary)] p-1 rounded-xl border border-[var(--border)] shadow-inner">
              {["7G", "30G", "3A", "1Y"].map(t => (
                <button key={t} onClick={() => setTimeRange(t)} className={`px-4 py-1.5 text-[11px] font-black rounded-lg transition-all ${timeRange === t ? 'bg-white shadow-md text-[var(--text-primary)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}>{t}</button>
              ))}
            </div>
          </div>
          <div className="p-8 flex-1 min-h-[400px]">
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={currentChartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} />
                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }} />
                {showGelir && <Area type="monotone" dataKey="gelir" stroke="var(--accent)" fillOpacity={0.1} fill="var(--accent)" />}
                {showGider && <Area type="monotone" dataKey="gider" stroke="#ef4444" fillOpacity={0.1} fill="#ef4444" />}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-[var(--border)] rounded-3xl shadow-sm flex flex-col p-8 space-y-8">
          <div className="flex justify-between items-center">
             <h2 className="font-brand font-bold text-[18px]">Vergi Projeksiyonu</h2>
             <button onClick={()=> setIsTaxModalOpen(true)} className="p-2 hover:bg-[var(--bg-secondary)] rounded-xl transition-all"><Pencil size={16} /></button>
          </div>
          <div className="space-y-6">
            <div className="flex justify-between text-sm"><span>KDV (%{kdvRate})</span><span className="font-bold text-red-500">₺{(124500 * kdvRate / 100).toLocaleString()}</span></div>
            <div className="flex justify-between text-sm"><span>Kurumlar (%{incomeTaxRate})</span><span className="font-bold text-red-500">₺{(68200 * incomeTaxRate / 100).toLocaleString()}</span></div>
            <div className="pt-6 border-t border-[var(--border)] flex justify-between items-center">
              <span className="font-bold">NET KAZANÇ</span>
              <span className="text-2xl font-black text-green-600 font-brand">₺{(68200 - (124500 * kdvRate / 100) - (68200 * incomeTaxRate / 100)).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-[var(--border)] rounded-3xl shadow-sm overflow-hidden">
        <div className="p-8 border-b border-[var(--border)] flex justify-between items-center bg-[var(--bg-secondary)]/30">
          <h2 className="font-brand font-bold text-[18px]">Nakit Akış Kayıtları</h2>
          <div className="relative"><Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-secondary)]" /><input type="text" placeholder="İşlem arayın..." className="pl-11 pr-4 py-2 bg-white border border-[var(--border)] rounded-xl text-sm outline-none" /></div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[var(--bg-secondary)]/50 text-[11px] uppercase font-black tracking-wider">
              <tr><th className="py-5 px-8">Referans</th><th className="py-5 px-8">Açıklama</th><th className="py-5 px-8">Tarih</th><th className="py-5 px-8 text-right">Tutar</th><th className="py-5 px-8 text-center">Durum</th></tr>
            </thead>
            <tbody>
              {transactions.map((trx) => (
                <tr key={trx.id} className="border-b border-[var(--border)] hover:bg-[var(--bg-secondary)]/30 cursor-pointer">
                  <td className="py-5 px-8 text-[12px] font-black">{trx.id}</td>
                  <td className="py-5 px-8 font-bold">{trx.desc}</td>
                  <td className="py-5 px-8 text-sm">{trx.date}</td>
                  <td className={`py-5 px-8 font-black text-right ${trx.type === 'IN' ? 'text-green-600' : 'text-red-500'}`}>₺{trx.amount.toLocaleString()}</td>
                  <td className="py-5 px-8 text-center"><span className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-black rounded-full">ONAYLANDI</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-black/40 backdrop-blur-md">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg p-10 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">Yeni İşlem</h3>
              <button onClick={() => setIsAddModalOpen(false)}><X /></button>
            </div>
            <form onSubmit={handleAddTransaction} className="space-y-4">
              <input name="desc" placeholder="Açıklama" className="w-full p-3 bg-gray-50 rounded-xl" required />
              <input name="amount" type="number" placeholder="Tutar" className="w-full p-3 bg-gray-50 rounded-xl" required />
              <select name="type" className="w-full p-3 bg-gray-50 rounded-xl"><option value="IN">Gelir</option><option value="OUT">Gider</option></select>
              <button type="submit" className="w-full py-4 bg-black text-white rounded-xl font-bold">Kaydet</button>
            </form>
          </div>
        </div>
      )}

      {isTaxModalOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-black/40 backdrop-blur-md">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-sm p-10 space-y-6">
            <h3 className="text-xl font-bold">Vergi Ayarları</h3>
            <div className="space-y-4">
              <label className="block text-sm">KDV (%)</label>
              <input type="number" value={kdvRate} onChange={(e)=>setKdvRate(Number(e.target.value))} className="w-full p-3 bg-gray-50 rounded-xl" />
              <label className="block text-sm">Gelir Vergisi (%)</label>
              <input type="number" value={incomeTaxRate} onChange={(e)=>setIncomeTaxRate(Number(e.target.value))} className="w-full p-3 bg-gray-50 rounded-xl" />
              <button onClick={()=>setIsTaxModalOpen(false)} className="w-full py-4 bg-black text-white rounded-xl font-bold">Güncelle</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
