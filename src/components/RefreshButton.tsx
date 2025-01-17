import React from 'react';
import { RefreshCw } from 'lucide-react';

interface RefreshButtonProps {
  onClick: () => void;
  isLoading?: boolean;
}

export function RefreshButton({ onClick, isLoading = false }: RefreshButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`
        inline-flex items-center px-3 py-2 border border-gray-300
        shadow-sm text-sm font-medium rounded-md text-gray-700
        bg-white hover:bg-gray-50 focus:outline-none focus:ring-2
        focus:ring-offset-2 focus:ring-blue-500
        ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
      更新
    </button>
  );
}