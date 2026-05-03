import React from 'react'

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export default function Input(props: InputProps) {
  return (
    <input {...props} className={`w-full px-4 py-3 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border)] focus:bg-white focus:border-[var(--accent)] outline-none shadow-inner ${props.className ?? ''}`} />
  )
}
