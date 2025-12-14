'use client';

import { useAuth } from '../../AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Sidebar from '../../components/Sidebar';

export default function SettingsPage() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading, router]);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="animate-pulse text-slate-600">Loading...</div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex">
      <Sidebar onLogout={handleLogout} />

      <div className="flex-1">
        <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div>
                <h1 className="text-2xl font-light text-slate-800 tracking-wide">Settings</h1>
                <p className="text-sm text-slate-600 font-light">Account and application settings</p>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-slate-200/50">
            <h2 className="text-lg font-medium text-slate-800">Settings</h2>
            <p className="text-sm text-slate-600 mt-2">Main section is intentionally blank for now.</p>
          </div>
        </main>
      </div>
    </div>
  );
}
