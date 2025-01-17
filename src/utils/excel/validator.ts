import { ExcelScheduleRow } from '../../types/excel';

export function validateExcelData(data: ExcelScheduleRow[]): void {
  if (!data || data.length === 0) {
    throw new Error('データが空です');
  }

  data.forEach((row, index) => {
    validateRequiredFields(row, index);
    validateDateFormat(row.date, index);
    validatePeriod(row.period, index);
    validateDurations(row, index);
  });
}

function validateRequiredFields(row: ExcelScheduleRow, rowIndex: number): void {
  if (!row.date || !row.period) {
    throw new Error(`行 ${rowIndex + 2}: 日付、時限は必須です`);
  }
}

function validateDateFormat(date: string, rowIndex: number): void {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) {
    throw new Error(`行 ${rowIndex + 2}: 日付は YYYY-MM-DD 形式で入力してください`);
  }
}

function validatePeriod(period: number, rowIndex: number): void {
  if (period < 1 || period > 6) {
    throw new Error(`行 ${rowIndex + 2}: 時限は1から6の間で入力してください`);
  }
}

function validateDurations(row: ExcelScheduleRow, rowIndex: number): void {
  const durationFields = Object.keys(row).filter(key => key.includes('_duration'));
  durationFields.forEach(field => {
    const duration = row[field as keyof ExcelScheduleRow] as number;
    if (duration && (duration < 1 || duration > 4)) {
      throw new Error(`行 ${rowIndex + 2}: コマ数は1から4の間で入力してください`);
    }
  });
}