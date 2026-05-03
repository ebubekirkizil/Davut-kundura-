import React from 'react'

type CardProps = {
  title?: string
  value?: string
  children?: React.ReactNode
  className?: string
}

export default function Card({ title, value, children, className }: CardProps) {
  return (
    <div className={`bg-white border border-[var(--border)] rounded-2xl p-6 shadow-sm ${className ?? ''}`}>
      {title && (
        <div className="text-xs font-black uppercase text-[var(--text-secondary)] tracking-widest mb-2">{title}</div>
      )}
      {value && <div className="text-2xl font-bold text-[var(--text-primary)]">{value}</div>}
      {children}
    </div>
  )
}
