import React from 'react';
import { FileSpreadsheet, AlertCircle } from 'lucide-react';
import { Schedule } from '../../types/schedule';

interface SharePointImportProps {
  onImport: (schedules: Schedule[]) => void;
}

export function SharePointImport({ onImport }: SharePointImportProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <FileSpreadsheet className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-medium">SharePointからインポート</h3>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div className="ml-3">
              <h4 className="text-sm font-medium text-yellow-800">
                SharePointファイルのインポート手順
              </h4>
              <div className="mt-2 text-sm text-yellow-700 space-y-2">
                <ol className="list-decimal list-inside space-y-1">
                  <li>SharePointで対象のExcelファイルを開く</li>
                  <li>「ファイル」→「名前を付けて保存」→「ダウンロード」を選択</li>
                  <li>ダウンロードしたファイルを下記の「ファイルを選択」からインポート</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-50">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <FileSpreadsheet className="w-8 h-8 mb-3 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">クリックしてファイルを選択</span>
                またはドラッグ＆ドロップ
              </p>
              <p className="text-xs text-gray-500">.xlsx形式のファイル</p>
            </div>
            <input
              type="file"
              className="hidden"
              accept=".xlsx"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  // 既存のExcelインポート処理を使用
                  // onImport(schedules);
                }
              }}
            />
          </label>
        </div>
      </div>
    </div>
  );
}