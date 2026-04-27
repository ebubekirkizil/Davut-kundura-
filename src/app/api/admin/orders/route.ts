import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

function isAdmin(session: any) {
  return session?.user?.role === "ADMIN";
}

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!isAdmin(session)) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");
  const status = searchParams.get("status") || "";
  const search = searchParams.get("search") || "";

  const where: any = {};
  if (status) where.status = status;
  if (search) where.OR = [
    { orderNumber: { contains: search, mode: "insensitive" } },
    { user: { name: { contains: search, mode: "insensitive" } } },
  ];

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { name: true, email: true, phone: true } },
        address: true,
        items: {
          include: {
            product: { select: { name: true, imageUrls: true } },
            variant: true,
          },
        },
        discountCode: true,
      },
    }),
    prisma.order.count({ where }),
  ]);

  return NextResponse.json({ orders, total, page, limit });
}

export async function PATCH(req: NextRequest) {
  const session = await auth();
  if (!isAdmin(session)) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const { id, status, cargoCompany, cargoTrackingNo, adminNotes, paymentStatus } = await req.json();

  const updateData: any = {};
  if (status) updateData.status = status;
  if (paymentStatus) updateData.paymentStatus = paymentStatus;
  if (cargoCompany) updateData.cargoCompany = cargoCompany;
  if (cargoTrackingNo) updateData.cargoTrackingNo = cargoTrackingNo;
  if (adminNotes !== undefined) updateData.adminNotes = adminNotes;
  if (status === "SHIPPED") updateData.cargoSentAt = new Date();

  const order = await prisma.order.update({
    where: { id },
    data: updateData,
  });

  // Bildirim oluştur
  if (status) {
    const messages: Record<string, string> = {
      PROCESSING: "Sipariş hazırlanmaya başlandı",
      SHIPPED: `Sipariş kargoya verildi${cargoCompany ? ` (${cargoCompany})` : ""}`,
      DELIVERED: "Sipariş teslim edildi",
      CANCELLED: "Sipariş iptal edildi",
    };
    if (messages[status]) {
      await prisma.notification.create({
        data: {
          type: status === "SHIPPED" ? "CARGO_DELIVERED" : "NEW_ORDER",
          title: `#${order.orderNumber} Güncellendi`,
          message: messages[status],
          link: `/orders/${id}`,
        },
      });
    }
  }

  return NextResponse.json(order);
}
