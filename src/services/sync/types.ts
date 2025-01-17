import { Schedule } from '../../types/schedule';

export interface SyncState {
  lastSynced: string | null;
  version: number;
  status: 'idle' | 'syncing' | 'error';
  error?: string;
}

export interface SyncResult {
  success: boolean;
  error?: string;
  schedules?: Schedule[];
}

export interface DeviceSyncResult {
  success: boolean;
  syncTime?: string;
  message?: string;
  error?: string;
}

export interface SyncMetadata {
  lastSynced: string;
  version: number;
  count: number;
}