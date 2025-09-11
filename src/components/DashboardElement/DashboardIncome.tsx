import React, { useEffect, useState } from "react";
import { useUserStore } from "../../store/user";
import type { UserIncome } from "../../types/user";
import IncomeForm from "../Form/IncomeForm";
import ConfirmIncomeModal from "../Form/ConfirmIncomeModel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../Button/Button";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { deleteIncomesById } from "../../utils/incomes";

const DashboardIncome: React.FC = () => {
  const { userIncomes, fetchUserIncomes } = useUserStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedIncome, setSelectedIncome] = useState<UserIncome | null>(null);

  // ⚡ Récupération initiale des incomes
  useEffect(() => {
    fetchUserIncomes();
  }, [fetchUserIncomes]);

  const handleAdd = () => {
    setSelectedIncome(null);
    setIsFormOpen(true);
  };

  const handleEdit = (income: UserIncome) => {
    setSelectedIncome(income);
    setIsFormOpen(true);
  };

  const handleDelete = (income: UserIncome) => {
    setSelectedIncome(income);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedIncome) {
      // ⚡ On passe l'id de l'income directement
      await deleteIncomesById(selectedIncome.id, fetchUserIncomes);
    }
    setIsConfirmOpen(false);
    setSelectedIncome(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-center text-green text-4xl font-bold mb-6">
        Welcome to your income manage
      </h1>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl text-red font-bold">Incomes</h2>
        <Button
          text=""
          onClick={handleAdd}
          bg_color="secondary"
          size="lg"
          className="inline-flex items-center justify-center hover:bg-blue-50 transform hover:scale-105 transition-all duration-200 shadow-lg"
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add New Income
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {userIncomes?.length ? (
          userIncomes.map((income) => (
            <div
              key={income.id}
              className="bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <h3 className="font-semibold text-lg mb-2">{income.source}</h3>
              <p className="text-gray-600 mb-1">{income.description}</p>
              <p className="font-bold mb-1">{income.amount} Ar</p>
              <p className="text-sm text-gray-500">
                {new Date(income.date).toLocaleDateString()}
              </p>

              <div className="flex justify-end space-x-2 mt-3">
                <Button
                  text=""
                  onClick={() => handleEdit(income)}
                  bg_color="secondary"
                  size="lg"
                  className="inline-flex items-center justify-center hover:bg-blue-50 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  <FontAwesomeIcon icon={faEdit} className="mr-2" />
                </Button>
                <button
                  onClick={() => handleDelete(income)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No incomes found.
          </p>
        )}
      </div>

      {/* Modal Form (Create / Edit) */}
      {isFormOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsFormOpen(false)}
          ></div>

          {/* Modal content */}
          <div className="relative z-10 w-full max-w-md">
            <IncomeForm
              income={selectedIncome}
              onClose={() => setIsFormOpen(false)}
              afterSubmit={fetchUserIncomes}
            />
          </div>
        </div>
      )}

      {/* Confirm Delete Modal */}
      <ConfirmIncomeModal
        isOpen={isConfirmOpen}
        message="Are you sure you want to delete this income?"
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </div>
  );
};

export default DashboardIncome;
