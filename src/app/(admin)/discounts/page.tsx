"use client";

import { useState } from "react";
import { 
  Tag, 
  Plus, 
  Search, 
  Percent, 
  Banknote, 
  Truck, 
  Users, 
  Calendar, 
  MoreHorizontal, 
  Copy,
  CheckCircle2,
  AlertCircle,
  Gift,
  Clock
} from "lucide-react";

// Types
type DiscountType = "PERCENTAGE" | "FIXED" | "FREE_SHIP";

interface DiscountCode {
  id: string;
  code: string;
  type: DiscountType;
  value: number; // For free shipping, value could be 0
  usageCount: number;
  maxUses: number | null;
  status: "ACTIVE" | "EXPIRED" | "SCHEDULED";
  targetUser?: string; // If assigned to a specific user
  expiresAt?: string;
}

// Mock Data
const initialDiscounts: DiscountCode[] = [
  { id: "1", code: "YAZ2026", type: "PERCENTAGE", value: 15, usageCount: 142, maxUses: 500, status: "ACTIVE", expiresAt: "31 Ağu 2026" },
  { id: "2", code: "HOSGELDIN50", type: "FIXED", value: 50, usageCount: 890, maxUses: null, status: "ACTIVE" },
  { id: "3", code: "VIP-AHMET-BEY", type: "PERCENTAGE", value: 25, usageCount: 2, maxUses: 5, status: "ACTIVE", targetUser: "Ahmet Yılmaz (ahmet@firma.com)" },
  { id: "4", code: "KARGO-BEDAVA", type: "FREE_SHIP", value: 0, usageCount: 56, maxUses: 100, status: "EXPIRED", expiresAt: "01 Oca 2026" },
  { id: "5", code: "SONBAHAR", type: "PERCENTAGE", value: 10, usageCount: 0, maxUses: 1000, status: "SCHEDULED", expiresAt: "01 Kas 2026" },
];

