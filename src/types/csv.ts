export interface CSVScheduleRow {
  // 基本情報
  日付: string;
  曜日: string;
  時限: number;

  // 1年生
  '1年Aクラスの授業内容': string;
  '1年Aクラス担当講師名': string;
  '1年Aクラスコマ数': number;
  '1年Bクラスの授業内容': string;
  '1年Bクラス担当講師名': string;
  '1年Bクラスコマ数': number;
  '1年Nクラスの授業内容': string;
  '1年Nクラス担当講師名': string;
  '1年Nクラスコマ数': number;

  // 2年生
  '2年Aクラスの授業内容': string;
  '2年Aクラス担当講師名': string;
  '2年Aクラスコマ数': number;
  '2年Bクラスの授業内容': string;
  '2年Bクラス担当講師名': string;
  '2年Bクラスコマ数': number;
  '2年Nクラスの授業内容': string;
  '2年Nクラス担当講師名': string;
  '2年Nクラスコマ数': number;

  // 3年生
  '3年Aクラスの授業内容': string;
  '3年Aクラス担当講師名': string;
  '3年Aクラスコマ数': number;
  '3年Bクラスの授業内容': string;
  '3年Bクラス担当講師名': string;
  '3年Bクラスコマ数': number;
  '3年Nクラスの授業内容': string;
  '3年Nクラス担当講師名': string;
  '3年Nクラスコマ数': number;
  '3年各種模擬試験': string;
}