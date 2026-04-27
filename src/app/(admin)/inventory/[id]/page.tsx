"use client";

import { ArrowLeft, Save, Trash2, Image as ImageIcon, RotateCw, FileEdit } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// In a real app, this data would be fetched via ID from the URL.
export default function ProductDetailPage() {
  const [cost, setCost] = useState(150.00);
  const [price, setPrice] = useState(599.00);

  // Auto calculate margin & profit
  const profit = price - cost;
  const marginStr = price > 0 ? ((profit / price) * 100).toFixed(1) : "0";

  return (
    <div className="max-w-[1000px] mx-auto space-y-5 pb-16 font-sans">
      
      {/* Top Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <Link href="/inventory" className="text-[#5c5f62] hover:bg-[#f1f2f4] p-[5px] rounded border border-[#d2d5d8] transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-[20px] font-bold text-[#1a1a1a]">Davut Klasik Hakiki Deri Kemer</h1>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[12px] font-medium bg-[#aee9d1] text-[#006e52]">
            Active
          </span>
        </div>
        <div className="flex items-center gap-3">
           <button className="text-[13px] font-medium text-[#d82c0d] hover:bg-[#fed3d1] px-3 py-1.5 rounded transition-colors hidden sm:block">Archive product</button>
           <button className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium text-white bg-[#008060] border border-[#008060] rounded-md hover:bg-[#006e52] shadow-sm transition-colors">
             <Save className="h-4 w-4" /> Save
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-5">
          
          {/* Title & Description Box */}
          <div className="bg-white rounded-lg border border-[#e3e3e3] shadow-[0_1px_3px_rgba(0,0,0,0.05)] p-5">
            <div className="mb-4">
              <label className="block text-[13px] text-[#1a1a1a] mb-1.5">Title</label>
              <input type="text" defaultValue="Davut Klasik Hakiki Deri Kemer" className="w-full text-[14px] px-3 py-1.5 border border-[#8a8a8a] rounded-md focus:outline-none focus:ring-2 focus:ring-[#008060] text-[#1a1a1a]" />
            </div>
            <div>
              <label className="block text-[13px] text-[#1a1a1a] mb-1.5">Description</label>
              <div className="border border-[#8a8a8a] rounded-md overflow-hidden">
                 <div className="bg-[#f9fafb] border-b border-[#d2d5d8] p-2 flex gap-2">
                    <button className="p-1 hover:bg-[#e3e3e3] rounded"><FileEdit className="h-4 w-4 text-[#5c5f62]"/></button>
                 </div>
                 <textarea rows={5} className="w-full text-[14px] p-3 focus:outline-none text-[#1a1a1a]">
Birebir el işçiliği ile üretilmiş, 41 yıllık Davut Kundura kalitesine sahip, hakiki dana derisi klasik erkek kemeri. Özel alaşım tokası ile yıllara meydan okuyan tasarım.
                 </textarea>
              </div>
            </div>
          </div>

          {/* Media Box */}
          <div className="bg-white rounded-lg border border-[#e3e3e3] shadow-[0_1px_3px_rgba(0,0,0,0.05)] p-5">
             <label className="block text-[14px] font-semibold text-[#1a1a1a] mb-3">Media (Fotoğraf)</label>
             
             <div className="grid grid-cols-4 gap-4">
                <div className="col-span-1 border border-[#d2d5d8] rounded aspect-square overflow-hidden relative group cursor-pointer">
                  <img src="https://images.unsplash.com/photo-1624222247344-550fb60eba1c?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Trash2 className="text-white h-5 w-5" />
                  </div>
                </div>
                <div className="col-span-1 border border-dashed border-[#8a8a8a] hover:bg-[#f9fafb] rounded aspect-square flex flex-col items-center justify-center text-[#5c5f62] cursor-pointer transition-colors">
                   <ImageIcon className="h-6 w-6 mb-2" />
                   <span className="text-[12px] font-medium text-[#1a1a1a]">Add image</span>
                </div>
             </div>
          </div>

          {/* Pricing Box - Pro Feature */}
          <div className="bg-white rounded-lg border border-[#e3e3e3] shadow-[0_1px_3px_rgba(0,0,0,0.05)] p-5">
             <label className="block text-[14px] font-semibold text-[#1a1a1a] mb-4">Maliyet & Fiyat Analizi (Pro-Brain)</label>
             
             <div className="grid grid-cols-2 gap-4 mb-5">
               <div>
                  <label className="block text-[13px] text-[#1a1a1a] mb-1.5">Satış Fiyatı (Selling Price) ₺</label>
                  <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="w-full text-[14px] px-3 py-1.5 border border-[#8a8a8a] rounded-md focus:outline-none focus:ring-2 focus:ring-[#008060] text-[#1a1a1a]" />
               </div>
               <div>
                  <label className="block text-[13px] text-[#1a1a1a] mb-1.5">Üstü Çizili İndirim Fiyatı ₺</label>
                  <input type="number" defaultValue={750.00} className="w-full text-[14px] px-3 py-1.5 border border-[#8a8a8a] rounded-md focus:outline-none focus:ring-2 focus:ring-[#008060] text-[#1a1a1a]" />
               </div>
             </div>

             <div className="border-t border-[#e3e3e3] pt-5 grid grid-cols-2 gap-4">
               <div>
                  <label className="block text-[13px] text-[#1a1a1a] mb-1.5">Maliyet (Cost per item) ₺</label>
                  <input type="number" value={cost} onChange={(e) => setCost(Number(e.target.value))} className="w-full text-[14px] px-3 py-1.5 border border-[#8a8a8a] rounded-md focus:outline-none focus:ring-2 focus:ring-[#008060] text-[#1a1a1a]" />
                  <p className="text-[11px] text-[#5c5f62] mt-1">Müşteriler bu fiyatı göremez, kâr hesaplaması için (BEYİN) kullanılır.</p>
               </div>
               
               <div className="flex gap-4 p-3 bg-[#f9fafb] border border-[#e3e3e3] rounded-md">
                 <div className="flex-1">
                   <span className="block text-[12px] text-[#5c5f62] mb-1">Kâr Marjı (Margin)</span>
                   <span className="text-[15px] font-medium text-[#1a1a1a]">% {marginStr}</span>
                 </div>
                 <div className="flex-1">
                   <span className="block text-[12px] text-[#5c5f62] mb-1">Net Kâr (Profit)</span>
                   <span className="text-[15px] font-medium text-[#008060]">₺ {profit.toFixed(2)}</span>
                 </div>
               </div>
             </div>
          </div>

          {/* Inventory Box */}
          <div className="bg-white rounded-lg border border-[#e3e3e3] shadow-[0_1px_3px_rgba(0,0,0,0.05)] p-5">
             <label className="block text-[14px] font-semibold text-[#1a1a1a] mb-4">Stok (Inventory & Barcode)</label>
             <div className="grid grid-cols-2 gap-4">
               <div>
                 <label className="block text-[13px] text-[#1a1a1a] mb-1.5">SKU (Stok Kodu)</label>
                 <input type="text" defaultValue="DK-KMR-S01" className="w-full text-[14px] px-3 py-1.5 border border-[#8a8a8a] rounded-md focus:outline-none focus:ring-2 focus:ring-[#008060] text-[#1a1a1a]" />
               </div>
               <div>
                 <label className="block text-[13px] text-[#1a1a1a] mb-1.5">Barkod (ISBN, UPC, GTIN)</label>
                 <input type="text" defaultValue="8691234567890" className="w-full text-[14px] px-3 py-1.5 border border-[#8a8a8a] rounded-md focus:outline-none focus:ring-2 focus:ring-[#008060] text-[#1a1a1a]" />
               </div>
             </div>
             
             <div className="mt-5 border-t border-[#e3e3e3] pt-5">
               <label className="flex items-center gap-2 cursor-pointer">
                 <input type="checkbox" defaultChecked className="rounded border-gray-300 text-[#008060] focus:ring-[#008060] w-4 h-4 cursor-pointer" />
                 <span className="text-[13px] text-[#1a1a1a]">Stok miktarını sistemi otomatik takip etsin (Track quantity)</span>
               </label>
               <label className="flex items-center gap-2 cursor-pointer mt-3">
                 <input type="checkbox" className="rounded border-gray-300 text-[#008060] focus:ring-[#008060] w-4 h-4 cursor-pointer" />
                 <span className="text-[13px] text-[#1a1a1a]">Stok tükendiğinde satışa devam et (Ön sipariş)</span>
               </label>
             </div>
          </div>
          
        </div>
        
        {/* Right Sidebar */}
        <div className="lg:col-span-1 space-y-5">
           
           <div className="bg-white rounded-lg border border-[#e3e3e3] shadow-[0_1px_3px_rgba(0,0,0,0.05)] p-5">
             <label className="block text-[14px] font-semibold text-[#1a1a1a] mb-3">Status (Yayına Al)</label>
             <select className="w-full text-[14px] p-2 border border-[#8a8a8a] rounded-md focus:outline-none focus:ring-2 focus:ring-[#008060] text-[#1a1a1a] bg-white cursor-pointer mb-2">
               <option>Active</option>
               <option>Draft</option>
             </select>
             <p className="text-[12px] text-[#5c5f62]">Bu ürün müşteri vitrininde görüntülenir durumdadır.</p>
           </div>

           <div className="bg-white rounded-lg border border-[#e3e3e3] shadow-[0_1px_3px_rgba(0,0,0,0.05)] p-5">
             <label className="block text-[14px] font-semibold text-[#1a1a1a] mb-3">Product organization</label>
             <div className="space-y-4">
               <div>
                  <label className="block text-[13px] text-[#5c5f62] mb-1">Kategori</label>
                  <input type="text" defaultValue="Kemer" className="w-full text-[14px] px-3 py-1.5 border border-[#d2d5d8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#008060] text-[#1a1a1a] bg-[#f9fafb]" />
               </div>
               <div>
                  <label className="block text-[13px] text-[#5c5f62] mb-1">Üretici / Satıcı (Vendor)</label>
                  <input type="text" defaultValue="Davut Kundura Atölyesi" className="w-full text-[14px] px-3 py-1.5 border border-[#d2d5d8] rounded-md focus:outline-none focus:ring-2 focus:ring-[#008060] text-[#1a1a1a] bg-[#f9fafb]" />
               </div>
               <div>
                  <label className="block text-[13px] text-[#5c5f62] mb-1">Etiketler (Tags)</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <span className="bg-[#e3e3e3] text-[#1a1a1a] px-2 py-0.5 rounded text-[12px]">deri</span>
                    <span className="bg-[#e3e3e3] text-[#1a1a1a] px-2 py-0.5 rounded text-[12px]">klasik</span>
                  </div>
               </div>
             </div>
           </div>

        </div>

      </div>

    </div>
  );
}
