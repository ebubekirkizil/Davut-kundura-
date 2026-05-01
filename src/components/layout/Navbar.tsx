import Link from "next/link";
import CartBadge from "./CartBadge";
import AccountMenu from "./AccountMenu";
import { ShoppingBag } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#f5f1ea] border-b border-[#e5dfd3]">
      <div className="container mx-auto flex h-24 items-center justify-between px-8">
        
        {/* Logo Section */}
        <div className="flex items-center">
          <Link href="/" className="flex flex-col items-center">
            <span className="font-serif text-[32px] tracking-widest text-[#3d2f24] leading-none mb-1 flex items-baseline" style={{ fontFamily: 'var(--font-cinzel)' }}>
              <span className="text-[40px]">D</span>AVUT <span className="text-[40px] ml-2">K</span>UNDURA
            </span>
            <span className="font-sans text-[11px] font-semibold tracking-[0.25em] text-[#5e4b3c] uppercase pr-2">
              ZANAATTAN ADIMA
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6 text-[13px] font-medium text-[#3d2f24]">
          <Link href="/" className="hover:text-[#9b6a4a] transition-colors tracking-wide">
            ANA SAYFA
          </Link>
          <span className="text-[#cbbfae]">|</span>
          <Link href="/products" className="hover:text-[#9b6a4a] transition-colors tracking-wide">
            KOLEKSİYON
          </Link>
          <span className="text-[#cbbfae]">|</span>
          <Link href="/about" className="hover:text-[#9b6a4a] transition-colors tracking-wide">
            HAKKIMIZDA
          </Link>
          <span className="text-[#cbbfae]">|</span>
          <Link href="/contact" className="hover:text-[#9b6a4a] transition-colors tracking-wide">
            İLETİŞİM
          </Link>
        </nav>

        {/* Mobile menu button & Icons */}
        <div className="flex items-center space-x-2">
          {/* Account Menu */}
          <AccountMenu />
          
          <Link href="/cart" className="relative text-[#3d2f24] hover:text-[#9b6a4a] transition-colors group p-2">
            <ShoppingBag className="h-5 w-5" />
            <div className="absolute -top-0 -right-0">
               <CartBadge />
            </div>
          </Link>
        </div>
        
      </div>
    </header>
  );
}
