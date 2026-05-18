"use client"
import React from "react"
import { Check, Minus } from "lucide-react"

interface Props { settings: Record<string, any> }

export default function CompareTableSection({ settings }: Props) {
  const { title = "Paket Karşılaştırması", bgColor = "#FDFBF7", accentColor = "#C8A96E", paddingY = 80 } = settings

  const features = ["Hakiki Deri", "El İşçiliği", "Ücretsiz Kargo", "Özel Kutu", "6 Ay Garanti", "Özel Ölçü Üretim"]
  const products = [
    { name: "Standart Üretim", price: "2.500₺", checks: [true, false, true, false, true, false] },
    { name: "Premium Özel Üretim", price: "4.500₺", checks: [true, true, true, true, true, true], highlight: true }
  ]

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}>
      <div className="max-w-4xl mx-auto px-6 overflow-x-auto">
        <h2 className="text-3xl font-serif font-bold text-slate-900 text-center mb-10">{title}</h2>
        <table className="w-full min-w-[600px] border-collapse bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">
          <thead>
            <tr>
              <th className="p-6 text-left border-b border-slate-100 w-1/3">Özellikler</th>
              {products.map(p => (
                <th key={p.name} className={`p-6 text-center border-b border-slate-100 w-1/3 ${p.highlight ? 'bg-slate-50' : ''}`}>
                  <h3 className="font-black text-lg text-slate-900">{p.name}</h3>
                  <p style={{ color: accentColor }} className="text-sm mt-1">{p.price}</p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((feat, i) => (
              <tr key={feat}>
                <td className="p-4 px-6 text-sm font-bold text-slate-600 border-b border-slate-50">{feat}</td>
                {products.map(p => (
                  <td key={p.name} className={`p-4 text-center border-b border-slate-50 ${p.highlight ? 'bg-slate-50' : ''}`}>
                    {p.checks[i] ? <Check className="w-5 h-5 mx-auto text-green-500" /> : <Minus className="w-5 h-5 mx-auto text-slate-300" />}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
