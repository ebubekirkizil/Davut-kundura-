"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  ComposedChart,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Download,
  Filter,
  CreditCard,
  Banknote,
  PiggyBank,
  Target,
  AlertTriangle,
  CheckCircle,
  Clock,
  Building,
  Calculator,
  FileText,
  Search,
  Plus,
  Eye,
  MoreVertical,
  Wallet,
  TrendingDown as TrendingDownIcon,
  BarChart3,
  Activity,
  Shield,
  Globe
} from "lucide-react"

// Mock financial data - Enterprise Level
const financialStats = [
  {
    title: "Toplam Gelir",
    subtitle: "Bu Ay",
    value: "₺12,847,650",
    change: "+24.8%",
    trend: "up",
    icon: DollarSign,
    color: "from-emerald-500 to-green-600",
    target: "₺15,000,000",
    progress: 85.7
  },
  {
    title: "Net Kar",
    subtitle: "Kar Marjı",
    value: "₺4,892,340",
    change: "+18.3%",
    trend: "up",
    icon: TrendingUp,
    color: "from-blue-500 to-cyan-600",
    target: "₺5,500,000",
    progress: 88.9
  },
  {
    title: "Nakit Akışı",
    subtitle: "Operasyonel",
    value: "₺2,456,780",
    change: "+12.5%",
    trend: "up",
    icon: Banknote,
    color: "from-purple-500 to-violet-600",
    target: "₺3,000,000",
    progress: 81.9
  },
  {
    title: "Alacaklar",
    subtitle: "Bekleyen",
    value: "₺1,847,920",
    change: "-8.2%",
    trend: "down",
    icon: Clock,
    color: "from-amber-500 to-orange-600",
    target: "₺1,500,000",
    progress: 123.2
  },
  {
    title: "Borçlar",
    subtitle: "Ödenecek",
    value: "₺892,450",
    change: "-15.7%",
    trend: "down",
    icon: CreditCard,
    color: "from-red-500 to-pink-600",
    target: "₺800,000",
    progress: 111.6
  },
  {
    title: "Yatırımlar",
    subtitle: "Portföy Değeri",
    value: "₺8,450,000",
    change: "+31.2%",
    trend: "up",
    icon: PiggyBank,
    color: "from-indigo-500 to-blue-600",
    target: "₺10,000,000",
    progress: 84.5
  },
  {
    title: "Bütçe Performansı",
    subtitle: "Hedef Karşılaştırması",
    value: "94.2%",
    change: "+5.8%",
    trend: "up",
    icon: Target,
    color: "from-teal-500 to-cyan-600",
    target: "100%",
    progress: 94.2
  },
  {
    title: "Risk Skoru",
    subtitle: "Finansal Sağlık",
    value: "A+",
    change: "Stabil",
    trend: "up",
    icon: Shield,
    color: "from-green-500 to-emerald-600",
    target: "A+",
    progress: 100
  }
]

const monthlyFinancialData = [
  {
    month: "Oca",
    income: 8450000,
    expense: 4200000,
    profit: 4250000,
    cashFlow: 3890000,
    receivables: 2100000,
    payables: 1200000,
    budget: 8000000,
    forecast: 8200000
  },
  {
    month: "Şub",
    income: 9890000,
    expense: 4800000,
    profit: 5090000,
    cashFlow: 4650000,
    receivables: 2350000,
    payables: 1100000,
    budget: 9000000,
    forecast: 9500000
  },
  {
    month: "Mar",
    income: 11200000,
    expense: 5200000,
    profit: 6000000,
    cashFlow: 5450000,
    receivables: 2680000,
    payables: 980000,
    budget: 10500000,
    forecast: 11000000
  },
  {
    month: "Nis",
    income: 10950000,
    expense: 4900000,
    profit: 6050000,
    cashFlow: 5200000,
    receivables: 2450000,
    payables: 1050000,
    budget: 10800000,
    forecast: 10700000
  },
  {
    month: "May",
    income: 12450000,
    expense: 5600000,
    profit: 6850000,
    cashFlow: 6100000,
    receivables: 2890000,
    payables: 890000,
    budget: 12000000,
    forecast: 12200000
  },
  {
    month: "Haz",
    income: 12847650,
    expense: 5955310,
    profit: 6892340,
    cashFlow: 6200000,
    receivables: 1847920,
    payables: 892450,
    budget: 12500000,
    forecast: 12800000
  }
]

