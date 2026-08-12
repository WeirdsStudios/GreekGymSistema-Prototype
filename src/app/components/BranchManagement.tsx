import { BranchDetail } from "./BranchDetail";
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
  Building2,
  MapPin,
  Users,
  DollarSign,
  Plus,
  Edit,
  Trash2,
  Search,
  MoreVertical,
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Branch } from "../types/user";

interface BranchWithStats extends Branch {
  members: number;
  revenue: number;
  staff: number;
}


const MOCK_BRANCHES: BranchWithStats[] = [
  {
    id: '1',
    name: 'Sucursal Centro',
    address: 'Av. Principal 123, Col. Centro',
    isActive: true,
    members: 547,
    revenue: 234500,
    staff: 12,
  },
  {
    id: '2',
    name: 'Sucursal Norte',
    address: 'Calle Norte 456, Col. Residencial',
    isActive: true,
    members: 423,
    revenue: 189200,
    staff: 9,
  },
  {
    id: '3',
    name: 'Sucursal Sur',
    address: 'Blvd. Sur 789, Col. Industrial',
    isActive: true,
    members: 277,
    revenue: 145800,
    staff: 7,
  },
];

export function BranchManagement() {
  
  const [branches, setBranches] = useState<BranchWithStats[]>(MOCK_BRANCHES);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<BranchWithStats | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
  });
  const [viewingBranchId, setViewingBranchId] = useState<string | null>(null);
  const filteredBranches = branches.filter((branch) =>
    branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    branch.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = () => {
    const newBranch: BranchWithStats = {
      id: (branches.length + 1).toString(),
      name: formData.name,
      address: formData.address,
      isActive: true,
      members: 0,
      revenue: 0,
      staff: 0,
    };
    setBranches([...branches, newBranch]);
    setIsCreateDialogOpen(false);
    setFormData({ name: '', address: '' });
  };

  const handleEdit = () => {
    if (!selectedBranch) return;
    setBranches(
      branches.map((b) =>
        b.id === selectedBranch.id
          ? { ...b, name: formData.name, address: formData.address }
          : b
      )
    );
    setIsEditDialogOpen(false);
    setSelectedBranch(null);
    setFormData({ name: '', address: '' });
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro de que deseas eliminar esta sucursal?')) {
      setBranches(branches.filter((b) => b.id !== id));
    }
  };

  const openEditDialog = (branch: BranchWithStats) => {
    setSelectedBranch(branch);
    setFormData({ name: branch.name, address: branch.address });
    setIsEditDialogOpen(true);
  };
  
if (viewingBranchId) {
    const branch = branches.find(b => b.id === viewingBranchId);
    if (branch) {
      return (
        <BranchDetail
          branch={branch}
          onBack={() => setViewingBranchId(null)}
        />
      );
    }
  }
  
  const totalMembers = branches.reduce((sum, b) => sum + b.members, 0);
  const totalRevenue = branches.reduce((sum, b) => sum + b.revenue, 0);
  const totalStaff = branches.reduce((sum, b) => sum + b.staff, 0);

  
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-black mb-2">Gestión de Sucursales</h1>
          <p className="text-gray-600">
            Administra todas las sucursales de Greek Gym desde un solo lugar
          </p>
        </div>
        <Button
          onClick={() => setIsCreateDialogOpen(true)}
          className="bg-black text-white hover:bg-gray-800"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nueva Sucursal
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 uppercase">
              Total Sucursales
            </CardTitle>
            <Building2 className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-black">{branches.length}</div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 uppercase">
              Total Miembros
            </CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-black">{totalMembers.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 uppercase">
              Ingresos Totales
            </CardTitle>
            <DollarSign className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-black">
              ${totalRevenue.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 uppercase">
              Personal Total
            </CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-black">{totalStaff}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Buscar sucursales..."
          className="pl-9"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Branches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBranches.map((branch) => (
          <Card
            key={branch.id}
            className="border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setViewingBranchId(branch.id)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{branch.name}</CardTitle>
                    <Badge
                      variant="outline"
                      className={`text-xs mt-1 ${
                        branch.isActive
                          ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                          : 'border-gray-300 bg-gray-50 text-gray-600'
                      }`}
                    >
                      {branch.isActive ? 'Activa' : 'Inactiva'}
                    </Badge>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => openEditDialog(branch)}>
                      <Edit className="w-4 h-4 mr-2" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDelete(branch.id)}
                      className="text-rose-600"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Eliminar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{branch.address}</span>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-3 border-t border-gray-200">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Miembros</p>
                  <p className="text-lg font-bold text-black">{branch.members}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Ingresos</p>
                  <p className="text-lg font-bold text-black">${(branch.revenue / 1000).toFixed(0)}K</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Personal</p>
                  <p className="text-lg font-bold text-black">{branch.staff}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crear Nueva Sucursal</DialogTitle>
            <DialogDescription>
              Ingresa los datos de la nueva sucursal
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre de la Sucursal</Label>
              <Input
                id="name"
                placeholder="Ej: Sucursal Centro"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Dirección</Label>
              <Input
                id="address"
                placeholder="Ej: Av. Principal 123, Col. Centro"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleCreate}
              disabled={!formData.name || !formData.address}
              className="bg-black text-white hover:bg-gray-800"
            >
              Crear Sucursal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Sucursal</DialogTitle>
            <DialogDescription>
              Modifica los datos de la sucursal
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Nombre de la Sucursal</Label>
              <Input
                id="edit-name"
                placeholder="Ej: Sucursal Centro"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-address">Dirección</Label>
              <Input
                id="edit-address"
                placeholder="Ej: Av. Principal 123, Col. Centro"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleEdit}
              disabled={!formData.name || !formData.address}
              className="bg-black text-white hover:bg-gray-800"
            >
              Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
