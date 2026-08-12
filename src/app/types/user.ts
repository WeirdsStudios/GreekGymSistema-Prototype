export type UserRole = 'super_admin' | 'branch_admin' | 'cashier';

export interface Branch {
  id: string;
  name: string;
  address: string;
  isActive: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  branchId?: string; // undefined for super_admin
  avatar?: string;
}

export const ROLE_LABELS: Record<UserRole, string> = {
  super_admin: 'Super Administrador',
  branch_admin: 'Administrador de Sucursal',
  cashier: 'Cajero / Recepcionista',
};

// Mock data for demo
export const MOCK_BRANCHES: Branch[] = [
  { id: '1', name: 'Sucursal Centro', address: 'Av. Principal 123', isActive: true },
  { id: '2', name: 'Sucursal Norte', address: 'Calle Norte 456', isActive: true },
  { id: '3', name: 'Sucursal Sur', address: 'Blvd. Sur 789', isActive: true },
];

// Mock users for demo
export const MOCK_USERS: Record<UserRole, User> = {
  super_admin: {
    id: '1',
    name: 'María Martínez',
    email: 'maria@greekgym.com',
    role: 'super_admin',
  },
  branch_admin: {
    id: '2',
    name: 'Hugo Hernández',
    email: 'hugo@greekgym.com',
    role: 'branch_admin',
    branchId: '1',
  },
  cashier: {
    id: '3',
    name: 'Araceli Arandas',
    email: 'araceli@gmail.com',
    role: 'cashier',
    branchId: '1',
  },
};