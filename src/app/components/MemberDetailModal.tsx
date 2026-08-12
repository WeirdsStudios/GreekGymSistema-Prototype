import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { X, Phone, Mail, MapPin, Calendar, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

interface Member {
  id: string;
  name: string;
  phone: string;
  email: string;
  membershipType: string;
  status: 'active' | 'expired' | 'pending';
  expirationDate: string;
  birthDate?: string;
  address?: string;
  startDate?: string;
  daysRemaining?: number;
  monthlyVisits?: number;
  classesTaken?: number;
  lastCheckIn?: string;
}

interface Transaction {
  id: string;
  date: string;
  concept: string;
  amount: number;
  status: 'Completado' | 'Pendiente' | 'Fallido';
}

interface MemberDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: Member | null;
}

// Mock data de transacciones
const MOCK_TRANSACTIONS: Transaction[] = [
  { id: '1', date: '15 Abr 2024', concept: 'Renovación Premium - 1 Mes', amount: 1200, status: 'Completado' },
  { id: '2', date: '28 Mar 2024', concept: 'Proteína 1kg', amount: 450, status: 'Completado' },
  { id: '3', date: '15 Mar 2024', concept: 'Renovación Premium - 1 Mes', amount: 1200, status: 'Completado' },
  { id: '4', date: '02 Mar 2024', concept: 'Clase Individual', amount: 150, status: 'Completado' },
];

export function MemberDetailModal({ isOpen, onClose, member }: MemberDetailModalProps) {
  if (!member) return null;

  const initials = member.name.split(' ').map(n => n[0]).join('').slice(0, 2);
  const daysRemaining = member.daysRemaining || 15;
  const monthlyVisits = member.monthlyVisits || 18;
  const classesTaken = member.classesTaken || 12;
  const lastCheckIn = member.lastCheckIn || '13 Abr 2024, 18:30';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[520px] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <DialogHeader className="pb-4 border-b-2 border-gray-200">
          <div className="flex items-start gap-4">
            <Avatar className="w-16 h-16 bg-black text-white">
              <AvatarFallback className="bg-black text-white font-bold text-xl">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <DialogTitle className="text-xl font-bold text-black mb-1">
                {member.name}
              </DialogTitle>
              <p className="text-sm text-gray-600 mb-2">ID: {member.id}</p>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge className="bg-black text-white border-0 text-xs font-semibold">
                  {member.membershipType}
                </Badge>
                <Badge
                  className={
                    member.status === 'active'
                      ? 'bg-emerald-100 text-emerald-700 border-emerald-300 text-xs font-semibold'
                      : 'bg-rose-100 text-rose-700 border-rose-300 text-xs font-semibold'
                  }
                >
                  {member.status === 'active' ? 'Activo' : 'Vencido'}
                </Badge>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 absolute right-4 top-4"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </DialogHeader>

        {/* Contenido en 2 columnas */}
        <div className="grid grid-cols-2 gap-6 py-4">
          {/* Columna Izquierda */}
          <div className="space-y-6">
            {/* Información Personal */}
            <div>
              <h3 className="text-sm font-bold text-black mb-3 uppercase tracking-wide">
                Información Personal
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Phone className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Teléfono</p>
                    <p className="text-sm font-semibold text-black">{member.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Mail className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm font-semibold text-black break-all">{member.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Fecha de nacimiento</p>
                    <p className="text-sm font-semibold text-black">
                      {member.birthDate || '15 Mar 1995'}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Dirección</p>
                    <p className="text-sm font-semibold text-black">
                      {member.address || 'Av. Reforma 123, Centro'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Membresía Activa */}
            <div>
              <h3 className="text-sm font-bold text-black mb-3 uppercase tracking-wide">
                Membresía Activa
              </h3>
              <div className="bg-gray-50 rounded-lg border-2 border-gray-200 p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Tipo</span>
                  <span className="text-sm font-bold text-black">{member.membershipType}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Inicio</span>
                  <span className="text-sm font-semibold text-black">
                    {member.startDate || '15 Mar 2024'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Vencimiento</span>
                  <span className="text-sm font-semibold text-black">{member.expirationDate}</span>
                </div>
                <div className="pt-3 border-t-2 border-gray-200">
                  <p className="text-xs text-gray-500 mb-2">Días restantes</p>
                  <div
                    className={`inline-flex items-center justify-center rounded-lg px-4 py-2 ${
                      daysRemaining > 7
                        ? 'bg-emerald-100 border-2 border-emerald-300'
                        : 'bg-rose-100 border-2 border-rose-300'
                    }`}
                  >
                    <span
                      className={`text-3xl font-bold ${
                        daysRemaining > 7 ? 'text-emerald-700' : 'text-rose-700'
                      }`}
                    >
                      {daysRemaining}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Columna Derecha */}
          <div className="space-y-6">
            {/* Historial de Pagos */}
            <div>
              <h3 className="text-sm font-bold text-black mb-3 uppercase tracking-wide">
                Historial de Pagos
              </h3>
              <div className="space-y-2 max-h-[240px] overflow-y-auto">
                {MOCK_TRANSACTIONS.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="bg-white rounded-lg border border-gray-200 p-3"
                  >
                    <div className="flex items-start justify-between mb-1">
                      <p className="text-xs font-semibold text-black line-clamp-2 pr-2">
                        {transaction.concept}
                      </p>
                      {transaction.status === 'Completado' && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      )}
                      {transaction.status === 'Pendiente' && (
                        <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                      )}
                      {transaction.status === 'Fallido' && (
                        <XCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mb-1">{transaction.date}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-black">${transaction.amount}</p>
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          transaction.status === 'Completado'
                            ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                            : transaction.status === 'Pendiente'
                            ? 'border-amber-200 bg-amber-50 text-amber-700'
                            : 'border-rose-200 bg-rose-50 text-rose-700'
                        }`}
                      >
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Estadísticas */}
            <div>
              <h3 className="text-sm font-bold text-black mb-3 uppercase tracking-wide">
                Estadísticas
              </h3>
              <div className="space-y-3">
                <div className="bg-gray-50 rounded-lg border-2 border-gray-200 p-3">
                  <p className="text-xs text-gray-500 mb-1">Días asistidos este mes</p>
                  <p className="text-2xl font-bold text-black">{monthlyVisits}</p>
                </div>
                <div className="bg-gray-50 rounded-lg border-2 border-gray-200 p-3">
                  <p className="text-xs text-gray-500 mb-1">Clases tomadas</p>
                  <p className="text-2xl font-bold text-black">{classesTaken}</p>
                </div>
                <div className="bg-gray-50 rounded-lg border-2 border-gray-200 p-3">
                  <p className="text-xs text-gray-500 mb-1">Último check-in</p>
                  <p className="text-sm font-semibold text-black">{lastCheckIn}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 pt-4 border-t-2 border-gray-200">
          <Button
            variant="outline"
            className="flex-1 h-11 border-2 border-gray-300 hover:bg-gray-100 font-semibold"
          >
            Ver Perfil Completo
          </Button>
          <Button
            onClick={onClose}
            className="flex-1 h-11 bg-black text-white hover:bg-gray-800 font-semibold"
          >
            Cerrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
