import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Settings, 
  Briefcase
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { cn } from '../../utils/cn';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'People', href: '/people', icon: Users },
  { name: 'Time Off', href: '/timeoff', icon: Calendar },
  { name: 'Recruitment', href: '/recruitment', icon: Briefcase, adminOnly: true },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  const isAdmin = user?.role === 'admin';

  return (
    <div className="h-full flex flex-col bg-white border-r border-neutral-200">
      {/* Logo */}
      <div className="flex items-center h-16 px-6 border-b border-neutral-200">
        <div className="flex items-center">
          <img src='/assets/otb-icon.png' width={40} height={40} alt="logo" />
          <span className="ml-2 text-xl font-semibold text-neutral-900">OTB-HRIS</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          // Hide admin-only items for non-admin users
          if (item.adminOnly && !isAdmin) {
            return null;
          }

          const isActive = location.pathname === item.href || 
            (item.href !== '/dashboard' && location.pathname.startsWith(item.href));
          
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={cn(
                'group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                isActive
                  ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                  : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
              )}
            >
              <item.icon
                className={cn(
                  'mr-3 h-5 w-5',
                  isActive ? 'text-primary-600' : 'text-neutral-400 group-hover:text-neutral-600'
                )}
              />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-neutral-200">
        <span className="mr-3 h-5 w-5 text-xs font-semibold text-neutral-600">© Copyright 2025 - Omah Tegal Bisma </span>
        {/* <button
          onClick={logout}
          className="group flex items-center w-full px-3 py-2 text-sm font-medium text-neutral-600 rounded-lg hover:bg-neutral-50 hover:text-neutral-900 transition-colors"
        >
          <LogOut className="mr-3 h-5 w-5 text-neutral-400 group-hover:text-neutral-600" />
          Sign Out
        </button> */}
      </div>
    </div>
  );
};