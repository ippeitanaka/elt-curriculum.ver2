import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { formatMonth } from '../../utils/date';

interface CalendarNavigationProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

export function CalendarNavigation({
  currentDate,
  onPrevMonth,
  onNextMonth
}: CalendarNavigationProps) {
  return (
    <div className="flex items-center space-x-1 md:space-x-2">
      <button
        onClick={onPrevMonth}
        className="p-1 md:p-1.5 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="前月へ"
      >
        <ChevronLeft className="h-3 w-3 md:h-4 md:w-4 text-gray-600" />
      </button>
      <h2 className="text-xs md:text-base font-semibold text-gray-900">
        {formatMonth(currentDate)}
      </h2>
      <button
        onClick={onNextMonth}
        className="p-1 md:p-1.5 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="次月へ"
      >
        <ChevronRight className="h-3 w-3 md:h-4 md:w-4 text-gray-600" />
      </button>
    </div>
  );
}