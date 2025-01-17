import React, { useRef, useState } from 'react';
import { Upload, Download, FileSpreadsheet } from 'lucide-react';
import { processFile } from '../../../utils/file/processor';
import { Schedule } from '../../../types/schedule';
import { ExcelButton } from './ExcelButton';
import { generateExcelTemplate } from '../../../utils/excel/template';
import { downloadExcelFile } from '../../../utils/excel/download';

interface ExcelImportExportProps {
  onImport: (schedules: Schedule[]) => void;
  schedules: Schedule[];
}

export function ExcelImportExport({ onImport, schedules }: ExcelImportExportProps) {
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [encoding, setEncoding] = useState<string>('UTF-8');

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setError('');
      const parsedSchedules = await processFile(file, { encoding });
      onImport(parsedSchedules);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'ファイルのインポートに失敗しました');
    }
  };

  const handleDownloadTemplate = () => {
    try {
      const template = generateExcelTemplate();
      downloadExcelFile(template, 'schedule_template.xlsx');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'テンプレートの生成に失敗しました');
    }
  };

  const handleExportSchedules = () => {
    if (schedules.length === 0) {
      setError('エクスポートするデータがありません');
      return;
    }
    try {
      // TODO: Implement export functionality
      const exportData = generateExcelTemplate(); // This will be replaced with actual export data
      downloadExcelFile(exportData, 'schedules.xlsx');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'エクスポートに失敗しました');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center space-x-2">
          <label htmlFor="encoding" className="text-sm font-medium text-gray-700">
            文字コード:
          </label>
          <select
            id="encoding"
            value={encoding}
            onChange={(e) => setEncoding(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm text-sm"
          >
            <option value="UTF-8">UTF-8</option>
            <option value="Shift_JIS">Shift-JIS</option>
          </select>
        </div>
        
        <ExcelButton
          onClick={() => fileInputRef.current?.click()}
          icon={Upload}
          label="インポート"
          variant="primary"
        />
        <ExcelButton
          onClick={handleDownloadTemplate}
          icon={FileSpreadsheet}
          label="テンプレート"
          variant="secondary"
        />
        <ExcelButton
          onClick={handleExportSchedules}
          icon={Download}
          label="エクスポート"
          variant="success"
          disabled={schedules.length === 0}
        />
      </div>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept=".xlsx,.xls,.csv"
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