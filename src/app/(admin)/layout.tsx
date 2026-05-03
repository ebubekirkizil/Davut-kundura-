"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, PackageCheck, Users, ShoppingCart, Settings, 
  Search, Bell, HelpCircle, Activity, Paintbrush, 
  Factory, Warehouse, Building2, Ticket, ShieldCheck, 
  Tag, ChevronRight, LayoutDashboard, Sparkles
} from "lucide-react";

export default function AdminShopifyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-[var(--bg-secondary)] text-[var(--text-primary)] font-sans selection:bg-[var(--accent)] selection:text-white">
      
      {/* Sidebar - Premium Minimalist */}
      <aside className="w-64 glass-effect border-r border-[var(--border)] flex flex-col fixed inset-y-0 left-0 z-50 shadow-xl overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent)]/5 rounded-full blur-3xl -mr-16 -mt-16" />
        
        <div className="p-6 flex items-center justify-between relative z-10">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-[var(--text-primary)] rounded-xl flex items-center justify-center transition-transform group-hover:rotate-12">
              <span className="font-brand font-bold text-white text-xl">D</span>
            </div>
            <div className="flex flex-col">
              <span className="font-brand font-bold text-[14px] tracking-widest text-[var(--text-primary)]">DAVUT</span>
              <span className="text-[10px] tracking-[0.3em] text-[var(--accent)] font-bold">KUNDURA</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-6 relative z-10 custom-scrollbar">
          {/* Main Actions */}
          <div className="space-y-1">
            <Link 
              href="/" 
              target="_blank"
              className="flex items-center justify-between w-full px-4 py-3 bg-[var(--text-primary)] text-white rounded-xl font-bold text-[12px] tracking-wider hover:opacity-90 shadow-lg transition-all group overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span className="relative z-10 flex items-center gap-2">
                <Sparkles size={14} className="text-[var(--accent)]" />
                VİTRİNE GİT
              </span>
              <ChevronRight size={14} className="relative z-10 opacity-50 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Navigation Groups */}
          <div className="space-y-4">
            <div>
              <div className="text-[10px] font-black text-[var(--text-secondary)]/50 px-4 mb-2 tracking-[0.2em] uppercase">Genel Bakış</div>
              <div className="space-y-1">
                {[
                  { href: '/dashboard', icon: LayoutDashboard, label: 'Panel' },
                  { href: '/analytics', icon: Activity, label: 'Canlı Analiz', badge: 'Canlı' },
                ].map((item) => (
                  <Link 
                    key={item.href}
                    href={item.href} 
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 group ${
                      pathname === item.href 
                        ? 'bg-white shadow-md text-[var(--text-primary)]' 
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:translate-x-1'
                    }`}
                  >
                    <item.icon size={18} className={pathname === item.href ? 'text-[var(--accent)]' : 'group-hover:text-[var(--accent)] transition-colors'} />
                    <span className="text-[14px] font-semibold">{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                    )}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[10px] font-black text-[var(--text-secondary)]/50 px-4 mb-2 tracking-[0.2em] uppercase">E-Ticaret</div>
              <div className="space-y-1">
                {[
                  { href: '/orders', icon: ShoppingCart, label: 'Siparişler' },
                  { href: '/inventory', icon: PackageCheck, label: 'Envanter' },
                  { href: '/crm', icon: Users, label: 'Müşteriler' },
                  { href: '/discounts', icon: Tag, label: 'Kampanyalar' },
                ].map((item) => (
                  <Link 
                    key={item.href}
                    href={item.href} 
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 group ${
                      pathname.startsWith(item.href) 
                        ? 'bg-white shadow-md text-[var(--text-primary)]' 
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:translate-x-1'
                    }`}
                  >
                    <item.icon size={18} className={pathname.startsWith(item.href) ? 'text-[var(--accent)]' : 'group-hover:text-[var(--accent)] transition-colors'} />
                    <span className="text-[14px] font-semibold">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[10px] font-black text-[var(--text-secondary)]/50 px-4 mb-2 tracking-[0.2em] uppercase">Mağaza Tasarımı</div>
              <div className="space-y-1">
                {[
                  { href: '/builder', icon: Paintbrush, label: 'Görsel Editör', badge: 'Yeni' },
                  { href: '/settings', icon: Settings, label: 'Site Ayarları' },
                ].map((item) => (
                  <Link 
                    key={item.href}
                    href={item.href} 
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 group relative ${
                      pathname === item.href 
                        ? 'bg-white shadow-md text-[var(--text-primary)]' 
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:translate-x-1'
                    }`}
                  >
                    <item.icon size={18} className={pathname === item.href ? 'text-[var(--accent)]' : 'group-hover:text-[var(--accent)] transition-colors'} />
                    <span className="text-[14px] font-semibold">{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto text-[8px] bg-[var(--accent)]/10 text-[var(--accent)] px-1.5 py-0.5 rounded-full font-black uppercase tracking-tighter">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>

        <div className="p-4 border-t border-[var(--border)] relative z-10">
          <div className="bg-white/50 rounded-2xl p-4 flex items-center gap-3 border border-white/50 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[var(--accent)] to-[#f3e5ab] flex items-center justify-center text-white font-bold shadow-md">
              EY
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] font-bold text-[var(--text-primary)]">Emirhan Yıldız</span>
              <span className="text-[10px] text-[var(--text-secondary)]">Süper Admin</span>
            </div>
            <button className="ml-auto p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-[var(--text-secondary)]">
              <Settings size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Column */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen relative">
        
        {/* Top Header - Glassmorphism */}
        <header className="h-20 glass-effect border-b border-[var(--border)] px-8 flex items-center justify-between sticky top-0 z-40">
          {/* Global Search */}
          <div className="flex-1 max-w-2xl">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--text-secondary)] group-focus-within:text-[var(--accent)] transition-colors" />
              <input 
                type="text" 
                placeholder="Siparişler, ürünler veya müşterilerde ara..." 
                className="w-full bg-[var(--bg-secondary)] border border-transparent text-[var(--text-primary)] text-[14px] pl-12 pr-4 py-3 rounded-2xl focus:outline-none focus:bg-white focus:border-[var(--accent)]/30 focus:ring-4 focus:ring-[var(--accent)]/5 transition-all"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 pointer-events-none">
                <kbd className="hidden sm:inline-block border border-[var(--border)] rounded-lg bg-white px-2 py-0.5 text-[10px] font-bold text-[var(--text-secondary)] shadow-sm">⌘</kbd>
                <kbd className="hidden sm:inline-block border border-[var(--border)] rounded-lg bg-white px-2 py-0.5 text-[10px] font-bold text-[var(--text-secondary)] shadow-sm">K</kbd>
              </div>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4 ml-8">
            <button className="relative w-10 h-10 flex items-center justify-center text-[var(--text-secondary)] hover:bg-white rounded-xl transition-all hover:shadow-sm border border-transparent hover:border-[var(--border)] group">
              <Bell size={20} className="group-hover:text-[var(--accent)]" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <button className="w-10 h-10 flex items-center justify-center text-[var(--text-secondary)] hover:bg-white rounded-xl transition-all hover:shadow-sm border border-transparent hover:border-[var(--border)] group">
              <HelpCircle size={20} className="group-hover:text-[var(--accent)]" />
            </button>
          </div>
        </header>

        {/* Dynamic Content Area */}
        <main className="flex-1 p-8 lg:p-12 max-w-[1600px] mx-auto w-full fade-in">
          {children}
        </main>

      </div>
    </div>
  );
}
