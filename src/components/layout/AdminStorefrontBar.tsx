"use client";

import { useSession } from "next-auth/react";
import { Edit3, Settings, Monitor } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminStorefrontBar() {
  const { data: session } = useSession();
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      document.body.classList.add("admin-edit-mode");
      const elements = document.querySelectorAll("h1, h2, p, img, a, button");
      
      const handleClick = (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
        alert("CMS Entegrasyonu: Bu elementi düzenlemek için Yönetim Paneli > Vitrin Ayarları sayfasına yönlendirileceksiniz.");
        window.location.href = "/settings";
      };

      elements.forEach(el => {
        el.classList.add("hover:outline", "hover:outline-2", "hover:outline-blue-500", "cursor-pointer", "transition-all", "relative");
        el.addEventListener("click", handleClick as EventListener);
        // store the listener to remove later
        (el as any)._adminClickHandler = handleClick;
      });
    } else {
      document.body.classList.remove("admin-edit-mode");
      const elements = document.querySelectorAll("h1, h2, p, img, a, button");
      elements.forEach(el => {
        el.classList.remove("hover:outline", "hover:outline-2", "hover:outline-blue-500", "cursor-pointer", "transition-all", "relative");
        if ((el as any)._adminClickHandler) {
          el.removeEventListener("click", (el as any)._adminClickHandler);
          delete (el as any)._adminClickHandler;
        }
      });
    }
    
    return () => {
      // Cleanup on unmount
      document.body.classList.remove("admin-edit-mode");
      const elements = document.querySelectorAll("h1, h2, p, img, a, button");
      elements.forEach(el => {
        el.classList.remove("hover:outline", "hover:outline-2", "hover:outline-blue-500", "cursor-pointer", "transition-all", "relative");
        if ((el as any)._adminClickHandler) {
          el.removeEventListener("click", (el as any)._adminClickHandler);
          delete (el as any)._adminClickHandler;
        }
      });
    };
  }, [isEditMode]);

  if (session?.user?.role !== "ADMIN") return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] bg-[#1a1a1a] text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-6 border border-[#333]">
      <div className="flex items-center gap-2">
        <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]"></div>
        <span className="text-sm font-bold tracking-wide">Admin Aktif</span>
      </div>
      
      <div className="w-px h-6 bg-[#444]"></div>
      
      <div className="flex items-center gap-2">
        <button 
          onClick={() => setIsEditMode(!isEditMode)}
          className={`flex items-center gap-2 text-[13px] font-medium px-4 py-2 rounded-md transition-all ${
            isEditMode 
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]' 
              : 'hover:bg-[#333] text-[#ddd]'
          }`}
        >
          <Edit3 className="w-4 h-4" />
          {isEditMode ? "Görsel Düzenleyici: AÇIK" : "Görsel Düzenleyici"}
        </button>
        <Link 
          href="/settings" 
          className="flex items-center gap-2 text-[13px] font-medium px-4 py-2 rounded-md hover:bg-[#333] text-[#ddd] transition-colors"
        >
          <Settings className="w-4 h-4" />
          Vitrin Ayarları
        </Link>
        <Link 
          href="/dashboard" 
          className="flex items-center gap-2 text-[13px] font-medium px-4 py-2 rounded-md bg-[#008060] hover:bg-[#006e52] text-white transition-colors"
        >
          <Monitor className="w-4 h-4" />
          Panele Git
        </Link>
      </div>
    </div>
  );
}
