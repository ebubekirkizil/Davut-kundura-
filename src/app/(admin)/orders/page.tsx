import { Search, MapPin, Truck, CheckCircle, Package } from "lucide-react";

export default function OrdersPage() {
  const orders = [
    {
      id: "ORD-8092",
      customer: "Ahmet Yılmaz",
      date: "24 Ekm 2024, 14:30",
      total: 349.90,
      status: "SHIPPED",
      items: "1x Ortopedik Spor Taban",
    },
    {
      id: "ORD-8093",
      customer: "Mehmet Demir",
      date: "24 Ekm 2024, 16:15",
      total: 599.00,
      status: "PENDING",
      items: "1x Hakiki Deri Kemer",
    },
    {
      id: "ORD-8094",
      customer: "Ayşe Kaya",
      date: "25 Ekm 2024, 09:00",
      total: 249.50,
      status: "PROCESSING",
      items: "1x Ayakkabı Bakım Kiti",
    }
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-primary">Açık Siparişler</h1>
          <p className="text-sm text-slate-500 mt-1">
            Gelen siparişlerin durumlarını güncelleyin ve kargo atamalarını yapın.
          </p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex gap-4 text-sm font-medium bg-slate-50/50">
          <button className="text-primary border-b-2 border-primary pb-1">Tümü (3)</button>
          <button className="text-slate-500 hover:text-primary transition-colors">Bekleyen (1)</button>
          <button className="text-slate-500 hover:text-primary transition-colors">Hazırlanan (1)</button>
          <button className="text-slate-500 hover:text-primary transition-colors">Kargoda (1)</button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase bg-slate-50 text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold">Sipariş ID</th>
                <th className="px-6 py-4 font-semibold">Müşteri / Tarih</th>
                <th className="px-6 py-4 font-semibold">Sebet Özeti</th>
                <th className="px-6 py-4 font-semibold">Tutar</th>
                <th className="px-6 py-4 font-semibold">Durum</th>
                <th className="px-6 py-4 font-semibold text-right">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-primary">{order.id}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-foreground">{order.customer}</div>
                    <div className="text-xs text-slate-400">{order.date}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-600 bg-slate-100 px-2.5 py-1 rounded text-xs border border-slate-200">
                      {order.items}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-800">
                    ₺{order.total.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    {order.status === "PENDING" && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">
                        Yeni Bekliyor
                      </span>
                    )}
                    {order.status === "PROCESSING" && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                         <Package className="h-3.5 w-3.5" /> Hazırlanıyor
                      </span>
                    )}
                    {order.status === "SHIPPED" && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
                        <Truck className="h-3.5 w-3.5" /> Kargolandı
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <select className="border border-slate-300 rounded px-2 py-1 text-xs bg-white text-slate-700 shadow-sm cursor-pointer outline-none focus:ring-1 focus:ring-primary">
                      <option disabled selected>Durum Seç</option>
                      <option>Hazırlanıyor Yap</option>
                      <option>Kargolandı Yap</option>
                      <option>İptal Et</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
