import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Users, UserPlus, TrendingDown, Clock } from 'lucide-react';
import { api } from '../services/api';
import { KPITile } from '../components/ui/KPITile';
import { Card } from '../components/ui/Card';
import { formatDistanceToNow } from 'date-fns';

export const DashboardPage: React.FC = () => {
  const { data: kpiData, isLoading: kpiLoading } = useQuery({
    queryKey: ['kpi-data'],
    queryFn: api.getKPIData
  });

  const { data: employeesData } = useQuery({
    queryKey: ['employees', { limit: 5 }],
    queryFn: () => api.getEmployees({ limit: 5 })
  });

  const { data: timeOffRequests } = useQuery({
    queryKey: ['time-off-requests'],
    queryFn: api.getTimeOffRequests
  });

  const pendingRequests = timeOffRequests?.filter(req => req.status === 'pending') || [];
  const recentHires = employeesData?.employees?.slice(0, 5) || [];

  if (kpiLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-neutral-200 rounded w-64 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-neutral-200 rounded-card"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-neutral-900">Dashboard</h1>
        <p className="text-neutral-600 mt-2">Welcome back! Here's what's happening with your team.</p>
      </div>

      {/* KPI Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPITile
          title="Total Employees"
          value={kpiData?.totalEmployees || 0}
          icon={<Users className="h-6 w-6" />}
          change={{ value: 5.2, trend: 'up' }}
        />
        <KPITile
          title="New Hires"
          value={kpiData?.newHires || 0}
          icon={<UserPlus className="h-6 w-6" />}
          change={{ value: 12.1, trend: 'up' }}
        />
        <KPITile
          title="Turnover Rate"
          value={`${kpiData?.turnoverRate || 0}%`}
          icon={<TrendingDown className="h-6 w-6" />}
          change={{ value: -2.3, trend: 'down' }}
        />
        <KPITile
          title="Avg. Tenure"
          value={`${kpiData?.averageTenure || 0} years`}
          icon={<Clock className="h-6 w-6" />}
          change={{ value: 8.7, trend: 'up' }}
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Hires */}
        <div className="lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-neutral-900">Recent Hires</h2>
              <a href="/people" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                View all
              </a>
            </div>
            <div className="space-y-4">
              {recentHires.map((employee) => (
                <div key={employee.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-neutral-50 transition-colors">
                  <img
                    className="h-12 w-12 rounded-full object-cover"
                    src={employee.photo}
                    alt={`${employee.firstName} ${employee.lastName}`}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-neutral-900">
                      {employee.firstName} {employee.lastName}
                    </p>
                    <p className="text-sm text-neutral-500">{employee.jobTitle}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-neutral-900">{employee.department}</p>
                    <p className="text-xs text-neutral-500">
                      {formatDistanceToNow(new Date(employee.hireDate), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Pending Time Off Requests */}
        <div>
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-neutral-900">Pending Requests</h2>
              <a href="/timeoff" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                View all
              </a>
            </div>
            {pendingRequests.length > 0 ? (
              <div className="space-y-4">
                {pendingRequests.slice(0, 5).map((request) => (
                  <div key={request.id} className="border-l-4 border-secondary-500 pl-4 py-2">
                    <p className="text-sm font-medium text-neutral-900">{request.employeeName}</p>
                    <p className="text-sm text-neutral-600 capitalize">{request.type} leave</p>
                    <p className="text-xs text-neutral-500">
                      {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-neutral-500 text-center py-8">No pending requests</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};