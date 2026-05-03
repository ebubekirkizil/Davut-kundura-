# 🎨 DAVUT KUNDURA TASARIM SİSTEMİ

**Versiyon:** 1.0  
**Son Güncelleme:** 4 Mayıs 2026  
**Tasarım Dili:** Luxe Minimalism

---

## 📐 Tasarım Felsefesi

Davut Kundura'nın tasarım sistemi, **geleneksel zanaat** ile **modern minimalizm**i birleştiren lüks bir deneyim sunar. Her element, ustalık, kalite ve zarafet değerlerini yansıtır.

### Temel Prensipler

1. **Zarafet** - Her detayda incelik ve sofistike
2. **Okunabilirlik** - Net tipografi ve hiyerarşi
3. **Hava** - Bol beyaz alan kullanımı
4. **Hareket** - Akıcı ve anlamlı animasyonlar
5. **Tutarlılık** - Tüm sayfalarda aynı dil

---

## 🎨 Renk Paleti

### Ana Renkler

```css
--text-primary: rgb(13, 13, 13)      /* Espresso - Ana metin */
--text-secondary: rgb(107, 114, 128)  /* Gri - İkincil metin */
--accent: rgb(212, 175, 55)           /* Altın - Vurgu rengi */
--bg-primary: rgb(253, 251, 247)      /* Krem - Ana arka plan */
--bg-secondary: rgb(249, 247, 243)    /* Açık Krem - İkincil arka plan */
--border: rgb(229, 231, 235)          /* Açık Gri - Kenarlıklar */
```

### Kullanım Örnekleri

- **Başlıklar:** `var(--text-primary)`
- **Paragraflar:** `var(--text-secondary)`
- **Butonlar:** `var(--text-primary)` arka plan, hover'da `var(--accent)`
- **Linkler:** `var(--text-primary)`, hover'da `var(--accent)`
- **Kartlar:** `white` arka plan, `var(--border)` kenarlık

---

## 📝 Tipografi

### Font Aileleri

```css
--font-serif: "Cinzel", serif        /* Başlıklar için */
--font-sans: "Inter", sans-serif     /* Gövde metni için */
--font-brand: "Cinzel", serif        /* Logo ve marka */
```

### Tipografi Skalası

| Element | Font | Size | Weight | Line Height | Letter Spacing |
|---------|------|------|--------|-------------|----------------|
| H1 | Cinzel | 72px | 700 | 1.1 | -0.02em |
| H2 | Cinzel | 48px | 700 | 1.2 | -0.01em |
| H3 | Cinzel | 36px | 600 | 1.3 | 0 |
| H4 | Cinzel | 24px | 600 | 1.4 | 0 |
| Body Large | Inter | 20px | 300 | 1.6 | 0 |
| Body | Inter | 16px | 400 | 1.6 | 0 |
| Body Small | Inter | 14px | 400 | 1.5 | 0 |
| Caption | Inter | 12px | 500 | 1.4 | 0.05em |
| Label | Inter | 11px | 800 | 1.3 | 0.2em |

### Kullanım Kuralları

- **Başlıklar:** Her zaman Cinzel serif font
- **Gövde Metni:** Inter sans-serif, 300-400 weight
- **Butonlar:** Inter, 700-800 weight, uppercase, letter-spacing: 0.2em
- **Etiketler:** Inter, 800 weight, uppercase, letter-spacing: 0.3em

---

## 📏 Spacing System

8px tabanlı spacing sistemi:

```css
4px   → 0.5 rem  → gap-2, p-2
8px   → 1 rem    → gap-4, p-4
12px  → 1.5 rem  → gap-6, p-6
16px  → 2 rem    → gap-8, p-8
24px  → 3 rem    → gap-12, p-12
32px  → 4 rem    → gap-16, p-16
48px  → 6 rem    → gap-24, p-24
64px  → 8 rem    → gap-32, p-32
96px  → 12 rem   → gap-48, p-48
```

### Kullanım Örnekleri

