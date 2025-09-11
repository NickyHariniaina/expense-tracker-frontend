import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Chart as ChartJS,
} from "chart.js";

import type { ChartOptions, ChartData } from "chart.js";
import { useUserStore } from "../store/user";
import { getMonthlySummary } from "./summary";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const fillData = async (year: number) => {
  const expenses: number[] = [];
  const incomes: number[] = [];

  for (let i = 1; i <= 12; i++) {
    const month = i < 10 ? `0${i}` : `${i}`;
    const date = `${year}-${month}`;
    const summary = await getMonthlySummary(date);

    expenses.push(summary.expense ?? 0);
    incomes.push(summary.income ?? 0);
  }

  return { expenses, incomes };
};

export const getChartConfig = async (year: number) => {
  const { expenses, incomes } = await fillData(year);

  const data: ChartData<"line"> = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Expenses",
        data: expenses,
        borderColor: "rgba(220, 53, 69, 0.9)",
        backgroundColor: "rgba(220, 53, 69, 0.2)",
        tension: 0.4,
        fill: false,
      },
      {
        label: "Incomes",
        data: incomes,
        borderColor: "rgba(40, 167, 69, 0.9)",
        backgroundColor: "rgba(40, 167, 69, 0.2)",
        tension: 0.4,
        fill: false,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: `Incomes vs Expenses - ${year}` },
    },
    scales: {
      y: {
        ticks: {
          callback: (value) => `${value} Ar`,
        },
      },
    },
  };

  return { data, options };
};
