import React from 'react';
import { Search } from 'lucide-react';
import { ScheduleFilters } from '../../types/filters';
import { Select } from '../ui/Select';
import { Input } from '../ui/Input';
import { NumberInput } from '../ui/NumberInput';

interface FilterPanelProps {
  filters: ScheduleFilters;
  onFilterChange: (filters: ScheduleFilters) => void;
}

export function FilterPanel({ filters, onFilterChange }: FilterPanelProps) {
  const handleFilterChange = (key: keyof ScheduleFilters, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            学年
          </label>
          <Select
            value={filters.year}
            onChange={(value) => handleFilterChange('year', value)}
            options={[
              { value: '', label: '全学年' },
              { value: '1', label: '1年' },
              { value: '2', label: '2年' },
              { value: '3', label: '3年' },
            ]}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            クラス
          </label>
          <Select
            value={filters.class}
            onChange={(value) => handleFilterChange('class', value)}
            options={[
              { value: '', label: '全クラス' },
              { value: 'A', label: 'Aクラス' },
              { value: 'B', label: 'Bクラス' },
              { value: 'N', label: 'Nクラス' },
            ]}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            教科
          </label>
          <Input
            value={filters.subject}
            onChange={(e) => handleFilterChange('subject', e.target.value)}
            placeholder="教科名で検索"
            icon={Search}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            担当講師
          </label>
          <Input
            value={filters.teacher}
            onChange={(e) => handleFilterChange('teacher', e.target.value)}
            placeholder="講師名で検索"
            icon={Search}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            コマ数
          </label>
          <div className="flex items-center space-x-2">
            <NumberInput
              value={filters.durationMin}
              onChange={(value) => handleFilterChange('durationMin', value)}
              placeholder="最小"
              min={1}
              max={4}
            />
            <span className="text-gray-500">～</span>
            <NumberInput
              value={filters.durationMax}
              onChange={(value) => handleFilterChange('durationMax', value)}
              placeholder="最大"
              min={1}
              max={4}
            />
          </div>
        </div>
      </div>
    </div>
  );
}