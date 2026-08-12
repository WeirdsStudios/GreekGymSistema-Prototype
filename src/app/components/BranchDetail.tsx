import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ArrowLeft, MapPin, Users, DollarSign, Calendar, AlertTriangle, CheckCircle2, Wrench } from "lucide-react";

interface BranchDetailProps {
  branch: { id: string; name: string; address: string; isActive: boolean; members: number; revenue: number; staff: number };
  onBack: () => void;
}

const STAFF = [
  { name: 'Hugo Hernández', role: 'Administrador', schedule: 'Lun–Vie 8AM–5PM', active: true },
  { name: 'Araceli Arandas', role: 'Cajero', schedule: 'Lun–Sab 7AM–3PM', active: true },
  { name: 'Diego Hernández', role: 'Coach', schedule: 'Lun, Mié, Vie 7AM–12PM', active: true },
  { name: 'Patricia Ruiz', role: 'Coach', schedule: 'Mar, Jue, Sáb 6AM–2PM', active: true },
];

const EQUIPMENT_ISSUES = [
  { code: 'EQ-201', name: 'Press de Banca', status: 'Mantenimiento', lastService: '19/12/2023' },
  { code: 'EQ-205', name: 'Máquina de Poleas', status: 'Fuera de Servicio', lastService: '09/09/2023' },
];

const CLASSES_TODAY = [
  { name: 'Yoga Flow', coach: 'Diego H.', time: '07:00–08:00', enrolled: 18, capacity: 20 },
  { name: 'CrossFit', coach: 'Patricia R.', time: '09:00–10:00', enrolled: 15, capacity: 15 },
  { name: 'HIIT', coach: 'Diego H.', time: '18:00–19:00', enrolled: 20, capacity: 25 },
];

const ALERTS = [
  { title: 'Pago Vencido', desc: 'Membresía de Carlos Lopez venció hace 3 días.', priority: 'Alta' },
  { title: 'Mantenimiento Pendiente', desc: 'Caminadora #3 requiere revisión técnica mensual.', priority: 'Media' },
  { title: 'Stock Bajo', desc: 'Creatina 300g por debajo del mínimo (3 unidades).', priority: 'Media' },
];

export function BranchDetail({ branch, onBack }: BranchDetailProps) {
  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b-2 border-gray-200 px-6 py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={onBack} className="border-2 border-gray-300 font-semibold">
              <ArrowLeft className="w-4 h-4 mr-2" /> Volver a Sucursales
            </Button>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-black">{branch.name}</h1>
                <Badge className="bg-green-100 text-green-700 border-green-200">Activa</Badge>
              </div>
              <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5" />{branch.address}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-2 border-gray-300 font-semibold">Editar Sucursal</Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* KPIs */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'Miembros activos', value: branch.members, icon: <Users className="w-4 h-4 text-gray-400"/> },
            { label: 'Ingresos del mes', value: `$${(branch.revenue / 1000).toFixed(0)}K`, icon: <DollarSign className="w-4 h-4 text-gray-400"/> },
            { label: 'Personal', value: branch.staff, icon: <Users className="w-4 h-4 text-gray-400"/> },
            { label: 'Clases hoy', value: CLASSES_TODAY.length, icon: <Calendar className="w-4 h-4 text-gray-400"/> },
          ].map((kpi, i) => (
            <Card key={i} className="border-2 border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">{kpi.label}</p>
                  {kpi.icon}
                </div>
                <p className="text-3xl font-bold text-black">{kpi.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* LEFT: Personal + Resumen Financiero */}
          <div className="space-y-4">
            <Card className="border-2 border-gray-200">
              <CardHeader className="pb-3"><CardTitle className="text-base">Resumen Financiero — Mes Actual</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {[
                  { label: 'Ingresos', value: `$${branch.revenue.toLocaleString()}`, color: 'text-green-700' },
                  { label: 'Gastos operativos', value: '$89,200', color: 'text-red-600' },
                  { label: 'Utilidad neta', value: `$${(branch.revenue - 89200).toLocaleString()}`, color: 'text-black', bold: true },
                ].map((row, i) => (
                  <div key={i} className={`flex justify-between items-center py-2 ${i < 2 ? 'border-b border-gray-100' : 'border-t-2 border-gray-200 pt-3'}`}>
                    <span className="text-sm text-gray-600">{row.label}</span>
                    <span className={`text-sm font-bold ${row.color}`}>{row.value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-200">
              <CardHeader className="pb-3"><CardTitle className="text-base">Personal</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {STAFF.map((s, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {s.name.split(' ').map(n => n[0]).join('').slice(0,2)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-black">{s.name}</p>
                      <p className="text-xs text-gray-500">{s.role} · {s.schedule}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">Activo</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* RIGHT: Equipamiento + Clases + Alertas */}
          <div className="space-y-4">
            <Card className="border-2 border-gray-200">
              <CardHeader className="pb-3 flex flex-row items-center justify-between">
                <CardTitle className="text-base">Equipamiento Crítico</CardTitle>
                <Button variant="outline" size="sm" className="text-xs border-gray-300">Ver todo</Button>
              </CardHeader>
              <CardContent className="space-y-2">
                {EQUIPMENT_ISSUES.map((eq, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-gray-200 bg-gray-50">
                    <div className="flex items-center gap-2">
                      <Wrench className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-sm font-semibold text-black">{eq.name}</p>
                        <p className="text-xs text-gray-500">{eq.code} · Último servicio: {eq.lastService}</p>
                      </div>
                    </div>
                    <Badge className={eq.status === 'Mantenimiento' ? 'bg-yellow-100 text-yellow-700 border-yellow-200 text-xs' : 'bg-red-100 text-red-700 border-red-200 text-xs'}>
                      {eq.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-200">
              <CardHeader className="pb-3"><CardTitle className="text-base">Clases de Hoy</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {CLASSES_TODAY.map((cls, i) => {
                  const pct = Math.round((cls.enrolled / cls.capacity) * 100);
                  const full = cls.enrolled >= cls.capacity;
                  return (
                    <div key={i} className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm font-semibold text-black">{cls.name}</span>
                          <span className="text-xs text-gray-500 ml-2">{cls.coach} · {cls.time}</span>
                        </div>
                        <Badge className={full ? 'bg-red-100 text-red-700 border-red-200 text-xs' : 'bg-green-100 text-green-700 border-green-200 text-xs'}>
                          {full ? 'Lleno' : 'Disponible'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${full ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-xs text-gray-500 w-16 text-right">{cls.enrolled}/{cls.capacity}</span>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-200">
              <CardHeader className="pb-3"><CardTitle className="text-base">Últimas Alertas</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {ALERTS.map((a, i) => (
                  <div key={i} className={`p-3 rounded-lg border ${a.priority === 'Alta' ? 'bg-red-50 border-red-200' : 'bg-yellow-50 border-yellow-200'}`}>
                    <div className="flex items-center justify-between mb-0.5">
                      <p className="text-sm font-semibold text-black">{a.title}</p>
                      <Badge className={a.priority === 'Alta' ? 'bg-red-100 text-red-700 border-red-200 text-xs' : 'bg-yellow-100 text-yellow-700 border-yellow-200 text-xs'}>
                        {a.priority}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600">{a.desc}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}