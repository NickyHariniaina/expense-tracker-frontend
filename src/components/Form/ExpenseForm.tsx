import React, { useState, useEffect } from "react";
import { createExpense } from "../../utils/expenses";
import { fetchCategories } from "../../utils/categories";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button/Button";

interface Category {
  id: number;
  name: string;
}

const ExpenseForm: React.FC = () => {
  const [amount, setAmount] = useState<string>("");
  const [date, setDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [description, setDescription] = useState<string>("");
  const [type, setType] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [receipt, setReceipt] = useState<File | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data: Category[] = await fetchCategories();
        setCategories(data);
      } catch {
        setError("Error fetching categories");
      }
    };
    loadCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Vérification des champs requis
    if (!amount || !categoryId || (type === false && !date) || (type === true && (!startDate || !endDate))) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      await createExpense(
        amount,
        Number(categoryId),
        description || null,
        type,
        type ? null : new Date(date), // one-time expense
        type ? new Date(startDate) : null, // recurring start
        type ? new Date(endDate) : null, // recurring end
        receipt
      );

      setSuccess("Expense created successfully!");
      // Reset form
      setAmount("");
      setDate(new Date().toISOString().split("T")[0]);
      setCategoryId("");
      setDescription("");
      setType(false);
      setStartDate("");
      setEndDate("");
      setReceipt(null);
    } catch (e) {
      setError("Failed to create expense");
      console.error(e);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setReceipt(file);
  };

  return (
    <div className="max-w-md mx-auto p-6 justify-center items-center bg-white shadow-md shadow-gray-600 rounded-lg">
      <h2 className="text-4xl font-spartan text-red text-center font-bold mb-4">Create New Expense</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green mb-4">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="amount" className="block text-green text-md font-bold">Amount *</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 w-full p-2 border rounded"
            required
            step="1000"
            min="0"
          />
        </div>

        {!type && (
          <div>
            <label htmlFor="date" className="block text-green text-md font-bold">Date *</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 w-full p-2 border rounded"
              required
            />
          </div>
        )}

        <div>
          <label htmlFor="category" className="block text-green text-md font-bold">Category *</label>
          <select
            id="category"
            value={categoryId}
            onChange={(e) => setCategoryId(Number(e.target.value))}
            className="mt-1 w-full p-2 border rounded"
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="description" className="block text-green text-md font-bold">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 w-full p-2 border rounded"
          />
        </div>

        <div>
          <label htmlFor="type" className="block text-green text-md font-bold">Type *</label>
          <select
            id="type"
            value={type ? "true" : "false"}
            onChange={(e) => setType(e.target.value === "true")}
            className="mt-1 w-full p-2 border rounded"
            required
          >
            <div className="text-blue font-bold text-xl">
            <option value="false">One-time</option>
            <option value="true">Recurring</option>
            </div>
          </select>
        </div>

        {type && (
          <>
            <div>
              <label htmlFor="startDate" className="block text-green text-md font-bold">Start Date *</label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-1 w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label htmlFor="endDate" className="block text-green text-md font-bold">End Date *</label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-1 w-full p-2 border rounded"
                required
              />
            </div>
          </>
        )}

<div>
  <label htmlFor="receipt" className="block text-green text-md font-bold">Receipt</label>
  <label 
    htmlFor="receipt"
    className="mt-1 w-full p-2 border rounded flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100"
  >
    <FontAwesomeIcon icon={faUpload} className="mr-2 text-gray" />
    {receipt ? receipt.name : "Upload file"}
    <input
      type="file"
      id="receipt"
      onChange={handleFileChange}
      className="hidden"
      accept="image/*,application/pdf"
    />
  </label>
</div>
<div className="flex items-center justify-center ">
<Button
  text="Submit Expense"
  type="submit"
  size="md"
  bg_color="secondary"
  className="w-1/2"
/>
</div>
      </form>
    </div>
  );
};

export default ExpenseForm;
