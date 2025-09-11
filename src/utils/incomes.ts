// utils/incomes.ts
import type { UserIncome } from "../types/user";
import toast from "react-hot-toast";

const API_URL = "http://localhost:3000/api/incomes";

// Création d'un income
export const createIncome = async (
  amount: number,
  date: Date,
  source: string,
  description: string | null,
  afterSubmit?: () => void
) => {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, date, source, description }),
      credentials: "include",
    });

    if (res.status === 201) {
      toast.success("Income created successfully ✅");
      afterSubmit?.();
    } else if (res.status === 400) {
      toast.error("Bad request ❌");
    } else if (res.status === 401) {
      toast.error("Unauthorized 🚫");
    } else if (res.status === 500) {
      toast.error("Internal Server Error 💥");
    } else {
      toast.error(`Unexpected status: ${res.status}`);
    }
  } catch (error) {
    console.error(error);
    toast.error("Network error 🌐");
  }
};

// Mise à jour d'un income
export const updateIncome = async (
  id: number, // ⚡ id en paramètre
  amount: number,
  date: Date,
  source: string,
  description: string | null,
  afterSubmit?: () => void
) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, { // ⚡ id dans l'URL
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, date, source, description }),
      credentials: "include",
    });

    if (res.status === 200) {
      toast.success("Income updated successfully ✏️");
      afterSubmit?.();
    } else if (res.status === 404) {
      toast.error("Income not found 🔍");
    } else if (res.status === 401) {
      toast.error("Unauthorized 🚫");
    } else if (res.status === 400) {
      toast.error("Bad request ❌");
    } else if (res.status === 500) {
      toast.error("Internal Server Error 💥");
    } else {
      toast.error(`Unexpected status: ${res.status}`);
    }
  } catch (error) {
    console.error(error);
    toast.error("Network error 🌐");
  }
};

// Suppression d'un income
export const deleteIncomesById = async (
  id: number, // ⚡ id en paramètre
  afterSubmit?: () => void
) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, { // ⚡ id dans l'URL
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (res.status === 200) {
      toast.success("Income deleted 🗑️");
      afterSubmit?.();
    } else if (res.status === 404) {
      toast.error("Income not found 🔍");
    } else if (res.status === 401) {
      toast.error("Unauthorized 🚫");
    } else if (res.status === 500) {
      toast.error("Internal Server Error 💥");
    } else {
      toast.error(`Unexpected status: ${res.status}`);
    }
  } catch (error) {
    console.error(error);
    toast.error("Network error 🌐");
  }
};

// Récupérer un income par id
export const getIncomesById = async (
  id: number
): Promise<UserIncome | undefined> => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (res.status === 200) {
      return await res.json();
    } else if (res.status === 404) {
      toast.error("Income not found 🔍");
    } else if (res.status === 401) {
      toast.error("Unauthorized 🚫");
    } else if (res.status === 500) {
      toast.error("Internal Server Error 💥");
    } else {
      toast.error(`Unexpected status: ${res.status}`);
    }
  } catch (error) {
    console.error(error);
    toast.error("Network error 🌐");
  }
};
