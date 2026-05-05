import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

export async function GET(request: NextRequest) {
  const diagnostics: any = {
    timestamp: new Date().toISOString(),
    checks: {},
  }

  try {
    // 1. Check if DATABASE_URL exists
    diagnostics.checks.databaseUrlExists = !!process.env.DATABASE_URL
    diagnostics.checks.databaseUrl = process.env.DATABASE_URL
      ? `${process.env.DATABASE_URL.substring(0, 30)}...`
      : "NOT SET"

    // 2. Check if DIRECT_URL exists
    diagnostics.checks.directUrlExists = !!process.env.DIRECT_URL

    // 3. Try to connect to database
    if (process.env.DATABASE_URL) {
      const prisma = new PrismaClient()

      try {
        // Try a simple query
        await prisma.$queryRaw`SELECT 1`
        diagnostics.checks.databaseConnection = "SUCCESS"

        // Try to count users
        const userCount = await prisma.user.count()
        diagnostics.checks.userCount = userCount

        // Try to count admins
        const adminCount = await prisma.user.count({
          where: { role: "ADMIN" }
        })
        diagnostics.checks.adminCount = adminCount

        diagnostics.status = "HEALTHY"
      } catch (dbError: any) {
        diagnostics.checks.databaseConnection = "FAILED"
        diagnostics.checks.databaseError = dbError.message
        diagnostics.status = "DATABASE_ERROR"
      } finally {
        await prisma.$disconnect()
      }
    } else {
      diagnostics.checks.databaseConnection = "SKIPPED - No DATABASE_URL"
      diagnostics.status = "CONFIGURATION_ERROR"
    }

    // 4. Environment info
    diagnostics.environment = {
      nodeEnv: process.env.NODE_ENV,
      platform: process.platform,
      nodeVersion: process.version,
    }

    return NextResponse.json(diagnostics, {
      status: diagnostics.status === "HEALTHY" ? 200 : 500
    })
  } catch (error: any) {
    return NextResponse.json({
      status: "ERROR",
      error: error.message,
      stack: error.stack,
    }, { status: 500 })
  }
}