export default function DiscountsPage() {
  const [discounts, setDiscounts] = useState<DiscountCode[]>(initialDiscounts);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"ALL" | "ACTIVE" | "VIP">("ALL");

  const getTypeIcon = (type: DiscountType) => {
    switch(type) {
      case "PERCENTAGE": return <Percent className="w-4 h-4 text-blue-600" />;
      case "FIXED": return <Banknote className="w-4 h-4 text-green-600" />;
      case "FREE_SHIP": return <Truck className="w-4 h-4 text-orange-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "ACTIVE": return <span className="px-2 py-1 bg-green-100 text-green-700 text-[11px] font-bold rounded-full flex items-center gap-1 w-max"><CheckCircle2 className="w-3 h-3" /> Aktif</span>;
      case "EXPIRED": return <span className="px-2 py-1 bg-red-100 text-red-700 text-[11px] font-bold rounded-full flex items-center gap-1 w-max"><AlertCircle className="w-3 h-3" /> Süresi Doldu</span>;
      case "SCHEDULED": return <span className="px-2 py-1 bg-slate-100 text-slate-700 text-[11px] font-bold rounded-full flex items-center gap-1 w-max"><Clock className="w-3 h-3" /> Zamanlanmış</span>;
    }
  };

  const filteredDiscounts = discounts.filter(d => {
    const matchesSearch = d.code.toLowerCase().includes(searchTerm.toLowerCase()) || d.targetUser?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === "ALL" ? true : activeTab === "ACTIVE" ? d.status === "ACTIVE" : !!d.targetUser;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12 font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-[22px] font-bold text-[#1a1a1a] flex items-center gap-2">
            <Tag className="w-6 h-6 text-[#008060]" /> İndirimler & Kuponlar
          </h1>
          <p className="text-[13px] text-[#5c5f62] mt-1">Kampanya kodlarını, otomatik indirimleri ve müşteriye özel VIP tanımlamaları yönetin.</p>
        </div>
        <button className="px-4 py-2 bg-[#008060] rounded-md text-[13px] font-medium text-white shadow-sm hover:bg-[#006e52] flex items-center gap-2 transition-colors">
          <Plus className="h-4 w-4" /> Yeni İndirim Oluştur
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-[#e3e3e3] rounded-lg p-5 shadow-sm">
          <div className="flex items-center gap-3 text-[#5c5f62] mb-2">
            <Tag className="w-5 h-5 text-blue-500" />
            <h3 className="text-[13px] font-medium uppercase tracking-wider">Aktif İndirim Kodu</h3>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-[28px] font-bold text-[#1a1a1a]">12</span>
            <span className="text-[13px] text-[#8a8a8a] mb-1.5">Kampanya</span>
          </div>
        </div>
        <div className="bg-white border border-[#e3e3e3] rounded-lg p-5 shadow-sm">
          <div className="flex items-center gap-3 text-[#5c5f62] mb-2">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <h3 className="text-[13px] font-medium uppercase tracking-wider">Toplam Kullanım</h3>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-[28px] font-bold text-[#1a1a1a]">1,090</span>
            <span className="text-[13px] text-green-600 font-medium mb-1.5">+14% bu ay</span>
          </div>
        </div>
        <div className="bg-white border border-[#e3e3e3] rounded-lg p-5 shadow-sm relative overflow-hidden group hover:border-[#008060] transition-colors cursor-pointer">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
             <Gift className="w-16 h-16 text-[#008060]" />
          </div>
          <div className="flex items-center gap-3 text-[#5c5f62] mb-2 relative z-10">
            <Users className="w-5 h-5 text-purple-500" />
            <h3 className="text-[13px] font-medium uppercase tracking-wider text-purple-700">Kişiye Özel İndirimler</h3>
          </div>
          <div className="flex items-end gap-2 relative z-10">
            <span className="text-[28px] font-bold text-[#1a1a1a]">4</span>
            <span className="text-[13px] text-[#8a8a8a] mb-1.5">VIP Müşteri</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white border border-[#e3e3e3] rounded-lg shadow-sm">
        
        {/* Toolbar */}
        <div className="p-4 border-b border-[#e3e3e3] flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex border border-[#d2d5d8] rounded-md overflow-hidden w-max">
            <button 
              onClick={() => setActiveTab("ALL")}
              className={`px-4 py-1.5 text-[13px] font-medium transition-colors ${activeTab === 'ALL' ? 'bg-[#f1f2f4] text-[#1a1a1a]' : 'bg-white text-[#5c5f62] hover:bg-[#fafafa]'}`}
            >
              Tümü
            </button>
            <button 
              onClick={() => setActiveTab("ACTIVE")}
              className={`px-4 py-1.5 text-[13px] font-medium border-l border-[#d2d5d8] transition-colors ${activeTab === 'ACTIVE' ? 'bg-[#f1f2f4] text-[#1a1a1a]' : 'bg-white text-[#5c5f62] hover:bg-[#fafafa]'}`}
            >
              Sadece Aktif
            </button>
            <button 
              onClick={() => setActiveTab("VIP")}
              className={`px-4 py-1.5 text-[13px] font-medium border-l border-[#d2d5d8] transition-colors flex items-center gap-1.5 ${activeTab === 'VIP' ? 'bg-purple-50 text-purple-700' : 'bg-white text-[#5c5f62] hover:bg-purple-50 hover:text-purple-600'}`}
            >
              <Gift className="w-3.5 h-3.5" /> VIP Kuponlar
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8a8a8a]" />
            <input 
              type="text" 
              placeholder="Kupon veya e-posta ara..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 border border-[#d2d5d8] bg-white rounded-md text-[13px] focus:ring-1 focus:ring-[#008060] focus:border-[#008060] outline-none" 
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#e3e3e3] bg-[#f9fafb]">
                <th className="px-4 py-3 text-[12px] font-semibold text-[#5c5f62] uppercase tracking-wider w-[25%]">İndirim Kodu</th>
                <th className="px-4 py-3 text-[12px] font-semibold text-[#5c5f62] uppercase tracking-wider w-[15%]">Tür / Tutar</th>
                <th className="px-4 py-3 text-[12px] font-semibold text-[#5c5f62] uppercase tracking-wider w-[20%]">Durum</th>
                <th className="px-4 py-3 text-[12px] font-semibold text-[#5c5f62] uppercase tracking-wider w-[15%]">Kullanım</th>
                <th className="px-4 py-3 text-[12px] font-semibold text-[#5c5f62] uppercase tracking-wider text-right w-[10%]">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e3e3e3]">
              {filteredDiscounts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-[#5c5f62] text-[13px]">
                    <Tag className="w-8 h-8 text-[#d2d5d8] mx-auto mb-3" />
                    Aradığınız kriterde indirim kodu bulunamadı.
                  </td>
                </tr>
              ) : (
                filteredDiscounts.map((discount) => (
                  <tr key={discount.id} className="hover:bg-[#fafafa] transition-colors group">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] font-bold font-mono text-[#1a1a1a] bg-[#f1f2f4] px-2 py-0.5 rounded border border-[#d2d5d8]">
                          {discount.code}
                        </span>
                        <button className="text-[#8a8a8a] hover:text-[#1a1a1a] opacity-0 group-hover:opacity-100 transition-opacity" title="Kodu Kopyala">
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      {discount.targetUser && (
                        <div className="mt-1 flex items-center gap-1.5 text-[11px] text-purple-600 font-medium">
                          <Gift className="w-3 h-3" /> Sadece: {discount.targetUser}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className={`p-1.5 rounded-md ${discount.type === 'PERCENTAGE' ? 'bg-blue-50' : discount.type === 'FIXED' ? 'bg-green-50' : 'bg-orange-50'}`}>
                          {getTypeIcon(discount.type)}
                        </div>
                        <span className="text-[13px] font-medium text-[#1a1a1a]">
                          {discount.type === "FREE_SHIP" ? "Ücretsiz Kargo" : 
                           discount.type === "PERCENTAGE" ? `%${discount.value} İndirim` : 
                           `${discount.value}₺ İndirim`}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-1.5">
                        {getStatusBadge(discount.status)}
                        {discount.expiresAt && (
                          <span className="text-[11px] text-[#5c5f62] flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> {discount.expiresAt}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-[13px] text-[#1a1a1a]">
                        <span className="font-semibold">{discount.usageCount}</span>
                        <span className="text-[#8a8a8a]"> / {discount.maxUses ? discount.maxUses : 'Sınırsız'}</span>
                      </div>
                      {discount.maxUses && (
                        <div className="w-full bg-[#f1f2f4] rounded-full h-1.5 mt-1.5">
                          <div 
                            className={`h-1.5 rounded-full ${discount.usageCount >= discount.maxUses ? 'bg-red-500' : 'bg-blue-500'}`} 
                            style={{ width: `${Math.min((discount.usageCount / discount.maxUses) * 100, 100)}%` }}
                          />
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button className="p-1.5 text-[#5c5f62] hover:text-[#1a1a1a] hover:bg-[#f1f2f4] rounded transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
