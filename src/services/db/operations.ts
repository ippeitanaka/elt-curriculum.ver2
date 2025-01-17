import { IDBPDatabase } from 'idb';
import { Schedule } from '../../types/schedule';
import { ScheduleDB, DatabaseMetadata } from './types';
import { DB_CONFIG } from './config';

export async function getAllSchedules(db: IDBPDatabase<ScheduleDB>): Promise<Schedule[]> {
  return db.getAll(DB_CONFIG.stores.schedules);
}

export async function saveSchedules(
  db: IDBPDatabase<ScheduleDB>,
  schedules: Schedule[]
): Promise<void> {
  const tx = db.transaction(
    [DB_CONFIG.stores.schedules, DB_CONFIG.stores.metadata],
    'readwrite'
  );
  
  // Clear existing schedules
  await tx.objectStore(DB_CONFIG.stores.schedules).clear();
  
  // Add new schedules
  for (const schedule of schedules) {
    await tx.objectStore(DB_CONFIG.stores.schedules).add(schedule);
  }
  
  // Update metadata
  const metadata: DatabaseMetadata = {
    lastUpdated: new Date().toISOString(),
    version: Date.now(),
  };
  
  await tx.objectStore(DB_CONFIG.stores.metadata).put(
    metadata,
    DB_CONFIG.keys.syncInfo
  );
  
  await tx.done;
}

export async function getLastUpdated(
  db: IDBPDatabase<ScheduleDB>
): Promise<string | null> {
  const metadata = await db.get(
    DB_CONFIG.stores.metadata,
    DB_CONFIG.keys.syncInfo
  );
  return metadata?.lastUpdated || null;
}