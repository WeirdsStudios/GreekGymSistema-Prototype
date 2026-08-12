import { MemberProfile } from "./MemberProfile";
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Search, Plus, MoreHorizontal, Filter, Download } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface Member {
  id: string;
  name: string;
  email: string;
  membershipType: string;
  status: 'active' | 'inactive' | 'expired' | 'pending';
  joinDate: string;
  avatar?: string;
}



// Generating many members for scroll demo
const generateMembers = (count: number): Member[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `${i + 1}`,
    name: ['Juan Pérez', 'Maria Garcia', 'Carlos Lopez', 'Ana Martinez', 'Luis Rodriguez'][i % 5] + ` ${i + 1}`,
    email: `usuario${i + 1}@ejemplo.com`,
    membershipType: ['Premium', 'Estándar', 'Estudiante', 'Corporativo'][i % 4],
    status: (['active', 'active', 'inactive', 'expired', 'pending'][i % 5]) as any,
    joinDate: new Date(2023, i % 12, (i % 28) + 1).toISOString(),
    avatar: `/api/placeholder/40/40?text=${i}`
  }));
};

const mockMembers = generateMembers(25);

export function Members() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
 if (selectedMemberId) {
    return (
      <MemberProfile
        memberId={selectedMemberId}
        onBack={() => setSelectedMemberId(null)}
      />
    );
  }
  const filteredMembers = mockMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || member.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-none">Activo</Badge>;
      case 'inactive':
        return <Badge className="bg-slate-100 text-slate-600 hover:bg-slate-100 border-none">Inactivo</Badge>;
      case 'expired':
        return <Badge className="bg-rose-100 text-rose-800 hover:bg-rose-100 border-none">Vencido</Badge>;
      case 'pending':
        return <Badge className="bg-[#D4AF37] text-[#090909] hover:bg-[#FCDE7C] border-none">Pendiente</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-[1200px] mx-auto h-[calc(100vh-80px)] flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-[#090909]">Miembros</h1>
          <p className="text-slate-500">Gestión de base de datos de clientes.</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Exportar CSV
            </Button>
            <Button className="bg-[#D4AF37] hover:bg-[#FCDE7C] text-[#090909] font-semibold gap-2">
              <Plus className="w-4 h-4" />
              Nuevo Miembro
            </Button>
        </div>
      </div>

      {/* Filters Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row gap-4 shrink-0 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input
            placeholder="Buscar por nombre, email o ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-slate-200 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
             <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px] border-slate-200">
                <Filter className="w-4 h-4 mr-2 text-slate-400" />
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="active">Activo</SelectItem>
                <SelectItem value="inactive">Inactivo</SelectItem>
                <SelectItem value="expired">Vencido</SelectItem>
                <SelectItem value="pending">Pendiente</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all_plans">
              <SelectTrigger className="w-[180px] border-slate-200">
                 <SelectValue placeholder="Membresía" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all_plans">Todos los planes</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="standard">Estándar</SelectItem>
              </SelectContent>
            </Select>
        </div>
      </div>

      {/* Table Container */}
      <Card className="flex-1 overflow-hidden border-slate-200 shadow-sm flex flex-col">
        <div className="overflow-auto flex-1">
            <Table>
              <TableHeader className="sticky top-0 bg-white z-10 shadow-sm">
                <TableRow className="hover:bg-transparent border-slate-200">
                  <TableHead className="w-[300px] font-bold text-[#090909]">Miembro</TableHead>
                  <TableHead className="font-bold text-[#090909]">Membresía</TableHead>
                  <TableHead className="font-bold text-[#090909]">Estado</TableHead>
                  <TableHead className="font-bold text-[#090909]">Fecha de Ingreso</TableHead>
                  <TableHead className="text-right font-bold text-[#090909]">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.map((member) => (
                  <TableRow
                    key={member.id}
                    className="hover:bg-slate-50 border-slate-100 cursor-pointer"
                    onClick={() => setSelectedMemberId(member.id)}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-9 h-9 border border-slate-200">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback className="bg-[#FCDE7C] text-[#D4AF37] font-bold">
                            {member.name.substring(0,2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold text-[#090909]">{member.name}</div>
                          <div className="text-xs text-slate-500">{member.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                       <span className="font-medium text-[#099009]">{member.membershipType}</span>
                    </TableCell>
                    <TableCell>{getStatusBadge(member.status)}</TableCell>
                    <TableCell className="text-slate-600">
                        {new Date(member.joinDate).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-[#090909]">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Ver perfil</DropdownMenuItem>
                          <DropdownMenuItem>Editar suscripción</DropdownMenuItem>
                          <DropdownMenuItem className="text-rose-600 focus:text-rose-600">Bloquear acceso</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
        </div>
        {/* Pagination Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-sm text-slate-500 shrink-0">
             <span>Mostrando {filteredMembers.length} resultados</span>
             <div className="flex gap-2">
                 <Button variant="outline" size="sm" disabled>Anterior</Button>
                 <Button variant="outline" size="sm">Siguiente</Button>
             </div>
        </div>
      </Card>
    </div>
  );
}
