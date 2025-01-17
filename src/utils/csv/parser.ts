import { Schedule } from '../../types/schedule';
import { createScheduleFromClassData } from './scheduleCreator';

export async function parseCSVFile(
  file: File, 
  options: { encoding?: string; delimiter?: string } = {}
): Promise<Schedule[]> {
  const { encoding = 'UTF-8', delimiter = ',' } = options;
  
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      try {
        const content = e.target?.result as string;
        const rows = content.split(/\r?\n/).filter(row => row.trim());
        
        // ヘッダー行の取得
        const headers = parseCSVRow(rows[0], delimiter);
        
        // 全スケジュールを格納する配列
        const allSchedules: Schedule[] = [];
        
        // データ行の処理
        for (let i = 1; i < rows.length; i++) {
          const row = parseCSVRow(rows[i], delimiter);
          if (row.length === headers.length) {
            // 行データをオブジェクトに変換
            const rowData = createRowData(headers, row);
            
            // 1行から複数のスケジュールを作成
            const schedules = createScheduleFromClassData(rowData);
            if (schedules.length > 0) {
              allSchedules.push(...schedules);
            }
          }
        }

        console.log(`Parsed ${allSchedules.length} schedules from CSV`);
        resolve(allSchedules);
      } catch (error) {
        console.error('CSV parse error:', error);
        reject(error instanceof Error ? error : new Error('CSVファイルの解析に失敗しました'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('ファイルの読み込みに失敗しました'));
    };
    
    reader.readAsText(file, encoding);
  });
}

function parseCSVRow(row: string, delimiter: string): string[] {
  const fields: string[] = [];
  let field = '';
  let inQuotes = false;
  
  for (let i = 0; i < row.length; i++) {
    const char = row[i];
    
    if (char === '"') {
      if (inQuotes && row[i + 1] === '"') {
        field += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === delimiter && !inQuotes) {
      fields.push(field.trim());
      field = '';
    } else {
      field += char;
    }
  }
  
  fields.push(field.trim());
  return fields;
}

function createRowData(headers: string[], values: string[]): Record<string, string> {
  const data: Record<string, string> = {};
  headers.forEach((header, index) => {
    data[header] = values[index] || '';
  });
  return data;
}