import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

// POST /api/auth/forgot-password — Mail gönder
export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "E-posta adresi gerekli" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email } });

  // Güvenlik: Kullanıcı yoksa bile başarılı dön (email enumeration saldırısını önle)
  if (!user) {
    return NextResponse.json({ success: true });
  }

  // 6 haneli OTP kodu oluştur (1 saat geçerli)
  const otp = crypto.randomInt(100000, 999999).toString();
  const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 saat

  // Doğrulama tokenını kaydet
  await prisma.verificationToken.upsert({
    where: { identifier_token: { identifier: email, token: "reset" } },
    update: { token: otp, expires },
    create: { identifier: email, token: otp, expires },
  }).catch(async () => {
    // Varsa önce sil sonra yeniden oluştur
    await prisma.verificationToken.deleteMany({ where: { identifier: email } });
    await prisma.verificationToken.create({
      data: { identifier: email, token: otp, expires },
    });
  });

  // Mail gönder (Resend veya Gmail SMTP)
  const RESEND_KEY = process.env.RESEND_API_KEY;

  if (RESEND_KEY) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${RESEND_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.EMAIL_FROM || "Davut Kundura <noreply@davutkundura.com>",
          to: email,
          subject: "Şifre Sıfırlama Kodu — Davut Kundura",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 30px; background: #f9f9f9; border-radius: 12px;">
              <div style="text-align: center; margin-bottom: 24px;">
                <div style="width: 60px; height: 60px; background: #16a34a; border-radius: 12px; display: inline-flex; align-items: center; justify-content: center; font-size: 28px; font-weight: bold; color: white;">D</div>
                <h1 style="color: #1a1a1a; margin-top: 12px; font-size: 20px;">Şifre Sıfırlama</h1>
              </div>
              <p style="color: #555; margin-bottom: 20px;">Admin panelinize giriş şifrenizi sıfırlamak için aşağıdaki <strong>6 haneli kodu</strong> kullanın:</p>
              <div style="text-align: center; background: #1a1a1a; color: #ffffff; font-size: 36px; font-weight: bold; letter-spacing: 12px; padding: 20px; border-radius: 10px; margin: 20px 0;">
                ${otp}
              </div>
              <p style="color: #888; font-size: 13px;">Bu kod <strong>1 saat</strong> geçerlidir. Şifre sıfırlamadıysanız bu maili görmezden gelin.</p>
              <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
              <p style="color: #aaa; font-size: 12px; text-align: center;">Davut Kundura Yönetim Paneli</p>
            </div>
          `,
        }),
      });
    } catch (e) {
      console.error("Mail gönderme hatası:", e);
    }
  } else {
    // Geliştirme modunda OTP'yi konsola yaz
    console.log(`\n🔐 Şifre Sıfırlama OTP: ${otp} (${email})\n`);
  }

  return NextResponse.json({ success: true });
}

// POST /api/auth/verify-reset — OTP doğrula ve şifre sıfırla
export async function PUT(req: NextRequest) {
  const { email, otp, newPassword } = await req.json();

  if (!email || !otp || !newPassword) {
    return NextResponse.json({ error: "Tüm alanlar gerekli" }, { status: 400 });
  }

  const token = await prisma.verificationToken.findFirst({
    where: {
      identifier: email,
      token: otp,
      expires: { gt: new Date() },
    },
  });

  if (!token) {
    return NextResponse.json({ error: "Geçersiz veya süresi dolmuş kod" }, { status: 400 });
  }

  const bcrypt = await import("bcryptjs");
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { email },
    data: { password: hashedPassword, updatedAt: new Date() },
  });

  // Token kullanıldı, sil
  await prisma.verificationToken.deleteMany({ where: { identifier: email } });

  return NextResponse.json({ success: true, message: "Şifreniz başarıyla güncellendi" });
}
