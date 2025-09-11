import React, { useEffect, useState } from "react";
import { useUserStore } from "../../store/user";
import type { UserCategory } from "../../types/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash, faFolder } from "@fortawesome/free-solid-svg-icons";
import CategoryForm from "../../components/Form/CategoryForm";
import { deleteCategory } from "../../utils/categories";
import toast from "react-hot-toast";
import Button from "../Button/Button";
import ConfirmModal from "../Form/ConfirmModal";

const DashboardCategories: React.FC = () => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<UserCategory | null>(null);

  const userCategories = useUserStore((state) => state.userCategories);
  const fetchUserCategories = useUserStore((state) => state.fetchUserCategories);

  useEffect(() => {
    fetchUserCategories();
  }, [fetchUserCategories]);

  const handleDelete = (id: number) => {
    setCategoryToDelete(id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (categoryToDelete !== null) {
      try {
        await deleteCategory(categoryToDelete);
        toast.success("Category deleted successfully!");
        fetchUserCategories();
      } catch {
        toast.error("Failed to delete category.");
      } finally {
        setIsConfirmOpen(false);
        setCategoryToDelete(null);
      }
    }
  };

  const handleEdit = (category?: UserCategory) => {
    setEditingCategory(category || null);
    setIsModalOpen(true);
  };

  const categories: UserCategory[] = userCategories || [];

  return (
    <div className="p-6 space-y-6 w-full">
      {/* Header */}
      <div className="primary-color rounded-2xl shadow-lg p-6 flex flex-col md:flex-row justify-between items-center text-white">
        <div>
          <h1 className="text-4xl font-bold font-spartan mb-2">Your Categories</h1>
          <p>Quick overview of all your categories and their stats</p>
        </div>
        <Button
          text=""
          onClick={() => handleEdit()}
          bg_color="secondary"
          size="lg"
          className="mt-4 md:mt-0 inline-flex items-center justify-center hover:scale-105 transition-all duration-200 shadow-lg"
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add Category
        </Button>
      </div>

      {/* Horizontal List / Table */}
      <div className="overflow-x-auto">
        <div className="min-w-[700px] bg-white/30 backdrop-blur-md rounded-xl shadow-lg p-4">
          <div className="flex justify-between font-semibold text-gray-700 border-b border-gray-200 pb-2 mb-4">
            <span className="w-1/4">Category Name</span>
            <span className="w-1/4 hidden md:block">Items Count</span>
            <span className="w-1/4 hidden md:block">Date Created</span>
            <span className="w-1/4 text-right">Actions</span>
          </div>

          {categories.length > 0 ? (
            categories.map((category) => (
              <div
                key={category.id}
                className="flex justify-between items-center py-2 px-3 mb-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition cursor-pointer"
              >
                <div className="flex items-center w-1/4 space-x-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <FontAwesomeIcon icon={faFolder} className="text-gray-600" />
                  </div>
                  <span className="font-medium truncate">{category.name}</span>
                </div>
                <span className="w-1/4 hidden md:block text-gray-700">{category.itemsCount || 0}</span>
                <span className="w-1/4 hidden md:block text-gray-500">
                  {new Date(category.createdAt).toLocaleDateString()}
                </span>
                <div className="w-1/4 flex justify-end space-x-2">
                  <Button
                    text=""
                    onClick={() => handleEdit(category)}
                    bg_color="secondary"
                    size="sm"
                    className="flex items-center justify-center w-8 h-8 p-0"
                  >
                    <FontAwesomeIcon icon={faEdit} className="text-sm" />
                  </Button>
                  <Button
                    text=""
                    onClick={() => handleDelete(category.id)}
                    bg_color="terty"
                    size="sm"
                    className="flex items-center justify-center w-8 h-8 p-0"
                  >
                    <FontAwesomeIcon icon={faTrash} className="text-sm" />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <FontAwesomeIcon icon={faFolder} className="text-4xl mb-3" />
              <p>No categories found. Start by creating one!</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <CategoryForm
          category={editingCategory}
          onClose={() => setIsModalOpen(false)}
          afterSubmit={fetchUserCategories}
        />
      )}

      {/* Confirm Delete */}
      <ConfirmModal
        isOpen={isConfirmOpen}
        message="Are you sure you want to delete this category?"
        onConfirm={confirmDelete}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </div>
  );
};

export default DashboardCategories;
