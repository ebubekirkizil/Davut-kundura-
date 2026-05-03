"use client";
import AdminLayout from '../../../../components/ui/AdminLayout'
import React from 'react'

export default function AdminInventoryProductsPage() {
  return (
    <AdminLayout>
      <section className="p-6 space-y-4">
        <h1 className="text-2xl font-semibold">Admin - Envanter Ürünleri</h1>
        <p className="text-sm text-[var(--text-secondary)]">Bu alan şu anda boş. Envanter ürünlerini buradan yönetebilirsiniz.</p>
      </section>
    </AdminLayout>
  )
}
