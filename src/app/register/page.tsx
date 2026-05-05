"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { Header } from "@/components/storefront/Header"
import { Footer } from "@/components/storefront/Footer"

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast.error("Şifreler eşleşmiyor")
      return
    }

    if (formData.password.length < 6) {
      toast.error("Şifre en az 6 karakter olmalıdır")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success("Kayıt başarılı! Giriş yapılıyor...")
        setTimeout(() => {
          router.push("/account/profile")
        }, 1500)
      } else {
        toast.error(data.error || "Kayıt başarısız")
      }
    } catch (error) {
      toast.error("Bir hata oluştu")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-muted/30 py-12">
        <Card className="w-full max-w-md mx-4">
          <CardHeader className="text-center">
            <div className="w-16 h-16 rounded-lg bg-accent flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl font-bold">D</span>
            </div>
            <CardTitle className="text-2xl font-serif">Kayıt Ol</CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Yeni hesap oluşturun
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Ad Soyad
                </label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Adınız Soyadınız"
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  E-posta
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="ornek@email.com"
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Şifre
                </label>
                <Input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Minimum 6 karakter
                </p>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Şifre (Tekrar)
                </label>
                <Input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Kayıt yapılıyor...
                  </>
                ) : (
                  "Kayıt Ol"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Zaten hesabınız var mı?{" "}
                <Link href="/login" className="text-accent hover:underline font-medium">
                  Giriş Yap
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  )
}
