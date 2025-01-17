import { Schedule } from '../../types/schedule';
import { scheduleDB } from '../db';
import { SyncMetadata } from './types';

const SYNC_KEY = 'sync-metadata';

export async function getLastSyncTime(): Promise<string | null> {
  try {
    const metadata = await scheduleDB.getMetadata<SyncMetadata>(SYNC_KEY);
    return metadata?.lastSynced || null;
  } catch (error) {
    console.error('Failed to get last sync time:', error);
    return null;
  }
}

export async function updateSyncMetadata(schedules: Schedule[]): Promise<void> {
  try {
    // メタデータの更新を試みる前に、データベースが初期化されていることを確認
    if (!scheduleDB) {
      console.warn('Database not initialized yet');
      return;
    }

    const metadata: SyncMetadata = {
      lastSynced: new Date().toISOString(),
      version: Date.now(),
      count: schedules.length
    };

    await scheduleDB.saveMetadata(SYNC_KEY, metadata);
  } catch (error) {
    // エラーをログに記録するが、アプリケーションの動作は継続
    console.warn('Failed to update sync metadata:', error);
  }
}