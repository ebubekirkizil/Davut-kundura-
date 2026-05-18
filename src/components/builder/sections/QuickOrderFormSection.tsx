"use client"
import React from "react"
import { Send, FileText } from "lucide-react"

interface Props { settings: Record<string, any> }

export default function QuickOrderFormSection({ settings }: Props) {
  const { title = "Toptan / Hızlı Sipariş Formu", subtitle = "Kurumsal veya toplu siparişleriniz için formu doldurun", bgColor = "#F7F3EE", accentColor = "#C8A96E", paddingY = 80 } = settings

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}>
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-10">
          <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
            <FileText className="w-8 h-8 text-slate-700" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-slate-900 mb-3">{title}</h2>
          <p className="text-slate-600">{subtitle}</p>
        </div>

        <form className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Firma Adı</label>
              <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 transition-colors" placeholder="Şirketiniz" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Yetkili Adı Soyadı</label>
              <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 transition-colors" placeholder="Ad Soyad" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-2">E-posta</label>
              <input type="email" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 transition-colors" placeholder="mail@ornek.com" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Telefon</label>
              <input type="tel" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 transition-colors" placeholder="+90" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Sipariş Detayı / Talepleriniz</label>
            <textarea rows={4} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 transition-colors resize-none" placeholder="Lütfen talep ettiğiniz ürün miktarlarını ve detaylarını belirtin..."></textarea>
          </div>

          <button type="button" className="w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 hover:opacity-90 transition-opacity" style={{ backgroundColor: accentColor }}>
            Talebi Gönder <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  )
}
