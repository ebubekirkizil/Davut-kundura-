import React from 'react';

export default function PortfolioNotFound() {
  return (
    <section className="p-6" role="status" aria-label="Sayfa bulunamadı">
      <h2 className="text-2xl font-semibold mb-2">Sayfa bulunamadı</h2>
      <p className="text-sm text-gray-600">Bu CRM Portföy sayfası mevcut değildir veya geçici olarak kullanılamıyor. Lütfen daha sonra tekrar deneyin.</p>
    </section>
  );
}
