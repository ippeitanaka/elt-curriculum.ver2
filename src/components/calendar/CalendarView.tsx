import React, { useState } from 'react';
import { Calendar } from './Calendar';
import { useCalendarState } from '../../hooks/useCalendarState';
import { useSchedules } from '../../contexts/schedule';
import { SortSelect } from '../SortSelect';
import { sortSchedules } from '../../utils/sort';
import { SortConfig } from '../../types/filters';

export function CalendarView() {
  const { schedules } = useSchedules();
  const {
    currentDate,
    goToPrevMonth,
    goToNextMonth,
    filteredSchedules,
    filters,
    updateFilters,
    resetFilters
  } = useCalendarState(schedules);

  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: 'period',
    direction: 'asc'
  });

  const sortedSchedules = sortSchedules(filteredSchedules, sortConfig);

  return (
    <div className="max-w-full space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
        <h2 className="text-base font-semibold">カレンダー表示</h2>
        <SortSelect value={sortConfig} onChange={setSortConfig} />
      </div>

      <div className="bg-white rounded-lg shadow-lg p-2 sm:p-4 w-full overflow-x-auto">
        <Calendar
          currentDate={currentDate}
          schedules={sortedSchedules}
          onPrevMonth={goToPrevMonth}
          onNextMonth={goToNextMonth}
          filters={filters}
          onFilterChange={updateFilters}
        />
      </div>
    </div>
  );
}