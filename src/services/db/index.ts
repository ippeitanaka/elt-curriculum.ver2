import { openDB, IDBPDatabase } from 'idb';
import { Schedule } from '../../types/schedule';
import { ScheduleDB } from './types';
import { DB_CONFIG } from './config';
import { DatabaseError } from './errors';

class ScheduleDatabase {
  private db: Promise<IDBPDatabase<ScheduleDB>>;
  private initialized: boolean = false;

  constructor() {
    this.db = this.initDB();
  }

  private async initDB() {
    try {
      const db = await openDB<ScheduleDB>(DB_CONFIG.name, DB_CONFIG.version, {
        upgrade(db) {
          // スケジュールストア
          if (!db.objectStoreNames.contains(DB_CONFIG.stores.schedules)) {
            const scheduleStore = db.createObjectStore(
              DB_CONFIG.stores.schedules,
              { keyPath: 'id' }
            );
            scheduleStore.createIndex(DB_CONFIG.indexes.byDate, 'date');
          }
          
          // メタデータストア
          if (!db.objectStoreNames.contains(DB_CONFIG.stores.metadata)) {
            db.createObjectStore(DB_CONFIG.stores.metadata);
          }
        },
      });
      this.initialized = true;
      return db;
    } catch (error) {
      console.error('Failed to initialize database:', error);
      throw new DatabaseError('データベースの初期化に失敗しました');
    }
  }

  public isInitialized(): boolean {
    return this.initialized;
  }

  async getAllSchedules(): Promise<Schedule[]> {
    try {
      const db = await this.db;
      return await db.getAll(DB_CONFIG.stores.schedules);
    } catch (error) {
      console.error('Failed to get schedules:', error);
      throw new DatabaseError('スケジュールの取得に失敗しました');
    }
  }

  async saveSchedules(schedules: Schedule[]): Promise<void> {
    try {
      const db = await this.db;
      const tx = db.transaction(
        [DB_CONFIG.stores.schedules, DB_CONFIG.stores.metadata],
        'readwrite'
      );

      // 既存のスケジュールをクリア
      await tx.objectStore(DB_CONFIG.stores.schedules).clear();
      
      // 新しいスケジュールを保存
      for (const schedule of schedules) {
        await tx.objectStore(DB_CONFIG.stores.schedules).add(schedule);
      }
      
      // 最終更新日時を保存
      await tx.objectStore(DB_CONFIG.stores.metadata).put(
        new Date().toISOString(),
        'lastUpdated'
      );
      
      await tx.done;
    } catch (error) {
      console.error('Failed to save schedules:', error);
      throw new DatabaseError('スケジュールの保存に失敗しました');
    }
  }

  async getLastUpdated(): Promise<string | null> {
    try {
      const db = await this.db;
      return await db.get(DB_CONFIG.stores.metadata, 'lastUpdated');
    } catch (error) {
      console.error('Failed to get last updated:', error);
      return null;
    }
  }
}

export const scheduleDB = new ScheduleDatabase();