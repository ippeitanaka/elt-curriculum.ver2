// ヘッダーのキー型定義
export type ExcelHeaderKey =
  | 'date'
  | 'dayOfWeek'
  | 'period'
  | `class${1 | 2 | 3}${'A' | 'B' | 'N'}_${'subject' | 'teacher' | 'duration'}`
  | 'class3_exam';

// ヘッダーの値型定義
export type ExcelHeaderValue = {
  key: ExcelHeaderKey;
  label: string;
  width: number;
  validate?: (value: any) => boolean;
};