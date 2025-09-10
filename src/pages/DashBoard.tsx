import { type FC } from "react";
import SideBar from "../components/SideBar/Sidebar";
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
    <>
      <div className="flex w-full">
        {/*left sidebar*/}
        <SideBar />
        {/*Right sidebar*/}
        {/* TODO : add rectangle area */}
        <div className="">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DashBoard;
