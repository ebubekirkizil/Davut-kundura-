export interface KuveytTurkTransaction {
  id: string
  amount: number
  description: string
  date: string
}

export class KuveytTurkAPI {
  private baseUrl = "https://api.kuveytturk.com.tr/v1" // Gerçek API base URL

  constructor(private clientId: string, private clientSecret: string) {}

  /**
   * OAuth2 Access Token alır.
   */
  async getAccessToken(): Promise<string | null> {
    try {
      const response = await fetch("https://api.kuveytturk.com.tr/v1/authorization/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          grant_type: "client_credentials",
          client_id: this.clientId,
          client_secret: this.clientSecret
        })
      })

      if (!response.ok) return null
      const data = await response.json()
      return data.access_token
    } catch (error) {
      console.error("Kuveyt Türk Auth Error:", error)
      return null
    }
  }

  /**
   * Hesap hareketlerini çeker.
   */
  async getTransactions(iban: string): Promise<KuveytTurkTransaction[]> {
    const token = await this.getAccessToken()
    if (!token) return []

    try {
      // Not: Gerçek API endpoint'leri ve parametreleri dokümantasyona göre revize edilmelidir.
      const response = await fetch(`${this.baseUrl}/accounts/transactions?iban=${iban}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })

      if (!response.ok) return []
      const data = await response.json()
      
      // Gelen veriyi sistemimize uygun formata dönüştürüyoruz
      return (data.transactions || []).map((t: any) => ({
        id: t.transaction_id,
        amount: t.amount,
        description: t.description,
        date: t.transaction_date
      }))
    } catch (error) {
      console.error("Kuveyt Türk Transaction Error:", error)
      return []
    }
  }

  /**
   * Hesap bakiyesini çeker.
   */
  async getBalance(iban: string): Promise<number | null> {
    const token = await this.getAccessToken()
    if (!token) return null

    try {
      const response = await fetch(`${this.baseUrl}/accounts/balance?iban=${iban}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })

      if (!response.ok) return null
      const data = await response.json()
      return data.balance
    } catch (error) {
      console.error("Kuveyt Türk Balance Error:", error)
      return null
    }
  }
}