- **Bileşen içi padding:** 24px (p-6) veya 32px (p-8)
- **Section padding:** 96px (py-24) dikey, 48px (px-12) yatay
- **Element arası boşluk:** 16px (gap-4) veya 24px (gap-6)
- **Kartlar arası:** 32px (gap-8)

---

## 🔲 Bileşenler

### Butonlar

#### Primary Button
```tsx
<button className="px-10 py-4 bg-[var(--text-primary)] text-white rounded-none hover:bg-[var(--accent)] transition-colors duration-300 font-sans tracking-wide uppercase text-sm shadow-2xl">
  Buton Metni
</button>
```

#### Secondary Button
```tsx
<button className="px-8 py-3 bg-white border border-[var(--border)] text-[var(--text-primary)] rounded-xl hover:bg-[var(--bg-secondary)] transition-all">
  Buton Metni
</button>
```

### Kartlar

#### Standart Kart
```tsx
<div className="bg-white border border-[var(--border)] rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-500">
  {/* İçerik */}
</div>
```

#### Lüks Kart (Hover Efektli)
```tsx
<div className="bg-white border border-[var(--border)] rounded-3xl p-8 shadow-sm hover:shadow-[var(--shadow-premium)] hover:-translate-y-1 transition-all duration-500">
  {/* İçerik */}
</div>
```

### Input Alanları

```tsx
<input 
  type="text"
  className="w-full bg-[var(--bg-secondary)] border border-transparent focus:bg-white focus:border-[var(--accent)] rounded-2xl px-5 py-4 text-[14px] font-bold text-[var(--text-primary)] outline-none transition-all shadow-inner"
  placeholder="Placeholder..."
/>
```

---

## ✨ Animasyonlar

### Transition Süreleri

```css
duration-300  → 300ms  → Hızlı etkileşimler (hover, click)
duration-500  → 500ms  → Orta hızda geçişler (modal, dropdown)
duration-700  → 700ms  → Yavaş, dramatik geçişler
duration-1000 → 1000ms → Çok yavaş, sinematik efektler
```

### Easing Functions

```css
ease-in-out   → Standart geçişler
ease-out      → Fade-in animasyonları
ease-in       → Fade-out animasyonları
[0.16, 1, 0.3, 1] → Özel cubic-bezier (smooth entrance)
```

### Hazır Animasyonlar

```tsx
// Fade In
<div className="animate-in fade-in duration-500">

// Slide In From Right
<div className="animate-in slide-in-from-right duration-500">

// Zoom In
<div className="animate-in zoom-in-95 duration-300">

// Shimmer Effect
<div className="animate-shimmer">

// Marquee (Sonsuz Kaydırma)
<div className="animate-marquee">
```

---

## 🌓 Gölgeler

```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05)
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1)
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1)
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1)
--shadow-premium: 0 25px 50px -12px rgba(212, 175, 55, 0.25)
```

### Kullanım

- **Kartlar:** `shadow-sm` default, `shadow-xl` hover
- **Modaller:** `shadow-2xl`
- **Premium Elementler:** `shadow-[var(--shadow-premium)]`
- **Butonlar:** `shadow-lg`

---

## 📐 Border Radius

```css
rounded-none   → 0px      → Butonlar, hero bölümleri
rounded-lg     → 8px      → Küçük elementler
rounded-xl     → 12px     → Input, küçük kartlar
rounded-2xl    → 16px     → Standart kartlar
rounded-3xl    → 24px     → Büyük kartlar, modaller
rounded-full   → 9999px   → Yuvarlak butonlar, badge'ler
```

---

## 🎭 Glass Morphism

### Glass Header
```tsx
<header className="glass-header">
  {/* İçerik */}
</header>
```

CSS:
```css
.glass-header {
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}
```

### Glass Modal
```tsx
<div className="glass-modal">
  {/* İçerik */}
</div>
```

---

## 📱 Responsive Breakpoints

```css
sm:   640px   → Mobil (büyük)
md:   768px   → Tablet
lg:   1024px  → Laptop
xl:   1280px  → Desktop
2xl:  1536px  → Büyük ekranlar
```

