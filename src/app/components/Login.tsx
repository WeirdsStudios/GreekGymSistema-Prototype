import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Shield, User, CreditCard } from 'lucide-react';
import { UserRole } from '../types/user';

interface LoginProps {
  onLogin: (role: UserRole) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    // Pre-fill email suggestion based on role
    switch (role) {
      case 'super_admin':
        setEmail('maria@greekgym.com');
        break;
      case 'branch_admin':
        setEmail('hugo@greekgym.com');
        break;
      case 'cashier':
        setEmail('araceli@gmail.com');
        break;
    }
    setPassword('');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole) {
      onLogin(selectedRole);
    }
  };

  const handleBack = () => {
    setSelectedRole(null);
    setEmail('');
    setPassword('');
  };

  if (!selectedRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="w-full max-w-5xl px-6">
          {/* Logo & Header */}
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <div className="w-20 h-20 bg-black rounded-2xl flex items-center justify-center">
                <span className="text-white text-3xl font-bold">GG</span>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-black mb-2">Greek Gym</h1>
            <p className="text-gray-600 text-lg">Sistema Administrativo</p>
          </div>

          {/* Role Selection */}
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-black mb-2">Selecciona tu perfil</h2>
            <p className="text-gray-500">Elige el tipo de acceso al sistema</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Super Admin Card */}
            <button
              onClick={() => handleRoleSelect('super_admin')}
              className="group relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-gray-800"></div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-gray-700 via-gray-800 to-black"></div>
              <Card className="relative border-0 bg-transparent text-white shadow-2xl">
                <CardHeader className="space-y-6 pt-12 pb-8">
                  <div className="mx-auto w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center ring-4 ring-white/20 group-hover:ring-white/40 transition-all">
                    <Shield className="w-10 h-10 text-white" />
                  </div>
                  <div className="space-y-2">
                    <CardTitle className="text-2xl font-bold text-center">
                      Super Administrador
                    </CardTitle>
                    <p className="text-sm text-gray-300 text-center">
                      Acceso total multi-sucursal
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="pb-12 space-y-4">
                  <div className="space-y-2 text-center">
                    <p className="text-sm text-gray-400">Usuario asignado:</p>
                    <p className="font-semibold text-white">María Martínez</p>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-gray-200 border border-white/20">
                      Control Total
                    </span>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-gray-200 border border-white/20">
                      Multi-Sucursal
                    </span>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-gray-200 border border-white/20">
                      Reportes Globales
                    </span>
                  </div>
                </CardContent>
              </Card>
            </button>

            {/* Branch Admin Card */}
            <button
              onClick={() => handleRoleSelect('branch_admin')}
              className="group relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100"></div>
              <Card className="relative border-2 border-gray-200 bg-transparent shadow-xl group-hover:shadow-2xl transition-all group-hover:border-gray-400">
                <CardHeader className="space-y-6 pt-12 pb-8">
                  <div className="mx-auto w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center ring-4 ring-gray-200 group-hover:ring-gray-300 transition-all group-hover:bg-gray-200">
                    <User className="w-10 h-10 text-black" />
                  </div>
                  <div className="space-y-2">
                    <CardTitle className="text-2xl font-bold text-center text-black">
                      Administrador
                    </CardTitle>
                    <p className="text-sm text-gray-600 text-center">
                      Gestión de sucursal completa
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="pb-12 space-y-4">
                  <div className="space-y-2 text-center">
                    <p className="text-sm text-gray-500">Usuario asignado:</p>
                    <p className="font-semibold text-black">Hugo Hernández</p>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-700 border border-gray-300">
                      Miembros
                    </span>
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-700 border border-gray-300">
                      Coaches
                    </span>
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-700 border border-gray-300">
                      Pagos
                    </span>
                  </div>
                </CardContent>
              </Card>
            </button>

            {/* Cashier Card */}
            <button
              onClick={() => handleRoleSelect('cashier')}
              className="group relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-700 via-gray-600 to-gray-500"></div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800"></div>
              <Card className="relative border-0 bg-transparent text-white shadow-2xl">
                <CardHeader className="space-y-6 pt-12 pb-8">
                  <div className="mx-auto w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center ring-4 ring-white/20 group-hover:ring-white/40 transition-all">
                    <CreditCard className="w-10 h-10 text-white" />
                  </div>
                  <div className="space-y-2">
                    <CardTitle className="text-2xl font-bold text-center">
                      Cajero / Recepcionista
                    </CardTitle>
                    <p className="text-sm text-gray-200 text-center">
                      Punto de venta y accesos
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="pb-12 space-y-4">
                  <div className="space-y-2 text-center">
                    <p className="text-sm text-gray-300">Usuario asignado:</p>
                    <p className="font-semibold text-white">Araceli Arandas</p>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-gray-200 border border-white/20">
                      Punto de Venta
                    </span>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-gray-200 border border-white/20">
                      Control Acceso
                    </span>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-gray-200 border border-white/20">
                      Cobros
                    </span>
                  </div>
                </CardContent>
              </Card>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Login Form
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Card className="w-full max-w-md border-2 border-gray-200 shadow-2xl">
        <CardHeader className="space-y-4 text-center pb-8">
          <div className="mx-auto w-16 h-16 bg-black rounded-xl flex items-center justify-center">
            <span className="text-white text-2xl font-bold">GG</span>
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-black mb-2">Iniciar Sesión</CardTitle>
            <p className="text-sm text-gray-600">
              {selectedRole === 'super_admin' && 'Super Administrador'}
              {selectedRole === 'branch_admin' && 'Administrador de Sucursal'}
              {selectedRole === 'cashier' && 'Cajero / Recepcionista'}
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold text-black">
                Correo Electrónico
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="usuario@greekgym.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 border-2 border-gray-300 focus:border-black"
              />
              <p className="text-xs text-gray-500">
                Sugerencia: {selectedRole === 'super_admin' && 'maria@greekgym.com'}
                {selectedRole === 'branch_admin' && 'hugo@greekgym.com'}
                {selectedRole === 'cashier' && 'araceli@gmail.com'}
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-semibold text-black">
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12 border-2 border-gray-300 focus:border-black"
              />
              <p className="text-xs text-gray-500">Demo: 1234</p>
            </div>
            <div className="space-y-3 pt-4">
              <Button
                type="submit"
                className="w-full h-12 bg-black text-white hover:bg-gray-800 font-semibold text-base"
              >
                Acceder al Sistema
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                className="w-full h-12 border-2 border-gray-300 hover:bg-gray-100 font-semibold"
              >
                Volver
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
