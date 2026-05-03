import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const search = url.searchParams.get('search') ?? '';
  const page = parseInt(url.searchParams.get('page') ?? '1', 10);
  const limit = parseInt(url.searchParams.get('limit') ?? '10', 10);
  const take = Number.isFinite(limit) ? limit : 10;
  const skip = ((Number.isFinite(page) ? page : 1) - 1) * take;

  const where = search
    ? {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
          { phone: { contains: search, mode: 'insensitive' } },
        ],
      }
    : {};

  try {
    const [items, total] = await Promise.all([
      prisma.customer.findMany({ where, take, skip, orderBy: { lastInteraction: 'desc' } }),
      prisma.customer.count({ where }),
    ]);
    return NextResponse.json({ items, total });
  } catch (err) {
    return NextResponse.json({ error: 'DB_ERROR' }, { status: 500 });
  }
}
