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
    creation_date: Date; // Changé de creationDate à creation_date
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
        creation_date: expense?.creation_date || new Date(), // Ajusté pour utiliser creation_date, mais conversion depuis creationDate si existant
    });

    useEffect(() => {
        if (expense) {
            setFormData((prev) => ({
                ...prev,
                type: expense.type,
            }));
        } else if (!formData.type) {
            setFormData((prev) => ({
                ...prev,
                start_date: "",
                end_date: "",
            }));
        }
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
        if (expense?.creation_date) {
            formDataToSend.append("creation_date", formData.creation_date.toISOString()); // Ajusté pour creation_date
        }

        onSubmit(formDataToSend);
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg w-[450px]">
            <h2 className="text-2xl text-blue text-center font-bold mb-4">{expense ? "Edit Expense" : "Add Expense"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-bold text-xl text-gray">Description</label>
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-bold text-xl text-gray">Amount</label>
                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
                        min="0"
                        step="0.01"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-bold text-xl text-gray">Category</label>
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
                {expense?.creation_date && (
                    <div>
                        <label className="block mb-1 font-bold text-xl text-gray">Creation Date</label>
                        <input
                            type="text"
                            value={formData.creation_date.toLocaleDateString()} // Ajusté pour creation_date
                            readOnly
                            className="w-full border rounded-lg px-3 py-2 bg-gray-100 cursor-not-allowed"
                        />
                    </div>
                )}
                <div>
                    <label className="block mb-1 font-bold text-xl text-gray">Type</label>
                    <select
                        name="type"
                        value={formData.type ? "true" : "false"}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
                    >
                        <option value="false">Ontime</option>
                        <option value="true">Reccuring</option>
                    </select>
                </div>
                {formData.type ? (
                    <>
                        <div>
                            <label className="block mb-1 font-bold text-xl text-gray">Start Date</label>
                            <input
                                type="date"
                                name="start_date"
                                value={formData.start_date}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-bold text-xl text-gray">End Date (Optional)</label>
                            <input
                                type="date"
                                name="end_date"
                                value={formData.end_date}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
                            />
                        </div>
                    </>
                ) : (
                    <div>
                        <label className="block mb-1 font-bold text-xl text-gray">Date</label>
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
                <div>
                    <div>
                        <label className="block mb-2 font-bold text-xl text-gray">Receipt (optional)</label>
                        <label className=" px-4 py-2 secondary-color text-white rounded cursor-pointer hover:bg-blue-600">
                            Upload Receipt
                            <input
                                type="file"
                                name="receipt"
                                accept="image/*,.pdf"
                                onChange={handleChange}
                                className="hidden"
                            />
                        </label>
                        {typeof formData.receipt === "string" && formData.receipt && (
                            <p className="text-sm text-gray-500 mt-1">File already uploaded</p>
                        )}
                    </div>

                </div>
                <div className="flex justify-end space-x-2 pt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 neutraly-color text-white rounded hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded primary-color"
                    >
                        {expense ? "Save" : "Add"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ExpenseForm;