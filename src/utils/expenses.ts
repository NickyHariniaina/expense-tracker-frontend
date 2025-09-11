import type { UserExpense } from "../types/user";
import toast from "react-hot-toast";

export const createExpense = async (
  amount: string,
  date: string | null,
  categoryId: number,
  description: string | null,
  type: boolean,
  startDate: string | null,
  endDate: string | null,
  receipt: File | null,
) => {
  try {
    const formData = new FormData();
    formData.append("amount", amount);
    if (date) formData.append("date", date);
    formData.append("categoryId", categoryId.toString());
    formData.append("type", type ? "true" : "false");

    if (description) formData.append("description", description);
    if (startDate) formData.append("startDate", startDate);
    if (endDate) formData.append("endDate", endDate);
    if (receipt) formData.append("receipt", receipt);

    const res = await fetch("http://localhost:3000/api/expenses", {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    if (res.status === 201) {
      toast.success("Expense created successfully");
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

export const getExpenseById = async (
  id: number,
): Promise<UserExpense | undefined> => {
  try {
    const res = await fetch(`http://localhost:3000/api/expenses/${id}`, {
      method: "GET",
      headers: { "Content-type": "application/json" },
      credentials: "include",
    });

    if (res.status === 200) {
      const data: UserExpense = await res.json();
      return data;
    } else if (res.status === 404) {
      toast.error("Expense not found");
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

export const updateExpense = async (
  id: number,
  amount: string,
  date: string | null,
  categoryId: number,
  description: string | null,
  type: boolean,
  startDate: string | null,
  endDate: string | null,
  receipt: File | null,
) => {
  try {
    const formData = new FormData();
    formData.append("amount", amount);
    if (date) formData.append("date", date);
    formData.append("categoryId", categoryId.toString());
    formData.append("type", type ? "true" : "false");

    if (description) formData.append("description", description);
    if (startDate) formData.append("startDate", startDate);
    if (endDate) formData.append("endDate", endDate);
    if (receipt) formData.append("receipt", receipt);

    const res = await fetch(`http://localhost:3000/api/expenses/${id}`, {
      method: "PUT",
      body: formData,
      credentials: "include",
    });

    if (res.status === 200) {
      toast.success("Expense modified successfully");
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

export const deleteExpenseById = async (id: number): Promise<void> => {
  try {
    const res = await fetch(`http://localhost:3000/api/expenses/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (res.status === 200) {
      toast.success("Expense deleted successfully");
    } else if (res.status === 404) {
      toast.error("Expense not found");
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