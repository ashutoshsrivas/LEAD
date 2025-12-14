'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

type Props = {
  onLogout?: () => void;
};

function IconUsers({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M17 21v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 11a4 4 0 100-8 4 4 0 000 8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconCompany({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M3 21h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 16V8a2 2 0 00-2-2h-4V4a1 1 0 00-1-1H10a1 1 0 00-1 1v2H5a2 2 0 00-2 2v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconReports({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 13h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 21h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconSettings({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M12 15.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06A2 2 0 014.28 16.88l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82L4.21 4.28A2 2 0 016.04 1.45l.06.06a1.65 1.65 0 001.82.33H8a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09c.2.67.69 1.22 1.36 1.51h.06a1.65 1.65 0 001.82-.33l.06-.06A2 2 0 0119.72 7.12l-.06.06a1.65 1.65 0 00-.33 1.82v.06c.29.67.84 1.16 1.51 1.36H21a2 2 0 010 4h-.09c-.67.2-1.22.69-1.51 1.36z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconLogout({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M16 17l5-5-5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 12H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 19H6a2 2 0 01-2-2V7a2 2 0 012-2h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const navItems = [
  { key: 'users', label: 'Users', href: '/dashboard/users', Icon: IconUsers },
  { key: 'company', label: 'Company', href: '/dashboard/company', Icon: IconCompany },
  { key: 'reports', label: 'Reports', href: '/dashboard/reports', Icon: IconReports },
  { key: 'settings', label: 'Settings', href: '/dashboard/settings', Icon: IconSettings },
];

export default function Sidebar({ onLogout }: Props) {
  const pathname = usePathname() || '';

  return (
    <aside className="w-64 shrink-0 bg-gradient-to-b from-white/90 to-slate-50/80 border-r border-slate-200 min-h-screen sticky top-0">
      <div className="h-full flex flex-col">
        <Link href="/dashboard" className="block">
          <div className="px-6 py-6 border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer">
            <h2 className="text-2xl font-semibold text-slate-800 tracking-tight">LEAD</h2>
            <p className="text-xs text-slate-500 mt-1">Admin Console</p>
          </div>
        </Link>

        <nav className="flex-1 px-2 py-4 space-y-1">
          {navItems.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.key}
                href={item.href}
                aria-label={item.label}
                className={`group flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm font-medium transition-all duration-150 ${
                  active
                    ? 'bg-slate-100 text-slate-900 shadow-sm ring-1 ring-slate-200'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <span className={`flex items-center justify-center w-10 h-10 rounded-lg ${active ? 'bg-slate-200' : 'bg-transparent'} text-slate-700`}>
                  <item.Icon className="w-5 h-5" />
                </span>
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="px-4 py-4 border-t border-slate-100">
          <button
            onClick={() => onLogout && onLogout()}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-transparent text-red-600">
              <IconLogout className="w-5 h-5" />
            </span>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
