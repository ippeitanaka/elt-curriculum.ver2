import React from 'react';
import { Calendar, Clock, Menu, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  isSharedView?: boolean;
  onMenuClick?: () => void;
}

export function Header({ isSharedView = false, onMenuClick }: HeaderProps) {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          <div className="flex items-center">
            {!isSharedView && onMenuClick && (
              <button
                onClick={onMenuClick}
                className="p-2 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 md:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
            )}
            <div className="flex items-center">
              <Clock className="h-6 w-6 text-blue-600" />
              <h1 className="ml-2 text-base md:text-lg font-semibold text-gray-900 truncate">
                救急救命士カリキュラム管理
                {isSharedView && <span className="ml-2 text-xs text-gray-500">(共有ビュー)</span>}
              </h1>
            </div>
          </div>
          
          {!isSharedView && user && (
            <div className="flex items-center space-x-2 md:space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100 hidden md:flex">
                <Calendar className="h-4 w-4 text-gray-500" />
              </button>
              <div className="flex items-center">
                <span className="text-xs text-gray-600 hidden md:inline">{user?.name}</span>
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 ml-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden md:inline text-xs">ログアウト</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}