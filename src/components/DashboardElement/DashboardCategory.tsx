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

// gradient color
const gradientColors = [
  "from-[#0EA5E9]/30 to-[#0EA5E9]/60",
  "from-[#EF4444]/30 to-[#EF4444]/60",
  "from-[#059669]/30 to-[#059669]/60",
  "from-[#FACC15]/30 to-[#FACC15]/60",
  "from-[#8B5CF6]/30 to-[#8B5CF6]/60",
];


const DashboardCategories: React.FC = () => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null);
  const userCategories = useUserStore((state) => state.userCategories);
  const fetchUserCategories = useUserStore((state) => state.fetchUserCategories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<UserCategory | null>(null);

  useEffect(() => {
    fetchUserCategories();
  }, [fetchUserCategories]);

  const requestDelete = (id: number) => {
    setCategoryToDelete(id);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (categoryToDelete !== null) {
      try {
        await deleteCategory(categoryToDelete);
        toast.success("Category deleted successfully!");
        await fetchUserCategories();
      } catch (error) {
        console.error(error);
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
    <div className="w-full p-6">
      {/* Banner */}
      <div className="primary-color rounded-2xl shadow-lg p-8 mb-8 text-white">
        <h1 className="text-5xl font-bold text-white font-spartan text-center mb-2">
          Your Categories
        </h1>
        <p className="text-center mb-6">
          Organize your content with custom categories
        </p>
        <div className="text-center">
          <Button
            text=""
            onClick={() => handleEdit()}
            bg_color="secondary"
            size="lg"
            className="inline-flex items-center justify-center hover:bg-blue-50 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Add New Category
          </Button>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="categories-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <div
              key={category.id}
              className={`p-4 rounded-2xl backdrop-blur-md bg-gradient-to-r ${gradientColors[index % gradientColors.length]} shadow-md hover:shadow-lg hover:scale-105 transform transition-all duration-300 flex flex-col justify-between`}
            >
              {/* Header: Icon + Name */}
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center space-x-2 overflow-hidden">
                  <div className="bg-white/30 backdrop-blur-sm p-2 rounded-full flex-shrink-0">
                    <FontAwesomeIcon icon={faFolder} className="text-white text-lg" />
                  </div>
                  <h3 className="text-white font-semibold text-base truncate max-w-[100px] sm:max-w-[120px]">
                    {category.name}
                  </h3>
                </div>

                {/* Edit/Delete */}
                <div className="flex space-x-1 flex-shrink-0">
                  <Button
                    text=""
                    onClick={() => handleEdit(category)}
                    bg_color="secondary"
                    size="sm"
                    className="flex items-center justify-center w-7 h-7 p-0"
                  >
                    <FontAwesomeIcon icon={faEdit} className="text-xs text-white" />
                  </Button>
                  <Button
                    text=""
                    onClick={() => requestDelete(category.id)}
                    bg_color="terty"
                    size="sm"
                    className="flex items-center justify-center w-7 h-7 p-0"
                  >
                    <FontAwesomeIcon icon={faTrash} className="text-xs text-white" />
                  </Button>
                </div>
              </div>

              {/* Footer: Mini-stats */}
              <div className="flex justify-between mt-2 text-xs text-white">
                <span>Created: {new Date().toLocaleDateString()}</span>
              </div>
            </div>
          ))
        ) : (
          // Empty State
          <div className="col-span-full text-center py-12">
            <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
              <FontAwesomeIcon icon={faFolder} className="text-gray text-3xl" />
            </div>
            <h3 className="text-xl font-semibold text-red mb-2">
              No Categories Yet
            </h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Get started by creating your first category to organize your content effectively.
            </p>
            <Button
              text="Create Your First Category"
              onClick={() => handleEdit()}
              bg_color="primary"
              size="lg"
              className="inline-flex items-center justify-center"
            >
              <FontAwesomeIcon icon={faPlus} className="ml-2" />
            </Button>
          </div>
        )}
      </div>

      {/* Modals */}
      {isModalOpen && (
        <CategoryForm
          category={editingCategory}
          onClose={() => setIsModalOpen(false)}
          afterSubmit={() => fetchUserCategories()}
        />
      )}
      <ConfirmModal
        isOpen={isConfirmOpen}
        message="Are you sure you want to delete this category?"
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </div>
  );
};

export default DashboardCategories;
