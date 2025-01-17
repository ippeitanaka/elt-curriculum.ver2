import { Schedule } from '../types/schedule';
import { ScheduleFilters } from '../types/filters';
import { CalendarFilters } from '../types/calendar';

export function filterSchedules(
  schedules: Schedule[], 
  filters: ScheduleFilters | CalendarFilters
): Schedule[] {
  return schedules.filter(schedule => {
    // 学年フィルター
    if (filters.year && parseInt(filters.year) !== schedule.year) {
      return false;
    }

    // クラスフィルター
    if (filters.class && filters.class !== schedule.class) {
      return false;
    }

    // 以下は ScheduleFilters の場合のみ適用
    if ('subject' in filters) {
      // 教科フィルター（部分一致）
      if (filters.subject && !schedule.subject.toLowerCase().includes(filters.subject.toLowerCase())) {
        return false;
      }

      // 担当講師フィルター（部分一致）
      if (filters.teacher && !schedule.teacher.toLowerCase().includes(filters.teacher.toLowerCase())) {
        return false;
      }

      // コマ数フィルター（範囲指定）
      if (filters.durationMin && schedule.duration < parseInt(filters.durationMin)) {
        return false;
      }
      if (filters.durationMax && schedule.duration > parseInt(filters.durationMax)) {
        return false;
      }
    }

    return true;
  });
}