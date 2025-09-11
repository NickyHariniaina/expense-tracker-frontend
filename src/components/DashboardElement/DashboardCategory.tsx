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

  const userCategories = useUserStore((state) => state.userCategories);
  const fetchUserCategories = useUserStore((state) => state.fetchUserCategories);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<UserCategory | null>(null);

  // Charger les catégories au montage
  useEffect(() => {
    fetchUserCategories();
  }, [fetchUserCategories]);

  // Supprimer une catégorie
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


  // Ouvrir le formulaire pour ajouter ou éditer
  const handleEdit = (category?: UserCategory) => {
    setEditingCategory(category || null);
    setIsModalOpen(true);
  };

  // ✅ userCategories est déjà un tableau
  const categories: UserCategory[] = userCategories || [];

  return (
    <div className="w-full relative">
      {/* Header Section */}
      <div className="primary-color rounded-2xl shadow-lg p-8 mb-8 text-white">
        <h1 className="text-5xl font-bold text-white font-spartan text-center mb-2">Your Categories</h1>
        <p className="text-center  mb-6">
          Organize your content with custom categories
        </p>

        <div className="text-center">
          <Button
            text=""
            onClick={() => handleEdit()}
            bg_color="secondary"   // Utilise la couleur secondaire
            size="lg"              // Taille large pour correspondre à px-6 py-3
            className="inline-flex items-center justify-center hover:bg-blue-50 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Add New Category
          </Button>

        </div>
      </div>

      {/* Categories Grid */}
      <div className="categories-grid">
        {categories.length > 0 ? (
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
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
                        className="text-gray text-3xl"
                      />
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray capitalize text-center mb-4 truncate">
                    {category.name}
                  </h3>

                  {/* Action Buttons */}
                  <div className="flex justify-center space-x-3">
                    <Button
                      text=""
                      onClick={() => handleEdit(category)}
                      bg_color="secondary"
                      size="sm"
                      className="flex items-center justify-center w-10 h-10 p-0"
                    >
                      <FontAwesomeIcon icon={faEdit} className="text-sm" />
                    </Button>


                    <Button
                      text=""
                      onClick={() => requestDelete(category.id)}
                      bg_color="terty"
                      size="sm"
                      className="flex items-center justify-center w-10 h-10 p-0"
                    >
                      <FontAwesomeIcon icon={faTrash} className="text-sm" />
                    </Button>


                  </div>
                </div>

               
              </div>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="text-center py-8">
            <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
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
        {/* Modal pour ajouter/éditer la catégorie */}
        {isModalOpen && (
          <CategoryForm
            category={editingCategory}
            onClose={() => setIsModalOpen(false)}
            afterSubmit={() => fetchUserCategories()}
          />
        )}

        {/* ✅ Modal de confirmation de suppression */}
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