import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const search = url.searchParams.get('search') ?? ''
    const page = parseInt(url.searchParams.get('page') ?? '1', 10)
    const limit = parseInt(url.searchParams.get('limit') ?? '10', 10)
    const take = Number.isFinite(limit) ? limit : 10
    const skip = ((Number.isFinite(page) ? page : 1) - 1) * take
    const status = url.searchParams.get('status') ?? undefined

    const where: any = {}
    if (status) where.status = status
    if (search) where.OR = [{ id: { contains: search, mode: 'insensitive' } }]

    const [orders, total] = await Promise.all([
      prisma.order.findMany({ where, take, skip, orderBy: { createdAt: 'desc' }, include: { orderItems: true } }),
      prisma.order.count({ where }),
    ])

    const items = orders.map((o: any) => {
      const revenue = o.total ?? o.orderItems?.reduce((acc: number, it: any) => acc + ((it.price ?? it.unitPrice) * (it.quantity ?? 1)), 0) ?? 0
      const customerName = o.customerName ?? o.customer?.name ?? ''
      return {
        id: o.id,
        customer: customerName,
        date: o.createdAt?.toISOString?.() ?? '',
        status: o.status,
        revenue,
      }
    })

    return NextResponse.json({ items, total, page, limit })
  } catch (err) {
    console.error('Orders route error', err)
    return NextResponse.json({ error: 'DB_ERROR', detail: (err as any)?.message ?? '' }, { status: 500 })
  }
}
