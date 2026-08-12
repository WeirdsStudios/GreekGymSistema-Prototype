import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { ArrowLeft, Phone, Mail, MapPin, Calendar, TrendingUp, FileText, CreditCard } from "lucide-react";

const MOCK_PAYMENTS = [
  { date: '23/10/2023', concept: 'Mensualidad Premium', method: 'Tarjeta', amount: 4500, status: 'Completado' },
  { date: '23/09/2023', concept: 'Mensualidad Premium', method: 'Efectivo', amount: 4500, status: 'Completado' },
  { date: '10/09/2023', concept: 'Proteína 1kg', method: 'Tarjeta', amount: 450, status: 'Completado' },
  { date: '23/08/2023', concept: 'Mensualidad Premium', method: 'Transferencia', amount: 4500, status: 'Completado' },
  { date: '15/08/2023', concept: 'Clase Privada', method: 'Efectivo', amount: 400, status: 'Completado' },
];

const MOCK_MEMBERSHIPS = [
  { plan: 'Premium 1 Mes', start: '23/10/2023', end: '23/11/2023', status: 'Activa' },
  { plan: 'Premium 1 Mes', start: '23/09/2023', end: '23/10/2023', status: 'Vencida' },
  { plan: 'Estándar 1 Mes', start: '01/08/2023', end: '01/09/2023', status: 'Vencida' },
];

const ATTENDANCE_DATA = [15, 18, 12, 20, 16, 19];
const MONTHS = ['Ene','Feb','Mar','Abr','May','Jun'];

