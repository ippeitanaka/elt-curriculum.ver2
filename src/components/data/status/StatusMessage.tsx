import React from 'react';
import { ImportStatus } from '../excel/types';
import { AlertCircle, CheckCircle, Loader } from 'lucide-react';

interface StatusMessageProps {
  status: ImportStatus;
}

export function StatusMessage({ status }: StatusMessageProps) {
  if (status.status === 'idle' || !status.message) {
    return null;
  }

  const statusStyles = {
    loading: 'bg-blue-50 text-blue-700',
    success: 'bg-green-50 text-green-700',
    error: 'bg-red-50 text-red-700'
  };

  const StatusIcon = {
    loading: () => <Loader className="w-5 h-5 animate-spin" />,
    success: () => <CheckCircle className="w-5 h-5" />,
    error: () => <AlertCircle className="w-5 h-5" />
  };

  const Icon = StatusIcon[status.status];

  return (
    <div className={`mt-4 p-4 rounded-md flex items-center ${statusStyles[status.status]}`}>
      <Icon />
      <span className="ml-3">{status.message}</span>
    </div>
  );
}