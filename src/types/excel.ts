export interface ExcelScheduleRow {
  // 基本情報
  日付: string;
  曜日: string;
  時限: number;

  // 1年生
  '1年A組の授業内容': string;
  '1年A組担当講師名': string;
  '1年A組コマ数': number;
  '1年B組の授業内容': string;
  '1年B組担当講師名': string;
  '1年B組コマ数': number;
  '1年N組の授業内容': string;
  '1年N組担当講師名': string;
  '1年N組コマ数': number;

  // 2年生
  '2年A組の授業内容': string;
  '2年A組担当講師名': string;
  '2年A組コマ数': number;
  '2年B組の授業内容': string;
  '2年B組担当講師名': string;
  '2年B組コマ数': number;
  '2年N組の授業内容': string;
  '2年N組担当講師名': string;
  '2年N組コマ数': number;

  // 3年生
  '3年A組の授業内容': string;
  '3年A組担当講師名': string;
  '3年A組コマ数': number;
  '3年B組の授業内容': string;
  '3年B組担当講師名': string;
  '3年B組コマ数': number;
  '3年N組の授業内容': string;
  '3年N組担当講師名': string;
  '3年N組コマ数': number;
  '3年各種模擬試験': string;
}