import { useMemo } from 'react';
import { Schedule } from '../types/schedule';
import { ScheduleFilters } from '../types/filters';
import { filterSchedules } from '../utils/filters';
import { usePersistedState } from './usePersistedState';

const initialFilters: ScheduleFilters = {
  year: '',
  class: '',
  subject: '',
  teacher: '',
  durationMin: '',
  durationMax: ''
};

export function useScheduleFilters(schedules: Schedule[]) {
  const [filters, setFilters] = usePersistedState<ScheduleFilters>(
    'schedule_filters',
    initialFilters
  );

  const filteredSchedules = useMemo(() => {
    return filterSchedules(schedules, filters);
  }, [schedules, filters]);

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  return {
    filters,
    setFilters,
    filteredSchedules,
    resetFilters,
    hasResults: filteredSchedules.length > 0
  };
}