'use client';

import Link from "next/link";
import { Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotals } = useCartStore();
  const { subtotal } = getTotals();
  const tax = subtotal * 0.20; // %20 VAT mock
  const total = subtotal + tax;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-6 py-24 min-h-[60vh] flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-10 h-10 text-foreground/40" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-foreground mb-4">Sepetiniz Boş</h1>
        <p className="text-foreground/70 mb-8 max-w-md mx-auto">
          Şu an sepetinizde hiç ürün bulunmuyor. Premium koleksiyonumuzu incelemek için alışverişe başlayın.
        </p>
        <Link 
          href="/products" 
          className="bg-black text-white px-8 py-4 rounded-full font-medium transition-all hover:bg-black/80 flex items-center gap-2 dark:bg-white dark:text-black dark:hover:bg-gray-200"
        >
          Alışverişe Devam Et
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12 pt-24 font-sans">
      <h1 className="font-serif text-4xl font-bold text-foreground mb-10">Alışveriş Sepeti</h1>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart Items */}
        <div className="flex-1 space-y-6">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row gap-6 p-4 rounded-2xl border border-border/50 bg-white/50 dark:bg-muted/30">
              <div className="w-full sm:w-32 h-32 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-foreground">{item.name}</h3>
                    <p className="text-sm font-semibold text-foreground/70 mt-1">
                      {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(item.price)}
                    </p>
                  </div>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors dark:hover:bg-red-500/10"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center border border-border rounded-full overflow-hidden">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-4 py-1 hover:bg-muted transition-colors text-lg"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-medium text-sm">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-4 py-1 hover:bg-muted transition-colors text-lg"
                    >
                      +
                    </button>
                  </div>
                  <span className="ml-auto font-bold text-lg">
                    {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(item.price * item.quantity)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-[400px]">
          <div className="glass rounded-3xl p-8 sticky top-24">
            <h2 className="font-serif text-2xl font-bold mb-6">Sipariş Özeti</h2>
            
            <div className="space-y-4 text-sm mb-6">
              <div className="flex justify-between text-foreground/80">
                <span>Ara Toplam</span>
                <span>{new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(subtotal)}</span>
              </div>
              <div className="flex justify-between text-foreground/80">
                <span>KDV (%20)</span>
                <span>{new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(tax)}</span>
              </div>
              <div className="flex justify-between text-foreground/80">
                <span>Kargo</span>
                <span className="text-green-600 font-medium">Ücretsiz</span>
              </div>
            </div>
            
            <div className="border-t border-border pt-4 mb-8">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Genel Toplam</span>
                <span className="text-accent">{new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(total)}</span>
              </div>
            </div>
            
            <button className="w-full bg-primary hover:bg-primary-hover text-white py-4 rounded-full font-bold transition-all flex items-center justify-center gap-2 border border-primary dark:border-border">
              Güvenle Öde
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="mt-4 text-center text-xs text-foreground/50">
              256-bit SSL şifreleme ile %100 güvenli alışveriş.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
