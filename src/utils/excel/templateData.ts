import { EXCEL_HEADERS } from './headers';
import { ExcelScheduleRow } from '../../types/excel';

export function getDefaultTemplateData(): ExcelScheduleRow {
  return {
    [EXCEL_HEADERS.date]: '2024-04-01',
    [EXCEL_HEADERS.dayOfWeek]: '月',
    [EXCEL_HEADERS.period]: 1,
    // 1年生
    [EXCEL_HEADERS.class1A_subject]: '救急医学',
    [EXCEL_HEADERS.class1A_teacher]: '山田太郎',
    [EXCEL_HEADERS.class1A_duration]: 2,
    [EXCEL_HEADERS.class1B_subject]: '基礎医学',
    [EXCEL_HEADERS.class1B_teacher]: '鈴木一郎',
    [EXCEL_HEADERS.class1B_duration]: 2,
    [EXCEL_HEADERS.class1N_subject]: '解剖学',
    [EXCEL_HEADERS.class1N_teacher]: '佐藤花子',
    [EXCEL_HEADERS.class1N_duration]: 2,
    // 2年生
    [EXCEL_HEADERS.class2A_subject]: '内科学',
    [EXCEL_HEADERS.class2A_teacher]: '田中次郎',
    [EXCEL_HEADERS.class2A_duration]: 2,
    [EXCEL_HEADERS.class2B_subject]: '外科学',
    [EXCEL_HEADERS.class2B_teacher]: '高橋三郎',
    [EXCEL_HEADERS.class2B_duration]: 2,
    [EXCEL_HEADERS.class2N_subject]: '救急処置',
    [EXCEL_HEADERS.class2N_teacher]: '小林四郎',
    [EXCEL_HEADERS.class2N_duration]: 2,
    // 3年生
    [EXCEL_HEADERS.class3A_subject]: '救急症候学',
    [EXCEL_HEADERS.class3A_teacher]: '伊藤五郎',
    [EXCEL_HEADERS.class3A_duration]: 2,
    [EXCEL_HEADERS.class3B_subject]: '災害医学',
    [EXCEL_HEADERS.class3B_teacher]: '渡辺六郎',
    [EXCEL_HEADERS.class3B_duration]: 2,
    [EXCEL_HEADERS.class3N_subject]: '救急医療制度',
    [EXCEL_HEADERS.class3N_teacher]: '中村七郎',
    [EXCEL_HEADERS.class3N_duration]: 2,
    [EXCEL_HEADERS.class3_exam]: '国家試験対策'
  };
}

export function getColumnWidths() {
  return [
    { wch: 12 }, // 日付
    { wch: 6 },  // 曜日
    { wch: 6 },  // 時限
    // 各クラスの列幅
    ...Array(9).fill({ wch: 15 }), // 1年生
    ...Array(9).fill({ wch: 15 }), // 2年生
    ...Array(10).fill({ wch: 15 }) // 3年生（模擬試験含む）
  ];
}