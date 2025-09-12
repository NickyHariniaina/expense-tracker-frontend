import React, { useState } from "react";
import type { UserIncome } from "../../types/user";
import { createIncome, updateIncome } from "../../utils/incomes";

interface IncomeFormProps {
  income?: UserIncome | null;
  onClose: () => void;
  afterSubmit: () => void;
}

const IncomeForm: React.FC<IncomeFormProps> = ({ income, onClose, afterSubmit }) => {
  const [formData, setFormData] = useState({
    source: income?.source || "",
    amount: income?.amount?.toString() || "",
    date: income?.date
      ? new Date(income.date).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
    description: income?.description || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const amount = Number(formData.amount);
    const date = new Date(formData.date);

    if (income) {
      await updateIncome(
        income.id,
        amount,
        date,
        formData.source,
        formData.description,
        afterSubmit // <--- rafraîchit le dashboard
      );
    } else {
      await createIncome(
        amount,
        date,
        formData.source,
        formData.description,
        afterSubmit // <--- rafraîchit le dashboard
      );
    }
    onClose();
  };


  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg transition-all duration-300">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        {income ? "Edit Income" : "Add Income"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="source" className="block mb-1.5 text-sm font-medium text-gray-700">
            Source
          </label>
          <input
            type="text"
            id="source"
            name="source"
            value={formData.source}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
            placeholder="e.g., Salary, Freelance"
            required
            aria-required="true"
          />
        </div>
        <div>
          <label htmlFor="amount" className="block mb-1.5 text-sm font-medium text-gray-700">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
            placeholder="e.g., 1000"
            min="0"
            step="0.01"
            required
            aria-required="true"
          />
          {/* Added min and step for better number input control */}
        </div>
        <div>
          <label htmlFor="date" className="block mb-1.5 text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green transition-colors"
            required
            aria-required="true"
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-1.5 text-sm font-medium text-gray-700">
            Description (Optional)
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green transition-colors resize-y"
            placeholder="e.g., Monthly salary from job"
          />
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 bg-green text-white rounded-lg hover:bg-green transition-colors focus:outline-none focus:ring-2 focus:ring-green"
          >
            {income ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default IncomeForm;
