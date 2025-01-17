import { useContext } from 'react';
import { ScheduleContext } from './ScheduleContext';

export function useSchedules() {
  const context = useContext(ScheduleContext);
  if (context === undefined) {
    throw new Error('useSchedules must be used within a ScheduleProvider');
  }
  return context;
}