"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { getResult } from "@/app/lib/api";
import SectionLeadership from "@/app/components/report/SectionLeadership";
import SectionPie from "@/app/components/report/SectionPie";
import SectionEnergy from "@/app/components/report/SectionEnergy";
import SectionQuadrants from "@/app/components/report/SectionQuadrants";
import SectionLeadershipType from "@/app/components/report/SectionLeadershipType";
import SectionAppendix from "@/app/components/report/SectionAppendix";
import SimpleModal from "@/app/components/ui/SimpleModal";
import SectionExecutiveSummary from "@/app/components/report/SectionExecutiveSummary";

export default function SharedReportPage() {
  const params = useParams();
  const router = useRouter();
  const result = params.result;

  const [report, setReport] = useState<any | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  const [modal, setModal] = useState<{ open: boolean; title?: string; message: string; okLabel?: string } | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getResult(result as unknown as number);
        const json =
          typeof data?.result_json === "string"
            ? JSON.parse(data.result_json)
            : data.result_json;
        setReport({
          ...json,
          participant_name: data?.participant_name,
          dominant_guna: data?.dominant_guna,
          overall_band: data?.overall_band,
          executive_summary: data?.executive_summary,
        });
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
      setModal({ open: true, title: "Export Failed", message: "Failed to export PDF. Please try again." });
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
          {/* PDF Header */}
          <div className="hidden print:block pdf-header mb-8 pb-4 border-b-2 border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-slate-800 mb-2">LEAD Framework</h1>
                <p className="text-lg text-slate-600">Leadership Assessment & Development Report</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-600">Generated: {new Date().toLocaleDateString()}</p>
                <p className="text-sm text-slate-600">Report ID: #{result}</p>
              </div>
            </div>
            {report.participant_name && (
              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-xl font-semibold text-blue-900">Participant: {report.participant_name}</p>
              </div>
            )}
          </div>

          {/* Ordered sections to mirror dashboard report */}
          <SectionLeadershipType guna={report.guna_norm_pct} pillars={report.pillars} />
          <SectionLeadership pillars={report.pillars} />
          <SectionPie guna={report.guna_norm_pct} />
          <SectionEnergy guna={report.guna_norm_pct} />
          <SectionQuadrants matrices={report.matrices} />
          <SectionExecutiveSummary
            dominantGuna={report.dominant_guna}
            overallBand={report.overall_band}
            profile={report.executive_summary?.leadership_profile}
            summary={report.executive_summary?.summary}
          />

          {/* Appendix */}
          <SectionAppendix />

          {/* PDF Footer */}
          <div className="hidden print:block pdf-footer mt-12 pt-4 border-t-2 border-slate-200 text-center text-sm text-slate-600">
            <p className="font-medium">© {new Date().getFullYear()} LEAD Framework. All rights reserved.</p>
            <p className="mt-1">This report is confidential and intended solely for the named participant.</p>
          </div>

          {/* Simple modal for in-app notices */}
          <SimpleModal
            open={!!modal?.open}
            onClose={() => setModal(null)}
            title={modal?.title}
            message={modal?.message || ""}
            okLabel={modal?.okLabel}
          />
        </div>
      </main>
    </div>
  );
}
