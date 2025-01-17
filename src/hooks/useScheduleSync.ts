import { useState, useCallback } from 'react';
import { Schedule } from '../types/schedule';
import { scheduleDB } from '../services/db';
import { getLastSyncTime, updateSyncMetadata } from '../services/sync/storage';
import { SyncState } from '../services/sync/types';

export function useScheduleSync() {
  const [syncState, setSyncState] = useState<SyncState>({
    lastSynced: null,
    version: 0,
    status: 'idle'
  });

  const syncSchedules = useCallback(async (schedules: Schedule[]) => {
    setSyncState(prev => ({ ...prev, status: 'syncing' }));
    
    try {
      // Save to IndexedDB
      await scheduleDB.saveSchedules(schedules);
      
      // Update sync metadata
      await updateSyncMetadata(schedules);
      
      // Get last sync time
      const lastSynced = await getLastSyncTime();
      
      setSyncState({
        lastSynced,
        version: Date.now(),
        status: 'idle'
      });

      return { success: true, schedules };
    } catch (error) {
      setSyncState(prev => ({ ...prev, status: 'error' }));
      return {
        success: false,
        error: error instanceof Error ? error.message : '同期に失敗しました'
      };
    }
  }, []);

  return {
    syncState,
    syncSchedules
  };
}