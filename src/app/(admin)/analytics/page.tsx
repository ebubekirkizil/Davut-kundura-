"use client";

import { useState, useEffect } from "react";
import { Activity, Globe, ShoppingCart, Users, EyeOff, MousePointerClick, ArrowUpRight, ArrowDownRight, MapPin, Zap, Sparkles, Navigation2, Target } from "lucide-react";

export default function AnalyticsPage() {
  const [onlineUsers, setOnlineUsers] = useState(24);

  // Simulate live traffic fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineUsers(prev => prev + (Math.floor(Math.random() * 5) - 2));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-[1400px] mx-auto space-y-8 pb-12 animate-in fade-in duration-1000">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-brand font-bold tracking-tight text-[var(--text-primary)]">Canlı Etkileşim Analizi</h1>
            <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-600 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
              <span className="text-[11px] font-black uppercase tracking-widest">Canlı</span>
            </div>
          </div>
          <p className="text-[14px] text-[var(--text-secondary)] font-light">Sitenizdeki anlık trafiği, kullanıcı davranışlarını ve dönüşüm hunisini takip edin.</p>
        </div>
        
        <div className="flex items-center gap-4 p-1.5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl shadow-inner">
          <div className="px-6 py-2.5 bg-white rounded-xl shadow-sm border border-[var(--border)]">
            <div className="flex flex-col items-center">
              <span className="text-[20px] font-black text-[var(--text-primary)] font-brand">{onlineUsers}</span>
              <span className="text-[9px] font-black text-[var(--text-secondary)] uppercase tracking-tighter">Aktif Ziyaretçi</span>
            </div>
          </div>
          <div className="pr-4 space-y-0.5">
             <div className="text-[11px] font-bold text-[var(--text-primary)]">Real-time Traffic</div>
             <div className="text-[10px] text-green-600 font-black uppercase tracking-widest animate-pulse">Synchronized</div>
          </div>
        </div>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Kayıp Potansiyel (Terk)", value: "14", metric: "+12%", isUp: true, icon: EyeOff, color: "red", footer: "₺34,500 Bugün" },
          { title: "Dönüşüm Katsayısı", value: "%4.2", metric: "+0.5%", isUp: true, icon: Target, color: "emerald", footer: "Pazar Ort. Üzeri" },
          { title: "Reklam Etkinliği", value: "%82", metric: "-2%", isUp: false, icon: Zap, color: "amber", footer: "Meta Ads Verimli" },
          { title: "Tekil Ziyaret", value: "1.2k", metric: "+15%", isUp: true, icon: Users, color: "blue", footer: "Organik Artış" }
        ].map((card, idx) => (
          <div key={idx} className="bg-white border border-[var(--border)] rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group overflow-hidden relative">
            <div className="absolute top-0 right-0 w-20 h-20 bg-[var(--accent)]/5 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-[var(--accent)]/10 transition-colors" />
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="p-2.5 rounded-xl bg-[var(--bg-secondary)] group-hover:bg-[var(--accent)]/10 transition-colors">
                <card.icon size={20} className="text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors" />
              </div>
              <div className={`text-[11px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 ${card.isUp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {card.metric}
              </div>
            </div>
            <div className="space-y-1 relative z-10">
              <span className="text-[11px] font-black text-[var(--text-secondary)] uppercase tracking-widest">{card.title}</span>
              <div className="text-[28px] font-black text-[var(--text-primary)] font-brand tracking-tighter">{card.value}</div>
              <div className="pt-2 flex items-center gap-2">
                <div className="w-1 h-1 bg-[var(--border)] rounded-full"></div>
                <span className="text-[10px] font-bold text-[var(--text-secondary)]">{card.footer}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Live Visitor Map - Premium Design */}
        <div className="lg:col-span-2 bg-white border border-[var(--border)] rounded-[2.5rem] shadow-sm overflow-hidden flex flex-col h-[600px] relative">
          <div className="p-8 border-b border-[var(--border)] flex justify-between items-center bg-white/50 backdrop-blur-md relative z-20">
             <div className="space-y-1">
               <h3 className="font-brand font-bold text-[18px] text-[var(--text-primary)] flex items-center gap-3">
                 <Globe className="text-[var(--accent)] animate-spin-slow" size={20} /> 
                 Global Trafik Haritası
               </h3>
               <p className="text-[12px] text-[var(--text-secondary)] font-medium">Dünya genelindeki anlık ziyaretçi dağılımı.</p>
             </div>
             <div className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-secondary)] rounded-full border border-[var(--border)] text-[11px] font-black uppercase tracking-widest text-[var(--text-secondary)] shadow-inner">
               <Navigation2 size={12} className="text-[var(--accent)]" /> 
               Live Tracking
             </div>
          </div>
          
          <div className="flex-1 bg-[var(--text-primary)] relative overflow-hidden flex items-center justify-center">
             {/* Abstract World Map with Premium Glow */}
             <div className="absolute inset-0 opacity-10 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-no-repeat bg-center bg-cover scale-110"></div>
             
             {/* Radial Glow */}
             <div className="absolute inset-0 bg-gradient-radial from-transparent to-[var(--text-primary)] pointer-events-none"></div>

             {/* Live Pulses */}
             <div className="absolute top-[42%] left-[53%] group">
                <div className="w-4 h-4 bg-[var(--accent)] rounded-full animate-ping opacity-75"></div>
                <div className="w-2 h-2 bg-[var(--accent)] rounded-full absolute top-1 left-1 shadow-[0_0_15px_var(--accent)]"></div>
                <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-xl scale-0 group-hover:scale-100 transition-all origin-top whitespace-nowrap z-50">
                   <div className="text-[10px] font-black text-white">İSTANBUL, TR</div>
                   <div className="text-[9px] text-white/60">14 Active Users</div>
                </div>
             </div>

             <div className="absolute top-[35%] left-[25%] group">
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-ping opacity-50"></div>
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full absolute top-0.5 left-0.5"></div>
             </div>

             <div className="absolute top-[50%] left-[70%] group">
                <div className="w-3 h-3 bg-purple-400 rounded-full animate-ping opacity-50"></div>
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full absolute top-0.5 left-0.5"></div>
             </div>
             
             <div className="absolute bottom-8 left-8 right-8 grid grid-cols-3 gap-4">
                {[
                  { region: "Marmara", count: 18, trend: "up" },
                  { region: "Avrupa", count: 7, trend: "up" },
                  { region: "Kuzey Amerika", count: 3, trend: "stable" }
                ].map((stat, i) => (
                  <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-3xl shadow-2xl">
                    <div className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em] mb-1">{stat.region}</div>
                    <div className="flex items-center justify-between">
                       <span className="text-[20px] font-black text-white font-brand">{stat.count}</span>
                       <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                          <Navigation2 size={12} className="text-white/60" />
                       </div>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Live Page Views - Premium List */}
        <div className="bg-white border border-[var(--border)] rounded-[2.5rem] shadow-sm flex flex-col h-[600px] overflow-hidden">
          <div className="p-8 border-b border-[var(--border)] bg-[var(--bg-secondary)]/30 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--accent)]/5 rounded-full blur-2xl -mr-12 -mt-12" />
             <h3 className="font-brand font-bold text-[18px] text-[var(--text-primary)] relative z-10">Trend Sayfalar</h3>
             <p className="text-[12px] text-[var(--text-secondary)] font-medium mt-1">Anlık en yüksek etkileşim alan URL'ler.</p>
          </div>
          
          <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide">
             
             {[
               { url: "/urun/siyah-oxford-deri", count: 12, status: "Hüksek İlgi", statusColor: "green", time: "03:45" },
               { url: "/sepetim", count: 5, status: "Ödemede", statusColor: "orange", time: "02:10" },
               { url: "/kategori/loafer", count: 4, status: "İnceleme", statusColor: "blue", time: "01:20" },
               { url: "/blog/deri-bakimi", count: 2, status: "Okuma", statusColor: "slate", time: "05:15" },
               { url: "/anasayfa", count: 1, status: "Giriş", statusColor: "slate", time: "00:45" }
             ].map((page, i) => (
               <div key={i} className="group relative flex items-center gap-5 p-4 rounded-3xl hover:bg-[var(--bg-secondary)] transition-all duration-300 border border-transparent hover:border-[var(--border)]">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border)] flex items-center justify-center font-black text-[12px] text-[var(--text-secondary)] group-hover:bg-white group-hover:text-[var(--accent)] transition-all group-hover:rotate-6">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[13px] font-bold text-[var(--text-primary)] truncate max-w-[140px]">{page.url}</span>
                      <span className="text-[10px] font-black text-[var(--accent)] bg-[var(--accent)]/10 px-2 py-0.5 rounded-full">{page.count} ZİYARETÇİ</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={`text-[10px] font-black uppercase tracking-widest text-green-600 flex items-center gap-1`}>
                        <div className={`w-1 h-1 rounded-full bg-green-500`}></div>
                        {page.status}
                      </div>
                      <span className="text-[10px] text-[var(--text-secondary)] font-medium">Kalma: {page.time}</span>
                    </div>
                  </div>
               </div>
             ))}

          </div>
          
          <div className="p-8 border-t border-[var(--border)] bg-[var(--bg-secondary)]/30 text-center">
             <button className="w-full py-4 bg-[var(--text-primary)] text-white rounded-2xl text-[13px] font-bold hover:bg-[var(--accent)] shadow-lg transition-all flex items-center justify-center gap-3">
               <Sparkles size={16} /> Detaylı Akış Raporu
             </button>
          </div>
        </div>

      </div>
    </div>
  );
}
