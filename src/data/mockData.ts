import { Employee, TimeOffRequest, KPIData, Department, Application } from '../types';

export const mockEmployees: Employee[] = [
  {
    id: '1',
    photo: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@company.com',
    jobTitle: 'Senior Software Engineer',
    department: 'Engineering',
    status: 'active',
    hireDate: '2022-03-15',
    salary: 95000,
    manager: 'Michael Chen',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, San Francisco, CA',
    emergencyContact: {
      name: 'John Johnson',
      phone: '+1 (555) 987-6543',
      relationship: 'Spouse'
    }
  },
  {
    id: '2',
    photo: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'michael.chen@company.com',
    jobTitle: 'Engineering Manager',
    department: 'Engineering',
    status: 'active',
    hireDate: '2021-01-20',
    salary: 125000,
    phone: '+1 (555) 234-5678',
    address: '456 Oak Ave, San Francisco, CA'
  },
  {
    id: '3',
    photo: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
    firstName: 'Emily',
    lastName: 'Rodriguez',
    email: 'emily.rodriguez@company.com',
    jobTitle: 'Product Designer',
    department: 'Design',
    status: 'active',
    hireDate: '2022-07-10',
    salary: 85000,
    manager: 'David Kim'
  },
  {
    id: '4',
    photo: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
    firstName: 'David',
    lastName: 'Kim',
    email: 'david.kim@company.com',
    jobTitle: 'Design Director',
    department: 'Design',
    status: 'active',
    hireDate: '2020-11-05',
    salary: 115000
  },
  {
    id: '5',
    photo: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150',
    firstName: 'Jessica',
    lastName: 'Williams',
    email: 'jessica.williams@company.com',
    jobTitle: 'Marketing Manager',
    department: 'Marketing',
    status: 'on-leave',
    hireDate: '2021-09-12',
    salary: 78000,
    manager: 'Robert Taylor'
  },
  // Add more employees to reach 50...
];

