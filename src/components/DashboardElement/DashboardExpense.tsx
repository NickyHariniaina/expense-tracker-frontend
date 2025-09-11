import React, { useEffect, useState } from "react";
import { useUserStore } from "../../store/user";
import type { UserExpense, UserCategory } from "../../types/user";
import ExpenseForm from "../../components/Form/ExpenseForm";
import ConfirmModal from "../Form/DeleteExpenseConfirm";

const DashboardExpense: React.FC = () => {
  const { userExpenses, fetchUserExpenses, userCategories, fetchUserCategories } =
    useUserStore();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<UserExpense | undefined>(undefined);

  useEffect(() => {
    fetchUserExpenses();
    fetchUserCategories();
  }, [fetchUserExpenses, fetchUserCategories]);

  const handleAdd = () => {
    setSelectedExpense(undefined);
    setIsFormOpen(true);
  };

  const handleEdit = (expense: UserExpense) => {
    setSelectedExpense(expense);
    setIsFormOpen(true);
  };

  const handleDelete = (expense: UserExpense) => {
    setSelectedExpense(expense);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedExpense) return;
    await fetch(`http://localhost:3000/api/expenses/${selectedExpense.id}`, {
      method: "DELETE",
      credentials: "include",
    });
    fetchUserExpenses();
    setIsConfirmOpen(false);
  };

  const formatDate = (date: Date | string | null | undefined) => {
    if (!date) return "—";
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Expenses</h2>
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          + Add Expense
        </button>
      </div>

      {/* TABLE */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Description</th>
            <th className="p-2 text-left">Amount</th>
            <th className="p-2 text-left">Type</th>
            <th className="p-2 text-left">Date(s)</th>
            <th className="p-2 text-left">Category</th>
            <th className="p-2 text-left">Creation Date</th>
            <th className="p-2 text-left">Receipt</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {userExpenses && userExpenses.length > 0 ? (
            userExpenses.map((expense) => (
              <tr key={expense.id} className="border-b">
                <td className="p-2">{expense.description}</td>
                <td className="p-2">{expense.amount} Ar</td>
                <td className="p-2">{expense.type ? "Recurring" : "Onetime"}</td>
                <td className="p-2">
                  {expense.type
                    ? `${formatDate(expense.start_date)} → ${formatDate(expense.end_date)}`
                    : formatDate(expense.date)}
                </td>
                <td className="p-2">
                  {userCategories?.find((cat: UserCategory) => cat.id === expense.category_id)?.name || "—"}
                </td>
                <td className="p-2">{formatDate(expense.creationDate)}</td>
                <td className="p-2">
                  {expense.receipt ? (
                    <a
                      href={`${expense.receipt}?fl_attachment`} // force le téléchargement
                      download={`receipt_${expense.id}`} // nom du fichier
                      className="text-blue-500 underline"
                    >
                      Télécharger
                    </a>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="p-2 space-x-2">
                  <button onClick={() => handleEdit(expense)} className="text-blue-500 hover:underline">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(expense)} className="text-red-500 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className="p-4 text-center text-gray-500">
                No expenses found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* FORM MODAL */}
      {isFormOpen && (
        <ExpenseForm
          expense={selectedExpense}
          userCategories={userCategories || []}
          onClose={() => setIsFormOpen(false)}
          onSubmit={async (formData: FormData) => {
            const method = selectedExpense ? "PUT" : "POST";
            const url = selectedExpense
              ? `http://localhost:3000/api/expenses/${selectedExpense.id}`
              : "http://localhost:3000/api/expenses";

            await fetch(url, {
              method,
              body: formData,
              credentials: "include",
            });

            fetchUserExpenses();
            setIsFormOpen(false);
          }}
        />
      )}

      {/* DELETE CONFIRM MODAL */}
      <ConfirmModal
        isOpen={isConfirmOpen}
        message="Are you sure you want to delete this expense?"
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </div>
  );
};

export default DashboardExpense;
