"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { getResult } from "@/app/lib/api";
import SectionLeadership from "@/app/components/report/SectionLeadership";
import SectionPie from "@/app/components/report/SectionPie";
import SectionEnergy from "@/app/components/report/SectionEnergy";
import SectionQuadrants from "@/app/components/report/SectionQuadrants";
import SectionLeadershipType from "@/app/components/report/SectionLeadershipType";
import SectionJSON from "@/app/components/report/SectionJSON";

export default function SharedReportPage() {
  const params = useParams();
  const search = useSearchParams();
  const router = useRouter();
  const result = params.result;

  const [report, setReport] = useState<any | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  const shareBase = useMemo(
    () => process.env.NEXT_PUBLIC_SHARE_BASE_URL || (typeof window !== "undefined" ? window.location.origin : ""),
    []
  );

  useEffect(() => {
    (async () => {
      try {
        const data = await getResult(result as unknown as number);
        const json =
          typeof data?.result_json === "string"
            ? JSON.parse(data.result_json)
            : data.result_json;
        setReport({ ...json, participant_name: data?.participant_name });
      } catch (err) {
        console.error(err);
        router.replace("/404");
      }
    })();
  }, [result, router]);

  const exportToPDF = async () => {
    setIsExporting(true);
    try {
      const html2pdf = (await import("html2pdf.js")).default;
      const element = reportRef.current;
      if (!element) return;
      const opt: any = {
        margin: [0.4, 0.4, 0.4, 0.4] as [number, number, number, number],
        filename: `${report?.participant_name || "Leadership"}_Report_${new Date().toISOString().split("T")[0]}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2.2,
          useCORS: true,
          logging: false,
          backgroundColor: "#ffffff",
          ignoreElements: (el: HTMLElement) => el.tagName === "SCRIPT",
          onclone: (clonedDoc: Document) => {
            const style = clonedDoc.createElement("style");
            style.textContent = `
              * { color-scheme: light !important; }
              .pdf-export-content { background: #ffffff !important; }
            `;
            clonedDoc.head.appendChild(style);
          },
        },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ["avoid-all", "css", "legacy"] },
      };
      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error("PDF export failed:", error);
      alert("Failed to export PDF. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  if (!report) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="px-6 py-4 flex items-center justify-between border-b bg-white shadow-sm">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">Shared Report</p>
          <h1 className="text-2xl font-bold text-slate-800">
            {report.participant_name ? `${report.participant_name}'s Leadership Report` : `Report #${result}`}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={exportToPDF}
            disabled={isExporting}
            className="px-5 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2 shadow-md"
          >
            {isExporting ? (
              <>
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Exporting...
              </>
            ) : (
              <>
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download PDF
              </>
            )}
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        <div ref={reportRef} className="pdf-export-content">
          <SectionLeadership pillars={report.pillars} />
          <SectionPie guna={report.guna_norm_pct} />
          <SectionEnergy guna={report.guna_norm_pct} />
          <SectionQuadrants matrices={report.matrices} />
          <SectionLeadershipType guna={report.guna_norm_pct} pillars={report.pillars} />
          <SectionJSON json={report} />
        </div>
      </main>
    </div>
  );
}
