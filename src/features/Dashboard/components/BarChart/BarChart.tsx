import { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { Dropdown } from "primereact/dropdown";

interface ChartDataset {
  type: "bar" | "line";
  label: string;
  backgroundColor: string;
  borderColor?: string;
  data: number[];
}

interface BarChartProps {
  title: string;
  description?: string;
  datasets: ChartDataset[];
  labels: string[];
  periodOptions?: Array<{ id: number; label: string }>;
  defaultPeriod?: { id: number; label: string };
  summaryData?: Array<{
    label: string;
    value: string | number;
    color?: string;
  }>;
  height?: number;
  stacked?: boolean;
  showLegend?: boolean;
  onPeriodChange?: (period: { id: number; label: string }) => void;
}

export function BarChart({
  title,
  description = "Los datos mostrados son de los últimos 30 días",
  datasets,
  labels,
  periodOptions = [
    { id: 1, label: "Diario" },
    { id: 2, label: "Semanal" },
    { id: 3, label: "Mensual" },
  ],
  defaultPeriod = { id: 3, label: "Mensual" },
  summaryData = [],
  height = 300,
  stacked = true,
  showLegend = true,
  onPeriodChange,
}: BarChartProps) {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [selectedPeriod, setSelectedPeriod] = useState(defaultPeriod);

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary",
    );
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

    const data = {
      labels,
      datasets: datasets.map((dataset) => ({
        ...dataset,
        borderColor: dataset.borderColor || dataset.backgroundColor,
        tension: dataset.type === "line" ? 0.4 : 0,
        fill: dataset.type === "line" ? false : true,
      })),
    };

    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      responsive: true,
      plugins: {
        tooltips: {
          mode: "index",
          intersect: false,
        },
        legend: {
          display: showLegend,
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          stacked: stacked,
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          stacked: stacked,
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, [datasets, labels, stacked, showLegend]);

  const handlePeriodChange = (period: { id: number; label: string }) => {
    setSelectedPeriod(period);
    if (onPeriodChange) {
      onPeriodChange(period);
    }
  };

  return (
    <div className="card">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h3>{title}</h3>
          <p style={{ fontSize: "13px" }}>{description}</p>
        </div>
        {/*
        <div>
          <Dropdown
            value={selectedPeriod}
            onChange={(e) => handlePeriodChange(e.value)}
            options={periodOptions}
            optionLabel="label"
            style={{ minWidth: "120px" }}
          />
        </div>
      */}
      </div>

      {summaryData.length > 0 && (
        <div
          style={{
            display: "flex",
            margin: "20px 0",
            gap: "25px",
            flexWrap: "wrap",
          }}
        >
          {summaryData.map((item, index) => (
            <div key={index}>
              <p style={{ fontSize: "13px" }}>{item.label}</p>
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: "600",
                  color: item.color || "inherit",
                }}
              >
                {item.value}
              </p>
            </div>
          ))}
        </div>
      )}

      <div style={{ height: `${height}px` }}>
        <Chart type="bar" data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}

