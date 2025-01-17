import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { Schedule } from '../types/schedule';

interface ScheduleDB extends DBSchema {
  schedules: {
    key: string;
    value: Schedule;
    indexes: { 'by-date': string };
  };
  metadata: {
    key: string;
    value: {
      lastUpdated: string;
      version: number;
    };
  };
}

class ScheduleDatabase {
  private db: Promise<IDBPDatabase<ScheduleDB>>;

  constructor() {
    this.db = this.initDB();
  }

  private async initDB() {
    return openDB<ScheduleDB>('schedule-db', 1, {
      upgrade(db) {
        const scheduleStore = db.createObjectStore('schedules', { keyPath: 'id' });
        scheduleStore.createIndex('by-date', 'date');
        db.createObjectStore('metadata');
      },
    });
  }

  async getAllSchedules(): Promise<Schedule[]> {
    const db = await this.db;
    return db.getAll('schedules');
  }

  async saveSchedules(schedules: Schedule[]): Promise<void> {
    const db = await this.db;
    const tx = db.transaction(['schedules', 'metadata'], 'readwrite');
    
    // Clear existing schedules
    await tx.objectStore('schedules').clear();
    
    // Add new schedules
    for (const schedule of schedules) {
      await tx.objectStore('schedules').add(schedule);
    }
    
    // Update metadata
    await tx.objectStore('metadata').put({
      lastUpdated: new Date().toISOString(),
      version: Date.now(),
    }, 'sync-info');
    
    await tx.done;
  }

  async getLastUpdated(): Promise<string | null> {
    const db = await this.db;
    const metadata = await db.get('metadata', 'sync-info');
    return metadata?.lastUpdated || null;
  }
}

export const scheduleDB = new ScheduleDatabase();