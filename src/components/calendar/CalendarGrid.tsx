import React from 'react';
import { CalendarCell } from './CalendarCell';
import { Schedule } from '../../types/schedule';

interface CalendarGridProps {
  currentDate: Date;
  schedules: Schedule[];
}

export function CalendarGrid({ currentDate, schedules }: CalendarGridProps) {
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const daysInPrevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
  const calendarDays: Date[] = [];
  
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    calendarDays.push(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, daysInPrevMonth - i)
    );
  }
  
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
  }
  
  const remainingDays = 42 - calendarDays.length;
  for (let i = 1; i <= remainingDays; i++) {
    calendarDays.push(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, i));
  }

  return (
    <div className="border-l border-t border-gray-200 overflow-x-auto">
      <div className="grid grid-cols-7 bg-gray-50">
        {['日', '月', '火', '水', '木', '金', '土'].map((day) => (
          <div
            key={day}
            className="py-0.5 md:py-1 text-center text-[8px] md:text-xs font-medium text-gray-500 border-r border-b"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {calendarDays.map((date, index) => {
          const daySchedules = schedules.filter(schedule => {
            const scheduleDate = new Date(schedule.date);
            return scheduleDate.toDateString() === date.toDateString();
          });

          return (
            <CalendarCell
              key={index}
              date={date}
              schedules={daySchedules}
            />
          );
        })}
      </div>
    </div>
  );
}