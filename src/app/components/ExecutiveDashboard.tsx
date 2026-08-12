import { useState } from "react";
import {
  TrendingUp, TrendingDown, DollarSign, Users, UserMinus,
  ShoppingCart, Activity, Building2, AlertTriangle,
  FileText, BarChart3, ArrowUpRight, ArrowDownRight, Target,
} from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

const revenueData = [
  { month: "Ene", revenue: 567000, expenses: 412000, profit: 155000 },
  { month: "Feb", revenue: 589000, expenses: 420000, profit: 169000 },
  { month: "Mar", revenue: 612000, expenses: 425000, profit: 187000 },
  { month: "Abr", revenue: 645000, expenses: 438000, profit: 207000 },
  { month: "May", revenue: 671000, expenses: 445000, profit: 226000 },
  { month: "Jun", revenue: 698000, expenses: 452000, profit: 246000 },
];

const branchComparison = [
  { name: "Centro", revenue: 245000, members: 547, occupancy: 87 },
  { name: "Norte", revenue: 198000, members: 423, occupancy: 78 },
  { name: "Sur", revenue: 156000, members: 277, occupancy: 72 },
];

const retentionData = [
  { month: "Ene", retained: 94, churned: 6 },
  { month: "Feb", retained: 93, churned: 7 },
  { month: "Mar", retained: 95, churned: 5 },
  { month: "Abr", retained: 96, churned: 4 },
  { month: "May", retained: 95, churned: 5 },
  { month: "Jun", retained: 97, churned: 3 },
];

const cashFlowData = [
  { week: "S1", inflow: 165000, outflow: 98000 },
  { week: "S2", inflow: 172000, outflow: 102000 },
  { week: "S3", inflow: 168000, outflow: 95000 },
  { week: "S4", inflow: 178000, outflow: 105000 },
];

const branchRevenueByPeriod = {
  hoy: [
    { name: "Sucursal Centro", revenue: 8450, txn: 18, change: 12, trend: "up" as const },
    { name: "Sucursal Norte", revenue: 6820, txn: 14, change: 8, trend: "up" as const },
    { name: "Sucursal Sur", revenue: 5230, txn: 11, change: -3, trend: "down" as const },
  ],
  semana: [
    { name: "Sucursal Centro", revenue: 58400, txn: 124, change: 9, trend: "up" as const },
    { name: "Sucursal Norte", revenue: 46800, txn: 98, change: 5, trend: "up" as const },
    { name: "Sucursal Sur", revenue: 35600, txn: 72, change: 2, trend: "up" as const },
  ],
  mes: [
    { name: "Sucursal Centro", revenue: 245000, txn: 547, change: 12, trend: "up" as const },
    { name: "Sucursal Norte", revenue: 198000, txn: 423, change: 8, trend: "up" as const },
    { name: "Sucursal Sur", revenue: 156000, txn: 277, change: 15, trend: "up" as const },
  ],
  trimestre: [
    { name: "Sucursal Centro", revenue: 714000, txn: 1580, change: 11, trend: "up" as const },
    { name: "Sucursal Norte", revenue: 568000, txn: 1240, change: 7, trend: "up" as const },
    { name: "Sucursal Sur", revenue: 445000, txn: 820, change: 14, trend: "up" as const },
  ],
};

interface MetricCardProps {
  title: string; value: string; change: number;
  changeLabel: string; icon: any; trend: "up" | "down";
}

