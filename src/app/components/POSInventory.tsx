import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  ArrowLeft,
  Search,
  Package,
  Plus,
  Minus,
  ChevronUp,
  ChevronDown,
  CheckCircle2,
  AlertTriangle,
  Clock,
  User,
  Building2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";

interface Product {
  id: string;
  code: string;
  name: string;
  stock: number;
  minStock: number;
}

interface Movement {
  id: string;
  product: string;
  type: "entrada" | "salida";
  quantity: number;
  reason: string;
  time: string;
}

const INITIAL_PRODUCTS: Product[] = [
  { id: "p1", code: "PROD-001", name: "Proteína 1kg", stock: 25, minStock: 10 },
  { id: "p2", code: "PROD-002", name: "Creatina 300g", stock: 3, minStock: 10 },
  { id: "p3", code: "PROD-003", name: "Toalla Greek Gym", stock: 45, minStock: 20 },
  { id: "p4", code: "PROD-004", name: "Botella de Agua", stock: 60, minStock: 15 },
  { id: "p5", code: "PROD-005", name: "Candado", stock: 8, minStock: 10 },
  { id: "p6", code: "PROD-006", name: "Guantes Gym", stock: 22, minStock: 10 },
  { id: "p7", code: "PROD-007", name: "Shaker", stock: 35, minStock: 10 },
  { id: "p8", code: "PROD-008", name: "Banda Elástica", stock: 28, minStock: 10 },
];

const ENTRY_REASONS = [
  "Compra / Reabastecimiento",
  "Devolución de cliente",
  "Corrección de inventario",
  "Otro",
];

const EXIT_REASONS = [
  "Venta directa",
  "Producto dañado",
  "Muestra o regalo",
  "Corrección de inventario",
  "Otro",
];

interface POSInventoryProps {
  onBack: () => void;
  cajeroName?: string;
  sucursal?: string;
}

