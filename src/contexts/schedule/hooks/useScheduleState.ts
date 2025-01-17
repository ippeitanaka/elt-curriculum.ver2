import { useState } from 'react';
import { Schedule } from '../../../types/schedule';
import { useScheduleSync } from './useScheduleSync';

export function useScheduleState() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { syncSchedules, syncState } = useScheduleSync();

  const updateSchedules = async (newSchedules: Schedule[]) => {
    try {
      const result = await syncSchedules(newSchedules);
      if (result.success) {
        setSchedules(newSchedules);
        setLastUpdated(new Date());
      }
    } catch (error) {
      console.error('Failed to update schedules:', error);
    }
  };

  return {
    schedules,
    setSchedules,
    lastUpdated,
    setLastUpdated,
    isLoading,
    setIsLoading,
    updateSchedules,
    syncState
  };
}