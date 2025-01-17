export interface User {
  id: string;
  name: string;
  role: 'admin' | 'teacher' | 'student';
  department?: 'day' | 'night';
  class?: 'A' | 'B' | 'N';
  year?: 1 | 2 | 3;
}

export interface Schedule {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  subject: string;
  teacher: string;
  room: string;
  department: 'day' | 'night';
  class: 'A' | 'B' | 'N';
  year: 1 | 2 | 3;
}