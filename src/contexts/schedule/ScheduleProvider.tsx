import React from 'react';
import { ScheduleContext } from './ScheduleContext';
import { useScheduleState } from './hooks/useScheduleState';
import { useScheduleInitialization } from './hooks/useScheduleInitialization';
import { fetchSchedules } from '../../services/supabase';

interface ScheduleProviderProps {
  children: React.ReactNode;
}

export function ScheduleProvider({ children }: ScheduleProviderProps) {
  const {
    schedules,
    setSchedules,
    lastUpdated,
    setLastUpdated,
    isLoading,
    setIsLoading,
    updateSchedules,
    syncState
  } = useScheduleState();

  React.useEffect(() => {
    const loadInitialData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchSchedules();
        if (data && data.length > 0) {
          setSchedules(data);
          setLastUpdated(new Date());
        }
      } catch (error) {
        console.error('Failed to load initial data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, []);

  return (
    <ScheduleContext.Provider value={{
      schedules,
      setSchedules,
      lastUpdated,
      updateSchedules,
      isLoading,
      syncState
    }}>
      {children}
    </ScheduleContext.Provider>
  );
}