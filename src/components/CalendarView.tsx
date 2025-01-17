import React from 'react';
import { Calendar } from './calendar/Calendar';
import { useCalendarState } from '../hooks/useCalendarState';
import { Schedule } from '../types/schedule';

interface CalendarViewProps {
  schedules?: Schedule[];
}

export function CalendarView({ schedules = [] }: CalendarViewProps) {
  const {
    currentDate,
    goToPrevMonth,
    goToNextMonth,
    filteredSchedules,
    filters,
    updateFilters
  } = useCalendarState(schedules);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <Calendar
        currentDate={currentDate}
        schedules={filteredSchedules}
        onPrevMonth={goToPrevMonth}
        onNextMonth={goToNextMonth}
        filters={filters}
        onFilterChange={updateFilters}
      />
    </div>
  );
}