import { prisma } from "./prisma"
import { KuveytTurkAPI } from "./kuveyt-turk-api"

export interface BankTransaction {
  externalId: string
  amount: number
  description: string
  transactedAt: Date
}

export class BankSimulator {
  /**
   * Kuveyt Türk API Market yapısını taklit eden simülatör.
   */
  static async fetchRecentTransactions(bankName: string): Promise<BankTransaction[]> {
    // Simulator logic remains same for fallback
    if (bankName.includes("Kuveyt")) {
      return [
        {
          externalId: `kt_tx_${Date.now()}_1`,
          amount: 32500,
          description: "EFT GELEN - PENDİK DERİCİLİK SAN. - KUVEYTTÜRK (SİMÜLASYON)",
          transactedAt: new Date(),
        },
        {
          externalId: `kt_tx_${Date.now()}_2`,
          amount: -4200,
          description: "KİRA ÖDEMESİ - KUVEYT TÜRK OTOMATİK (SİMÜLASYON)",
          transactedAt: new Date(Date.now() - 86400000),
        }
      ]
    }
    return []
  }

  /**
   * Banka hesabını veritabanına bağlar ve gerçek veya simüle verileri çeker.
   */
  static async connectAndSync(bankAccountId: string) {
    const bankAccount = await prisma.bankAccount.findUnique({
      where: { id: bankAccountId }
    })

    if (!bankAccount) return

    let transactions: BankTransaction[] = []
    let currentBalance: number | null = null

    // EĞER GERÇEK API ANAHTARLARI VARSA GERÇEK API'YE BAĞLAN
    if (bankAccount.clientId && bankAccount.clientSecret && bankAccount.bankName.includes("Kuveyt")) {
      const api = new KuveytTurkAPI(bankAccount.clientId, bankAccount.clientSecret)
      
      const realTxs = await api.getTransactions(bankAccount.iban)
      if (realTxs.length > 0) {
        transactions = realTxs.map(t => ({
          externalId: t.id,
          amount: t.amount,
          description: t.description,
          transactedAt: new Date(t.date)
        }))
      }

      currentBalance = await api.getBalance(bankAccount.iban)
    } 

    // EĞER GERÇEK VERİ GELMEDİYSE VEYA ANAHTAR YOKSA SİMÜLASYONA DEVAM ET
    if (transactions.length === 0) {
      transactions = await this.fetchRecentTransactions(bankAccount.bankName)
    }

    // Hareketleri kaydet
    for (const tx of transactions) {
      await prisma.bankTransactionRaw.upsert({
        where: {
          bankAccountId_externalId: {
            bankAccountId: bankAccount.id,
            externalId: tx.externalId
          }
        },
        update: {},
        create: {
          bankAccountId: bankAccount.id,
          externalId: tx.externalId,
          amount: tx.amount,
          description: tx.description,
          transactedAt: tx.transactedAt
        }
      })
    }

    // Bakiyeyi güncelle
    const totalTxAmount = transactions.reduce((sum, t) => sum + t.amount, 0)
    const finalBalance = currentBalance !== null ? currentBalance : (bankAccount.currentBalance + totalTxAmount)
    
    await prisma.bankAccount.update({
      where: { id: bankAccount.id },
      data: {
        currentBalance: finalBalance,
        lastSyncedAt: new Date()
      }
    })
  }
}
