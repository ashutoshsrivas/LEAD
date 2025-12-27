"use client";

import SectionBand from "./SectionBand";
import SectionLeadDiamond from "./SectionLeadDiamond";

export default function SectionLeadership({ pillars }: { pillars: Record<string, number> }) {
  return (
    <section className="mt-12 border rounded p-6 bg-white shadow-sm">
      <h2 className="text-2xl font-bold mb-2">Leadership Foundations — LEAD Pillars</h2>

      <p className="text-sm text-slate-700 leading-relaxed mb-4 max-w-3xl">
        These four pillar scores represent leadership foundations across:
        <br />
        • <strong>L</strong> – Loka-saṅgraha: Purpose expanding with healthy habits
        <br />
        • <strong>E</strong> – Equanimity: Recovery from stress & response timing
        <br />
        • <strong>A</strong> – Association: Curiosity, learning & discernment
        <br />
        • <strong>D</strong> – Dharma: Fair, process-driven decision-making with clarity
        Band ranges contextualize readiness and risks.  
        Each pillar stands independently and develops via micro-shifts.
      </p>

      <SectionBand pillars={pillars} />
      
      <SectionLeadDiamond pillars={pillars} />
    </section>
  );
}
