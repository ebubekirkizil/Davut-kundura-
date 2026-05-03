"use client";
import React, { useEffect, useState } from 'react'
import AdminLayout from '@/components/ui/AdminLayout'
import Input from '../../../components/ui/Input'
import Card from '../../../components/ui/Card'
import Button from '../../../components/ui/Button'

type Product = {
  id: string
  name: string
  category: string
  price: number
  stock: number
}

export default function AdminProductsPage() {
  const [query, setQuery] = useState('')
  const [data, setData] = useState<{ products: Product[]; total: number; page: number; limit: number }>({ products: [], total: 0, page: 1, limit: 10 })
  const [page, setPage] = useState(1)
  const limit = 10

  useEffect(() => {
    fetch(`/api/admin/products?search=${encodeURIComponent(query)}&page=${page}&limit=${limit}`)
      .then((r) => r.json())
      .then((d) => setData({ products: d.products ?? [], total: d.total ?? 0, page: d.page ?? page, limit: d.limit ?? limit }))
  }, [query, page])

  return (
    <AdminLayout>
      <section className="p-6 space-y-6">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold">Admin - Ürünler</h1>
          <Button>Yeni Ürün Ekle</Button>
        </div>
        <div className="flex items-center gap-3">
          <Input placeholder="Ürün ara…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.products.map((p) => (
            <Card key={p.id} title={p.name} value={`SKU: ${p.id}`}>
              <div className="text-sm text-[var(--text-secondary)]">Kategori: {p.category}</div>
              <div className="text-sm">Fiyat: ₺{p.price}</div>
              <div className="text-sm">Stok: {p.stock}</div>
            </Card>
          ))}
        </div>
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="secondary" onClick={() => setPage((p) => Math.max(1, p - 1))}>Önceki</Button>
          <span className="self-center text-sm text-[var(--text-secondary)]">Sayfa {data.page}</span>
          <Button onClick={() => setPage((p) => p + 1)}>Sonraki</Button>
        </div>
      </section>
    </AdminLayout>
  )
}
