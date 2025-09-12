import React, { useEffect, useState } from "react";
import { useUserStore } from "../../store/user";
import type { UserExpense, UserCategory } from "../../types/user";
import ExpenseForm from "../../components/Form/ExpenseForm";
import ConfirmModal from "../Form/DeleteExpenseConfirm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileInvoice, faCalendarAlt, faTags, faReceipt, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button/Button";

const DashboardExpense: React.FC = () => {
  const { userExpenses, fetchUserExpenses, userCategories, fetchUserCategories } = useUserStore();
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

  const columnColors = [
    "text-blue-500",
    "text-green-600",
    "text-purple-600",
    "text-blue-400",
    "text-pink-500",
    "text-gray-700",
    "text-yellow-600",
    "text-red-600",
  ];

  // Petite fonction pour le header
  const renderTableHeader = () => (
    <div className="grid grid-cols-8 gap-2 p-3 rounded-lg font-bold text-white bg-gradient-to-r from-[#0EA5E9]/20 to-[#059669]/20 backdrop-blur-md">
      <span className="flex items-center gap-1"><FontAwesomeIcon icon={faFileInvoice} /> Description</span>
      <span className={`flex items-center gap-1 ${columnColors[1]}`}><FontAwesomeIcon icon={faFileInvoice} /> Amount</span>
      <span className={`flex items-center gap-1 ${columnColors[2]}`}><FontAwesomeIcon icon={faTags} /> Type</span>
      <span className={`flex items-center gap-1 ${columnColors[3]}`}><FontAwesomeIcon icon={faCalendarAlt} /> Date(s)</span>
      <span className={`flex items-center gap-1 ${columnColors[4]}`}><FontAwesomeIcon icon={faTags} /> Category</span>
      <span className={`flex items-center gap-1 ${columnColors[5]}`}><FontAwesomeIcon icon={faCalendarAlt} /> Created At</span>
      <span className={`flex items-center gap-1 ${columnColors[6]}`}><FontAwesomeIcon icon={faReceipt} /> Receipt</span>
      <span className={`flex items-center gap-1 ${columnColors[7]}`}><FontAwesomeIcon icon={faEdit} /> Actions</span>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-4xl font-spartan font-bold text-gray-800 mb-4 md:mb-0">Expenses</h2>
        <Button
          text="+ Add Expense"
          onClick={handleAdd}
          bg_color="secondary"
          size="lg"
          className="shadow-lg hover:scale-105 transform transition-all"
        />
      </div>

      {/* TABLE HEADER */}
      {renderTableHeader()}

      {/* TABLE ROWS */}
      {userExpenses && userExpenses.length > 0 ? (
        userExpenses.map((expense) => (
          <div key={expense.id} className="grid grid-cols-8 gap-2 mb-2">
            <div className="p-2 border rounded truncate">{expense.description}</div>
            <div className="p-2 border rounded font-semibold text-green-700">{expense.amount} Ar</div>
            <div className="p-2 border rounded">{expense.type ? "Recurring" : "Onetime"}</div>
            <div className="p-2 border rounded">
              {expense.type
                ? `${formatDate(expense.start_date)} → ${formatDate(expense.end_date)}`
                : formatDate(expense.date)}
            </div>
            <div className="p-2 border rounded">
              {userCategories?.find((cat: UserCategory) => cat.id === expense.category_id)?.name || "—"}
            </div>
            <div className="p-2 border rounded">{formatDate(expense.creation_date)}</div>
            <div className="p-2 border rounded">
              {expense.receipt ? (
                <a
                  href={`${expense.receipt}?fl_attachment`}
                  download={`receipt_${expense.id}`}
                  className="text-blue-500 underline"
                >
                  Download
                </a>
              ) : "—"}
            </div>
            <div className="p-2 border rounded flex gap-2 justify-center">
              <Button text="" onClick={() => handleEdit(expense)} bg_color="secondary" size="sm">
                <FontAwesomeIcon icon={faEdit} />
              </Button>
              <Button text="" onClick={() => handleDelete(expense)} bg_color="terty" size="sm">
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-8 text-center text-gray-500 p-4">
          No expenses found.
        </div>
      )}

      {/* FORM MODAL */}
      {isFormOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50 p-4">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsFormOpen(false)}
          ></div>

          {/* Form container */}
          <div className="relative z-10 w-full max-w-lg">
            <ExpenseForm
              expense={selectedExpense}
              userCategories={userCategories || []}
              onClose={() => setIsFormOpen(false)}
              onSubmit={async (formData: FormData) => {
                const method = selectedExpense ? "PUT" : "POST";
                const url = selectedExpense
                  ? `http://localhost:3000/api/expenses/${selectedExpense.id}`
                  : "http://localhost:3000/api/expenses";

                await fetch(url, { method, body: formData, credentials: "include" });
                fetchUserExpenses();
                setIsFormOpen(false);
              }}
            />
          </div>
        </div>
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
