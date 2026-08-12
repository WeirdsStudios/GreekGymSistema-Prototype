import { useState } from "react";
import {
  FileText,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Download,
  Calendar,
  Building2,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Mock Financial Data
const incomeStatement = {
  revenue: {
    memberships: 485000,
    products: 128000,
    services: 85000,
    total: 698000,
  },
  expenses: {
    salaries: 245000,
    rent: 120000,
    utilities: 35000,
    equipment: 28000,
    marketing: 24000,
    total: 452000,
  },
  netIncome: 246000,
};

const branchProfitability = [
  {
    branch: "Sucursal Centro",
    revenue: 245000,
    expenses: 165000,
    profit: 80000,
    margin: 32.7,
    roi: 24.5,
  },
  {
    branch: "Sucursal Norte",
    revenue: 198000,
    expenses: 142000,
    profit: 56000,
    margin: 28.3,
    roi: 19.8,
  },
  {
    branch: "Sucursal Sur",
    revenue: 156000,
    expenses: 118000,
    profit: 38000,
    margin: 24.4,
    roi: 16.2,
  },
];

const cashFlowStatement = [
  { category: "Operaciones", amount: 246000, type: "inflow" },
  { category: "Inversiones", amount: -85000, type: "outflow" },
  { category: "Financiamiento", amount: 0, type: "neutral" },
  { category: "Flujo Neto", amount: 161000, type: "inflow" },
];

const customerMetrics = {
  ltv: 8450,
  cac: 385,
  ltvCacRatio: 21.9,
  paybackPeriod: 2.3,
  averageRetention: 18,
  churnRate: 2.8,
};

const monthlyTrends = [
  { month: "Ene", ltv: 8100, cac: 420 },
  { month: "Feb", ltv: 8200, cac: 410 },
  { month: "Mar", ltv: 8300, cac: 400 },
  { month: "Abr", ltv: 8350, cac: 390 },
  { month: "May", ltv: 8400, cac: 385 },
  { month: "Jun", ltv: 8450, cac: 385 },
];

interface MetricBoxProps {
  label: string;
  value: string;
  change?: number;
  icon: any;
  trend?: "up" | "down" | "neutral";
}

function MetricBox({ label, value, change, icon: Icon, trend }: MetricBoxProps) {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-xl p-5">
      <div className="flex items-start justify-between mb-3">
        <div className="p-2 bg-white/5 rounded-lg border border-white/10">
          <Icon className="w-5 h-5 text-gray-400" />
        </div>
        {change !== undefined && trend && (
          <div className={`flex items-center gap-1 text-xs font-semibold ${
            trend === "up" ? "text-emerald-400" : trend === "down" ? "text-rose-400" : "text-gray-400"
          }`}>
            {trend === "up" && <ArrowUpRight className="w-3 h-3" />}
            {trend === "down" && <ArrowDownRight className="w-3 h-3" />}
            {change}%
          </div>
        )}
      </div>
      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{label}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  );
}

