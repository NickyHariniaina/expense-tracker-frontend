import { useState, useEffect } from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import toast from "react-hot-toast";
import { getAlert, getMonthlySummary } from "../../utils/summary";
import { barOptions, getBarData, getPieData, pieOptions } from "../../utils/chartConfig";
import Button from "../Button/Button";
import Loading from "../Loading/Loading";
import type { MonthlySummary } from "../../types/summary";

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DashboardSummary = () => {
  const [summary, setSummary] = useState<MonthlySummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [tempMonth, setTempMonth] = useState("");

  useEffect(() => {
    fetchSummary();
  }, [selectedDate]);

  useEffect(() => {
    if ((summary?.balance ?? 0) < 0) getAlert();
  }, [summary]);

  const fetchSummary = async () => {
    try {
      setLoading(true);
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const formattedDate = `${year}-${month}`;
      const data = await getMonthlySummary(formattedDate);
      if (data) setSummary(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load summary");
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => setTempMonth(e.target.value);

  const handleMonthBlur = () => {
    if (tempMonth.length === 7) {
      const newDate = new Date(tempMonth + "-01T00:00:00");
      if (!isNaN(newDate.getTime())) setSelectedDate(newDate);
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => setSelectedCategory(e.target.value);

  const handleRefresh = () => fetchSummary();

  const filteredExpenses =
    summary?.expensesByCategory && selectedCategory !== "all"
      ? { [selectedCategory]: summary.expensesByCategory[selectedCategory] ?? 0 }
      : summary?.expensesByCategory ?? {};

  if (loading) return <Loading />;

  return (
    <div className="p-6 space-y-6 text-gray-900">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Dashboard & Monthly Summary</h2>
          <p className="text-gray-600">{selectedDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>
        </div>
        {(summary?.totalExpense ?? 0) > (summary?.totalIncome ?? 0) && (
          <div className="bg-red-500/25 backdrop-blur-md border border-red-400 text-red-700 px-4 py-2 rounded-lg font-semibold shadow-lg">
            Exceeded by Ar{((summary?.totalExpense ?? 0) - (summary?.totalIncome ?? 0)).toFixed(2)}
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="p-6 rounded-2xl shadow-xl border border-white/20 bg-gradient-to-r from-white/10 via-white/20 to-white/10 backdrop-blur-xl">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-800">Select Month</label>
            <input type="month" value={tempMonth} onChange={handleDateChange} onBlur={handleMonthBlur} placeholder="YYYY-MM" className="w-full p-2 border border-gray-300 rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-800">Filter by Category</label>
            <select value={selectedCategory} onChange={handleCategoryChange} className="w-full p-2 border border-gray-300 rounded-md">
              <option value="all">All Categories</option>
              {summary?.expensesByCategory && Object.keys(summary.expensesByCategory).map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
        <Button text="REFRESH DATA" className="mt-4" onClick={handleRefresh} />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl shadow-xl border-l-4 border-green-500 bg-gradient-to-r from-green-400/25 to-green-500/10 backdrop-blur-md">
          <h3 className="text-lg font-semibold mb-2">Total Income</h3>
          <p className="text-2xl font-bold text-green-700">Ariary {(summary?.totalIncome ?? 0).toFixed(2)}</p>
          <p className="text-sm text-gray-600">All income sources</p>
        </div>
        <div className="p-6 rounded-2xl shadow-xl border-l-4 border-red-500 bg-gradient-to-r from-red-400/25 to-red-500/10 backdrop-blur-md">
          <h3 className="text-lg font-semibold mb-2">Total Expenses</h3>
          <p className="text-2xl font-bold text-red-700">Ariary {(summary?.totalExpense ?? 0).toFixed(2)}</p>
          <p className="text-sm text-gray-600">Including recurring expenses</p>
        </div>
        <div className="p-6 rounded-2xl shadow-xl border-l-4 border-blue-500 bg-gradient-to-r from-blue-400/25 to-blue-500/10 backdrop-blur-md">
          <h3 className="text-lg font-semibold mb-2">Remaining Balance</h3>
          <p className={`text-2xl font-bold ${(summary?.balance ?? 0) >= 0 ? "text-green-700" : "text-red-700"}`}>Ariary {(summary?.balance ?? 0).toFixed(2)}</p>
          <p className="text-sm text-gray-600">Income − Expenses</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl shadow-xl bg-white/20 backdrop-blur-lg border border-white/20">
          <h3 className="text-lg font-semibold mb-4">Expense Categories</h3>
          <div className="h-80">
            {Object.keys(filteredExpenses).length === 0 ? (
              <div className="flex items-center justify-center h-80 text-gray-600">No data available</div>
            ) : (
              <Doughnut data={getPieData({ expensesByCategory: filteredExpenses })} options={pieOptions} />
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
    </div>
  );
};

export default DashboardSummary;
