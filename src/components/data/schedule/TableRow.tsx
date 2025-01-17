import React from 'react';
import { Schedule } from '../../../types/schedule';
import { formatScheduleTime } from '../../../utils/schedule';

interface TableRowProps {
  schedule: Schedule;
}

export function TableRow({ schedule }: TableRowProps) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {schedule.date}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {formatScheduleTime(schedule)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {schedule.duration}コマ
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {schedule.subject}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {schedule.teacher}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {schedule.year}年{schedule.class}組
      </td>
    </tr>
  );
}