### Responsive Kullanım

```tsx
<div className="text-2xl md:text-4xl lg:text-6xl">
  {/* Mobilde 2xl, tablette 4xl, laptopda 6xl */}
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
  {/* Mobilde 1 sütun, tablette 2, laptopda 4 */}
</div>
```

---

## 🎯 Section Yapıları

### Hero Section
- **Yükseklik:** `h-screen` (100vh)
- **Padding:** `px-4 md:px-12`
- **Alignment:** Center veya Left
- **Background:** Gradient + Image overlay

### Content Section
- **Padding:** `py-24 px-6 md:px-12`
- **Max Width:** `max-w-7xl mx-auto`
- **Background:** `bg-[var(--bg-primary)]` veya `bg-[var(--bg-secondary)]`

### Footer
- **Background:** `bg-[var(--text-primary)]` (koyu)
- **Text Color:** `text-white`
- **Padding:** `py-16 px-6 md:px-12`

---

## 🔧 Kullanım Örnekleri

### Lüks Kart Hover Efekti

```tsx
<div className="group bg-white border border-[var(--border)] rounded-3xl p-8 shadow-sm hover:shadow-[var(--shadow-premium)] hover:-translate-y-1 transition-all duration-500 cursor-pointer">
  <div className="w-12 h-12 bg-[var(--accent)]/10 rounded-xl flex items-center justify-center group-hover:bg-[var(--accent)] transition-colors">
    <Icon className="text-[var(--accent)] group-hover:text-white transition-colors" />
  </div>
  <h3 className="text-xl font-serif mt-4 group-hover:text-[var(--accent)] transition-colors">
    Başlık
  </h3>
</div>
```

### Gradient Text

```tsx
<h1 className="text-gradient-gold text-6xl font-serif">
  Altın Renkli Başlık
</h1>
```

### Scrollbar Styling

```tsx
<div className="overflow-y-auto custom-scrollbar">
  {/* İçerik */}
</div>
```

---

## 📚 Bileşen Kütüphanesi

### Mevcut Section Bileşenleri

1. **HeaderSection** - Sticky navigation bar
2. **HeroSection** - Full-screen hero banner
3. **RichTextSection** - Text content block
4. **CategoryGridSection** - Product category grid
5. **FooterSection** - Footer with multiple blocks

### Yakında Eklenecekler

- ProductGridSection - Ürün listesi
- VideoHeroSection - Video background hero
- TestimonialSection - Müşteri yorumları
- CTASection - Call-to-action banner
- GallerySection - Görsel galeri

---

## 🎨 Renk Kombinasyonları

### Önerilen Kombinasyonlar

1. **Klasik Lüks**
   - Background: `var(--bg-primary)`
   - Text: `var(--text-primary)`
   - Accent: `var(--accent)`

2. **Koyu Tema**
   - Background: `var(--text-primary)`
   - Text: `white`
   - Accent: `var(--accent)`

3. **Soft Contrast**
   - Background: `var(--bg-secondary)`
   - Text: `var(--text-secondary)`
   - Accent: `var(--text-primary)`

---

## ✅ Checklist: Yeni Bileşen Oluştururken

- [ ] CSS değişkenlerini kullan (`var(--text-primary)`)
- [ ] Responsive tasarım (sm, md, lg breakpoints)
- [ ] Hover efektleri ekle (transition-all duration-300)
- [ ] Accessibility (ARIA labels, semantic HTML)
- [ ] Framer Motion animasyonları (fade-in, slide-in)
- [ ] Consistent spacing (8px grid system)
- [ ] Typography hierarchy (Cinzel başlıklar, Inter body)
- [ ] Shadow kullan (hover'da shadow-xl)

---

**Tasarım Sistemi Sahibi:** Davut Kundura  
**Geliştirici:** Claude Sonnet 4  
**Framework:** Next.js 16 + Tailwind CSS 4 + Framer Motion
