import { ExcelHeaderKey, ExcelHeaderValue } from '../types/headers';

// ヘッダーの順序定義
export const HEADER_ORDER: ExcelHeaderKey[] = [
  'date',
  'dayOfWeek',
  'period',
  'class1A_subject',
  'class1A_teacher',
  'class1A_duration',
  'class1B_subject',
  'class1B_teacher',
  'class1B_duration',
  'class1N_subject',
  'class1N_teacher',
  'class1N_duration',
  'class2A_subject',
  'class2A_teacher',
  'class2A_duration',
  'class2B_subject',
  'class2B_teacher',
  'class2B_duration',
  'class2N_subject',
  'class2N_teacher',
  'class2N_duration',
  'class3A_subject',
  'class3A_teacher',
  'class3A_duration',
  'class3B_subject',
  'class3B_teacher',
  'class3B_duration',
  'class3N_subject',
  'class3N_teacher',
  'class3N_duration',
  'class3_exam'
];

// ヘッダー設定の定義
export const HEADERS: Record<ExcelHeaderKey, ExcelHeaderValue> = {
  date: {
    key: 'date',
    label: '日付',
    width: 12,
    validate: (value: string) => /^\d{4}-\d{2}-\d{2}$/.test(value)
  },
  dayOfWeek: {
    key: 'dayOfWeek',
    label: '曜日',
    width: 6,
    validate: (value: string) => ['月', '火', '水', '木', '金', '土', '日'].includes(value)
  },
  period: {
    key: 'period',
    label: '時限',
    width: 6,
    validate: (value: number) => value >= 1 && value <= 6
  },
  // 1年生
  class1A_subject: { key: 'class1A_subject', label: '1年A組の授業内容', width: 15 },
  class1A_teacher: { key: 'class1A_teacher', label: '1年A組担当講師名', width: 15 },
  class1A_duration: { 
    key: 'class1A_duration', 
    label: '1年A組コマ数', 
    width: 8,
    validate: (v: number) => v >= 1 && v <= 4 
  },
  class1B_subject: { key: 'class1B_subject', label: '1年B組の授業内容', width: 15 },
  class1B_teacher: { key: 'class1B_teacher', label: '1年B組担当講師名', width: 15 },
  class1B_duration: { 
    key: 'class1B_duration', 
    label: '1年B組コマ数', 
    width: 8,
    validate: (v: number) => v >= 1 && v <= 4 
  },
  class1N_subject: { key: 'class1N_subject', label: '1年N組の授業内容', width: 15 },
  class1N_teacher: { key: 'class1N_teacher', label: '1年N組担当講師名', width: 15 },
  class1N_duration: { 
    key: 'class1N_duration', 
    label: '1年N組コマ数', 
    width: 8,
    validate: (v: number) => v >= 1 && v <= 4 
  },
  // 2年生
  class2A_subject: { key: 'class2A_subject', label: '2年A組の授業内容', width: 15 },
  class2A_teacher: { key: 'class2A_teacher', label: '2年A組担当講師名', width: 15 },
  class2A_duration: { 
    key: 'class2A_duration', 
    label: '2年A組コマ数', 
    width: 8,
    validate: (v: number) => v >= 1 && v <= 4 
  },
  class2B_subject: { key: 'class2B_subject', label: '2年B組の授業内容', width: 15 },
  class2B_teacher: { key: 'class2B_teacher', label: '2年B組担当講師名', width: 15 },
  class2B_duration: { 
    key: 'class2B_duration', 
    label: '2年B組コマ数', 
    width: 8,
    validate: (v: number) => v >= 1 && v <= 4 
  },
  class2N_subject: { key: 'class2N_subject', label: '2年N組の授業内容', width: 15 },
  class2N_teacher: { key: 'class2N_teacher', label: '2年N組担当講師名', width: 15 },
  class2N_duration: { 
    key: 'class2N_duration', 
    label: '2年N組コマ数', 
    width: 8,
    validate: (v: number) => v >= 1 && v <= 4 
  },
  // 3年生
  class3A_subject: { key: 'class3A_subject', label: '3年A組の授業内容', width: 15 },
  class3A_teacher: { key: 'class3A_teacher', label: '3年A組担当講師名', width: 15 },
  class3A_duration: { 
    key: 'class3A_duration', 
    label: '3年A組コマ数', 
    width: 8,
    validate: (v: number) => v >= 1 && v <= 4 
  },
  class3B_subject: { key: 'class3B_subject', label: '3年B組の授業内容', width: 15 },
  class3B_teacher: { key: 'class3B_teacher', label: '3年B組担当講師名', width: 15 },
  class3B_duration: { 
    key: 'class3B_duration', 
    label: '3年B組コマ数', 
    width: 8,
    validate: (v: number) => v >= 1 && v <= 4 
  },
  class3N_subject: { key: 'class3N_subject', label: '3年N組の授業内容', width: 15 },
  class3N_teacher: { key: 'class3N_teacher', label: '3年N組担当講師名', width: 15 },
  class3N_duration: { 
    key: 'class3N_duration', 
    label: '3年N組コマ数', 
    width: 8,
    validate: (v: number) => v >= 1 && v <= 4 
  },
  class3_exam: { key: 'class3_exam', label: '3年各種模擬試験', width: 15 }
};