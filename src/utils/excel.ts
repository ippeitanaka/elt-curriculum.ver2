import { read, utils, write } from 'xlsx';
import { Schedule, Period } from '../types/schedule';

export async function parseExcelFile(file: File): Promise<Schedule[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = read(data, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = utils.sheet_to_json(worksheet);
        
        const schedules: Schedule[] = jsonData.map((row: any) => ({
          id: crypto.randomUUID(),
          date: row['日付'],
          period: parseInt(row['時限'], 10) as Period,
          duration: parseInt(row['コマ数'], 10),
          subject: row['科目'],
          teacher: row['担当教員'],
          room: row['教室'],
          department: row['課程'],
          class: row['クラス'],
          year: parseInt(row['学年'], 10)
        }));
        
        resolve(schedules);
      } catch (error) {
        reject(new Error('エクセルファイルの解析に失敗しました'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('ファイルの読み込みに失敗しました'));
    };
    
    reader.readAsArrayBuffer(file);
  });
}

export function generateExcelTemplate(): Uint8Array {
  const template = [
    {
      '日付': '2024-04-01',
      '時限': 1,
      'コマ数': 2,
      '科目': '救急医学',
      '担当教員': '山田太郎',
      '教室': '講義室1',
      '課程': '昼間部',
      'クラス': 'A',
      '学年': 1
    }
  ];
  
  const worksheet = utils.json_to_sheet(template);
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, 'Template');
  
  return write(workbook, { type: 'array' });
}

export function exportSchedulesToExcel(schedules: Schedule[]): Uint8Array {
  const data = schedules.map(schedule => ({
    '日付': schedule.date,
    '時限': schedule.period,
    'コマ数': schedule.duration,
    '科目': schedule.subject,
    '担当教員': schedule.teacher,
    '教室': schedule.room,
    '課程': schedule.department,
    'クラス': schedule.class,
    '学年': schedule.year
  }));
  
  const worksheet = utils.json_to_sheet(data);
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, 'Schedules');
  
  return write(workbook, { type: 'array' });
}