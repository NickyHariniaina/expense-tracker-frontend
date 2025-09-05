import { create } from "zustand";
import type {
  UserCategory,
  UserData,
  UserExpense,
  UserIncome,
  UserSummary,
} from "../types/user";

interface UserState {
  userData: UserData | null;
  userCategories: UserCategory[] | null;
  userExpenses: UserExpense[] | null;
  userIncomes: UserIncome[] | null;
  userSummary: UserSummary | null;
  fetchUserData: () => Promise<void>;
}

// BASE_URL, should be put in the env later
const BASE_URL: string = "http://localhost:3000/api";

export const useUserStore = create<UserState>((set, get) => ({
  userData: null,
  userCategories: null,
  userExpenses: null,
  userIncomes: null,
  userSummary: null,
  fetchUserData: async () => {
    try {
      const response = await fetch(BASE_URL + "/user/profile", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      });

      const data = await response.json();

      if (
        response.status === 401 &&
        data.message === "Please create an account or log in"
      ) {
        throw new Error(data.message);
      }

      set({ userData: data });
    } catch (error) {
      console.log(error);
    }
  },

  fecthUserCategories: async () => {
    try {
      const response = await fetch(BASE_URL + "/categories", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      });

      const data = await response.json();

      if (response.status !== 200) {
        throw new Error("An error ocurred with the server");
      }

      set({
        userCategories: data,
      });
    } catch (error) {
      console.log(error);
    }
  },

  fetchUserExpenses: async () => {
    try {
      const response = await fetch(BASE_URL + "/expenses", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      });

      const data = await response.json();

      if (response.status !== 200) {
        throw new Error("An error ocurred with the server");
      }

      set({
        userExpenses: data,
      });
    } catch (error) {
      console.log(error);
    }
  },
  fetchUserIncomes: async () => {
    try {
      const response = await fetch(BASE_URL + "/incomes", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      });

      const data = await response.json();

      if (response.status !== 200) {
        throw new Error("An error ocurred with the server");
      }

      set({
        userIncomes: data,
      });
    } catch (error) {
      console.log(error);
    }
  },
  fetchUserSummary: async (
    startDate: Date | undefined = get().userData?.start_date,
  ) => {
    try {
      const response = await fetch(BASE_URL + "/summary?start=" + startDate, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      });

      const data = await response.json();

      if (response.status !== 200) {
        throw new Error("An error ocurred with the server");
      }

      set({
        userSummary: data,
      });
    } catch (error) {
      console.log(error);
    }
  },
}));
