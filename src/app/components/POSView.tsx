import { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { POSInventory } from "./POSInventory";
import {
  Search,
  ShoppingCart,
  User,
  CreditCard,
  DollarSign,
  Plus,
  Minus,
  X,
  UserPlus,
  CheckCircle2,
  AlertCircle,
  Clock,
  Package,
  Calendar,
  Scan,
  Camera,
  Building2,
  LogOut,
  Calculator,
  AlertTriangle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { MemberDetailModal } from "./MemberDetailModal";
import { ShiftStartScreen } from "./ShiftStartScreen";
import { CashClosureScreen } from "./CashClosureScreen";
import { POSClasses } from "./POSClasses";
import { POSExpenses } from "./POSExpenses";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  type: 'membership' | 'product' | 'service';
  code?: string;
}

interface Member {
  id: string;
  name: string;
  phone: string;
  email: string;
  membershipType: string;
  status: 'active' | 'expired' | 'pending';
  expirationDate: string;
}

// Mock Data - Clientes de ejemplo
const MOCK_MEMBERS: Member[] = [
  { id: 'GG001', name: 'Ana García Martnez', phone: '555-0101', email: 'ana@email.com', membershipType: 'Premium', status: 'active', expirationDate: '2024-07-15' },
  { id: 'GG002', name: 'Carlos López Rivera', phone: '555-0102', email: 'carlos@email.com', membershipType: 'Estándar', status: 'expired', expirationDate: '2024-03-20' },
  { id: 'GG003', name: 'María Rodríguez', phone: '555-0103', email: 'maria@email.com', membershipType: 'Premium', status: 'active', expirationDate: '2024-08-30' },
  { id: 'GG004', name: 'Juan Pérez Sánchez', phone: '555-0104', email: 'juan@email.com', membershipType: 'Estudiante', status: 'active', expirationDate: '2024-07-10' },
  { id: 'GG005', name: 'Laura Fernández', phone: '555-0105', email: 'laura@email.com', membershipType: 'Corporativo', status: 'active', expirationDate: '2024-09-01' },
  { id: 'GG006', name: 'Roberto Martínez', phone: '555-0106', email: 'roberto@email.com', membershipType: 'Estándar', status: 'active', expirationDate: '2024-06-28' },
  { id: 'GG007', name: 'Sofia González', phone: '555-0107', email: 'sofia@email.com', membershipType: 'Premium', status: 'expired', expirationDate: '2024-02-15' },
  { id: 'GG008', name: 'Diego Ramírez', phone: '555-0108', email: 'diego@email.com', membershipType: 'Estudiante', status: 'active', expirationDate: '2024-07-20' },
];

const MEMBERSHIPS = [
  { id: 'm1', code: 'MEM-PREM-1M', name: 'Premium', duration: '1 Mes', price: 1200, benefits: 'Acceso completo + clases' },
  { id: 'm2', code: 'MEM-PREM-3M', name: 'Premium', duration: '3 Meses', price: 3300, benefits: 'Acceso completo + clases' },
  { id: 'm3', code: 'MEM-STD-1M', name: 'Estándar', duration: '1 Mes', price: 800, benefits: 'Acceso al gimnasio' },
  { id: 'm4', code: 'MEM-STD-3M', name: 'Estándar', duration: '3 Meses', price: 2200, benefits: 'Acceso al gimnasio' },
  { id: 'm5', code: 'MEM-EST-1M', name: 'Estudiante', duration: '1 Mes', price: 600, benefits: 'Con credencial vigente' },
  { id: 'm6', code: 'MEM-CORP-1M', name: 'Corporativo', duration: '1 Mes', price: 950, benefits: 'Plan empresarial' },
];

const PRODUCTS = [
  { id: 'p1', code: 'PROD-001', name: 'Proteína 1kg', price: 450, stock: 25 },
  { id: 'p2', code: 'PROD-002', name: 'Creatina 300g', price: 380, stock: 18 },
  { id: 'p3', code: 'PROD-003', name: 'Toalla Greek Gym', price: 200, stock: 45 },
  { id: 'p4', code: 'PROD-004', name: 'Botella de Agua', price: 100, stock: 60 },
  { id: 'p5', code: 'PROD-005', name: 'Candado', price: 80, stock: 30 },
  { id: 'p6', code: 'PROD-006', name: 'Guantes Gym', price: 250, stock: 22 },
  { id: 'p7', code: 'PROD-007', name: 'Shaker', price: 120, stock: 35 },
  { id: 'p8', code: 'PROD-008', name: 'Banda Elástica', price: 180, stock: 28 },
  { id: 'p9', code: 'PROD-009', name: 'Pre-Workout', price: 380, stock: 15 },
  { id: 'p10', code: 'PROD-010', name: 'Aminoácidos', price: 320, stock: 20 },
  { id: 'p11', code: 'PROD-011', name: 'Barras Proteicas', price: 35, stock: 80 },
  { id: 'p12', code: 'PROD-012', name: 'Gorra Greek Gym', price: 180, stock: 25 },
];

const SERVICES = [
  { id: 's1', code: 'SRV-CL1', name: 'Clase Individual', price: 150, duration: '1 hora' },
  { id: 's2', code: 'SRV-CL5', name: 'Paquete 5 Clases', price: 650, duration: 'Válido 30 días' },
  { id: 's3', code: 'SRV-CL10', name: 'Paquete 10 Clases', price: 1200, duration: 'Válido 60 días' },
  { id: 's4', code: 'SRV-PT', name: 'Entrenamiento Personal', price: 400, duration: '1 hora' },
  { id: 's5', code: 'SRV-NUT', name: 'Valoración Nutricional', price: 300, duration: '45 minutos' },
  { id: 's6', code: 'SRV-LOCK', name: 'Casillero Mensual', price: 150, duration: '1 mes' },
];

export function POSView({ onLogout }: { onLogout?: () => void }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [clientSearchTerm, setClientSearchTerm] = useState('');
  const [productSearchTerm, setProductSearchTerm] = useState('');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isNewMemberOpen, setIsNewMemberOpen] = useState(false);
  const [isCashClosureOpen, setIsCashClosureOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card'>('cash');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  
  // New states for filter pills and member detail modal
  const [searchFilter, setSearchFilter] = useState<'nombre' | 'id' | 'telefono'>('nombre');
  const [isMemberDetailOpen, setIsMemberDetailOpen] = useState(false);
  const [shiftStarted, setShiftStarted] = useState(false);
  const [showCashClosureScreen, setShowCashClosureScreen] = useState(false);
  const [initialCashAmount, setInitialCashAmount] = useState(2000); // Initial cash from shift start
  const [showInventoryScreen, setShowInventoryScreen] = useState(false);
  const [showClassesScreen, setShowClassesScreen] = useState(false);
  const [showExpensesScreen, setShowExpensesScreen] = useState(false);
  
  // New Member Form States
  const [newMemberStep, setNewMemberStep] = useState(1);
  const [newMemberData, setNewMemberData] = useState({
    name: '',
    phone: '',
    email: '',
    selectedMembership: '',
    faceIdCaptured: false,
    generatedId: '',
  });

  // Cash Closure States
  const [adminPassword, setAdminPassword] = useState('');
  const [cashClosureStep, setCashClosureStep] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Update filtered members based on search filter
  const filteredMembers = MOCK_MEMBERS.filter((member) => {
    const searchLower = clientSearchTerm.toLowerCase();
    switch (searchFilter) {
      case 'nombre':
        return member.name.toLowerCase().includes(searchLower);
      case 'id':
        return member.id.toLowerCase().includes(searchLower);
      case 'telefono':
        return member.phone.includes(clientSearchTerm);
      default:
        return member.name.toLowerCase().includes(searchLower);
    }
  });

  // Get placeholder text based on active filter
  const getPlaceholderText = () => {
    switch (searchFilter) {
      case 'nombre':
        return 'Buscar por nombre...';
      case 'id':
        return 'Buscar por ID...';
      case 'telefono':
        return 'Buscar por teléfono...';
      default:
        return 'Buscar cliente...';
    }
  };

  const handleStartShift = (cashAmount: number, notes: string) => {
    console.log('Turno iniciado con:', { cashAmount, notes });
    setShiftStarted(true);
    setInitialCashAmount(cashAmount);
  };

  const filteredProducts = PRODUCTS.filter((product) =>
    product.name.toLowerCase().includes(productSearchTerm.toLowerCase()) ||
    product.code.toLowerCase().includes(productSearchTerm.toLowerCase())
  );

  const filteredMemberships = MEMBERSHIPS.filter((membership) =>
    `${membership.name} ${membership.duration}`.toLowerCase().includes(productSearchTerm.toLowerCase()) ||
    membership.code.toLowerCase().includes(productSearchTerm.toLowerCase())
  );

  const filteredServices = SERVICES.filter((service) =>
    service.name.toLowerCase().includes(productSearchTerm.toLowerCase()) ||
    service.code.toLowerCase().includes(productSearchTerm.toLowerCase())
  );

  const addToCart = (item: any, type: 'membership' | 'product' | 'service') => {
    const cartItem: CartItem = {
      id: item.id,
      name: type === 'membership' ? `${item.name} (${item.duration})` : item.name,
      price: item.price,
      quantity: 1,
      type,
      code: item.code,
    };

    const existingItem = cart.find((i) => i.id === item.id);
    if (existingItem && type !== 'membership') {
      setCart(cart.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
    } else {
      setCart([...cart, cartItem]);
    }
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(
      cart.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setSelectedMember(null);
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.16;
  const total = subtotal + tax;

  const confirmPayment = () => {
    setPaymentSuccess(true);
    setTimeout(() => {
      setPaymentSuccess(false);
      clearCart();
      setIsCheckoutOpen(false);
    }, 2500);
  };

  const handleNewMemberSubmit = () => {
    if (newMemberStep === 1) {
      if (newMemberData.name && newMemberData.phone && newMemberData.email) {
        setNewMemberStep(2);
      }
    } else if (newMemberStep === 2) {
      if (newMemberData.selectedMembership) {
        setNewMemberStep(3);
      }
    } else if (newMemberStep === 3) {
      // Simulate FaceID capture
      setTimeout(() => {
        const generatedId = `GG${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
        setNewMemberData({ ...newMemberData, faceIdCaptured: true, generatedId });
        setNewMemberStep(4);
      }, 1500);
    } else if (newMemberStep === 4) {
      // Add membership to cart and close dialog
      const selectedMembership = MEMBERSHIPS.find(m => m.id === newMemberData.selectedMembership);
      if (selectedMembership) {
        addToCart(selectedMembership, 'membership');
      }
      setIsNewMemberOpen(false);
      setNewMemberStep(1);
      setNewMemberData({
        name: '',
        phone: '',
        email: '',
        selectedMembership: '',
        faceIdCaptured: false,
        generatedId: '',
      });
    }
  };

  const handleCashClosure = () => {
    if (cashClosureStep === 1) {
      if (adminPassword === '1234') {
        setCashClosureStep(2);
        setAdminPassword('');
      } else {
        alert('Contraseña incorrecta');
      }
    } else if (cashClosureStep === 2) {
      // Complete cash closure and return to POS
      setIsCashClosureOpen(false);
      setCashClosureStep(1);
      setAdminPassword('');
    }
  };

  // Show shift start screen if shift hasn't started
  if (!shiftStarted) {
    return <ShiftStartScreen onStartShift={handleStartShift} />;
  }


  

  // Show inventory screen if requested
  if (showInventoryScreen) {
    return (
      <POSInventory
        onBack={() => setShowInventoryScreen(false)}
        cajeroName="Araceli Arandas"
        sucursal="Sucursal Centro"
      />
    );
  }


  
  // Show cash closure screen if requested
  if (showCashClosureScreen) {
    return (
      <CashClosureScreen
        onBack={() => setShowCashClosureScreen(false)}
        onConfirmClosure={() => {
          // Complete closure and optionally logout or reset
          console.log('Turno cerrado exitosamente');
          setShowCashClosureScreen(false);
          // Optionally: reset shift or logout
        }}
        initialCash={initialCashAmount}
      />
    );
  }
  
 if (showClassesScreen) {
    return (
      <POSClasses
        onBack={() => setShowClassesScreen(false)}
        cajeroName="Araceli Arandas"
        sucursal="Sucursal Centro"
      />
    );
  }

  if (showExpensesScreen) {
    return (
      <POSExpenses
        onBack={() => setShowExpensesScreen(false)}
        cajeroName="Araceli Arandas"
        sucursal="Sucursal Centro"
      />
    );
  }

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="bg-white border-b-2 border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white text-lg font-bold">GG</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-black">PUNTO DE VENTA</h1>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  <span>Araceli Arandas</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Building2 className="w-3 h-3" />
                  <span>Sucursal Centro</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-2xl font-bold text-black">
                {currentTime.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}
              </p>
              <p className="text-xs text-gray-500">
                {currentTime.toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'short' })}
              </p>
            </div>
            <Button 
  onClick={(e) => {
    const btn = e.currentTarget;
    const originalText = btn.innerText;
    
    // Cambios visuales inmediatos
    btn.innerText = "✅ ABIERTO";
    btn.style.backgroundColor = "#16a34a"; // Verde
    btn.style.borderColor = "#16a34a";
    
    // Regresa a la normalidad después de 2 segundos
    setTimeout(() => {
      btn.innerText = originalText;
      btn.style.backgroundColor = ""; // Vuelve al color del CSS/Tailwind
      btn.style.borderColor = "";
    }, 2000);
  }}
  className="bg-black text-white border-2 border-black transition-all duration-300"
>
  ABRIR ACCESO
</Button>
            <Button
              onClick={() => setShowClassesScreen(true)}
              variant="outline"
              className="border-2 border-gray-300 hover:bg-gray-100 font-semibold"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Clases
            </Button>

            <Button
              onClick={() => setShowExpensesScreen(true)}
              variant="outline"
              className="border-2 border-gray-300 hover:bg-gray-100 font-semibold"
            >
              <DollarSign className="w-4 h-4 mr-2" />
              Gastos
            </Button>
            
            
            <Button
              onClick={() => setShowInventoryScreen(true)}
              variant="outline"
              className="border-2 border-gray-300 hover:bg-gray-100 font-semibold"
            >
              <Package className="w-4 h-4 mr-2" />
              Inventario
            </Button>
            
            <Button
              onClick={() => setShowCashClosureScreen(true)}
              variant="outline"
              className="border-2 border-gray-300 hover:bg-gray-100 font-semibold"
            >
              <Calculator className="w-4 h-4 mr-2" />
              Corte de Caja
            </Button>
            
            {onLogout && (
              <Button
                onClick={onLogout}
                variant="outline"
                className="border-2 border-gray-300 hover:bg-gray-100 font-semibold"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Salir
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content - 3 Columns */}
      <div className="flex-1 grid grid-cols-12 gap-0 overflow-hidden">
        {/* Column 1: CLIENTES (3 cols) */}
        <div className="col-span-3 border-r-2 border-gray-200 flex flex-col bg-gray-50">
          <div className="p-4 border-b-2 border-gray-200 bg-white">
            <h2 className="text-base font-bold text-black mb-3 flex items-center gap-2">
              <User className="w-5 h-5" />
              CLIENTES
            </h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder={getPlaceholderText()}
                className="pl-10 h-11 text-sm border-2 border-gray-300 focus:border-black"
                value={clientSearchTerm}
                onChange={(e) => setClientSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 mt-3">
              <Badge
                variant="outline"
                className={`text-xs ${
                  searchFilter === 'nombre'
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                    : 'border-gray-200 bg-gray-50 text-gray-700'
                }`}
                onClick={() => setSearchFilter('nombre')}
              >
                Nombre
              </Badge>
              <Badge
                variant="outline"
                className={`text-xs ${
                  searchFilter === 'id'
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                    : 'border-gray-200 bg-gray-50 text-gray-700'
                }`}
                onClick={() => setSearchFilter('id')}
              >
                ID
              </Badge>
              <Badge
                variant="outline"
                className={`text-xs ${
                  searchFilter === 'telefono'
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                    : 'border-gray-200 bg-gray-50 text-gray-700'
                }`}
                onClick={() => setSearchFilter('telefono')}
              >
                Teléfono
              </Badge>
            </div>
            <Button
              onClick={() => setIsNewMemberOpen(true)}
              className="w-full mt-3 bg-black text-white hover:bg-gray-800 h-10 font-semibold text-sm"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Inscribir Socio
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {!clientSearchTerm && !selectedMember && (
              <div className="text-center py-12 text-gray-400">
                <User className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="text-xs">Busca un cliente para comenzar</p>
              </div>
            )}

            {selectedMember && !clientSearchTerm && (
              <Card className="border-2 border-black bg-white">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <Avatar 
                      className="w-12 h-12 bg-black text-white cursor-pointer"
                      onClick={() => setIsMemberDetailOpen(true)}
                    >
                      <AvatarFallback className="bg-black text-white font-bold">
                        {selectedMember.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedMember(null)}
                      className="h-6 w-6 p-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <button 
                    onClick={() => setIsMemberDetailOpen(true)}
                    className="w-full text-left hover:bg-gray-50 -mx-2 px-2 py-1 rounded transition-colors"
                  >
                    <p className="font-bold text-black text-base mb-1">{selectedMember.name}</p>
                    <p className="text-xs text-gray-600 mb-3">ID: {selectedMember.id}</p>
                  </button>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Membresía:</span>
                      <Badge variant="outline" className="border-gray-300 text-black font-semibold">
                        {selectedMember.membershipType}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Estado:</span>
                      <Badge
                        className={
                          selectedMember.status === 'active'
                            ? 'bg-emerald-100 text-emerald-700 border-emerald-300'
                            : 'bg-rose-100 text-rose-700 border-rose-300'
                        }
                      >
                        {selectedMember.status === 'active' ? 'Activo' : 'Vencido'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Vence:</span>
                      <span className="font-semibold text-black">{selectedMember.expirationDate}</span>
                    </div>
                  </div>
                  {selectedMember.status === 'expired' && (
                    <div className="mt-3 p-2 bg-rose-50 border border-rose-200 rounded-lg">
                      <p className="text-xs text-rose-700 font-semibold flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        Membresía vencida - Renovar
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {clientSearchTerm && filteredMembers.length === 0 && (
              <div className="text-center py-12">
                <AlertCircle className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                <p className="text-xs text-gray-600 font-semibold mb-2">Cliente no encontrado</p>
                <Button
                  onClick={() => setIsNewMemberOpen(true)}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  Inscribir nuevo socio
                </Button>
              </div>
            )}

            {clientSearchTerm && filteredMembers.map((member) => (
              <button
                key={member.id}
                onClick={() => {
                  setSelectedMember(member);
                  setClientSearchTerm('');
                }}
                className="w-full p-3 rounded-lg border-2 border-gray-200 hover:border-black bg-white transition-all text-left"
              >
                <div className="flex items-start gap-2 mb-2">
                  <Avatar className="w-8 h-8 bg-gray-200 text-black">
                    <AvatarFallback className="bg-gray-200 text-black text-xs font-bold">
                      {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold text-black text-sm">{member.name}</p>
                    <p className="text-xs text-gray-500">ID: {member.id}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      member.status === 'active'
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                        : 'border-rose-200 bg-rose-50 text-rose-700'
                    }`}
                  >
                    {member.status === 'active' ? 'Activo' : 'Vencido'}
                  </Badge>
                </div>
                <div className="text-xs text-gray-600">
                  {member.membershipType} • Vence: {member.expirationDate}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* CONTENEDOR PADRE: Asegúrate de que el div que envuelve estas columnas tenga una altura definida, por ejemplo: className="grid grid-cols-12 h-[calc(100vh-100px)]" */}

{/* Column 2: PRODUCTOS/SERVICIOS (6 cols) */}
<div className="col-span-6 flex flex-col bg-white border-r-2 border-gray-200 overflow-hidden">
  {/* Header del Catálogo - FIJO */}
  <div className="p-4 border-b-2 border-gray-200 flex-shrink-0">
    <div className="flex items-center justify-between mb-3">
      <h2 className="text-base font-bold text-black flex items-center gap-2">
        <ShoppingCart className="w-5 h-5" />
        CATÁLOGO
      </h2>
    </div>
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Scan className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input
        placeholder="Buscar por nombre o escanear código..."
        className="px-10 h-11 text-sm border-2 border-gray-300 focus:border-black"
        value={productSearchTerm}
        onChange={(e) => setProductSearchTerm(e.target.value)}
      />
    </div>
  </div>

  {/* Contenido de Tabs - El contenedor de Tabs ahora debe ocupar el resto del espacio */}
  <Tabs defaultValue="products" className="flex-1 flex flex-col min-h-0">
    <div className="p-4 pb-0 flex-shrink-0">
      <TabsList className="grid w-full grid-cols-3 h-11">
        <TabsTrigger value="products" className="text-sm font-semibold">
          <Package className="w-4 h-4 mr-2" /> PRODUCTOS
        </TabsTrigger>
        <TabsTrigger value="memberships" className="text-sm font-semibold">
          <Calendar className="w-4 h-4 mr-2" /> MEMBRESÍAS
        </TabsTrigger>
        <TabsTrigger value="services" className="text-sm font-semibold">
          <Clock className="w-4 h-4 mr-2" /> SERVICIOS
        </TabsTrigger>
      </TabsList>
    </div>

    {/* Áreas de contenido con SCROLL INDEPENDIENTE */}
    <div className="flex-1 overflow-y-auto p-4">
      <TabsContent value="products" className="mt-0 outline-none">
        <div className="grid grid-cols-3 gap-3">
          {filteredProducts.map((product) => (
            <button
              key={product.id}
              onClick={() => addToCart(product, 'product')}
              className="group p-4 rounded-xl border-2 border-gray-200 hover:border-black hover:shadow-lg transition-all bg-white text-left flex flex-col justify-between h-36"
            >
              <div>
                <p className="font-bold text-black text-sm mb-1 line-clamp-2">{product.name}</p>
                <p className="text-xs text-gray-500 mb-2">{product.code}</p>
                <p className="text-2xl font-bold text-black">${product.price}</p>
              </div>
              <Badge variant="outline" className="w-fit border-gray-300 text-gray-600 text-xs">
                Stock: {product.stock}
              </Badge>
            </button>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="memberships" className="mt-0 outline-none">
        <div className="grid grid-cols-2 gap-3">
          {filteredMemberships.map((membership) => (
            <button
              key={membership.id}
              onClick={() => addToCart(membership, 'membership')}
              className="group p-5 rounded-xl border-2 border-gray-200 hover:border-black hover:shadow-lg transition-all bg-white text-left"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-bold text-black text-lg">{membership.name}</p>
                  <Badge variant="outline" className="mt-1 border-gray-300 text-gray-600 text-xs">
                    {membership.duration}
                  </Badge>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-black">${membership.price}</p>
                  <p className="text-xs text-gray-500">MXN</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2">{membership.benefits}</p>
            </button>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="services" className="mt-0 outline-none">
        <div className="grid grid-cols-2 gap-3">
          {filteredServices.map((service) => (
            <button
              key={service.id}
              onClick={() => addToCart(service, 'service')}
              className="group p-5 rounded-xl border-2 border-gray-200 hover:border-black hover:shadow-lg transition-all bg-white text-left"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="font-bold text-black text-base">{service.name}</p>
                <p className="text-2xl font-bold text-black">${service.price}</p>
              </div>
              <p className="text-sm text-gray-600">{service.duration}</p>
            </button>
          ))}
        </div>
      </TabsContent>
    </div>
  </Tabs>
</div>

{/* Column 3: CARRITO (3 cols) */}
<div className="col-span-3 flex flex-col bg-gray-50 h-full overflow-hidden border-l-2 border-gray-200">
  {/* Header Carrito - FIJO */}
  <div className="p-4 border-b-2 border-gray-200 bg-white flex-shrink-0">
    <div className="flex items-center justify-between mb-2">
      <h2 className="text-base font-bold text-black flex items-center gap-2">
        <ShoppingCart className="w-5 h-5" /> CARRITO
      </h2>
      {cart.length > 0 && (
        <Button variant="ghost" size="sm" onClick={clearCart} className="text-rose-600 hover:text-rose-700 h-7 text-xs">
          Limpiar
        </Button>
      )}
    </div>
    <p className="text-xs text-gray-600">{cart.length} artículos</p>
  </div>

  {/* Lista de productos - ESTE ES EL QUE TIENE SCROLL */}
  <div className="flex-1 overflow-y-auto p-3 min-h-0">
    {cart.length === 0 ? (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <ShoppingCart className="w-12 h-12 text-gray-300 mb-4" />
        <p className="text-sm text-gray-500 font-semibold">Carrito vacío</p>
      </div>
    ) : (
      <div className="space-y-2">
        {cart.map((item) => (
          <div key={item.id} className="p-3 rounded-lg border-2 border-gray-200 bg-white">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 pr-2">
                <p className="font-semibold text-black text-sm leading-tight">{item.name}</p>
                <p className="text-xs text-gray-500 mt-1">${item.price} c/u</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => removeFromCart(item.id)} className="h-6 w-6 p-0">
                <X className="w-4 h-4" />
              </Button>
            </div>
            {/* Controles de cantidad */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, -1)} className="h-7 w-7 p-0 border-2">
                  <Minus className="w-3 h-3" />
                </Button>
                <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
                <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, 1)} className="h-7 w-7 p-0 border-2">
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
              <p className="text-base font-bold text-black">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>

  {/* Totales y Botón - FIJO AL FINAL */}
  <div className="p-4 border-t-2 border-gray-300 bg-white flex-shrink-0">
    <div className="space-y-2 mb-4">
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Subtotal</span>
        <span className="font-semibold text-black">${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">IVA (16%)</span>
        <span className="font-semibold text-black">${tax.toFixed(2)}</span>
      </div>
      <div className="pt-2 border-t-2 border-gray-200 flex justify-between items-end">
        <span className="font-bold text-black text-sm">TOTAL</span>
        <span className="font-bold text-black text-3xl">${total.toFixed(2)}</span>
      </div>
    </div>
    <Button
      onClick={() => setIsCheckoutOpen(true)}
      disabled={cart.length === 0}
      className="w-full bg-black text-white hover:bg-gray-800 h-12 text-base font-bold mb-2"
    >
      <CreditCard className="w-5 h-5 mr-2" /> PROCESAR PAGO
    </Button>
    <Button
      onClick={clearCart}
      disabled={cart.length === 0}
      variant="outline"
      className="w-full border-2 border-gray-300 h-10 font-semibold text-sm"
    >
      Cancelar
    </Button>
  </div>
</div>
      </div>

      {/* New Member Dialog */}
      <Dialog open={isNewMemberOpen} onOpenChange={setIsNewMemberOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-xl">Inscribir Nuevo Socio</DialogTitle>
            <DialogDescription>
              Paso {newMemberStep} de 4
            </DialogDescription>
          </DialogHeader>

          {/* Step 1: Personal Data */}
          {newMemberStep === 1 && (
            <div className="py-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre Completo *</Label>
                <Input
                  id="name"
                  value={newMemberData.name}
                  onChange={(e) => setNewMemberData({ ...newMemberData, name: e.target.value })}
                  placeholder="Ej: Juan Pérez García"
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono *</Label>
                <Input
                  id="phone"
                  value={newMemberData.phone}
                  onChange={(e) => setNewMemberData({ ...newMemberData, phone: e.target.value })}
                  placeholder="Ej: 555-0123"
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico *</Label>
                <Input
                  id="email"
                  type="email"
                  value={newMemberData.email}
                  onChange={(e) => setNewMemberData({ ...newMemberData, email: e.target.value })}
                  placeholder="Ej: correo@ejemplo.com"
                  className="h-11"
                />
              </div>
              <Button
                onClick={handleNewMemberSubmit}
                className="w-full bg-black hover:bg-gray-800 h-11"
                disabled={!newMemberData.name || !newMemberData.phone || !newMemberData.email}
              >
                Continuar a Selección de Membresía
              </Button>
            </div>
          )}

          {/* Step 2: Membership Selection */}
          {newMemberStep === 2 && (
            <div className="py-4 space-y-4">
              <div className="space-y-2">
                <Label>Selecciona una Membresía</Label>
                <div className="grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto">
                  {MEMBERSHIPS.map((membership) => (
                    <button
                      key={membership.id}
                      onClick={() => setNewMemberData({ ...newMemberData, selectedMembership: membership.id })}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        newMemberData.selectedMembership === membership.id
                          ? 'border-black bg-gray-50'
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <p className="font-bold text-black text-sm">{membership.name}</p>
                      <p className="text-xs text-gray-600 mb-2">{membership.duration}</p>
                      <p className="text-lg font-bold text-black">${membership.price}</p>
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => setNewMemberStep(1)}
                  variant="outline"
                  className="flex-1 h-11"
                >
                  Atrás
                </Button>
                <Button
                  onClick={handleNewMemberSubmit}
                  className="flex-1 bg-black hover:bg-gray-800 h-11"
                  disabled={!newMemberData.selectedMembership}
                >
                  Continuar a Captura Biométrica
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Biometric Capture */}
          {newMemberStep === 3 && (
            <div className="py-8 text-center">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full border-4 border-black flex items-center justify-center bg-gray-100 animate-pulse">
                <Camera className="w-16 h-16 text-gray-400" />
              </div>
              <h3 className="text-lg font-bold text-black mb-2">Capturando Rostro...</h3>
              <p className="text-sm text-gray-600">Por favor, mira a la cámara</p>
              <p className="text-xs text-gray-500 mt-4">Simulando Face ID...</p>
            </div>
          )}

          {/* Step 4: Confirmation & Payment */}
          {newMemberStep === 4 && (
            <div className="py-4 space-y-4">
              <div className="text-center mb-4">
                <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-black mb-1">Registro Exitoso</h3>
                <p className="text-sm text-gray-600">Face ID capturado correctamente</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50 border-2 border-gray-200 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">ID Generado:</span>
                  <span className="font-bold text-black">{newMemberData.generatedId}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Nombre:</span>
                  <span className="font-semibold text-black">{newMemberData.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Membresía:</span>
                  <span className="font-semibold text-black">
                    {MEMBERSHIPS.find(m => m.id === newMemberData.selectedMembership)?.name}
                  </span>
                </div>
              </div>
              <Button
                onClick={handleNewMemberSubmit}
                className="w-full bg-black hover:bg-gray-800 h-11"
              >
                Agregar al Carrito y Procesar Pago
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Checkout Dialog */}
      <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
        <DialogContent className="sm:max-w-[500px]">
          {paymentSuccess ? (
            <div className="py-8 text-center">
              <CheckCircle2 className="w-20 h-20 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-black mb-2">¡Pago Exitoso!</h3>
              <p className="text-gray-600 mb-4">La transacción se ha procesado correctamente</p>
              <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                <p className="text-sm text-gray-600 mb-1">Total cobrado</p>
                <p className="text-3xl font-bold text-black">${total.toFixed(2)}</p>
              </div>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">Procesar Pago</DialogTitle>
                <DialogDescription>
                  Selecciona el método de pago y confirma la transacción
                </DialogDescription>
              </DialogHeader>
              <div className="py-6 space-y-6">
                <div className="space-y-3">
                  <Label className="text-sm font-semibold">Método de Pago</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setPaymentMethod('cash')}
                      className={`p-5 rounded-xl border-2 transition-all ${
                        paymentMethod === 'cash'
                          ? 'border-black bg-gray-50'
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <DollarSign className="w-10 h-10 mx-auto mb-2 text-black" />
                      <p className="font-bold text-sm text-black">Efectivo</p>
                    </button>
                    <button
                      onClick={() => setPaymentMethod('card')}
                      className={`p-5 rounded-xl border-2 transition-all ${
                        paymentMethod === 'card'
                          ? 'border-black bg-gray-50'
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <CreditCard className="w-10 h-10 mx-auto mb-2 text-black" />
                      <p className="font-bold text-sm text-black">Tarjeta</p>
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-gray-50 border-2 border-gray-200 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold text-black">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">IVA (16%)</span>
                    <span className="font-semibold text-black">${tax.toFixed(2)}</span>
                  </div>
                  <div className="pt-2 border-t-2 border-gray-200 flex justify-between items-end">
                    <span className="font-bold text-black text-base">Total a Pagar</span>
                    <span className="font-bold text-black text-3xl">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsCheckoutOpen(false)}
                  className="flex-1 h-11"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={confirmPayment}
                  className="flex-1 bg-black hover:bg-gray-800 h-11"
                >
                  Confirmar Pago
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Cash Closure Dialog */}
      <Dialog open={isCashClosureOpen} onOpenChange={setIsCashClosureOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-xl">Corte de Caja</DialogTitle>
            <DialogDescription>
              {cashClosureStep === 1 ? 'Ingresa la contraseña de administrador' : 'Resumen del turno'}
            </DialogDescription>
          </DialogHeader>

          {/* Step 1: Admin Password */}
          {cashClosureStep === 1 && (
            <div className="py-6 space-y-4">
              <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-amber-800">Acción Restringida</p>
                  <p className="text-xs text-amber-700 mt-1">
                    Esta operación requiere autorización de un administrador
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="adminPassword">Contraseña de Administrador</Label>
                <Input
                  id="adminPassword"
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Ingresa la contraseña"
                  className="h-11"
                />
                <p className="text-xs text-gray-500">Demo: 1234</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsCashClosureOpen(false)}
                  className="flex-1 h-11"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleCashClosure}
                  className="flex-1 bg-black hover:bg-gray-800 h-11"
                  disabled={!adminPassword}
                >
                  Continuar
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Cash Summary */}
          {cashClosureStep === 2 && (
            <div className="py-4 space-y-4">
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-center">
                  <p className="text-xs text-emerald-700 mb-1">INGRESOS</p>
                  <p className="text-2xl font-bold text-emerald-700">$12,450</p>
                </div>
                <div className="p-4 rounded-lg bg-rose-50 border border-rose-200 text-center">
                  <p className="text-xs text-rose-700 mb-1">EGRESOS</p>
                  <p className="text-2xl font-bold text-rose-700">$850</p>
                </div>
                <div className="p-4 rounded-lg bg-gray-100 border-2 border-gray-300 text-center">
                  <p className="text-xs text-gray-600 mb-1">NETO</p>
                  <p className="text-2xl font-bold text-black">$11,600</p>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-bold text-black">Desglose de Transacciones</h3>
                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                  <div className="p-3 rounded-lg border border-gray-200 bg-white flex justify-between items-center">
                    <div>
                      <p className="text-sm font-semibold text-black">Membresías</p>
                      <p className="text-xs text-gray-500">8 transacciones</p>
                    </div>
                    <p className="text-base font-bold text-emerald-700">+$8,200</p>
                  </div>
                  <div className="p-3 rounded-lg border border-gray-200 bg-white flex justify-between items-center">
                    <div>
                      <p className="text-sm font-semibold text-black">Productos</p>
                      <p className="text-xs text-gray-500">15 transacciones</p>
                    </div>
                    <p className="text-base font-bold text-emerald-700">+$3,450</p>
                  </div>
                  <div className="p-3 rounded-lg border border-gray-200 bg-white flex justify-between items-center">
                    <div>
                      <p className="text-sm font-semibold text-black">Servicios</p>
                      <p className="text-xs text-gray-500">4 transacciones</p>
                    </div>
                    <p className="text-base font-bold text-emerald-700">+$800</p>
                  </div>
                  <div className="p-3 rounded-lg border border-gray-200 bg-white flex justify-between items-center">
                    <div>
                      <p className="text-sm font-semibold text-black">Gastos Varios</p>
                      <p className="text-xs text-gray-500">3 transacciones</p>
                    </div>
                    <p className="text-base font-bold text-rose-700">-$850</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t-2 border-gray-200">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setCashClosureStep(1)}
                    className="flex-1 h-11"
                  >
                    Atrás
                  </Button>
                  <Button
                    onClick={handleCashClosure}
                    className="flex-1 bg-black hover:bg-gray-800 h-11"
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Cerrar Caja
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Member Detail Modal */}
      <MemberDetailModal
        isOpen={isMemberDetailOpen}
        onClose={() => setIsMemberDetailOpen(false)}
        member={selectedMember}
      />
    </div>
  );
}