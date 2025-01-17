import { Schedule } from '../../types/schedule';
import { parseCSVFile } from './parser';

interface ProcessOptions {
  encoding?: string;
}

export async function processFile(
  file: File,
  options: ProcessOptions = {}
): Promise<Schedule[]> {
  try {
    return await parseCSVFile(file);
  } catch (error) {
    throw error instanceof Error 
      ? error 
      : new Error('ファイルの処理中にエラーが発生しました');
  }
}