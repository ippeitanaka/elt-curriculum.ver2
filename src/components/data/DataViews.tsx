import React, { useState } from 'react';
import { CalendarDays, List, RefreshCw } from 'lucide-react';
import { Schedule } from '../../types/schedule';
import { CalendarView } from '../CalendarView';
import { ScheduleTable } from './schedule/ScheduleTable';

interface DataViewsProps {
  schedules: Schedule[];
  onRefresh: () => void;
  isLoading: boolean;
}

export function DataViews({ schedules, onRefresh, isLoading }: DataViewsProps) {
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-2">
          <button
            onClick={() => setViewMode('calendar')}
            className={`flex items-center px-4 py-2 rounded-md ${
              viewMode === 'calendar'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <CalendarDays className="w-4 h-4 mr-2" />
            カレンダー表示
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center px-4 py-2 rounded-md ${
              viewMode === 'list'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <List className="w-4 h-4 mr-2" />
            リスト表示
          </button>
        </div>
        
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className={`flex items-center px-4 py-2 rounded-md ${
            isLoading
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          更新
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="flex items-center space-x-2">
            <RefreshCw className="w-6 h-6 text-blue-600 animate-spin" />
            <span className="text-gray-600">データを更新中...</span>
          </div>
        </div>
      ) : (
        <div className="mt-4">
          {viewMode === 'calendar' ? (
            <CalendarView schedules={schedules} />
          ) : (
            <ScheduleTable schedules={schedules} />
          )}
        </div>
      )}
    </div>
  );
}