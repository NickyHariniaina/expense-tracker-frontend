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
    amount: income?.amount?.toString() || "", // stocké comme string pour l’input
    date: income?.date
      ? new Date(income.date).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0], // date du jour par défaut
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
    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">
        {income ? "Edit Income" : "Add Income"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Source</label>
          <input
            type="text"
            name="source"
            value={formData.source}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            {income ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default IncomeForm;
