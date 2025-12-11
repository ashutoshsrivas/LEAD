'use client';

import { useAuth } from './AuthContext';
import Link from 'next/link';

export default function Home() {
  const { user, logout, loading } = useAuth();

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50">
        <div className="text-center">
          <h1 className="text-3xl font-semibold mb-8">Welcome to LEAD</h1>
          <div className="space-x-4">
            <Link href="/login" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
              Login
            </Link>
            <Link href="/signup" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50">
      <div className="text-center">
        <h1 className="text-3xl font-semibold mb-8">Welcome, {user.email}!</h1>
        <p className="mb-4">You are logged in.</p>
        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
