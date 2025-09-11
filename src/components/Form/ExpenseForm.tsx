import React, { useState, useEffect } from "react";
import type { UserCategory, UserExpense } from "../../types/user";

interface ExpenseFormProps {
    onClose: () => void;
    onSubmit: (formData: FormData) => void;
    userCategories: UserCategory[];
    expense?: UserExpense | null; // <-- accepte null
  }
  
interface FormState {
  description: string;
  amount: string;
  type: boolean;
  date: string;
  startDate: string;
  endDate: string;
  categoryId: string;
  receipt: File | string | null;
  creationDate: Date;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({
  onClose,
  onSubmit,
  userCategories,
  expense,
}) => {
  const [formData, setFormData] = useState<FormState>({
    description: expense?.description || "",
    amount: expense?.amount?.toString() || "",
    type: expense?.type ?? false,
    date: expense?.date ? new Date(expense.date).toISOString().split("T")[0] : "",
    startDate: expense?.start_date
      ? new Date(expense.start_date).toISOString().split("T")[0]
      : "",
    endDate: expense?.end_date
      ? new Date(expense.end_date).toISOString().split("T")[0]
      : "",
    categoryId: expense?.category_id?.toString() || "",
    receipt: expense?.receipt || null,
    creationDate: expense?.creationDate || new Date(),
  });

  useEffect(() => {
    if (expense) {
      setFormData((prev) => ({
        ...prev,
        type: expense.type,
      }));
    }
  }, [expense]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "type"
          ? value === "true"
          : name === "receipt" && files
          ? files[0]
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("description", formData.description);
    formDataToSend.append("amount", formData.amount);
    formDataToSend.append("type", formData.type ? "true" : "false");
    formDataToSend.append("categoryId", formData.categoryId);

    if (!formData.type && formData.date) {
      formDataToSend.append("date", formData.date);
    }
    if (formData.type && formData.startDate) {
      formDataToSend.append("startDate", formData.startDate);
    }
    if (formData.type && formData.endDate) {
      formDataToSend.append("endDate", formData.endDate);
    }
    if (formData.receipt instanceof File) {
      formDataToSend.append("receipt", formData.receipt);
    }
    if (expense?.creationDate) {
      formDataToSend.append("creationDate", formData.creationDate.toISOString());
    }

    onSubmit(formDataToSend);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg w-[450px]">
      <h2 className="text-xl font-bold mb-4">{expense ? "Edit Expense" : "Add Expense"}</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Description */}
        <div>
          <label className="block mb-1 text-gray-700">Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
            required
          />
        </div>

        {/* Amount */}
        <div>
          <label className="block mb-1 text-gray-700">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 text-gray-700">Category</label>
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
            required
          >
            <option value="">-- Select a category --</option>
            {userCategories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Creation Date (read-only) */}
        {expense?.creationDate && (
          <div>
            <label className="block mb-1 text-gray-700">Creation Date</label>
            <input
              type="text"
              value={formData.creationDate.toLocaleDateString()}
              readOnly
              className="w-full border rounded-lg px-3 py-2 bg-gray-100 cursor-not-allowed"
            />
          </div>
        )}

        {/* Type */}
        <div>
          <label className="block mb-1 text-gray-700">Type</label>
          <select
            name="type"
            value={formData.type ? "true" : "false"}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
          >
            <option value="false">Ponctuelle</option>
            <option value="true">Récurrente</option>
          </select>
        </div>

        {/* Dates conditionnelles */}
        {formData.type ? (
          <>
            <div>
              <label className="block mb-1 text-gray-700">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700">End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
                required
              />
            </div>
          </>
        ) : (
          <div>
            <label className="block mb-1 text-gray-700">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
              required
            />
          </div>
        )}

        {/* Receipt */}
        <div>
          <label className="block mb-1 text-gray-700">Receipt (optional)</label>
          <input
            type="file"
            name="receipt"
            accept="image/*,.pdf"
            onChange={handleChange}
            className="w-full"
          />
          {formData.receipt && typeof formData.receipt === "string" && (
            <a
              href={formData.receipt}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline text-sm mt-1 inline-block"
            >
              View existing receipt
            </a>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-2 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {expense ? "Save" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
