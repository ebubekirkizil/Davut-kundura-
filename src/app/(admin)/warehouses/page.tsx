"use client";

import { useState } from "react";
import { Warehouse, MapPin, Package, ArrowRightLeft, Search, Plus, Building, AlertTriangle } from "lucide-react";

export default function WarehousesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const warehouses = [
    { id: "1", code: "WH-IST-01", name: "Merkez Depo (İstanbul)", manager: "Ali K.", capacity: "85%", totalStock: 12450, status: "Aktif", alerts: 2 },
    { id: "2", code: "WH-IZM-01", name: "Ege Bölge Depo (İzmir)", manager: "Ayşe Y.", capacity: "42%", totalStock: 3200, status: "Aktif", alerts: 0 },
    { id: "3", code: "WH-ANK-01", name: "İç Anadolu Dağıtım (Ankara)", manager: "Mehmet T.", capacity: "95%", totalStock: 8900, status: "Kritik", alerts: 15 },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12 font-sans">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-[22px] font-bold text-[#1a1a1a] flex items-center gap-2">
            <Warehouse className="w-6 h-6 text-blue-600" /> Çoklu Depo Yönetimi
          </h1>
          <p className="text-[13px] text-[#5c5f62] mt-1">Farklı şehirlerdeki depolar arası stok transferi ve kapasite takibi.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-[#d2d5d8] rounded-md text-[13px] font-medium text-[#1a1a1a] bg-white hover:bg-[#f1f2f4] flex items-center gap-2">
            <ArrowRightLeft className="w-4 h-4" /> Transfer Emri
          </button>
          <button className="px-4 py-2 bg-blue-600 rounded-md text-[13px] font-medium text-white hover:bg-blue-700 flex items-center gap-2">
            <Plus className="w-4 h-4" /> Yeni Depo Ekle
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {warehouses.map(wh => (
          <div key={wh.id} className="bg-white border border-[#e3e3e3] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className={`p-4 border-b flex justify-between items-start ${wh.status === 'Kritik' ? 'bg-red-50 border-red-100' : 'bg-slate-50 border-slate-100'}`}>
               <div>
                 <div className="flex items-center gap-1.5 mb-1">
                   <Building className={`w-4 h-4 ${wh.status === 'Kritik' ? 'text-red-500' : 'text-blue-500'}`} />
                   <h3 className="font-bold text-[15px] text-[#1a1a1a]">{wh.name}</h3>
                 </div>
                 <span className="text-[11px] font-mono bg-white px-1.5 py-0.5 rounded border text-[#5c5f62]">{wh.code}</span>
               </div>
               {wh.alerts > 0 && (
                 <span className="flex items-center gap-1 text-[11px] font-bold text-red-600 bg-red-100 px-2 py-1 rounded-full">
                   <AlertTriangle className="w-3 h-3" /> {wh.alerts} Uyarı
                 </span>
               )}
            </div>
            
            <div className="p-4 space-y-4">
               <div className="flex justify-between items-center">
                 <span className="text-[12px] text-[#5c5f62] flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> Yönetici:</span>
                 <span className="text-[13px] font-medium text-[#1a1a1a]">{wh.manager}</span>
               </div>
               <div className="flex justify-between items-center">
                 <span className="text-[12px] text-[#5c5f62] flex items-center gap-1"><Package className="w-3.5 h-3.5" /> Toplam Ürün:</span>
                 <span className="text-[13px] font-bold text-[#1a1a1a]">{wh.totalStock.toLocaleString('tr-TR')} Çift</span>
               </div>
               
               <div>
                 <div className="flex justify-between text-[11px] mb-1.5 font-medium">
                   <span className="text-[#5c5f62]">Doluluk Oranı</span>
                   <span className={wh.status === 'Kritik' ? 'text-red-600' : 'text-blue-600'}>{wh.capacity}</span>
                 </div>
                 <div className="w-full bg-[#f1f2f4] rounded-full h-2">
                   <div 
                     className={`h-2 rounded-full ${wh.status === 'Kritik' ? 'bg-red-500' : 'bg-blue-500'}`} 
                     style={{ width: wh.capacity }}
                   ></div>
                 </div>
               </div>
               
               <button className="w-full py-2 bg-[#f9fafb] border border-[#e3e3e3] rounded text-[12px] font-semibold text-[#1a1a1a] hover:bg-white hover:border-blue-400 transition-colors">
                 Depo İçeriğini Görüntüle
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
