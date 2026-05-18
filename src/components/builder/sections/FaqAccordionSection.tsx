"use client"
import React, { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

interface Block {
  id: string
  settings: Record<string, any>
}

interface Props {
  settings: Record<string, any>
  blocks: Block[]
}

export default function FaqAccordionSection({ settings, blocks }: Props) {
  const {
    title = "Sıkça Sorulan Sorular",
    bgColor = "#FDFBF7",
    accentColor = "#C8A96E",
    paddingY = 80,
  } = settings

  const [openIdx, setOpenIdx] = useState<number | null>(null)

  const items = blocks.length > 0 ? blocks : [
    { id: "d1", settings: { question: "Teslimat süresi ne kadar?", answer: "Siparişleriniz 1-3 iş günü içinde kargoya verilir." } },
    { id: "d2", settings: { question: "İade koşullarınız nelerdir?", answer: "14 gün içinde koşulsuz iade hakkınız bulunmaktadır." } },
    { id: "d3", settings: { question: "Hangi ödeme yöntemlerini kabul ediyorsunuz?", answer: "Kredi kartı, banka kartı ve havale/EFT ile ödeme yapabilirsiniz." } },
  ]

  return (
    <div style={{ backgroundColor: bgColor, paddingTop: paddingY, paddingBottom: paddingY }}>
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl lg:text-4xl font-serif font-bold text-center mb-12" style={{ color: "#12100E" }}>
          {title}
        </h2>

        <div className="space-y-3">
          {items.map((item, idx) => {
            const isOpen = openIdx === idx
            return (
              <div
                key={item.id}
                className="border rounded-2xl overflow-hidden transition-all"
                style={{ borderColor: isOpen ? accentColor : "#E5E0D8" }}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left font-bold transition-all"
                  style={{
                    backgroundColor: isOpen ? accentColor + "15" : "transparent",
                    color: "#12100E",
                  }}
                >
                  <span className="text-base">{item.settings.question}</span>
                  {isOpen ? (
                    <ChevronUp className="h-5 w-5 flex-shrink-0" style={{ color: accentColor }} />
                  ) : (
                    <ChevronDown className="h-5 w-5 flex-shrink-0 opacity-40" />
                  )}
                </button>
                {isOpen && (
                  <div
                    className="px-6 pb-5 text-sm leading-relaxed opacity-80 animate-in fade-in slide-in-from-top-2 duration-200"
                    style={{ color: "#12100E" }}
                  >
                    {item.settings.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
