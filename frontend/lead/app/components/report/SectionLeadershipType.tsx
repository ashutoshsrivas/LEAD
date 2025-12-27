"use client";

import { useEffect, useState } from "react";
import { detectGuna, detectGunaCode } from "@/app/lib/report/gunaLogic";
import { getBand } from "@/app/lib/report/bandLogic";
import { getLeadershipType } from "@/app/lib/api";

export default function SectionLeadershipType({
  guna,
  pillars,
}: {
  guna: Record<string, number>;
  pillars: Record<string, number>;
}) {
  const mixProfile = detectGuna(guna);
  const mixCode = detectGunaCode(guna);

  const leadPillars = [
    { key: "L", title: "L", desc: "Loka-saṅgraha: Purpose expanding with healthy habits" },
    { key: "E", title: "E", desc: "Equanimity: Recovery from stress & response timing" },
    { key: "A", title: "A", desc: "Association: Curiosity, learning & discernment" },
    { key: "D", title: "D", desc: "Dharma: Fair, process-driven decision-making" },
  ];

  const [records, setRecords] = useState<Array<any>>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const gunaCodeForDb = (code: string) => {
    const map: Record<string, string> = {
      Sattva: "S",
      Rajas: "R",
      Tamas: "T",
      SR: "SR",
      ST: "ST",
      RT: "RT",
      SRT: "SRT",
    };
    return map[code] || "";
  };

  const bandToProfileLevel = (bandLabel?: string) => {
    if (!bandLabel) return "";
    if (bandLabel === "Transformational") return "Strength";
    if (bandLabel === "Strength") return "Strength";
    if (bandLabel === "Balanced Zone") return "Balanced";
    if (bandLabel === "Development Zone") return "Development";
    if (bandLabel === "Risk / Blind Spot") return "Risk / Blind Spot";
    return "";
  };

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError(null);
      const gunaDb = gunaCodeForDb(mixCode);
      if (!gunaDb) {
        setRecords([]);
        setLoading(false);
        return;
      }

      const data = await Promise.all(
        leadPillars.map(async (p) => {
          const raw = pillars?.[p.key] || 0;
          const band = getBand(raw);
          const profile_level = bandToProfileLevel(band?.label);
          if (!profile_level) {
            return { ...p, bandLabel: band?.label || "—" };
          }

          try {
            const row = await getLeadershipType({ guna: gunaDb, pillar: p.key, profile_level });
            return {
              ...p,
              bandLabel: band?.label || "—",
              profile_level,
              insight: row.Insight,
              behaviors: row.behaviors,
              risks: row.risks,
              focus: row.Focus,
            };
          } catch (err: any) {
            return { ...p, bandLabel: band?.label || "—", profile_level, error: err?.message };
          }
        })
      );

      if (!cancelled) setRecords(data);
      if (!cancelled) setLoading(false);
    };

    load().catch((err) => {
      console.error(err);
      if (!cancelled) setError(err?.message || "Failed to load data");
      if (!cancelled) setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [mixCode, pillars]);

  return (
    <section className="mt-12 border rounded-lg p-6 bg-white shadow-sm">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div>
          <div className="text-xs uppercase tracking-wide text-slate-500">Leadership Type</div>
          <div className="text-lg font-semibold text-slate-900 leading-tight">{mixProfile.label}</div>
        </div>
        <div className="px-3 py-1 text-xs font-semibold rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
          Guna Mix
        </div>
      </div>

      {error && <div className="mb-3 text-xs text-red-700 bg-red-50 border border-red-100 rounded px-3 py-2">{error}</div>}

      {loading && (
        <div className="text-sm text-slate-500">Loading leadership type details…</div>
      )}

      {!loading && records.length === 0 && (
        <div className="text-sm text-slate-600">No pillar data available.</div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {records.map((p) => {
          const tone: Record<string, string> = {
            Strength: "bg-emerald-50 border-emerald-100 text-emerald-800",
            "Transformational": "bg-emerald-50 border-emerald-100 text-emerald-800",
            Balanced: "bg-sky-50 border-sky-100 text-sky-800",
            "Balanced Zone": "bg-sky-50 border-sky-100 text-sky-800",
            Development: "bg-amber-50 border-amber-100 text-amber-800",
            "Development Zone": "bg-amber-50 border-amber-100 text-amber-800",
            "Risk / Blind Spot": "bg-rose-50 border-rose-100 text-rose-800",
          };

          const bandTone = tone[p.profile_level] || tone[p.bandLabel] || "bg-slate-50 border-slate-100 text-slate-800";

          return (
            <div key={p.key} className="border rounded-lg p-4 bg-white shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-wide text-slate-500">Pillar</div>
                  <div className="text-xl font-semibold text-slate-900">{p.title}</div>
                  <div className="text-xs text-slate-500 mt-1">{p.desc}</div>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-semibold border ${bandTone}`}>
                  {p.bandLabel || "Band"}
                </div>
              </div>

              {p.profile_level && (
                <div className="text-xs font-semibold text-slate-700">Profile Level: {p.profile_level}</div>
              )}

              <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
                {p.insight && (
                  <div>
                    <div className="font-semibold text-slate-900">Insight</div>
                    <div>{p.insight}</div>
                  </div>
                )}
                {p.behaviors && (
                  <div>
                    <div className="font-semibold text-slate-900">Behaviors</div>
                    <div>{p.behaviors}</div>
                  </div>
                )}
                {p.risks && (
                  <div>
                    <div className="font-semibold text-slate-900">Risks</div>
                    <div>{p.risks}</div>
                  </div>
                )}
                {p.focus && (
                  <div>
                    <div className="font-semibold text-slate-900">Focus</div>
                    <div>{p.focus}</div>
                  </div>
                )}
                {p.error && (
                  <div className="text-red-700">{p.error}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
