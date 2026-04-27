import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Ziyaretçi takip eventi kaydet
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, sessionId, userId, page, productId, country, city, lat, lng, device, browser, referrer } = body;

    // Paralel: event kaydet + aktif oturumu güncelle/oluştur
    await Promise.all([
      prisma.analyticsEvent.create({
        data: { type, sessionId, userId, page, productId, country, city, lat, lng, device, browser, referrer },
      }),
      prisma.activeSession.upsert({
        where: { sessionId },
        update: { page, lastSeen: new Date(), country, city, lat, lng },
        create: { sessionId, page, country, city, lat, lng, device },
      }),
    ]);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

// Canlı ziyaretçileri getir (son 3 dakika)
export async function GET(req: NextRequest) {
  const threeMinutesAgo = new Date(Date.now() - 3 * 60 * 1000);
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

  const [activeSessions, todayEvents, countryBreakdown, pageBreakdown, hourlyTraffic] = await Promise.all([
    // Aktif ziyaretçiler (son 3 dk)
    prisma.activeSession.findMany({
      where: { lastSeen: { gte: threeMinutesAgo } },
      orderBy: { lastSeen: "desc" },
    }),
    // Bugünkü toplam event
    prisma.analyticsEvent.count({
      where: { createdAt: { gte: oneDayAgo }, type: "pageview" },
    }),
    // Ülke dağılımı
    prisma.analyticsEvent.groupBy({
      by: ["country", "lat", "lng"],
      where: { createdAt: { gte: oneDayAgo }, type: "pageview", country: { not: null } },
      _count: { country: true },
      orderBy: { _count: { country: "desc" } },
      take: 20,
    }),
    // Sayfa dağılımı
    prisma.analyticsEvent.groupBy({
      by: ["page"],
      where: { createdAt: { gte: oneDayAgo }, type: "pageview" },
      _count: { page: true },
      orderBy: { _count: { page: "desc" } },
      take: 10,
    }),
    // Saatlik trafik (son 24 saat)
    prisma.$queryRaw`
      SELECT 
        EXTRACT(HOUR FROM "createdAt") as hour,
        COUNT(*) as visits
      FROM "AnalyticsEvent"
      WHERE type = 'pageview' AND "createdAt" >= NOW() - INTERVAL '24 hours'
      GROUP BY hour
      ORDER BY hour
    `,
  ]);

  return NextResponse.json({
    activeCount: activeSessions.length,
    activeSessions,
    todayViews: todayEvents,
    countryBreakdown,
    pageBreakdown,
    hourlyTraffic,
  });
}
