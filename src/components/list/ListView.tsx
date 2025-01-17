import React, { useState } from 'react';
import { ScheduleTable } from '../data/schedule/ScheduleTable';
import { FilterPanel } from '../data/FilterPanel';
import { useScheduleFilters } from '../../hooks/useScheduleFilters';
import { NoResults } from '../NoResults';
import { useSchedules } from '../../contexts/schedule';
import { SortSelect } from '../SortSelect';
import { sortSchedules } from '../../utils/sort';
import { SortConfig } from '../../types/filters';

export function ListView() {
  const { schedules } = useSchedules();
  const {
    filters,
    setFilters,
    filteredSchedules,
    resetFilters,
    hasResults
  } = useScheduleFilters(schedules);

  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: 'period',
    direction: 'asc'
  });

  const sortedSchedules = sortSchedules(filteredSchedules, sortConfig);

  return (
    <div className="max-w-full space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
        <h2 className="text-base font-semibold">リスト表示</h2>
        <SortSelect value={sortConfig} onChange={setSortConfig} />
      </div>

      <FilterPanel
        filters={filters}
        onFilterChange={setFilters}
        onReset={resetFilters}
      />

      <div className="w-full overflow-x-auto">
        {hasResults ? (
          <ScheduleTable schedules={sortedSchedules} />
        ) : (
          <NoResults />
        )}
      </div>
    </div>
  );
}