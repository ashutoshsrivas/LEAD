'use client';

import React, { useEffect, useState } from 'react';
import { getSessions, getReports, getParticipants } from '../lib/api';

export default function DashboardAnalytics() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [totalParticipants, setTotalParticipants] = useState<number>(0);
  const [companiesCount, setCompaniesCount] = useState<number>(0);
  const [reportsCount, setReportsCount] = useState<number>(0);
  const [avgT, setAvgT] = useState<number | null>(null);
  const [avgRaw, setAvgRaw] = useState<number | null>(null);
  const [recentReports, setRecentReports] = useState<any[]>([]);
  const [reportsList, setReportsList] = useState<any[]>([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const sessions = await getSessions();
        const reports = await getReports();
        if (!mounted) return;
        setReportsList(reports || []);

        if (!mounted) return;

        // companies
        const companies = new Set((sessions || []).map((s: any) => s.company_name).filter(Boolean));
        setCompaniesCount(companies.size);

        // participants: fetch per-session counts (best-effort)
        let totalParts = 0;
        await Promise.all((sessions || []).map(async (s: any) => {
          try {
            const parts = await getParticipants(String(s.session_id));
            totalParts += (parts || []).length;
          } catch (e) {
            // ignore per-session errors
          }
        }));
        setTotalParticipants(totalParts);

        // reports count
        const rList = reports || [];
        setReportsCount(rList.length);

        // compute average overall_T and overall_raw from result_json
        const tVals: number[] = [];
        const rawVals: number[] = [];
        for (const r of rList) {
          try {
            let parsed: any = r.result_json;
            if (typeof parsed === 'string') {
              parsed = JSON.parse(parsed);
            }
            if (parsed && typeof parsed === 'object') {
              if (parsed.overall_T != null && !isNaN(Number(parsed.overall_T))) tVals.push(Number(parsed.overall_T));
              if (parsed.overall_raw != null && !isNaN(Number(parsed.overall_raw))) rawVals.push(Number(parsed.overall_raw));
            }
          } catch (e) {
            // ignore parse errors
          }
        }
        setAvgT(tVals.length ? (tVals.reduce((a, b) => a + b, 0) / tVals.length) : null);
        setAvgRaw(rawVals.length ? (rawVals.reduce((a, b) => a + b, 0) / rawVals.length) : null);

        // recent reports (by generated_at if available)
        const sorted = [...rList].sort((a: any, b: any) => {
          const ta = a.generated_at ? new Date(a.generated_at).getTime() : 0;
          const tb = b.generated_at ? new Date(b.generated_at).getTime() : 0;
          return tb - ta;
        }).slice(0, 3);
        setRecentReports(sorted);
      } catch (err: any) {
        setError(err?.message || 'Failed to load analytics');
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => { mounted = false; };
  }, []);

  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow border border-slate-200/50">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs text-slate-500 font-light">Participants</h4>
              <div className="text-2xl font-semibold text-slate-800">{loading ? '—' : totalParticipants}</div>
            </div>
            <div className="text-3xl">👥</div>
          </div>
          <p className="text-xs text-slate-600 mt-3">Total participants across all sessions</p>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow border border-slate-200/50">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs text-slate-500 font-light">Companies</h4>
              <div className="text-2xl font-semibold text-slate-800">{loading ? '—' : companiesCount}</div>
            </div>
            <div className="text-3xl">🏢</div>
          </div>
          <p className="text-xs text-slate-600 mt-3">Distinct companies with sessions</p>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow border border-slate-200/50">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs text-slate-500 font-light">Reports</h4>
              <div className="text-2xl font-semibold text-slate-800">{loading ? '—' : reportsCount}</div>
            </div>
            <div className="text-3xl">📊</div>
          </div>
          <p className="text-xs text-slate-600 mt-3">Reports generated</p>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow border border-slate-200/50">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs text-slate-500 font-light">Avg T Score</h4>
              <div className="text-2xl font-semibold text-slate-800">{loading ? '—' : (avgT != null ? avgT.toFixed(1) : '—')}</div>
            </div>
            <div className="text-3xl">⭐</div>
          </div>
          <p className="text-xs text-slate-600 mt-3">Average overall T score (from reports)</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow border border-slate-200/50">
          <h3 className="text-lg font-light text-slate-800 mb-4">Overview</h3>
          {loading ? (
            <div className="h-48 flex items-center justify-center text-slate-500">Loading overview…</div>
          ) : error ? (
            <div className="h-48 flex items-center justify-center text-red-600">{error}</div>
          ) : (
            <div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-50 rounded">
                  <div className="text-xs text-slate-500">Avg Raw Score</div>
                  <div className="text-xl font-semibold">{avgRaw != null ? avgRaw.toFixed(2) : '—'}</div>
                </div>
                <div className="p-3 bg-slate-50 rounded">
                  <div className="text-xs text-slate-500">Sessions</div>
                  <div className="text-xl font-semibold">{sessionsCountFromReports(recentReports, companiesCount)}</div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-sm text-slate-600 mb-2">Reports by Company</h4>
                {/** Lightweight SVG bar chart (no external deps) */}
                <div className="w-full bg-white/30 p-3 rounded">
                  {(() => {
                    const counts: Record<string, number> = {};
                    for (const r of (reportsList || [])) {
                      const key = r.company_name || r.session_name || 'Unknown';
                      counts[key] = (counts[key] || 0) + 1;
                    }
                    const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
                    const top = entries.slice(0, 8);
                    const max = top.length ? Math.max(...top.map((t) => t[1])) : 1;
                    const width = Math.min(600, Math.max(240, top.length * 80));
                    const height = 120;
                    if (top.length === 0) return <div className="h-24 flex items-center justify-center text-slate-400">No data</div>;
                    return (
                      <div className="overflow-x-auto">
                        <svg width={width} height={height} className="block">
                          {top.map(([name, cnt], i) => {
                            const barW = Math.floor(width / top.length) - 12;
                            const x = i * (barW + 12) + 8;
                            const barH = Math.round((cnt / max) * (height - 40));
                            const y = height - barH - 24;
                            return (
                              <g key={name}>
                                <rect x={x} y={y} width={barW} height={barH} rx={4} fill="#0ea5e9" />
                                <text x={x + barW / 2} y={height - 8} fontSize={10} textAnchor="middle" fill="#374151">{shorten(name, 18)}</text>
                                <text x={x + barW / 2} y={y - 4} fontSize={10} textAnchor="middle" fill="#0f172a">{cnt}</text>
                              </g>
                            );
                          })}
                        </svg>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>
          )}
          <p className="text-xs text-slate-600 mt-3">Trends and distributions are visualized here.</p>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow border border-slate-200/50">
          <h3 className="text-lg font-light text-slate-800 mb-4">Recent Reports</h3>
          {loading ? (
            <div className="text-sm text-slate-600">Loading recent reports...</div>
          ) : (
            <ul className="space-y-3 text-sm text-slate-700">
              {recentReports.length === 0 && <li className="text-slate-500">No recent reports</li>}
              {recentReports.map((r) => {
                let parsed: any = r.result_json;
                try { if (typeof parsed === 'string') parsed = JSON.parse(parsed); } catch {}
                const score = parsed?.overall_T ?? parsed?.overall_raw ?? '-';
                return (
                  <li key={r.result_id} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{r.participant_name || `ID ${r.participant_id}`}</div>
                      <div className="text-xs text-slate-500">{r.generated_at ? new Date(r.generated_at).toLocaleString() : ''} — Score: {score}</div>
                    </div>
                    <div className="text-xs text-slate-500">{r.report_url ? 'PDF' : 'In-app'}</div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

function sessionsCountFromReports(recentReports: any[], companiesCount: number) {
  // simple helper: show number of unique sessions in the recentReports or fallback to companies count
  try {
    const s = new Set((recentReports || []).map((r: any) => r.session_id || r.session_name));
    const count = s.size || companiesCount;
    return count;
  } catch {
    return companiesCount;
  }
}

// small helpers
function shorten(s: string, max = 18) {
  if (!s) return '';
  return s.length > max ? s.slice(0, max - 1) + '…' : s;
}
