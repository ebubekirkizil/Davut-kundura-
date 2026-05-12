import { prisma } from "./prisma"

export interface BankTransaction {
  externalId: string
  amount: number
  description: string
  transactedAt: Date
}

export class BankSimulator {
  /**
   * Kuveyt Türk API Market yapısını taklit eden simülatör.
   * Gerçek anahtarlar girildiğinde bu metodlar gerçek HTTP isteklerine dönüştürülebilir.
   */
  static async fetchRecentTransactions(bankName: string): Promise<BankTransaction[]> {
    // Banka bazlı farklı mock veriler dönebiliriz
    if (bankName.includes("Kuveyt")) {
      return [
        {
          externalId: `kt_tx_${Date.now()}_1`,
          amount: 32500,
          description: "EFT GELEN - PENDİK DERİCİLİK SAN. - KUVEYTTÜRK API",
          transactedAt: new Date(),
        },
        {
          externalId: `kt_tx_${Date.now()}_2`,
          amount: -4200,
          description: "KİRA ÖDEMESİ - KUVEYT TÜRK OTOMATİK",
          transactedAt: new Date(Date.now() - 86400000), // Dün
        },
        {
          externalId: `kt_tx_${Date.now()}_3`,
          amount: 15750,
          description: "POS TAHSİLAT - GÜNLÜK MAĞAZA CIRO",
          transactedAt: new Date(Date.now() - 172800000), // 2 gün önce
        }
      ]
    }
    
    return []
  }

  /**
   * Banka hesabını veritabanına bağlar ve ilk hareketleri çeker.
   */
  static async connectAndSync(bankAccountId: string) {
    const bankAccount = await prisma.bankAccount.findUnique({
      where: { id: bankAccountId }
    })

    if (!bankAccount) return

    const transactions = await this.fetchRecentTransactions(bankAccount.bankName)

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

    // Bakiyeyi güncelle (Mock: Tüm hareketlerin toplamı + başlangıç bakiyesi)
    const totalTxAmount = transactions.reduce((sum, t) => sum + t.amount, 0)
    
    await prisma.bankAccount.update({
      where: { id: bankAccount.id },
      data: {
        currentBalance: bankAccount.currentBalance + totalTxAmount,
        lastSyncedAt: new Date()
      }
    })
  }
}
