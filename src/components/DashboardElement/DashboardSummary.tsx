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
import { useEffect, useState } from "react";
import { getAlert, getMonthlySummary } from "../../utils/summary";
import type { MonthlySummary } from "../../store/summary";

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

const DashboardSummary: React.FC = () => {
  const [summary, setSummary] = useState<MonthlySummary | null> (null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // fetch summary
  const fetchSummary = async () => {
    try {
      setLoading(true);
      const data = await getMonthlySummary(selectedDate);
      if (data) {
        setSummary(data);
      }
    } catch (error) {
      console.error('Error fetching summary:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, [selectedDate]);

  const handleClickAlert = async () => {
    await getAlert();
  }

  return (
    <>
    </>
  );
}

export default DashboardSummary;
