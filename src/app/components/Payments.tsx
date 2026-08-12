import { useState } from 'react';
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { DollarSign, CreditCard, ArrowUpRight, ArrowDownRight, Download, Plus, Search, Building2 } from "lucide-react";

const BRANCH_DATA = {
  all: {
    label: "Todas las Sucursales",
    ingresos: 15420,
    transacciones: 87,
    pendientes: 12,
    transactions: [
      { id: 'TRX-8829', branch: "Centro", user: 'Maria Garcia',  amount: 4500, date: '2023-10-24', type: 'Mensualidad',   method: 'Tarjeta',        status: 'completed' },
      { id: 'TRX-8830', branch: "Norte",  user: 'Juan Perez',    amount: 1200, date: '2023-10-24', type: 'Producto',       method: 'Efectivo',       status: 'completed' },
      { id: 'TRX-8831', branch: "Sur",    user: 'Carlos Lopez',  amount: 6900, date: '2023-10-23', type: 'Anualidad',     method: 'Transferencia',  status: 'pending'   },
      { id: 'TRX-8832', branch: "Centro", user: 'Ana Martinez',  amount: 4500, date: '2023-10-23', type: 'Mensualidad',   method: 'Tarjeta',        status: 'failed'    },
      { id: 'TRX-8833', branch: "Norte",  user: 'Luis Rodriguez',amount: 3500, date: '2023-10-22', type: 'Clase Privada', method: 'Tarjeta',        status: 'completed' },
      { id: 'TRX-8834', branch: "Sur",    user: 'Sofia Mendez',  amount: 800,  date: '2023-10-22', type: 'Mensualidad',   method: 'Efectivo',       status: 'completed' },
      { id: 'TRX-8835', branch: "Centro", user: 'Diego Ruiz',    amount: 380,  date: '2023-10-21', type: 'Producto',       method: 'Tarjeta',        status: 'completed' },
    ],
  },
  centro: {
    label: "Sucursal Centro",
    ingresos: 8450,
    transacciones: 38,
    pendientes: 4,
    transactions: [
      { id: 'TRX-8829', branch: "Centro", user: 'Maria Garcia', amount: 4500, date: '2023-10-24', type: 'Mensualidad',   method: 'Tarjeta',  status: 'completed' },
      { id: 'TRX-8832', branch: "Centro", user: 'Ana Martinez', amount: 4500, date: '2023-10-23', type: 'Mensualidad',   method: 'Tarjeta',  status: 'failed'    },
      { id: 'TRX-8835', branch: "Centro", user: 'Diego Ruiz',   amount: 380,  date: '2023-10-21', type: 'Producto',       method: 'Tarjeta',  status: 'completed' },
      { id: 'TRX-8836', branch: "Centro", user: 'Laura Vega',   amount: 1200, date: '2023-10-20', type: 'Premium 3M',    method: 'Transferencia', status: 'pending' },
    ],
  },
  norte: {
    label: "Sucursal Norte",
    ingresos: 4750,
    transacciones: 29,
    pendientes: 5,
    transactions: [
      { id: 'TRX-8830', branch: "Norte", user: 'Juan Perez',     amount: 1200, date: '2023-10-24', type: 'Producto',       method: 'Efectivo',  status: 'completed' },
      { id: 'TRX-8833', branch: "Norte", user: 'Luis Rodriguez', amount: 3500, date: '2023-10-22', type: 'Clase Privada',  method: 'Tarjeta',   status: 'completed' },
      { id: 'TRX-8837', branch: "Norte", user: 'Carmen Díaz',    amount: 800,  date: '2023-10-20', type: 'Mensualidad',    method: 'Efectivo',  status: 'pending'   },
    ],
  },
  sur: {
    label: "Sucursal Sur",
    ingresos: 2220,
    transacciones: 20,
    pendientes: 3,
    transactions: [
      { id: 'TRX-8831', branch: "Sur", user: 'Carlos Lopez', amount: 6900, date: '2023-10-23', type: 'Anualidad',    method: 'Transferencia', status: 'pending'   },
      { id: 'TRX-8834', branch: "Sur", user: 'Sofia Mendez', amount: 800,  date: '2023-10-22', type: 'Mensualidad',  method: 'Efectivo',      status: 'completed' },
      { id: 'TRX-8838', branch: "Sur", user: 'Marco Reyes',  amount: 380,  date: '2023-10-19', type: 'Producto',     method: 'Tarjeta',       status: 'failed'    },
    ],
  },
};

type BranchKey = keyof typeof BRANCH_DATA;

const BRANCH_TABS: { key: BranchKey; label: string }[] = [
  { key: "all",    label: "Todas" },
  { key: "centro", label: "Centro" },
  { key: "norte",  label: "Norte" },
  { key: "sur",    label: "Sur" },
];

