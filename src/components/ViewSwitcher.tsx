import React from 'react';
import { Monitor, Smartphone } from 'lucide-react';

interface ViewSwitcherProps {
  view: 'mobile' | 'desktop';
  onViewChange: (view: 'mobile' | 'desktop') => void;
}

export function ViewSwitcher({ view, onViewChange }: ViewSwitcherProps) {
  return (
    <div className="bg-white rounded-full shadow-lg p-1.5 space-x-1">
      <button
        onClick={() => onViewChange('mobile')}
        className={`p-1.5 rounded-full ${
          view === 'mobile' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
        }`}
        title="モバイルビュー"
      >
        <Smartphone className="w-4 h-4" />
      </button>
      <button
        onClick={() => onViewChange('desktop')}
        className={`p-1.5 rounded-full ${
          view === 'desktop' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
        }`}
        title="デスクトップビュー"
      >
        <Monitor className="w-4 h-4" />
      </button>
    </div>
  );
}