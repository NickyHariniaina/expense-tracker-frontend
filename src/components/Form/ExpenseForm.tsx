import React, { useState, useEffect } from "react";
import type { UserCategory, UserExpense } from "../../types/user";

interface ExpenseFormProps {
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
  userCategories: UserCategory[];
  expense?: UserExpense | null;
}

interface FormState {
  description: string;
  amount: string;
  type: boolean;
  date: string;
  start_date: string;
  end_date: string;
  categoryId: string;
  receipt: string | File | null;
  creation_date: Date;
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
    start_date: expense?.start_date
      ? new Date(expense.start_date).toISOString().split("T")[0]
      : "",
    end_date: expense?.end_date
      ? new Date(expense.end_date).toISOString().split("T")[0]
      : "",
    categoryId: expense?.category_id?.toString() || "",
    receipt: expense?.receipt || null,
    creation_date: expense?.creation_date ? new Date(expense.creation_date) : new Date(),
  });

  useEffect(() => {
    if (expense) {
      setFormData((prev) => ({
        ...prev,
        description: expense.description || "",
        amount: expense.amount?.toString() || "",
        type: expense.type ?? false,
        date: expense.date ? new Date(expense.date).toISOString().split("T")[0] : "",
        start_date: expense.start_date ? new Date(expense.start_date).toISOString().split("T")[0] : "",
        end_date: expense.end_date ? new Date(expense.end_date).toISOString().split("T")[0] : "",
        categoryId: expense.category_id?.toString() || "",
        receipt: expense.receipt || null,
        creation_date: expense.creation_date ? new Date(expense.creation_date) : new Date(),
      }));
    } else if (!formData.type) {
      setFormData((prev) => ({
        ...prev,
        start_date: "",
        end_date: "",
      }));
    }
    const creationDateValue = expense?.creation_date;
    console.log("Expense prop:", expense);
    console.log("Initial creation_date:", creationDateValue, "Converted:", creationDateValue ? new Date(creationDateValue) : "N/A");
  }, [expense, formData.type]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]:
          name === "type"
            ? value === "true"
            : name === "receipt" && files && files[0]
            ? files[0]
            : value,
      };
      if (name === "type") {
        if (value === "false") {
          updated.start_date = "";
          updated.end_date = "";
        } else if (value === "true" && !expense) {
          updated.date = "";
        }
      }
      return updated;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    if (!formData.description.trim()) {
      alert("Description is required.");
      return;
    }
    if (!formData.amount || Number(formData.amount) <= 0) {
      alert("Amount must be greater than zero.");
      return;
    }
    if (!formData.categoryId) {
      alert("Category is required.");
      return;
    }

    if (formData.type) {
      if (!formData.start_date) {
        alert("Start date is required for recurring expenses.");
        return;
      }
      formDataToSend.append("start_date", formData.start_date);
      if (formData.end_date) formDataToSend.append("end_date", formData.end_date);
    } else {
      if (!formData.date) {
        alert("Date is required for onetime expenses.");
        return;
      }
      formDataToSend.append("date", formData.date);
    }

    formDataToSend.append("description", formData.description);
    formDataToSend.append("amount", formData.amount);
    formDataToSend.append("type", formData.type.toString());
    formDataToSend.append("categoryId", formData.categoryId);
    if (formData.receipt instanceof File) {
      formDataToSend.append("receipt", formData.receipt);
    }
    // Supprimer la condition sur creation_date pour la soumission
    formDataToSend.append("creation_date", formData.creation_date.toISOString());

    onSubmit(formDataToSend);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-lg transition-all duration-300">
      <h2 className="text-2xl font-semibold mb-6 text-red text-center">
        {expense ? "Edit Expense" : "Add Expense"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="description" className="block mb-1.5 text-xl font-bold text-gray-700">
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
            required
            aria-required="true"
          />
        </div>
        <div>
          <label htmlFor="amount" className="block mb-1.5 text-xl font-bold text-gray-700">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
            min="0"
            step="0.01"
            required
            aria-required="true"
          />
        </div>
        <div>
          <label htmlFor="categoryId" className="block mb-1.5 text-xl font-bold text-gray-700">
            Category
          </label>
          <select
            id="categoryId"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
            required
            aria-required="true"
          >
            <option value="">-- Select a category --</option>
            {userCategories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="creation_date" className="block mb-1.5 text-xl font-bold text-gray-700">
            Creation Date
          </label>
          <input
            type="text"
            id="creation_date"
            value={formData.creation_date.toLocaleDateString()}
            readOnly
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-gray-100 cursor-not-allowed"
          />
        </div>
        <div>
          <label htmlFor="type" className="block mb-1.5 text-xl font-bold text-gray-700">
            Type
          </label>
          <select
            id="type"
            name="type"
            value={formData.type ? "true" : "false"}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
          >
            <option value="false">Ponctuelle</option>
            <option value="true">Récurrente</option>
          </select>
        </div>
        {formData.type ? (
          <>
            <div>
              <label htmlFor="start_date" className="block mb-1.5 text-xl font-bold text-gray-700">
                Start Date
              </label>
              <input
                type="date"
                id="start_date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
                required
              />
            </div>
            <div>
              <label htmlFor="end_date" className="block mb-1.5 text-xl font-bold text-gray-700">
                End Date (Optional)
              </label>
              <input
                type="date"
                id="end_date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
              />
            </div>
          </>
        ) : (
          <div>
            <label htmlFor="date" className="block mb-1.5 text-xl font-bold text-gray-700">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
              required
            />
          </div>
        )}
        <div>
          <label htmlFor="receipt" className="block mb-1.5 text-xl font-bold text-gray-700">
            Receipt (Optional)
          </label>
          <input
            type="file"
            id="receipt"
            name="receipt"
            accept="image/*,.pdf"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
          />
          {typeof formData.receipt === "string" && formData.receipt && (
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
            className="px-5 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {expense ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;