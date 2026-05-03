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
              <tr className="bg-[var(--bg-secondary)]/30 border-b border-[var(--border)]">
                <th className="px-6 py-4 text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest">Müşteri</th>
                <th className="px-6 py-4 text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest">İletişim</th>
                <th className="px-6 py-4 text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest">Son Etkileşim</th>
                <th className="px-6 py-4 text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest">Durum</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)] text-[13px]">
              {loading ? (
                <tr><td colSpan={4} className="px-6 py-12 text-center text-[var(--text-secondary)] italic">Veriler yükleniyor...</td></tr>
              ) : items.map((it) => (
                <tr key={it.id} className="hover:bg-[var(--bg-secondary)]/50 transition-colors group">
                  <td className="px-6 py-4 font-bold">{it.name}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium">{it.email}</div>
                    <div className="text-[11px] text-[var(--text-secondary)]">{it.phone}</div>
                  </td>
                  <td className="px-6 py-4">{it.lastInteraction ?? '-'}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-gray-100 rounded text-[10px] font-bold uppercase tracking-tighter">{it.status ?? 'Yeni'}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
