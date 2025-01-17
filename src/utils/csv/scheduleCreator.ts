import { Schedule } from '../../types/schedule';

interface ClassData {
  year: number;
  class: 'A' | 'B' | 'N';
  subject: string;
  teacher: string;
  duration: number;
}

export function createScheduleFromClassData(data: Record<string, string>): Schedule[] {
  const schedules: Schedule[] = [];
  
  try {
    // 日付のフォーマット変換（YYYY/MM/DD -> YYYY-MM-DD）
    const date = data['日付']?.replace(/\//g, '-');
    if (!date) {
      console.warn('Date is missing in row:', data);
      return [];
    }

    const period = parseInt(data['時限']);
    if (isNaN(period)) {
      console.warn('Invalid period in row:', data);
      return [];
    }

    // 各学年・クラスの組み合わせを処理
    const years = [1, 2, 3];
    const classes = ['A', 'B', 'N'] as const;

    years.forEach(year => {
      classes.forEach(className => {
        // CSVのヘッダー名に合わせて修正
        const subjectKey = `${year}年${className}クラスの授業内容`;
        const teacherKey = `${year}年${className}クラス担当講師名`;
        const durationKey = `${year}年${className}クラスコマ数`;

        // 授業内容がある場合のみスケジュールを作成
        const subject = data[subjectKey]?.trim();
        if (subject) {
          const duration = parseInt(data[durationKey]) || 0;
          
          const schedule: Schedule = {
            id: crypto.randomUUID(),
            date,
            period,
            subject,
            teacher: data[teacherKey]?.trim() || '',
            duration,
            room: '',
            department: className === 'N' ? 'night' : 'day',
            class: className,
            year
          };

          // データの検証
          if (
            schedule.date && 
            !isNaN(schedule.period) && 
            schedule.period >= 1 && 
            schedule.period <= 6
          ) {
            schedules.push(schedule);
          } else {
            console.warn('Invalid schedule data:', schedule);
          }
        }
      });
    });

    return schedules;
  } catch (error) {
    console.error('Error creating schedules:', error);
    return [];
  }
}