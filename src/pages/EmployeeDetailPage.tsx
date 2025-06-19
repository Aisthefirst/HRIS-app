import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Mail, Phone, MapPin, Calendar, DollarSign, User } from 'lucide-react';
import { api } from '../services/api';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

export const EmployeeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: employee, isLoading } = useQuery({
    queryKey: ['employee', id],
    queryFn: () => api.getEmployee(id!),
    enabled: !!id
  });

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-neutral-200 rounded w-64"></div>
          <div className="h-32 bg-neutral-200 rounded-card"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="h-64 bg-neutral-200 rounded-card"></div>
            </div>
            <div className="h-64 bg-neutral-200 rounded-card"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral-900">Employee not found</h2>
          <Button
            onClick={() => navigate('/people')}
            className="mt-4"
            icon={<ArrowLeft className="h-4 w-4" />}
          >
            Back to People
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/people')}
            icon={<ArrowLeft className="h-5 w-5" />}
          >
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">
              {employee.firstName} {employee.lastName}
            </h1>
            <p className="text-neutral-600">{employee.jobTitle}</p>
          </div>
        </div>
        <Button variant="primary">Edit Employee</Button>
      </div>

      {/* Employee Header Card */}
      <Card className="bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200">
        <div className="flex items-center space-x-6">
          <img
            className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-lg"
            src={employee.photo}
            alt={`${employee.firstName} ${employee.lastName}`}
          />
          <div className="flex-1">
            <div className="flex items-center space-x-3">
              <h2 className="text-2xl font-bold text-neutral-900">
                {employee.firstName} {employee.lastName}
              </h2>
              <Badge variant={employee.status === 'active' ? 'success' : employee.status === 'on-leave' ? 'warning' : 'error'}>
                {employee.status.replace('-', ' ')}
              </Badge>
            </div>
            <p className="text-lg text-neutral-700 mt-1">{employee.jobTitle}</p>
            <p className="text-neutral-600">{employee.department}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-neutral-600">Employee ID</p>
            <p className="text-lg font-semibold text-neutral-900">#{employee.id.padStart(4, '0')}</p>
          </div>
        </div>
      </Card>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Information */}
          <Card>
            <h3 className="text-xl font-semibold text-neutral-900 mb-6">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-neutral-400" />
                <div>
                  <p className="text-sm text-neutral-600">Email</p>
                  <p className="font-medium text-neutral-900">{employee.email}</p>
                </div>
              </div>
              {employee.phone && (
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-neutral-400" />
                  <div>
                    <p className="text-sm text-neutral-600">Phone</p>
                    <p className="font-medium text-neutral-900">{employee.phone}</p>
                  </div>
                </div>
              )}
              {employee.address && (
                <div className="flex items-center space-x-3 md:col-span-2">
                  <MapPin className="h-5 w-5 text-neutral-400" />
                  <div>
                    <p className="text-sm text-neutral-600">Address</p>
                    <p className="font-medium text-neutral-900">{employee.address}</p>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Emergency Contact */}
          {employee.emergencyContact && (
            <Card>
              <h3 className="text-xl font-semibold text-neutral-900 mb-6">Emergency Contact</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-neutral-400" />
                  <div>
                    <p className="text-sm text-neutral-600">Name</p>
                    <p className="font-medium text-neutral-900">{employee.emergencyContact.name}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-neutral-400" />
                  <div>
                    <p className="text-sm text-neutral-600">Phone</p>
                    <p className="font-medium text-neutral-900">{employee.emergencyContact.phone}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-neutral-400" />
                  <div>
                    <p className="text-sm text-neutral-600">Relationship</p>
                    <p className="font-medium text-neutral-900">{employee.emergencyContact.relationship}</p>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Employment Details */}
          <Card>
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Employment Details</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-neutral-400" />
                <div>
                  <p className="text-sm text-neutral-600">Hire Date</p>
                  <p className="font-medium text-neutral-900">
                    {new Date(employee.hireDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <DollarSign className="h-5 w-5 text-neutral-400" />
                <div>
                  <p className="text-sm text-neutral-600">Salary</p>
                  <p className="font-medium text-neutral-900">
                    ${employee.salary.toLocaleString()}
                  </p>
                </div>
              </div>
              {employee.manager && (
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-neutral-400" />
                  <div>
                    <p className="text-sm text-neutral-600">Manager</p>
                    <p className="font-medium text-neutral-900">{employee.manager}</p>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card>
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                Request Time Off
              </Button>
              <Button variant="outline" className="w-full justify-start">
                View Documents
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Performance Review
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};