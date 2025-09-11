import { useState, useEffect } from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import toast from 'react-hot-toast';
import { getMonthlySummary } from '../../utils/summary';
import { barOptions, getBarData, getPieData, pieOptions } from '../../utils/chartConfig';

// Register Chart.js components
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashboardSummary = () => {
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchSummary();
  }, [selectedDate]);

  useEffect(() => {
    checkBudgetAlerts();
  }, [summary]);

  const fetchSummary = async () => {
    try {
      setLoading(true);
      const data = await getMonthlySummary(selectedDate);
      if (data) {
        setSummary(data);
      }
    } catch (error) {
      console.error('Error fetching summary:', error);
      toast.error('Failed to load financial data');
    } finally {
      setLoading(false);
    }
  };

  const checkBudgetAlerts = () => {
    if (summary && summary.totalExpense > summary.totalIncome) {
      const overspendAmount = summary.totalExpense - summary.totalIncome;
      toast.error(
        `You've exceeded your budget for this month by €${overspendAmount.toFixed(2)}`,
        { duration: 6000 }
      );
    }
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(new Date(event.target.value));
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  const handleRefresh = () => {
    fetchSummary();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      
      {/* Header with Budget Alert */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Dashboard & Monthly Summary</h2>
          <p className="text-gray-600">
            {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>
        </div>
        
        {summary && summary.totalExpense > summary.totalIncome && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
            <strong>Budget Warning:</strong> Exceeded by €{(summary.totalExpense - summary.totalIncome).toFixed(2)}
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Month
            </label>
            <input
              type="month"
              value={selectedDate.toISOString().slice(0, 7)}
              onChange={handleDateChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Category
            </label>
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="all">All Categories</option>
              {summary?.expensesByCategory && Object.keys(summary.expensesByCategory).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          onClick={handleRefresh}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Refresh Data
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
          <h3 className="text-lg font-semibold text-gray-700">Total Income</h3>
          <p className="text-2xl font-bold text-green-600">
            €{summary?.totalIncome?.toFixed(2) || '0.00'}
          </p>
          <p className="text-sm text-gray-500">All income sources</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-red-500">
          <h3 className="text-lg font-semibold text-gray-700">Total Expenses</h3>
          <p className="text-2xl font-bold text-red-600">
            €{summary?.totalExpense?.toFixed(2) || '0.00'}
          </p>
          <p className="text-sm text-gray-500">Including recurring expenses</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
          <h3 className="text-lg font-semibold text-gray-700">Remaining Balance</h3>
          <p className={`text-2xl font-bold ${
            summary?.balance >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            €{summary?.balance?.toFixed(2) || '0.00'}
          </p>
          <p className="text-sm text-gray-500">Income − Expenses</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Pie Chart - Expense Categories */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Expense Categories</h3>
          <div className="h-80">
            <Doughnut data={getPieData(summary)} options={pieOptions} />
          </div>
        </div>

        {/* Bar Chart - Monthly Spending */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Monthly Spending Trend</h3>
          <div className="h-80">
            <Bar data={getBarData(summary)} options={barOptions} />
          </div>
        </div>
      </div>

      {/* Additional Info */}
      {summary && (
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Monthly Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p><strong>Period:</strong> {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
              <p><strong>Budget Status:</strong> 
                <span className={summary.balance >= 0 ? 'text-green-600 ml-2' : 'text-red-600 ml-2'}>
                  {summary.balance >= 0 ? 'Within Budget' : 'Over Budget'}
                </span>
              </p>
            </div>
            <div>
              <p><strong>Expense Categories:</strong> {Object.keys(summary.expensesByCategory || {}).length}</p>
              <p><strong>Data Updated:</strong> {new Date().toLocaleTimeString()}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default DashboardSummary;
