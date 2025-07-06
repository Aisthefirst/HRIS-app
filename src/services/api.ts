import { Employee, TimeOffRequest, KPIData, Department, Application, User } from '../types';
import { allEmployees, mockTimeOffRequests, mockKPIData, mockDepartments, mockApplications } from '../data/mockData';

// Mock delay to simulate API calls
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock users for authentication
const mockUsers = [
  {
    id: '1',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin' as const,
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: '2',
    email: 'employee@example.com',
    name: 'Employee User',
    role: 'employee' as const,
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150'
  }
];

// Mock storage for data
let employees = [...allEmployees];
let timeOffRequests = [...mockTimeOffRequests];
let applications = [...mockApplications];
let notifications: any[] = [
  {
    id: '1',
    title: 'New Time Off Request',
    message: 'Sarah Johnson has requested 5 days of vacation leave.',
    read_at: null,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Employee Added',
    message: 'New employee Michael Chen has been added to the system.',
    read_at: new Date().toISOString(),
    created_at: new Date(Date.now() - 86400000).toISOString()
  }
];

// Auth token management (localStorage)
const getAuthToken = (): string | null => {
  return localStorage.getItem('hris_auth_token');
};

const setAuthToken = (token: string): void => {
  localStorage.setItem('hris_auth_token', token);
};

const removeAuthToken = (): void => {
  localStorage.removeItem('hris_auth_token');
};

// Current user storage
let currentUser: User | null = null;

export const api = {
  // Authentication endpoints
  login: async (email: string, password: string): Promise<{ user: User; token: string }> => {
    await delay(1000); // Simulate network delay
    
    const user = mockUsers.find(u => u.email === email);
    if (!user || password !== 'password') {
      throw new Error('Invalid credentials');
    }
    
    const token = `mock-token-${Date.now()}`;
    currentUser = user;
    setAuthToken(token);
    
    return { user, token };
  },

  logout: async (): Promise<void> => {
    await delay(500);
    currentUser = null;
    removeAuthToken();
  },

  getCurrentUser: async (): Promise<User> => {
    await delay(300);
    const token = getAuthToken();
    if (!token || !currentUser) {
      throw new Error('Not authenticated');
    }
    return currentUser;
  },

  // Employee endpoints
  getEmployees: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    department?: string;
    status?: string;
  }): Promise<{ employees: Employee[]; total: number; current_page: number; last_page: number }> => {
    await delay(800);
    
    let filteredEmployees = [...employees];
    
    // Apply filters
    if (params?.search) {
      const search = params.search.toLowerCase();
      filteredEmployees = filteredEmployees.filter(emp => 
        emp.firstName.toLowerCase().includes(search) ||
        emp.lastName.toLowerCase().includes(search) ||
        emp.email.toLowerCase().includes(search) ||
        emp.jobTitle.toLowerCase().includes(search)
      );
    }
    
    if (params?.department && params.department !== 'all') {
      filteredEmployees = filteredEmployees.filter(emp => emp.department === params.department);
    }
    
    if (params?.status && params.status !== 'all') {
      filteredEmployees = filteredEmployees.filter(emp => emp.status === params.status);
    }
    
    // Apply pagination
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedEmployees = filteredEmployees.slice(startIndex, endIndex);
    
    return {
      employees: paginatedEmployees,
      total: filteredEmployees.length,
      current_page: page,
      last_page: Math.ceil(filteredEmployees.length / limit)
    };
  },

  getEmployee: async (id: string): Promise<Employee> => {
    await delay(500);
    const employee = employees.find(emp => emp.id === id);
    if (!employee) {
      throw new Error('Employee not found');
    }
    return employee;
  },

  createEmployee: async (employeeData: Omit<Employee, 'id'>): Promise<Employee> => {
    await delay(1000);
    
    const newEmployee: Employee = {
      ...employeeData,
      id: (employees.length + 1).toString()
    };
    
    employees.push(newEmployee);
    return newEmployee;
  },

  updateEmployee: async (id: string, updates: Partial<Employee>): Promise<Employee> => {
    await delay(800);
    
    const index = employees.findIndex(emp => emp.id === id);
    if (index === -1) {
      throw new Error('Employee not found');
    }
    
    employees[index] = { ...employees[index], ...updates };
    return employees[index];
  },

  deleteEmployee: async (id: string): Promise<void> => {
    await delay(500);
    
    const index = employees.findIndex(emp => emp.id === id);
    if (index === -1) {
      throw new Error('Employee not found');
    }
    
    employees.splice(index, 1);
  },

  // Time-off endpoints
  getTimeOffRequests: async (): Promise<TimeOffRequest[]> => {
    await delay(600);
    return [...timeOffRequests];
  },

  createTimeOffRequest: async (request: Omit<TimeOffRequest, 'id' | 'submittedAt'>): Promise<TimeOffRequest> => {
    await delay(800);
    
    const newRequest: TimeOffRequest = {
      ...request,
      id: (timeOffRequests.length + 1).toString(),
      submittedAt: new Date().toISOString()
    };
    
    timeOffRequests.push(newRequest);
    
    // Add notification
    notifications.unshift({
      id: (notifications.length + 1).toString(),
      title: 'New Time Off Request',
      message: `${request.employeeName} has requested ${request.days} day(s) of ${request.type} leave.`,
      read_at: null,
      created_at: new Date().toISOString()
    });
    
    return newRequest;
  },

  approveTimeOffRequest: async (id: string): Promise<TimeOffRequest> => {
    await delay(600);
    
    const index = timeOffRequests.findIndex(req => req.id === id);
    if (index === -1) {
      throw new Error('Request not found');
    }
    
    timeOffRequests[index] = {
      ...timeOffRequests[index],
      status: 'approved',
      approvedBy: currentUser?.name || 'Admin'
    };
    
    return timeOffRequests[index];
  },

  rejectTimeOffRequest: async (id: string, reason?: string): Promise<TimeOffRequest> => {
    await delay(600);
    
    const index = timeOffRequests.findIndex(req => req.id === id);
    if (index === -1) {
      throw new Error('Request not found');
    }
    
    timeOffRequests[index] = {
      ...timeOffRequests[index],
      status: 'rejected'
    };
    
    return timeOffRequests[index];
  },

  // Notification endpoints
  getNotifications: async (): Promise<any[]> => {
    await delay(400);
    return [...notifications];
  },

  markNotificationAsRead: async (id: string): Promise<void> => {
    await delay(300);
    const index = notifications.findIndex(notif => notif.id === id);
    if (index !== -1) {
      notifications[index].read_at = new Date().toISOString();
    }
  },

  markAllNotificationsAsRead: async (): Promise<void> => {
    await delay(500);
    notifications.forEach(notif => {
      if (!notif.read_at) {
        notif.read_at = new Date().toISOString();
      }
    });
  },

  // Application endpoints
  getApplications: async (): Promise<Application[]> => {
    await delay(700);
    return [...applications];
  },

  updateApplicationStatus: async (id: string, status: Application['status']): Promise<Application> => {
    await delay(600);
    
    const index = applications.findIndex(app => app.id === id);
    if (index === -1) {
      throw new Error('Application not found');
    }
    
    applications[index] = { ...applications[index], status };
    return applications[index];
  },

  // Dashboard endpoints
  getKPIData: async (): Promise<KPIData> => {
    await delay(500);
    return {
      ...mockKPIData,
      totalEmployees: employees.length
    };
  },

  getDepartments: async (): Promise<Department[]> => {
    await delay(400);
    return [...mockDepartments];
  },
};

// Export token management functions for use in auth hook
export { getAuthToken, setAuthToken, removeAuthToken };