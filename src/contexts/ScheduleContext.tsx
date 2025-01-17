import React, { createContext, useContext, useState, useEffect } from 'react';
import { Schedule } from '../types/schedule';
import { scheduleDB } from '../services/db';

interface ScheduleContextType {
  schedules: Schedule[];
  setSchedules: (schedules: Schedule[]) => void;
  lastUpdated: Date | null;
  updateSchedules: (newSchedules: Schedule[]) => void;
  isLoading: boolean;
}

const ScheduleContext = createContext<ScheduleContextType | undefined>(undefined);

// Sample schedule data for demonstration
const sampleSchedules: Schedule[] = [
  {
    id: '1',
    date: '2024-04-01',
    period: 1,
    duration: 2,
    subject: '救急医学',
    teacher: '山田太郎',
    room: '講義室1',
    department: 'day',
    class: 'A',
    year: 1
  },
  {
    id: '2',
    date: '2024-04-01',
    period: 3,
    duration: 2,
    subject: '基礎医学',
    teacher: '鈴木一郎',
    room: '講義室2',
    department: 'day',
    class: 'B',
    year: 1
  }
];

export function ScheduleProvider({ children }: { children: React.ReactNode }) {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load schedules from IndexedDB on initial mount
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
          // If no stored schedules, use sample data
          setSchedules(sampleSchedules);
          await scheduleDB.saveSchedules(sampleSchedules);
        }
      } catch (error) {
        console.error('Failed to load schedules:', error);
        setSchedules(sampleSchedules);
      } finally {
        setIsLoading(false);
      }
    };

    loadSchedules();
  }, []);

  const updateSchedules = async (newSchedules: Schedule[]) => {
    try {
      const now = new Date();
      setSchedules(newSchedules);
      setLastUpdated(now);
      
      // Persist to IndexedDB
      await scheduleDB.saveSchedules(newSchedules);
    } catch (error) {
      console.error('Failed to update schedules:', error);
    }
  };

  return (
    <ScheduleContext.Provider value={{ 
      schedules, 
      setSchedules, 
      lastUpdated, 
      updateSchedules,
      isLoading
    }}>
      {children}
    </ScheduleContext.Provider>
  );
}

export function useSchedules() {
  const context = useContext(ScheduleContext);
  if (context === undefined) {
    throw new Error('useSchedules must be used within a ScheduleProvider');
  }
  return context;
}