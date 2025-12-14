'use client';

import { useAuth } from './AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="animate-pulse text-slate-600">Loading...</div>
      </div>
    );
  }

  if (user) {
    return null; // Will redirect to dashboard
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="text-center space-y-8 p-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-light text-slate-800 tracking-wide">
            Welcome to LEAD
          </h1>
          <p className="text-slate-600 text-lg font-light max-w-md mx-auto">
            Begin your journey of growth and self-discovery
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/login"
            className="px-8 py-3 bg-slate-800 text-white rounded-full hover:bg-slate-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-light"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="px-8 py-3 border border-slate-300 text-slate-700 rounded-full hover:bg-slate-50 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg font-light"
          >
            Begin Journey
          </Link>
        </div>
      </div>
    </div>
  );
}
