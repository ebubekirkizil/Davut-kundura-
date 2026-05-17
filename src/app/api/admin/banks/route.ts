import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { BankSimulator } from "@/lib/bank-simulator"

export async function GET() {
  try {
    const banks = await prisma.bankAccount.findMany({
      include: {
        rawTransactions: {
          orderBy: { transactedAt: 'desc' },
          take: 20
        }
      },
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(banks)
  } catch (error) {
    return NextResponse.json({ error: "Bankalar yüklenirken hata oluştu" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { bankName, accountName, iban, clientId, clientSecret, apiProvider, initialBalance } = body

    if (!iban || !bankName) {
      return NextResponse.json({ error: "Banka adı ve IBAN zorunludur" }, { status: 400 })
    }

    // Banka hesabını oluştur
    const bankAccount = await prisma.bankAccount.create({
      data: {
        bankName,
        accountName,
        iban,
        clientId,
        clientSecret,
        apiProvider,
        currentBalance: initialBalance ? parseFloat(initialBalance) : 0,
        isReadOnly: true
      }
    })

    // İlk senkronizasyonu başlat (Mock)
    await BankSimulator.connectAndSync(bankAccount.id)

    // Güncel halini tekrar çek
    const updatedBank = await prisma.bankAccount.findUnique({
      where: { id: bankAccount.id },
      include: {
        rawTransactions: {
          orderBy: { transactedAt: 'desc' }
        }
      }
    })

    return NextResponse.json(updatedBank)
  } catch (error: any) {
    console.error("BANK_ADD_ERROR:", error)
    
    if (error.code === 'P2002') {
      return NextResponse.json({ error: "Bu IBAN adresi zaten sisteme kayıtlı" }, { status: 400 })
    }
    
    // Daha detaylı hata mesajı dönelim (Debug için)
    return NextResponse.json({ 
      error: "Banka eklenirken teknik bir hata oluştu",
      details: error.message || "Bilinmeyen hata"
    }, { status: 500 })
  }
}
