"use client"

import * as React from "react"
import { 
  LayoutGrid, List, Search, Filter, Plus, 
  Package, Box, Ruler, AlertTriangle, MoreVertical,
  Warehouse as WarehouseIcon, RefreshCw, MapPin, 
  ChevronDown, History, BarChart3, Settings
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import Link from "next/link"
import { toast } from "sonner"
import { motion, AnimatePresence } from "framer-motion"

// --- TYPES ---
interface Material {
  id: string;
  name: string;
  sku: string | null;
  unit: string;
  stockQty: number;
  costPerUnit: number;
  supplier?: { name: string };
  category?: string; 
  shelfLoc?: string; 
}

const MOCK_MATERIALS: Material[] = [
  { id: "m1", name: "Vaketa Deri - Taba (2.0mm)", sku: "RAW-LEA-001", unit: "M2", stockQty: 124, costPerUnit: 1450, supplier: { name: "Hakiki Deri A.Ş." }, category: "Deri / Kumaş", shelfLoc: "A1-04" },
  { id: "m2", name: "Kauçuk Hazır Taban - Sport", sku: "RAW-SOL-002", unit: "ADET", stockQty: 450, costPerUnit: 185, supplier: { name: "Taban Sanayi Ltd." }, category: "Taban / Topuk", shelfLoc: "B2-12" },
  { id: "m3", name: "Mumlanmış Pamuk Bağcık (80cm)", sku: "RAW-ACC-003", unit: "ADET", stockQty: 1200, costPerUnit: 12, supplier: { name: "Aksesuar Dünyası" }, category: "Aksesuar", shelfLoc: "C1-05" },
  { id: "m4", name: "Premium Ayakkabı Kutusu (L)", sku: "RAW-BOX-004", unit: "ADET", stockQty: 85, costPerUnit: 45, supplier: { name: "Ambalaj Sanayi" }, category: "Kutu / Ambalaj", shelfLoc: "D4-01" },
  { id: "m5", name: "Neolit Kösele Plaka (100x120)", sku: "RAW-SOL-005", unit: "M2", stockQty: 15, costPerUnit: 2200, supplier: { name: "Taban Sanayi Ltd." }, category: "Taban / Topuk", shelfLoc: "B3-04" },
  { id: "m6", name: "Süet Boyası - Koyu Kahve", sku: "RAW-CHE-006", unit: "ADET", stockQty: 24, costPerUnit: 95, supplier: { name: "Kimya Deposu" }, category: "Kimyasallar", shelfLoc: "E1-02" },
  { id: "m7", name: "Pirinç Toka - 2.5cm", sku: "RAW-ACC-007", unit: "ADET", stockQty: 800, costPerUnit: 18, supplier: { name: "Aksesuar Dünyası" }, category: "Aksesuar", shelfLoc: "C2-08" },
  { id: "m8", name: "Lateks İç Ped (4mm)", sku: "RAW-MAT-008", unit: "M2", stockQty: 60, costPerUnit: 340, supplier: { name: "Malzeme Tedarik" }, category: "Sarf Malzeme", shelfLoc: "F1-10" },
  { id: "m9", name: "Kromajlı Fermuar - 15cm", sku: "RAW-ACC-009", unit: "ADET", stockQty: 350, costPerUnit: 24, supplier: { name: "Aksesuar Dünyası" }, category: "Aksesuar", shelfLoc: "C1-14" },
  { id: "m10", name: "Napa Deri - Mat Siyah", sku: "RAW-LEA-010", unit: "M2", stockQty: 8, costPerUnit: 1680, supplier: { name: "Hakiki Deri A.Ş." }, category: "Deri / Kumaş", shelfLoc: "A1-15" },
  { id: "m11", name: "Polisaj Pastası (Siyah)", sku: "RAW-CHE-011", unit: "ADET", stockQty: 12, costPerUnit: 145, supplier: { name: "Kimya Deposu" }, category: "Kimyasallar", shelfLoc: "E1-05" },
  { id: "m12", name: "Ambalaj Pelür Kağıdı", sku: "RAW-BOX-012", unit: "KG", stockQty: 45, costPerUnit: 110, supplier: { name: "Ambalaj Sanayi" }, category: "Kutu / Ambalaj", shelfLoc: "D4-05" },
  { id: "m13", name: "Çelik Bel Demiri (Kadın)", sku: "RAW-MAT-013", unit: "ADET", stockQty: 2500, costPerUnit: 4.5, supplier: { name: "Metal Sanayi" }, category: "Sarf Malzeme", shelfLoc: "F2-22" },
  { id: "m14", name: "Anilin Deri - Bordo", sku: "RAW-LEA-014", unit: "M2", stockQty: 42, costPerUnit: 1950, supplier: { name: "Hakiki Deri A.Ş." }, category: "Deri / Kumaş", shelfLoc: "A2-02" },
  { id: "m15", name: "Ahşap Topuk - 7cm", sku: "RAW-SOL-015", unit: "ADET", stockQty: 120, costPerUnit: 85, supplier: { name: "Taban Sanayi Ltd." }, category: "Taban / Topuk", shelfLoc: "B4-09" },
]

export default function AdminWarehousePage() {
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid")
  const [activeTab, setActiveTab] = React.useState<"all" | "finished" | "raw">("all")
  const [loading, setLoading] = React.useState(true)
  const [materials, setMaterials] = React.useState<Material[]>(MOCK_MATERIALS)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState("Tümü")

  const categories = ["Tümü", "Deri / Kumaş", "Taban / Topuk", "Aksesuar", "Kutu / Ambalaj", "Kimyasallar"]

  const fetchData = React.useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/admin/warehouse/materials")
      if (res.ok) {
        const data = await res.json()
        if (data.materials && data.materials.length > 0) {
          setMaterials(data.materials)
        }
      }
    } catch (error) {
      // API hatasında mock data ile devam et
    } finally {
      setLoading(false)
    }
  }, [])

  React.useEffect(() => {
    fetchData()
  }, [fetchData])

  const filteredMaterials = materials.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         (m.sku?.toLowerCase().includes(searchQuery.toLowerCase()) || false)
    const matchesCategory = selectedCategory === "Tümü" || m.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-8 p-6 max-w-[1600px] mx-auto text-slate-800 dark:text-slate-100 font-sans">
      {/* Üst Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-serif font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
            <WarehouseIcon className="h-10 w-10 text-amber-500" />
            Kurumsal Envanter
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg font-medium font-sans">Tüm materyaller, hammaddeler ve depo lokasyon takibi</p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Görünüm Seçici */}
          <div className="bg-slate-100/80 dark:bg-slate-900/60 p-1 rounded-xl flex gap-1 mr-2 shadow-inner border border-slate-200 dark:border-white/10 backdrop-blur-md">
            <Button 
              variant={viewMode === "grid" ? "white" : "ghost"} 
              size="sm" 
              onClick={() => setViewMode("grid")}
              className={`px-3 h-8 rounded-lg transition-all ${
                viewMode === "grid" 
                ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm border border-slate-200/50 dark:border-white/5" 
                : "text-slate-500 dark:text-slate-400"
              }`}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button 
              variant={viewMode === "list" ? "white" : "ghost"} 
              size="sm" 
              onClick={() => setViewMode("list")}
              className={`px-3 h-8 rounded-lg transition-all ${
                viewMode === "list" 
                ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm border border-slate-200/50 dark:border-white/5" 
                : "text-slate-500 dark:text-slate-400"
              }`}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          <Button 
            variant="outline" 
            onClick={fetchData} 
            className="h-10 bg-white/70 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 text-slate-800 dark:text-slate-200 shadow-sm"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} /> Yenile
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="h-10 flex items-center justify-center bg-slate-900 dark:bg-amber-500 text-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-amber-400 shadow-lg shadow-slate-900/10 dark:shadow-amber-500/10 px-6 rounded-xl font-bold transition-all text-sm"
              >
                <Plus className="h-4 w-4 mr-2 stroke-[3]" /> Yeni Kayıt <ChevronDown className="h-3.5 w-3.5 ml-2" />
              </motion.button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border border-slate-200 dark:border-white/10 shadow-2xl rounded-2xl p-1.5">
              <DropdownMenuItem asChild className="cursor-pointer rounded-lg p-2.5 font-semibold text-xs transition-colors">
                <Link href="/admin/warehouse/materials/new" className="flex items-center">
                  <Box className="h-4 w-4 mr-2.5 text-amber-500" /> Hammadde / Sarf Malzeme
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer rounded-lg p-2.5 font-semibold text-xs transition-colors">
                <Link href="/admin/products/new" className="flex items-center">
                  <Package className="h-4 w-4 mr-2.5 text-blue-500" /> Bitmiş Ürün
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-slate-100 dark:bg-white/5" />
              <DropdownMenuItem className="cursor-pointer rounded-lg p-2.5 font-semibold text-xs transition-colors flex items-center text-slate-700 dark:text-slate-300">
                <WarehouseIcon className="h-4 w-4 mr-2.5 text-emerald-500" /> Yeni Depo Tanımla
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* KPI Şeridi */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Toplam Malzeme", value: materials.length, icon: Box, color: "text-blue-600 dark:text-blue-400 bg-blue-500/5 dark:bg-blue-500/10 border-blue-500/10 dark:border-blue-500/20" },
          { label: "Düşük Stok", value: "8", icon: AlertTriangle, color: "text-red-600 dark:text-rose-400 bg-rose-500/5 dark:bg-rose-500/10 border-rose-500/10 dark:border-rose-500/20" },
          { label: "Toplam Değer", value: "₺2.4M", icon: BarChart3, color: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 dark:bg-emerald-500/10 border-emerald-500/10 dark:border-emerald-500/20" },
          { label: "Aktif Depo", value: "3", icon: MapPin, color: "text-amber-600 dark:text-amber-400 bg-amber-500/5 dark:bg-amber-500/10 border-amber-500/10 dark:border-amber-500/20" },
        ].map((stat, i) => (
          <Card key={i} className="bg-white/70 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/80 dark:border-white/5 shadow-lg shadow-slate-200/20 dark:shadow-black/40 rounded-3xl overflow-hidden group hover:shadow-2xl hover:border-slate-300/80 dark:hover:border-white/10 transition-all duration-300">
            <CardContent className="p-5 flex items-center gap-4">
              <div className={`p-3 rounded-2xl ${stat.color} border transition-transform duration-300 group-hover:scale-110`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{stat.value}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mt-0.5">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bölüm Seçimi & Filtreler */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sol: Kategori Navigasyonu */}
        <div className="lg:w-64 space-y-2 shrink-0">
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-2 mb-3">Bölümler</p>
          {[
            { id: "all", label: "Tüm Envanter", icon: LayoutGrid },
            { id: "finished", label: "Bitmiş Ürünler", icon: Package },
            { id: "raw", label: "Hammaddeler", icon: Box },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                activeTab === tab.id 
                ? "bg-slate-900 dark:bg-amber-500 text-white dark:text-slate-950 shadow-lg shadow-slate-900/10 dark:shadow-amber-500/10" 
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100/75 dark:hover:bg-white/5"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
          
          <div className="pt-6">
            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-2 mb-3">Kategoriler</p>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-xs font-bold transition-all rounded-xl ${
                  selectedCategory === cat 
                  ? "text-amber-600 dark:text-amber-400 font-extrabold bg-amber-500/5 dark:bg-amber-500/10" 
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50/50 dark:hover:bg-white/[0.02]"
                }`}
              >
                {cat}
                {selectedCategory === cat && <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />}
              </button>
            ))}
          </div>
        </div>

        {/* Sağ: İçerik Alanı */}
        <div className="flex-1 space-y-6">
          <Card className="bg-white/70 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/80 dark:border-white/5 shadow-lg shadow-slate-200/20 dark:shadow-black/40 rounded-3xl">
            <CardContent className="p-4 flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
                <Input 
                  placeholder="Ürün, hammadde, SKU veya lokasyon ara..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-10 bg-slate-50 dark:bg-slate-950/40 border-slate-200 dark:border-white/10 focus:bg-white dark:focus:bg-slate-950 transition-all text-slate-800 dark:text-slate-200 rounded-xl" 
                />
              </div>
              <Button 
                variant="outline" 
                className="h-10 border-slate-200 dark:border-white/10 bg-white/70 dark:bg-slate-900/40 hover:bg-slate-50 dark:hover:bg-white/5 text-slate-800 dark:text-slate-200 rounded-xl font-bold"
              >
                <Filter className="h-4 w-4 mr-2" /> Gelişmiş Filtrele
              </Button>
            </CardContent>
          </Card>

          <AnimatePresence mode="popLayout">
            {loading ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {[1,2,3,4,5,6].map(i => (
                  <div key={i} className="h-64 bg-slate-100/50 dark:bg-slate-900/25 border border-slate-200/50 dark:border-white/5 animate-pulse rounded-3xl" />
                ))}
              </motion.div>
            ) : filteredMaterials.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-20 bg-white/70 dark:bg-slate-900/40 border border-slate-200/80 dark:border-white/5 border-dashed rounded-3xl shadow-sm"
              >
                <Box className="h-16 w-16 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
                <p className="text-slate-500 dark:text-slate-400 text-lg font-bold">Aranan kriterlere uygun malzeme bulunamadı.</p>
              </motion.div>
            ) : viewMode === "grid" ? (
              <motion.div 
                layout
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                {filteredMaterials.map((m) => (
                  <motion.div
                    layout
                    key={m.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  >
                    <Card className="group overflow-hidden border border-slate-200 dark:border-white/5 shadow-md bg-white/70 dark:bg-slate-900/40 backdrop-blur-md hover:shadow-2xl dark:hover:shadow-black/40 hover:-translate-y-1 hover:border-amber-500/30 dark:hover:border-amber-500/30 transition-all duration-300 rounded-3xl">
                      <div className="h-44 bg-slate-50/50 dark:bg-black/20 flex items-center justify-center relative group-hover:bg-slate-100/50 dark:group-hover:bg-black/35 transition-colors">
                        <Box className="h-16 w-16 text-slate-200 dark:text-slate-800 group-hover:text-amber-500/50 dark:group-hover:text-amber-400/50 transition-colors" />
                        <div className="absolute top-3 left-3 flex gap-2">
                          <Badge className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/5 shadow-sm font-bold text-[10px]">
                            {m.unit}
                          </Badge>
                        </div>
                        <div className="absolute bottom-3 right-3">
                          <Badge className={`border font-black text-[10px] ${
                            m.stockQty < 15 
                            ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/10" 
                            : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/10"
                          }`}>
                            {m.stockQty < 15 ? "Düşük Stok" : "Stokta"}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-5">
                        <div className="flex justify-between items-start mb-4">
                          <div className="min-w-0">
                            <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors truncate">{m.name}</h3>
                            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono mt-1 tracking-tight font-bold">{m.sku || "SKU_BELİRTİLMEDİ"}</p>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg"><MoreVertical className="h-4 w-4" /></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-xl p-1 shadow-xl">
                              <DropdownMenuItem className="cursor-pointer font-bold text-xs rounded-lg p-2">Düzenle</DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer font-bold text-xs rounded-lg p-2">Stok Hareketi</DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer font-bold text-xs rounded-lg p-2 text-red-600 focus:text-red-600">Sil</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-white/5">
                          <div>
                            <p className="text-[9px] uppercase text-slate-400 dark:text-slate-500 font-extrabold tracking-widest mb-1">Mevcut Stok</p>
                            <p className="text-xl font-black text-slate-800 dark:text-slate-100">{m.stockQty.toLocaleString("tr-TR")} <span className="text-xs font-normal text-slate-400 dark:text-slate-500">{m.unit}</span></p>
                          </div>
                          <div className="text-right">
                            <p className="text-[9px] uppercase text-slate-400 dark:text-slate-500 font-extrabold tracking-widest mb-1">Lokasyon</p>
                            <div className="flex items-center justify-end gap-1 text-slate-600 dark:text-slate-300 font-bold text-sm">
                              <MapPin className="h-3.5 w-3.5 text-amber-500 dark:text-amber-400" />
                              <span>{m.shelfLoc || "—"}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
              >
                <Card className="overflow-hidden border border-slate-200 dark:border-white/5 shadow-lg bg-white/70 dark:bg-slate-900/40 backdrop-blur-md rounded-3xl">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-slate-50/50 dark:bg-black/20 text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold tracking-widest border-b border-slate-200 dark:border-white/5">
                        <tr>
                          <th className="px-6 py-4">Malzeme Bilgisi</th>
                          <th className="px-6 py-4">Kategori</th>
                          <th className="px-6 py-4">Stok Durumu</th>
                          <th className="px-6 py-4">Birim Maliyet</th>
                          <th className="px-6 py-4">Lokasyon</th>
                          <th className="px-6 py-4 text-right">İşlem</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-white/5 font-sans">
                        {filteredMaterials.map(m => (
                          <tr key={m.id} className="hover:bg-slate-100/50 dark:hover:bg-white/[0.02] transition-colors group">
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center group-hover:bg-white dark:group-hover:bg-slate-800 transition-colors">
                                    <Box className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                                  </div>
                                  <div>
                                    <p className="font-bold text-slate-800 dark:text-slate-200">{m.name}</p>
                                    <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono font-bold mt-0.5">{m.sku}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-slate-500 dark:text-slate-400 font-bold">{m.category || "Hammadde"}</td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                  <span className="font-black text-slate-800 dark:text-slate-200">{m.stockQty.toLocaleString("tr-TR")}</span>
                                  <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">{m.unit}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-slate-600 dark:text-slate-300 font-bold">₺{m.costPerUnit.toLocaleString("tr-TR")}</td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-bold">
                                  <MapPin className="h-3.5 w-3.5 text-amber-500 dark:text-amber-400" />
                                  <span className="text-xs">{m.shelfLoc || "—"}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-right">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="hover:bg-amber-500/10 dark:hover:bg-amber-500/10 hover:text-amber-600 dark:hover:text-amber-400 font-bold rounded-lg"
                                >
                                  Detay
                                </Button>
                              </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}