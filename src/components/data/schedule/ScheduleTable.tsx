import React, { useState } from 'react';
import { Schedule } from '../../../types/schedule';
import { formatScheduleTime } from '../../../utils/schedule';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ScheduleTableProps {
  schedules: Schedule[];
}

const ITEMS_PER_PAGE = 10;

export function ScheduleTable({ schedules }: ScheduleTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<keyof Schedule>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const sortedSchedules = [...schedules].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (sortField === 'duration') {
      return sortDirection === 'asc' 
        ? Number(aValue) - Number(bValue)
        : Number(bValue) - Number(aValue);
    }
    
    return sortDirection === 'asc'
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue));
  });

  const totalPages = Math.ceil(sortedSchedules.length / ITEMS_PER_PAGE);
  const paginatedSchedules = sortedSchedules.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSort = (field: keyof Schedule) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const SortIcon = ({ field }: { field: keyof Schedule }) => {
    if (field !== sortField) return null;
    return (
      <span className="ml-1">
        {sortDirection === 'asc' ? '↑' : '↓'}
      </span>
    );
  };

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                { key: 'date', label: '日付' },
                { key: 'period', label: '時限' },
                { key: 'duration', label: 'コマ数' },
                { key: 'subject', label: '教科' },
                { key: 'teacher', label: '担当講師' },
                { key: 'year', label: '学年' },
                { key: 'class', label: 'クラス' }
              ].map(({ key, label }) => (
                <th
                  key={key}
                  onClick={() => handleSort(key as keyof Schedule)}
                  className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  {label}
                  <SortIcon field={key as keyof Schedule} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedSchedules.map((schedule) => (
              <tr key={schedule.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                  {schedule.date}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                  {schedule.period}時限
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                  {schedule.duration > 0 ? `${schedule.duration}コマ` : '-'}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                  {schedule.subject}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                  {schedule.teacher}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                  {schedule.year}年
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                  {schedule.class}組
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
        <div className="flex-1 flex justify-between sm:hidden">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            前へ
          </button>
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            次へ
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              全<span className="font-medium">{schedules.length}</span>件中
              <span className="font-medium">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span>
              から
              <span className="font-medium">
                {Math.min(currentPage * ITEMS_PER_PAGE, schedules.length)}
              </span>
              件を表示
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}