import React from 'react';
import { Schedule } from '../../types/schedule';
import { AlertTriangle, CheckCircle } from 'lucide-react';

interface ValidationResult {
  type: 'error' | 'warning';
  message: string;
}

interface ValidationResultsProps {
  schedules: Schedule[];
}

export function ValidationResults({ schedules }: ValidationResultsProps) {
  const results = validateSchedules(schedules);
  
  if (results.length === 0) {
    return (
      <div className="bg-green-50 text-green-700 p-4 rounded-lg flex items-center">
        <CheckCircle className="w-5 h-5 mr-2" />
        データの検証が完了しました。問題は見つかりませんでした。
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">検証結果</h3>
      <div className="space-y-2">
        {results.map((result, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg flex items-start space-x-2 ${
              result.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-yellow-50 text-yellow-700'
            }`}
          >
            <AlertTriangle className="w-5 h-5 mt-0.5" />
            <span>{result.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function validateSchedules(schedules: Schedule[]): ValidationResult[] {
  const results: ValidationResult[] = [];

  // 日付の重複チェック
  const dateMap = new Map<string, Schedule[]>();
  schedules.forEach(schedule => {
    const key = `${schedule.date}-${schedule.period}-${schedule.class}-${schedule.year}`;
    const existing = dateMap.get(key) || [];
    dateMap.set(key, [...existing, schedule]);
  });

  dateMap.forEach((schedules, key) => {
    if (schedules.length > 1) {
      results.push({
        type: 'error',
        message: `重複したスケジュールが存在します: ${schedules[0].date} ${schedules[0].period}時限 ${schedules[0].year}年${schedules[0].class}組`
      });
    }
  });

  // 時限の連続性チェック
  schedules.forEach(schedule => {
    if (schedule.period + schedule.duration > 7) {
      results.push({
        type: 'warning',
        message: `${schedule.date} ${schedule.year}年${schedule.class}組の授業が6時限を超えて設定されています`
      });
    }
  });

  return results;
}