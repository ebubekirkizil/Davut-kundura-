"use client";

import { useState } from "react";
import { Building2, Plus, Search, ChevronDown, CheckCircle, Percent, Receipt } from "lucide-react";

export default function B2BPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const b2bClients = [
    { id: "1", name: "Boyner Mağazacılık A.Ş.", taxNo: "18100xxxx", tier: "%15 İndirim", limit: "500,000 ₺", balance: "125,400 ₺", status: "Aktif" },
    { id: "2", name: "Ayakkabı Dünyası", taxNo: "12300xxxx", tier: "%10 İndirim", limit: "250,000 ₺", balance: "45,000 ₺", status: "Aktif" },
    { id: "3", name: "Yerel Butik (Bursa)", taxNo: "09800xxxx", tier: "%5 İndirim", limit: "50,000 ₺", balance: "48,900 ₺", status: "Limit Aşımı Riski" },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12 font-sans">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-[22px] font-bold text-[#1a1a1a] flex items-center gap-2">
            <Building2 className="w-6 h-6 text-purple-600" /> B2B Toptan Satış
          </h1>
          <p className="text-[13px] text-[#5c5f62] mt-1">Kurumsal bayilerinizin açık hesaplarını, iskonto oranlarını ve bakiyelerini yönetin.</p>
        </div>
        <button className="px-4 py-2 bg-purple-600 rounded-md text-[13px] font-medium text-white hover:bg-purple-700 flex items-center gap-2">
          <Plus className="w-4 h-4" /> Yeni Bayi Ekle
        </button>
      </div>

      <div className="bg-white border border-[#e3e3e3] rounded-lg shadow-sm">
        <div className="p-4 border-b border-[#e3e3e3] flex justify-between">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8a8a8a]" />
            <input type="text" placeholder="Firma adı veya vergi no..." className="w-full pl-9 pr-3 py-1.5 border border-[#d2d5d8] rounded-md text-[13px] focus:ring-1 focus:ring-purple-500 outline-none" />
          </div>
        </div>
        <table className="w-full text-left">
          <thead className="bg-[#f9fafb] border-b border-[#e3e3e3]">
            <tr>
              <th className="px-4 py-3 text-[12px] font-semibold text-[#5c5f62] uppercase">Firma Adı</th>
              <th className="px-4 py-3 text-[12px] font-semibold text-[#5c5f62] uppercase">Vergi No</th>
              <th className="px-4 py-3 text-[12px] font-semibold text-[#5c5f62] uppercase">İskonto Oranı</th>
              <th className="px-4 py-3 text-[12px] font-semibold text-[#5c5f62] uppercase text-right">Kredi Limiti</th>
              <th className="px-4 py-3 text-[12px] font-semibold text-[#5c5f62] uppercase text-right">Güncel Borç</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e3e3e3]">
            {b2bClients.map(client => (
              <tr key={client.id} className="hover:bg-[#fafafa] cursor-pointer">
                <td className="px-4 py-4">
                  <div className="font-bold text-[14px] text-[#1a1a1a]">{client.name}</div>
                  <div className={`text-[11px] font-medium mt-1 ${client.status === 'Aktif' ? 'text-green-600' : 'text-orange-600'}`}>
                    {client.status}
                  </div>
                </td>
                <td className="px-4 py-4 text-[13px] text-[#5c5f62] font-mono">{client.taxNo}</td>
                <td className="px-4 py-4">
                  <span className="flex items-center gap-1 text-[12px] font-bold bg-purple-50 text-purple-700 px-2 py-1 rounded w-max">
                    <Percent className="w-3 h-3" /> {client.tier}
                  </span>
                </td>
                <td className="px-4 py-4 text-[13px] font-semibold text-[#5c5f62] text-right">{client.limit}</td>
                <td className="px-4 py-4 text-[14px] font-bold text-[#1a1a1a] text-right flex items-center justify-end gap-1.5">
                  <Receipt className="w-4 h-4 text-[#8a8a8a]" /> {client.balance}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