function MetricCard({ title, value, change, changeLabel, icon: Icon, trend }: MetricCardProps) {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-xl p-6 shadow-2xl">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-white/5 rounded-lg border border-white/10">
          <Icon className="w-6 h-6 text-gray-300" />
        </div>
        <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
          trend === "up"
            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
            : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
        }`}>
          {trend === "up" ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
          {change}%
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-sm text-gray-400 uppercase tracking-wider font-medium">{title}</p>
        <p className="text-3xl font-bold text-white">{value}</p>
        <p className="text-xs text-gray-500">{changeLabel}</p>
      </div>
    </div>
  );
}

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest whitespace-nowrap">
        {label}
      </span>
      <div className="flex-1 h-px bg-gray-800" />
    </div>
  );
}

export function ExecutiveDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("6M");
  const [branchPeriod, setBranchPeriod] = useState<"hoy" | "semana" | "mes" | "trimestre">("hoy");

  const totalRevenue = revenueData[revenueData.length - 1].revenue;
  const totalProfit = revenueData[revenueData.length - 1].profit;

  return (
    <div className="min-h-screen bg-black text-white p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Panel Ejecutivo</h1>
          <p className="text-gray-500">Vista consolidada de rendimiento empresarial</p>
        </div>
        <div className="flex items-center gap-2 bg-gray-900 border border-gray-700 rounded-lg p-1">
          {["1M", "3M", "6M", "1A"].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
                selectedPeriod === period ? "bg-white text-black" : "text-gray-400 hover:text-white"
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* KPIs Segmentados */}
      <div className="space-y-6">
        {/* Grupo 1: Rendimiento Financiero */}
        <div>
          <SectionDivider label="Rendimiento Financiero" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MetricCard title="Ingresos Totales" value={`$${(totalRevenue / 1000).toFixed(0)}K`}
              change={8.2} changeLabel="vs mes anterior" icon={DollarSign} trend="up" />
            <MetricCard title="Margen de Utilidad" value={`${((totalProfit / totalRevenue) * 100).toFixed(1)}%`}
              change={3.5} changeLabel="optimización" icon={TrendingUp} trend="up" />
          </div>
        </div>

        {/* Grupo 2: Captación y Retención */}
        <div>
          <SectionDivider label="Captación y Retención de Socios" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MetricCard title="Nuevos Socios" value="127" change={12.4}
              changeLabel="este mes" icon={Users} trend="up" />
            <MetricCard title="Tasa de Cancelación" value="2.8%" change={0.9}
              changeLabel="reducción" icon={UserMinus} trend="down" />
          </div>
        </div>

        {/* Grupo 3: Operaciones */}
        <div>
          <SectionDivider label="Operaciones" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MetricCard title="Ticket Promedio" value="$1,847" change={5.2}
              changeLabel="incremento" icon={ShoppingCart} trend="up" />
            <MetricCard title="Ocupación Global" value="79%" change={4.1}
              changeLabel="capacidad" icon={Activity} trend="up" />
          </div>
        </div>
      </div>

      {/* Ingresos por Sucursal */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-white">Ingresos por Sucursal</h2>
            <p className="text-sm text-gray-500">Comparativa financiera por unidad de negocio</p>
          </div>
          <div className="flex items-center gap-1 bg-gray-900 border border-gray-700 rounded-lg p-1">
            {(["hoy", "semana", "mes", "trimestre"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setBranchPeriod(p)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  branchPeriod === p ? "bg-white text-black" : "text-gray-400 hover:text-white"
                }`}
              >
                {p === "hoy" ? "Hoy" : p === "semana" ? "Semana" : p === "mes" ? "Mes" : "Trimestre"}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {branchRevenueByPeriod[branchPeriod].map((branch) => {
            const maxRev = branchRevenueByPeriod[branchPeriod][0].revenue;
            const pct = Math.round((branch.revenue / maxRev) * 100);
            return (
              <div key={branch.name} className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                      <Building2 className="w-4 h-4 text-gray-300" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white leading-tight">{branch.name}</p>
                      <p className="text-xs text-gray-500">{branch.txn} transacciones</p>
                    </div>
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                    branch.trend === "up"
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                  }`}>
                    {branch.trend === "up" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {Math.abs(branch.change)}%
                  </div>
                </div>
                <p className="text-3xl font-bold text-white mb-3">${branch.revenue.toLocaleString()}</p>
                <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                </div>
                <p className="text-xs text-gray-600 mt-1">{pct}% del ingreso consolidado</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Gráficas (sin cambios) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-xl p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-white mb-1">Desempeño Financiero</h2>
              <p className="text-sm text-gray-500">Ingresos, gastos y utilidad neta</p>
            </div>
            <div className="p-2 bg-white/5 rounded-lg border border-white/10">
              <BarChart3 className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ffffff" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="profG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
              <XAxis dataKey="month" stroke="#6b7280" tick={{ fill: "#9ca3af" }} axisLine={{ stroke: "#374151" }} />
              <YAxis stroke="#6b7280" tick={{ fill: "#9ca3af" }} axisLine={{ stroke: "#374151" }} tickFormatter={(v) => `$${v / 1000}K`} />
              <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px", color: "#fff" }} formatter={(v: any) => [`$${v.toLocaleString()}`, ""]} />
              <Legend wrapperStyle={{ color: "#9ca3af" }} formatter={(v) => v === "revenue" ? "Ingresos" : "Utilidad"} />
              <Area type="monotone" dataKey="revenue" stroke="#ffffff" strokeWidth={2} fill="url(#revG)" />
              <Area type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={2} fill="url(#profG)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-xl p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-white mb-1">Comparativa de Sucursales</h2>
              <p className="text-sm text-gray-500">Ingresos y miembros activos</p>
            </div>
            <div className="p-2 bg-white/5 rounded-lg border border-white/10">
              <Building2 className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={branchComparison}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
              <XAxis dataKey="name" stroke="#6b7280" tick={{ fill: "#9ca3af" }} axisLine={{ stroke: "#374151" }} />
              <YAxis yAxisId="left" stroke="#6b7280" tick={{ fill: "#9ca3af" }} axisLine={{ stroke: "#374151" }} tickFormatter={(v) => `$${v / 1000}K`} />
              <YAxis yAxisId="right" orientation="right" stroke="#6b7280" tick={{ fill: "#9ca3af" }} axisLine={{ stroke: "#374151" }} />
              <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px", color: "#fff" }} />
              <Legend wrapperStyle={{ color: "#9ca3af" }} formatter={(v) => v === "revenue" ? "Ingresos" : "Miembros"} />
              <Bar yAxisId="left" dataKey="revenue" fill="#ffffff" radius={[8, 8, 0, 0]} />
              <Bar yAxisId="right" dataKey="members" fill="#9ca3af" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-xl p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-white mb-1">Retención de Clientes</h2>
              <p className="text-sm text-gray-500">Tasa mensual de permanencia</p>
            </div>
            <div className="p-2 bg-white/5 rounded-lg border border-white/10">
              <Target className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={retentionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
              <XAxis dataKey="month" stroke="#6b7280" tick={{ fill: "#9ca3af" }} axisLine={{ stroke: "#374151" }} />
              <YAxis stroke="#6b7280" tick={{ fill: "#9ca3af" }} axisLine={{ stroke: "#374151" }} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
              <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px", color: "#fff" }} formatter={(v: any) => [`${v}%`, ""]} />
              <Legend wrapperStyle={{ color: "#9ca3af" }} formatter={(v) => v === "retained" ? "Retenidos" : "Cancelados"} />
              <Line type="monotone" dataKey="retained" stroke="#10b981" strokeWidth={3} dot={{ r: 5, fill: "#10b981" }} />
              <Line type="monotone" dataKey="churned" stroke="#ef4444" strokeWidth={3} dot={{ r: 5, fill: "#ef4444" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-xl p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-white mb-1">Flujo de Caja</h2>
              <p className="text-sm text-gray-500">Entradas y salidas semanales</p>
            </div>
            <div className="p-2 bg-white/5 rounded-lg border border-white/10">
              <Activity className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={cashFlowData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
              <XAxis dataKey="week" stroke="#6b7280" tick={{ fill: "#9ca3af" }} axisLine={{ stroke: "#374151" }} />
              <YAxis stroke="#6b7280" tick={{ fill: "#9ca3af" }} axisLine={{ stroke: "#374151" }} tickFormatter={(v) => `$${v / 1000}K`} />
              <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px", color: "#fff" }} formatter={(v: any) => [`$${v.toLocaleString()}`, ""]} />
              <Legend wrapperStyle={{ color: "#9ca3af" }} formatter={(v) => v === "inflow" ? "Entradas" : "Salidas"} />
              <Bar dataKey="inflow" fill="#10b981" radius={[8, 8, 0, 0]} />
              <Bar dataKey="outflow" fill="#ef4444" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}