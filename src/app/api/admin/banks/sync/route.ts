import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { BankSimulator } from "@/lib/bank-simulator"

export async function POST(req: Request) {
  try {
    const { id } = await req.json()

    if (!id) {
      // ID gelmezse tüm bankaları senkronize et
      const banks = await prisma.bankAccount.findMany()
      for (const bank of banks) {
        await BankSimulator.connectAndSync(bank.id)
      }
    } else {
      await BankSimulator.connectAndSync(id)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Senkronizasyon hatası" }, { status: 500 })
  }
}
