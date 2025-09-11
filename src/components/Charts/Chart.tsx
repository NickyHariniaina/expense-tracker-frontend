import type React from "react";
import { Line } from "react-chartjs-2";
import { getChartConfig } from "../../utils/chartConfig";
import { useState, useEffect } from "react";
import { data } from "react-router-dom";
import Loading from "../Loading/Loading";

interface ChartProps {
  currentYear: number;
}

const Chart: React.FC<ChartProps> = ({ currentYear }) => {
  const [chartConfig, setChartConfig] = useState<{
    data: any;
    options: any;
  } | null>(null);

  useEffect(() => {
    const fetchChart = async () => {
      const config = await getChartConfig(currentYear);
      setChartConfig(config);
    };
    fetchChart();
  }, [currentYear]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
      <div className="p-6 rounded-2xl shadow-xl bg-white/20 backdrop-blur-lg border border-white/20">
        <h3 className="text-lg font-semibold mb-4">Monthly Spending Trend</h3>
        <div className="h-80">
          {chartConfig ? (
            <Line data={chartConfig.data} options={chartConfig.options} />
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </div>
  );
};

export default Chart;
