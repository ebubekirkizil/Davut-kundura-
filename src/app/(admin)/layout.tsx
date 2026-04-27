"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PackageCheck, Users, ShoppingCart, Settings, Search, Bell, HelpCircle } from "lucide-react";

export default function AdminShopifyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-[#f1f2f4] text-[#1a1a1a] font-sans">
      
      {/* Sidebar - Shopify Modern (Dark) */}
      <aside className="w-60 bg-[#1a1a1a] text-[#ebebeb] flex flex-col fixed inset-y-0 left-0 z-50">
        <div className="p-4 py-5 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center font-serif font-bold text-white text-lg">D</div>
            <span className="font-semibold text-[15px] tracking-wide text-white">Davut Kundura</span>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 space-y-1">
          <div className="pt-2 pb-4">
            <Link 
              href="/" 
              target="_blank"
              className="flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-[#d97706] to-[#b45309] text-white rounded-md font-bold text-[13px] hover:opacity-90 shadow-[0_2px_10px_rgba(217,119,6,0.2)] transition-all"
            >
              Mağazaya (Vitrine) Dön
            </Link>
          </div>

          <div className="text-[11px] font-semibold text-[#8a8a8a] px-3 pt-4 pb-2 tracking-wider">YÖNETİM</div>
          
          <Link 
             href="/dashboard" 
             className={`flex items-center gap-3 px-3 py-1.5 rounded-md transition-colors ${
               pathname === '/dashboard' ? 'bg-[#333333] text-white font-semibold' : 'text-[#ebebeb] hover:bg-[#333333]/50 hover:text-white font-medium'
             }`}
          >
            <Home className="h-[18px] w-[18px]" />
            <span className="text-[14px]">Finans</span>
          </Link>

          <Link 
            href="/orders" 
            className={`flex items-center gap-3 px-3 py-1.5 rounded-md transition-colors ${
               pathname === '/orders' ? 'bg-[#333333] text-white font-semibold' : 'text-[#ebebeb] hover:bg-[#333333]/50 hover:text-white font-medium'
             }`}
          >
            <ShoppingCart className="h-[18px] w-[18px]" />
            <span className="text-[14px]">Siparişler</span>
          </Link>

          <Link 
            href="/inventory" 
            className={`flex items-center gap-3 px-3 py-1.5 rounded-md transition-colors ${
               pathname.startsWith('/inventory') ? 'bg-[#333333] text-white font-semibold' : 'text-[#ebebeb] hover:bg-[#333333]/50 hover:text-white font-medium'
             }`}
          >
            <PackageCheck className="h-[18px] w-[18px]" />
            <span className="text-[14px]">Stok & Ürünler</span>
          </Link>

          <Link 
            href="/crm" 
            className={`flex items-center gap-3 px-3 py-1.5 rounded-md transition-colors ${
               pathname === '/crm' ? 'bg-[#333333] text-white font-semibold' : 'text-[#ebebeb] hover:bg-[#333333]/50 hover:text-white font-medium'
             }`}
          >
            <Users className="h-[18px] w-[18px]" />
            <span className="text-[14px]">Müşteriler</span>
          </Link>

          <div className="text-[11px] font-semibold text-[#8a8a8a] px-3 pt-6 pb-2 tracking-wider">MAĞAZA (FRONTEND)</div>
          
          <Link 
            href="/settings" 
            className={`flex items-center gap-3 px-3 py-1.5 rounded-md transition-colors ${
               pathname === '/settings' ? 'bg-[#333333] text-white font-semibold' : 'text-[#ebebeb] hover:bg-[#333333]/50 hover:text-white font-medium'
             }`}
          >
            <Settings className="h-[18px] w-[18px]" />
            <span className="text-[14px]">Vitrin (CMS) Ayarları</span>
          </Link>

        </nav>

        <div className="p-3">
          <button className="flex items-center gap-3 px-3 py-1.5 w-full text-[#ebebeb] hover:bg-[#333333]/50 rounded-md transition-colors">
            <Settings className="h-[18px] w-[18px]" />
            <span className="font-medium text-[14px]">Genel Ayarlar</span>
          </button>
        </div>
      </aside>

      {/* Main Column */}
      <div className="flex-1 ml-60 flex flex-col min-h-screen">
        
        {/* Top Header - Shopify Style */}
        <header className="h-[56px] bg-white border-b border-[#e3e3e3] px-4 flex items-center justify-between sticky top-0 z-40">
          {/* Global Search */}
          <div className="flex-1 max-w-xl">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-[#8a8a8a] group-focus-within:text-[#1a1a1a]" />
              <input 
                type="text" 
                placeholder="Davut Kundura'da siparişleri, ürünleri ve müşterileri arayın..." 
                className="w-full bg-[#f1f2f4] border border-[#e3e3e3] text-[#1a1a1a] text-[14px] pl-10 pr-4 py-1.5 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a1a1a] focus:bg-white transition-all shadow-inner"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <kbd className="hidden sm:inline-block border border-[#d2d5d8] rounded bg-white px-1.5 text-[10px] font-sans text-[#8a8a8a] shadow-sm">CTRL</kbd>
                <kbd className="hidden sm:inline-block border border-[#d2d5d8] rounded bg-white px-1.5 text-[10px] font-sans text-[#8a8a8a] shadow-sm">K</kbd>
              </div>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3 ml-4">
            <button className="text-[#5c5f62] hover:bg-[#f1f2f4] p-1.5 rounded-md transition-colors">
              <HelpCircle className="h-5 w-5" />
            </button>
            <button className="text-[#5c5f62] hover:bg-[#f1f2f4] p-1.5 rounded-md transition-colors">
              <Bell className="h-5 w-5" />
            </button>
            <div className="h-8 w-8 bg-[#f1f2f4] rounded flex items-center justify-center font-bold text-[#1a1a1a] text-[14px] cursor-pointer hover:bg-[#e3e3e3] border border-[#d2d5d8]">
              EY
            </div>
          </div>
        </header>

        {/* Dynamic Content Area */}
        <main className="flex-1 p-8">
          {children}
        </main>

      </div>
    </div>
  );
}
