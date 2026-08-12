import { ChevronDown, Building2 } from "lucide-react";
import { User, Branch, ROLE_LABELS } from "../types/user";
import { useState, useEffect } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Badge } from "./ui/badge";

interface HeaderProps {
  user: User;
  currentBranch: Branch;
  branches: Branch[];
  onBranchChange?: (branchId: string) => void;
}

export function Header({ user, currentBranch, branches, onBranchChange }: HeaderProps) {
  const isSuperAdmin = user.role === 'super_admin';
  const [currentTime, setCurrentTime] = useState(new Date());

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Different header styles based on role
  const getHeaderStyle = () => {
    switch (user.role) {
      case 'super_admin':
        return 'bg-black text-white border-b border-gray-800';
      case 'branch_admin':
        return 'bg-white text-black border-b border-gray-200';
      case 'cashier':
        return 'bg-gradient-to-r from-gray-900 to-black text-white border-b-4 border-gray-700';
      default:
        return 'bg-white border-b border-gray-200';
    }
  };

  const isLightHeader = user.role === 'branch_admin';
  const isSuperAdminDark = user.role === 'super_admin';

  return (
    <div className={`sticky top-0 z-20 ${getHeaderStyle()}`}>
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Branch Selector for Super Admin */}
          {isSuperAdmin && onBranchChange && (
            <DropdownMenu>
              <DropdownMenuTrigger className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                isSuperAdminDark
                  ? 'border-gray-700 hover:border-gray-600 bg-gray-900/50 hover:bg-gray-900'
                  : 'border-gray-300 hover:border-black hover:bg-gray-50'
              }`}>
                <Building2 className={`w-4 h-4 ${isSuperAdminDark ? 'text-gray-400' : 'text-gray-600'}`} />
                <div className="text-left">
                  <p className={`text-xs uppercase tracking-wide ${isSuperAdminDark ? 'text-gray-500' : 'text-gray-500'}`}>Vista Activa</p>
                  <p className={`text-sm font-semibold ${isSuperAdminDark ? 'text-white' : 'text-black'}`}>{currentBranch.name}</p>
                </div>
                <ChevronDown className={`w-4 h-4 ${isSuperAdminDark ? 'text-gray-500' : 'text-gray-400'}`} />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64">
                {branches.map((branch) => (
                  <DropdownMenuItem
                    key={branch.id}
                    onClick={() => onBranchChange(branch.id)}
                    className={`cursor-pointer ${
                      branch.id === currentBranch.id ? 'bg-gray-100' : ''
                    }`}
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-black">{branch.name}</p>
                      <p className="text-xs text-gray-500">{branch.address}</p>
                    </div>
                    {branch.id === currentBranch.id && (
                      <div className="w-2 h-2 rounded-full bg-black" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Fixed Branch Display for Branch Admin and Cashier */}
          {!isSuperAdmin && (
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              isLightHeader
                ? 'bg-gray-50 border border-gray-200'
                : 'bg-white/10 border border-white/30'
            }`}>
              <Building2 className={`w-4 h-4 ${isLightHeader ? 'text-gray-600' : 'text-white'}`} />
              <div>
                <p className={`text-xs uppercase tracking-wide ${isLightHeader ? 'text-gray-500' : 'text-white/70'}`}>Sucursal</p>
                <p className={`text-sm font-semibold ${isLightHeader ? 'text-black' : 'text-white'}`}>{currentBranch.name}</p>
              </div>
            </div>
          )}
        </div>

        {/* Right side: Time and User Info */}
        <div className="flex items-center gap-4">
          {/* Current Time */}
          <div className={`text-right px-3 py-1 rounded-lg ${
            isSuperAdminDark ? 'bg-gray-900/50 border border-gray-800' : isLightHeader ? 'bg-gray-50' : 'bg-white/10'
          }`}>
            <p className={`text-lg font-bold ${isSuperAdminDark ? 'text-white' : isLightHeader ? 'text-black' : 'text-white'}`}>
              {currentTime.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}
            </p>
            <p className={`text-xs ${isSuperAdminDark ? 'text-gray-500' : isLightHeader ? 'text-gray-500' : 'text-white/70'}`}>
              {currentTime.toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' })}
            </p>
          </div>

          {/* User Info */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className={`text-sm font-semibold ${isSuperAdminDark ? 'text-white' : isLightHeader ? 'text-black' : 'text-white'}`}>{user.name}</p>
              <Badge 
                variant="outline" 
                className={`text-xs font-normal ${
                  isSuperAdminDark
                    ? 'border-gray-700 text-gray-400 bg-gray-900/50'
                    : isLightHeader
                    ? 'border-gray-300 text-gray-600 bg-gray-50'
                    : 'border-white/30 text-white bg-white/10'
                }`}
              >
                {ROLE_LABELS[user.role]}
              </Badge>
            </div>
            <Avatar className={`w-10 h-10 border-2 ${
              isSuperAdminDark ? 'border-gray-700' : isLightHeader ? 'border-gray-200' : 'border-white/30'
            }`}>
              <AvatarImage src={user.avatar} />
              <AvatarFallback className={`font-bold ${
                isSuperAdminDark ? 'bg-white text-black' : isLightHeader ? 'bg-black text-white' : 'bg-white text-black'
              }`}>
                {initials}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </div>
  );
}