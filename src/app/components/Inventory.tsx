import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import {
  Plus,
  Search,
  Package,
  Edit,
  AlertTriangle,
  CheckCircle,
  Calendar,
  DollarSign,
  Barcode,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface Product {
  id: string;
  code: string;
  name: string;
  category: 'product' | 'membership' | 'service';
  price: number;
  stock?: number;
  minStock?: number;
  duration?: string;
  benefits?: string;
}

const MOCK_PRODUCTS: Product[] = [
  { id: 'p1', code: 'PROD-001', name: 'Proteína 1kg', category: 'product', price: 450, stock: 25, minStock: 10 },
  { id: 'p2', code: 'PROD-002', name: 'Creatina 300g', category: 'product', price: 380, stock: 18, minStock: 10 },
  { id: 'p3', code: 'PROD-003', name: 'Toalla Greek Gym', category: 'product', price: 200, stock: 45, minStock: 20 },
  { id: 'p4', code: 'PROD-004', name: 'Botella de Agua', category: 'product', price: 100, stock: 60, minStock: 30 },
  { id: 'p5', code: 'PROD-005', name: 'Candado', category: 'product', price: 80, stock: 30, minStock: 15 },
  { id: 'p6', code: 'PROD-006', name: 'Guantes Gym', category: 'product', price: 250, stock: 22, minStock: 10 },
  { id: 'p7', code: 'PROD-007', name: 'Shaker', category: 'product', price: 120, stock: 35, minStock: 15 },
  { id: 'p8', code: 'PROD-008', name: 'Banda Elástica', category: 'product', price: 180, stock: 28, minStock: 15 },
  { id: 'm1', code: 'MEM-PREM-1M', name: 'Premium', category: 'membership', price: 1200, duration: '1 Mes', benefits: 'Acceso completo + clases' },
  { id: 'm2', code: 'MEM-PREM-3M', name: 'Premium 3 Meses', category: 'membership', price: 3300, duration: '3 Meses', benefits: 'Acceso completo + clases' },
  { id: 's1', code: 'SRV-CL1', name: 'Clase Individual', category: 'service', price: 150, duration: '1 hora' },
  { id: 's2', code: 'SRV-PT', name: 'Entrenamiento Personal', category: 'service', price: 400, duration: '1 hora' },
];

export function Inventory() {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isEditProductOpen, setIsEditProductOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'product' | 'membership' | 'service'>('all');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState({
    code: '',
    name: '',
    category: 'product' as 'product' | 'membership' | 'service',
    price: '',
    stock: '',
    minStock: '',
    duration: '',
    benefits: '',
  });

  const filteredProducts = products.filter((product) => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.code.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const productsWithStock = filteredProducts.filter(p => p.category === 'product');
  const lowStockProducts = productsWithStock.filter(p => p.stock && p.minStock && p.stock < p.minStock);

  const handleAddProduct = () => {
    if (newProduct.code && newProduct.name && newProduct.price) {
      const product: Product = {
        id: `new-${products.length + 1}`,
        code: newProduct.code,
        name: newProduct.name,
        category: newProduct.category,
        price: parseFloat(newProduct.price),
        ...(newProduct.category === 'product' && {
          stock: parseInt(newProduct.stock) || 0,
          minStock: parseInt(newProduct.minStock) || 0,
        }),
        ...(newProduct.category !== 'product' && {
          duration: newProduct.duration,
          ...(newProduct.category === 'membership' && { benefits: newProduct.benefits }),
        }),
      };
      setProducts([...products, product]);
      setIsAddProductOpen(false);
      resetForm();
    }
  };

  const handleEditProduct = () => {
    if (editingProduct && newProduct.code && newProduct.name && newProduct.price) {
      const updatedProduct: Product = {
        id: editingProduct.id,
        code: newProduct.code,
        name: newProduct.name,
        category: newProduct.category,
        price: parseFloat(newProduct.price),
        ...(newProduct.category === 'product' && {
          stock: parseInt(newProduct.stock) || 0,
          minStock: parseInt(newProduct.minStock) || 0,
        }),
        ...(newProduct.category !== 'product' && {
          duration: newProduct.duration,
          ...(newProduct.category === 'membership' && { benefits: newProduct.benefits }),
        }),
      };
      setProducts(products.map(p => p.id === editingProduct.id ? updatedProduct : p));
      setIsEditProductOpen(false);
      setEditingProduct(null);
      resetForm();
    }
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setNewProduct({
      code: product.code,
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      stock: product.stock?.toString() || '',
      minStock: product.minStock?.toString() || '',
      duration: product.duration || '',
      benefits: product.benefits || '',
    });
    setIsEditProductOpen(true);
  };

  const resetForm = () => {
    setNewProduct({
      code: '',
      name: '',
      category: 'product',
      price: '',
      stock: '',
      minStock: '',
      duration: '',
      benefits: '',
    });
  };

  const getStockBadge = (product: Product) => {
    if (product.category !== 'product' || !product.stock || !product.minStock) return null;
    
    if (product.stock < product.minStock) {
      return (
        <Badge className="bg-rose-100 text-rose-700 border-rose-300 flex items-center gap-1">
          <AlertTriangle className="w-3 h-3" />
          Stock Bajo
        </Badge>
      );
    }
    return (
      <Badge className="bg-emerald-100 text-emerald-700 border-emerald-300 flex items-center gap-1">
        <CheckCircle className="w-3 h-3" />
        Stock OK
      </Badge>
    );
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'product': return 'Producto';
      case 'membership': return 'Membresía';
      case 'service': return 'Servicio';
      default: return category;
    }
  };

  return (
    <div className="flex-1 p-4 sm:p-6 bg-gray-50 overflow-y-auto">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-black mb-1">Inventario</h1>
            <p className="text-sm sm:text-base text-gray-600">Gestión de productos, membresías y servicios</p>
          </div>
          <Button
            onClick={() => {
              resetForm();
              setIsAddProductOpen(true);
            }}
            className="w-full sm:w-auto bg-black text-white hover:bg-gray-800 h-11 font-semibold"
          >
            <Plus className="w-4 h-4 mr-2" />
            Agregar Producto
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border-2 border-gray-200 p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              </div>
              <span className="text-xs sm:text-sm text-gray-600 font-medium">Total Productos</span>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-black">{productsWithStock.length}</p>
            <p className="text-xs text-gray-500 mt-1">En catálogo</p>
          </div>

          <div className="bg-white rounded-xl border-2 border-gray-200 p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-amber-100 rounded-lg">
                <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
              </div>
              <span className="text-xs sm:text-sm text-gray-600 font-medium">Stock Bajo</span>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-black">{lowStockProducts.length}</p>
            <p className="text-xs text-gray-500 mt-1">Requieren reabastecimiento</p>
          </div>

          <div className="bg-white rounded-xl border-2 border-gray-200 p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
              </div>
              <span className="text-xs sm:text-sm text-gray-600 font-medium">Membresías</span>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-black">
              {products.filter(p => p.category === 'membership').length}
            </p>
            <p className="text-xs text-gray-500 mt-1">Planes disponibles</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por nombre o código..."
                className="pl-10 h-11 border-2 border-gray-300 focus:border-black"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={selectedCategory} onValueChange={(v) => setSelectedCategory(v as any)} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 h-11">
            <TabsTrigger value="all" className="text-xs sm:text-sm font-semibold">Todos</TabsTrigger>
            <TabsTrigger value="product" className="text-xs sm:text-sm font-semibold">Productos</TabsTrigger>
            <TabsTrigger value="membership" className="text-xs sm:text-sm font-semibold">Membresías</TabsTrigger>
            <TabsTrigger value="service" className="text-xs sm:text-sm font-semibold">Servicios</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedCategory} className="space-y-4">
            {/* Mobile View - Cards */}
            <div className="block sm:hidden space-y-3">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-xl border-2 border-gray-200 p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="border-gray-300 text-gray-700 text-xs">
                          {getCategoryLabel(product.category)}
                        </Badge>
                        {getStockBadge(product)}
                      </div>
                      <h3 className="font-bold text-black text-base">{product.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">{product.code}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditDialog(product)}
                      className="flex-shrink-0"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <div>
                      <p className="text-xs text-gray-600">Precio</p>
                      <p className="text-lg font-bold text-black">${product.price}</p>
                    </div>
                    {product.stock !== undefined && (
                      <div className="text-right">
                        <p className="text-xs text-gray-600">Stock</p>
                        <p className="text-lg font-bold text-black">{product.stock}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop View - Table */}
            <div className="hidden sm:block bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b-2 border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Código
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Nombre
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Categoría
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Precio
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Stock
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Estado
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredProducts.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-6 py-12 text-center">
                          <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                          <p className="text-sm text-gray-600 font-semibold">No se encontraron productos</p>
                          <p className="text-xs text-gray-500 mt-1">Intenta cambiar los filtros de búsqueda</p>
                        </td>
                      </tr>
                    ) : (
                      filteredProducts.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <Barcode className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-900 font-mono">{product.code}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm font-semibold text-black">{product.name}</div>
                            {product.duration && (
                              <div className="text-xs text-gray-500 mt-1">{product.duration}</div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge variant="outline" className="border-gray-300 text-gray-700">
                              {getCategoryLabel(product.category)}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-base font-bold text-black">${product.price.toLocaleString()}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {product.stock !== undefined ? (
                              <div className="text-sm text-gray-900">
                                {product.stock} / {product.minStock}
                              </div>
                            ) : (
                              <span className="text-sm text-gray-400">-</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {getStockBadge(product) || <span className="text-sm text-gray-400">-</span>}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openEditDialog(product)}
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Editar
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add/Edit Product Dialog */}
      <Dialog open={isAddProductOpen || isEditProductOpen} onOpenChange={(open) => {
        if (!open) {
          setIsAddProductOpen(false);
          setIsEditProductOpen(false);
          setEditingProduct(null);
          resetForm();
        }
      }}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">
              {isEditProductOpen ? 'Editar Producto' : 'Agregar Nuevo Producto'}
            </DialogTitle>
            <DialogDescription>
              Completa la información del producto para {isEditProductOpen ? 'actualizarlo' : 'agregarlo'} al inventario
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="category">Categoría *</Label>
              <Select
                value={newProduct.category}
                onValueChange={(value: 'product' | 'membership' | 'service') => 
                  setNewProduct({ ...newProduct, category: value })
                }
              >
                <SelectTrigger id="category" className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="product">Producto</SelectItem>
                  <SelectItem value="membership">Membresía</SelectItem>
                  <SelectItem value="service">Servicio</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="code">Código *</Label>
                <Input
                  id="code"
                  placeholder="PROD-001"
                  value={newProduct.code}
                  onChange={(e) => setNewProduct({ ...newProduct, code: e.target.value })}
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Precio *</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="0.00"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  className="h-11"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Nombre *</Label>
              <Input
                id="name"
                placeholder="Nombre del producto"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                className="h-11"
              />
            </div>

            {newProduct.category === 'product' && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock Actual</Label>
                  <Input
                    id="stock"
                    type="number"
                    placeholder="0"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minStock">Stock Mínimo</Label>
                  <Input
                    id="minStock"
                    type="number"
                    placeholder="0"
                    value={newProduct.minStock}
                    onChange={(e) => setNewProduct({ ...newProduct, minStock: e.target.value })}
                    className="h-11"
                  />
                </div>
              </div>
            )}

            {newProduct.category !== 'product' && (
              <div className="space-y-2">
                <Label htmlFor="duration">Duración</Label>
                <Input
                  id="duration"
                  placeholder="Ej: 1 hora, 1 mes"
                  value={newProduct.duration}
                  onChange={(e) => setNewProduct({ ...newProduct, duration: e.target.value })}
                  className="h-11"
                />
              </div>
            )}

            {newProduct.category === 'membership' && (
              <div className="space-y-2">
                <Label htmlFor="benefits">Beneficios</Label>
                <Input
                  id="benefits"
                  placeholder="Ej: Acceso completo + clases"
                  value={newProduct.benefits}
                  onChange={(e) => setNewProduct({ ...newProduct, benefits: e.target.value })}
                  className="h-11"
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsAddProductOpen(false);
                setIsEditProductOpen(false);
                setEditingProduct(null);
                resetForm();
              }}
              className="h-11"
            >
              Cancelar
            </Button>
            <Button
              onClick={isEditProductOpen ? handleEditProduct : handleAddProduct}
              disabled={!newProduct.code || !newProduct.name || !newProduct.price}
              className="bg-black hover:bg-gray-800 h-11"
            >
              {isEditProductOpen ? 'Actualizar' : 'Agregar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
