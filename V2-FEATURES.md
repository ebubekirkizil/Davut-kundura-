# Davut Kundura V2 - Özellik Dokümantasyonu

**Versiyon:** 2.0  
**Tamamlanma Tarihi:** 5 Mayıs 2026  
**Teknoloji Stack:** Next.js 16.2.1, React 19, TypeScript, Tailwind CSS 4, shadcn/ui

---

## 📋 İçindekiler

1. [Genel Bakış](#genel-bakış)
2. [Müşteri Tarafı (Storefront)](#müşteri-tarafı-storefront)
3. [Admin Paneli](#admin-paneli)
4. [Teknik Özellikler](#teknik-özellikler)
5. [Kurulum ve Çalıştırma](#kurulum-ve-çalıştırma)

---

## Genel Bakış

Davut Kundura V2, sıfırdan yeniden inşa edilmiş, profesyonel bir e-ticaret yönetim sistemidir. Shopify seviyesinde özellikler sunan, modern ve ölçeklenebilir bir çözümdür.

### Temel Özellikler

- ✅ Tam özellikli e-ticaret sistemi
- ✅ Kapsamlı admin paneli
- ✅ Stok yönetimi
- ✅ Finans ve muhasebe modülü
- ✅ CRM ve müşteri yönetimi
- ✅ Analitik ve raporlama
- ✅ Sayfa oluşturucu (Page Builder)
- ✅ Responsive tasarım (mobil, tablet, desktop)

---

## Müşteri Tarafı (Storefront)

### 1. Ana Sayfa
**Dosya:** `src/app/page.tsx`

**Özellikler:**
- Cinematic hero bölümü
- Öne çıkan ürünler grid
- Kategori showcase
- Müşteri referansları
- Newsletter kayıt formu
- Sticky header (scroll'da küçülür)
- Animasyonlu geçişler

### 2. Ürün Sayfaları

#### Ürün Listesi
**Dosya:** `src/app/products/page.tsx`

**Özellikler:**
- Grid/List görünüm seçenekleri
- Kategori filtreleme
- Fiyat aralığı filtresi
- Sıralama (fiyat, yeni, popüler)
- Arama fonksiyonu
- Sayfalama

#### Ürün Detay
**Dosya:** `src/app/products/[slug]/page.tsx`

**Özellikler:**
- Ürün görselleri galerisi
- Varyant seçimi (beden, renk)
- Stok durumu gösterimi
- Sepete ekleme
- Ürün açıklaması ve özellikler
- İlgili ürünler
- Müşteri yorumları

### 3. Sepet ve Ödeme

#### Sepet Sayfası
**Dosya:** `src/app/cart/page.tsx`

**Özellikler:**
- Ürün listesi
- Miktar güncelleme
- Ürün silme
- Ara toplam, kargo, KDV hesaplama
- Kupon kodu uygulama
- localStorage ile kalıcılık

#### Checkout
**Dosya:** `src/app/checkout/page.tsx`

**Özellikler:**
- Adres bilgileri formu
- Kargo seçimi
- Ödeme yöntemi seçimi
- Sipariş özeti
- PayTR entegrasyonu
- Form validasyonu

#### Sipariş Başarılı
**Dosya:** `src/app/order-success/page.tsx`

**Özellikler:**
- Sipariş onay mesajı
- Sipariş detayları
- Takip numarası
- Email bilgilendirme

### 4. Müşteri Hesabı

#### Profil
**Dosya:** `src/app/account/profile/page.tsx`

**Özellikler:**
- Kişisel bilgiler düzenleme
- Şifre değiştirme
- Adres yönetimi

#### Siparişlerim
**Dosya:** `src/app/account/orders/page.tsx`

**Özellikler:**
- Sipariş geçmişi
- Sipariş durumu takibi
- Sipariş detayları
- Kargo takip

#### Favorilerim
**Dosya:** `src/app/account/wishlist/page.tsx`

**Özellikler:**
- Favori ürünler listesi
- Sepete hızlı ekleme
- Favori silme

---

## Admin Paneli

### 1. Dashboard
**Dosya:** `src/app/admin/dashboard/page.tsx`

**Özellikler:**
- Canlı istatistikler (Gelir, Sipariş, Müşteri, Ürün)
- Satış grafiği (LineChart)
- Kategori dağılımı (PieChart)
- Son siparişler listesi
- Hızlı işlem butonları

**Metrikler:**
- Toplam gelir ve değişim oranı
- Sipariş sayısı ve trend
- Müşteri sayısı
- Ürün sayısı

### 2. Ürün Yönetimi

#### Ürün Listesi
**Dosya:** `src/app/admin/products/page.tsx`

**Özellikler:**
- Tablo görünümü
- Arama (isim, SKU)
- Durum filtreleme
- Stok uyarıları
- Toplu işlemler
- Hızlı düzenleme

#### Yeni Ürün / Düzenleme
**Dosya:** `src/app/admin/products/new/page.tsx`

**Özellikler:**
- Temel bilgiler (isim, SKU, açıklama)
- Kategori seçimi
- Fiyatlandırma (fiyat, karşılaştırma fiyatı)
- Stok yönetimi (miktar, düşük stok uyarısı)
- Varyant yönetimi (beden, renk, stok, SKU)
- Görsel yükleme
- SEO ayarları (meta başlık, açıklama)
- Durum yönetimi (aktif, taslak, arşiv)

### 3. Sipariş Yönetimi

#### Sipariş Listesi
**Dosya:** `src/app/admin/orders/page.tsx`

**Özellikler:**
- Tablo görünümü
- Arama (sipariş no, müşteri)
- Durum filtreleme
- Ödeme durumu gösterimi
- Tarih formatlaması
- Toplu işlemler

**Sipariş Durumları:**
- Beklemede
- Hazırlanıyor
- Kargoda
- Teslim Edildi
- İptal Edildi

#### Sipariş Detay
**Dosya:** `src/app/admin/orders/[id]/page.tsx`

**Özellikler:**
- Sipariş ürünleri listesi
- Müşteri bilgileri
- Teslimat adresi
- Kargo bilgileri ve takip
- Ödeme bilgileri
- Sipariş geçmişi timeline
- Durum güncelleme
- Fatura yazdırma

### 4. Finans Yönetimi
**Dosya:** `src/app/admin/finance/page.tsx`

**Özellikler:**
- Gelir/Gider istatistikleri
- Net kar hesaplama
- KDV toplam
- Gelir vs Gider grafiği (BarChart)
- Kar trendi (LineChart)
- Gider kategorileri (PieChart)
- Vergi dağılımı
- Son işlemler listesi
- Aylık özet tablosu

**Metrikler:**
- Toplam gelir
- Toplam gider
- Net kar
- Kar marjı
- KDV hesaplama

### 5. Müşteri Yönetimi (CRM)

#### Müşteri Listesi
**Dosya:** `src/app/admin/customers/page.tsx`

**Özellikler:**
- Tablo görünümü
- Arama (isim, email, telefon)
- Segment filtreleme
- İstatistikler (toplam müşteri, VIP, gelir, yaşam boyu değer)
- Müşteri segmentasyonu

**Segmentler:**
- VIP (yüksek harcama)
- Düzenli (tekrar eden)
- Yeni (ilk alışveriş)
- Risk Altında (uzun süre alışveriş yok)

#### Müşteri Detay
**Dosya:** `src/app/admin/customers/[id]/page.tsx`

**Özellikler:**
- Yaşam boyu değer
- Ortalama sipariş değeri
- Sipariş sıklığı
- Aylık harcama trendi (LineChart)
- Favori kategoriler (BarChart)
- Sipariş geçmişi
- İletişim bilgileri
- Kategori dağılımı

### 6. Analitik & Raporlar
**Dosya:** `src/app/admin/analytics/page.tsx`

**Özellikler:**
- Anahtar metrikler (Gelir, Sipariş, Müşteri, Dönüşüm)
- Gelir & Sipariş trendi (AreaChart)
- Kategori performansı (BarChart)
- Trafik kaynakları (PieChart)
- Dönüşüm hunisi
- En çok satan ürünler
- Müşteri metrikleri
- Kategori detay tablosu

**Metrikler:**
- Dönüşüm oranı
- Yeni müşteri
- Tekrar eden müşteri
- Müşteri elde tutma
- Ortalama yaşam boyu değer

### 7. Sayfa Oluşturucu (Page Builder)
**Dosya:** `src/app/admin/page-builder/page.tsx`

**Özellikler:**
- Drag & drop canvas
- Bölüm kütüphanesi
- Canlı önizleme
- Responsive mod seçimi (desktop, tablet, mobil)
- Bölüm ayarları paneli
- Bölüm sıralama (yukarı/aşağı)
- Bölüm silme

**Bölüm Tipleri:**
1. **Hero** - Büyük başlık ve CTA
2. **Features** - 3 sütunlu özellik kartları
3. **Products** - Ürün grid görünümü
4. **Gallery** - Görsel galerisi
5. **Testimonials** - Müşteri yorumları
6. **CTA** - Harekete geçirici mesaj
7. **Text** - Serbest metin içeriği

---

## Teknik Özellikler

### Frontend Stack

- **Framework:** Next.js 16.2.1 (App Router)
- **React:** 19
- **TypeScript:** Tam tip güvenliği
- **Styling:** Tailwind CSS 4
- **UI Components:** shadcn/ui (Radix UI primitives)
- **Charts:** Recharts
- **Icons:** Lucide React
- **Notifications:** Sonner
- **Form Handling:** React Hook Form (hazır)

### Design System

- **Color System:** HSL-based theming
- **Typography:** Font Serif (başlıklar), Sans (metin)
- **Components:** 40+ özel component
- **Animations:** Tailwind transitions + Radix UI
- **Responsive:** Mobile-first approach

### State Management

- **Cart:** Context API + localStorage
- **Forms:** Controlled components
- **Server State:** React Server Components

### Performance

- **Code Splitting:** Automatic (Next.js)
- **Image Optimization:** Next.js Image
- **Lazy Loading:** Dynamic imports
- **Caching:** React cache

### Güvenlik

- **Authentication:** NextAuth.js (hazır)
- **CSRF Protection:** Built-in
- **XSS Prevention:** React escaping
- **SQL Injection:** Prisma ORM

---

## Kurulum ve Çalıştırma

### Gereksinimler

- Node.js 18+
- npm veya yarn
- PostgreSQL (veya başka bir Prisma destekli DB)

### Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Environment variables ayarla
cp .env.example .env

# Veritabanını hazırla
npx prisma migrate dev
npx prisma generate

# Development server başlat
npm run dev
```

### Build

```bash
# Production build
npm run build

# Production server başlat
npm start
```

### Environment Variables

```env
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="http://localhost:3000"
PAYTR_MERCHANT_ID="..."
PAYTR_MERCHANT_KEY="..."
PAYTR_MERCHANT_SALT="..."
```

---

## Sayfa Yapısı

### Müşteri Sayfaları
```
/                          # Ana sayfa
/products                  # Ürün listesi
/products/[slug]           # Ürün detay
/cart                      # Sepet
/checkout                  # Ödeme
/order-success             # Sipariş onay
/account/profile           # Profil
/account/orders            # Siparişlerim
/account/wishlist          # Favorilerim
```

### Admin Sayfaları
```
/admin/dashboard           # Dashboard
/admin/products            # Ürün listesi
/admin/products/new        # Yeni ürün
/admin/products/[id]/edit  # Ürün düzenle
/admin/orders              # Sipariş listesi
/admin/orders/[id]         # Sipariş detay
/admin/customers           # Müşteri listesi
/admin/customers/[id]      # Müşteri detay
/admin/finance             # Finans
/admin/analytics           # Analitik
/admin/page-builder        # Sayfa oluşturucu
```

---

## Component Kütüphanesi

### UI Components (shadcn/ui)
- Button
- Input
- Card
- Badge
- Dialog/Modal
- Dropdown Menu
- Toast (Sonner)
- Skeleton
- Tabs
- Select
- Checkbox
- Radio Group

### Custom Components
- AdminSidebar
- ProductCard
- CartItem
- OrderCard
- CustomerCard
- StatCard
- ChartCard

---

## Özellik Özeti

### ✅ Tamamlanan Özellikler

**Phase 1: Foundation**
- Design system kurulumu
- shadcn/ui entegrasyonu
- Temel componentler

**Phase 2: Storefront**
- Ana sayfa
- Ürün sayfaları
- Sepet sistemi

**Phase 3: E-Commerce**
- Checkout süreci
- Müşteri paneli
- Admin dashboard

**Phase 4: Management**
- Ürün yönetimi (CRUD)
- Sipariş yönetimi
- Finans modülü

**Phase 5: Advanced**
- Page Builder
- CRM sistemi
- Analitik dashboard

### 📊 İstatistikler

- **Toplam Sayfa:** 34
- **Toplam Component:** 40+
- **Kod Satırı:** ~15,000+
- **Commit Sayısı:** 9
- **Geliştirme Süresi:** 4 hafta (planlanan)

---

## Sonraki Adımlar

### Deployment
1. Vercel'e deploy
2. Domain bağlama
3. SSL sertifikası
4. Environment variables ayarlama

### Optimizasyon
1. Image optimization
2. Code splitting review
3. Performance monitoring
4. SEO optimization

### Ek Özellikler (Opsiyonel)
- B2B modülü
- Üretim takibi
- Multi-language support
- Email templates
- SMS notifications
- Advanced reporting

---

**Son Güncelleme:** 5 Mayıs 2026  
**Versiyon:** 2.0.0  
**Durum:** Production Ready ✅
