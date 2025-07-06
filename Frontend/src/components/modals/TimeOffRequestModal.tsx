import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { api } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';

interface TimeOffRequestModalProps {
  open: boolean;
  onClose: () => void;
}

const timeOffTypes = [
  { value: 'vacation', label: 'Vacation' },
  { value: 'sick', label: 'Sick Leave' },
  { value: 'personal', label: 'Personal' },
  { value: 'parental', label: 'Parental Leave' }
];

export const TimeOffRequestModal: React.FC<TimeOffRequestModalProps> = ({ open, onClose }) => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    type: 'vacation',
    reason: ''
  });

  const queryClient = useQueryClient();

  const createRequestMutation = useMutation({
    mutationFn: api.createTimeOffRequest,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['time-off-requests'] });
      addToast({
        type: 'success',
        title: 'Time Off Request Submitted',
        message: `Your ${data.type} request for ${data.days} day(s) has been submitted for approval.`,
      });
      onClose();
      setFormData({
        startDate: '',
        endDate: '',
        type: 'vacation',
        reason: ''
      });
    },
    onError: (error: any) => {
      addToast({
        type: 'error',
        title: 'Error Submitting Request',
        message: error.message || 'Failed to submit time off request. Please try again.',
      });
    }
  });

  const calculateDays = (start: string, end: string): number => {
    if (!start || !end) return 0;
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const requestData = {
      employeeId: user?.id || '1',
      employeeName: user?.name || 'Current User',
      type: formData.type as 'vacation' | 'sick' | 'personal' | 'parental',
      startDate: formData.startDate,
      endDate: formData.endDate,
      days: calculateDays(formData.startDate, formData.endDate),
      status: 'pending' as const,
      reason: formData.reason
    };

    createRequestMutation.mutate(requestData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const days = calculateDays(formData.startDate, formData.endDate);

  return (
    <Modal open={open} onClose={onClose} title="Request Time Off">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Select
          label="Type"
          value={formData.type}
          onChange={(e) => handleInputChange('type', e.target.value)}
          options={timeOffTypes}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Start Date"
            type="date"
            value={formData.startDate}
            onChange={(e) => handleInputChange('startDate', e.target.value)}
            required
          />
          <Input
            label="End Date"
            type="date"
            value={formData.endDate}
            onChange={(e) => handleInputChange('endDate', e.target.value)}
            min={formData.startDate}
            required
          />
        </div>

        {days > 0 && (
          <div className="p-3 bg-primary-50 rounded-lg">
            <p className="text-sm text-primary-700">
              Total days requested: <span className="font-semibold">{days}</span>
            </p>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Reason (Optional)
          </label>
          <textarea
            value={formData.reason}
            onChange={(e) => handleInputChange('reason', e.target.value)}
            rows={3}
            className="block w-full rounded-card border border-neutral-300 px-3 py-2 text-sm placeholder-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            placeholder="Please provide a reason for your time off request..."
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
            loading={createRequestMutation.isPending}
          >
            Submit Request
          </Button>
        </div>
      </form>
    </Modal>
  );
};