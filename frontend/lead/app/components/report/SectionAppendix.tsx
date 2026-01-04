"use client";

export default function SectionAppendix() {
  return (
    <section className="mt-12">
      <div className="rounded-sm overflow-hidden mb-6">
        <div className="bg-blue-600 text-white text-center py-4 px-6">
          <h2 className="text-xl font-semibold">Appendix</h2>
        </div>
      </div>

      <div className="space-y-6 text-slate-800">
        <div>
          <h3 className="text-sm font-semibold text-slate-900 mb-2">About the Framework & Book</h3>
          <p className="text-sm text-slate-700 leading-relaxed">
            The LEAD framework (Loka-saṅgraha, Equanimity, Association, Dharma) is a leadership model inspired by Indian Knowledge Systems (IKS). It emphasizes ethical clarity, self-mastery, right association, and service to the collective. A concise introduction appears in the book <em>LEAD: A Leadership Framework from Indian Knowledge System</em>. For the retail listing, see <a className="text-blue-600 underline" href="https://amazon.in/dp/937335308X">amazon.in/dp/937335308X</a> | <a className="text-blue-600 underline" href="https://www.pvdas.in">www.pvdas.in</a>.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-900 mb-2">Purpose of this Assessment</h3>
          <p className="text-sm text-slate-700 leading-relaxed">
            This assessment offers a structured mirror for leaders and teams. It summarizes patterns across six 2×2 matrices (e.g., Selflessness vs. Clarity; Dharma vs. Desire) and a Guṇa profile (Sattva–Rajas–Tamas), then maps results to the LEAD pillars. The aim is practical growth: clearer decisions, ethical steadiness, better associations, and outcomes aligned with long-term welfare.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-900 mb-2">Methodology (High Level)</h3>
          <p className="text-sm text-slate-700 leading-relaxed">
            Items use Likert-type responses. Each item is normalized to a 0–100 scale (with reverse-scoring where applicable) and aggregated into traits, matrices, Guṇa, and pillars. For comparability, we express results in T-scores (mean 50, SD 10) relative to a reference dataset; raw pillar and Guṇa percentages are also reported for intuitive reading. Quadrant narratives and coach actions come from the LEAD playbook. We monitor reliability and refine norms through ongoing calibration; interpretations are directional and best used with coaching and organizational context.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-900 mb-2">Good Use</h3>
          <p className="text-sm text-slate-700 leading-relaxed">
            Treat results as starting points for dialogue, not labels. Re-take after meaningful development intervals (e.g., 3–6 months) to observe trendlines rather than single scores.
          </p>
        </div>
      </div>
    </section>
  );
}
