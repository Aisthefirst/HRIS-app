import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Calendar, Clock, Check, X, Plus } from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { DataTable } from '../components/ui/DataTable';
import { TimeOffRequestModal } from '../components/modals/TimeOffRequestModal';
import { RoleBasedComponent } from '../components/auth/RoleBasedComponent';
import { TimeOffRequest } from '../types';

export const TimeOffPage: React.FC = () => {
  const [view, setView] = useState<'calendar' | 'list'>('list');
  const [showRequestModal, setShowRequestModal] = useState(false);
  const { hasPermission } = useAuth();
  const { addToast } = useToast();
  const queryClient = useQueryClient();

  const { data: timeOffRequests, isLoading } = useQuery({
    queryKey: ['time-off-requests'],
    queryFn: api.getTimeOffRequests
  });

  const approveRequestMutation = useMutation({
    mutationFn: api.approveTimeOffRequest,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['time-off-requests'] });
      addToast({
        type: 'success',
        title: 'Request Approved',
        message: `Time off request for ${data.employeeName} has been approved.`,
      });
    },
    onError: (error: any) => {
      addToast({
        type: 'error',
        title: 'Error Approving Request',
        message: error.message || 'Failed to approve request. Please try again.',
      });
    }
  });

  const rejectRequestMutation = useMutation({
    mutationFn: (id: string) => api.rejectTimeOffRequest(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['time-off-requests'] });
      addToast({
        type: 'info',
        title: 'Request Rejected',
        message: `Time off request for ${data.employeeName} has been rejected.`,
      });
    },
    onError: (error: any) => {
      addToast({
        type: 'error',
        title: 'Error Rejecting Request',
        message: error.message || 'Failed to reject request. Please try again.',
      });
    }
  });

  const pendingRequests = timeOffRequests?.filter(req => req.status === 'pending') || [];
  const approvedRequests = timeOffRequests?.filter(req => req.status === 'approved') || [];

  const columns = [
    {
      key: 'employeeName',
      title: 'Employee',
      render: (value: string) => (
        <span className="font-medium text-neutral-900">{value}</span>
      )
    },
    {
      key: 'type',
      title: 'Type',
      render: (value: TimeOffRequest['type']) => (
        <Badge variant="info" className="capitalize">{value}</Badge>
      )
    },
    {
      key: 'dates',
      title: 'Dates',
      render: (_: any, record: TimeOffRequest) => (
        <div>
          <p className="text-sm font-medium text-neutral-900">
            {new Date(record.startDate).toLocaleDateString()} - {new Date(record.endDate).toLocaleDateString()}
          </p>
          <p className="text-xs text-neutral-500">{record.days} day{record.days > 1 ? 's' : ''}</p>
        </div>
      )
    },
    {
      key: 'status',
      title: 'Status',
      render: (value: TimeOffRequest['status']) => (
        <Badge variant={
          value === 'approved' ? 'success' : 
          value === 'rejected' ? 'error' : 'warning'
        }>
          {value}
        </Badge>
      )
    },
    {
      key: 'submittedAt',
      title: 'Submitted',
      render: (value: string) => (
        <span className="text-neutral-700">{new Date(value).toLocaleDateString()}</span>
      )
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (_: any, record: TimeOffRequest) => (
        <RoleBasedComponent requiredPermission="approve_timeoff">
          {record.status === 'pending' ? (
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-green-600 hover:text-green-700"
                icon={<Check className="h-4 w-4" />}
                onClick={() => approveRequestMutation.mutate(record.id)}
                loading={approveRequestMutation.isPending}
              >
                Approve
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-red-600 hover:text-red-700"
                icon={<X className="h-4 w-4" />}
                onClick={() => rejectRequestMutation.mutate(record.id)}
                loading={rejectRequestMutation.isPending}
              >
                Reject
              </Button>
            </div>
          ) : (
            <span className="text-sm text-neutral-500">
              {record.status === 'approved' ? `Approved` : 'Rejected'}
            </span>
          )}
        </RoleBasedComponent>
      )
    }
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Time Off</h1>
          <p className="text-neutral-600 mt-2">Manage time-off requests and view team calendar.</p>
        </div>
        <div className="flex items-center space-x-4">
          <RoleBasedComponent requiredPermission="view_timeoff">
            <div className="flex rounded-lg border border-neutral-300">
              <button
                onClick={() => setView('list')}
                className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                  view === 'list' 
                    ? 'bg-primary-50 text-primary-700 border-primary-200' 
                    : 'text-neutral-700 hover:text-neutral-900'
                }`}
              >
                List View
              </button>
              <button
                onClick={() => setView('calendar')}
                className={`px-4 py-2 text-sm font-medium rounded-r-lg border-l ${
                  view === 'calendar' 
                    ? 'bg-primary-50 text-primary-700 border-primary-200' 
                    : 'text-neutral-700 hover:text-neutral-900'
                }`}
              >
                Calendar View
              </button>
            </div>
          </RoleBasedComponent>
          <RoleBasedComponent requiredPermission="create_timeoff">
            <Button
              variant="primary"
              icon={<Plus className="h-4 w-4" />}
              onClick={() => setShowRequestModal(true)}
            >
              New Request
            </Button>
          </RoleBasedComponent>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-secondary-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-neutral-600">Pending Requests</p>
              <p className="text-2xl font-bold text-neutral-900">{pendingRequests.length}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center">
            <Check className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-neutral-600">Approved This Month</p>
              <p className="text-2xl font-bold text-neutral-900">{approvedRequests.length}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-primary-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-neutral-600">Total Days Off</p>
              <p className="text-2xl font-bold text-neutral-900">
                {timeOffRequests?.reduce((acc, req) => acc + req.days, 0) || 0}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Content based on view */}
      {view === 'list' ? (
        <DataTable
          data={timeOffRequests || []}
          columns={columns}
          loading={isLoading}
        />
      ) : (
        <Card>
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-neutral-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">Calendar View</h3>
            <p className="text-neutral-600">Calendar integration coming soon</p>
          </div>
        </Card>
      )}

      {/* Time Off Request Modal */}
      <TimeOffRequestModal
        open={showRequestModal}
        onClose={() => setShowRequestModal(false)}
      />
    </div>
  );
};