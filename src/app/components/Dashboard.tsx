import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Users,
  Calendar,
  DollarSign,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
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
} from "recharts";

const monthlyRevenue = [
  { month: "Ene", revenue: 45000 },
  { month: "Feb", revenue: 52000 },
  { month: "Mar", revenue: 48000 },
  { month: "Abr", revenue: 61000 },
  { month: "May", revenue: 55000 },
  { month: "Jun", revenue: 67000 },
];

const membershipTypes = [
  { name: "Premium", value: 350, color: "#000000" }, // Black
  { name: "Estándar", value: 550, color: "#4b5563" }, // Gray 600
  { name: "Estudiante", value: 200, color: "#9ca3af" }, // Gray 400
  { name: "Corporativo", value: 147, color: "#d1d5db" }, // Gray 300
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

export function Dashboard() {
  return (
    <div className="p-6 space-y-8 max-w-[1200px] mx-auto bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-black">
            Panel Principal
          </h1>
          <p className="text-gray-600 mt-1">
            Bienvenido al sistema de gestión de Greek Gym.
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
            Sistema Operativo
          </Badge>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Miembros Totales"
          value="1,247"
          trend="+12%"
          trendLabel="vs mes pasado"
          trendPositive={true}
          icon={Users}
        />
        <StatCard
          title="Activos Hoy"
          value="189"
          trend="+5%"
          trendLabel="vs ayer"
          trendPositive={true}
          icon={Activity}
        />
        <StatCard
          title="Ingresos Mensuales"
          value="$67,000"
          trend="+22%"
          trendLabel="vs mes pasado"
          trendPositive={true}
          icon={DollarSign}
        />
        <StatCard
          title="Clases Hoy"
          value="24"
          trend="8 restantes"
          trendLabel="sesiones"
          trendPositive={true} // Neutral really
          icon={Calendar}
        />
      </div>

      {/* Main Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart - Takes up 2 columns */}
        <Card className="lg:col-span-2 border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-black">
              Ingresos Mensuales
            </CardTitle>
            <CardDescription>
              Rendimiento financiero del último semestre
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyRevenue}
                  margin={{
                    top: 20,
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
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#6b7280", fontSize: 12 }}
                    tickFormatter={(value) =>
                      `$${value / 1000}k`
                    }
                  />
                  <Tooltip
                    cursor={{ fill: "#f9fafb" }}
                    contentStyle={{
                      borderRadius: "8px",
                      border: "none",
                      boxShadow:
                        "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Bar
                    dataKey="revenue"
                    fill="#000000"
                    radius={[4, 4, 0, 0]}
                    barSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Membership Distribution - Takes up 1 column */}
        <Card className="border-gray-200 shadow-sm flex flex-col">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-black">
              Distribución
            </CardTitle>
            <CardDescription>
              Por tipo de membresía activa
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-center">
            <div className="h-[250px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={membershipTypes}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {membershipTypes.map((entry, index) => (
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
                      boxShadow:
                        "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <span className="block text-3xl font-bold text-black">
                    1,247
                  </span>
                  <span className="text-xs text-gray-500 uppercase tracking-wide">
                    Total
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-3 mt-4">
              {membershipTypes.map((type) => (
                <div
                  key={type.name}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: type.color }}
                    ></div>
                    <span className="text-gray-600">
                      {type.name}
                    </span>
                  </div>
                  <span className="font-semibold text-black">
                    {Math.round((type.value / 1247) * 100)}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}