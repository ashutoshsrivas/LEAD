"use client";
import { Radar } from "react-chartjs-2";
import { Chart as ChartJS, RadarController, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from "chart.js";
import { getBand } from "@/app/lib/report/bandLogic";
import { round } from "@/app/lib/report/helpers";

ChartJS.register(RadarController, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

// Disable LAB color space interpolation
ChartJS.defaults.color = '#666';

const pillarColors: Record<string, { bg: string; text: string; border: string; chart: string; chartLight: string }> = {
  L: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", chart: "rgb(59, 130, 246)", chartLight: "rgba(59, 130, 246, 0.1)" },
  E: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", chart: "rgb(16, 185, 129)", chartLight: "rgba(16, 185, 129, 0.1)" },
  A: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", chart: "rgb(245, 158, 11)", chartLight: "rgba(245, 158, 11, 0.1)" },
  D: { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200", chart: "rgb(244, 63, 94)", chartLight: "rgba(244, 63, 94, 0.1)" },
};

const pillarFullNames: Record<string, string> = {
  L: "Loka-saṅgraha / Link",
  E: "Equality / Equity / Equanimity",
  A: "Association / Asraya / Awareness",
  D: "Dharma / Direction / Daman",
};

export default function SectionLeadDiamond({ pillars }: { pillars: Record<string, number> }) {
  const pillarOrder = ["L", "E", "A", "D"];
  
  const chartData = {
    labels: pillarOrder.map(key => `${key}\n${pillarFullNames[key].split("/")[0]}`),
    datasets: [
      {
        label: "Leadership Score",
        data: pillarOrder.map(key => pillars[key] || 0),
        borderColor: "rgb(100, 116, 139)",
        backgroundColor: "rgba(100, 116, 139, 0.15)",
        borderWidth: 2.5,
        pointRadius: 6,
        pointBackgroundColor: pillarOrder.map(key => pillarColors[key].chart),
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const pillar = pillarOrder[context.dataIndex];
            const value = context.parsed.r;
            const band = getBand(value);
            return `${pillar}: ${round(value)} (${band?.label || "Unknown"})`;
          },
        },
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 12,
        titleFont: { size: 13 },
        bodyFont: { size: 12 },
        borderColor: "rgba(255, 255, 255, 0.2)",
        borderWidth: 1,
      },
    },
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 25,
          font: { size: 11 },
          color: "rgb(100, 116, 139)",
        },
        grid: {
          color: "rgba(226, 232, 240, 0.5)",
          drawBorder: false,
        },
        pointLabels: {
          font: {
            size: 13,
            weight: 600,
          },
          color: "rgb(30, 41, 59)",
          padding: 12,
        },
      },
    },
  };

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-2">LEAD Profile Overview</h2>
      <p className="text-sm text-slate-600 mb-8">Interactive visualization of your leadership foundation scores</p>

      {/* Radar Chart */}
      <div className="flex justify-center mb-12">
        <div className="w-full max-w-2xl bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-8 shadow-lg">
          <Radar data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Pillar Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {pillarOrder.map((key) => {
          const value = pillars[key] || 0;
          const band = getBand(value);
          const colors = pillarColors[key];
          const fullName = pillarFullNames[key];

          return (
            <div
              key={key}
              className={`${colors.bg} ${colors.border} border-2 rounded-lg p-4 text-center shadow-md hover:shadow-lg transition-all`}
            >
              <div className="flex items-center justify-center mb-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg`} style={{ backgroundColor: colors.chart }}>
                  {key}
                </div>
              </div>
              <p className={`text-xs font-medium ${colors.text} mb-2 leading-tight`}>{fullName}</p>
              <div className="border-t-2 border-slate-200 pt-3">
                <p className="text-3xl font-bold text-slate-900">{round(value)}</p>
                <p className={`text-xs font-semibold mt-1 ${colors.text}`}>{band?.label || "Unknown"}</p>
                <p className="text-xs text-slate-600 mt-2 leading-snug">{band?.meaning || ""}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-slate-700">
          <strong>How to interpret:</strong> The radar chart shows your relative scores across all four pillars. Higher points indicate stronger performance in that leadership foundation. Hover over the chart points for band classifications and guidance.
        </p>
      </div>
    </section>
  );
}
