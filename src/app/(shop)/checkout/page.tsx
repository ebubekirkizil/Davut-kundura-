// Checkout sayfası — Paytr altyapısı hazır, ödeme entegrasyonu eklemeye hazır
"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { ShieldCheck, Truck, CreditCard, MapPin, User, Phone, Mail, ChevronRight, Lock } from "lucide-react";

type Step = "cart" | "address" | "shipping" | "payment";

const SHIPPING_OPTIONS = [
  { id: "standard", label: "Standart Kargo", desc: "3-5 iş günü", price: 29.90, company: "Yurtiçi Kargo" },
  { id: "express", label: "Ekspres Kargo", desc: "1-2 iş günü", price: 59.90, company: "Aras Kargo" },
  { id: "free", label: "Ücretsiz Kargo", desc: "5-7 iş günü (200₺+ sipariş)", price: 0, company: "PTT Kargo" },
];

export default function CheckoutPage() {
  const { items, getTotals, clearCart } = useCartStore();
  const { subtotal, totalItems } = getTotals();
  const [step, setStep] = useState<Step>("address");
  const [selectedShipping, setSelectedShipping] = useState(SHIPPING_OPTIONS[0]);
  const [discountCode, setDiscountCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState<{ amount: number; code: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [address, setAddress] = useState({
    fullName: "", email: "", phone: "",
    city: "", district: "", addressLine: "", postalCode: "",
  });

  const discount = discountApplied?.amount || 0;
  const total = subtotal + selectedShipping.price - discount;

  async function applyDiscount() {
    if (!discountCode.trim()) return;
    setIsLoading(true);
    try {
      const res = await fetch("/api/discounts/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: discountCode, subtotal }),
      });
      const data = await res.json();
      if (data.valid) {
        setDiscountApplied({ amount: data.discountAmount, code: discountCode });
      } else {
        alert(data.message || "Geçersiz indirim kodu");
      }
    } catch {
      alert("İndirim kodu kontrol edilirken hata oluştu");
    } finally {
      setIsLoading(false);
    }
  }

  async function handlePlaceOrder() {
    setIsLoading(true);
    try {
      // Sipariş oluştur
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          address,
          shippingOption: selectedShipping,
          discountCode: discountApplied?.code,
          subtotal,
          shippingCost: selectedShipping.price,
          discountAmount: discount,
          totalAmount: total,
        }),
      });

      const order = await res.json();

      // Paytr token al
      const paytrRes = await fetch("/api/payment/paytr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: order.id }),
      });
      const paytrData = await paytrRes.json();

      if (paytrData.iframeToken) {
        // Paytr iframe ile ödeme
        window.location.href = `https://www.paytr.com/odeme/guvenli/${paytrData.iframeToken}`;
      } else {
        // Paytr aktif değil — altyapı hazır mesajı
        alert(`Sipariş oluşturuldu (${order.orderNumber}). Ödeme sistemi yakında aktif olacak!`);
        clearCart();
        window.location.href = "/";
      }
    } catch {
      alert("Sipariş oluşturulurken hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9f6f2]">
        <div className="text-center">
          <h1 className="text-2xl font-serif font-bold text-[#2d1810] mb-3">Sepetiniz Boş</h1>
          <p className="text-[#8a7464] mb-6">Ürün ekleyerek alışverişe başlayın.</p>
          <a href="/products" className="bg-[#2d1810] text-white px-6 py-3 rounded-full font-medium hover:bg-[#1a0f0a] transition">
            Ürünleri Gör
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9f6f2] py-8">
      <div className="max-w-5xl mx-auto px-4">
        {/* Başlık */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-[#2d1810]">Ödeme</h1>
          <div className="flex items-center justify-center gap-2 mt-3 text-xs text-[#8a7464]">
            <Lock className="h-3 w-3" />
            256-bit SSL ile güvende
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sol: Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Adres Formu */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-semibold text-lg text-[#2d1810] flex items-center gap-2 mb-5">
                <MapPin className="h-5 w-5" /> Teslimat Adresi
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { key: "fullName", label: "Ad Soyad", placeholder: "Ahmet Yılmaz", col: "md:col-span-2" },
                  { key: "email", label: "E-posta", placeholder: "ahmet@example.com" },
                  { key: "phone", label: "Telefon", placeholder: "+90 555 123 45 67" },
                  { key: "city", label: "Şehir", placeholder: "İstanbul" },
                  { key: "district", label: "İlçe", placeholder: "Kadıköy" },
                  { key: "addressLine", label: "Açık Adres", placeholder: "Mahalle, sokak, bina no...", col: "md:col-span-2" },
                  { key: "postalCode", label: "Posta Kodu", placeholder: "34700" },
                ].map(({ key, label, placeholder, col }) => (
                  <div key={key} className={col}>
                    <label className="block text-sm font-medium text-[#5a4a3a] mb-1.5">{label}</label>
                    <input
                      type="text"
                      placeholder={placeholder}
                      value={address[key as keyof typeof address]}
                      onChange={(e) => setAddress({ ...address, [key]: e.target.value })}
                      className="w-full border border-[#e8ddd4] rounded-lg px-3 py-2.5 text-sm text-[#2d1810] focus:outline-none focus:ring-2 focus:ring-[#8b6914]/30 focus:border-[#8b6914] placeholder:text-[#c4b5a5]"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Kargo Seçimi */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-semibold text-lg text-[#2d1810] flex items-center gap-2 mb-5">
                <Truck className="h-5 w-5" /> Kargo Seçimi
              </h2>
              <div className="space-y-3">
                {SHIPPING_OPTIONS.map((option) => (
                  <label
                    key={option.id}
                    className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedShipping.id === option.id
                        ? "border-[#8b6914] bg-[#fdf8ee]"
                        : "border-[#e8ddd4] hover:border-[#d4c4aa]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        checked={selectedShipping.id === option.id}
                        onChange={() => setSelectedShipping(option)}
                        className="accent-[#8b6914]"
                      />
                      <div>
                        <div className="font-medium text-sm text-[#2d1810]">{option.label}</div>
                        <div className="text-xs text-[#8a7464]">{option.desc} • {option.company}</div>
                      </div>
                    </div>
                    <div className="font-semibold text-[#2d1810]">
                      {option.price === 0 ? (
                        <span className="text-green-600">Ücretsiz</span>
                      ) : (
                        `₺${option.price.toFixed(2)}`
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Sağ: Sipariş Özeti */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-6">
              <h2 className="font-semibold text-lg text-[#2d1810] mb-5">Sipariş Özeti</h2>

              {/* Ürünler */}
              <div className="space-y-3 mb-5 max-h-48 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#f5f0ea] shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-[#2d1810] truncate">{item.name}</div>
                      <div className="text-xs text-[#8a7464]">x{item.quantity}</div>
                    </div>
                    <div className="text-sm font-semibold text-[#2d1810]">
                      ₺{(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* İndirim Kodu */}
              <div className="flex gap-2 mb-5">
                <input
                  type="text"
                  placeholder="İndirim kodu"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                  className="flex-1 border border-[#e8ddd4] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#8b6914]"
                />
                <button
                  onClick={applyDiscount}
                  className="bg-[#2d1810] text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-[#1a0f0a] transition"
                >
                  Uygula
                </button>
              </div>

              {/* Fiyat Özeti */}
              <div className="space-y-2 text-sm border-t border-[#f0e8e0] pt-4">
                <div className="flex justify-between text-[#5a4a3a]">
                  <span>Ara Toplam ({totalItems} ürün)</span>
                  <span>₺{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#5a4a3a]">
                  <span>Kargo</span>
                  <span>{selectedShipping.price === 0 ? "Ücretsiz" : `₺${selectedShipping.price.toFixed(2)}`}</span>
                </div>
                {discountApplied && (
                  <div className="flex justify-between text-green-600">
                    <span>İndirim ({discountApplied.code})</span>
                    <span>-₺{discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg text-[#2d1810] pt-2 border-t border-[#f0e8e0]">
                  <span>Toplam</span>
                  <span>₺{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Ödeme Butonu */}
              <button
                onClick={handlePlaceOrder}
                disabled={isLoading || !address.fullName || !address.phone || !address.city}
                className="w-full mt-6 bg-gradient-to-r from-[#2d1810] to-[#5a3a20] text-white font-bold py-4 rounded-xl transition-all hover:opacity-90 shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Lock className="h-4 w-4" />
                {isLoading ? "İşlem yapılıyor..." : `₺${total.toFixed(2)} — Güvenli Öde`}
              </button>

              {/* Güvence */}
              <div className="flex items-center justify-center gap-4 mt-4 text-xs text-[#a89080]">
                <span className="flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5" /> SSL Güvenli</span>
                <span className="flex items-center gap-1"><CreditCard className="h-3.5 w-3.5" /> Güvenli Ödeme</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
