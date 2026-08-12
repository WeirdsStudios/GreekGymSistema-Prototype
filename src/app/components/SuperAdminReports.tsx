import { useState } from "react";
import {
  FileText, DollarSign, TrendingUp, TrendingDown, Download,
  Calendar, Building2, ArrowUpRight, ArrowDownRight,
  Users, BarChart3, Target, AlertCircle,
} from "lucide-react";
import { Button } from "./ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

// ── Data ──────────────────────────────────────────────────────────────
const incomeStatement = {
  revenue: { memberships: 485000, products: 128000, services: 85000, total: 698000 },
  expenses: { salaries: 245000, rent: 120000, utilities: 35000, equipment: 28000, marketing: 24000, total: 452000 },
  netIncome: 246000,
};

const branchProfitability = [
  { branch: "Sucursal Centro", revenue: 245000, expenses: 165000, profit: 80000, margin: 32.7, roi: 24.5 },
  { branch: "Sucursal Norte",  revenue: 198000, expenses: 142000, profit: 56000, margin: 28.3, roi: 19.8 },
  { branch: "Sucursal Sur",    revenue: 156000, expenses: 118000, profit: 38000, margin: 24.4, roi: 16.2 },
];

const cashFlowStatement = [
  { category: "Operaciones",   amount: 246000,  type: "inflow"  },
  { category: "Inversiones",   amount: -85000,  type: "outflow" },
  { category: "Financiamiento",amount: 0,       type: "neutral" },
  { category: "Flujo Neto",    amount: 161000,  type: "inflow"  },
];

const customerMetrics = { ltv: 8450, cac: 385, ltvCacRatio: 21.9, paybackPeriod: 2.3, averageRetention: 18, churnRate: 2.8 };

const monthlyTrends = [
  { month: "Ene", ltv: 8100, cac: 420 }, { month: "Feb", ltv: 8200, cac: 410 },
  { month: "Mar", ltv: 8300, cac: 400 }, { month: "Abr", ltv: 8350, cac: 390 },
  { month: "May", ltv: 8400, cac: 385 }, { month: "Jun", ltv: 8450, cac: 385 },
];

const memberGrowth = [
  { month: "Ene", total: 1085, new: 142, churned: 38 },
  { month: "Feb", total: 1134, new: 128, churned: 45 },
  { month: "Mar", total: 1189, new: 156, churned: 41 },
  { month: "Abr", total: 1215, new: 98,  churned: 35 },
  { month: "May", total: 1247, new: 127, churned: 32 },
  { month: "Jun", total: 1282, new: 145, churned: 28 },
];

const revenueBySource = [
  { source: "Membresías Premium",  amount: 285000, percentage: 40.8 },
  { source: "Membresías Estándar", amount: 200000, percentage: 28.7 },
  { source: "Productos",           amount: 128000, percentage: 18.3 },
  { source: "Servicios Adicionales",amount: 85000, percentage: 12.2 },
];

const occupancyByHour = [
  { hour: "6AM", occupancy: 45 }, { hour: "8AM", occupancy: 78 },
  { hour: "10AM", occupancy: 62 }, { hour: "12PM", occupancy: 54 },
  { hour: "2PM", occupancy: 48 }, { hour: "4PM", occupancy: 71 },
  { hour: "6PM", occupancy: 92 }, { hour: "8PM", occupancy: 85 },
  { hour: "10PM", occupancy: 38 },
];

const kpiIndicators = [
  { metric: "Tasa de Conversión", current: "68%", target: "70%", status: "warning", change: "+2.3%" },
  { metric: "Asistencia Promedio", current: "4.2 días/sem", target: "4.0 días/sem", status: "success", change: "+5.0%" },
  { metric: "NPS Score", current: "72", target: "75", status: "warning", change: "+8.0%" },
  { metric: "Renovación Anual", current: "89%", target: "85%", status: "success", change: "+4.0%" },
];

