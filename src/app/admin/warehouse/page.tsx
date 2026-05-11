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

// --- TYPES ---
interface Material {
  id: string;
  name: string;
  sku: string | null;
  unit: string;
  stockQty: number;
  costPerUnit: number;
  supplier?: { name: string };
  category?: string; // Bu şemada yok ama UI için ekliyoruz
  shelfLoc?: string; // Bu şemada yok ama UI için ekliyoruz
}

export default function AdminWarehousePage() {
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid")
  const [activeTab, setActiveTab] = React.useState<"all" | "finished" | "raw">("all")
  const [loading, setLoading] = React.useState(true)
  const [materials, setMaterials] = React.useState<Material[]>([])
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState("Tümü")

  const categories = ["Tümü", "Deri / Kumaş", "Taban / Topuk", "Aksesuar", "Kutu / Ambalaj", "Kimyasallar"]

  const fetchData = React.useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/admin/warehouse/materials")
      const data = await res.json()
      if (res.ok) {
        setMaterials(data.materials || [])
      }
    } catch (error) {
      toast.error("Veriler yüklenemedi")
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
    return matchesSearch
  })

  return (
    <div className="space-y-8 p-6 max-w-[1600px] mx-auto">
      {/* Üst Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-serif font-bold text-slate-800 tracking-tight flex items-center gap-3">
            <WarehouseIcon className="h-10 w-10 text-amber-500" />
            Kurumsal Envanter
          </h1>
          <p className="text-slate-500 mt-2 text-lg">Tüm materyaller, hammaddeler ve depo lokasyon takibi</p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Görünüm Seçici */}
          <div className="bg-slate-100 p-1 rounded-xl flex gap-1 mr-2 shadow-inner border border-slate-200">
            <Button 
              variant={viewMode === "grid" ? "white" : "ghost"} 
              size="sm" 
              onClick={() => setViewMode("grid")}
              className={`px-3 ${viewMode === "grid" ? "shadow-sm" : ""}`}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button 
              variant={viewMode === "list" ? "white" : "ghost"} 
              size="sm" 
              onClick={() => setViewMode("list")}
              className={`px-3 ${viewMode === "list" ? "shadow-sm" : ""}`}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          <Button variant="outline" onClick={fetchData} className="bg-white border-slate-200 hover:bg-slate-50">
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} /> Yenile
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-slate-900 text-white hover:bg-slate-800 shadow-xl shadow-slate-900/10 px-6">
                <Plus className="h-4 w-4 mr-2" /> Yeni Kayıt <ChevronDown className="h-3 w-3 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white/95 backdrop-blur-md border-slate-200">
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href="/admin/warehouse/materials/new">
                  <Box className="h-4 w-4 mr-2 text-amber-500" /> Hammadde / Sarf Malzeme
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href="/admin/products/new">
                  <Package className="h-4 w-4 mr-2 text-blue-500" /> Bitmiş Ürün
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <WarehouseIcon className="h-4 w-4 mr-2 text-emerald-500" /> Yeni Depo Tanımla
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* KPI Şeridi */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Toplam Malzeme", value: materials.length, icon: Box, color: "text-blue-600 bg-blue-50" },
          { label: "Düşük Stok", value: "8", icon: AlertTriangle, color: "text-red-600 bg-red-50" },
          { label: "Toplam Değer", value: "₺2.4M", icon: BarChart3, color: "text-emerald-600 bg-emerald-50" },
          { label: "Aktif Depo", value: "3", icon: MapPin, color: "text-amber-600 bg-amber-50" },
        ].map((stat, i) => (
          <Card key={i} className="border-slate-200 shadow-sm overflow-hidden group hover:shadow-md transition-all">
            <CardContent className="p-5 flex items-center gap-4">
              <div className={`p-3 rounded-2xl ${stat.color} transition-transform group-hover:scale-110`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800 tracking-tight">{stat.value}</p>
                <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bölüm Seçimi & Filtreler */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sol: Kategori Navigasyonu */}
        <div className="lg:w-64 space-y-2">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2 mb-4">Bölümler</p>
          {[
            { id: "all", label: "Tüm Envanter", icon: LayoutGrid },
            { id: "finished", label: "Bitmiş Ürünler", icon: Package },
            { id: "raw", label: "Hammaddeler", icon: Box },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab.id 
                ? "bg-slate-900 text-white shadow-lg shadow-slate-900/10" 
                : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
          
          <div className="pt-6">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2 mb-4">Kategoriler</p>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`w-full flex items-center justify-between px-4 py-2 text-sm transition-all rounded-lg ${
                  selectedCategory === cat ? "text-amber-600 font-bold" : "text-slate-500 hover:text-slate-800"
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
          <Card className="bg-white/60 backdrop-blur-md border-white/40 shadow-xl shadow-slate-200/20">
            <CardContent className="p-4 flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input 
                  placeholder="Ürün, hammadde, SKU veya lokasyon ara..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-10 bg-slate-50 border-slate-200 focus:bg-white transition-all" 
                />
              </div>
              <Button variant="outline" className="border-slate-200 bg-white">
                <Filter className="h-4 w-4 mr-2" /> Gelişmiş Filtrele
              </Button>
            </CardContent>
          </Card>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="h-64 bg-slate-100 animate-pulse rounded-2xl" />
              ))}
            </div>
          ) : filteredMaterials.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 border-dashed">
              <Box className="h-16 w-16 text-slate-200 mx-auto mb-4" />
              <p className="text-slate-500 text-lg">Aranan kriterlere uygun malzeme bulunamadı.</p>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredMaterials.map((m) => (
                <Card key={m.id} className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-slate-200 shadow-sm bg-white hover:-translate-y-1">
                  <div className="h-44 bg-slate-50 flex items-center justify-center relative group-hover:bg-slate-100 transition-colors">
                    <Box className="h-16 w-16 text-slate-200 group-hover:text-amber-300 transition-colors" />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <Badge className="bg-white/80 backdrop-blur-md text-slate-700 border-slate-200 shadow-sm">
                        {m.unit}
                      </Badge>
                    </div>
                    <div className="absolute bottom-3 right-3">
                      <Badge className={m.stockQty < 10 ? "bg-red-500" : "bg-emerald-500"}>
                        {m.stockQty < 10 ? "Düşük Stok" : "Stokta"}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-slate-800 text-lg group-hover:text-amber-600 transition-colors">{m.name}</h3>
                        <p className="text-xs text-slate-400 font-mono mt-1">{m.sku || "SKU_BELİRTİLMEDİ"}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400"><MoreVertical className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-white">
                          <DropdownMenuItem>Düzenle</DropdownMenuItem>
                          <DropdownMenuItem>Stok Hareketi</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Sil</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                      <div>
                        <p className="text-[10px] uppercase text-slate-400 font-bold tracking-widest mb-1">Mevcut Stok</p>
                        <p className="text-xl font-black text-slate-800">{m.stockQty.toLocaleString("tr-TR")} <span className="text-xs font-normal text-slate-400">{m.unit}</span></p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] uppercase text-slate-400 font-bold tracking-widest mb-1">Lokasyon</p>
                        <div className="flex items-center justify-end gap-1 text-slate-600 font-bold">
                          <MapPin className="h-3 w-3 text-amber-500" />
                          <span>{m.shelfLoc || "—"}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="overflow-hidden border-slate-200 shadow-sm bg-white rounded-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-widest border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4">Malzeme Bilgisi</th>
                      <th className="px-6 py-4">Kategori</th>
                      <th className="px-6 py-4">Stok Durumu</th>
                      <th className="px-6 py-4">Birim Maliyet</th>
                      <th className="px-6 py-4">Lokasyon</th>
                      <th className="px-6 py-4 text-right">İşlem</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredMaterials.map(m => (
                      <tr key={m.id} className="hover:bg-slate-50 transition-colors group">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center group-hover:bg-white transition-colors">
                                <Box className="h-5 w-5 text-slate-400" />
                              </div>
                              <div>
                                <p className="font-bold text-slate-800">{m.name}</p>
                                <p className="text-[10px] text-slate-400 font-mono">{m.sku}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-slate-500 font-medium">Hammade</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <span className="font-black text-slate-800">{m.stockQty.toLocaleString("tr-TR")}</span>
                              <span className="text-xs text-slate-400">{m.unit}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-slate-600 font-bold">₺{m.costPerUnit.toLocaleString("tr-TR")}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-1 text-slate-500">
                              <MapPin className="h-3 w-3" />
                              <span className="text-xs">{m.shelfLoc || "—"}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <Button variant="ghost" size="sm" className="hover:bg-amber-50 hover:text-amber-600">Detay</Button>
                          </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}