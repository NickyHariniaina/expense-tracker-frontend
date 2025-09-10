import React, { useState, useEffect } from "react";
import { createCategory, renameCategory } from "../../utils/categories";
import type { UserCategory } from "../../types/user";
import Button from "../Button/Button";

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
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-[1px] bg-white/10">
  <div className="bg-white rounded-xl p-6 shadow-lg w-[90%] max-w-md mx-auto">
        <h2 className="text-4xl text-green text-center font-semibold mb-4">{category ? "Edit Category" : "Add Category"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter category name"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="flex justify-end space-x-2">
  <Button
    text="Cancel"
    onClick={onClose}
    bg_color="neutraly"
    size="md"
    className="hover:bg-gray-400"
  />

  <Button
    text={category ? "Save" : "Add"}
    type="submit"
    bg_color="secondary"
    size="md"
    className="hover:bg-blue-600"
  />
</div>

        </form>
      </div>
    </div>
  );
};

export default CategoryForm;



  