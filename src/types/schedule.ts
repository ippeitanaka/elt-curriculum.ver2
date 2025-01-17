export type Department = 'day' | 'night';
export type ClassType = 'A' | 'B' | 'N';
export type Year = 1 | 2 | 3;
export type Period = 1 | 2 | 3 | 4 | 5 | 6;

export interface Schedule {
  id: string;
  date: string;
  period: Period;
  duration: number; // コマ数
  subject: string;
  teacher: string;
  room: string;
  department: Department;
  class: ClassType;
  year: Year;
}