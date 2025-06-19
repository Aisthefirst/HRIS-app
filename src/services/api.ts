import { Employee, TimeOffRequest, KPIData, Department, Application } from '../types';
import { allEmployees, mockTimeOffRequests, mockKPIData, mockDepartments, mockApplications } from '../data/mockData';

// Simulate API delays
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // Employee endpoints
  getEmployees: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    department?: string;
    status?: string;
  }): Promise<{ employees: Employee[]; total: number }> => {
    await delay(500);
    
    let filtered = [...allEmployees];
    
    if (params?.search) {
      const search = params.search.toLowerCase();
      filtered = filtered.filter(emp => 
        `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(search) ||
        emp.email.toLowerCase().includes(search) ||
        emp.jobTitle.toLowerCase().includes(search)
      );
    }
    
    if (params?.department && params.department !== 'all') {
      filtered = filtered.filter(emp => emp.department === params.department);
    }
    
    if (params?.status && params.status !== 'all') {
      filtered = filtered.filter(emp => emp.status === params.status);
    }
    
    const total = filtered.length;
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const start = (page - 1) * limit;
    const employees = filtered.slice(start, start + limit);
    
    return { employees, total };
  },

  getEmployee: async (id: string): Promise<Employee | null> => {
    await delay(300);
    return allEmployees.find(emp => emp.id === id) || null;
  },

  createEmployee: async (employee: Omit<Employee, 'id'>): Promise<Employee> => {
    await delay(500);
    const newEmployee = {
      ...employee,
      id: Date.now().toString()
    };
    allEmployees.push(newEmployee);
    return newEmployee;
  },

  updateEmployee: async (id: string, updates: Partial<Employee>): Promise<Employee> => {
    await delay(500);
    const index = allEmployees.findIndex(emp => emp.id === id);
    if (index === -1) throw new Error('Employee not found');
    
    allEmployees[index] = { ...allEmployees[index], ...updates };
    return allEmployees[index];
  },

  deleteEmployee: async (id: string): Promise<void> => {
    await delay(500);
    const index = allEmployees.findIndex(emp => emp.id === id);
    if (index === -1) throw new Error('Employee not found');
    
    allEmployees.splice(index, 1);
  },

  // Time-off endpoints
  getTimeOffRequests: async (): Promise<TimeOffRequest[]> => {
    await delay(400);
    return mockTimeOffRequests;
  },

  createTimeOffRequest: async (request: Omit<TimeOffRequest, 'id' | 'submittedAt'>): Promise<TimeOffRequest> => {
    await delay(500);
    const newRequest = {
      ...request,
      id: Date.now().toString(),
      submittedAt: new Date().toISOString().split('T')[0]
    };
    mockTimeOffRequests.push(newRequest);
    return newRequest;
  },

  approveTimeOffRequest: async (id: string, approvedBy: string): Promise<TimeOffRequest> => {
    await delay(500);
    const request = mockTimeOffRequests.find(req => req.id === id);
    if (!request) throw new Error('Request not found');
    
    request.status = 'approved';
    request.approvedBy = approvedBy;
    return request;
  },

  rejectTimeOffRequest: async (id: string): Promise<TimeOffRequest> => {
    await delay(500);
    const request = mockTimeOffRequests.find(req => req.id === id);
    if (!request) throw new Error('Request not found');
    
    request.status = 'rejected';
    return request;
  },

  // Application endpoints
  getApplications: async (): Promise<Application[]> => {
    await delay(400);
    return mockApplications;
  },

  updateApplicationStatus: async (id: string, status: Application['status']): Promise<Application> => {
    await delay(300);
    const application = mockApplications.find(app => app.id === id);
    if (!application) throw new Error('Application not found');
    
    application.status = status;
    return application;
  },

  // Dashboard endpoints
  getKPIData: async (): Promise<KPIData> => {
    await delay(300);
    return mockKPIData;
  },

  getDepartments: async (): Promise<Department[]> => {
    await delay(200);
    return mockDepartments;
  }
};