import { useEffect } from 'react';
import { scheduleDB } from '../../../services/db';
import { SAMPLE_SCHEDULES } from '../constants';

interface UseScheduleInitializationProps {
  setSchedules: (schedules: Schedule[]) => void;
  setLastUpdated: (date: Date | null) => void;
  setIsLoading: (loading: boolean) => void;
  syncSchedules: (schedules: Schedule[]) => Promise<any>;
}

export function useScheduleInitialization({
  setSchedules,
  setLastUpdated,
  setIsLoading,
  syncSchedules
}: UseScheduleInitializationProps) {
  useEffect(() => {
    const loadSchedules = async () => {
      try {
        const storedSchedules = await scheduleDB.getAllSchedules();
        const lastUpdated = await scheduleDB.getLastUpdated();
        
        if (storedSchedules.length > 0) {
          setSchedules(storedSchedules);
          if (lastUpdated) {
            setLastUpdated(new Date(lastUpdated));
          }
        } else {
          setSchedules(SAMPLE_SCHEDULES);
          await syncSchedules(SAMPLE_SCHEDULES);
        }
      } catch (error) {
        console.error('Failed to load schedules:', error);
        setSchedules(SAMPLE_SCHEDULES);
      } finally {
        setIsLoading(false);
      }
    };

    loadSchedules();
  }, [setSchedules, setLastUpdated, setIsLoading, syncSchedules]);
}