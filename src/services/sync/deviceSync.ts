import { Schedule } from '../../types/schedule';
import { DeviceSyncResult } from './types';
import { scheduleDB } from '../db';

export async function syncWithDevice(schedules: Schedule[]): Promise<DeviceSyncResult> {
  try {
    // Save schedules to IndexedDB
    await scheduleDB.saveSchedules(schedules);

    // Store sync timestamp and data version
    const syncTime = new Date().toISOString();
    const dataVersion = Date.now().toString();
    
    localStorage.setItem('lastDeviceSync', syncTime);
    localStorage.setItem('dataVersion', dataVersion);

    return {
      success: true,
      syncTime,
      message: 'デバイスとの同期が完了しました'
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'デバイスとの同期に失敗しました'
    };
  }
}

export function getLastDeviceSync(): string | null {
  return localStorage.getItem('lastDeviceSync');
}

export function getDataVersion(): string | null {
  return localStorage.getItem('dataVersion');
}