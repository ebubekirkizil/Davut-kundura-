"use client";

import { useState, useEffect } from "react";
import { Activity, Globe, ShoppingCart, Users, EyeOff, MousePointerClick, ArrowUpRight, ArrowDownRight, MapPin, Zap } from "lucide-react";

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
    <div className="max-w-7xl mx-auto space-y-6 pb-12 font-sans">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-[22px] font-bold text-[#1a1a1a] flex items-center gap-2">
            <Activity className="w-6 h-6 text-indigo-600" /> Canlı Analiz & Pazarlama (Real-time)
          </h1>
          <p className="text-[13px] text-[#5c5f62] mt-1">Sitenizdeki tüm trafiği, terk edilen sepetleri ve Meta/Google Ads piksel verilerini anlık izleyin.</p>
        </div>
        <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-100 px-4 py-2 rounded-lg">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
          </span>
          <span className="text-indigo-700 font-bold text-[14px]">Şu an sitede {onlineUsers} kişi var</span>
        </div>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-[#e3e3e3] rounded-lg p-5 shadow-sm">
          <div className="flex items-center gap-2 text-[#5c5f62] mb-2">
            <EyeOff className="w-5 h-5 text-red-500" />
            <h3 className="text-[12px] font-bold uppercase tracking-wider">Terk Edilen Sepetler</h3>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-[28px] font-bold text-[#1a1a1a]">14</span>
            <span className="text-[13px] text-red-600 font-medium mb-1.5 flex items-center"><ArrowUpRight className="w-3 h-3"/> 12%</span>
          </div>
          <p className="text-[11px] text-[#8a8a8a] mt-2">Bugün kaybedilen potansiyel gelir: <strong>34,500₺</strong></p>
        </div>

        <div className="bg-white border border-[#e3e3e3] rounded-lg p-5 shadow-sm">
          <div className="flex items-center gap-2 text-[#5c5f62] mb-2">
            <MousePointerClick className="w-5 h-5 text-blue-500" />
            <h3 className="text-[12px] font-bold uppercase tracking-wider">Dönüşüm Oranı (CVR)</h3>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-[28px] font-bold text-[#1a1a1a]">%4.2</span>
            <span className="text-[13px] text-green-600 font-medium mb-1.5 flex items-center"><ArrowUpRight className="w-3 h-3"/> 0.5%</span>
          </div>
          <p className="text-[11px] text-[#8a8a8a] mt-2">Sektör ortalamasının <strong>üzerinde</strong></p>
        </div>

        <div className="bg-white border border-[#e3e3e3] rounded-lg p-5 shadow-sm">
          <div className="flex items-center gap-2 text-[#5c5f62] mb-2">
            <Users className="w-5 h-5 text-purple-500" />
            <h3 className="text-[12px] font-bold uppercase tracking-wider">Trafik Kaynağı</h3>
          </div>
          <div className="space-y-2 mt-2">
             <div className="flex justify-between text-[11px]"><span className="text-[#1a1a1a] font-medium">Google Ads</span> <span className="text-purple-600 font-bold">%45</span></div>
             <div className="w-full bg-[#f1f2f4] rounded-full h-1"><div className="bg-purple-500 h-1 rounded-full" style={{width: '45%'}}></div></div>
             <div className="flex justify-between text-[11px]"><span className="text-[#1a1a1a] font-medium">Instagram/Meta</span> <span className="text-pink-600 font-bold">%35</span></div>
             <div className="w-full bg-[#f1f2f4] rounded-full h-1"><div className="bg-pink-500 h-1 rounded-full" style={{width: '35%'}}></div></div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#333] border border-[#222] rounded-lg p-5 shadow-sm text-white">
          <div className="flex items-center gap-2 text-[#a0a0a0] mb-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            <h3 className="text-[12px] font-bold uppercase tracking-wider text-yellow-500">Piksel & Yeniden Hedefleme</h3>
          </div>
          <div className="mt-4 space-y-3">
             <button className="w-full bg-white text-black py-1.5 rounded text-[12px] font-bold hover:bg-slate-200">Sepeti Terk Edenlere SMS At</button>
             <button className="w-full bg-blue-600 text-white py-1.5 rounded text-[12px] font-bold hover:bg-blue-700">Meta Ads Retargeting Başlat</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Live Visitor Map */}
        <div className="md:col-span-2 bg-white border border-[#e3e3e3] rounded-lg shadow-sm overflow-hidden flex flex-col h-[500px]">
          <div className="p-4 border-b border-[#e3e3e3] flex justify-between items-center bg-[#f9fafb]">
             <h3 className="font-bold text-[14px] text-[#1a1a1a] flex items-center gap-2"><Globe className="w-4 h-4 text-blue-500"/> Ziyaretçi Haritası (Gerçek Zamanlı)</h3>
          </div>
          <div className="flex-1 bg-[#1a1a1a] relative overflow-hidden flex items-center justify-center p-8">
             {/* Abstract World Map SVG Placeholder */}
             <div className="absolute inset-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-no-repeat bg-center bg-contain"></div>
             
             {/* Blinking Live Dots representing users */}
             <div className="absolute top-[40%] left-[55%] w-3 h-3 bg-blue-500 rounded-full animate-ping"></div>
             <div className="absolute top-[40%] left-[55%] w-2 h-2 bg-blue-400 rounded-full"></div>
             <div className="absolute top-[38%] left-[52%] w-1.5 h-1.5 bg-green-400 rounded-full"></div>
             <div className="absolute top-[45%] left-[58%] w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
             
             <div className="absolute top-[35%] left-[20%] w-2 h-2 bg-yellow-500 rounded-full animate-ping"></div>
             
             <div className="absolute bottom-4 left-4 bg-black/60 text-white p-3 rounded backdrop-blur-sm border border-white/10">
               <h4 className="text-[11px] font-bold text-[#a0a0a0] mb-2 uppercase tracking-wider">Aktif Bölgeler</h4>
               <ul className="text-[12px] space-y-1.5 font-medium">
                 <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-500"></span> İstanbul, TR (14 Kişi)</li>
                 <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500"></span> İzmir, TR (5 Kişi)</li>
                 <li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-yellow-500"></span> New York, US (3 Kişi)</li>
               </ul>
             </div>
          </div>
        </div>

        {/* Live Page Views */}
        <div className="bg-white border border-[#e3e3e3] rounded-lg shadow-sm flex flex-col h-[500px]">
          <div className="p-4 border-b border-[#e3e3e3] bg-[#f9fafb]">
             <h3 className="font-bold text-[14px] text-[#1a1a1a]">En Çok Görüntülenen Sayfalar (Şu An)</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
             
             <div className="border-b border-[#e3e3e3] pb-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[13px] font-medium text-blue-600 truncate hover:underline cursor-pointer">/urun/siyah-oxford-deri</span>
                  <span className="bg-blue-100 text-blue-700 font-bold text-[11px] px-2 py-0.5 rounded">12 Kişi</span>
                </div>
                <div className="flex justify-between text-[11px] text-[#8a8a8a]">
                  <span>Ort. Kalma Süresi: 03:45</span>
                  <span className="text-green-600 font-medium">Yüksek İlgi</span>
                </div>
             </div>

             <div className="border-b border-[#e3e3e3] pb-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[13px] font-medium text-blue-600 truncate hover:underline cursor-pointer">/sepetim</span>
                  <span className="bg-orange-100 text-orange-700 font-bold text-[11px] px-2 py-0.5 rounded">5 Kişi</span>
                </div>
                <div className="flex justify-between text-[11px] text-[#8a8a8a]">
                  <span>Sepet Toplamı: ~12,500₺</span>
                  <span className="text-orange-600 font-medium">Ödeme Adımında</span>
                </div>
             </div>

             <div className="border-b border-[#e3e3e3] pb-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[13px] font-medium text-blue-600 truncate hover:underline cursor-pointer">/kategori/loafer</span>
                  <span className="bg-slate-100 text-slate-700 font-bold text-[11px] px-2 py-0.5 rounded">4 Kişi</span>
                </div>
                <div className="flex justify-between text-[11px] text-[#8a8a8a]">
                  <span>Ort. Kalma Süresi: 01:20</span>
                </div>
             </div>

          </div>
          <div className="p-3 border-t border-[#e3e3e3] bg-[#f9fafb] text-center">
             <button className="text-[12px] font-bold text-blue-600 hover:text-blue-800">Tüm Detaylı Analiz Raporunu İndir</button>
          </div>
        </div>

      </div>
    </div>
  );
}
