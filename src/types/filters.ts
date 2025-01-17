export interface ScheduleFilters {
  year: string;
  class: string;
  subject: string;
  teacher: string;
  durationMin: string;
  durationMax: string;
}

export interface FilterOption {
  value: string;
  label: string;
}

export type SortField = 'period' | 'year' | 'class';

export interface SortConfig {
  field: SortField;
  direction: 'asc' | 'desc';
}