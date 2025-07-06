import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';
import { api, getAuthToken, removeAuthToken } from '../services/api';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  getCurrentUser: () => Promise<void>;
  hasRole: (role: string) => boolean;
  hasPermission: (permission: string) => boolean;
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      
      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          const { user, token } = await api.login(email, password);
          set({ 
            user, 
            isAuthenticated: true, 
            isLoading: false 
          });
          return true;
        } catch (error) {
          console.error('Login error:', error);
          set({ isLoading: false });
          return false;
        }
      },
      
      logout: () => {
        api.logout();
        set({ user: null, isAuthenticated: false });
      },
      
      getCurrentUser: async () => {
        const token = getAuthToken();
        if (!token) {
          set({ user: null, isAuthenticated: false });
          return;
        }
        
        try {
          const user = await api.getCurrentUser();
          set({ user, isAuthenticated: true });
        } catch (error) {
          console.error('Get current user error:', error);
          removeAuthToken();
          set({ user: null, isAuthenticated: false });
        }
      },
      
      hasRole: (role: string) => {
        const { user } = get();
        return user?.role === role;
      },
      
      hasPermission: (permission: string) => {
        const { user } = get();
        if (!user) return false;
        
        // Define role-based permissions
        const rolePermissions = {
          admin: [
            'view_employees',
            'create_employees',
            'edit_employees',
            'delete_employees',
            'view_timeoff',
            'approve_timeoff',
            'view_recruitment',
            'manage_applications',
            'view_settings',
            'manage_settings',
            'view_dashboard',
          ],
          hr: [
            'view_employees',
            'create_employees',
            'edit_employees',
            'view_timeoff',
            'approve_timeoff',
            'view_recruitment',
            'manage_applications',
            'view_dashboard',
          ],
          manager: [
            'view_employees',
            'view_timeoff',
            'approve_timeoff',
            'view_dashboard',
          ],
          employee: [
            'view_own_profile',
            'edit_own_profile',
            'create_timeoff',
            'view_own_timeoff',
          ],
        };
        
        const userPermissions = rolePermissions[user.role as keyof typeof rolePermissions] || [];
        return userPermissions.includes(permission);
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);