// ── Sub-components ──────────────────────────────────────────────────
function MetricBox({ label, value, change, icon: Icon, trend }: any) {
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

const TABS = [
  { id: "income",          label: "Estado de Resultados" },
  { id: "cash-flow",       label: "Flujo de Efectivo" },
  { id: "profitability",   label: "Rentabilidad" },
  { id: "ltv-cac",         label: "LTV & CAC" },
  { id: "operative",       label: "Métricas Operativas" },
];

// ── Main component ──────────────────────────────────────────────────
export function SuperAdminReports() {
  const [activeTab, setActiveTab] = useState("income");

  return (
    <div className="min-h-screen bg-black text-white p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Reportes</h1>
          <p className="text-gray-500">Análisis financiero y operativo consolidado</p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="bg-white text-black hover:bg-gray-200 font-semibold">
            <Download className="w-4 h-4 mr-2" /> Exportar PDF
          </Button>
          <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-900">
            <Calendar className="w-4 h-4 mr-2" /> Jun 2024
          </Button>
        </div>
      </div>

      {/* Tab Selector */}
      <div className="flex gap-1 bg-gray-900 border border-gray-700 rounded-lg p-1 overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-4 py-2.5 rounded-md text-sm font-semibold whitespace-nowrap transition-all ${
              activeTab === tab.id ? "bg-white text-black" : "text-gray-400 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Tab: Estado de Resultados ── */}
      {activeTab === "income" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <MetricBox label="Ingresos Totales" value={`$${(incomeStatement.revenue.total / 1000).toFixed(0)}K`} change={8.2} icon={DollarSign} trend="up" />
            <MetricBox label="Gastos Totales"   value={`$${(incomeStatement.expenses.total / 1000).toFixed(0)}K`} change={2.1} icon={TrendingDown} trend="down" />
            <MetricBox label="Utilidad Neta"    value={`$${(incomeStatement.netIncome / 1000).toFixed(0)}K`} change={15.3} icon={TrendingUp} trend="up" />
            <MetricBox label="Margen Neto"      value={`${((incomeStatement.netIncome / incomeStatement.revenue.total) * 100).toFixed(1)}%`} change={4.2} icon={TrendingUp} trend="up" />
          </div>
          <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Estado de Resultados — Junio 2024</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Ingresos</h3>
                {[
                  ["Membresías", incomeStatement.revenue.memberships],
                  ["Productos",  incomeStatement.revenue.products],
                  ["Servicios",  incomeStatement.revenue.services],
                ].map(([label, val]) => (
                  <div key={label as string} className="flex justify-between items-center py-2 border-b border-gray-800">
                    <span className="text-gray-300">{label}</span>
                    <span className="text-white font-semibold">${(val as number).toLocaleString()}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center py-3 bg-white/5 rounded-lg px-3 mt-2">
                  <span className="text-white font-bold">Total Ingresos</span>
                  <span className="text-white font-bold text-lg">${incomeStatement.revenue.total.toLocaleString()}</span>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Gastos Operativos</h3>
                {[
                  ["Nómina",    incomeStatement.expenses.salaries],
                  ["Renta",     incomeStatement.expenses.rent],
                  ["Servicios", incomeStatement.expenses.utilities],
                  ["Equipo",    incomeStatement.expenses.equipment],
                  ["Marketing", incomeStatement.expenses.marketing],
                ].map(([label, val]) => (
                  <div key={label as string} className="flex justify-between items-center py-2 border-b border-gray-800">
                    <span className="text-gray-300">{label}</span>
                    <span className="text-white font-semibold">${(val as number).toLocaleString()}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center py-3 bg-white/5 rounded-lg px-3 mt-2">
                  <span className="text-white font-bold">Total Gastos</span>
                  <span className="text-white font-bold text-lg">${incomeStatement.expenses.total.toLocaleString()}</span>
                </div>
              </div>
              <div className="pt-4 border-t-2 border-gray-700">
                <div className="flex justify-between items-center py-4 bg-emerald-500/10 rounded-lg px-4 border border-emerald-500/20">
                  <span className="text-emerald-400 font-bold text-lg">Utilidad Neta</span>
                  <span className="text-emerald-400 font-bold text-2xl">${incomeStatement.netIncome.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Tab: Flujo de Efectivo ── */}
      {activeTab === "cash-flow" && (
        <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Estado de Flujo de Efectivo</h2>
          <div className="space-y-4">
            {cashFlowStatement.map((item, i) => (
              <div key={i} className={`flex justify-between items-center py-4 px-4 rounded-lg ${
                item.type === "inflow" ? "bg-emerald-500/10 border border-emerald-500/20"
                : item.type === "outflow" ? "bg-rose-500/10 border border-rose-500/20"
                : "bg-gray-800/50 border border-gray-700"
              }`}>
                <span className={`font-semibold ${item.type === "inflow" ? "text-emerald-400" : item.type === "outflow" ? "text-rose-400" : "text-white"}`}>
                  {item.category}
                </span>
                <span className={`font-bold text-xl ${item.type === "inflow" ? "text-emerald-400" : item.type === "outflow" ? "text-rose-400" : "text-white"}`}>
                  {item.amount >= 0 ? "+" : ""}${item.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Tab: Rentabilidad ── */}
      {activeTab === "profitability" && (
        <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Rentabilidad por Sucursal</h2>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-800 hover:bg-transparent">
                {["Sucursal","Ingresos","Gastos","Utilidad","Margen","ROI"].map(h => (
                  <TableHead key={h} className="text-gray-400">{h}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {branchProfitability.map((b) => (
                <TableRow key={b.branch} className="border-gray-800 hover:bg-gray-900/50">
                  <TableCell className="font-semibold text-white">{b.branch}</TableCell>
                  <TableCell className="text-gray-300">${b.revenue.toLocaleString()}</TableCell>
                  <TableCell className="text-gray-300">${b.expenses.toLocaleString()}</TableCell>
                  <TableCell className="text-emerald-400 font-semibold">${b.profit.toLocaleString()}</TableCell>
                  <TableCell className="text-white font-semibold">{b.margin}%</TableCell>
                  <TableCell className="text-white font-semibold">{b.roi}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* ── Tab: LTV & CAC ── */}
      {activeTab === "ltv-cac" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MetricBox label="Lifetime Value (LTV)"    value={`$${customerMetrics.ltv.toLocaleString()}`}    change={6.5}  icon={TrendingUp}  trend="up"   />
            <MetricBox label="Costo de Adquisición"    value={`$${customerMetrics.cac.toLocaleString()}`}    change={8.3}  icon={TrendingDown} trend="down" />
            <MetricBox label="Ratio LTV:CAC"           value={`${customerMetrics.ltvCacRatio.toFixed(1)}:1`} icon={DollarSign} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MetricBox label="Periodo de Recuperación" value={`${customerMetrics.paybackPeriod} meses`}      icon={Calendar} />
            <MetricBox label="Retención Promedio"      value={`${customerMetrics.averageRetention} meses`}   change={12.4} icon={TrendingUp}  trend="up"   />
            <MetricBox label="Tasa de Cancelación"     value={`${customerMetrics.churnRate}%`}               change={15.2} icon={TrendingDown} trend="down" />
          </div>
          <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Evolución LTV vs CAC</h2>
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                <XAxis dataKey="month" stroke="#6b7280" tick={{ fill: "#9ca3af" }} axisLine={{ stroke: "#374151" }} />
                <YAxis stroke="#6b7280" tick={{ fill: "#9ca3af" }} axisLine={{ stroke: "#374151" }} tickFormatter={(v) => `$${v}`} />
                <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px", color: "#fff" }} formatter={(v: any) => [`$${v}`, ""]} />
                <Legend wrapperStyle={{ color: "#9ca3af" }} />
                <Line type="monotone" dataKey="ltv" stroke="#10b981" strokeWidth={3} dot={{ r: 5, fill: "#10b981" }} name="LTV" />
                <Line type="monotone" dataKey="cac" stroke="#ef4444" strokeWidth={3} dot={{ r: 5, fill: "#ef4444" }} name="CAC" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* ── Tab: Métricas Operativas ── */}
      {activeTab === "operative" && (
        <div className="space-y-6">
          {/* KPI Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpiIndicators.map((item) => (
              <div key={item.metric} className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-xl p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-2 rounded-lg border ${item.status === "success" ? "bg-emerald-500/10 border-emerald-500/20" : "bg-amber-500/10 border-amber-500/20"}`}>
                    <Target className={`w-5 h-5 ${item.status === "success" ? "text-emerald-400" : "text-amber-400"}`} />
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${item.status === "success" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"}`}>
                    {item.change}
                  </span>
                </div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{item.metric}</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold text-white">{item.current}</p>
                  <span className="text-xs text-gray-500">de {item.target}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Member Growth */}
            <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold text-white mb-1">Crecimiento de Membresía</h2>
                  <p className="text-sm text-gray-500">Nuevos vs Cancelaciones</p>
                </div>
                <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                  <Users className="w-5 h-5 text-gray-400" />
                </div>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={memberGrowth}>
                  <defs>
                    <linearGradient id="totG" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ffffff" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                  <XAxis dataKey="month" stroke="#6b7280" tick={{ fill: "#9ca3af" }} axisLine={{ stroke: "#374151" }} />
                  <YAxis stroke="#6b7280" tick={{ fill: "#9ca3af" }} axisLine={{ stroke: "#374151" }} />
                  <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px", color: "#fff" }} />
                  <Legend wrapperStyle={{ color: "#9ca3af" }} />
                  <Area type="monotone" dataKey="total" stroke="#ffffff" strokeWidth={2} fill="url(#totG)" name="Total Miembros" />
                  <Line type="monotone" dataKey="new" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} name="Nuevos" />
                  <Line type="monotone" dataKey="churned" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} name="Cancelaciones" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Occupancy by Hour */}
            <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold text-white mb-1">Ocupación por Horario</h2>
                  <p className="text-sm text-gray-500">Afluencia durante el día</p>
                </div>
                <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                  <BarChart3 className="w-5 h-5 text-gray-400" />
                </div>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={occupancyByHour}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                  <XAxis dataKey="hour" stroke="#6b7280" tick={{ fill: "#9ca3af" }} axisLine={{ stroke: "#374151" }} />
                  <YAxis stroke="#6b7280" tick={{ fill: "#9ca3af" }} axisLine={{ stroke: "#374151" }} tickFormatter={(v) => `${v}%`} />
                  <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px", color: "#fff" }} formatter={(v: any) => [`${v}%`, "Ocupación"]} />
                  <Bar dataKey="occupancy" fill="#ffffff" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Revenue by Source */}
            <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold text-white mb-1">Ingresos por Fuente</h2>
                  <p className="text-sm text-gray-500">Distribución de revenue streams</p>
                </div>
                <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                  <DollarSign className="w-5 h-5 text-gray-400" />
                </div>
              </div>
              <div className="space-y-4">
                {revenueBySource.map((item, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-300">{item.source}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-500">{item.percentage}%</span>
                        <span className="text-sm font-bold text-white">${(item.amount / 1000).toFixed(0)}K</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div className="bg-gradient-to-r from-white to-gray-400 h-2 rounded-full" style={{ width: `${item.percentage}%` }} />
                    </div>
                  </div>
                ))}
                <div className="pt-4 border-t border-gray-700 flex justify-between">
                  <span className="text-sm text-gray-400 font-semibold">Total Ingresos</span>
                  <span className="text-2xl font-bold text-white">$698K</span>
                </div>
              </div>
            </div>

            {/* Alertas */}
            <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold text-white mb-1">Alertas y Acciones</h2>
                  <p className="text-sm text-gray-500">Requieren atención inmediata</p>
                </div>
                <div className="p-2 bg-rose-500/10 rounded-lg border border-rose-500/20">
                  <AlertCircle className="w-5 h-5 text-rose-400" />
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { color: "rose", title: "Ocupación baja en Sucursal Sur", desc: "Solo 72% de capacidad. Considerar campaña de marketing local." },
                  { color: "amber", title: "Conversión por debajo de meta", desc: "68% actual vs 70% objetivo. Revisar proceso de ventas." },
                  { color: "emerald", title: "Excelente retención en Centro", desc: "97% de retención. Replicar estrategia en otras sucursales." },
                ].map((a, i) => (
                  <div key={i} className={`p-4 bg-${a.color}-500/10 border border-${a.color}-500/20 rounded-lg`}>
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full bg-${a.color}-500 mt-2`} />
                      <div>
                        <h3 className={`text-sm font-semibold text-${a.color}-400 mb-1`}>{a.title}</h3>
                        <p className="text-xs text-gray-400">{a.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}