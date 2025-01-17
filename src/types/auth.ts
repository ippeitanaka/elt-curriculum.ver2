export type UserRole = 'admin' | 'student';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  // 学生の場合の追加情報
  studentInfo?: {
    year: 1 | 2 | 3;
    class: 'A' | 'B' | 'N';
    department: 'day' | 'night';
  };
}