import { useState, useEffect } from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import toast from "react-hot-toast";
import { getAlert, getMonthlySummary } from "../../utils/summary";
import {
  barOptions,
  getBarData,
  getPieData,
  pieOptions,
} from "../../utils/chartConfig";
import Button from "../Button/Button";
import Loading from "../Loading/Loading";
import type { UserSummary } from "../../types/user";

// Register Chart.js components
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const DashboardSummary = () => {
  const [summary, setSummary] = useState<UserSummary>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [tempMonth, setTempMonth] = useState('');

  useEffect(() => {
    fetchSummary();
  }, [selectedDate]);

  useEffect(() => {
    checkBudgetAlerts();
  }, [summary]);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempMonth(event.target.value);
  };

  const handleMonthBlur = () => {
    if (tempMonth && tempMonth.length === 7) {
      const newDate = new Date(tempMonth + '-01T00:00:00');
      if (!isNaN(newDate.getTime())) {
        setSelectedDate(newDate);
      }
    }
  };

  const fetchSummary = async () => {
    try {
      setLoading(true);
      const formattedDate = selectedDate.toISOString().split("T")[0];
      const data = await getMonthlySummary(formattedDate);
      if (data) setSummary(data);
    } catch (error) {
      console.error("Error fetching summary:", error);
      toast.error("Failed to load financial data");
    } finally {
      setLoading(false);
    }
  };

  const checkBudgetAlerts = async () => {
    if (summary?.balance != null && summary?.balance < 0) {
      await getAlert();
    }
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedMonth = event.target.value;
    if (selectedMonth) {
      setSelectedDate(new Date(selectedMonth + "-01T00:00:00"));
    }
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedCategory(event.target.value);
  };

  const handleRefresh = () => fetchSummary();

  const filteredExpenses = summary?.expensesByCategory
  ? selectedCategory === "all"
    ? summary.expensesByCategory
    : { [selectedCategory]: summary.expensesByCategory[selectedCategory] || 0 }
  : {};

  if (loading) return <Loading />;

  return (
    <div className="p-6 space-y-6 text-gray-900">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Dashboard & Monthly Summary</h2>
          <p className="text-gray-600">
            {selectedDate.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

        {summary && summary.totalExpense > summary.totalIncome && (
          <div className="bg-red-500/25 backdrop-blur-md border border-red-400 text-red-700 px-4 py-2 rounded-lg font-semibold shadow-lg">
            Exceeded by Ar
            {(summary.totalExpense - summary.totalIncome).toFixed(2)}
          </div>
        )}
      </div>

      {/* Filters */}
      <div
        className="p-6 rounded-2xl shadow-xl border border-white/20 
        bg-gradient-to-r from-white/10 via-white/20 to-white/10 
        backdrop-blur-xl"
      >
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-800">
              Select Month
            </label>
            <input
              type="month"
              value={tempMonth}
              onChange={handleDateChange}
              onBlur={handleMonthBlur}
              placeholder='Example : 2018-03'
              className="w-full p-2 border border-gray-300 rounded-md"
            />

          </div>
        </div>
        <Button text="REFRESH DATA" className="mt-4" onClick={handleRefresh} />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl shadow-xl border-l-4 border-green-500 bg-gradient-to-r from-green-400/25 to-green-500/10 backdrop-blur-md">
          <h3 className="text-lg font-semibold mb-2">Total Income</h3>
          <p className="text-2xl font-bold text-green-700">
            Ariary {summary?.income?.toFixed(2) || "0.00"}
          </p>
          <p className="text-sm text-gray-600">All income sources</p>
        </div>

        <div className="p-6 rounded-2xl shadow-xl border-l-4 border-red-500 bg-gradient-to-r from-red-400/25 to-red-500/10 backdrop-blur-md">
          <h3 className="text-lg font-semibold mb-2">Total Expenses</h3>
          <p className="text-2xl font-bold text-red-700">
            Ariary {summary?.expense?.toFixed(2) || "0.00"}
          </p>
          <p className="text-sm text-gray-600">Including recurring expenses</p>
        </div>

        <div className="p-6 rounded-2xl shadow-xl border-l-4 border-blue-500 bg-gradient-to-r from-blue-400/25 to-blue-500/10 backdrop-blur-md">
          <h3 className="text-lg font-semibold mb-2">Remaining Balance</h3>
          <p
            className={`text-2xl font-bold ${summary?.balance >= 0 ? "text-green-700" : "text-red-700"}`}
          >
            Ariary {summary?.balance?.toFixed(2) || "0.00"}
          </p>
          <p className="text-sm text-gray-600">Income − Expenses</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl shadow-xl bg-white/20 backdrop-blur-lg border border-white/20">
          <h3 className="text-lg font-semibold mb-4">Expense Categories</h3>
          <div className="h-80">
            {!summary?.expensesByCategory ||
            Object.keys(summary.expensesByCategory).length === 0 ? (
              <div className="flex items-center justify-center h-80 text-gray-600">
                No data available
              </div>
            ) : (
              <Doughnut data={getPieData(summary)} options={pieOptions} />
            )}
          </div>
        </div>

        <div className="p-6 rounded-2xl shadow-xl bg-white/20 backdrop-blur-lg border border-white/20">
          <h3 className="text-lg font-semibold mb-4">Monthly Spending Trend</h3>
          <div className="h-80">
            <Bar data={getBarData(summary)} options={barOptions} />
          </div>
        </div>
      </div>

      {/* Additional Info */}
      {summary && (
        <div className="p-6 rounded-2xl shadow-xl bg-white/20 backdrop-blur-lg border border-white/20">
          <h3 className="text-lg font-semibold mb-4">Monthly Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 text-sm">
            <div>
              <p>
                <strong>Period:</strong>{" "}
                {selectedDate.toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <p>
                <strong>Budget Status:</strong>
                <span
                  className={
                    summary.balance >= 0
                      ? "text-green-700 ml-2"
                      : "text-red-700 ml-2"
                  }
                >
                  {summary.balance >= 0 ? "Within Budget" : "Over Budget"}
                </span>
              </p>
            </div>
            <div>
              <p>
                <strong>Expense Categories:</strong>{" "}
                {Object.keys(summary.expensesByCategory || {}).length}
              </p>
              <p>
                <strong>Data Updated:</strong> {new Date().toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardSummary;
