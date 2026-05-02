"use client";

import { ShieldCheck, Terminal, AlertTriangle, Calendar } from "lucide-react";

export default function AuditLogsPage() {
  const logs = [
    { id: 1, action: "UPDATE_STOCK", user: "ebukizil", detail: "PRD-042 (Siyah Oxford) stoku 15 -> 50 güncellendi.", ip: "192.168.1.45", time: "2 dakika önce", type: "info" },
    { id: 2, action: "DELETE_ORDER", user: "ali_yonetici", detail: "ORD-2024-0012 siparişi veritabanından kalıcı olarak silindi.", ip: "85.102.XX.XX", time: "1 saat önce", type: "danger" },
    { id: 3, action: "LOGIN_SUCCESS", user: "ebukizil", detail: "Sisteme giriş yapıldı (Windows / Chrome).", ip: "192.168.1.45", time: "3 saat önce", type: "success" },
    { id: 4, action: "CHANGE_PRICE", user: "ebukizil", detail: "Kahverengi Loafer fiyatı 2400₺ -> 2800₺ güncellendi.", ip: "192.168.1.45", time: "1 gün önce", type: "warning" },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12 font-sans">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-[22px] font-bold text-[#1a1a1a] flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-red-600" /> Güvenlik & Denetim (Audit Logs)
          </h1>
          <p className="text-[13px] text-[#5c5f62] mt-1">Sistemdeki tüm yönetici ve personel işlemlerinin değiştirilemez kayıtları.</p>
        </div>
        <button className="px-4 py-2 border border-red-200 bg-red-50 text-red-700 rounded-md text-[13px] font-bold hover:bg-red-100">
          Olağanüstü Durum Raporu Al
        </button>
      </div>

      <div className="bg-[#0a0a0a] rounded-lg shadow-xl overflow-hidden border border-[#333]">
        <div className="bg-[#1c1c1c] px-4 py-2 border-b border-[#333] flex items-center gap-2">
          <Terminal className="w-4 h-4 text-green-400" />
          <span className="text-white text-[12px] font-mono font-bold tracking-widest">SYSTEM_AUDIT_TRAIL // IMMUTABLE</span>
        </div>
        
        <div className="p-4 space-y-1 font-mono text-[12px]">
          {logs.map(log => (
            <div key={log.id} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 py-2 border-b border-[#222] hover:bg-[#111] transition-colors">
              <div className="flex items-center gap-3 min-w-[180px]">
                <Calendar className="w-3.5 h-3.5 text-[#555]" />
                <span className="text-[#888]">{log.time}</span>
              </div>
              <div className={`font-bold min-w-[140px] ${log.type === 'danger' ? 'text-red-500' : log.type === 'warning' ? 'text-orange-400' : log.type === 'success' ? 'text-green-500' : 'text-blue-400'}`}>
                [{log.action}]
              </div>
              <div className="text-white flex-1">{log.detail}</div>
              <div className="text-[#555] min-w-[120px]">User: <span className="text-[#ccc]">{log.user}</span></div>
              <div className="text-[#555] min-w-[120px]">IP: {log.ip}</div>
            </div>
          ))}
          <div className="py-4 text-green-500 animate-pulse">
            _ Waiting for new events...
          </div>
        </div>
      </div>
    </div>
  );
}
