"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Palette, Eye, Edit, Copy, MoreVertical, Plus, Monitor } from "lucide-react"

export default function ThemeDashboard() {
  const router = useRouter()
  const [pages, setPages] = useState([
    { slug: "index", title: "Ana Sayfa", isLive: true, updated: "Bugün" },
    { slug: "hakkimizda", title: "Hakkımızda", isLive: false, updated: "3 gün önce" },
    { slug: "iletisim", title: "İletişim", isLive: false, updated: "1 hafta önce" }
  ])

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto px-4 sm:px-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <Palette className="w-7 h-7 text-amber-500" />
            Temalar & Sayfalar
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
            Canlı vitrininizi düzenleyin ve yeni sayfalar tasarlayın
          </p>
        </div>
      </div>

      {/* CANLI TEMA */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-sm">
        <h2 className="text-sm font-black uppercase tracking-widest text-slate-800 dark:text-slate-200 mb-6">Mevcut Canlı Tema</h2>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Thumb */}
          <div className="lg:w-[400px] aspect-video bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-white/5 overflow-hidden flex items-center justify-center relative group">
            <div className="absolute inset-0 bg-black/5 flex flex-col items-center justify-center gap-3">
               <Monitor className="w-12 h-12 text-slate-400 opacity-50" />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 flex flex-col justify-center space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">Heritage Modernist</h3>
                <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-widest bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 rounded-full">
                  Yayında
                </span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Ana vitrininizin varsayılan canlı teması. Sitenizin görünümünü özelleştirmek için tema düzenleyiciyi açın.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button 
                onClick={() => router.push("/builder/index")}
                className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2"
              >
                <Edit className="w-4 h-4" /> Temayı Özelleştir
              </button>
              <button 
                onClick={() => window.open("/", "_blank")}
                className="px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 font-bold rounded-xl transition-all flex items-center gap-2"
              >
                <Eye className="w-4 h-4" /> Mağazayı Görüntüle
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SAYFALAR LISTESİ */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-3xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-white/5 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-800 dark:text-slate-200">Sayfalar</h2>
            <p className="text-xs text-slate-500 mt-1">Özel içerik sayfalarınızı yönetin</p>
          </div>
          <button className="h-10 px-4 bg-slate-800 dark:bg-white text-white dark:text-slate-900 font-bold text-xs rounded-xl hover:opacity-90 transition-all flex items-center gap-2">
            <Plus className="w-4 h-4" /> Yeni Sayfa
          </button>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-white/5">
          {pages.map((p) => (
            <div key={p.slug} className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-slate-900 dark:text-white">{p.title}</h3>
                  {p.isLive && (
                    <span className="px-2 py-0.5 bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 text-[10px] font-bold rounded">Ana Sayfa</span>
                  )}
                </div>
                <p className="text-xs text-slate-500 font-mono mt-1">/{p.slug}</p>
              </div>
              
              <div className="flex items-center justify-between sm:justify-end gap-6 text-sm">
                <span className="text-slate-400 text-xs">{p.updated}</span>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => router.push(`/builder/${p.slug}`)}
                    className="p-2 text-slate-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10 rounded-lg transition-colors"
                    title="Düzenle"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors" title="Kopyala">
                    <Copy className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-colors" title="Daha fazla">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
