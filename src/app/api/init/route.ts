import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    // Check if any admin exists
    const adminCount = await prisma.user.count({
      where: { role: "ADMIN" },
    })

    if (adminCount > 0) {
      return NextResponse.json({
        initialized: true,
        message: "Admin kullanıcısı zaten mevcut",
      })
    }

    // Create default admin user
    const hashedPassword = await bcrypt.hash("123456", 10)

    const admin = await prisma.user.create({
      data: {
        email: "ebukizil@gmail.com",
        password: hashedPassword,
        name: "Admin",
        role: "ADMIN",
      },
    })

    return NextResponse.json({
      initialized: true,
      created: true,
      message: "Admin kullanıcısı otomatik oluşturuldu",
      admin: {
        email: admin.email,
        name: admin.name,
      },
    })
  } catch (error: any) {
    console.error("Auto-init error:", error)
    return NextResponse.json(
      {
        initialized: false,
        error: "Otomatik kurulum başarısız: " + error.message
      },
      { status: 500 }
    )
  }
}
