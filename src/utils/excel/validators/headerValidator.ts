import { ExcelHeaderKey } from '../types/headers';
import { HEADERS, HEADER_ORDER } from '../config/headers';

export function validateHeaders(headers: string[]): void {
  const expectedHeaders = HEADER_ORDER.map(key => HEADERS[key].label);
  
  if (headers.length !== expectedHeaders.length) {
    throw new Error('ヘッダーの列数が正しくありません');
  }
  
  headers.forEach((header, index) => {
    if (header !== expectedHeaders[index]) {
      throw new Error(
        `ヘッダーの順序が正しくありません。${index + 1}列目は "${expectedHeaders[index]}" であるべきです`
      );
    }
  });
}

export function validateHeaderValue(key: ExcelHeaderKey, value: any): boolean {
  const header = HEADERS[key];
  if (!header.validate) return true;
  return header.validate(value);
}