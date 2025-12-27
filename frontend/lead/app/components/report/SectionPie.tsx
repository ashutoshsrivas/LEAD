"use client";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
Chart.register(ArcElement, Tooltip, Legend);

// Disable color interpolation in LAB color space
Chart.defaults.color = '#666';

export default function SectionPie({ guna }: { guna: Record<string, number> }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold mb-4">Inner Energy – Pie Chart</h2>
      <div className="flex justify-center items-center">
        <div className="w-72">
          <Pie
          data={{
            labels: Object.keys(guna),
            datasets: [
              {
                data: Object.values(guna),
                backgroundColor: ["#1d4ed8", "#16a34a", "#dc2626"],
              },
            ],
          }}
        />
        </div>
      </div>
    </section>
  );
}
