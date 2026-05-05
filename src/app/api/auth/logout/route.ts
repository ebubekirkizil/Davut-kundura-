import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()

    // Clear the session cookie
    cookieStore.delete("admin-session")

    return NextResponse.json(
      { success: true, message: "Çıkış yapıldı" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json(
      { error: "Çıkış yapılırken bir hata oluştu" },
      { status: 500 }
    )
  }
}
