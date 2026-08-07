import Chart from "react-apexcharts";

function PieChart({ data, name } = {}) {
  const chartData = data || [];
  const chartColors = {
    neutral: "#ffffff",
  };
  const palette = [
    "#1447E6",
    "#22C55E",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#06B6D4",
    "#EC4899",
    "#84CC16",
  ];
  // Grafik Ayarları (Options)
  const chartOptions = {
    colors: chartData.map((_, i) => palette[i % palette.length]),
    chart: {
      type: "pie",
      toolbar: {
        show: false, // Temiz bir UI için araç çubuğunu gizledik
      },
    },
    stroke: {
      colors: [chartColors.neutral],
      width: 2, // Çizgi kalınlığı eklendi
    },
    plotOptions: {
      pie: {
        labels: {
          show: true,
        },
        size: "100%",
        dataLabels: {
          offset: -25,
        },
      },
    },
    labels: chartData.map((d) => d.label),
    dataLabels: {
      enabled: true,
      style: {
        fontFamily: "Inter, sans-serif",
      },
    },
    legend: {
      position: "bottom",
      fontFamily: "Inter, sans-serif",
    },
    yaxis: {
      labels: {
        formatter: (value) => `${value}%`,
      },
    },
    xaxis: {
      labels: {
        formatter: (value) => `${value}%`,
      },
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
  };
  // Grafiğe aktarılacak veri seti
  const chartSeries = chartData.map((d) => d.value);
  return (
    <div className="w-full bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="font-bold text-slate-900 mb-6">
        {name}
        <c />{" "}
      </h3>
      <div id="pie-chart" className="w-full flex justify-center">
        {/* React-ApexCharts Bileşeni */}
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="pie"
          height={420}
          width="100%"
        />
      </div>
    </div>
  );
}

export default PieChart;
