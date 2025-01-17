import React from 'react';
import { CSVImportExport } from './csv/CSVImportExport';
import { DataSummary } from './DataSummary';
import { FilterPanel } from './FilterPanel';
import { ScheduleTable } from './schedule/ScheduleTable';
import { NoResults } from '../NoResults';
import { useScheduleFilters } from '../../hooks/useScheduleFilters';
import { useSchedules } from '../../contexts/schedule';
import { insertSchedules, clearAllSchedules } from '../../services/supabase';
import { Schedule } from '../../types/schedule';
import { Trash2, AlertCircle } from 'lucide-react';

export function DataManagement() {
  const { schedules, updateSchedules } = useSchedules();
  const {
    filters,
    setFilters,
    filteredSchedules,
    resetFilters,
    hasResults
  } = useScheduleFilters(schedules);

  const handleImport = async (newSchedules: Schedule[]) => {
    try {
      // データの検証とログ出力
      console.log('Importing schedules:', {
        total: newSchedules.length,
        firstDate: newSchedules[0]?.date,
        lastDate: newSchedules[newSchedules.length - 1]?.date
      });

      // 日付でソート
      const sortedSchedules = [...newSchedules].sort((a, b) => 
        a.date.localeCompare(b.date)
      );

      // Save to Supabase and replace all existing data
      const savedSchedules = await insertSchedules(
        sortedSchedules.map(({ id, ...schedule }) => schedule)
      );
      
      // Update local state with new data
      if (savedSchedules) {
        console.log('Successfully saved schedules:', {
          total: savedSchedules.length,
          firstDate: savedSchedules[0]?.date,
          lastDate: savedSchedules[savedSchedules.length - 1]?.date
        });
        updateSchedules(savedSchedules);
      }
    } catch (error) {
      console.error('Failed to import schedules:', error);
      alert('スケジュールのインポートに失敗しました。');
    }
  };

  const handleClearData = async () => {
    if (!window.confirm('本当にすべてのデータを削除しますか？\nこの操作は取り消せません。')) {
      return;
    }

    try {
      await clearAllSchedules();
      updateSchedules([]);
      alert('すべてのデータを削除しました。');
    } catch (error) {
      console.error('Failed to clear schedules:', error);
      alert('データの削除に失敗しました。');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">データ管理</h2>
      
      <div className="space-y-6">
        <section className="bg-white rounded-lg shadow p-6">
          <div className="mb-4">
            <h3 className="text-lg font-medium">データのインポート/エクスポート</h3>
            <p className="text-sm text-gray-600 mt-1">
              CSVファイルを使用してカリキュラムデータを管理できます。
              インポートしたデータは自動的にすべてのユーザーと共有されます。
            </p>
          </div>
          <CSVImportExport
            onImport={handleImport}
            schedules={schedules}
          />
        </section>

        {schedules.length > 0 && (
          <>
            <DataSummary schedules={schedules} />
            <FilterPanel
              filters={filters}
              onFilterChange={setFilters}
              onReset={resetFilters}
            />
            {hasResults ? (
              <ScheduleTable schedules={filteredSchedules} />
            ) : (
              <NoResults />
            )}
          </>
        )}

        <section className="bg-white rounded-lg shadow p-6">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-red-600">データの削除</h3>
            <p className="text-sm text-gray-600 mt-1">
              すべてのカリキュラムデータを削除します。この操作は取り消せません。
            </p>
          </div>
          <button
            onClick={handleClearData}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            すべてのデータを削除
          </button>
        </section>
      </div>
    </div>
  );
}