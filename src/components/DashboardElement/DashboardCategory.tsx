import React, { useEffect, useState } from "react";
import { useUserStore } from "../../store/user";
import type { UserCategory } from "../../types/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash, faFolder } from "@fortawesome/free-solid-svg-icons";
import CategoryForm from "../../components/Form/CategoryForm";
import { deleteCategory } from "../../utils/categories";
import toast from "react-hot-toast";

const DashboardCategories: React.FC = () => {
  const userCategories = useUserStore((state) => state.userCategories);
  const fetchUserCategories = useUserStore((state) => state.fetchUserCategories);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<UserCategory | null>(null);

  // Charger les catégories au montage
  useEffect(() => {
    fetchUserCategories();
  }, [fetchUserCategories]);

  // Supprimer une catégorie
  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory(id);
        toast.success("Category deleted successfully!");
        await fetchUserCategories(); // recharge après suppression
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete category.");
      }
    }
  };

  // Ouvrir le formulaire pour ajouter ou éditer
  const handleEdit = (category?: UserCategory) => {
    setEditingCategory(category || null);
    setIsModalOpen(true);
  };

  // ✅ userCategories est déjà un tableau
  const categories: UserCategory[] = userCategories || [];

  return (
    <div className="">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg p-8 mb-8 text-white">
        <h1 className="text-3xl font-bold text-center mb-2">Your Categories</h1>
        <p className="text-center text-blue-100 mb-6">
          Organize your content with custom categories
        </p>
        
        <div className="text-center">
          <button
            onClick={() => handleEdit()}
            className="inline-flex items-center bg-white text-blue-600 px-6 py-3 rounded-xl font-medium hover:bg-blue-50 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Add New Category
          </button>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="categories-grid">
        {categories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden group"
              >
                {/* Card Header */}
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 border-b border-gray-100">
                  <div className="flex items-center justify-center mb-3">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <FontAwesomeIcon 
                        icon={faFolder} 
                        className="text-blue-600 text-xl"
                      />
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 text-center mb-4 truncate">
                    {category.name}
                  </h3>
                  
                  {/* Action Buttons */}
                  <div className="flex justify-center space-x-3">
                    <button
                      onClick={() => handleEdit(category)}
                      className="flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors duration-200 group-hover:scale-110 transform"
                      title="Edit Category"
                    >
                      <FontAwesomeIcon icon={faEdit} className="text-sm" />
                    </button>
                    
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="flex items-center justify-center w-10 h-10 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors duration-200 group-hover:scale-110 transform"
                      title="Delete Category"
                    >
                      <FontAwesomeIcon icon={faTrash} className="text-sm" />
                    </button>
                  </div>
                </div>

                {/* Card Footer - Optional: Add creation date or other info */}
                <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
                  <p className="text-xs text-gray-500 text-center">
                    Category ID: {category.id}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="text-center py-16">
            <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <FontAwesomeIcon icon={faFolder} className="text-gray-400 text-3xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No Categories Yet
            </h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Get started by creating your first category to organize your content effectively.
            </p>
            <button
              onClick={() => handleEdit()}
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Create Your First Category
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <CategoryForm
          category={editingCategory} // prop pour l'édition ou null pour ajout
          onClose={() => setIsModalOpen(false)}
          afterSubmit={() => fetchUserCategories()} // recharge après ajout/édition
        />
      )}
    </div>
  );
};

export default DashboardCategories;