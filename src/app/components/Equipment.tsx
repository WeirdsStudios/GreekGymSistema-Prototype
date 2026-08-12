import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search, Wrench, AlertTriangle, CheckCircle, Activity, Filter, Settings } from "lucide-react";

// Mock Data
const equipmentData = [
  { id: 'EQ-101', name: 'Caminadora Pro X7', category: 'Cardio', location: 'Zona A', status: 'operational', lastService: '2023-10-15' },
  { id: 'EQ-102', name: 'Elíptica E500', category: 'Cardio', location: 'Zona A', status: 'operational', lastService: '2023-11-01' },
  { id: 'EQ-201', name: 'Press de Banca', category: 'Fuerza', location: 'Zona B', status: 'maintenance', lastService: '2023-12-20' },
  { id: 'EQ-205', name: 'Máquina de Poleas', category: 'Fuerza', location: 'Zona B', status: 'broken', lastService: '2023-09-10' },
  { id: 'EQ-301', name: 'Bicicleta Estática', category: 'Cardio', location: 'Zona A', status: 'operational', lastService: '2023-10-20' },
  { id: 'EQ-401', name: 'Mancuernas Set A', category: 'Peso Libre', location: 'Zona C', status: 'operational', lastService: '2023-12-01' },
  { id: 'EQ-103', name: 'Caminadora Pro X7', category: 'Cardio', location: 'Zona A', status: 'operational', lastService: '2023-10-15' },
];

export function Equipment() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'operational':
        return <Badge className="bg-emerald-100 text-emerald-800 border-none flex items-center gap-1 w-fit"><CheckCircle className="w-3 h-3" /> Operativo</Badge>;
      case 'maintenance':
        return <Badge className="bg-amber-100 text-[#D4AF37] border-none flex items-center gap-1 w-fit"><Wrench className="w-3 h-3" /> Mantenimiento</Badge>;
      case 'broken':
        return <Badge className="bg-rose-100 text-rose-800 border-none flex items-center gap-1 w-fit"><AlertTriangle className="w-3 h-3" /> Fuera de Servicio</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-[1200px] mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
           <h1 className="text-3xl font-bold text-[#090909]">Equipamiento</h1>
           <p className="text-slate-500">Inventario y estado de mantenimiento.</p>
        </div>
        <Button className="bg-[#D4AF37] hover:bg-[#FCDE7C] text-[#090909] font-semibold gap-2">
           <Settings className="w-4 h-4" /> Programar Mantenimiento
        </Button>
      </div>

      {/* Compact Indicators Grid (2x2 on mobile, 4x1 on desktop for better fit or 2x2 as requested "compact grid") */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-l-4 border-l-[#090909] shadow-sm">
             <CardContent className="p-4 flex flex-col justify-center h-full">
                <span className="text-sm text-slate-500 font-medium uppercase">Total Activos</span>
                <span className="text-3xl font-bold text-[#090909]">48</span>
             </CardContent>
          </Card>
          <Card className="border-l-4 border-l-emerald-500 shadow-sm">
             <CardContent className="p-4 flex flex-col justify-center h-full">
                <span className="text-sm text-slate-500 font-medium uppercase">Operativos</span>
                <span className="text-3xl font-bold text-emerald-600">45</span>
             </CardContent>
          </Card>
          <Card className="border-l-4 border-l-[#D4AF37] shadow-sm">
             <CardContent className="p-4 flex flex-col justify-center h-full">
                <span className="text-sm text-slate-500 font-medium uppercase">Mantenimiento</span>
                <span className="text-3xl font-bold text-[#D4AF37]">2</span>
             </CardContent>
          </Card>
          <Card className="border-l-4 border-l-rose-500 shadow-sm">
             <CardContent className="p-4 flex flex-col justify-center h-full">
                <span className="text-sm text-slate-500 font-medium uppercase">Fuera de Servicio</span>
                <span className="text-3xl font-bold text-rose-600">1</span>
             </CardContent>
          </Card>
      </div>

      {/* Equipment Table */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-slate-100">
             <CardTitle className="text-lg font-bold">Inventario</CardTitle>
             <div className="flex gap-2">
                <div className="relative w-[200px]">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                   <Input placeholder="Buscar equipo..." className="pl-9 h-9" />
                </div>
                <Button variant="outline" size="sm" className="h-9 w-9 p-0"><Filter className="w-4 h-4" /></Button>
             </div>
        </CardHeader>
        <CardContent className="p-0">
             <Table>
                <TableHeader>
                    <TableRow className="hover:bg-transparent bg-slate-50/50">
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Nombre del Equipo</TableHead>
                        <TableHead>Categoría</TableHead>
                        <TableHead>Ubicación</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-right">Último Servicio</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {equipmentData.map((item) => (
                        <TableRow key={item.id} className="hover:bg-slate-50">
                            <TableCell className="font-mono text-xs text-slate-500">{item.id}</TableCell>
                            <TableCell className="font-medium text-[#090909] flex items-center gap-2">
                                <div className="p-1.5 bg-slate-100 rounded-md">
                                    <Activity className="w-4 h-4 text-slate-600" />
                                </div>
                                {item.name}
                            </TableCell>
                            <TableCell>{item.category}</TableCell>
                            <TableCell className="text-slate-500">{item.location}</TableCell>
                            <TableCell>{getStatusBadge(item.status)}</TableCell>
                            <TableCell className="text-right text-slate-500">{new Date(item.lastService).toLocaleDateString('es-ES')}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
             </Table>
        </CardContent>
      </Card>
    </div>
  );
}