export function FinancialReports() {
  const [selectedReport, setSelectedReport] = useState<"income" | "cash-flow" | "profitability" | "metrics">("income");

  return (
    <div className="min-h-screen bg-black text-white p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Reportes Financieros</h1>
          <p className="text-gray-500">Análisis detallado de desempeño financiero</p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="bg-white text-black hover:bg-gray-200 font-semibold">
            <Download className="w-4 h-4 mr-2" />
            Exportar PDF
          </Button>
          <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-900">
            <Calendar className="w-4 h-4 mr-2" />
            Jun 2024
          </Button>
        </div>
      </div>

      {/* Report Type Selector */}
      <div className="flex gap-2 bg-gray-900 border border-gray-700 rounded-lg p-1">
        <button
          onClick={() => setSelectedReport("income")}
          className={`flex-1 px-4 py-3 rounded-md text-sm font-semibold transition-all ${
            selectedReport === "income"
              ? "bg-white text-black"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Estado de Resultados
        </button>
        <button
          onClick={() => setSelectedReport("cash-flow")}
          className={`flex-1 px-4 py-3 rounded-md text-sm font-semibold transition-all ${
            selectedReport === "cash-flow"
              ? "bg-white text-black"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Flujo de Efectivo
        </button>
        <button
          onClick={() => setSelectedReport("profitability")}
          className={`flex-1 px-4 py-3 rounded-md text-sm font-semibold transition-all ${
            selectedReport === "profitability"
              ? "bg-white text-black"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Rentabilidad por Sucursal
        </button>
        <button
          onClick={() => setSelectedReport("metrics")}
          className={`flex-1 px-4 py-3 rounded-md text-sm font-semibold transition-all ${
            selectedReport === "metrics"
              ? "bg-white text-black"
              : "text-gray-400 hover:text-white"
          }`}
        >
          LTV & CAC
        </button>
      </div>

      {/* Income Statement */}
      {selectedReport === "income" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <MetricBox
              label="Ingresos Totales"
              value={`$${(incomeStatement.revenue.total / 1000).toFixed(0)}K`}
              change={8.2}
              icon={DollarSign}
              trend="up"
            />
            <MetricBox
              label="Gastos Totales"
              value={`$${(incomeStatement.expenses.total / 1000).toFixed(0)}K`}
              change={2.1}
              icon={TrendingDown}
              trend="down"
            />
            <MetricBox
              label="Utilidad Neta"
              value={`$${(incomeStatement.netIncome / 1000).toFixed(0)}K`}
              change={15.3}
              icon={TrendingUp}
              trend="up"
            />
            <MetricBox
              label="Margen Neto"
              value={`${((incomeStatement.netIncome / incomeStatement.revenue.total) * 100).toFixed(1)}%`}
              change={4.2}
              icon={TrendingUp}
              trend="up"
            />
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Estado de Resultados - Junio 2024</h2>
            <div className="space-y-6">
              {/* Revenue Section */}
              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Ingresos</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-2 border-b border-gray-800">
                    <span className="text-gray-300">Membresías</span>
                    <span className="text-white font-semibold">${incomeStatement.revenue.memberships.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-800">
                    <span className="text-gray-300">Productos</span>
                    <span className="text-white font-semibold">${incomeStatement.revenue.products.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-800">
                    <span className="text-gray-300">Servicios</span>
                    <span className="text-white font-semibold">${incomeStatement.revenue.services.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 bg-white/5 rounded-lg px-3 mt-2">
                    <span className="text-white font-bold">Total Ingresos</span>
                    <span className="text-white font-bold text-lg">${incomeStatement.revenue.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Expenses Section */}
              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Gastos Operativos</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-2 border-b border-gray-800">
                    <span className="text-gray-300">Nómina</span>
                    <span className="text-white font-semibold">${incomeStatement.expenses.salaries.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-800">
                    <span className="text-gray-300">Renta</span>
                    <span className="text-white font-semibold">${incomeStatement.expenses.rent.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-800">
                    <span className="text-gray-300">Servicios</span>
                    <span className="text-white font-semibold">${incomeStatement.expenses.utilities.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-800">
                    <span className="text-gray-300">Equipo</span>
                    <span className="text-white font-semibold">${incomeStatement.expenses.equipment.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-800">
                    <span className="text-gray-300">Marketing</span>
                    <span className="text-white font-semibold">${incomeStatement.expenses.marketing.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 bg-white/5 rounded-lg px-3 mt-2">
                    <span className="text-white font-bold">Total Gastos</span>
                    <span className="text-white font-bold text-lg">${incomeStatement.expenses.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Net Income */}
              <div className="pt-4 border-t-2 border-gray-700">
                <div className="flex justify-between items-center py-4 bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 rounded-lg px-4 border border-emerald-500/20">
                  <span className="text-emerald-400 font-bold text-lg">Utilidad Neta</span>
                  <span className="text-emerald-400 font-bold text-2xl">${incomeStatement.netIncome.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cash Flow */}
      {selectedReport === "cash-flow" && (
        <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Estado de Flujo de Efectivo</h2>
          <div className="space-y-4">
            {cashFlowStatement.map((item, index) => (
              <div
                key={index}
                className={`flex justify-between items-center py-4 px-4 rounded-lg ${
                  item.type === "inflow"
                    ? "bg-emerald-500/10 border border-emerald-500/20"
                    : item.type === "outflow"
                    ? "bg-rose-500/10 border border-rose-500/20"
                    : "bg-gray-800/50 border border-gray-700"
                }`}
              >
                <span className={`font-semibold ${
                  item.type === "inflow" ? "text-emerald-400" :
                  item.type === "outflow" ? "text-rose-400" : "text-white"
                }`}>
                  {item.category}
                </span>
                <span className={`font-bold text-xl ${
                  item.type === "inflow" ? "text-emerald-400" :
                  item.type === "outflow" ? "text-rose-400" : "text-white"
                }`}>
                  {item.amount >= 0 ? "+" : ""}${item.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Profitability by Branch */}
      {selectedReport === "profitability" && (
        <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Rentabilidad por Sucursal</h2>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-800 hover:bg-transparent">
                <TableHead className="text-gray-400">Sucursal</TableHead>
                <TableHead className="text-gray-400 text-right">Ingresos</TableHead>
                <TableHead className="text-gray-400 text-right">Gastos</TableHead>
                <TableHead className="text-gray-400 text-right">Utilidad</TableHead>
                <TableHead className="text-gray-400 text-right">Margen</TableHead>
                <TableHead className="text-gray-400 text-right">ROI</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {branchProfitability.map((branch) => (
                <TableRow key={branch.branch} className="border-gray-800 hover:bg-gray-900/50">
                  <TableCell className="font-semibold text-white">{branch.branch}</TableCell>
                  <TableCell className="text-right text-gray-300">${branch.revenue.toLocaleString()}</TableCell>
                  <TableCell className="text-right text-gray-300">${branch.expenses.toLocaleString()}</TableCell>
                  <TableCell className="text-right text-emerald-400 font-semibold">${branch.profit.toLocaleString()}</TableCell>
                  <TableCell className="text-right text-white font-semibold">{branch.margin}%</TableCell>
                  <TableCell className="text-right text-white font-semibold">{branch.roi}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* LTV & CAC Metrics */}
      {selectedReport === "metrics" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MetricBox
              label="Lifetime Value (LTV)"
              value={`$${customerMetrics.ltv.toLocaleString()}`}
              change={6.5}
              icon={TrendingUp}
              trend="up"
            />
            <MetricBox
              label="Costo de Adquisición (CAC)"
              value={`$${customerMetrics.cac.toLocaleString()}`}
              change={8.3}
              icon={TrendingDown}
              trend="down"
            />
            <MetricBox
              label="Ratio LTV:CAC"
              value={`${customerMetrics.ltvCacRatio.toFixed(1)}:1`}
              icon={DollarSign}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MetricBox
              label="Periodo de Recuperación"
              value={`${customerMetrics.paybackPeriod} meses`}
              icon={Calendar}
            />
            <MetricBox
              label="Retención Promedio"
              value={`${customerMetrics.averageRetention} meses`}
              change={12.4}
              icon={TrendingUp}
              trend="up"
            />
            <MetricBox
              label="Tasa de Cancelación"
              value={`${customerMetrics.churnRate}%`}
              change={15.2}
              icon={TrendingDown}
              trend="down"
            />
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Evolución LTV vs CAC</h2>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  stroke="#6b7280" 
                  tick={{ fill: "#9ca3af" }}
                  axisLine={{ stroke: "#374151" }}
                />
                <YAxis 
                  stroke="#6b7280" 
                  tick={{ fill: "#9ca3af" }}
                  axisLine={{ stroke: "#374151" }}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                  formatter={(value: any) => [`$${value}`, ""]}
                />
                <Legend wrapperStyle={{ color: "#9ca3af" }} />
                <Line
                  type="monotone"
                  dataKey="ltv"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ r: 5, fill: "#10b981" }}
                  name="LTV"
                />
                <Line
                  type="monotone"
                  dataKey="cac"
                  stroke="#ef4444"
                  strokeWidth={3}
                  dot={{ r: 5, fill: "#ef4444" }}
                  name="CAC"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
