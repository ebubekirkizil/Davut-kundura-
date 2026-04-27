"use client";

import { Download, Upload, Plus, ChevronDown, CheckSquare, Search, ArrowUpDown, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ShopifyInventoryPage() {
  const router = useRouter();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const masterProducts = [
    {
      id: "M-001",
      name: "Davut Klasik Hakiki Deri Kemer",
      vendor: "Davut Kundura",
      inventory: "45 stokta",
      status: "Aktif",
      image: "https://images.unsplash.com/photo-1624222247344-550fb60eba1c?q=80&w=200&auto=format&fit=crop"
    },
    {
      id: "M-002",
      name: "Ortopedik Tabanlık (Spor Seri)",
      vendor: "Davut Kundura",
      inventory: "2 varyasyon için 120 stok",
      status: "Aktif",
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=200&auto=format&fit=crop"
    },
    {
      id: "M-003",
      name: "Profesyonel Süet Temizleme Kiti",
      vendor: "Davut Kundura",
      inventory: "Stokta yok (0)",
      status: "Arşivlendi",
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=200&auto=format&fit=crop"
    },
    {
      id: "M-004",
      name: "Valiz Tekerleği Çifti (360 XL)",
      vendor: "Tedarikçi A",
      inventory: "15 stokta",
      status: "Taslak",
      image: "https://images.unsplash.com/photo-1565026057447-bc9082fce004?q=80&w=200&auto=format&fit=crop"
    }
  ];

  return (
    <div className="max-w-[70rem] mx-auto space-y-5 pb-12 font-sans relative">
      
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-[20px] font-bold text-[#1a1a1a]">Ürünler ve Stok</h1>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium text-[#1a1a1a] bg-white border border-[#d2d5d8] rounded-md hover:bg-[#f1f2f4] shadow-sm transition-colors">
            <Download className="h-4 w-4" /> Dışa Aktar
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium text-[#1a1a1a] bg-white border border-[#d2d5d8] rounded-md hover:bg-[#f1f2f4] shadow-sm transition-colors">
            <Upload className="h-4 w-4" /> İçe Aktar
          </button>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium text-white bg-[#008060] border border-[#008060] rounded-md hover:bg-[#006e52] shadow-sm transition-colors"
          >
            <Plus className="h-4 w-4" /> Yeni Ürün Ekle
          </button>
        </div>
      </div>

      {/* Main Card (Table Container) */}
      <div className="bg-white rounded-lg border border-[#e3e3e3] shadow-[0_1px_3px_rgba(0,0,0,0.05)] overflow-hidden">
        
        {/* Tabs */}
        <div className="px-2 pt-2 border-b border-[#e3e3e3] flex text-[14px]">
          <button className="px-4 py-2 font-medium text-[#1a1a1a] border-b-[3px] border-[#008060]">Tümü</button>
          <button className="px-4 py-2 font-medium text-[#5c5f62] border-b-[3px] border-transparent hover:text-[#1a1a1a] hover:bg-[#f1f2f4] rounded-t-lg transition-colors">
            Aktif
          </button>
          <button className="px-4 py-2 font-medium text-[#5c5f62] border-b-[3px] border-transparent hover:text-[#1a1a1a] hover:bg-[#f1f2f4] rounded-t-lg transition-colors">
            Taslak
          </button>
          <button className="px-4 py-2 font-medium text-[#5c5f62] border-b-[3px] border-transparent hover:text-[#1a1a1a] hover:bg-[#f1f2f4] rounded-t-lg transition-colors">
            Arşivlenmiş <ChevronDown className="inline h-3.5 w-3.5 ml-1 opacity-50" />
          </button>
          <button className="px-2 py-2 font-medium text-[#5c5f62] hover:bg-[#f1f2f4] rounded-lg ml-2">
            <Plus className="h-4 w-4" />
          </button>
        </div>

        {/* Filters & Search Row */}
        <div className="px-4 py-3 border-b border-[#e3e3e3] flex items-center gap-3">
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-[16px] w-[16px] text-[#8a8a8a]" />
            <input 
              type="text" 
              placeholder="Ürünleri filtrele" 
              className="w-full bg-[#f1f2f4] border border-[#d2d5d8] text-[13px] pl-10 pr-4 py-1.5 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008060] transition-shadow shadow-inner text-[#1a1a1a]"
            />
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium text-[#1a1a1a] border border-[#d2d5d8] rounded-md border-dashed hover:bg-[#f1f2f4] bg-white transition-colors">
             Marka / Tedarikçi
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium text-[#1a1a1a] border border-[#d2d5d8] rounded-md border-dashed hover:bg-[#f1f2f4] bg-white transition-colors">
             Durum
          </button>
        </div>

        {/* Table itself */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#f9fafb] border-b border-[#e3e3e3] text-[13px] text-[#5c5f62]">
              <tr>
                <th className="py-2 px-3 w-10 text-center">
                  <input type="checkbox" className="rounded accent-[#008060] cursor-pointer" />
                </th>
                <th className="py-2.5 px-4 font-semibold hover:text-[#1a1a1a] cursor-pointer">
                   Ürün
                </th>
                <th className="py-2.5 px-4 font-semibold hover:text-[#1a1a1a] cursor-pointer">Durum</th>
                <th className="py-2.5 px-4 font-semibold hover:text-[#1a1a1a] cursor-pointer">
                  <div className="flex items-center gap-1">Stok Miktarı <ArrowUpDown className="h-3 w-3" /></div>
                </th>
                <th className="py-2.5 px-4 font-semibold hover:text-[#1a1a1a] cursor-pointer min-w-[140px]">Tedarikçi</th>
              </tr>
            </thead>
            <tbody className="text-[13px]">
              {masterProducts.map((prod) => (
                <tr 
                  key={prod.id} 
                  onClick={() => router.push(`/inventory/${prod.id}`)}
                  className="border-b border-[#e3e3e3]/50 hover:bg-[#f1f2f4]/60 cursor-pointer group"
                >
                  <td className="py-2 px-3 text-center border-l-2 border-transparent group-hover:border-l-[#008060]">
                    <input type="checkbox" className="rounded accent-[#008060] cursor-pointer" />
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded border border-[#e3e3e3] overflow-hidden bg-white shrink-0">
                        <img src={prod.image} className="w-full h-full object-cover" alt={prod.name} />
                      </div>
                      <span className="font-semibold text-[#1a1a1a]">{prod.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {prod.status === "Aktif" ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[12px] font-medium bg-[#aee9d1] text-[#006e52]">
                        Aktif
                      </span>
                    ) : prod.status === "Taslak" ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[12px] font-medium bg-[#ffca8a] text-[#8a6116]">
                        Taslak
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[12px] font-medium bg-[#e3e3e3] text-[#5c5f62]">
                        Arşivlendi
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-[#d82c0d] font-medium">
                    <span className={prod.inventory.includes("Stokta yok") ? "text-[#d82c0d]" : "text-[#1a1a1a]"}>
                      {prod.inventory}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[#5c5f62]">
                    {prod.vendor}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer info */}
        <div className="px-4 py-3 bg-[#f9fafb] text-center text-[#5c5f62] text-[13px] border-t border-[#e3e3e3]">
           Toplam 4 ürün gösteriliyor
        </div>

      </div>

      {/* Add Product Side Drawer Overlay */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsAddModalOpen(false)}
          ></div>
          
          {/* Drawer Panel */}
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="px-6 py-4 border-b border-border/50 flex justify-between items-center bg-slate-50">
              <h2 className="text-xl font-bold text-slate-800">Yeni Ürün Ekle</h2>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 hover:bg-slate-200 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Ürün Adı</label>
                <input type="text" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="Kısa kollu gömlek" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Açıklama</label>
                <textarea rows={4} className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="Ürün özelliklerini girin..."></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Fiyat (₺)</label>
                  <input type="number" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Stok (Adet)</label>
                  <input type="number" className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="0" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Kategori / Tedarikçi</label>
                <select className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary">
                  <option>Davut Kundura (Deri Grubu)</option>
                  <option>Ortopedik Tabanlıklar</option>
                  <option>Valiz & Çanta Parçaları</option>
                  <option>Bakım Ekipmanları</option>
                </select>
              </div>

            </div>

            <div className="p-4 border-t border-border/50 bg-slate-50 flex justify-end gap-3">
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 shadow-sm"
              >
                İptal
              </button>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-white bg-[#008060] rounded-md hover:bg-[#006e52] shadow-sm transition-colors"
              >
                Ürünü Kaydet
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