export function Payments() {
  const [selectedBranch, setSelectedBranch] = useState<BranchKey>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const data = BRANCH_DATA[selectedBranch];
  const filtered = data.transactions.filter(tx =>
    tx.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tx.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed': return <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Completado</Badge>;
      case 'pending':   return <Badge className="bg-amber-500/10 text-amber-400 border border-amber-500/20">Pendiente</Badge>;
      case 'failed':    return <Badge className="bg-rose-500/10 text-rose-400 border border-rose-500/20">Fallido</Badge>;
      default:          return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Pagos y Facturación</h1>
          <p className="text-gray-500">Historial de transacciones por sucursal</p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-white text-black hover:bg-gray-200 font-semibold gap-2"
        >
          <Plus className="w-4 h-4" /> Pago Manual
        </Button>
      </div>

      {/* Branch Tabs */}
      <div className="flex items-center gap-1 bg-gray-900 border border-gray-700 rounded-lg p-1">
        {BRANCH_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setSelectedBranch(tab.key)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-sm font-semibold transition-all ${
              selectedBranch === tab.key ? "bg-white text-black" : "text-gray-400 hover:text-white"
            }`}
          >
            {tab.key !== "all" && <Building2 className="w-3.5 h-3.5" />}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Branch label */}
      <p className="text-sm text-gray-500 font-medium">{data.label}</p>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-gray-500 uppercase tracking-wider">Ingresos Hoy</p>
            <DollarSign className="w-4 h-4 text-gray-600" />
          </div>
          <p className="text-3xl font-bold text-white">${data.ingresos.toLocaleString()}</p>
          <p className="text-xs text-emerald-400 flex items-center mt-2 font-medium">
            <ArrowUpRight className="w-3 h-3 mr-1" /> +15% vs ayer
          </p>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-gray-500 uppercase tracking-wider">Transacciones</p>
            <CreditCard className="w-4 h-4 text-gray-600" />
          </div>
          <p className="text-3xl font-bold text-white">{data.transacciones}</p>
          <p className="text-xs text-emerald-400 flex items-center mt-2 font-medium">
            <ArrowUpRight className="w-3 h-3 mr-1" /> +8% vs ayer
          </p>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-gray-500 uppercase tracking-wider">Pagos Pendientes</p>
            <DollarSign className="w-4 h-4 text-gray-600" />
          </div>
          <p className="text-3xl font-bold text-white">{data.pendientes}</p>
          <p className="text-xs text-rose-400 flex items-center mt-2 font-medium">
            <ArrowDownRight className="w-3 h-3 mr-1" /> Requiere atención
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
          <h2 className="text-base font-bold text-white">Últimas Transacciones</h2>
          <div className="flex gap-2">
            <div className="relative w-52">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 h-9 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-gray-500"
              />
            </div>
            <Button variant="outline" size="sm" className="h-9 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white gap-2">
              <Download className="w-4 h-4" /> Exportar
            </Button>
          </div>
        </div>

        <table className="w-full">
          <thead className="bg-gray-900/50 border-b border-gray-700">
            <tr>
              {["ID","Sucursal","Usuario","Concepto","Fecha","Método","Monto","Estado"].map(h => (
                <th key={h} className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {filtered.map((tx) => (
              <tr key={tx.id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 font-mono text-xs text-gray-500">{tx.id}</td>
                <td className="px-6 py-4">
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-300 border border-gray-700">{tx.branch}</span>
                </td>
                <td className="px-6 py-4 font-semibold text-white">{tx.user}</td>
                <td className="px-6 py-4 text-gray-400">{tx.type}</td>
                <td className="px-6 py-4 text-gray-500 text-sm">{new Date(tx.date).toLocaleDateString('es-MX')}</td>
                <td className="px-6 py-4 text-gray-400">{tx.method}</td>
                <td className="px-6 py-4 font-bold text-white">${tx.amount.toLocaleString()}</td>
                <td className="px-6 py-4">{getStatusBadge(tx.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Manual Payment Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px] bg-gray-900 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Registrar Pago Manual</DialogTitle>
            <DialogDescription className="text-gray-400">Ingresa los detalles del pago recibido en mostrador.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right text-gray-300">Sucursal</Label>
              <Select>
                <SelectTrigger className="col-span-3 bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Seleccionar sucursal..." />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  <SelectItem value="centro">Sucursal Centro</SelectItem>
                  <SelectItem value="norte">Sucursal Norte</SelectItem>
                  <SelectItem value="sur">Sucursal Sur</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right text-gray-300">Miembro</Label>
              <Input className="col-span-3 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500" placeholder="Buscar miembro..." />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right text-gray-300">Concepto</Label>
              <Select>
                <SelectTrigger className="col-span-3 bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Seleccionar..." />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  <SelectItem value="mensualidad">Mensualidad</SelectItem>
                  <SelectItem value="producto">Producto</SelectItem>
                  <SelectItem value="clase">Clase Privada</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right text-gray-300">Monto</Label>
              <div className="col-span-3 relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input className="pl-9 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500" placeholder="0.00" type="number" />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right text-gray-300">Método</Label>
              <Select>
                <SelectTrigger className="col-span-3 bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Seleccionar..." />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  <SelectItem value="efectivo">Efectivo</SelectItem>
                  <SelectItem value="tarjeta">Tarjeta</SelectItem>
                  <SelectItem value="transferencia">Transferencia</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)} className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white">Cancelar</Button>
            <Button onClick={() => setIsModalOpen(false)} className="bg-white text-black hover:bg-gray-200 font-semibold">Registrar Cobro</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}