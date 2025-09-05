import type { UserIncome } from "../types/user";

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
        amount: amount,
        date: date,
        source: source,
        description: description,
      }),
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    });

    // CAN YOU PLEASE VERIFY EACH CASE WITH res.status ?
  } catch (error) {
    console.log(error);
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
        amount: amount,
        date: date,
        source: source,
        description: description,
      }),
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    });

    // CAN YOU PLEASE VERIFY EACH CASE WITH res.status ?
    // 200
    // 404
    // 500
  } catch (error) {
    console.log(error);
  }
};

export const deleteIncomesById = async (id: number) => {
  try {
    const res = await fetch("http://localhost:3000/api/incomes/" + id, {
      method: "DELETE",
      credentials: "include",
    });

    //CAN YOU PLEASE VERIFY EACH status
    //200
    //404
    //500
  } catch (error) {
    console.log(error);
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

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
