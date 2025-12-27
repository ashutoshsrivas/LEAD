"use client";
import { useEffect, useState } from "react";
import { Scatter } from "react-chartjs-2";
import { Chart, LinearScale, PointElement, Tooltip, Legend } from "chart.js";
import { getQuadrantColor, getQuadrantLabel } from "@/app/lib/report/quadrantLogic";
import { getQuadrantInterpretation } from "@/app/lib/api";

Chart.register(LinearScale, PointElement, Tooltip, Legend);

// Disable LAB color space interpolation
Chart.defaults.color = '#666';

type MatrixPoint = { name: string; quadrant: string; x: number; y: number };

type QuadrantInterpretation = {
  matrix: string;
  x_axis: string;
  y_axis: string;
  quadrant_label: string;
  narrative: string;
  development_focus: string;
};

const quadrantBackgroundPlugin = {
  id: "quadrantBackground",
  beforeDraw: (chart: any) => {
    const { ctx, chartArea, scales } = chart;
    if (!chartArea || !scales?.x || !scales?.y) return;
    const { left, right, top, bottom } = chartArea;
    const midX = scales.x.getPixelForValue(50);
    const midY = scales.y.getPixelForValue(50);

    ctx.save();
    
    // Professional color palette for quadrants
    const fills = [
      { x0: left, x1: midX, y0: top, y1: midY, color: "rgba(191, 219, 254, 0.25)" }, // Q2: light blue
      { x0: midX, x1: right, y0: top, y1: midY, color: "rgba(134, 239, 172, 0.25)" }, // Q1: light green
      { x0: left, x1: midX, y0: midY, y1: bottom, color: "rgba(253, 224, 71, 0.2)" }, // Q3: light amber
      { x0: midX, x1: right, y0: midY, y1: bottom, color: "rgba(248, 180, 150, 0.25)" }, // Q4: light coral
    ];

    fills.forEach(({ x0, x1, y0, y1, color }) => {
      ctx.fillStyle = color;
      ctx.fillRect(x0, y0, x1 - x0, y1 - y0);
    });

    // Quadrant division lines
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(midX, top);
    ctx.lineTo(midX, bottom);
    ctx.moveTo(left, midY);
    ctx.lineTo(right, midY);
    ctx.stroke();

    // Quadrant labels
    const labelStyle = {
      font: "12px 'Segoe UI', 'Helvetica Neue', sans-serif",
      fillStyle: "#475569",
    };
    const labels = [
      { text: "Q2", x: left + 12, y: top + 16 },
      { text: "Q1", x: right - 28, y: top + 16 },
      { text: "Q3", x: left + 12, y: bottom - 10 },
      { text: "Q4", x: right - 28, y: bottom - 10 },
    ];
    ctx.font = labelStyle.font;
    ctx.fillStyle = labelStyle.fillStyle;
    labels.forEach((l) => ctx.fillText(l.text, l.x, l.y));
    ctx.restore();
  },
};

const axisOriginPlugin = {
  id: "axisOrigin",
  beforeDraw: (chart: any) => {
    const { ctx, chartArea } = chart;
    if (!chartArea) return;
    const { left, right, top, bottom } = chartArea;

    ctx.save();
    ctx.strokeStyle = "#0f172a";
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(left, bottom);
    ctx.lineTo(right, bottom);
    ctx.moveTo(left, bottom);
    ctx.lineTo(left, top);
    ctx.stroke();

    ctx.fillStyle = "#0f172a";
    ctx.font = "11px 'Segoe UI', 'Helvetica Neue', sans-serif";
    ctx.fillText("0", left - 2, bottom + 14);
    ctx.fillText("100", right - 24, bottom + 14);
    ctx.fillText("100", left - 32, top + 4);
    ctx.restore();
  },
};

export default function SectionQuadrants({ matrices }: { matrices: MatrixPoint[] }) {
  const [interpretations, setInterpretations] = useState<Record<string, QuadrantInterpretation | null>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!matrices?.length) {
      setInterpretations({});
      return;
    }

    let cancelled = false;
    const load = async () => {
      setLoading(true);
      const entries = await Promise.all(
        matrices.map(async (m) => {
          const key = `${m.name}-${m.quadrant}`;
          try {
            const data = await getQuadrantInterpretation({ matrix: m.name, quadrant: m.quadrant });
            return [key, data as QuadrantInterpretation];
          } catch (err) {
            console.error("quadrant interpretation fetch failed", err);
            return [key, null];
          }
        })
      );

      if (cancelled) return;
      setInterpretations(Object.fromEntries(entries));
      setLoading(false);
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [matrices]);

  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold mb-4">Quadrant Interpretation</h2>

      <div className="space-y-10">
        {matrices.map((m, i) => {
          const key = `${m.name}-${m.quadrant}`;
          const interpretation = interpretations[key];
          const fallback = getQuadrantLabel(m.quadrant);

          return (
            <div key={i} className="border rounded p-4 bg-gray-50">
              <div className="font-medium mb-3">{m.name}</div>
              <div className="text-sm text-slate-600 mb-4">
                Quadrant: {m.quadrant} — {interpretation?.quadrant_label || fallback?.title}
                <br />
                Axes: {interpretation?.x_axis || fallback?.x} vs. {interpretation?.y_axis || fallback?.y}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-hidden">
                {/* Chart on left - takes 2 columns */}
                <div className="lg:col-span-2 bg-white rounded border overflow-hidden p-4 min-h-96">
                  <Scatter
                    data={{
                      datasets: [
                        {
                          label: m.name,
                          data: [{ x: m.x, y: m.y }],
                          pointRadius: 7,
                          pointHoverRadius: 9,
                          pointBackgroundColor: getQuadrantColor(m.quadrant),
                          pointBorderColor: "#0f172a",
                          pointBorderWidth: 1.5,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: { display: false },
                        tooltip: {
                          callbacks: {
                            label: (ctx) => {
                              const x = ctx.parsed?.x;
                              const y = ctx.parsed?.y;
                              if (x == null || y == null) return "";
                              return `(${x.toFixed(1)}, ${y.toFixed(1)})`;
                            },
                          },
                        },
                      },
                      interaction: { mode: "nearest", intersect: true },
                      scales: {
                        x: {
                          min: 0,
                          max: 100,
                          grid: { color: "#e2e8f0" },
                          ticks: { display: false },
                          border: { color: "#0f172a", width: 1.4 },
                          title: { display: true, text: interpretation?.x_axis || "X-axis", color: "#475569", font: { size: 12 } },
                        },
                        y: {
                          min: 0,
                          max: 100,
                          grid: { color: "#e2e8f0" },
                          ticks: { display: false },
                          border: { color: "#0f172a", width: 1.4 },
                          title: { display: true, text: interpretation?.y_axis || "Y-axis", color: "#475569", font: { size: 12 } },
                        },
                      },
                    }}
                    height={320}
                    plugins={[quadrantBackgroundPlugin, axisOriginPlugin]}
                  />
                </div>

                {/* Narrative and Development Focus on right - takes 1 column */}
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded border shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-xs uppercase tracking-wider text-slate-500 mb-2 font-semibold">Narrative</div>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {interpretation?.narrative || "Interpretation not available"}
                    </p>
                  </div>
                  <div className="p-4 bg-white rounded border shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-xs uppercase tracking-wider text-slate-500 mb-2 font-semibold">Development Focus</div>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {interpretation?.development_focus || "Guidance not available"}
                    </p>
                  </div>
                </div>
              </div>

              {loading && (
                <div className="text-xs text-slate-500 mt-3">Refreshing quadrant guidance…</div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
