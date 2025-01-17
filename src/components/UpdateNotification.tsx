import React from 'react';
import { Bell, AlertCircle } from 'lucide-react';
import { formatUpdateTime } from '../utils/date';
import { useSchedules } from '../contexts/schedule';

export function UpdateNotification() {
  const { lastUpdated, syncState } = useSchedules();

  if (syncState.status === 'error') {
    return (
      <div className="flex items-center text-sm text-red-600">
        <AlertCircle className="h-4 w-4 mr-2" />
        <span>データの同期に失敗しました。再度お試しください。</span>
      </div>
    );
  }

  if (!lastUpdated) return null;

  return (
    <div className="flex items-center text-sm text-gray-600">
      <Bell className="h-4 w-4 mr-2" />
      <span>
        カリキュラムが更新されました（{formatUpdateTime(lastUpdated)}）
        {syncState.status === 'syncing' && ' - 同期中...'}
      </span>
    </div>
  );
}