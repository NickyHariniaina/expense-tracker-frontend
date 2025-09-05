import type { UserExpense } from "../types/user";

export const createExpense = async (
  amount: string,
  date: Date,
  categoryId: number,
  description: string | null,
  type: boolean,
  startDate: Date | null,
  endDate: Date | null,
  receipt: File | null,
) => {
  try {
    const formData = new FormData();

    formData.append("amount", amount);
    formData.append("date", date.toISOString());
    formData.append("categoryId", categoryId.toString());
    formData.append("type", type ? "true" : "false");

    if (description) formData.append("description", description);
    if (startDate) formData.append("startDate", startDate.toISOString());
    if (endDate) formData.append("endDate", endDate.toISOString());
    if (receipt) formData.append("receipt", receipt);

    const res = await fetch("http://localhost:3000/api/expenses", {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    if (res.status === 201) {
      console.log("expense created");
    } else if (res.status === 400) {
      console.log("Bad request");
    } else if (res.status === 500) {
      console.log("Internal Server Error");
    }
  } catch (error) {
    console.error(error);
  }
};

export const getExpenseById = async (
  id: number,
): Promise<UserExpense | undefined> => {
  try {
    const res = await fetch("http://localhost:3000/api/expenses/" + id, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    });

    if (res.status === 200) {
      console.log("Expense was found");
    } else if (res.status === 404) {
      console.log("Not found");
    } else if (res.status === 500) {
      console.log("Internal Server Error");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
