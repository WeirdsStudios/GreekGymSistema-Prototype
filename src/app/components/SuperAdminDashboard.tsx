import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Users,
  Calendar,
  DollarSign,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Building2,
  TrendingUp,
  Award,
  BarChart as BarChartIcon,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const branchPerformance = [
  { name: "Sucursal Centro", members: 547, revenue: 234500, growth: 12 },
  { name: "Sucursal Norte", members: 423, revenue: 189200, growth: 8 },
  { name: "Sucursal Sur", members: 277, revenue: 145800, growth: 15 },
];

const monthlyComparison = [
  { month: "Ene", centro: 210, norte: 180, sur: 140 },
  { month: "Feb", centro: 220, norte: 185, sur: 145 },
  { month: "Mar", centro: 225, norte: 190, sur: 148 },
  { month: "Abr", centro: 235, norte: 195, sur: 155 },
  { month: "May", centro: 240, norte: 198, sur: 160 },
  { month: "Jun", centro: 245, norte: 200, sur: 165 },
];

const revenueByBranch = [
  { name: "Centro", value: 234500, color: "#000000" },
  { name: "Norte", value: 189200, color: "#4b5563" },
  { name: "Sur", value: 145800, color: "#9ca3af" },
];

const StatCard = ({
  title,
  value,
  trend,
  trendLabel,
  icon: Icon,
  trendPositive,
}: any) => (
  <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-wide">
        {title}
      </CardTitle>
      <div className="p-2 bg-gray-50 rounded-lg">
        <Icon className="h-4 w-4 text-black" />
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-black">
        {value}
      </div>
      <p
        className={`text-xs font-medium flex items-center mt-1 ${trendPositive ? "text-emerald-600" : "text-rose-600"}`}
      >
        {trendPositive ? (
          <ArrowUpRight className="h-3 w-3 mr-1" />
        ) : (
          <ArrowDownRight className="h-3 w-3 mr-1" />
        )}
        {trend}
        <span className="text-gray-400 ml-1 font-normal">
          {trendLabel}
        </span>
      </p>
    </CardContent>
  </Card>
);

export function SuperAdminDashboard() {
  const totalMembers = branchPerformance.reduce((sum, b) => sum + b.members, 0);
  const totalRevenue = branchPerformance.reduce((sum, b) => sum + b.revenue, 0);
  const averageGrowth = branchPerformance.reduce((sum, b) => sum + b.growth, 0) / branchPerformance.length;

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-black">
            Panel Global de Control
          </h1>
          <p className="text-gray-600 mt-1">
            Vista consolidada de todas las sucursales Greek Gym
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">
            Última actualización: Hoy, 09:41 AM
          </span>
          <Badge
            variant="outline"
            className="bg-emerald-50 text-emerald-700 border-emerald-200 gap-1 px-3 py-1"
          >
            <Activity className="w-3 h-3" />
            Todas las sucursales operativas
          </Badge>
        </div>
      </div>

      {/* Global KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Sucursales"
          value="3"
          trend="100%"
          trendLabel="operativas"
          trendPositive={true}
          icon={Building2}
        />
        <StatCard
          title="Miembros Totales"
          value={totalMembers.toLocaleString()}
          trend="+12%"
          trendLabel="vs mes pasado"
          trendPositive={true}
          icon={Users}
        />
        <StatCard
          title="Ingresos Totales"
          value={`$${(totalRevenue / 1000).toFixed(0)}K`}
          trend="+18%"
          trendLabel="vs mes pasado"
          trendPositive={true}
          icon={DollarSign}
        />
        <StatCard
          title="Crecimiento Promedio"
          value={`${averageGrowth.toFixed(1)}%`}
          trend="+2.3%"
          trendLabel="mejora mensual"
          trendPositive={true}
          icon={TrendingUp}
        />
      </div>

      {/* Branch Performance Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Members Trend */}
        <Card className="border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-black">
              Comparativa de Miembros
            </CardTitle>
            <CardDescription>
              Evolución mensual por sucursal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={monthlyComparison}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#e5e7eb"
                  />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#6b7280", fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#6b7280", fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="centro"
                    stroke="#000000"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    name="Centro"
                  />
                  <Line
                    type="monotone"
                    dataKey="norte"
                    stroke="#4b5563"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    name="Norte"
                  />
                  <Line
                    type="monotone"
                    dataKey="sur"
                    stroke="#9ca3af"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    name="Sur"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Revenue Distribution */}
        <Card className="border-gray-200 shadow-sm flex flex-col">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-black">
              Distribución de Ingresos
            </CardTitle>
            <CardDescription>
              Por sucursal (último mes)
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-center">
            <div className="h-[220px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={revenueByBranch}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {revenueByBranch.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        strokeWidth={0}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                    formatter={(value: number) => `$${value.toLocaleString()}`}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <span className="block text-2xl font-bold text-black">
                    ${(totalRevenue / 1000).toFixed(0)}K
                  </span>
                  <span className="text-xs text-gray-500 uppercase tracking-wide">
                    Total
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-2 mt-4">
              {revenueByBranch.map((branch) => (
                <div
                  key={branch.name}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: branch.color }}
                    ></div>
                    <span className="text-gray-600">
                      {branch.name}
                    </span>
                  </div>
                  <span className="font-semibold text-black">
                    ${(branch.value / 1000).toFixed(0)}K
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Branch Performance Cards */}
      <div>
        <h2 className="text-xl font-bold text-black mb-4">Rendimiento por Sucursal</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {branchPerformance.map((branch, index) => (
            <Card key={branch.name} className="border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{branch.name}</CardTitle>
                      <Badge className="mt-1 bg-emerald-100 text-emerald-700 border-emerald-300">
                        Operativa
                      </Badge>
                    </div>
                  </div>
                  {index === 0 && (
                    <Award className="w-5 h-5 text-amber-500" />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                      Miembros
                    </p>
                    <p className="text-2xl font-bold text-black">{branch.members}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                      Ingresos
                    </p>
                    <p className="text-2xl font-bold text-black">
                      ${(branch.revenue / 1000).toFixed(0)}K
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Crecimiento</span>
                    <div className="flex items-center gap-1 text-emerald-600 font-semibold">
                      <TrendingUp className="w-4 h-4" />
                      <span>+{branch.growth}%</span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-4 border-gray-300 hover:bg-gray-100"
                >
                  Ver Detalles
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <Card className="border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-black">Acciones Rápidas</CardTitle>
          <CardDescription>
            Herramientas de gestión multi-sucursal
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="outline" className="h-20 flex flex-col gap-2 border-2 border-gray-200 hover:border-black">
              <Building2 className="w-6 h-6" />
              <span className="text-sm font-semibold">Gestionar Sucursales</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2 border-2 border-gray-200 hover:border-black">
              <Users className="w-6 h-6" />
              <span className="text-sm font-semibold">Administradores</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2 border-2 border-gray-200 hover:border-black">
              <BarChartIcon className="w-6 h-6" />
              <span className="text-sm font-semibold">Reportes Globales</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2 border-2 border-gray-200 hover:border-black">
              <DollarSign className="w-6 h-6" />
              <span className="text-sm font-semibold">Finanzas</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}