import React from 'react'

type ButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  variant?: 'primary' | 'secondary'
}

export default function Button({ children, onClick, className, variant = 'primary' }: ButtonProps) {
  const base = 'px-4 py-2 rounded-xl font-bold shadow-sm focus:outline-none transition-all'
  const variantClass = variant === 'primary'
    ? 'bg-[var(--text-primary)] text-white hover:bg-[var(--accent)]'
    : 'bg-white border border-[var(--border)] text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'
  return (
    <button onClick={onClick} className={`${base} ${variantClass} ${className ?? ''}`}>
      {children}
    </button>
  )
}
