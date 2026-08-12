import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { ExecutiveDashboard } from './components/ExecutiveDashboard';
import { Members } from './components/Members';
import { Classes } from './components/Classes';
import { Equipment } from './components/Equipment';
import { Payments } from './components/Payments';
import { Expenses } from './components/Expenses';
import { Inventory } from './components/Inventory';
import { Reports } from './components/Reports';
import { Settings } from './components/Settings';
import { Login } from './components/Login';
import { POSView } from './components/POSView';
import { BranchManagement } from './components/BranchManagement';
import { CoachManagement } from './components/CoachManagement';
import { User, UserRole, Branch, MOCK_BRANCHES, MOCK_USERS } from './types/user';
import { SuperAdminReports } from "./SuperAdminReports";

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentBranchId, setCurrentBranchId] = useState('1');

  const currentBranch = MOCK_BRANCHES.find((b) => b.id === currentBranchId) || MOCK_BRANCHES[0];

  const handleLogin = (role?: UserRole) => {
    // For demo purposes, we can select which role to login as
    const userRole = role || 'branch_admin';
    setCurrentUser(MOCK_USERS[userRole]);
    setIsAuthenticated(true);
    
    // Set default tab based on role
    if (userRole === 'cashier') {
      setActiveTab('pos');
    } else {
      setActiveTab('dashboard');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setActiveTab('dashboard');
  };

  const handleBranchChange = (branchId: string) => {
    setCurrentBranchId(branchId);
  };

  const renderContent = () => {
    // Cashier only sees POS
    if (currentUser?.role === 'cashier') {
      return <POSView onLogout={handleLogout} />;
    }

    // Admin views
    switch (activeTab) {
      case 'dashboard':
        // Show Executive Dashboard for super admin, regular dashboard for branch admin
        return currentUser?.role === 'super_admin' ? <ExecutiveDashboard /> : <Dashboard />;
      case 'members':
        return <Members />;
      case 'classes':
        return <Classes />;
      case 'coaches':
        return <CoachManagement />;
      case 'equipment':
        return <Equipment />;
      case 'inventory':
        return <Inventory />;
      case 'payments':
        return <Payments />;
      case 'expenses':
        return <Expenses />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <Settings />;
      case 'branches':
        return <BranchManagement />;
      case 'pos':
        return <POSView onLogout={handleLogout} />;
      default:
        return currentUser?.role === 'super_admin' ? <ExecutiveDashboard /> : <Dashboard />;
    }
  };

  if (!isAuthenticated || !currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  // Cashier has different layout (no sidebar, just POS with header)
  if (currentUser.role === 'cashier') {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <main className="flex-1">
          <POSView onLogout={handleLogout} />
        </main>
      </div>
    );
  }

  // Admin layouts (super_admin and branch_admin)
  return (
    <div className="flex min-h-screen bg-white font-sans text-black">
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        onLogout={handleLogout} 
        onOpenAlerts={() => {}}
        userRole={currentUser.role}
        userName={currentUser.name}
        userEmail={currentUser.email}
      />
      <div className="flex-1 flex flex-col lg:ml-0 h-screen overflow-hidden">
        <Header
          user={currentUser}
          currentBranch={currentBranch}
          branches={MOCK_BRANCHES}
          onBranchChange={currentUser.role === 'super_admin' ? handleBranchChange : undefined}
        />
        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}