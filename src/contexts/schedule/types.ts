import { Schedule } from '../../types/schedule';
import { SyncState } from '../../services/sync/types';

export interface ScheduleContextType {
  schedules: Schedule[];
  setSchedules: (schedules: Schedule[]) => void;
  lastUpdated: Date | null;
  updateSchedules: (newSchedules: Schedule[]) => void;
  isLoading: boolean;
  syncState: SyncState;
}