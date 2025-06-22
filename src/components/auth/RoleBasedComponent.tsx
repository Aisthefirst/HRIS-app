import React from 'react';
import { useAuth } from '../../hooks/useAuth';

interface RoleBasedComponentProps {
  children: React.ReactNode;
  allowedRoles?: string[];
  requiredPermission?: string;
  fallback?: React.ReactNode;
}

export const RoleBasedComponent: React.FC<RoleBasedComponentProps> = ({
  children,
  allowedRoles,
  requiredPermission,
  fallback = null,
}) => {
  const { user, hasRole, hasPermission } = useAuth();
  
  if (!user) {
    return <>{fallback}</>;
  }
  
  if (allowedRoles && !allowedRoles.some(role => hasRole(role))) {
    return <>{fallback}</>;
  }
  
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <>{fallback}</>;
  }
  
  return <>{children}</>;
};