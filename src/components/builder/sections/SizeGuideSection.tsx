"use client"
import React from "react"
import { Ruler } from "lucide-react"

interface Props { settings: Record<string, any> }

export default function SizeGuideSection({ settings }: Props) {
  const { title = "Beden ve Ölçü Rehberi", description = "Doğru ayakkabı numarasını bulmak için tablomuzu inceleyin.", bgColor = "#FDFBF7", accentColor = "#C8A96E", paddingY = 80 } = settings

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}>
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          
          <div className="md:w-1/3 text-center md:text-left">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto md:mx-0" style={{ backgroundColor: accentColor + "20", color: accentColor }}>
              <Ruler className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4">{title}</h2>
            <p className="text-slate-600 mb-6">{description}</p>
            <p className="text-sm font-bold text-slate-900 p-4 bg-slate-100 rounded-xl">Ölçü alırken ayak topuğunuzdan en uzun parmağınıza kadar olan mesafeyi baz alın.</p>
          </div>

          <div className="md:w-2/3 w-full overflow-x-auto">
            <table className="w-full text-sm bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">
              <thead className="bg-slate-50 text-slate-600 font-black">
                <tr>
                  <th className="p-4 text-left border-b">EU</th>
                  <th className="p-4 text-left border-b">US</th>
                  <th className="p-4 text-left border-b">UK</th>
                  <th className="p-4 text-left border-b">CM (Ayak Uzunluğu)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["40", "7.5", "6.5", "25.4 cm"],
                  ["41", "8", "7.5", "26 cm"],
                  ["42", "9", "8", "26.7 cm"],
                  ["43", "10", "9", "27.3 cm"],
                  ["44", "10.5", "9.5", "27.9 cm"],
                  ["45", "11.5", "10.5", "28.6 cm"],
                ].map((row, i) => (
                  <tr key={i} className="border-b border-slate-50 hover:bg-slate-50">
                    <td className="p-4 font-bold text-slate-900">{row[0]}</td>
                    <td className="p-4 text-slate-600">{row[1]}</td>
                    <td className="p-4 text-slate-600">{row[2]}</td>
                    <td className="p-4 text-slate-600">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  )
}
