import React from 'react'
import styles from './AdminLayout.module.css'

type AdminLayoutProps = {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className={styles.app}>
      <aside className={styles.sidebar} aria-label="Ana gezinme">
        <div className={styles.brand}>Davut Kundura Admin</div>
        <nav className={styles.nav}>
          <a className={styles.navItem} href="/admin/dashboard">Dashboard</a>
          <a className={styles.navItem} href="/admin/crm/portfolio">CRM Portföy</a>
          <a className={styles.navItem} href="/admin/orders">Siparişler</a>
          <a className={styles.navItem} href="/admin/products">Ürünler</a>
        </nav>
        <div className={styles.brandSmall}>EY • Admin</div>
      </aside>
      <div className={styles.main}>
        <header className={styles.topbar}>
          <div className={styles.brandLogo}>Davut Kundura</div>
          <div className={styles.spacer} />
          <div className={styles.user}>EB</div>
        </header>
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  )
}
