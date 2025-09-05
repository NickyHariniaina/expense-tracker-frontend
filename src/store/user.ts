import { create } from "zustand";

interface UserState {}
export const useUserStore = create<UserState>((set) => ({
  userData: null,
  userCategory: null,
  userExpenses: null,
  userIncomes: null,
  userSummary: null,
}));
