import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

// BU ENDPOINT SADECE BİR KEZ KULLANIN — Admin kullanıcısı oluştuktan sonra bu dosyayı silin!
export async function GET() {
  try {
    // Zaten var mı kontrol et
    const existing = await prisma.user.findUnique({
      where: { email: "ebubekir@davutkundura.com" },
    });

    if (existing) {
      return NextResponse.json({ message: "Admin zaten mevcut!", email: existing.email });
    }

    const hashedPassword = await bcrypt.hash("DavutAdmin2024!", 12);

    const admin = await prisma.user.create({
      data: {
        name: "Ebubekir Kızıl",
        email: "ebubekir@davutkundura.com",
        password: hashedPassword,
        role: "ADMIN",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Admin kullanıcısı oluşturuldu!",
      email: admin.email,
      sitre: "DavutAdmin2024!",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Hata oluştu", detail: String(error) }, { status: 500 });
  }
}
