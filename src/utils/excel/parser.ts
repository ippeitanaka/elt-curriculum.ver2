import { read, utils } from 'xlsx';
import { Schedule } from '../../types/schedule';
import { ExcelScheduleRow } from '../../types/excel';
import { createScheduleFromClassData } from './scheduleCreator';

export async function parseExcelFile(file: File): Promise<Schedule[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = read(data, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = utils.sheet_to_json(worksheet) as Record<string, any>[];
        
        const schedules: Schedule[] = [];
        
        jsonData.forEach(row => {
          if (!row['日付'] || !row['時限']) return;

          // 各学年・クラスの組み合わせを処理
          const years = [1, 2, 3];
          const classes = ['A', 'B', 'N'] as const;
          
          years.forEach(year => {
            classes.forEach(className => {
              const subjectKey = `${year}年${className}組の授業内容`;
              const teacherKey = `${year}年${className}組担当講師名`;
              const durationKey = `${year}年${className}組コマ数`;
              
              if (row[subjectKey]) {
                const schedule = createScheduleFromClassData({
                  id: crypto.randomUUID(),
                  date: row['日付'],
                  period: parseInt(row['時限'], 10),
                  subject: String(row[subjectKey]),
                  teacher: row[teacherKey] ? String(row[teacherKey]) : '',
                  duration: row[durationKey] ? parseInt(String(row[durationKey]), 10) : 1,
                  year,
                  class: className,
                  department: className === 'N' ? 'night' : 'day'
                });
                
                if (schedule) {
                  schedules.push(schedule);
                }
              }
            });
          });
        });
        
        resolve(schedules);
      } catch (error) {
        reject(error instanceof Error ? error : new Error('エクセルファイルの解析に失敗しました'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('ファイルの読み込みに失敗しました'));
    };
    
    reader.readAsArrayBuffer(file);
  });
}