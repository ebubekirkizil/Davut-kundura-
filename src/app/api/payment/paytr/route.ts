import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Paytr Ödeme Altyapısı — Tam Entegrasyon İskeleti
// Paytr hesabınızı bağladığınızda bu API otomatik aktif olacak

const PAYTR_MERCHANT_ID = process.env.PAYTR_MERCHANT_ID || "";
const PAYTR_MERCHANT_KEY = process.env.PAYTR_MERCHANT_KEY || "";
const PAYTR_MERCHANT_SALT = process.env.PAYTR_MERCHANT_SALT || "";

export async function POST(req: NextRequest) {
  const { orderId } = await req.json();

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      user: true,
      address: true,
      items: { include: { product: true } },
    },
  });

  if (!order) return NextResponse.json({ error: "Sipariş bulunamadı" }, { status: 404 });

  // TODO: Paytr credentials gelince bu bölüm aktif olacak
  // Şimdilik altyapı hazır
  if (!PAYTR_MERCHANT_ID) {
    return NextResponse.json({
      status: "infrastructure_ready",
      message: "Paytr bilgileri .env dosyasına eklendikten sonra bu API otomatik çalışacak",
      requiredEnvVars: ["PAYTR_MERCHANT_ID", "PAYTR_MERCHANT_KEY", "PAYTR_MERCHANT_SALT"],
      orderSummary: {
        orderNumber: order.orderNumber,
        total: order.totalAmount,
        customerEmail: order.user.email,
        itemCount: order.items.length,
      },
    });
  }

  // Paytr entegrasyon kodu (aktif olduğunda çalışacak)
  const crypto = require("crypto");
  const merchantOid = order.orderNumber;
  const email = order.user.email!;
  const paymentAmount = Math.round(order.totalAmount * 100); // Kuruş

  const basketItems = order.items.map((item) => [
    item.product.name,
    (item.price * 100).toFixed(0),
    item.quantity,
  ]);
  const userBasket = Buffer.from(JSON.stringify(basketItems)).toString("base64");

  const noInstallment = "0";
  const maxInstallment = "0";
  const currency = "TL";
  const testMode = process.env.NODE_ENV === "production" ? "0" : "1";
  const userIp = req.headers.get("x-forwarded-for") || "127.0.0.1";
  const successUrl = `${process.env.NEXT_PUBLIC_APP_URL}/odeme/basarili`;
  const failUrl = `${process.env.NEXT_PUBLIC_APP_URL}/odeme/basarisiz`;

  const hashStr = `${PAYTR_MERCHANT_ID}${userIp}${merchantOid}${email}${paymentAmount}${userBasket}${noInstallment}${maxInstallment}${currency}${testMode}`;
  const paytrToken = crypto
    .createHmac("sha256", PAYTR_MERCHANT_KEY + PAYTR_MERCHANT_SALT)
    .update(hashStr)
    .digest("base64");

  const params = new URLSearchParams({
    merchant_id: PAYTR_MERCHANT_ID,
    user_ip: userIp,
    merchant_oid: merchantOid,
    email,
    payment_amount: paymentAmount.toString(),
    paytr_token: paytrToken,
    user_basket: userBasket,
    debug_on: "1",
    no_installment: noInstallment,
    max_installment: maxInstallment,
    user_name: order.user.name || "",
    user_address: order.address?.address || "",
    user_phone: order.address?.phone || "",
    merchant_ok_url: successUrl,
    merchant_fail_url: failUrl,
    timeout_limit: "30",
    currency,
    test_mode: testMode,
    lang: "tr",
  });

  const paytrResponse = await fetch("https://www.paytr.com/odeme/api/get-token", {
    method: "POST",
    body: params,
  });
  const paytrData = await paytrResponse.json();

  if (paytrData.status !== "success") {
    return NextResponse.json({ error: paytrData.reason }, { status: 400 });
  }

  // Token'ı veritabanına kaydet
  await prisma.order.update({
    where: { id: orderId },
    data: {
      paytrMerchantOid: merchantOid,
      paytrToken: paytrData.token,
    },
  });

  return NextResponse.json({ iframeToken: paytrData.token });
}

// Paytr başarı callback (ödeme tamamlandığında Paytr bu URL'i çağırır)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const merchantOid = searchParams.get("merchant_oid");
  const status = searchParams.get("status");

  if (!merchantOid || status !== "success") {
    return NextResponse.json({ error: "Geçersiz istek" }, { status: 400 });
  }

  const order = await prisma.order.findFirst({
    where: { orderNumber: merchantOid },
  });

  if (!order) return NextResponse.json({ error: "Sipariş bulunamadı" }, { status: 404 });

  await prisma.order.update({
    where: { id: order.id },
    data: {
      paymentStatus: "PAID",
      status: "PROCESSING",
    },
  });

  // Bildirim oluştur
  await prisma.notification.create({
    data: {
      type: "PAYMENT_RECEIVED",
      title: "Ödeme Alındı!",
      message: `#${merchantOid} siparişi için ödeme başarıyla alındı`,
      link: `/orders/${order.id}`,
    },
  });

  return NextResponse.json({ success: true });
}
