import toast from "react-hot-toast";

export const createCategory = async (name: string) => {
  try {
    const res = await fetch("http://localhost:3000/api/categories", {
      method: "POST",
      body: JSON.stringify({ name }),
      headers: { "Content-type": "application/json" },
      credentials: "include",
    });

    if (res.status === 400) {
      toast.error("Category name is required");
    } else if (res.status === 201) {
      toast.success("Category created successfully");
    } else if (res.status === 500) {
      toast.error("Internal Server Error");
    } else {
      toast.error("Unexpected error");
    }
  } catch (error) {
    console.error(error);
    toast.error("Network error");
  }
};

export const renameCategory = async (id: number, name: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/categories/${id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ name }),
      credentials: "include",
    });

    if (res.status === 400) {
      toast.error("Category name is required");
    } else if (res.status === 404) {
      toast.error("Category not found");
    } else if (res.status === 200) {
      toast.success("Category updated successfully");
    } else if (res.status === 500) {
      toast.error("Internal Server Error");
    } else {
      toast.error("Unexpected error");
    }
  } catch (error) {
    console.error(error);
    toast.error("Network error");
  }
};

export const deleteCategory = async (id: number) => {
  try {
    const res = await fetch(`http://localhost:3000/api/categories/${id}`, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
      credentials: "include",
    });

    if (res.status === 404) {
      toast.error("Category not found");
    } else if (res.status === 200) {
      toast.success("Category deleted successfully");
    } else if (res.status === 500) {
      toast.error("Internal Server Error");
    } else {
      toast.error("Unexpected error");
    }
  } catch (error) {
    console.error(error);
    toast.error("Network error");
  }
};
