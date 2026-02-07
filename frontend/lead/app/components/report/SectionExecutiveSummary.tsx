"use client";

interface ExecutiveSummaryProps {
  dominantGuna?: string | null;
  overallBand?: string | null;
  profile?: string | null;
  summary?: string | null;
}

const bandStyles: Record<string, { bg: string; border: string; text: string }> = {
  Transformational: { bg: "bg-indigo-50", border: "border-indigo-200", text: "text-indigo-800" },
  Strength: { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-800" },
  Balanced: { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-800" },
  Development: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-800" },
  Risk: { bg: "bg-rose-50", border: "border-rose-200", text: "text-rose-800" },
};

export default function SectionExecutiveSummary({
  dominantGuna,
  overallBand,
  profile,
  summary,
}: ExecutiveSummaryProps) {
  const bandKey = overallBand?.trim() || "";
  const styles = bandStyles[bandKey] || { bg: "bg-slate-50", border: "border-slate-200", text: "text-slate-800" };

  const hasContent = profile || summary;
  if (!dominantGuna && !overallBand && !hasContent) return null;

  return (
    <section className="mt-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Executive Summary</h2>
          <p className="text-sm text-slate-600">Derived from dominant guna and overall band.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {dominantGuna && (
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-slate-800 text-white shadow-sm">
              Dominant Guna: {dominantGuna}
            </span>
          )}
          {overallBand && (
            <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${styles.text} ${styles.border} ${styles.bg}`}>
              Overall Band: {overallBand}
            </span>
          )}
        </div>
      </div>

      <div className={`border rounded-xl p-6 shadow-sm ${styles.bg} ${styles.border}`}>
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className={`text-sm font-semibold uppercase tracking-wide ${styles.text}`}>Leadership Profile</p>
            <p className="text-xl font-bold text-slate-900 mt-1">{profile || "Not available"}</p>
          </div>
        </div>

        <p className="mt-4 text-slate-700 leading-relaxed whitespace-pre-line">
          {summary || "Executive summary is not available for this combination yet."}
        </p>
      </div>
    </section>
  );
}
