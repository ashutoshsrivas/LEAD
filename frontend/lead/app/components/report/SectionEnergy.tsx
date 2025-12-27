"use client";
import { detectGuna } from "@/app/lib/report/gunaLogic";
import { round } from "@/app/lib/report/helpers";

export default function SectionEnergy({ guna }: { guna: Record<string, number> }) {
  const mix = detectGuna(guna);

  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold mb-1">Your Inner Energy</h2>

      <div className="mt-2 text-sm text-slate-700">
        Dominant mix: <strong>{mix.label}</strong>
        <br />({mix.rule_hint})
        <br />
        <br />
        <strong>Metaphor:</strong> {mix.metaphor}
        <br />
        <strong>Remarks:</strong> {mix.remarks}
        <br />
        <strong>Recommendation:</strong> {mix.rec}
      </div>
    </section>
  );
}
