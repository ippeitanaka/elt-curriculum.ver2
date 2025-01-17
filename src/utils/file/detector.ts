export function detectFileType(file: File): 'excel' | 'csv' {
  const extension = file.name.split('.').pop()?.toLowerCase();
  
  switch (extension) {
    case 'xlsx':
    case 'xls':
      return 'excel';
    case 'csv':
      return 'csv';
    default:
      throw new Error('サポートされていないファイル形式です。(.xlsx, .xls, .csv)のみ対応しています。');
  }
}