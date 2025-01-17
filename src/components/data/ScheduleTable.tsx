import React from 'react';
import { Schedule } from '../../types/schedule';
import { formatScheduleTime } from '../../utils/schedule';

interface ScheduleTableProps {
  schedules: Schedule[];
}

export function ScheduleTable({ schedules }: ScheduleTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">日付</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">時限</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">コマ数</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">科目</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">担当教員</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">教室</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {schedules.map((schedule) => (
            <tr key={schedule.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{schedule.date}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatScheduleTime(schedule)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {schedule.duration}コマ
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{schedule.subject}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{schedule.teacher}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{schedule.room}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}