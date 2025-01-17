import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { CalendarView } from './components/calendar/CalendarView';
import { DataManagement } from './components/data/DataManagement';
import { ListView } from './components/list/ListView';
import { LoginForm } from './components/LoginForm';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ScheduleProvider } from './contexts/schedule';
import { UpdateNotification } from './components/UpdateNotification';
import { RefreshButton } from './components/RefreshButton';
import { useSharedData } from './hooks/useSharedData';
import { ViewSwitcher } from './components/ViewSwitcher';
import { testSupabaseConnection } from './utils/supabase-test';

function AppContent() {
  const { user, isLoading: authLoading } = useAuth();
  const { isSharedView, isLoading: sharedLoading, error: sharedError } = useSharedData();
  const [currentView, setCurrentView] = useState<'calendar' | 'data' | 'list'>('calendar');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [viewMode, setViewMode] = useState<'mobile' | 'desktop'>('mobile');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [supabaseStatus, setSupabaseStatus] = useState<'testing' | 'success' | 'error'>('testing');

  useEffect(() => {
    async function checkSupabaseConnection() {
      const isConnected = await testSupabaseConnection();
      setSupabaseStatus(isConnected ? 'success' : 'error');
    }
    checkSupabaseConnection();
  }, []);

  if (supabaseStatus === 'testing') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Supabaseとの接続を確認中...</p>
        </div>
      </div>
    );
  }

  if (supabaseStatus === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center text-red-600">
          <p>Supabaseとの接続に失敗しました。</p>
          <p className="mt-2 text-sm">管理者に連絡してください。</p>
        </div>
      </div>
    );
  }

  if (authLoading || sharedLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">読み込み中...</p>
        </div>
      </div>
    );
  }

  if (sharedError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center text-red-600">
          <p>{sharedError}</p>
        </div>
      </div>
    );
  }

  if (!user && !isSharedView) {
    return <LoginForm />;
  }

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
    } finally {
      setIsRefreshing(false);
    }
  };

  if (isSharedView) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header isSharedView />
        <main className="p-4 md:p-6">
          <CalendarView />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="flex">
        {viewMode === 'mobile' && (
          <div
            className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
              isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onClick={() => setIsSidebarOpen(false)}
          >
            <div
              className={`fixed inset-y-0 left-0 w-64 bg-white transform transition-transform duration-300 ${
                isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
              }`}
              onClick={e => e.stopPropagation()}
            >
              <Sidebar
                onViewChange={(view) => {
                  setCurrentView(view);
                  setIsSidebarOpen(false);
                }}
                currentView={currentView}
                userRole={user.role}
              />
            </div>
          </div>
        )}

        {viewMode === 'desktop' && (
          <div className="fixed left-0 top-14 bottom-0 w-64">
            <Sidebar
              onViewChange={setCurrentView}
              currentView={currentView}
              userRole={user.role}
            />
          </div>
        )}

        <main className={`flex-1 p-4 md:p-6 ${viewMode === 'desktop' ? 'ml-64' : ''}`}>
          <div className="flex flex-col space-y-4 mb-6">
            <div className="flex justify-between items-center">
              <UpdateNotification />
              <div className="flex items-center space-x-2">
                <RefreshButton onClick={handleRefresh} isLoading={isRefreshing} />
                <ViewSwitcher view={viewMode} onViewChange={setViewMode} />
              </div>
            </div>
          </div>

          <div className="w-full">
            {currentView === 'calendar' && <CalendarView />}
            {currentView === 'list' && <ListView />}
            {currentView === 'data' && user.role === 'admin' && <DataManagement />}
          </div>
        </main>
      </div>
    </div>
  );
}

export function App() {
  return (
    <AuthProvider>
      <ScheduleProvider>
        <AppContent />
      </ScheduleProvider>
    </AuthProvider>
  );
}