import { Employee, TimeOffRequest, KPIData, Department, Application, User } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

// Auth token management
const getAuthToken = (): string | null => {
  return localStorage.getItem(import.meta.env.VITE_AUTH_TOKEN_KEY || 'hris_auth_token');
};

const setAuthToken = (token: string): void => {
  localStorage.setItem(import.meta.env.VITE_AUTH_TOKEN_KEY || 'hris_auth_token', token);
};

const removeAuthToken = (): void => {
  localStorage.removeItem(import.meta.env.VITE_AUTH_TOKEN_KEY || 'hris_auth_token');
};

// HTTP client with auth headers
const apiClient = {
  get: async (endpoint: string) => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
    });
    
    if (!response.ok) {
      if (response.status === 401) {
        removeAuthToken();
        window.location.href = '/login';
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },

  post: async (endpoint: string, data: any) => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      if (response.status === 401) {
        removeAuthToken();
        window.location.href = '/login';
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },

  put: async (endpoint: string, data: any) => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      if (response.status === 401) {
        removeAuthToken();
        window.location.href = '/login';
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },

  patch: async (endpoint: string, data: any) => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      if (response.status === 401) {
        removeAuthToken();
        window.location.href = '/login';
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },

  delete: async (endpoint: string) => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
    });
    
    if (!response.ok) {
      if (response.status === 401) {
        removeAuthToken();
        window.location.href = '/login';
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },
};

export const api = {
  // Authentication endpoints
  login: async (email: string, password: string): Promise<{ user: User; token: string }> => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
      throw new Error('Invalid credentials');
    }
    
    const data = await response.json();
    setAuthToken(data.token);
    return data;
  },

  logout: async (): Promise<void> => {
    try {
      await apiClient.post('/auth/logout', {});
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      removeAuthToken();
    }
  },

  getCurrentUser: async (): Promise<User> => {
    const data = await apiClient.get('/auth/profile');
    return data.user;
  },

  // Employee endpoints
  getEmployees: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    department?: string;
    status?: string;
  }): Promise<{ employees: Employee[]; total: number; current_page: number; last_page: number }> => {
    const queryParams = new URLSearchParams();
    
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('per_page', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);
    if (params?.department && params.department !== 'all') queryParams.append('department', params.department);
    if (params?.status && params.status !== 'all') queryParams.append('status', params.status);
    
    const endpoint = `/employees${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const data = await apiClient.get(endpoint);
    
    return {
      employees: data.data,
      total: data.total,
      current_page: data.current_page,
      last_page: data.last_page,
    };
  },

  getEmployee: async (id: string): Promise<Employee> => {
    const data = await apiClient.get(`/employees/${id}`);
    return data.data;
  },

  createEmployee: async (employee: Omit<Employee, 'id'>): Promise<Employee> => {
    const data = await apiClient.post('/employees', employee);
    return data.data;
  },

  updateEmployee: async (id: string, updates: Partial<Employee>): Promise<Employee> => {
    const data = await apiClient.put(`/employees/${id}`, updates);
    return data.data;
  },

  deleteEmployee: async (id: string): Promise<void> => {
    await apiClient.delete(`/employees/${id}`);
  },

  // Time-off endpoints
  getTimeOffRequests: async (): Promise<TimeOffRequest[]> => {
    const data = await apiClient.get('/timeoff-requests');
    return data.data;
  },

  createTimeOffRequest: async (request: Omit<TimeOffRequest, 'id' | 'submittedAt'>): Promise<TimeOffRequest> => {
    const data = await apiClient.post('/timeoff-requests', request);
    return data.data;
  },

  approveTimeOffRequest: async (id: string): Promise<TimeOffRequest> => {
    const data = await apiClient.patch(`/timeoff-requests/${id}/approve`, {});
    return data.data;
  },

  rejectTimeOffRequest: async (id: string, reason?: string): Promise<TimeOffRequest> => {
    const data = await apiClient.patch(`/timeoff-requests/${id}/reject`, { reason });
    return data.data;
  },

  // Notification endpoints
  getNotifications: async (): Promise<any[]> => {
    const data = await apiClient.get('/notifications');
    return data.data;
  },

  markNotificationAsRead: async (id: string): Promise<void> => {
    await apiClient.patch(`/notifications/${id}/read`, {});
  },

  markAllNotificationsAsRead: async (): Promise<void> => {
    await apiClient.patch('/notifications/read-all', {});
  },

  // Application endpoints
  getApplications: async (): Promise<Application[]> => {
    const data = await apiClient.get('/applications');
    return data.data;
  },

  updateApplicationStatus: async (id: string, status: Application['status']): Promise<Application> => {
    const data = await apiClient.patch(`/applications/${id}/status`, { status });
    return data.data;
  },

  // Dashboard endpoints
  getKPIData: async (): Promise<KPIData> => {
    const data = await apiClient.get('/dashboard/kpi');
    return data.data;
  },

  getDepartments: async (): Promise<Department[]> => {
    const data = await apiClient.get('/departments');
    return data.data;
  },
};

// Export token management functions for use in auth hook
export { getAuthToken, setAuthToken, removeAuthToken };