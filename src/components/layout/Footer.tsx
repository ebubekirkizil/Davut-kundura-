import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#f5f1ea] text-[#3d2f24] border-t border-[#d8cec0] pt-12 pb-8">
      <div className="container mx-auto px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand & Description */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex flex-col items-start mb-6">
              <span className="font-serif text-[28px] tracking-widest text-[#3d2f24] leading-none mb-1 flex items-baseline" style={{ fontFamily: 'var(--font-cinzel)' }}>
                <span className="text-[34px]">D</span>AVUT <span className="text-[34px] ml-1.5">K</span>UNDURA
              </span>
              <span className="font-sans text-[10px] font-semibold tracking-[0.25em] text-[#5e4b3c] uppercase px-1">
                ZANAATTAN ADIMA
              </span>
            </Link>
            <p className="text-[13px] leading-relaxed text-[#5e4b3c]">
              Yılların verdiği tecrübe ile en kaliteli deri ürünlerin, özel yapım kemerler ve profesyonel ayakkabı bakım ürünlerinde güvenilir adresiniz.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-muted/70 hover:text-accent transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="#" className="text-muted/70 hover:text-accent transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#" className="text-muted/70 hover:text-accent transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-sans text-[13px] font-bold tracking-widest uppercase text-[#3d2f24]">Hızlı Menü</h3>
            <ul className="space-y-3 text-[13px] text-[#5e4b3c]">
              <li>
                <Link href="/products" className="hover:text-[#9b6a4a] transition-colors">Tüm Ürünler</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#9b6a4a] transition-colors">Hakkımızda</Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#9b6a4a] transition-colors">Sıkça Sorulan Sorular</Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-[#9b6a4a] transition-colors">Kargo ve Teslimat</Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-[#9b6a4a] transition-colors">İade Politikası</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-sans text-[13px] font-bold tracking-widest uppercase text-[#3d2f24]">Kategoriler</h3>
            <ul className="space-y-3 text-[13px] text-[#5e4b3c]">
              <li>
                <Link href="/products?category=insole" className="hover:text-[#9b6a4a] transition-colors">Ortopedik Tabanlar</Link>
              </li>
              <li>
                <Link href="/products?category=belt" className="hover:text-[#9b6a4a] transition-colors">Hakiki Deri Kemerler</Link>
              </li>
              <li>
                <Link href="/products?category=care" className="hover:text-[#9b6a4a] transition-colors">Ayakkabı Bakım Setleri</Link>
              </li>
              <li>
                <Link href="/products?category=luggage" className="hover:text-[#9b6a4a] transition-colors">Valiz Yedek Parçaları</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-sans text-[13px] font-bold tracking-widest uppercase text-[#3d2f24]">İletişim</h3>
            <ul className="space-y-4 text-[13px] text-[#5e4b3c]">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-[#9b6a4a] shrink-0" />
                <span>Merkez Mah. Ayakkabıcılar Çarşısı<br/>İstanbul, Türkiye</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-[#9b6a4a] shrink-0" />
                <span>+90 (555) 123 45 67</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-[#9b6a4a] shrink-0" />
                <span>info@davutkundura.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-16 border-t border-[#d8cec0] pt-6 flex flex-col md:flex-row items-center justify-between text-[11px] text-[#5e4b3c] font-medium tracking-wide">
          <p>© {new Date().getFullYear()} DAVUT KUNDURA. TÜM HAKLARI SAKLIDIR.</p>
          <div className="flex space-x-6 mt-4 md:mt-0 uppercase">
            <Link href="/privacy" className="hover:text-[#3d2f24] transition-colors">Gizlilik Politikası</Link>
            <Link href="/terms" className="hover:text-[#3d2f24] transition-colors">Kullanım Şartları</Link>
            <Link href="/dashboard" className="hover:text-[#3d2f24] transition-colors">Yönetim</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
