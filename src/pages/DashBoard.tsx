import { useEffect, type FC } from "react";
import SideBar from "../components/SideBar/Sidebar";
import { useUserStore } from "../store/user";
import { login } from "../utils/auth";

const DashBoard: FC = () => {
  const { userData, fetchUserData } = useUserStore();

  // REMOVE THIS LATER, WHEN THE LOGIN PAGE IS WORKING

  useEffect(() => {
    login("nicky@mail.hei.school", "12345678");
    fetchUserData();
  }, [fetchUserData]);
  return (
    <>
      <SideBar />
    </>
  );
};

export default DashBoard;
