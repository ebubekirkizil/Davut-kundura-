import { Save, Globe, Smartphone, Store } from "lucide-react";

export default function SettingsCMSPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-primary">Shopify CMS Ayarları</h1>
          <p className="text-sm text-slate-500 mt-1">
            Müşterilerin göreceği vitrin metinlerini (Ana Sayfa, Banner vb.) yazılımcıya ihtiyaç duymadan buradan canlı düzenleyin.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-md font-medium transition-colors shadow-sm">
          <Save className="h-4 w-4" /> 
          Değişiklikleri Yayınla (Sync)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Settings Form Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Hero Section Edit */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
             <div className="flex items-center gap-2 mb-6 text-primary border-b border-slate-100 pb-4">
                <Store className="h-5 w-5" />
                <h2 className="font-semibold text-lg">Ana Sayfa Karşılama Ekranı (Hero)</h2>
             </div>

             <div className="space-y-5">
               <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">Üst Başlık (Küçük Font)</label>
                 <input type="text" defaultValue="El İşçiliği ve Kalite" className="w-full px-4 py-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
               </div>
               <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">Ana Slogan (Büyük Başlık)</label>
                 <input type="text" defaultValue="Adımlarınıza Değer Katın." className="w-full px-4 py-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
               </div>
               <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">Açıklama Metni (Paragraf)</label>
                 <textarea rows={3} className="w-full px-4 py-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none">
Ortopedik tabanlar, hakiki deri kemerler ve profesyonel ayakkabı bakım ürünlerinde yılların ustalığı. Davut Kundura güvencesiyle.
                 </textarea>
               </div>
               <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">Buton Yazısı</label>
                 <input type="text" defaultValue="Koleksiyonu Keşfet" className="w-full px-4 py-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
               </div>
             </div>
          </div>

          {/* Social Media Edit */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
             <div className="flex items-center gap-2 mb-6 text-primary border-b border-slate-100 pb-4">
                <Globe className="h-5 w-5" />
                <h2 className="font-semibold text-lg">Sosyal Medya ve İletişim (Footer)</h2>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
               <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">Telefon Numarası</label>
                 <input type="text" defaultValue="+90 (555) 123 45 67" className="w-full px-4 py-2 border border-slate-300 rounded-md text-sm outline-none" />
               </div>
               <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">E-Posta Adresi</label>
                 <input type="text" defaultValue="info@davutkundura.com" className="w-full px-4 py-2 border border-slate-300 rounded-md text-sm outline-none" />
               </div>
               <div className="md:col-span-2">
                 <label className="block text-sm font-medium text-slate-700 mb-1">Açık Adres</label>
                 <input type="text" defaultValue="Merkez Mah. Ayakkabıcılar Çarşısı No:45 İstanbul" className="w-full px-4 py-2 border border-slate-300 rounded-md text-sm outline-none" />
               </div>
             </div>
          </div>
        </div>

        {/* Live Preview Column */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 bg-slate-900 rounded-3xl p-4 shadow-xl border-4 border-slate-800 h-[600px] flex flex-col overflow-hidden relative">
            <div className="flex justify-center mb-4">
              <div className="h-4 w-32 bg-slate-800 rounded-bl-xl rounded-br-xl absolute top-0"></div>
            </div>
            
            <div className="bg-foreground flex-1 rounded-2xl overflow-hidden relative">
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
               <img src="https://images.unsplash.com/photo-1510443900742-c51000bb7097?q=80&w=400&auto=format&fit=crop" className="opacity-50 w-full h-full object-cover" />
               
               <div className="absolute inset-x-0 bottom-0 z-20 p-6">
                 <p className="text-[10px] text-accent font-serif uppercase tracking-widest mb-1">El İşçiliği ve Kalite</p>
                 <h2 className="text-white font-serif font-bold text-2xl leading-tight mb-2">Adımlarınıza<br/><span className="italic text-accent">Değer</span> Katın.</h2>
                 <p className="text-slate-300 text-[10px] mb-4">Ortopedik tabanlar, hakiki deri kemerler...</p>
                 <button className="bg-accent text-white text-[12px] font-medium px-4 py-2 rounded-full w-full">Koleksiyonu Keşfet</button>
               </div>
            </div>
            
            <div className="mt-4 flex justify-between items-center px-4 text-white hover:text-accent cursor-pointer transition-colors">
              <Smartphone className="h-5 w-5" />
              <span className="text-xs uppercase font-serif tracking-widest">Canlı Mobil Önizleme</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
