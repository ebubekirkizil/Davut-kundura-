import React from 'react';
import AdminLayout from '../../../../../components/ui/AdminLayout';

type PortfolioItem = { id: string; name: string; email: string; phone: string; lastInteraction?: string; notes?: string; status?: string; };

export default async function PortfolioPage() {
  const res = await fetch('/api/admin/portfolio?limit=10&page=1', { cache: 'no-store' });
  const data = await res.json();
  const items: PortfolioItem[] = data.items ?? [];
  const total: number = data.total ?? 0;

  return (
    <AdminLayout>
      <section className="p-6">
        <h1 className="text-2xl font-semibold mb-4">CRM Portföy</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="p-4 glass-effect rounded hover-lift card">Toplam Müşteri: {total}</div>
          <div className="p-4 glass-effect rounded hover-lift card">İşlem Hacmi: —</div>
          <div className="p-4 glass-effect rounded hover-lift card">Yeni Lead: —</div>
        </div>
        <div className="overflow-x-auto bg-white rounded shadow p-2">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İsim</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">E-posta</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telefon</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Son Etkileşim</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notlar</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {items.map((it) => (
                <tr key={it.id}>
                  <td className="px-6 py-4">{it.name}</td>
                  <td className="px-6 py-4">{it.email}</td>
                  <td className="px-6 py-4">{it.phone}</td>
                  <td className="px-6 py-4">{it.lastInteraction ?? '-'}</td>
                  <td className="px-6 py-4">{it.notes ?? ''}</td>
                  <td className="px-6 py-4">{it.status ?? 'Yeni'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </AdminLayout>
  );
}
