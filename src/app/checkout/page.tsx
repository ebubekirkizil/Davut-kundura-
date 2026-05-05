"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/storefront/Header"
import { Footer } from "@/components/storefront/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCart } from "@/contexts/CartContext"
import { cn } from "@/lib/utils"
import { Check, CreditCard, MapPin, Package } from "lucide-react"
import { toast } from "sonner"

const steps = [
  { id: 1, name: "Adres Bilgileri", icon: MapPin },
  { id: 2, name: "Ödeme", icon: CreditCard },
  { id: 3, name: "Onay", icon: Check },
]

export default function CheckoutPage() {
  const router = useRouter()
  const { items, totalPrice, clearCart } = useCart()
  const [currentStep, setCurrentStep] = React.useState(1)
  const [isProcessing, setIsProcessing] = React.useState(false)

  const [shippingAddress, setShippingAddress] = React.useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    postalCode: "",
  })

  const [billingAddress, setBillingAddress] = React.useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    postalCode: "",
  })

  const [useSameAddress, setUseSameAddress] = React.useState(true)
  const [paymentMethod, setPaymentMethod] = React.useState<"credit-card" | "bank-transfer">("credit-card")

  const shippingCost = totalPrice >= 500 ? 0 : 50
  const finalTotal = totalPrice + shippingCost

  React.useEffect(() => {
    if (items.length === 0) {
      router.push("/cart")
    }
  }, [items, router])

  const handleNextStep = () => {
    if (currentStep === 1) {
      // Validate address
      if (!shippingAddress.fullName || !shippingAddress.phone || !shippingAddress.address) {
        toast.error("Lütfen tüm zorunlu alanları doldurun")
        return
      }
    }

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleCompleteOrder = async () => {
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Clear cart and redirect to success page
    clearCart()
    toast.success("Siparişiniz başarıyla oluşturuldu!")
    router.push("/order-success")
  }

  if (items.length === 0) {
    return null
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors",
                        currentStep >= step.id
                          ? "bg-accent border-accent text-accent-foreground"
                          : "bg-background border-border text-muted-foreground"
                      )}
                    >
                      <step.icon className="h-5 w-5" />
                    </div>
                    <span className="text-sm mt-2 font-medium">{step.name}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={cn(
                        "w-24 h-0.5 mx-4 transition-colors",
                        currentStep > step.id ? "bg-accent" : "bg-border"
                      )}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Step 1: Address */}
              {currentStep === 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Teslimat Adresi</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Ad Soyad *
                        </label>
                        <Input
                          value={shippingAddress.fullName}
                          onChange={(e) =>
                            setShippingAddress({ ...shippingAddress, fullName: e.target.value })
                          }
                          placeholder="Adınız ve soyadınız"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Telefon *
                        </label>
                        <Input
                          value={shippingAddress.phone}
                          onChange={(e) =>
                            setShippingAddress({ ...shippingAddress, phone: e.target.value })
                          }
                          placeholder="0555 555 55 55"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Adres *
                      </label>
                      <Input
                        value={shippingAddress.address}
                        onChange={(e) =>
                          setShippingAddress({ ...shippingAddress, address: e.target.value })
                        }
                        placeholder="Mahalle, sokak, bina no, daire no"
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">İl</label>
                        <Input
                          value={shippingAddress.city}
                          onChange={(e) =>
                            setShippingAddress({ ...shippingAddress, city: e.target.value })
                          }
                          placeholder="İstanbul"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">İlçe</label>
                        <Input
                          value={shippingAddress.district}
                          onChange={(e) =>
                            setShippingAddress({ ...shippingAddress, district: e.target.value })
                          }
                          placeholder="Kadıköy"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Posta Kodu</label>
                        <Input
                          value={shippingAddress.postalCode}
                          onChange={(e) =>
                            setShippingAddress({ ...shippingAddress, postalCode: e.target.value })
                          }
                          placeholder="34000"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-4">
                      <input
                        type="checkbox"
                        id="sameAddress"
                        checked={useSameAddress}
                        onChange={(e) => setUseSameAddress(e.target.checked)}
                        className="h-4 w-4"
                      />
                      <label htmlFor="sameAddress" className="text-sm">
                        Fatura adresi teslimat adresi ile aynı
                      </label>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 2: Payment */}
              {currentStep === 2 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Ödeme Yöntemi</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <button
                        onClick={() => setPaymentMethod("credit-card")}
                        className={cn(
                          "w-full p-4 rounded-lg border-2 transition-colors text-left",
                          paymentMethod === "credit-card"
                            ? "border-accent bg-accent/5"
                            : "border-border hover:border-accent/50"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <CreditCard className="h-5 w-5" />
                          <div>
                            <div className="font-semibold">Kredi/Banka Kartı</div>
                            <div className="text-sm text-muted-foreground">
                              Güvenli ödeme ile hemen öde
                            </div>
                          </div>
                        </div>
                      </button>

                      <button
                        onClick={() => setPaymentMethod("bank-transfer")}
                        className={cn(
                          "w-full p-4 rounded-lg border-2 transition-colors text-left",
                          paymentMethod === "bank-transfer"
                            ? "border-accent bg-accent/5"
                            : "border-border hover:border-accent/50"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <Package className="h-5 w-5" />
                          <div>
                            <div className="font-semibold">Havale/EFT</div>
                            <div className="text-sm text-muted-foreground">
                              Banka hesabımıza havale yapın
                            </div>
                          </div>
                        </div>
                      </button>
                    </div>

                    {paymentMethod === "credit-card" && (
                      <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          Ödeme sayfasına yönlendirileceksiniz. Güvenli ödeme altyapımız ile
                          kartınızı güvenle kullanabilirsiniz.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Step 3: Confirmation */}
              {currentStep === 3 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Sipariş Özeti</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2">Teslimat Adresi</h3>
                      <p className="text-sm text-muted-foreground">
                        {shippingAddress.fullName}<br />
                        {shippingAddress.phone}<br />
                        {shippingAddress.address}<br />
                        {shippingAddress.district}, {shippingAddress.city} {shippingAddress.postalCode}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Ödeme Yöntemi</h3>
                      <p className="text-sm text-muted-foreground">
                        {paymentMethod === "credit-card" ? "Kredi/Banka Kartı" : "Havale/EFT"}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Ürünler ({items.length})</h3>
                      <div className="space-y-2">
                        {items.map((item) => (
                          <div key={`${item.id}-${item.size}`} className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              {item.name} x{item.quantity}
                            </span>
                            <span className="font-medium">
                              {(item.price * item.quantity).toLocaleString('tr-TR')}₺
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4">
                {currentStep > 1 && (
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handlePreviousStep}
                    disabled={isProcessing}
                  >
                    Geri
                  </Button>
                )}
                {currentStep < 3 ? (
                  <Button size="lg" onClick={handleNextStep} className="flex-1">
                    Devam Et
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    onClick={handleCompleteOrder}
                    disabled={isProcessing}
                    className="flex-1"
                  >
                    {isProcessing ? "İşleniyor..." : "Siparişi Tamamla"}
                  </Button>
                )}
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Sipariş Özeti</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 py-4 border-y">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Ara Toplam</span>
                      <span className="font-medium">{totalPrice.toLocaleString('tr-TR')}₺</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Kargo</span>
                      <span className={cn(
                        "font-medium",
                        shippingCost === 0 && "text-green-600"
                      )}>
                        {shippingCost === 0 ? "Ücretsiz" : `${shippingCost}₺`}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between text-lg font-bold">
                    <span>Toplam</span>
                    <span>{finalTotal.toLocaleString('tr-TR')}₺</span>
                  </div>

                  <div className="pt-4 space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <span>Güvenli Ödeme</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <span>14 Gün İade Garantisi</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <span>Hızlı Kargo</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
