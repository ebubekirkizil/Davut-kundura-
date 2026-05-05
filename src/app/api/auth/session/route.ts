import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()

    // Check for customer session first
    let sessionToken = cookieStore.get("customer-session")?.value
    let isAdmin = false

    // If no customer session, check for admin session
    if (!sessionToken) {
      sessionToken = cookieStore.get("admin-session")?.value
      isAdmin = true
    }

    if (!sessionToken) {
      return NextResponse.json({ user: null }, { status: 200 })
    }

    // Find user by email (session token is the email)
    const user = await prisma.user.findUnique({
      where: { email: sessionToken },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    })

    if (!user) {
      return NextResponse.json({ user: null }, { status: 200 })
    }

    return NextResponse.json({ user }, { status: 200 })
  } catch (error) {
    console.error("Session check error:", error)
    return NextResponse.json({ user: null }, { status: 200 })
  }
}