const expenseCategories = [
  { name: "Hammadde & Üretim", value: 2450000, color: "#d4af37", percentage: 41.2, budget: 2600000 },
  { name: "Personel & Bordro", value: 1890000, color: "#8B4513", percentage: 31.7, budget: 1950000 },
  { name: "Operasyonel Giderler", value: 680000, color: "#2563eb", percentage: 11.4, budget: 700000 },
  { name: "Pazarlama & Satış", value: 450000, color: "#dc2626", percentage: 7.6, budget: 500000 },
  { name: "Ar-Ge & İnovasyon", value: 320000, color: "#7c3aed", percentage: 5.4, budget: 350000 },
  { name: "Diğer Giderler", value: 165310, color: "#64748b", percentage: 2.8, budget: 200000 }
]

const recentTransactions = [
  {
    id: "TXN24050001",
    type: "income",
    description: "ABC Holding A.Ş. - Kurumsal Sipariş Ödemesi",
    category: "B2B Satış",
    amount: 284500,
    date: "2026-05-06T10:30:00",
    status: "completed",
    paymentMethod: "Havale",
    reference: "REF-ABC-240506-001",
    customer: "ABC Holding A.Ş.",
    currency: "TRY",
    exchangeRate: 1.0,
    taxAmount: 51210,
    netAmount: 233290
  },
  {
    id: "TXN24050002",
    type: "expense",
    description: "Premium Deri Hammadde Alımı - İtalya",
    category: "Hammadde",
    amount: -156800,
    date: "2026-05-06T09:15:00",
    status: "completed",
    paymentMethod: "Swift Transfer",
    reference: "PO-2024-0506-001",
    supplier: "Milano Leather Co.",
    currency: "EUR",
    exchangeRate: 34.25,
    taxAmount: 0,
    netAmount: -156800
  },
  {
    id: "TXN24050003",
    type: "income",
    description: "XYZ Tekstil Ltd. - Aylık Düzenli Sipariş",
    category: "B2B Satış",
    amount: 89400,
    date: "2026-05-05T16:45:00",
    status: "completed",
    paymentMethod: "Kredi Kartı",
    reference: "REF-XYZ-240505-003",
    customer: "XYZ Tekstil Ltd.",
    currency: "TRY",
    exchangeRate: 1.0,
    taxAmount: 16092,
    netAmount: 73308
  },
  {
    id: "TXN24050004",
    type: "expense",
    description: "Personel Maaş Ödemesi - Mayıs 2026",
    category: "Bordro",
    amount: -450000,
    date: "2026-05-05T14:20:00",
    status: "completed",
    paymentMethod: "Toplu Havale",
    reference: "PAYROLL-2026-05",
    supplier: "İnsan Kaynakları",
    currency: "TRY",
    exchangeRate: 1.0,
    taxAmount: 81000,
    netAmount: -369000
  },
  {
    id: "TXN24050005",
    type: "expense",
    description: "Elektrik Faturası - Fabrika",
    category: "Operasyonel",
    amount: -28500,
    date: "2026-05-04T11:30:00",
    status: "completed",
    paymentMethod: "Otomatik Ödeme",
    reference: "ELEC-2026-05-001",
    supplier: "BEDAŞ",
    currency: "TRY",
    exchangeRate: 1.0,
    taxAmount: 5130,
    netAmount: -23370
  }
]

const taxBreakdown = [
  { name: "KDV (20%)", amount: 2284500, percentage: 68.4, status: "paid", dueDate: "2026-05-20" },
  { name: "Gelir Vergisi", amount: 680000, percentage: 20.4, status: "pending", dueDate: "2026-05-25" },
  { name: "Stopaj Vergisi", amount: 245000, percentage: 7.3, status: "paid", dueDate: "2026-05-15" },
  { name: "Damga Vergisi", amount: 89500, percentage: 2.7, status: "pending", dueDate: "2026-05-30" },
  { name: "Belediye Vergisi", amount: 40000, percentage: 1.2, status: "paid", dueDate: "2026-05-10" }
]

