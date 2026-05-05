"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function SetupPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to login page
    router.push("/login")
  }, [router])

  return null
}