// Generate additional employees to reach 50 total
const additionalEmployees: Employee[] = Array.from({ length: 45 }, (_, index) => {
  const firstNames = ['Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Avery', 'Quinn', 'Sage', 'River'];
  const lastNames = ['Smith', 'Brown', 'Davis', 'Wilson', 'Moore', 'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White'];
  const departments = ['Engineering', 'Design', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations'];
  const jobTitles = {
    Engineering: ['Software Engineer', 'Senior Developer', 'DevOps Engineer', 'QA Engineer'],
    Design: ['UI Designer', 'UX Researcher', 'Product Designer', 'Visual Designer'],
    Marketing: ['Marketing Specialist', 'Content Creator', 'SEO Specialist', 'Brand Manager'],
    Sales: ['Sales Representative', 'Account Manager', 'Sales Director', 'Business Development'],
    HR: ['HR Generalist', 'Recruiter', 'HR Manager', 'People Operations'],
    Finance: ['Financial Analyst', 'Accountant', 'Controller', 'Finance Manager'],
    Operations: ['Operations Manager', 'Project Manager', 'Business Analyst', 'Program Manager']
  };

  const department = departments[index % departments.length];
  const firstName = firstNames[index % firstNames.length];
  const lastName = lastNames[index % lastNames.length];
  
  return {
    id: (index + 6).toString(),
    photo: `https://images.pexels.com/photos/${2000000 + index}/pexels-photo-${2000000 + index}.jpeg?auto=compress&cs=tinysrgb&w=150`,
    firstName,
    lastName,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@company.com`,
    jobTitle: jobTitles[department as keyof typeof jobTitles][index % 4],
    department,
    status: ['active', 'active', 'active', 'on-leave', 'inactive'][index % 5] as 'active' | 'on-leave' | 'inactive',
    hireDate: new Date(2020 + (index % 4), index % 12, (index % 28) + 1).toISOString().split('T')[0],
    salary: 50000 + (index * 1000) + Math.floor(Math.random() * 20000)
  };
});

export const allEmployees = [...mockEmployees, ...additionalEmployees];

export const mockTimeOffRequests: TimeOffRequest[] = [
  {
    id: '1',
    employeeId: '1',
    employeeName: 'Sarah Johnson',
    type: 'vacation',
    startDate: '2024-02-15',
    endDate: '2024-02-19',
    days: 5,
    status: 'pending',
    reason: 'Family vacation',
    submittedAt: '2024-01-25'
  },
  {
    id: '2',
    employeeId: '3',
    employeeName: 'Emily Rodriguez',
    type: 'sick',
    startDate: '2024-01-30',
    endDate: '2024-01-30',
    days: 1,
    status: 'approved',
    approvedBy: 'David Kim',
    submittedAt: '2024-01-30'
  }
];

export const mockApplications: Application[] = [
  {
    id: '1',
    candidateName: 'Alice Cooper',
    email: 'alice.cooper@email.com',
    jobTitle: 'Senior Frontend Developer',
    status: 'new',
    submittedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    candidateName: 'Bob Martinez',
    email: 'bob.martinez@email.com',
    jobTitle: 'Product Designer',
    status: 'in_review',
    submittedAt: '2024-01-14T14:20:00Z'
  },
  {
    id: '3',
    candidateName: 'Carol Thompson',
    email: 'carol.thompson@email.com',
    jobTitle: 'Marketing Manager',
    status: 'accepted',
    submittedAt: '2024-01-12T09:15:00Z'
  },
  {
    id: '4',
    candidateName: 'David Wilson',
    email: 'david.wilson@email.com',
    jobTitle: 'DevOps Engineer',
    status: 'rejected',
    submittedAt: '2024-01-10T16:45:00Z'
  },
  {
    id: '5',
    candidateName: 'Emma Davis',
    email: 'emma.davis@email.com',
    jobTitle: 'UX Researcher',
    status: 'new',
    submittedAt: '2024-01-16T11:00:00Z'
  },
  {
    id: '6',
    candidateName: 'Frank Miller',
    email: 'frank.miller@email.com',
    jobTitle: 'Sales Representative',
    status: 'in_review',
    submittedAt: '2024-01-13T13:30:00Z'
  },
  {
    id: '7',
    candidateName: 'Grace Lee',
    email: 'grace.lee@email.com',
    jobTitle: 'Financial Analyst',
    status: 'new',
    submittedAt: '2024-01-17T08:45:00Z'
  },
  {
    id: '8',
    candidateName: 'Henry Brown',
    email: 'henry.brown@email.com',
    jobTitle: 'HR Generalist',
    status: 'in_review',
    submittedAt: '2024-01-11T15:20:00Z'
  },
  {
    id: '9',
    candidateName: 'Ivy Chen',
    email: 'ivy.chen@email.com',
    jobTitle: 'Software Engineer',
    status: 'accepted',
    submittedAt: '2024-01-09T12:10:00Z'
  },
  {
    id: '10',
    candidateName: 'Jack Robinson',
    email: 'jack.robinson@email.com',
    jobTitle: 'Project Manager',
    status: 'new',
    submittedAt: '2024-01-18T10:00:00Z'
  }
];

export const mockKPIData: KPIData = {
  totalEmployees: 50,
  newHires: 8,
  turnoverRate: 12.5,
  averageTenure: 2.3
};

export const mockDepartments: Department[] = [
  { id: '1', name: 'Engineering', headId: '2', employeeCount: 15 },
  { id: '2', name: 'Design', headId: '4', employeeCount: 8 },
  { id: '3', name: 'Marketing', headId: '5', employeeCount: 6 },
  { id: '4', name: 'Sales', employeeCount: 10 },
  { id: '5', name: 'HR', employeeCount: 4 },
  { id: '6', name: 'Finance', employeeCount: 3 },
  { id: '7', name: 'Operations', employeeCount: 4 }
];