'use client';

import { useAuth } from '../../AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import Sidebar from '../../components/Sidebar';
import { getSessions, getReports } from '../../lib/api';

export default function ReportsPage() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  const [sessions, setSessions] = useState<any[]>([]);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [reports, setReports] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading, router]);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  // fetch sessions on mount
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const s = await getSessions();
        if (!mounted) return;
        setSessions(s || []);
        if (s && s.length) setSelectedSession(String(s[0].session_id));
      } catch (err: any) {
        setError(err.message || 'Failed to load sessions');
      }
    })();
    return () => { mounted = false; };
  }, []);

  // fetch reports when session changes
  useEffect(() => {
    if (!selectedSession) return;
    let mounted = true;
    setLoadingData(true);
    setReports([]);
    setError(null);
    (async () => {
      try {
        const r = await getReports(selectedSession);
        if (!mounted) return;
        setReports(r || []);
      } catch (err: any) {
        setError(err.message || 'Failed to load reports');
      } finally {
        if (mounted) setLoadingData(false);
      }
    })();
    return () => { mounted = false; };
  }, [selectedSession]);

  // compute filtered & paginated reports
  const { filteredTotal, totalPages, currentPage, pageItems } = useMemo(() => {
    const q = search.trim().toLowerCase();
    const filtered = q
      ? reports.filter((r: any) => (
          (r.participant_name || '').toLowerCase().includes(q) ||
          (r.participant_id || '').toString().toLowerCase().includes(q) ||
          (r.session_name || '').toLowerCase().includes(q)
        ))
      : reports;

    const total = filtered.length;
    const tp = Math.max(1, Math.ceil(total / pageSize));
    const cur = Math.min(page, tp);
    const start = (cur - 1) * pageSize;
    const items = filtered.slice(start, start + pageSize);
    return { filteredTotal: total, totalPages: tp, currentPage: cur, pageItems: items };
  }, [reports, search, page, pageSize]);

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
                <h1 className="text-2xl font-light text-slate-800 tracking-wide">Reports</h1>
                <p className="text-sm text-slate-600 font-light">Reports and exports</p>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-slate-200/50">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-slate-800">Reports</h2>
              <div>
                <label className="text-sm text-slate-600 mr-2">Session:</label>
                <select value={selectedSession ?? ''} onChange={(e) => setSelectedSession(e.target.value)} className="px-3 py-1 border rounded">
                  {sessions.map((s) => (
                    <option key={s.session_id} value={s.session_id}>{s.session_name} — {s.company_name}</option>
                  ))}
                </select>
              </div>
            </div>

            {error && <div className="text-red-600 mb-4">{error}</div>}

            {loadingData ? (
              <div className="text-slate-600">Loading reports...</div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <input
                      value={search}
                      onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                      placeholder="Search participant, id, session"
                      className="px-3 py-1 border rounded w-72 text-sm"
                    />
                    <select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }} className="px-2 py-1 border rounded text-sm">
                      <option value={5}>5 / page</option>
                      <option value={10}>10 / page</option>
                      <option value={25}>25 / page</option>
                    </select>
                  </div>
                  <div className="text-sm text-slate-600">Total: {filteredTotal}</div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead>
                      <tr className="text-slate-600">
                        <th className="p-2">Participant</th>
                        <th className="p-2">Session</th>
                        <th className="p-2">Created</th>
                        <th className="p-2 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reports.length === 0 && (
                        <tr>
                          <td colSpan={4} className="p-4 text-slate-500">No reports found for this session.</td>
                        </tr>
                      )}
                      {pageItems.map((r: any) => (
                        <tr key={r.result_id || r.participant_id || r.id} className="border-t">
                          <td className="p-2">{r.participant_name || r.participant_id}</td>
                          <td className="p-2">{r.session_name || r.session_id}</td>
                          <td className="p-2">{r.created_at ? new Date(r.created_at).toLocaleString() : '-'}</td>
                          <td className="p-2 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {r.report_url ? (
                                <a href={r.report_url} target="_blank" rel="noreferrer" className="px-2 py-1 bg-sky-600 text-white rounded text-sm">View</a>
                              ) : (
                                <Link href={`/dashboard/reports/${encodeURIComponent(String(r.participant_id || r.result_id || r.id))}`} className="px-2 py-1 bg-slate-700 text-white rounded text-sm">Open</Link>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}

                      {pageItems.length === 0 && filteredTotal === 0 && (
                        <tr>
                          <td colSpan={4} className="p-4 text-slate-500">No reports match your search.</td>
                        </tr>
                      )}

                      <tr>
                        <td colSpan={4} className="p-3">
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-slate-600">Page {currentPage} / {totalPages}</div>
                            <div className="flex items-center gap-2">
                              <button onClick={() => setPage((p) => Math.max(1, p - 1))} className="px-2 py-1 border rounded disabled:opacity-50" disabled={currentPage <= 1}>Prev</button>
                              <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} className="px-2 py-1 border rounded" disabled={currentPage >= totalPages}>Next</button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
