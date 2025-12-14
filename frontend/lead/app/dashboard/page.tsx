// app/dashboard/page.tsx
'use client';

import { useAuth } from '../AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import Sidebar from '../components/Sidebar';
import DashboardAnalytics from '../components/DashboardAnalytics';

export default function Dashboard() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="animate-pulse text-slate-600">Loading your dashboard...</div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex">
      <Sidebar onLogout={handleLogout} />

      <div className="flex-1">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div>
                <h1 className="text-2xl font-light text-slate-800 tracking-wide">
                  LEAD Dashboard
                </h1>
                <p className="text-sm text-slate-600 font-light">
                  Welcome back, {user.email?.split('@')[0]}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg font-light"
              >
                Sign Out
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <DashboardAnalytics />

        {/* Status Section */}
        <div className="mt-12 bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-slate-200/50">
          <h2 className="text-xl font-light text-slate-800 mb-4">System Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-slate-600 font-light">Authentication: Active</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-slate-600 font-light">Database: Connected</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-slate-600 font-light">Analytics: Enabled</span>
            </div>
          </div>
        </div>
      </main>
      </div>
    </div>
  );
}