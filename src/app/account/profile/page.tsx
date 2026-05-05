"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

export default function ProfilePage() {
  const [profile, setProfile] = React.useState({
    fullName: "Mehmet Yılmaz",
    email: "mehmet@example.com",
    phone: "0555 555 55 55",
    birthDate: "1990-01-01",
  })

  const [isEditing, setIsEditing] = React.useState(false)

  const handleSave = () => {
    toast.success("Profil bilgileriniz güncellendi")
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-serif font-bold">Profil Bilgilerim</h2>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)}>Düzenle</Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Kişisel Bilgiler</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Ad Soyad</label>
            <Input
              value={profile.fullName}
              onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
              disabled={!isEditing}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">E-posta</label>
            <Input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              disabled={!isEditing}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Telefon</label>
            <Input
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              disabled={!isEditing}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Doğum Tarihi</label>
            <Input
              type="date"
              value={profile.birthDate}
              onChange={(e) => setProfile({ ...profile, birthDate: e.target.value })}
              disabled={!isEditing}
            />
          </div>

          {isEditing && (
            <div className="flex gap-2 pt-4">
              <Button onClick={handleSave}>Kaydet</Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                İptal
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Şifre Değiştir</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Mevcut Şifre</label>
            <Input type="password" />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Yeni Şifre</label>
            <Input type="password" />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Yeni Şifre (Tekrar)</label>
            <Input type="password" />
          </div>

          <Button>Şifreyi Güncelle</Button>
        </CardContent>
      </Card>
    </div>
  )
}
