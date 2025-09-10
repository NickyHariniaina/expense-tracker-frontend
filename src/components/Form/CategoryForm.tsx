import React, { useState, useEffect } from "react";
import { createCategory, renameCategory } from "../../utils/categories";
import type { UserCategory } from "../../types/user";

interface CategoryFormProps {
  category: UserCategory | null; // <-- ajouté
  onClose: () => void;
  afterSubmit: () => Promise<void>;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ category, onClose, afterSubmit }) => {
  const [name, setName] = useState(category?.name || "");

  useEffect(() => {
    setName(category?.name || "");
  }, [category]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      if (category) {
        await renameCategory(category.id, name);
      } else {
        await createCategory(name);
      }
      await afterSubmit();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">{category ? "Edit Category" : "Add Category"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter category name"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">{category ? "Save" : "Add"}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;



  