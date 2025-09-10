import { type FC } from "react";
import Sidebar from "../components/SideBar/Sidebar";
import Header from "../components/Header/Header";
import { useUserStore } from "../store/user";
import { useFetchBasicUser } from "../hooks/useFetchBasicData";
import { Outlet } from "react-router-dom";

const DashBoard: FC = () => {
  const { userData, userCategories, userExpenses, userIncomes, userSummary } =
    useUserStore();

  useFetchBasicUser();

  // JUST FOR VISUAL HELP
  console.group("User Data");
  console.log("UserData:", userData);
  console.log("Categories:", userCategories);
  console.log("Expenses:", userExpenses);
  console.log("Incomes:", userIncomes);
  console.log("Summary:", userSummary);
  console.groupEnd();

  return (
    <div className="flex flex-col h-screen">
  {/* Header */}
  <Header />

  {/* Main Content */}
  <div className="flex flex-1 overflow-hidden pt-0"> {/* ← pt-16 = hauteur du header */}
    {/* Sidebar wrapper */}
    <div className="flex-shrink-0 w-64 h-full">
      <Sidebar />
    </div>

    {/* Content area */}
    <div className="flex-1 overflow-auto my-20 mx-2 bg-gray-100">
      <Outlet />
    </div>
  </div>
</div>



  );
};

export default DashBoard;