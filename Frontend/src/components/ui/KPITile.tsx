import React from 'react';
import { Card } from './Card';
import { cn } from '../../utils/cn';

interface KPITileProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    trend: 'up' | 'down';
  };
  icon: React.ReactNode;
  className?: string;
}

export const KPITile: React.FC<KPITileProps> = ({
  title,
  value,
  change,
  icon,
  className
}) => {
  return (
    <Card className={cn('hover:shadow-card-hover transition-shadow duration-200', className)} hover>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-neutral-600">{title}</p>
          <p className="text-3xl font-semibold text-neutral-900 mt-2">{value}</p>
          {change && (
            <div className="flex items-center mt-2">
              <span
                className={cn(
                  'text-sm font-medium',
                  change.trend === 'up' ? 'text-green-600' : 'text-red-600'
                )}
              >
                {change.trend === 'up' ? '+' : ''}{change.value}%
              </span>
              <span className="text-sm text-neutral-500 ml-1">vs last month</span>
            </div>
          )}
        </div>
        <div className="p-3 bg-primary-50 rounded-lg">
          <div className="text-primary-600">
            {icon}
          </div>
        </div>
      </div>
    </Card>
  );
};