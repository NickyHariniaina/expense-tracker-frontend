import { type FC, useEffect } from "react";
import { useUserStore } from "../../store/user";
import { FaArrowUp, FaArrowDown, FaExchangeAlt, FaHistory } from "react-icons/fa";

const DashboardHome: FC = () => {
  const { userData, userExpenses, userIncomes, userSummary, fetchUserExpenses, fetchUserIncomes } = useUserStore();

  // Trigger data fetch on mount
  useEffect(() => {
    fetchUserExpenses();
    fetchUserIncomes();
  }, [fetchUserExpenses, fetchUserIncomes]);

  // Calculations with null handling
  const totalExpenses = userExpenses?.reduce((sum, expense) => sum + expense.amount, 0) ?? 0;
  const totalIncomes = userIncomes?.reduce((sum, income) => sum + income.amount, 0) ?? 0;
  const balance = totalIncomes - totalExpenses;

  // Get user display name safely based on your UserData structure
  const getUserDisplayName = () => {
    if (userData?.email) return userData.email.split('@')[0];
    return "User";
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { 
      minimumFractionDigits: 0,
      maximumFractionDigits: 0 
    }).format(amount) + " Ar";
  };

  // Check if data is still null (loading)
  if (!userExpenses || !userIncomes) {
    return (
      <div className="p-6 min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          Welcome, {getUserDisplayName()}
        </h1>
        <p className="text-gray-600">Here's an overview of your finances</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Expenses Card */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Total Expenses</h2>
            <div className="p-3 bg-red-100 rounded-full">
              <FaArrowUp className="text-red-600 text-lg" />
            </div>
          </div>
          <p className="text-2xl font-bold text-red-600">{formatCurrency(totalExpenses)}</p>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-500">{userExpenses?.length || 0} expenses</p>
          </div>
        </div>

        {/* Incomes Card */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Total Incomes</h2>
            <div className="p-3 bg-green-100 rounded-full">
              <FaArrowDown className="text-green-600 text-lg" />
            </div>
          </div>
          <p className="text-2xl font-bold text-green-600">{formatCurrency(totalIncomes)}</p>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-500">{userIncomes?.length || 0} incomes</p>
          </div>
        </div>

        {/* Balance Card */}
        <div className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 ${balance >= 0 ? 'border-green-200' : 'border-red-200'}`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Balance</h2>
            <div className={`p-3 rounded-full ${balance >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
              <FaExchangeAlt className={`text-lg ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`} />
            </div>
          </div>
          <p className={`text-2xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {formatCurrency(balance)}
          </p>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              {balance >= 0 ? 'Positive balance' : 'Negative balance'}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <FaHistory className="mr-2 text-blue-600" />
              Recent Transactions
            </h2>
            <span className="text-sm text-gray-500">Last 5 transactions</span>
          </div>
        </div>
        
        <div className="divide-y divide-gray-100">
          {/* Expenses */}
          {userExpenses?.slice(0, 5).map((expense) => (
            <div key={expense.id} className="p-4 hover:bg-gray-50 transition-colors duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-2 rounded-full mr-3 bg-red-100">
                    <FaArrowUp className="text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      {expense.description ?? "No description"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {expense.date ? new Date(expense.date).toLocaleDateString() : "No date"}
                    </p>
                  </div>
                </div>
                <p className="text-red-600 font-semibold">-{formatCurrency(expense.amount)}</p>
              </div>
            </div>
          ))}

          {/* Incomes */}
          {userIncomes?.slice(0, 5).map((income) => (
            <div key={income.id} className="p-4 hover:bg-gray-50 transition-colors duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-2 rounded-full mr-3 bg-green-100">
                    <FaArrowDown className="text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      {income.source ?? "No source"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {income.date ? new Date(income.date).toLocaleDateString() : "No date"}
                    </p>
                  </div>
                </div>
                <p className="text-green-600 font-semibold">+{formatCurrency(income.amount)}</p>
              </div>
            </div>
          ))}

          {/* Empty state */}
          {userExpenses?.length === 0 && userIncomes?.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              <p>No transactions yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
