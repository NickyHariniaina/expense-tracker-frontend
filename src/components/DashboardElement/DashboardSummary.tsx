import type React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useState } from "react";

// Save components on ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface MonthlySummary {
  totalIncome : number;
  totalExpense : number;
  balance : number;
  expenseByCategory : { [key: string]: number };
  monthlyTrend : { month: string; income: number; expense: number }[];
}

const DashboardSummary: React.FC = () => {
  const [summary, setSummary] = useState<MonthlySummary | null> (null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <>
      <h1>Hello Summary</h1>
    </>
  );
}

export default DashboardSummary;
