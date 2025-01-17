import { Schedule } from '../types/schedule';
import { CalendarFilters } from '../types/calendar';

export function filterSchedules(schedules: Schedule[], filters: CalendarFilters): Schedule[] {
  return schedules.filter(schedule => {
    // 学年フィルター
    if (filters.year && parseInt(filters.year) !== schedule.year) {
      return false;
    }

    // クラスフィルター
    if (filters.class && filters.class !== schedule.class) {
      return false;
    }

    return true;
  });
}

export function formatScheduleTime(schedule: Schedule): string {
  const periodTimes: Record<number, string> = {
    1: '9:00-10:30',
    2: '10:40-12:10',
    3: '13:00-14:30',
    4: '14:40-16:10',
    5: '16:20-17:50',
    6: '18:00-19:30'
  };
  return `${schedule.period}時限 (${periodTimes[schedule.period]})`;
}