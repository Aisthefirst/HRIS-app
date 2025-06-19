import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { api } from '../../services/api';

interface AddEmployeeModalProps {
  open: boolean;
  onClose: () => void;
}

const departments = [
  { value: 'Engineering', label: 'Engineering' },
  { value: 'Design', label: 'Design' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Sales', label: 'Sales' },
  { value: 'HR', label: 'HR' },
  { value: 'Finance', label: 'Finance' },
  { value: 'Operations', label: 'Operations' }
];

const jobTitles = [
  { value: 'Software Engineer', label: 'Software Engineer' },
  { value: 'Senior Software Engineer', label: 'Senior Software Engineer' },
  { value: 'Product Designer', label: 'Product Designer' },
  { value: 'Marketing Manager', label: 'Marketing Manager' },
  { value: 'Sales Representative', label: 'Sales Representative' },
  { value: 'HR Generalist', label: 'HR Generalist' },
  { value: 'Financial Analyst', label: 'Financial Analyst' }
];

export const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    jobTitle: '',
    department: '',
    hireDate: '',
    salary: ''
  });

  const queryClient = useQueryClient();

  const createEmployeeMutation = useMutation({
    mutationFn: api.createEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      onClose();
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        jobTitle: '',
        department: '',
        hireDate: '',
        salary: ''
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const employeeData = {
      ...formData,
      salary: parseInt(formData.salary),
      status: 'active' as const,
      photo: `https://images.pexels.com/photos/${2000000 + Math.floor(Math.random() * 1000)}/pexels-photo-${2000000 + Math.floor(Math.random() * 1000)}.jpeg?auto=compress&cs=tinysrgb&w=150`
    };

    createEmployeeMutation.mutate(employeeData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Modal open={open} onClose={onClose} title="Add New Employee" size="lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="First Name"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            required
          />
          <Input
            label="Last Name"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            required
          />
        </div>

        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Job Title"
            value={formData.jobTitle}
            onChange={(e) => handleInputChange('jobTitle', e.target.value)}
            options={jobTitles}
            required
          />
          <Select
            label="Department"
            value={formData.department}
            onChange={(e) => handleInputChange('department', e.target.value)}
            options={departments}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Hire Date"
            type="date"
            value={formData.hireDate}
            onChange={(e) => handleInputChange('hireDate', e.target.value)}
            required
          />
          <Input
            label="Salary"
            type="number"
            value={formData.salary}
            onChange={(e) => handleInputChange('salary', e.target.value)}
            required
          />
        </div>

        <div className="flex justify-end space-x-3 pt-6 border-t border-neutral-200">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            loading={createEmployeeMutation.isPending}
          >
            Add Employee
          </Button>
        </div>
      </form>
    </Modal>
  );
};