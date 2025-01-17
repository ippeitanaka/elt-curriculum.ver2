import React, { useRef, useState } from 'react';
import { Upload, Download, FileSpreadsheet } from 'lucide-react';
import { parseExcelFile, generateExcelTemplate, exportSchedulesToExcel } from '../../utils/excel';
import { Schedule } from '../../types';

interface ExcelImportExportProps {
  onImport: (schedules: Schedule[]) => void;
  schedules: Schedule[];
}

export function ExcelImportExport({ onImport, schedules }: ExcelImportExportProps) {
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setError('');
      const parsedSchedules = await parseExcelFile(file);
      onImport(parsedSchedules);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'ファイルのインポートに失敗しました');
    }
  };

  const handleDownloadTemplate = () => {
    const template = generateExcelTemplate();
    const blob = new Blob([template], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'schedule_template.xlsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportSchedules = () => {
    const excelData = exportSchedulesToExcel(schedules);
    const blob = new Blob([excelData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'schedules.xlsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Upload className="w-4 h-4 mr-2" />
          インポート
        </button>
        <button
          onClick={handleDownloadTemplate}
          className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
        >
          <FileSpreadsheet className="w-4 h-4 mr-2" />
          テンプレート
        </button>
        <button
          onClick={handleExportSchedules}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          <Download className="w-4 h-4 mr-2" />
          エクスポート
        </button>
      </div>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept=".xlsx,.xls"
        className="hidden"
      />
      
      {error && (
        <div className="text-red-600 text-sm">
          {error}
        </div>
      )}
    </div>
  );
}