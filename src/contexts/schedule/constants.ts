import { Schedule } from '../../types/schedule';

export const SAMPLE_SCHEDULES: Schedule[] = [
  {
    id: '1',
    date: '2024-04-01',
    period: 1,
    duration: 2,
    subject: '救急医学',
    teacher: '山田太郎',
    room: '講義室1',
    department: 'day',
    class: 'A',
    year: 1
  },
  {
    id: '2',
    date: '2024-04-01',
    period: 3,
    duration: 2,
    subject: '基礎医学',
    teacher: '鈴木一郎',
    room: '講義室2',
    department: 'day',
    class: 'B',
    year: 1
  }
];