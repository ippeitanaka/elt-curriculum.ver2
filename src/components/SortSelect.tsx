import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import { SortConfig, SortField } from '../types/filters';

interface SortSelectProps {
  value: SortConfig;
  onChange: (value: SortConfig) => void;
}

export function SortSelect({ value, onChange }: SortSelectProps) {
  const sortOptions: { value: SortField; label: string }[] = [
    { value: 'period', label: '時限' },
    { value: 'year', label: '学年' },
    { value: 'class', label: 'クラス' }
  ];

  return (
    <div className="flex items-center space-x-2">
      <ArrowUpDown className="h-4 w-4 text-gray-500" />
      <select
        value={value.field}
        onChange={(e) => onChange({ ...value, field: e.target.value as SortField })}
        className="rounded-md border-gray-300 py-1 px-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      >
        {sortOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}順
          </option>
        ))}
      </select>
      <button
        onClick={() => onChange({
          ...value,
          direction: value.direction === 'asc' ? 'desc' : 'asc'
        })}
        className="p-1 hover:bg-gray-100 rounded"
        title={value.direction === 'asc' ? '昇順' : '降順'}
      >
        {value.direction === 'asc' ? '↑' : '↓'}
      </button>
    </div>
  );
}