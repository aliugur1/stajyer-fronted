import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { useTranslation } from "react-i18next";

function MetricLineChart({ data, title, dataKey, color }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  useEffect(() => {
    if (!canvasRef.current || !data) return;
    chartRef.current = new Chart(canvasRef.current, {
      type: "line",
      data: {
        labels: data.map((d) => d.label),
        datasets: [
          {
            label: title,
            data: data.map((d) => d[dataKey]),
            borderColor: color,
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 3,
            pointBackgroundColor: color,
            pointBorderColor: "white",
            pointBorderWidth: 1,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {//burada noktadan çıkarıp yaptık
          mode: "index",
          intersect: false,
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: true,
            backgroundColor: "white",
            titleColor: "#1F2937",
            bodyColor: "#1F2937",
            borderColor: "#E5E7EB",
            borderWidth: 1,
            padding: 10,
            displayColors: false,
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: "#9CA3AF", font: { size: 10 }, maxTicksLimit: 6 },
            border: { display: true, color: "#D1D5DB" },
          },
          y: {
            grid: { color: "#E5E7EB", borderDash: [3, 3] },
            ticks: {
              color: "#9CA3AF",
              padding: 8,
              font: { size: 10 },
              maxTicksLimit: 5,
            },
            border: { display: false },
            beginAtZero: true,
          },
        },
      },
    });
    return () => {
      chartRef.current?.destroy();
    };
  }, [data, title, dataKey, color]);
  return (
    <div className="w-full">
      <h4 className="text-sm font-semibold text-slate-700 mb-2">{title}</h4>
      <div className="relative h-44">
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
}
export default function BarsChart({ data }) {
  const { t } = useTranslation();
  return (
    <div className="w-full bg-white rounded-2xl shadow-sm p-6">
      <h3 className="font-bold text-slate-900 mb-6">{t("barsChart.name")} </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        <MetricLineChart
          data={data}
          title={t("barsChart.1")}
          dataKey="salesCount"
          color="#3b82f6"
        />
        <MetricLineChart
          data={data}
          title={t("barsChart.2")}
          dataKey="totalLiter"
          color="#22c55e"
        />
        <MetricLineChart
          data={data}
          title={t("barsChart.3")}
          dataKey="revenue"
          color="#f97316"
        />
      </div>
    </div>
  );
}
