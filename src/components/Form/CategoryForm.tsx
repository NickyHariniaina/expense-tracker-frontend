
import React, { useState, useEffect } from "react";
import {
  createCategory,
  fetchCategories,
  renameCategory,
  deleteCategory,
} from "../../utils/categories";
import type { UserCategory } from "../../types/user";
import Button from "../Button/Button";

const CategoryForm: React.FC = () => {
  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState<UserCategory[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const data = await fetchCategories();
    setCategories(data);
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.trim()) {
      setMessage({ type: "error", text: "Category name is required" });
      return;
    }
    try {
      await createCategory(newCategory);
      setMessage({ type: "success", text: "Category added successfully!" });
      setNewCategory("");
      loadCategories();
      setIsModalOpen(false); // Close modal on success
    } catch {
      setMessage({ type: "error", text: "Failed to create category" });
    }
  };

  const handleRename = async (id: number) => {
    if (!editName.trim()) {
      setMessage({ type: "error", text: "Category name cannot be empty" });
      return;
    }
    try {
      await renameCategory(id, editName);
      setMessage({ type: "success", text: "Category renamed successfully!" });
      setEditId(null);
      setEditName("");
      loadCategories();
    } catch {
      setMessage({ type: "error", text: "Failed to rename category" });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteCategory(id);
      setMessage({ type: "success", text: "Category deleted successfully!" });
      loadCategories();
    } catch {
      setMessage({ type: "error", text: "Failed to delete category" });
    }
  };

  return (
    <div className="w-1/5 mx-auto mt-8 p-6 bg-white shadow-lg font-spartan shadow-gray-300 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center font-spartan text-green">
        Manage Categories
      </h2>

      {message && (
        <p
          className={`mb-2 text-sm ${
            message.type === "error" ? "text-red-500" : "text-green-600"
          }`}
        >
          {message.text}
        </p>
      )}

      {/* Add New Category Button */}
      <Button
        text="Add New Category"
        onClick={() => setIsModalOpen(true)}
        bg_color="secondary"
        size="md"
        className="mb-6 w-full"
      />

      {/* Category List */}
      <ul className="space-y-2">
        {categories.map((cat) => (
          <li key={cat.id} className="flex items-center justify-between">
            {editId === cat.id ? (
              <div className="flex items-center space-x-2 flex-grow">
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="border border-gray-300 p-2 rounded-md flex-grow"
                />
                <Button
                  text="Save"
                  onClick={() => handleRename(cat.id)}
                  bg_color="primary"
                  size="sm"
                />
                <Button
                  text="Cancel"
                  onClick={() => setEditId(null)}
                  bg_color="neutraly"
                  size="sm"
                />
              </div>
            ) : (
              <>
                <span className="flex-grow">{cat.name}</span>
                <div className="flex space-x-2">
                  <Button
                    text="Edit"
                    onClick={() => {
                      setEditId(cat.id);
                      setEditName(cat.name);
                    }}
                    bg_color="terty"
                    size="sm"
                  />
                  <Button
                    text="Delete"
                    onClick={() => handleDelete(cat.id)}
                    bg_color="primary"
                    size="sm"
                    className="bg-red-600 hover:bg-red-700"
                  />
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      {/* Modal for Adding New Category */}
      {isModalOpen && (
        <div className="fixed inset-0 primary-color bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 font-spartan text-green">
              Add New Category
            </h3>
            <form onSubmit={handleAddCategory} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="New category name"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="border border-gray-300 p-2 rounded-md w-full"
                />
              </div>
              {message && (
                <p
                  className={`text-sm ${
                    message.type === "error" ? "text-red-500" : "text-green-600"
                  }`}
                >
                  {message.text}
                </p>
              )}
              <div className="flex space-x-2">
                <Button
                  text="Add Category"
                  type="submit"
                  bg_color="secondary"
                  size="md"
                  className="flex-grow"
                />
                <Button
                  text="Cancel"
                  onClick={() => {
                    setIsModalOpen(false);
                    setNewCategory("");
                    setMessage(null);
                  }}
                  bg_color="neutraly"
                  size="md"
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryForm;