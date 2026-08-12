import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { CheckCircle2 } from 'lucide-react';

interface ShiftStartScreenProps {
  onStartShift: (cashAmount: number, notes: string) => void;
}

export function ShiftStartScreen({ onStartShift }: ShiftStartScreenProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [cashAmount, setCashAmount] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = () => {
    const amount = parseFloat(cashAmount);
    if (amount && amount > 0) {
      onStartShift(amount, notes);
    }
  };

  return (
    <div className="h-screen w-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-8">
        {/* Logo y Título */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl font-bold">GG</span>
          </div>
          <h1 className="text-2xl font-bold text-black mb-1">Greek Gym</h1>
          <p className="text-sm text-gray-600">Sistema POS</p>
        </div>

        {/* Título de la pantalla */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-black mb-2 text-center">Iniciar Turno</h2>
          <p className="text-sm text-gray-600 text-center">Sucursal Centro — Cajero: Araceli Arandas</p>
        </div>

        {/* Fecha y hora en tiempo real */}
        <div className="bg-gray-50 rounded-xl p-4 mb-8 text-center border-2 border-gray-200">
          <p className="text-3xl font-bold text-black mb-1">
            {currentTime.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </p>
          <p className="text-sm text-gray-600">
            {currentTime.toLocaleDateString('es-MX', { 
              weekday: 'long', 
              day: 'numeric', 
              month: 'long', 
              year: 'numeric' 
            })}
          </p>
        </div>

        {/* Fondo de Caja Inicial */}
        <div className="space-y-6 mb-8">
          <div className="space-y-3">
            <Label htmlFor="cashAmount" className="text-base font-bold text-black">
              ¿Con cuánto efectivo inicias?
            </Label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-3xl font-bold text-gray-400">
                $
              </span>
              <Input
                id="cashAmount"
                type="number"
                step="0.01"
                min="0"
                value={cashAmount}
                onChange={(e) => setCashAmount(e.target.value)}
                placeholder="0.00"
                className="h-16 text-3xl font-bold pl-12 pr-4 border-2 border-gray-300 focus:border-black text-center"
              />
            </div>
            <p className="text-xs text-gray-500 text-center">
              Cuenta el efectivo antes de comenzar
            </p>
          </div>

          {/* Área de notas */}
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-sm font-semibold text-black">
              Notas de apertura (opcional)
            </Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Escribe cualquier observación sobre la apertura..."
              className="h-20 resize-none border-2 border-gray-300 focus:border-black text-sm"
            />
          </div>
        </div>

        {/* Botón de inicio */}
        <Button
          onClick={handleSubmit}
          disabled={!cashAmount || parseFloat(cashAmount) <= 0}
          className="w-full h-14 bg-black text-white hover:bg-gray-800 text-lg font-bold rounded-xl"
        >
          <CheckCircle2 className="w-6 h-6 mr-2" />
          Iniciar Turno
        </Button>

        {/* Texto informativo */}
        <p className="text-xs text-gray-500 text-center mt-4">
          Este registro quedará en el reporte del corte de caja
        </p>
      </div>
    </div>
  );
}
