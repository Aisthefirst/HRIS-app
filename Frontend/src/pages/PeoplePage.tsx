import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Plus, Eye } from 'lucide-react';
import { api } from '../services/api';
import { DataTable } from '../components/ui/DataTable';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { AddEmployeeModal } from '../components/modals/AddEmployeeModal';
import { Employee } from '../types';

export const PeoplePage: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  
  const pageSize = 10;

  const { data, isLoading } = useQuery({
    queryKey: ['employees', { page: currentPage, search, department: departmentFilter, status: statusFilter }],
    queryFn: () => api.getEmployees({
      page: currentPage,
      limit: pageSize,
      search,
      department: departmentFilter,
      status: statusFilter
    })
  });

  const { data: departments } = useQuery({
    queryKey: ['departments'],
    queryFn: api.getDepartments
  });

  const columns = [
    {
      key: 'photo',
      title: 'Photo',
      width: '80px',
      render: (value: string, record: Employee) => (
        <img
          className="h-10 w-10 rounded-full object-cover"
          src={value}
          alt={`${record.firstName} ${record.lastName}`}
        />
      )
    },
    {
      key: 'name',
      title: 'Name',
      render: (_: any, record: Employee) => (
        <div>
          <p className="font-medium text-neutral-900">{record.firstName} {record.lastName}</p>
          <p className="text-sm text-neutral-500">{record.email}</p>
        </div>
      )
    },
    {
      key: 'jobTitle',
      title: 'Job Title',
      render: (value: string) => (
        <span className="text-neutral-900">{value}</span>
      )
    },
    {
      key: 'department',
      title: 'Department',
      render: (value: string) => (
        <span className="text-neutral-700">{value}</span>
      )
    },
    {
      key: 'status',
      title: 'Status',
      render: (value: Employee['status']) => (
        <Badge variant={value === 'active' ? 'success' : value === 'on-leave' ? 'warning' : 'error'}>
          {value.replace('-', ' ')}
        </Badge>
      )
    },
    {
      key: 'hireDate',
      title: 'Hire Date',
      render: (value: string) => (
        <span className="text-neutral-700">{new Date(value).toLocaleDateString()}</span>
      )
    },
    {
      key: 'actions',
      title: 'Actions',
      width: '100px',
      render: (_: any, record: Employee) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(`/people/${record.id}`)}
          icon={<Eye className="h-4 w-4" />}
        >
          View
        </Button>
      )
    }
  ];

  const filters = (
    <>
      <select
        value={departmentFilter}
        onChange={(e) => setDepartmentFilter(e.target.value)}
        className="rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        <option value="all">All Departments</option>
        {departments?.map((dept) => (
          <option key={dept.id} value={dept.name}>{dept.name}</option>
        ))}
      </select>
      
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        <option value="all">All Status</option>
        <option value="active">Active</option>
        <option value="on-leave">On Leave</option>
        <option value="inactive">Inactive</option>
      </select>
      
      <Button
        variant="primary"
        icon={<Plus className="h-4 w-4" />}
        onClick={() => setShowAddModal(true)}
      >
        Add Employee
      </Button>
    </>
  );

  return (
    <div className="p-8 space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">People</h1>
          <p className="text-neutral-600 mt-2">Manage your team members and their information.</p>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        data={data?.employees || []}
        columns={columns}
        loading={isLoading}
        search={{
          value: search,
          onChange: setSearch,
          placeholder: 'Search employees...'
        }}
        filters={filters}
        pagination={{
          current: currentPage,
          total: data?.total || 0,
          pageSize,
          onChange: setCurrentPage
        }}
      />

      {/* Add Employee Modal */}
      <AddEmployeeModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </div>
  );
};