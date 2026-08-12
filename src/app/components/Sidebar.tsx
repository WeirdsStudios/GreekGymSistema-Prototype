import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Dumbbell,
  CreditCard,
  BarChart3,
  Settings,
  Bell,
  LogOut,
  X,
  Menu,
  Building2,
  UserCircle,
  Receipt,
  Package,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { UserRole } from "../types/user";
import { Notification, MOCK_NOTIFICATIONS } from "../types/notifications";
import { ScrollArea } from "./ui/scroll-area";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
  onOpenAlerts: () => void;
  userRole: UserRole;
  userName: string;
  userEmail: string;
}

// Navigation based on role
const getNavigationForRole = (role: UserRole) => {
  const baseNavigation = [
    {
      name: "Panel Ejecutivo",
      id: "dashboard",
      icon: LayoutDashboard,
      badge: null,
      roles: ['super_admin'] as UserRole[],
    },
    {
      name: "Panel Principal",
      id: "dashboard",
      icon: LayoutDashboard,
      badge: null,
      roles: ['branch_admin'] as UserRole[],
    },
    {
      name: "Gestión de Sucursales",
      id: "branches",
      icon: Building2,
      badge: "3",
      roles: ['super_admin'] as UserRole[],
    },
    {
      name: "Reportes",
      id: "reports",
      icon: BarChart3,
      badge: null,
      roles: ['super_admin'] as UserRole[],
    },
    {
      name: "Miembros",
      id: "members",
      icon: Users,
      badge: "1,247",
      roles: ['branch_admin'] as UserRole[],
    },
    {
      name: "Clases",
      id: "classes",
      icon: Calendar,
      badge: "24",
      roles: ['branch_admin'] as UserRole[],
    },
    {
      name: "Coaches",
      id: "coaches",
      icon: UserCircle,
      badge: "4",
      roles: ['branch_admin'] as UserRole[],
    },
    {
      name: "Equipos",
      id: "equipment",
      icon: Dumbbell,
      badge: "2",
      roles: ['branch_admin'] as UserRole[],
    },
    {
      name: "Inventario",
      id: "inventory",
      icon: Package,
      badge: "12",
      roles: ['branch_admin'] as UserRole[],
    },
    {
      name: "Pagos",
      id: "payments",
      icon: CreditCard,
      badge: 2,
      roles: ['super_admin', 'branch_admin'] as UserRole[],
    },
    {
      name: "Gastos",
      id: "expenses",
      icon: Receipt,
      badge: null,
      roles: ['branch_admin'] as UserRole[],
    },
    {
      name: "Reportes",
      id: "reports",
      icon: BarChart3,
      badge: 3,
      roles: ['branch_admin'] as UserRole[],
    },
    {
      name: "Ajustes",
      id: "settings",
      icon: Settings,
      badge: null,
      roles: ['super_admin', 'branch_admin'] as UserRole[],
    },
  ];

  return baseNavigation.filter(item => item.roles.includes(role));
};

export function Sidebar({
  activeTab,
  onTabChange,
  onLogout,
  onOpenAlerts,
  userRole,
  userName,
  userEmail,
}: SidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const navigation = getNavigationForRole(userRole);
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-rose-200 bg-rose-50';
      case 'medium':
        return 'border-amber-200 bg-amber-50';
      case 'low':
        return 'border-gray-200 bg-gray-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-rose-600 border-rose-200 bg-rose-100';
      case 'medium':
        return 'text-amber-600 border-amber-200 bg-amber-100';
      case 'low':
        return 'text-gray-600 border-gray-300 bg-gray-100';
      default:
        return 'text-gray-600 border-gray-300 bg-gray-100';
    }
  };

  const SidebarContent = () => (
    <>
      {/* Header with Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
            <span className="text-white text-lg font-bold">GG</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-black">Greek Gym</h1>
            <p className="text-xs text-gray-500">Sistema Admin</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10 border-2 border-gray-200">
            <AvatarImage />
            <AvatarFallback className="bg-black text-white font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-black truncate">
              {userName}
            </p>
            <p className="text-xs text-gray-500 truncate">{userEmail}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={`w-full justify-start gap-3 h-11 ${
                isActive
                  ? "bg-black text-white hover:bg-gray-800"
                  : "text-gray-700 hover:bg-gray-100 hover:text-black"
              }`}
              onClick={() => {
                onTabChange(item.id);
                setIsMobileOpen(false);
              }}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <span className="flex-1 text-left font-medium">{item.name}</span>
              {item.badge && (
                <Badge
                  variant="outline"
                  className={`ml-auto font-semibold ${
                    isActive
                      ? "bg-white/20 text-white border-white/30"
                      : "bg-gray-100 text-gray-700 border-gray-300"
                  }`}
                >
                  {item.badge}
                </Badge>
              )}
            </Button>
          );
        })}
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        {/* Notifications Button - Only for super_admin and branch_admin */}
        {(userRole === 'super_admin' || userRole === 'branch_admin') && (
          <Button
            variant="outline"
            className="w-full justify-start gap-3 h-11 border-2 border-gray-200 hover:bg-gray-100 relative"
            onClick={() => setIsNotificationsOpen(true)}
          >
            <Bell className="h-5 w-5 text-gray-700" />
            <span className="flex-1 text-left font-medium text-gray-700">
              Notificaciones
            </span>
            {unreadCount > 0 && (
              <Badge className="ml-auto bg-rose-600 text-white border-0 font-bold">
                {unreadCount}
              </Badge>
            )}
          </Button>
        )}
        
        <Button
          variant="outline"
          className="w-full justify-start gap-3 h-11 border-2 border-gray-200 hover:bg-gray-100 text-gray-700 hover:text-black"
          onClick={onLogout}
        >
          <LogOut className="h-5 w-5" />
          <span className="flex-1 text-left font-medium">Salir</span>
        </Button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="secondary"
          size="icon"
          className="bg-black text-white hover:bg-gray-800 shadow-md"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          {isMobileOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </Button>
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-[280px] bg-white h-screen sticky top-0 shrink-0 z-30 border-r border-gray-200">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={`
        lg:hidden fixed left-0 top-0 z-50 w-[280px] h-screen bg-white shadow-2xl transform transition-transform duration-300 cubic-bezier(0.4, 0, 0.2, 1)
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <SidebarContent />
      </aside>

      {/* Notifications Dialog */}
      <Dialog open={isNotificationsOpen} onOpenChange={setIsNotificationsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl">Notificaciones</DialogTitle>
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-xs"
                >
                  Marcar todas como leídas
                </Button>
              )}
            </div>
            <DialogDescription>
              Tienes {unreadCount} notificaciones sin leer
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-3">
              {notifications.map((notification) => (
                <button
                  key={notification.id}
                  onClick={() => markAsRead(notification.id)}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    notification.read
                      ? 'border-gray-200 bg-gray-50 opacity-60'
                      : getPriorityColor(notification.priority)
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-black text-sm">{notification.title}</h4>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={`text-[10px] ${getPriorityBadgeColor(notification.priority)}`}>
                        {notification.priority === 'high' ? 'Alta' : notification.priority === 'medium' ? 'Media' : 'Baja'}
                      </Badge>
                      {!notification.read && (
                        <div className="w-2 h-2 rounded-full bg-blue-600" />
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-gray-700 mb-2">{notification.message}</p>
                  <p className="text-xs text-gray-500">{notification.timestamp}</p>
                </button>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}