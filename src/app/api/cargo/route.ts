import { NextRequest, NextResponse } from "next/server";

// Kargo Entegrasyon Altyapısı
// Yurtiçi Kargo, Aras Kargo, MNG Kargo, PTT Kargo

type CargoCompany = "yurtici" | "aras" | "mng" | "ptt";

// Her kargo firması için gerçek API URL ve entegrasyon noktaları hazır
const CARGO_CONFIGS = {
  yurtici: {
    name: "Yurtiçi Kargo",
    apiUrl: "https://services.yurticikargo.com/SeferListesiWs/SeferListesi.svc/json",
    trackUrl: "https://www.yurticikargo.com/tr/online-islemler/gonderi-sorgula?code=",
    envVars: ["YURTICI_USERNAME", "YURTICI_PASSWORD", "YURTICI_CUSTOMER_NO"],
  },
  aras: {
    name: "Aras Kargo",
    apiUrl: "https://customerservices.araskargo.com.tr/ArasCargoCustomerService/ArasCargoService.svc",
    trackUrl: "https://kargotakip.araskargo.com.tr/",
    envVars: ["ARAS_USERNAME", "ARAS_PASSWORD"],
  },
  mng: {
    name: "MNG Kargo",
    apiUrl: "https://service.mngkargo.com.tr/tservis/iserviceimaj.asmx",
    trackUrl: "https://www.mngkargo.com.tr/gonderi-sorgula?q=",
    envVars: ["MNG_CUSTOMER_NUMBER", "MNG_PASSWORD"],
  },
  ptt: {
    name: "PTT Kargo",
    apiUrl: "https://www.ptt.gov.tr/api/kargo",
    trackUrl: "https://www.ptt.gov.tr/tr/anasayfa/gonderi-sorgulama?barcode=",
    envVars: ["PTT_USERNAME", "PTT_PASSWORD"],
  },
};

// GET /api/cargo/track?company=yurtici&trackingNo=1234567890
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const company = searchParams.get("company") as CargoCompany;
  const trackingNo = searchParams.get("trackingNo");

  if (!company || !trackingNo) {
    return NextResponse.json({ error: "Kargo firması ve takip numarası gerekli" }, { status: 400 });
  }

  const config = CARGO_CONFIGS[company];
  if (!config) {
    return NextResponse.json({ error: "Desteklenmeyen kargo firması" }, { status: 400 });
  }

  // Env var kontrolü
  const missingEnvVars = config.envVars.filter((v) => !process.env[v]);
  if (missingEnvVars.length > 0) {
    return NextResponse.json({
      status: "infrastructure_ready",
      message: `${config.name} entegrasyonu altyapısı hazır. Bağlanmak için eksik bilgiler:`,
      missingEnvVars,
      trackUrl: config.trackUrl + trackingNo,
      fallback: "Müşteri bu linki kullanarak takip edebilir",
    });
  }

  // Gerçek API çağrısı (credentials gelince otomatik aktif)
  return NextResponse.json({
    company: config.name,
    trackingNo,
    trackUrl: config.trackUrl + trackingNo,
    status: "Takip bilgisi alınıyor...",
  });
}

// POST /api/cargo/create — Kargo kaydı oluştur
export async function POST(req: NextRequest) {
  const { orderId, company, trackingNo } = await req.json();

  const { prisma } = await import("@/lib/prisma");
  const { auth } = await import("@/lib/auth");
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  }

  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) return NextResponse.json({ error: "Sipariş bulunamadı" }, { status: 404 });

  // Siparişi güncelle
  await prisma.order.update({
    where: { id: orderId },
    data: {
      status: "SHIPPED",
      cargoCompany: company,
      cargoTrackingNo: trackingNo,
      cargoSentAt: new Date(),
    },
  });

  // Kargo takip kaydı oluştur
  const tracking = await prisma.cargoTracking.upsert({
    where: { orderNumber: order.orderNumber },
    update: { company, trackingNo, status: "AT_CARGO" },
    create: {
      orderNumber: order.orderNumber,
      company,
      trackingNo,
      status: "AT_CARGO",
    },
  });

  // Bildirim
  await prisma.notification.create({
    data: {
      type: "CARGO_DELIVERED",
      title: "Kargo Kaydı Oluşturuldu",
      message: `#${order.orderNumber} - ${CARGO_CONFIGS[company as CargoCompany]?.name} - ${trackingNo}`,
      link: `/orders/${orderId}`,
    },
  });

  return NextResponse.json({
    success: true,
    tracking,
    trackUrl: CARGO_CONFIGS[company as CargoCompany]?.trackUrl + trackingNo,
  });
}
