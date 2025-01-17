import { utils, write } from 'xlsx';
import { HEADERS, HEADER_ORDER } from './config/headers';
import { getDefaultTemplateData } from './templateData';
import { formatWorksheet } from './formatters/worksheet';

export function generateExcelTemplate(): Uint8Array {
  const template = [getDefaultTemplateData()];
  
  // ヘッダーの順序を指定してワークシートを作成
  const orderedData = template.map(row => {
    const orderedRow: Record<string, any> = {};
    HEADER_ORDER.forEach(key => {
      orderedRow[HEADERS[key].label] = row[key];
    });
    return orderedRow;
  });
  
  const worksheet = utils.json_to_sheet(orderedData, {
    header: HEADER_ORDER.map(key => HEADERS[key].label)
  });
  
  // ワークシートのフォーマット適用
  formatWorksheet(worksheet);
  
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, 'Template');
  
  return write(workbook, { type: 'array' });
}