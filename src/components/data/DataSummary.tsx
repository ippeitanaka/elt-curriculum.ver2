import React from 'react';
import { Schedule } from '../../types/schedule';
import { BarChart3, Users, CalendarDays } from 'lucide-react';

interface DataSummaryProps {
  schedules: Schedule[];
}

export function DataSummary({ schedules }: DataSummaryProps) {
  const totalClasses = schedules.length;
  const uniqueTeachers = new Set(schedules.map(s => s.teacher)).size;
  const uniqueDates = new Set(schedules.map(s => s.date)).size;

  const stats = [
    {
      icon: BarChart3,
      label: '総授業数',
      value: totalClasses,
      color: 'text-blue-600'
    },
    {
      icon: Users,
      label: '担当教員数',
      value: uniqueTeachers,
      color: 'text-green-600'
    },
    {
      icon: CalendarDays,
      label: '実施日数',
      value: uniqueDates,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">データサマリー</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <Icon className={`w-8 h-8 ${color}`} />
            <div>
              <p className="text-sm text-gray-600">{label}</p>
              <p className="text-2xl font-semibold text-gray-900">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}