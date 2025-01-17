import { Schedule } from '../types/schedule';
import { SortConfig } from '../types/filters';

export function sortSchedules(schedules: Schedule[], sortConfig: SortConfig): Schedule[] {
  return [...schedules].sort((a, b) => {
    const direction = sortConfig.direction === 'asc' ? 1 : -1;
    
    switch (sortConfig.field) {
      case 'period':
        return (a.period - b.period) * direction;
      case 'year':
        return (a.year - b.year) * direction;
      case 'class':
        return a.class.localeCompare(b.class) * direction;
      default:
        return 0;
    }
  });
}