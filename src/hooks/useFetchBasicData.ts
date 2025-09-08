import { useEffect } from "react";
import { useUserStore } from "../store/user";

export const useFetchBasicUser = () => {
  const {
    fetchUserData,
    fetchUserCategories,
    fetchUserExpenses,
    fetchUserIncomes,
    fetchUserSummary,
  } = useUserStore();

  useEffect(() => {
    const fetchAll = async () => {
      try {
        await fetchUserData();
        await fetchUserCategories();
        await fetchUserExpenses();
        await fetchUserIncomes();
        await fetchUserSummary();
      } catch (error) {
        console.log(error);
      }
    };

    fetchAll();
  }, [
    fetchUserData,
    fetchUserCategories,
    fetchUserExpenses,
    fetchUserIncomes,
    fetchUserSummary,
  ]);
};
