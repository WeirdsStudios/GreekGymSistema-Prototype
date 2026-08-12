import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import {
  Plus,
  Search,
  Filter,
  Receipt,
  Calendar as CalendarIcon,
  DollarSign,
  X,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";

interface Expense {
  id: string;
  category: string;
  amount: number;
  date: string;
  description: string;
  notes?: string;
}

const EXPENSE_CATEGORIES = [
  "Luz y Agua",
  "Renta",
  "Nómina",
  "Mantenimiento",
  "Equipamiento",
  "Marketing",
  "Servicios Profesionales",
  "Productos de Limpieza",
  "Otros",
];

const MOCK_EXPENSES: Expense[] = [
  { id: "1", category: "Luz y Agua", amount: 3500, date: "2024-06-01", description: "Pago mensual CFE", notes: "Incluye recargos" },
  { id: "2", category: "Renta", amount: 25000, date: "2024-06-01", description: "Renta mensual local", notes: "" },
  { id: "3", category: "Nómina", amount: 45000, date: "2024-06-05", description: "Nómina primera quincena", notes: "12 empleados" },
  { id: "4", category: "Mantenimiento", amount: 2800, date: "2024-06-10", description: "Reparación caminadora", notes: "Modelo XR-500" },
  { id: "5", category: "Productos de Limpieza", amount: 850, date: "2024-06-12", description: "Compra mensual productos limpieza", notes: "" },
  { id: "6", category: "Marketing", amount: 5200, date: "2024-06-15", description: "Campaña redes sociales", notes: "Facebook + Instagram" },
  { id: "7", category: "Nómina", amount: 45000, date: "2024-06-20", description: "Nómina segunda quincena", notes: "12 empleados" },
  { id: "8", category: "Equipamiento", amount: 12000, date: "2024-06-22", description: "Nuevas mancuernas", notes: "Set completo 5-50kg" },
];

export function Expenses() {
  const [expenses, setExpenses] = useState<Expense[]>(MOCK_EXPENSES);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [newExpense, setNewExpense] = useState({
    category: "",
    amount: "",
    date: "",
    description: "",
    notes: "",
  });

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch = 
      expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.notes?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === "all" || expense.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

  const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  const handleAddExpense = () => {
    if (newExpense.category && newExpense.amount && newExpense.date && newExpense.description) {
      const expense: Expense = {
        id: (expenses.length + 1).toString(),
        category: newExpense.category,
        amount: parseFloat(newExpense.amount),
        date: newExpense.date,
        description: newExpense.description,
        notes: newExpense.notes,
      };
      setExpenses([expense, ...expenses]);
      setIsAddExpenseOpen(false);
      setNewExpense({
        category: "",
        amount: "",
        date: "",
        description: "",
        notes: "",
      });
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Luz y Agua":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "Renta":
        return "bg-purple-100 text-purple-700 border-purple-300";
      case "Nómina":
        return "bg-rose-100 text-rose-700 border-rose-300";
      case "Mantenimiento":
        return "bg-amber-100 text-amber-700 border-amber-300";
      case "Equipamiento":
        return "bg-emerald-100 text-emerald-700 border-emerald-300";
      case "Marketing":
        return "bg-pink-100 text-pink-700 border-pink-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  return (
    <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-black mb-1">Gastos</h1>
            <p className="text-gray-600">Registro y control de gastos operativos</p>
          </div>
          <Button
            onClick={() => setIsAddExpenseOpen(true)}
            className="bg-black text-white hover:bg-gray-800 h-11 font-semibold"
          >
            <Plus className="w-4 h-4 mr-2" />
            Registrar Gasto
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-rose-100 rounded-lg">
                <Receipt className="w-5 h-5 text-rose-600" />
              </div>
              <span className="text-sm text-gray-600 font-medium">Total Gastos</span>
            </div>
            <p className="text-3xl font-bold text-black">${totalExpenses.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-1">{filteredExpenses.length} transacciones</p>
          </div>

          <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-amber-100 rounded-lg">
                <CalendarIcon className="w-5 h-5 text-amber-600" />
              </div>
              <span className="text-sm text-gray-600 font-medium">Este Mes</span>
            </div>
            <p className="text-3xl font-bold text-black">$127,350</p>
            <p className="text-xs text-gray-500 mt-1">8 gastos registrados</p>
          </div>

          <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <DollarSign className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-sm text-gray-600 font-medium">Promedio Mensual</span>
            </div>
            <p className="text-3xl font-bold text-black">$115,200</p>
            <p className="text-xs text-gray-500 mt-1">Últimos 6 meses</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por descripción o notas..."
                className="pl-10 h-11 border-2 border-gray-300 focus:border-black"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full sm:w-[250px] h-11 border-2 border-gray-300">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Todas las categorías" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                {EXPENSE_CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Expenses List */}
        <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Categoría
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Descripción
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Notas
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Monto
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredExpenses.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <Receipt className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-sm text-gray-600 font-semibold">No se encontraron gastos</p>
                      <p className="text-xs text-gray-500 mt-1">Intenta cambiar los filtros de búsqueda</p>
                    </td>
                  </tr>
                ) : (
                  filteredExpenses.map((expense) => (
                    <tr key={expense.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 font-medium">
                          {new Date(expense.date).toLocaleDateString('es-MX', { 
                            day: '2-digit', 
                            month: 'short', 
                            year: 'numeric' 
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant="outline" className={`${getCategoryColor(expense.category)} font-medium`}>
                          {expense.category}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-semibold text-black">{expense.description}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600 max-w-xs truncate">
                          {expense.notes || "-"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="text-base font-bold text-rose-600">
                          ${expense.amount.toLocaleString()}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Expense Dialog */}
      <Dialog open={isAddExpenseOpen} onOpenChange={setIsAddExpenseOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-xl">Registrar Nuevo Gasto</DialogTitle>
            <DialogDescription>
              Completa la información del gasto para registrarlo en el sistema
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Categoría *</Label>
                <Select
                  value={newExpense.category}
                  onValueChange={(value) => setNewExpense({ ...newExpense, category: value })}
                >
                  <SelectTrigger id="category" className="h-11">
                    <SelectValue placeholder="Selecciona categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {EXPENSE_CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Monto *</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                  className="h-11"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Fecha *</Label>
              <Input
                id="date"
                type="date"
                value={newExpense.date}
                onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descripción *</Label>
              <Input
                id="description"
                placeholder="Ej: Pago mensual de luz"
                value={newExpense.description}
                onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notas (opcional)</Label>
              <Textarea
                id="notes"
                placeholder="Información adicional sobre el gasto..."
                value={newExpense.notes}
                onChange={(e) => setNewExpense({ ...newExpense, notes: e.target.value })}
                className="min-h-[80px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddExpenseOpen(false)}
              className="h-11"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleAddExpense}
              disabled={!newExpense.category || !newExpense.amount || !newExpense.date || !newExpense.description}
              className="bg-black hover:bg-gray-800 h-11"
            >
              <Plus className="w-4 h-4 mr-2" />
              Registrar Gasto
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
