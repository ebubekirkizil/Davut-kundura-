"use client";

import { useState } from "react";
import { Ticket, Search, Filter, AlertCircle, MessageCircle, Clock, CheckCircle } from "lucide-react";

export default function SupportPage() {
  const tickets = [
    { id: "TKT-9012", user: "Ebru Ş.", subject: "Yanlış numara gönderilmiş", status: "Açık", priority: "Yüksek", time: "2 saat önce" },
    { id: "TKT-9011", user: "Mustafa K.", subject: "Deri bakımı hakkında soru", status: "Yanıt Bekliyor", priority: "Düşük", time: "5 saat önce" },
    { id: "TKT-9010", user: "Hüseyin B.", subject: "Kargom nerede kaldı?", status: "Çözüldü", priority: "Orta", time: "1 gün önce" },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12 font-sans">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-[22px] font-bold text-[#1a1a1a] flex items-center gap-2">
            <Ticket className="w-6 h-6 text-green-600" /> Destek Talepleri (Ticketing)
          </h1>
          <p className="text-[13px] text-[#5c5f62] mt-1">Müşteri şikayetleri, iade ve değişim süreçlerini tek ekrandan yönetin.</p>
        </div>
      </div>

      <div className="flex gap-6">
        <div className="w-1/3 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8a8a8a]" />
            <input type="text" placeholder="Bilet No veya İsim..." className="w-full pl-9 pr-3 py-2 border border-[#d2d5d8] rounded-md text-[13px] outline-none focus:border-green-500" />
          </div>
          
          <div className="space-y-2">
            {tickets.map(t => (
              <div key={t.id} className="p-3 bg-white border border-[#e3e3e3] rounded-lg shadow-sm hover:border-green-400 cursor-pointer">
                 <div className="flex justify-between items-start mb-2">
                   <span className="text-[11px] font-bold font-mono text-[#8a8a8a]">{t.id}</span>
                   <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${t.priority === 'Yüksek' ? 'bg-red-100 text-red-700' : t.priority === 'Orta' ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-600'}`}>{t.priority}</span>
                 </div>
                 <h4 className="font-semibold text-[13px] text-[#1a1a1a] leading-tight mb-1">{t.subject}</h4>
                 <div className="flex justify-between items-center mt-2">
                   <span className="text-[12px] text-[#5c5f62] flex items-center gap-1"><MessageCircle className="w-3 h-3" /> {t.user}</span>
                   <span className="text-[10px] text-[#8a8a8a] flex items-center gap-1"><Clock className="w-3 h-3" /> {t.time}</span>
                 </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 bg-white border border-[#e3e3e3] rounded-lg shadow-sm flex flex-col h-[600px]">
           <div className="p-4 border-b border-[#e3e3e3] flex justify-between items-center bg-[#f9fafb]">
             <div>
               <h2 className="font-bold text-[16px] text-[#1a1a1a]">Yanlış numara gönderilmiş</h2>
               <p className="text-[12px] text-[#5c5f62]">Talep No: TKT-9012 • Ebru Ş.</p>
             </div>
             <button className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 border border-green-200 rounded text-[12px] font-bold hover:bg-green-100">
               <CheckCircle className="w-4 h-4" /> Çözüldü İşaretle
             </button>
           </div>
           <div className="flex-1 p-4 bg-[#f1f2f4]">
             <div className="bg-white p-4 rounded-lg shadow-sm w-3/4 mb-4">
               <p className="text-[13px] text-[#1a1a1a]">Merhaba, dün teslim aldığım siyah oxford ayakkabı 42 numara geldi fakat ben 41 sipariş vermiştim. Değişim kodu alabilir miyim?</p>
             </div>
           </div>
           <div className="p-4 border-t border-[#e3e3e3] bg-white">
             <textarea placeholder="Müşteriye yanıt yazın..." className="w-full border border-[#d2d5d8] rounded p-2 text-[13px] h-24 outline-none focus:border-green-500"></textarea>
             <div className="flex justify-end mt-2">
               <button className="px-4 py-2 bg-green-600 text-white rounded font-medium text-[13px] hover:bg-green-700">Yanıtı Gönder</button>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
