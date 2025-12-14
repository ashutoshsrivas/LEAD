'use client';

import { useAuth } from '../../AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { getSessions } from '../../lib/api';

export default function CompanyPage() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  const [sessions, setSessions] = useState<any[]>([]);
  const [companies, setCompanies] = useState<Record<string, any>>({});
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading, router]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const s = await getSessions();
        if (!mounted) return;
        setSessions(s || []);

        // derive companies by company_name
        const map: Record<string, any> = {};
        (s || []).forEach((sess: any) => {
          const cname = sess.company_name || 'Unknown';
          map[cname] = map[cname] || { name: cname, sessions: [] };
          map[cname].sessions.push(sess);
        });
        setCompanies(map);
      } catch (err: any) {
        setError(err.message || 'Failed to load sessions');
      } finally {
        if (mounted) setLoadingData(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

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
                <h1 className="text-2xl font-light text-slate-800 tracking-wide">Companies</h1>
                <p className="text-sm text-slate-600 font-light">Companies and sessions</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={async () => {
                    const name = window.prompt('Enter new company name');
                    if (!name) return;
                    setLoadingData(true);
                    try {
                      const { createSession } = await import('../../lib/api');
                      const session_name = `${name} - ${new Date().toLocaleString()}`;
                      const session_description = `Initial session for ${name}`;
                      const resp = await createSession({ session_name, session_description, company_name: name });
                      const linkToken = resp.link_token || resp.linkToken || resp.token;
                      const base = (process.env.NEXT_PUBLIC_FORM_BASE as string) || window.location.origin;
                      const baseClean = String(base).replace(/\/$/, '');
                      const formUrl = `${baseClean}/${linkToken}`;
                      try { await navigator.clipboard.writeText(formUrl); } catch (e) {}
                      alert(`Company created with session. Share this URL: ${formUrl}`);

                      // update local state
                      setSessions((prev) => [resp, ...(prev || [])]);
                      setCompanies((prev) => {
                        const np = { ...prev };
                        np[name] = np[name] || { name, sessions: [] };
                        np[name].sessions = [resp, ...(np[name].sessions || [])];
                        return np;
                      });
                    } catch (err: any) {
                      alert('Failed to create company/session: ' + (err?.message || err));
                    } finally {
                      setLoadingData(false);
                    }
                  }}
                  className="px-3 py-1 bg-sky-600 text-white rounded hover:bg-sky-500"
                >
                  Create Company
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-slate-200/50">
            <h2 className="text-lg font-medium text-slate-800 mb-4">Companies</h2>

            {error && <div className="text-red-600 mb-4">{error}</div>}

            {loadingData ? (
              <div className="text-slate-600">Loading companies...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.values(companies).length === 0 && (
                  <div className="text-slate-500">No companies / sessions found.</div>
                )}
                {Object.values(companies).map((c: any) => (
                  <div key={c.name} className="p-4 border rounded bg-white/70">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-slate-800">{c.name}</div>
                        <div className="text-xs text-slate-600">{c.sessions.length} session(s)</div>
                      </div>
                      <div className="text-slate-400">🏢</div>
                    </div>
                    <div className="mt-3 text-sm text-slate-600">
                      <ul className="list-disc list-inside">
                        {c.sessions.map((s: any) => (
                          <li key={s.session_id}>
                            <button
                              type="button"
                              onClick={async () => {
                                try {
                                  let linkToken = s.link_token || s.linkToken || s.token;
                                  // If the token is not present on the session object, fetch the session record
                                  if (!linkToken) {
                                    try {
                                      const api = await import('../../lib/api');
                                      const fresh = await api.getSession(String(s.session_id));
                                      linkToken = fresh?.link_token || fresh?.linkToken || fresh?.token;
                                    } catch (e) {
                                      // ignore
                                    }
                                  }

                                  if (!linkToken) {
                                    alert('No public link available for this session');
                                    return;
                                  }

                                  const base = (process.env.NEXT_PUBLIC_FORM_BASE as string) || window.location.origin;
                                  const baseClean = String(base).replace(/\/$/, '');
                                  const formUrl = `${baseClean}/${linkToken}`;
                                  try { await navigator.clipboard.writeText(formUrl); } catch (e) {}
                                  alert(`Form link copied to clipboard: ${formUrl}`);
                                } catch (err: any) {
                                  alert('Failed to copy link: ' + (err?.message || err));
                                }
                              }}
                              className="text-slate-800 hover:underline"
                            >
                              {s.session_name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-4 flex items-center gap-3">
                      <button
                        onClick={async () => {
                          try {
                            // create a session for this company; session name is autogenerated
                            const session_name = `${c.name} - ${new Date().toLocaleString()}`;
                            const session_description = `Session for ${c.name}`;
                            // call API helper createSession
                            const { createSession } = await import('../../lib/api');
                            const resp = await createSession({ session_name, session_description, company_name: c.name });

                            // backend returns { session_id, link_token }
                            const linkToken = resp.link_token || resp.linkToken || resp.token;

                            // base url for public form should come from env var NEXT_PUBLIC_FORM_BASE
                            const base = (process.env.NEXT_PUBLIC_FORM_BASE as string) || window.location.origin;
                            const baseClean = String(base).replace(/\/$/, '');
                            const formUrl = `${baseClean}/${linkToken}`;

                            // copy to clipboard and notify user
                            try {
                              await navigator.clipboard.writeText(formUrl);
                            } catch (e) {
                              // ignore clipboard failure
                            }
                            alert(`Session created. Share this URL: ${formUrl} (copied to clipboard)`);
                          } catch (err: any) {
                            alert('Failed to create session: ' + (err.message || err));
                          }
                        }}
                        className="px-3 py-1 bg-slate-800 text-white rounded hover:bg-slate-700"
                      >
                        Create Session
                      </button>

                      {/* Preview button removed per request */}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
