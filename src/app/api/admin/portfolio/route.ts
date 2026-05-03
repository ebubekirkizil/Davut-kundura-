import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET(req: NextRequest) {
  // Basic method check (even though Next.js gates GET for this handler)
  if (req.method && req.method.toLowerCase() !== 'get') {
    return NextResponse.json({ error: 'METHOD_NOT_ALLOWED' }, { status: 405 });
  }

  try {
    const url = new URL(req.url);
    const rawSearch = (url.searchParams.get('search') ?? '').trim();
    const pageRaw = url.searchParams.get('page') ?? '1';
    const limitRaw = url.searchParams.get('limit') ?? '10';

    // sanitize pagination inputs
    let page = parseInt(pageRaw, 10);
    let limit = parseInt(limitRaw, 10);
    if (!Number.isFinite(page) || page < 1) page = 1;
    if (!Number.isFinite(limit) || limit < 1 || limit > 100) limit = 10;

    const take = limit;
    const skip = (page - 1) * take;

    const where: any = {};
    if (rawSearch) {
      where.OR = [
        { name: { contains: rawSearch, mode: 'insensitive' } },
        { email: { contains: rawSearch, mode: 'insensitive' } },
        { phone: { contains: rawSearch, mode: 'insensitive' } },
      ];
    }

    // Quick guard: ensure Customer model exists on Prisma client
    if (!('customer' in prisma)) {
      return NextResponse.json({ error: 'MODEL_MISSING' }, { status: 500 });
    }

    const [items, total] = await Promise.all([
      prisma.customer.findMany({ where, take, skip, orderBy: { lastInteraction: 'desc' } }),
      prisma.customer.count({ where }),
    ]);

    return NextResponse.json({ items, total, page, limit });
  } catch (err) {
    console.error('Portfolio route error', err);
    const message = (err as any)?.message ?? 'Unknown error';
    return NextResponse.json({ error: 'DB_ERROR', detail: message }, { status: 500 });
  }
}
