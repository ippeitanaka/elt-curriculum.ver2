import React from 'react';
import { Schedule } from '../../types/schedule';
import { formatScheduleTime } from '../../utils/schedule';

interface CalendarCellProps {
  date: Date;
  schedules: Schedule[];
}

export function CalendarCell({ date, schedules }: CalendarCellProps) {
  const isToday = new Date().toDateString() === date.toDateString();

  return (
    <div className={`min-h-[70px] md:min-h-[100px] bg-white p-1 border-r border-b ${
      isToday ? 'bg-blue-50' : ''
    }`}>
      <div className="flex justify-between items-center mb-0.5">
        <span className={`text-[8px] md:text-xs ${
          isToday ? 'text-blue-600 font-semibold' : 'text-gray-500'
        }`}>
          {date.getDate()}
        </span>
        {schedules.length > 0 && (
          <span className="text-[7px] md:text-[10px] bg-blue-100 text-blue-800 px-1 py-0.5 rounded-full">
            {schedules.length}
          </span>
        )}
      </div>
      <div className="space-y-0.5">
        {schedules.map((schedule) => (
          <div
            key={schedule.id}
            className="text-[7px] md:text-[10px] p-0.5 rounded bg-blue-50 border border-blue-100"
          >
            <div className="font-medium text-blue-800 truncate">
              {schedule.year}年{schedule.class}組
            </div>
            <div className="text-gray-600 truncate">
              {formatScheduleTime(schedule)}
            </div>
            <div className="font-medium text-gray-800 truncate">
              {schedule.subject}
              <span className="text-gray-600 ml-0.5">
                ({schedule.teacher})
              </span>
              {schedule.duration > 0 && (
                <span className="text-blue-600 ml-1">
                  {schedule.duration}コマ
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}