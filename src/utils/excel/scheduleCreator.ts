import { Schedule } from '../../types/schedule';

interface ScheduleData {
  id: string;
  date: string;
  period: number;
  subject: string;
  teacher: string;
  duration: number;
  year: number;
  class: 'A' | 'B' | 'N';
  department: 'day' | 'night';
}

export function createScheduleFromClassData(data: ScheduleData): Schedule | null {
  try {
    // 必須フィールドの検証
    if (!data.date || !data.period || !data.subject) {
      return null;
    }

    return {
      id: data.id,
      date: data.date,
      period: data.period,
      duration: data.duration || 1,
      subject: data.subject.trim(),
      teacher: data.teacher?.trim() || '',
      room: '',
      department: data.department,
      class: data.class,
      year: data.year
    };
  } catch (error) {
    console.error('スケジュールの作成に失敗しました:', error);
    return null;
  }
}