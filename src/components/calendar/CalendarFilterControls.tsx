import React from 'react';
import { CalendarFilters } from '../../types/calendar';
import { Select } from '../ui/Select';
import { FilterResetButton } from '../filters/FilterResetButton';

interface CalendarFilterControlsProps {
  filters: CalendarFilters;
  onFilterChange: (filters: CalendarFilters) => void;
  onReset?: () => void;
}

export function CalendarFilterControls({
  filters,
  onFilterChange,
  onReset
}: CalendarFilterControlsProps) {
  const handleFilterChange = (key: keyof CalendarFilters, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="flex items-center space-x-1 md:space-x-2">
      <div className="flex space-x-1">
        <Select
          value={filters.year}
          onChange={(value) => handleFilterChange('year', value)}
          options={[
            { value: '', label: '全学年' },
            { value: '1', label: '1年' },
            { value: '2', label: '2年' },
            { value: '3', label: '3年' },
          ]}
          className="w-16 md:w-20 text-[10px] md:text-sm"
        />
        <Select
          value={filters.class}
          onChange={(value) => handleFilterChange('class', value)}
          options={[
            { value: '', label: '全クラス' },
            { value: 'A', label: 'A組' },
            { value: 'B', label: 'B組' },
            { value: 'N', label: 'N組' },
          ]}
          className="w-20 md:w-24 text-[10px] md:text-sm"
        />
      </div>
      {onReset && <FilterResetButton onClick={onReset} className="text-[10px] md:text-sm" />}
    </div>
  );
}