export function POSInventory({
  onBack,
  cajeroName = "Araceli Arandas",
  sucursal = "Sucursal Centro",
}: POSInventoryProps) {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<"todos" | "bajo" | "recientes">("todos");
  const [movements, setMovements] = useState<Movement[]>([
    { id: "m1", product: "Proteína 1kg", type: "entrada", quantity: 10, reason: "Compra / Reabastecimiento", time: "09:41 AM" },
    { id: "m2", product: "Creatina 300g", type: "salida", quantity: 2, reason: "Venta directa", time: "10:15 AM" },
    { id: "m3", product: "Toalla Greek Gym", type: "entrada", quantity: 20, reason: "Compra / Reabastecimiento", time: "11:02 AM" },
  ]);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalTab, setModalTab] = useState<"entrada" | "salida">("entrada");
  const [modalQty, setModalQty] = useState(1);
  const [modalReason, setModalReason] = useState("");
  const [modalNotes, setModalNotes] = useState("");
  const [confirmSuccess, setConfirmSuccess] = useState(false);

  // Add product modal state
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({ code: "", name: "", stock: "", minStock: "" });

  const filteredProducts = products.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFilter =
      activeFilter === "todos"
        ? true
        : activeFilter === "bajo"
        ? p.stock <= p.minStock
        : true;
    return matchSearch && matchFilter;
  });

  const openModal = (product: Product, type: "entrada" | "salida") => {
    setSelectedProduct(product);
    setModalTab(type);
    setModalQty(1);
    setModalReason("");
    setModalNotes("");
    setConfirmSuccess(false);
    setIsModalOpen(true);
  };

  const confirmMovement = () => {
    if (!selectedProduct || !modalReason) return;

    const newStock =
      modalTab === "entrada"
        ? selectedProduct.stock + modalQty
        : Math.max(0, selectedProduct.stock - modalQty);

    setProducts(
      products.map((p) =>
        p.id === selectedProduct.id ? { ...p, stock: newStock } : p
      )
    );

    const newMovement: Movement = {
      id: `m${Date.now()}`,
      product: selectedProduct.name,
      type: modalTab,
      quantity: modalQty,
      reason: modalReason,
      time: new Date().toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" }),
    };
    setMovements([newMovement, ...movements]);
    setConfirmSuccess(true);

    setTimeout(() => {
      setIsModalOpen(false);
      setConfirmSuccess(false);
    }, 1800);
  };

  const handleAddProduct = () => {
    if (!newProduct.code || !newProduct.name || !newProduct.stock) return;
    const product: Product = {
      id: `p${Date.now()}`,
      code: newProduct.code,
      name: newProduct.name,
      stock: parseInt(newProduct.stock),
      minStock: parseInt(newProduct.minStock) || 5,
    };
    setProducts([...products, product]);
    setNewProduct({ code: "", name: "", stock: "", minStock: "" });
    setIsAddProductOpen(false);
  };

  const lowStockCount = products.filter((p) => p.stock <= p.minStock).length;
  const todayMovements = movements.length;

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="bg-white border-b-2 border-gray-200 px-6 py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              onClick={onBack}
              variant="outline"
              className="border-2 border-gray-300 font-semibold h-10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al POS
            </Button>
            <div>
              <h1 className="text-xl font-bold text-black flex items-center gap-2">
                <Package className="w-5 h-5" />
                INVENTARIO
              </h1>
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <User className="w-3 h-3" /> {cajeroName}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Building2 className="w-3 h-3" /> {sucursal}
                </span>
              </div>
            </div>
          </div>
          <Button
            onClick={() => setIsAddProductOpen(true)}
            className="bg-black text-white hover:bg-gray-800 h-10 font-semibold"
          >
            <Plus className="w-4 h-4 mr-2" />
            Agregar Producto
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <Tabs defaultValue="inventario" className="flex-1 flex flex-col min-h-0">
          {/* KPIs + Search + Tabs header */}
          <div className="px-6 pt-5 pb-0 flex-shrink-0 space-y-4">
            {/* KPI Cards */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="border-2 border-gray-200">
                <CardContent className="p-4">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Total Productos</p>
                  <p className="text-3xl font-bold text-black">{products.length}</p>
                  <p className="text-xs text-gray-400 mt-1">En catálogo</p>
                </CardContent>
              </Card>
              <Card className={`border-2 ${lowStockCount > 0 ? "border-red-200 bg-red-50" : "border-gray-200"}`}>
                <CardContent className="p-4">
                  <p className={`text-xs uppercase tracking-wide mb-1 ${lowStockCount > 0 ? "text-red-600" : "text-gray-500"}`}>
                    Stock Bajo
                  </p>
                  <p className={`text-3xl font-bold ${lowStockCount > 0 ? "text-red-600" : "text-black"}`}>
                    {lowStockCount}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Requieren atención</p>
                </CardContent>
              </Card>
              <Card className="border-2 border-gray-200">
                <CardContent className="p-4">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Movimientos Hoy</p>
                  <p className="text-3xl font-bold text-black">{todayMovements}</p>
                  <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-green-600" />
                    Reportados al admin
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Tabs nav */}
            <TabsList className="grid w-full grid-cols-2 h-11">
              <TabsTrigger value="inventario" className="text-sm font-semibold">
                <Package className="w-4 h-4 mr-2" />
                Productos
              </TabsTrigger>
              <TabsTrigger value="historial" className="text-sm font-semibold">
                <Clock className="w-4 h-4 mr-2" />
                Movimientos del Turno
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Tab: Inventario */}
          <TabsContent value="inventario" className="flex-1 overflow-hidden flex flex-col mt-0 px-6 pt-4">
            {/* Search + filters */}
            <div className="flex items-center gap-3 mb-4 flex-shrink-0">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar producto por nombre o código..."
                  className="pl-10 h-11 border-2 border-gray-300 focus:border-black"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                {(["todos", "bajo", "recientes"] as const).map((f) => (
                  <Badge
                    key={f}
                    variant="outline"
                    className={`cursor-pointer px-3 py-1.5 text-xs capitalize ${
                      activeFilter === f
                        ? "bg-black text-white border-black"
                        : "border-gray-300 text-gray-600 hover:border-gray-500"
                    }`}
                    onClick={() => setActiveFilter(f)}
                  >
                    {f === "todos" ? "Todos" : f === "bajo" ? "Stock bajo" : "Recientes"}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="flex-1 overflow-y-auto border-2 border-gray-200 rounded-xl">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200 sticky top-0">
                  <tr>
                    <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 uppercase">Código</th>
                    <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 uppercase">Nombre</th>
                    <th className="text-center text-xs font-semibold text-gray-500 px-4 py-3 uppercase">Stock / Mín.</th>
                    <th className="text-center text-xs font-semibold text-gray-500 px-4 py-3 uppercase">Estado</th>
                    <th className="text-center text-xs font-semibold text-gray-500 px-4 py-3 uppercase">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredProducts.map((product) => {
                    const isLow = product.stock <= product.minStock;
                    return (
                      <tr key={product.id} className="bg-white hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-xs text-gray-400 font-mono">{product.code}</td>
                        <td className="px-4 py-3 font-semibold text-black text-sm">{product.name}</td>
                        <td className="px-4 py-3 text-center text-sm text-gray-700">
                          <span className={`font-bold ${isLow ? "text-red-600" : "text-black"}`}>
                            {product.stock}
                          </span>
                          <span className="text-gray-400"> / {product.minStock}</span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          {isLow ? (
                            <Badge className="bg-red-100 text-red-700 border-red-200 text-xs">
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              Stock Bajo
                            </Badge>
                          ) : (
                            <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Stock OK
                            </Badge>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center gap-2">
                            <Button
                              size="sm"
                              onClick={() => openModal(product, "entrada")}
                              className="bg-black text-white hover:bg-gray-800 h-8 w-8 p-0 rounded-full"
                              title="Agregar unidades"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => openModal(product, "salida")}
                              className="border-2 border-gray-300 h-8 w-8 p-0 rounded-full"
                              title="Quitar unidades"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-gray-400 hover:text-black text-xs h-8 px-2"
                            >
                              Editar
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </TabsContent>

          {/* Tab: Historial de movimientos */}
          <TabsContent value="historial" className="flex-1 overflow-hidden flex flex-col mt-0 px-6 pt-4">
            <div className="flex-1 overflow-y-auto space-y-2">
              {movements.length === 0 ? (
                <div className="text-center py-20 text-gray-400">
                  <Package className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">Sin movimientos en este turno</p>
                </div>
              ) : (
                movements.map((mov) => (
                  <div
                    key={mov.id}
                    className="flex items-center gap-4 p-4 rounded-xl border-2 border-gray-200 bg-white"
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        mov.type === "entrada"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {mov.type === "entrada" ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-black text-sm">{mov.product}</p>
                      <p className="text-xs text-gray-500">{mov.reason}</p>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-bold text-base ${
                          mov.type === "entrada" ? "text-green-700" : "text-red-600"
                        }`}
                      >
                        {mov.type === "entrada" ? "+" : "-"}
                        {mov.quantity} uds.
                      </p>
                      <p className="text-xs text-gray-400">{mov.time}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
            {movements.length > 0 && (
              <div className="mt-4 p-3 rounded-xl bg-green-50 border-2 border-green-200 flex items-center justify-between flex-shrink-0">
                <span className="text-sm text-green-800 font-semibold">
                  Total movimientos: {movements.length}
                </span>
                <span className="text-xs text-green-700 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  Reportados al Administrador
                </span>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Movement Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[460px]">
          {confirmSuccess ? (
            <div className="py-10 text-center">
              <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-black mb-1">Movimiento Registrado</h3>
              <p className="text-sm text-gray-500">Se notificó al Administrador de Sucursal</p>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="text-lg">
                  Registrar Movimiento — {selectedProduct?.name}
                </DialogTitle>
              </DialogHeader>
              <div className="py-2 space-y-5">
                {/* Stock actual */}
                <div className="text-center p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
                  <p className="text-xs text-gray-500 mb-1">Stock actual</p>
                  <p className="text-4xl font-bold text-black">{selectedProduct?.stock}</p>
                  <p className="text-xs text-gray-400">unidades</p>
                </div>

                {/* Tab entrada / salida */}
                <div className="flex gap-2">
                  {(["entrada", "salida"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setModalTab(t)}
                      className={`flex-1 py-2.5 rounded-xl border-2 text-sm font-semibold capitalize transition-all ${
                        modalTab === t
                          ? t === "entrada"
                            ? "border-green-600 bg-green-50 text-green-700"
                            : "border-red-500 bg-red-50 text-red-600"
                          : "border-gray-200 text-gray-500 hover:border-gray-400"
                      }`}
                    >
                      {t === "entrada" ? "↑ Entrada" : "↓ Salida / Ajuste"}
                    </button>
                  ))}
                </div>

                {/* Cantidad */}
                <div>
                  <Label className="text-sm font-semibold mb-2 block">Cantidad</Label>
                  <div className="flex items-center gap-4 justify-center">
                    <Button
                      variant="outline"
                      className="border-2 h-11 w-11 p-0"
                      onClick={() => setModalQty(Math.max(1, modalQty - 1))}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="text-4xl font-bold text-black w-16 text-center">{modalQty}</span>
                    <Button
                      variant="outline"
                      className="border-2 h-11 w-11 p-0"
                      onClick={() => setModalQty(modalQty + 1)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Motivo */}
                <div>
                  <Label className="text-sm font-semibold mb-2 block">Motivo *</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {(modalTab === "entrada" ? ENTRY_REASONS : EXIT_REASONS).map((r) => (
                      <button
                        key={r}
                        onClick={() => setModalReason(r)}
                        className={`p-2.5 rounded-lg border-2 text-xs text-left transition-all ${
                          modalReason === r
                            ? "border-black bg-gray-50 font-semibold"
                            : "border-gray-200 text-gray-600 hover:border-gray-400"
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Stock resultante preview */}
                {modalReason && (
                  <div
                    className={`p-3 rounded-xl border-2 text-sm font-semibold flex justify-between items-center ${
                      modalTab === "entrada"
                        ? "border-green-200 bg-green-50 text-green-700"
                        : "border-red-200 bg-red-50 text-red-700"
                    }`}
                  >
                    <span>Stock resultante:</span>
                    <span className="text-lg font-bold">
                      {modalTab === "entrada"
                        ? (selectedProduct?.stock ?? 0) + modalQty
                        : Math.max(0, (selectedProduct?.stock ?? 0) - modalQty)}{" "}
                      unidades
                    </span>
                  </div>
                )}

                <p className="text-xs text-gray-400 text-center">
                  Se notificará al Administrador de Sucursal al confirmar.
                </p>
              </div>
              <DialogFooter className="gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 h-11 border-2"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={confirmMovement}
                  disabled={!modalReason}
                  className="flex-1 h-11 bg-black text-white hover:bg-gray-800"
                >
                  Confirmar Movimiento
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Product Modal */}
      <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
        <DialogContent className="sm:max-w-[420px]">
          <DialogHeader>
            <DialogTitle>Agregar Nuevo Producto</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div>
              <Label className="mb-1.5 block text-sm">Código *</Label>
              <Input
                placeholder="Ej: PROD-013"
                value={newProduct.code}
                onChange={(e) => setNewProduct({ ...newProduct, code: e.target.value })}
                className="h-11 border-2 border-gray-300 focus:border-black"
              />
            </div>
            <div>
              <Label className="mb-1.5 block text-sm">Nombre del producto *</Label>
              <Input
                placeholder="Ej: Cuerda para saltar"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                className="h-11 border-2 border-gray-300 focus:border-black"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="mb-1.5 block text-sm">Stock inicial *</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                  className="h-11 border-2 border-gray-300 focus:border-black"
                />
              </div>
              <div>
                <Label className="mb-1.5 block text-sm">Stock mínimo</Label>
                <Input
                  type="number"
                  placeholder="5"
                  value={newProduct.minStock}
                  onChange={(e) => setNewProduct({ ...newProduct, minStock: e.target.value })}
                  className="h-11 border-2 border-gray-300 focus:border-black"
                />
              </div>
            </div>
            <p className="text-xs text-gray-400">
              Se notificará al Administrador cuando el stock baje del mínimo.
            </p>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsAddProductOpen(false)} className="flex-1 h-11 border-2">
              Cancelar
            </Button>
            <Button
              onClick={handleAddProduct}
              disabled={!newProduct.code || !newProduct.name || !newProduct.stock}
              className="flex-1 h-11 bg-black text-white hover:bg-gray-800"
            >
              Agregar Producto
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}