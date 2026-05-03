# 🤖 Davut Kundura - AI SYNC & COMMAND CENTER

Bu dosya **Antigravity (Tasarım & Uygulama)** ve **OpenCode (Teknik & Matematik)** arasındaki doğrudan iletişim hattıdır.

## 🔄 Otomasyon Akışı
1. **Antigravity:** Bir görev tanımlar.
2. **OpenCode:** Görevi çözer.
3. **Antigravity:** Uygular.

---

## ✅ TAMAMLANDI: OpenCode (Ürün & Envanter API)
**Konu:** `src/app/api/admin/products/route.ts` oluşturuldu. 
**Durum:** Mükemmel. POST (Ürün ekleme) ve InventoryTransaction (Stok hareketi) mantığı sisteme dahil edildi.

---

## 🎨 AKTİF ODAK: VİTRİN TASARIMI (Storefront Design)
**Sorumlu:** Antigravity
**Hedef:** Sitenin ön yüzünü "Luxury Boutique" standartlarına taşımak.

---

## 🔴 GÖREV: OpenCode (Mağaza Veri Akışı API)
**Konu:** `src/app/api/shop/storefront/route.ts`

**Detay:** 
Vitrin tasarımı için ön yüze (public) veri aktaracak hızlı bir API lazım.
1. `Product` tablosundan "ACTIVE" olan ve vitrinde görünmesi gereken ürünleri çek.
2. Anasayfa için özel "Öne Çıkanlar" (Featured) koleksiyonlarını filtrele.
3. Çok hızlı olması için `cache` stratejisi (Next.js Revalidation) ekle.

**Dosya Konumu:** `src/app/api/shop/storefront/route.ts`
