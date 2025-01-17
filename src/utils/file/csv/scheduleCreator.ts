import { Schedule } from '../../../types/schedule';

export function createScheduleFromRowData(rowData: Record<string, string>): Schedule | null {
  try {
    return {
      id: crypto.randomUUID(),
      date: rowData.date,
      period: parseInt(rowData.period, 10),
      duration: parseInt(rowData.duration, 10),
      subject: rowData.subject,
      teacher: rowData.teacher,
      room: '',
      department: 'day',
      class: 'A',
      year: 1
    };
  } catch (error) {
    console.error('行の変換に失敗しました:', error);
    return null;
  }
}