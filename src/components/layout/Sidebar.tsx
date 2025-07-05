import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Settings, 
  LogOut,
  Building2,
  Briefcase,
  User
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { RoleBasedComponent } from '../auth/RoleBasedComponent';
import { cn } from '../../utils/cn';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, permission: 'view_dashboard' },
  { name: 'My Profile', href: '/profile', icon: User, permission: 'view_own_profile' },
  { name: 'People', href: '/people', icon: Users, permission: 'view_employees' },
  { name: 'Time Off', href: '/timeoff', icon: Calendar, permission: 'view_timeoff' },
  { name: 'Recruitment', href: '/recruitment', icon: Briefcase, permission: 'view_recruitment' },
  { name: 'Settings', href: '/settings', icon: Settings, permission: 'view_settings' },
];

export const Sidebar: React.FC = () => {
  const { logout, user, hasPermission } = useAuth();
  const location = useLocation();

  return (
    <div className="h-full flex flex-col bg-white border-r border-neutral-200">
      {/* Logo */}
      <div className="flex items-center h-16 px-6 border-b border-neutral-200">
        <div className="flex items-center">
          <Building2 className="h-8 w-8 text-primary-600" />
          <span className="ml-2 text-xl font-semibold text-neutral-900">HRIS</span>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-neutral-200">
        <div className="flex items-center space-x-3">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src={user?.avatar || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150'}
            alt={user?.name}
          />
          <div>
            <p className="text-sm font-medium text-neutral-900">{user?.name}</p>
            <p className="text-xs text-neutral-500 capitalize">{user?.role}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          // Check if user has permission for this nav item
          if (item.permission && !hasPermission(item.permission)) {
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