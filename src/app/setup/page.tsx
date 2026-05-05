"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

export default function SetupPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)
  const [email, setEmail] = React.useState("ebukizil@gmail.com")
  const [password, setPassword] = React.useState("123456")
  const [name, setName] = React.useState("Admin")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/setup/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success("Admin kullanıcısı oluşturuldu!")
        setTimeout(() => {
          router.push("/admin/login")
        }, 1500)
      } else {
        toast.error(data.error || "Bir hata oluştu")
      }
    } catch (error) {
      toast.error("Bir hata oluştu")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 rounded-lg bg-accent flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl font-bold">D</span>
          </div>
          <CardTitle className="text-2xl font-serif">İlk Kurulum</CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Admin kullanıcısı oluşturun
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                İsim
              </label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Admin"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Email
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={isLoading}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Minimum 6 karakter
              </p>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Oluşturuluyor...
                </>
              ) : (
                "Admin Kullanıcısı Oluştur"
              )}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className="text-xs text-muted-foreground">
              ⚠️ Bu sayfa sadece ilk kurulum için kullanılır. Admin kullanıcısı oluşturulduktan sonra bu sayfaya erişilemez.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
