import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

function isAdmin(session: any) {
  return session?.user?.role === "ADMIN";
}

// Admin dashboard için özet istatistikler
export async function GET(req: NextRequest) {
  const session = await auth();
  if (!isAdmin(session)) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const [
    totalRevenue,
    lastMonthRevenue,
    todayRevenue,
    totalOrders,
    pendingOrders,
    totalCustomers,
    newCustomersThisMonth,
    lowStockProducts,
    recentOrders,
    monthlySales,
    topProducts,
    notifications,
  ] = await Promise.all([
    // Bu ay toplam gelir
    prisma.order.aggregate({
      where: { createdAt: { gte: startOfMonth }, paymentStatus: "PAID" },
      _sum: { totalAmount: true },
    }),
    // Geçen ay gelir (karşılaştırma için)
    prisma.order.aggregate({
      where: { createdAt: { gte: startOfLastMonth, lte: endOfLastMonth }, paymentStatus: "PAID" },
      _sum: { totalAmount: true },
    }),
    // Bugünkü gelir
    prisma.order.aggregate({
      where: { createdAt: { gte: startOfToday }, paymentStatus: "PAID" },
      _sum: { totalAmount: true },
    }),
    // Toplam sipariş sayısı
    prisma.order.count(),
    // Bekleyen siparişler
    prisma.order.count({ where: { status: "PENDING" } }),
    // Toplam müşteri
    prisma.user.count({ where: { role: "CUSTOMER" } }),
    // Bu ay yeni müşteri
    prisma.user.count({ where: { role: "CUSTOMER", createdAt: { gte: startOfMonth } } }),
    // Düşük stoklu ürünler
    prisma.product.findMany({
      where: { trackInventory: true, status: "ACTIVE" },
      select: { id: true, name: true, stock: true, lowStockAlert: true, imageUrls: true },
      orderBy: { stock: "asc" },
      take: 5,
    }),
    // Son siparişler
    prisma.order.findMany({
      take: 8,
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { name: true } },
        items: { include: { product: { select: { name: true } } } },
      },
    }),
    // Son 12 ay satış
    prisma.$queryRaw`
      SELECT 
        EXTRACT(YEAR FROM "createdAt") as year,
        EXTRACT(MONTH FROM "createdAt") as month,
        SUM("totalAmount") as revenue,
        COUNT(*) as orders
      FROM "Order"
      WHERE "createdAt" >= NOW() - INTERVAL '12 months'
        AND "paymentStatus" = 'PAID'
      GROUP BY year, month
      ORDER BY year, month
    `,
    // En çok satan ürünler
    prisma.orderItem.groupBy({
      by: ["productId"],
      _sum: { quantity: true },
      orderBy: { _sum: { quantity: "desc" } },
      take: 5,
    }),
    // Okunmamış bildirimler
    prisma.notification.findMany({
      where: { isRead: false },
      orderBy: { createdAt: "desc" },
      take: 10,
    }),
  ]);

  // Top ürün detaylarını çek
  const topProductDetails = await prisma.product.findMany({
    where: { id: { in: topProducts.map((p) => p.productId) } },
    select: { id: true, name: true, imageUrls: true, price: true },
  });

  const thisMonthRevenue = totalRevenue._sum.totalAmount || 0;
  const prevMonthRevenue = lastMonthRevenue._sum.totalAmount || 0;
  const revenueGrowth = prevMonthRevenue > 0
    ? (((thisMonthRevenue - prevMonthRevenue) / prevMonthRevenue) * 100).toFixed(1)
    : "0";

  return NextResponse.json({
    stats: {
      revenue: thisMonthRevenue,
      revenueGrowth,
      todayRevenue: todayRevenue._sum.totalAmount || 0,
      totalOrders,
      pendingOrders,
      totalCustomers,
      newCustomersThisMonth,
    },
    lowStockProducts: lowStockProducts.filter((p) => p.stock <= p.lowStockAlert),
    recentOrders,
    monthlySales,
    topProducts: topProducts.map((tp) => ({
      ...tp,
      product: topProductDetails.find((p) => p.id === tp.productId),
    })),
    notifications,
  });
}
