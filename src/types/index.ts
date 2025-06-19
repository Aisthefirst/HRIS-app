export interface Employee {
  id: string;
  photo: string;
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
  department: string;
  status: 'active' | 'inactive' | 'on-leave';
  hireDate: string;
  salary: number;
  manager?: string;
  phone?: string;
  address?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
}

export interface TimeOffRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  type: 'vacation' | 'sick' | 'personal' | 'parental';
  startDate: string;
  endDate: string;
  days: number;
  status: 'pending' | 'approved' | 'rejected';
  reason?: string;
  approvedBy?: string;
  submittedAt: string;
}

export interface Application {
  id: string;
  candidateName: string;
  email: string;
  jobTitle: string;
  status: 'new' | 'in_review' | 'accepted' | 'rejected';
  submittedAt: string;
  resume?: string;
  coverLetter?: string;
}

export interface KPIData {
  totalEmployees: number;
  newHires: number;
  turnoverRate: number;
  averageTenure: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'hr' | 'manager' | 'employee';
  avatar?: string;
}

export interface Department {
  id: string;
  name: string;
  headId?: string;
  employeeCount: number;
}