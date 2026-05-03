import React from 'react'
import AdminLayout from '../../components/ui/AdminLayout'

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>
}
