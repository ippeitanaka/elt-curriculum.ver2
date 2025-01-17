import React from 'react';
import { Calendar, List, FileSpreadsheet } from 'lucide-react';
import { UserRole } from '../types/auth';

interface SidebarProps {
  onViewChange: (view: 'calendar' | 'data' | 'list') => void;
  currentView: 'calendar' | 'data' | 'list';
  userRole: UserRole;
}

export function Sidebar({ onViewChange, currentView, userRole }: SidebarProps) {
  const menuItems = [
    { id: 'calendar', label: 'カレンダー表示', icon: Calendar },
    { id: 'list', label: 'リスト表示', icon: List },
    ...(userRole === 'admin' ? [
      { id: 'data', label: 'データ管理', icon: FileSpreadsheet }
    ] : [])
  ] as const;

  return (
    <div className="h-full bg-white border-r border-gray-200">
      <nav className="mt-8 px-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id as 'calendar' | 'data' | 'list')}
                className={`
                  flex items-center w-full px-4 py-2 text-gray-700 rounded-lg
                  ${currentView === item.id ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100'}
                `}
              >
                <Icon className={`h-5 w-5 mr-3 ${currentView === item.id ? 'text-blue-500' : 'text-gray-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}