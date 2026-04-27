"use client";

import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { ArrowUpRight, ArrowDownRight, Wallet, TrendingUp, Building2, Receipt, Search, Download, Plus, X, Pencil } from "lucide-react";

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
    const isGelir = type === "IN";
    
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
    <div className="max-w-[80rem] mx-auto space-y-6 pb-12 font-sans relative">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-[20px] font-bold text-[#1a1a1a]">Finans & Muhasebe Merkezi</h1>
          <p className="text-[13px] text-[#5c5f62] mt-0.5">Davut Kundura kurumsal nakit akışını, vergileri ve özel maliyetleri yönetin.</p>
        </div>
        <div className="flex gap-2">
           <button onClick={() => setIsAddModalOpen(true)} className="px-3 py-1.5 bg-[#008060] rounded-md text-[13px] font-medium text-white shadow-sm hover:bg-[#006e52] flex items-center gap-1.5 transition-colors"><Plus className="h-4 w-4" /> Manuel İşlem Ekle</button>
           <button className="px-3 py-1.5 border border-[#d2d5d8] bg-white rounded-md text-[13px] font-medium text-[#1a1a1a] shadow-sm hover:bg-[#f1f2f4] flex items-center gap-1.5"><Download className="h-4 w-4" /> Tüm Excel'i İndir</button>
        </div>
      </div>

      {/* KPI Stats (Polaris Style) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[ 
          { title: "Toplam Gelir (Brüt)", value: "₺124,500.00", metric: "+%12", isUp: true, icon: TrendingUp },
          { title: "Net Kâr (Vergiler Öncesi)", value: "₺68,200.00", metric: "+%8", isUp: true, icon: Wallet },
          { title: "Kâr Marjı Ortalaması", value: "%54.7", metric: "-%0.5", isUp: false, icon: Building2 },
          { title: "Yükümlü Olunan Vergi", value: "₺28,400.00", metric: "-%2", isUp: true, icon: Receipt }
        ].map((card, idx) => (
          <div key={idx} className="bg-white border border-[#e3e3e3] rounded-lg p-4 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
            <div className="flex justify-between items-start mb-2">
              <span className="text-[13px] font-medium text-[#5c5f62]">{card.title}</span>
              <card.icon className="h-4 w-4 text-[#8a8a8a]" />
            </div>
            <div className="text-[22px] font-bold text-[#1a1a1a] mb-1">{card.value}</div>
            <div className={`text-[12px] font-medium flex items-center gap-0.5 ${card.isUp ? 'text-[#008060]' : 'text-[#d82c0d]'}`}>
              {card.isUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
              {card.metric} geçen döneme göre
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* RECHARTS - Main Graph Area */}
        <div className="lg:col-span-2 bg-white border border-[#e3e3e3] rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.05)] flex flex-col">
          <div className="p-4 border-b border-[#e3e3e3] flex justify-between items-center flex-wrap gap-4">
            <div>
              <h2 className="font-semibold text-[14px] text-[#1a1a1a]">Dinamik Finans Grafiği</h2>
              <div className="flex gap-4 mt-2">
                 <label className="flex items-center gap-1.5 cursor-pointer text-[12px] font-medium text-[#1a1a1a]">
                    <input type="checkbox" checked={showGelir} onChange={(e)=> setShowGelir(e.target.checked)} className="accent-[#008060]" /> Gelir Çizgisi
                 </label>
                 <label className="flex items-center gap-1.5 cursor-pointer text-[12px] font-medium text-[#1a1a1a]">
                    <input type="checkbox" checked={showGider} onChange={(e)=> setShowGider(e.target.checked)} className="accent-[#d82c0d]" /> Gider Çizgisi
                 </label>
                 <label className="flex items-center gap-1.5 cursor-pointer text-[12px] font-medium text-[#1a1a1a]">
                    <input type="checkbox" checked={showNet} onChange={(e)=> setShowNet(e.target.checked)} className="accent-[#1a1a1a]" /> Net Kâr Barı
                 </label>
              </div>
            </div>
            <div className="flex bg-[#f1f2f4] p-0.5 rounded-md border border-[#d2d5d8]">
              {["7G", "30G", "3A", "1Y"].map(t => (
                <button 
                  key={t}
                  onClick={() => setTimeRange(t)}
                  className={`px-3 py-1 text-[12px] font-medium rounded ${timeRange === t ? 'bg-white shadow-sm text-[#1a1a1a]' : 'text-[#5c5f62] hover:text-[#1a1a1a]'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="p-4 flex-1 min-h-[350px] w-full">
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={currentChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorGelir" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#008060" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#008060" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorGider" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d82c0d" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#d82c0d" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1a1a1a" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#1a1a1a" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e3e3e3" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#8a8a8a' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#8a8a8a' }} dx={-10} tickFormatter={(value) => `₺${value/1000}k`} />
                <Tooltip 
                   contentStyle={{ borderRadius: '8px', border: '1px solid #e3e3e3', fontSize: '13px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                   formatter={(value: any) => [`₺${value}`, '']}
                />
                {showGelir && <Area type="monotone" dataKey="gelir" name="Gelir" stroke="#008060" strokeWidth={2} fillOpacity={1} fill="url(#colorGelir)" />}
                {showGider && <Area type="monotone" dataKey="gider" name="Gider" stroke="#d82c0d" strokeWidth={2} fillOpacity={1} fill="url(#colorGider)" />}
                {showNet && <Area type="monotone" dataKey="net" name="Net Kâr" stroke="#1a1a1a" strokeWidth={2} fillOpacity={1} fill="url(#colorNet)" />}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pro Tax Breakdown Column */}
        <div className="bg-white border border-[#e3e3e3] rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.05)] flex flex-col relative">
          <div className="p-4 border-b border-[#e3e3e3] flex justify-between items-center flex-wrap gap-2">
            <div>
               <h2 className="font-semibold text-[14px] text-[#1a1a1a]">Esnek Vergi Yönetimi</h2>
               <p className="text-[12px] text-[#5c5f62] mt-0.5">Sanal oranlarla tahmini şirket yükü.</p>
            </div>
            <button onClick={()=> setIsTaxModalOpen(true)} className="p-1 hover:bg-[#f1f2f4] rounded text-[#8a8a8a] transition-colors"><Pencil className="h-4 w-4" /></button>
          </div>
          <div className="p-4 flex-1 space-y-5">
            <div>
              <div className="flex justify-between text-[13px] mb-1.5">
                <span className="font-medium text-[#1a1a1a]">KDV Tahakkuku (%{kdvRate})</span>
                <span className="font-semibold text-[#d82c0d]">₺{(124500 * (kdvRate / 100)).toFixed(2)}</span>
              </div>
              <div className="w-full bg-[#f1f2f4] rounded-full h-2"><div className="bg-[#ffca8a] h-2 rounded-full w-[45%]"></div></div>
            </div>
            
            <div>
              <div className="flex justify-between text-[13px] mb-1.5">
                <span className="font-medium text-[#1a1a1a]">Gelir / Kurumlar Vergisi (%{incomeTaxRate})</span>
                <span className="font-semibold text-[#d82c0d]">₺{(68200 * (incomeTaxRate / 100)).toFixed(2)}</span>
              </div>
              <div className="w-full bg-[#f1f2f4] rounded-full h-2"><div className="bg-[#d82c0d] h-2 rounded-full w-[60%]"></div></div>
            </div>
            
             <div>
              <div className="flex justify-between text-[13px] mb-1.5">
                <span className="font-medium text-[#1a1a1a]">Damga / Diğer Kesintiler</span>
                <span className="font-semibold text-[#5c5f62]">₺450.00</span>
              </div>
              <div className="w-full bg-[#f1f2f4] rounded-full h-2"><div className="bg-[#8a8a8a] h-2 rounded-full w-[5%]"></div></div>
            </div>

            <div className="border-t border-dashed border-[#d2d5d8] pt-4 mt-2">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[14px] font-bold text-[#1a1a1a]">Tamamen Temiz Net Para</span>
                <span className="text-[16px] font-bold text-[#008060]">₺{ (68200 - (124500 * (kdvRate / 100)) - (68200 * (incomeTaxRate/100)) - 450).toFixed(2) }</span>
              </div>
              <p className="text-[11px] text-[#8a8a8a]">Şirketin tüm devlete olan yasal borçları bittikten sonra kendi kasasında kalan harcanabilir sermaye.</p>
            </div>
          </div>
        </div>

      </div>

      {/* Transaction Records - Double Click Feature */}
      <div className="bg-white border border-[#e3e3e3] rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.05)] overflow-hidden">
        <div className="p-4 border-b border-[#e3e3e3] flex justify-between items-center flex-wrap gap-4">
            <div>
                <h2 className="font-semibold text-[14px] text-[#1a1a1a]">Nakit Hareketleri (İşlem Detayı İçin Çift Tıklayın)</h2>
            </div>
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-[14px] w-[14px] text-[#8a8a8a]" />
              <input type="text" placeholder="İşlem ara..." className="w-full sm:w-64 pl-8 pr-3 py-1.5 border border-[#d2d5d8] bg-[#f1f2f4] rounded-md text-[13px] focus:ring-1 focus:ring-[#008060] focus:bg-white outline-none transition-colors" />
            </div>
        </div>
        
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
                <thead className="bg-[#f9fafb] border-b border-[#e3e3e3] text-[12px] text-[#5c5f62] uppercase tracking-wider">
                <tr>
                    <th className="py-2.5 px-4 font-semibold w-[100px]">İşlem ID</th>
                    <th className="py-2.5 px-4 font-semibold">İşlem Özeti</th>
                    <th className="py-2.5 px-4 font-semibold w-[120px]">Tarih / Saat</th>
                    <th className="py-2.5 px-4 font-semibold text-right w-[150px]">Tutar</th>
                    <th className="py-2.5 px-4 font-semibold text-center w-[120px]">Durum</th>
                </tr>
                </thead>
                <tbody className="text-[13px] text-[#1a1a1a]">
                {transactions.map((trx) => (
                    <tr 
                      key={trx.id} 
                      onDoubleClick={() => setSelectedTx(trx)}
                      className="border-b border-[#e3e3e3]/50 hover:bg-[#f1f2f4]/80 cursor-pointer transition-colors"
                      title="Detayını görmek için çift tıklayın!"
                    >
                    <td className="py-3 px-4 font-medium text-[#5c5f62]">{trx.id}</td>
                    <td className="py-3 px-4 font-medium">{trx.desc}</td>
                    <td className="py-3 px-4 text-[#5c5f62] whitespace-nowrap">{trx.date}, {trx.time}</td>
                    <td className={`py-3 px-4 font-bold text-right ${trx.type === 'IN' ? 'text-[#008060]' : 'text-[#d82c0d]'}`}>
                        {trx.type === 'IN' ? '+' : '-'} ₺{trx.amount.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-center">
                        <span className={`inline-flex px-2 py-0.5 rounded text-[11px] font-medium border ${trx.status === 'Onaylandı' || trx.status === 'Tamamlandı' ? 'bg-[#aee9d1]/40 border-[#008060] text-[#006e52]' : 'bg-[#e3e3e3] border-[#d2d5d8] text-[#5c5f62]'}`}>
                        {trx.status}
                        </span>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
      </div>

      {/* --- MODALS --- */}

      {/* Add Transaction Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-md overflow-hidden">
            <div className="px-5 py-4 border-b border-[#e3e3e3] flex justify-between items-center bg-[#f9fafb]">
              <h3 className="font-semibold text-[16px] text-[#1a1a1a]">Manuel İşlem Ekle</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-[#8a8a8a] hover:text-[#1a1a1a]"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleAddTransaction} className="p-5 space-y-4">
              <div>
                <label className="block text-[13px] font-medium text-[#1a1a1a] mb-1.5">İşlem Türü</label>
                <div className="flex gap-4">
                   <label className="flex items-center gap-1.5 cursor-pointer text-[13px] bg-[#f1f2f4] px-4 py-2 rounded-md border border-[#d2d5d8] hover:bg-[#e3e3e3] w-full justify-center">
                     <input type="radio" name="type" value="IN" defaultChecked className="accent-[#008060] w-4 h-4 cursor-pointer" /> Gelir (Giriş)
                   </label>
                   <label className="flex items-center gap-1.5 cursor-pointer text-[13px] bg-[#f1f2f4] px-4 py-2 rounded-md border border-[#d2d5d8] hover:bg-[#e3e3e3] w-full justify-center">
                     <input type="radio" name="type" value="OUT" className="accent-[#d82c0d] w-4 h-4 cursor-pointer" /> Gider (Çıkış)
                   </label>
                </div>
              </div>
              
              <div>
                <label className="block text-[13px] font-medium text-[#1a1a1a] mb-1.5">Miktar (₺)</label>
                <input required type="number" step="0.01" name="amount" placeholder="Örn: 500.00" className="w-full text-[14px] px-3 py-2 border border-[#8a8a8a] rounded-md focus:outline-none focus:ring-2 focus:ring-[#008060] text-[#1a1a1a]" />
              </div>

               <div>
                <label className="block text-[13px] font-medium text-[#1a1a1a] mb-1.5">İşlem Başlığı (Özet)</label>
                <input required type="text" name="desc" placeholder="Örn: Ofis Çay/Kahve Gideri" className="w-full text-[14px] px-3 py-2 border border-[#8a8a8a] rounded-md focus:outline-none focus:ring-2 focus:ring-[#008060] text-[#1a1a1a]" />
              </div>

               <div>
                <label className="block text-[13px] font-medium text-[#1a1a1a] mb-1.5">Açıklama (Tam Detay)</label>
                <textarea name="detail" rows={3} placeholder="Tedarikçi bilgisi veya fiş numarası..." className="w-full text-[14px] px-3 py-2 border border-[#8a8a8a] rounded-md focus:outline-none focus:ring-2 focus:ring-[#008060] text-[#1a1a1a]"></textarea>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                 <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 bg-white border border-[#d2d5d8] rounded-md text-[13px] font-medium text-[#1a1a1a] hover:bg-[#f1f2f4]">İptal</button>
                 <button type="submit" className="px-4 py-2 bg-[#1a1a1a] rounded-md text-[13px] font-medium text-white hover:bg-black">İşlemi Kaydet</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Transaction Details Modal (Double Click) */}
      {selectedTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-[500px] overflow-hidden">
            <div className="px-6 py-5 border-b border-[#e3e3e3] bg-[#f9fafb] flex justify-between items-start">
               <div>
                  <h3 className="font-semibold text-[18px] text-[#1a1a1a]">İşlem Detayı Dosyası</h3>
                  <p className="text-[12px] text-[#5c5f62] mt-1">ID: {selectedTx.id}</p>
               </div>
               <button onClick={() => setSelectedTx(null)} className="text-[#8a8a8a] hover:text-[#1a1a1a] bg-[#e3e3e3] p-1.5 rounded-full"><X className="h-5 w-5" /></button>
            </div>
            <div className="p-6 space-y-6">
              
              <div className="flex items-center justify-between p-4 rounded-lg bg-[#f1f2f4]">
                 <div>
                    <span className="block text-[13px] text-[#5c5f62] mb-1">NET TUTAR</span>
                    <span className={`text-[24px] font-bold ${selectedTx.type === 'IN' ? 'text-[#008060]' : 'text-[#d82c0d]'}`}>
                       {selectedTx.type === 'IN' ? '+' : '-'} ₺{selectedTx.amount.toFixed(2)}
                    </span>
                 </div>
                 <div className="text-right">
                    <span className="block text-[13px] text-[#5c5f62] mb-1">İŞLEM TARİHİ</span>
                    <span className="text-[15px] font-medium text-[#1a1a1a]">{selectedTx.date}, {selectedTx.time}</span>
                 </div>
              </div>

              <div>
                 <span className="block text-[11px] font-bold text-[#8a8a8a] uppercase tracking-wider mb-2">Başlık / Özet</span>
                 <p className="text-[15px] font-medium text-[#1a1a1a]">{selectedTx.desc}</p>
              </div>

               <div>
                 <span className="block text-[11px] font-bold text-[#8a8a8a] uppercase tracking-wider mb-2">Açıklama / Kaynak Bilgisi</span>
                 <p className="text-[14px] text-[#5c5f62] bg-white border border-[#e3e3e3] p-3 rounded-md shadow-inner min-h-[80px]">
                    {selectedTx.detail || "Bu işlem için ekstra açıklama belirtilmemiş."}
                 </p>
              </div>
              
            </div>
            <div className="px-6 py-4 bg-[#f9fafb] border-t border-[#e3e3e3] flex justify-between items-center">
               <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-medium border bg-white ${selectedTx.status === 'Onaylandı' || selectedTx.status === 'Tamamlandı' ? 'border-[#008060] text-[#006e52]' : 'border-[#d2d5d8] text-[#5c5f62]'}`}>
                 Durum: {selectedTx.status}
               </span>
               <button onClick={() => setSelectedTx(null)} className="px-5 py-2 bg-[#1a1a1a] text-white rounded-md text-[13px] font-medium hover:bg-black transition-colors">Kapat</button>
            </div>
          </div>
        </div>
      )}

      {/* Tax Configuration Modal */}
      {isTaxModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-[#e3e3e3] flex justify-between items-center bg-[#f9fafb]">
              <h3 className="font-semibold text-[16px] text-[#1a1a1a]">Vergi Oranlarını Ayarla</h3>
              <button onClick={() => setIsTaxModalOpen(false)} className="text-[#8a8a8a] hover:text-[#1a1a1a]"><X className="h-5 w-5" /></button>
            </div>
            <div className="p-5 space-y-4">
               <div>
                  <label className="block text-[13px] font-medium text-[#1a1a1a] mb-1.5">KDV Oranı (%)</label>
                  <input type="number" max="100" min="0" value={kdvRate} onChange={(e) => setKdvRate(Number(e.target.value))} className="w-full text-[14px] px-3 py-2 border border-[#8a8a8a] rounded-md focus:outline-none focus:ring-2 focus:ring-[#008060] text-[#1a1a1a]" />
               </div>
               <div>
                  <label className="block text-[13px] font-medium text-[#1a1a1a] mb-1.5">Gelir / Kurumlar Vergisi (%)</label>
                  <input type="number" max="100" min="0" value={incomeTaxRate} onChange={(e) => setIncomeTaxRate(Number(e.target.value))} className="w-full text-[14px] px-3 py-2 border border-[#8a8a8a] rounded-md focus:outline-none focus:ring-2 focus:ring-[#008060] text-[#1a1a1a]" />
               </div>
               <p className="text-[12px] text-[#5c5f62]">İsterseniz panelinizi sektörel yapınıza göre revize edebilirsiniz.</p>
               <button onClick={() => setIsTaxModalOpen(false)} className="w-full mt-2 px-4 py-2 bg-[#008060] rounded-md text-[13px] font-medium text-white hover:bg-[#006e52]">Yeni Oranları Ekrana Yansıt</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
