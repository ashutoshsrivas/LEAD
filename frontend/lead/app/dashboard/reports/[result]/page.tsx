"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "../../../AuthContext";
import Sidebar from "../../../components/Sidebar";
import { getResult, getReports } from "../../../lib/api";

export default function ResultPage() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const result = params.result;

  const [copied, setCopied] = useState(false);
  const [reportObj, setReportObj] = useState<any | null>(null);
  const [loadingReport, setLoadingReport] = useState(true);
  const [reportError, setReportError] = useState<string | null>(null);
  const [showJson, setShowJson] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  useEffect(() => {
    if (!result) {
      setReportObj(null);
      setLoadingReport(false);
      return;
    }

    let mounted = true;
    (async () => {
      setLoadingReport(true);
      setReportError(null);
      try {
        try {
          const data = await getResult(result as unknown as number);
          if (!mounted) return;
          let parsed = data;
          if (data?.result_json && typeof data.result_json === "string") {
            try {
              parsed = JSON.parse(data.result_json);
            } catch {
              parsed = data.result_json;
            }
          }
          setReportObj(parsed);
          return;
        } catch (e) {}

        const all = await getReports();
        if (!mounted) return;
        const found = (all || []).find((r: any) =>
          [r.participant_id, r.result_id, r.id, String(r.participant_id)].some(
            (x) => String(x) === String(result)
          )
        );
        if (!found) throw new Error("Report not found");
        const parsed =
          found.result_json && typeof found.result_json === "string"
            ? JSON.parse(found.result_json)
            : found.result_json || found;
        setReportObj(parsed);
      } catch (err: any) {
        if (!mounted) return;
        setReportError(err?.message || "Failed to load report");
      } finally {
        if (mounted) setLoadingReport(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [result]);

  const copyId = async () => {
    try {
      await navigator.clipboard.writeText(String(result ?? ""));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex">
      <Sidebar onLogout={handleLogout} />

      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold">Result: {result}</h1>

        <div className="flex items-center gap-3 mt-4">
          <div className="rounded px-3 py-2 bg-gray-100 border border-gray-200 text-sm text-gray-800">
            <span className="font-mono">{result ?? "—"}</span>
          </div>
          <button
            onClick={copyId}
            className="px-3 py-2 bg-sky-600 text-white rounded text-sm hover:bg-sky-700"
          >
            Copy ID
          </button>
          {copied && <span className="text-sm text-green-600">Copied!</span>}
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 mt-6">
          {loadingReport ? (
            <div className="text-slate-600">Loading report...</div>
          ) : reportError ? (
            <div className="text-red-600">Wrong ID — {reportError}</div>
          ) : !reportObj ? (
            <div className="text-red-600">Wrong ID — report not found.</div>
          ) : (
            <div className="space-y-8">
              {/* Interpretation */}
              <section>
                <h2 className="text-xl font-semibold mb-2">
                  Leadership Interpretation
                </h2>
                <p className="text-sm text-slate-700">
                  The following interpretation reflects observed patterns across
                  inner energy, leadership matrices, and foundational pillars.
                  These insights are directional indicators intended for
                  reflection and development.
                </p>
              </section>

              {/* Guna Interpretation */}
              <section>
                <h3 className="text-lg font-medium mb-2">
                  Inner Energy (Guṇa Profile)
                </h3>
                <p className="text-sm text-slate-700">
                  The inner energy profile indicates relative dominance and
                  balance across Sattva, Rajas, and Tamas. A higher Sattva
                  presence reflects clarity, ethical grounding, and steadiness.
                  Rajas represents activity and ambition, while Tamas reflects
                  stability and resistance to change.
                </p>
              </section>

              {/* Matrix Interpretation */}
              <section>
                <h3 className="text-lg font-medium mb-2">
                  Leadership Matrix Patterns
                </h3>
                <p className="text-sm text-slate-700">
                  The six leadership matrices highlight zones of strength and
                  development. Quadrants marked as strengths represent areas
                  where leadership behaviours are naturally leveraged. Watchout
                  areas indicate opportunities for refinement through conscious
                  practice and prioritization.
                </p>
                <ul className="list-disc ml-6 mt-2 text-sm text-slate-700">
                  {(reportObj.matrix_strengths || []).map(
                    (s: string, i: number) => (
                      <li key={i}>{s}</li>
                    )
                  )}
                </ul>
                <ul className="list-disc ml-6 mt-2 text-sm text-slate-700">
                  {(reportObj.matrix_watchouts || []).map(
                    (w: string, i: number) => (
                      <li key={i}>{w}</li>
                    )
                  )}
                </ul>
              </section>

              {/* Pillars */}
              <section>
                <h3 className="text-lg font-medium mb-2">LEAD Pillars</h3>
                <p className="text-sm text-slate-700 mb-3">
                  The four LEAD pillars together represent the leadership
                  foundation. Balance across pillars indicates stability, while
                  variations point to developmental focus rather than weakness.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Object.entries(reportObj.pillars || {}).map(
                    ([k, v]: any) => (
                      <div
                        key={k}
                        className="p-3 bg-gray-50 rounded border flex justify-between"
                      >
                        <span className="font-medium">{k}</span>
                        <span className="font-semibold text-slate-700">
                          {Number(v).toFixed(2)}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </section>

              {/* Overall */}
              <section>
                <h3 className="text-lg font-medium mb-2">
                  Overall Leadership Pattern
                </h3>
                <p className="text-sm text-slate-700">
                  The overall score reflects alignment with normative leadership
                  benchmarks. Scores close to the midpoint indicate consistency
                  and balance, suggesting growth through refinement rather than
                  correction.
                </p>
                <div className="mt-2 text-sm font-semibold text-slate-800">
                  Overall T-Score:{" "}
                  {Number(reportObj.overall_T).toFixed(2)}
                </div>
              </section>

              {/* Toggle JSON */}
              <section>
                <button
                  onClick={() => setShowJson(!showJson)}
                  className="px-4 py-2 bg-gray-100 border rounded text-sm hover:bg-gray-200"
                >
                  {showJson ? "Hide Full JSON" : "View Full Result JSON"}
                </button>

                {showJson && (
                  <pre className="mt-4 text-sm text-slate-700 bg-gray-50 p-4 rounded whitespace-pre-wrap">
                    {JSON.stringify(reportObj, null, 2)}
                  </pre>
                )}
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
