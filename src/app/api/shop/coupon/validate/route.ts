import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// ─── TYPES ───────────────────────────────────────────────────────────────────

interface CartItem {
  productId: string
  variantId?: string
  quantity: number
  price: number
  category?: string
}

interface ValidateRequest {
  code: string
  userId?: string
  cartItems: CartItem[]
  cartSubtotal: number
  shippingCost?: number
}

// ─── POST /api/shop/coupon/validate — Kupon Doğrulama ────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body: ValidateRequest = await req.json()
    const { code, userId, cartItems, cartSubtotal, shippingCost = 0 } = body

    if (!code || !cartItems || cartSubtotal === undefined) {
      return NextResponse.json({ valid: false, error: "Kupon kodu ve sepet bilgisi gerekli." }, { status: 400 })
    }

    // 1. Kuponu bul
    const coupon = await prisma.discountCode.findUnique({ where: { code: code.toUpperCase().trim() } })

    if (!coupon) {
      return NextResponse.json({ valid: false, error: "Geçersiz kupon kodu." })
    }

    // 2. Aktiflik kontrolü
    if (!coupon.isActive) {
      return NextResponse.json({ valid: false, error: "Bu kupon artık aktif değil." })
    }

    // 3. Zaman kontrolü
    const now = new Date()
    if (coupon.startsAt && now < coupon.startsAt) {
      return NextResponse.json({ valid: false, error: `Bu kupon ${coupon.startsAt.toLocaleDateString("tr-TR")} tarihinde başlayacak.` })
    }
    if (coupon.expiresAt && now > coupon.expiresAt) {
      return NextResponse.json({ valid: false, error: "Bu kuponun süresi dolmuş." })
    }

    // 4. Toplam kullanım limiti
    if (coupon.maxUses !== null && coupon.usedCount >= coupon.maxUses) {
      return NextResponse.json({ valid: false, error: "Bu kuponun kullanım limiti dolmuş." })
    }

    // 5. Kullanıcı başına limit
    if (userId && coupon.perUserLimit > 0) {
      const userUsageCount = await prisma.couponUsageLog.count({
        where: { discountCodeId: coupon.id, userId },
      })
      if (userUsageCount >= coupon.perUserLimit) {
        return NextResponse.json({ valid: false, error: "Bu kuponu daha fazla kullanamazsınız." })
      }
    }

    // 6. Kişiye özel kupon kontrolü
    if (coupon.userId && coupon.userId !== userId) {
      return NextResponse.json({ valid: false, error: "Bu kupon sizin hesabınıza tanımlı değil." })
    }

    // 7. Minimum sepet tutarı
    if (coupon.minOrderAmount && cartSubtotal < coupon.minOrderAmount) {
      return NextResponse.json({
        valid: false,
        error: `Bu kupon en az ₺${coupon.minOrderAmount.toLocaleString("tr-TR")} tutarındaki siparişlerde geçerlidir.`,
      })
    }

    // 8. Kategori/Ürün kısıtlaması — geçerli ürünlerin toplam tutarını hesapla
    let eligibleSubtotal = cartSubtotal
    const hasCategories = coupon.applicableCategories.length > 0
    const hasProducts = coupon.applicableProductIds.length > 0

    if (hasCategories || hasProducts) {
      eligibleSubtotal = cartItems
        .filter((item) => {
          if (hasProducts && coupon.applicableProductIds.includes(item.productId)) return true
          if (hasCategories && item.category && coupon.applicableCategories.includes(item.category)) return true
          return !hasProducts && !hasCategories // tümü geçerli
        })
        .reduce((sum, item) => sum + item.price * item.quantity, 0)

      if (eligibleSubtotal === 0) {
        return NextResponse.json({ valid: false, error: "Sepetinizdeki ürünler bu kupon için geçerli değil." })
      }
    }

    // 9. İndirim tutarını hesapla
    let discountAmount = 0
    switch (coupon.type) {
      case "PERCENTAGE":
        discountAmount = (eligibleSubtotal * coupon.value) / 100
        if (coupon.maxDiscount && discountAmount > coupon.maxDiscount) {
          discountAmount = coupon.maxDiscount
        }
        break
      case "FIXED":
        discountAmount = Math.min(coupon.value, eligibleSubtotal)
        break
      case "FREE_SHIP":
        discountAmount = shippingCost
        break
    }

    discountAmount = Math.round(discountAmount * 100) / 100

    return NextResponse.json({
      valid: true,
      couponId: coupon.id,
      code: coupon.code,
      type: coupon.type,
      discountAmount,
      description: coupon.description,
      message:
        coupon.type === "FREE_SHIP"
          ? "Ücretsiz kargo uygulandı!"
          : `₺${discountAmount.toLocaleString("tr-TR")} indirim uygulandı!`,
    })
  } catch (error) {
    console.error("[COUPON_VALIDATE]", error)
    return NextResponse.json({ valid: false, error: "Sunucu hatası." }, { status: 500 })
  }
}
