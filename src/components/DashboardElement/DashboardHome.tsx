import { type FC, useEffect } from "react";
import { useUserStore } from "../../store/user";

const DashboardHome: FC = () => {
  const { userData, userExpenses, userIncomes, userSummary, fetchUserExpenses, fetchUserIncomes } = useUserStore();

  // Trigger data fetch on mount
  useEffect(() => {
    fetchUserExpenses();
    fetchUserIncomes();
  }, [fetchUserExpenses, fetchUserIncomes]);

  // Calculs des totaux avec gestion de null
  const totalExpenses = userExpenses?.reduce((sum, expense) => sum + expense.amount, 0) ?? 0;
  const totalIncomes = userIncomes?.reduce((sum, income) => sum + income.amount, 0) ?? 0;
  const balance = totalIncomes - totalExpenses;

  // Vérifie si les données sont encore null (en cours de chargement)
  if (!userExpenses || !userIncomes) {
    return <div className="p-6 text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-neutraly-color mb-4">Dashboard Home</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700">Total Expenses</h2>
          <p className="text-xl text-red-500">{totalExpenses.toFixed(2)} €</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700">Total Incomes</h2>
          <p className="text-xl text-green-500">{totalIncomes.toFixed(2)} €</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700">Balance</h2>
          <p className={`text-xl ${balance >= 0 ? "text-green-500" : "text-red-500"}`}>
            {balance.toFixed(2)} €
          </p>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-gray-700">Recent Transactions</h2>
        <ul className="divide-y divide-gray-200">
          {userExpenses?.slice(0, 5).map((expense) => (
            <li key={expense.id} className="py-2">
              <span className="font-medium">{expense.description ?? "No description"}</span> - 
              <span className="text-red-500 ml-2">{expense.amount} €</span> - 
              <span className="text-gray-500 ml-2">
                {expense.date ? new Date(expense.date).toLocaleDateString() : "No date"}
              </span>
            </li>
          )) ?? <li className="py-2 text-gray-500">No expenses data</li>}
          {userIncomes?.slice(0, 5).map((income) => (
            <li key={income.id} className="py-2">
              <span className="font-medium">{income.source ?? "No source"}</span> - 
              <span className="text-green-500 ml-2">{income.amount} €</span> - 
              <span className="text-gray-500 ml-2">
                {income.date ? new Date(income.date).toLocaleDateString() : "No date"}
              </span>
            </li>
          )) ?? <li className="py-2 text-gray-500">No incomes data</li>}
        </ul>
      </div>
    </div>
  );
};

export default DashboardHome;