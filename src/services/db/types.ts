import { DBSchema } from 'idb';
import { Schedule } from '../../types/schedule';

export interface ScheduleDB extends DBSchema {
  schedules: {
    key: string;
    value: Schedule;
    indexes: { 'by-date': string };
  };
  metadata: {
    key: string;
    value: any;
  };
}

export interface DatabaseMetadata {
  lastUpdated: string;
  version: number;
}