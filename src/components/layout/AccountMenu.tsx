"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { User, Shield, LogOut } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function AccountMenu() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (status === "loading") {
    return <div className="p-2"><div className="w-5 h-5 rounded-full border-2 border-[#e5dfd3] border-t-[#3d2f24] animate-spin"></div></div>;
  }

  if (!session) {
    return (
      <Link href="/admin/login" className="text-[#3d2f24] hover:text-[#9b6a4a] transition-colors p-2" title="Giriş Yap">
        <User className="h-5 w-5" />
      </Link>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className={`text-[#3d2f24] hover:text-[#9b6a4a] transition-colors p-2 flex items-center gap-1 rounded-full ${isOpen ? 'bg-[#e5dfd3]/50' : ''}`}
        title="Hesabım"
      >
        <User className="h-5 w-5" />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-3 w-56 bg-white border border-[#e5dfd3] shadow-xl rounded-xl py-2 z-50 overflow-hidden transform origin-top-right transition-all">
          <div className="px-4 py-3 border-b border-[#e5dfd3] bg-[#fdfcfb]">
            <p className="text-[14px] font-bold text-[#3d2f24] truncate">{session.user?.name || "Kullanıcı"}</p>
            <p className="text-[12px] text-[#8a7f72] truncate">{session.user?.email}</p>
          </div>
          
          {session.user?.role === "ADMIN" && (
            <Link 
              href="/dashboard" 
              className="flex items-center gap-2 px-4 py-3 text-[14px] font-medium text-[#3d2f24] hover:bg-[#f5f1ea] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <Shield className="h-4 w-4 text-[#008060]" />
              Yönetim Sayfası
            </Link>
          )}

          <button 
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-2 px-4 py-3 w-full text-left text-[14px] font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Çıkış Yap
          </button>
        </div>
      )}
    </div>
  );
}
