"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, PackageCheck, Users, ShoppingCart, Settings, 
  Search, Bell, HelpCircle, Activity, Paintbrush, 
  LayoutDashboard, Sparkles, ChevronRight
} from "lucide-react";

export default function AdminShopifyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-[#f8f9fa] text-[#1a1a1a] font-sans">
      
      {/* Sidebar - Sabit ve Sağlam Yapı */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col fixed inset-y-0 left-0 z-50 shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
              <span className="font-bold text-white text-xl">D</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-[14px] tracking-tight text-black">DAVUT KUNDURA</span>
              <span className="text-[10px] text-[#c5a059] font-bold uppercase tracking-widest">Yönetim Paneli</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-8 custom-scrollbar">
          {/* Hızlı Erişim */}
          <Link 
            href="/" 
            target="_blank"
            className="flex items-center justify-between w-full px-4 py-3 bg-black text-white rounded-xl font-bold text-[12px] hover:bg-gray-800 transition-all shadow-md"
          >
            <span className="flex items-center gap-2">
              <Sparkles size={14} className="text-[#c5a059]" />
              SİTEYİ GÖRÜNTÜLE
            </span>
            <ChevronRight size={14} />
          </Link>

          {/* Menü Grupları */}
          <div className="space-y-6">
            <div>
              <div className="text-[10px] font-bold text-gray-400 px-4 mb-3 uppercase tracking-widest">Analiz</div>
              <div className="space-y-1">
                {[
                  { href: '/dashboard', icon: LayoutDashboard, label: 'Panel' },
                  { href: '/analytics', icon: Activity, label: 'Canlı Trafik' },
                ].map((item) => (
                  <Link 
                    key={item.href}
                    href={item.href} 
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${
                      pathname === item.href 
                        ? 'bg-gray-100 text-black font-bold' 
                        : 'text-gray-500 hover:bg-gray-50 hover:text-black'
                    }`}
                  >
                    <item.icon size={18} />
                    <span className="text-[14px]">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[10px] font-bold text-gray-400 px-4 mb-3 uppercase tracking-widest">Yönetim</div>
              <div className="space-y-1">
                {[
                  { href: '/orders', icon: ShoppingCart, label: 'Siparişler' },
                  { href: '/inventory', icon: PackageCheck, label: 'Envanter' },
                  { href: '/crm', icon: Users, label: 'Müşteriler' },
                ].map((item) => (
                  <Link 
                    key={item.href}
                    href={item.href} 
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${
                      pathname.startsWith(item.href) 
                        ? 'bg-gray-100 text-black font-bold' 
                        : 'text-gray-500 hover:bg-gray-50 hover:text-black'
                    }`}
                  >
                    <item.icon size={18} />
                    <span className="text-[14px]">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[10px] font-bold text-gray-400 px-4 mb-3 uppercase tracking-widest">Tasarım</div>
              <div className="space-y-1">
                {[
                  { href: '/builder', icon: Paintbrush, label: 'Görsel Editör' },
                  { href: '/settings', icon: Settings, label: 'Ayarlar' },
                ].map((item) => (
                  <Link 
                    key={item.href}
                    href={item.href} 
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${
                      pathname === item.href 
                        ? 'bg-gray-100 text-black font-bold' 
                        : 'text-gray-500 hover:bg-gray-50 hover:text-black'
                    }`}
                  >
                    <item.icon size={18} />
                    <span className="text-[14px]">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="bg-gray-50 rounded-xl p-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white text-[10px] font-bold">
              EY
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-[12px] font-bold text-black truncate">Emirhan Yıldız</span>
              <span className="text-[10px] text-gray-500 uppercase tracking-tighter">Admin</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Ana İçerik Alanı */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen bg-[#f8f9fa]">
        
        {/* Üst Bar */}
        <header className="h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-between sticky top-0 z-40">
          <div className="flex-1 max-w-xl">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Ara..." 
                className="w-full bg-gray-50 border-transparent text-[13px] pl-10 pr-4 py-2 rounded-lg focus:bg-white focus:border-gray-200 outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:bg-gray-50 rounded-lg transition-all">
              <Bell size={18} />
            </button>
            <div className="h-6 w-[1px] bg-gray-200 mx-2" />
            <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:bg-gray-50 rounded-lg transition-all">
              <HelpCircle size={18} />
            </button>
          </div>
        </header>

        {/* Dinamik Sayfa İçeriği */}
        <main className="p-8 max-w-[1400px] w-full mx-auto">
          {children}
        </main>

      </div>
    </div>
  );
}
