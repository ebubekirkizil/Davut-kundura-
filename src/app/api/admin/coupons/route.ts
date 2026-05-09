import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// ─── GET: Tüm kuponları listele (raporlama verileriyle) ──────────────────────

export async function GET() {
  try {
    const coupons = await prisma.discountCode.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        _count: { select: { usageLogs: true, orders: true } },
        user: { select: { name: true, email: true } },
      },
    })

    const formatted = coupons.map((c) => ({
      ...c,
      usageCount: c._count.usageLogs,
      orderCount: c._count.orders,
      isExpired: c.expiresAt ? new Date() > c.expiresAt : false,
      isLimitReached: c.maxUses !== null ? c.usedCount >= c.maxUses : false,
    }))

    return NextResponse.json({ coupons: formatted })
  } catch (error) {
    console.error("[COUPON_GET]", error)
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 })
  }
}

// ─── POST: Yeni kupon oluştur ────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      code, description, type, value, maxDiscount,
      minOrderAmount, applicableCategories, applicableProductIds,
      maxUses, perUserLimit, startsAt, expiresAt, userId,
    } = body

    if (!code || !type || value === undefined) {
      return NextResponse.json({ error: "code, type ve value zorunludur." }, { status: 400 })
    }

    // Duplikat kontrol
    const exists = await prisma.discountCode.findUnique({ where: { code: code.toUpperCase().trim() } })
    if (exists) {
      return NextResponse.json({ error: "Bu kupon kodu zaten mevcut." }, { status: 409 })
    }

    const coupon = await prisma.discountCode.create({
      data: {
        code: code.toUpperCase().trim(),
        description: description || null,
        type,
        value: parseFloat(value),
        maxDiscount: maxDiscount ? parseFloat(maxDiscount) : null,
        minOrderAmount: minOrderAmount ? parseFloat(minOrderAmount) : null,
        applicableCategories: applicableCategories || [],
        applicableProductIds: applicableProductIds || [],
        maxUses: maxUses ? parseInt(maxUses) : null,
        perUserLimit: perUserLimit ? parseInt(perUserLimit) : 1,
        startsAt: startsAt ? new Date(startsAt) : new Date(),
        expiresAt: expiresAt ? new Date(expiresAt) : null,
        userId: userId || null,
      },
    })

    return NextResponse.json({ success: true, coupon })
  } catch (error) {
    console.error("[COUPON_POST]", error)
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 })
  }
}

// ─── PATCH: Kupon güncelle (aktif/pasif, limitleri değiştir) ─────────────────

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, ...updates } = body

    if (!id) return NextResponse.json({ error: "Kupon ID gerekli." }, { status: 400 })

    // Sayısal alanları dönüştür
    const data: Record<string, any> = {}
    if (updates.isActive !== undefined) data.isActive = updates.isActive
    if (updates.maxUses !== undefined) data.maxUses = updates.maxUses ? parseInt(updates.maxUses) : null
    if (updates.perUserLimit !== undefined) data.perUserLimit = parseInt(updates.perUserLimit)
    if (updates.minOrderAmount !== undefined) data.minOrderAmount = updates.minOrderAmount ? parseFloat(updates.minOrderAmount) : null
    if (updates.maxDiscount !== undefined) data.maxDiscount = updates.maxDiscount ? parseFloat(updates.maxDiscount) : null
    if (updates.expiresAt !== undefined) data.expiresAt = updates.expiresAt ? new Date(updates.expiresAt) : null
    if (updates.description !== undefined) data.description = updates.description
    if (updates.applicableCategories !== undefined) data.applicableCategories = updates.applicableCategories
    if (updates.applicableProductIds !== undefined) data.applicableProductIds = updates.applicableProductIds

    const coupon = await prisma.discountCode.update({ where: { id }, data })
    return NextResponse.json({ success: true, coupon })
  } catch (error) {
    console.error("[COUPON_PATCH]", error)
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 })
  }
}

// ─── DELETE: Kupon sil ───────────────────────────────────────────────────────

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")
    if (!id) return NextResponse.json({ error: "Kupon ID gerekli." }, { status: 400 })

    await prisma.discountCode.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[COUPON_DELETE]", error)
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 })
  }
}
