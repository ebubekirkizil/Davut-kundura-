"use client"
import React, { useState } from "react"

interface Props { settings: Record<string, any> }

export default function PricingCalculatorSection({ settings }: Props) {
  const { title = "Özel Üretim Hesapla", bgColor = "#FDFBF7", accentColor = "#C8A96E", paddingY = 80 } = settings

  const [type, setType] = useState(2500)
  const [material, setMaterial] = useState(1000)
  const [extra, setExtra] = useState(0)

  const total = type + material + extra

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}>
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-serif font-bold text-slate-900 mb-10 text-center">{title}</h2>
        
        <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-8 flex flex-col md:flex-row gap-12">
          
          <div className="flex-1 space-y-8">
            <div>
              <h3 className="font-bold text-slate-900 mb-4">Ayakkabı Modeli</h3>
              <select className="w-full p-4 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none" onChange={e => setType(Number(e.target.value))}>
                <option value={2500}>Oxford (2.500 ₺)</option>
                <option value={2200}>Loafer (2.200 ₺)</option>
                <option value={3500}>Bot (3.500 ₺)</option>
              </select>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 mb-4">Deri Materyali</h3>
              <select className="w-full p-4 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none" onChange={e => setMaterial(Number(e.target.value))}>
                <option value={1000}>Standart Dana Derisi (+1.000 ₺)</option>
                <option value={2000}>Premium İtalyan Deri (+2.000 ₺)</option>
                <option value={5000}>Egzotik (Timsah/Yılan) (+5.000 ₺)</option>
              </select>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 mb-4">Ekstra İstekler</h3>
              <div className="flex items-center gap-3 mb-2">
                <input type="checkbox" id="ex1" className="w-5 h-5" onChange={e => setExtra(p => e.target.checked ? p + 500 : p - 500)} />
                <label htmlFor="ex1">Özel İsim Baskısı (+500 ₺)</label>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="ex2" className="w-5 h-5" onChange={e => setExtra(p => e.target.checked ? p + 800 : p - 800)} />
                <label htmlFor="ex2">Ahşap Kalıp (+800 ₺)</label>
              </div>
            </div>
          </div>

          <div className="md:w-1/3 bg-slate-900 text-white rounded-2xl p-8 flex flex-col justify-between">
            <div>
              <h4 className="text-slate-400 font-bold mb-2">Tahmini Tutar</h4>
              <div className="text-4xl font-serif font-bold text-amber-500 mb-6">{total.toLocaleString('tr-TR')} ₺</div>
              <p className="text-sm opacity-70 mb-8">Üretim süresi ortalama 15-20 iş günüdür. Kesin fiyat ölçü alımı sonrası netleşir.</p>
            </div>
            <button className="w-full py-4 rounded-xl font-bold transition-transform hover:scale-105" style={{ backgroundColor: accentColor }}>
              Sipariş Oluştur
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
