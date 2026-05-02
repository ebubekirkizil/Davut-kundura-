"use client";

import { useState } from "react";
import { 
  Factory, 
  Scissors, 
  CheckCircle2, 
  Search, 
  Plus, 
  ArrowRight, 
  AlertCircle, 
  Clock, 
  PackageSearch,
  Filter,
  Download
} from "lucide-react";

// Kanban Data Types
type ProductionStage = "PLANNING" | "CUTTING" | "SEWING" | "ASSEMBLY" | "QUALITY";

interface ProductionItem {
  id: string;
  orderNo: string;
  productName: string;
  quantity: number;
  stage: ProductionStage;
  dueDate: string;
  priority: "Normal" | "Acil" | "Kritik";
}

// Initial Mock Data
const initialProductionItems: ProductionItem[] = [
  { id: "1", orderNo: "PRD-001", productName: "Siyah Deri Oxford (42)", quantity: 15, stage: "PLANNING", dueDate: "28 Ekm", priority: "Normal" },
  { id: "2", orderNo: "PRD-002", productName: "Kahverengi Loafer (41)", quantity: 5, stage: "PLANNING", dueDate: "26 Ekm", priority: "Acil" },
  { id: "3", orderNo: "PRD-003", productName: "Klasik Kemer (Siyah)", quantity: 50, stage: "CUTTING", dueDate: "25 Ekm", priority: "Normal" },
  { id: "4", orderNo: "PRD-004", productName: "Timsah Desenli Ayakkabı (43)", quantity: 2, stage: "SEWING", dueDate: "24 Ekm", priority: "Kritik" },
  { id: "5", orderNo: "PRD-005", productName: "Hakiki Deri Çizme (39)", quantity: 8, stage: "ASSEMBLY", dueDate: "27 Ekm", priority: "Normal" },
  { id: "6", orderNo: "PRD-006", productName: "Günlük Süet Bot (40)", quantity: 12, stage: "QUALITY", dueDate: "24 Ekm", priority: "Acil" },
];

