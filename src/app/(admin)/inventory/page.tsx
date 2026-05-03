"use client";

import { Download, Upload, Plus, ChevronDown, CheckSquare, Search, ArrowUpDown, X, Sparkles, Filter, MoreVertical, Package, Tag, Archive } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ShopifyInventoryPage() {
  const router = useRouter();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Tümü");

  const masterProducts = [
    {
      id: "M-001",
      name: "Davut Klasik Hakiki Deri Kemer",
      vendor: "Davut Kundura",
      inventory: "45 stokta",
      status: "Aktif",
      price: "1,250 ₺",
      image: "https://images.unsplash.com/photo-1624222247344-550fb60eba1c?q=80&w=200&auto=format&fit=crop"
    },
    {
      id: "M-002",
      name: "Ortopedik Tabanlık (Spor Seri)",
      vendor: "Davut Kundura",
      inventory: "120 stok",
      status: "Aktif",
      price: "450 ₺",
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=200&auto=format&fit=crop"
    },
    {
      id: "M-003",
      name: "Profesyonel Süet Temizleme Kiti",
      vendor: "Davut Kundura",
      inventory: "0 (Tükendi)",
      status: "Arşivlendi",
      price: "320 ₺",
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=200&auto=format&fit=crop"
    },
    {
      id: "M-004",
      name: "Valiz Tekerleği Çifti (360 XL)",
      vendor: "Tedarikçi A",
      inventory: "15 stok",
      status: "Taslak",
      price: "850 ₺",
      image: "https://images.unsplash.com/photo-1565026057447-bc9082fce004?q=80&w=200&auto=format&fit=crop"
    }
  ];

  return (
    <div className="max-w-[1400px] mx-auto space-y-8 pb-12 animate-in fade-in duration-1000">
      
      {/* Title & Actions */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-brand font-bold tracking-tight text-[var(--text-primary)]">Koleksiyon & Stok</h1>
            <span className="px-3 py-1 bg-[var(--accent)]/10 text-[var(--accent)] text-[10px] font-black rounded-full uppercase tracking-widest border border-[var(--accent)]/20">Stok Yönetimi</span>
          </div>
          <p className="text-[14px] text-[var(--text-secondary)] font-light italic">"Her ürün bir sanat eseri, her stok bir sözdür."</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-6 py-3 border border-[var(--border)] rounded-xl text-[13px] font-bold text-[var(--text-primary)] bg-white hover:bg-[var(--bg-secondary)] transition-all flex items-center gap-2 shadow-sm">
            <Download size={18} /> Katalog İndir
          </button>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="px-6 py-3 bg-[var(--text-primary)] text-white rounded-xl text-[13px] font-bold hover:bg-[var(--accent)] shadow-xl transition-all flex items-center gap-2 group"
          >
            <Plus size={18} className="group-hover:rotate-90 transition-transform" /> Yeni Ürün Tanımla
          </button>
        </div>
      </div>

      {/* Main Card (Table Container) */}
      <div className="bg-white rounded-[2.5rem] border border-[var(--border)] shadow-sm overflow-hidden">
        
        {/* Tabs - Premium Layout */}
        <div className="px-8 pt-6 border-b border-[var(--border)] flex items-center gap-8 bg-[var(--bg-secondary)]/30">
          {["Tümü", "Aktif", "Taslak", "Arşivlenmiş"].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 px-2 text-[12px] font-black uppercase tracking-widest transition-all relative ${
                activeTab === tab ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[var(--accent)] rounded-full shadow-[0_-2px_10px_var(--accent)] animate-in slide-in-from-bottom-1" />
              )}
            </button>
          ))}
          <button className="mb-4 ml-auto w-10 h-10 flex items-center justify-center bg-white border border-[var(--border)] rounded-xl text-[var(--text-secondary)] hover:text-[var(--accent)] transition-all shadow-sm">
            <Filter size={16} />
          </button>
        </div>

        {/* Filters & Search Row */}
        <div className="px-8 py-6 border-b border-[var(--border)] flex flex-col lg:flex-row items-center gap-6 bg-white/50 backdrop-blur-md">
          <div className="flex-1 w-full lg:max-w-md relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-secondary)] group-focus-within:text-[var(--accent)] transition-colors" />
            <input 
              type="text" 
              placeholder="Ürün kataloğunda ara..." 
              className="w-full bg-white border border-[var(--border)] text-[13px] font-bold pl-12 pr-4 py-3.5 rounded-2xl focus:ring-4 focus:ring-[var(--accent)]/5 focus:border-[var(--accent)] outline-none transition-all shadow-sm"
            />
          </div>
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-5 py-3.5 text-[11px] font-black uppercase tracking-widest text-[var(--text-primary)] border border-[var(--border)] rounded-2xl hover:bg-[var(--bg-secondary)] bg-white transition-all">
               Markalar <ChevronDown size={14} />
            </button>
            <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-5 py-3.5 text-[11px] font-black uppercase tracking-widest text-[var(--text-primary)] border border-[var(--border)] rounded-2xl hover:bg-[var(--bg-secondary)] bg-white transition-all">
               Stok Durumu <ChevronDown size={14} />
            </button>
          </div>
        </div>

        {/* Table itself */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-[var(--bg-secondary)]/20 text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em]">
                <th className="py-6 px-8 w-14 text-center">
                  <input type="checkbox" className="rounded-md accent-[var(--accent)] w-4 h-4 cursor-pointer" />
                </th>
                <th className="py-6 px-8">Ürün Detayı</th>
                <th className="py-6 px-8">Mali Değer</th>
                <th className="py-6 px-8">Envanter Statüsü</th>
                <th className="py-6 px-8">Kategori</th>
                <th className="py-6 px-8 text-right">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {masterProducts.map((prod) => (
                <tr 
                  key={prod.id} 
                  className="group hover:bg-[var(--bg-secondary)]/50 cursor-pointer transition-all duration-300"
                >
                  <td className="py-6 px-8 text-center" onClick={(e) => e.stopPropagation()}>
                    <input type="checkbox" className="rounded-md accent-[var(--accent)] w-4 h-4 cursor-pointer" />
                  </td>
                  <td className="py-6 px-8" onClick={() => router.push(`/inventory/${prod.id}`)}>
                    <div className="flex items-center gap-5">
                      <div className="h-14 w-14 rounded-2xl border border-[var(--border)] overflow-hidden bg-white shrink-0 shadow-sm group-hover:shadow-md transition-all group-hover:scale-105 group-hover:rotate-3">
                        <img src={prod.image} className="w-full h-full object-cover" alt={prod.name} />
                      </div>
                      <div className="space-y-1">
                        <span className="font-bold text-[14px] text-[var(--text-primary)] block tracking-tight group-hover:text-[var(--accent)] transition-colors">{prod.name}</span>
                        <span className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-tighter opacity-50">ID: {prod.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-6 px-8">
                    <span className="font-black text-[15px] text-[var(--text-primary)] font-brand">{prod.price}</span>
                  </td>
                  <td className="py-6 px-8">
                    <div className="space-y-2">
                       {prod.status === "Aktif" ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-green-100 text-green-700 border border-green-200/50">
                          <div className="w-1 h-1 bg-green-500 rounded-full"></div> Aktif
                        </span>
                      ) : prod.status === "Taslak" ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-amber-100 text-amber-700 border border-amber-200/50">
                          <div className="w-1 h-1 bg-amber-500 rounded-full"></div> Taslak
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-gray-100 text-gray-600 border border-gray-200/50">
                          <div className="w-1 h-1 bg-gray-400 rounded-full"></div> Arşiv
                        </span>
                      )}
                      <div className={`text-[12px] font-bold ${prod.inventory.includes("Tükendi") ? "text-red-500" : "text-[var(--text-secondary)]"}`}>
                        {prod.inventory}
                      </div>
                    </div>
                  </td>
                  <td className="py-6 px-8">
                    <div className="flex items-center gap-2 text-[var(--text-secondary)] font-bold text-[13px]">
                      <Tag size={14} className="opacity-40" />
                      {prod.vendor}
                    </div>
                  </td>
                  <td className="py-6 px-8 text-right">
                    <button className="p-3 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] hover:bg-white rounded-xl transition-all border border-transparent hover:border-[var(--border)] shadow-sm">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer info */}
        <div className="px-8 py-6 bg-[var(--bg-secondary)]/10 text-center text-[var(--text-secondary)] font-black text-[11px] uppercase tracking-[0.3em] border-t border-[var(--border)]">
           TOPLAM {masterProducts.length} ÜRÜN LİSTELENİYOR
        </div>

      </div>

      {/* Add Product Side Drawer Overlay - Premium Look */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[1000] flex justify-end">
          <div 
            className="absolute inset-0 bg-[var(--text-primary)]/40 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
            onClick={() => setIsAddModalOpen(false)}
          ></div>
          
          <div className="relative w-full max-w-xl bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-500 border-l border-white/20">
            <div className="px-10 py-8 border-b border-[var(--border)] flex justify-between items-center bg-[var(--bg-secondary)]/50">
              <div className="space-y-1">
                <h2 className="text-2xl font-brand font-bold text-[var(--text-primary)]">Koleksiyona Ekle</h2>
                <p className="text-[12px] text-[var(--text-secondary)] font-medium uppercase tracking-widest">Yeni Sanat Eseri Tanımı</p>
              </div>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="w-12 h-12 flex items-center justify-center hover:bg-white rounded-full text-[var(--text-secondary)] transition-all border border-transparent hover:border-[var(--border)] shadow-sm"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-10 space-y-10 scrollbar-hide">
              
              <div className="space-y-3">
                <label className="text-[11px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em]">ÜRÜN İSMİ</label>
                <input type="text" className="w-full bg-[var(--bg-secondary)] border border-transparent focus:bg-white focus:border-[var(--accent)] rounded-2xl px-5 py-4 text-[16px] font-bold text-[var(--text-primary)] outline-none transition-all shadow-inner" placeholder="Lüks Deri Oxford..." />
              </div>

              <div className="space-y-3">
                <label className="text-[11px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em]">AÇIKLAMA & HİKAYE</label>
                <textarea rows={4} className="w-full bg-[var(--bg-secondary)] border border-transparent focus:bg-white focus:border-[var(--accent)] rounded-2xl px-5 py-4 text-[15px] font-medium text-[var(--text-primary)] outline-none transition-all shadow-inner leading-relaxed" placeholder="Bu ürünün zanaat detaylarını anlatın..."></textarea>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em]">SATIŞ FİYATI (₺)</label>
                  <input type="number" className="w-full bg-[var(--bg-secondary)] border border-transparent focus:bg-white focus:border-[var(--accent)] rounded-2xl px-5 py-4 text-[18px] font-black font-brand outline-none transition-all shadow-inner" placeholder="0.00" />
                </div>
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em]">BAŞLANGIÇ STOK</label>
                  <input type="number" className="w-full bg-[var(--bg-secondary)] border border-transparent focus:bg-white focus:border-[var(--accent)] rounded-2xl px-5 py-4 text-[18px] font-black font-brand outline-none transition-all shadow-inner" placeholder="0" />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[11px] font-black text-[var(--text-secondary)] uppercase tracking-[0.2em]">KATEGORİ & KOLEKSİYON</label>
                <div className="relative group">
                  <select className="w-full bg-[var(--bg-secondary)] border border-transparent focus:bg-white focus:border-[var(--accent)] rounded-2xl px-5 py-4 text-[14px] font-bold text-[var(--text-primary)] outline-none transition-all shadow-inner appearance-none">
                    <option>Davut Kundura (Deri Grubu)</option>
                    <option>Ortopedik Tabanlıklar</option>
                    <option>Valiz & Çanta Parçaları</option>
                    <option>Bakım Ekipmanları</option>
                  </select>
                  <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] pointer-events-none" size={18} />
                </div>
              </div>

              <div className="p-8 rounded-[2rem] bg-[var(--bg-secondary)]/50 border border-dashed border-[var(--border)] flex flex-col items-center justify-center gap-4 group hover:bg-white hover:border-[var(--accent)] transition-all cursor-pointer">
                 <div className="w-16 h-16 rounded-3xl bg-white border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] group-hover:text-[var(--accent)] group-hover:scale-110 transition-all shadow-sm">
                    <Plus size={32} />
                 </div>
                 <div className="text-center">
                    <p className="text-[13px] font-black text-[var(--text-primary)] uppercase tracking-widest">Görsel Yükle</p>
                    <p className="text-[11px] text-[var(--text-secondary)] font-medium mt-1">Stüdyo çekimlerini buraya bırakın</p>
                 </div>
              </div>

            </div>

            <div className="p-10 border-t border-[var(--border)] bg-[var(--bg-secondary)]/50 flex justify-end gap-4">
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="flex-1 py-4 text-[14px] font-bold text-[var(--text-primary)] bg-white border border-[var(--border)] rounded-2xl hover:bg-white hover:shadow-md transition-all shadow-sm"
              >
                İptal
              </button>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="flex-1 py-4 text-[14px] font-bold text-white bg-[var(--text-primary)] rounded-2xl hover:bg-[var(--accent)] shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <Sparkles size={18} /> Tanımlamayı Tamamla
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
