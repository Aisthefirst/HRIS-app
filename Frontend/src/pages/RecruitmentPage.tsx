import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Briefcase, Users, Clock, CheckCircle } from 'lucide-react';
import { api } from '../services/api';
import { Card } from '../components/ui/Card';
import { DataTable } from '../components/ui/DataTable';
import { Badge } from '../components/ui/Badge';
import { Select } from '../components/ui/Select';
import { Application } from '../types';
import { formatDistanceToNow } from 'date-fns';

const statusOptions = [
  { value: 'new', label: 'New' },
  { value: 'in_review', label: 'In Review' },
  { value: 'accepted', label: 'Accepted' },
  { value: 'rejected', label: 'Rejected' }
];

export const RecruitmentPage: React.FC = () => {
  const queryClient = useQueryClient();

  const { data: applications, isLoading } = useQuery({
    queryKey: ['applications'],
    queryFn: api.getApplications
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: Application['status'] }) =>
      api.updateApplicationStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
    }
  });

  const handleStatusChange = (applicationId: string, newStatus: Application['status']) => {
    updateStatusMutation.mutate({ id: applicationId, status: newStatus });
  };

  const getStatusVariant = (status: Application['status']) => {
    switch (status) {
      case 'new':
        return 'info';
      case 'in_review':
        return 'warning';
      case 'accepted':
        return 'success';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  const columns = [
    {
      key: 'candidateName',
      title: 'Candidate',
      render: (value: string, record: Application) => (
        <div>
          <p className="font-medium text-neutral-900">{value}</p>
          <p className="text-sm text-neutral-500">{record.email}</p>
        </div>
      )
    },
    {
      key: 'jobTitle',
      title: 'Position',
      render: (value: string) => (
        <span className="text-neutral-900">{value}</span>
      )
    },
    {
      key: 'status',
      title: 'Status',
      render: (value: Application['status'], record: Application) => (
        <div className="flex items-center space-x-2">
          <Badge variant={getStatusVariant(value)}>
            {value.replace('_', ' ')}
          </Badge>
          <Select
            options={statusOptions}
            value={value}
            onChange={(e) => handleStatusChange(record.id, e.target.value as Application['status'])}
            className="min-w-[120px] text-xs"
          />
        </div>
      )
    },
    {
      key: 'submittedAt',
      title: 'Submitted',
      render: (value: string) => (
        <div>
          <p className="text-sm text-neutral-900">
            {new Date(value).toLocaleDateString()}
          </p>
          <p className="text-xs text-neutral-500">
            {formatDistanceToNow(new Date(value), { addSuffix: true })}
          </p>
        </div>
      )
    }
  ];

  const stats = applications ? {
    total: applications.length,
    new: applications.filter(app => app.status === 'new').length,
    inReview: applications.filter(app => app.status === 'in_review').length,
    accepted: applications.filter(app => app.status === 'accepted').length
  } : { total: 0, new: 0, inReview: 0, accepted: 0 };

  return (
    <div className="p-8 space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-neutral-900">Recruitment</h1>
        <p className="text-neutral-600 mt-2">Manage job applications and candidate pipeline.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center">
            <Briefcase className="h-8 w-8 text-primary-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-neutral-600">Total Applications</p>
              <p className="text-2xl font-bold text-neutral-900">{stats.total}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center">
            <Users className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-neutral-600">New Applications</p>
              <p className="text-2xl font-bold text-neutral-900">{stats.new}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-secondary-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-neutral-600">In Review</p>
              <p className="text-2xl font-bold text-neutral-900">{stats.inReview}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-neutral-600">Accepted</p>
              <p className="text-2xl font-bold text-neutral-900">{stats.accepted}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Applications Table */}
      <DataTable
        data={applications || []}
        columns={columns}
        loading={isLoading}
      />
    </div>
  );
};