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

export const useUserStore = create<UserState>((set) => ({
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
        // redirect to login page
      } else {
      }

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  },
}));
