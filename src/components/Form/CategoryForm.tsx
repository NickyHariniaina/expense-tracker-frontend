import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { createCategory } from "../../utils/categories";
import { renameCategory } from "../../utils/categories";
import { deleteCategory } from "../../utils/categories";
import type { UserCategory } from "../../types/user";
import { useUserStore } from "../../store/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const CategoriesPage: React.FC = () => {
  const { userCategories, fetchUserCategories } = useUserStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editingCategory, setEditingCategory] = useState<UserCategory | null>(null);

  useEffect(() => {
    fetchUserCategories();
  }, [fetchUserCategories]);

  // Ajouter ou renommer une catégorie
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) {
      toast.error("Category name is required");
      return;
    }

    if (editingCategory) {
      await renameCategory(editingCategory.id, newCategoryName);
    } else {
      await createCategory(newCategoryName);
    }

    setNewCategoryName("");
    setEditingCategory(null);
    setIsModalOpen(false);
    await fetchUserCategories();
  };

  // Supprimer une catégorie
  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      await deleteCategory(id);
      await fetchUserCategories();
    }
  };

  // Ouvrir le modal pour renommer
  const handleEdit = (category: UserCategory) => {
    setEditingCategory(category);
    setNewCategoryName(category.name);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
    setNewCategoryName("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 relative">
      {/* Fond flou lorsque le modal est ouvert */}
      <div className={isModalOpen ? "filter blur-sm pointer-events-none" : ""}>
        <h1 className="text-3xl font-bold mb-6 text-center">Your Categories</h1>

        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-4 mb-4">
          {userCategories && userCategories.length > 0 ? (
            <ul className="space-y-2">
              {userCategories.map((category: UserCategory) => (
                <li
                  key={category.id}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded"
                >
                  <span>{category.name}</span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(category)}
                      className="text-blue-500 hover:text-blue-700"
                      title="Rename"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="text-red-500 hover:text-red-700"
                      title="Delete"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center">No categories found.</p>
          )}
        </div>

        <div className="text-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add New Category
          </button>
        </div>
      </div>

      {/* Modal pour ajouter ou renommer */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              {editingCategory ? "Rename Category" : "Add New Category"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="categoryName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category Name
                </label>
                <input
                  type="text"
                  id="categoryName"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter category name"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  {editingCategory ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
