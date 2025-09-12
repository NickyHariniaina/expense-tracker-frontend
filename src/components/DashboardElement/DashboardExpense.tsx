import React, { useEffect, useState } from "react";
import { useUserStore } from "../../store/user";
import type { UserExpense, UserCategory } from "../../types/user";
import ExpenseForm from "../../components/Form/ExpenseForm";
import ConfirmModal from "../Form/DeleteExpenseConfirm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileInvoice,
  faCalendarAlt,
  faTags,
  faReceipt,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../Button/Button";
import {
  createExpense,
  updateExpense,
  deleteExpenseById,
} from "../../utils/expenses";

const DashboardExpense: React.FC = () => {
  const {
    userExpenses,
    fetchUserExpenses,
    userCategories,
    fetchUserCategories,
  } = useUserStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<UserExpense | undefined>(
    undefined
  );

  useEffect(() => {
    fetchUserExpenses();
    fetchUserCategories();
  }, [fetchUserExpenses, fetchUserCategories]);

  useEffect(() => {
    // Bloquer le défilement quand la popup est ouverte
    if (isFormOpen || isConfirmOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    // Nettoyer l'effet au démontage
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isFormOpen, isConfirmOpen]);

  const handleAdd = () => {
    console.log("Opening add expense form");
    setSelectedExpense(undefined);
    setIsFormOpen(true);
  };

  const handleEdit = (expense: UserExpense) => {
    console.log("Editing expense:", expense);
    setSelectedExpense(expense);
    setIsFormOpen(true);
  };

  const handleDelete = (expense: UserExpense) => {
    console.log("Preparing to delete expense:", expense);
    setSelectedExpense(expense);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedExpense) return;
    try {
      await deleteExpenseById(selectedExpense.id);
      fetchUserExpenses();
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setIsConfirmOpen(false);
    }
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

  const renderTableHeader = () => (
    <div className="grid grid-cols-8 gap-2 p-3 rounded-lg font-bold text-white bg-gradient-to-r from-[#0EA5E9]/20 to-[#059669]/20 backdrop-blur-md">
      <span className="flex items-center gap-1">
        <FontAwesomeIcon icon={faFileInvoice} /> Description
      </span>
      <span className={`flex items-center gap-1 ${columnColors[1]}`}>
        <FontAwesomeIcon icon={faFileInvoice} /> Amount
      </span>
      <span className={`flex items-center gap-1 ${columnColors[2]}`}>
        <FontAwesomeIcon icon={faTags} /> Type
      </span>
      <span className={`flex items-center gap-1 ${columnColors[3]}`}>
        <FontAwesomeIcon icon={faCalendarAlt} /> Date(s)
      </span>
      <span className={`flex items-center gap-1 ${columnColors[4]}`}>
        <FontAwesomeIcon icon={faTags} /> Category
      </span>
      <span className={`flex items-center gap-1 ${columnColors[5]}`}>
        <FontAwesomeIcon icon={faCalendarAlt} /> Created At
      </span>
      <span className={`flex items-center gap-1 ${columnColors[6]}`}>
        <FontAwesomeIcon icon={faReceipt} /> Receipt
      </span>
      <span className={`flex items-center gap-1 ${columnColors[7]}`}>
        <FontAwesomeIcon icon={faEdit} /> Actions
      </span>
    </div>
  );

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      console.log("Closing form by clicking outside");
      setIsFormOpen(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-4xl font-spartan font-bold text-gray-800 mb-4 md:mb-0">
          Expenses
        </h2>
        <Button
          text="+ Add Expense"
          onClick={(e) => {
            e.preventDefault();
            handleAdd();
          }}
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
            <div className="p-2 border rounded font-semibold text-green-700">
              {expense.amount} Ar
            </div>
            <div className="p-2 border rounded">
              {expense.type ? "Recurring" : "Onetime"}
            </div>
            <div className="p-2 border rounded">
              {expense.type
                ? `${formatDate(expense.start_date)} → ${formatDate(
                    expense.end_date
                  )}`
                : formatDate(expense.date)}
            </div>
            <div className="p-2 border rounded">
              {userCategories?.find(
                (cat: UserCategory) => cat.id === expense.category_id
              )?.name || "—"}
            </div>
            <div className="p-2 border rounded">
              {formatDate(expense.creation_date)}
            </div>
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
              <Button
                text=""
                onClick={(e) => {
                  e.preventDefault();
                  handleEdit(expense);
                }}
                bg_color="secondary"
                size="sm"
              >
                <FontAwesomeIcon icon={faEdit} />
              </Button>
              <Button
                text=""
                onClick={(e) => {
                  e.preventDefault();
                  handleDelete(expense);
                }}
                bg_color="terty"
                size="sm"
              >
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
        <div
          className="fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out opacity-0 animate-fadeIn"
          onClick={handleOverlayClick}
        >
          <div className="bg-white p-6 rounded-xl shadow-lg w-[450px] relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => {
                console.log("Closing form via close button");
                setIsFormOpen(false);
              }}
            >
              ×
            </button>
            <ExpenseForm
              expense={selectedExpense}
              userCategories={userCategories || []}
              onClose={() => {
                console.log("Closing form via onClose");
                setIsFormOpen(false);
              }}
              onSubmit={async (formData: FormData) => {
                try {
                  console.log("Submitting form data:", [...formData]);
                  if (selectedExpense) {
                    await updateExpense(
                      selectedExpense.id,
                      formData.get("amount") as string,
                      formData.get("date") as string | null,
                      parseInt(formData.get("categoryId") as string),
                      formData.get("description") as string | null,
                      formData.get("type") === "true",
                      formData.get("start_date") as string | null,
                      formData.get("end_date") as string | null,
                      formData.get("receipt") as File | null
                    );
                  } else {
                    await createExpense(
                      formData.get("amount") as string,
                      formData.get("date") as string | null,
                      parseInt(formData.get("categoryId") as string),
                      formData.get("description") as string | null,
                      formData.get("type") === "true",
                      formData.get("start_date") as string | null,
                      formData.get("end_date") as string | null,
                      formData.get("receipt") as File | null
                    );
                  }
                  await fetchUserExpenses();
                  setIsFormOpen(false);
                } catch (error) {
                  console.error("Submission failed:", error);
                }
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
        onCancel={() => {
          console.log("Canceling delete");
          setIsConfirmOpen(false);
        }}
      />
    </div>
  );
};

export default DashboardExpense;