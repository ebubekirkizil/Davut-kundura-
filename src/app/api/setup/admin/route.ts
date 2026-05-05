import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    // Security: Check if this is the first setup
    const existingAdmins = await prisma.user.count({
      where: { role: "ADMIN" },
    })

    if (existingAdmins > 0) {
      return NextResponse.json(
        { error: "Admin kullanıcısı zaten mevcut" },
        { status: 400 }
      )
    }

    const { email, password, name } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email ve şifre gerekli" },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create admin user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || "Admin",
        role: "ADMIN",
      },
    })

    return NextResponse.json({
      success: true,
      message: "Admin kullanıcısı başarıyla oluşturuldu",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    })
  } catch (error: any) {
    console.error("Setup error:", error)

    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Bu email adresi zaten kullanılıyor" },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "Bir hata oluştu: " + error.message },
      { status: 500 }
    )
  }
}
