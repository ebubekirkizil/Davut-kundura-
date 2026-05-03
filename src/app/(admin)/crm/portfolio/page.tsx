"use client";

import React, { useState, useEffect } from 'react';

type PortfolioItem = { id: string; name: string; email: string; phone: string; lastInteraction?: string; notes?: string; status?: string; };

export default function PortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/portfolio?limit=10&page=1')
      .then(res => res.json())
      .then(data => {
        setItems(data.items ?? []);
        setTotal(data.total ?? 0);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-brand font-bold text-[var(--text-primary)]">Müşteri İlişkileri Portföyü</h1>
        <span className="px-3 py-1 bg-[var(--accent)]/10 text-[var(--accent)] text-[10px] font-black rounded-full uppercase tracking-widest border border-[var(--accent)]/20">Premium CRM</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-[var(--border)] p-6 rounded-2xl shadow-sm">
          <div className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest mb-1">Toplam Portföy</div>
          <div className="text-3xl font-black">{total}</div>
        </div>
        <div className="bg-white border border-[var(--border)] p-6 rounded-2xl shadow-sm">
          <div className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest mb-1">Aktif Etkileşim</div>
          <div className="text-3xl font-black">—</div>
        </div>
        <div className="bg-white border border-[var(--border)] p-6 rounded-2xl shadow-sm">
          <div className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest mb-1">Potansiyel Değer</div>
          <div className="text-3xl font-black">₺ —</div>
        </div>
      </div>

      <div className="bg-white border border-[var(--border)] rounded-[2rem] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--bg-secondary)] border-b border-[var(--border)]">
                <th className="px-8 py-6 text-[10px] font-black tracking-widest text-[var(--text-secondary)] uppercase">Ad Soyad</th>
                <th className="px-8 py-6 text-[10px] font-black tracking-widest text-[var(--text-secondary)] uppercase">İletişim</th>
                <th className="px-8 py-6 text-[10px] font-black tracking-widest text-[var(--text-secondary)] uppercase">Durum</th>
                <th className="px-8 py-6 text-[10px] font-black tracking-widest text-[var(--text-secondary)] uppercase">Son İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {loading ? (
                <tr><td colSpan={4} className="px-8 py-20 text-center text-[var(--text-secondary)] italic">Müşteri verileri yükleniyor...</td></tr>
              ) : items.length === 0 ? (
                <tr><td colSpan={4} className="px-8 py-20 text-center text-[var(--text-secondary)] italic">Henüz kayıtlı müşteri bulunamadı.</td></tr>
              ) : items.map((item) => (
                <tr key={item.id} className="hover:bg-[var(--bg-secondary)]/50 transition-colors group cursor-pointer">
                  <td className="px-8 py-6 font-bold">{item.name}</td>
                  <td className="px-8 py-6 text-[var(--text-secondary)] text-sm">{item.email}<br/>{item.phone}</td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-green-50 text-green-700 text-[10px] font-black rounded-full border border-green-100">AKTİF</span>
                  </td>
                  <td className="px-8 py-6 text-[var(--text-secondary)] text-sm">—</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
