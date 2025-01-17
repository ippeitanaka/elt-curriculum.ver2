export const DB_CONFIG = {
  name: 'schedule-db',
  version: 1,
  stores: {
    schedules: 'schedules',
    metadata: 'metadata'
  },
  indexes: {
    byDate: 'by-date'
  }
} as const;