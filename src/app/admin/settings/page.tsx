"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, Globe, Mail, Shield, Bell, Palette, Database } from "lucide-react"
import { toast } from "sonner"

export default function AdminSettingsPage() {
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSave = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success("Ayarlar başarıyla kaydedildi!")
    } catch (error) {
      toast.error("Ayarlar kaydedilirken bir hata oluştu")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold">Sistem Ayarları</h1>
          <p className="text-muted-foreground mt-1">
            Site ve sistem konfigürasyonlarını yönetin
          </p>
        </div>
        <Button onClick={handleSave} disabled={isLoading}>
          <Save className="h-4 w-4 mr-2" />
          {isLoading ? "Kaydediliyor..." : "Kaydet"}
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Genel
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            E-posta
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Güvenlik
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Bildirimler
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Görünüm
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Sistem
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Site Bilgileri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="siteName">Site Adı</Label>
                  <Input id="siteName" defaultValue="Davut Kundura" />
                </div>
                <div>
                  <Label htmlFor="siteUrl">Site URL</Label>
                  <Input id="siteUrl" defaultValue="https://www.davutkundura.shop" />
                </div>
              </div>

              <div>
                <Label htmlFor="siteDescription">Site Açıklaması</Label>
                <Textarea
                  id="siteDescription"
                  defaultValue="Premium deri işçiliği ve ortopedik çözümler"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contactEmail">İletişim E-postası</Label>
                  <Input id="contactEmail" defaultValue="info@davutkundura.shop" />
                </div>
                <div>
                  <Label htmlFor="contactPhone">İletişim Telefonu</Label>
                  <Input id="contactPhone" defaultValue="+90 212 XXX XX XX" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>İş Ayarları</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="currency">Para Birimi</Label>
                  <Select defaultValue="TRY">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="TRY">Türk Lirası (₺)</SelectItem>
                      <SelectItem value="USD">US Dollar ($)</SelectItem>
                      <SelectItem value="EUR">Euro (€)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="timezone">Saat Dilimi</Label>
                  <Select defaultValue="Europe/Istanbul">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Europe/Istanbul">İstanbul (UTC+3)</SelectItem>
                      <SelectItem value="UTC">UTC (UTC+0)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="taxRate">KDV Oranı (%)</Label>
                  <Input id="taxRate" type="number" defaultValue="20" />
                </div>
                <div>
                  <Label htmlFor="freeShipping">Ücretsiz Kargo Limiti (₺)</Label>
                  <Input id="freeShipping" type="number" defaultValue="500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Settings */}
        <TabsContent value="email" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>E-posta Konfigürasyonu</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="smtpHost">SMTP Sunucusu</Label>
                  <Input id="smtpHost" placeholder="smtp.gmail.com" />
                </div>
                <div>
                  <Label htmlFor="smtpPort">SMTP Port</Label>
                  <Input id="smtpPort" type="number" defaultValue="587" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="smtpUser">SMTP Kullanıcı Adı</Label>
                  <Input id="smtpUser" type="email" />
                </div>
                <div>
                  <Label htmlFor="smtpPass">SMTP Şifre</Label>
                  <Input id="smtpPass" type="password" />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="smtpTls" defaultChecked />
                <Label htmlFor="smtpTls">TLS/SSL Kullan</Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>E-posta Şablonları</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="orderConfirmation">Sipariş Onay E-postası</Label>
                <Textarea
                  id="orderConfirmation"
                  placeholder="Sipariş onay e-posta şablonu..."
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="shippingNotification">Kargo Bildirim E-postası</Label>
                <Textarea
                  id="shippingNotification"
                  placeholder="Kargo bildirim e-posta şablonu..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Güvenlik Ayarları</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>İki Faktörlü Kimlik Doğrulama</Label>
                  <p className="text-sm text-muted-foreground">Admin hesapları için 2FA zorunlu kıl</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Güçlü Şifre Zorunluluğu</Label>
                  <p className="text-sm text-muted-foreground">Minimum 8 karakter, büyük/küçük harf, sayı</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Oturum Zaman Aşımı</Label>
                  <p className="text-sm text-muted-foreground">Hareketsizlik durumunda otomatik çıkış</p>
                </div>
                <Select defaultValue="30">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 dakika</SelectItem>
                    <SelectItem value="30">30 dakika</SelectItem>
                    <SelectItem value="60">1 saat</SelectItem>
                    <SelectItem value="120">2 saat</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>IP Kısıtlaması</Label>
                  <p className="text-sm text-muted-foreground">Admin paneline erişimi belirli IP'lerle sınırla</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Yedekleme Ayarları</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Otomatik Yedekleme</Label>
                  <p className="text-sm text-muted-foreground">Veritabanı ve dosyaların otomatik yedeklenmesi</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div>
                <Label htmlFor="backupFrequency">Yedekleme Sıklığı</Label>
                <Select defaultValue="daily">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Saatlik</SelectItem>
                    <SelectItem value="daily">Günlük</SelectItem>
                    <SelectItem value="weekly">Haftalık</SelectItem>
                    <SelectItem value="monthly">Aylık</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Bildirim Tercihleri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Yeni Sipariş Bildirimleri</Label>
                  <p className="text-sm text-muted-foreground">Yeni sipariş geldiğinde e-posta gönder</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Düşük Stok Uyarıları</Label>
                  <p className="text-sm text-muted-foreground">Ürün stoğu azaldığında bildirim gönder</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Ödeme Bildirimleri</Label>
                  <p className="text-sm text-muted-foreground">Ödeme alındığında bildirim gönder</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Sistem Güncellemeleri</Label>
                  <p className="text-sm text-muted-foreground">Sistem güncellemeleri hakkında bilgi ver</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance */}
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Admin Panel Görünümü</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="adminTheme">Tema</Label>
                <Select defaultValue="light">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Açık Tema</SelectItem>
                    <SelectItem value="dark">Koyu Tema</SelectItem>
                    <SelectItem value="auto">Sistem Ayarı</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="sidebarStyle">Sidebar Stili</Label>
                <Select defaultValue="expanded">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="expanded">Genişletilmiş</SelectItem>
                    <SelectItem value="collapsed">Daraltılmış</SelectItem>
                    <SelectItem value="overlay">Overlay</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Storefront Görünümü</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="primaryColor">Ana Renk</Label>
                <Input id="primaryColor" type="color" defaultValue="#d4af37" className="w-20 h-10" />
              </div>

              <div>
                <Label htmlFor="secondaryColor">İkincil Renk</Label>
                <Input id="secondaryColor" type="color" defaultValue="#8b4513" className="w-20 h-10" />
              </div>

              <div>
                <Label htmlFor="fontFamily">Font Ailesi</Label>
                <Select defaultValue="inter">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inter">Inter</SelectItem>
                    <SelectItem value="roboto">Roboto</SelectItem>
                    <SelectItem value="opensans">Open Sans</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System */}
        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sistem Bilgileri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Uygulama Versiyonu</Label>
                  <p className="text-sm font-mono">v2.1.0</p>
                </div>
                <div>
                  <Label>Veritabanı Versiyonu</Label>
                  <p className="text-sm font-mono">PostgreSQL 15.3</p>
                </div>
                <div>
                  <Label>Node.js Versiyonu</Label>
                  <p className="text-sm font-mono">v20.11.0</p>
                </div>
                <div>
                  <Label>Next.js Versiyonu</Label>
                  <p className="text-sm font-mono">v16.2.1</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sistem Bakımı</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Cache Temizle</Label>
                  <p className="text-sm text-muted-foreground">Uygulama cache'ini temizle</p>
                </div>
                <Button variant="outline">Temizle</Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Veritabanı Optimizasyonu</Label>
                  <p className="text-sm text-muted-foreground">Veritabanı performansını optimize et</p>
                </div>
                <Button variant="outline">Optimize Et</Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Log Dosyalarını Temizle</Label>
                  <p className="text-sm text-muted-foreground">Eski log dosyalarını sil</p>
                </div>
                <Button variant="outline">Temizle</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}