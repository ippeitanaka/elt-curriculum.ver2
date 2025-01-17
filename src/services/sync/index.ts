import { Schedule } from '../../types/schedule';
import { SyncResult, SyncState } from './types';
import { scheduleDB } from '../db';
import { getLastSyncTime, updateSyncMetadata } from './storage';

export async function syncSchedules(
  schedules: Schedule[],
  onStateChange: (state: SyncState) => void
): Promise<SyncResult> {
  try {
    onStateChange({ status: 'syncing', lastSynced: null, version: 0 });

    // Save to local database
    await scheduleDB.saveSchedules(schedules);
    await updateSyncMetadata(schedules);
    
    const lastSynced = await getLastSyncTime();
    const newState = {
      lastSynced,
      version: Date.now(),
      status: 'idle' as const
    };
    
    onStateChange(newState);
    return { success: true, schedules };
  } catch (error) {
    const errorState = { 
      status: 'error' as const, 
      lastSynced: null, 
      version: 0 
    };
    onStateChange(errorState);
    
    return {
      success: false,
      error: error instanceof Error ? error.message : '同期に失敗しました'
    };
  }
}