export default function ProductionDashboard() {
  const [items, setItems] = useState<ProductionItem[]>(initialProductionItems);
  const [searchTerm, setSearchTerm] = useState("");

  const stages: { key: ProductionStage; label: string; color: string; icon: any }[] = [
    { key: "PLANNING", label: "1. Planlama", color: "bg-slate-100 border-slate-300 text-slate-700", icon: Clock },
    { key: "CUTTING", label: "2. Kesim", color: "bg-orange-50 border-orange-200 text-orange-700", icon: Scissors },
    { key: "SEWING", label: "3. Dikim", color: "bg-blue-50 border-blue-200 text-blue-700", icon: Factory },
    { key: "ASSEMBLY", label: "4. Montaj / Taban", color: "bg-purple-50 border-purple-200 text-purple-700", icon: PackageSearch },
    { key: "QUALITY", label: "5. Kalite Kontrol", color: "bg-green-50 border-green-200 text-green-700", icon: CheckCircle2 },
  ];

  // Move item to next stage
  const moveNext = (id: string) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const stageOrder: ProductionStage[] = ["PLANNING", "CUTTING", "SEWING", "ASSEMBLY", "QUALITY"];
        const currentIndex = stageOrder.indexOf(item.stage);
        if (currentIndex < stageOrder.length - 1) {
          return { ...item, stage: stageOrder[currentIndex + 1] };
        }
      }
      return item;
    }));
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case "Kritik": return "bg-red-100 text-red-700 border-red-200";
      case "Acil": return "bg-orange-100 text-orange-700 border-orange-200";
      default: return "bg-slate-100 text-slate-600 border-slate-200";
    }
  };

  const filteredItems = items.filter(i => i.productName.toLowerCase().includes(searchTerm.toLowerCase()) || i.orderNo.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 pb-12 font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-[22px] font-bold text-[#1a1a1a] flex items-center gap-2">
            <Factory className="w-6 h-6 text-orange-600" /> Atölye & Üretim Merkezi
          </h1>
          <p className="text-[13px] text-[#5c5f62] mt-1">Davut Kundura ayakkabı üretim bantlarını ve hammadde durumunu canlı yönetin.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 border border-[#d2d5d8] bg-white rounded-md text-[13px] font-medium text-[#1a1a1a] shadow-sm hover:bg-[#f1f2f4] flex items-center gap-1.5 transition-colors">
            <Download className="h-4 w-4" /> Excel Raporu
          </button>
          <button className="px-3 py-1.5 bg-[#1a1a1a] rounded-md text-[13px] font-medium text-white shadow-sm hover:bg-black flex items-center gap-1.5 transition-colors">
            <Plus className="h-4 w-4" /> Yeni Üretim Emri
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-[#e3e3e3] rounded-lg p-4 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
            <Factory className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-[12px] font-medium text-[#5c5f62] uppercase tracking-wider">Aktif Üretim</p>
            <p className="text-[24px] font-bold text-[#1a1a1a]">82 <span className="text-[14px] text-[#8a8a8a] font-normal">Çift</span></p>
          </div>
        </div>
        <div className="bg-white border border-[#e3e3e3] rounded-lg p-4 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
            <AlertCircle className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <p className="text-[12px] font-medium text-[#5c5f62] uppercase tracking-wider">Kritik Stok Uyarıları</p>
            <p className="text-[24px] font-bold text-[#1a1a1a]">2 <span className="text-[14px] text-[#8a8a8a] font-normal">Hammadde</span></p>
          </div>
        </div>
        <div className="bg-white border border-[#e3e3e3] rounded-lg p-4 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-[12px] font-medium text-[#5c5f62] uppercase tracking-wider">Bu Ay Tamamlanan</p>
            <p className="text-[24px] font-bold text-[#1a1a1a]">450 <span className="text-[14px] text-[#8a8a8a] font-normal">Çift</span></p>
          </div>
        </div>
        <div className="bg-white border border-[#e3e3e3] rounded-lg p-4 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
            <PackageSearch className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <p className="text-[12px] font-medium text-[#5c5f62] uppercase tracking-wider">Hammadde Deposu</p>
            <p className="text-[24px] font-bold text-[#1a1a1a]">%85 <span className="text-[14px] text-[#8a8a8a] font-normal">Dolu</span></p>
          </div>
        </div>
      </div>

      {/* Raw Material Mini View */}
      <div className="bg-white border border-[#e3e3e3] rounded-lg shadow-sm">
        <div className="px-4 py-3 border-b border-[#e3e3e3] flex justify-between items-center bg-[#f9fafb] rounded-t-lg">
          <h2 className="font-semibold text-[14px] text-[#1a1a1a]">Kritik Hammadde Stokları</h2>
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="flex justify-between text-[12px] mb-1">
              <span className="font-medium text-[#1a1a1a]">Birinci Sınıf Siyah Deri</span>
              <span className="font-bold text-orange-600">45 m² Kaldı</span>
            </div>
            <div className="w-full bg-[#f1f2f4] rounded-full h-2"><div className="bg-orange-400 h-2 rounded-full w-[20%]"></div></div>
          </div>
          <div>
            <div className="flex justify-between text-[12px] mb-1">
              <span className="font-medium text-[#1a1a1a]">Kauçuk Taban (No: 42)</span>
              <span className="font-bold text-red-600">12 Çift Kaldı</span>
            </div>
            <div className="w-full bg-[#f1f2f4] rounded-full h-2"><div className="bg-red-500 h-2 rounded-full w-[10%]"></div></div>
          </div>
          <div>
            <div className="flex justify-between text-[12px] mb-1">
              <span className="font-medium text-[#1a1a1a]">İç Astar Malzemesi</span>
              <span className="font-bold text-[#008060]">120 m² Mevcut</span>
            </div>
            <div className="w-full bg-[#f1f2f4] rounded-full h-2"><div className="bg-[#008060] h-2 rounded-full w-[80%]"></div></div>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="bg-white border border-[#e3e3e3] rounded-lg shadow-sm flex flex-col h-[600px]">
        <div className="px-4 py-3 border-b border-[#e3e3e3] flex flex-wrap gap-4 justify-between items-center">
          <h2 className="font-semibold text-[15px] text-[#1a1a1a]">Üretim Bantı (Kanban)</h2>
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8a8a8a]" />
              <input 
                type="text" 
                placeholder="Ürün adı veya emir no ara..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 border border-[#d2d5d8] bg-[#f9fafb] rounded-md text-[13px] focus:ring-1 focus:ring-[#008060] outline-none" 
              />
            </div>
            <button className="px-3 py-1.5 border border-[#d2d5d8] bg-white rounded-md text-[#5c5f62] hover:bg-[#f1f2f4] flex items-center justify-center transition-colors">
              <Filter className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 p-4 overflow-x-auto bg-[#f9fafb]">
          <div className="flex gap-4 h-full min-w-[1000px]">
            {stages.map((stage) => {
              const stageItems = filteredItems.filter(i => i.stage === stage.key);
              const Icon = stage.icon;
              
              return (
                <div key={stage.key} className="flex-1 flex flex-col bg-white border border-[#e3e3e3] rounded-lg shadow-sm overflow-hidden flex-shrink-0">
                  {/* Stage Header */}
                  <div className={`px-3 py-2.5 border-b flex items-center justify-between ${stage.color}`}>
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      <span className="font-semibold text-[13px]">{stage.label}</span>
                    </div>
                    <span className="bg-white/50 px-2 py-0.5 rounded-full text-[11px] font-bold">
                      {stageItems.length}
                    </span>
                  </div>

                  {/* Stage Content */}
                  <div className="flex-1 p-2 space-y-2 overflow-y-auto">
                    {stageItems.length === 0 ? (
                      <div className="h-full flex items-center justify-center text-[12px] text-[#8a8a8a] italic">Boş</div>
                    ) : (
                      stageItems.map(item => (
                        <div key={item.id} className="bg-white border border-[#e3e3e3] p-3 rounded shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:border-blue-400 transition-colors group">
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-[11px] font-mono font-bold text-[#8a8a8a] bg-[#f1f2f4] px-1.5 py-0.5 rounded">{item.orderNo}</span>
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${getPriorityColor(item.priority)}`}>
                              {item.priority}
                            </span>
                          </div>
                          <h4 className="font-semibold text-[13px] text-[#1a1a1a] leading-tight mb-1">{item.productName}</h4>
                          <div className="flex items-center justify-between mt-3">
                            <div className="text-[11px] text-[#5c5f62] flex items-center gap-1">
                              <span className="font-bold text-[#1a1a1a]">{item.quantity}</span> Çift
                            </div>
                            <div className="text-[11px] text-[#8a8a8a]">
                              Teslim: <span className="font-medium text-[#5c5f62]">{item.dueDate}</span>
                            </div>
                          </div>
                          
                          {/* Next Stage Button */}
                          {stage.key !== "QUALITY" && (
                            <button 
                              onClick={() => moveNext(item.id)}
                              className="mt-3 w-full py-1.5 flex items-center justify-center gap-1 text-[11px] font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded opacity-0 group-hover:opacity-100 transition-all border border-blue-200"
                            >
                              Sonraki Aşama <ArrowRight className="w-3 h-3" />
                            </button>
                          )}
                          {stage.key === "QUALITY" && (
                            <button 
                              onClick={() => setItems(items.filter(i => i.id !== item.id))}
                              className="mt-3 w-full py-1.5 flex items-center justify-center gap-1 text-[11px] font-semibold text-green-600 bg-green-50 hover:bg-green-100 rounded opacity-0 group-hover:opacity-100 transition-all border border-green-200"
                            >
                              Stoka Ekle <CheckCircle2 className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
}
