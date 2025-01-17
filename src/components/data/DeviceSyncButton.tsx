import React from 'react';
import { Smartphone, Check } from 'lucide-react';
import { useDeviceSync } from '../../hooks/useDeviceSync';
import { useSchedules } from '../../contexts/schedule';
import { formatUpdateTime } from '../../utils/date';

export function DeviceSyncButton() {
  const { schedules } = useSchedules();
  const { isDeviceSyncing, lastDeviceSync, syncToDevice } = useDeviceSync();
  const [showSuccess, setShowSuccess] = React.useState(false);

  const handleSync = async () => {
    const result = await syncToDevice(schedules);
    if (result.success) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } else {
      alert(result.error || 'デバイスとの同期に失敗しました');
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={handleSync}
        disabled={isDeviceSyncing}
        className={`
          inline-flex items-center px-4 py-2 rounded-md
          ${showSuccess 
            ? 'bg-green-600' 
            : isDeviceSyncing 
              ? 'bg-gray-300 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'}
          text-white font-medium text-sm transition-colors duration-200
        `}
      >
        {showSuccess ? (
          <>
            <Check className="w-4 h-4 mr-2" />
            同期完了
          </>
        ) : (
          <>
            <Smartphone className={`w-4 h-4 mr-2 ${isDeviceSyncing ? 'animate-pulse' : ''}`} />
            {isDeviceSyncing ? '同期中...' : 'デバイスと同期'}
          </>
        )}
      </button>
      
      {lastDeviceSync && (
        <span className="text-sm text-gray-600">
          最終同期: {formatUpdateTime(new Date(lastDeviceSync))}
        </span>
      )}
    </div>
  );
}