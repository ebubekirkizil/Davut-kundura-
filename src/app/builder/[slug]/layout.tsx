import React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sayfa Düzenleyici | Davut Kundura",
}

export default function BuilderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // This layout sits completely outside the admin sidebar.
  // It provides a true full-screen canvas for the editor.
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {children}
    </div>
  )
}
