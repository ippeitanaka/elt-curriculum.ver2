import React, { useRef, useState } from 'react';
import { Upload, Download, FileText } from 'lucide-react';
import { Schedule } from '../../../types/schedule';
import { CSVButton } from './CSVButton';
import { processFile } from '../../../utils/csv/processor';
import { generateCSVTemplate } from '../../../utils/csv/template';
import { downloadCSV } from '../../../utils/csv/download';
import { ImportStatus } from './types';
import { StatusMessage } from '../status/StatusMessage';

interface CSVImportExportProps {
  onImport: (schedules: Schedule[]) => void;
  schedules: Schedule[];
}

export function CSVImportExport({ onImport, schedules }: CSVImportExportProps) {
  const [error, setError] = useState<string>('');
  const [status, setStatus] = useState<ImportStatus>({ status: 'idle' });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [encoding, setEncoding] = useState<string>('UTF-8');

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setError('');
      setStatus({ status: 'loading', message: 'データを読み込んでいます...' });
      const parsedSchedules = await processFile(file, { encoding });
      onImport(parsedSchedules);
      setStatus({ 
        status: 'success', 
        message: `${parsedSchedules.length}件のスケジュールを読み込みました。` 
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'ファイルのインポートに失敗しました');
      setStatus({ 
        status: 'error', 
        message: err instanceof Error ? err.message : 'ファイルのインポートに失敗しました' 
      });
    }
  };

  const handleDownloadTemplate = () => {
    try {
      const template = generateCSVTemplate();
      downloadCSV(template, 'schedule_template.csv');
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
      const exportData = generateCSVTemplate(); // 実際のデータに置き換える
      downloadCSV(exportData, 'schedules.csv');
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
        
        <CSVButton
          onClick={() => fileInputRef.current?.click()}
          icon={Upload}
          label="インポート"
          variant="primary"
        />
        <CSVButton
          onClick={handleDownloadTemplate}
          icon={FileText}
          label="テンプレート"
          variant="secondary"
        />
        <CSVButton
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
        accept=".csv"
        className="hidden"
      />
      
      <StatusMessage status={status} />
    </div>
  );
}