import React, { useEffect, useState } from "react";
import { useUserStore } from "../../store/user";
import type { UserIncome } from "../../types/user";
import IncomeForm from "../Form/IncomeForm";
import ConfirmIncomeModal from "../Form/ConfirmIncomeModel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../Button/Button";
import { faEdit, faTrash, faPlus, faMoneyBillWave } from "@fortawesome/free-solid-svg-icons";
import { deleteIncomesById } from "../../utils/incomes";

const DashboardIncome: React.FC = () => {
  const { userIncomes, fetchUserIncomes } = useUserStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedIncome, setSelectedIncome] = useState<UserIncome | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await fetchUserIncomes();
      setIsLoading(false);
    };
    loadData();
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
      await deleteIncomesById(selectedIncome.id, fetchUserIncomes);
    }
    setIsConfirmOpen(false);
    setSelectedIncome(null);
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-MG', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount) + " Ar";
  };

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#059669] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading incomes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 primary-color rounded-full mb-4">
          <FontAwesomeIcon icon={faMoneyBillWave} className="text-3xl text-white" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          Income Management
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Track and manage all your income sources in one place
        </p>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
        <div>
          <h2 className="text-2xl font-spartan font-bold text-gray-800">Your Incomes</h2>
          <p className="text-gray-500 text-sm">
            {userIncomes?.length || 0} income source{userIncomes?.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Button
          text=""
          onClick={handleAdd}
          bg_color="secondary"
          size="lg"
          className="inline-flex items-center justify-center gap-2 hover:shadow-lg transform hover:scale-105 transition-all duration-200 min-w-[160px]"
        >
          <FontAwesomeIcon icon={faPlus} />
          Add New Income
        </Button>
      </div>


            {/* Incomes List */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* List Header */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <div className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-4 font-spartan font-semibold text-gray-700">Source</div>
            <div className="col-span-3 font-spartan font-semibold text-gray-700">Description</div>
            <div className="col-span-2 font-spartan font-semibold text-gray-700 text-right">Amount</div>
            <div className="col-span-2 font-spartan font-semibold text-gray-700">Date</div>
            <div className="col-span-1 font-spartan font-semibold text-gray-700 text-center">Actions</div>
          </div>
        </div>

        {/* List Content */}
        <div className="divide-y divide-gray-100">
          {userIncomes?.length ? (
            userIncomes.map((income) => (
              <div
                key={income.id}
                className="px-6 py-4 hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="grid grid-cols-12 gap-4 items-center">
                  {/* Source */}
                  <div className="col-span-4">
                    <h3 className="font-semibold text-gray-800 truncate">
                      {income.source}
                    </h3>
                  </div>

                  {/* Description */}
                  <div className="col-span-3">
                    <p className="text-gray text-sm truncate">
                      {income.description || "No description"}
                    </p>
                  </div>

                  {/* Amount */}
                  <div className="col-span-2">
                    <span className="text-lg font-bold text-green text-right block">
                      {formatCurrency(income.amount)}
                    </span>
                  </div>

                  {/* Date */}
                  <div className="col-span-2">
                    <span className="text-sm text-gray-500">
                      {new Date(income.date).toLocaleDateString('fr-FR')}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="col-span-1 flex justify-center space-x-2">
                    <Button
                      text=""
                      onClick={() => handleEdit(income)}
                      bg_color="secondary"
                      size="sm"
                      className="inline-flex items-center justify-center hover:bg-blue-50 transition-colors duration-200"
                    >
                      <FontAwesomeIcon icon={faEdit} className="text-sm" />
                    </Button>
                    <Button
                      text=""
                      onClick={() => handleDelete(income)}
                      bg_color="secondary"
                      size="sm"
                      className="inline-flex items-center justify-center hover:bg-red-50 transition-colors duration-200"
                    >
                      <FontAwesomeIcon icon={faTrash} className="text-sm" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon icon={faMoneyBillWave} className="text-3xl text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No incomes yet</h3>
              <p className="text-gray-500 mb-6">Start by adding your first income source</p>
              <Button
                onClick={handleAdd}
                text=""
                bg_color="secondary"
                size="lg"
                className="inline-flex items-center justify-center gap-2"
              >
                <FontAwesomeIcon icon={faPlus} />
                Add First Income
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Modal Form (Create / Edit) */}
      {isFormOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50 p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsFormOpen(false)}
          ></div>

          {/* Modal content */}
          <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl animate-scale-in">
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
        message="Are you sure you want to delete this income? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </div>
  );
};

export default DashboardIncome;
