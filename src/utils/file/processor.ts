import { FileType, FileProcessingOptions } from './types';
import { detectFileType } from './detector';
import { parseCSVFile } from './csv/parser';
import { parseExcelFile } from '../excel/parser';
import { Schedule } from '../../types/schedule';

export async function processFile(
  file: File, 
  options: FileProcessingOptions = {}
): Promise<Schedule[]> {
  const fileType = detectFileType(file);
  
  try {
    switch (fileType) {
      case 'csv':
        return await parseCSVFile(file, {
          encoding: options.encoding,
          delimiter: options.delimiter
        });
      case 'excel':
        return await parseExcelFile(file);
      default:
        throw new Error('サポートされていないファイル形式です');
    }
  } catch (error) {
    throw error instanceof Error 
      ? error 
      : new Error('ファイルの処理中にエラーが発生しました');
  }
}