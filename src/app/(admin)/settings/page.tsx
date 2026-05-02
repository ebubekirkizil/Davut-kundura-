"use client";

import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { Save, Globe, Smartphone, Store, Lock, Eye, EyeOff, CheckCircle2, AlertCircle, Loader2, User, LogOut } from "lucide-react";

export default function SettingsCMSPage() {
  const { data: session } = useSession();
  
  // Şifre değiştirme state'leri
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [pwLoading, setPwLoading] = useState(false);
  const [pwMessage, setPwMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function changePassword(e: React.FormEvent) {
    e.preventDefault();
    setPwMessage(null);
    if (newPw !== confirmPw) {
      setPwMessage({ type: "error", text: "Yeni şifreler eşleşmiyor" });
      return;
    }
    if (newPw.length < 4) {
      setPwMessage({ type: "error", text: "Şifre en az 4 karakter olmalı" });
      return;
    }
    setPwLoading(true);
    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword: currentPw, newPassword: newPw }),
      });
      const data = await res.json();
      if (res.ok) {
        setPwMessage({ type: "success", text: "Şifreniz başarıyla güncellendi!" });
        setCurrentPw(""); setNewPw(""); setConfirmPw("");
      } else {
        setPwMessage({ type: "error", text: data.error || "Bir hata oluştu" });
      }
    } catch {
      setPwMessage({ type: "error", text: "Sunucuya bağlanılamadı" });
    } finally {
      setPwLoading(false);
    }
  }

  // CMS ayarları state'leri
  const [cmsLoading, setCmsLoading] = useState(false);
  const [heroTitle, setHeroTitle] = useState("Konfor ve Tarz Bir Arada.");
  const [heroSubtitle, setHeroSubtitle] = useState("Günlük Kullanıma Uygun Deri Ayakkabılar.");
  const [phone, setPhone] = useState("+90 (555) 123 45 67");
  const [email, setEmail] = useState("info@davutkundura.com");
  const [address, setAddress] = useState("Merkez Mah. Ayakkabıcılar Çarşısı No:45 İstanbul");

  async function saveCMS() {
    setCmsLoading(true);
    await new Promise(r => setTimeout(r, 800)); // Simülasyon
    setCmsLoading(false);
    alert("CMS ayarları kaydedildi! ✅");
  }

  // Enterprise Modülleri Toggle State'leri
  const [modules, setModules] = useState({
    production: true,
    multiWarehouse: false,
    b2b: false,
    ticketing: true,
    auditLogs: true
  });

  const toggleModule = (key: keyof typeof modules) => {
    setModules(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      
      {/* Başlık */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-primary">Mağaza Ayarları</h1>
          <p className="text-sm text-slate-500 mt-1">
            Vitrin içeriklerini ve hesap ayarlarınızı buradan yönetin.
          </p>
        </div>
        <button
          onClick={saveCMS}
          disabled={cmsLoading}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-md font-medium transition-colors shadow-sm disabled:opacity-60"
        >
          {cmsLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Değişiklikleri Yayınla
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">

          {/* ─── Hesap & Güvenlik ─── */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6 text-primary border-b border-slate-100 pb-4">
              <User className="h-5 w-5" />
              <h2 className="font-semibold text-lg">Hesap Bilgileri</h2>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200 mb-4">
              <div>
                <div className="font-medium text-slate-800">{session?.user?.name || "Ebubekir Kızıl"}</div>
                <div className="text-sm text-slate-500">{session?.user?.email || "ebukizil@gmail.com"}</div>
                <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                  Admin
                </span>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: "/admin/login" })}
                className="flex items-center gap-2 text-red-500 hover:bg-red-50 px-3 py-2 rounded-lg text-sm font-medium transition-colors border border-red-200"
              >
                <LogOut className="h-4 w-4" /> Çıkış Yap
              </button>
            </div>
          </div>

          {/* ─── Şifre Değiştirme ─── */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6 text-primary border-b border-slate-100 pb-4">
              <Lock className="h-5 w-5" />
              <h2 className="font-semibold text-lg">Şifre Değiştir</h2>
            </div>

            <form onSubmit={changePassword} className="space-y-4">
              {/* Mevcut Şifre */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Mevcut Şifre</label>
                <div className="relative">
                  <input
                    type={showCurrentPw ? "text" : "password"}
                    value={currentPw}
                    onChange={e => setCurrentPw(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 pr-10 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                  />
                  <button type="button" onClick={() => setShowCurrentPw(!showCurrentPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    {showCurrentPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <a href="/admin/forgot-password" className="text-xs text-green-600 hover:text-green-700 mt-1 inline-block transition-colors">
                  Şifrenizi mi unuttunuz?
                </a>
              </div>

              {/* Yeni Şifre */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Yeni Şifre</label>
                <div className="relative">
                  <input
                    type={showNewPw ? "text" : "password"}
                    value={newPw}
                    onChange={e => setNewPw(e.target.value)}
                    required
                    minLength={4}
                    placeholder="Yeni şifreniz (min. 4 karakter)"
                    className="w-full px-4 py-2.5 pr-10 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                  />
                  <button type="button" onClick={() => setShowNewPw(!showNewPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    {showNewPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Şifre Tekrar */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Şifre Tekrar</label>
                <input
                  type="password"
                  value={confirmPw}
                  onChange={e => setConfirmPw(e.target.value)}
                  required
                  placeholder="Yeni şifrenizi tekrar girin"
                  className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:border-primary outline-none transition-colors ${
                    confirmPw && newPw !== confirmPw
                      ? "border-red-300 focus:ring-red-200"
                      : confirmPw && newPw === confirmPw
                      ? "border-green-300 focus:ring-green-200"
                      : "border-slate-300 focus:ring-primary/20"
                  }`}
                />
                {confirmPw && newPw !== confirmPw && (
                  <p className="text-xs text-red-500 mt-1">Şifreler eşleşmiyor</p>
                )}
                {confirmPw && newPw === confirmPw && newPw.length >= 4 && (
                  <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Şifreler eşleşiyor
                  </p>
                )}
              </div>

              {/* Mesaj */}
              {pwMessage && (
                <div className={`flex items-center gap-2 text-sm px-4 py-3 rounded-lg ${
                  pwMessage.type === "success"
                    ? "bg-green-50 border border-green-200 text-green-700"
                    : "bg-red-50 border border-red-200 text-red-600"
                }`}>
                  {pwMessage.type === "success"
                    ? <CheckCircle2 className="h-4 w-4 shrink-0" />
                    : <AlertCircle className="h-4 w-4 shrink-0" />}
                  {pwMessage.text}
                </div>
              )}

              <button
                type="submit"
                disabled={pwLoading}
                className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-60"
              >
                {pwLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
                Şifreyi Güncelle
              </button>
            </form>
          </div>

          {/* ─── ENTERPRISE ERP MODÜL YÖNETİMİ ─── */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-2 text-indigo-600 border-b border-slate-100 pb-4">
              <Store className="h-5 w-5" />
              <h2 className="font-semibold text-lg">Holding / Enterprise Modülleri</h2>
            </div>
            <p className="text-[13px] text-slate-500 mb-6">İleride sistemi başka firmalara (SaaS) sattığınızda, firmanın ihtiyacına göre sol menüdeki bu gelişmiş modülleri açıp kapatabilirsiniz.</p>
            
            <div className="space-y-4">
               {/* Toggle 1 */}
               <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:border-indigo-300 transition-colors">
                  <div>
                     <div className="font-semibold text-[14px] text-slate-800">Üretim & Atölye Yönetimi (Kanban)</div>
                     <div className="text-[12px] text-slate-500">Fabrika üretim aşamalarını ve hammadde stoklarını takip eder.</div>
                  </div>
                  <button onClick={() => toggleModule('production')} className={`w-12 h-6 rounded-full flex items-center p-1 transition-colors ${modules.production ? 'bg-indigo-600 justify-end' : 'bg-slate-300 justify-start'}`}>
                     <div className="w-4 h-4 bg-white rounded-full shadow-md"></div>
                  </button>
               </div>
               
               {/* Toggle 2 */}
               <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:border-indigo-300 transition-colors">
                  <div>
                     <div className="font-semibold text-[14px] text-slate-800">Çoklu Depo Yönetimi</div>
                     <div className="text-[12px] text-slate-500">Farklı şehirlerdeki depolar arası stok transferi ve lokasyon yönetimi.</div>
                  </div>
                  <button onClick={() => toggleModule('multiWarehouse')} className={`w-12 h-6 rounded-full flex items-center p-1 transition-colors ${modules.multiWarehouse ? 'bg-indigo-600 justify-end' : 'bg-slate-300 justify-start'}`}>
                     <div className="w-4 h-4 bg-white rounded-full shadow-md"></div>
                  </button>
               </div>

               {/* Toggle 3 */}
               <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:border-indigo-300 transition-colors">
                  <div>
                     <div className="font-semibold text-[14px] text-slate-800">B2B Toptan Satış Portalı</div>
                     <div className="text-[12px] text-slate-500">Bayilere özel açık hesap limitleri ve toptancı indirimleri.</div>
                  </div>
                  <button onClick={() => toggleModule('b2b')} className={`w-12 h-6 rounded-full flex items-center p-1 transition-colors ${modules.b2b ? 'bg-indigo-600 justify-end' : 'bg-slate-300 justify-start'}`}>
                     <div className="w-4 h-4 bg-white rounded-full shadow-md"></div>
                  </button>
               </div>

               {/* Toggle 4 */}
               <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:border-indigo-300 transition-colors">
                  <div>
                     <div className="font-semibold text-[14px] text-slate-800">Gelişmiş Destek (Ticketing)</div>
                     <div className="text-[12px] text-slate-500">Müşteri şikayetleri ve iade talepleri için profesyonel destek bilet sistemi.</div>
                  </div>
                  <button onClick={() => toggleModule('ticketing')} className={`w-12 h-6 rounded-full flex items-center p-1 transition-colors ${modules.ticketing ? 'bg-indigo-600 justify-end' : 'bg-slate-300 justify-start'}`}>
                     <div className="w-4 h-4 bg-white rounded-full shadow-md"></div>
                  </button>
               </div>

               {/* Toggle 5 */}
               <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:border-indigo-300 transition-colors">
                  <div>
                     <div className="font-semibold text-[14px] text-slate-800">Güvenlik ve Denetim (Audit Logs)</div>
                     <div className="text-[12px] text-slate-500">Sistemdeki tüm personel işlemlerini saniye saniye kayıt altına alır.</div>
                  </div>
                  <button onClick={() => toggleModule('auditLogs')} className={`w-12 h-6 rounded-full flex items-center p-1 transition-colors ${modules.auditLogs ? 'bg-indigo-600 justify-end' : 'bg-slate-300 justify-start'}`}>
                     <div className="w-4 h-4 bg-white rounded-full shadow-md"></div>
                  </button>
               </div>
            </div>
          </div>

          {/* ─── Hero Section Edit ─── */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6 text-primary border-b border-slate-100 pb-4">
              <Store className="h-5 w-5" />
              <h2 className="font-semibold text-lg">Ana Sayfa Karşılama Ekranı (Hero)</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Ana Başlık</label>
                <input type="text" value={heroTitle} onChange={e => setHeroTitle(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Alt Başlık</label>
                <input type="text" value={heroSubtitle} onChange={e => setHeroSubtitle(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
              </div>
            </div>
          </div>

          {/* ─── İletişim ─── */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6 text-primary border-b border-slate-100 pb-4">
              <Globe className="h-5 w-5" />
              <h2 className="font-semibold text-lg">İletişim Bilgileri (Footer)</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Telefon</label>
                <input type="text" value={phone} onChange={e => setPhone(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-md text-sm outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">E-Posta</label>
                <input type="text" value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-md text-sm outline-none" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Adres</label>
                <input type="text" value={address} onChange={e => setAddress(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-md text-sm outline-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Önizleme */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 bg-slate-900 rounded-3xl p-4 shadow-xl border-4 border-slate-800 h-[500px] flex flex-col overflow-hidden relative">
            <div className="flex justify-center mb-4">
              <div className="h-4 w-32 bg-slate-800 rounded-bl-xl rounded-br-xl absolute top-0" />
            </div>
            <div className="bg-foreground flex-1 rounded-2xl overflow-hidden relative mt-4">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1510443900742-c51000bb7097?q=80&w=400&auto=format&fit=crop')] bg-cover bg-center opacity-50" />
              <div className="absolute inset-x-0 bottom-0 z-20 p-6">
                <h2 className="text-white font-serif font-bold text-xl leading-tight mb-1">{heroTitle}</h2>
                <p className="text-slate-300 text-[11px] mb-4">{heroSubtitle}</p>
                <button className="bg-amber-600 text-white text-[12px] font-medium px-4 py-2 rounded-full w-full">
                  Koleksiyonu Keşfet
                </button>
              </div>
            </div>
            <div className="mt-3 flex justify-center items-center text-white/50 text-xs gap-1">
              <Smartphone className="h-3.5 w-3.5" /> Canlı Önizleme
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
