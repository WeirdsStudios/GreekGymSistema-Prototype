import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';
import { Download, Calendar as CalendarIcon, Filter, Package, ChevronUp, ChevronDown } from "lucide-react";

// Mock Data
const revenueData = [
  { name: 'Ene', ingresos: 45000, gastos: 32000 },
  { name: 'Feb', ingresos: 52000, gastos: 34000 },
  { name: 'Mar', ingresos: 48000, gastos: 31000 },
  { name: 'Abr', ingresos: 61000, gastos: 38000 },
  { name: 'May', ingresos: 55000, gastos: 36000 },
  { name: 'Jun', ingresos: 67000, gastos: 41000 },
];

const attendanceData = [
  { name: 'Lun', ma: 45, ta: 80, no: 120 },
  { name: 'Mar', ma: 50, ta: 85, no: 130 },
  { name: 'Mie', ma: 48, ta: 75, no: 125 },
  { name: 'Jue', ma: 52, ta: 88, no: 135 },
  { name: 'Vie', ma: 55, ta: 90, no: 140 },
  { name: 'Sab', ma: 80, ta: 60, no: 40 },
  { name: 'Dom', ma: 60, ta: 40, no: 30 },
];

export function Reports() {
const inventoryMovements = [
    { id: 'm1', date: '13 abr · 09:41 AM', cajero: 'Araceli Arandas', product: 'Proteína 1kg', type: 'entrada', qty: 10, reason: 'Reabastecimiento', stock: 25 },
    { id: 'm2', date: '13 abr · 10:15 AM', cajero: 'Araceli Arandas', product: 'Creatina 300g', type: 'salida', qty: 2, reason: 'Venta directa', stock: 3 },
    { id: 'm3', date: '12 abr · 03:22 PM', cajero: 'Araceli Arandas', product: 'Toalla Greek Gym', type: 'entrada', qty: 20, reason: 'Compra', stock: 45 },
    { id: 'm4', date: '12 abr · 01:10 PM', cajero: 'Araceli Arandas', product: 'Candado', type: 'salida', qty: 5, reason: 'Venta directa', stock: 8 },
    { id: 'm5', date: '11 abr · 11:00 AM', cajero: 'Araceli Arandas', product: 'Shaker', type: 'entrada', qty: 15, reason: 'Reabastecimiento', stock: 35 },
  ];

  return (
    <div className="p-6 space-y-6 max-w-[1200px] mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#090909] mb-2">Reportes y Analíticas</h1>
          <p className="text-muted-foreground">Analiza el rendimiento de tu gimnasio con datos detallados.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>Seleccionar fechas</span>
          </Button>
          <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Filtros</Button>
          <Button variant="outline"><Download className="mr-2 h-4 w-4" /> CSV</Button>
          <Button className="bg-[#D4AF37] text-black"><Download className="mr-2 h-4 w-4" /> PDF</Button>
        </div>
      </div>

      <Tabs defaultValue="reportes">
        <TabsList className="h-11 mb-4">
          <TabsTrigger value="reportes" className="text-sm font-semibold px-6">Reportes Generales</TabsTrigger>
          <TabsTrigger value="inventario" className="text-sm font-semibold px-6">
            <Package className="w-4 h-4 mr-2" />
            Inventario POS
          </TabsTrigger>
        </TabsList>

        {/* ── TAB 1: Reportes generales (contenido original) ── */}
        <TabsContent value="reportes" className="space-y-6">
          <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-wrap gap-4 items-center">
            <div className="w-full sm:w-[200px]">
              <Select defaultValue="all">
                <SelectTrigger><SelectValue placeholder="Sucursal" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las sucursales</SelectItem>
                  <SelectItem value="main">Sede Central</SelectItem>
                  <SelectItem value="north">Sede Norte</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full sm:w-[200px]">
              <Select defaultValue="all">
                <SelectTrigger><SelectValue placeholder="Entrenador" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los entrenadores</SelectItem>
                  <SelectItem value="mike">Mike Tyson</SelectItem>
                  <SelectItem value="sarah">Sarah Connor</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Ingresos vs Gastos</CardTitle>
                <CardDescription>Comparativa semestral financiera</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" /><YAxis /><Tooltip /><Legend />
                      <Bar dataKey="ingresos" fill="#D4AF37" radius={[4,4,0,0]} name="Ingresos" />
                      <Bar dataKey="gastos" fill="#94a3b8" radius={[4,4,0,0]} name="Gastos" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Asistencia por Turno</CardTitle>
                <CardDescription>Promedio de visitas diarias por franja horaria</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={attendanceData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" /><YAxis /><Tooltip /><Legend />
                      <Line type="monotone" dataKey="ma" stroke="#D4AF37" strokeWidth={2} name="Mañana" />
                      <Line type="monotone" dataKey="ta" stroke="#3b82f6" strokeWidth={2} name="Tarde" />
                      <Line type="monotone" dataKey="no" stroke="#1e293b" strokeWidth={2} name="Noche" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card><CardHeader><CardTitle className="text-lg">Membresías Nuevas</CardTitle><CardDescription>Este mes</CardDescription></CardHeader><CardContent><div className="text-4xl font-bold text-[#090909]">+145</div><p className="text-emerald-600 text-sm font-medium mt-1">+12% vs mes anterior</p></CardContent></Card>
            <Card><CardHeader><CardTitle className="text-lg">Tasa de Retención</CardTitle><CardDescription>Promedio trimestral</CardDescription></CardHeader><CardContent><div className="text-4xl font-bold text-[#090909]">94.2%</div><p className="text-emerald-600 text-sm font-medium mt-1">+0.5% vs trimestre anterior</p></CardContent></Card>
            <Card><CardHeader><CardTitle className="text-lg">Valor Promedio (ARPU)</CardTitle><CardDescription>Por miembro</CardDescription></CardHeader><CardContent><div className="text-4xl font-bold text-[#090909]">$55.00</div><p className="text-emerald-600 text-sm font-medium mt-1">Estable</p></CardContent></Card>
          </div>
        </TabsContent>

        {/* ── TAB 2: Inventario POS ── */}
        <TabsContent value="inventario" className="space-y-6">
          {/* Filtros */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-wrap gap-3 items-center">
            <Select defaultValue="hoy">
              <SelectTrigger className="w-[180px]"><SelectValue placeholder="Período" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="hoy">Hoy</SelectItem>
                <SelectItem value="semana">Última semana</SelectItem>
                <SelectItem value="mes">Este mes</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="todos">
              <SelectTrigger className="w-[180px]"><SelectValue placeholder="Cajero" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="araceli">Araceli Arandas</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="todos">
              <SelectTrigger className="w-[160px]"><SelectValue placeholder="Tipo" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="entrada">Entradas</SelectItem>
                <SelectItem value="salida">Salidas</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="border-gray-200">
              <CardContent className="p-5">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Movimientos totales</p>
                <p className="text-3xl font-bold text-black">18</p>
              </CardContent>
            </Card>
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-5">
                <p className="text-xs text-green-700 uppercase tracking-wide mb-1">Entradas totales</p>
                <p className="text-3xl font-bold text-green-700">12</p>
              </CardContent>
            </Card>
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-5">
                <p className="text-xs text-red-600 uppercase tracking-wide mb-1">Salidas / Ajustes</p>
                <p className="text-3xl font-bold text-red-600">6</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabla */}
          <Card className="border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between py-4">
              <CardTitle className="text-base">Movimientos de Inventario</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm"><Download className="w-4 h-4 mr-1" />CSV</Button>
                <Button size="sm" className="bg-[#D4AF37] text-black hover:bg-[#FCDE7C]"><Download className="w-4 h-4 mr-1" />PDF</Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full">
                <thead className="bg-gray-50 border-y border-gray-200">
                  <tr>
                    {['Fecha / Hora','Cajero','Producto','Tipo','Cantidad','Motivo','Stock resultante'].map(h => (
                      <th key={h} className="text-left text-xs font-semibold text-gray-500 px-4 py-3 uppercase">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {inventoryMovements.map(mov => (
                    <tr key={mov.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-xs text-gray-500">{mov.date}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{mov.cajero}</td>
                      <td className="px-4 py-3 font-semibold text-black text-sm">{mov.product}</td>
                      <td className="px-4 py-3">
                        <Badge className={mov.type === 'entrada' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'}>
                          {mov.type === 'entrada'
                            ? <><ChevronUp className="w-3 h-3 inline mr-1"/>Entrada</>
                            : <><ChevronDown className="w-3 h-3 inline mr-1"/>Salida</>}
                        </Badge>
                      </td>
                      <td className={`px-4 py-3 font-bold text-sm ${mov.type === 'entrada' ? 'text-green-700' : 'text-red-600'}`}>
                        {mov.type === 'entrada' ? '+' : '-'}{mov.qty}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{mov.reason}</td>
                      <td className="px-4 py-3 font-semibold text-black text-sm">{mov.stock}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
