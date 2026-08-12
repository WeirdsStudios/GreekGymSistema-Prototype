import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  UserCircle,
  Calendar,
  Clock,
  Mail,
  Phone,
  Plus,
  Edit,
  Search,
  Dumbbell,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface Coach {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialties: string[];
  schedule: {
    day: string;
    hours: string;
  }[];
  status: 'active' | 'inactive';
  totalClients: number;
}

const MOCK_COACHES: Coach[] = [
  {
    id: '1',
    name: 'Diego Hernández',
    email: 'diego@greekgym.com',
    phone: '555-1001',
    specialties: ['Yoga', 'Pilates', 'Funcional'],
    schedule: [
      { day: 'Lunes', hours: '7:00 AM - 12:00 PM' },
      { day: 'Miércoles', hours: '7:00 AM - 12:00 PM' },
      { day: 'Viernes', hours: '7:00 AM - 12:00 PM' },
    ],
    status: 'active',
    totalClients: 24,
  },
  {
    id: '2',
    name: 'Patricia Ruiz',
    email: 'patricia@greekgym.com',
    phone: '555-1002',
    specialties: ['CrossFit', 'HIIT', 'Funcional'],
    schedule: [
      { day: 'Martes', hours: '6:00 AM - 2:00 PM' },
      { day: 'Jueves', hours: '6:00 AM - 2:00 PM' },
      { day: 'Sábado', hours: '8:00 AM - 1:00 PM' },
    ],
    status: 'active',
    totalClients: 31,
  },
  {
    id: '3',
    name: 'Roberto Silva',
    email: 'roberto@greekgym.com',
    phone: '555-1003',
    specialties: ['Musculación', 'Powerlifting', 'Nutrición'],
    schedule: [
      { day: 'Lunes', hours: '2:00 PM - 8:00 PM' },
      { day: 'Miércoles', hours: '2:00 PM - 8:00 PM' },
      { day: 'Viernes', hours: '2:00 PM - 8:00 PM' },
    ],
    status: 'active',
    totalClients: 18,
  },
  {
    id: '4',
    name: 'Laura Mendoza',
    email: 'laura@greekgym.com',
    phone: '555-1004',
    specialties: ['Zumba', 'Aerobics', 'Baile'],
    schedule: [
      { day: 'Martes', hours: '4:00 PM - 8:00 PM' },
      { day: 'Jueves', hours: '4:00 PM - 8:00 PM' },
    ],
    status: 'active',
    totalClients: 42,
  },
];

export function CoachManagement() {
  const [coaches, setCoaches] = useState<Coach[]>(MOCK_COACHES);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);

  const filteredCoaches = coaches.filter((coach) =>
    coach.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coach.specialties.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-black mb-2">Coaches y Entrenadores</h1>
          <p className="text-gray-600">
            Gestiona el personal de entrenamiento y sus horarios
          </p>
        </div>
        <Button
          onClick={() => setIsCreateDialogOpen(true)}
          className="bg-black text-white hover:bg-gray-800"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Coach
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 uppercase">
              Total Coaches
            </CardTitle>
            <UserCircle className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-black">{coaches.length}</div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 uppercase">
              Activos
            </CardTitle>
            <Dumbbell className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-black">
              {coaches.filter((c) => c.status === 'active').length}
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 uppercase">
              Total Clientes
            </CardTitle>
            <UserCircle className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-black">
              {coaches.reduce((sum, c) => sum + c.totalClients, 0)}
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 uppercase">
              Especialidades
            </CardTitle>
            <Calendar className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-black">
              {new Set(coaches.flatMap((c) => c.specialties)).size}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Buscar por nombre o especialidad..."
          className="pl-9"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Coaches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCoaches.map((coach) => (
          <Card key={coach.id} className="border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {coach.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{coach.name}</CardTitle>
                    <Badge
                      variant="outline"
                      className="text-xs mt-1 border-emerald-200 bg-emerald-50 text-emerald-700"
                    >
                      {coach.status === 'active' ? 'Activo' : 'Inactivo'}
                    </Badge>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedCoach(coach)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{coach.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{coach.phone}</span>
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Especialidades</p>
                <div className="flex flex-wrap gap-2">
                  {coach.specialties.map((specialty) => (
                    <Badge key={specialty} variant="outline" className="border-gray-300 text-gray-700">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Horario</p>
                <div className="space-y-1">
                  {coach.schedule.map((schedule, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                      <span className="font-semibold text-black">{schedule.day}</span>
                      <span className="text-gray-600">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
                <span className="text-xs text-gray-500 uppercase tracking-wide">Clientes Activos</span>
                <span className="text-xl font-bold text-black">{coach.totalClients}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Coach Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Registrar Nuevo Coach</DialogTitle>
            <DialogDescription>
              Completa la información del nuevo entrenador
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="coach-name">Nombre Completo</Label>
                <Input id="coach-name" placeholder="Ej: Diego Hernández" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="coach-phone">Teléfono</Label>
                <Input id="coach-phone" placeholder="555-1001" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="coach-email">Correo Electrónico</Label>
              <Input id="coach-email" type="email" placeholder="coach@greekgym.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="coach-specialties">Especialidades (separadas por coma)</Label>
              <Input id="coach-specialties" placeholder="Yoga, Pilates, Funcional" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancelar
            </Button>
            <Button className="bg-black text-white hover:bg-gray-800">
              Registrar Coach
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Coach Details Dialog */}
      {selectedCoach && (
        <Dialog open={!!selectedCoach} onOpenChange={() => setSelectedCoach(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Detalles del Coach</DialogTitle>
              <DialogDescription>
                Información y horarios de {selectedCoach.name}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  {selectedCoach.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black">{selectedCoach.name}</h3>
                  <Badge className="bg-emerald-100 text-emerald-700 border-emerald-300 mt-1">
                    {selectedCoach.totalClients} clientes activos
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500 mb-1">Correo</p>
                  <p className="font-semibold text-black">{selectedCoach.email}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Teléfono</p>
                  <p className="font-semibold text-black">{selectedCoach.phone}</p>
                </div>
              </div>

              <div>
                <p className="text-gray-500 mb-2">Especialidades</p>
                <div className="flex flex-wrap gap-2">
                  {selectedCoach.specialties.map((specialty) => (
                    <Badge key={specialty} className="bg-black text-white">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-gray-500 mb-3">Horario Semanal</p>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Día</TableHead>
                      <TableHead>Horario</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedCoach.schedule.map((schedule, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-semibold">{schedule.day}</TableCell>
                        <TableCell>{schedule.hours}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedCoach(null)}>
                Cerrar
              </Button>
              <Button className="bg-black text-white hover:bg-gray-800">
                Editar Información
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
