import { useState, useCallback } from 'react';
import { Schedule } from '../../../types/schedule';
import { scheduleDB } from '../../../services/db';
import { updateSyncMetadata } from '../../../services/sync/storage';
import { SyncState } from '../../../services/sync/types';

export function useScheduleSync() {
  const [syncState, setSyncState] = useState<SyncState>({
    lastSynced: null,
    version: 0,
    status: 'idle'
  });

  const syncSchedules = useCallback(async (schedules: Schedule[]) => {
    setSyncState(prev => ({ ...prev, status: 'syncing' }));
    
    try {
      // Save schedules to IndexedDB
      await scheduleDB.saveSchedules(schedules);
      
      // Update sync metadata
      await updateSyncMetadata(schedules);
      
      const newState: SyncState = {
        lastSynced: new Date().toISOString(),
        version: Date.now(),
        status: 'idle'
      };
      
      setSyncState(newState);
      return { success: true, schedules };
    } catch (error) {
      const errorState: SyncState = {
        lastSynced: null,
        version: 0,
        status: 'error',
        error: error instanceof Error ? error.message : '同期に失敗しました'
      };
      
      setSyncState(errorState);
      return {
        success: false,
        error: errorState.error
      };
    }
  }, []);

  return { syncState, syncSchedules };
}