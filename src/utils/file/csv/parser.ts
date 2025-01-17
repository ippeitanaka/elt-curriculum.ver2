import { Schedule } from '../../../types/schedule';
import { HEADERS, HEADER_ORDER } from '../../excel/config/headers';
import { validateHeaders } from '../../excel/validators/headerValidator';
import { createScheduleFromRowData } from './scheduleCreator';

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
        
        // ヘッダー行の検証
        const headers = parseCSVRow(rows[0], delimiter);
        validateHeaders(headers);
        
        // データ行の処理
        const schedules: Schedule[] = [];
        for (let i = 1; i < rows.length; i++) {
          const row = parseCSVRow(rows[i], delimiter);
          if (row.length === headers.length) {
            const rowData = createRowData(headers, row);
            const schedule = createScheduleFromRowData(rowData);
            if (schedule) {
              schedules.push(schedule);
            }
          }
        }
        
        resolve(schedules);
      } catch (error) {
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
    const key = HEADER_ORDER.find(k => HEADERS[k].label === header);
    if (key) {
      data[key] = values[index];
    }
  });
  return data;
}