import { useEffect, useState } from 'react';
import { useSchedules } from '../contexts/schedule';
import { Schedule } from '../types/schedule';
import { scheduleDB } from '../services/db';

export function useSharedData() {
  const { updateSchedules } = useSchedules();
  const [isSharedView, setIsSharedView] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  useEffect(() => {
    const loadSharedData = async () => {
      const pathname = window.location.pathname;
      const match = pathname.match(/^\/s\/(.+)$/);
      
      if (match) {
        const shareId = match[1];
        setIsSharedView(true);
        setIsLoading(true);
        setError(null);

        try {
          const sharedSchedules = await scheduleDB.getSharedSchedules(shareId);
          if (!sharedSchedules) {
            throw new Error('共有データが見つかりません');
          }

          setSchedules(sharedSchedules);
          await updateSchedules(sharedSchedules);
        } catch (err) {
          setError(err instanceof Error ? err.message : '共有データの読み込みに失敗しました');
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadSharedData();
  }, [updateSchedules]);

  return { isSharedView, isLoading, error, schedules };
}