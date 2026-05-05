"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
} from "lucide-react"

// Mock financial data
const stats = [
  {
    title: "Toplam Gelir",
    value: "₺324,500",
    change: "+18.2%",
    trend: "up",
    icon: ArrowUpRight,
    color: "text-green-600",
  },
  {
    title: "Toplam Gider",
    value: "₺156,200",
    change: "+12.5%",
    trend: "up",
    icon: ArrowDownRight,
    color: "text-red-600",
  },
  {
    title: "Net Kar",
    value: "₺168,300",
    change: "+24.8%",
    trend: "up",
    icon: TrendingUp,
    color: "text-green-600",
  },
  {
    title: "KDV Toplam",
    value: "₺58,410",
    change: "+15.3%",
    trend: "up",
    icon: DollarSign,
    color: "text-blue-600",
  },
]

const monthlyData = [
  { month: "Oca", income: 45000, expense: 22000, profit: 23000 },
  { month: "Şub", income: 52000, expense: 25000, profit: 27000 },
  { month: "Mar", income: 48000, expense: 23000, profit: 25000 },
  { month: "Nis", income: 61000, expense: 28000, profit: 33000 },
  { month: "May", income: 58000, expense: 26000, profit: 32000 },
  { month: "Haz", income: 60500, expense: 32200, profit: 28300 },
]

const expenseCategories = [
  { name: "Hammadde", value: 45000, color: "#d4af37" },
  { name: "Personel", value: 38000, color: "#8B4513" },
  { name: "Kira & Faturalar", value: 28000, color: "#000080" },
  { name: "Pazarlama", value: 22000, color: "#4B0082" },
  { name: "Kargo", value: 15200, color: "#808080" },
  { name: "Diğer", value: 8000, color: "#A9A9A9" },
]

const recentTransactions = [
  {
    id: "1",
    type: "income",
    description: "Sipariş #DK12345678",
    category: "Satış",
    amount: 598,
    date: "2026-05-05T10:30:00",
    status: "completed",
  },
  {
    id: "2",
    type: "expense",
    description: "Deri Hammadde Alımı",
    category: "Hammadde",
    amount: -2500,
    date: "2026-05-05T09:15:00",
    status: "completed",
  },
  {
    id: "3",
    type: "income",
    description: "Sipariş #DK12345677",
    category: "Satış",
    amount: 348,
    date: "2026-05-04T16:45:00",
    status: "completed",
  },
  {
    id: "4",
    type: "expense",
    description: "Elektrik Faturası",
    category: "Faturalar",
    amount: -850,
    date: "2026-05-04T14:20:00",
    status: "completed",
  },
  {
    id: "5",
    type: "expense",
    description: "Kargo Ödemesi - Aras",
    category: "Kargo",
    amount: -1200,
    date: "2026-05-03T11:30:00",
    status: "completed",
  },
  {
    id: "6",
    type: "income",
    description: "Sipariş #DK12345676",
    category: "Satış",
    amount: 249,
    date: "2026-05-03T10:15:00",
    status: "completed",
  },
]

const taxBreakdown = [
  { name: "KDV (18%)", amount: 45210, percentage: 77.4 },
  { name: "Stopaj", amount: 8900, percentage: 15.2 },
  { name: "Damga Vergisi", amount: 4300, percentage: 7.4 },
]

export default function AdminFinancePage() {
  const [dateRange, setDateRange] = React.useState("this-month")

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('tr-TR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold">Finans Yönetimi</h1>
          <p className="text-muted-foreground mt-1">
            Gelir, gider ve kar/zarar takibi
          </p>
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Bu Ay
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setDateRange("today")}>
                Bugün
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDateRange("this-week")}>
                Bu Hafta
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDateRange("this-month")}>
                Bu Ay
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDateRange("last-month")}>
                Geçen Ay
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDateRange("this-year")}>
                Bu Yıl
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Rapor İndir
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                {stat.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1 text-red-600" />
                )}
                <span className={stat.trend === "up" ? "text-green-600" : "text-red-600"}>
                  {stat.change}
                </span>
                <span className="ml-1">geçen aya göre</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Income vs Expense */}
        <Card>
          <CardHeader>
            <CardTitle>Gelir vs Gider</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="income" fill="#10b981" name="Gelir" />
                <Bar dataKey="expense" fill="#ef4444" name="Gider" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Profit Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Kar Trendi</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="profit"
                  stroke="#d4af37"
                  strokeWidth={2}
                  name="Kar"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Expense Categories & Tax Breakdown */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Expense Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Gider Kategorileri</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={expenseCategories}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {expenseCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Tax Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Vergi Dağılımı</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {taxBreakdown.map((tax) => (
                <div key={tax.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{tax.name}</span>
                    <span className="text-sm font-semibold">{tax.amount}₺</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-accent h-2 rounded-full"
                      style={{ width: `${tax.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    %{tax.percentage.toFixed(1)} toplam vergiden
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Son İşlemler</CardTitle>
            <Button variant="ghost" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filtrele
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/5 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === "income"
                        ? "bg-green-500/10"
                        : "bg-red-500/10"
                    }`}
                  >
                    {transaction.type === "income" ? (
                      <ArrowUpRight className="h-5 w-5 text-green-600" />
                    ) : (
                      <ArrowDownRight className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {transaction.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(transaction.date)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-semibold ${
                      transaction.type === "income"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.amount > 0 ? "+" : ""}
                    {transaction.amount}₺
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Monthly Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Aylık Özet</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="text-left p-4 font-semibold">Ay</th>
                  <th className="text-right p-4 font-semibold">Gelir</th>
                  <th className="text-right p-4 font-semibold">Gider</th>
                  <th className="text-right p-4 font-semibold">Kar</th>
                  <th className="text-right p-4 font-semibold">Kar Marjı</th>
                </tr>
              </thead>
              <tbody>
                {monthlyData.map((month) => {
                  const margin = ((month.profit / month.income) * 100).toFixed(1)
                  return (
                    <tr key={month.month} className="border-b hover:bg-muted/50 transition-colors">
                      <td className="p-4 font-medium">{month.month}</td>
                      <td className="p-4 text-right text-green-600 font-semibold">
                        +{month.income.toLocaleString()}₺
                      </td>
                      <td className="p-4 text-right text-red-600 font-semibold">
                        -{month.expense.toLocaleString()}₺
                      </td>
                      <td className="p-4 text-right font-semibold">
                        {month.profit.toLocaleString()}₺
                      </td>
                      <td className="p-4 text-right">
                        <Badge className="bg-green-500/10 text-green-700">
                          %{margin}
                        </Badge>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