const bankAccounts = [
  {
    id: "ACC001",
    bankName: "Türkiye İş Bankası",
    accountNumber: "****1234",
    accountType: "Vadesiz TL",
    balance: 4892340,
    currency: "TRY",
    status: "active",
    lastTransaction: "2026-05-06T10:30:00"
  },
  {
    id: "ACC002",
    bankName: "Garanti BBVA",
    accountNumber: "****5678",
    accountType: "Vadeli USD",
    balance: 145000,
    currency: "USD",
    status: "active",
    lastTransaction: "2026-05-05T14:20:00"
  },
  {
    id: "ACC003",
    bankName: "Yapı Kredi Bankası",
    accountNumber: "****9012",
    accountType: "Kredi Hesabı",
    balance: -250000,
    currency: "TRY",
    status: "active",
    lastTransaction: "2026-05-04T09:15:00"
  }
]

const budgetComparison = [
  { category: "Satış Hedefi", budget: 15000000, actual: 12847650, variance: -14.3, status: "warning" },
  { category: "Hammadde", budget: 2600000, actual: 2450000, variance: 5.8, status: "good" },
  { category: "Personel", budget: 1950000, actual: 1890000, variance: 3.1, status: "good" },
  { category: "Pazarlama", budget: 500000, actual: 450000, variance: 10.0, status: "good" },
  { category: "Operasyonel", budget: 700000, actual: 680000, variance: 2.9, status: "good" },
  { category: "Net Kar", budget: 5500000, actual: 4892340, variance: -11.0, status: "warning" }
]

