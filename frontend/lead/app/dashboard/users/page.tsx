'use client';

import { useAuth } from '../../AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useMemo } from 'react';
import Sidebar from '../../components/Sidebar';
import { getSessions, getParticipants } from '../../lib/api';

export default function UsersPage() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  const [sessions, setSessions] = useState<any[]>([]);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [participants, setParticipants] = useState<any[]>([]);
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

  // fetch participants when session changes
  useEffect(() => {
    if (!selectedSession) return;
    let mounted = true;
    setLoadingData(true);
    setParticipants([]);
    setError(null);
    (async () => {
      try {
        const p = await getParticipants(selectedSession);
        if (!mounted) return;
        setParticipants(p || []);
      } catch (err: any) {
        setError(err.message || 'Failed to load participants');
      } finally {
        if (mounted) setLoadingData(false);
      }
    })();
    return () => { mounted = false; };
  }, [selectedSession]);

  // compute filtered & paginated participants
  const { filteredTotal, totalPages, currentPage, pageItems } = useMemo(() => {
    const q = search.trim().toLowerCase();
    const filtered = q
      ? participants.filter((p: any) => (
          (p.name || '').toLowerCase().includes(q) ||
          (p.email || '').toLowerCase().includes(q) ||
          (p.company || '').toLowerCase().includes(q) ||
          (p.designation || '').toLowerCase().includes(q)
        ))
      : participants;

    const total = filtered.length;
    const tp = Math.max(1, Math.ceil(total / pageSize));
    const cur = Math.min(page, tp);
    const start = (cur - 1) * pageSize;
    const items = filtered.slice(start, start + pageSize);
    return { filteredTotal: total, totalPages: tp, currentPage: cur, pageItems: items };
  }, [participants, search, page, pageSize]);

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
                <h1 className="text-2xl font-light text-slate-800 tracking-wide">Users</h1>
                <p className="text-sm text-slate-600 font-light">User management</p>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-slate-200/50">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-slate-800">Participants</h2>
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
              <div className="text-slate-600">Loading participants...</div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <input
                      value={search}
                      onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                      placeholder="Search name, email, company, designation"
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
                        <th className="p-2">Name</th>
                        <th className="p-2">Email</th>
                        <th className="p-2">Company</th>
                          <th className="p-2">Designation</th>
                          <th className="p-2 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {participants.length === 0 && (
                        <tr>
                          <td colSpan={4} className="p-4 text-slate-500">No participants found for this session.</td>
                        </tr>
                      )}
                      {pageItems.map((p: any) => (
                        <tr key={p.participant_id} className="border-t">
                          <td className="p-2">{p.name}</td>
                          <td className="p-2">{p.email}</td>
                          <td className="p-2">{p.company}</td>
                          <td className="p-2">{p.designation}</td>
                          <td className="p-2 text-right">
                            <button
                              onClick={async () => {
                                try {
                                  const api = await import('../../lib/api');
                                  // call process endpoint which generates and stores result
                                  await api.generateReport(p.participant_id);
                                  alert('Report generated. Redirecting to Reports page...');
                                  router.push('/dashboard/reports');
                                } catch (err: any) {
                                  alert('Failed to generate report: ' + (err?.message || err));
                                }
                              }}
                              className="px-2 py-1 bg-sky-600 text-white rounded text-sm"
                            >
                              Generate Report
                            </button>
                          </td>
                        </tr>
                      ))}

                      {pageItems.length === 0 && filteredTotal === 0 && (
                        <tr>
                          <td colSpan={4} className="p-4 text-slate-500">No participants match your search.</td>
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
