import React from 'react';
import { Card } from './Card';
import { Button } from './Button';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { Input } from './Input';

interface Column<T> {
  key: keyof T | string;
  title: string;
  render?: (value: any, record: T) => React.ReactNode;
  width?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  pagination?: {
    current: number;
    total: number;
    pageSize: number;
    onChange: (page: number) => void;
  };
  search?: {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
  };
  filters?: React.ReactNode;
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  pagination,
  search,
  filters
}: DataTableProps<T>) {
  return (
    <Card className="overflow-hidden" padding="sm">
      {/* Header with search and filters */}
      {(search || filters) && (
        <div className="p-4 border-b border-neutral-200">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            {search && (
              <div className="flex-1 max-w-md">
                <Input
                  placeholder={search.placeholder || 'Search...'}
                  value={search.value}
                  onChange={(e) => search.onChange(e.target.value)}
                  icon={<Search className="h-4 w-4 text-neutral-400" />}
                />
              </div>
            )}
            {filters && (
              <div className="flex items-center gap-2">
                {filters}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-neutral-200">
          <thead className="bg-neutral-50">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider"
                  style={{ width: column.width }}
                >
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-neutral-200">
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-8 text-center text-neutral-500">
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Loading...
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-8 text-center text-neutral-500">
                  No data available
                </td>
              </tr>
            ) : (
              data.map((record, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-neutral-50">
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                      {column.render
                        ? column.render(record[column.key as keyof T], record)
                        : record[column.key as keyof T]
                      }
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && pagination.total > 0 && (
        <div className="px-6 py-3 border-t border-neutral-200 flex items-center justify-between">
          <div className="text-sm text-neutral-700">
            Showing {((pagination.current - 1) * pagination.pageSize) + 1} to{' '}
            {Math.min(pagination.current * pagination.pageSize, pagination.total)} of{' '}
            {pagination.total} results
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => pagination.onChange(pagination.current - 1)}
              disabled={pagination.current === 1}
              icon={<ChevronLeft className="h-4 w-4" />}
            >
              Previous
            </Button>
            <span className="text-sm text-neutral-700">
              Page {pagination.current} of {Math.ceil(pagination.total / pagination.pageSize)}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => pagination.onChange(pagination.current + 1)}
              disabled={pagination.current >= Math.ceil(pagination.total / pagination.pageSize)}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}