export default function AdminFinancePage() {
  const [dateRange, setDateRange] = React.useState("this-month")
  const [selectedAccount, setSelectedAccount] = React.useState("all")
  const [transactionFilter, setTransactionFilter] = React.useState("all")

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('tr-TR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  const formatCurrency = (amount: number, currency: string = 'TRY') => {
    if (currency === 'USD') {
      return `$${amount.toLocaleString()}`
    } else if (currency === 'EUR') {
      return `€${amount.toLocaleString()}`
    }
    return `₺${amount.toLocaleString()}`
  }

  const getVarianceColor = (variance: number) => {
    if (variance > 5) return "text-emerald-600"
    if (variance > 0) return "text-green-600"
    if (variance > -5) return "text-amber-600"
    return "text-red-600"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'bg-emerald-500/10 text-emerald-700 border-emerald-200'
      case 'warning': return 'bg-amber-500/10 text-amber-700 border-amber-200'
      case 'danger': return 'bg-red-500/10 text-red-700 border-red-200'
      default: return 'bg-slate-500/10 text-slate-700 border-slate-200'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-serif font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent">
            Finansal Yönetim Merkezi
          </h1>
          <p className="text-slate-600 mt-2 text-lg">
            Kurumsal düzeyde finansal kontrol ve analiz platformu
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="bg-white/60 backdrop-blur-sm border-white/40 hover:bg-white/80">
            <Calculator className="h-4 w-4 mr-2" />
            Bütçe Planlama
          </Button>
          <Button variant="outline" className="bg-white/60 backdrop-blur-sm border-white/40 hover:bg-white/80">
            <FileText className="h-4 w-4 mr-2" />
            Mali Rapor
          </Button>
          <Button className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white shadow-lg shadow-amber-500/25">
            <Download className="h-4 w-4 mr-2" />
            Finansal Rapor İndir
          </Button>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {financialStats.map((stat, index) => (
          <Card key={stat.title} className="relative overflow-hidden bg-white/60 backdrop-blur-sm border-white/40 shadow-xl shadow-slate-200/20 hover:shadow-2xl hover:shadow-slate-300/30 transition-all duration-300 group">
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity`} />

            <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-3">
              <div>
                <CardTitle className="text-sm font-medium text-slate-600">{stat.title}</CardTitle>
                <p className="text-xs text-slate-500 mt-1">{stat.subtitle}</p>
              </div>
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                <stat.icon className="h-5 w-5 text-white" />
              </div>
            </CardHeader>

            <CardContent className="relative space-y-3">
              <div className="text-3xl font-bold text-slate-800">{stat.value}</div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  {stat.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 mr-1 text-emerald-600" />
                  ) : (
                    <TrendingDownIcon className="h-4 w-4 mr-1 text-red-600" />
                  )}
                  <span className={`font-semibold ${stat.trend === "up" ? "text-emerald-600" : "text-red-600"}`}>
                    {stat.change}
                  </span>
                </div>
                <span className="text-slate-500">vs geçen ay</span>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Hedef: {stat.target}</span>
                  <span>%{stat.progress.toFixed(1)}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full bg-gradient-to-r ${stat.color} transition-all duration-500`}
                    style={{ width: `${Math.min(stat.progress, 100)}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bank Accounts Overview */}
      <Card className="bg-white/60 backdrop-blur-sm border-white/40 shadow-xl shadow-slate-200/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold text-slate-800">Banka Hesapları</CardTitle>
              <p className="text-sm text-slate-600 mt-1">Tüm hesapların anlık durumu</p>
            </div>
            <Button variant="outline" className="bg-white/60 border-white/40 hover:bg-white/80">
              <Plus className="h-4 w-4 mr-2" />
              Yeni Hesap
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {bankAccounts.map((account) => (
              <div key={account.id} className="p-4 rounded-xl bg-gradient-to-br from-white/50 to-white/30 border border-white/40 hover:from-white/70 hover:to-white/50 transition-all duration-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-slate-600" />
                    <span className="font-semibold text-slate-800">{account.bankName}</span>
                  </div>
                  <Badge className={account.balance >= 0 ? "bg-emerald-500/10 text-emerald-700" : "bg-red-500/10 text-red-700"}>
                    {account.status === 'active' ? 'Aktif' : 'Pasif'}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Hesap No:</span>
                    <span className="text-sm font-mono text-slate-800">{account.accountNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">Tip:</span>
                    <span className="text-sm text-slate-800">{account.accountType}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                    <span className="text-sm text-slate-600">Bakiye:</span>
                    <span className={`text-lg font-bold ${account.balance >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {formatCurrency(account.balance, account.currency)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Advanced Financial Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue & Cash Flow Analysis */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/40 shadow-xl shadow-slate-200/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-semibold text-slate-800">Gelir & Nakit Akışı Analizi</CardTitle>
                <p className="text-sm text-slate-600 mt-1">Aylık performans ve nakit akışı trendi</p>
              </div>
              <Badge className="bg-emerald-500/10 text-emerald-700 border-emerald-200">
                +24.8% Büyüme
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <ComposedChart data={monthlyFinancialData}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorCashFlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" tickFormatter={(value) => `₺${(value / 1000000).toFixed(1)}M`} />
                <Tooltip
                  formatter={(value: any, name: any) => [
                    `₺${value.toLocaleString()}`,
                    name === 'income' ? 'Gelir' : name === 'cashFlow' ? 'Nakit Akışı' : 'Bütçe'
                  ]}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="income"
                  stroke="#10b981"
                  strokeWidth={3}
                  fill="url(#colorIncome)"
                />
                <Area
                  type="monotone"
                  dataKey="cashFlow"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fill="url(#colorCashFlow)"
                />
                <Line
                  type="monotone"
                  dataKey="budget"
                  stroke="#d4af37"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Profit Margin & Forecast */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/40 shadow-xl shadow-slate-200/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-semibold text-slate-800">Kar Marjı & Tahmin</CardTitle>
                <p className="text-sm text-slate-600 mt-1">Karlılık analizi ve gelecek projeksiyonları</p>
              </div>
              <Badge className="bg-blue-500/10 text-blue-700 border-blue-200">
                %53.7 Ortalama Marj
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <ComposedChart data={monthlyFinancialData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" tickFormatter={(value) => `₺${(value / 1000000).toFixed(1)}M`} />
                <Tooltip
                  formatter={(value: any, name: any) => [
                    `₺${value.toLocaleString()}`,
                    name === 'profit' ? 'Net Kar' : name === 'forecast' ? 'Tahmin' : 'Gider'
                  ]}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px'
                  }}
                />
                <Bar dataKey="expense" fill="#ef4444" radius={[4, 4, 0, 0]} />
                <Line
                  type="monotone"
                  dataKey="profit"
                  stroke="#10b981"
                  strokeWidth={3}
                />
                <Line
                  type="monotone"
                  dataKey="forecast"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  strokeDasharray="8 4"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Budget Performance & Expense Analysis */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Budget vs Actual Performance */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/40 shadow-xl shadow-slate-200/20">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-slate-800">Bütçe Performansı</CardTitle>
            <p className="text-sm text-slate-600">Hedef vs gerçekleşen karşılaştırması</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {budgetComparison.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">{item.category}</span>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-semibold ${getVarianceColor(item.variance)}`}>
                        {item.variance > 0 ? '+' : ''}{item.variance.toFixed(1)}%
                      </span>
                      <Badge className={getStatusColor(item.status)}>
                        {item.status === 'good' ? 'İyi' : item.status === 'warning' ? 'Dikkat' : 'Risk'}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>Bütçe: ₺{item.budget.toLocaleString()}</span>
                      <span>Gerçek: ₺{item.actual.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          item.variance > 0 ? 'bg-emerald-500' : item.variance > -10 ? 'bg-amber-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${Math.min((item.actual / item.budget) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Expense Categories */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/40 shadow-xl shadow-slate-200/20">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-slate-800">Gider Kategorileri</CardTitle>
            <p className="text-sm text-slate-600">Detaylı maliyet dağılımı</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={expenseCategories}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ percentage }) => `%${percentage.toFixed(0)}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  strokeWidth={2}
                  stroke="#ffffff"
                >
                  {expenseCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: any, name: any, props: any) => [
                    `₺${value.toLocaleString()}`,
                    'Tutar'
                  ]}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {expenseCategories.map((category, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                    <span className="text-slate-700">{category.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-slate-800">₺{category.value.toLocaleString()}</span>
                    <div className="text-xs text-slate-500">
                      Bütçe: ₺{category.budget.toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tax & Compliance */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/40 shadow-xl shadow-slate-200/20">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-slate-800">Vergi & Uyumluluk</CardTitle>
            <p className="text-sm text-slate-600">Vergi yükümlülükleri ve son tarihler</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {taxBreakdown.map((tax, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">{tax.name}</span>
                    <div className="flex items-center gap-2">
                      <Badge className={tax.status === 'paid' ? 'bg-emerald-500/10 text-emerald-700' : 'bg-amber-500/10 text-amber-700'}>
                        {tax.status === 'paid' ? 'Ödendi' : 'Beklemede'}
                      </Badge>
                      {tax.status === 'paid' ? (
                        <CheckCircle className="h-4 w-4 text-emerald-600" />
                      ) : (
                        <Clock className="h-4 w-4 text-amber-600" />
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-slate-800">₺{tax.amount.toLocaleString()}</span>
                    <span className="text-xs text-slate-500">Son Tarih: {formatDate(tax.dueDate)}</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${tax.status === 'paid' ? 'bg-emerald-500' : 'bg-amber-500'}`}
                      style={{ width: `${tax.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-500">
                    %{tax.percentage.toFixed(1)} toplam vergi yükünden
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Transaction Management */}
      <Card className="bg-white/60 backdrop-blur-sm border-white/40 shadow-xl shadow-slate-200/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold text-slate-800">Son İşlemler</CardTitle>
              <p className="text-sm text-slate-600 mt-1">Detaylı finansal işlem geçmişi</p>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="İşlem ara..."
                  className="pl-10 w-64 bg-white/60 border-white/40 focus:bg-white/80"
                />
              </div>
              <Select value={transactionFilter} onValueChange={setTransactionFilter}>
                <SelectTrigger className="w-40 bg-white/60 border-white/40">
                  <SelectValue placeholder="Filtre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tümü</SelectItem>
                  <SelectItem value="income">Gelir</SelectItem>
                  <SelectItem value="expense">Gider</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="bg-white/60 border-white/40 hover:bg-white/80">
                <Plus className="h-4 w-4 mr-2" />
                Yeni İşlem
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-6 rounded-xl bg-gradient-to-r from-white/50 to-white/30 border border-white/40 hover:from-white/70 hover:to-white/50 transition-all duration-200 group"
              >
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center shadow-lg ${
                        transaction.type === "income"
                          ? "bg-gradient-to-br from-emerald-500 to-green-600"
                          : "bg-gradient-to-br from-red-500 to-pink-600"
                      }`}
                    >
                      {transaction.type === "income" ? (
                        <ArrowUpRight className="h-7 w-7 text-white" />
                      ) : (
                        <ArrowDownRight className="h-7 w-7 text-white" />
                      )}
                    </div>
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                      <span className="text-xs font-bold text-white">
                        {transaction.currency === 'USD' ? '$' : transaction.currency === 'EUR' ? '€' : '₺'}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-semibold text-slate-800 group-hover:text-amber-600 transition-colors">
                      {transaction.description}
                    </h4>
                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      <Badge variant="outline" className="bg-white/60 border-white/40">
                        {transaction.category}
                      </Badge>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(transaction.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <CreditCard className="h-3 w-3" />
                        {transaction.paymentMethod}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span>Ref: {transaction.reference}</span>
                      {transaction.customer && <span>Müşteri: {transaction.customer}</span>}
                      {transaction.supplier && <span>Tedarikçi: {transaction.supplier}</span>}
                    </div>
                  </div>
                </div>

                <div className="text-right space-y-2">
                  <div>
                    <p
                      className={`text-2xl font-bold ${
                        transaction.type === "income"
                          ? "text-emerald-600"
                          : "text-red-600"
                      }`}
                    >
                      {transaction.amount > 0 ? "+" : ""}
                      {formatCurrency(transaction.amount, transaction.currency)}
                    </p>
                    {transaction.taxAmount !== 0 && (
                      <p className="text-sm text-slate-500">
                        KDV: {formatCurrency(transaction.taxAmount, transaction.currency)}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge className="bg-emerald-500/10 text-emerald-700 border-emerald-200">
                      {transaction.status === 'completed' ? 'Tamamlandı' : 'Beklemede'}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-white/95 backdrop-blur-sm border-white/40">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          Detayları Görüntüle
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FileText className="h-4 w-4 mr-2" />
                          Fatura İndir
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Calculator className="h-4 w-4 mr-2" />
                          Muhasebe Kaydı
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-200">
            <p className="text-sm text-slate-600">
              Toplam {recentTransactions.length} işlem gösteriliyor
            </p>
            <Button variant="outline" className="bg-white/60 border-white/40 hover:bg-white/80">
              <Eye className="h-4 w-4 mr-2" />
              Tüm İşlemleri Görüntüle
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Financial Summary & KPIs */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Monthly Financial Summary */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/40 shadow-xl shadow-slate-200/20">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-slate-800">Aylık Finansal Özet</CardTitle>
            <p className="text-sm text-slate-600">Detaylı kar/zarar ve performans analizi</p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b bg-slate-50/50">
                  <tr>
                    <th className="text-left p-4 font-semibold text-slate-700">Ay</th>
                    <th className="text-right p-4 font-semibold text-slate-700">Gelir</th>
                    <th className="text-right p-4 font-semibold text-slate-700">Gider</th>
                    <th className="text-right p-4 font-semibold text-slate-700">Net Kar</th>
                    <th className="text-right p-4 font-semibold text-slate-700">Kar Marjı</th>
                    <th className="text-right p-4 font-semibold text-slate-700">Nakit Akışı</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyFinancialData.map((month) => {
                    const margin = ((month.profit / month.income) * 100).toFixed(1)
                    const cashFlowRatio = ((month.cashFlow / month.income) * 100).toFixed(1)
                    return (
                      <tr key={month.month} className="border-b hover:bg-slate-50/50 transition-colors">
                        <td className="p-4 font-medium text-slate-800">{month.month}</td>
                        <td className="p-4 text-right text-emerald-600 font-semibold">
                          ₺{month.income.toLocaleString()}
                        </td>
                        <td className="p-4 text-right text-red-600 font-semibold">
                          ₺{month.expense.toLocaleString()}
                        </td>
                        <td className="p-4 text-right font-bold text-slate-800">
                          ₺{month.profit.toLocaleString()}
                        </td>
                        <td className="p-4 text-right">
                          <Badge className="bg-emerald-500/10 text-emerald-700 border-emerald-200">
                            %{margin}
                          </Badge>
                        </td>
                        <td className="p-4 text-right">
                          <div className="text-right">
                            <p className="font-semibold text-blue-600">₺{month.cashFlow.toLocaleString()}</p>
                            <p className="text-xs text-slate-500">%{cashFlowRatio}</p>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Key Financial Ratios */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/40 shadow-xl shadow-slate-200/20">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-slate-800">Anahtar Finansal Oranlar</CardTitle>
            <p className="text-sm text-slate-600">Finansal sağlık göstergeleri</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Liquidity Ratios */}
              <div>
                <h4 className="font-semibold text-slate-800 mb-3">Likidite Oranları</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Cari Oran</span>
                    <div className="text-right">
                      <span className="text-lg font-bold text-emerald-600">2.75</span>
                      <p className="text-xs text-slate-500">İyi</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Asit-Test Oranı</span>
                    <div className="text-right">
                      <span className="text-lg font-bold text-emerald-600">1.85</span>
                      <p className="text-xs text-slate-500">Çok İyi</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profitability Ratios */}
              <div>
                <h4 className="font-semibold text-slate-800 mb-3">Karlılık Oranları</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Brüt Kar Marjı</span>
                    <div className="text-right">
                      <span className="text-lg font-bold text-blue-600">68.2%</span>
                      <p className="text-xs text-slate-500">Mükemmel</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Net Kar Marjı</span>
                    <div className="text-right">
                      <span className="text-lg font-bold text-blue-600">53.7%</span>
                      <p className="text-xs text-slate-500">Çok İyi</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">ROI (Yatırım Getirisi)</span>
                    <div className="text-right">
                      <span className="text-lg font-bold text-purple-600">24.8%</span>
                      <p className="text-xs text-slate-500">Yüksek</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Efficiency Ratios */}
              <div>
                <h4 className="font-semibold text-slate-800 mb-3">Verimlilik Oranları</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Varlık Devir Hızı</span>
                    <div className="text-right">
                      <span className="text-lg font-bold text-amber-600">1.42</span>
                      <p className="text-xs text-slate-500">İyi</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Alacak Devir Hızı</span>
                    <div className="text-right">
                      <span className="text-lg font-bold text-amber-600">8.5</span>
                      <p className="text-xs text-slate-500">Çok İyi</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Tools */}
      <Card className="bg-white/60 backdrop-blur-sm border-white/40 shadow-xl shadow-slate-200/20">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-slate-800">Hızlı Finansal İşlemler</CardTitle>
          <p className="text-sm text-slate-600">Sık kullanılan finansal araçlar ve raporlar</p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button
              variant="outline"
              className="h-auto py-6 bg-gradient-to-br from-white/60 to-white/40 border-white/40 hover:from-white/80 hover:to-white/60 shadow-lg hover:shadow-xl transition-all duration-200 group"
            >
              <div className="text-center w-full">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Calculator className="h-6 w-6 text-white" />
                </div>
                <div className="font-semibold text-slate-800">Bütçe Planlama</div>
                <div className="text-xs text-slate-600 mt-1">Gelecek dönem bütçesi</div>
              </div>
            </Button>

            <Button
              variant="outline"
              className="h-auto py-6 bg-gradient-to-br from-white/60 to-white/40 border-white/40 hover:from-white/80 hover:to-white/60 shadow-lg hover:shadow-xl transition-all duration-200 group"
            >
              <div className="text-center w-full">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <div className="font-semibold text-slate-800">Mali Tablolar</div>
                <div className="text-xs text-slate-600 mt-1">Bilanço ve gelir tablosu</div>
              </div>
            </Button>

            <Button
              variant="outline"
              className="h-auto py-6 bg-gradient-to-br from-white/60 to-white/40 border-white/40 hover:from-white/80 hover:to-white/60 shadow-lg hover:shadow-xl transition-all duration-200 group"
            >
              <div className="text-center w-full">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <div className="font-semibold text-slate-800">Finansal Analiz</div>
                <div className="text-xs text-slate-600 mt-1">Detaylı performans analizi</div>
              </div>
            </Button>

            <Button
              variant="outline"
              className="h-auto py-6 bg-gradient-to-br from-white/60 to-white/40 border-white/40 hover:from-white/80 hover:to-white/60 shadow-lg hover:shadow-xl transition-all duration-200 group"
            >
              <div className="text-center w-full">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div className="font-semibold text-slate-800">Risk Yönetimi</div>
                <div className="text-xs text-slate-600 mt-1">Finansal risk analizi</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
