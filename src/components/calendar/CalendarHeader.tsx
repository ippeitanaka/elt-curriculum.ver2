import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CalendarFilters } from '../../types/calendar';
import { CalendarNavigation } from './CalendarNavigation';
import { CalendarFilterControls } from './CalendarFilterControls';

interface CalendarHeaderProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  filters: CalendarFilters;
  onFilterChange: (filters: CalendarFilters) => void;
}

export function CalendarHeader({
  currentDate,
  onPrevMonth,
  onNextMonth,
  filters,
  onFilterChange
}: CalendarHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
      <CalendarNavigation
        currentDate={currentDate}
        onPrevMonth={onPrevMonth}
        onNextMonth={onNextMonth}
      />
      <CalendarFilterControls
        filters={filters}
        onFilterChange={onFilterChange}
      />
    </div>
  );
}