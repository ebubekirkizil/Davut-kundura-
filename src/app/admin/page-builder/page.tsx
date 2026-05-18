"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Palette, Eye, Edit, Copy, MoreVertical, Plus, Monitor, LayoutTemplate, CheckCircle2 } from "lucide-react"
import { TEMPLATES } from "@/lib/templates"
import { useBuilderStore } from "@/store/useBuilderStore"

export default function ThemeDashboard() {
  const router = useRouter()
  const store = useBuilderStore()
  
  const [pages, setPages] = useState([
    { slug: "index", title: "Ana Sayfa", isLive: true, updated: "Bugün" },
    { slug: "hakkimizda", title: "Hakkımızda", isLive: false, updated: "3 gün önce" },
    { slug: "iletisim", title: "İletişim", isLive: false, updated: "1 hafta önce" }
  ])

  const [applyingTemplate, setApplyingTemplate] = useState<string | null>(null)

  const handleApplyTemplate = async (templateId: string) => {
    if (!confirm("Dikkat: Bu şablonu uygulamak, mevcut Canlı Ana Sayfa (index) tasarımınızın üzerine yazacaktır. Devam etmek istiyor musunuz?")) {
      return
    }

    setApplyingTemplate(templateId)
    const tpl = TEMPLATES.find(t => t.id === templateId)
    if (tpl) {
      // Düzenleyici state'ine yükle
      store.updateGlobalTheme(tpl.theme)
      store.loadPage("index", {
        title: "Ana Sayfa",
        slug: "index",
        sections: tpl.sections
      })

      // Veritabanına (Canlıya) kaydet
      try {
        await fetch("/api/admin/page-builder", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            slug: "index",
            title: "Ana Sayfa",
            sections: tpl.sections,
            globalTheme: tpl.theme
          })
        })
        
        // Düzenleyiciye git
        router.push("/builder/index")
      } catch (err) {
        console.error("Şablon uygulanırken hata:", err)
        alert("Şablon veritabanına kaydedilirken hata oluştu. Ancak düzenleyiciye aktarıldı.")
        router.push("/builder/index")
      }
    }
    setApplyingTemplate(null)
  }

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto px-4 sm:px-6 pb-20">
      
      {/* ── HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <Palette className="w-8 h-8 text-amber-500" />
            Temalar & Sayfalar
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">
            Vitrin tasarımınızı profesyonel şablonlarla saniyeler içinde yenileyin.
          </p>
        </div>
      </div>

      {/* ── CANLI TEMA ── */}
      <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-3xl p-8 shadow-xl shadow-slate-200/20 dark:shadow-black/40">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-800 dark:text-slate-200">Mevcut Canlı Vitrin</h2>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Thumb */}
          <div className="lg:w-[500px] aspect-[16/10] bg-slate-100 dark:bg-black/40 rounded-2xl border border-slate-200 dark:border-white/5 overflow-hidden flex items-center justify-center relative group shadow-inner">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 transition-transform duration-500 group-hover:scale-105">
               <Monitor className="w-16 h-16 text-slate-300 dark:text-slate-700" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
               <button 
                  onClick={() => router.push("/builder/index")}
                  className="w-full py-3 bg-white text-slate-900 font-bold rounded-xl shadow-lg hover:bg-slate-50 transition-colors"
                >
                  Editörü Aç
                </button>
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 flex flex-col justify-center space-y-8">
            <div>
              <div className="flex items-center gap-4 mb-3">
                <h3 className="text-3xl font-black text-slate-900 dark:text-white">Aktif Tema</h3>
                <span className="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 rounded-full flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Yayında
                </span>
              </div>
              <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl">
                Müşterilerinizin şu anda gördüğü vitrin tasarımı. İstediğiniz zaman "Düzenle" diyerek 
                gerçek zamanlı değişiklikler yapabilirsiniz.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => router.push("/builder/index")}
                className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-2xl transition-all shadow-xl shadow-amber-500/20 flex items-center gap-2"
              >
                <Edit className="w-5 h-5" /> Temayı Özelleştir
              </button>
              <button 
                onClick={() => window.open("/", "_blank")}
                className="px-8 py-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 font-bold rounded-2xl transition-all flex items-center gap-2"
              >
                <Eye className="w-5 h-5" /> Mağazayı Görüntüle
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── ŞABLON GALERİSİ (10 TEMPLATES) ── */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <LayoutTemplate className="w-6 h-6 text-indigo-500" />
            Şablon Galerisi
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Sektöre özel hazırlanmış premium başlangıç şablonları.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {TEMPLATES.map((tpl) => (
            <div 
              key={tpl.id} 
              className="group bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              <div 
                className="h-40 relative flex items-center justify-center border-b border-slate-200 dark:border-white/5"
                style={{ backgroundColor: tpl.theme.bgColor }}
              >
                <div 
                  className="px-6 py-3 rounded-xl shadow-lg border"
                  style={{ 
                    backgroundColor: tpl.theme.primaryColor, 
                    color: tpl.theme.textColor,
                    borderColor: tpl.theme.accentColor + '40',
                    fontFamily: tpl.theme.fontHeading === 'Cinzel' ? 'serif' : 'sans-serif'
                  }}
                >
                  <span className="text-lg font-bold tracking-widest uppercase">{tpl.name}</span>
                </div>
                {/* Category Badge */}
                <div className="absolute top-4 right-4 px-2.5 py-1 bg-black/10 backdrop-blur-md rounded-lg text-[10px] font-bold uppercase tracking-widest text-current mix-blend-difference">
                  {tpl.category}
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{tpl.name}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 flex-1 line-clamp-2">
                  {tpl.description}
                </p>
                <button 
                  onClick={() => handleApplyTemplate(tpl.id)}
                  disabled={applyingTemplate === tpl.id}
                  className="w-full py-3 bg-slate-100 dark:bg-slate-800 hover:bg-indigo-500 hover:text-white dark:hover:bg-indigo-500 dark:hover:text-white text-slate-700 dark:text-slate-300 font-bold rounded-xl transition-all disabled:opacity-50"
                >
                  {applyingTemplate === tpl.id ? "Uygulanıyor..." : "Şablonu Uygula"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── SAYFALAR LISTESİ ── */}
      <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-3xl shadow-sm overflow-hidden">
        <div className="p-6 sm:p-8 border-b border-slate-200 dark:border-white/5 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-800 dark:text-slate-200">Diğer Sayfalar</h2>
            <p className="text-xs text-slate-500 mt-1">Özel içerik sayfalarınızı yönetin</p>
          </div>
          <button className="h-10 px-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm rounded-xl hover:opacity-90 transition-all flex items-center gap-2 shadow-lg shadow-slate-900/20 dark:shadow-white/20">
            <Plus className="w-4 h-4" /> Yeni Sayfa
          </button>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-white/5">
          {pages.map((p) => (
            <div key={p.slug} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg">{p.title}</h3>
                  {p.isLive && (
                    <span className="px-2.5 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-black uppercase tracking-widest rounded-md">Ana Dizin</span>
                  )}
                </div>
                <p className="text-sm text-slate-500 font-mono mt-1">/{p.slug}</p>
              </div>
              
              <div className="flex items-center justify-between sm:justify-end gap-8 text-sm">
                <span className="text-slate-400 text-xs font-medium">{p.updated}</span>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => router.push(`/builder/${p.slug}`)}
                    className="p-2.5 text-slate-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10 rounded-xl transition-colors"
                    title="Düzenle"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 rounded-xl transition-colors" title="Kopyala">
                    <Copy className="w-4 h-4" />
                  </button>
                  <button className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl transition-colors" title="Daha fazla">
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
