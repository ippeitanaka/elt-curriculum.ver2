import { useState, useCallback, useEffect } from 'react';
import { Schedule } from '../types/schedule';
import { syncWithDevice, getLastDeviceSync, getDataVersion } from '../services/sync/deviceSync';

export function useDeviceSync() {
  const [isDeviceSyncing, setIsDeviceSyncing] = useState(false);
  const [lastDeviceSync, setLastDeviceSync] = useState<string | null>(
    getLastDeviceSync()
  );
  const [dataVersion, setDataVersion] = useState<string | null>(
    getDataVersion()
  );

  useEffect(() => {
    // Check for data updates every minute
    const interval = setInterval(() => {
      const currentVersion = getDataVersion();
      if (currentVersion && currentVersion !== dataVersion) {
        setDataVersion(currentVersion);
        // Trigger data refresh if needed
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [dataVersion]);

  const syncToDevice = useCallback(async (schedules: Schedule[]) => {
    setIsDeviceSyncing(true);
    try {
      const result = await syncWithDevice(schedules);
      if (result.success && result.syncTime) {
        setLastDeviceSync(result.syncTime);
        setDataVersion(Date.now().toString());
      }
      return result;
    } finally {
      setIsDeviceSyncing(false);
    }
  }, []);

  return {
    isDeviceSyncing,
    lastDeviceSync,
    syncToDevice,
    dataVersion
  };
}