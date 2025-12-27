"use client";
import { getBand } from "@/app/lib/report/bandLogic";
import { getLeadPillar } from "@/app/lib/report/leadPillars";
import { round } from "@/app/lib/report/helpers";

const pillarColors: Record<string, { bg: string; text: string; border: string }> = {
  L: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  E: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  A: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  D: { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200" },
};

export default function SectionBand({ pillars }: { pillars: Record<string, number> }) {
  const pillarOrder = ["L", "E", "A", "D"];
  const sortedEntries = Object.entries(pillars).sort(
    ([keyA], [keyB]) => pillarOrder.indexOf(keyA) - pillarOrder.indexOf(keyB)
  );

  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold mb-6">Band Logic – Pillar Scores</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {sortedEntries.map(([k, v]) => {
          const band = getBand(v);
          const pillar = getLeadPillar(k);
          const colors = pillarColors[k] || pillarColors.L;

          return (
            <div
              key={k}
              className={`${colors.bg} ${colors.border} border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow`}
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className={`text-xs uppercase tracking-widest font-semibold ${colors.text}`}>
                    {k}
                  </p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">{round(v)}</p>
                </div>
                <div className={`w-12 h-12 rounded-full ${colors.text} flex items-center justify-center text-lg font-bold opacity-20`}>
                  {k}
                </div>
              </div>

              {pillar && (
                <div className="mt-3 text-xs text-slate-600 italic mb-3">
                  <strong>{pillar.fullName}</strong>
                </div>
              )}

              {band && (
                <div className="mt-4 pt-4 border-t border-slate-300">
                  <p className="text-xs font-semibold text-slate-900 mb-2">Band: {band.label}</p>
                  <p className="text-xs text-slate-700 leading-relaxed mb-2">{band.meaning}</p>
                  <p className="text-xs text-slate-700 italic font-medium">Coach: {band.coach}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
