import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  ArrowLeft, Plus, Receipt, User,
  Building2, CheckCircle2, DollarSign, ChevronDown,
} from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle, DialogFooter,
} from "./ui/dialog";
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";

interface ShiftExpense {
  id: string;
  category: string;
  description: string;
  amount: number;
  notes: string;
  time: string;
}

const CATEGORIES = [
  "Mantenimiento",
  "Productos de Limpieza",
  "Compra de Productos",
  "Servicios (agua, luz)",
  "Papelería",
  "Gastos Varios",
];

const getCategoryColor = (cat: string) => {
  switch (cat) {
    case "Mantenimiento": return "bg-amber-100 text-amber-700 border-amber-200";
    case "Productos de Limpieza": return "bg-blue-100 text-blue-700 border-blue-200";
    case "Compra de Productos": return "bg-emerald-100 text-emerald-700 border-emerald-200";
    case "Servicios (agua, luz)": return "bg-purple-100 text-purple-700 border-purple-200";
    default: return "bg-gray-100 text-gray-600 border-gray-200";
  }
};

interface POSExpensesProps {
  onBack: () => void;
  cajeroName?: string;
  sucursal?: string;
}

export function POSExpenses({
  onBack,
  cajeroName = "Araceli Arandas",
  sucursal = "Sucursal Centro",
}: POSExpensesProps) {
  const [expenses, setExpenses] = useState<ShiftExpense[]>([
    { id: "e1", category: "Productos de Limpieza", description: "Cloro y jabón", amount: 180, notes: "", time: "08:30 AM" },
    { id: "e2", category: "Mantenimiento", description: "Foco fundido vestidor", amount: 45, notes: "Repuesto incluido", time: "10:10 AM" },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmSuccess, setConfirmSuccess] = useState(false);
  const [newExpense, setNewExpense] = useState({
    category: "", description: "", amount: "", notes: "",
  });

  const total = expenses.reduce((s, e) => s + e.amount, 0);

  const handleAdd = () => {
    if (!newExpense.category || !newExpense.description || !newExpense.amount) return;
    const expense: ShiftExpense = {
      id: `e${Date.now()}`,
      category: newExpense.category,
      description: newExpense.description,
      amount: parseFloat(newExpense.amount),
      notes: newExpense.notes,
      time: new Date().toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" }),
    };
    setExpenses([expense, ...expenses]);
    setConfirmSuccess(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setConfirmSuccess(false);
      setNewExpense({ category: "", description: "", amount: "", notes: "" });
    }, 1600);
  };

  const openModal = () => {
    setNewExpense({ category: "", description: "", amount: "", notes: "" });
    setConfirmSuccess(false);
    setIsModalOpen(true);
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="bg-white border-b-2 border-gray-200 px-6 py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button onClick={onBack} variant="outline" className="border-2 border-gray-300 font-semibold h-10">
              <ArrowLeft className="w-4 h-4 mr-2" /> Volver al POS
            </Button>
            <div>
              <h1 className="text-xl font-bold text-black flex items-center gap-2">
                <Receipt className="w-5 h-5" /> GASTOS DEL TURNO
              </h1>
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <span className="flex items-center gap-1"><User className="w-3 h-3" />{cajeroName}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Building2 className="w-3 h-3" />{sucursal}</span>
              </div>
            </div>
          </div>
          <Button onClick={openModal} className="bg-black text-white hover:bg-gray-800 h-10 font-semibold">
            <Plus className="w-4 h-4 mr-2" /> Registrar Gasto
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col p-6 space-y-5">
        {/* KPIs */}
        <div className="grid grid-cols-3 gap-4 flex-shrink-0">
          <Card className="border-2 border-red-200 bg-red-50">
            <CardContent className="p-4">
              <p className="text-xs text-red-600 uppercase tracking-wide mb-1">Total Gastos Turno</p>
              <p className="text-3xl font-bold text-red-700">${total.toLocaleString()}</p>
              <p className="text-xs text-gray-400 mt-1">{expenses.length} registros</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-gray-200">
            <CardContent className="p-4">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Mayor Gasto</p>
              <p className="text-3xl font-bold text-black">
                ${expenses.length > 0 ? Math.max(...expenses.map(e => e.amount)).toLocaleString() : 0}
              </p>
              <p className="text-xs text-gray-400 mt-1">En este turno</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-gray-200">
            <CardContent className="p-4">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Reportados al Admin</p>
              <p className="text-3xl font-bold text-black">{expenses.length}</p>
              <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Sincronizados
              </p>
            </CardContent>
          </Card>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto space-y-3">
          {expenses.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <Receipt className="w-14 h-14 mb-3 opacity-30" />
              <p className="text-sm">Sin gastos registrados en este turno</p>
            </div>
          ) : (
            expenses.map((exp) => (
              <div key={exp.id} className="flex items-center gap-4 p-4 rounded-xl border-2 border-gray-200 bg-white hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <ChevronDown className="w-5 h-5 text-red-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-black text-sm">{exp.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className={`text-xs ${getCategoryColor(exp.category)}`}>
                      {exp.category}
                    </Badge>
                    {exp.notes && <span className="text-xs text-gray-400">{exp.notes}</span>}
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-red-600 text-base">${exp.amount.toLocaleString()}</p>
                  <p className="text-xs text-gray-400">{exp.time}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer total */}
        {expenses.length > 0 && (
          <div className="flex-shrink-0 p-4 rounded-xl bg-gray-50 border-2 border-gray-200 flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-600 flex items-center gap-2">
              <DollarSign className="w-4 h-4" /> Total egresos del turno:
            </span>
            <span className="text-xl font-bold text-red-600">${total.toLocaleString()}</span>
          </div>
        )}
      </div>

      {/* Add Expense Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[440px]">
          {confirmSuccess ? (
            <div className="py-10 text-center">
              <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-black mb-1">Gasto Registrado</h3>
              <p className="text-sm text-gray-500">Se reportó automáticamente al Administrador</p>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Registrar Gasto del Turno</DialogTitle>
              </DialogHeader>
              <div className="py-4 space-y-4">
                <div>
                  <Label className="text-sm font-semibold mb-1.5 block">Categoría *</Label>
                  <Select
                    value={newExpense.category}
                    onValueChange={(v) => setNewExpense({ ...newExpense, category: v })}
                  >
                    <SelectTrigger className="h-11 border-2 border-gray-300">
                      <SelectValue placeholder="Selecciona categoría..." />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-semibold mb-1.5 block">Descripción *</Label>
                  <Input
                    placeholder="Ej: Compra de cloro y jabón"
                    value={newExpense.description}
                    onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                    className="h-11 border-2 border-gray-300 focus:border-black"
                  />
                </div>
                <div>
                  <Label className="text-sm font-semibold mb-1.5 block">Monto *</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">$</span>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={newExpense.amount}
                      onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                      className="h-11 pl-7 border-2 border-gray-300 focus:border-black"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-semibold mb-1.5 block">Notas (opcional)</Label>
                  <Textarea
                    placeholder="Información adicional..."
                    value={newExpense.notes}
                    onChange={(e) => setNewExpense({ ...newExpense, notes: e.target.value })}
                    className="border-2 border-gray-300 focus:border-black min-h-[70px] resize-none"
                  />
                </div>
                <p className="text-xs text-gray-400 text-center">
                  Este gasto quedará registrado en el corte de caja y será reportado al Administrador.
                </p>
              </div>
              <DialogFooter className="gap-2">
                <Button variant="outline" onClick={() => setIsModalOpen(false)} className="flex-1 h-11 border-2">
                  Cancelar
                </Button>
                <Button
                  onClick={handleAdd}
                  disabled={!newExpense.category || !newExpense.description || !newExpense.amount}
                  className="flex-1 h-11 bg-black text-white hover:bg-gray-800"
                >
                  Registrar Gasto
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}