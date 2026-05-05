# 🚀 Davut Kundura V2 - Deployment Rehberi

## 📋 Deployment Adımları

### 1. Vercel'e Deploy

#### A. GitHub Repository Bağlantısı
1. [Vercel Dashboard](https://vercel.com/dashboard)'a gidin
2. "Add New Project" tıklayın
3. GitHub repository'nizi seçin: `ebubekirkizil/Davut-kundura-`
4. Branch olarak **`v2-rebuild`** seçin

#### B. Build Ayarları
```
Framework Preset: Next.js
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

#### C. Environment Variables
Aşağıdaki environment variables'ları ekleyin:

```env
# Database (Supabase PostgreSQL)
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.kiegzuemejzaumbquxjr.supabase.co:5432/postgres"
DIRECT_URL="postgresql://postgres:[PASSWORD]@db.kiegzuemejzaumbquxjr.supabase.co:5432/postgres"

# NextAuth (Session Management)
NEXTAUTH_SECRET="your-random-secret-key-here"
NEXTAUTH_URL="https://davutkundura.shop"

# PayTR (Ödeme Sistemi)
PAYTR_MERCHANT_ID="your-merchant-id"
PAYTR_MERCHANT_KEY="your-merchant-key"
PAYTR_MERCHANT_SALT="your-merchant-salt"

# Node Environment
NODE_ENV="production"
```

**NEXTAUTH_SECRET Oluşturma:**
```bash
openssl rand -base64 32
```

### 2. Domain Bağlama (davutkundura.shop)

#### Vercel'de Domain Ayarları
1. Vercel Dashboard > Project Settings > Domains
2. "Add Domain" tıklayın
3. `davutkundura.shop` girin
4. DNS kayıtlarını güncelleyin:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 3. Database Migration

Deployment sonrası Prisma migration'ları çalıştırın:

```bash
# Vercel Dashboard > Project > Settings > Environment Variables
# Sonra terminal'de:
npx prisma migrate deploy
npx prisma generate
```

### 4. İlk Kurulum (Admin Oluşturma)

#### Yöntem 1: Web Üzerinden (Önerilen)
1. `https://davutkundura.shop/setup` adresine gidin
2. Admin bilgilerini girin:
   - **Email:** ebukizil@gmail.com
   - **Şifre:** 123456
   - **İsim:** Admin
3. "Admin Kullanıcısı Oluştur" tıklayın
4. `/admin/login` sayfasına yönlendirileceksiniz

#### Yöntem 2: Vercel CLI ile
```bash
# Vercel CLI yükleyin
npm i -g vercel

# Project'e bağlanın
vercel link

# Admin oluşturma scriptini çalıştırın
vercel env pull .env.local
npm run create-admin
```

### 5. Admin Paneline Giriş

1. `https://davutkundura.shop/admin/login` adresine gidin
2. Giriş bilgileri:
   - **Email:** ebukizil@gmail.com
   - **Şifre:** 123456
3. Giriş yaptıktan sonra `/admin/dashboard` açılacak

---

## 🔧 Deployment Sonrası Kontroller

### ✅ Checklist

- [ ] Ana sayfa açılıyor (`/`)
- [ ] Ürünler sayfası çalışıyor (`/products`)
- [ ] Sepet sistemi çalışıyor (`/cart`)
- [ ] Admin login sayfası açılıyor (`/admin/login`)
- [ ] Admin paneli erişilebilir (`/admin/dashboard`)
- [ ] Database bağlantısı çalışıyor
- [ ] Environment variables doğru ayarlanmış
- [ ] Domain SSL sertifikası aktif (https)

### 🧪 Test Edilecek Özellikler

**Müşteri Tarafı:**
1. Ana sayfa yükleniyor mu?
2. Ürün listesi görünüyor mu?
3. Ürün detay sayfası açılıyor mu?
4. Sepete ürün eklenebiliyor mu?
5. Checkout sayfası çalışıyor mu?

**Admin Paneli:**
1. Login çalışıyor mu?
2. Dashboard istatistikleri görünüyor mu?
3. Ürün ekleme/düzenleme çalışıyor mu?
4. Sipariş listesi görünüyor mu?
5. Finans sayfası açılıyor mu?
6. Müşteri listesi çalışıyor mu?
7. Analitik sayfası görünüyor mu?
8. Page Builder açılıyor mu?

---

## 🐛 Sorun Giderme

### Build Hatası
```bash
# Local'de build test edin
npm run build

# Hata varsa log'ları kontrol edin
vercel logs
```

### Database Bağlantı Hatası
- Environment variables'ları kontrol edin
- Supabase database'in aktif olduğundan emin olun
- IP whitelist ayarlarını kontrol edin

### Admin Login Çalışmıyor
- `/setup` sayfasından admin oluşturun
- Database'de User tablosunu kontrol edin
- Browser console'da hata var mı kontrol edin

### 404 Hatası
- Vercel'de doğru branch'in deploy edildiğinden emin olun
- Build log'larını kontrol edin
- Cache'i temizleyin: Vercel Dashboard > Deployments > ... > Redeploy

---

## 📊 Monitoring & Analytics

### Vercel Analytics
1. Vercel Dashboard > Analytics
2. Performance metrikleri
3. Error tracking

### Database Monitoring
1. Supabase Dashboard > Database
2. Query performance
3. Connection pool

---

## 🔄 Güncelleme Süreci

### Yeni Özellik Deploy Etme

```bash
# Local'de değişiklik yapın
git add .
git commit -m "feat: Yeni özellik"
git push origin v2-rebuild

# Vercel otomatik deploy edecek
# Dashboard'dan deployment'ı takip edin
```

### Production'a Merge

```bash
# v2-rebuild branch'ini main'e merge edin
git checkout main
git merge v2-rebuild
git push origin main

# Vercel production deployment yapacak
```

---

## 🎯 Performans Optimizasyonu

### Image Optimization
- Next.js Image component kullanılıyor
- Otomatik WebP dönüşümü
- Lazy loading aktif

### Code Splitting
- Automatic code splitting (Next.js)
- Dynamic imports kullanılıyor
- Route-based splitting

### Caching
- Static pages cached
- API routes optimized
- Browser caching headers

---

## 🔐 Güvenlik

### Aktif Güvenlik Özellikleri
- ✅ Password hashing (bcryptjs)
- ✅ HTTP-only cookies
- ✅ CSRF protection (Next.js built-in)
- ✅ XSS prevention (React escaping)
- ✅ SQL injection prevention (Prisma ORM)
- ✅ Role-based access control

### Önerilen Ek Güvenlik
- [ ] Rate limiting ekleyin
- [ ] 2FA (Two-factor authentication)
- [ ] IP whitelist (admin panel)
- [ ] Security headers (Helmet.js)
- [ ] Regular security audits

---

## 📞 Destek

### Sorun mu yaşıyorsunuz?

1. **Build Logs:** Vercel Dashboard > Deployments > Build Logs
2. **Runtime Logs:** Vercel Dashboard > Deployments > Function Logs
3. **Database:** Supabase Dashboard > Logs

### Hızlı Komutlar

```bash
# Local development
npm run dev

# Build test
npm run build

# Production preview
vercel --prod

# Logs
vercel logs

# Environment variables
vercel env pull
```

---

## ✅ Deployment Tamamlandı!

Siteniz artık canlı: **https://davutkundura.shop**

### İlk Adımlar:
1. ✅ `/setup` sayfasından admin oluşturun
2. ✅ `/admin/login` ile giriş yapın
3. ✅ `/admin/dashboard` kontrol edin
4. ✅ Tüm sayfaları test edin

**Başarılar! 🎉**
