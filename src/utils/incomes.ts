import type { UserIncome } from "../types/user";
import toast from "react-hot-toast";

export const createIncome = async (
  amount: number,
  date: Date,
  source: string,
  description: string | null,
) => {
  try {
    const res = await fetch("http://localhost:3000/api/incomes", {
      method: "POST",
      body: JSON.stringify({
        amount,
        date,
        source,
        description,
      }),
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    });

    if (res.status === 201) {
      toast.success("Income created successfully ✅");
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
    toast.error("Network error 🌐");
    console.error(error);
  }
};

export const updateIncome = async (
  id: number,
  amount: number,
  date: Date,
  source: string,
  description: string | null,
) => {
  try {
    const res = await fetch("http://localhost:3000/api/incomes/" + id, {
      method: "PUT",
      body: JSON.stringify({
        amount,
        date,
        source,
        description,
      }),
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    });

    if (res.status === 200) {
      toast.success("Income updated successfully ✏️");
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
    toast.error("Network error 🌐");
    console.error(error);
  }
};

export const deleteIncomesById = async (id: number) => {
  try {
    const res = await fetch("http://localhost:3000/api/incomes/" + id, {
      method: "DELETE",
      credentials: "include",
    });

    if (res.status === 200) {
      toast.success("Income deleted 🗑️");
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
    toast.error("Network error 🌐");
    console.error(error);
  }
};

export const getIncomesById = async (
  id: number,
): Promise<UserIncome | undefined> => {
  try {
    const res = await fetch("http://localhost:3000/api/incomes/" + id, {
      method: "GET",
      credentials: "include",
    });

    if (res.status === 200) {
      toast.success("Income retrieved successfully 📥");
    } else if (res.status === 404) {
      toast.error("Income not found 🔍");
    } else if (res.status === 401) {
      toast.error("Unauthorized 🚫");
    } else if (res.status === 500) {
      toast.error("Internal Server Error 💥");
    } else {
      toast.error(`Unexpected status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    toast.error("Network error 🌐");
    console.error(error);
  }
};
