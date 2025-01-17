import { ScheduleFilters } from '../../types/filters';
import { CalendarFilters } from '../../types/calendar';

const SCHEDULE_FILTERS_KEY = 'schedule_filters';
const CALENDAR_FILTERS_KEY = 'calendar_filters';

export function saveScheduleFilters(filters: ScheduleFilters): void {
  localStorage.setItem(SCHEDULE_FILTERS_KEY, JSON.stringify(filters));
}

export function loadScheduleFilters(): ScheduleFilters | null {
  const stored = localStorage.getItem(SCHEDULE_FILTERS_KEY);
  return stored ? JSON.parse(stored) : null;
}

export function saveCalendarFilters(filters: CalendarFilters): void {
  localStorage.setItem(CALENDAR_FILTERS_KEY, JSON.stringify(filters));
}

export function loadCalendarFilters(): CalendarFilters | null {
  const stored = localStorage.getItem(CALENDAR_FILTERS_KEY);
  return stored ? JSON.parse(stored) : null;
}