export function MemberProfile({ memberId, onBack }: { memberId: string; onBack: () => void }) {
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([
    { text: 'Cliente muy puntual, asiste principalmente en turno mañana.', date: '10 oct 2023', author: 'Hugo H.' },
  ]);

  const member = {
    id: memberId,
    name: 'Juan Pérez García',
    initials: 'JP',
    membershipType: 'Premium',
    status: 'active',
    phone: '555-0104',
    email: 'juan@email.com',
    address: 'Calle Reforma 45, Col. Centro',
    birthdate: '15 Mar 1990',
    joinDate: '01 Ene 2023',
    expirationDate: '23 Nov 2023',
    daysLeft: 31,
    attendedThisMonth: 16,
    classesTaken: 8,
    lastCheckin: 'Hoy, 07:42 AM',
    avgPerWeek: 3.8,
  };

  const addNote = () => {
    if (!note.trim()) return;
    setNotes([{ text: note, date: new Date().toLocaleDateString('es-MX', { day:'numeric', month:'short', year:'numeric' }), author: 'Hugo H.' }, ...notes]);
    setNote('');
  };

  const maxAttendance = Math.max(...ATTENDANCE_DATA);

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b-2 border-gray-200 px-6 py-4 flex-shrink-0">
        <Button variant="outline" onClick={onBack} className="border-2 border-gray-300 font-semibold">
          <ArrowLeft className="w-4 h-4 mr-2" /> Volver a Miembros
        </Button>
      </div>

      <div className="flex-1 overflow-hidden flex gap-6 p-6">
        {/* LEFT COLUMN */}
        <div className="w-72 flex-shrink-0 space-y-4 overflow-y-auto">
          {/* Identity card */}
          <Card className="border-2 border-gray-200">
            <CardContent className="p-5 text-center">
              <Avatar className="w-20 h-20 mx-auto mb-3 bg-black text-white">
                <AvatarFallback className="bg-black text-white text-2xl font-bold">{member.initials}</AvatarFallback>
              </Avatar>
              <h2 className="text-lg font-bold text-black">{member.name}</h2>
              <p className="text-xs text-gray-500 mb-3">ID: {member.id}</p>
              <div className="flex justify-center gap-2 flex-wrap mb-3">
                <Badge className="bg-black text-white border-black">{member.membershipType}</Badge>
                <Badge className={member.status === 'active' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'}>
                  {member.status === 'active' ? 'Activo' : 'Vencido'}
                </Badge>
              </div>
              <div className="p-3 rounded-xl border-2 border-gray-200 bg-gray-50 mb-4">
                <p className="text-xs text-gray-500 mb-1">Vence en</p>
                <p className={`text-3xl font-bold ${member.daysLeft < 10 ? 'text-red-600' : 'text-black'}`}>{member.daysLeft}</p>
                <p className="text-xs text-gray-500">días · {member.expirationDate}</p>
              </div>
              <div className="space-y-2 text-xs text-left">
                <div className="flex items-center gap-2 text-gray-700"><Phone className="w-3.5 h-3.5 text-gray-400"/>{member.phone}</div>
                <div className="flex items-center gap-2 text-gray-700"><Mail className="w-3.5 h-3.5 text-gray-400"/>{member.email}</div>
                <div className="flex items-center gap-2 text-gray-700"><MapPin className="w-3.5 h-3.5 text-gray-400"/>{member.address}</div>
                <div className="flex items-center gap-2 text-gray-700"><Calendar className="w-3.5 h-3.5 text-gray-400"/>Nac. {member.birthdate}</div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="space-y-2">
            <Button className="w-full bg-black text-white hover:bg-gray-800 h-10 font-semibold text-sm">Renovar Membresía</Button>
            <Button variant="outline" className="w-full border-2 border-gray-300 h-10 font-semibold text-sm">Editar Perfil</Button>
            <Button variant="outline" className="w-full border-2 border-gray-300 h-10 font-semibold text-sm">Registrar Pago Manual</Button>
            <Button variant="outline" className="w-full border-2 border-red-300 text-red-600 hover:bg-red-50 h-10 font-semibold text-sm">Desactivar Socio</Button>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <Tabs defaultValue="pagos" className="flex-1 flex flex-col min-h-0">
            <TabsList className="flex-shrink-0 h-11 mb-4">
              <TabsTrigger value="pagos" className="text-sm font-semibold px-5"><CreditCard className="w-4 h-4 mr-1"/>Pagos</TabsTrigger>
              <TabsTrigger value="asistencia" className="text-sm font-semibold px-5"><TrendingUp className="w-4 h-4 mr-1"/>Asistencia</TabsTrigger>
              <TabsTrigger value="membresias" className="text-sm font-semibold px-5"><Calendar className="w-4 h-4 mr-1"/>Membresías</TabsTrigger>
              <TabsTrigger value="notas" className="text-sm font-semibold px-5"><FileText className="w-4 h-4 mr-1"/>Notas</TabsTrigger>
            </TabsList>

            {/* PAGOS */}
            <TabsContent value="pagos" className="flex-1 overflow-y-auto">
              <Card className="border-2 border-gray-200">
                <CardContent className="p-0">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b-2 border-gray-200 sticky top-0">
                      <tr>
                        {['Fecha','Concepto','Método','Monto','Estado'].map(h => (
                          <th key={h} className="text-left text-xs font-semibold text-gray-500 px-4 py-3 uppercase">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {MOCK_PAYMENTS.map((p, i) => (
                        <tr key={i} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-xs text-gray-500">{p.date}</td>
                          <td className="px-4 py-3 text-sm font-semibold text-black">{p.concept}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{p.method}</td>
                          <td className="px-4 py-3 text-sm font-bold text-black">${p.amount.toLocaleString()}</td>
                          <td className="px-4 py-3">
                            <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">{p.status}</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* ASISTENCIA */}
            <TabsContent value="asistencia" className="flex-1 overflow-y-auto space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <Card className="border-2 border-gray-200"><CardContent className="p-4 text-center"><p className="text-xs text-gray-500 mb-1">Días este mes</p><p className="text-3xl font-bold text-black">{member.attendedThisMonth}</p></CardContent></Card>
                <Card className="border-2 border-gray-200"><CardContent className="p-4 text-center"><p className="text-xs text-gray-500 mb-1">Promedio/semana</p><p className="text-3xl font-bold text-black">{member.avgPerWeek}</p></CardContent></Card>
                <Card className="border-2 border-gray-200"><CardContent className="p-4 text-center"><p className="text-xs text-gray-500 mb-1">Último check-in</p><p className="text-sm font-bold text-black mt-1">{member.lastCheckin}</p></CardContent></Card>
              </div>
              <Card className="border-2 border-gray-200">
                <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Días asistidos por mes</CardTitle></CardHeader>
                <CardContent>
                  <div className="flex items-end gap-3 h-36">
                    {ATTENDANCE_DATA.map((val, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <span className="text-xs font-bold text-black">{val}</span>
                        <div className="w-full bg-black rounded-t-md" style={{ height: `${(val / maxAttendance) * 100}px` }} />
                        <span className="text-xs text-gray-500">{MONTHS[i]}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* MEMBRESÍAS */}
            <TabsContent value="membresias" className="flex-1 overflow-y-auto space-y-3">
              {MOCK_MEMBERSHIPS.map((m, i) => (
                <Card key={i} className={`border-2 ${m.status === 'Activa' ? 'border-black' : 'border-gray-200'}`}>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-black">{m.plan}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{m.start} → {m.end}</p>
                    </div>
                    <Badge className={m.status === 'Activa' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-gray-100 text-gray-600 border-gray-200'}>
                      {m.status}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* NOTAS */}
            <TabsContent value="notas" className="flex-1 overflow-hidden flex flex-col gap-3">
              <div className="flex gap-2 flex-shrink-0">
                <textarea
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  placeholder="Agrega una nota sobre este socio..."
                  className="flex-1 p-3 rounded-xl border-2 border-gray-300 focus:border-black outline-none text-sm resize-none h-20"
                />
                <Button onClick={addNote} disabled={!note.trim()} className="bg-black text-white hover:bg-gray-800 self-end h-10 px-5">
                  Guardar
                </Button>
              </div>
              <div className="flex-1 overflow-y-auto space-y-3">
                {notes.map((n, i) => (
                  <Card key={i} className="border-2 border-gray-200">
                    <CardContent className="p-4">
                      <p className="text-sm text-black">{n.text}</p>
                      <p className="text-xs text-gray-400 mt-2">{n.date} · {n.author}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}