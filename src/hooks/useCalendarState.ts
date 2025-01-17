import { useState, useMemo, useEffect } from 'react';
import { Schedule } from '../types/schedule';
import { CalendarFilters } from '../types/calendar';
import { filterSchedules } from '../utils/filters';
import { usePersistedState } from './usePersistedState';
import { useAuth } from '../contexts/AuthContext';

const initialFilters: CalendarFilters = {
  year: '',
  class: ''
};

export function useCalendarState(schedules: Schedule[]) {
  const { defaultFilters } = useAuth();
  const [currentDate, setCurrentDate] = usePersistedState(
    'calendar_current_date',
    new Date().toISOString()
  );
  
  const [filters, setFilters] = usePersistedState<CalendarFilters>(
    'calendar_filters',
    defaultFilters || initialFilters
  );

  // defaultFiltersが変更されたら、フィルターを更新
  useEffect(() => {
    if (defaultFilters) {
      setFilters(defaultFilters);
    }
  }, [defaultFilters, setFilters]);

  const date = new Date(currentDate);

  const goToPrevMonth = () => {
    const newDate = new Date(date.getFullYear(), date.getMonth() - 1);
    setCurrentDate(newDate.toISOString());
  };

  const goToNextMonth = () => {
    const newDate = new Date(date.getFullYear(), date.getMonth() + 1);
    setCurrentDate(newDate.toISOString());
  };

  const filteredSchedules = useMemo(() => {
    return filterSchedules(schedules, filters);
  }, [schedules, filters]);

  const resetFilters = () => {
    setFilters(defaultFilters || initialFilters);
  };

  return {
    currentDate: date,
    goToPrevMonth,
    goToNextMonth,
    filteredSchedules,
    filters,
    updateFilters: setFilters,
    resetFilters
  };
}