import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { 
  ArrowLeft, 
  ArrowRight, 
  DollarSign, 
  TrendingUp, 
  ShoppingCart,
  AlertTriangle,
  Clock,
  User,
  Building2,
  Calendar
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

interface CashClosureScreenProps {
  onBack: () => void;
  onConfirmClosure: () => void;
  initialCash: number;
}

const PAYMENT_TYPES = [
  { type: 'Efectivo', transactions: 18, amount: 4200, percentage: 28, color: '#000000' },
  { type: 'Tarjeta Débito', transactions: 12, amount: 3800, percentage: 25, color: '#374151' },
  { type: 'Tarjeta Crédito', transactions: 8, amount: 5100, percentage: 34, color: '#6B7280' },
  { type: 'Transferencia', transactions: 4, amount: 1900, percentage: 13, color: '#9CA3AF' },
];

const TOTAL_TRANSACTIONS = PAYMENT_TYPES.reduce((sum, item) => sum + item.transactions, 0);
const TOTAL_AMOUNT = PAYMENT_TYPES.reduce((sum, item) => sum + item.amount, 0);

export function CashClosureScreen({ onBack, onConfirmClosure, initialCash }: CashClosureScreenProps) {
  const [cashInRegister, setCashInRegister] = useState('');
  const [notes, setNotes] = useState('');
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const currentTime = new Date();
  const startTime = new Date(currentTime.getTime() - 8 * 60 * 60 * 1000);

  const cashInRegisterNum = parseFloat(cashInRegister) || 0;
  const expectedCash = initialCash + PAYMENT_TYPES[0].amount;
  const difference = cashInRegisterNum - expectedCash;

  const chartData = PAYMENT_TYPES.map(item => ({
    name: item.type,
    value: item.amount,
  }));

  const handleConfirmClosure = () => {
    setIsConfirmDialogOpen(false);
    onConfirmClosure();
  };

  return (
    <div className="h-screen w-screen bg-white flex flex-col overflow-hidden">
      
      {/* Header - FIJO */}
      <div className="bg-white border-b-2 border-gray-200 px-8 py-6 flex-shrink-0">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-black mb-2">Corte de Caja</h1>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1"><User className="w-4 h-4" /><span>Araceli Arandas</span></div>
                <span>•</span>
                <div className="flex items-center gap-1"><Building2 className="w-4 h-4" /><span>Sucursal Centro</span></div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 mb-1">Cierre de turno</p>
              <p className="text-2xl font-bold text-black">
                {currentTime.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden">
        <div className="max-w-[1600px] mx-auto h-full p-8">
          <div className="grid grid-cols-12 gap-8 h-full">
            
            {/* COLUMNA IZQUIERDA - CON SCROLL */}
            <div className="col-span-7 overflow-y-auto pr-4 space-y-6 pb-10 custom-scrollbar">
              
              {/* Sección 1: Resumen del Turno */}
              <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
                <h2 className="text-xl font-bold text-black mb-4">Resumen del Turno</h2>
                {/* ... (Contenido de KPI cards se mantiene igual) ... */}
                <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Fecha</p>
                    <p className="text-sm font-bold text-black flex items-center gap-1"><Calendar className="w-4 h-4" /> {currentTime.toLocaleDateString('es-MX')}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Hora inicio</p>
                    <p className="text-sm font-bold text-black flex items-center gap-1"><Clock className="w-4 h-4" /> {startTime.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Hora fin</p>
                    <p className="text-sm font-bold text-black flex items-center gap-1"><Clock className="w-4 h-4" /> {currentTime.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-xl border-2 border-gray-200 p-5 text-center">
                    <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">Transacciones</p>
                    <p className="text-3xl font-bold text-black">{TOTAL_TRANSACTIONS}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl border-2 border-gray-200 p-5 text-center">
                    <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">Total Vendido</p>
                    <p className="text-3xl font-bold text-black">${TOTAL_AMOUNT.toLocaleString()}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl border-2 border-gray-200 p-5 text-center">
                    <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">Ticket Promedio</p>
                    <p className="text-3xl font-bold text-black">${Math.round(TOTAL_AMOUNT / TOTAL_TRANSACTIONS)}</p>
                  </div>
                </div>
              </div>

              {/* Sección 2: Desglose por Tipo de Cobro */}
              <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
                <h2 className="text-xl font-bold text-black mb-4">Desglose por Tipo de Cobro</h2>
                {/* ... (Tabla de cobros) ... */}
                <div className="overflow-hidden rounded-lg border-2 border-gray-200">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-100 border-b-2 border-gray-200 text-left">
                        <th className="px-4 py-3 font-bold">Tipo</th>
                        <th className="px-4 py-3 text-center font-bold">Transacciones</th>
                        <th className="px-4 py-3 text-right font-bold">Monto</th>
                      </tr>
                    </thead>
                    <tbody>
                      {PAYMENT_TYPES.map((item) => (
                        <tr key={item.type} className="border-b border-gray-200">
                          <td className="px-4 py-3 font-semibold">{item.type}</td>
                          <td className="px-4 py-3 text-center">{item.transactions}</td>
                          <td className="px-4 py-3 text-right font-bold">${item.amount.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Sección 3: Fondo de Caja (AQUÍ ESTÁ EL REGRESO DE LA ALERTA) */}
              <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
                <h2 className="text-xl font-bold text-black mb-4">Fondo de Caja</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <span className="text-sm text-gray-600">Fondo inicial registrado:</span>
                    <span className="text-lg font-bold text-black">${initialCash.toLocaleString()}</span>
                  </div>
                  <div>
                    <label className="text-sm font-bold text-black mb-2 block">Efectivo en caja al cierre:</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-gray-400">$</span>
                      <Input
                        type="number"
                        value={cashInRegister}
                        onChange={(e) => setCashInRegister(e.target.value)}
                        placeholder="0.00"
                        className="h-16 text-2xl font-bold pl-10 pr-4 border-2 border-gray-300 focus:border-black text-right"
                      />
                    </div>
                  </div>

                  {/* CUADRO DE DIFERENCIA - RE-INTEGRADO */}
                  {cashInRegister && (
                    <div className="p-5 rounded-lg border-2 animate-in fade-in slide-in-from-top-2 duration-300" style={{
                      borderColor: difference >= 0 ? '#16a34a' : '#ef4444',
                      backgroundColor: difference >= 0 ? '#f0fdf4' : '#fef2f2'
                    }}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold" style={{ color: difference >= 0 ? '#16a34a' : '#ef4444' }}>
                          Diferencia:
                        </span>
                        <span className="text-3xl font-bold" style={{ color: difference >= 0 ? '#16a34a' : '#ef4444' }}>
                          {difference >= 0 ? '+' : ''}${difference.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-xs" style={{ color: difference >= 0 ? '#15803d' : '#dc2626' }}>
                        {difference >= 0 
                          ? 'El efectivo en caja es mayor al esperado. Verifica que no haya errores.'
                          : 'Faltante de efectivo. Por favor verifica las transacciones y vuelve a contar.'
                        }
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Sección 4: Notas */}
              <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
                <h2 className="text-xl font-bold text-black mb-4">Notas del Turno</h2>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Observaciones relevantes..."
                  className="h-24 resize-none border-2 border-gray-300 focus:border-black text-sm"
                />
              </div>
            </div>

            {/* COLUMNA DERECHA - FIJA */}
            <div className="col-span-5 flex flex-col h-full overflow-hidden">
              <div className="flex-1 overflow-y-auto bg-white rounded-xl border-2 border-gray-200 p-6 mb-4 custom-scrollbar">
                <h2 className="text-xl font-bold text-black mb-6 text-center">Distribución de Ingresos</h2>
                <div className="h-[280px] relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={chartData} cx="50%" cy="50%" innerRadius={70} outerRadius={100} paddingAngle={2} dataKey="value">
                        {PAYMENT_TYPES.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2 border-t-2 border-gray-100 pt-4">
                  {PAYMENT_TYPES.map((item) => (
                    <div key={item.type} className="flex items-center justify-between p-2">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-sm font-semibold">{item.type}</span>
                      </div>
                      <span className="text-sm font-bold">${item.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Botones - Siempre visibles */}
              <div className="bg-white rounded-xl border-2 border-gray-200 p-6 space-y-3 flex-shrink-0">
                <Button onClick={onBack} variant="outline" className="w-full h-12 border-2 border-black font-bold">
                  <ArrowLeft className="w-5 h-5 mr-2" /> Volver al POS
                </Button>
                <Button onClick={() => setIsConfirmDialogOpen(true)} disabled={!cashInRegister} className="w-full h-14 bg-black text-white font-bold text-lg">
                  Confirmar y Cerrar Turno <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-black">¿Confirmar cierre de turno?</DialogTitle>
          </DialogHeader>
          <div className="py-6 space-y-4">
            <div className="space-y-3 p-4 bg-gray-50 rounded-lg border-2 border-gray-200 text-sm">
              <div className="flex justify-between"><span>Total cobrado:</span><span className="font-bold">${TOTAL_AMOUNT.toLocaleString()}</span></div>
              <div className="flex justify-between"><span>Diferencia:</span><span className="font-bold" style={{ color: difference >= 0 ? '#16a34a' : '#ef4444' }}>{difference >= 0 ? '+' : ''}${difference.toFixed(2)}</span></div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConfirmDialogOpen(false)} className="flex-1 h-11">Cancelar</Button>
            <Button onClick={handleConfirmClosure} className="flex-1 h-11 bg-black text-white font-semibold">Sí, cerrar turno</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}