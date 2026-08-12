import {
  Users,
  TrendingUp,
  Target,
  BarChart3,
  DollarSign,
  Calendar,
  ArrowUpRight,
  AlertCircle,
} from "lucide-react";
import {
  AreaChart,
  Area,
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

const memberGrowth = [
  { month: "Ene", total: 1085, new: 142, churned: 38 },
  { month: "Feb", total: 1134, new: 128, churned: 45 },
  { month: "Mar", total: 1189, new: 156, churned: 41 },
  { month: "Abr", total: 1215, new: 98, churned: 35 },
  { month: "May", total: 1247, new: 127, churned: 32 },
  { month: "Jun", total: 1282, new: 145, churned: 28 },
];

const revenueBySource = [
  { source: "Membresías Premium", amount: 285000, percentage: 40.8 },
  { source: "Membresías Estándar", amount: 200000, percentage: 28.7 },
  { source: "Productos", amount: 128000, percentage: 18.3 },
  { source: "Servicios Adicionales", amount: 85000, percentage: 12.2 },
];

const occupancyByHour = [
  { hour: "6AM", occupancy: 45 },
  { hour: "8AM", occupancy: 78 },
  { hour: "10AM", occupancy: 62 },
  { hour: "12PM", occupancy: 54 },
  { hour: "2PM", occupancy: 48 },
  { hour: "4PM", occupancy: 71 },
  { hour: "6PM", occupancy: 92 },
  { hour: "8PM", occupancy: 85 },
  { hour: "10PM", occupancy: 38 },
];

const performanceIndicators = [
  {
    metric: "Tasa de Conversión",
    current: "68%",
    target: "70%",
    status: "warning",
    change: "+2.3%",
  },
  {
    metric: "Asistencia Promedio",
    current: "4.2 días/sem",
    target: "4.0 días/sem",
    status: "success",
    change: "+5.0%",
  },
  {
    metric: "NPS Score",
    current: "72",
    target: "75",
    status: "warning",
    change: "+8.0%",
  },
  {
    metric: "Renovación Anual",
    current: "89%",
    target: "85%",
    status: "success",
    change: "+4.0%",
  },
];

export function AnalyticsDashboard() {
  return (
    <div className="min-h-screen bg-black text-white p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-1">Análisis y Métricas</h1>
        <p className="text-gray-500">Indicadores clave de rendimiento empresarial</p>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {performanceIndicators.map((item) => (
          <div
            key={item.metric}
            className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-xl p-5"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`p-2 rounded-lg border ${
                item.status === "success"
                  ? "bg-emerald-500/10 border-emerald-500/20"
                  : "bg-amber-500/10 border-amber-500/20"
              }`}>
                <Target className={`w-5 h-5 ${
                  item.status === "success" ? "text-emerald-400" : "text-amber-400"
                }`} />
              </div>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                item.status === "success"
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "bg-amber-500/10 text-amber-400"
              }`}>
                {item.change}
              </span>
            </div>
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{item.metric}</p>
            <div className="flex items-baseline gap-2 mb-2">
              <p className="text-2xl font-bold text-white">{item.current}</p>
              <span className="text-xs text-gray-500">de {item.target}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
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
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={memberGrowth}>
              <defs>
                <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ffffff" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
                </linearGradient>
              </defs>
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
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
              <Legend wrapperStyle={{ color: "#9ca3af" }} />
              <Area
                type="monotone"
                dataKey="total"
                stroke="#ffffff"
                strokeWidth={2}
                fill="url(#totalGradient)"
                name="Total Miembros"
              />
              <Line
                type="monotone"
                dataKey="new"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Nuevos"
              />
              <Line
                type="monotone"
                dataKey="churned"
                stroke="#ef4444"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Cancelaciones"
              />
            </AreaChart>
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
            {revenueBySource.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-300">{item.source}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500">{item.percentage}%</span>
                    <span className="text-sm font-bold text-white">
                      ${(item.amount / 1000).toFixed(0)}K
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-white to-gray-400 h-2 rounded-full transition-all"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-gray-700">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-400">Total Ingresos</span>
              <span className="text-2xl font-bold text-white">
                $698K
              </span>
            </div>
          </div>
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
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={occupancyByHour}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
              <XAxis 
                dataKey="hour" 
                stroke="#6b7280" 
                tick={{ fill: "#9ca3af" }}
                axisLine={{ stroke: "#374151" }}
              />
              <YAxis 
                stroke="#6b7280" 
                tick={{ fill: "#9ca3af" }}
                axisLine={{ stroke: "#374151" }}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                  color: "#fff",
                }}
                formatter={(value: any) => [`${value}%`, "Ocupación"]}
              />
              <Bar 
                dataKey="occupancy" 
                fill="#ffffff" 
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Critical Alerts */}
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
            <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-rose-500 mt-2" />
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-rose-400 mb-1">
                    Ocupación baja en Sucursal Sur
                  </h3>
                  <p className="text-xs text-gray-400">
                    Solo 72% de capacidad. Considerar campaña de marketing local.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-amber-500 mt-2" />
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-amber-400 mb-1">
                    Tasa de conversión por debajo de meta
                  </h3>
                  <p className="text-xs text-gray-400">
                    68% actual vs 70% objetivo. Revisar proceso de ventas.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2" />
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-emerald-400 mb-1">
                    Excelente retención en Centro
                  </h3>
                  <p className="text-xs text-gray-400">
                    97% de retención. Replicar estrategia en otras sucursales.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
