Admin UI Design
Amaç: Dünya standartlarında bir yönetim paneli için bir tasarım dili kurmak, ölçeklenebilir ve erişilebilir bir yapı sağlamak.
1. Tasarım İlkeleri
- Tek bir design sistem: renkler, tipografi ve spacing için tokens.
- Net hiyerarşi, temiz boşluklar.
- Responsive ve erişilebilirlik (klavye navigasyonu, kontrast).
2. Design Tokens
- Renkler: --bg-primary, --bg-secondary, --text-primary, --accent, --border
- Tipografi: Cinzel (başlıklar), Inter (UI), Outfit (gövde)
- Gölge ve kenarlıklar: subtle elevation için shadow-sm, shadow-md
3. Layout
- AdminLayout: sabit sol menü + üst çubuk + içerik alanı
- Küçük ekranlarda sol menü hamburger ile açılır/kapalı
4. Bileşenler
- Card, Table, Button, Input, Select, Modal
5. Erişilebilirlik
- Yeterli kontrast, keyboard focus, ARIA kullanımı
6. Uygulama Notları
- AdminLayout ve tokens ile tüm admin sayfaları birbirini takip eder
- Görseller için Next/Image entegrasyonu önerilir
7. Sonraki Adımlar
- Dashboard, Orders, Products gibi diğer sayfalarda bu tasarımı kullanmak
- Arama, filtreleme ve sayfalama geliştirmek
