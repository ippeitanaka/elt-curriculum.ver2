import React from 'react';
import { CalendarHeader } from './CalendarHeader';
import { CalendarGrid } from './CalendarGrid';
import { Schedule } from '../../types/schedule';
import { CalendarFilters } from '../../types/calendar';

interface CalendarProps {
  currentDate: Date;
  schedules: Schedule[];
  onPrevMonth: () => void;
  onNextMonth: () => void;
  filters: CalendarFilters;
  onFilterChange: (filters: CalendarFilters) => void;
}

export function Calendar({
  currentDate,
  schedules,
  onPrevMonth,
  onNextMonth,
  filters,
  onFilterChange
}: CalendarProps) {
  return (
    <div className="space-y-6">
      <CalendarHeader
        currentDate={currentDate}
        onPrevMonth={onPrevMonth}
        onNextMonth={onNextMonth}
        filters={filters}
        onFilterChange={onFilterChange}
      />
      <CalendarGrid
        currentDate={currentDate}
        schedules={schedules}
      />
    </div>
  );
}